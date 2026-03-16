"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryInstance = exports.QueryBuilder = void 0;
exports.sqlBuilder = sqlBuilder;
const query_instance_1 = require("../src/dialects/pg/generated/query-instance");
Object.defineProperty(exports, "QueryInstance", { enumerable: true, get: function () { return query_instance_1.QueryInstance; } });
const query_builder_1 = require("../src/dialects/pg/query-builder");
Object.defineProperty(exports, "QueryBuilder", { enumerable: true, get: function () { return query_builder_1.QueryBuilder; } });
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
