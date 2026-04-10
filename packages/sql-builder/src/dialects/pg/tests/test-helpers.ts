/**
 * Helper utilities for accessing test expectations from test-list.ts
 */

import { describe, test, expect } from "bun:test";
import { testSql, type TestExpectation } from "./test-list";
import type { QueryBuilder } from "../query-builder";

/**
 * Asserts that a query builder's SQL and parameters match expected values
 */
export function expectQuery(
    builder: QueryBuilder,
    category: string,
    testName: string
): void {
    const expectation = testSql[category]?.[testName];

    if (!expectation) {
        throw new Error(`Test expectation not found: ${category}.${testName}`);
    }

    const sql = builder.getSql();
    const parameters = builder.getSqlParameters();

    expect(sql).toBe(expectation.sql);

    if (expectation.parameters !== undefined) {
        expect(parameters).toEqual(expectation.parameters);
    }
}

/**
 * Returns expectations for manual assertion
 */
export function getExpectation(
    category: string,
    testName: string
): TestExpectation {
    const expectation = testSql[category]?.[testName];

    if (!expectation) {
        throw new Error(`Test expectation not found: ${category}.${testName}`);
    }

    return expectation;
}
