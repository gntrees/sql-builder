import type { ParameterType } from "./base-raw-query-builder";
import type { QueryBuilder } from "./query-builder";
export interface QueryType {
    sql: (string | ParameterType)[];
}
export interface DBInstance<ReturnType = any> {
    execHandler: ({ sql, parameters, meta }: {
        sql: string;
        parameters: (string | boolean | number | null)[];
        queryBuilder: QueryBuilder;
        meta: any;
    }) => Promise<ReturnType>;
    formatParamHandler?: RequiredDBInstance["formatParamHandler"] | null;
}
export interface RequiredDBInstance extends DBInstance {
    formatParamHandler: "pg" | "pg-format" | (({ index, value, type }: {
        index: number;
        value: ParameterValueType;
        type: ParameterDataType;
    }) => string);
}
export type ParameterDataType = "literal" | "identifier" | "percent" | "string";
export type ParameterValueType = string | number | boolean | null;
export type OperatorType = "=" | "<>" | "!=" | "<" | ">" | "<=" | ">=" | "!" | "~" | "~*" | "!~" | "!~*" | "&" | "|" | "^" | "<<" | "<<=" | ">>" | ">>=" | "&&" | "||" | "@" | "#" | "+" | "-" | "*" | "/" | "%" | "OR" | "AND" | "IS" | "IS NOT" | "LIKE" | "NOT LIKE" | "ILIKE" | "NOT ILIKE" | "SIMILAR TO" | "NOT SIMILAR TO" | "^@" | "@-@" | "@@" | "##" | "<->" | "@>" | "<@" | "&<" | "&>" | "<<|" | "|>>" | "&<|" | "|&>" | "<^" | ">^" | "?#" | "?-" | "?|" | "?-|" | "?||" | "~=";
export type OperatorStatement = OperatorType | QueryBuilder;
export type Statement = QueryBuilder | ParameterType | number | string | boolean | null | undefined;
export type StatementArrayValue<T> = Array<T | StatementArrayValue<T>>;
export type IdentifierInput = Statement | Record<string, Statement>;
