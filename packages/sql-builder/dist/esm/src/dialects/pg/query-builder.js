import { SchemaOverrider } from "./generated/schema-overrider";
export class QueryBuilder extends SchemaOverrider {
    getSql() {
        return this.getSqlCore();
    }
    getParameters() {
        return this.getParametersCore();
    }
    getSqlAndParameters() {
        return {
            sql: this.getSqlCore(),
            parameters: this.getParametersCore(),
        };
    }
    getSqlWithParameters() {
        return this.getSqlWithParametersCore();
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
