import { OverrideQueryBuilder } from "./override-query-builder";
export declare class QueryBuilder extends OverrideQueryBuilder {
    getSql(): string;
    getParameters(): import("./types").ParameterValueType[];
    getSqlAndParameters(): {
        sql: string;
        parameters: import("./types").ParameterValueType[];
    };
    getSqlWithParameters(): string;
    execute(meta?: any): void;
}
