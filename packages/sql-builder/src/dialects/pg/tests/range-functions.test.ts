import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../../../pg";
import { expectQuery } from "./test-helpers";

const q = sqlBuilder()
    .setFormatParamHandler("pg")
    .setExecutionHandler(async () => ({}));

describe("Range functions (PostgreSQL Table 9.60)", () => {
    it("builds lower for range", () => {
        const builder = q.select(q.lower(q.c("price_range")));
        expectQuery(builder, "range", "lower for range");
    });

    it("builds upper for range", () => {
        const builder = q.select(q.upper(q.c("date_range")));
        expectQuery(builder, "range", "upper for range");
    });

    it("builds isempty for range", () => {
        const builder = q.select(q.isempty(q.c("time_range")));
        expectQuery(builder, "range", "isempty for range");
    });

    it("builds lowerInc for range", () => {
        const builder = q.select(q.lowerInc(q.c("num_range")));
        expectQuery(builder, "range", "lowerInc for range");
    });

    it("builds upperInc for range", () => {
        const builder = q.select(q.upperInc(q.c("ts_range")));
        expectQuery(builder, "range", "upperInc for range");
    });

    it("builds lowerInf for range", () => {
        const builder = q.select(q.lowerInf(q.c("int_range")));
        expectQuery(builder, "range", "lowerInf for range");
    });

    it("builds upperInf for range", () => {
        const builder = q.select(q.upperInf(q.c("bigint_range")));
        expectQuery(builder, "range", "upperInf for range");
    });

    it("builds rangeMerge", () => {
        const builder = q.select(q.rangeMerge(q.c("range1"), q.c("range2")));
        expectQuery(builder, "range", "rangeMerge");
    });
});

describe("Multirange functions (PostgreSQL Table 9.61)", () => {
    it("builds multirangeLower", () => {
        const builder = q.select(q.lower(q.c("price_multirange")));
        expectQuery(builder, "range", "multirangeLower");
    });

    it("builds multirangeUpper", () => {
        const builder = q.select(q.upper(q.c("date_multirange")));
        expectQuery(builder, "range", "multirangeUpper");
    });

    it("builds multirangeIsempty", () => {
        const builder = q.select(q.isempty(q.c("time_multirange")));
        expectQuery(builder, "range", "multirangeIsempty");
    });

    it("builds multirangeLowerInc", () => {
        const builder = q.select(q.lowerInc(q.c("num_multirange")));
        expectQuery(builder, "range", "multirangeLowerInc");
    });

    it("builds multirangeUpperInc", () => {
        const builder = q.select(q.upperInc(q.c("ts_multirange")));
        expectQuery(builder, "range", "multirangeUpperInc");
    });

    it("builds multirangeLowerInf", () => {
        const builder = q.select(q.lowerInf(q.c("int_multirange")));
        expectQuery(builder, "range", "multirangeLowerInf");
    });

    it("builds multirangeUpperInf", () => {
        const builder = q.select(q.upperInf(q.c("bigint_multirange")));
        expectQuery(builder, "range", "multirangeUpperInf");
    });

    it("builds multirangeRangeMerge", () => {
        const builder = q.select(q.rangeMerge(q.c("mr")));
        expectQuery(builder, "range", "multirangeRangeMerge");
    });

    it("builds multirange", () => {
        const builder = q.select(q.multirange(q.c("single_range")));
        expectQuery(builder, "range", "multirange");
    });

    it("builds unnestMultirange", () => {
        const builder = q.select(q.unnest(q.c("my_multirange")));
        expectQuery(builder, "range", "unnestMultirange");
    });
});
