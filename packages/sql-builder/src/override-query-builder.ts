import type { ParameterType } from "./base-raw-query-builder";
import { OperatorFunctionBuilder } from "./override-operator-functions";
import { QueryBuilder } from "./query-builder";
import type { Statement } from "./types";

export class OverrideQueryBuilder extends OperatorFunctionBuilder {
    override escape(value?: Statement) {
        if (value === undefined) {
            return super.escape();
        }
        this.query.sql.push("ESCAPE");
        const resolvedEscape = super.resolveStatement(value);
        if (resolvedEscape.length > 0) {
            this.query.sql.push(...resolvedEscape);
        }
        return this;
    }

    semicolon() {
        this.query.sql.push(";");
        return this;
    }

    sc() {
        return this.semicolon();
    }

    beginTransaction() {
        return this.begin().semicolon();
    }

    commitTransaction() {
        return this.commit().semicolon();
    }

    rollbackTransaction() {
        return this.rollback().semicolon();
    }

    savepointTransaction(name?: Statement) {
        super.savepoint();
        if (name !== undefined && name !== null) {
            const resolvedName = typeof name === "string"
                ? super.resolveIdentifierStatement(name)
                : super.resolveStatement(name);
            if (resolvedName.length > 0) {
                this.query.sql.push(...resolvedName);
            }
        }
        return this.semicolon();
    }

    override transaction(...transaction: Statement[]) {
        if (transaction.length === 0) {
            return super.transaction();
        }
        this.beginTransaction();
        const resolvedStatements = super
            .resolveStatements(transaction)
            .filter((tokens) => tokens.length > 0);
        resolvedStatements.forEach((tokens) => {
            this.query.sql.push(...tokens);
            const lastToken = tokens[tokens.length - 1];
            if (lastToken !== ";") {
                this.semicolon();
            }
        });
        return this.commitTransaction();
    }
    // Queries
    override select(...cols: (Statement | {
        [key: string]: Statement;
    })[]) {
        super.select();
        if (cols.length === 0) {
            return this;
        }
        const columns: (string | ParameterType)[][] = [] 
        cols.forEach((item) => {
            if (item && typeof item === "object" && !(item instanceof QueryBuilder)) {
                const entries = Object.entries(item);
                entries.forEach(([alias, column]) => {
                    const tokens: QueryBuilder["query"]["sql"] = [];
                    const resolvedColumn = super.resolveStatement(column);
                    const resolvedAlias = super.resolveIdentifierStatement(alias);
                    if (resolvedColumn.length === 0) {
                        return;
                    }
                    tokens.push(...resolvedColumn);
                    if (resolvedAlias.length > 0) {
                        tokens.push("AS", ...resolvedAlias);
                    }
                    columns.push(tokens);
                });
            } else {
                const resolved = super.resolveStatement(item);
                columns.push(resolved);
            }
        });        
        super.pushSeparatedTokens(columns, ",");
        return this;
    }

    selectDistinct(...cols: (Statement | {
        [key: string]: Statement;
    })[]) {
        super.select();
        super.distinct();
        if (cols.length === 0) {
            return this;
        }
        const columns: (string | ParameterType)[][] = [] 
        cols.forEach((item) => {
            if (item && typeof item === "object" && !(item instanceof QueryBuilder)) {
                const entries = Object.entries(item);
                entries.forEach(([alias, column]) => {
                    const tokens: QueryBuilder["query"]["sql"] = [];
                    const resolvedColumn = super.resolveStatement(column);
                    const resolvedAlias = super.resolveIdentifierStatement(alias);
                    if (resolvedColumn.length === 0) {
                        return;
                    }
                    tokens.push(...resolvedColumn);
                    if (resolvedAlias.length > 0) {
                        tokens.push("AS", ...resolvedAlias);
                    }
                    columns.push(tokens);
                });
            } else {
                const resolved = super.resolveStatement(item);
                columns.push(resolved);
            }
        });        
        super.pushSeparatedTokens(columns, ",");
        return this;
    }

