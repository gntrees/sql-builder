import type { QueryBuilder } from "./query-builder";
import type { InferValidationOutput, StandardSchemaLike } from "./types";
type ValidationSchemaHolder<TSchema> = {
    validationSchema?: TSchema;
};
type ExtractSchema<TSchemaQueryBuilder> = TSchemaQueryBuilder extends ValidationSchemaHolder<infer TSchema> ? TSchema : undefined;
export declare class SqlSchema<T extends Record<string, SqlSchemaQueryBuilder<any>> = {}> {
    definitions: T;
    constructor(definitions?: T);
    protected sql: Record<string, SqlSchemaQueryBuilder<any>>;
    setQuery<K extends string, V extends SqlSchemaQueryBuilder<any>>(name: K, sqlSchemaQueryBuilder: V): SqlSchema<T & Record<K, V>>;
    set: {
        query: <TQueryBuilder extends QueryBuilder>(query: TQueryBuilder) => SqlSchemaQueryBuilder<TQueryBuilder>;
    };
    query<K extends keyof T>(key: K): T[K];
    getJSON(): {
        sql: {
            [k: string]: {
                query: any;
                tags: string[];
                tokens: any;
            };
        };
    };
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
    setParams(...params: Parameters<TQueryBuilder["setParams"]>): TQueryBuilder;
}
export {};
