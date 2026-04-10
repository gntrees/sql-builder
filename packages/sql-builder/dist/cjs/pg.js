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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnSchema = exports.TableSchema = exports.DBSchema = exports.QueryInstance = exports.QueryBuilder = void 0;
exports.sqlBuilder = sqlBuilder;
exports.sqlSchema = sqlSchema;
const pg_1 = require("pg");
const queryInstanceModule = __importStar(require("./src/dialects/pg/generated/query-instance"));
const queryBuilderModule = __importStar(require("./src/dialects/pg/query-builder"));
const sql_schema_1 = require("./src/dialects/pg/sql-schema");
const db_schema_1 = require("./src/dialects/pg/db-schema");
Object.defineProperty(exports, "DBSchema", { enumerable: true, get: function () { return db_schema_1.DBSchema; } });
Object.defineProperty(exports, "TableSchema", { enumerable: true, get: function () { return db_schema_1.TableSchema; } });
Object.defineProperty(exports, "ColumnSchema", { enumerable: true, get: function () { return db_schema_1.ColumnSchema; } });
const { QueryInstance } = queryInstanceModule;
exports.QueryInstance = QueryInstance;
const { QueryBuilder } = queryBuilderModule;
exports.QueryBuilder = QueryBuilder;
class QueryInstanceBuilder extends QueryInstance {
    setFormatParamHandler(formatParamHandler) {
        this.dbInstance.formatParamHandler = formatParamHandler;
        return this;
    }
    setExecutionHandler(execHandler) {
        this.dbInstance.execHandler = execHandler;
        return this;
    }
}
function sqlBuilder(url) {
    const requiredDbInstance = {
        execHandler: async ({ sql, parameters }) => {
            if (typeof url !== "string") {
                throw new Error("Database connection URL must be provided for execution");
            }
            const client = url
                ? new pg_1.Client({ connectionString: url })
                : new pg_1.Client();
            await client.connect();
            try {
                return (await client.query(sql, parameters)).rows;
            }
            finally {
                await client.end();
            }
        },
        formatParamHandler: "pg",
    };
    return new QueryInstanceBuilder(requiredDbInstance);
}
function sqlSchema() {
    return new sql_schema_1.SqlSchema();
}
