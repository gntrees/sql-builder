import { format } from "../../../pg/format";
import { ParameterType } from "./base-raw-query-builder";
import type { QueryInstance } from "./generated/query-instance";
import type { PGFunction } from "./postgres-functions-list";
import { QueryBuilder } from "./query-builder";

import type { AllPossibleFunctionParamType, ParameterValueType, QueryType, RequiredDBInstance, Statement } from "./types";
import { ColumnSchema, DBSchema, TableSchema } from "./db-schema";
import type { FunctionListType } from "./function-list-type";
import { SqlSchemaParam, SqlSchemaParamCase, type SqlSchemaParamType } from "./sql-param";

type InstanceStructureSerializableValue =
    | string
    | number
    | boolean
    | null
    | undefined
    | {
        kind: "query-builder";
        value: InstanceStructureNode[];
    }
    | {
        kind: "identifier";
        value: string;
    }
    | {
        kind: "schema-param";
        value: {
            key: string;
            types: ("number" | "boolean" | "string" | "null")[];
            hasDefault: boolean;
            defaultValue?: string | number | boolean | null;
        };
    }
    | {
        kind: "array";
        value: InstanceStructureSerializableValue[];
    }
    | {
        kind: "object";
        value: Record<string, InstanceStructureSerializableValue>;
    };

type InstanceStructureNode = {
    name: string;
    args: InstanceStructureSerializableValue[];
};

type PrimitiveSchemaParam = string | number | boolean | null;
interface RuntimeParams {
    [key: SqlSchemaParam['key']]: PrimitiveSchemaParam | RuntimeParams;
}

// Core query builder state and orchestration.
export class CoreQueryBuilder {
    protected query: QueryType = { sql: [] };
    protected schemaQueryBuilder: FunctionListType[] = [];
    protected instanceStructure: InstanceStructureNode[] = [];
    protected callLevel: number = 0;
    protected queryInstance?: QueryInstance;
    protected runtimeParams: RuntimeParams = {};
    private isRebuilding: boolean = false;

    constructor(queryInstance?: QueryInstance) {
        this.queryInstance = queryInstance;
    }

    // Basic getters/setters and lifecycle.
    getTokens(): QueryType['sql'] {
        return this.query.sql;
    }

    protected setTokens(tokens: QueryType['sql']): this {
        this.query.sql = tokens;
        return this;
    }

    getSchema(): FunctionListType[] {
        return this.schemaQueryBuilder;
    }

    protected getInstanceStructure(): InstanceStructureNode[] {
        return cloneInstanceStructure(this.instanceStructure);
    }

    protected getRuntimeParams(): RuntimeParams {
        return this.runtimeParams;
    }

    // still prototype
    protected schemaParamCore<TKey extends string>(key: TKey): SqlSchemaParam<TKey> {
        this.endClass();
        return new SqlSchemaParam(key);
    }

