import { AggregateFunctionBuilder } from "./override-aggregate-functions";
import type { Statement } from "./types";

export class WindowFunctionBuilder extends AggregateFunctionBuilder {
    // ============================================================
    // TABLE 9.60 - GENERAL-PURPOSE WINDOW FUNCTIONS
    // https://www.postgresql.org/docs/current/functions-window.html
    // ============================================================

    override rowNumber() {
        return this.pushFunction("ROW_NUMBER");
    }

    override ntile(numBuckets?: Statement) {
        return this.pushFunction("NTILE", numBuckets);
    }

    override lag(
        value?: Statement,
        offset?: Statement,
        defaultValue?: Statement
    ) {
        return this.pushFunction("LAG", value, offset, defaultValue);
    }

    override lead(
        value?: Statement,
        offset?: Statement,
        defaultValue?: Statement
    ) {
        return this.pushFunction("LEAD", value, offset, defaultValue);
    }

    override firstValue(value?: Statement) {
        return this.pushFunction("FIRST_VALUE", value);
    }

    override lastValue(value?: Statement) {
        return this.pushFunction("LAST_VALUE", value);
    }

    override nthValue(
        value?: Statement,
        n?: Statement
    ) {
        return this.pushFunction("NTH_VALUE", value, n);
    }
}
