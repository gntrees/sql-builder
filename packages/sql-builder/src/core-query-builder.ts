import { format, quoteIdent } from "node-pg-format";
import { ParameterType } from "./base-raw-query-builder";
import type { QueryInstance } from "./generated/query-instance";
import { QueryBuilder } from "./query-builder";
import type { IdentifierInput, OperatorStatement, ParameterValueType, QueryType, RequiredDBInstance, StatementArrayValue, StatementValue, StatementValueLiteral, StatementValueIdentifier } from "./types";

export class CoreQueryBuilder {
    protected query: QueryType = { sql: [] };
    protected queryInstance?: QueryInstance;
    constructor(queryInstance?: QueryInstance) {
        this.queryInstance = queryInstance;
    }
    
    getTokens(): QueryType['sql'] {
        return this.query.sql;
    }
    protected requireQueryInstance(): QueryInstance {
        if (!this.queryInstance) {
            throw new Error("QueryInstance is required for this operation");
        }
        return this.queryInstance;
    }
    protected getSqlWithInstance() {
        const queryInstance = this.requireQueryInstance();
        const formatParamHandler = queryInstance.getDbInstance().formatParamHandler;
        if (formatParamHandler === "pg") {
            let literalIndex = 0;
            return joinSqlTokens(
                this.query.sql.map((item) => {
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
                    return item;
                }),
            );
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
    protected getParametersWithInstance() {
        const queryInstance = this.requireQueryInstance();
        const formatParamHandler = queryInstance.getDbInstance().formatParamHandler;
        if (formatParamHandler === "pg") {
            return this.query.sql
                .filter((i) => i instanceof ParameterType && i.type === "literal")
                .map((i) => (i as ParameterType).value);
        }
        if (formatParamHandler === "pg-format") {
            return this.query.sql
                .filter((i) => i instanceof ParameterType)
                .map((i) => (i as ParameterType).value);
        }
        return this.query.sql
            .filter((i) => i instanceof ParameterType)
            .map((i) => (i as ParameterType).value);
    }
    protected getSqlWithParametersWithInstance() {
        const queryInstance = this.requireQueryInstance();
        const formatParamHandler = queryInstance.getDbInstance().formatParamHandler;
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

    protected cloneParameter(parameter: ParameterType): ParameterType {
        return new ParameterType({
            value: parameter.value,
            type: parameter.type,
        });
    }

    protected resolveStatement(item: StatementValue | null | undefined, index: number): QueryType['sql'] {
        if (item === undefined || item === null || item === "") {
            return [];
        }
        if (item instanceof QueryBuilder) {
            return item.getTokens().map((token) =>
                token instanceof ParameterType ? this.cloneParameter(token) : token,
            );
        }
        if (typeof item === "string" || typeof item === "number" || typeof item === "boolean") {
            return [this.createLiteralParameter(item)];
        }
        throw new Error(`Unsupported statement type at index ${index}: ${typeof item}`);
    }

    protected resolveStatements(values: StatementValue[]): QueryType['sql'][] {
        return values.map((item, index) => this.resolveStatement(item, index));
    }

    protected normalizeStatementArray<T>(entries: StatementArrayValue<T>): T[] {
        const statements: T[] = [];
        for (const entry of entries) {
            if (Array.isArray(entry)) {
                statements.push(...this.normalizeStatementArray(entry));
                continue;
            }
            statements.push(entry);
        }
        return statements;
    }

    protected resolveIdentifierStatement(item: IdentifierInput | null | undefined, index: number): QueryType['sql'] {
        if (item === undefined || item === null || item === "") {
            return [];
        }
        if (typeof item === "object" && !(item instanceof QueryBuilder) && !(item instanceof ParameterType)) {
            return this.resolveAliasIdentifier(item, index);
        }
        if (item instanceof QueryBuilder) {
            return item.getTokens().map((token) =>
                token instanceof ParameterType ? this.cloneParameter(token) : token,
            );
        }
        if (item instanceof ParameterType) {
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

    protected resolveAliasIdentifier(value: Record<string, StatementValue>, index: number): QueryType['sql'] {
        const entries = Object.entries(value);
        if (entries.length === 0) {
            return [];
        }
        const tokens: QueryType['sql'] = [];
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

    protected resolveIdentifierString(value: string, index: number): QueryType['sql'] {
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
        const tokens: QueryType['sql'] = [];
        parts.forEach((part, partIndex) => {
            if (!part) {
                throw new Error(`Invalid identifier at index ${index}: ${value}`);
            }
            if (partIndex > 0) {
                tokens.push(".");
            }
            if (part === "*") {
                tokens.push("*");
            } else {
                tokens.push(this.createIdentifierParameter(part));
            }
        });
        return tokens;
    }

    protected resolveIdentifierStatementArray(entries: StatementArrayValue<IdentifierInput>): QueryType['sql'][] {
        const statements = this.normalizeStatementArray(entries);
        return statements.map((item, index) => this.resolveIdentifierStatement(item, index));
    }

    protected resolveLiteralStatementArray(entries: StatementArrayValue<StatementValue>): QueryType['sql'][] {
        const statements = this.normalizeStatementArray(entries);
        return statements.map((item, index) => this.resolveStatement(item, index));
    }

    protected resolveOperatorStatement(item: OperatorStatement | null | undefined, index: number): QueryType['sql'] {
        if (item === undefined || item === null) {
            return [];
        }
        if (typeof item === "string" && (item as string) === "") {
            return [];
        }
        if (item instanceof QueryBuilder) {
            return item.getTokens().map((token) =>
                token instanceof ParameterType ? this.cloneParameter(token) : token,
            );
        }
        if (typeof item === "string") {
            return [item];
        }
        throw new Error(`Unsupported operator type at index ${index}: ${typeof item}`);
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
        name: string,
        ...args: (ParameterType | QueryBuilder | string | undefined)[]
    ) {
        this.query.sql.push(`${name}(`);
        const resolvedArgs = args
            .filter((arg): arg is ParameterType | QueryBuilder | string =>
                arg !== undefined && arg !== null && arg !== "")
            .map((arg, index) => {
                // If ParameterType, clone and use as-is
                if (arg instanceof ParameterType) {
                    return [this.cloneParameter(arg)];
                }
                // If QueryBuilder, resolve recursively
                if (arg instanceof QueryBuilder) {
                    return arg.getTokens().map((token) =>
                        token instanceof ParameterType ? this.cloneParameter(token) : token,
                    );
                }
                // If plain string, treat as literal (default behavior)
                return [this.createLiteralParameter(arg)];
            })
            .filter((tokens) => tokens.length > 0);
        this.pushSeparatedTokens(resolvedArgs, ",");
        this.query.sql.push(")");
        return this;
    }

    // Helper to create identifier ParameterType from StatementValue
    protected toIdentifier(value: StatementValue): ParameterType | QueryBuilder | string {
        if (value instanceof ParameterType) {
            return value;
        }
        if (value instanceof QueryBuilder) {
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

    // Helper to create literal ParameterType from StatementValue
    protected toLiteral(value: StatementValue): ParameterType | QueryBuilder | string {
        if (value instanceof ParameterType) {
            return value;
        }
        if (value instanceof QueryBuilder) {
            return value;
        }
        if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
            return this.createLiteralParameter(value);
        }
        if (value === null || value === undefined) {
            return "";
        }
        return this.createLiteralParameter(value);
    }

    // Handle StatementValueLiteral - always create literal parameter
    // Used for data values (numbers, booleans, null, strings as data, QueryBuilder as subquery)
    protected toLiteralValue(value: StatementValueLiteral): ParameterType | QueryBuilder | string {
        if (value instanceof ParameterType) {
            return value;
        }
        if (value instanceof QueryBuilder) {
            return value;
        }
        if (typeof value === "string" || typeof value === "number" || typeof value === "boolean" || value === null) {
            return this.createLiteralParameter(value);
        }
        return "";
    }

    // Handle StatementValueIdentifier - create identifier parameter
    // Used for database object names (columns, tables, sequences)
    protected toIdentifierValue(value: StatementValueIdentifier): ParameterType | QueryBuilder | string {
        if (value instanceof ParameterType) {
            return value;
        }
        if (value instanceof QueryBuilder) {
            return value;
        }
        if (typeof value === "string") {
            return this.createIdentifierParameter(value);
        }
        return "";
    }

    protected isIdentifier(value: any): boolean {
        if (typeof value !== "string") {
            return false;
        }
        try {
            const quoted = quoteIdent(value);

            return quoted === value;
        } catch {
            return false;
        }
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
        if (formatParamHandler === "pg") {
            if (item.type === "literal") {
                return `$${index}`;
            } else if (item.type === "identifier") {
                return format("%I", item.value);
            } else if (item.type === "percent") {
                return format("%%", item.value);
            } else if (item.type === "string") {
                return format("%s", item.value);
            }
        } else if (typeof formatParamHandler === "function") {
            return formatParamHandler({
                index,
                value: item.value,
                type: item.type,
            });
        } else {
            if (item.type === "literal") {
                return "%L";
            } else if (item.type === "identifier") {
                return "%I";
            } else if (item.type === "percent") {
                return "%%";
            } else if (item.type === "string") {
                return "%s";
            }
        }
        return "";
    }
    return item;
}

function toSqlWithParameters(
    formatParamHandler: RequiredDBInstance["formatParamHandler"],
    item: string | ParameterType,
    index: number,
): string {
    if (item instanceof ParameterType) {
        if (item.type === "literal") {
            if (formatParamHandler === "pg") {
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