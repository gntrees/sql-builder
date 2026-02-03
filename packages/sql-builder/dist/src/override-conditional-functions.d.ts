import { StringFunctionBuilder } from "./override-string-functions";
import type { StatementValueQueryBuilder } from "./types";
export declare class ConditionalFunctionBuilder extends StringFunctionBuilder {
    /**
     * COALESCE(value [, ...])
     * Returns the first of its arguments that is not null.
     * Null is returned only if all arguments are null.
     */
    coalesce(...values: StatementValueQueryBuilder[]): this;
    /**
     * NULLIF(value1, value2)
     * Returns null if value1 equals value2; otherwise returns value1.
     */
    nullif(value1?: StatementValueQueryBuilder, value2?: StatementValueQueryBuilder): this;
    /**
     * GREATEST(value [, ...])
     * Selects the largest value from a list of any number of expressions.
     * NULL values in the argument list are ignored.
     */
    greatest(...values: StatementValueQueryBuilder[]): this;
    /**
     * LEAST(value [, ...])
     * Selects the smallest value from a list of any number of expressions.
     * NULL values in the argument list are ignored.
     */
    least(...values: StatementValueQueryBuilder[]): this;
}
