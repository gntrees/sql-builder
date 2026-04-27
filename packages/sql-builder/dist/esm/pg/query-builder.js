import { SchemaOverrider } from "./generated/schema-overrider";
export class QueryBuilder extends SchemaOverrider {
    validationSchema = undefined;
    getSql() {
        return this.getSqlCore();
    }
    getSqlParameters() {
        return this.getSqlParametersCore();
    }
    getSqlAndParameters() {
        return {
            sql: this.getSqlCore(),
            parameters: this.getSqlParametersCore(),
        };
    }
    getSqlWithParameters() {
        return this.getSqlWithParametersCore();
    }
    setValidation(schema) {
        this.validationSchema = schema;
        return this;
    }
    execute(meta) {
        if (!this.queryInstance)
            throw new Error("QueryInstance is required for this operation");
        const queryInstance = this.queryInstance;
        const data = this.getSqlAndParameters();
        const dbInstance = queryInstance.getDbInstance();
        const resultPromise = dbInstance.execHandler({
            sql: data.sql,
            parameters: data.parameters,
            queryBuilder: this,
            meta,
        });
        if (typeof this.validationSchema === "undefined") {
            return resultPromise;
        }
        return resultPromise.then(async (result) => {
            const validationResult = await this.validationSchema["~standard"].validate(result);
            if (validationResult.issues) {
                throw new Error(`Validation failed: ${validationResult.issues.map((issue) => issue.message).join("; ")}`);
            }
            return validationResult.value;
        });
    }
}
