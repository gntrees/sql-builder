import { RangeFunctionBuilder } from "./override-range-functions";
import type { StatementValueQueryBuilder } from "./types";

export class AggregateFunctionBuilder extends RangeFunctionBuilder {
    // ============================================================
    // TABLE 9.62 - GENERAL-PURPOSE AGGREGATE FUNCTIONS
    // ============================================================

    override anyValue(value?: StatementValueQueryBuilder) {
        return this.pushFunction("ANY_VALUE", value);
    }

    override arrayAgg(value?: StatementValueQueryBuilder) {
        return this.pushFunction("ARRAY_AGG", value);
    }

    override avg(expression?: StatementValueQueryBuilder) {
        return this.pushFunction("AVG", expression);
    }

    bitAnd(value?: StatementValueQueryBuilder) {
        return this.pushFunction("BIT_AND", value);
    }

    bitOr(value?: StatementValueQueryBuilder) {
        return this.pushFunction("BIT_OR", value);
    }

    bitXor(value?: StatementValueQueryBuilder) {
        return this.pushFunction("BIT_XOR", value);
    }

    boolAnd(expression?: StatementValueQueryBuilder) {
        return this.pushFunction("BOOL_AND", expression);
    }

    boolOr(expression?: StatementValueQueryBuilder) {
        return this.pushFunction("BOOL_OR", expression);
    }

    override count(expression?: StatementValueQueryBuilder | "*") {
        if (expression === undefined || expression === null) {
            return this.pushFunction("COUNT", "*");
        }
        if (expression === "*") {
            return this.pushFunction("COUNT", "*");
        }
        return this.pushFunction("COUNT", expression);
    }

    override every(expression?: StatementValueQueryBuilder) {
        return this.pushFunction("EVERY", expression);
    }

    jsonAggStrict(value?: StatementValueQueryBuilder) {
        return this.pushFunction("JSON_AGG_STRICT", value);
    }

    jsonbAggStrict(value?: StatementValueQueryBuilder) {
        return this.pushFunction("JSONB_AGG_STRICT", value);
    }

    override jsonArrayagg(value?: StatementValueQueryBuilder) {
        return this.pushFunction("JSON_ARRAYAGG", value);
    }

    override jsonObjectagg(key?: StatementValueQueryBuilder, value?: StatementValueQueryBuilder) {
        return this.pushFunction("JSON_OBJECTAGG", key, value);
    }

    override jsonObjectAgg(key?: StatementValueQueryBuilder, value?: StatementValueQueryBuilder) {
        return this.pushFunction("JSON_OBJECT_AGG", key, value);
    }

    jsonObjectAggStrict(key?: StatementValueQueryBuilder, value?: StatementValueQueryBuilder) {
        return this.pushFunction("JSON_OBJECT_AGG_STRICT", key, value);
    }

    jsonbObjectAggStrict(key?: StatementValueQueryBuilder, value?: StatementValueQueryBuilder) {
        return this.pushFunction("JSONB_OBJECT_AGG_STRICT", key, value);
    }

    override jsonbObjectAgg(key?: StatementValueQueryBuilder, value?: StatementValueQueryBuilder) {
        return this.pushFunction("JSONB_OBJECT_AGG", key, value);
    }

    jsonObjectAggUnique(key?: StatementValueQueryBuilder, value?: StatementValueQueryBuilder) {
        return this.pushFunction("JSON_OBJECT_AGG_UNIQUE", key, value);
    }

    jsonbObjectAggUnique(key?: StatementValueQueryBuilder, value?: StatementValueQueryBuilder) {
        return this.pushFunction("JSONB_OBJECT_AGG_UNIQUE", key, value);
    }

    jsonObjectAggUniqueStrict(key?: StatementValueQueryBuilder, value?: StatementValueQueryBuilder) {
        return this.pushFunction("JSON_OBJECT_AGG_UNIQUE_STRICT", key, value);
    }

    jsonbObjectAggUniqueStrict(key?: StatementValueQueryBuilder, value?: StatementValueQueryBuilder) {
        return this.pushFunction("JSONB_OBJECT_AGG_UNIQUE_STRICT", key, value);
    }

    override max(expression?: StatementValueQueryBuilder) {
        return this.pushFunction("MAX", expression);
    }

    override min(expression?: StatementValueQueryBuilder) {
        return this.pushFunction("MIN", expression);
    }

    rangeAgg(value?: StatementValueQueryBuilder) {
        return this.pushFunction("RANGE_AGG", value);
    }

    rangeIntersectAgg(value?: StatementValueQueryBuilder) {
        return this.pushFunction("RANGE_INTERSECT_AGG", value);
    }

    stringAgg(value?: StatementValueQueryBuilder, delimiter?: StatementValueQueryBuilder) {
        return this.pushFunction("STRING_AGG", value, delimiter);
    }