    selectDistinctOn(
        on?: Statement[],
        cols?: (Statement | {
            [key: string]: Statement;
        })[]
    ) {
        super.select();
        super.distinct();
        if (on !== undefined && on.length > 0) {
            super.on();
            this.query.sql.push("(");
            const resolvedOn = on.map((item) => super.resolveIdentifierStatement(item));
            super.pushSeparatedTokens(resolvedOn, ",");
            this.query.sql.push(")");
        }
        if (cols == undefined || cols.length === 0) {
            return this;
        }
        const columns: (string | ParameterType)[][] = [] 
        cols.forEach((item) => {
            if (item && typeof item === "object" && !(item instanceof QueryBuilder)) {
                const entries = Object.entries(item);
                entries.forEach(([alias, column]) => {
                    const tokens: QueryBuilder["query"]["sql"] = [];
                    const resolvedColumn = super.resolveStatement(column);
                    const resolvedAlias = super.resolveIdentifierStatement(alias);
                    if (resolvedColumn.length === 0) {
                        return;
                    }
                    tokens.push(...resolvedColumn);
                    if (resolvedAlias.length > 0) {
                        tokens.push("AS", ...resolvedAlias);
                    }
                    columns.push(tokens);
                });
            } else {
                const resolved = super.resolveStatement(item);
                columns.push(resolved);
            }
        });        
        super.pushSeparatedTokens(columns, ",");
        return this;
    }

    insertInto(table?: Statement, cols?: Statement[]) {
        super.insert();
        super.into();
        if (table !== undefined && table !== null) {
            const resolvedTable = super.resolveIdentifierStatement(table);
            if (resolvedTable.length > 0) {
                this.query.sql.push(...resolvedTable);
            }
        }
        if (!cols || cols.length === 0) {
            return this;
        }
        const resolvedColumns = cols.map((item) => super.resolveIdentifierStatement(item));
        if (resolvedColumns.length > 0) {
            this.query.sql.push("(");
            super.pushSeparatedTokens(resolvedColumns, ",");
            this.query.sql.push(")");
        }
        return this;
    }

    override values(...values: Array<Statement | Array<Statement>>) {
        if (values.length === 0) {
            super.values();
            return this;
        }
        this.query.sql.push("VALUES");
        const multiRows = Array.isArray(values[0]);
        const valueRows = multiRows
            ? (values as Array<Array<string | QueryBuilder>>)
            : [values as Array<string | QueryBuilder>];
        valueRows.forEach((row, rowIndex) => {
            if (rowIndex > 0) {
                this.query.sql.push(",");
            }
            const resolvedRow = row.map((item) => super.resolveStatement(item));
            this.query.sql.push("(");
            super.pushSeparatedTokens(resolvedRow, ",");
            this.query.sql.push(")");
        });
        return this;
    }

    override insert<T extends Record<string, Statement>>(
        table?: Statement,
        values?: T | T[],
    ) {
        super.insert();
        if (table === undefined || table === null) {
            return this;
        }
        super.into();
        const resolvedTable = super.resolveIdentifierStatement(table);
        if (resolvedTable.length > 0) {
            this.query.sql.push(...resolvedTable);
        }
        const rows = values === undefined ? [] : Array.isArray(values) ? values : [values];
        if (rows.length === 0) {
            return this;
        }
        const columnNames = Object.keys(rows[0] ?? {});
        const columnSet = new Set(columnNames);
        rows.forEach((row, index) => {
            const keys = Object.keys(row);
            if (keys.length !== columnNames.length) {
                throw new Error(`Insert values keys mismatch at row ${index + 1}.`);
            }
            keys.forEach((key) => {
                if (!columnSet.has(key)) {
                    throw new Error(`Insert values keys mismatch at row ${index + 1}.`);
                }
            });
        });
        if (columnNames.length > 0) {
            const resolvedColumns = columnNames.map((item) => super.resolveIdentifierStatement(item));
            this.query.sql.push("(");
            super.pushSeparatedTokens(resolvedColumns, ",");
            this.query.sql.push(")");
        }
        this.query.sql.push("VALUES");
        rows.forEach((row, rowIndex) => {
            if (rowIndex > 0) {
                this.query.sql.push(",");
            }
            const resolvedRow = columnNames.map((column) => row[column] as Statement)
                .map((item) => super.resolveStatement(item));
            this.query.sql.push("(");
            super.pushSeparatedTokens(resolvedRow, ",");
            this.query.sql.push(")");
        });
        return this;
    }

    override update(table?: Statement) {
        super.update();
        if (table === undefined || table === null) {
            return this;
        }
        const resolvedTable = super.resolveIdentifierStatement(table);
        if (resolvedTable.length > 0) {
            this.query.sql.push(...resolvedTable);
        }
        return this;
    }

    override delete(table?: Statement) {
        super.delete();
        if (table === undefined || table === null) {
            return this;
        }
        super.from();
        const resolvedTable = super.resolveIdentifierStatement(table);
        if (resolvedTable.length > 0) {
            this.query.sql.push(...resolvedTable);
        }
        return this;
    }

