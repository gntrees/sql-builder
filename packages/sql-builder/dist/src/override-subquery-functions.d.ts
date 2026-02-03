import { MergeFunctionBuilder } from "./override-merge-functions";
import type { QueryBuilder } from "./query-builder";
export declare class SubqueryFunctionBuilder extends MergeFunctionBuilder {
    /**
     * EXISTS (subquery)
     * The argument of EXISTS is an arbitrary SELECT statement.
     * The subquery is considered to be executed for each row of the outer query.
     * Returns true if the subquery returns at least one row, otherwise false.
     */
    exists(subquery?: QueryBuilder): this;
    /**
     * NOT EXISTS (subquery)
     * Logical negation of EXISTS.
     * Returns true if the subquery returns no rows, otherwise false.
     */
    notExists(subquery?: QueryBuilder): this;
    /**
     * IN (subquery, ...)
     * The subquery result is evaluated for comparison.
     * The result of IN is "true" if any equal subquery row is found.
     * The result is "false" if no equal row is found (including the case where the subquery returns no rows).
     * Use with identifier chaining: q.i("column").in(subquery)
     */
    in(...subqueries: QueryBuilder[]): this;
    /**
     * NOT IN (subquery, ...)
     * The subquery result is evaluated for comparison.
     * The result is "true" only if no equal subquery row is found (including the case where the subquery returns no rows).
     * Use with identifier chaining: q.i("column").notIn(subquery)
     */
    notIn(...subqueries: QueryBuilder[]): this;
    /**
     * ANY (subquery, ...)
     * The subquery result is evaluated for comparison.
     * The result is "true" if any comparison returns true.
     * ANY is a synonym for SOME.
     * Use with identifier and operator chaining: q.i("column").op("=").any(subquery)
     */
    any(...subqueries: QueryBuilder[]): this;
    /**
     * SOME (subquery, ...)
     * The subquery result is evaluated for comparison.
     * The result is "true" if any comparison returns true.
     * SOME is a synonym for ANY.
     * Use with identifier and operator chaining: q.i("column").op("=").some(subquery)
     */
    some(...subqueries: QueryBuilder[]): this;
    /**
     * ALL (subquery, ...)
     * The subquery result is evaluated for comparison.
     * The result is "true" if all comparisons return true (including the case where the subquery returns no rows).
     * The result is "false" if any comparison returns false.
     * Use with identifier and operator chaining: q.i("column").op("=").all(subquery)
     */
    all(...subqueries: QueryBuilder[]): this;
}
