import { deparseSync } from 'pgsql-parser';
import { type Alias, type CommonTableExpr, type DeleteStmt, type InsertStmt, type IntoClause, type JoinExpr, type JoinType, type Node, type OnConflictAction, type OnConflictClause, type OverridingKind, type RangeVar, type RawStmt, type SelectStmt, type SetOperation, type UpdateStmt, type WithClause } from '../ast-types.js';
import { JOIN_METHOD_MAP, LOCK_STRENGTH_METHOD, SET_OP_METHOD } from '../constants.js';
import type { FunctionListType } from '../types.ts';
import { fallbackNode, normalizeNode, resolveNode, resolveNodeArray } from '../utils/resolvers.js';

const specialNodeQuery: Record<string, (node: any) => FunctionListType[]> = {
    InsertStmt: (rawNode): FunctionListType[] => {
        const result: FunctionListType[] = [];
        const node = normalizeNode<InsertStmt, "InsertStmt">("InsertStmt", rawNode);
        const tempFunction: FunctionListType = {
            name: 'insertInto',
            arguments: [],
            paramType: 'function'
        }

        if (node.InsertStmt.withClause) {
            result.push(...resolveNode({ WithClause: node.InsertStmt.withClause }));
        }
        if (node.InsertStmt.relation) {
            tempFunction.arguments.push([resolveNode({ RangeVar: node.InsertStmt.relation })]);
        }
        if (node.InsertStmt.cols && node.InsertStmt.cols.length > 0) {
            tempFunction.arguments.push({
                name: resolveNodeArray(node.InsertStmt.cols),
                arguments: [],
                paramType: 'array'
            });
        }
        result.push(tempFunction);
        if (node.InsertStmt.override) {
            const overrideMap: { [key in OverridingKind]: string | null } = {
                OVERRIDING_NOT_SET: null,
                OVERRIDING_USER_VALUE: 'OVERRIDING_USER_VALUE',
                OVERRIDING_SYSTEM_VALUE: 'OVERRIDING_SYSTEM_VALUE'
            };
            const overrideFunctionName = overrideMap[node.InsertStmt.override];
            if (overrideFunctionName) {
                result.push({
                    name: overrideFunctionName,
                    arguments: [],
                    paramType: 'string'
                });
            }
        }
        if (node.InsertStmt.selectStmt) {
            result.push(...resolveNode(node.InsertStmt.selectStmt));
        }
        if (node.InsertStmt.onConflictClause) {
            result.push(...resolveNode({ OnConflictClause: node.InsertStmt.onConflictClause }));
        }
        if (node.InsertStmt.returningList && node.InsertStmt.returningList.length > 0) {
            result.push({
                name: 'returning',
                arguments: resolveNodeArray(node.InsertStmt.returningList),
                paramType: 'function'
            });
        }

        return result;
    },
    UpdateStmt: (rawNode): FunctionListType[] => {
        const result: FunctionListType[] = [];
        const node = normalizeNode<UpdateStmt, "UpdateStmt">("UpdateStmt", rawNode);
        if (node.UpdateStmt.withClause) {
            result.push(...resolveNode({ WithClause: node.UpdateStmt.withClause }));
        }
        if (node.UpdateStmt.relation) {
            result.push({
                name: 'update',
                arguments: [resolveNode({ RangeVar: node.UpdateStmt.relation })],
                paramType: 'function'
            });
        }
        if (node.UpdateStmt.targetList && node.UpdateStmt.targetList.length > 0) {
            result.push({
                name: 'set',
                arguments: node.UpdateStmt.targetList.map((i) => {
                    if (Object.keys(i)[0] === "ResTarget") {
                        const deparsedName = deparseSync({
                            UpdateStmt: {
                                targetList: [
                                    {
                                        ResTarget: {
                                            ...(i as any).ResTarget,
                                            val: undefined,
                                        }
                                    }
                                ]
                            }
                        }).replaceAll(/\b(UPDATE|AS|SET)\b|=|\s+/gi, "").trim();
                        return [{
                            name: "op",
                            arguments: [
                                {
                                    name: "c",
                                    arguments: [deparsedName],
                                    paramType: "function",
                                },
                                {
                                    name: "=",
                                    arguments: [],
                                    paramType: "string",
                                },
                                ...((i as any).ResTarget.val ? [resolveNode((i as any).ResTarget.val)] : []),
                            ],
                            paramType: "function",
                        }]
                    } else {
                        return [resolveNode(i)];
                    }
                }),
                paramType: 'function'
            });
        }
        if (node.UpdateStmt.fromClause && node.UpdateStmt.fromClause.length > 0) {
            result.push({
                name: 'from',
                arguments: resolveNodeArray(node.UpdateStmt.fromClause),
                paramType: 'function'
            });
        }
        if (node.UpdateStmt.whereClause) {
            result.push({
                name: 'where',
                arguments: resolveNode(node.UpdateStmt.whereClause),
                paramType: 'function'
            });
        }
        if (node.UpdateStmt.returningList && node.UpdateStmt.returningList.length > 0) {
            result.push({
                name: 'returning',
                arguments: resolveNodeArray(node.UpdateStmt.returningList),
                paramType: 'function'
            });
        }
        return result;

    },
    DeleteStmt: (rawNode: any): FunctionListType[] => {
        const result: FunctionListType[] = [];
        const node = normalizeNode<DeleteStmt, "DeleteStmt">("DeleteStmt", rawNode);
        const tempFunction: FunctionListType = {
            name: 'delete',
            arguments: [],
            paramType: 'function'
        }

        if (node.DeleteStmt.withClause) {
            result.unshift(...resolveNode({ WithClause: node.DeleteStmt.withClause }));
        }
        if (node.DeleteStmt.relation) {
            result.push(...resolveNode(node.DeleteStmt.relation));
        }
        result.push(tempFunction);
        if (node.DeleteStmt.usingClause && node.DeleteStmt.usingClause.length > 0) {
            result.push(...resolveNode({ UsingClause: node.DeleteStmt.usingClause }));
        }
        if (node.DeleteStmt.whereClause) {
            result.push({
                name: 'where',
                arguments: resolveNode(node.DeleteStmt.whereClause),
                paramType: 'function'
            });
        }
        if (node.DeleteStmt.returningList && node.DeleteStmt.returningList.length > 0) {
            result.push({
                name: 'returning',
                arguments: resolveNodeArray(node.DeleteStmt.returningList),
                paramType: 'function'
            });
        }
        return result;

    },
    OnConflictClause: (rawNode: any): FunctionListType[] => {
        const result: FunctionListType[] = [];
        const node = normalizeNode<OnConflictClause, "OnConflictClause">("OnConflictClause", rawNode);
        if (node.OnConflictClause.infer) {
            const tempFunction: FunctionListType = {
                name: 'onConflict',
                arguments: [],
                paramType: 'function'
            };
            if (node.OnConflictClause.infer.indexElems && node.OnConflictClause.infer.indexElems.length > 0) {
                tempFunction.arguments.push({
                    name: node.OnConflictClause.infer.indexElems.map((i) => [resolveNode(i)]),
                    arguments: [],
                    paramType: 'array'
                });
            }
            result.push(tempFunction);
            if (node.OnConflictClause.infer.conname) {
                result.push({
                    name: "onConstraint",
                    arguments: [{
                        name: "i",
                        arguments: [node.OnConflictClause.infer.conname],
                        paramType: "function"
                    }],
                    paramType: 'function'
                })
            }
            if (node.OnConflictClause.infer.whereClause) {
                result.push({
                    name: "where",
                    arguments: resolveNode(node.OnConflictClause.infer.whereClause),
                    paramType: 'function'
                })
            }
        }
        if (node.OnConflictClause.action) {
            if (node.OnConflictClause.action === 'ONCONFLICT_UPDATE') {
                result.push({
                    name: 'doUpdate',
                    arguments: [],
                    paramType: 'function'
                });
            } else if (node.OnConflictClause.action === 'ONCONFLICT_NOTHING') {
                result.push({
                    name: 'doNothing',
                    arguments: [],
                    paramType: 'function'
                });
            }
        }
        if (node.OnConflictClause.targetList && node.OnConflictClause.targetList.length > 0) {
            result.push({
                name: 'set',
                arguments: node.OnConflictClause.targetList.map((i) => {
                    if (Object.keys(i)[0] === "ResTarget") {
                        const deparsedName = deparseSync({
                            UpdateStmt: {
                                targetList: [
                                    {
                                        ResTarget: {
                                            ...(i as any).ResTarget,
                                            val: undefined,
                                        }
                                    }
                                ]
                            }
                        }).replaceAll(/\b(UPDATE|AS|SET)\b|=|\s+/gi, "").trim();
                        return [{
                            name: "op",
                            arguments: [
                                {
                                    name: "i",
                                    arguments: [deparsedName],
                                    paramType: "function",
                                },
                                {
                                    name: "=",
                                    arguments: [],
                                    paramType: "string",
                                },
                                ...((i as any).ResTarget.val ? [resolveNode((i as any).ResTarget.val)] : []),
                            ],
                            paramType: "function",
                        }]
                    } else {
                        return [resolveNode(i)];
                    }
                }),
                paramType: 'function'
            });
        }
        if (node.OnConflictClause.whereClause) {
            result.push({
                name: 'where',
                arguments: resolveNode(node.OnConflictClause.whereClause),
                paramType: 'function'
            });
        }
        return result;
    },
    SelectStmt: (rawNode: any): FunctionListType[] => {
        const result: FunctionListType[] = [];
        const node = normalizeNode<SelectStmt, "SelectStmt">("SelectStmt", rawNode);
        if (node.SelectStmt.withClause) {
            result.push(...resolveNode({ WithClause: node.SelectStmt.withClause }));
        }
        if (node.SelectStmt.op) {
            const opFunctionsMap: { [key in SetOperation]: string | null } = {
                "SETOP_EXCEPT": node.SelectStmt.all ? "exceptAll" : "except",
                "SETOP_NONE": null,
                "SETOP_UNION": node.SelectStmt.all ? "unionAll" : "union",
                "SETOP_INTERSECT": node.SelectStmt.all ? "intersectAll" : "intersect"
            }
            const opFunctionName = opFunctionsMap[node.SelectStmt.op];
            if (opFunctionName) {
                result.push({
                    name: opFunctionName,
                    arguments: [
                        ...(node.SelectStmt.larg ? [resolveNode({ SelectStmt: node.SelectStmt.larg })] : []),
                        ...(node.SelectStmt.rarg ? [resolveNode({ SelectStmt: node.SelectStmt.rarg })] : [])
                    ],
                    paramType: 'function'
                });
            }
        }
        let tempFunction: FunctionListType = {
            name: 'select',
            arguments: [],
            paramType: 'function'
        };
        if (node.SelectStmt.distinctClause) {
            if (node.SelectStmt.distinctClause[0] && Object.keys(node.SelectStmt.distinctClause[0]).length == 0) {
                tempFunction = {
                    name: 'selectDistinct',
                    arguments: [],
                    paramType: 'function'
                }
            } else if (node.SelectStmt.distinctClause.length > 0) {
                tempFunction = {
                    name: 'selectDistinctOn',
                    arguments: [
                        {
                            name: node.SelectStmt.distinctClause.map((i) => resolveNode(i)),
                            arguments: [],
                            paramType: 'array'
                        }
                    ],
                    paramType: 'function'
                }
            }
        }
        if (node.SelectStmt.targetList && node.SelectStmt.targetList.length > 0) {
            let tempParam: FunctionListType['arguments'] = []
            if (tempFunction.name == "selectDistinctOn") {
                tempParam.push({
                    name: node.SelectStmt.targetList.map((i) => [resolveNode(i)]),
                    arguments: [],
                    paramType: 'array'
                })
            } else {
                tempParam.push(...node.SelectStmt.targetList.map((i) => [resolveNode(i)]));
            }
            tempFunction.arguments.push(...tempParam);
            result.push(tempFunction);
        }
        if (node.SelectStmt.intoClause) {
            result.push({
                name: 'into',
                arguments: resolveNode({ IntoClause: node.SelectStmt.intoClause }),
                paramType: 'function'
            });
        }
        if (node.SelectStmt.fromClause && node.SelectStmt.fromClause.length > 0) {
            const tempAfterFromFunctions: FunctionListType[] = [];
            const tableFromJoinExpr: FunctionListType[][] = []
            const resolved = node.SelectStmt.fromClause.filter(i => {
                if (Object.keys(i)[0] === "JoinExpr") {
                    tableFromJoinExpr.push(resolveNode((i as any).JoinExpr.larg));
                    tempAfterFromFunctions.push(...resolveNode({ JoinExpr: { ...(i as any).JoinExpr, larg: undefined } }));
                    return false;
                } else return true
            })            
            result.push({
                name: 'from',
                arguments: [[...resolveNodeArray(resolved), ...tableFromJoinExpr]],
                paramType: 'function'
            });
            result.push(...tempAfterFromFunctions);
        }
        if (node.SelectStmt.whereClause) {
            result.push({
                name: 'where',
                arguments: [resolveNode(node.SelectStmt.whereClause)],
                paramType: 'function'
            });
        }
        if (node.SelectStmt.valuesLists && node.SelectStmt.valuesLists.length > 0) {
            result.push({
                name: 'values',
                arguments: node.SelectStmt.valuesLists.map((i) => {
                    return {
                        name: [resolveNode(i)],
                        arguments: [],
                        paramType: 'array'
                    }
                }),
                paramType: 'function'
            });
        }
        if (node.SelectStmt.groupClause && node.SelectStmt.groupClause.length > 0) {
            result.push({
                name: node.SelectStmt.groupDistinct ? 'groupByDistinct' : 'groupBy',
                arguments: resolveNodeArray(node.SelectStmt.groupClause),
                paramType: 'function'
            });
        }
        if (node.SelectStmt.havingClause) {
            result.push({
                name: 'having',
                arguments: resolveNode(node.SelectStmt.havingClause),
                paramType: 'function'
            });
        }
        if (node.SelectStmt.windowClause && node.SelectStmt.windowClause.length > 0) {
            result.push({
                name: 'window',
                arguments: resolveNodeArray(node.SelectStmt.windowClause),
                paramType: 'function'
            });
        }
        if (node.SelectStmt.sortClause && node.SelectStmt.sortClause.length > 0) {
            result.push({
                name: 'orderBy',
                arguments: [...node.SelectStmt.sortClause.map((i) => resolveNode(i))],
                paramType: 'function'
            });
        }
        if (node.SelectStmt.limitCount) {
            result.push({
                name: 'limit',
                arguments: resolveNode(node.SelectStmt.limitCount),
                paramType: 'function'
            });
        }
        if (node.SelectStmt.limitOffset) {
            result.push({
                name: 'offset',
                arguments: resolveNode(node.SelectStmt.limitOffset),
                paramType: 'function'
            });
        }
        // if (node.SelectStmt.limitOption == "LIMIT_OPTION_WITH_TIES") {
        //     result.push({
        //         name: 'withTies',
        //         arguments: [],
        //         paramType: 'function'
        //     });
        // }
        if (node.SelectStmt.lockingClause && node.SelectStmt.lockingClause.length > 0) {
            result.push(...resolveNodeArray(node.SelectStmt.lockingClause));
        }

        return result;
    },
    RangeVar: (rawNode: any): FunctionListType[] => {
        const result: FunctionListType[] = [];
        const node = normalizeNode<RangeVar, "RangeVar">("RangeVar", rawNode);
        const tempFunction: FunctionListType = {
            name: 't',
            arguments: [
                deparseSync({
                    RangeVar: {
                        ...node.RangeVar,
                        alias: undefined,
                    }
                }).trim()
            ],
            paramType: 'function'
        }
        result.push(tempFunction);
        if (node.RangeVar.alias) {
            result.push(...resolveNode({ Alias: node.RangeVar.alias }));
        }
        return result;
    },
    Alias: (rawNode: any): FunctionListType[] => {
        const result: FunctionListType[] = [];
        const node = normalizeNode<Alias, "Alias">("Alias", rawNode);
        if (node.Alias.aliasname) {
            result.push({
                name: 'as',
                arguments: [node.Alias.aliasname],
                paramType: 'function'
            });
        }
        if (node.Alias.colnames && node.Alias.colnames.length > 0) {
            result.push({
                name: 'as',
                arguments: resolveNodeArray(node.Alias.colnames),
                paramType: 'function'
            });
        }
        return result;
    },
    JoinExpr: (rawNode: any): FunctionListType[] => {
        let result: FunctionListType[] = [];
        const node = normalizeNode<JoinExpr, "JoinExpr">("JoinExpr", rawNode);
        let tempFunction: FunctionListType = {
            name: 'join',
            arguments: [],
            paramType: 'function'
        }

        if (node.JoinExpr.jointype) {
            const joinTypeMap: { [key in JoinType]: string | null } = {
                JOIN_INNER: 'join',
                JOIN_LEFT: 'leftJoin',
                JOIN_FULL: 'fullJoin',
                JOIN_RIGHT: 'rightJoin',
                JOIN_SEMI: null,
                JOIN_ANTI: null,
                JOIN_RIGHT_ANTI: null,
                JOIN_UNIQUE_OUTER: null,
                JOIN_UNIQUE_INNER: null,
            }
            let joinTypeName = joinTypeMap[node.JoinExpr.jointype]
            joinTypeName = joinTypeName == "join" && !node.JoinExpr.quals && !node.JoinExpr.isNatural ? "crossJoin" : joinTypeName;

            if (joinTypeName == null) return fallbackNode(node);
            else tempFunction.name = joinTypeName;
        }

        if (node.JoinExpr.isNatural && typeof tempFunction.name === "string") {
            tempFunction.name = `natural${tempFunction.name.charAt(0).toUpperCase()}${tempFunction.name.slice(1)}`;
        }
        if (node.JoinExpr.larg) {
            result.push(...resolveNode(node.JoinExpr.larg));
        }
        if (node.JoinExpr.rarg) {
            tempFunction.arguments.push(resolveNode(node.JoinExpr.rarg));
        }
        result.push(tempFunction);
        if (node.JoinExpr.quals) {
            result.push({
                name: 'on',
                arguments: resolveNode(node.JoinExpr.quals),
                paramType: 'function'
            });
        }
        if (node.JoinExpr.usingClause && node.JoinExpr.usingClause.length > 0) {
            result.push({
                name: 'using',
                arguments: resolveNodeArray(node.JoinExpr.usingClause),
                paramType: 'function'
            });
        }
        if (node.JoinExpr.join_using_alias) {
            result.push({
                name: 'as',
                arguments: [node.JoinExpr.join_using_alias.aliasname],
                paramType: 'function'
            });
        }
        if (node.JoinExpr.alias) {
            result = [{
                name: 'sub',
                arguments: [...result],
                paramType: 'function'
            }, {
                name: 'as',
                arguments: [node.JoinExpr.alias.aliasname],
                paramType: 'function'
            }]
        }
        return result;
    },
    WithClause: (rawNode: any): FunctionListType[] => {
        const result: FunctionListType[] = [];
        const node = normalizeNode<WithClause, "WithClause">("WithClause", rawNode);
        const tempFunction: FunctionListType = {
            name: node.WithClause.recursive ? 'withRecursive' : 'with',
            arguments: [],
            paramType: 'function'
        }
        if (node.WithClause.ctes && node.WithClause.ctes.length > 0) {
            tempFunction.arguments.push(resolveNodeArray(node.WithClause.ctes));
        }

        result.push(tempFunction);
        return result;
    },
    CommonTableExpr: (rawNode: any): FunctionListType[] => {
        const result: FunctionListType[] = [];
        const node = normalizeNode<CommonTableExpr, "CommonTableExpr">("CommonTableExpr", rawNode);
        let tempCteName: FunctionListType | null = null;
        let tempFunction: FunctionListType = {
            name: 'sub',
            arguments: [],
            paramType: 'function'
        }


        if (node.CommonTableExpr.ctequery) {
            if (node.CommonTableExpr.ctematerialized !== "CTEMaterializeDefault") {
                tempFunction.arguments.push({
                    name: 'r',
                    arguments: [
                        node.CommonTableExpr.ctematerialized == "CTEMaterializeAlways" ? 'MATERIALIZED' :
                            (node.CommonTableExpr.ctematerialized == "CTEMaterializeNever" ? 'NOT MATERIALIZED' : '')
                    ],
                    paramType: 'template-literal'
                });
            }
            tempFunction.arguments.push(resolveNode(node.CommonTableExpr.ctequery));
        }
        if (node.CommonTableExpr.ctename) {
            tempCteName = {
                name: 'i',
                arguments: [node.CommonTableExpr.ctename],
                paramType: 'function'
            }
            result.push(tempCteName);
            tempFunction = {
                name: 'as',
                arguments: [tempFunction],
                paramType: 'function'
            }
        }
        result.push(tempFunction);
        if (
            node.CommonTableExpr.search_clause ||
            node.CommonTableExpr.cycle_clause ||
            node.CommonTableExpr.cterecursive ||
            node.CommonTableExpr.cterefcount ||
            (node.CommonTableExpr.ctecolnames && node.CommonTableExpr.ctecolnames.length > 0) ||
            (node.CommonTableExpr.ctecoltypes && node.CommonTableExpr.ctecoltypes.length > 0) ||
            (node.CommonTableExpr.ctecoltypmods && node.CommonTableExpr.ctecoltypmods.length > 0) ||
            (node.CommonTableExpr.ctecolcollations && node.CommonTableExpr.ctecolcollations.length > 0)
        ) return fallbackNode(node);

        return result;


    },
    RawStmt: (rawNode: any): FunctionListType[] => {
        const result: FunctionListType[] = [];
        const node = normalizeNode<RawStmt, "RawStmt">("RawStmt", rawNode);
        if (node.RawStmt.stmt) {
            result.push(...resolveNode(node.RawStmt.stmt));
        }
        return result;
    }
};

export { specialNodeQuery };