    override set(set?: Record<string, Statement>) {
        super.set();
        if (set === undefined) {
            return this;
        }
        const entries = Object.entries(set);
        if (entries.length === 0) {
            return this;
        }
        let hasAssignments = false;
        entries.forEach(([column, value]) => {
            const resolvedColumn = super.resolveIdentifierStatement(column);
            const resolvedValue = super.resolveStatement(value);
            if (resolvedColumn.length === 0 || resolvedValue.length === 0) {
                return;
            }
            if (hasAssignments) {
                this.query.sql.push(",");
            }
            this.query.sql.push(...resolvedColumn, "=", ...resolvedValue);
            hasAssignments = true;
        });
        return this;
    }

    onConflictDoNothing(options?: {
        target?: Statement | Statement[];
        targetWhere?: Statement;
    }) {
        super.on();
        super.conflict();
        if (options?.target !== undefined && options?.target !== null) {
            if (Array.isArray(options.target)) {
                const resolvedTarget = options.target.map((item) => super.resolveIdentifierStatement(item));
                if (resolvedTarget.length > 0) {
                    this.query.sql.push("(");
                    super.pushSeparatedTokens(resolvedTarget, ",");
                    this.query.sql.push(")");
                }
            } else {
                const resolvedTarget = typeof options.target === "string"
                    ? super.resolveIdentifierStatement(options.target)
                    : super.resolveStatement(options.target as QueryBuilder);
                if (resolvedTarget.length > 0) {
                    this.query.sql.push(...resolvedTarget);
                }
            }
        }
        if (options?.targetWhere) {
            super.where();
            const resolvedTargetWhere = super.resolveStatement(options.targetWhere);
            if (resolvedTargetWhere.length > 0) {
                this.query.sql.push(...resolvedTargetWhere);
            }
        }
        super.do();
        super.nothing();
        return this;
    }

    onConflictDoUpdate(options?: {
        target?: Statement | Statement[];
        targetWhere?: Statement;
        set?: Record<string, Statement> | Record<string, Statement>[];
        setWhere?: Statement;
    }) {
        super.on();
        super.conflict();
        if (options?.target !== undefined && options?.target !== null) {
            if (Array.isArray(options.target)) {
                const resolvedTarget = options.target.map((item) => super.resolveIdentifierStatement(item));
                if (resolvedTarget.length > 0) {
                    this.query.sql.push("(");
                    super.pushSeparatedTokens(resolvedTarget, ",");
                    this.query.sql.push(")");
                }
            } else {
                const resolvedTarget = typeof options.target === "string"
                    ? super.resolveIdentifierStatement(options.target)
                    : super.resolveStatement(options.target as QueryBuilder);
                if (resolvedTarget.length > 0) {
                    this.query.sql.push(...resolvedTarget);
                }
            }
        }
        if (options?.targetWhere) {
            super.where();
            const resolvedTargetWhere = super.resolveStatement(options.targetWhere);
            if (resolvedTargetWhere.length > 0) {
                this.query.sql.push(...resolvedTargetWhere);
            }
        }
        super.do();
        super.update();
        super.set();
        const setEntries = options?.set === undefined
            ? []
            : Array.isArray(options.set)
                ? options.set
                : [options.set];
        let hasAssignments = false;
        setEntries.forEach((entry) => {
            Object.entries(entry).forEach(([column, value]) => {
                const resolvedColumn = super.resolveIdentifierStatement(column);
                const resolvedValue = super.resolveStatement(value);
                if (resolvedColumn.length === 0 || resolvedValue.length === 0) {
                    return;
                }
                if (hasAssignments) {
                    this.query.sql.push(",");
                }
                this.query.sql.push(...resolvedColumn, "=", ...resolvedValue);
                hasAssignments = true;
            });
        });
        if (options?.setWhere) {
            super.where();
            const resolvedSetWhere = super.resolveStatement(options.setWhere);
            if (resolvedSetWhere.length > 0) {
                this.query.sql.push(...resolvedSetWhere);
            }
        }
        return this;
    }

    override case(caseExpr?: Statement, asAlias?: Statement) {
        super.case();
        if (caseExpr) {
            const resolvedExpr = super.resolveStatement(caseExpr);
            if (resolvedExpr.length > 0) {
                this.query.sql.push(...resolvedExpr);
            }
        }
        const lastToken = this.query.sql[this.query.sql.length - 1];
        if (lastToken !== "END") {
            this.query.sql.push("END");
        }
        if (asAlias !== undefined && asAlias !== null) {
            super.as();
            const resolvedAlias = typeof asAlias === "string"
                ? super.resolveIdentifierStatement(asAlias)
                : super.resolveStatement(asAlias as QueryBuilder);
            if (resolvedAlias.length > 0) {
                this.query.sql.push(...resolvedAlias);
            }
        }
        return this;
    }

