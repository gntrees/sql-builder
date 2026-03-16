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
        return this.endClass();
    }

    semicolon() {
        this.query.sql.push(";");
        return this.endClass();
    }

    sc() {
        this.semicolon();
        return this.endClass();
    }

    beginTransaction() {
        this.begin().semicolon();
        return this.endClass();
    }

    commitTransaction() {
        this.commit().semicolon();
        return this.endClass();
    }

    rollbackTransaction() {
        this.rollback().semicolon();
        return this.endClass();
    }

    savepointTransaction(name?: Statement) {
        super.savepoint();
        const resolvedName = super.resolveStatement(name);
        if (resolvedName.length > 0) {
            this.query.sql.push(...resolvedName);
        }
        this.semicolon();
        return this.endClass();
    }

    startTransaction() {
        this.start().semicolon();
        return this.endClass();
    }

    prepareTransaction(name?: Statement) {
        super.prepare();
        super.transaction();
        if (name !== undefined) {
            const resolvedName = super.resolveStatement(name);
            if (resolvedName.length > 0) {
                this.query.sql.push(...resolvedName);
            }
        }
        this.semicolon();
        return this.endClass();
    }

    commitPreparedTransaction(name?: Statement) {
        super.commit();
        super.prepared();
        if (name !== undefined) {
            const resolvedName = super.resolveStatement(name);
            if (resolvedName.length > 0) {
                this.query.sql.push(...resolvedName);
            }
        }
        this.semicolon();
        return this.endClass();
    }

    rollbackPreparedTransaction(name?: Statement) {
        super.rollback();
        super.prepared();
        if (name !== undefined) {
            const resolvedName = super.resolveStatement(name);
            if (resolvedName.length > 0) {
                this.query.sql.push(...resolvedName);
            }
        }
        this.semicolon();
        return this.endClass();
    }

    rollbackToSavepointTransaction(name?: Statement) {
        super.rollback();
        super.to();
        super.savepoint();
        if (name !== undefined) {
            const resolvedName = super.resolveStatement(name);
            if (resolvedName.length > 0) {
                this.query.sql.push(...resolvedName);
            }
        }
        this.semicolon();
        return this.endClass();
    }

    releaseTransaction(name?: Statement) {
        super.release();
        super.savepoint();
        if (name !== undefined) {
            const resolvedName = super.resolveStatement(name);
            if (resolvedName.length > 0) {
                this.query.sql.push(...resolvedName);
            }
        }
        this.semicolon();
        return this.endClass();
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
        this.commitTransaction();
        return this.endClass();
    }
    // Queries
    override select(...cols: (Statement | {
        [key: string]: Statement;
    })[]) {
        super.select();
        if (cols.length === 0) {
            return this.endClass();
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
        return this.endClass();
    }

    selectDistinct(...cols: (Statement | {
        [key: string]: Statement;
    })[]) {
        super.select();
        super.distinct();
        if (cols.length === 0) {
            return this.endClass();
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
        return this.endClass();
    }

    selectDistinctOn(
        on?: Statement[],
        cols?: (Statement | Record<string, Statement>)[]
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
            return this.endClass();
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
        return this.endClass();
    }

    insertInto(table?: Statement, cols?: Statement[]) {
        super.insert();
        super.into();
        if (table !== undefined) {
            const resolvedTable = super.resolveStatement(table);
            if (resolvedTable.length > 0) {
                this.query.sql.push(...resolvedTable);
            }
        }
        if (!cols || cols.length === 0) {
            return this.endClass();
        }
        const resolvedColumns = super.resolveStatements(cols);
        if (resolvedColumns.length > 0) {
            this.query.sql.push("(");
            super.pushSeparatedTokens(resolvedColumns, ",");
            this.query.sql.push(")");
        }
        return this.endClass();
    }

    override values(...values: Array<Statement | Array<Statement>>) {
        if (values.length === 0) {
            super.values();
            return this.endClass();
        }
        this.query.sql.push("VALUES");
        let haveDeepArray = values.some((item) => Array.isArray(item));
        const resolveArrayValue = (item: Statement | Array<Statement>): void => {
            if (Array.isArray(item)) {
                const resolvedItems = item.map((subItem) => super.resolveStatement(subItem));
                this.query.sql.push("(");
                super.pushSeparatedTokens(resolvedItems, ",");
                this.query.sql.push(")");
            } else {
                const resolved = super.resolveStatement(item);
                this.query.sql.push(...resolved);
            }
        };
        if (!haveDeepArray) this.query.sql.push("(");
        values.forEach((item, i) => {
            resolveArrayValue(item)
            if (i < values.length - 1) {
                this.query.sql.push(",");
            }
        })
        if (!haveDeepArray) this.query.sql.push(")");
        // values.forEach((item) => {
        //     if (Array.isArray(item) && item.length === 0) {
        //     }
        // });
        // const multiRows = Array.isArray(values[0]);
        // const valueRows = multiRows
        //     ? (values as Array<Array<string | QueryBuilder>>)
        //     : [values as Array<string | QueryBuilder>];
        // valueRows.forEach((row, rowIndex) => {
        //     if (rowIndex > 0) {
        //         this.query.sql.push(",");
        //     }
        //     const resolvedRow = row.map((item) => {
        //         super.resolveStatement(item)
        //     });
        //     // this.query.sql.push("(");
        //     super.pushSeparatedTokens(resolvedRow, ",");
        //     // this.query.sql.push(")");
        // });
        return this.endClass();
    }

    override insert<T extends Record<string, Statement>>(
        table?: Statement,
        values?: T | T[],
    ) {
        super.insert();
        if (table === undefined || table === null) {
            return this.endClass();
        }
        super.into();
        const resolvedTable = super.resolveStatement(table);
        if (resolvedTable.length > 0) {
            this.query.sql.push(...resolvedTable);
        }
        const rows = values === undefined ? [] : (Array.isArray(values) ? values : [values]);
        if (rows.length === 0) {
            return this.endClass();
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
        return this.endClass();
    }

    override update(table?: Statement) {
        super.update();
        if (table === undefined || table === null) {
            return this.endClass();
        }
        const resolvedTable = super.resolveStatement(table);
        if (resolvedTable.length > 0) {
            this.query.sql.push(...resolvedTable);
        }
        return this.endClass();
    }

    override delete(table?: Statement) {
        super.delete();
        if (table === undefined || table === null) {
            return this.endClass();
        }
        super.from();
        const resolvedTable = super.resolveStatement(table);
        if (resolvedTable.length > 0) {
            this.query.sql.push(...resolvedTable);
        }
        return this.endClass();
    }

    override set(...set: (Record<string, Statement> | Statement)[]) {
        super.set();
        if (set === undefined || set.length === 0) {
            return this.endClass();
        }
        let hasAssignments = false;
        set.forEach((item) => {
            if (item !== null && typeof item === "object" && !(item instanceof QueryBuilder)) {
                const entries = Object.entries(item);
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
            } else {
                const resolvedSet = super.resolveStatement(item);
                if (resolvedSet.length > 0) {
                    if (hasAssignments) {
                        this.query.sql.push(",");
                    }
                    this.query.sql.push(...resolvedSet);
                    hasAssignments = true;
                }
            }
        });
        return this.endClass();
    }

    onConflict(target?: Statement | Statement[], where?: Statement) {
        super.on();
        super.conflict();
        if (target !== undefined && target !== null) {
            if (Array.isArray(target)) {
                const resolvedTarget = target.map((item) => super.resolveStatement(item));
                if (resolvedTarget.length > 0) {
                    this.query.sql.push("(");
                    super.pushSeparatedTokens(resolvedTarget, ",");
                    this.query.sql.push(")");
                }
            } else {
                const resolvedTarget = super.resolveStatement(target as QueryBuilder);
                if (resolvedTarget.length > 0) {
                    this.query.sql.push("(");
                    this.query.sql.push(...resolvedTarget);
                    this.query.sql.push(")");
                }
            }
        }
        if (where) {
            super.where();
            const resolvedWhere = super.resolveStatement(where);
            if (resolvedWhere.length > 0) {
                this.query.sql.push(...resolvedWhere);
            }
        }
        return this.endClass();
    }

    onConstraint(constraintName?: Statement) {
        super.on();
        super.constraint();
        if (constraintName !== undefined && constraintName !== null) {
            const resolvedConstraint = super.resolveStatement(constraintName);
            if (resolvedConstraint.length > 0) {
                this.query.sql.push(...resolvedConstraint);
            }
        }
        return this.endClass();
    }

    override on(...param: Statement[]) {
        super.on();
        if (param.length === 0) {
            return this.endClass();
        }
        const resolved = super.resolveStatements(param).filter((tokens) => tokens.length > 0);
        if (resolved.length === 0) {
            return this.endClass();
        }
        resolved.forEach((tokens) => {
            this.query.sql.push(...tokens);
        });
        return this.endClass();
    }

    doUpdate(set?: Record<string, Statement> | Record<string, Statement>[], where?: Statement) {
        super.do();
        super.update();
        if (set !== undefined) {
            super.set();
            const setEntries = Array.isArray(set) ? set : [set];
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
        }
        if (where) {
            super.where();
            const resolvedWhere = super.resolveStatement(where);
            if (resolvedWhere.length > 0) {
                this.query.sql.push(...resolvedWhere);
            }
        }
        return this.endClass();
    }

    doNothing() {
        super.do();
        super.nothing();
        return this.endClass();
    }

    onConflictDoNothing(options?: {
        target?: Statement | Statement[];
        targetWhere?: Statement;
    }) {
        super.on();
        super.conflict();
        if (options?.target !== undefined && options?.target !== null) {
            if (Array.isArray(options.target)) {
                const resolvedTarget = options.target.map((item) => super.resolveStatement(item));
                if (resolvedTarget.length > 0) {
                    this.query.sql.push("(");
                    super.pushSeparatedTokens(resolvedTarget, ",");
                    this.query.sql.push(")");
                }
            } else {
                const resolvedTarget = super.resolveStatement(options.target as QueryBuilder);
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
        return this.endClass();
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
                const resolvedTarget = options.target.map((item) => super.resolveStatement(item));
                if (resolvedTarget.length > 0) {
                    this.query.sql.push("(");
                    super.pushSeparatedTokens(resolvedTarget, ",");
                    this.query.sql.push(")");
                }
            } else {
                const resolvedTarget = super.resolveStatement(options.target as QueryBuilder);
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
        return this.endClass();
    }

    override case(caseExpr?: Statement) {
        super.case();
        if (caseExpr) {
            const resolvedExpr = super.resolveStatement(caseExpr);
            if (resolvedExpr.length > 0) {
                this.query.sql.push(...resolvedExpr);
            }
        }
        return this.endClass();
    }

    override when(condition?: Statement) {
        super.when();
        if (condition) {
            const resolvedCondition = super.resolveStatement(condition);
            if (resolvedCondition.length > 0) {
                this.query.sql.push(...resolvedCondition);
            }
        }
        return this.endClass();
    }

    override then(value?: Statement) {
        super.then();
        if (value) {
            const resolvedValue = super.resolveStatement(value);
            if (resolvedValue.length > 0) {
                this.query.sql.push(...resolvedValue);
            }
        }
        return this.endClass();
    }

    override else(value?: Statement) {
        super.else();
        if (value) {
            const resolvedValue = super.resolveStatement(value);
            if (resolvedValue.length > 0) {
                this.query.sql.push(...resolvedValue);
            }
        }
        return this.endClass();
    }

    override asc(...cols: Statement[]) {
        if (cols.length === 0) {
            super.asc();
            return this.endClass();
        }
        const resolvedColumns = cols.map((item) => super.resolveStatement(item));
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
        return this.endClass();
    }

    override desc(...cols: Statement[]) {
        if (cols.length === 0) {
            super.desc();
            return this.endClass();
        }
        const resolvedColumns = cols.map((item) => super.resolveStatement(item));
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
        return this.endClass();
    }

    nullsFirst() {
        this.query.sql.push("NULLS", "FIRST");
        return this.endClass();
    }

    nullsLast() {
        this.query.sql.push("NULLS", "LAST");
        return this.endClass();
    }

    override as(alias?: Statement) {
        super.as();
        if (alias !== undefined && alias !== null) {
            const resolvedAlias = super.resolveIdentifierStatement(alias);
            if (resolvedAlias.length > 0) {
                this.query.sql.push(...resolvedAlias);
            }
        }
        return this.endClass();
    }

    sub(...query: Statement[]) {
        this.query.sql.push("(");
        if (query.length > 0) {
            const resolved = super.resolveStatements(query)
            if (resolved.length > 0) {
                super.pushSeparatedTokens(resolved, ",");
            }
        }
        this.query.sql.push(")");
        return this.endClass();
    }

    override from(...tables: Statement[]) {
        super.from();
        if (tables.length === 0) {
            return this.endClass();
        }
        const resolvedTables = tables.map((item) => super.resolveStatement(item));
        super.pushSeparatedTokens(resolvedTables, ",");
        return this.endClass();
    }

    leftJoin(table?: Statement, on?: Statement) {
        super.left();
        super.join();
        if (table !== undefined) {
            const resolvedTable = super.resolveStatement(table);
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
        return this.endClass();
    }

    leftJoinLateral(table?: Statement, on?: Statement) {
        super.left();
        super.join();
        super.lateral();
        if (table !== undefined) {
            const resolvedTable = super.resolveStatement(table);
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
        return this.endClass();
    }

    innerJoin(table?: Statement, on?: Statement) {
        super.inner();
        super.join();
        if (table !== undefined) {
            const resolvedTable = super.resolveStatement(table);
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
        return this.endClass();
    }

    rightJoin(table?: Statement, on?: Statement) {
        super.right();
        super.join();
        if (table !== undefined) {
            const resolvedTable = super.resolveStatement(table);
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
        return this.endClass();
    }

    innerJoinLateral(table?: Statement, on?: Statement) {
        super.inner();
        super.join();
        super.lateral();
        if (table !== undefined) {
            const resolvedTable = super.resolveStatement(table);
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
        return this.endClass();
    }

    fullJoin(table?: Statement, on?: Statement) {
        super.full();
        super.join();
        if (table !== undefined) {
            const resolvedTable = super.resolveStatement(table);
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
        return this.endClass();
    }

    rightJoinLateral(table?: Statement, on?: Statement) {
        super.right();
        super.join();
        super.lateral();
        if (table !== undefined) {
            const resolvedTable = super.resolveStatement(table);
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
        return this.endClass();
    }

    crossJoin(table?: Statement) {
        super.cross();
        super.join();
        if (table !== undefined) {
            const resolvedTable = super.resolveStatement(table);
            if (resolvedTable.length > 0) {
                this.query.sql.push(...resolvedTable);
            }
        }
        return this.endClass();
    }

    crossJoinLateral(table?: Statement) {
        super.cross();
        super.join();
        super.lateral();
        if (table !== undefined) {
            const resolvedTable = super.resolveStatement(table);
            if (resolvedTable.length > 0) {
                this.query.sql.push(...resolvedTable);
            }
        }
        return this.endClass();
    }

    override join(table?: Statement, on?: Statement) {
        super.join();
        if (table !== undefined) {
            const resolvedTable = super.resolveStatement(table);
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
        return this.endClass();
    }

    naturalJoin(table?: Statement) {
        super.natural();
        super.join();
        if (table !== undefined) {
            const resolvedTable = super.resolveStatement(table);
            if (resolvedTable.length > 0) {
                this.query.sql.push(...resolvedTable);
            }
        }
        return this.endClass();
    }

    naturalLeftJoin(table?: Statement) {
        super.natural();
        super.left();
        super.join();
        if (table !== undefined) {
            const resolvedTable = super.resolveStatement(table);
            if (resolvedTable.length > 0) {
                this.query.sql.push(...resolvedTable);
            }
        }
        return this.endClass();
    }

    naturalRightJoin(table?: Statement) {
        super.natural();
        super.right();
        super.join();
        if (table !== undefined) {
            const resolvedTable = super.resolveStatement(table);
            if (resolvedTable.length > 0) {
                this.query.sql.push(...resolvedTable);
            }
        }
        return this.endClass();
    }

    naturalInnerJoin(table?: Statement) {
        super.natural();
        super.inner();
        super.join();
        if (table !== undefined) {
            const resolvedTable = super.resolveStatement(table);
            if (resolvedTable.length > 0) {
                this.query.sql.push(...resolvedTable);
            }
        }
        return this.endClass();
    }

    naturalFullJoin(table?: Statement) {
        super.natural();
        super.full();
        super.join();
        if (table !== undefined) {
            const resolvedTable = super.resolveStatement(table);
            if (resolvedTable.length > 0) {
                this.query.sql.push(...resolvedTable);
            }
        }
        return this.endClass();
    }

    naturalCrossJoin(table?: Statement) {
        super.natural();
        super.cross();
        super.join();
        if (table !== undefined) {
            const resolvedTable = super.resolveStatement(table);
            if (resolvedTable.length > 0) {
                this.query.sql.push(...resolvedTable);
            }
        }
        return this.endClass();
    }

    groupBy(...cols: Statement[]) {
        super.group();
        super.by();
        if (cols.length === 0) {
            return this.endClass();
        }
        const resolvedColumns = cols.map((item) => super.resolveStatement(item));
        super.pushSeparatedTokens(resolvedColumns, ",");
        return this.endClass();
    }

    override having(condition?: Statement) {
        super.having();
        if (condition === undefined || condition === null) {
            return this.endClass();
        }
        const resolvedCondition = super.resolveStatement(condition);
        if (resolvedCondition.length === 0) {
            return this.endClass();
        }
        this.query.sql.push(...resolvedCondition);
        return this.endClass();
    }

    override union(...queries: Statement[]) {
        if (queries.length === 0) {
            super.union();
            return this.endClass();
        }
        const resolvedQueries = super.resolveStatements(queries).filter((tokens) => tokens.length > 0);
        if (resolvedQueries.length === 0) {
            return this.endClass();
        }
        if (this.query.sql.length === 0) {
            const baseQuery = resolvedQueries[0];
            if (baseQuery) {
            this.query.sql.push("(", ...baseQuery, ")");
            }
            resolvedQueries.slice(1).forEach((tokens) => {
            super.union();
            if (tokens) {
                this.query.sql.push("(", ...tokens, ")");
            }
            });
            return this.endClass();
        }
        resolvedQueries.forEach((tokens) => {
            super.union();
            if (tokens) {
            this.query.sql.push("(", ...tokens, ")");
            }
        });
        return this.endClass();
    }

    unionAll(...queries: Statement[]) {
        if (queries.length === 0) {
            super.union();
            super.all();
            return this.endClass();
        }
        const resolvedQueries = super.resolveStatements(queries).filter((tokens) => tokens.length > 0);
        if (resolvedQueries.length === 0) {
            return this.endClass();
        }
        if (this.query.sql.length === 0) {
            const baseQuery = resolvedQueries[0];
            if (baseQuery) {
                this.query.sql.push("(", ...baseQuery, ")");
            }
            resolvedQueries.slice(1).forEach((tokens) => {
                super.union();
                super.all();
                this.query.sql.push("(", ...tokens, ")");
            });
            return this.endClass();
        }
        resolvedQueries.forEach((tokens) => {
            super.union();
            super.all();
            this.query.sql.push("(", ...tokens, ")");
        });
        return this.endClass();
    }

    override intersect(...queries: Statement[]) {
        if (queries.length === 0) {
            super.intersect();
            return this.endClass();
        }
        const resolvedQueries = super.resolveStatements(queries).filter((tokens) => tokens.length > 0);
        if (resolvedQueries.length === 0) {
            return this.endClass();
        }
        if (this.query.sql.length === 0) {
            const baseQuery = resolvedQueries[0];
            if (baseQuery) {
                this.query.sql.push("(", ...baseQuery, ")");
            }
            resolvedQueries.slice(1).forEach((tokens) => {
                super.intersect();
                this.query.sql.push("(", ...tokens, ")");
            });
            return this.endClass();
        }
        resolvedQueries.forEach((tokens) => {
            super.intersect();
            this.query.sql.push("(", ...tokens, ")");
        });
        return this.endClass();
    }

    intersectAll(...queries: Statement[]) {
        if (queries.length === 0) {
            super.intersect();
            super.all();
            return this.endClass();
        }
        const resolvedQueries = super.resolveStatements(queries).filter((tokens) => tokens.length > 0);
        if (resolvedQueries.length === 0) {
            return this.endClass();
        }
        if (this.query.sql.length === 0) {
            const baseQuery = resolvedQueries[0];
            if (baseQuery) {
                this.query.sql.push("(", ...baseQuery, ")");
            }
            resolvedQueries.slice(1).forEach((tokens) => {
                super.intersect();
                super.all();
                this.query.sql.push("(", ...tokens, ")");
            });
            return this.endClass();
        }
        resolvedQueries.forEach((tokens) => {
            super.intersect();
            super.all();
            this.query.sql.push("(", ...tokens, ")");
        });
        return this.endClass();
    }

    override except(...queries: Statement[]) {
        if (queries.length === 0) {
            super.except();
            return this.endClass();
        }
        const resolvedQueries = super.resolveStatements(queries).filter((tokens) => tokens.length > 0);
        if (resolvedQueries.length === 0) {
            return this.endClass();
        }
        if (this.query.sql.length === 0) {
            const baseQuery = resolvedQueries[0];
            if (baseQuery) {
                this.query.sql.push("(", ...baseQuery, ")");
            }
            resolvedQueries.slice(1).forEach((tokens) => {
                super.except();
                this.query.sql.push("(", ...tokens, ")");
            });
            return this.endClass();
        }
        resolvedQueries.forEach((tokens) => {
            super.except();
            this.query.sql.push("(", ...tokens, ")");
        });
        return this.endClass();
    }

    exceptAll(...queries: Statement[]) {
        if (queries.length === 0) {
            super.except();
            super.all();
            return this.endClass();
        }
        const resolvedQueries = super.resolveStatements(queries).filter((tokens) => tokens.length > 0);
        if (resolvedQueries.length === 0) {
            return this.endClass();
        }
        if (this.query.sql.length === 0) {
            const baseQuery = resolvedQueries[0];
            if (baseQuery) {
                this.query.sql.push("(", ...baseQuery, ")");
            }
            resolvedQueries.slice(1).forEach((tokens) => {
                super.except();
                super.all();
                this.query.sql.push("(", ...tokens, ")");
            });
            return this.endClass();
        }
        resolvedQueries.forEach((tokens) => {
            super.except();
            super.all();
            this.query.sql.push("(", ...tokens, ")");
        });
        return this.endClass();
    }

    override with(cteName?: Statement, subQuery?: Statement) {
        super.with();
        if (cteName !== undefined && cteName !== null) {
            const resolvedCteName = super.resolveStatement(cteName as QueryBuilder);
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
        return this.endClass();
    }

    override where(condition?: Statement) {
        super.where();
        if (condition === undefined || condition === null) {
            return this.endClass();
        }
        const resolvedCondition = super.resolveStatement(condition);
        if (resolvedCondition.length === 0) {
            return this.endClass();
        }
        this.query.sql.push(...resolvedCondition);
        return this.endClass();
    }

    override and(...values: Statement[]) {
        if (values.length === 0) {
            super.and();
            return this.endClass();
        }
        const resolvedValues = super.resolveStatements(values).filter((tokens) => tokens.length > 0);
        if (resolvedValues.length === 0) {
            return this.endClass();
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
        return this.endClass();
    }

    override or(...values: Statement[]) {
        if (values.length === 0) {
            super.or();
            return this.endClass();
        }
        const resolvedValues = super.resolveStatements(values).filter((tokens) => tokens.length > 0);
        if (resolvedValues.length === 0) {
            return this.endClass();
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
        return this.endClass();
    }

    override not(...values: Statement[]) {
        if (values.length === 0) {
            super.not();
            return this.endClass();
        }
        const resolvedValues = super.resolveStatements(values).filter((tokens) => tokens.length > 0);
        if (resolvedValues.length === 0) {
            return this.endClass();
        }
        this.query.sql.push("NOT");
        if (resolvedValues.length === 1 && resolvedValues[0]) {
            this.query.sql.push(...resolvedValues[0]);
        } else {
            this.query.sql.push("(");
            resolvedValues.forEach((tokens, index) => {
                if (index > 0) {
                    this.query.sql.push(",");
                }
                this.query.sql.push(...tokens);
            });
            this.query.sql.push(")");
        }
        return this.endClass();
    }

    comma(...queries: Statement[]) {
        const resolvedQueries = super.resolveStatements(queries).filter((tokens) => tokens.length > 0);
        if (resolvedQueries.length === 0) {
            return this.endClass();
        }
        super.pushSeparatedTokens(resolvedQueries, ",");
        return this.endClass();
    }

    orderBy(...cols: Statement[]) {
        super.order();
        super.by();
        if (cols.length === 0) {
            return this.endClass();
        }
        const resolvedColumns = cols.map((item) => super.resolveStatement(item));
        super.pushSeparatedTokens(resolvedColumns, ",");
        return this.endClass();
    }

    override returning(col?: Statement) {
        super.returning();
        if (col === undefined || col === null) {
            return this.endClass();
        }
        const resolvedColumn = super.resolveStatement(col as QueryBuilder);
        if (resolvedColumn.length > 0) {
            this.query.sql.push(...resolvedColumn);
        }
        return this.endClass();
    }

    override limit(value?: Statement) {
        super.limit();
        if (value === undefined || value === null) {
            return this.endClass();
        }
        const resolvedLimit = super.resolveStatement(value);
        if (resolvedLimit.length === 0) {
            return this.endClass();
        }
        this.query.sql.push(...resolvedLimit);
        return this.endClass();
    }

    override offset(value?: Statement) {
        super.offset();
        if (value === undefined || value === null) {
            return this.endClass();
        }
        const resolvedOffset = super.resolveStatement(value);
        if (resolvedOffset.length === 0) {
            return this.endClass();
        }
        this.query.sql.push(...resolvedOffset);
        return this.endClass();
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
        return this.endClass();
    }

    withTies() {
        this.query.sql.push("WITH", "TIES");
        return this.endClass();
    }

    override t(table?: Statement) {
        if (!table) {
            super.t();
            return this.endClass();
        }
        if (typeof table === "string") {
            this.i(table);
            return this.endClass();
        }
        const resolved = super.resolveIdentifierStatement(table);
        if (resolved.length > 0) {
            this.query.sql.push(...resolved);
        }
        return this.endClass();
    }
    override column(column?: Statement) {
        if (!column) {
            super.column();
            return this.endClass();
        }
        if (typeof column === "string") {
            this.i(column);
            return this.endClass();
        }
        const resolved = super.resolveIdentifierStatement(column);
        if (resolved.length > 0) {
            this.query.sql.push(...resolved);
        }
        return this.endClass();
    }
    override c(column?: Statement) {
        if (!column) {
            super.c();
            return this.endClass();
        } else {
            this.column(column);
            return this.endClass();
        }
    }

    override into(tableName?: Statement, columns?: Statement[]) {
        this.query.sql.push("INTO");
        if (tableName !== undefined && tableName !== null) {
            const resolvedTable = super.resolveStatement(tableName);
            if (resolvedTable.length > 0) {
                this.query.sql.push(...resolvedTable);
            }
        }
        if (columns && columns.length > 0) {
            const resolvedColumns = columns.map((item) => super.resolveStatement(item));
            this.query.sql.push("(");
            super.pushSeparatedTokens(resolvedColumns, ",");
            this.query.sql.push(")");
        }
        return this.endClass();
    }

    groupByDistinct(...cols: Statement[]) {
        super.group();
        super.by();
        this.query.sql.push("DISTINCT");
        if (cols.length === 0) {
            return this.endClass();
        }
        const resolvedColumns = cols.map((item) => super.resolveStatement(item));
        super.pushSeparatedTokens(resolvedColumns, ",");
        return this.endClass();
    }

    override window(...param: Statement[]) {
        super.window();
        if (param.length === 0) {
            return this.endClass();
        }
        const resolved = super.resolveStatements(param);
        if (resolved.length === 0) {
            return this.endClass();
        } else {
            super.pushSeparatedTokens(resolved, ",");
        }
        return this.endClass();
    }

    // subquery operators (support multiple params)
    override exists(...params: Statement[]) {
        if (params.length === 0) {
            super.exists();
            return this.endClass();
        }
        super.exists();
        const resolved = super.resolveStatements(params).filter((tokens) => tokens.length > 0);
        if (resolved.length === 0) {
            return this.endClass();
        } else {
            this.query.sql.push("(");
            super.pushSeparatedTokens(resolved, ",");
            this.query.sql.push(")");
        }
        return this.endClass();
    }

    notExists(...params: Statement[]) {
        if (params.length === 0) {
            super.not();
            super.exists();
            return this.endClass();
        }
        super.not();
        super.exists();
        const resolved = super.resolveStatements(params).filter((tokens) => tokens.length > 0);
        if (resolved.length === 0) {
            return this.endClass();
        } else {
            this.query.sql.push("(");
            super.pushSeparatedTokens(resolved, ",");
            this.query.sql.push(")");
        }
        return this.endClass();
    }

    override in(...params: Statement[]) {
        if (params.length === 0) {
            super.in();
            return this.endClass();
        }
        super.in();
        const resolved = super.resolveStatements(params).filter((tokens) => tokens.length > 0);
        if (resolved.length === 0) {
            return this.endClass();
        } else {
            this.query.sql.push("(");
            super.pushSeparatedTokens(resolved, ",");
            this.query.sql.push(")");
        }
        return this.endClass();
    }

    notIn(...params: Statement[]) {
        if (params.length === 0) {
            super.not();
            super.in();
            return this.endClass();
        }
        super.not();
        super.in();
        const resolved = super.resolveStatements(params).filter((tokens) => tokens.length > 0);
        if (resolved.length === 0) {
            return this.endClass();
        } else {
            this.query.sql.push("(");
            super.pushSeparatedTokens(resolved, ",");
            this.query.sql.push(")");
        }
        return this.endClass();
    }

    override any(...params: Statement[]) {
        if (params.length === 0) {
            super.any();
            return this.endClass();
        }
        super.any();
        const resolved = super.resolveStatements(params).filter((tokens) => tokens.length > 0);
        if (resolved.length === 0) {
            return this.endClass();
        } else {
            this.query.sql.push("(");
            super.pushSeparatedTokens(resolved, ",");
            this.query.sql.push(")");
        }
        return this.endClass();
    }

    override all(...params: Statement[]) {
        if (params.length === 0) {
            super.all();
            return this.endClass();
        }
        super.all();
        const resolved = super.resolveStatements(params).filter((tokens) => tokens.length > 0);
        if (resolved.length === 0) {
            return this.endClass();
        } else {
            this.query.sql.push("(");
            super.pushSeparatedTokens(resolved, ",");
            this.query.sql.push(")");
        }
        return this.endClass();
    }

    override some(...params: Statement[]) {
        if (params.length === 0) {
            super.some();
            return this.endClass();
        }
        super.some();
        const resolved = super.resolveStatements(params).filter((tokens) => tokens.length > 0);
        if (resolved.length === 0) {
            return this.endClass();
        } else {
            this.query.sql.push("(");
            super.pushSeparatedTokens(resolved, ",");
            this.query.sql.push(")");
        }
        return this.endClass();
    }

    override over(...param: Statement[]) {
        if (param.length === 0) {
            this.query.sql.push("OVER");
            return this.endClass();
        }
        const resolved = super.resolveStatements(param).filter((tokens) => tokens.length > 0);
        if (resolved.length === 0) {
            this.query.sql.push("OVER");
            return this.endClass();
        }
        this.query.sql.push("OVER", "(");
        resolved.forEach((tokens) => {
            this.query.sql.push(...tokens);
        });
        this.query.sql.push(")");
        return this.endClass();
    }

    partitionBy(...cols: Statement[]) {
        this.query.sql.push("PARTITION", "BY");
        if (cols.length === 0) {
            return this.endClass();
        }
        const resolvedColumns = cols.map((item) => super.resolveStatement(item));
        super.pushSeparatedTokens(resolvedColumns, ",");
        return this.endClass();
    }

}
