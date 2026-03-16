import { QueryInstance } from "../src/dialects/pg/generated/query-instance";
import type { RequiredDBInstance } from "../src/dialects/pg/types";
import { QueryBuilder } from "../src/dialects/pg/query-builder";
declare class QueryInstanceBuilder extends QueryInstance {
    setFormatParamHandler(formatParamHandler: RequiredDBInstance["formatParamHandler"]): this;
    setExecutionHandler(execHandler: RequiredDBInstance["execHandler"]): this;
}
export declare function sqlBuilder(): QueryInstanceBuilder;
export { QueryBuilder, QueryInstance };
