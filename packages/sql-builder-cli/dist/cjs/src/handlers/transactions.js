"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.specialNodeTransactions = void 0;
const resolvers_js_1 = require("../utils/resolvers.js");
const specialNodeTransactions = {
    TransactionStmt: (rawNode) => {
        const results = [];
        const node = (0, resolvers_js_1.normalizeNode)("TransactionStmt", rawNode);
        const tempFunction = {
            name: '',
            arguments: [],
            paramType: 'function'
        };
        const kindMap = {
            "TRANS_STMT_BEGIN": "beginTransaction",
            "TRANS_STMT_COMMIT": "commitTransaction",
            "TRANS_STMT_COMMIT_PREPARED": "commitPreparedTransaction",
            "TRANS_STMT_PREPARE": "prepareTransaction",
            "TRANS_STMT_RELEASE": "releaseTransaction",
            "TRANS_STMT_ROLLBACK": "rollbackTransaction",
            "TRANS_STMT_ROLLBACK_PREPARED": "rollbackPreparedTransaction",
            "TRANS_STMT_ROLLBACK_TO": "rollbackToSavepointTransaction",
            "TRANS_STMT_SAVEPOINT": "savepointTransaction",
            "TRANS_STMT_START": "startTransaction"
        };
        if (node.TransactionStmt.kind) {
            const methodName = kindMap[node.TransactionStmt.kind];
            if (methodName) {
                tempFunction.name = methodName;
            }
            else
                return (0, resolvers_js_1.fallbackNode)(node);
        }
        if (node.TransactionStmt.gid) {
            tempFunction.arguments.push({
                name: "i",
                arguments: [node.TransactionStmt.gid],
                paramType: "function"
            });
        }
        if (node.TransactionStmt.savepoint_name) {
            if (node.TransactionStmt.kind == "TRANS_STMT_SAVEPOINT") {
                tempFunction.arguments.push({
                    name: "i",
                    arguments: [node.TransactionStmt.savepoint_name],
                    paramType: "function"
                });
            }
        }
        if (tempFunction.name) {
            results.push(tempFunction);
        }
        if (node.TransactionStmt.chain) {
            results.push({
                name: 'and',
                arguments: [],
                paramType: 'function'
            }, {
                name: 'chain',
                arguments: [],
                paramType: 'function'
            });
        }
        if (node.TransactionStmt.options) {
            results.push(...(0, resolvers_js_1.resolveNodeArray)(node.TransactionStmt.options));
        }
        // switch (kind) {
        //     case 'TRANS_STMT_BEGIN':
        //         results.push({
        //             name: 'beginTransaction',
        //             arguments: [],
        //             paramType: 'function'
        //         });
        //         break;
        //     case 'TRANS_STMT_COMMIT':
        //         results.push({
        //             name: 'commitTransaction',
        //             arguments: [],
        //             paramType: 'function'
        //         });
        //         break;
        //     case 'TRANS_STMT_ROLLBACK':
        //         results.push({
        //             name: 'rollbackTransaction',
        //             arguments: [],
        //             paramType: 'function'
        //         });
        //         break;
        //     case 'TRANS_STMT_SAVEPOINT':
        //         const savepointName = node.TransactionStmt.savepoint_name
        //         results.push({
        //             name: 'savepointTransaction',
        //             arguments: [savepointName ?? undefined],
        //             paramType: 'function'
        //         });
        //         break;
        // }
        return results;
    }
};
exports.specialNodeTransactions = specialNodeTransactions;
