"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreQueryBuilder = void 0;
const format_1 = require("../../../pg/format");
const base_raw_query_builder_1 = require("./base-raw-query-builder");
const query_builder_1 = require("./query-builder");
const db_schema_1 = require("./db-schema");
class CoreQueryBuilder {
    query = { sql: [] };
    schemaQueryBuilder = [];
    callLevel = 0;
    queryInstance;
    constructor(queryInstance) {
        this.queryInstance = queryInstance;
    }
    getTokens() {
        return this.query.sql;
    }
    setTokens(tokens) {
        this.query.sql = tokens;
        return this;
    }
    getSchema() {
        return this.schemaQueryBuilder;
    }
    startClass() {
        this.callLevel += 1;
        return this;
    }
    endClass() {
        this.callLevel -= 1;
        return this;
    }
    isColumnSchema(value) {
        return value instanceof db_schema_1.ColumnSchema;
    }
    isTableSchema(value) {
        return value instanceof db_schema_1.TableSchema;
    }
    isDbSchema(value) {
        return value instanceof db_schema_1.DBSchema;
    }
    isSchemaObject(value) {
        return this.isColumnSchema(value) || this.isTableSchema(value) || this.isDbSchema(value);
    }
    normalizeSchemaParam(paramRaw, type) {
        const paramsArray = Array.isArray(paramRaw) ? paramRaw : [paramRaw];
        const normalizeSingleParam = (param) => {
            if (typeof param === "string" || typeof param === "number" || typeof param === "boolean" || param === null) {
                return {
                    paramType: typeof param === "string" ? "string" :
                        typeof param === "number" ? "number" :
                            typeof param === "boolean" ? "boolean" :
                                param === null ? "null" : "undefined",
                    name: param, arguments: []
                };
            }
            if (this.isColumnSchema(param)) {
                return {
                    paramType: "string",
                    name: `${param.tableSchema.tableSchemaName}.${param.columnSchemaName}`,
                    arguments: [],
                };
            }
            if (this.isTableSchema(param)) {
                return {
                    paramType: "string",
                    name: param.tableSchemaName,
                    arguments: [],
                };
            }
            if (this.isDbSchema(param)) {
                return {
                    paramType: "string",
                    name: param.dbSchemaName,
                    arguments: [],
                };
            }
            if (Array.isArray(param)) {
                return { paramType: "array", name: this.normalizeSchemaParam(param, type), arguments: [] };
            }
            if (param instanceof query_builder_1.QueryBuilder) {
                return [param.getSchema()];
            }
            if (typeof param === "object") {
                return {
                    paramType: "object",
                    arguments: [],
                    name: Object.entries(param).map(([key, value]) => ({
                        name: key,
                        arguments: this.normalizeSchemaParam(value, type),
                        paramType: Array.isArray(value) ? "array" : typeof value === "object" ? "object" : typeof value === "string" ? "string" : typeof value === "number" ? "number" : typeof value === "boolean" ? "boolean" : "null"
                    }))
                };
            }
        };
        return paramsArray.map(normalizeSingleParam);
    }
    resolveSchemaParam(type, name, params) {
        this.startClass();
        if (this.callLevel > 1) {
            return {
                paramType: type,
                name,
                arguments: []
            };
        }
        if (type === "template-literal") {
            const arrayParams = Array.isArray(params) ? params : [params];
            const normalizedParams = arrayParams.map((param, i) => {
                // jika ganjil maka string jika genap maka normalize
                if (i % 2 === 0) {
                    return param;
                }
                else {
                    return this.normalizeSchemaParam(param, type);
                }
            });
            const schema = {
                paramType: type,
                name,
                arguments: normalizedParams
            };
            this.schemaQueryBuilder.push(schema);
            return schema;
        }
        const schema = { paramType: type, name: name, arguments: this.normalizeSchemaParam(params, type) };
        this.schemaQueryBuilder.push(schema);
        return schema;
    }
    getSqlCore() {
        if (!this.queryInstance)
            throw new Error("QueryInstance is required for this operation");
        const queryInstance = this.queryInstance;
        const formatParamHandler = queryInstance.getDbInstance().formatParamHandler;
        if (formatParamHandler === "pg") {
            let literalIndex = 0;
            const sqlParams = [];
            const sqlTokens = joinSqlTokens(this.query.sql.map((item) => {
                if (item instanceof base_raw_query_builder_1.ParameterType) {
                    // if (item.type === "literal") {
                    // }
                    if (item.type === "literal") {
                        literalIndex += 1;
                        return `$${literalIndex}`;
                    }
                    if (item.type === "identifier") {
                        sqlParams.push(item.value);
                        return "%I";
                    }
                    if (item.type === "percent") {
                        sqlParams.push(item.value);
                        return "%%";
                    }
                    if (item.type === "string") {
                        sqlParams.push(item.value);
                        return "%s";
                    }
                    return "";
                    // return formatPgParameterToken(item, literalIndex);
                }
                return item.trim();
            }));
            return (0, format_1.format)(sqlTokens, ...sqlParams);
        }
        let paramIndex = 0;
        return joinSqlTokens(this.query.sql.map((item) => {
            if (item instanceof base_raw_query_builder_1.ParameterType) {
                paramIndex += 1;
                return toSql(formatParamHandler, item, paramIndex);
            }
            return item;
        }));
    }
    getParametersCore() {
        if (!this.queryInstance)
            throw new Error("QueryInstance is required for this operation");
        const queryInstance = this.queryInstance;
        const formatParamHandler = queryInstance.getDbInstance().formatParamHandler;
        if (formatParamHandler === "pg")
            return this.query.sql
                .filter((i) => i instanceof base_raw_query_builder_1.ParameterType
                && i.type === "literal")
                .map((i) => i.value);
        if (formatParamHandler === "pg-format") {
            return this.query.sql
                .filter((i) => i instanceof base_raw_query_builder_1.ParameterType)
                .map((i) => i.value);
        }
        return this.query.sql
            .filter((i) => i instanceof base_raw_query_builder_1.ParameterType)
            .map((i) => i.value);
    }
    getSqlWithParametersCore() {
        if (!this.queryInstance)
            throw new Error("QueryInstance is required for this operation");
        const queryInstance = this.queryInstance;
        const formatParamHandler = queryInstance.getDbInstance().formatParamHandler;
        if (formatParamHandler === "pg") {
            return joinSqlTokens(this.query.sql.map((item) => {
                if (item instanceof base_raw_query_builder_1.ParameterType) {
                    return formatPgParameterWithValue(item);
                }
                return item.trim();
            }));
        }
        let paramIndex = 0;
        return joinSqlTokens(this.query.sql.map((item) => {
            if (item instanceof base_raw_query_builder_1.ParameterType) {
                paramIndex += 1;
                return toSqlWithParameters(formatParamHandler, item, paramIndex);
            }
            return item;
        }));
    }
    createLiteralParameter(value) {
        return new base_raw_query_builder_1.ParameterType({
            value,
            type: "literal",
        });
    }
    createIdentifierParameter(value) {
        return new base_raw_query_builder_1.ParameterType({
            value,
            type: "identifier",
        });
    }
    createStringParameter(value) {
        return new base_raw_query_builder_1.ParameterType({
            value,
            type: "string",
        });
    }
    createPercentParameter() {
        return new base_raw_query_builder_1.ParameterType({
            value: '%',
            type: "percent",
        });
    }
    resolveStatement(item) {
        if (item == "*") {
            return ["*"];
        }
        if (item === undefined || item === "") {
            return [];
        }
        if (item === null) {
            return [this.createLiteralParameter(null)];
        }
        if (this.isColumnSchema(item)) {
            return [this.createIdentifierParameter(`${item.tableSchema.tableSchemaName}.${item.columnSchemaName}`)];
        }
        if (this.isTableSchema(item)) {
            return [this.createIdentifierParameter(item.tableSchemaName)];
        }
        if (this.isDbSchema(item)) {
            return [this.createIdentifierParameter(item.dbSchemaName)];
        }
        if (item instanceof query_builder_1.QueryBuilder) {
            return item.getTokens();
        }
        if (typeof item === "string" || typeof item === "number" || typeof item === "boolean") {
            return [this.createLiteralParameter(item)];
        }
        return [this.createLiteralParameter(String(item))];
    }
    resolveStatements(values) {
        return values.map((item) => this.resolveStatement(item));
    }
    resolveIdentifierStatement(item) {
        if (item === undefined || item === null || item === "") {
            return [];
        }
        if (this.isColumnSchema(item)) {
            return [this.createIdentifierParameter(`${item.tableSchema.tableSchemaName}.${item.columnSchemaName}`)];
        }
        if (this.isTableSchema(item)) {
            return [this.createIdentifierParameter(item.tableSchemaName)];
        }
        if (this.isDbSchema(item)) {
            return [this.createIdentifierParameter(item.dbSchemaName)];
        }
        if (typeof item === "string" || typeof item === "number" || typeof item === "boolean") {
            if (item === "*") {
                return ["*"];
            }
            if (item === "") {
                return [];
            }
            return [this.createIdentifierParameter(item)];
        }
        if (item instanceof query_builder_1.QueryBuilder) {
            return item.getTokens();
        }
        return [this.createIdentifierParameter(String(item))];
    }
    resolveStringStatement(item) {
        if (item === undefined || item === null || item === "") {
            return [];
        }
        if (this.isColumnSchema(item)) {
            return [`${item.tableSchema.tableSchemaName}.${item.columnSchemaName}`];
        }
        if (this.isTableSchema(item)) {
            return [item.tableSchemaName];
        }
        if (this.isDbSchema(item)) {
            return [item.dbSchemaName];
        }
        if (typeof item === "string" || typeof item === "number" || typeof item === "boolean") {
            return [String(item)];
        }
        if (item instanceof query_builder_1.QueryBuilder) {
            return item.getTokens();
        }
        throw new Error(`Unsupported string statement type: ${typeof item}`);
    }
    pushSeparatedTokens(tokensList, separator) {
        let hasTokens = false;
        for (const tokens of tokensList) {
            if (tokens.length === 0) {
                continue;
            }
            if (hasTokens) {
                this.query.sql.push(separator);
            }
            this.query.sql.push(...tokens);
            hasTokens = true;
        }
    }
    pushFunction(func, ...runtimeArgs) {
        if (func.format === "COERCE_EXPLICIT_CAST") {
            const arg = runtimeArgs[0];
            if (arg === undefined || arg === null || arg === "") {
                return this;
            }
            const resolvedArg = this.resolveStatement(arg);
            if (resolvedArg.length === 0) {
                return this;
            }
            this.query.sql.push("CAST(");
            this.query.sql.push(...resolvedArg);
            this.query.sql.push(" AS ");
            this.query.sql.push(func.name);
            this.query.sql.push(")");
        }
        else {
            this.query.sql.push(func.name + "(");
            const filteredArgs = runtimeArgs.filter(arg => arg !== undefined && arg !== "");
            const resolvedArgs = filteredArgs.map(arg => this.resolveStatement(arg));
            this.pushSeparatedTokens(resolvedArgs, ",");
            this.query.sql.push(")");
        }
        return this;
    }
}
exports.CoreQueryBuilder = CoreQueryBuilder;
function joinSqlTokens(tokens) {
    const spacedTokens = [];
    for (const token of tokens) {
        if (!token) {
            continue;
        }
        if (spacedTokens.length === 0) {
            spacedTokens.push(token);
            continue;
        }
        const prev = spacedTokens[spacedTokens.length - 1] ?? "";
        if (shouldInsertSpace(prev, token)) {
            spacedTokens.push(" ");
        }
        spacedTokens.push(token);
    }
    return spacedTokens.join("").trim();
}
function shouldInsertSpace(prev, next) {
    const noSpaceBefore = new Set([",", ")", ".", ";"]);
    const noSpaceAfter = new Set(["(", "."]);
    if (prev.endsWith("(")) {
        return false;
    }
    if (noSpaceBefore.has(next)) {
        return false;
    }
    if (noSpaceAfter.has(prev)) {
        return false;
    }
    return true;
}
function toSql(formatParamHandler, item, index) {
    if (item instanceof base_raw_query_builder_1.ParameterType) {
        return formatParameterToken(formatParamHandler, item, index);
    }
    else {
        return item.trim();
    }
}
function toSqlWithParameters(formatParamHandler, item, index) {
    if (item instanceof base_raw_query_builder_1.ParameterType) {
        if (item.type === "literal") {
            return formatLiteralWithParameters(formatParamHandler, item, index);
        }
        return toSql(formatParamHandler, item, index);
    }
    return item;
}
function formatPgParameterToken(item, literalIndex) {
    if (item.type === "literal") {
        return `$${literalIndex}`;
    }
    if (item.type === "identifier") {
        return (0, format_1.format)("%I", item.value);
    }
    if (item.type === "percent") {
        return (0, format_1.format)("%%", item.value);
    }
    if (item.type === "string") {
        return (0, format_1.format)("%s", item.value);
    }
    return "";
}
function formatPgParameterWithValue(item) {
    if (item.type === "literal") {
        if (item.value === null)
            return "NULL";
        if (item.value === true)
            return "TRUE";
        if (item.value === false)
            return "FALSE";
        return (0, format_1.format)("%L", item.value);
    }
    if (item.type === "identifier") {
        return (0, format_1.format)("%I", item.value);
    }
    if (item.type === "percent") {
        return (0, format_1.format)("%%", item.value);
    }
    if (item.type === "string") {
        return (0, format_1.format)("%s", item.value);
    }
    return "";
}
function formatParameterToken(formatParamHandler, item, index) {
    if (formatParamHandler === "pg") {
        return formatPgParameterToken(item, index);
    }
    if (typeof formatParamHandler === "function") {
        return formatParamHandler({
            index,
            value: item.value,
            type: item.type,
        });
    }
    if (item.type === "literal") {
        return "%L";
    }
    if (item.type === "identifier") {
        return "%I";
    }
    if (item.type === "percent") {
        return "%%";
    }
    if (item.type === "string") {
        return "%s";
    }
    return "";
}
function formatLiteralWithParameters(formatParamHandler, item, index) {
    if (formatParamHandler === "pg") {
        if (item.value === null)
            return "NULL";
        if (item.value === true)
            return "TRUE";
        if (item.value === false)
            return "FALSE";
        return (0, format_1.format)("%L", item.value);
    }
    if (typeof formatParamHandler === "function") {
        return formatParamHandler({
            index,
            value: item.value,
            type: item.type,
        });
    }
    return (0, format_1.format)("%L", item.value);
}
