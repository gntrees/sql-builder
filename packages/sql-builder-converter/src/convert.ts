import type { Walker } from '@pgsql/traverse';
import type { A_Const, A_Expr, BoolExpr, ColumnRef, FuncCall, JoinExpr, Node, RangeVar, ResTarget, SelectStmt, SortBy, String } from '@pgsql/types';
import * as prettier from "prettier";

import { NodePath, walk } from '@pgsql/traverse';
import { deparseSync, parse } from 'pgsql-parser';
import { toCamelCase } from './utils/to-camel-case.js';
import type { ConvertOptions, FunctionListType } from './types.js';

const DEFAULT_FORMAT_PARAM_HANDLER = 'pg';
const DEFAULT_EXEC_HANDLER = `async ({ sql, parameters, meta }): Promise<any> => {
    return "Executed";
}`;

const resolveRaw = (node: Node, asFullRaw: boolean = false): FunctionListType[] => {
    const deparsed = deparseSync(node);
    let finalResult: FunctionListType[] = [];
    finalResult.push({
        name: toCamelCase("r"),
        arguments: [
            deparsed.trim()
        ],
        paramType: "template-literal"
    });
    return finalResult;
};

const resolveNode = (node: Node, specialNode: Record<string, (node: Node) => FunctionListType[]>): FunctionListType[] => {
    const tag = Object.keys(node)[0];
    if (tag && specialNode[tag]) {
        return specialNode[tag](node);
    } else if (tag) {
        return resolveRaw(node);
    } else {
        throw new Error(`Unknown node type: ${JSON.stringify(node)}`);
    }
};

const normalizeNode = <T, K extends string>(node: any, key: K): { [P in K]: T } => {
    const tag = Object.keys(node)[0];
    const currentNode = tag === key
        ? (node as { [P in K]: T })
        : ({ [key]: node as T } as { [P in K]: T });
    return currentNode;
};

