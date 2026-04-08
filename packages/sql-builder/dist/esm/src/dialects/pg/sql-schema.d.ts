import type { QueryBuilder } from "./query-builder";
export declare class SqlSchema<T extends Record<string, SqlSchemaQueryBuilder> = {}> {
    definitions: T;
    constructor(definitions?: T);
    protected sql: Record<string, SqlSchemaQueryBuilder>;
    setQuery<K extends string, V extends SqlSchemaQueryBuilder>(name: K, sqlSchemaQueryBuilder: V): SqlSchema<T & Record<K, V>>;
    set: {
        query: (query: QueryBuilder) => SqlSchemaQueryBuilder;
    };
    param: {
        set(key: string): SqlSchemaParam<never>;
        case(key: string, queryBuilder: QueryBuilder, defaultUsed?: boolean): SqlSchemaParamCase;
    };
    query(key: keyof T): SqlSchemaQueryBuilder;
    getJSON(): {
        sql: {
            [k: string]: {
                query: import("@gntrees/sql-builder-cli").FunctionListType[];
                tags: string[];
                tokens: (string | import("./base-raw-query-builder").ParameterType)[];
            };
        };
    };
}
type SqlSchemaParamCaseType = {
    key: string;
    queryBuilder: QueryBuilder;
    isUsed?: boolean;
};
type SqlSchemaParamType = "number" | "boolean" | "string" | "query-builder" | "null";
type SqlSchemaParamTypeValueMap = {
    number: number;
    boolean: boolean;
    string: string;
    "query-builder": QueryBuilder | undefined;
    null: null;
};
type SqlSchemaParamValue<T extends SqlSchemaParamType> = SqlSchemaParamTypeValueMap[T];
type SqlSchemaParamAllValue = boolean | number | string | QueryBuilder | null;
type SqlSchemaParamValueUnion<T extends SqlSchemaParamType> = [
    T
] extends [never] ? SqlSchemaParamAllValue : Exclude<SqlSchemaParamValue<T>, undefined> | (undefined extends SqlSchemaParamValue<T> ? SqlSchemaParamAllValue : never);
export declare class SqlSchemaParamCase {
    protected cases: SqlSchemaParamCaseType[];
    constructor(first: SqlSchemaParamCaseType);
    case(key: string, queryBuilder: QueryBuilder, defaultUsed?: boolean): this;
}
export declare class SqlSchemaParam<T extends SqlSchemaParamType = never> {
    protected key: string;
    protected types: SqlSchemaParamType[];
    constructor(key: string);
    value: SqlSchemaParamValueUnion<T>;
    protected addType(type: SqlSchemaParamType): void;
    getKey(): string;
    number(defaultValue?: number): SqlSchemaParam<"number" | T>;
    boolean(defaultValue?: boolean): SqlSchemaParam<"boolean" | T>;
    string(defaultValue?: string): SqlSchemaParam<"string" | T>;
    queryBuilder(defaultValue?: QueryBuilder): SqlSchemaParam<"query-builder" | T>;
    nullable(): SqlSchemaParam<T | "null">;
    getTypes(): T[];
}
export declare class SqlSchemaQueryBuilder {
    protected sqlBuilder: QueryBuilder;
    constructor(sqlSchema: QueryBuilder);
    protected tagList: string[];
    getSqlBuilder(): QueryBuilder;
    getTags(): string[];
    tags(...tags: string[]): this;
    execute(...params: Parameters<QueryBuilder["execute"]>): Promise<any>;
}
export {};
