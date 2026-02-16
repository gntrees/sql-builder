import { OverrideQueryBuilder } from "./override-query-builder";

export class QueryBuilder extends OverrideQueryBuilder {
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
        queryInstance.getDbInstance().execHandler({
            sql: data.sql,
            parameters: data.parameters,
            queryBuilder: this,
            meta,
        });
    }

}

