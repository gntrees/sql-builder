import { format } from "../../../pg/format";
import type { FunctionListType } from "@gntrees/sql-builder-cli";
import { ParameterType } from "./base-raw-query-builder";
import type { QueryInstance } from "./generated/query-instance";
import type { PGFunction } from "./postgres-functions-list";
import { QueryBuilder } from "./query-builder";
import { ColumnSchema, DBSchema, TableSchema } from "@gntrees/sql-builder/pg";
import type { AllPossibleFunctionParamType, ParameterValueType, QueryType, RequiredDBInstance, Statement } from "./types";

export class CoreQueryBuilder {
    protected query: QueryType = { sql: [] };
    protected schemaQueryBuilder: FunctionListType[] = [];
    protected callLevel: number = 0;
    protected queryInstance?: QueryInstance;
    constructor(queryInstance?: QueryInstance) {
        this.queryInstance = queryInstance;
    }
    getTokens(): QueryType['sql'] {
        return this.query.sql;
    }
    setTokens(tokens: QueryType['sql']): this {
        this.query.sql = tokens;
        return this;
    }
    getSchema(): FunctionListType[] {
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
    private isColumnSchema(value: unknown): value is ColumnSchema {
        return value instanceof ColumnSchema;
    }
    private isTableSchema(value: unknown): value is TableSchema {
        return value instanceof TableSchema;
    }
    private isDbSchema(value: unknown): value is DBSchema {
        return value instanceof DBSchema;
    }
    protected isSchemaObject(value: unknown): value is ColumnSchema | TableSchema | DBSchema {
        return this.isColumnSchema(value) || this.isTableSchema(value) || this.isDbSchema(value);
    }
    protected normalizeSchemaParam(paramRaw: AllPossibleFunctionParamType, type: FunctionListType['paramType']): FunctionListType["arguments"] {
        const paramsArray = Array.isArray(paramRaw) ? paramRaw : [paramRaw];
        const normalizeSingleParam = (param: any): FunctionListType["arguments"][number] => {
            if (typeof param === "string" || typeof param === "number" || typeof param === "boolean" || param === null) {
                return {
                    paramType:
                        typeof param === "string" ? "string" :
                            typeof param === "number" ? "number" :
                                typeof param === "boolean" ? "boolean" :
                                    param === null ? "null" : "undefined",
                    name: param, arguments: []
                } as FunctionListType;
            }
            if (this.isColumnSchema(param)) {
                return {
                    paramType: "string",
                    name: `${param.tableSchema.tableSchemaName}.${param.columnSchemaName}`,
                    arguments: [],
                } as FunctionListType;
            }
            if (this.isTableSchema(param)) {
                return {
                    paramType: "string",
                    name: param.tableSchemaName,
                    arguments: [],
                } as FunctionListType;
            }

            if (this.isDbSchema(param)) {
                return {
                    paramType: "string",
                    name: param.dbSchemaName,
                    arguments: [],
                } as FunctionListType;
            }
            if (Array.isArray(param)) {
                return { paramType: "array", name: this.normalizeSchemaParam(param, type), arguments: [] } as FunctionListType;
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
                        arguments: this.normalizeSchemaParam(value as any, type),
                        paramType: Array.isArray(value) ? "array" : typeof value === "object" ? "object" : typeof value === "string" ? "string" : typeof value === "number" ? "number" : typeof value === "boolean" ? "boolean" : "null"
                    })) as FunctionListType[]
                }
            }
        }
        return paramsArray.map(normalizeSingleParam);

    }
    protected resolveSchemaParam(type: FunctionListType['paramType'], name: FunctionListType['name'], params: AllPossibleFunctionParamType): FunctionListType {
        this.startClass();
        if (this.callLevel > 1) {
            return {
                paramType: type,
                name,
                arguments: []
            } as FunctionListType;
        }
        if (type === "template-literal") {
            const arrayParams = Array.isArray(params) ? params : [params];
            const normalizedParams = arrayParams.map((param, i) => {
                // jika ganjil maka string jika genap maka normalize
                if (i % 2 === 0) {
                    return param;
                } else {
                    return this.normalizeSchemaParam(param as any, type);
                }
            })
            const schema = {
                paramType: type,
                name,
                arguments: normalizedParams
            } as FunctionListType
            this.schemaQueryBuilder.push(schema);
            return schema;
        }
        const schema = { paramType: (type as any), name: name, arguments: this.normalizeSchemaParam(params, type) } as FunctionListType;
        this.schemaQueryBuilder.push(schema);
        return schema;
    }
    protected getSqlCore() {
        if (!this.queryInstance) throw new Error("QueryInstance is required for this operation");
        const queryInstance = this.queryInstance;
        const formatParamHandler = queryInstance.getDbInstance().formatParamHandler;

        if (formatParamHandler === "pg") {
            let literalIndex = 0;
            const sqlParams: ParameterType['value'][] = [];
            const sqlTokens = joinSqlTokens(
                this.query.sql.map((item) => {
                    if (item instanceof ParameterType) {
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
                }),
            )
            return format(sqlTokens, ...sqlParams)
        }
        let paramIndex = 0;
        return joinSqlTokens(
            this.query.sql.map((item) => {
                if (item instanceof ParameterType) {
                    paramIndex += 1;
                    return toSql(formatParamHandler, item, paramIndex);
                }
                return item;
            }),
        );
    }
    protected getParametersCore() {
        
        if (!this.queryInstance) throw new Error("QueryInstance is required for this operation");
        const queryInstance = this.queryInstance;
        const formatParamHandler = queryInstance.getDbInstance().formatParamHandler;
        if (formatParamHandler === "pg")
            return this.query.sql
                .filter((i) => i instanceof ParameterType
                    && i.type === "literal"
                )
                .map((i) => (i as ParameterType).value);
        if (formatParamHandler === "pg-format") {
            return this.query.sql
                .filter((i) => i instanceof ParameterType)
                .map((i) => (i as ParameterType).value);
        }
        return this.query.sql
            .filter((i) => i instanceof ParameterType)
            .map((i) => (i as ParameterType).value);
    }
    protected getSqlWithParametersCore() {
        if (!this.queryInstance) throw new Error("QueryInstance is required for this operation");
        const queryInstance = this.queryInstance;
        const formatParamHandler = queryInstance.getDbInstance().formatParamHandler;
        if (formatParamHandler === "pg") {
            return joinSqlTokens(
                this.query.sql.map((item) => {
                    if (item instanceof ParameterType) {
                        return formatPgParameterWithValue(item);
                    }
                    return item.trim();
                }),
            );
        }
        let paramIndex = 0;
        return joinSqlTokens(
            this.query.sql.map((item) => {
                if (item instanceof ParameterType) {
                    paramIndex += 1;
                    return toSqlWithParameters(formatParamHandler, item, paramIndex);
                }
                return item;
            }),
        );
    }
    protected createLiteralParameter(value: ParameterValueType): ParameterType {
        return new ParameterType({
            value,
            type: "literal",
        });
    }
    protected createIdentifierParameter(value: string | number | boolean): ParameterType {
        return new ParameterType({
            value,
            type: "identifier",
        });
    }
    protected createStringParameter(value: string): ParameterType {
        return new ParameterType({
            value,
            type: "string",
        });
    }
    protected createPercentParameter(): ParameterType {
        return new ParameterType({
            value: '%',
            type: "percent",
        });
    }
    protected resolveStatement(item: Statement): QueryType['sql'] {
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
        if (item instanceof QueryBuilder) {
            return item.getTokens();
        }
        if (typeof item === "string" || typeof item === "number" || typeof item === "boolean") {
            return [this.createLiteralParameter(item)];
        }
        return [this.createLiteralParameter(String(item))];
    }

    protected resolveStatements(values: Statement[]): QueryType['sql'][] {
        return values.map((item) => this.resolveStatement(item));
    }

    protected resolveIdentifierStatement(item: Statement): QueryType['sql'] {
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
        if (item instanceof QueryBuilder) {
            return item.getTokens();
        }
        return [this.createIdentifierParameter(String(item))]
    }
    protected resolveStringStatement(item: Statement): QueryType['sql'] {
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
        if (item instanceof QueryBuilder) {
            return item.getTokens();
        }
        throw new Error(`Unsupported string statement type: ${typeof item}`);
    }

    protected pushSeparatedTokens(tokensList: QueryType['sql'][], separator: string) {
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

    protected pushFunction(
        func: PGFunction,
        ...runtimeArgs: Statement[]
    ): this {
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
        } else {
            this.query.sql.push(func.name + "(");
            const filteredArgs = runtimeArgs.filter(arg => arg !== undefined && arg !== "");
            const resolvedArgs = filteredArgs.map(arg => this.resolveStatement(arg));
            this.pushSeparatedTokens(resolvedArgs, ",");
            this.query.sql.push(")");
        }
        return this;
    }
}


