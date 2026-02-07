import { StatisticsFunctionBuilder } from "./override-statistics-functions";
import type { QueryBuilder } from "./query-builder";
import type { Statement } from "./types";

export class OverrideQueryBuilder extends StatisticsFunctionBuilder {
    override escape(value?: Statement) {
        if (value === undefined) {
            return super.escape();
        }
        this.query.sql.push("ESCAPE");
        const resolvedEscape = super.resolveStatement(value, 0);
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

    savepointTransaction(name?: string | QueryBuilder) {
        super.savepoint();
        if (name !== undefined && name !== null) {
            const resolvedName = typeof name === "string"
                ? super.resolveIdentifierStatement(name, 0)
                : super.resolveStatement(name, 0);
            if (resolvedName.length > 0) {
                this.query.sql.push(...resolvedName);
            }
        }
        return this.semicolon();
    }

    override transaction(...transaction: QueryBuilder[]) {
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
    override select(...cols: (QueryBuilder | string | {
        [alias: string]: QueryBuilder | string;
    })[]) {
        super.select();
        if (cols.length === 0) {
            return this;
        }
        const resolvedColumns = super.resolveIdentifierStatementArray(cols);
        super.pushSeparatedTokens(resolvedColumns, ",");
        return this;
    }

    selectDistinct(...cols: (QueryBuilder | string | {
        [alias: string]: QueryBuilder | string;
    })[]) {
        super.select();
        super.distinct();
        if (cols.length === 0) {
            return this;
        }
        const resolvedColumns = super.resolveIdentifierStatementArray(cols);
        super.pushSeparatedTokens(resolvedColumns, ",");
        return this;
    }

    selectDistinctOn(
        on?: (QueryBuilder | string)[],
        cols: (QueryBuilder | string | { [alias: string]: QueryBuilder | string })[] = []
    ) {
        super.select();
        super.distinct();
        if (!on) {
            return this;
        }
        super.on();
        this.query.sql.push("(");
        const resolvedOn = super.resolveIdentifierStatementArray(on);
        super.pushSeparatedTokens(resolvedOn, ",");
        this.query.sql.push(")");
        if (cols.length === 0) {
            return this;
        }
        const resolvedColumns = super.resolveIdentifierStatementArray(cols);
        super.pushSeparatedTokens(resolvedColumns, ",");
        return this;
    }

    insertInto(table?: string | QueryBuilder, cols: (QueryBuilder | string)[] = []) {
        super.insert();
        super.into();
        if (table !== undefined && table !== null) {
            const resolvedTable = super.resolveIdentifierStatement(table, 0);
            if (resolvedTable.length > 0) {
                this.query.sql.push(...resolvedTable);
            }
        }
        if (cols.length === 0) {
            return this;
        }
        const resolvedColumns = super.resolveIdentifierStatementArray(cols);
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
            const resolvedRow = super.resolveLiteralStatementArray(row);
            this.query.sql.push("(");
            super.pushSeparatedTokens(resolvedRow, ",");
            this.query.sql.push(")");
        });
        return this;
    }

