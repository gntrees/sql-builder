import { RangeFunctionBuilder } from "./override-range-functions";
import type { Statement } from "./types";

export class AggregateFunctionBuilder extends RangeFunctionBuilder {
    // ============================================================
    // TABLE 9.62 - GENERAL-PURPOSE AGGREGATE FUNCTIONS
    // ============================================================

    override anyValue(value?: Statement) {
        return this.pushFunction("ANY_VALUE", value);
    }

    override arrayAgg(value?: Statement) {
        return this.pushFunction("ARRAY_AGG", value);
    }

    override avg(expression?: Statement) {
        return this.pushFunction("AVG", expression);
    }

    bitAnd(value?: Statement) {
        return this.pushFunction("BIT_AND", value);
    }

    bitOr(value?: Statement) {
        return this.pushFunction("BIT_OR", value);
    }

    bitXor(value?: Statement) {
        return this.pushFunction("BIT_XOR", value);
    }

    boolAnd(expression?: Statement) {
        return this.pushFunction("BOOL_AND", expression);
    }

    boolOr(expression?: Statement) {
        return this.pushFunction("BOOL_OR", expression);
    }

    override count(expression?: Statement | "*") {
        if (expression === undefined || expression === null) {
            return this.pushFunction("COUNT", "*");
        }
        if (expression === "*") {
            return this.pushFunction("COUNT", "*");
        }
        return this.pushFunction("COUNT", expression);
    }

    override every(expression?: Statement) {
        return this.pushFunction("EVERY", expression);
    }

    jsonAggStrict(value?: Statement) {
        return this.pushFunction("JSON_AGG_STRICT", value);
    }

    jsonbAggStrict(value?: Statement) {
        return this.pushFunction("JSONB_AGG_STRICT", value);
    }

    override jsonArrayagg(value?: Statement) {
        return this.pushFunction("JSON_ARRAYAGG", value);
    }

    override jsonObjectagg(key?: Statement, value?: Statement) {
        return this.pushFunction("JSON_OBJECTAGG", key, value);
    }

    override jsonObjectAgg(key?: Statement, value?: Statement) {
        return this.pushFunction("JSON_OBJECT_AGG", key, value);
    }

    jsonObjectAggStrict(key?: Statement, value?: Statement) {
        return this.pushFunction("JSON_OBJECT_AGG_STRICT", key, value);
    }

    jsonbObjectAggStrict(key?: Statement, value?: Statement) {
        return this.pushFunction("JSONB_OBJECT_AGG_STRICT", key, value);
    }

    override jsonbObjectAgg(key?: Statement, value?: Statement) {
        return this.pushFunction("JSONB_OBJECT_AGG", key, value);
    }

    jsonObjectAggUnique(key?: Statement, value?: Statement) {
        return this.pushFunction("JSON_OBJECT_AGG_UNIQUE", key, value);
    }

    jsonbObjectAggUnique(key?: Statement, value?: Statement) {
        return this.pushFunction("JSONB_OBJECT_AGG_UNIQUE", key, value);
    }

    jsonObjectAggUniqueStrict(key?: Statement, value?: Statement) {
        return this.pushFunction("JSON_OBJECT_AGG_UNIQUE_STRICT", key, value);
    }

    jsonbObjectAggUniqueStrict(key?: Statement, value?: Statement) {
        return this.pushFunction("JSONB_OBJECT_AGG_UNIQUE_STRICT", key, value);
    }

    override max(expression?: Statement) {
        return this.pushFunction("MAX", expression);
    }

    override min(expression?: Statement) {
        return this.pushFunction("MIN", expression);
    }

    rangeAgg(value?: Statement) {
        return this.pushFunction("RANGE_AGG", value);
    }

    rangeIntersectAgg(value?: Statement) {
        return this.pushFunction("RANGE_INTERSECT_AGG", value);
    }

