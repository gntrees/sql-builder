"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.specialNodeExpressions = void 0;
const pgsql_parser_1 = require("pgsql-parser");
const constants_js_1 = require("../constants.js");
const resolvers_js_1 = require("../utils/resolvers.js");
const specialNodeExpressions = {
    A_Star: (rawNode) => {
        return [
            {
                name: "*",
                arguments: [],
                paramType: "string",
            },
        ];
    },
    A_Expr: (rawNode) => {
        let result = [
            {
                name: "op",
                arguments: [],
                paramType: "function",
            },
        ];
        const opNames = {
            AEXPR_OP: null,
            AEXPR_OP_ANY: "ANY",
            AEXPR_OP_ALL: "ALL",
            AEXPR_DISTINCT: "DISTINCT",
            AEXPR_NOT_DISTINCT: "NOT_DISTINCT",
            AEXPR_NULLIF: "NULLIF",
            AEXPR_IN: "IN",
            AEXPR_LIKE: "LIKE",
            AEXPR_ILIKE: "ILIKE",
            AEXPR_SIMILAR: "SIMILAR",
            AEXPR_BETWEEN: "BETWEEN",
            AEXPR_NOT_BETWEEN: "NOT_BETWEEN",
            AEXPR_BETWEEN_SYM: "BETWEEN_SYM",
            AEXPR_NOT_BETWEEN_SYM: "NOT_BETWEEN_SYM",
        };
        let tempRargFunction = null;
        const node = (0, resolvers_js_1.normalizeNode)("A_Expr", rawNode);
        if (node.A_Expr.lexpr) {
            if (node.A_Expr.lexpr?.['FuncCall']?.['funcname']?.[0]?.['String']?.['sval'] == "pg_catalog") {
                return (0, resolvers_js_1.fallbackNode)(node);
            }
            if (Object.keys(node.A_Expr.lexpr)[0] == "List") {
                result[0]?.arguments.push({
                    name: "sub",
                    arguments: (0, resolvers_js_1.resolveNode)(node.A_Expr.lexpr),
                    paramType: "function",
                });
            }
            else {
                const lexprResolved = (0, resolvers_js_1.resolveNode)(node.A_Expr.lexpr);
                result[0]?.arguments.push(lexprResolved);
            }
        }
        if (node.A_Expr.kind) {
            const operatorName = opNames[node.A_Expr.kind];
            if (operatorName == null || operatorName === undefined) {
                if (node.A_Expr.name && node.A_Expr.name.length > 0) {
                    if (result[0]) {
                        result[0].arguments.push({
                            name: (0, resolvers_js_1.resolveNodeArray)(node.A_Expr.name),
                            arguments: [],
                            paramType: "raw",
                        });
                    }
                }
            }
            else if (operatorName == "NULLIF") {
                if (result[0]) {
                    result[0].name = (0, resolvers_js_1.toCamelCase)(operatorName);
                    // result[0].arguments.push(tempRargFunction);
                    // // result[0].arguments.push({
                    // //     name: operatorName,
                    // //     arguments: [],
                    // //     paramType: "string",
                    // // });
                    // result[0].name = toCamelCase(operatorName);
                }
            }
            else if (operatorName == "BETWEEN" || operatorName == "NOT_BETWEEN") {
                if (result[0]) {
                    tempRargFunction = {
                        name: (0, resolvers_js_1.toCamelCase)(operatorName),
                        arguments: [],
                        paramType: "function",
                    };
                }
            }
            else if (operatorName === "BETWEEN_SYM" || operatorName === "NOT_BETWEEN_SYM") {
                if (result[0]) {
                    tempRargFunction = {
                        name: (0, resolvers_js_1.toCamelCase)(operatorName.replace("_SYM", "_SYMMETRIC")),
                        arguments: [],
                        paramType: "function",
                    };
                }
            }
            else {
                if (node.A_Expr.name && node.A_Expr.name.length > 0) {
                    const useWord = ["IN", "LIKE", "ILIKE", "SIMILAR"].includes(operatorName);
                    const operatorNameAexpr = (0, resolvers_js_1.resolveNodeArray)(node.A_Expr.name).flat().map((r) => r.name.toUpperCase()).join(' ');
                    if (result[0]) {
                        result[0].arguments.push({
                            name: useWord ? (operatorNameAexpr.includes("!") ? "NOT " : "") + operatorName : (0, resolvers_js_1.resolveNodeArray)(node.A_Expr.name).flat().map((r) => r.name.toUpperCase()).join('_') || operatorName,
                            arguments: [],
                            paramType: "string",
                        });
                    }
                }
            }
        }
        if (node.A_Expr.rexpr) {
            if (node.A_Expr.rexpr?.['FuncCall']?.['funcname']?.[0]?.['String']?.['sval'] == "pg_catalog") {
                return (0, resolvers_js_1.fallbackNode)(node);
            }
            let child = (0, resolvers_js_1.resolveNode)(node.A_Expr.rexpr);
            const subExceptions = ["AEXPR_BETWEEN", "AEXPR_NOT_BETWEEN", "AEXPR_BETWEEN_SYM", "AEXPR_NOT_BETWEEN_SYM"];
            if (Object.keys(node.A_Expr.rexpr)[0] == "List" && (node.A_Expr.kind && !subExceptions.includes(node.A_Expr.kind))) {
                child = [{
                        name: "sub",
                        arguments: (0, resolvers_js_1.resolveNode)(node.A_Expr.rexpr),
                        paramType: "function",
                    }];
            }
            if (tempRargFunction) {
                tempRargFunction.arguments.push(child);
                result[0]?.arguments.push(tempRargFunction);
            }
            else {
                result[0]?.arguments.push(child);
            }
        }
        return result;
    },
    BoolExpr: (rawNode) => {
        const result = [];
        const node = (0, resolvers_js_1.normalizeNode)("BoolExpr", rawNode);
        if (node.BoolExpr.boolop) {
            const methodName = constants_js_1.BOOL_OP_METHOD[node.BoolExpr.boolop];
            if (methodName) {
                result.push({
                    name: methodName,
                    arguments: [],
                    paramType: "function",
                });
            }
        }
        if (node.BoolExpr.args && node.BoolExpr.args.length > 0) {
            result[0]?.arguments.push(...node.BoolExpr.args.map(i => [(0, resolvers_js_1.resolveNode)(i)]));
        }
        return result;
    },
    ColumnRef: (rawNode) => {
        const result = [];
        const node = (0, resolvers_js_1.normalizeNode)("ColumnRef", rawNode);
        const deparsed = (0, pgsql_parser_1.deparseSync)(node);
        if (node.ColumnRef.fields && node.ColumnRef.fields.length > 0) {
            result.push({
                name: "c",
                arguments: [deparsed.trim()],
                paramType: "function",
            });
        }
        return result;
    },
    ResTarget: (rawNode) => {
        const result = [];
        const node = (0, resolvers_js_1.normalizeNode)("ResTarget", rawNode);
        const deparsed = (0, pgsql_parser_1.deparseSync)(node);
        if (deparsed.toLowerCase().includes("as") && node.ResTarget.val) {
            const deparsedName = (0, pgsql_parser_1.deparseSync)({
                ResTarget: {
                    ...node.ResTarget,
                    val: undefined,
                }
            }).trim();
            if (node.ResTarget.val) {
                result.push(...(0, resolvers_js_1.resolveNode)(node.ResTarget.val));
            }
            if (deparsedName) {
                result.push({
                    name: "as",
                    arguments: [deparsedName.replaceAll("AS", "").replaceAll("\"", "").trim()],
                    paramType: "function",
                });
            }
            // } else if (deparsed.toLowerCase().includes("=") && node.ResTarget.val) {
            //     const deparsedName = deparseSync({
            //         ResTarget: {
            //             ...node.ResTarget,
            //             val: undefined,
            //         }
            //     }).trim();
            //     result.push({
            //         name: "op",
            //         arguments: [
            //             {
            //                 name: "i",
            //                 arguments: [deparsedName.replaceAll("AS", "").trim()],
            //                 paramType: "function",
            //             },
            //             {
            //                 name: "=",
            //                 arguments: [],
            //                 paramType: "string",
            //             },
            //             ...(node.ResTarget.val ? [resolveNode(node.ResTarget.val)] : []),
            //         ],
            //         paramType: "function",
            //     });
        }
        else {
            const deparsedName = (0, pgsql_parser_1.deparseSync)({
                ResTarget: {
                    ...node.ResTarget,
                    val: undefined,
                }
            }).trim();
            if (node.ResTarget.val) {
                result.push(...(0, resolvers_js_1.resolveNode)(node.ResTarget.val));
                if (node.ResTarget.name || node.ResTarget.indirection) {
                    result.push({
                        name: "as",
                        arguments: [deparsedName.replaceAll("AS", "").trim()],
                        paramType: "function",
                    });
                }
                return result;
            }
            else {
                result.push({
                    name: "i",
                    arguments: [deparsedName.replaceAll("AS", "").trim()],
                    paramType: "function",
                });
            }
        }
        return result;
    },
    A_Indirection: (rawNode) => {
        const node = (0, resolvers_js_1.normalizeNode)("A_Indirection", rawNode);
        return (0, resolvers_js_1.fallbackNode)(node);
    },
    CaseExpr: (rawNode) => {
        const node = (0, resolvers_js_1.normalizeNode)("CaseExpr", rawNode);
        const result = [];
        const tempFunction = {
            name: "case",
            arguments: [],
            paramType: "function",
        };
        if (node.CaseExpr.xpr || node.CaseExpr.casecollid || node.CaseExpr.casetype)
            (0, resolvers_js_1.fallbackNode)(node);
        if (node.CaseExpr.arg) {
            tempFunction.arguments.push((0, resolvers_js_1.resolveNode)(node.CaseExpr.arg));
        }
        result.push(tempFunction);
        if (node.CaseExpr.args && node.CaseExpr.args.length > 0) {
            result.push(...(0, resolvers_js_1.resolveNodeArray)(node.CaseExpr.args));
        }
        if (node.CaseExpr.defresult) {
            result.push({
                name: "else",
                arguments: (0, resolvers_js_1.resolveNode)(node.CaseExpr.defresult),
                paramType: "function",
            });
        }
        result.push({
            name: "end",
            arguments: [],
            paramType: "function",
        });
        return result;
    },
    CaseWhen: (rawNode) => {
        const node = (0, resolvers_js_1.normalizeNode)("CaseWhen", rawNode);
        const result = [];
        if (node.CaseWhen.xpr)
            (0, resolvers_js_1.fallbackNode)(node);
        if (node.CaseWhen.expr) {
            result.push({
                name: "when",
                arguments: (0, resolvers_js_1.resolveNode)(node.CaseWhen.expr),
                paramType: "function",
            });
        }
        if (node.CaseWhen.result) {
            result.push({
                name: "then",
                arguments: (0, resolvers_js_1.resolveNode)(node.CaseWhen.result),
                paramType: "function",
            });
        }
        return result;
    },
    SubLink: (rawNode) => {
        let result = [];
        const node = (0, resolvers_js_1.normalizeNode)("SubLink", rawNode);
        let tempOp = null;
        let tempSubLinkType = null;
        let tempSubselect = null;
        if (node.SubLink.operName && node.SubLink.operName.length > 0) {
            const operNameResolved = (0, resolvers_js_1.resolveNodeArray)(node.SubLink.operName);
            tempOp = {
                name: "op",
                arguments: [],
                paramType: "function",
            };
        }
        if (node.SubLink.testexpr) {
            result.push(...(0, resolvers_js_1.resolveNode)(node.SubLink.testexpr));
        }
        if (node.SubLink.operName && node.SubLink.operName.length > 0) {
            result.push(...(0, resolvers_js_1.resolveNodeArray)(node.SubLink.operName));
        }
        if (node.SubLink.subLinkType) {
            const subLinkTypeNames = {
                EXISTS_SUBLINK: "exists",
                ANY_SUBLINK: node.SubLink.operName ? "any" : "in",
                ALL_SUBLINK: "all",
                EXPR_SUBLINK: null,
            };
            const methodName = subLinkTypeNames[node.SubLink.subLinkType];
            if (methodName) {
                // result.push();
                tempSubLinkType = {
                    name: methodName,
                    arguments: [],
                    paramType: "function",
                };
            }
            else if (methodName !== null) {
                return (0, resolvers_js_1.fallbackNode)(node);
            }
        }
        if (node.SubLink.subselect) {
            tempSubselect = {
                name: "sub",
                arguments: [(0, resolvers_js_1.resolveNode)(node.SubLink.subselect)],
                paramType: "function",
            };
        }
        if (tempSubLinkType) {
            if (tempSubselect) {
                tempSubLinkType.arguments.push(tempSubselect.arguments[0]);
            }
            result.push(tempSubLinkType);
        }
        else {
            if (tempSubselect) {
                result.push(tempSubselect);
            }
        }
        if (tempOp) {
            if (result.length > 0) {
                tempOp.arguments.push(...result);
                result = [tempOp];
            }
            else {
                result.push(tempOp);
            }
        }
        return result;
    },
    CoalesceExpr: (rawNode) => {
        const node = (0, resolvers_js_1.normalizeNode)("CoalesceExpr", rawNode);
        const result = [];
        if (node.CoalesceExpr.args && node.CoalesceExpr.args.length > 0) {
            result.push({
                name: "coalesce",
                arguments: (0, resolvers_js_1.resolveNodeArray)(node.CoalesceExpr.args),
                paramType: "function",
            });
        }
        return result;
    },
};
exports.specialNodeExpressions = specialNodeExpressions;