    override insert<T extends Record<string, string | QueryBuilder>>(
        table?: string | QueryBuilder,
        values?: T | T[],
    ) {
        super.insert();
        if (table === undefined || table === null) {
            return this;
        }
        super.into();
        const resolvedTable = super.resolveIdentifierStatement(table, 0);
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
            const resolvedColumns = super.resolveIdentifierStatementArray(columnNames);
            this.query.sql.push("(");
            super.pushSeparatedTokens(resolvedColumns, ",");
            this.query.sql.push(")");
        }
        this.query.sql.push("VALUES");
        rows.forEach((row, rowIndex) => {
            if (rowIndex > 0) {
                this.query.sql.push(",");
            }
            const resolvedRow = super.resolveLiteralStatementArray(
                columnNames.map((column) => row[column] as string | QueryBuilder),
            );
            this.query.sql.push("(");
            super.pushSeparatedTokens(resolvedRow, ",");
            this.query.sql.push(")");
        });
        return this;
    }

    override update(table?: string | QueryBuilder) {
        super.update();
        if (table === undefined || table === null) {
            return this;
        }
        const resolvedTable = super.resolveIdentifierStatement(table, 0);
        if (resolvedTable.length > 0) {
            this.query.sql.push(...resolvedTable);
        }
        return this;
    }

    override delete(table?: string | QueryBuilder) {
        super.delete();
        if (table === undefined || table === null) {
            return this;
        }
        super.from();
        const resolvedTable = super.resolveIdentifierStatement(table, 0);
        if (resolvedTable.length > 0) {
            this.query.sql.push(...resolvedTable);
        }
        return this;
    }

    override set(set?: Record<string, string | QueryBuilder>) {
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
            const resolvedColumn = super.resolveIdentifierStatement(column, 0);
            const resolvedValue = super.resolveStatement(value, 0);
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
        target?: QueryBuilder | string | Array<QueryBuilder | string>;
        targetWhere?: QueryBuilder;
    }) {
        super.on();
        super.conflict();
        if (options?.target !== undefined && options?.target !== null) {
            if (Array.isArray(options.target)) {
                const resolvedTarget = super.resolveIdentifierStatementArray(options.target);
                if (resolvedTarget.length > 0) {
                    this.query.sql.push("(");
                    super.pushSeparatedTokens(resolvedTarget, ",");
                    this.query.sql.push(")");
                }
            } else {
                const resolvedTarget = typeof options.target === "string"
                    ? super.resolveIdentifierStatement(options.target, 0)
                    : super.resolveStatement(options.target, 0);
                if (resolvedTarget.length > 0) {
                    this.query.sql.push(...resolvedTarget);
                }
            }
        }
        if (options?.targetWhere) {
            super.where();
            const resolvedTargetWhere = super.resolveStatement(options.targetWhere, 0);
            if (resolvedTargetWhere.length > 0) {
                this.query.sql.push(...resolvedTargetWhere);
            }
        }
        super.do();
        super.nothing();
        return this;
    }

    onConflictDoUpdate(options?: {
        target?: QueryBuilder | string | Array<QueryBuilder | string>;
        targetWhere?: QueryBuilder;
        set?: Record<string, string | QueryBuilder> | Array<Record<string, string | QueryBuilder>>;
        setWhere?: QueryBuilder;
    }) {
        super.on();
        super.conflict();
        if (options?.target !== undefined && options?.target !== null) {
            if (Array.isArray(options.target)) {
                const resolvedTarget = super.resolveIdentifierStatementArray(options.target);
                if (resolvedTarget.length > 0) {
                    this.query.sql.push("(");
                    super.pushSeparatedTokens(resolvedTarget, ",");
                    this.query.sql.push(")");
                }
            } else {
                const resolvedTarget = typeof options.target === "string"
                    ? super.resolveIdentifierStatement(options.target, 0)
                    : super.resolveStatement(options.target, 0);
                if (resolvedTarget.length > 0) {
                    this.query.sql.push(...resolvedTarget);
                }
            }
        }
        if (options?.targetWhere) {
            super.where();
            const resolvedTargetWhere = super.resolveStatement(options.targetWhere, 0);
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
                const resolvedColumn = super.resolveIdentifierStatement(column, 0);
                const resolvedValue = super.resolveStatement(value, 0);
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
            const resolvedSetWhere = super.resolveStatement(options.setWhere, 0);
            if (resolvedSetWhere.length > 0) {
                this.query.sql.push(...resolvedSetWhere);
            }
        }
        return this;
    }

    override case(caseExpr?: QueryBuilder, asAlias?: string | QueryBuilder) {
        super.case();
        if (caseExpr) {
            const resolvedExpr = super.resolveStatement(caseExpr, 0);
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
                ? super.resolveIdentifierStatement(asAlias, 0)
                : super.resolveStatement(asAlias, 0);
            if (resolvedAlias.length > 0) {
                this.query.sql.push(...resolvedAlias);
            }
        }
        return this;
    }

    override when(condition?: QueryBuilder) {
        super.when();
        if (condition) {
            const resolvedCondition = super.resolveStatement(condition, 0);
            if (resolvedCondition.length > 0) {
                this.query.sql.push(...resolvedCondition);
            }
        }
        return this;
    }

    override then(value?: QueryBuilder) {
        super.then();
        if (value) {
            const resolvedValue = super.resolveStatement(value, 0);
            if (resolvedValue.length > 0) {
                this.query.sql.push(...resolvedValue);
            }
        }
        return this;
    }

    override else(value?: QueryBuilder) {
        super.else();
        if (value) {
            const resolvedValue = super.resolveStatement(value, 0);
            if (resolvedValue.length > 0) {
                this.query.sql.push(...resolvedValue);
            }
        }
        return this;
    }

    override asc(...cols: (QueryBuilder | string)[]) {
        if (cols.length === 0) {
            super.asc();
            return this;
        }
        const resolvedColumns = super.resolveIdentifierStatementArray(cols);
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

    override desc(...cols: (QueryBuilder | string)[]) {
        if (cols.length === 0) {
            super.desc();
            return this;
        }
        const resolvedColumns = super.resolveIdentifierStatementArray(cols);
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

    override as(alias?: string | QueryBuilder) {
        super.as();
        if (alias !== undefined && alias !== null) {
            const resolvedAlias = typeof alias === "string"
                ? super.resolveIdentifierStatement(alias, 0)
                : super.resolveStatement(alias, 0);
            if (resolvedAlias.length > 0) {
                this.query.sql.push(...resolvedAlias);
            }
        }
        return this;
    }

    sub(query?: QueryBuilder) {
        this.query.sql.push("(");
        if (query) {
            const resolvedQuery = super.resolveStatement(query, 0);
            if (resolvedQuery.length > 0) {
                this.query.sql.push(...resolvedQuery);
            }
        }
        this.query.sql.push(")");
        return this;
    }

    override from(...tables: (QueryBuilder | string)[]) {
        super.from();
        if (tables.length === 0) {
            return this;
        }
        const resolvedTables = super.resolveIdentifierStatementArray(tables);
        super.pushSeparatedTokens(resolvedTables, ",");
        return this;
    }

    leftJoin(table?: QueryBuilder | string, on?: QueryBuilder) {
        super.left();
        super.join();
        if (table !== undefined && table !== null) {
            const resolvedTable = super.resolveIdentifierStatement(table, 0);
            if (resolvedTable.length > 0) {
                this.query.sql.push(...resolvedTable);
            }
        }
        if (on) {
            super.on();
            const resolvedOn = super.resolveStatement(on, 0);
            if (resolvedOn.length > 0) {
                this.query.sql.push(...resolvedOn);
            }
        }
        return this;
    }

    leftJoinLateral(table?: QueryBuilder | string, on?: QueryBuilder) {
        super.left();
        super.join();
        super.lateral();
        if (table !== undefined && table !== null) {
            const resolvedTable = super.resolveIdentifierStatement(table, 0);
            if (resolvedTable.length > 0) {
                this.query.sql.push(...resolvedTable);
            }
        }
        if (on) {
            super.on();
            const resolvedOn = super.resolveStatement(on, 0);
            if (resolvedOn.length > 0) {
                this.query.sql.push(...resolvedOn);
            }
        }
        return this;
    }

    innerJoin(table?: QueryBuilder | string, on?: QueryBuilder) {
        super.inner();
        super.join();
        if (table !== undefined && table !== null) {
            const resolvedTable = super.resolveIdentifierStatement(table, 0);
            if (resolvedTable.length > 0) {
                this.query.sql.push(...resolvedTable);
            }
        }
        if (on) {
            super.on();
            const resolvedOn = super.resolveStatement(on, 0);
            if (resolvedOn.length > 0) {
                this.query.sql.push(...resolvedOn);
            }
        }
        return this;
    }

    rightJoin(table?: QueryBuilder | string, on?: QueryBuilder) {
        super.right();
        super.join();
        if (table !== undefined && table !== null) {
            const resolvedTable = super.resolveIdentifierStatement(table, 0);
            if (resolvedTable.length > 0) {
                this.query.sql.push(...resolvedTable);
            }
        }
        if (on) {
            super.on();
            const resolvedOn = super.resolveStatement(on, 0);
            if (resolvedOn.length > 0) {
                this.query.sql.push(...resolvedOn);
            }
        }
        return this;
    }

    innerJoinLateral(table?: QueryBuilder | string, on?: QueryBuilder) {
        super.inner();
        super.join();
        super.lateral();
        if (table !== undefined && table !== null) {
            const resolvedTable = super.resolveIdentifierStatement(table, 0);
            if (resolvedTable.length > 0) {
                this.query.sql.push(...resolvedTable);
            }
        }
        if (on) {
            super.on();
            const resolvedOn = super.resolveStatement(on, 0);
            if (resolvedOn.length > 0) {
                this.query.sql.push(...resolvedOn);
            }
        }
        return this;
    }

    fullJoin(table?: QueryBuilder | string, on?: QueryBuilder) {
        super.full();
        super.join();
        if (table !== undefined && table !== null) {
            const resolvedTable = super.resolveIdentifierStatement(table, 0);
            if (resolvedTable.length > 0) {
                this.query.sql.push(...resolvedTable);
            }
        }
        if (on) {
            super.on();
            const resolvedOn = super.resolveStatement(on, 0);
            if (resolvedOn.length > 0) {
                this.query.sql.push(...resolvedOn);
            }
        }
        return this;
    }

    rightJoinLateral(table?: QueryBuilder | string, on?: QueryBuilder) {
        super.right();
        super.join();
        super.lateral();
        if (table !== undefined && table !== null) {
            const resolvedTable = super.resolveIdentifierStatement(table, 0);
            if (resolvedTable.length > 0) {
                this.query.sql.push(...resolvedTable);
            }
        }
        if (on) {
            super.on();
            const resolvedOn = super.resolveStatement(on, 0);
            if (resolvedOn.length > 0) {
                this.query.sql.push(...resolvedOn);
            }
        }
        return this;
    }

    crossJoin(table?: QueryBuilder | string) {
        super.cross();
        super.join();
        if (table !== undefined && table !== null) {
            const resolvedTable = super.resolveIdentifierStatement(table, 0);
            if (resolvedTable.length > 0) {
                this.query.sql.push(...resolvedTable);
            }
        }
        return this;
    }

    crossJoinLateral(table?: QueryBuilder | string) {
        super.cross();
        super.join();
        super.lateral();
        if (table !== undefined && table !== null) {
            const resolvedTable = super.resolveIdentifierStatement(table, 0);
            if (resolvedTable.length > 0) {
                this.query.sql.push(...resolvedTable);
            }
        }
        return this;
    }

    groupBy(...cols: (QueryBuilder | string)[]) {
        super.group();
        super.by();
        if (cols.length === 0) {
            return this;
        }
        const resolvedColumns = super.resolveIdentifierStatementArray(cols);
        super.pushSeparatedTokens(resolvedColumns, ",");
        return this;
    }

    override having(condition?: QueryBuilder) {
        super.having();
        if (condition === undefined || condition === null) {
            return this;
        }
        const resolvedCondition = super.resolveStatement(condition, 0);
        if (resolvedCondition.length === 0) {
            return this;
        }
        this.query.sql.push(...resolvedCondition);
        return this;
    }

    override union(...queries: QueryBuilder[]) {
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

    unionAll(...queries: QueryBuilder[]) {
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

    override intersect(...queries: QueryBuilder[]) {
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

    intersectAll(...queries: QueryBuilder[]) {
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

    override except(...queries: QueryBuilder[]) {
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

    exceptAll(...queries: QueryBuilder[]) {
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

    override with(cteName?: string | QueryBuilder, subQuery?: QueryBuilder) {
        super.with();
        if (cteName !== undefined && cteName !== null) {
            const resolvedCteName = typeof cteName === "string"
                ? super.resolveIdentifierStatement(cteName, 0)
                : super.resolveStatement(cteName, 0);
            if (resolvedCteName.length > 0) {
                this.query.sql.push(...resolvedCteName);
            }
        }
        if (subQuery) {
            const resolvedSubQuery = super.resolveStatement(subQuery, 0);
            if (resolvedSubQuery.length > 0) {
                this.query.sql.push("AS", "(", ...resolvedSubQuery, ")");
            }
        }
        return this;
    }

    override where(condition?: QueryBuilder) {
        super.where();
        if (condition === undefined || condition === null) {
            return this;
        }
        const resolvedCondition = super.resolveStatement(condition, 0);
        if (resolvedCondition.length === 0) {
            return this;
        }
        this.query.sql.push(...resolvedCondition);
        return this;
    }

    override and(...values: QueryBuilder[]) {
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

    override or(...values: QueryBuilder[]) {
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

    comma(...queries: QueryBuilder[]) {
        const resolvedQueries = super.resolveStatements(queries).filter((tokens) => tokens.length > 0);
        if (resolvedQueries.length === 0) {
            return this;
        }
        super.pushSeparatedTokens(resolvedQueries, ",");
        return this;
    }

    orderBy(...cols: (QueryBuilder | string)[]) {
        super.order();
        super.by();
        if (cols.length === 0) {
            return this;
        }
        const resolvedColumns = super.resolveIdentifierStatementArray(cols);
        super.pushSeparatedTokens(resolvedColumns, ",");
        return this;
    }

    override returning(col?: string | QueryBuilder) {
        super.returning();
        if (col === undefined || col === null) {
            return this;
        }
        const resolvedColumn = typeof col === "string"
            ? super.resolveIdentifierStatement(col, 0)
            : super.resolveStatement(col, 0);
        if (resolvedColumn.length > 0) {
            this.query.sql.push(...resolvedColumn);
        }
        return this;
    }

    override limit(value?: QueryBuilder | number) {
        super.limit();
        if (value === undefined || value === null) {
            return this;
        }
        const resolvedLimit = super.resolveStatement(value, 0);
        if (resolvedLimit.length === 0) {
            return this;
        }
        this.query.sql.push(...resolvedLimit);
        return this;
    }

    override offset(value?: QueryBuilder | number) {
        super.offset();
        if (value === undefined || value === null) {
            return this;
        }
        const resolvedOffset = super.resolveStatement(value, 0);
        if (resolvedOffset.length === 0) {
            return this;
        }
        this.query.sql.push(...resolvedOffset);
        return this;
    }

    override fetch(
        count?: number | QueryBuilder,
        mode: "first" | "next" = "first",
        withTies: boolean = false,
    ) {
        super.fetch();
        if (count !== undefined && count !== null) {
            this.query.sql.push(mode.toUpperCase());
            const resolvedCount = super.resolveStatement(count, 0);
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

    override t(table?: string | QueryBuilder) {
        if (!table) {
            super.t();
            return this;
        }
        if (typeof table === "string") {
            return this.i(table);
        }
        const resolved = super.resolveIdentifierStatement(table, 0);
        if (resolved.length > 0) {
            this.query.sql.push(...resolved);
        }
        return this;
    }
    override column(column?: string | QueryBuilder) {
        if (!column) {
            super.column();
            return this;
        }
        if (typeof column === "string") {
            return this.i(column);
        }
        const resolved = super.resolveIdentifierStatement(column, 0);
        if (resolved.length > 0) {
            this.query.sql.push(...resolved);
        }
        return this;
    }
    override c(column?: string | QueryBuilder) {
        if (!column) {
            super.c();
            return this;
        } else {
            this.column(column);
            return this;
        }
    }
}
