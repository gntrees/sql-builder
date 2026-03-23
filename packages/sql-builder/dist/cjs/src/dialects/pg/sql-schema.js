"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlSchemaQueryBuilder = exports.SqlSchema = void 0;
class SqlSchema {
    definitions;
    constructor(definitions = {}) {
        this.definitions = definitions;
    }
    sql = {};
    set(name, sqlSchemaQueryBuilder) {
        this.sql[name] = sqlSchemaQueryBuilder;
        return this;
    }
    query(query) {
        return new SqlSchemaQueryBuilder(query);
    }
    call(name) {
        const q = this.sql[name];
        if (!q)
            throw new Error(`Query ${String(name)} not found`);
        return q.getSqlBuilder().execute();
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
}
exports.SqlSchemaQueryBuilder = SqlSchemaQueryBuilder;
