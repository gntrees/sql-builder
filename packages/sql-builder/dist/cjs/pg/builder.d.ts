import { QueryInstance } from "../src/dialects/pg/generated/query-instance";
import type { RequiredDBInstance } from "../src/dialects/pg/types";
declare class QueryInstanceBuilder extends QueryInstance {
    setFormatParamHandler(formatParamHandler: RequiredDBInstance["formatParamHandler"]): this;
    setExecutionHandler(execHandler: RequiredDBInstance["execHandler"]): this;
}
export declare function sqlBuilder(): QueryInstanceBuilder;
export {};