    // still prototype
    protected schemaCaseCore<TKey extends string>(key: TKey, queryBuilder: QueryBuilder): this {
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
            const schemaCase = new SqlSchemaParamCase(key, {
                setParams: (params) => queryBuilder.setParams(params as RuntimeParams),
                getTokens: () => queryBuilder.getTokens(),
            });
            schemaCase.setParams(runtimeValue);
            const caseTokens = schemaCase.getQueryBuilder().getTokens() as QueryType["sql"];
            this.query.sql.push(...caseTokens);
            return this.endClass();
        }
        throw new Error(
            `Invalid schemaCase value for '${key}'. Expected boolean or object, got ${describeValueType(runtimeValue)}.`,
        );
    }

    // still prototype
    protected setParamsCore(params: RuntimeParams): this {
        if (!isPlainObject(params)) {
            throw new Error(`setParams expects an object, got ${describeValueType(params)}.`);
        }
        this.runtimeParams = { ...(params as RuntimeParams) };
        if (!this.isRebuilding) {
            this.rebuild();
        }
        return this.endClass();
    }

    protected setInstanceStructure(structure: InstanceStructureNode[]): this {
        this.instanceStructure = cloneInstanceStructure(structure);
        return this;
    }

    protected rebuild(): this {
        const structure = this.getInstanceStructure();
        this.query.sql = [];
        this.isRebuilding = true;
        try {
            structure.forEach((node) => this.replayInstanceNode(node));
        } finally {
            this.isRebuilding = false;
        }
        return this;
    }

    protected startClass() {
        this.callLevel += 1;
        return this;
    }

    protected endClass() {
        this.callLevel = Math.max(0, this.callLevel - 1);
        return this;
    }

    // Schema type guards and normalization.
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

    private getSchemaIdentifier(value: ColumnSchema | TableSchema | DBSchema): string {
        if (this.isColumnSchema(value)) {
            return `${value.tableSchema.tableSchemaName}.${value.columnSchemaName}`;
        }
        if (this.isTableSchema(value)) {
            return value.tableSchemaName;
        }
        return value.dbSchemaName;
    }

    protected normalizeSchemaParam(paramRaw: AllPossibleFunctionParamType, type: FunctionListType['paramType']): FunctionListType["arguments"] {
        const paramsArray = Array.isArray(paramRaw) ? paramRaw : [paramRaw];
        const normalizeSingleParam = (param: any): FunctionListType["arguments"][number] => {
            if (isPrimitiveSchemaParam(param)) {
                return {
                    paramType: getPrimitiveSchemaParamType(param),
                    name: param, arguments: []
                } as FunctionListType;
            }
            if (param instanceof SqlSchemaParam) {
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
                } as FunctionListType;
            }
            if (this.isSchemaObject(param)) {
                return {
                    paramType: "string",
                    name: this.getSchemaIdentifier(param),
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

    private registerSchemaCall(name: FunctionListType['name'], params: AllPossibleFunctionParamType, schema: FunctionListType): FunctionListType {
        if (name === "setParams") {
            return schema;
        }
        if (!this.isRebuilding && this.callLevel === 1) {
            this.captureInstanceStructure(name, params);
            this.schemaQueryBuilder.push(schema);
        }
        return schema;
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
            } as FunctionListType;
            return this.registerSchemaCall(name, params, schema);
        }
        const schema = { paramType: (type as any), name: name, arguments: this.normalizeSchemaParam(params, type) } as FunctionListType;
        return this.registerSchemaCall(name, params, schema);
    }

    // Instance structure capture, serialization, and replay.
    private captureInstanceStructure(name: FunctionListType['name'], params: AllPossibleFunctionParamType) {
        if (this.isRebuilding) {
            return;
        }
        const normalizedArgs = (Array.isArray(params) ? params : [params])
            .map((arg) => this.serializeInstanceValue(arg));
        this.instanceStructure.push({ name: String(name), args: normalizedArgs });
    }

    private serializeInstanceValue(value: unknown): InstanceStructureSerializableValue {
        if (isSerializablePrimitive(value)) {
            return value;
        }
        if (value instanceof SqlSchemaParam) {
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
        if (value instanceof QueryBuilder) {
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
            const entries = Object.entries(value as Record<string, unknown>)
                .reduce<Record<string, InstanceStructureSerializableValue>>((acc, [key, val]) => {
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

    private deserializeInstanceValue(value: InstanceStructureSerializableValue): unknown {
        if (isSerializablePrimitive(value)) {
            return value;
        }
        if (value.kind === "schema-param") {
            const schemaParam = new SqlSchemaParam(value.value.key);
            value.value.types.forEach((type) => {
                if (type === "number") schemaParam.number();
                if (type === "boolean") schemaParam.boolean();
                if (type === "string") schemaParam.string();
                if (type === "null") schemaParam.nullable();
            });
            if (value.value.hasDefault) {
                schemaParam.default(value.value.defaultValue as any);
            }
            return schemaParam;
        }
        if (value.kind === "query-builder") {
            const nested = new QueryBuilder(this.queryInstance);
            nested.setInstanceStructure(value.value);
            nested.rebuild();
            return nested;
        }
        if (value.kind === "identifier") {
            return new QueryBuilder(this.queryInstance).i(value.value);
        }
        if (value.kind === "array") {
            return value.value.map((item) => this.deserializeInstanceValue(item));
        }
        return Object.entries(value.value).reduce<Record<string, unknown>>((acc, [key, val]) => {
            acc[key] = this.deserializeInstanceValue(val);
            return acc;
        }, {});
    }

    private replayInstanceNode(node: InstanceStructureNode) {
        const target = (this as unknown as Record<string, unknown>)[node.name];
        if (typeof target !== "function") {
            throw new Error(`Cannot rebuild query: method '${node.name}' is not available`);
        }
        if (node.name === "raw" || node.name === "r") {
            const templateFlat = node.args.map((arg) => this.deserializeInstanceValue(arg));
            const strings: string[] = [];
            const values: unknown[] = [];
            templateFlat.forEach((item, index) => {
                if (index % 2 === 0) {
                    strings.push(String(item ?? ""));
                } else {
                    values.push(item);
                }
            });
            const templateStrings = strings as unknown as TemplateStringsArray;
            (templateStrings as { raw: readonly string[] }).raw = [...strings];
            (target as (...args: unknown[]) => unknown).apply(this, [templateStrings, ...values]);
            return;
        }
        const args = node.args.map((arg) => this.deserializeInstanceValue(arg));
        (target as (...args: unknown[]) => unknown).apply(this, args);
    }

    // SQL rendering and parameter extraction.
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
                }),
            )
            return format(sqlTokens, ...sqlParams)
        }
        let paramIndex = 0;
        return joinSqlTokens(
            this.query.sql.map((item) => {
                if (item instanceof ParameterType) {
                    paramIndex += 1;
                    return formatPgParameterToken(item, paramIndex);
                }
                return item;
            }),
        );
    }

    protected getSqlParametersCore() {
        if (!this.queryInstance) throw new Error("QueryInstance is required for this operation");
        const queryInstance = this.queryInstance;
        const formatParamHandler = queryInstance.getDbInstance().formatParamHandler;
        const onlyLiterals = formatParamHandler === "pg";

        return this.query.sql
            .filter((item): item is ParameterType => item instanceof ParameterType && (!onlyLiterals || item.type === "literal"))
            .map((item) => item.value);
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

    // Statement resolution helpers.
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
        if (item instanceof SqlSchemaParam) {
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
        if (item instanceof QueryBuilder) {
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

    protected resolveStatements(values: Statement[]): QueryType['sql'][] {
        return values.map((item) => this.resolveStatement(item));
    }

    protected resolveIdentifierStatement(item: Statement): QueryType['sql'] {
        if (item === undefined || item === null || item === "") {
            return [];
        }
        if (item instanceof SqlSchemaParam) {
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
        if (item instanceof QueryBuilder) {
            if (Object.keys(this.runtimeParams).length > 0) {
                item.setParams(this.runtimeParams);
            }
            return item.getTokens();
        }
        return [this.createIdentifierParameter(String(item))]
    }

    protected resolveStringStatement(item: Statement): QueryType['sql'] {
        if (item === undefined || item === null || item === "") {
            return [];
        }
        if (item instanceof SqlSchemaParam) {
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
        if (item instanceof QueryBuilder) {
            if (Object.keys(this.runtimeParams).length > 0) {
                item.setParams(this.runtimeParams);
            }
            return item.getTokens();
        }
        throw new Error(`Unsupported string statement type: ${typeof item}`);
    }

    // Token creation helpers.
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

    // SQL token composition helpers.
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

    protected resolveSqlSchemaParamValue(param: SqlSchemaParam<SqlSchemaParam['key'], SqlSchemaParamType>): ParameterValueType | undefined {
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

        const scalarValue = value as ParameterValueType;
        const expectedTypes = param.getTypes();
        if (expectedTypes.length === 0) {
            return scalarValue;
        }

        const resolvedType: "string" | "number" | "boolean" | "null" = scalarValue === null
            ? "null"
            : (typeof scalarValue as "string" | "number" | "boolean");
        if (!expectedTypes.includes(resolvedType)) {
            throw new Error(`Invalid value for SqlSchemaParam '${key}'. Expected ${expectedTypes.join(" | ")}, got ${resolvedType}.`);
        }

        return scalarValue;
    }
}

// Primitive and schema parameter helpers.
function isSerializablePrimitive(value: unknown): value is string | number | boolean | null | undefined {
    return value === undefined || value === null || typeof value === "string" || typeof value === "number" || typeof value === "boolean";
}

function isPrimitiveSchemaParam(value: unknown): value is PrimitiveSchemaParam {
    return value === null || typeof value === "string" || typeof value === "number" || typeof value === "boolean";
}

function getPrimitiveSchemaParamType(value: PrimitiveSchemaParam): FunctionListType['paramType'] {
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
function cloneInstanceStructure(structure: InstanceStructureNode[]): InstanceStructureNode[] {
    return structure.map((node) => ({
        name: node.name,
        args: node.args.map(cloneInstanceValue),
    }));
}

function cloneInstanceValue(value: InstanceStructureSerializableValue): InstanceStructureSerializableValue {
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
        value: Object.entries(value.value).reduce<Record<string, InstanceStructureSerializableValue>>((acc, [key, val]) => {
            acc[key] = cloneInstanceValue(val);
            return acc;
        }, {}),
    };
}

function isPlainObject(value: unknown): value is RuntimeParams {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function describeValueType(value: unknown): string {
    if (value === null) {
        return "null";
    }
    if (Array.isArray(value)) {
        return "array";
    }
    return typeof value;
}

// SQL token spacing helper.
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

// SQL formatting helpers.
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
