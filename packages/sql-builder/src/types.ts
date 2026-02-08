import type { BaseRawQueryBuilder } from "./base-raw-query-builder";
import type { ParameterType } from "./base-raw-query-builder";
import type { QueryBuilder } from "./query-builder";

// export type OnCommitAction = "ONCOMMIT_NOOP" | "ONCOMMIT_PRESERVE_ROWS" | "ONCOMMIT_DELETE_ROWS" | "ONCOMMIT_DROP";

// export interface SetOperation {
//     op?: "SETOP_NONE" | "SETOP_UNION" | "SETOP_INTERSECT" | "SETOP_EXCEPT";
//     all?: boolean;
// }

// export type SetOperationStmt = SetOperation | undefined;

// export interface IntoClause {
//     rel?: RangeVar;
//     colNames?: Statement[];
//     accessMethod?: string;
//     options?: Statement[];
//     onCommit?: OnCommitAction;
//     tableSpaceName?: string;
//     viewQuery?: Statement;
//     skipData?: boolean;
// }
// export interface RangeVar {
//     catalogname?: string;
//     schemaname?: string;
//     relname?: string;
//     inh?: boolean;
//     relpersistence?: string;
//     alias?: Alias;
//     location?: number;
// }
// export interface Alias {
//     aliasname?: string;
//     colnames?: Statement[];
// }

export interface QueryType {
    sql: (string|ParameterType)[];
    // parameters: ParameterType[];
}
export interface DBInstance<ReturnType = any> {
    execHandler: ({sql,parameters,meta}:{sql:string, parameters:(string|boolean|number|null)[], queryBuilder:QueryBuilder,meta: any },) => Promise<ReturnType>;
    formatParamHandler?: RequiredDBInstance["formatParamHandler"] | null;
}

export interface RequiredDBInstance extends DBInstance {
    formatParamHandler: "pg" | "pg-format" | (({
        index, value, type
    }:{
        index: number
        value: ParameterValueType
        type: ParameterDataType
    }) => string);
}

export type ParameterDataType = "literal" | "identifier" | "percent" | "string";
export type ParameterValueType = string | number | boolean | null;

export type OperatorType =
    | "="
    | "<>"
    | "!="
    | "<"
    | ">"
    | "<="
    | ">="
    | "!"
    | "~"
    | "~*"
    | "!~"
    | "!~*"
    | "&"
    | "|"
    | "^"
    | "<<"
    | "<<="
    | ">>"
    | ">>="
    | "&&"
    | "||"
    | "@"
    | "#"
    | "+"
    | "-"
    | "*"
    | "/"
    | "%"
    | "OR"
    | "AND"
    | "IS"
    | "IS NOT"
    | "LIKE"
    | "NOT LIKE"
    | "ILIKE"
    | "NOT ILIKE"
    | "SIMILAR TO"
    | "NOT SIMILAR TO"
    | "^@"
    // Geometric operators (PostgreSQL)
    | "@-@"   // total length (lseg, path)
    | "@@"    // center
    | "##"    // closest point
    | "<->"   // distance
    | "@>"    // contains
    | "<@"    // contained by
    | "&<"    // does not extend to right
    | "&>"    // does not extend to left
    | "<<|"   // strictly below
    | "|>>"   // strictly above
    | "&<|"   // does not extend above
    | "|&>"   // does not extend below
    | "<^"    // below (deprecated alias)
    | ">^"    // above (deprecated alias)
    | "?#"    // intersect
    | "?-"    // horizontal / horizontally aligned
    | "?|"    // vertical / vertically aligned
    | "?-|"   // perpendicular
    | "?||"   // parallel
    | "~="    // same as
    ;

export type OperatorStatement =
    | OperatorType
    | QueryBuilder

// Unified Statement type for all SQL values
// Interpretation rules:
// - number | string | boolean | null -> treated as literal values (data)
// - QueryBuilder -> used for identifiers (columns, tables) and subqueries
// - ParameterType -> internal parameter type for resolved values
// - undefined -> return base function OR omit parameter (for postgres functions)
export type Statement = QueryBuilder | ParameterType | number | string | boolean | null | undefined;
export type StatementArrayValue<T> = Array<T | StatementArrayValue<T>>;

export type IdentifierInput = Statement | Record<string, Statement>;