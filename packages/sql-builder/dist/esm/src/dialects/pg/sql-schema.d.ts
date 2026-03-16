import type { QueryBuilder } from "./query-builder";
export declare class SqlSchema<T extends Record<string, SqlSchemaQueryBuilder> = {}> {
    definitions: T;
    constructor(definitions?: T);
    sql: Record<string, SqlSchemaQueryBuilder>;
    set<K extends string, V extends SqlSchemaQueryBuilder>(name: K, sqlSchemaQueryBuilder: V): SqlSchema<T & Record<K, V>>;
    query(query: QueryBuilder): SqlSchemaQueryBuilder;
    call(name: keyof T): any;
    getJSON(): {
        sql: {
            [k: string]: {
                query: import("../../converter-types").FunctionListType[];
                tags: string[];
                tokens: (string | import("./base-raw-query-builder").ParameterType)[];
            };
        };
    };
}
declare class SqlSchemaQueryBuilder {
    protected sqlBuilder: QueryBuilder;
    constructor(sqlSchema: QueryBuilder);
    protected tagList: string[];
    getSqlBuilder(): QueryBuilder;
    getTags(): string[];
    tags(...tags: string[]): this;
}
export {};
