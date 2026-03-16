#!/usr/bin/env bun
/**
 * Custom test runner for sql-builder-converter
 * Run with: bun run run-tests.ts
 */

import { testRoundTrip } from "./utils/test-helper";
import { sqlSamples, getAllSamples } from "./fixtures/sql-samples";

interface TestStats {
    total: number;
    passed: number;
    failed: number;
    errors: number;
    categories: Record<string, {
        total: number;
        passed: number;
        failed: number;
        errors: number;
    }>;
}

function colorize(text: string, color: "green" | "red" | "yellow" | "blue" | "gray" | "bold"): string {
    const colors = {
        green: "\x1b[32m",
        red: "\x1b[31m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        gray: "\x1b[90m",
        bold: "\x1b[1m",
    };
    const reset = "\x1b[0m";
    return `${colors[color]}${text}${reset}`;
}

function formatTestCategory(category: string): string {
    return category
        .replace(/([A-Z])/g, "_$1")
        .toLowerCase()
        .replace(/^_/, "")
        .replace(/_/g, "-");
}

async function runCategoryTests(
    category: string,
    samples: string[],
    stats: TestStats
): Promise<void> {
    const categoryName = formatTestCategory(category);
    stats.categories[category] = { total: 0, passed: 0, failed: 0, errors: 0 };

    for (let i = 0; i < samples.length; i++) {
        const sql = samples[i];
        const testName = `${categoryName}-${i + 1}`;

        // Skip empty or invalid SQL samples
        if (!sql || sql.trim() === "") {
            stats.categories[category].total++;
            stats.total++;
            stats.categories[category].errors++;
            stats.errors++;
            continue;
        }

        // // Skip obviously invalid SQL samples (those starting with "SELECT WHERE" without FROM)
        // if (sql.match(/^SELECT\s+WHERE/i) && !sql.includes("FROM")) {
        //     stats.categories[category].total++;
        //     stats.total++;
        //     stats.categories[category].errors++;
        //     stats.errors++;
        //     continue;
        // }

        // // Skip samples that are just fragments (no SELECT/INSERT/UPDATE/DELETE/WITH/BEGIN/COMMIT/ROLLBACK/SAVEPOINT)
        // const validStart = /^(SELECT|INSERT|UPDATE|DELETE|WITH|BEGIN|COMMIT|ROLLBACK|SAVEPOINT)/i;
        // if (!validStart.test(sql.trim()) && !sql.includes("FROM") && !sql.includes("INTO") && !sql.includes(";")) {
        //     stats.categories[category].total++;
        //     stats.total++;
        //     stats.categories[category].errors++;
        //     stats.errors++;
        //     continue;
        // }

        let result;
        try {
            result = await testRoundTrip(sql, testName, i);
        } catch (e) {
            stats.categories[category].total++;
            stats.total++;
            stats.categories[category].errors++;
            stats.errors++;
            continue;
        }

        stats.categories[category].total++;
        stats.total++;

        if (result.error) {
            stats.categories[category].errors++;
            stats.errors++;
        } else if (result.match) {
            stats.categories[category].passed++;
            stats.passed++;
        } else {
            stats.categories[category].failed++;
            stats.failed++;
        }
    }
}

function printSummary(stats: TestStats): void {
    console.log(`\n${colorize("=" .repeat(60), "bold")}`);
    console.log(colorize("TEST SUMMARY", "bold"));
    console.log(colorize("=".repeat(60), "bold"));

    // Print category summary
    for (const [category, catStats] of Object.entries(stats.categories)) {
        const allPassed = catStats.failed === 0 && catStats.errors === 0;
        const statusSymbol = allPassed ? colorize("✓", "green") : colorize("✗", "red");
        const statusColor = allPassed ? "green" : "red";

        console.log(
            `  ${statusSymbol} ${colorize(category, statusColor)}: ` +
            `${catStats.passed} passed, ` +
            (catStats.failed > 0 ? `${colorize(String(catStats.failed), "red")} failed, ` : "") +
            (catStats.errors > 0 ? `${colorize(String(catStats.errors), "red")} errors, ` : "") +
            `${catStats.total} total`
        );
    }

    console.log(colorize("-".repeat(60), "bold"));

    // Print overall summary
    const allPassed = stats.failed === 0 && stats.errors === 0;
    const overallStatus = allPassed
        ? colorize("✓ ALL TESTS PASSED", "green")
        : colorize("✗ SOME TESTS FAILED", "red");

    console.log(
        `\n  ${overallStatus}\n` +
        `    Total:  ${stats.total}\n` +
        `    Passed: ${colorize(String(stats.passed), "green")}\n` +
        (stats.failed > 0 ? `    Failed: ${colorize(String(stats.failed), "red")}\n` : "") +
        (stats.errors > 0 ? `    Errors: ${colorize(String(stats.errors), "red")}\n` : "")
    );

    console.log(colorize("=".repeat(60), "bold"));
}

async function main(): Promise<void> {
    const stats: TestStats = {
        total: 0,
        passed: 0,
        failed: 0,
        errors: 0,
        categories: {},
    };

    const startTime = Date.now();

    // Run tests by category from sql-samples.ts (show progress dot for each category)
    process.stdout.write("Running tests");
    for (const [category, samples] of Object.entries(sqlSamples)) {
        await runCategoryTests(category, samples as string[], stats);
        // process.stdout.write(".");
    }
    console.log();

    const elapsed = Date.now() - startTime;

    // Print summary
    console.log(colorize("\n═══════════════════════════════════════════════════════════", "bold"));
    console.log(colorize("  SQL-BUILDER-CONVERTER TEST RUNNER", "bold"));
    console.log(colorize("═══════════════════════════════════════════════════════════", "bold"));

    printSummary(stats);

    console.log(`\nTime elapsed: ${(elapsed / 1000).toFixed(2)}s`);
    console.log(`Test dumps: ${colorize("./test-dumps", "blue")}\n`);

    // Exit with appropriate code
    const exitCode = stats.failed > 0 || stats.errors > 0 ? 1 : 0;
    process.exit(exitCode);
}

main().catch((err) => {
    console.error(colorize("Fatal error:", "red"), err);
    process.exit(1);
});
