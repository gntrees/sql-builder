import { AggregateFunctionBuilder } from "./override-aggregate-functions";
import type { Statement } from "./types";
export declare class WindowFunctionBuilder extends AggregateFunctionBuilder {
    rowNumber(): this;
    ntile(numBuckets?: Statement): this;
    lag(value?: Statement, offset?: Statement, defaultValue?: Statement): this;
    lead(value?: Statement, offset?: Statement, defaultValue?: Statement): this;
    firstValue(value?: Statement): this;
    lastValue(value?: Statement): this;
    nthValue(value?: Statement, n?: Statement): this;
}
