"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractAstTypes = extractAstTypes;
exports.toJsonString = toJsonString;
exports.extractAstTypesAsJson = extractAstTypesAsJson;
/**
 * Extracts type information from ast-types.ts and converts to JSON format
 * where all values are represented as string arrays.
 */
const fs_1 = require("fs");
const path_1 = require("path");
/**
 * Extracts union type values from a type definition string
 * Example: "QSRC_ORIGINAL" | "QSRC_PARSER" | "QSRC_PARSER"
 *   => ["QSRC_ORIGINAL", "QSRC_PARSER", "QSRC_PARSER"]
 */
function extractUnionValues(typeStr) {
    // Match string literals in the type definition
    const stringLiteralRegex = /"([^"]+)"/g;
    const matches = typeStr.matchAll(stringLiteralRegex);
    if (!matches)
        return [];
    return Array.from(matches, m => m[1]).filter(i => i !== undefined);
}
/**
 * Extracts the type name from a property definition
 * Example: "name?: string;" => "string"
 * Example: "items?: Node[];" => "Node[]"
 * Example: "kind?: A_Expr_Kind;" => "A_Expr_Kind"
 */
function extractPropertyType(propDef) {
    // Remove optional marker
    const cleaned = propDef.replace(/\?/g, '');
    // Match everything after the colon and before semicolon/end
    const typeMatch = cleaned.match(/:\s*([^;=]+)/);
    if (!typeMatch)
        return [];
    let typeStr = typeMatch[1]?.trim();
    if (!typeStr)
        return [];
    // Handle array types: Node[] => ["Node[]"]
    if (typeStr.endsWith('[]')) {
        return [typeStr];
    }
    // Handle bigint type
    if (typeStr === 'bigint') {
        return ['bigint'];
    }
    // For union types or reference types, return the raw type as a single element
    return [typeStr];
}
/**
 * Parses the ast-types.ts file and extracts type definitions
 */
function extractAstTypes(filePath) {
    const astTypesPath = filePath || (0, path_1.join)(process.cwd(), 'src', 'ast-types.ts');
    const content = (0, fs_1.readFileSync)(astTypesPath, 'utf-8');
    const result = {
        types: [],
        interfaces: []
    };
    // Parse union type definitions
    // Pattern: export type TypeName = "VAL1" | "VAL2" | "VAL3";
    const typeRegex = /export type (\w+)\s*=\s*([^;]+);/g;
    for (const match of content.matchAll(typeRegex)) {
        const name = match[1];
        const typeDef = match[2];
        if (!name || !typeDef)
            continue;
        const values = extractUnionValues(typeDef);
        result.types.push({ name, values });
    }
    // Parse interface definitions
    // Pattern: export interface InterfaceName {
    //   prop?: type;
    // }
    const interfaceRegex = /export interface (\w+)\s*\{([^}]+)\}/gs;
    for (const match of content.matchAll(interfaceRegex)) {
        const name = match[1];
        const body = match[2];
        if (!name || !body)
            continue;
        const properties = {};
        // Split by semicolons and parse each property
        const propLines = body.split(';').filter(line => line.trim());
        for (const propLine of propLines) {
            const trimmed = propLine.trim();
            if (!trimmed)
                continue;
            // Extract property name (before colon or ?)
            const propNameMatch = trimmed.match(/^(\w+)/);
            if (!propNameMatch)
                continue;
            const propName = propNameMatch[1];
            if (!propName)
                continue;
            const propTypes = extractPropertyType(trimmed);
            if (propTypes.length > 0) {
                properties[propName] = propTypes;
            }
        }
        result.interfaces.push({ name, properties });
    }
    return result;
}
/**
 * Converts the parsed result to JSON string
 */
function toJsonString(result, pretty = true) {
    return pretty ? JSON.stringify(result, null, 2) : JSON.stringify(result);
}
/**
 * Main entry point - extracts and returns JSON
 */
function extractAstTypesAsJson(filePath) {
    const result = extractAstTypes(filePath);
    return toJsonString(result);
}
function main() {
    const jsonOutput = extractAstTypesAsJson();
    // write file 
    const outputPath = (0, path_1.join)(__dirname, './../generated/ast-types.json');
    (0, fs_1.writeFileSync)(outputPath, jsonOutput, 'utf-8');
    console.log(`Extracted AST types written to ${outputPath}`);
}
main();
