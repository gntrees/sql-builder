import { SequenceFunctionBuilder } from "./override-sequence-functions";
import type { StatementValue } from "./types";

export class RangeFunctionBuilder extends SequenceFunctionBuilder {
    // === TABLE 9.60 - RANGE FUNCTIONS (8 functions) ===
    // Range values can be columns or literals

    override lower(range?: StatementValue) {
        return this.pushFunction("LOWER",
            range === undefined ? undefined : this.toLiteral(range));
    }

    override upper(range?: StatementValue) {
        return this.pushFunction("UPPER",
            range === undefined ? undefined : this.toLiteral(range));
    }

    isempty(range?: StatementValue) {
        return this.pushFunction("ISEMPTY",
            range === undefined ? undefined : this.toLiteral(range));
    }

    lowerInc(range?: StatementValue) {
        return this.pushFunction("LOWER_INC",
            range === undefined ? undefined : this.toLiteral(range));
    }

    upperInc(range?: StatementValue) {
        return this.pushFunction("UPPER_INC",
            range === undefined ? undefined : this.toLiteral(range));
    }

    lowerInf(range?: StatementValue) {
        return this.pushFunction("LOWER_INF",
            range === undefined ? undefined : this.toLiteral(range));
    }

    upperInf(range?: StatementValue) {
        return this.pushFunction("UPPER_INF",
            range === undefined ? undefined : this.toLiteral(range));
    }

    rangeMerge(range1?: StatementValue, range2?: StatementValue) {
        return this.pushFunction("RANGE_MERGE",
            range1 === undefined ? undefined : this.toLiteral(range1),
            range2 === undefined ? undefined : this.toLiteral(range2));
    }

    // === TABLE 9.61 - MULTIRANGE FUNCTIONS (10 functions) ===

    multirangeLower(multirange?: StatementValue) {
        return this.pushFunction("LOWER",
            multirange === undefined ? undefined : this.toLiteral(multirange));
    }

    multirangeUpper(multirange?: StatementValue) {
        return this.pushFunction("UPPER",
            multirange === undefined ? undefined : this.toLiteral(multirange));
    }

    multirangeIsempty(multirange?: StatementValue) {
        return this.pushFunction("ISEMPTY",
            multirange === undefined ? undefined : this.toLiteral(multirange));
    }

    multirangeLowerInc(multirange?: StatementValue) {
        return this.pushFunction("LOWER_INC",
            multirange === undefined ? undefined : this.toLiteral(multirange));
    }

    multirangeUpperInc(multirange?: StatementValue) {
        return this.pushFunction("UPPER_INC",
            multirange === undefined ? undefined : this.toLiteral(multirange));
    }

    multirangeLowerInf(multirange?: StatementValue) {
        return this.pushFunction("LOWER_INF",
            multirange === undefined ? undefined : this.toLiteral(multirange));
    }

    multirangeUpperInf(multirange?: StatementValue) {
        return this.pushFunction("UPPER_INF",
            multirange === undefined ? undefined : this.toLiteral(multirange));
    }

    multirangeRangeMerge(multirange?: StatementValue) {
        return this.pushFunction("RANGE_MERGE",
            multirange === undefined ? undefined : this.toLiteral(multirange));
    }

    multirange(range?: StatementValue) {
        return this.pushFunction("MULTIRANGE",
            range === undefined ? undefined : this.toLiteral(range));
    }

    unnestMultirange(multirange?: StatementValue) {
        return this.pushFunction("UNNEST",
            multirange === undefined ? undefined : this.toLiteral(multirange));
    }
}
