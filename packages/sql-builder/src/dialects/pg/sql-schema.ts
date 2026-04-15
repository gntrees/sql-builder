import type { QueryBuilder } from "./query-builder";
import type { InferValidationOutput, StandardSchemaLike } from "./types";

type ValidationSchemaHolder<TSchema> = {
    validationSchema?: TSchema;
};

type ExtractSchema<TSchemaQueryBuilder> = TSchemaQueryBuilder extends ValidationSchemaHolder<infer TSchema>
    ? TSchema
    : undefined;

export class SqlSchema<T extends Record<string, SqlSchemaQueryBuilder<any>> = {}> {
    constructor(public definitions: T = {} as T) { }
    protected sql: Record<string, SqlSchemaQueryBuilder<any>> = {}
    setQuery<K extends string, V extends SqlSchemaQueryBuilder<any>>(
        name: K,
        sqlSchemaQueryBuilder: V
    ): SqlSchema<T & Record<K, V>> {
        this.sql[name] = sqlSchemaQueryBuilder;
        return this as unknown as SqlSchema<T & Record<K, V>>;
    }
    public set = {
        query: <TQueryBuilder extends QueryBuilder>(query: TQueryBuilder) => {
            return new SqlSchemaQueryBuilder(query);
        },
    }
    query<K extends keyof T>(key: K): T[K] {
        const sqlSchemaQueryBuilder = this.sql[key as string];
        if (!sqlSchemaQueryBuilder) throw new Error(`Query ${String(key)} not found`);
        return sqlSchemaQueryBuilder as T[K];
    }
    getJSON() {
        const json = {
            sql: Object.fromEntries(Object.entries(this.sql).map(([key, value]) => {
                return [key, {
                    query: value.getSqlBuilder().getSchema(),
                    tags: value.getTags(),
                    tokens: value.getSqlBuilder().getTokens(),
                }]
            })),
        };
        return json;
    }
}

export class SqlSchemaQueryBuilder<TQueryBuilder extends QueryBuilder = QueryBuilder> {
    protected sqlBuilder: TQueryBuilder;
    protected validationSchema: unknown = undefined;
    constructor(sqlSchema: TQueryBuilder) {
        this.sqlBuilder = sqlSchema;
    }
    protected tagList: string[] = [];
    getSqlBuilder(): TQueryBuilder {
        return this.sqlBuilder;
    }
    getTags() {
        return this.tagList;
    }
    tags(...tags: string[]) {
        this.tagList.push(...tags);
        return this;
    }
    async execute<TThis extends this>(this: TThis, ...params: Parameters<QueryBuilder["execute"]>): Promise<InferValidationOutput<ExtractSchema<TThis>, Awaited<ReturnType<TQueryBuilder["execute"]>>> > {
        if (typeof this.validationSchema !== "undefined") {
            this.sqlBuilder.setValidation(this.validationSchema as StandardSchemaLike);
        }
        return await this.sqlBuilder.execute(...params) as InferValidationOutput<ExtractSchema<TThis>, Awaited<ReturnType<TQueryBuilder["execute"]>>>;
    }
    validation<TSchema extends StandardSchemaLike>(schema: TSchema): this & ValidationSchemaHolder<TSchema> {
        this.validationSchema = schema;
        return this as this & ValidationSchemaHolder<TSchema>;
    }
    setParams(...params: Parameters<TQueryBuilder["setParams"]>) {
        this.sqlBuilder.setParams(...(params as [any]));
        return this as unknown as this & ValidationSchemaHolder<ExtractSchema<this>>;
    }
}
