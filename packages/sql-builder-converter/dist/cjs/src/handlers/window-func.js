"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.specialNodeWindowFunc = void 0;
const resolvers_js_1 = require("../utils/resolvers.js");
const specialNodeWindowFunc = {
    WindowDef: (rawNode) => {
        let result = [];
        const node = (0, resolvers_js_1.normalizeNode)("WindowDef", rawNode);
        if (node.WindowDef.partitionClause && node.WindowDef.partitionClause.length > 0) {
            result.push({
                name: 'partitionBy',
                arguments: [(0, resolvers_js_1.resolveNodeArray)(node.WindowDef.partitionClause)],
                paramType: 'function'
            });
        }
        if (node.WindowDef.orderClause && node.WindowDef.orderClause.length > 0) {
            result.push({
                name: 'orderBy',
                arguments: [(0, resolvers_js_1.resolveNodeArray)(node.WindowDef.orderClause)],
                paramType: 'function'
            });
        }
        if (node.WindowDef.frameOptions !== undefined && node.WindowDef.startOffset && node.WindowDef.endOffset) {
            result.push({
                name: "rows",
                arguments: [],
                paramType: "function"
            }, {
                name: "between",
                arguments: [
                    ...(0, resolvers_js_1.resolveNode)(node.WindowDef.startOffset),
                ],
                paramType: "function"
            }, {
                name: "preceding",
                arguments: [],
                paramType: "function"
            }, {
                name: "and",
                arguments: [],
                paramType: "function"
            }, {
                name: "l",
                arguments: [
                    ...(0, resolvers_js_1.resolveNode)(node.WindowDef.endOffset),
                ],
                paramType: "function"
            }, {
                name: "following",
                arguments: [],
                paramType: "function"
            });
        }
        if (node.WindowDef.name) {
            result = [
                {
                    name: "i",
                    arguments: [node.WindowDef.name],
                    paramType: "function"
                },
                {
                    name: "as",
                    arguments: [result],
                    paramType: "function"
                }
            ];
        }
        return result;
    }
};
exports.specialNodeWindowFunc = specialNodeWindowFunc;
