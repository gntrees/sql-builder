/**
 * Parsed type information
 */
export interface ParsedType {
    name: string;
    values: string[];
}
/**
 * Parsed interface information
 */
export interface ParsedInterface {
    name: string;
    properties: Record<string, string[]>;
}
/**
 * Result of parsing ast-types.ts
 */
export interface AstTypesResult {
    types: ParsedType[];
    interfaces: ParsedInterface[];
}
/**
 * Parses the ast-types.ts file and extracts type definitions
 */
export declare function extractAstTypes(filePath?: string): AstTypesResult;
/**
 * Converts the parsed result to JSON string
 */
export declare function toJsonString(result: AstTypesResult, pretty?: boolean): string;
/**
 * Main entry point - extracts and returns JSON
 */
export declare function extractAstTypesAsJson(filePath?: string): string;
