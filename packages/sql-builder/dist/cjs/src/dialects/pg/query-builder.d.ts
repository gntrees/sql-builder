import { SchemaOverrider } from "./generated/schema-overrider";
import type { InferValidationOutput, StandardSchemaLike } from "./types";
declare const validationSchemaSymbol: unique symbol;
type ValidationSchemaCarrier<TSchema> = {
    [validationSchemaSymbol]?: TSchema;
};
type ExtractValidationSchema<TBuilder> = TBuilder extends ValidationSchemaCarrier<infer TSchema> ? TSchema : undefined;
export declare class QueryBuilder extends SchemaOverrider {
    protected validationSchema: StandardSchemaLike | undefined;
    getSql(): string;
    getSqlParameters(): import("./types").ParameterValueType[];
    getSqlAndParameters(): {
        sql: string;
        parameters: import("./types").ParameterValueType[];
    };
    getSqlWithParameters(): string;
    setValidation<TSchema extends StandardSchemaLike>(schema: TSchema): this & ValidationSchemaCarrier<TSchema>;
    execute<TThis extends this>(this: TThis, meta?: any): Promise<InferValidationOutput<ExtractValidationSchema<TThis>, any>>;
}
export {};
