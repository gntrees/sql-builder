import { MergeFunctionBuilder } from "./override-merge-functions";
import type { QueryBuilder } from "./query-builder";
import type { Statement } from "./types";

export class SubqueryFunctionBuilder extends MergeFunctionBuilder {
    /**
     * EXISTS (subquery)
     * The argument of EXISTS is an arbitrary SELECT statement.
     * The subquery is considered to be executed for each row of the outer query.
     * Returns true if the subquery returns at least one row, otherwise false.
     */
    override exists(subquery?: QueryBuilder) {
        this.query.sql.push("EXISTS");
        if (subquery !== undefined && subquery !== null) {
            this.query.sql.push("(");
            const resolved = this.resolveStatement(subquery, 0);
            if (resolved.length > 0) {
                this.query.sql.push(...resolved);
            }
            this.query.sql.push(")");
        }
        return this;
    }

    /**
     * NOT EXISTS (subquery)
     * Logical negation of EXISTS.
     * Returns true if the subquery returns no rows, otherwise false.
     */
    notExists(subquery?: QueryBuilder) {
        this.query.sql.push("NOT", "EXISTS");
        if (subquery !== undefined && subquery !== null) {
            this.query.sql.push("(");
            const resolved = this.resolveStatement(subquery, 0);
            if (resolved.length > 0) {
                this.query.sql.push(...resolved);
            }
            this.query.sql.push(")");
        }
        return this;
    }

    /**
     * IN (subquery, ...)
     * The subquery result is evaluated for comparison.
     * The result of IN is "true" if any equal subquery row is found.
     * The result is "false" if no equal row is found (including the case where the subquery returns no rows).
     * Use with identifier chaining: q.i("column").in(subquery)
     */
    override in(...subqueries: QueryBuilder[]) {
        this.query.sql.push("IN");
        if (subqueries.length > 0) {
            this.query.sql.push("(");
            for (let i = 0; i < subqueries.length; i++) {
                const resolved = this.resolveStatement(subqueries[i], 0);
                this.query.sql.push(...resolved);
                if (i < subqueries.length - 1) {
                    this.query.sql.push(",");
                }
            }
            this.query.sql.push(")");
        }
        return this;
    }

    /**
     * NOT IN (subquery, ...)
     * The subquery result is evaluated for comparison.
     * The result is "true" only if no equal subquery row is found (including the case where the subquery returns no rows).
     * Use with identifier chaining: q.i("column").notIn(subquery)
     */
    notIn(...subqueries: QueryBuilder[]) {
        this.query.sql.push("NOT", "IN");
        if (subqueries.length > 0) {
            this.query.sql.push("(");
            for (let i = 0; i < subqueries.length; i++) {
                const resolved = this.resolveStatement(subqueries[i], 0);
                this.query.sql.push(...resolved);
                if (i < subqueries.length - 1) {
                    this.query.sql.push(",");
                }
            }
            this.query.sql.push(")");
        }
        return this;
    }

    /**
     * ANY (subquery, ...)
     * The subquery result is evaluated for comparison.
     * The result is "true" if any comparison returns true.
     * ANY is a synonym for SOME.
     * Use with identifier and operator chaining: q.i("column").op("=").any(subquery)
     */
    override any(...subqueries: QueryBuilder[]) {
        this.query.sql.push("ANY");
        if (subqueries.length > 0) {
            this.query.sql.push("(");
            for (let i = 0; i < subqueries.length; i++) {
                const resolved = this.resolveStatement(subqueries[i], 0);
                this.query.sql.push(...resolved);
                if (i < subqueries.length - 1) {
                    this.query.sql.push(",");
                }
            }
            this.query.sql.push(")");
        }
        return this;
    }

    /**
     * SOME (subquery, ...)
     * The subquery result is evaluated for comparison.
     * The result is "true" if any comparison returns true.
     * SOME is a synonym for ANY.
     * Use with identifier and operator chaining: q.i("column").op("=").some(subquery)
     */
    override some(...subqueries: QueryBuilder[]) {
        this.query.sql.push("SOME");
        if (subqueries.length > 0) {
            this.query.sql.push("(");
            for (let i = 0; i < subqueries.length; i++) {
                const resolved = this.resolveStatement(subqueries[i], 0);
                this.query.sql.push(...resolved);
                if (i < subqueries.length - 1) {
                    this.query.sql.push(",");
                }
            }
            this.query.sql.push(")");
        }
        return this;
    }

    /**
     * ALL (subquery, ...)
     * The subquery result is evaluated for comparison.
     * The result is "true" if all comparisons return true (including the case where the subquery returns no rows).
     * The result is "false" if any comparison returns false.
     * Use with identifier and operator chaining: q.i("column").op("=").all(subquery)
     */
    override all(...subqueries: QueryBuilder[]) {
        this.query.sql.push("ALL");
        if (subqueries.length > 0) {
            this.query.sql.push("(");
            for (let i = 0; i < subqueries.length; i++) {
                const resolved = this.resolveStatement(subqueries[i], 0);
                this.query.sql.push(...resolved);
                if (i < subqueries.length - 1) {
                    this.query.sql.push(",");
                }
            }
            this.query.sql.push(")");
        }
        return this;
    }
}