const specialNode = {
    SelectStmt: (node: Node): FunctionListType[] => {
        const currentNode = normalizeNode<SelectStmt, "SelectStmt">(node, 'SelectStmt');
        const results: FunctionListType[] = [];

        const selectMethodName = currentNode.SelectStmt.distinctClause ? 'selectDistinct' : 'select';

        const selectParams: FunctionListType['arguments'] = [];
        if (currentNode.SelectStmt.targetList && currentNode.SelectStmt.targetList.length > 0) {
            for (const t of currentNode.SelectStmt.targetList) {
                const resolved = resolveNode(t, specialNode);
                selectParams.push(...resolved);
            }
        }

        results.push({
            name: selectMethodName,
            arguments: selectParams,
            paramType: 'function'
        });

        if (currentNode.SelectStmt.fromClause && currentNode.SelectStmt.fromClause.length > 0) {
            for (const fromItem of currentNode.SelectStmt.fromClause) {
                const fromKey = Object.keys(fromItem)[0];

                if (fromKey === 'RangeVar') {
                    results.push(...resolveNode(fromItem, specialNode));
                } else if (fromKey === 'JoinExpr') {
                    results.push(...resolveNode(fromItem, specialNode));
                } else if (fromKey === 'FromExpr') {
                    const fromExpr = (fromItem as any)[fromKey];
                    if (fromExpr.fromlist) {
                        for (const item of fromExpr.fromlist) {
                            results.push(...resolveNode(item, specialNode));
                        }
                    }
                }
            }
        }

        if (currentNode.SelectStmt.whereClause) {
            const where = resolveNode(currentNode.SelectStmt.whereClause, specialNode);
            results.push({
                name: 'where',
                arguments: where,
                paramType: 'function'
            });
        }

        if (currentNode.SelectStmt.groupClause && currentNode.SelectStmt.groupClause.length > 0) {
            const groupByParams: FunctionListType['arguments'] = [];
            for (const groupItem of currentNode.SelectStmt.groupClause) {
                const resolved = resolveNode(groupItem, specialNode);
                groupByParams.push(...resolved);
            }
            results.push({
                name: 'groupBy',
                arguments: groupByParams,
                paramType: 'function'
            });
        }

        if (currentNode.SelectStmt.havingClause) {
            const having = resolveNode(currentNode.SelectStmt.havingClause, specialNode);
            results.push({
                name: 'having',
                arguments: having,
                paramType: 'function'
            });
        }

        if (currentNode.SelectStmt.sortClause && currentNode.SelectStmt.sortClause.length > 0) {
            const orderByParams: FunctionListType['arguments'] = [];
            for (const sortItem of currentNode.SelectStmt.sortClause) {
                const resolved = resolveNode(sortItem, specialNode);
                orderByParams.push(...resolved);
            }
            results.push({
                name: 'orderBy',
                arguments: orderByParams,
                paramType: 'function'
            });
        }

        if (currentNode.SelectStmt.limitCount) {
            // Use raw expression for LIMIT to avoid parameterization
            const limitRaw = resolveRaw(currentNode.SelectStmt.limitCount);
            results.push({
                name: 'limit',
                arguments: limitRaw,
                paramType: 'function'
            });
        }

        if (currentNode.SelectStmt.limitOffset) {
            // Use raw expression for OFFSET to avoid parameterization
            const offsetRaw = resolveRaw(currentNode.SelectStmt.limitOffset);
            results.push({
                name: 'offset',
                arguments: offsetRaw,
                paramType: 'function'
            });
        }

        return results;
    },
    ResTarget: (node: Node): FunctionListType[] => {
        const currentNode = normalizeNode<ResTarget, "ResTarget">(node, 'ResTarget');

        if (currentNode.ResTarget.val) {
            const resolved = resolveNode(currentNode.ResTarget.val, specialNode);

            // Add alias if present
            if (currentNode.ResTarget.name && resolved.length > 0) {
                const baseExpr = resolved[0];
                if (baseExpr && typeof baseExpr === 'object' && 'name' in baseExpr) {
                    // For aliases, we need to use a special paramType that generates .as() chaining
                    // We'll use 'as' paramType to indicate this should be chained with .as()
                    return [{
                        name: 'as_wrapper',
                        arguments: [baseExpr, currentNode.ResTarget.name],
                        paramType: 'as-chaining'
                    }];
                }
            }

            return resolved;
        }
        return [];
    },
    ColumnRef: (node: Node): FunctionListType[] => {
        const currentNode = normalizeNode<ColumnRef, "ColumnRef">(node, 'ColumnRef');
        const fields: FunctionListType[] = [];
        if (currentNode.ColumnRef.fields && currentNode.ColumnRef.fields.length > 0) {
            const resolved = currentNode.ColumnRef.fields.map(f => {
                const resolved = resolveNode(f, specialNode);
                return resolved
            }).flat();

            // Use 'i' for qualified column names (table.column), 'c' for simple columns
            if (resolved.length > 1) {
                // Join the field names with dots for qualified references
                const qualifiedName = resolved.map(r => typeof r === 'string' ? r : r.name).join('.');
                fields.push({
                    name: 'i',
                    arguments: [qualifiedName],
                    paramType: 'function'
                });
            } else {
                fields.push({
                    name: 'c',
                    arguments: resolved,
                    paramType: 'function'
                });
            }
        }
        return fields;
    },
    String: (node: Node): FunctionListType[] => {
        const currentNode = normalizeNode<String, "String">(node, 'String');
        return [{
            name: currentNode.String.sval || "",
            arguments: [],
            paramType: "string"
        }];
    },
    FuncCall: (node: Node): FunctionListType[] => {
        const currentNode = normalizeNode<FuncCall, "FuncCall">(node, 'FuncCall');
        const params: FunctionListType['arguments'] = [];
        if (!currentNode.FuncCall.funcname || currentNode.FuncCall.funcname.length === 0) {
            return [];
        }
        // Handle COUNT(*) - agg_star indicates the function takes * as argument
        if (currentNode.FuncCall.agg_star) {
            params.push({
                name: 'r',
                arguments: ['*'],
                paramType: 'template-literal'
            });
        } else if (currentNode.FuncCall.args && currentNode.FuncCall.args.length > 0) {
            currentNode.FuncCall.args.forEach(arg => {
                const resolved = resolveNode(arg, specialNode);
                params.push(...resolved);
            });
        }
        return [{
            name: toCamelCase(currentNode.FuncCall.funcname.map(fn => {
                const resolved = resolveNode(fn, specialNode);
                return resolved.map(r => r.name.toUpperCase()).join('_');
            }).join('_')),
            arguments: params,
            paramType: "function"
        }];
    },
    A_Const: (node: Node): FunctionListType[] => {
        const currentNode = normalizeNode<A_Const, "A_Const">(node, 'A_Const');
        const values: FunctionListType[] = [];
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
    A_Expr: (node: Node): FunctionListType[] => {
        const currentNode = normalizeNode<A_Expr, "A_Expr">(node, 'A_Expr');
        const value = resolveRaw(node, true);
        return value
    },
    RangeVar: (node: Node): FunctionListType[] => {
        const currentNode = normalizeNode<RangeVar, "RangeVar">(node, 'RangeVar');
        const tableName = currentNode.RangeVar.relname || '';
        const alias = currentNode.RangeVar.alias?.aliasname;

        // Use from with raw expression if there's an alias
        if (alias) {
            return [{
                name: 'from',
                arguments: [{
                    name: 'r',
                    arguments: [`${tableName} AS ${alias}`],
                    paramType: 'template-literal'
                }],
                paramType: 'function'
            }];
        }

        return [{
            name: 'from',
            arguments: [tableName],
            paramType: 'function'
        }];
    },
    JoinExpr: (node: Node): FunctionListType[] => {
        const currentNode = normalizeNode<JoinExpr, "JoinExpr">(node, 'JoinExpr');
        const jointype = currentNode.JoinExpr.jointype || 'JOIN_INNER';

        // Detect CROSS JOIN: JOIN_INNER without quals is actually CROSS JOIN
        const isCrossJoin = jointype === 'JOIN_INNER' && !currentNode.JoinExpr.quals;

        const joinMethodMap: Record<string, string> = {
            'JOIN_INNER': 'innerJoin',
            'JOIN_LEFT': 'leftJoin',
            'JOIN_RIGHT': 'rightJoin',
            'JOIN_FULL': 'fullJoin',
            'JOIN_CROSS': 'crossJoin',
        };

        const methodName = isCrossJoin ? 'crossJoin' : (joinMethodMap[jointype] || 'innerJoin');

        const results: FunctionListType[] = [];

        // Handle larg (left argument) which should be a FROM clause
        if (currentNode.JoinExpr.larg) {
            const largKey = Object.keys(currentNode.JoinExpr.larg)[0];
            if (largKey === 'RangeVar') {
                results.push(...resolveNode(currentNode.JoinExpr.larg, specialNode));
            } else if (largKey === 'JoinExpr') {
                results.push(...resolveNode(currentNode.JoinExpr.larg, specialNode));
            }
        }

        const tableNode = currentNode.JoinExpr.rarg;
        if (!tableNode) return results;

        const tableKey = Object.keys(tableNode)[0];

        // Handle rarg (right argument) - extract table name and alias
        if (tableKey === 'RangeVar') {
            const rangeVar = (tableNode as any).RangeVar;
            const tableName = rangeVar?.relname || '';
            const alias = rangeVar?.alias?.aliasname;

            const args: FunctionListType['arguments'] = [];

            // Use raw expression for aliased tables
            if (alias) {
                args.push({
                    name: 'r',
                    arguments: [`${tableName} AS ${alias}`],
                    paramType: 'template-literal'
                });
            } else {
                args.push(tableName);
            }

            if (currentNode.JoinExpr.quals) {
                const quals = resolveNode(currentNode.JoinExpr.quals, specialNode);
                args.push(...quals);
            }

            results.push({
                name: methodName,
                arguments: args,
                paramType: 'function'
            });
        } else if (tableKey === 'Alias') {
            const aliasNode = (tableNode as any).Alias;
            if (aliasNode && aliasNode.aliascolnames && aliasNode.aliascolnames.length > 0) {
                const resolved = resolveNode(aliasNode.aliascolnames[0], specialNode);
                const tableName = resolved[0]?.name?.toString() || '';

                const args: FunctionListType['arguments'] = [tableName];

                if (currentNode.JoinExpr.quals) {
                    const quals = resolveNode(currentNode.JoinExpr.quals, specialNode);
                    args.push(...quals);
                }

                results.push({
                    name: methodName,
                    arguments: args,
                    paramType: 'function'
                });
            }
        }

        return results;
    },
    BoolExpr: (node: Node): FunctionListType[] => {
        const currentNode = normalizeNode<BoolExpr, "BoolExpr">(node, 'BoolExpr');
        const boolop = currentNode.BoolExpr.boolop || 'AND_EXPR';

        const methodName = boolop === 'AND_EXPR' ? 'and' : 'or';

        const args = currentNode.BoolExpr.args?.map(arg => resolveNode(arg, specialNode)).flat() || [];

        return [{
            name: methodName,
            arguments: args,
            paramType: 'function'
        }];
    },
    SortBy: (node: Node): FunctionListType[] => {
        const currentNode = normalizeNode<SortBy, "SortBy">(node, 'SortBy');
        const sortDir = currentNode.SortBy.sortby_dir || 'SORTBY_DEFAULT';

        const expr = currentNode.SortBy.node;
        if (!expr) return [];

        const resolved = resolveNode(expr, specialNode);
        const baseExpr = resolved[0];

        if (!baseExpr) return [];

        if (sortDir === 'SORTBY_DESC') {
            return [{
                name: 'desc',
                arguments: [baseExpr],
                paramType: 'function'
            }];
        } else if (sortDir === 'SORTBY_ASC') {
            return [{
                name: 'asc',
                arguments: [baseExpr],
                paramType: 'function'
            }];
        }

        return resolved;
    }
};

const functionListToString = (fnList: FunctionListType[], baseQueryBuilder: string): string => {
    const INDENT = "    ";

    function stringifyFunction(fn: FunctionListType, asExpression = false): string {
        const emitPrefix = asExpression ? `${baseQueryBuilder}` : '';
        if (fn.paramType === "function") {
            const argsArr = fn.arguments.map(stringifyArg);
            const multiline = argsArr.length > 2;

            if (multiline) {
                const normalizedArgs = argsArr.map(a =>
                    a.includes("\n")
                        ? a.split("\n").map((line, i) => (i === 0 ? line : INDENT + line)).join("\n")
                        : a
                );
                const joined = normalizedArgs.join(",\n" + INDENT);
                const body = `${fn.name}(\n${INDENT}${joined}\n)`;
                return asExpression ? `${emitPrefix}.${body}` : `.${body}`;
            } else {
                const args = argsArr.join(", ");
                const body = `${fn.name}(${args})`;
                return asExpression ? `${emitPrefix}.${body}` : `.${body}`;
            }
        } else if (fn.paramType === "template-literal") {
            const raw = fn.arguments[0];
            const content =
                typeof raw === "string"
                    ? raw.replace(/`/g, "\\`").replace(/\\/g, "\\\\")
                    : typeof raw === "object"
                        ? Array.isArray(raw)
                            ? raw.map(stringifyArg).join(", ")
                            : stringifyArg(raw)
                        : JSON.stringify(raw);
            return asExpression ? `${emitPrefix}.${fn.name}\`${content}\`` : `.${fn.name}\`${content}\``;
        } else if (fn.paramType === "as-chaining") {
            // Generate .as() chaining: expression.as('alias')
            const baseExpr = fn.arguments[0];
            const alias = fn.arguments[1];
            const baseStr = stringifyArg(baseExpr);
            const aliasStr = typeof alias === 'string' ? `\`${alias}\`` : stringifyArg(alias);
            return `${baseStr}.as(${aliasStr})`;
        } else if (fn.paramType === "string") {
            const content = (fn.name || "").toString().replace(/`/g, "\\`").replace(/\\/g, "\\\\");
            return `\`${content}\``;
        } else if (fn.paramType === "number" || fn.paramType === "boolean" || fn.paramType === "null") {
            const contentRaw = fn.paramType === "null" ? "null" : (fn.name ?? "");
            const content = contentRaw.toString().replace(/`/g, "\\`").replace(/\\/g, "\\\\");
            return asExpression ? `${content}` : `${content}`;
        } else {
            throw new Error(`Unknown paramType: ${(fn as any).paramType}`);
        }
    }

    function stringifyArg(arg: any): string {
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
            const maybeFn = arg as FunctionListType;
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

const walker: (specialNode: Record<string, (node: Node) => FunctionListType[]>, functionList: FunctionListType[]) => Walker = (specialNode, functionList) => {
    return (path: NodePath) => {
        try {
            if (path.tag && path.tag in specialNode) {
                const handler = specialNode[path.tag];
                if (handler) {
                    const nodes = handler(path.node);
                    functionList.push(...nodes);
                }
                return false;
            } else {
                const nodes = resolveRaw(path.node);
                functionList.push(...nodes);
                return false;
            }
        } catch (error) {
            return false;
        }
    };
};

export interface ConvertResult {
    code: string;
    formatted: string;
}

export async function convert(sql: string, options: ConvertOptions = {}): Promise<ConvertResult> {
    const formatParamHandler = options.formatParamHandler ?? DEFAULT_FORMAT_PARAM_HANDLER;
    const execHandler = options.execHandler ?? DEFAULT_EXEC_HANDLER;

    const ast = await parse(sql);
    const functionList: FunctionListType[] = [];

    walk(ast, walker(specialNode, functionList));

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
