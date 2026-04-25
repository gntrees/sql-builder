import type {
    SqlSchemaParamAllValue,
    SqlSchemaParamDefaultValue,
    SqlSchemaParamResolvedValue,
    SqlSchemaParamType,
} from "./sql-param.types";
// still prototype
export class SqlSchemaParam<TKey extends string = string, T extends SqlSchemaParamType = never> {
    protected key: TKey;
    protected types: SqlSchemaParamType[] = [];
    protected hasDefaultValue = false;
    protected defaultValue?: SqlSchemaParamAllValue;
    constructor(key: TKey) {
        this.key = key;
    }
    value?: SqlSchemaParamResolvedValue<T>;

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

    default(value: SqlSchemaParamDefaultValue<T>) {
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
    constructor(
        protected key: string,
        protected queryBuilder: {
            setParams: (params: Record<string, any>) => unknown;
            getTokens: () => unknown[];
        },
    ) {

    }

    setParams(params: Record<string, any>) {
        const runtimeParams = { ...params };
        this.queryBuilder.setParams(runtimeParams);
        return this;
    }

    getQueryBuilder() {
        return this.queryBuilder;
    }
}
