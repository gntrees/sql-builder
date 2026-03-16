"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilder = void 0;
const schema_overrider_1 = require("./generated/schema-overrider");
class QueryBuilder extends schema_overrider_1.SchemaOverrider {
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
        if (!this.queryInstance)
            throw new Error("QueryInstance is required for this operation");
        const queryInstance = this.queryInstance;
        const data = this.getSqlAndParameters();
        return queryInstance.getDbInstance().execHandler({
            sql: data.sql,
            parameters: data.parameters,
            queryBuilder: this,
            meta,
        });
    }
}
exports.QueryBuilder = QueryBuilder;
