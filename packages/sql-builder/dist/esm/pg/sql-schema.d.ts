import type { QueryBuilder } from "./query-builder";
import type { InferValidationOutput, StandardSchemaLike } from "./types";
type ValidationSchemaHolder<TSchema> = {
    validationSchema?: TSchema;
};
type ExtractSchema<TSchemaQueryBuilder> = TSchemaQueryBuilder extends ValidationSchemaHolder<infer TSchema> ? TSchema : undefined;
type SQLSchemaJSONType = {
    variableNames: string | null;
    sql: Record<string, {
        query: ReturnType<QueryBuilder["getSchema"]>;
        tags: string[];
        tokens: ReturnType<QueryBuilder["getTokens"]>;
    }>;
};
export declare class SqlSchema<T extends Record<string, SqlSchemaQueryBuilder<any>> = {}> {
    protected schema: SQLSchemaJSONType;
    constructor(variableNames?: SQLSchemaJSONType['variableNames']);
    setQuery<K extends string, V extends SqlSchemaQueryBuilder<any>>(name: K, sqlSchemaQueryBuilder: V): SqlSchema<T & Record<K, V>>;
    set: {
        query: <TQueryBuilder extends QueryBuilder>(query: TQueryBuilder) => SqlSchemaQueryBuilder<TQueryBuilder>;
    };
    query<K extends keyof T>(key: K): T[K];
    getJSON(): SQLSchemaJSONType;
}
export declare class SqlSchemaQueryBuilder<TQueryBuilder extends QueryBuilder = QueryBuilder> {
    protected sqlBuilder: TQueryBuilder;
    protected validationSchema: unknown;
    constructor(sqlSchema: TQueryBuilder);
    protected tagList: string[];
    getSqlBuilder(): TQueryBuilder;
    getTags(): string[];
    tags(...tags: string[]): this;
    execute<TThis extends this>(this: TThis, ...params: Parameters<QueryBuilder["execute"]>): Promise<InferValidationOutput<ExtractSchema<TThis>, Awaited<ReturnType<TQueryBuilder["execute"]>>>>;
    validation<TSchema extends StandardSchemaLike>(schema: TSchema): this & ValidationSchemaHolder<TSchema>;
    setParams(...params: Parameters<TQueryBuilder["setParams"]>): this & ValidationSchemaHolder<ExtractSchema<this>>;
}
export {};
