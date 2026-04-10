"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlSchemaParamCase = exports.SqlSchemaParam = void 0;
// still prototype
class SqlSchemaParam {
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
exports.SqlSchemaParam = SqlSchemaParam;
// still prototype
class SqlSchemaParamCase {
    key;
    queryBuilder;
    params = {};
    constructor(key, queryBuilder) {
        this.key = key;
        this.queryBuilder = queryBuilder;
    }
    setParams(params) {
        this.params = { ...params };
        this.queryBuilder.setParams(this.params);
        return this;
    }
    getQueryBuilder() {
        return this.queryBuilder;
    }
}
exports.SqlSchemaParamCase = SqlSchemaParamCase;
