import * as queryInstanceModule from "./src/dialects/pg/generated/query-instance";
import * as queryBuilderModule from "./src/dialects/pg/query-builder";
import type { RequiredDBInstance } from "./src/dialects/pg/types";
import { SqlSchema } from "./src/dialects/pg/sql-schema";
import { DBSchema, TableSchema, ColumnSchema } from "./src/dialects/pg/db-schema";
declare const QueryInstance: typeof queryInstanceModule.QueryInstance;
declare const QueryBuilder: typeof queryBuilderModule.QueryBuilder;
declare class QueryInstanceBuilder extends QueryInstance {
    setFormatParamHandler(formatParamHandler: RequiredDBInstance["formatParamHandler"]): this;
    setExecutionHandler(execHandler: RequiredDBInstance["execHandler"]): this;
}
export declare function sqlBuilder(url?: string): QueryInstanceBuilder;
export declare function sqlSchema(): SqlSchema<{}>;
export { QueryBuilder, QueryInstance, DBSchema, TableSchema, ColumnSchema };
