"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlSchemaQueryBuilder = exports.SqlSchema = void 0;
class SqlSchema {
    schema = {
        variableNames: null,
        sql: {}
    };
    constructor(variableNames) {
        this.schema.variableNames = variableNames?.replaceAll(/\s/g, "") || null;
    }
    setQuery(name, sqlSchemaQueryBuilder) {
        this.schema.sql[name] = {
            query: sqlSchemaQueryBuilder.getSqlBuilder().getSchema(),
            tags: sqlSchemaQueryBuilder.getTags(),
            tokens: sqlSchemaQueryBuilder.getSqlBuilder().getTokens(),
        };
        return this;
    }
    set = {
        query: (query) => {
            return new SqlSchemaQueryBuilder(query);
        },
    };
    query(key) {
        const sqlSchemaQueryBuilder = this.schema.sql[key];
        if (!sqlSchemaQueryBuilder)
            throw new Error(`Query ${String(key)} not found`);
        return sqlSchemaQueryBuilder;
    }
    getJSON() {
        return this.schema;
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
