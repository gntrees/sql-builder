import type { QueryBuilder } from "./query-builder";

export class SqlSchema<T extends Record<string, SqlSchemaQueryBuilder> = {}> {
    constructor(public definitions: T = {} as T) { }
    protected sql: Record<string, SqlSchemaQueryBuilder> = {}
    setQuery<K extends string, V extends SqlSchemaQueryBuilder>(
        name: K,
        sqlSchemaQueryBuilder: V
    ): SqlSchema<T & Record<K, V>> {
        this.sql[name] = sqlSchemaQueryBuilder;
        return this as unknown as SqlSchema<T & Record<K, V>>;
    }
    public set = {
        query: (query: QueryBuilder) => {
            return new SqlSchemaQueryBuilder(query);
        },
    }
    query<K extends keyof T>(key: K): T[K] {
        const sqlSchemaQueryBuilder = this.sql[key as string];
        if (!sqlSchemaQueryBuilder) throw new Error(`Query ${String(key)} not found`);
        return sqlSchemaQueryBuilder as T[K];
    }
    getJSON() {
        const json = {
            sql: Object.fromEntries(Object.entries(this.sql).map(([key, value]) => {
                return [key, {
                    query: value.getSqlBuilder().getSchema(),
                    tags: value.getTags(),
                    tokens: value.getSqlBuilder().getTokens(),
                }]
            })),
        };
        return json;
    }
}

export class SqlSchemaQueryBuilder {
    protected sqlBuilder: QueryBuilder;
    constructor(sqlSchema: QueryBuilder) {
        this.sqlBuilder = sqlSchema;
    }
    protected tagList: string[] = [];
    getSqlBuilder() {
        return this.sqlBuilder;
    }
    getTags() {
        return this.tagList;
    }
    tags(...tags: string[]) {
        this.tagList.push(...tags);
        return this;
    }
    execute(...params: Parameters<QueryBuilder["execute"]>) {
        return this.sqlBuilder.execute(...params);
    }
    setParams(...params: Parameters<QueryBuilder["setParams"]>) {
        return this.sqlBuilder.setParams(...params);
    }
}
