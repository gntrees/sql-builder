import { AggregateFunctionBuilder } from "./override-aggregate-functions";
import type { StatementValueQueryBuilder } from "./types";

export class WindowFunctionBuilder extends AggregateFunctionBuilder {
    // ============================================================
    // TABLE 9.60 - GENERAL-PURPOSE WINDOW FUNCTIONS
    // https://www.postgresql.org/docs/current/functions-window.html
    // ============================================================

    override rowNumber() {
        return this.pushFunction("ROW_NUMBER");
    }

    override ntile(numBuckets?: StatementValueQueryBuilder) {
        return this.pushFunction("NTILE", numBuckets);
    }

    override lag(
        value?: StatementValueQueryBuilder,
        offset?: StatementValueQueryBuilder,
        defaultValue?: StatementValueQueryBuilder
    ) {
        return this.pushFunction("LAG", value, offset, defaultValue);
    }

    override lead(
        value?: StatementValueQueryBuilder,
        offset?: StatementValueQueryBuilder,
        defaultValue?: StatementValueQueryBuilder
    ) {
        return this.pushFunction("LEAD", value, offset, defaultValue);
    }

    override firstValue(value?: StatementValueQueryBuilder) {
        return this.pushFunction("FIRST_VALUE", value);
    }

    override lastValue(value?: StatementValueQueryBuilder) {
        return this.pushFunction("LAST_VALUE", value);
    }

    override nthValue(
        value?: StatementValueQueryBuilder,
        n?: StatementValueQueryBuilder
    ) {
        return this.pushFunction("NTH_VALUE", value, n);
    }
}
