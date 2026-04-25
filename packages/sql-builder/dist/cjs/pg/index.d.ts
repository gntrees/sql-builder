import * as queryInstanceModule from "./generated/query-instance";
import * as queryBuilderModule from "./query-builder";
import type { RequiredDBInstance } from "./types";
import { SqlSchema } from "./sql-schema";
import { DBSchema, TableSchema, ColumnSchema } from "./db-schema";
declare const QueryInstance: typeof queryInstanceModule.QueryInstance;
declare const QueryBuilder: typeof queryBuilderModule.QueryBuilder;
declare class QueryInstanceBuilder extends QueryInstance {
    setFormatParamHandler(formatParamHandler: RequiredDBInstance["formatParamHandler"]): this;
    setExecutionHandler(execHandler: RequiredDBInstance["execHandler"]): this;
}
export declare function sqlBuilder(url?: string): QueryInstanceBuilder;
export declare function sqlSchema(): SqlSchema<{}>;
export { QueryBuilder, QueryInstance, DBSchema, TableSchema, ColumnSchema };
