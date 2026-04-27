import type { SqlSchemaParamAllValue, SqlSchemaParamDefaultValue, SqlSchemaParamResolvedValue, SqlSchemaParamType } from "./sql-param.types";
export declare class SqlSchemaParam<TKey extends string = string, T extends SqlSchemaParamType = never> {
    protected key: TKey;
    protected types: SqlSchemaParamType[];
    protected hasDefaultValue: boolean;
    protected defaultValue?: SqlSchemaParamAllValue;
    constructor(key: TKey);
    value?: SqlSchemaParamResolvedValue<T>;
    protected addType(type: SqlSchemaParamType): void;
    getKey(): TKey;
    number(): SqlSchemaParam<TKey, T | "number">;
    boolean(): SqlSchemaParam<TKey, T | "boolean">;
    string(): SqlSchemaParam<TKey, T | "string">;
    nullable(): SqlSchemaParam<TKey, T | "null">;
    default(value: SqlSchemaParamDefaultValue<T>): this;
    hasDefault(): boolean;
    getDefaultValue(): SqlSchemaParamAllValue | undefined;
    getTypes(): SqlSchemaParamType[];
}
export declare class SqlSchemaParamCase {
    protected key: string;
    protected queryBuilder: {
        setParams: (params: Record<string, any>) => unknown;
        getTokens: () => unknown[];
    };
    constructor(key: string, queryBuilder: {
        setParams: (params: Record<string, any>) => unknown;
        getTokens: () => unknown[];
    });
    setParams(params: Record<string, any>): this;
    getQueryBuilder(): {
        setParams: (params: Record<string, any>) => unknown;
        getTokens: () => unknown[];
    };
}