    override sum(expression?: StatementValueQueryBuilder) {
        return this.pushFunction("SUM", expression);
    }

    override xmlagg(expression?: StatementValueQueryBuilder) {
        return this.pushFunction("XMLAGG", expression);
    }

    // ============================================================
    // TABLE 9.63 - AGGREGATE FUNCTIONS FOR STATISTICS
    // ============================================================

    override corr(y?: StatementValueQueryBuilder, x?: StatementValueQueryBuilder) {
        return this.pushFunction("CORR", y, x);
    }

    override covarPop(y?: StatementValueQueryBuilder, x?: StatementValueQueryBuilder) {
        return this.pushFunction("COVAR_POP", y, x);
    }

    override covarSamp(y?: StatementValueQueryBuilder, x?: StatementValueQueryBuilder) {
        return this.pushFunction("COVAR_SAMP", y, x);
    }

    override regrAvgx(y?: StatementValueQueryBuilder, x?: StatementValueQueryBuilder) {
        return this.pushFunction("REGR_AVGX", y, x);
    }

    override regrAvgy(y?: StatementValueQueryBuilder, x?: StatementValueQueryBuilder) {
        return this.pushFunction("REGR_AVGY", y, x);
    }

    override regrCount(y?: StatementValueQueryBuilder, x?: StatementValueQueryBuilder) {
        return this.pushFunction("REGR_COUNT", y, x);
    }

    override regrIntercept(y?: StatementValueQueryBuilder, x?: StatementValueQueryBuilder) {
        return this.pushFunction("REGR_INTERCEPT", y, x);
    }

    override regrR2(y?: StatementValueQueryBuilder, x?: StatementValueQueryBuilder) {
        return this.pushFunction("REGR_R2", y, x);
    }

    override regrSlope(y?: StatementValueQueryBuilder, x?: StatementValueQueryBuilder) {
        return this.pushFunction("REGR_SLOPE", y, x);
    }

    override regrSxx(y?: StatementValueQueryBuilder, x?: StatementValueQueryBuilder) {
        return this.pushFunction("REGR_SXX", y, x);
    }

    override regrSxy(y?: StatementValueQueryBuilder, x?: StatementValueQueryBuilder) {
        return this.pushFunction("REGR_SXY", y, x);
    }

    override regrSyy(y?: StatementValueQueryBuilder, x?: StatementValueQueryBuilder) {
        return this.pushFunction("REGR_SYY", y, x);
    }

    stddev(expression?: StatementValueQueryBuilder) {
        return this.pushFunction("STDDEV", expression);
    }

    override stddevPop(expression?: StatementValueQueryBuilder) {
        return this.pushFunction("STDDEV_POP", expression);
    }

    override stddevSamp(expression?: StatementValueQueryBuilder) {
        return this.pushFunction("STDDEV_SAMP", expression);
    }

    variance(expression?: StatementValueQueryBuilder) {
        return this.pushFunction("VARIANCE", expression);
    }

    override varPop(expression?: StatementValueQueryBuilder) {
        return this.pushFunction("VAR_POP", expression);
    }

    override varSamp(expression?: StatementValueQueryBuilder) {
        return this.pushFunction("VAR_SAMP", expression);
    }

    // ============================================================
    // TABLE 9.64 - ORDERED-SET AGGREGATE FUNCTIONS
    // ============================================================

    override mode(orderBy?: StatementValueQueryBuilder) {
        return this.pushFunction("MODE", orderBy);
    }

    override percentileCont(fraction?: StatementValueQueryBuilder) {
        return this.pushFunction("PERCENTILE_CONT", fraction);
    }

    override percentileDisc(fraction?: StatementValueQueryBuilder) {
        return this.pushFunction("PERCENTILE_DISC", fraction);
    }

    // ============================================================
    // TABLE 9.65 - HYPOTHETICAL-SET AGGREGATE FUNCTIONS
    // ============================================================

    override rank(args?: StatementValueQueryBuilder) {
        return this.pushFunction("RANK", args);
    }

    override denseRank(args?: StatementValueQueryBuilder) {
        return this.pushFunction("DENSE_RANK", args);
    }

    override percentRank(args?: StatementValueQueryBuilder) {
        return this.pushFunction("PERCENT_RANK", args);
    }

    override cumeDist(args?: StatementValueQueryBuilder) {
        return this.pushFunction("CUME_DIST", args);
    }

    // ============================================================
    // TABLE 9.66 - GROUPING OPERATIONS
    // ============================================================

    override grouping(...expressions: StatementValueQueryBuilder[]) {
        const filtered = expressions.filter(e => e !== undefined);
        return this.pushFunction("GROUPING", ...filtered);
    }
}
