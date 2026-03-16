import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../../../pg";
import { expectQuery } from "./test-helpers";

const q = sqlBuilder()
    .setFormatParamHandler("pg")
    .setExecutionHandler(async () => ({}));

describe("aggregate functions - general purpose", () => {
    it("builds any_value", () => {
        const builder = q.select(q.anyValue(q.l("salary")));
        expectQuery(builder, "aggregates", "any_value");
    });

    it("builds array_agg", () => {
        const builder = q.select(q.arrayAgg(q.l("salary")));
        expectQuery(builder, "aggregates", "array_agg");
    });

    it("builds avg", () => {
        const builder = q.select(q.avg(q.l("salary")));
        expectQuery(builder, "aggregates", "avg");
    });

    it("builds bit_and", () => {
        const builder = q.select(q.bitAnd(q.l("flags")));
        expectQuery(builder, "aggregates", "bit_and");
    });

    it("builds bit_or", () => {
        const builder = q.select(q.bitOr(q.l("flags")));
        expectQuery(builder, "aggregates", "bit_or");
    });

    it("builds bit_xor", () => {
        const builder = q.select(q.bitXor(q.l("flags")));
        expectQuery(builder, "aggregates", "bit_xor");
    });

    it("builds bool_and", () => {
        const builder = q.select(q.boolAnd(q.l("is_active")));
        expectQuery(builder, "aggregates", "bool_and");
    });

    it("builds bool_or", () => {
        const builder = q.select(q.boolOr(q.l("is_active")));
        expectQuery(builder, "aggregates", "bool_or");
    });

    it("builds count", () => {
        const builder = q.select(q.count(q.l("*")));
        expectQuery(builder, "aggregates", "count");
    });

    it("builds count with expression", () => {
        const builder = q.select(q.count(q.l("employee_id")));
        expectQuery(builder, "aggregates", "count with expression");
    });

    it("builds every", () => {
        const builder = q.select(q.every(q.l("is_active")));
        expectQuery(builder, "aggregates", "every");
    });

    it("builds json_agg", () => {
        const builder = q.select(q.jsonAgg(q.l("data")));
        expectQuery(builder, "aggregates", "json_agg");
    });

    it("builds jsonb_agg", () => {
        const builder = q.select(q.jsonbAgg(q.l("data")));
        expectQuery(builder, "aggregates", "jsonb_agg");
    });

    it("builds json_agg_strict", () => {
        const builder = q.select(q.jsonAggStrict(q.l("data")));
        expectQuery(builder, "aggregates", "json_agg_strict");
    });

    it("builds jsonb_agg_strict", () => {
        const builder = q.select(q.jsonbAggStrict(q.l("data")));
        expectQuery(builder, "aggregates", "jsonb_agg_strict");
    });

    it("builds json_arrayagg", () => {
        const builder = q.select(q.jsonArrayagg(q.l("value")));
        expectQuery(builder, "aggregates", "json_arrayagg");
    });

    it("builds json_objectagg", () => {
        const builder = q.select(q.jsonObjectagg(q.l("key"), q.l("value")));
        expectQuery(builder, "aggregates", "json_objectagg");
    });

    it("builds json_object_agg", () => {
        const builder = q.select(q.jsonObjectAgg(q.l("name"), q.l("value")));
        expectQuery(builder, "aggregates", "json_object_agg");
    });

    it("builds jsonb_object_agg", () => {
        const builder = q.select(q.jsonbObjectAgg(q.l("name"), q.l("value")));
        expectQuery(builder, "aggregates", "jsonb_object_agg");
    });

    it("builds json_object_agg_strict", () => {
        const builder = q.select(q.jsonObjectAggStrict(q.l("name"), q.l("value")));
        expectQuery(builder, "aggregates", "json_object_agg_strict");
    });

    it("builds jsonb_object_agg_strict", () => {
        const builder = q.select(q.jsonbObjectAggStrict(q.l("name"), q.l("value")));
        expectQuery(builder, "aggregates", "jsonb_object_agg_strict");
    });

    it("builds json_object_agg_unique", () => {
        const builder = q.select(q.jsonObjectAggUnique(q.l("name"), q.l("value")));
        expectQuery(builder, "aggregates", "json_object_agg_unique");
    });

    it("builds jsonb_object_agg_unique", () => {
        const builder = q.select(q.jsonbObjectAggUnique(q.l("name"), q.l("value")));
        expectQuery(builder, "aggregates", "jsonb_object_agg_unique");
    });

    it("builds json_object_agg_unique_strict", () => {
        const builder = q.select(q.jsonObjectAggUniqueStrict(q.l("name"), q.l("value")));
        expectQuery(builder, "aggregates", "json_object_agg_unique_strict");
    });

    it("builds jsonb_object_agg_unique_strict", () => {
        const builder = q.select(q.jsonbObjectAggUniqueStrict(q.l("name"), q.l("value")));
        expectQuery(builder, "aggregates", "jsonb_object_agg_unique_strict");
    });

    it("builds max", () => {
        const builder = q.select(q.max(q.l("salary")));
        expectQuery(builder, "aggregates", "max");
    });

    it("builds min", () => {
        const builder = q.select(q.min(q.l("salary")));
        expectQuery(builder, "aggregates", "min");
    });

    it("builds range_agg", () => {
        const builder = q.select(q.rangeAgg(q.l("date_range")));
        expectQuery(builder, "aggregates", "range_agg");
    });

    it("builds range_intersect_agg", () => {
        const builder = q.select(q.rangeIntersectAgg(q.l("date_range")));
        expectQuery(builder, "aggregates", "range_intersect_agg");
    });

    it("builds string_agg", () => {
        const builder = q.select(q.stringAgg(q.l("name"), q.l(",")));
        expectQuery(builder, "aggregates", "string_agg");
    });

    it("builds sum", () => {
        const builder = q.select(q.sum(q.l("salary")));
        expectQuery(builder, "aggregates", "sum");
    });

    it("builds xmlagg", () => {
        const builder = q.select(q.xmlagg(q.l("xmldata")));
        expectQuery(builder, "aggregates", "xmlagg");
    });
});