    override when(condition?: Statement) {
        super.when();
        if (condition) {
            const resolvedCondition = super.resolveStatement(condition);
            if (resolvedCondition.length > 0) {
                this.query.sql.push(...resolvedCondition);
            }
        }
        return this;
    }

    override then(value?: Statement) {
        super.then();
        if (value) {
            const resolvedValue = super.resolveStatement(value);
            if (resolvedValue.length > 0) {
                this.query.sql.push(...resolvedValue);
            }
        }
        return this;
    }

    override else(value?: Statement) {
        super.else();
        if (value) {
            const resolvedValue = super.resolveStatement(value);
            if (resolvedValue.length > 0) {
                this.query.sql.push(...resolvedValue);
            }
        }
        return this;
    }

    override asc(...cols: Statement[]) {
        if (cols.length === 0) {
            super.asc();
            return this;
        }
        const resolvedColumns = cols.map((item) => super.resolveIdentifierStatement(item));
        let hasTokens = false;
        resolvedColumns.forEach((tokens) => {
            if (tokens.length === 0) {
                return;
            }
            if (hasTokens) {
                this.query.sql.push(",");
            }
            this.query.sql.push(...tokens, "ASC");
            hasTokens = true;
        });
        return this;
    }

    override desc(...cols: Statement[]) {
        if (cols.length === 0) {
            super.desc();
            return this;
        }
        const resolvedColumns = cols.map((item) => super.resolveIdentifierStatement(item));
        let hasTokens = false;
        resolvedColumns.forEach((tokens) => {
            if (tokens.length === 0) {
                return;
            }
            if (hasTokens) {
                this.query.sql.push(",");
            }
            this.query.sql.push(...tokens, "DESC");
            hasTokens = true;
        });
        return this;
    }

    nullsFirst() {
        this.query.sql.push("NULLS", "FIRST");
        return this;
    }

    nullsLast() {
        this.query.sql.push("NULLS", "LAST");
        return this;
    }

    override as(alias?: Statement) {
        super.as();
        if (alias !== undefined && alias !== null) {
            const resolvedAlias = typeof alias === "string"
                ? super.resolveIdentifierStatement(alias)
                : super.resolveStatement(alias as QueryBuilder);
            if (resolvedAlias.length > 0) {
                this.query.sql.push(...resolvedAlias);
            }
        }
        return this;
    }

    sub(query?: Statement) {
        this.query.sql.push("(");
        if (query) {
            const resolvedQuery = super.resolveStatement(query);
            if (resolvedQuery.length > 0) {
                this.query.sql.push(...resolvedQuery);
            }
        }
        this.query.sql.push(")");
        return this;
    }

    override from(...tables: Statement[]) {
        super.from();
        if (tables.length === 0) {
            return this;
        }
        const resolvedTables = tables.map((item) => super.resolveIdentifierStatement(item));
        super.pushSeparatedTokens(resolvedTables, ",");
        return this;
    }

    leftJoin(table?: Statement, on?: Statement) {
        super.left();
        super.join();
        if (table !== undefined && table !== null) {
            const resolvedTable = super.resolveIdentifierStatement(table);
            if (resolvedTable.length > 0) {
                this.query.sql.push(...resolvedTable);
            }
        }
        if (on) {
            super.on();
            const resolvedOn = super.resolveStatement(on as QueryBuilder);
            if (resolvedOn.length > 0) {
                this.query.sql.push(...resolvedOn);
            }
        }
        return this;
    }

    leftJoinLateral(table?: Statement, on?: Statement) {
        super.left();
        super.join();
        super.lateral();
        if (table !== undefined && table !== null) {
            const resolvedTable = super.resolveIdentifierStatement(table);
            if (resolvedTable.length > 0) {
                this.query.sql.push(...resolvedTable);
            }
        }
        if (on) {
            super.on();
            const resolvedOn = super.resolveStatement(on as QueryBuilder);
            if (resolvedOn.length > 0) {
                this.query.sql.push(...resolvedOn);
            }
        }
        return this;
    }

