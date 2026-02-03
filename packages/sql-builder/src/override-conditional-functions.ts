import { StringFunctionBuilder } from "./override-string-functions";
import type { StatementValueQueryBuilder } from "./types";

export class ConditionalFunctionBuilder extends StringFunctionBuilder {
    /**
     * COALESCE(value [, ...])
     * Returns the first of its arguments that is not null.
     * Null is returned only if all arguments are null.
     */
    override coalesce(...values: StatementValueQueryBuilder[]) {
        const filtered = values.filter(v => v !== undefined);
        return this.pushFunction("COALESCE", ...filtered);
    }

    /**
     * NULLIF(value1, value2)
     * Returns null if value1 equals value2; otherwise returns value1.
     */
    override nullif(value1?: StatementValueQueryBuilder, value2?: StatementValueQueryBuilder) {
        return this.pushFunction("NULLIF", value1, value2);
    }

    /**
     * GREATEST(value [, ...])
     * Selects the largest value from a list of any number of expressions.
     * NULL values in the argument list are ignored.
     */
    override greatest(...values: StatementValueQueryBuilder[]) {
        const filtered = values.filter(v => v !== undefined);
        return this.pushFunction("GREATEST", ...filtered);
    }

    /**
     * LEAST(value [, ...])
     * Selects the smallest value from a list of any number of expressions.
     * NULL values in the argument list are ignored.
     */
    override least(...values: StatementValueQueryBuilder[]) {
        const filtered = values.filter(v => v !== undefined);
        return this.pushFunction("LEAST", ...filtered);
    }
}
