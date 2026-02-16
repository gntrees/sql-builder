import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../index";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async () => ({}),
});

describe("aggregate functions - general purpose", () => {
    it("builds any_value", () => {
        const builder = q.select(q.anyValue(q.l("salary")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT ANY_VALUE($1)");
        expect(parameters).toEqual(["salary"]);
    });

    it("builds array_agg", () => {
        const builder = q.select(q.arrayAgg(q.l("salary")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT ARRAY_AGG($1)");
        expect(parameters).toEqual(["salary"]);
    });

    it("builds avg", () => {
        const builder = q.select(q.avg(q.l("salary")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT AVG($1)");
        expect(parameters).toEqual(["salary"]);
    });

    it("builds bit_and", () => {
        const builder = q.select(q.bitAnd(q.l("flags")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT BIT_AND($1)");
        expect(parameters).toEqual(["flags"]);
    });

    it("builds bit_or", () => {
        const builder = q.select(q.bitOr(q.l("flags")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT BIT_OR($1)");
        expect(parameters).toEqual(["flags"]);
    });

    it("builds bit_xor", () => {
        const builder = q.select(q.bitXor(q.l("flags")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT BIT_XOR($1)");
        expect(parameters).toEqual(["flags"]);
    });

    it("builds bool_and", () => {
        const builder = q.select(q.boolAnd(q.l("is_active")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT BOOL_AND($1)");
        expect(parameters).toEqual(["is_active"]);
    });

    it("builds bool_or", () => {
        const builder = q.select(q.boolOr(q.l("is_active")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT BOOL_OR($1)");
        expect(parameters).toEqual(["is_active"]);
    });

    it("builds count", () => {
        const builder = q.select(q.count(q.l("*")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT COUNT($1)");
        expect(parameters).toEqual(["*"]);
    });

    it("builds count with expression", () => {
        const builder = q.select(q.count(q.l("employee_id")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT COUNT($1)");
        expect(parameters).toEqual(["employee_id"]);
    });

    it("builds every", () => {
        const builder = q.select(q.every(q.l("is_active")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT EVERY($1)");
        expect(parameters).toEqual(["is_active"]);
    });

    it("builds json_agg", () => {
        const builder = q.select(q.jsonAgg(q.l("data")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT JSON_AGG($1)");
        expect(parameters).toEqual(["data"]);
    });

    it("builds jsonb_agg", () => {
        const builder = q.select(q.jsonbAgg(q.l("data")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT JSONB_AGG($1)");
        expect(parameters).toEqual(["data"]);
    });

    it("builds json_agg_strict", () => {
        const builder = q.select(q.jsonAggStrict(q.l("data")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT JSON_AGG_STRICT($1)");
        expect(parameters).toEqual(["data"]);
    });

    it("builds jsonb_agg_strict", () => {
        const builder = q.select(q.jsonbAggStrict(q.l("data")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT JSONB_AGG_STRICT($1)");
        expect(parameters).toEqual(["data"]);
    });

    it("builds json_arrayagg", () => {
        const builder = q.select(q.jsonArrayagg(q.l("value")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT JSON_ARRAYAGG($1)");
        expect(parameters).toEqual(["value"]);
    });

    it("builds json_objectagg", () => {
        const builder = q.select(q.jsonObjectagg(q.l("key"), q.l("value")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT JSON_OBJECTAGG($1, $2)");
        expect(parameters).toEqual(["key", "value"]);
    });

    it("builds json_object_agg", () => {
        const builder = q.select(q.jsonObjectAgg(q.l("name"), q.l("value")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT JSON_OBJECT_AGG($1, $2)");
        expect(parameters).toEqual(["name", "value"]);
    });

    it("builds jsonb_object_agg", () => {
        const builder = q.select(q.jsonbObjectAgg(q.l("name"), q.l("value")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT JSONB_OBJECT_AGG($1, $2)");
        expect(parameters).toEqual(["name", "value"]);
    });

    it("builds json_object_agg_strict", () => {
        const builder = q.select(q.jsonObjectAggStrict(q.l("name"), q.l("value")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT JSON_OBJECT_AGG_STRICT($1, $2)");
        expect(parameters).toEqual(["name", "value"]);
    });

    it("builds jsonb_object_agg_strict", () => {
        const builder = q.select(q.jsonbObjectAggStrict(q.l("name"), q.l("value")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT JSONB_OBJECT_AGG_STRICT($1, $2)");
        expect(parameters).toEqual(["name", "value"]);
    });

    it("builds json_object_agg_unique", () => {
        const builder = q.select(q.jsonObjectAggUnique(q.l("name"), q.l("value")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT JSON_OBJECT_AGG_UNIQUE($1, $2)");
        expect(parameters).toEqual(["name", "value"]);
    });

    it("builds jsonb_object_agg_unique", () => {
        const builder = q.select(q.jsonbObjectAggUnique(q.l("name"), q.l("value")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT JSONB_OBJECT_AGG_UNIQUE($1, $2)");
        expect(parameters).toEqual(["name", "value"]);
    });

    it("builds json_object_agg_unique_strict", () => {
        const builder = q.select(q.jsonObjectAggUniqueStrict(q.l("name"), q.l("value")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT JSON_OBJECT_AGG_UNIQUE_STRICT($1, $2)");
        expect(parameters).toEqual(["name", "value"]);
    });

    it("builds jsonb_object_agg_unique_strict", () => {
        const builder = q.select(q.jsonbObjectAggUniqueStrict(q.l("name"), q.l("value")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT JSONB_OBJECT_AGG_UNIQUE_STRICT($1, $2)");
        expect(parameters).toEqual(["name", "value"]);
    });

    it("builds max", () => {
        const builder = q.select(q.max(q.l("salary")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT MAX($1)");
        expect(parameters).toEqual(["salary"]);
    });

    it("builds min", () => {
        const builder = q.select(q.min(q.l("salary")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT MIN($1)");
        expect(parameters).toEqual(["salary"]);
    });

    it("builds range_agg", () => {
        const builder = q.select(q.rangeAgg(q.l("date_range")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT RANGE_AGG($1)");
        expect(parameters).toEqual(["date_range"]);
    });

    it("builds range_intersect_agg", () => {
        const builder = q.select(q.rangeIntersectAgg(q.l("date_range")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT RANGE_INTERSECT_AGG($1)");
        expect(parameters).toEqual(["date_range"]);
    });

    it("builds string_agg", () => {
        const builder = q.select(q.stringAgg(q.l("name"), q.l(",")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT STRING_AGG($1, $2)");
        expect(parameters).toEqual(["name", ","]);
    });

    it("builds sum", () => {
        const builder = q.select(q.sum(q.l("salary")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT SUM($1)");
        expect(parameters).toEqual(["salary"]);
    });

    it("builds xmlagg", () => {
        const builder = q.select(q.xmlagg(q.l("xmldata")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT XMLAGG($1)");
        expect(parameters).toEqual(["xmldata"]);
    });
});

describe("aggregate functions - statistics", () => {
    it("builds corr", () => {
        const builder = q.select(q.corr(q.l("y"), q.l("x")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT CORR($1, $2)");
        expect(parameters).toEqual(["y", "x"]);
    });

    it("builds covar_pop", () => {
        const builder = q.select(q.covarPop(q.l("y"), q.l("x")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT COVAR_POP($1, $2)");
        expect(parameters).toEqual(["y", "x"]);
    });

    it("builds covar_samp", () => {
        const builder = q.select(q.covarSamp(q.l("y"), q.l("x")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT COVAR_SAMP($1, $2)");
        expect(parameters).toEqual(["y", "x"]);
    });

    it("builds regr_avgx", () => {
        const builder = q.select(q.regrAvgx(q.l("y"), q.l("x")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT REGR_AVGX($1, $2)");
        expect(parameters).toEqual(["y", "x"]);
    });

    it("builds regr_avgy", () => {
        const builder = q.select(q.regrAvgy(q.l("y"), q.l("x")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT REGR_AVGY($1, $2)");
        expect(parameters).toEqual(["y", "x"]);
    });

    it("builds regr_count", () => {
        const builder = q.select(q.regrCount(q.l("y"), q.l("x")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT REGR_COUNT($1, $2)");
        expect(parameters).toEqual(["y", "x"]);
    });

    it("builds regr_intercept", () => {
        const builder = q.select(q.regrIntercept(q.l("y"), q.l("x")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT REGR_INTERCEPT($1, $2)");
        expect(parameters).toEqual(["y", "x"]);
    });

    it("builds regr_r2", () => {
        const builder = q.select(q.regrR2(q.l("y"), q.l("x")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT REGR_R2($1, $2)");
        expect(parameters).toEqual(["y", "x"]);
    });

    it("builds regr_slope", () => {
        const builder = q.select(q.regrSlope(q.l("y"), q.l("x")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT REGR_SLOPE($1, $2)");
        expect(parameters).toEqual(["y", "x"]);
    });

    it("builds regr_sxx", () => {
        const builder = q.select(q.regrSxx(q.l("y"), q.l("x")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT REGR_SXX($1, $2)");
        expect(parameters).toEqual(["y", "x"]);
    });

    it("builds regr_sxy", () => {
        const builder = q.select(q.regrSxy(q.l("y"), q.l("x")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT REGR_SXY($1, $2)");
        expect(parameters).toEqual(["y", "x"]);
    });

    it("builds regr_syy", () => {
        const builder = q.select(q.regrSyy(q.l("y"), q.l("x")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT REGR_SYY($1, $2)");
        expect(parameters).toEqual(["y", "x"]);
    });

    it("builds stddev", () => {
        const builder = q.select(q.stddev(q.l("score")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT STDDEV($1)");
        expect(parameters).toEqual(["score"]);
    });

    it("builds stddev_pop", () => {
        const builder = q.select(q.stddevPop(q.l("score")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT STDDEV_POP($1)");
        expect(parameters).toEqual(["score"]);
    });

    it("builds stddev_samp", () => {
        const builder = q.select(q.stddevSamp(q.l("score")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT STDDEV_SAMP($1)");
        expect(parameters).toEqual(["score"]);
    });

    it("builds variance", () => {
        const builder = q.select(q.variance(q.l("score")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT VARIANCE($1)");
        expect(parameters).toEqual(["score"]);
    });

    it("builds var_pop", () => {
        const builder = q.select(q.varPop(q.l("score")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT VAR_POP($1)");
        expect(parameters).toEqual(["score"]);
    });

    it("builds var_samp", () => {
        const builder = q.select(q.varSamp(q.l("score")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT VAR_SAMP($1)");
        expect(parameters).toEqual(["score"]);
    });
});

describe("aggregate functions - ordered-set", () => {
    it("builds mode", () => {
        const builder = q.select(q.mode(q.l("salary")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT MODE($1)");
        expect(parameters).toEqual(["salary"]);
    });

    it("builds percentile_cont", () => {
        const builder = q.select(q.percentileCont(q.l(0.5)));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT PERCENTILE_CONT($1)");
        expect(parameters).toEqual([0.5]);
    });

    it("builds percentile_disc", () => {
        const builder = q.select(q.percentileDisc(q.l(0.5)));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT PERCENTILE_DISC($1)");
        expect(parameters).toEqual([0.5]);
    });
});

describe("aggregate functions - hypothetical-set", () => {
    it("builds rank", () => {
        const builder = q.select(q.rank(q.l("salary")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT RANK($1)");
        expect(parameters).toEqual(["salary"]);
    });

    it("builds dense_rank", () => {
        const builder = q.select(q.denseRank(q.l("salary")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT DENSE_RANK($1)");
        expect(parameters).toEqual(["salary"]);
    });

    it("builds percent_rank", () => {
        const builder = q.select(q.percentRank(q.l("salary")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT PERCENT_RANK($1)");
        expect(parameters).toEqual(["salary"]);
    });

    it("builds cume_dist", () => {
        const builder = q.select(q.cumeDist(q.l("salary")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT CUME_DIST($1)");
        expect(parameters).toEqual(["salary"]);
    });
});

describe("aggregate functions - grouping operations", () => {
    it("builds grouping", () => {
        const builder = q.select(q.grouping(q.l("column1"), q.l("column2")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT GROUPING($1, $2)");
        expect(parameters).toEqual(["column1", "column2"]);
    });

    it("builds grouping with single expression", () => {
        const builder = q.select(q.grouping(q.l("column1")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT GROUPING($1)");
        expect(parameters).toEqual(["column1"]);
    });
});
