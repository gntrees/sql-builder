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
    public param = {
        set(key: string) {
            return new SqlSchemaParam(key);
        },
        case(key: string, queryBuilder: QueryBuilder, defaultUsed: boolean = true) {
            return new SqlSchemaParamCase({
                key,
                queryBuilder,
                isUsed: defaultUsed,
            });
        }
    }
    query(key: keyof T): SqlSchemaQueryBuilder {
        const sqlSchemaQueryBuilder = this.sql[key as string];
        if (!sqlSchemaQueryBuilder) throw new Error(`Query ${String(key)} not found`);
        return sqlSchemaQueryBuilder;
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

type SqlSchemaParamCaseType = {
    key: string;
    queryBuilder: QueryBuilder;
    isUsed?: boolean;
}

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

type SqlSchemaParamValueUnion<T extends SqlSchemaParamType> =
    [T] extends [never]
        ? SqlSchemaParamAllValue
        : Exclude<SqlSchemaParamValue<T>, undefined>
        | (undefined extends SqlSchemaParamValue<T> ? SqlSchemaParamAllValue : never);

export class SqlSchemaParamCase {
    protected cases: SqlSchemaParamCaseType[] = [];
    constructor(first: SqlSchemaParamCaseType) {
        this.cases.push(first);
    }
    case(key: string, queryBuilder: QueryBuilder, defaultUsed: boolean = true) {
        this.cases.push({
            key,
            queryBuilder,
            isUsed: defaultUsed,
        });
        return this;
    }
}

export class SqlSchemaParam<T extends SqlSchemaParamType = never> {
    protected key: string;
    protected types: SqlSchemaParamType[] = [];
    constructor(key: string) {
        this.key = key;
    }
    value!: SqlSchemaParamValueUnion<T>;

    protected addType(type: SqlSchemaParamType) {
        if (!this.types.includes(type)) {
            this.types.push(type);
        }
    }

    getKey() {
        return this.key;
    }

    number(defaultValue: number = 2) {
        this.addType("number");
        const next = this as unknown as SqlSchemaParam<T | "number">;
        next.value = defaultValue as SqlSchemaParamValueUnion<T | "number">;
        return next;
    }

    boolean(defaultValue: boolean = true) {
        this.addType("boolean");
        const next = this as unknown as SqlSchemaParam<T | "boolean">;
        next.value = defaultValue as SqlSchemaParamValueUnion<T | "boolean">;
        return next;
    }

    string(defaultValue: string = "test") {
        this.addType("string");
        const next = this as unknown as SqlSchemaParam<T | "string">;
        next.value = defaultValue as SqlSchemaParamValueUnion<T | "string">;
        return next;
    }

    queryBuilder(defaultValue?: QueryBuilder) {
        this.addType("query-builder");
        const next = this as unknown as SqlSchemaParam<T | "query-builder">;
        next.value = defaultValue as SqlSchemaParamValueUnion<T | "query-builder">;
        return next;
    }

    nullable() {
        this.addType("null");
        return this as unknown as SqlSchemaParam<T | "null">;
    }

    getTypes() {
        return this.types as T[];
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
} 
