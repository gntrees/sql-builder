import { AggregateFunctionBuilder } from "./override-aggregate-functions";
import type { Statement } from "../../types";

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

    override over(window?: { name?: string; partitionBy?: Statement[]; orderBy?: Statement[]; frame?: string }) {
        this.query.sql.push("OVER");
        if (window?.name) {
            const resolvedName = typeof window.name === "string"
                ? super.resolveIdentifierStatement(window.name)
                : super.resolveStatement(window.name);
            if (resolvedName.length > 0) {
                this.query.sql.push(...resolvedName);
            }
        } else if (window && (window.partitionBy || window.orderBy || window.frame)) {
            this.query.sql.push("(");
            if (window.partitionBy && window.partitionBy.length > 0) {
                this.query.sql.push("PARTITION", "BY");
                const resolvedColumns = window.partitionBy.map((item, index) => super.resolveIdentifierStatement(item));
                super.pushSeparatedTokens(resolvedColumns, ",");
            }
            if (window.orderBy && window.orderBy.length > 0) {
                if (window.partitionBy && window.partitionBy.length > 0) {
                    this.query.sql.push(" ");
                }
                this.query.sql.push("ORDER", "BY");
                const resolvedColumns = window.orderBy.map((item, index) => super.resolveIdentifierStatement(item));
                super.pushSeparatedTokens(resolvedColumns, ",");
            }
            if (window.frame) {
                this.query.sql.push(window.frame);
            }
            this.query.sql.push(")");
        }
        return this;
    }
}