    innerJoin(table?: Statement, on?: Statement) {
        super.inner();
        super.join();
        if (table !== undefined && table !== null) {
            const resolvedTable = super.resolveIdentifierStatement(table);
            if (resolvedTable.length > 0) {
                this.query.sql.push(...resolvedTable);
            }
        }
        if (on) {
            super.on();
            const resolvedOn = super.resolveStatement(on as QueryBuilder);
            if (resolvedOn.length > 0) {
                this.query.sql.push(...resolvedOn);
            }
        }
        return this;
    }

    rightJoin(table?: Statement, on?: Statement) {
        super.right();
        super.join();
        if (table !== undefined && table !== null) {
            const resolvedTable = super.resolveIdentifierStatement(table);
            if (resolvedTable.length > 0) {
                this.query.sql.push(...resolvedTable);
            }
        }
        if (on) {
            super.on();
            const resolvedOn = super.resolveStatement(on as QueryBuilder);
            if (resolvedOn.length > 0) {
                this.query.sql.push(...resolvedOn);
            }
        }
        return this;
    }

    innerJoinLateral(table?: Statement, on?: Statement) {
        super.inner();
        super.join();
        super.lateral();
        if (table !== undefined && table !== null) {
            const resolvedTable = super.resolveIdentifierStatement(table);
            if (resolvedTable.length > 0) {
                this.query.sql.push(...resolvedTable);
            }
        }
        if (on) {
            super.on();
            const resolvedOn = super.resolveStatement(on as QueryBuilder);
            if (resolvedOn.length > 0) {
                this.query.sql.push(...resolvedOn);
            }
        }
        return this;
    }

    fullJoin(table?: Statement, on?: Statement) {
        super.full();
        super.join();
        if (table !== undefined && table !== null) {
            const resolvedTable = super.resolveIdentifierStatement(table);
            if (resolvedTable.length > 0) {
                this.query.sql.push(...resolvedTable);
            }
        }
        if (on) {
            super.on();
            const resolvedOn = super.resolveStatement(on as QueryBuilder);
            if (resolvedOn.length > 0) {
                this.query.sql.push(...resolvedOn);
            }
        }
        return this;
    }

    rightJoinLateral(table?: Statement, on?: Statement) {
        super.right();
        super.join();
        super.lateral();
        if (table !== undefined && table !== null) {
            const resolvedTable = super.resolveIdentifierStatement(table);
            if (resolvedTable.length > 0) {
                this.query.sql.push(...resolvedTable);
            }
        }
        if (on) {
            super.on();
            const resolvedOn = super.resolveStatement(on as QueryBuilder);
            if (resolvedOn.length > 0) {
                this.query.sql.push(...resolvedOn);
            }
        }
        return this;
    }

    crossJoin(table?: Statement) {
        super.cross();
        super.join();
        if (table !== undefined && table !== null) {
            const resolvedTable = super.resolveIdentifierStatement(table);
            if (resolvedTable.length > 0) {
                this.query.sql.push(...resolvedTable);
            }
        }
        return this;
    }

    crossJoinLateral(table?: Statement) {
        super.cross();
        super.join();
        super.lateral();
        if (table !== undefined && table !== null) {
            const resolvedTable = super.resolveIdentifierStatement(table);
            if (resolvedTable.length > 0) {
                this.query.sql.push(...resolvedTable);
            }
        }
        return this;
    }

    groupBy(...cols: Statement[]) {
        super.group();
        super.by();
        if (cols.length === 0) {
            return this;
        }
        const resolvedColumns = cols.map((item) => super.resolveIdentifierStatement(item));
        super.pushSeparatedTokens(resolvedColumns, ",");
        return this;
    }

    override having(condition?: Statement) {
        super.having();
        if (condition === undefined || condition === null) {
            return this;
        }
        const resolvedCondition = super.resolveStatement(condition);
        if (resolvedCondition.length === 0) {
            return this;
        }
        this.query.sql.push(...resolvedCondition);
        return this;
    }

    override union(...queries: Statement[]) {
        if (queries.length === 0) {
            super.union();
            return this;
        }
        const resolvedQueries = super.resolveStatements(queries).filter((tokens) => tokens.length > 0);
        if (resolvedQueries.length === 0) {
            return this;
        }
        if (this.query.sql.length === 0) {
            const baseQuery = resolvedQueries[0];
            if (baseQuery) {
                this.query.sql.push(...baseQuery);
            }
            resolvedQueries.slice(1).forEach((tokens) => {
                super.union();
                this.query.sql.push(...tokens);
            });
            return this;
        }
        resolvedQueries.forEach((tokens) => {
            super.union();
            this.query.sql.push(...tokens);
        });
        return this;
    }

