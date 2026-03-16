"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.specialNodeValues = void 0;
const functions_1 = require("@gntrees/sql-builder/pg/functions");
const resolvers_js_1 = require("../utils/resolvers.js");
const specialNodeValues = {
    A_Const: (rawNode) => {
        let result = [];
        const node = (0, resolvers_js_1.normalizeNode)("A_Const", rawNode);
        if (node.A_Const.ival) {
            result.push({
                name: node.A_Const.ival.ival?.toString() ?? "0",
                arguments: [],
                paramType: "number"
            });
        }
        if (node.A_Const.fval) {
            result.push({
                name: "r",
                arguments: [node.A_Const.fval.fval],
                paramType: "template-literal"
            });
        }
        if (node.A_Const.boolval) {
            result.push({
                name: node.A_Const.boolval ? (node.A_Const.boolval.boolval ? "true" : "false") : "",
                arguments: [],
                paramType: "boolean"
            });
        }
        if (node.A_Const.bsval) {
            result.push({
                name: node.A_Const.bsval.bsval?.toString() ?? "",
                arguments: [],
                paramType: "string"
            });
        }
        if (node.A_Const.sval) {
            result.push({
                name: node.A_Const.sval.sval?.toString() ?? "",
                arguments: [],
                paramType: "string"
            });
        }
        if (node.A_Const.isnull) {
            result.push({
                name: "NULL",
                arguments: [],
                paramType: "null"
            });
        }
        result = [
            {
                name: "l",
                arguments: result,
                paramType: "function"
            }
        ];
        return result;
    },
    String: (rawNode) => {
        const node = (0, resolvers_js_1.normalizeNode)("String", rawNode);
        return [{
                name: node.String.sval || "",
                arguments: [],
                paramType: "string"
            }];
    },
    FuncCall: (rawNode) => {
        const params = [];
        const node = (0, resolvers_js_1.normalizeNode)("FuncCall", rawNode);
        const result = [];
        const funcName = node.FuncCall.funcname?.map(resolvers_js_1.resolveNode).flat().map((r) => r.name.toUpperCase()).join('_') || "";
        const availableFuncName = Object.values(functions_1.functionList).flat().find(f => f === (0, resolvers_js_1.toCamelCase)(funcName));
        if (!availableFuncName) {
            return (0, resolvers_js_1.fallbackNode)(node);
        }
        if (node.FuncCall.agg_distinct) {
            params.push({ name: 'distinct', arguments: [], paramType: 'function' });
        }
        if (node.FuncCall.func_variadic) {
            return (0, resolvers_js_1.fallbackNode)(node);
        }
        if (node.FuncCall.args && node.FuncCall.args.length > 0) {
            params.push(...(0, resolvers_js_1.resolveNodeArray)(node.FuncCall.args));
        }
        if (node.FuncCall.agg_order && node.FuncCall.agg_order.length > 0) {
            params.push({
                name: 'orderBy',
                arguments: (0, resolvers_js_1.resolveNodeArray)(node.FuncCall.agg_order),
                paramType: 'function'
            });
        }
        if (node.FuncCall.agg_filter) {
            params.push({
                name: 'filter',
                arguments: (0, resolvers_js_1.resolveNode)(node.FuncCall.agg_filter),
                paramType: 'function'
            });
        }
        if (node.FuncCall.agg_within_group) {
            return (0, resolvers_js_1.fallbackNode)(node);
        }
        if (node.FuncCall.agg_distinct) {
            return (0, resolvers_js_1.fallbackNode)(node);
        }
        if (node.FuncCall.agg_star) {
            params.push({
                name: '*',
                arguments: [],
                paramType: 'string'
            });
        }
        if (node.FuncCall.funcformat) {
            if (node.FuncCall.funcformat !== "COERCE_EXPLICIT_CALL")
                return (0, resolvers_js_1.fallbackNode)(node);
        }
        result.push({
            name: (0, resolvers_js_1.toCamelCase)(funcName),
            arguments: params,
            paramType: "function"
        });
        if (node.FuncCall.over) {
            const child = (0, resolvers_js_1.resolveNode)({ WindowDef: node.FuncCall.over });
            result.push({
                name: 'over',
                arguments: [child],
                paramType: 'function'
            });
            if (child.length == 0) {
                result.push({
                    name: "sub",
                    arguments: [],
                    paramType: "function"
                });
            }
        }
        return result;
    },
    List: (rawNode) => {
        const node = (0, resolvers_js_1.normalizeNode)("List", rawNode);
        const tempFunction = {
            name: [],
            arguments: [],
            paramType: 'raw'
        };
        if (node.List.items && node.List.items.length > 0) {
            tempFunction.name = (0, resolvers_js_1.resolveNodeArray)(node.List.items);
        }
        return [tempFunction];
    }
};
exports.specialNodeValues = specialNodeValues;
