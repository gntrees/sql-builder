import { deparseSync } from 'pgsql-parser';
import { specialNode } from '../handlers/index.js';
export const resolveRaw = (node, asFullRaw = false) => {
    const deparsed = deparseSync(node);
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
export const resolveNode = (node) => {
    if (Object.keys(node).length > 1) {
        // console.log(`Warning: Node has multiple keys, using raw resolver. Node: ${JSON.stringify(node)}`);
        return [];
    }
    else if (Object.keys(node)[0] === undefined) {
        // console.log(`Warning: Node has no keys, using raw resolver. Node: ${JSON.stringify(node)}`);
        return [];
    }
    const tag = Object.keys(node)[0];
    const resolver = specialNode[tag] ?? null;
    if (resolver) {
        return resolver(node);
    }
    else {
        return resolveRaw(node);
    }
};
export const fallbackNode = (node) => {
    const raw = resolveRaw(node);
    console.log(`No resolver found for ${Object.keys(node)[0]}, raw : ${deparseSync(node)}`);
    return raw;
};
export const normalizeNode = (key, node) => {
    const tag = Object.keys(node)[0];
    const currentNode = tag === key
        ? node
        : { [key]: node };
    return currentNode;
};
export const resolveNodeArray = (nodes) => {
    const params = [];
    for (const item of nodes) {
        const resolved = resolveNode(item);
        params.push(...resolved);
    }
    return params;
};
export const escapeForTemplateLiteral = (str) => {
    return str.replace(/`/g, "\\`").replace(/\\/g, "\\\\");
};
// export const createAliasedTableRaw = (tableName: string, alias: string): FunctionListType => {
//     return {
//         name: 'r',
//         arguments: [`${tableName} AS ${alias}`],
//         paramType: 'template-literal'
//     };
// };
export function toCamelCase(str) {
    return str.split(/[_-]+/)
        .map((word, index) => {
        if (index === 0) {
            return word.toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
        .join('');
}
