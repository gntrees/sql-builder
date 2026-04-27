declare const validationSchemaSymbol: unique symbol;
export type ValidationSchemaCarrier<TSchema> = {
    [validationSchemaSymbol]?: TSchema;
};
export type ExtractValidationSchema<TBuilder> = TBuilder extends ValidationSchemaCarrier<infer TSchema> ? TSchema : undefined;
import type { StandardSchemaV1 } from "@standard-schema/spec";
import type { QueryBuilder } from "./query-builder";
import type { ParameterDataType, ParameterType, ParameterValueType } from "./core-query-builder.types";
export interface QueryType {
    sql: (string | ParameterType)[];
}
export type InferValidationOutput<TSchema, TFallback> = TSchema extends StandardSchemaV1 ? StandardSchemaV1.InferOutput<TSchema> : TFallback;
export type StandardSchemaLike<TInput = unknown, TOutput = TInput> = StandardSchemaV1<TInput, TOutput>;
export interface DBInstance<ReturnType = any> {
    execHandler?: ({ sql, parameters, queryBuilder, meta, }: {
        sql: string;
        parameters: (string | boolean | number | null)[];
        queryBuilder: QueryBuilder;
        meta: any;
    }) => Promise<ReturnType>;
    formatParamHandler?: "pg" | "pg-format" | (({ index, value, type, }: {
        index: number;
        value: ParameterValueType;
        type: ParameterDataType;
    }) => string);
}
export interface RequiredDBInstance extends DBInstance {
    execHandler: NonNullable<DBInstance["execHandler"]>;
    formatParamHandler: NonNullable<DBInstance["formatParamHandler"]>;
}
export {};
