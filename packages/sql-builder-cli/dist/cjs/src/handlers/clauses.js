"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.specialNodeClauses = void 0;
const constants_js_1 = require("../constants.js");
const resolvers_js_1 = require("../utils/resolvers.js");
const specialNodeClauses = {
    SortBy: (rawNode) => {
        const result = [];
        const node = (0, resolvers_js_1.normalizeNode)("SortBy", rawNode);
        if (node.SortBy.useOp)
            return (0, resolvers_js_1.fallbackNode)(node);
        if (node.SortBy.node) {
            const resolvedNode = (0, resolvers_js_1.resolveNode)(node.SortBy.node).map(func => {
                if (["string", "number", "boolean", "null"].includes(func.paramType)) {
                    return {
                        paramType: "function",
                        name: "l",
                        arguments: [func],
                    };
                }
                else
                    return func;
            });
            result.push(...resolvedNode);
        }
        if (node.SortBy.sortby_dir) {
            const methodName = constants_js_1.SORT_DIR_METHOD[node.SortBy.sortby_dir];
            if (methodName) {
                result.push({
                    name: methodName,
                    arguments: [],
                    paramType: 'function'
                });
            }
        }
        if (node.SortBy.sortby_nulls) {
            const nullsMethodName = constants_js_1.SORTBY_NULLS_METHOD[node.SortBy.sortby_nulls];
            if (nullsMethodName) {
                result.push({
                    name: nullsMethodName,
                    arguments: [],
                    paramType: 'function'
                });
            }
        }
        return result;
    }
};
exports.specialNodeClauses = specialNodeClauses;
