import type { OverrideQueryBuilder } from "./override-query-builder";
import type { QueryBuilder } from "./query-builder";

export type SqlSchemaParamType = "number" | "boolean" | "string" | "null";

type SqlSchemaParamTypeValueMap = {
    number: number;
    boolean: boolean;
    string: string;
    null: null;
};

type SqlSchemaParamValue<T extends SqlSchemaParamType> = SqlSchemaParamTypeValueMap[T];

type SqlSchemaParamAllValue = boolean | number | string | null;

type SqlSchemaParamValueUnion<T extends SqlSchemaParamType> =
    [T] extends [never]
        ? SqlSchemaParamAllValue
        : SqlSchemaParamValue<T>

export type SqlSchemaParamResolvedValue<T extends SqlSchemaParamType> = SqlSchemaParamValueUnion<T>;

export type BuilderParams = Record<string, unknown>;
declare const builderParamsSymbol: unique symbol;

export type Simplify<T> = {
    [K in keyof T]: T[K];
} & {};

type UnionToIntersection<T> = (T extends unknown ? (value: T) => void : never) extends ((value: infer I) => void)
    ? I
    : never;

type IsWideString<T extends string> = string extends T ? true : false;

export type MergeBuilderParams<TLeft extends BuilderParams, TRight extends BuilderParams> = Simplify<Omit<TLeft, keyof TRight> & TRight>;

type BuilderParamsCarrier<TParams extends BuilderParams> = {
    [builderParamsSymbol]: TParams;
};

export type ExtractBuilderParams<TBuilder> = TBuilder extends BuilderParamsCarrier<infer TParams>
    ? TParams
    : {};

export type WithBuilderParams<TBuilder, TParams extends BuilderParams> = TBuilder & BuilderParamsCarrier<TParams>;

export type ApplyInferredBuilderParams<
    TBuilder,
    TInferred extends BuilderParams,
> = [keyof TInferred] extends [never]
    ? TBuilder
    : WithBuilderParams<TBuilder, MergeBuilderParams<ExtractBuilderParams<TBuilder>, TInferred>>;

type InferSchemaParam<TValue> = TValue extends SqlSchemaParam<infer TKey extends string, infer TType extends SqlSchemaParamType>
    ? IsWideString<TKey> extends true
        ? {}
        : { [K in TKey]?: SqlSchemaParamResolvedValue<TType> }
    : {};

export type InferSchemaCase<TKey extends string, TCaseQuery extends QueryBuilder> = {
    [K in TKey]?: boolean | ExtractBuilderParams<TCaseQuery>;
};

type InferSchemaParamsFromValue<TValue> = TValue extends SqlSchemaParam<any, any>
    ? InferSchemaParam<TValue>
    : TValue extends readonly unknown[]
        ? InferSchemaParamsFromArgs<TValue>
        : TValue extends QueryBuilder | OverrideQueryBuilder
            ? ExtractBuilderParams<TValue>
            : TValue extends Record<string, unknown>
                ? UnionToIntersection<{
                    [K in keyof TValue]-?: InferSchemaParamsFromValue<TValue[K]>;
                }[keyof TValue]>
                : {};

export type InferSchemaParamsFromArgs<TArgs extends readonly unknown[]> = TArgs extends []
    ? {}
    : Simplify<UnionToIntersection<InferSchemaParamsFromValue<TArgs[number]>>>;
// still prototype
export class SqlSchemaParam<TKey extends string = string, T extends SqlSchemaParamType = never> {
    protected key: TKey;
    protected types: SqlSchemaParamType[] = [];
    protected hasDefaultValue = false;
    protected defaultValue?: SqlSchemaParamAllValue;
    constructor(key: TKey) {
        this.key = key;
    }
    value?: SqlSchemaParamValueUnion<T>;

    protected addType(type: SqlSchemaParamType) {
        if (!this.types.includes(type)) {
            this.types.push(type);
        }
    }

    getKey(): TKey {
        return this.key;
    }

    number() {
        this.addType("number");
        return this as unknown as SqlSchemaParam<TKey, T | "number">;
    }

    boolean() {
        this.addType("boolean");
        return this as unknown as SqlSchemaParam<TKey, T | "boolean">;
    }

    string() {
        this.addType("string");
        return this as unknown as SqlSchemaParam<TKey, T | "string">;
    }

    nullable() {
        this.addType("null");
        return this as unknown as SqlSchemaParam<TKey, T | "null">;
    }

    default(value: SqlSchemaParamValueUnion<T>) {
        this.hasDefaultValue = true;
        this.defaultValue = value as SqlSchemaParamAllValue;
        this.value = value;
        return this;
    }

    hasDefault() {
        return this.hasDefaultValue;
    }

    getDefaultValue() {
        return this.defaultValue;
    }

    getTypes() {
        return this.types as SqlSchemaParamType[];
    }
}

// still prototype
export class SqlSchemaParamCase {
    protected params: Record<string, any> = {};
    constructor(
        protected key: string,
        protected queryBuilder: {
            setParams: (params: Record<string, any>) => unknown;
            getTokens: () => unknown[];
        },
    ) {

    }

    setParams(params: Record<string, any>) {
        this.params = { ...params };
        this.queryBuilder.setParams(this.params);
        return this;
    }

    getQueryBuilder() {
        return this.queryBuilder;
    }
}
