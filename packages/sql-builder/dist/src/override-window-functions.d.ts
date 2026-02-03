import { AggregateFunctionBuilder } from "./override-aggregate-functions";
import type { StatementValueQueryBuilder } from "./types";
export declare class WindowFunctionBuilder extends AggregateFunctionBuilder {
    rowNumber(): this;
    ntile(numBuckets?: StatementValueQueryBuilder): this;
    lag(value?: StatementValueQueryBuilder, offset?: StatementValueQueryBuilder, defaultValue?: StatementValueQueryBuilder): this;
    lead(value?: StatementValueQueryBuilder, offset?: StatementValueQueryBuilder, defaultValue?: StatementValueQueryBuilder): this;
    firstValue(value?: StatementValueQueryBuilder): this;
    lastValue(value?: StatementValueQueryBuilder): this;
    nthValue(value?: StatementValueQueryBuilder, n?: StatementValueQueryBuilder): this;
}
