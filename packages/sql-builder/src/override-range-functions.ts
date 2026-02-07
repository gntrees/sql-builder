import { SequenceFunctionBuilder } from "./override-sequence-functions";
import type { Statement } from "./types";

export class RangeFunctionBuilder extends SequenceFunctionBuilder {
    // === TABLE 9.60 - RANGE FUNCTIONS (8 functions) ===
    // Range values can be columns or literals

    override lower(range?: Statement) {
        return this.pushFunction("LOWER",
            range === undefined ? undefined : this.toLiteral(range));
    }

    override upper(range?: Statement) {
        return this.pushFunction("UPPER",
            range === undefined ? undefined : this.toLiteral(range));
    }

    isempty(range?: Statement) {
        return this.pushFunction("ISEMPTY",
            range === undefined ? undefined : this.toLiteral(range));
    }

    lowerInc(range?: Statement) {
        return this.pushFunction("LOWER_INC",
            range === undefined ? undefined : this.toLiteral(range));
    }

    upperInc(range?: Statement) {
        return this.pushFunction("UPPER_INC",
            range === undefined ? undefined : this.toLiteral(range));
    }

    lowerInf(range?: Statement) {
        return this.pushFunction("LOWER_INF",
            range === undefined ? undefined : this.toLiteral(range));
    }

    upperInf(range?: Statement) {
        return this.pushFunction("UPPER_INF",
            range === undefined ? undefined : this.toLiteral(range));
    }

    rangeMerge(range1?: Statement, range2?: Statement) {
        return this.pushFunction("RANGE_MERGE",
            range1 === undefined ? undefined : this.toLiteral(range1),
            range2 === undefined ? undefined : this.toLiteral(range2));
    }

    // === TABLE 9.61 - MULTIRANGE FUNCTIONS (10 functions) ===

    multirangeLower(multirange?: Statement) {
        return this.pushFunction("LOWER",
            multirange === undefined ? undefined : this.toLiteral(multirange));
    }

    multirangeUpper(multirange?: Statement) {
        return this.pushFunction("UPPER",
            multirange === undefined ? undefined : this.toLiteral(multirange));
    }

    multirangeIsempty(multirange?: Statement) {
        return this.pushFunction("ISEMPTY",
            multirange === undefined ? undefined : this.toLiteral(multirange));
    }

    multirangeLowerInc(multirange?: Statement) {
        return this.pushFunction("LOWER_INC",
            multirange === undefined ? undefined : this.toLiteral(multirange));
    }

    multirangeUpperInc(multirange?: Statement) {
        return this.pushFunction("UPPER_INC",
            multirange === undefined ? undefined : this.toLiteral(multirange));
    }

    multirangeLowerInf(multirange?: Statement) {
        return this.pushFunction("LOWER_INF",
            multirange === undefined ? undefined : this.toLiteral(multirange));
    }

    multirangeUpperInf(multirange?: Statement) {
        return this.pushFunction("UPPER_INF",
            multirange === undefined ? undefined : this.toLiteral(multirange));
    }

    multirangeRangeMerge(multirange?: Statement) {
        return this.pushFunction("RANGE_MERGE",
            multirange === undefined ? undefined : this.toLiteral(multirange));
    }

    multirange(range?: Statement) {
        return this.pushFunction("MULTIRANGE",
            range === undefined ? undefined : this.toLiteral(range));
    }

    unnestMultirange(multirange?: Statement) {
        return this.pushFunction("UNNEST",
            multirange === undefined ? undefined : this.toLiteral(multirange));
    }
}
