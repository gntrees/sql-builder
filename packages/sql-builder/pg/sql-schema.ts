import type { QueryBuilder } from "./query-builder";
import type { InferValidationOutput, StandardSchemaLike } from "./query-builder.types";
import { sqlBuilder } from "./index";
import type {
  ExtractSchema,
  SqlBuilderMap,
  SQLSchemaJSONType,
  SqlSchemaQueryMap,
  ValidationSchemaHolder,
} from "./sql-schema.types";



export class SqlSchema<
    TQueryMap extends SqlSchemaQueryMap = {},
    TBuilderMap extends SqlBuilderMap = {},
> {
    protected schema: SQLSchemaJSONType = {
        sql: {},
        sqlBuilders: {},
    };
    setQuery<K extends string, V extends SqlSchemaQueryBuilder>(
        name: K,
        sqlSchemaQueryBuilder: V
    ): SqlSchema<TQueryMap & Record<K, V>, TBuilderMap> {
        const sqlBuilderKey = sqlSchemaQueryBuilder.getSqlBuilder().getKey();
        if (typeof sqlBuilderKey !== "string") {
            throw new Error(`SqlBuilder key is not set for query ${name}`);
        }
        this.schema.sql[name] = {
            query: sqlSchemaQueryBuilder.getSqlBuilder().getSchema(),
            tags: sqlSchemaQueryBuilder.getTags(),
            tokens: sqlSchemaQueryBuilder.getSqlBuilder().getTokens(),
            sqlBuilderKey,
        };
        return this as unknown as SqlSchema<TQueryMap & Record<K, V>, TBuilderMap>;
    }
    public set = {
        query: <TQueryBuilder extends QueryBuilder>(query: TQueryBuilder) => {
            return new SqlSchemaQueryBuilder(query);
        },
    }
    createSqlBuilder<K extends string>(key: K, variableName?: string): SqlSchema<TQueryMap, TBuilderMap & Record<K, ReturnType<typeof sqlBuilder>>> {
        this.schema.sqlBuilders[key] = sqlBuilder(variableName).setKey(key);
        return this as unknown as SqlSchema<TQueryMap, TBuilderMap & Record<K, ReturnType<typeof sqlBuilder>>>;
    }
    getSqlBuilder<K extends keyof TBuilderMap>(key: K): TBuilderMap[K] {
        const queryBuilder = this.schema.sqlBuilders[key as string];
        if (!queryBuilder) throw new Error(`SqlBuilder ${String(key)} not found`);
        return queryBuilder as TBuilderMap[K];
    }
    query<K extends keyof TQueryMap>(key: K): TQueryMap[K] {
        const sqlSchemaQueryBuilder = this.schema.sql[key as string];
        if (!sqlSchemaQueryBuilder) throw new Error(`Query ${String(key)} not found`);
        return sqlSchemaQueryBuilder as unknown as TQueryMap[K];
    }
    getJSON() {
        return this.schema;
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
    async execute<TThis extends this>(this: TThis, ...params: Parameters<QueryBuilder["execute"]>): Promise<InferValidationOutput<ExtractSchema<TThis>, Awaited<ReturnType<TQueryBuilder["execute"]>>>> {
        if (typeof this.validationSchema !== "undefined") {
            this.sqlBuilder.setValidation(this.validationSchema as StandardSchemaLike);
        }
        return await this.sqlBuilder.execute(...params) as InferValidationOutput<ExtractSchema<TThis>, Awaited<ReturnType<TQueryBuilder["execute"]>>>;
    }
    validation<TSchema extends StandardSchemaLike>(schema: TSchema): this & ValidationSchemaHolder<TSchema> {
        this.validationSchema = schema;
        return this as this & ValidationSchemaHolder<TSchema>;
    }
    setParams(...params: Parameters<QueryBuilder["setParams"]>) {
        (this.sqlBuilder as QueryBuilder).setParams(params[0] as Parameters<QueryBuilder["setParams"]>[0]);
        return this as unknown as this & ValidationSchemaHolder<ExtractSchema<this>>;
    }
}

export function sqlSchema() {
  return new SqlSchema();
}
