import { SchemaOverrider } from "./generated/schema-overrider";
import type { ExtractValidationSchema, InferValidationOutput, StandardSchemaLike, ValidationSchemaCarrier } from "./query-builder.types";
export declare class QueryBuilder extends SchemaOverrider {
    protected validationSchema: StandardSchemaLike | undefined;
    getSql(): string;
    getSqlParameters(): import("./core-query-builder.types").ParameterValueType[];
    getSqlAndParameters(): {
        sql: string;
        parameters: import("./core-query-builder.types").ParameterValueType[];
    };
    getSqlWithParameters(): string;
    setValidation<TSchema extends StandardSchemaLike>(schema: TSchema): this & ValidationSchemaCarrier<TSchema>;
    execute<TThis extends this>(this: TThis, meta?: any): Promise<InferValidationOutput<ExtractValidationSchema<TThis>, any>>;
}
