import type { ParameterType } from "./base-raw-query-builder";
import type { QueryBuilder } from "./query-builder";
import type { DBSchema, TableSchema, ColumnSchema } from "./db-schema";
export interface QueryType {
    sql: (string | ParameterType)[];
}
export interface DBInstance<ReturnType = any> {
    execHandler?: ({ sql, parameters, queryBuilder, meta, }: {
        sql: string;
        parameters: (string | boolean | number | null)[];
        queryBuilder: QueryBuilder;
        meta: any;
    }) => Promise<ReturnType>;
    formatParamHandler?: RequiredDBInstance["formatParamHandler"] | null;
}
export interface RequiredDBInstance extends DBInstance {
    execHandler: NonNullable<DBInstance["execHandler"]>;
    formatParamHandler: "pg" | "pg-format" | (({ index, value, type }: {
        index: number;
        value: ParameterValueType;
        type: ParameterDataType;
    }) => string);
}
export type ParameterDataType = "literal" | "identifier" | "percent" | "string";
export type ParameterValueType = string | number | boolean | null;
export declare const OPERATORS: readonly ["=", "<>", "!=", "<", ">", "<=", ">=", "!", "~", "~*", "!~", "!~*", "&", "|", "^", "<<", "<<=", ">>", ">>=", "&&", "||", "@", "#", "?", "+", "-", "*", "/", "%", "OR", "AND", "IS", "IS NOT", "LIKE", "NOT LIKE", "ILIKE", "NOT ILIKE", "SIMILAR TO", "NOT SIMILAR TO", "^@", "ANY", "ALL", "DISTINCT", "NOT_DISTINCT", "NULLIF", "IN", "SIMILAR", "BETWEEN", "NOT_BETWEEN", "BETWEEN_SYM", "NOT_BETWEEN_SYM", "@-@", "@@", "##", "<->", "@>", "<@", "&<", "&>", "<<|", "|>>", "&<|", "|&>", "<^", ">^", "?#", "?-", "?|", "?-|", "?||", "~="];
export type OperatorType = typeof OPERATORS[number];
export type Statement = QueryBuilder | number | string | boolean | null | undefined | DBSchema | TableSchema | ColumnSchema;
export type AllPossibleFunctionParamType = Statement | Statement[] | Record<string, Statement> | Record<string, Statement>[] | (Statement | Statement[] | Record<string, Statement> | (Statement[] | undefined) | ((Statement | Record<string, Statement>)[]) | (Statement | Statement[]) | Record<string, Statement>[])[] | (Record<string, Statement | Statement[] | Record<string, Statement> | Record<string, Statement>[]> | undefined)[];
