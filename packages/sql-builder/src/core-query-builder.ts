import { format, quoteIdent } from "node-pg-format";
import { ParameterType } from "./base-raw-query-builder";
import type { QueryInstance } from "./generated/query-instance";
import { QueryBuilder } from "./query-builder";
import type { IdentifierInput, OperatorStatement, ParameterValueType, QueryType, RequiredDBInstance, StatementArrayValue, Statement } from "./types";
import type { PGFunction } from "./postgres-functions-list";

export class CoreQueryBuilder {
    protected query: QueryType = { sql: [] };
    protected queryInstance?: QueryInstance;
    constructor(queryInstance?: QueryInstance) {
        this.queryInstance = queryInstance;
    }
    getTokens(): QueryType['sql'] {
        return this.query.sql;
    }
    protected getSqlWithInstance() {
        if (!this.queryInstance) throw new Error("QueryInstance is required for this operation");
        const queryInstance = this.queryInstance;
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
                    return item.trim();
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
        if (!this.queryInstance) throw new Error("QueryInstance is required for this operation");
        const queryInstance = this.queryInstance;
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
        if (!this.queryInstance) throw new Error("QueryInstance is required for this operation");
        const queryInstance = this.queryInstance;
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
        if (item instanceof QueryBuilder) {
            return item.getTokens();
        }
        if (typeof item === "string" || typeof item === "number" || typeof item === "boolean") {
            return [this.createLiteralParameter(item)];
        }
        return [this.createLiteralParameter(item)];
    }

    protected resolveStatements(values: Statement[]): QueryType['sql'][] {
        return values.map((item) => this.resolveStatement(item));
    }

    protected resolveIdentifierStatement(item: Statement): QueryType['sql'] {
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
        return [this.createIdentifierParameter(item)]
    }
    protected resolveStringStatement(item: Statement): QueryType['sql'] {
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