"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnSchema = exports.TableSchema = exports.DBSchema = void 0;
exports.sqlBuilder = sqlBuilder;
const query_instance_1 = require("../src/dialects/pg/generated/query-instance");
const db_schema_1 = require("../src/dialects/pg/db-schema");
Object.defineProperty(exports, "DBSchema", { enumerable: true, get: function () { return db_schema_1.DBSchema; } });
Object.defineProperty(exports, "TableSchema", { enumerable: true, get: function () { return db_schema_1.TableSchema; } });
Object.defineProperty(exports, "ColumnSchema", { enumerable: true, get: function () { return db_schema_1.ColumnSchema; } });
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
