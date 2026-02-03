"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateFunctionBuilder = void 0;
const override_range_functions_1 = require("./override-range-functions");
class AggregateFunctionBuilder extends override_range_functions_1.RangeFunctionBuilder {
    // ============================================================
    // TABLE 9.62 - GENERAL-PURPOSE AGGREGATE FUNCTIONS
    // ============================================================
    anyValue(value) {
        return this.pushFunction("ANY_VALUE", value);
    }
    arrayAgg(value) {
        return this.pushFunction("ARRAY_AGG", value);
    }
    avg(expression) {
        return this.pushFunction("AVG", expression);
    }
    bitAnd(value) {
        return this.pushFunction("BIT_AND", value);
    }
    bitOr(value) {
        return this.pushFunction("BIT_OR", value);
    }
    bitXor(value) {
        return this.pushFunction("BIT_XOR", value);
    }
    boolAnd(expression) {
        return this.pushFunction("BOOL_AND", expression);
    }
    boolOr(expression) {
        return this.pushFunction("BOOL_OR", expression);
    }
    count(expression) {
        if (expression === undefined || expression === null) {
            return this.pushFunction("COUNT", "*");
        }
        if (expression === "*") {
            return this.pushFunction("COUNT", "*");
        }
        return this.pushFunction("COUNT", expression);
    }
    every(expression) {
        return this.pushFunction("EVERY", expression);
    }
    jsonAggStrict(value) {
        return this.pushFunction("JSON_AGG_STRICT", value);
    }
    jsonbAggStrict(value) {
        return this.pushFunction("JSONB_AGG_STRICT", value);
    }
    jsonArrayagg(value) {
        return this.pushFunction("JSON_ARRAYAGG", value);
    }
    jsonObjectagg(key, value) {
        return this.pushFunction("JSON_OBJECTAGG", key, value);
    }
    jsonObjectAgg(key, value) {
        return this.pushFunction("JSON_OBJECT_AGG", key, value);
    }
    jsonObjectAggStrict(key, value) {
        return this.pushFunction("JSON_OBJECT_AGG_STRICT", key, value);
    }
    jsonbObjectAggStrict(key, value) {
        return this.pushFunction("JSONB_OBJECT_AGG_STRICT", key, value);
    }
    jsonbObjectAgg(key, value) {
        return this.pushFunction("JSONB_OBJECT_AGG", key, value);
    }
    jsonObjectAggUnique(key, value) {
        return this.pushFunction("JSON_OBJECT_AGG_UNIQUE", key, value);
    }
    jsonbObjectAggUnique(key, value) {
        return this.pushFunction("JSONB_OBJECT_AGG_UNIQUE", key, value);
    }
    jsonObjectAggUniqueStrict(key, value) {
        return this.pushFunction("JSON_OBJECT_AGG_UNIQUE_STRICT", key, value);
    }
    jsonbObjectAggUniqueStrict(key, value) {
        return this.pushFunction("JSONB_OBJECT_AGG_UNIQUE_STRICT", key, value);
    }
    max(expression) {
        return this.pushFunction("MAX", expression);
    }
    min(expression) {
        return this.pushFunction("MIN", expression);
    }
    rangeAgg(value) {
        return this.pushFunction("RANGE_AGG", value);
    }
    rangeIntersectAgg(value) {
        return this.pushFunction("RANGE_INTERSECT_AGG", value);
    }
    stringAgg(value, delimiter) {
        return this.pushFunction("STRING_AGG", value, delimiter);
    }
    sum(expression) {
        return this.pushFunction("SUM", expression);
    }
    xmlagg(expression) {
        return this.pushFunction("XMLAGG", expression);
    }
    // ============================================================
    // TABLE 9.63 - AGGREGATE FUNCTIONS FOR STATISTICS
    // ============================================================
    corr(y, x) {
        return this.pushFunction("CORR", y, x);
    }
    covarPop(y, x) {
        return this.pushFunction("COVAR_POP", y, x);
    }
    covarSamp(y, x) {
        return this.pushFunction("COVAR_SAMP", y, x);
    }
    regrAvgx(y, x) {
        return this.pushFunction("REGR_AVGX", y, x);
    }
    regrAvgy(y, x) {
        return this.pushFunction("REGR_AVGY", y, x);
    }
    regrCount(y, x) {
        return this.pushFunction("REGR_COUNT", y, x);
    }
    regrIntercept(y, x) {
        return this.pushFunction("REGR_INTERCEPT", y, x);
    }
    regrR2(y, x) {
        return this.pushFunction("REGR_R2", y, x);
    }
    regrSlope(y, x) {
        return this.pushFunction("REGR_SLOPE", y, x);
    }
    regrSxx(y, x) {
        return this.pushFunction("REGR_SXX", y, x);
    }
    regrSxy(y, x) {
        return this.pushFunction("REGR_SXY", y, x);
    }
    regrSyy(y, x) {
        return this.pushFunction("REGR_SYY", y, x);
    }
    stddev(expression) {
        return this.pushFunction("STDDEV", expression);
    }
    stddevPop(expression) {
        return this.pushFunction("STDDEV_POP", expression);
    }
    stddevSamp(expression) {
        return this.pushFunction("STDDEV_SAMP", expression);
    }
    variance(expression) {
        return this.pushFunction("VARIANCE", expression);
    }
    varPop(expression) {
        return this.pushFunction("VAR_POP", expression);
    }
    varSamp(expression) {
        return this.pushFunction("VAR_SAMP", expression);
    }
    // ============================================================
    // TABLE 9.64 - ORDERED-SET AGGREGATE FUNCTIONS
    // ============================================================
    mode(orderBy) {
        return this.pushFunction("MODE", orderBy);
    }
    percentileCont(fraction) {
        return this.pushFunction("PERCENTILE_CONT", fraction);
    }
    percentileDisc(fraction) {
        return this.pushFunction("PERCENTILE_DISC", fraction);
    }
    // ============================================================
    // TABLE 9.65 - HYPOTHETICAL-SET AGGREGATE FUNCTIONS
    // ============================================================
    rank(args) {
        return this.pushFunction("RANK", args);
    }
    denseRank(args) {
        return this.pushFunction("DENSE_RANK", args);
    }
    percentRank(args) {
        return this.pushFunction("PERCENT_RANK", args);
    }
    cumeDist(args) {
        return this.pushFunction("CUME_DIST", args);
    }
    // ============================================================
    // TABLE 9.66 - GROUPING OPERATIONS
    // ============================================================
    grouping(...expressions) {
        const filtered = expressions.filter(e => e !== undefined);
        return this.pushFunction("GROUPING", ...filtered);
    }
}
exports.AggregateFunctionBuilder = AggregateFunctionBuilder;
