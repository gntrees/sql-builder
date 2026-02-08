"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangeFunctionBuilder = void 0;
const override_sequence_functions_1 = require("./override-sequence-functions");
class RangeFunctionBuilder extends override_sequence_functions_1.SequenceFunctionBuilder {
    // === TABLE 9.60 - RANGE FUNCTIONS (8 functions) ===
    // Range values can be columns or literals
    lower(range) {
        return this.pushFunction("LOWER", range === undefined ? undefined : this.toLiteral(range));
    }
    upper(range) {
        return this.pushFunction("UPPER", range === undefined ? undefined : this.toLiteral(range));
    }
    isempty(range) {
        return this.pushFunction("ISEMPTY", range === undefined ? undefined : this.toLiteral(range));
    }
    lowerInc(range) {
        return this.pushFunction("LOWER_INC", range === undefined ? undefined : this.toLiteral(range));
    }
    upperInc(range) {
        return this.pushFunction("UPPER_INC", range === undefined ? undefined : this.toLiteral(range));
    }
    lowerInf(range) {
        return this.pushFunction("LOWER_INF", range === undefined ? undefined : this.toLiteral(range));
    }
    upperInf(range) {
        return this.pushFunction("UPPER_INF", range === undefined ? undefined : this.toLiteral(range));
    }
    rangeMerge(range1, range2) {
        return this.pushFunction("RANGE_MERGE", range1 === undefined ? undefined : this.toLiteral(range1), range2 === undefined ? undefined : this.toLiteral(range2));
    }
    // === TABLE 9.61 - MULTIRANGE FUNCTIONS (10 functions) ===
    multirangeLower(multirange) {
        return this.pushFunction("LOWER", multirange === undefined ? undefined : this.toLiteral(multirange));
    }
    multirangeUpper(multirange) {
        return this.pushFunction("UPPER", multirange === undefined ? undefined : this.toLiteral(multirange));
    }
    multirangeIsempty(multirange) {
        return this.pushFunction("ISEMPTY", multirange === undefined ? undefined : this.toLiteral(multirange));
    }
    multirangeLowerInc(multirange) {
        return this.pushFunction("LOWER_INC", multirange === undefined ? undefined : this.toLiteral(multirange));
    }
    multirangeUpperInc(multirange) {
        return this.pushFunction("UPPER_INC", multirange === undefined ? undefined : this.toLiteral(multirange));
    }
    multirangeLowerInf(multirange) {
        return this.pushFunction("LOWER_INF", multirange === undefined ? undefined : this.toLiteral(multirange));
    }
    multirangeUpperInf(multirange) {
        return this.pushFunction("UPPER_INF", multirange === undefined ? undefined : this.toLiteral(multirange));
    }
    multirangeRangeMerge(multirange) {
        return this.pushFunction("RANGE_MERGE", multirange === undefined ? undefined : this.toLiteral(multirange));
    }
    multirange(range) {
        return this.pushFunction("MULTIRANGE", range === undefined ? undefined : this.toLiteral(range));
    }
    unnestMultirange(multirange) {
        return this.pushFunction("UNNEST", multirange === undefined ? undefined : this.toLiteral(multirange));
    }
}
exports.RangeFunctionBuilder = RangeFunctionBuilder;
