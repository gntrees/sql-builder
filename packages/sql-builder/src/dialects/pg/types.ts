import type { ParameterType } from "./base-raw-query-builder";
import type { QueryBuilder } from "./query-builder";

export interface QueryType {
    sql: (string | ParameterType)[];
}

// type PrimitiveType = string | number | boolean | null | undefined;
// type SchemaParamType = PrimitiveType | SchemaType | SchemaParamType[];
// type RecordSchemaParamType = Record<string, SchemaParamType>;

// export type  SchemaType {
//     type: "function" | "array" | "object" | "primitive";
//     name: string | null;
//     params: (SchemaParamType | RecordSchemaParamType)[] 
// }


export interface DBInstance<ReturnType = any> {
    execHandler?: ({
        sql,
        parameters,
        queryBuilder,
        meta,
    }: {
        sql: string,
        parameters: (string | boolean | number | null)[],
        queryBuilder: QueryBuilder,
        meta: any,
    },) => Promise<ReturnType>;
    formatParamHandler?: RequiredDBInstance["formatParamHandler"] | null;
}

export interface RequiredDBInstance extends DBInstance {
    execHandler: NonNullable<DBInstance["execHandler"]>;
    formatParamHandler: "pg" | "pg-format" | (({
        index, value, type
    }: {
        index: number
        value: ParameterValueType
        type: ParameterDataType
    }) => string);
}

export type ParameterDataType = "literal" | "identifier" | "percent" | "string";
export type ParameterValueType = string | number | boolean | null;

// Single source of truth for SQL operators
export const OPERATORS = [
    "=", "<>", "!=", "<", ">", "<=", ">=", "!", "~", "~*", "!~", "!~*",
    "&", "|", "^", "<<", "<<=", ">>", ">>=", "&&", "||", "@", "#", "?",
    "+", "-", "*", "/", "%", "OR", "AND", "IS", "IS NOT",
    "LIKE", "NOT LIKE", "ILIKE", "NOT ILIKE", "SIMILAR TO", "NOT SIMILAR TO",
    "^@", "ANY", "ALL", "DISTINCT", "NOT_DISTINCT", "NULLIF", "IN",
    "SIMILAR", "BETWEEN", "NOT_BETWEEN", "BETWEEN_SYM", "NOT_BETWEEN_SYM",
    "@-@", "@@", "##", "<->", "@>", "<@", "&<", "&>", "<<|",
    "|>>", "&<|", "|&>", "<^", ">^", "?#", "?-", "?|", "?-|", "?||", "~="
] as const;

export type OperatorType = typeof OPERATORS[number];

// export type OperatorStatement =
//     | OperatorType
//     | QueryBuilder

// Unified Statement type for all SQL values
// Interpretation rules:
// - number | string | boolean | null -> treated as literal values (data)
// - QueryBuilder -> used for identifiers (columns, tables) and subqueries
// - ParameterType -> internal parameter type for resolved values
// - undefined -> return base function OR omit parameter (for postgres functions)
export type Statement = QueryBuilder | number | string | boolean | null | undefined;
export type AllPossibleFunctionParamType =
    Statement |
    Statement[] |
    Record<string, Statement> |
    Record<string, Statement>[] |
    (Statement |
        Statement[] |
        Record<string, Statement> |
        (Statement[] | undefined) |
        ((Statement | Record<string, Statement>)[]) |
        (Statement | Statement[]) |
        // Record<string, Statement | Statement[]> | 
        // Record<string, (Record<string, Statement> | Record<string, Statement>[])> |
        Record<string, Statement>[])[] |
    (Record<string, Statement | Statement[] | Record<string, Statement> | Record<string, Statement>[]> | undefined)[]

// ParameterType | 
// export type StatementArrayValue<T> = Array<T | StatementArrayValue<T>>;

// export type IdentifierInput = Statement | Record<string, Statement>;
