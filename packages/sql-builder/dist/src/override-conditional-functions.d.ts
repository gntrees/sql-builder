import { OperatorFunctionBuilder } from "./override-operator-functions";
import type { Statement } from "./types";
export declare class ConditionalFunctionBuilder extends OperatorFunctionBuilder {
    /**
     * COALESCE(value [, ...])
     * Returns the first of its arguments that is not null.
     * Null is returned only if all arguments are null.
     */
    coalesce(...values: Statement[]): this;
    /**
     * NULLIF(value1, value2)
     * Returns null if value1 equals value2; otherwise returns value1.
     */
    nullif(value1?: Statement, value2?: Statement): this;
    /**
     * GREATEST(value [, ...])
     * Selects the largest value from a list of any number of expressions.
     * NULL values in the argument list are ignored.
     */
    greatest(...values: Statement[]): this;
    /**
     * LEAST(value [, ...])
     * Selects the smallest value from a list of any number of expressions.
     * NULL values in the argument list are ignored.
     */
    least(...values: Statement[]): this;
}
