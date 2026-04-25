import type { QueryBuilder } from "./query-builder";

export type ValidationSchemaHolder<TSchema> = {
  validationSchema?: TSchema;
};

export type ExtractSchema<TSchemaQueryBuilder> = TSchemaQueryBuilder extends ValidationSchemaHolder<infer TSchema>
  ? TSchema
  : undefined;

export type SQLSchemaJSONType = {
  variableNames: string | null;
  sql: Record<
    string,
    {
      query: ReturnType<QueryBuilder["getSchema"]>;
      tags: string[];
      tokens: ReturnType<QueryBuilder["getTokens"]>;
    }
  >;
};
