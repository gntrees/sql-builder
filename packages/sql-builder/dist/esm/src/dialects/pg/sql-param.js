// still prototype
export class SqlSchemaParam {
    key;
    types = [];
    hasDefaultValue = false;
    defaultValue;
    constructor(key) {
        this.key = key;
    }
    value;
    addType(type) {
        if (!this.types.includes(type)) {
            this.types.push(type);
        }
    }
    getKey() {
        return this.key;
    }
    number() {
        this.addType("number");
        return this;
    }
    boolean() {
        this.addType("boolean");
        return this;
    }
    string() {
        this.addType("string");
        return this;
    }
    nullable() {
        this.addType("null");
        return this;
    }
    default(value) {
        this.hasDefaultValue = true;
        this.defaultValue = value;
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
        return this.types;
    }
}
// still prototype
export class SqlSchemaParamCase {
    key;
    queryBuilder;
    constructor(key, queryBuilder) {
        this.key = key;
        this.queryBuilder = queryBuilder;
    }
    setParams(params) {
        const runtimeParams = { ...params };
        this.queryBuilder.setParams(runtimeParams);
        return this;
    }
    getQueryBuilder() {
        return this.queryBuilder;
    }
}