    unionAll(...queries: Statement[]) {
        if (queries.length === 0) {
            super.union();
            super.all();
            return this;
        }
        const resolvedQueries = super.resolveStatements(queries).filter((tokens) => tokens.length > 0);
        if (resolvedQueries.length === 0) {
            return this;
        }
        if (this.query.sql.length === 0) {
            const baseQuery = resolvedQueries[0];
            if (baseQuery) {
                this.query.sql.push(...baseQuery);
            }
            resolvedQueries.slice(1).forEach((tokens) => {
                super.union();
                super.all();
                this.query.sql.push(...tokens);
            });
            return this;
        }
        resolvedQueries.forEach((tokens) => {
            super.union();
            super.all();
            this.query.sql.push(...tokens);
        });
        return this;
    }

    override intersect(...queries: Statement[]) {
        if (queries.length === 0) {
            super.intersect();
            return this;
        }
        const resolvedQueries = super.resolveStatements(queries).filter((tokens) => tokens.length > 0);
        if (resolvedQueries.length === 0) {
            return this;
        }
        if (this.query.sql.length === 0) {
            const baseQuery = resolvedQueries[0];
            if (baseQuery) {
                this.query.sql.push(...baseQuery);
            }
            resolvedQueries.slice(1).forEach((tokens) => {
                super.intersect();
                this.query.sql.push(...tokens);
            });
            return this;
        }
        resolvedQueries.forEach((tokens) => {
            super.intersect();
            this.query.sql.push(...tokens);
        });
        return this;
    }

    intersectAll(...queries: Statement[]) {
        if (queries.length === 0) {
            super.intersect();
            super.all();
            return this;
        }
        const resolvedQueries = super.resolveStatements(queries).filter((tokens) => tokens.length > 0);
        if (resolvedQueries.length === 0) {
            return this;
        }
        if (this.query.sql.length === 0) {
            const baseQuery = resolvedQueries[0];
            if (baseQuery) {
                this.query.sql.push(...baseQuery);
            }
            resolvedQueries.slice(1).forEach((tokens) => {
                super.intersect();
                super.all();
                this.query.sql.push(...tokens);
            });
            return this;
        }
        resolvedQueries.forEach((tokens) => {
            super.intersect();
            super.all();
            this.query.sql.push(...tokens);
        });
        return this;
    }

    override except(...queries: Statement[]) {
        if (queries.length === 0) {
            super.except();
            return this;
        }
        const resolvedQueries = super.resolveStatements(queries).filter((tokens) => tokens.length > 0);
        if (resolvedQueries.length === 0) {
            return this;
        }
        if (this.query.sql.length === 0) {
            const baseQuery = resolvedQueries[0];
            if (baseQuery) {
                this.query.sql.push(...baseQuery);
            }
            resolvedQueries.slice(1).forEach((tokens) => {
                super.except();
                this.query.sql.push(...tokens);
            });
            return this;
        }
        resolvedQueries.forEach((tokens) => {
            super.except();
            this.query.sql.push(...tokens);
        });
        return this;
    }

    exceptAll(...queries: Statement[]) {
        if (queries.length === 0) {
            super.except();
            super.all();
            return this;
        }
        const resolvedQueries = super.resolveStatements(queries).filter((tokens) => tokens.length > 0);
        if (resolvedQueries.length === 0) {
            return this;
        }
        if (this.query.sql.length === 0) {
            const baseQuery = resolvedQueries[0];
            if (baseQuery) {
                this.query.sql.push(...baseQuery);
            }
            resolvedQueries.slice(1).forEach((tokens) => {
                super.except();
                super.all();
                this.query.sql.push(...tokens);
            });
            return this;
        }
        resolvedQueries.forEach((tokens) => {
            super.except();
            super.all();
            this.query.sql.push(...tokens);
        });
        return this;
    }

    override with(cteName?: Statement, subQuery?: Statement) {
        super.with();
        if (cteName !== undefined && cteName !== null) {
            const resolvedCteName = typeof cteName === "string"
                ? super.resolveIdentifierStatement(cteName)
                : super.resolveStatement(cteName as QueryBuilder);
            if (resolvedCteName.length > 0) {
                this.query.sql.push(...resolvedCteName);
            }
        }
        if (subQuery) {
            const resolvedSubQuery = super.resolveStatement(subQuery as QueryBuilder);
            if (resolvedSubQuery.length > 0) {
                this.query.sql.push("AS", "(", ...resolvedSubQuery, ")");
            }
        }
        return this;
    }

