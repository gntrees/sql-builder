"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeForTemplateLiteral = exports.resolveNodeArray = exports.normalizeNode = exports.fallbackNode = exports.resolveNode = exports.resolveRaw = void 0;
exports.toCamelCase = toCamelCase;
const pgsql_parser_1 = require("pgsql-parser");
const index_js_1 = require("../handlers/index.js");
const resolveRaw = (node, asFullRaw = false) => {
    const deparsed = (0, pgsql_parser_1.deparseSync)(node);
    let finalResult = [];
    finalResult.push({
        name: toCamelCase("r"),
        arguments: [
            deparsed.trim()
        ],
        paramType: "template-literal"
    });
    return finalResult;
};
exports.resolveRaw = resolveRaw;
const resolveNode = (node) => {
    if (Object.keys(node).length > 1) {
        // console.log(`Warning: Node has multiple keys, using raw resolver. Node: ${JSON.stringify(node)}`);
        return [];
    }
    else if (Object.keys(node)[0] === undefined) {
        // console.log(`Warning: Node has no keys, using raw resolver. Node: ${JSON.stringify(node)}`);
        return [];
    }
    const tag = Object.keys(node)[0];
    const resolver = index_js_1.specialNode[tag] ?? null;
    if (resolver) {
        return resolver(node);
    }
    else {
        return (0, exports.resolveRaw)(node);
    }
};
exports.resolveNode = resolveNode;
const fallbackNode = (node) => {
    const raw = (0, exports.resolveRaw)(node);
    console.log(`No resolver found for ${Object.keys(node)[0]}, raw : ${(0, pgsql_parser_1.deparseSync)(node)}`);
    return raw;
};
exports.fallbackNode = fallbackNode;
const normalizeNode = (key, node) => {
    const tag = Object.keys(node)[0];
    const currentNode = tag === key
        ? node
        : { [key]: node };
    return currentNode;
};
exports.normalizeNode = normalizeNode;
const resolveNodeArray = (nodes) => {
    const params = [];
    for (const item of nodes) {
        const resolved = (0, exports.resolveNode)(item);
        params.push(...resolved);
    }
    return params;
};
exports.resolveNodeArray = resolveNodeArray;
const escapeForTemplateLiteral = (str) => {
    return str.replace(/`/g, "\\`").replace(/\\/g, "\\\\");
};
exports.escapeForTemplateLiteral = escapeForTemplateLiteral;
// export const createAliasedTableRaw = (tableName: string, alias: string): FunctionListType => {
//     return {
//         name: 'r',
//         arguments: [`${tableName} AS ${alias}`],
//         paramType: 'template-literal'
//     };
// };
function toCamelCase(str) {
    return str.split(/[_-]+/)
        .map((word, index) => {
        if (index === 0) {
            return word.toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
        .join('');
}
