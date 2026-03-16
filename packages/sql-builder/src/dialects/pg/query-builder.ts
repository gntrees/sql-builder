import { SchemaOverrider } from "./generated/schema-overrider";

export class QueryBuilder extends SchemaOverrider {
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
    execute(meta?: any) {
        if (!this.queryInstance) throw new Error("QueryInstance is required for this operation");
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