    override where(condition?: Statement) {
        super.where();
        if (condition === undefined || condition === null) {
            return this;
        }
        const resolvedCondition = super.resolveStatement(condition);
        if (resolvedCondition.length === 0) {
            return this;
        }
        this.query.sql.push(...resolvedCondition);
        return this;
    }

    override and(...values: Statement[]) {
        if (values.length === 0) {
            super.and();
            return this;
        }
        const resolvedValues = super.resolveStatements(values).filter((tokens) => tokens.length > 0);
        if (resolvedValues.length === 0) {
            return this;
        }
        if (this.query.sql.length > 0) {
            this.query.sql.push("AND");
        }
        resolvedValues.forEach((tokens, index) => {
            if (index > 0) {
                this.query.sql.push("AND");
            }
            this.query.sql.push(...tokens);
        });
        return this;
    }

    override or(...values: Statement[]) {
        if (values.length === 0) {
            super.or();
            return this;
        }
        const resolvedValues = super.resolveStatements(values).filter((tokens) => tokens.length > 0);
        if (resolvedValues.length === 0) {
            return this;
        }
        if (this.query.sql.length > 0) {
            this.query.sql.push("OR");
        }
        resolvedValues.forEach((tokens, index) => {
            if (index > 0) {
                this.query.sql.push("OR");
            }
            this.query.sql.push(...tokens);
        });
        return this;
    }

    comma(...queries: Statement[]) {
        const resolvedQueries = super.resolveStatements(queries).filter((tokens) => tokens.length > 0);
        if (resolvedQueries.length === 0) {
            return this;
        }
        super.pushSeparatedTokens(resolvedQueries, ",");
        return this;
    }

    orderBy(...cols: Statement[]) {
        super.order();
        super.by();
        if (cols.length === 0) {
            return this;
        }
        const resolvedColumns = cols.map((item) => super.resolveIdentifierStatement(item));
        super.pushSeparatedTokens(resolvedColumns, ",");
        return this;
    }

    override returning(col?: Statement) {
        super.returning();
        if (col === undefined || col === null) {
            return this;
        }
        const resolvedColumn = typeof col === "string"
            ? super.resolveIdentifierStatement(col)
            : super.resolveStatement(col as QueryBuilder);
        if (resolvedColumn.length > 0) {
            this.query.sql.push(...resolvedColumn);
        }
        return this;
    }

    override limit(value?: Statement) {
        super.limit();
        if (value === undefined || value === null) {
            return this;
        }
        const resolvedLimit = super.resolveStatement(value);
        if (resolvedLimit.length === 0) {
            return this;
        }
        this.query.sql.push(...resolvedLimit);
        return this;
    }

    override offset(value?: Statement) {
        super.offset();
        if (value === undefined || value === null) {
            return this;
        }
        const resolvedOffset = super.resolveStatement(value);
        if (resolvedOffset.length === 0) {
            return this;
        }
        this.query.sql.push(...resolvedOffset);
        return this;
    }

    override fetch(
        count?: Statement,
        mode: "first" | "next" = "first",
        withTies: boolean = false,
    ) {
        super.fetch();
        if (count !== undefined && count !== null) {
            this.query.sql.push(mode.toUpperCase());
            const resolvedCount = super.resolveStatement(count);
            if (resolvedCount.length > 0) {
                this.query.sql.push(...resolvedCount);
            }
            const rowKeyword = typeof count === "number" && count === 1 ? "ROW" : "ROWS";
            this.query.sql.push(rowKeyword, withTies ? "WITH" : "ONLY");
            if (withTies) {
                this.query.sql.push("TIES");
            }
        }
        return this;
    }

    override t(table?: Statement) {
        if (!table) {
            super.t();
            return this;
        }
        if (typeof table === "string") {
            return this.i(table);
        }
        const resolved = super.resolveIdentifierStatement(table);
        if (resolved.length > 0) {
            this.query.sql.push(...resolved);
        }
        return this;
    }
    override column(column?: Statement) {
        if (!column) {
            super.column();
            return this;
        }
        if (typeof column === "string") {
            return this.i(column);
        }
        const resolved = super.resolveIdentifierStatement(column);
        if (resolved.length > 0) {
            this.query.sql.push(...resolved);
        }
        return this;
    }
    override c(column?: Statement) {
        if (!column) {
            super.c();
            return this;
        } else {
            this.column(column);
            return this;
        }
    }

