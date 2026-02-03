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

