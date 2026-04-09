export type SqlSchemaParamType = "number" | "boolean" | "string" | "null";
type SqlSchemaParamTypeValueMap = {
    number: number;
    boolean: boolean;
    string: string;
    null: null;
};
type SqlSchemaParamValue<T extends SqlSchemaParamType> = SqlSchemaParamTypeValueMap[T];
type SqlSchemaParamAllValue = boolean | number | string | null;
type SqlSchemaParamValueUnion<T extends SqlSchemaParamType> = [
    T
] extends [never] ? SqlSchemaParamAllValue : SqlSchemaParamValue<T>;
export type SqlSchemaParamResolvedValue<T extends SqlSchemaParamType> = SqlSchemaParamValueUnion<T>;
export declare class SqlSchemaParam<TKey extends string = string, T extends SqlSchemaParamType = never> {
    protected key: TKey;
    protected types: SqlSchemaParamType[];
    protected hasDefaultValue: boolean;
    protected defaultValue?: SqlSchemaParamAllValue;
    constructor(key: TKey);
    value?: SqlSchemaParamValueUnion<T>;
    protected addType(type: SqlSchemaParamType): void;
    getKey(): TKey;
    number(): SqlSchemaParam<TKey, T | "number">;
    boolean(): SqlSchemaParam<TKey, T | "boolean">;
    string(): SqlSchemaParam<TKey, T | "string">;
    nullable(): SqlSchemaParam<TKey, T | "null">;
    default(value: SqlSchemaParamValueUnion<T>): this;
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
    protected params: Record<string, any>;
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
export {};