    stringAgg(value?: Statement, delimiter?: Statement) {
        return this.pushFunction("STRING_AGG", value, delimiter);
    }

    override sum(expression?: Statement) {
        return this.pushFunction("SUM", expression);
    }

    override xmlagg(expression?: Statement) {
        return this.pushFunction("XMLAGG", expression);
    }

    // ============================================================
    // TABLE 9.63 - AGGREGATE FUNCTIONS FOR STATISTICS
    // ============================================================

    override corr(y?: Statement, x?: Statement) {
        return this.pushFunction("CORR", y, x);
    }

    override covarPop(y?: Statement, x?: Statement) {
        return this.pushFunction("COVAR_POP", y, x);
    }

    override covarSamp(y?: Statement, x?: Statement) {
        return this.pushFunction("COVAR_SAMP", y, x);
    }

    override regrAvgx(y?: Statement, x?: Statement) {
        return this.pushFunction("REGR_AVGX", y, x);
    }

    override regrAvgy(y?: Statement, x?: Statement) {
        return this.pushFunction("REGR_AVGY", y, x);
    }

    override regrCount(y?: Statement, x?: Statement) {
        return this.pushFunction("REGR_COUNT", y, x);
    }

    override regrIntercept(y?: Statement, x?: Statement) {
        return this.pushFunction("REGR_INTERCEPT", y, x);
    }

    override regrR2(y?: Statement, x?: Statement) {
        return this.pushFunction("REGR_R2", y, x);
    }

    override regrSlope(y?: Statement, x?: Statement) {
        return this.pushFunction("REGR_SLOPE", y, x);
    }

    override regrSxx(y?: Statement, x?: Statement) {
        return this.pushFunction("REGR_SXX", y, x);
    }

    override regrSxy(y?: Statement, x?: Statement) {
        return this.pushFunction("REGR_SXY", y, x);
    }

    override regrSyy(y?: Statement, x?: Statement) {
        return this.pushFunction("REGR_SYY", y, x);
    }

    stddev(expression?: Statement) {
        return this.pushFunction("STDDEV", expression);
    }

    override stddevPop(expression?: Statement) {
        return this.pushFunction("STDDEV_POP", expression);
    }

    override stddevSamp(expression?: Statement) {
        return this.pushFunction("STDDEV_SAMP", expression);
    }

    variance(expression?: Statement) {
        return this.pushFunction("VARIANCE", expression);
    }

    override varPop(expression?: Statement) {
        return this.pushFunction("VAR_POP", expression);
    }

    override varSamp(expression?: Statement) {
        return this.pushFunction("VAR_SAMP", expression);
    }

    // ============================================================
    // TABLE 9.64 - ORDERED-SET AGGREGATE FUNCTIONS
    // ============================================================

    override mode(orderBy?: Statement) {
        return this.pushFunction("MODE", orderBy);
    }

    override percentileCont(fraction?: Statement) {
        return this.pushFunction("PERCENTILE_CONT", fraction);
    }

    override percentileDisc(fraction?: Statement) {
        return this.pushFunction("PERCENTILE_DISC", fraction);
    }

    // ============================================================
    // TABLE 9.65 - HYPOTHETICAL-SET AGGREGATE FUNCTIONS
    // ============================================================

    override rank(args?: Statement) {
        return this.pushFunction("RANK", args);
    }

    override denseRank(args?: Statement) {
        return this.pushFunction("DENSE_RANK", args);
    }

    override percentRank(args?: Statement) {
        return this.pushFunction("PERCENT_RANK", args);
    }

    override cumeDist(args?: Statement) {
        return this.pushFunction("CUME_DIST", args);
    }

    // ============================================================
    // TABLE 9.66 - GROUPING OPERATIONS
    // ============================================================

    override grouping(...expressions: Statement[]) {
        const filtered = expressions.filter(e => e !== undefined);
        return this.pushFunction("GROUPING", ...filtered);
    }
}
