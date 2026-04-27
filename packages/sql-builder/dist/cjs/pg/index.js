"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlBuilder = sqlBuilder;
const query_instance_1 = require("./generated/query-instance");
function sqlBuilder(variableName) {
    const requiredDbInstance = {
        execHandler: async () => {
            throw new Error("Execution handler is not configured. Call setExecutionHandler() on sqlBuilder() before execute().");
        },
        formatParamHandler: "pg",
    };
    const queryInstance = new query_instance_1.QueryInstance(requiredDbInstance);
    if (typeof variableName === "string") {
        queryInstance.setVariableName(variableName);
    }
    return queryInstance;
}
__exportStar(require("./base-export"), exports);
