"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlSchemaQueryBuilder = exports.SqlSchema = void 0;
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
class SqlSchemaQueryBuilder {
    sqlBuilder;
    validationSchema = undefined;
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
    async execute(...params) {
        if (typeof this.validationSchema !== "undefined") {
            this.sqlBuilder.setValidation(this.validationSchema);
        }
        return await this.sqlBuilder.execute(...params);
    }
    validation(schema) {
        this.validationSchema = schema;
        return this;
    }
    setParams(...params) {
        this.sqlBuilder.setParams(...params);
        return this;
    }
}
exports.SqlSchemaQueryBuilder = SqlSchemaQueryBuilder;
