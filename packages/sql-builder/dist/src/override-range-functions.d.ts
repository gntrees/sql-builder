import { SequenceFunctionBuilder } from "./override-sequence-functions";
import type { StatementValue } from "./types";
export declare class RangeFunctionBuilder extends SequenceFunctionBuilder {
    lower(range?: StatementValue): this;
    upper(range?: StatementValue): this;
    isempty(range?: StatementValue): this;
    lowerInc(range?: StatementValue): this;
    upperInc(range?: StatementValue): this;
    lowerInf(range?: StatementValue): this;
    upperInf(range?: StatementValue): this;
    rangeMerge(range1?: StatementValue, range2?: StatementValue): this;
    multirangeLower(multirange?: StatementValue): this;
    multirangeUpper(multirange?: StatementValue): this;
    multirangeIsempty(multirange?: StatementValue): this;
    multirangeLowerInc(multirange?: StatementValue): this;
    multirangeUpperInc(multirange?: StatementValue): this;
    multirangeLowerInf(multirange?: StatementValue): this;
    multirangeUpperInf(multirange?: StatementValue): this;
    multirangeRangeMerge(multirange?: StatementValue): this;
    multirange(range?: StatementValue): this;
    unnestMultirange(multirange?: StatementValue): this;
}
