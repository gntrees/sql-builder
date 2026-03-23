"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlBuilder = sqlBuilder;
const query_instance_1 = require("../src/dialects/pg/generated/query-instance");
class QueryInstanceBuilder extends query_instance_1.QueryInstance {
    setFormatParamHandler(formatParamHandler) {
        this.dbInstance.formatParamHandler = formatParamHandler;
        return this;
    }
    setExecutionHandler(execHandler) {
        this.dbInstance.execHandler = execHandler;
        return this;
    }
}
function sqlBuilder() {
    const requiredDbInstance = {
        execHandler: async () => {
            throw new Error("Execution is not supported in @gntrees/sql-builder/pg/builder");
        },
        formatParamHandler: "pg",
    };
    return new QueryInstanceBuilder(requiredDbInstance);
}
