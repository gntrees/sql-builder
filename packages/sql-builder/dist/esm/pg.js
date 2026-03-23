import { Client } from "pg";
import * as queryInstanceModule from "./src/dialects/pg/generated/query-instance";
import * as queryBuilderModule from "./src/dialects/pg/query-builder";
import { SqlSchema } from "./src/dialects/pg/sql-schema";
import { DBSchema, TableSchema, ColumnSchema } from "./src/dialects/pg/db-schema";
const { QueryInstance } = queryInstanceModule;
const { QueryBuilder } = queryBuilderModule;
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
export function sqlBuilder(url) {
    const requiredDbInstance = {
        execHandler: async ({ sql, parameters }) => {
            if (typeof url !== "string") {
                throw new Error("Database connection URL must be provided for execution");
            }
            const client = url
                ? new Client({ connectionString: url })
                : new Client();
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
export function sqlSchema() {
    return new SqlSchema();
}
export { QueryBuilder, QueryInstance, DBSchema, TableSchema, ColumnSchema };
