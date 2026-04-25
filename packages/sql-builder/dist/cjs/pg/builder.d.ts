import { QueryInstance } from "./generated/query-instance";
import type { RequiredDBInstance } from "./types";
import { DBSchema, TableSchema, ColumnSchema } from "./db-schema";
declare class QueryInstanceBuilder extends QueryInstance {
    setFormatParamHandler(formatParamHandler: RequiredDBInstance["formatParamHandler"]): this;
    setExecutionHandler(execHandler: RequiredDBInstance["execHandler"]): this;
}
export declare function sqlBuilder(): QueryInstanceBuilder;
export { DBSchema, TableSchema, ColumnSchema };
