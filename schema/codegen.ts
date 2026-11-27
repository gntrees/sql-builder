#!/usr/bin/env bun
// Generate Lingua Tungga schema packages from schema/schema.json.
//
//   bun schema/codegen.ts generate
//   bun schema/codegen.ts check
//
// Flags:
//   --schema <path>        default schema/schema.json
//   --unsupported <path>   default schema/unsupported.json
//   --out <dir>            default lt-drizzle-v2/src/generated
//   --allow-unsupported    emit UnsupportedColumn instead of failing

import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { emitLt } from "./emit-lt.ts";
import { SCHEMA_IR_VERSION, type SchemaIR, type UnsupportedIR } from "./types.ts";

const root = fileURLToPath(new URL("..", import.meta.url));

type Options = {
    command: "generate" | "check";
    schemaPath: string;
    unsupportedPath: string;
    outDir: string;
    allowUnsupported: boolean;
};

function usage(): string {
    return `Usage: bun schema/codegen.ts <generate|check> [options]

Options:
  --schema <path>        Schema IR (default schema/schema.json)
  --unsupported <path>   Unsupported report (default schema/unsupported.json)
  --out <dir>            Output directory (default lt-drizzle-v2/src/generated)
  --allow-unsupported    Emit UnsupportedColumn instead of failing`;
}

function parseArgs(argv: string[]): Options {
    const command = argv[0] === "check" ? "check" : "generate";
    const remaining = argv[0] === "check" || argv[0] === "generate" ? argv.slice(1) : argv;

    let schemaPath = join(root, "schema/schema.json");
    let unsupportedPath = join(root, "schema/unsupported.json");
    let outDir = join(root, "lt-drizzle-v2/src/generated");
    let allowUnsupported = false;

    for (let index = 0; index < remaining.length; index += 1) {
        const arg = remaining[index]!;
        if (arg === "--allow-unsupported") {
            allowUnsupported = true;
        } else if (arg === "--schema") {
            schemaPath = resolve(root, remaining[++index] ?? "");
        } else if (arg === "--unsupported") {
            unsupportedPath = resolve(root, remaining[++index] ?? "");
        } else if (arg === "--out") {
            outDir = resolve(root, remaining[++index] ?? "");
        } else if (arg === "--help" || arg === "-h") {
            console.log(usage());
            process.exit(0);
        } else {
            throw new Error(`unknown argument: ${arg}\n\n${usage()}`);
        }
    }

    return { command, schemaPath, unsupportedPath, outDir, allowUnsupported };
}

function readJson<T>(path: string): T {
    return JSON.parse(readFileSync(path, "utf8")) as T;
}

function expectedNames(files: { name: string }[]): Set<string> {
    return new Set(files.map((file) => file.name));
}

function generatedFiles(dir: string): string[] {
    if (!existsSync(dir)) return [];
    return readdirSync(dir)
        .filter((name) => /^schema_[a-z0-9_]*\.lt$/.test(name))
        .sort();
}

function unsupportedColumns(schema: SchemaIR): string[] {
    const found: string[] = [];
    for (const table of schema.tables) {
        for (const column of table.columns) {
            if (column.type === "Unsupported") {
                found.push(`${table.name}.${column.name} (${column.nativeType})`);
            }
        }
    }
    return found;
}

function main(): void {
    const options = parseArgs(process.argv.slice(2));

    const schema = readJson<SchemaIR>(options.schemaPath);
    if (schema.version !== SCHEMA_IR_VERSION) {
        throw new Error(
            `schema IR version ${schema.version} is not supported by this codegen (expected ${SCHEMA_IR_VERSION})`,
        );
    }

    const unsupported = existsSync(options.unsupportedPath)
        ? readJson<UnsupportedIR>(options.unsupportedPath)
        : { version: SCHEMA_IR_VERSION, entries: [] };

    const unsupportedList = unsupportedColumns(schema);
    if (unsupportedList.length > 0 && !options.allowUnsupported) {
        console.error(
            `refusing to emit ${unsupportedList.length} unsupported column(s); ` +
                "pass --allow-unsupported to emit UnsupportedColumn",
        );
        for (const item of unsupportedList) console.error(`  - ${item}`);
        process.exitCode = 1;
        return;
    }

    const files = emitLt(schema);
    const names = expectedNames(files);

    if (options.command === "check") {
        const problems: string[] = [];

        for (const file of files) {
            const path = join(options.outDir, file.name);
            if (!existsSync(path)) {
                problems.push(`missing: ${file.name}`);
                continue;
            }
            const current = readFileSync(path, "utf8");
            if (current !== file.content) problems.push(`stale: ${file.name}`);
        }

        for (const name of generatedFiles(options.outDir)) {
            if (!names.has(name)) problems.push(`unexpected: ${name}`);
        }

        if (problems.length > 0) {
            console.error("schema codegen is not up to date:");
            for (const problem of problems) console.error(`  - ${problem}`);
            process.exitCode = 1;
            return;
        }

        console.log(`schema codegen is up to date (${files.length} file(s), ${unsupported.entries.length} unsupported entr(ies))`);
        return;
    }

    mkdirSync(options.outDir, { recursive: true });
    for (const name of generatedFiles(options.outDir)) {
        if (!names.has(name)) unlinkSync(join(options.outDir, name));
    }
    for (const file of files) {
        writeFileSync(join(options.outDir, file.name), file.content);
    }

    console.log(
        `generated ${files.length} file(s) to ${options.outDir} ` +
            `(${unsupported.entries.length} unsupported entr(ies))`,
    );
}

try {
    main();
} catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
}
