import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../index";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async () => ({}),
});

describe("Range functions (PostgreSQL Table 9.60)", () => {
    it("builds lower for range", () => {
        const builder = q.select(q.lower(q.c("price_range")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT LOWER(price_range)");
        expect(parameters).toEqual([]);
    });

    it("builds upper for range", () => {
        const builder = q.select(q.upper(q.c("date_range")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT UPPER(date_range)");
        expect(parameters).toEqual([]);
    });

    it("builds isempty for range", () => {
        const builder = q.select(q.isempty(q.c("time_range")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT ISEMPTY(time_range)");
        expect(parameters).toEqual([]);
    });

    it("builds lowerInc for range", () => {
        const builder = q.select(q.lowerInc(q.c("num_range")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT LOWER_INC(num_range)");
        expect(parameters).toEqual([]);
    });

    it("builds upperInc for range", () => {
        const builder = q.select(q.upperInc(q.c("ts_range")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT UPPER_INC(ts_range)");
        expect(parameters).toEqual([]);
    });

    it("builds lowerInf for range", () => {
        const builder = q.select(q.lowerInf(q.c("int_range")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT LOWER_INF(int_range)");
        expect(parameters).toEqual([]);
    });

    it("builds upperInf for range", () => {
        const builder = q.select(q.upperInf(q.c("bigint_range")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT UPPER_INF(bigint_range)");
        expect(parameters).toEqual([]);
    });

    it("builds rangeMerge", () => {
        const builder = q.select(q.rangeMerge(q.c("range1"), q.c("range2")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT RANGE_MERGE(range1, range2)");
        expect(parameters).toEqual([]);
    });
});

describe("Multirange functions (PostgreSQL Table 9.61)", () => {
    it("builds multirangeLower", () => {
        const builder = q.select(q.multirangeLower(q.c("price_multirange")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT LOWER(price_multirange)");
        expect(parameters).toEqual([]);
    });

    it("builds multirangeUpper", () => {
        const builder = q.select(q.multirangeUpper(q.c("date_multirange")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT UPPER(date_multirange)");
        expect(parameters).toEqual([]);
    });

    it("builds multirangeIsempty", () => {
        const builder = q.select(q.multirangeIsempty(q.c("time_multirange")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT ISEMPTY(time_multirange)");
        expect(parameters).toEqual([]);
    });

    it("builds multirangeLowerInc", () => {
        const builder = q.select(q.multirangeLowerInc(q.c("num_multirange")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT LOWER_INC(num_multirange)");
        expect(parameters).toEqual([]);
    });

    it("builds multirangeUpperInc", () => {
        const builder = q.select(q.multirangeUpperInc(q.c("ts_multirange")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT UPPER_INC(ts_multirange)");
        expect(parameters).toEqual([]);
    });

    it("builds multirangeLowerInf", () => {
        const builder = q.select(q.multirangeLowerInf(q.c("int_multirange")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT LOWER_INF(int_multirange)");
        expect(parameters).toEqual([]);
    });

    it("builds multirangeUpperInf", () => {
        const builder = q.select(q.multirangeUpperInf(q.c("bigint_multirange")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT UPPER_INF(bigint_multirange)");
        expect(parameters).toEqual([]);
    });

    it("builds multirangeRangeMerge", () => {
        const builder = q.select(q.multirangeRangeMerge(q.c("mr")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT RANGE_MERGE(mr)");
        expect(parameters).toEqual([]);
    });

    it("builds multirange", () => {
        const builder = q.select(q.multirange(q.c("single_range")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT MULTIRANGE(single_range)");
        expect(parameters).toEqual([]);
    });

    it("builds unnestMultirange", () => {
        const builder = q.select(q.unnestMultirange(q.c("my_multirange")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT UNNEST(my_multirange)");
        expect(parameters).toEqual([]);
    });
});
