import { SchemaOverrider } from "./generated/schema-overrider";
import type { InferValidationOutput, StandardSchemaLike } from "./types";

declare const validationSchemaSymbol: unique symbol;
type ValidationSchemaCarrier<TSchema> = {
    [validationSchemaSymbol]?: TSchema;
};

type ExtractValidationSchema<TBuilder> = TBuilder extends ValidationSchemaCarrier<infer TSchema>
    ? TSchema
    : undefined;

export class QueryBuilder extends SchemaOverrider {
    protected validationSchema: StandardSchemaLike | undefined = undefined;
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
    setValidation<TSchema extends StandardSchemaLike>(schema: TSchema): this & ValidationSchemaCarrier<TSchema> {
        this.validationSchema = schema;
        return this as this & ValidationSchemaCarrier<TSchema>;
    }
    execute<TThis extends this>(this: TThis, meta?: any): Promise<InferValidationOutput<ExtractValidationSchema<TThis>, any>> {
        if (!this.queryInstance) throw new Error("QueryInstance is required for this operation");
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
            return resultPromise as Promise<InferValidationOutput<ExtractValidationSchema<TThis>, any>>;
        }
        return resultPromise.then(async (result) => {
            const validationResult = await this.validationSchema!["~standard"].validate(result);
            if (validationResult.issues) {
                throw new Error(`Validation failed: ${validationResult.issues.map((issue) => issue.message).join("; ")}`);
            }
            return validationResult.value;
        }) as Promise<InferValidationOutput<ExtractValidationSchema<TThis>, any>>;
    }

}
