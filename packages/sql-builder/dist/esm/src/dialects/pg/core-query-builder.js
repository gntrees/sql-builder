import { format } from "../../../pg/format";
import { ParameterType } from "./base-raw-query-builder";
import { QueryBuilder } from "./query-builder";
export class CoreQueryBuilder {
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
            if (Array.isArray(param)) {
                return { paramType: "array", name: this.normalizeSchemaParam(param, type), arguments: [] };
            }
            if (param instanceof QueryBuilder) {
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
    getSqlWithInstance() {
        if (!this.queryInstance)
            throw new Error("QueryInstance is required for this operation");
        const queryInstance = this.queryInstance;
        const formatParamHandler = queryInstance.getDbInstance().formatParamHandler;
        if (formatParamHandler === "pg") {
            let literalIndex = 0;
            return joinSqlTokens(this.query.sql.map((item) => {
                if (item instanceof ParameterType) {
                    if (item.type === "literal") {
                        literalIndex += 1;
                        return `$${literalIndex}`;
                    }
                    if (item.type === "identifier") {
                        return format("%I", item.value);
                    }
                    if (item.type === "percent") {
                        return format("%%", item.value);
                    }
                    if (item.type === "string") {
                        return format("%s", item.value);
                    }
                    return "";
                }
                return item.trim();
            }));
        }
        let paramIndex = 0;
        return joinSqlTokens(this.query.sql.map((item) => {
            if (item instanceof ParameterType) {
                paramIndex += 1;
                return toSql(formatParamHandler, item, paramIndex);
            }
            return item;
        }));
    }
    getParametersWithInstance() {
        if (!this.queryInstance)
            throw new Error("QueryInstance is required for this operation");
        const queryInstance = this.queryInstance;
        const formatParamHandler = queryInstance.getDbInstance().formatParamHandler;
        if (formatParamHandler === "pg") {
            return this.query.sql
                .filter((i) => i instanceof ParameterType && i.type === "literal")
                .map((i) => i.value);
        }
        if (formatParamHandler === "pg-format") {
            return this.query.sql
                .filter((i) => i instanceof ParameterType)
                .map((i) => i.value);
        }
        return this.query.sql
            .filter((i) => i instanceof ParameterType)
            .map((i) => i.value);
    }
    getSqlWithParametersWithInstance() {
        if (!this.queryInstance)
            throw new Error("QueryInstance is required for this operation");
        const queryInstance = this.queryInstance;
        const formatParamHandler = queryInstance.getDbInstance().formatParamHandler;
        let paramIndex = 0;
        return joinSqlTokens(this.query.sql.map((item) => {
            if (item instanceof ParameterType) {
                paramIndex += 1;
                return toSqlWithParameters(formatParamHandler, item, paramIndex);
            }
            return item;
        }));
    }
    createLiteralParameter(value) {
        return new ParameterType({
            value,
            type: "literal",
        });
    }
    createIdentifierParameter(value) {
        return new ParameterType({
            value,
            type: "identifier",
        });
    }
    createStringParameter(value) {
        return new ParameterType({
            value,
            type: "string",
        });
    }
    createPercentParameter() {
        return new ParameterType({
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
        if (item instanceof QueryBuilder) {
            return item.getTokens();
        }
        if (typeof item === "string" || typeof item === "number" || typeof item === "boolean") {
            return [this.createLiteralParameter(item)];
        }
        return [this.createLiteralParameter(item)];
    }
    resolveStatements(values) {
        return values.map((item) => this.resolveStatement(item));
    }
    resolveIdentifierStatement(item) {
        if (item === undefined || item === null || item === "") {
            return [];
        }
        if (item instanceof QueryBuilder) {
            return item.getTokens();
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
        return [this.createIdentifierParameter(item)];
    }
    resolveStringStatement(item) {
        if (item === undefined || item === null || item === "") {
            return [];
        }
        if (item instanceof QueryBuilder) {
            return item.getTokens();
        }
        if (typeof item === "string" || typeof item === "number" || typeof item === "boolean") {
            return [String(item)];
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
    if (item instanceof ParameterType) {
        if (formatParamHandler === "pg") {
            if (item.type === "literal") {
                return `$${index}`;
            }
            else if (item.type === "identifier") {
                return format("%I", item.value);
            }
            else if (item.type === "percent") {
                return format("%%", item.value);
            }
            else if (item.type === "string") {
                return format("%s", item.value);
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
    else {
        return item.trim();
    }
}
function toSqlWithParameters(formatParamHandler, item, index) {
    if (item instanceof ParameterType) {
        if (item.type === "literal") {
            if (formatParamHandler === "pg") {
                if (item.value === null)
                    return "NULL";
                if (item.value === true)
                    return "TRUE";
                if (item.value === false)
                    return "FALSE";
                return format("%L", item.value);
            }
            if (typeof formatParamHandler === "function") {
                return formatParamHandler({
                    index,
                    value: item.value,
                    type: item.type,
                });
            }
            return format("%L", item.value);
        }
        return toSql(formatParamHandler, item, index);
    }
    return item;
}
