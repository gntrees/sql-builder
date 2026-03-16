import type { QueryBuilder } from "./query-builder";

export class SqlSchema<T extends Record<string, SqlSchemaQueryBuilder> = {}> {
    constructor(public definitions: T = {} as T) { }
    sql: Record<string, SqlSchemaQueryBuilder> = {}
    set<K extends string, V extends SqlSchemaQueryBuilder>(
        name: K,
        sqlSchemaQueryBuilder: V
    ): SqlSchema<T & Record<K, V>> {
        this.sql[name] = sqlSchemaQueryBuilder;
        return this as unknown as SqlSchema<T & Record<K, V>>;
    }
    query(query: QueryBuilder) {
        return new SqlSchemaQueryBuilder(query);
    }
    call(name: keyof T): any {
        const q = this.sql[name as string];
        if (!q) throw new Error(`Query ${String(name)} not found`);
        return q.getSqlBuilder().execute();
    }
    getJSON() {
        const json = {
            sql: Object.fromEntries(Object.entries(this.sql).map(([key, value]) => {
                return [key,{
                        query: value.getSqlBuilder().getSchema(),
                        tags: value.getTags(),
                        tokens: value.getSqlBuilder().getTokens(),
                    }]
            })),
        };
        return json;
    }
}

class SqlSchemaQueryBuilder {
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

} 