    override into(tableName?: Statement, columns?: Statement[]) {
        this.query.sql.push("INTO");
        if (tableName !== undefined && tableName !== null) {
            const resolvedTable = typeof tableName === "string"
                ? super.resolveIdentifierStatement(tableName)
                : super.resolveStatement(tableName);
            if (resolvedTable.length > 0) {
                this.query.sql.push(...resolvedTable);
            }
        }
        if (columns && columns.length > 0) {
            const resolvedColumns = columns.map((item) => super.resolveIdentifierStatement(item));
            this.query.sql.push("(");
            super.pushSeparatedTokens(resolvedColumns, ",");
            this.query.sql.push(")");
        }
        return this;
    }

    groupByDistinct(...cols: Statement[]) {
        super.group();
        super.by();
        this.query.sql.push("DISTINCT");
        if (cols.length === 0) {
            return this;
        }
        const resolvedColumns = cols.map((item) => super.resolveIdentifierStatement(item));
        super.pushSeparatedTokens(resolvedColumns, ",");
        return this;
    }

    windowClause(name: string, definition?: { partitionBy?: Statement[]; orderBy?: Statement[]; frame?: string }) {
        this.query.sql.push("WINDOW", name);
        if (definition) {
            this.query.sql.push("AS");
            this.query.sql.push("(");
            if (definition.partitionBy && definition.partitionBy.length > 0) {
                this.query.sql.push("PARTITION", "BY");
                const resolvedColumns = definition.partitionBy.map((item) => super.resolveIdentifierStatement(item));
                super.pushSeparatedTokens(resolvedColumns, ",");
            }
            if (definition.orderBy && definition.orderBy.length > 0) {
                if (definition.partitionBy && definition.partitionBy.length > 0) {
                    this.query.sql.push(" ");
                }
                this.query.sql.push("ORDER", "BY");
                const resolvedColumns = definition.orderBy.map((item) => super.resolveIdentifierStatement(item));
                super.pushSeparatedTokens(resolvedColumns, ",");
            }
            if (definition.frame) {
                this.query.sql.push(definition.frame);
            }
            this.query.sql.push(")");
        }
        return this;
    }

    forUpdate(options?: { of?: Statement[]; nowait?: boolean; skipLocked?: boolean }) {
        this.query.sql.push("FOR", "UPDATE");
        if (options?.of && options.of.length > 0) {
            this.query.sql.push("OF");
            const resolvedTables = options.of.map((item) => super.resolveIdentifierStatement(item));
            super.pushSeparatedTokens(resolvedTables, ",");
        }
        if (options?.nowait) {
            this.query.sql.push("NOWAIT");
        } else if (options?.skipLocked) {
            this.query.sql.push("SKIP", "LOCKED");
        }
        return this;
    }

    forShare(options?: { of?: Statement[]; nowait?: boolean; skipLocked?: boolean }) {
        this.query.sql.push("FOR", "SHARE");
        if (options?.of && options.of.length > 0) {
            this.query.sql.push("OF");
            const resolvedTables = options.of.map((item) => super.resolveIdentifierStatement(item));
            super.pushSeparatedTokens(resolvedTables, ",");
        }
        if (options?.nowait) {
            this.query.sql.push("NOWAIT");
        } else if (options?.skipLocked) {
            this.query.sql.push("SKIP", "LOCKED");
        }
        return this;
    }

    forKeyShare(options?: { of?: Statement[]; nowait?: boolean; skipLocked?: boolean }) {
        this.query.sql.push("FOR", "KEY", "SHARE");
        if (options?.of && options.of.length > 0) {
            this.query.sql.push("OF");
            const resolvedTables = options.of.map((item) => super.resolveIdentifierStatement(item));
            super.pushSeparatedTokens(resolvedTables, ",");
        }
        if (options?.nowait) {
            this.query.sql.push("NOWAIT");
        } else if (options?.skipLocked) {
            this.query.sql.push("SKIP", "LOCKED");
        }
        return this;
    }

    forNoKeyUpdate(options?: { of?: Statement[]; nowait?: boolean; skipLocked?: boolean }) {
        this.query.sql.push("FOR", "NO", "KEY", "UPDATE");
        if (options?.of && options.of.length > 0) {
            this.query.sql.push("OF");
            const resolvedTables = options.of.map((item) => super.resolveIdentifierStatement(item));
            super.pushSeparatedTokens(resolvedTables, ",");
        }
        if (options?.nowait) {
            this.query.sql.push("NOWAIT");
        } else if (options?.skipLocked) {
            this.query.sql.push("SKIP", "LOCKED");
        }
        return this;
    }
}
