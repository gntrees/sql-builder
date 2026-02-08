"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilder = void 0;
const override_query_builder_1 = require("./override-query-builder");
class QueryBuilder extends override_query_builder_1.OverrideQueryBuilder {
    getSql() {
        return this.getSqlWithInstance();
    }
    getParameters() {
        return this.getParametersWithInstance();
    }
    getSqlAndParameters() {
        return {
            sql: this.getSqlWithInstance(),
            parameters: this.getParametersWithInstance(),
        };
    }
    getSqlWithParameters() {
        return this.getSqlWithParametersWithInstance();
    }
    execute(meta) {
        const queryInstance = this.requireQueryInstance();
        const data = this.getSqlAndParameters();
        queryInstance.getDbInstance().execHandler({
            sql: data.sql,
            parameters: data.parameters,
            queryBuilder: this,
            meta,
        });
    }
}
exports.QueryBuilder = QueryBuilder;
