import { SchemaOverrider } from "./generated/schema-overrider";
export declare class QueryBuilder extends SchemaOverrider {
    getSql(): string;
    getParameters(): import("./types").ParameterValueType[];
    getSqlAndParameters(): {
        sql: string;
        parameters: import("./types").ParameterValueType[];
    };
    getSqlWithParameters(): string;
    execute(meta?: any): Promise<any>;
}
