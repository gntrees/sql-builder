"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlSchemaQueryBuilder = exports.SqlSchemaParam = exports.SqlSchemaParamCase = exports.SqlSchema = void 0;
class SqlSchema {
    definitions;
    constructor(definitions = {}) {
        this.definitions = definitions;
    }
    sql = {};
    setQuery(name, sqlSchemaQueryBuilder) {
        this.sql[name] = sqlSchemaQueryBuilder;
        return this;
    }
    set = {
        query: (query) => {
            return new SqlSchemaQueryBuilder(query);
        },
    };
    param = {
        set(key) {
            return new SqlSchemaParam(key);
        },
        case(key, queryBuilder, defaultUsed = true) {
            return new SqlSchemaParamCase({
                key,
                queryBuilder,
                isUsed: defaultUsed,
            });
        }
    };
    query(key) {
        const sqlSchemaQueryBuilder = this.sql[key];
        if (!sqlSchemaQueryBuilder)
            throw new Error(`Query ${String(key)} not found`);
        return sqlSchemaQueryBuilder;
    }
    getJSON() {
        const json = {
            sql: Object.fromEntries(Object.entries(this.sql).map(([key, value]) => {
                return [key, {
                        query: value.getSqlBuilder().getSchema(),
                        tags: value.getTags(),
                        tokens: value.getSqlBuilder().getTokens(),
                    }];
            })),
        };
        return json;
    }
}
exports.SqlSchema = SqlSchema;
class SqlSchemaParamCase {
    cases = [];
    constructor(first) {
        this.cases.push(first);
    }
    case(key, queryBuilder, defaultUsed = true) {
        this.cases.push({
            key,
            queryBuilder,
            isUsed: defaultUsed,
        });
        return this;
    }
}
exports.SqlSchemaParamCase = SqlSchemaParamCase;
class SqlSchemaParam {
    key;
    types = [];
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
    number(defaultValue = 2) {
        this.addType("number");
        const next = this;
        next.value = defaultValue;
        return next;
    }
    boolean(defaultValue = true) {
        this.addType("boolean");
        const next = this;
        next.value = defaultValue;
        return next;
    }
    string(defaultValue = "test") {
        this.addType("string");
        const next = this;
        next.value = defaultValue;
        return next;
    }
    queryBuilder(defaultValue) {
        this.addType("query-builder");
        const next = this;
        next.value = defaultValue;
        return next;
    }
    nullable() {
        this.addType("null");
        return this;
    }
    getTypes() {
        return this.types;
    }
}
exports.SqlSchemaParam = SqlSchemaParam;
class SqlSchemaQueryBuilder {
    sqlBuilder;
    constructor(sqlSchema) {
        this.sqlBuilder = sqlSchema;
    }
    tagList = [];
    getSqlBuilder() {
        return this.sqlBuilder;
    }
    getTags() {
        return this.tagList;
    }
    tags(...tags) {
        this.tagList.push(...tags);
        return this;
    }
    execute(...params) {
        return this.sqlBuilder.execute(...params);
    }
}
exports.SqlSchemaQueryBuilder = SqlSchemaQueryBuilder;
