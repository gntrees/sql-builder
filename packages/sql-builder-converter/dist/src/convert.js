"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = convert;
const prettier = require("prettier");
const traverse_1 = require("@pgsql/traverse");
const pgsql_parser_1 = require("pgsql-parser");
const to_camel_case_js_1 = require("./utils/to-camel-case.js");
const DEFAULT_FORMAT_PARAM_HANDLER = 'pg';
const DEFAULT_EXEC_HANDLER = `async ({ sql, parameters, meta }): Promise<any> => {
    return "Executed";
}`;
const resolveRaw = (node, asFullRaw = false) => {
    const deparsed = (0, pgsql_parser_1.deparseSync)(node);
    let finalResult = [];
    finalResult.push({
        name: (0, to_camel_case_js_1.toCamelCase)("r"),
        arguments: [
            deparsed.trim()
        ],
        paramType: "template-literal"
    });
    return finalResult;
};
const resolveNode = (node, specialNode) => {
    const tag = Object.keys(node)[0];
    if (tag && specialNode[tag]) {
        return specialNode[tag](node);
    }
    else if (tag) {
        return resolveRaw(node);
    }
    else {
        throw new Error(`Unknown node type: ${JSON.stringify(node)}`);
    }
};
const normalizeNode = (node, key) => {
    const tag = Object.keys(node)[0];
    const currentNode = tag === key
        ? node
        : { [key]: node };
    return currentNode;
};
const specialNode = {
    SelectStmt: (node) => {
        const currentNode = normalizeNode(node, 'SelectStmt');
        const params = [];
        if (currentNode.SelectStmt.targetList && currentNode.SelectStmt.targetList.length > 0) {
            params.push(...currentNode.SelectStmt.targetList.map(t => {
                const resolved = resolveNode(t, specialNode);
                return resolved;
            }).flat());
        }
        return [{
                name: 'select',
                arguments: params,
                paramType: 'function'
            }];
    },
    ResTarget: (node) => {
        const currentNode = normalizeNode(node, 'ResTarget');
        if (currentNode.ResTarget.val) {
            return resolveNode(currentNode.ResTarget.val, specialNode);
        }
        return [];
    },
    ColumnRef: (node) => {
        const currentNode = normalizeNode(node, 'ColumnRef');
        const fields = [];
        if (currentNode.ColumnRef.fields && currentNode.ColumnRef.fields.length > 0) {
            const resolved = currentNode.ColumnRef.fields.map(f => {
                const resolved = resolveNode(f, specialNode);
                return resolved;
            }).flat();
            fields.push({
                name: "c",
                arguments: resolved,
                paramType: "function"
            });
        }
        return fields;
    },
    String: (node) => {
        const currentNode = normalizeNode(node, 'String');
        return [{
                name: currentNode.String.sval || "",
                arguments: [],
                paramType: "string"
            }];
    },
    FuncCall: (node) => {
        const currentNode = normalizeNode(node, 'FuncCall');
        const params = [];
        if (!currentNode.FuncCall.funcname || currentNode.FuncCall.funcname.length === 0) {
            return [];
        }
        if (currentNode.FuncCall.args && currentNode.FuncCall.args.length > 0) {
            currentNode.FuncCall.args.forEach(arg => {
                const resolved = resolveNode(arg, specialNode);
                params.push(...resolved);
            });
        }
        return [{
                name: (0, to_camel_case_js_1.toCamelCase)(currentNode.FuncCall.funcname.map(fn => {
                    const resolved = resolveNode(fn, specialNode);
                    return resolved.map(r => r.name.toUpperCase()).join('_');
                }).join('_')),
                arguments: params,
                paramType: "function"
            }];
    },
    A_Const: (node) => {
        const currentNode = normalizeNode(node, 'A_Const');
        const values = [];
        if (currentNode.A_Const.ival) {
            values.push({
                name: currentNode.A_Const.ival.ival?.toString() ?? "",
                arguments: [],
                paramType: "number"
            });
        }
        if (currentNode.A_Const.fval) {
            values.push({
                name: currentNode.A_Const.fval.fval?.toString() ?? "",
                arguments: [],
                paramType: "string"
            });
        }
        if (currentNode.A_Const.boolval) {
            values.push({
                name: currentNode.A_Const.boolval.boolval ? "true" : "false",
                arguments: [],
                paramType: "boolean"
            });
        }
        // bsval
        if (currentNode.A_Const.bsval) {
            values.push({
                name: currentNode.A_Const.bsval.bsval?.toString() ?? "",
                arguments: [],
                paramType: "string"
            });
        }
        if (currentNode.A_Const.sval) {
            values.push({
                name: currentNode.A_Const.sval.sval?.toString() ?? "",
                arguments: [],
                paramType: "string"
            });
        }
        if (currentNode.A_Const.isnull) {
            values.push({
                name: "NULL",
                arguments: [],
                paramType: "null"
            });
        }
        return values;
    },
    A_Expr: (node) => {
        const currentNode = normalizeNode(node, 'A_Expr');
        const value = resolveRaw(node, true);
        return value;
    }
};
const functionListToString = (fnList, baseQueryBuilder) => {
    const INDENT = "    ";
    function stringifyFunction(fn, asExpression = false) {
        const emitPrefix = asExpression ? `${baseQueryBuilder}` : '';
        if (fn.paramType === "function") {
            const argsArr = fn.arguments.map(stringifyArg);
            const multiline = argsArr.length > 2;
            if (multiline) {
                const normalizedArgs = argsArr.map(a => a.includes("\n")
                    ? a.split("\n").map((line, i) => (i === 0 ? line : INDENT + line)).join("\n")
                    : a);
                const joined = normalizedArgs.join(",\n" + INDENT);
                const body = `${fn.name}(\n${INDENT}${joined}\n)`;
                return asExpression ? `${emitPrefix}.${body}` : `.${body}`;
            }
            else {
                const args = argsArr.join(", ");
                const body = `${fn.name}(${args})`;
                return asExpression ? `${emitPrefix}.${body}` : `.${body}`;
            }
        }
        else if (fn.paramType === "template-literal") {
            const raw = fn.arguments[0];
            const content = typeof raw === "string"
                ? raw.replace(/`/g, "\\`").replace(/\\/g, "\\\\")
                : typeof raw === "object"
                    ? Array.isArray(raw)
                        ? raw.map(stringifyArg).join(", ")
                        : stringifyArg(raw)
                    : JSON.stringify(raw);
            return asExpression ? `${emitPrefix}.${fn.name}\`${content}\`` : `.${fn.name}\`${content}\``;
        }
        else if (fn.paramType === "string") {
            const content = (fn.name || "").toString().replace(/`/g, "\\`").replace(/\\/g, "\\\\");
            return `\`${content}\``;
        }
        else if (fn.paramType === "number" || fn.paramType === "boolean" || fn.paramType === "null") {
            const contentRaw = fn.paramType === "null" ? "null" : (fn.name ?? "");
            const content = contentRaw.toString().replace(/`/g, "\\`").replace(/\\/g, "\\\\");
            return asExpression ? `${content}` : `${content}`;
        }
        else {
            throw new Error(`Unknown paramType: ${fn.paramType}`);
        }
    }
    function stringifyArg(arg) {
        if (typeof arg === "string") {
            return `\`${arg.replace(/`/g, "\\`").replace(/\\/g, "\\\\")}\``;
        }
        if (arg === null || arg === undefined || typeof arg === "number" || typeof arg === "boolean") {
            return JSON.stringify(arg);
        }
        if (Array.isArray(arg)) {
            return `[${arg.map(stringifyArg).join(", ")}]`;
        }
        if (typeof arg === "object") {
            const maybeFn = arg;
            if (maybeFn && typeof maybeFn.name === "string" && typeof maybeFn.paramType === "string") {
                const res = stringifyFunction(maybeFn, true);
                if (res.includes("\n")) {
                    return res.split("\n").map((line, i) => (i === 0 ? line : INDENT + line)).join("\n");
                }
                return res;
            }
            return JSON.stringify(arg);
        }
        throw new Error(`Unknown argument type: ${typeof arg}`);
    }
    return fnList.map(fn => stringifyFunction(fn, false)).join("");
};
const walker = (specialNode, functionList) => {
    return (path) => {
        try {
            if (path.tag && path.tag in specialNode) {
                const handler = specialNode[path.tag];
                if (handler) {
                    const nodes = handler(path.node);
                    functionList.push(...nodes);
                }
                return false;
            }
            else {
                const nodes = resolveRaw(path.node);
                functionList.push(...nodes);
                return false;
            }
        }
        catch (error) {
            return false;
        }
    };
};
async function convert(sql, options = {}) {
    const formatParamHandler = options.formatParamHandler ?? DEFAULT_FORMAT_PARAM_HANDLER;
    const execHandler = options.execHandler ?? DEFAULT_EXEC_HANDLER;
    const ast = await (0, pgsql_parser_1.parse)(sql);
    const functionList = [];
    (0, traverse_1.walk)(ast, walker(specialNode, functionList));
    const baseQueryBuilder = 'q';
    const code = `import { sqlBuilder } from "@gntrees/sql-builder";

const q = sqlBuilder({
    formatParamHandler: "${formatParamHandler}",
    execHandler: ${execHandler},
});

const query = q${functionListToString(functionList, baseQueryBuilder)};
console.log(query.getSql());`;
    const formatted = await prettier.format(code, {
        parser: 'typescript',
    });
    return { code, formatted };
}
