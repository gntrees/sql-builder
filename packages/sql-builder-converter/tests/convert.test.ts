import { describe, test, expect } from "bun:test";
import { testRoundTrip } from "./utils/test-helper";
import { sqlSamples } from "./fixtures/sql-samples";

describe("sql-builder-converter", () => {
    describe("round-trip conversion", () => {
        test("basic SELECT queries", async () => {
            const results = [];
            for (const sql of sqlSamples.basicSelect) {
                const result = await testRoundTrip(sql, "basic_SELECT");
                results.push(result);
            }
            const allPassed = results.every(r => r.match);
            expect(allPassed).toBe(true);
        });

        test("WHERE clauses", async () => {
            const results = [];
            for (const sql of sqlSamples.whereClauses) {
                const result = await testRoundTrip(sql, "WHERE_clauses");
                results.push(result);
            }
            const allPassed = results.every(r => r.match);
            expect(allPassed).toBe(true);
        });

        test("JOINs", async () => {
            const results = [];
            for (const sql of sqlSamples.joins) {
                const result = await testRoundTrip(sql, "JOINs");
                results.push(result);
            }
            const allPassed = results.every(r => r.match);
            expect(allPassed).toBe(true);
        });

        test("aggregations", async () => {
            const results = [];
            for (const sql of sqlSamples.aggregations) {
                const result = await testRoundTrip(sql, "aggregations");
                results.push(result);
            }
            const allPassed = results.every(r => r.match);
            expect(allPassed).toBe(true);
        });

        test("subqueries", async () => {
            const results = [];
            for (const sql of sqlSamples.subqueries) {
                const result = await testRoundTrip(sql, "subqueries");
                results.push(result);
            }
            const allPassed = results.every(r => r.match);
            expect(allPassed).toBe(true);
        });

        test("CTEs", async () => {
            const results = [];
            for (const sql of sqlSamples.ctes) {
                const result = await testRoundTrip(sql, "CTEs");
                results.push(result);
            }
            const allPassed = results.every(r => r.match);
            expect(allPassed).toBe(true);
        });

        test("functions", async () => {
            const results = [];
            for (const sql of sqlSamples.functions) {
                const result = await testRoundTrip(sql, "functions");
                results.push(result);
            }
            const allPassed = results.every(r => r.match);
            expect(allPassed).toBe(true);
        });

        test("ORDER BY", async () => {
            const results = [];
            for (const sql of sqlSamples.orderBy) {
                const result = await testRoundTrip(sql, "ORDER_BY");
                results.push(result);
            }
            const allPassed = results.every(r => r.match);
            expect(allPassed).toBe(true);
        });

        test("LIMIT/OFFSET", async () => {
            const results = [];
            for (const sql of sqlSamples.limitOffset) {
                const result = await testRoundTrip(sql, "LIMIT_OFFSET");
                results.push(result);
            }
            const allPassed = results.every(r => r.match);
            expect(allPassed).toBe(true);
        });

        test("DISTINCT", async () => {
            const results = [];
            for (const sql of sqlSamples.distinct) {
                const result = await testRoundTrip(sql, "DISTINCT");
                results.push(result);
            }
            const allPassed = results.every(r => r.match);
            expect(allPassed).toBe(true);
        });

        test("operators", async () => {
            const results = [];
            for (const sql of sqlSamples.operators) {
                const result = await testRoundTrip(sql, "operators");
                results.push(result);
            }
            const allPassed = results.every(r => r.match);
            expect(allPassed).toBe(true);
        });

        test("complex queries", async () => {
            const results = [];
            for (const sql of sqlSamples.complex) {
                const result = await testRoundTrip(sql, "complex_queries");
                results.push(result);
            }
            const allPassed = results.every(r => r.match);
            expect(allPassed).toBe(true);
        });
    });
});
