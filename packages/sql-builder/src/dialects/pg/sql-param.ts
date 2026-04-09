
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
