"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreQueryBuilder = void 0;
const node_pg_format_1 = require("node-pg-format");
const base_raw_query_builder_1 = require("./base-raw-query-builder");
const query_builder_1 = require("./query-builder");
class CoreQueryBuilder {
    query = { sql: [] };
    queryInstance;
    constructor(queryInstance) {
        this.queryInstance = queryInstance;
    }
    getTokens() {
        return this.query.sql;
    }
    requireQueryInstance() {
        if (!this.queryInstance) {
            throw new Error("QueryInstance is required for this operation");
        }
        return this.queryInstance;
    }
    getSqlWithInstance() {
        const queryInstance = this.requireQueryInstance();
        const formatParamHandler = queryInstance.getDbInstance().formatParamHandler;
        if (formatParamHandler === "pg") {
            let literalIndex = 0;
            return joinSqlTokens(this.query.sql.map((item) => {
                if (item instanceof base_raw_query_builder_1.ParameterType) {
                    if (item.type === "literal") {
                        literalIndex += 1;
                        return `$${literalIndex}`;
                    }
                    if (item.type === "identifier") {
                        return (0, node_pg_format_1.format)("%I", item.value);
                    }
                    if (item.type === "percent") {
                        return (0, node_pg_format_1.format)("%%", item.value);
                    }
                    if (item.type === "string") {
                        return (0, node_pg_format_1.format)("%s", item.value);
                    }
                    return "";
                }
                return item;
            }));
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
    getParametersWithInstance() {
        const queryInstance = this.requireQueryInstance();
        const formatParamHandler = queryInstance.getDbInstance().formatParamHandler;
        if (formatParamHandler === "pg") {
            return this.query.sql
                .filter((i) => i instanceof base_raw_query_builder_1.ParameterType && i.type === "literal")
                .map((i) => i.value);
        }
        if (formatParamHandler === "pg-format") {
            return this.query.sql
                .filter((i) => i instanceof base_raw_query_builder_1.ParameterType)
                .map((i) => i.value);
        }
        return this.query.sql
            .filter((i) => i instanceof base_raw_query_builder_1.ParameterType)
            .map((i) => i.value);
    }
    getSqlWithParametersWithInstance() {
        const queryInstance = this.requireQueryInstance();
        const formatParamHandler = queryInstance.getDbInstance().formatParamHandler;
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
    cloneParameter(parameter) {
        return new base_raw_query_builder_1.ParameterType({
            value: parameter.value,
            type: parameter.type,
        });
    }
    resolveStatement(item, index) {
        if (item === undefined || item === "") {
            return [];
        }
        if (item === null) {
            return [this.createLiteralParameter(null)];
        }
        if (item instanceof query_builder_1.QueryBuilder) {
            return item.getTokens().map((token) => token instanceof base_raw_query_builder_1.ParameterType ? this.cloneParameter(token) : token);
        }
        if (typeof item === "string" || typeof item === "number" || typeof item === "boolean") {
            return [this.createLiteralParameter(item)];
        }
        throw new Error(`Unsupported statement type at index ${index}: ${typeof item}`);
    }
    resolveStatements(values) {
        return values.map((item, index) => this.resolveStatement(item, index));
    }
    normalizeStatementArray(entries) {
        const statements = [];
        for (const entry of entries) {
            if (Array.isArray(entry)) {
                statements.push(...this.normalizeStatementArray(entry));
                continue;
            }
            statements.push(entry);
        }
        return statements;
    }
    resolveIdentifierStatement(item, index) {
        if (item === undefined || item === null || item === "") {
            return [];
        }
        if (typeof item === "object" && !(item instanceof query_builder_1.QueryBuilder) && !(item instanceof base_raw_query_builder_1.ParameterType)) {
            return this.resolveAliasIdentifier(item, index);
        }
        if (item instanceof query_builder_1.QueryBuilder) {
            return item.getTokens().map((token) => token instanceof base_raw_query_builder_1.ParameterType ? this.cloneParameter(token) : token);
        }
        if (item instanceof base_raw_query_builder_1.ParameterType) {
            return [this.cloneParameter(item)];
        }
        if (typeof item === "string") {
            return this.resolveIdentifierString(item, index);
        }
        if (typeof item === "number" || typeof item === "boolean") {
            return [this.createIdentifierParameter(item)];
        }
        throw new Error(`Unsupported statement type at index ${index}: ${typeof item}`);
    }
    resolveAliasIdentifier(value, index) {
        const entries = Object.entries(value);
        if (entries.length === 0) {
            return [];
        }
        const tokens = [];
        entries.forEach(([alias, statement], entryIndex) => {
            if (!alias || alias === "") {
                throw new Error(`Invalid alias at index ${index}: ${alias}`);
            }
            const resolvedStatement = this.resolveIdentifierStatement(statement, index);
            if (resolvedStatement.length === 0) {
                return;
            }
            if (entryIndex > 0) {
                tokens.push(",");
            }
            tokens.push(...resolvedStatement, "AS", this.createIdentifierParameter(alias));
        });
        return tokens;
    }
    resolveIdentifierString(value, index) {
        if (value === "*") {
            return ["*"];
        }
        if (value === "") {
            return [];
        }
        if (!value.includes(".")) {
            return [this.createIdentifierParameter(value)];
        }
        const parts = value.split(".");
        const tokens = [];
        parts.forEach((part, partIndex) => {
            if (!part) {
                throw new Error(`Invalid identifier at index ${index}: ${value}`);
            }
            if (partIndex > 0) {
                tokens.push(".");
            }
            if (part === "*") {
                tokens.push("*");
            }
            else {
                tokens.push(this.createIdentifierParameter(part));
            }
        });
        return tokens;
    }
    resolveIdentifierStatementArray(entries) {
        const statements = this.normalizeStatementArray(entries);
        return statements.map((item, index) => this.resolveIdentifierStatement(item, index));
    }
    resolveLiteralStatementArray(entries) {
        const statements = this.normalizeStatementArray(entries);
        return statements.map((item, index) => this.resolveStatement(item, index));
    }
    resolveOperatorStatement(item, index) {
        if (item === undefined || item === null) {
            return [];
        }
        if (typeof item === "string" && item === "") {
            return [];
        }
        if (item instanceof query_builder_1.QueryBuilder) {
            return item.getTokens().map((token) => token instanceof base_raw_query_builder_1.ParameterType ? this.cloneParameter(token) : token);
        }
        if (typeof item === "string") {
            return [item];
        }
        throw new Error(`Unsupported operator type at index ${index}: ${typeof item}`);
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
    pushFunction(name, ...args) {
        this.query.sql.push(`${name}(`);
        const resolvedArgs = args
            .filter((arg) => arg !== undefined && arg !== "")
            .map((arg, index) => {
            // If null, create literal parameter
            if (arg === null) {
                return [this.createLiteralParameter(null)];
            }
            // If ParameterType, clone and use as-is
            if (arg instanceof base_raw_query_builder_1.ParameterType) {
                return [this.cloneParameter(arg)];
            }
            // If QueryBuilder, resolve recursively
            if (arg instanceof query_builder_1.QueryBuilder) {
                return arg.getTokens().map((token) => token instanceof base_raw_query_builder_1.ParameterType ? this.cloneParameter(token) : token);
            }
            // If plain string, number, or boolean, treat as literal (default behavior)
            if (typeof arg === "string" || typeof arg === "number" || typeof arg === "boolean") {
                return [this.createLiteralParameter(arg)];
            }
            return [];
        })
            .filter((tokens) => tokens.length > 0);
        this.pushSeparatedTokens(resolvedArgs, ",");
        this.query.sql.push(")");
        return this;
    }
    // Helper to create identifier ParameterType from Statement
    // For identifiers, only QueryBuilder should be used
    // String/number/boolean will be quoted as identifiers
    toIdentifier(value) {
        if (value instanceof base_raw_query_builder_1.ParameterType) {
            return value;
        }
        if (value instanceof query_builder_1.QueryBuilder) {
            return value;
        }
        if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
            return this.createIdentifierParameter(value);
        }
        if (value === null || value === undefined) {
            return "";
        }
        return this.createLiteralParameter(value);
    }
    // Helper to create literal ParameterType from Statement
    // Handles: QueryBuilder, string, number, boolean, null, undefined
    toLiteral(value) {
        if (value instanceof base_raw_query_builder_1.ParameterType) {
            return value;
        }
        if (value instanceof query_builder_1.QueryBuilder) {
            return value;
        }
        if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
            return this.createLiteralParameter(value);
        }
        if (value === null) {
            return this.createLiteralParameter(null);
        }
        if (value === undefined) {
            return "";
        }
        return this.createLiteralParameter(value);
    }
    isIdentifier(value) {
        if (typeof value !== "string") {
            return false;
        }
        try {
            const quoted = (0, node_pg_format_1.quoteIdent)(value);
            return quoted === value;
        }
        catch {
            return false;
        }
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
        if (formatParamHandler === "pg") {
            if (item.type === "literal") {
                return `$${index}`;
            }
            else if (item.type === "identifier") {
                return (0, node_pg_format_1.format)("%I", item.value);
            }
            else if (item.type === "percent") {
                return (0, node_pg_format_1.format)("%%", item.value);
            }
            else if (item.type === "string") {
                return (0, node_pg_format_1.format)("%s", item.value);
            }
        }
        else if (typeof formatParamHandler === "function") {
            return formatParamHandler({
                index,
                value: item.value,
                type: item.type,
            });
        }
        else {
            if (item.type === "literal") {
                return "%L";
            }
            else if (item.type === "identifier") {
                return "%I";
            }
            else if (item.type === "percent") {
                return "%%";
            }
            else if (item.type === "string") {
                return "%s";
            }
        }
        return "";
    }
    return item;
}
function toSqlWithParameters(formatParamHandler, item, index) {
    if (item instanceof base_raw_query_builder_1.ParameterType) {
        if (item.type === "literal") {
            if (formatParamHandler === "pg") {
                return (0, node_pg_format_1.format)("%L", item.value);
            }
            if (typeof formatParamHandler === "function") {
                return formatParamHandler({
                    index,
                    value: item.value,
                    type: item.type,
                });
            }
            return (0, node_pg_format_1.format)("%L", item.value);
        }
        return toSql(formatParamHandler, item, index);
    }
    return item;
}
