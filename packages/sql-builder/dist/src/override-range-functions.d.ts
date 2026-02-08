import { SequenceFunctionBuilder } from "./override-sequence-functions";
import type { Statement } from "./types";
export declare class RangeFunctionBuilder extends SequenceFunctionBuilder {
    lower(range?: Statement): this;
    upper(range?: Statement): this;
    isempty(range?: Statement): this;
    lowerInc(range?: Statement): this;
    upperInc(range?: Statement): this;
    lowerInf(range?: Statement): this;
    upperInf(range?: Statement): this;
    rangeMerge(range1?: Statement, range2?: Statement): this;
    multirangeLower(multirange?: Statement): this;
    multirangeUpper(multirange?: Statement): this;
    multirangeIsempty(multirange?: Statement): this;
    multirangeLowerInc(multirange?: Statement): this;
    multirangeUpperInc(multirange?: Statement): this;
    multirangeLowerInf(multirange?: Statement): this;
    multirangeUpperInf(multirange?: Statement): this;
    multirangeRangeMerge(multirange?: Statement): this;
    multirange(range?: Statement): this;
    unnestMultirange(multirange?: Statement): this;
}