describe("aggregate functions - statistics", () => {
    it("builds corr", () => {
        const builder = q.select(q.corr(q.l("y"), q.l("x")));
        expectQuery(builder, "aggregates", "corr");
    });

    it("builds covar_pop", () => {
        const builder = q.select(q.covarPop(q.l("y"), q.l("x")));
        expectQuery(builder, "aggregates", "covar_pop");
    });

    it("builds covar_samp", () => {
        const builder = q.select(q.covarSamp(q.l("y"), q.l("x")));
        expectQuery(builder, "aggregates", "covar_samp");
    });

    it("builds regr_avgx", () => {
        const builder = q.select(q.regrAvgx(q.l("y"), q.l("x")));
        expectQuery(builder, "aggregates", "regr_avgx");
    });

    it("builds regr_avgy", () => {
        const builder = q.select(q.regrAvgy(q.l("y"), q.l("x")));
        expectQuery(builder, "aggregates", "regr_avgy");
    });

    it("builds regr_count", () => {
        const builder = q.select(q.regrCount(q.l("y"), q.l("x")));
        expectQuery(builder, "aggregates", "regr_count");
    });

    it("builds regr_intercept", () => {
        const builder = q.select(q.regrIntercept(q.l("y"), q.l("x")));
        expectQuery(builder, "aggregates", "regr_intercept");
    });

    it("builds regr_r2", () => {
        const builder = q.select(q.regrR2(q.l("y"), q.l("x")));
        expectQuery(builder, "aggregates", "regr_r2");
    });

    it("builds regr_slope", () => {
        const builder = q.select(q.regrSlope(q.l("y"), q.l("x")));
        expectQuery(builder, "aggregates", "regr_slope");
    });

    it("builds regr_sxx", () => {
        const builder = q.select(q.regrSxx(q.l("y"), q.l("x")));
        expectQuery(builder, "aggregates", "regr_sxx");
    });

    it("builds regr_sxy", () => {
        const builder = q.select(q.regrSxy(q.l("y"), q.l("x")));
        expectQuery(builder, "aggregates", "regr_sxy");
    });

    it("builds regr_syy", () => {
        const builder = q.select(q.regrSyy(q.l("y"), q.l("x")));
        expectQuery(builder, "aggregates", "regr_syy");
    });

    it("builds stddev", () => {
        const builder = q.select(q.stddev(q.l("score")));
        expectQuery(builder, "aggregates", "stddev");
    });

    it("builds stddev_pop", () => {
        const builder = q.select(q.stddevPop(q.l("score")));
        expectQuery(builder, "aggregates", "stddev_pop");
    });

    it("builds stddev_samp", () => {
        const builder = q.select(q.stddevSamp(q.l("score")));
        expectQuery(builder, "aggregates", "stddev_samp");
    });

    it("builds variance", () => {
        const builder = q.select(q.variance(q.l("score")));
        expectQuery(builder, "aggregates", "variance");
    });

    it("builds var_pop", () => {
        const builder = q.select(q.varPop(q.l("score")));
        expectQuery(builder, "aggregates", "var_pop");
    });

    it("builds var_samp", () => {
        const builder = q.select(q.varSamp(q.l("score")));
        expectQuery(builder, "aggregates", "var_samp");
    });
});

describe("aggregate functions - ordered-set", () => {
    it("builds mode", () => {
        const builder = q.select(q.mode(q.l("salary")));
        expectQuery(builder, "aggregates", "mode");
    });

    it("builds percentile_cont", () => {
        const builder = q.select(q.percentileCont(q.l(0.5)));
        expectQuery(builder, "aggregates", "percentile_cont");
    });

    it("builds percentile_disc", () => {
        const builder = q.select(q.percentileDisc(q.l(0.5)));
        expectQuery(builder, "aggregates", "percentile_disc");
    });
});

describe("aggregate functions - hypothetical-set", () => {
    it("builds rank", () => {
        const builder = q.select(q.rank(q.l("salary")));
        expectQuery(builder, "aggregates", "rank");
    });

    it("builds dense_rank", () => {
        const builder = q.select(q.denseRank(q.l("salary")));
        expectQuery(builder, "aggregates", "dense_rank");
    });

    it("builds percent_rank", () => {
        const builder = q.select(q.percentRank(q.l("salary")));
        expectQuery(builder, "aggregates", "percent_rank");
    });

    it("builds cume_dist", () => {
        const builder = q.select(q.cumeDist(q.l("salary")));
        expectQuery(builder, "aggregates", "cume_dist");
    });
});

describe("aggregate functions - grouping operations", () => {
    it("builds grouping", () => {
        const builder = q.select(q.grouping(q.l("column1"), q.l("column2")));
        expectQuery(builder, "aggregates", "grouping");
    });

    it("builds grouping with single expression", () => {
        const builder = q.select(q.grouping(q.l("column1")));
        expectQuery(builder, "aggregates", "grouping with single expression");
    });
});