function joinSqlTokens(tokens: string[]): string {
    const spacedTokens: string[] = [];
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

function shouldInsertSpace(prev: string, next: string): boolean {
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

function toSql(
    formatParamHandler: RequiredDBInstance["formatParamHandler"],
    item: string | ParameterType,
    index: number,
): string {
    if (item instanceof ParameterType) {
        return formatParameterToken(formatParamHandler, item, index);
    } else {
        return item.trim();
    }
}

function toSqlWithParameters(
    formatParamHandler: RequiredDBInstance["formatParamHandler"],
    item: string | ParameterType,
    index: number,
): string {
    if (item instanceof ParameterType) {
        if (item.type === "literal") {
            return formatLiteralWithParameters(formatParamHandler, item, index);
        }
        return toSql(formatParamHandler, item, index);
    }
    return item;
}

function formatPgParameterToken(item: ParameterType, literalIndex: number): string {
    if (item.type === "literal") {
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

function formatPgParameterWithValue(item: ParameterType): string {
    if (item.type === "literal") {
        if (item.value === null) return "NULL";
        if (item.value === true) return "TRUE";
        if (item.value === false) return "FALSE";
        return format("%L", item.value);
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

function formatParameterToken(
    formatParamHandler: RequiredDBInstance["formatParamHandler"],
    item: ParameterType,
    index: number,
): string {
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

function formatLiteralWithParameters(
    formatParamHandler: RequiredDBInstance["formatParamHandler"],
    item: ParameterType,
    index: number,
): string {
    if (formatParamHandler === "pg") {
        if (item.value === null) return "NULL";
        if (item.value === true) return "TRUE";
        if (item.value === false) return "FALSE";
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
