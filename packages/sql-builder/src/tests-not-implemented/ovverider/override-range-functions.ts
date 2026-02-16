import { SequenceFunctionBuilder } from "./override-sequence-functions";
import type { Statement } from "../../types";

export class RangeFunctionBuilder extends SequenceFunctionBuilder {
    // === TABLE 9.60 - RANGE FUNCTIONS (8 functions) ===
    // Range values can be columns or literals

    override lower(range?: Statement) {
        return this.pushFunction("LOWER", range);
    }

    override upper(range?: Statement) {
        return this.pushFunction("UPPER", range);
    }

    isempty(range?: Statement) {
        return this.pushFunction("ISEMPTY", range);
    }

    lowerInc(range?: Statement) {
        return this.pushFunction("LOWER_INC", range);
    }

    upperInc(range?: Statement) {
        return this.pushFunction("UPPER_INC", range);
    }

    lowerInf(range?: Statement) {
        return this.pushFunction("LOWER_INF", range);
    }

    upperInf(range?: Statement) {
        return this.pushFunction("UPPER_INF", range);
    }

    rangeMerge(range1?: Statement, range2?: Statement) {
        return this.pushFunction("RANGE_MERGE", range1, range2);
    }

    // === TABLE 9.61 - MULTIRANGE FUNCTIONS (10 functions) ===

    multirangeLower(multirange?: Statement) {
        return this.pushFunction("LOWER", multirange);
    }

    multirangeUpper(multirange?: Statement) {
        return this.pushFunction("UPPER", multirange);
    }

    multirangeIsempty(multirange?: Statement) {
        return this.pushFunction("ISEMPTY", multirange);
    }

    multirangeLowerInc(multirange?: Statement) {
        return this.pushFunction("LOWER_INC", multirange);
    }

    multirangeUpperInc(multirange?: Statement) {
        return this.pushFunction("UPPER_INC", multirange);
    }

    multirangeLowerInf(multirange?: Statement) {
        return this.pushFunction("LOWER_INF", multirange);
    }

    multirangeUpperInf(multirange?: Statement) {
        return this.pushFunction("UPPER_INF", multirange);
    }

    multirangeRangeMerge(multirange?: Statement) {
        return this.pushFunction("RANGE_MERGE", multirange);
    }

    multirange(range?: Statement) {
        return this.pushFunction("MULTIRANGE", range);
    }

    unnestMultirange(multirange?: Statement) {
        return this.pushFunction("UNNEST", multirange);
    }
}
