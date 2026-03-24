import type { ParseResult } from "../../src/ast-types";
export declare function normalizeSql(sql: string): string;
/**
 * Normalizes a ParseResult by adding location_start, location_end, and sql attributes to each node.
 * Uses a checkpoint system that first collects all locations from the AST, then uses them
 * to accurately determine end positions for each node.
 *
 * @param parseResult - The ParseResult to normalize
 * @param sql - The original SQL string
 * @returns ParseResult with location_start, location_end, and sql added to each node
 */
export declare function normalizeLocationsNode(parseResult: ParseResult, sql: string): ParseResult;
