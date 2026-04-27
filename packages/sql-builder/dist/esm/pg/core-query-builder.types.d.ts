import type { DBSchema, TableSchema, ColumnSchema } from "./db-schema";
import type { QueryBuilder } from "./query-builder";
import type { SqlSchemaParam } from "./sql-param";
export type InstanceStructureSerializableValue = string | number | boolean | null | undefined | {
    kind: "query-builder";
    value: InstanceStructureNode[];
} | {
    kind: "identifier";
    value: string;
} | {
    kind: "schema-param";
    value: {
        key: string;
        types: ("number" | "boolean" | "string" | "null")[];
        hasDefault: boolean;
        defaultValue?: string | number | boolean | null;
    };
} | {
    kind: "array";
    value: InstanceStructureSerializableValue[];
} | {
    kind: "object";
    value: Record<string, InstanceStructureSerializableValue>;
};
export type InstanceStructureNode = {
    name: string;
    args: InstanceStructureSerializableValue[];
};
export type PrimitiveSchemaParam = string | number | boolean | null;
export interface RuntimeParams {
    [key: SqlSchemaParam["key"]]: PrimitiveSchemaParam | RuntimeParams;
}
export type QueryTokens = QueryType["sql"];
export type Statement = QueryBuilder | number | string | boolean | null | undefined | DBSchema | TableSchema | ColumnSchema | SqlSchemaParam<SqlSchemaParam["key"], SqlSchemaParamType>;
export type AllPossibleFunctionParamType = Statement | Statement[] | Record<string, Statement> | Record<string, Statement>[] | (Statement | Statement[] | Record<string, Statement> | (Statement[] | undefined) | ((Statement | Record<string, Statement>)[]) | (Statement | Statement[]) | Record<string, Statement>[])[] | (Record<string, Statement | Statement[] | Record<string, Statement> | Record<string, Statement>[]> | undefined)[];
export declare const OPERATORS: readonly ["=", "<>", "!=", "<", ">", "<=", ">=", "!", "~", "~*", "!~", "!~*", "&", "|", "^", "<<", "<<=", ">>", ">>=", "&&", "||", "@", "#", "?", "+", "-", "*", "/", "%", "OR", "AND", "IS", "IS NOT", "LIKE", "NOT LIKE", "ILIKE", "NOT ILIKE", "SIMILAR TO", "NOT SIMILAR TO", "^@", "ANY", "ALL", "DISTINCT", "NOT_DISTINCT", "NULLIF", "IN", "SIMILAR", "BETWEEN", "NOT_BETWEEN", "BETWEEN_SYM", "NOT_BETWEEN_SYM", "@-@", "@@", "##", "<->", "@>", "<@", "&<", "&>", "<<|", "|>>", "&<|", "|&>", "<^", ">^", "?#", "?-", "?|", "?-|", "?||", "~="];
export type OperatorType = (typeof OPERATORS)[number];
export type ParameterDataType = "literal" | "identifier" | "percent" | "string";
export type ParameterValueType = string | number | boolean | null;
export declare class ParameterType {
    value: ParameterValueType;
    type: ParameterDataType;
    constructor({ value, type, }: {
        value: ParameterValueType;
        type: ParameterDataType;
    });
}
import functionList from "./generated/function-list.json";
import type { QueryType } from "./query-builder.types";
import type { SqlSchemaParamType } from "./sql-param.types";
export { functionList };
export type FunctionList = typeof functionList;
