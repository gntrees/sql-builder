import type { sqlBuilder } from ".";
import type { QueryBuilder } from "./query-builder";
import type { SqlSchemaQueryBuilder } from "./sql-schema";

export type ValidationSchemaHolder<TSchema> = {
  validationSchema?: TSchema;
};

export type ExtractSchema<TSchemaQueryBuilder> = TSchemaQueryBuilder extends ValidationSchemaHolder<infer TSchema>
  ? TSchema
  : undefined;

export type SQLSchemaJSONType = {
  sql: Record<
    string,
    {
      query: ReturnType<QueryBuilder["getSchema"]>;
      tags: string[];
      tokens: ReturnType<QueryBuilder["getTokens"]>;
      sqlBuilderKey: string;
    }
  >;
  sqlBuilders: Record<string, ReturnType<typeof sqlBuilder>>;
};

export type SqlSchemaQueryMap = Record<string, SqlSchemaQueryBuilder>;
export type SqlBuilderMap = Record<string, ReturnType<typeof sqlBuilder>>;