"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreQueryBuilder = void 0;
const format_1 = require("../../../pg/format");
const base_raw_query_builder_1 = require("./base-raw-query-builder");
const query_builder_1 = require("./query-builder");
const db_schema_1 = require("./db-schema");
const sql_param_1 = require("./sql-param");
// Core query builder state and orchestration.
class CoreQueryBuilder {
    query = { sql: [] };
    schemaQueryBuilder = [];
    instanceStructure = [];
    callLevel = 0;
    queryInstance;
    runtimeParams = {};
    isRebuilding = false;
    constructor(queryInstance) {
        this.queryInstance = queryInstance;
    }
    // Basic getters/setters and lifecycle.
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
    getInstanceStructure() {
        return cloneInstanceStructure(this.instanceStructure);
    }
    getRuntimeParams() {
        return this.runtimeParams;
    }
    // still prototype
    schemaParamCore(key) {
        this.endClass();
        return new sql_param_1.SqlSchemaParam(key);
    }
    // still prototype
    schemaCaseCore(key, queryBuilder) {
        this.resolveSchemaParam("function", "schemaCase", [key, queryBuilder]);
        const runtimeValue = this.runtimeParams[key];
        if (runtimeValue === undefined || runtimeValue === false) {
            return this.endClass();
        }
        if (runtimeValue === true) {
            queryBuilder.setParams({});
            this.query.sql.push(...queryBuilder.getTokens());
            return this.endClass();
        }
        if (isPlainObject(runtimeValue)) {
            const schemaCase = new sql_param_1.SqlSchemaParamCase(key, {
                setParams: (params) => queryBuilder.setParams(params),
                getTokens: () => queryBuilder.getTokens(),
            });
            schemaCase.setParams(runtimeValue);
            const caseTokens = schemaCase.getQueryBuilder().getTokens();
            this.query.sql.push(...caseTokens);
            return this.endClass();
        }
        throw new Error(`Invalid schemaCase value for '${key}'. Expected boolean or object, got ${describeValueType(runtimeValue)}.`);
    }
    // still prototype
    setParamsCore(params) {
        if (!isPlainObject(params)) {
            throw new Error(`setParams expects an object, got ${describeValueType(params)}.`);
        }
        this.runtimeParams = { ...params };
        if (!this.isRebuilding) {
            this.rebuild();
        }
        return this.endClass();
    }
    setInstanceStructure(structure) {
        this.instanceStructure = cloneInstanceStructure(structure);
        return this;
    }
    rebuild() {
        const structure = this.getInstanceStructure();
        this.query.sql = [];
        this.isRebuilding = true;
        try {
            structure.forEach((node) => this.replayInstanceNode(node));
        }
        finally {
            this.isRebuilding = false;
        }
        return this;
    }
    startClass() {
        this.callLevel += 1;
        return this;
    }
    endClass() {
        this.callLevel = Math.max(0, this.callLevel - 1);
        return this;
    }
    // Schema type guards and normalization.
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
    getSchemaIdentifier(value) {
        if (this.isColumnSchema(value)) {
            return `${value.tableSchema.tableSchemaName}.${value.columnSchemaName}`;
        }
        if (this.isTableSchema(value)) {
            return value.tableSchemaName;
        }
        return value.dbSchemaName;
    }
    normalizeSchemaParam(paramRaw, type) {
        const paramsArray = Array.isArray(paramRaw) ? paramRaw : [paramRaw];
        const normalizeSingleParam = (param) => {
            if (isPrimitiveSchemaParam(param)) {
                return {
                    paramType: getPrimitiveSchemaParamType(param),
                    name: param, arguments: []
                };
            }
            if (param instanceof sql_param_1.SqlSchemaParam) {
                return {
                    paramType: "object",
                    name: {
                        kind: "schema-param",
                        key: param.getKey(),
                        types: param.getTypes(),
                        hasDefault: param.hasDefault(),
                        defaultValue: param.getDefaultValue(),
                    },
                    arguments: [],
                };
            }
            if (this.isSchemaObject(param)) {
                return {
                    paramType: "string",
                    name: this.getSchemaIdentifier(param),
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
    registerSchemaCall(name, params, schema) {
        if (name === "setParams") {
            return schema;
        }
        if (!this.isRebuilding && this.callLevel === 1) {
            this.captureInstanceStructure(name, params);
            this.schemaQueryBuilder.push(schema);
        }
        return schema;
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
            return this.registerSchemaCall(name, params, schema);
        }
        const schema = { paramType: type, name: name, arguments: this.normalizeSchemaParam(params, type) };
        return this.registerSchemaCall(name, params, schema);
    }
    // Instance structure capture, serialization, and replay.
    captureInstanceStructure(name, params) {
        if (this.isRebuilding) {
            return;
        }
        const normalizedArgs = (Array.isArray(params) ? params : [params])
            .map((arg) => this.serializeInstanceValue(arg));
        this.instanceStructure.push({ name: String(name), args: normalizedArgs });
    }
    serializeInstanceValue(value) {
        if (isSerializablePrimitive(value)) {
            return value;
        }
        if (value instanceof sql_param_1.SqlSchemaParam) {
            return {
                kind: "schema-param",
                value: {
                    key: value.getKey(),
                    types: value.getTypes(),
                    hasDefault: value.hasDefault(),
                    defaultValue: value.getDefaultValue(),
                },
            };
        }
        if (value instanceof query_builder_1.QueryBuilder) {
            return {
                kind: "query-builder",
                value: value.getInstanceStructure(),
            };
        }
        if (this.isSchemaObject(value)) {
            return {
                kind: "identifier",
                value: this.getSchemaIdentifier(value),
            };
        }
        if (Array.isArray(value)) {
            return {
                kind: "array",
                value: value.map((item) => this.serializeInstanceValue(item)),
            };
        }
        if (typeof value === "object") {
            const entries = Object.entries(value)
                .reduce((acc, [key, val]) => {
                acc[key] = this.serializeInstanceValue(val);
                return acc;
            }, {});
            return {
                kind: "object",
                value: entries,
            };
        }
        return String(value);
    }
    deserializeInstanceValue(value) {
        if (isSerializablePrimitive(value)) {
            return value;
        }
        if (value.kind === "schema-param") {
            const schemaParam = new sql_param_1.SqlSchemaParam(value.value.key);
            value.value.types.forEach((type) => {
                if (type === "number")
                    schemaParam.number();
                if (type === "boolean")
                    schemaParam.boolean();
                if (type === "string")
                    schemaParam.string();
                if (type === "null")
                    schemaParam.nullable();
            });
            if (value.value.hasDefault) {
                schemaParam.default(value.value.defaultValue);
            }
            return schemaParam;
        }
        if (value.kind === "query-builder") {
            const nested = new query_builder_1.QueryBuilder(this.queryInstance);
            nested.setInstanceStructure(value.value);
            nested.rebuild();
            return nested;
        }
        if (value.kind === "identifier") {
            return new query_builder_1.QueryBuilder(this.queryInstance).i(value.value);
        }
        if (value.kind === "array") {
            return value.value.map((item) => this.deserializeInstanceValue(item));
        }
        return Object.entries(value.value).reduce((acc, [key, val]) => {
            acc[key] = this.deserializeInstanceValue(val);
            return acc;
        }, {});
    }
    replayInstanceNode(node) {
        const target = this[node.name];
        if (typeof target !== "function") {
            throw new Error(`Cannot rebuild query: method '${node.name}' is not available`);
        }
        if (node.name === "raw" || node.name === "r") {
            const templateFlat = node.args.map((arg) => this.deserializeInstanceValue(arg));
            const strings = [];
            const values = [];
            templateFlat.forEach((item, index) => {
                if (index % 2 === 0) {
                    strings.push(String(item ?? ""));
                }
                else {
                    values.push(item);
                }
            });
            const templateStrings = strings;
            templateStrings.raw = [...strings];
            target.apply(this, [templateStrings, ...values]);
            return;
        }
        const args = node.args.map((arg) => this.deserializeInstanceValue(arg));
        target.apply(this, args);
    }
    // SQL rendering and parameter extraction.
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
                    switch (item.type) {
                        case "literal":
                            literalIndex += 1;
                            return `$${literalIndex}`;
                        case "identifier":
                            sqlParams.push(item.value);
                            return "%I";
                        case "percent":
                            sqlParams.push(item.value);
                            return "%%";
                        case "string":
                            sqlParams.push(item.value);
                            return "%s";
                        default:
                            return "";
                    }
                }
                return item.trim();
            }));
            return (0, format_1.format)(sqlTokens, ...sqlParams);
        }
        let paramIndex = 0;
        return joinSqlTokens(this.query.sql.map((item) => {
            if (item instanceof base_raw_query_builder_1.ParameterType) {
                paramIndex += 1;
                return formatPgParameterToken(item, paramIndex);
            }
            return item;
        }));
    }
    getSqlParametersCore() {
        if (!this.queryInstance)
            throw new Error("QueryInstance is required for this operation");
        const queryInstance = this.queryInstance;
        const formatParamHandler = queryInstance.getDbInstance().formatParamHandler;
        const onlyLiterals = formatParamHandler === "pg";
        return this.query.sql
            .filter((item) => item instanceof base_raw_query_builder_1.ParameterType && (!onlyLiterals || item.type === "literal"))
            .map((item) => item.value);
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
    // Statement resolution helpers.
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
        if (item instanceof sql_param_1.SqlSchemaParam) {
            const resolvedValue = this.resolveSqlSchemaParamValue(item);
            if (resolvedValue === undefined) {
                return [];
            }
            return [this.createLiteralParameter(resolvedValue)];
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
            if (Object.keys(this.runtimeParams).length > 0) {
                item.setParams(this.runtimeParams);
            }
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
        if (item instanceof sql_param_1.SqlSchemaParam) {
            const resolvedValue = this.resolveSqlSchemaParamValue(item);
            if (resolvedValue === undefined) {
                return [];
            }
            if (resolvedValue === null) {
                throw new Error(`SqlSchemaParam '${item.getKey()}' cannot resolve to null for identifier statement.`);
            }
            return [this.createIdentifierParameter(resolvedValue)];
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
            if (Object.keys(this.runtimeParams).length > 0) {
                item.setParams(this.runtimeParams);
            }
            return item.getTokens();
        }
        return [this.createIdentifierParameter(String(item))];
    }
    resolveStringStatement(item) {
        if (item === undefined || item === null || item === "") {
            return [];
        }
        if (item instanceof sql_param_1.SqlSchemaParam) {
            const resolvedValue = this.resolveSqlSchemaParamValue(item);
            if (resolvedValue === undefined) {
                return [];
            }
            if (resolvedValue === null) {
                throw new Error(`SqlSchemaParam '${item.getKey()}' cannot resolve to null for string statement.`);
            }
            return [String(resolvedValue)];
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
            if (Object.keys(this.runtimeParams).length > 0) {
                item.setParams(this.runtimeParams);
            }
            return item.getTokens();
        }
        throw new Error(`Unsupported string statement type: ${typeof item}`);
    }
    // Token creation helpers.
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
    // SQL token composition helpers.
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
    resolveSqlSchemaParamValue(param) {
        const key = param.getKey();
        const hasRuntimeValue = Object.prototype.hasOwnProperty.call(this.runtimeParams, key);
        const value = hasRuntimeValue
            ? this.runtimeParams[key]
            : param.hasDefault()
                ? param.getDefaultValue()
                : undefined;
        if (value === undefined) {
            return undefined;
        }
        if (value !== null && typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean") {
            throw new Error(`SqlSchemaParam '${key}' must resolve to string | number | boolean | null, got ${describeValueType(value)}.`);
        }
        const scalarValue = value;
        const expectedTypes = param.getTypes();
        if (expectedTypes.length === 0) {
            return scalarValue;
        }
        const resolvedType = scalarValue === null
            ? "null"
            : typeof scalarValue;
        if (!expectedTypes.includes(resolvedType)) {
            throw new Error(`Invalid value for SqlSchemaParam '${key}'. Expected ${expectedTypes.join(" | ")}, got ${resolvedType}.`);
        }
        return scalarValue;
    }
}
exports.CoreQueryBuilder = CoreQueryBuilder;
// Primitive and schema parameter helpers.
function isSerializablePrimitive(value) {
    return value === undefined || value === null || typeof value === "string" || typeof value === "number" || typeof value === "boolean";
}
function isPrimitiveSchemaParam(value) {
    return value === null || typeof value === "string" || typeof value === "number" || typeof value === "boolean";
}
function getPrimitiveSchemaParamType(value) {
    if (value === null) {
        return "null";
    }
    if (typeof value === "string") {
        return "string";
    }
    if (typeof value === "number") {
        return "number";
    }
    return "boolean";
}
// Instance structure cloning helpers.
function cloneInstanceStructure(structure) {
    return structure.map((node) => ({
        name: node.name,
        args: node.args.map(cloneInstanceValue),
    }));
}
function cloneInstanceValue(value) {
    if (isSerializablePrimitive(value)) {
        return value;
    }
    if (value.kind === "query-builder") {
        return {
            kind: "query-builder",
            value: cloneInstanceStructure(value.value),
        };
    }
    if (value.kind === "identifier") {
        return {
            kind: "identifier",
            value: value.value,
        };
    }
    if (value.kind === "schema-param") {
        return {
            kind: "schema-param",
            value: {
                key: value.value.key,
                types: [...value.value.types],
                hasDefault: value.value.hasDefault,
                defaultValue: value.value.defaultValue,
            },
        };
    }
    if (value.kind === "array") {
        return {
            kind: "array",
            value: value.value.map(cloneInstanceValue),
        };
    }
    return {
        kind: "object",
        value: Object.entries(value.value).reduce((acc, [key, val]) => {
            acc[key] = cloneInstanceValue(val);
            return acc;
        }, {}),
    };
}
function isPlainObject(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}
function describeValueType(value) {
    if (value === null) {
        return "null";
    }
    if (Array.isArray(value)) {
        return "array";
    }
    return typeof value;
}
// SQL token spacing helper.
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
// SQL formatting helpers.
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
