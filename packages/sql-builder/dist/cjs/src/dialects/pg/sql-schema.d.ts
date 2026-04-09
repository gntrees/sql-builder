import type { QueryBuilder } from "./query-builder";
export declare class SqlSchema<T extends Record<string, SqlSchemaQueryBuilder> = {}> {
    definitions: T;
    constructor(definitions?: T);
    protected sql: Record<string, SqlSchemaQueryBuilder>;
    setQuery<K extends string, V extends SqlSchemaQueryBuilder>(name: K, sqlSchemaQueryBuilder: V): SqlSchema<T & Record<K, V>>;
    set: {
        query: (query: QueryBuilder) => SqlSchemaQueryBuilder;
    };
    query<K extends keyof T>(key: K): T[K];
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
export declare class SqlSchemaQueryBuilder {
    protected sqlBuilder: QueryBuilder;
    constructor(sqlSchema: QueryBuilder);
    protected tagList: string[];
    getSqlBuilder(): QueryBuilder;
    getTags(): string[];
    tags(...tags: string[]): this;
    execute(...params: Parameters<QueryBuilder["execute"]>): Promise<any>;
    setParams(...params: Parameters<QueryBuilder["setParams"]>): QueryBuilder;
}
