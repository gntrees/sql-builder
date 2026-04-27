export class SqlSchema {
    schema = {
        sql: {}
    };
    setQuery(name, sqlSchemaQueryBuilder) {
        this.schema.sql[name] = {
            query: sqlSchemaQueryBuilder.getSqlBuilder().getSchema(),
            tags: sqlSchemaQueryBuilder.getTags(),
            tokens: sqlSchemaQueryBuilder.getSqlBuilder().getTokens(),
        };
        return this;
    }
    set = {
        query: (query) => {
            return new SqlSchemaQueryBuilder(query);
        },
    };
    createSqlBuilder(key, variableName) {
    }
    query(key) {
        const sqlSchemaQueryBuilder = this.schema.sql[key];
        if (!sqlSchemaQueryBuilder)
            throw new Error(`Query ${String(key)} not found`);
        return sqlSchemaQueryBuilder;
    }
    getJSON() {
        return this.schema;
    }
}
export class SqlSchemaQueryBuilder {
    sqlBuilder;
    validationSchema = undefined;
    constructor(sqlSchema) {
        this.sqlBuilder = sqlSchema;
    }
    tagList = [];
    getSqlBuilder() {
        return this.sqlBuilder;
    }
    getTags() {
        return this.tagList;
    }
    tags(...tags) {
        this.tagList.push(...tags);
        return this;
    }
    async execute(...params) {
        if (typeof this.validationSchema !== "undefined") {
            this.sqlBuilder.setValidation(this.validationSchema);
        }
        return await this.sqlBuilder.execute(...params);
    }
    validation(schema) {
        this.validationSchema = schema;
        return this;
    }
    setParams(...params) {
        this.sqlBuilder.setParams(...params);
        return this;
    }
}
export function sqlSchema() {
    return new SqlSchema();
}
