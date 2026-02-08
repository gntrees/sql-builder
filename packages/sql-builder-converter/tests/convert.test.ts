import { describe, test, expect } from "bun:test";
import { testRoundTrip } from "./utils/test-helper";
import { sqlSamples } from "./fixtures/sql-samples";

describe("sql-builder-converter", () => {
    describe("round-trip conversion", () => {
        test("basic SELECT queries", async () => {
            for (const sql of sqlSamples.basicSelect) {
                const result = await testRoundTrip(sql);
                if (!result.match) {
                    console.log(`\nInput SQL:    ${result.inputSql}`);
                    console.log(`Output SQL:   ${result.outputSql}`);
                    console.log(`Generated code:\n${result.generatedCode}`);
                }
                expect(result.match).toBe(true);
            }
        });

        test("WHERE clauses", async () => {
            for (const sql of sqlSamples.whereClauses) {
                const result = await testRoundTrip(sql);
                if (!result.match) {
                    console.log(`\nInput SQL:    ${result.inputSql}`);
                    console.log(`Output SQL:   ${result.outputSql}`);
                    console.log(`Generated code:\n${result.generatedCode}`);
                }
                expect(result.match).toBe(true);
            }
        });

        test("JOINs", async () => {
            for (const sql of sqlSamples.joins) {
                const result = await testRoundTrip(sql);
                if (!result.match) {
                    console.log(`\nInput SQL:    ${result.inputSql}`);
                    console.log(`Output SQL:   ${result.outputSql}`);
                    console.log(`Generated code:\n${result.generatedCode}`);
                }
                expect(result.match).toBe(true);
            }
        });

        test("aggregations", async () => {
            for (const sql of sqlSamples.aggregations) {
                const result = await testRoundTrip(sql);
                if (!result.match) {
                    console.log(`\nInput SQL:    ${result.inputSql}`);
                    console.log(`Output SQL:   ${result.outputSql}`);
                    console.log(`Generated code:\n${result.generatedCode}`);
                }
                expect(result.match).toBe(true);
            }
        });

        test("subqueries", async () => {
            for (const sql of sqlSamples.subqueries) {
                const result = await testRoundTrip(sql);
                if (!result.match) {
                    console.log(`\nInput SQL:    ${result.inputSql}`);
                    console.log(`Output SQL:   ${result.outputSql}`);
                    console.log(`Generated code:\n${result.generatedCode}`);
                }
                expect(result.match).toBe(true);
            }
        });

        test("CTEs", async () => {
            for (const sql of sqlSamples.ctes) {
                const result = await testRoundTrip(sql);
                if (!result.match) {
                    console.log(`\nInput SQL:    ${result.inputSql}`);
                    console.log(`Output SQL:   ${result.outputSql}`);
                    console.log(`Generated code:\n${result.generatedCode}`);
                }
                expect(result.match).toBe(true);
            }
        });

        test("functions", async () => {
            for (const sql of sqlSamples.functions) {
                const result = await testRoundTrip(sql);
                if (!result.match) {
                    console.log(`\nInput SQL:    ${result.inputSql}`);
                    console.log(`Output SQL:   ${result.outputSql}`);
                    console.log(`Generated code:\n${result.generatedCode}`);
                }
                expect(result.match).toBe(true);
            }
        });

        test("ORDER BY", async () => {
            for (const sql of sqlSamples.orderBy) {
                const result = await testRoundTrip(sql);
                if (!result.match) {
                    console.log(`\nInput SQL:    ${result.inputSql}`);
                    console.log(`Output SQL:   ${result.outputSql}`);
                    console.log(`Generated code:\n${result.generatedCode}`);
                }
                expect(result.match).toBe(true);
            }
        });

        test("LIMIT/OFFSET", async () => {
            for (const sql of sqlSamples.limitOffset) {
                const result = await testRoundTrip(sql);
                if (!result.match) {
                    console.log(`\nInput SQL:    ${result.inputSql}`);
                    console.log(`Output SQL:   ${result.outputSql}`);
                    console.log(`Generated code:\n${result.generatedCode}`);
                }
                expect(result.match).toBe(true);
            }
        });

        test("DISTINCT", async () => {
            for (const sql of sqlSamples.distinct) {
                const result = await testRoundTrip(sql);
                if (!result.match) {
                    console.log(`\nInput SQL:    ${result.inputSql}`);
                    console.log(`Output SQL:   ${result.outputSql}`);
                    console.log(`Generated code:\n${result.generatedCode}`);
                }
                expect(result.match).toBe(true);
            }
        });

        test("operators", async () => {
            for (const sql of sqlSamples.operators) {
                const result = await testRoundTrip(sql);
                if (!result.match) {
                    console.log(`\nInput SQL:    ${result.inputSql}`);
                    console.log(`Output SQL:   ${result.outputSql}`);
                    console.log(`Generated code:\n${result.generatedCode}`);
                }
                expect(result.match).toBe(true);
            }
        });

        test("complex queries", async () => {
            for (const sql of sqlSamples.complex) {
                const result = await testRoundTrip(sql);
                if (!result.match) {
                    console.log(`\nInput SQL:    ${result.inputSql}`);
                    console.log(`Output SQL:   ${result.outputSql}`);
                    console.log(`Generated code:\n${result.generatedCode}`);
                }
                expect(result.match).toBe(true);
            }
        });
    });
});
