import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../index";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async () => ({}),
});

describe("Window Functions", () => {
    it("rowNumber", () => {
        const builder = q.select(q.rowNumber());
        const sql = builder.getSql();
        expect(sql).toContain("ROW_NUMBER()");
    });

    it("ntile with parameter", () => {
        const builder = q.select(q.ntile(q.v(4)));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toContain("NTILE($1)");
        expect(parameters).toEqual([4]);
    });

    it("lag with value only", () => {
        const builder = q.select(q.lag(q.c("salary")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toContain("LAG(salary)");
        expect(parameters).toEqual([]);
    });

    it("lag with offset", () => {
        const builder = q.select(q.lag(q.c("salary"), q.v(1)));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toContain("LAG(salary, $1)");
        expect(parameters).toEqual([1]);
    });

    it("lag with offset and default", () => {
        const builder = q.select(q.lag(q.c("salary"), q.v(1), q.v(0)));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toContain("LAG(salary, $1, $2)");
        expect(parameters).toEqual([1, 0]);
    });

    it("lead with value only", () => {
        const builder = q.select(q.lead(q.c("salary")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toContain("LEAD(salary)");
        expect(parameters).toEqual([]);
    });

    it("lead with offset and default", () => {
        const builder = q.select(q.lead(q.c("salary"), q.v(1), q.v(0)));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toContain("LEAD(salary, $1, $2)");
        expect(parameters).toEqual([1, 0]);
    });

    it("firstValue", () => {
        const builder = q.select(q.firstValue(q.c("salary")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toContain("FIRST_VALUE(salary)");
        expect(parameters).toEqual([]);
    });

    it("lastValue", () => {
        const builder = q.select(q.lastValue(q.c("salary")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toContain("LAST_VALUE(salary)");
        expect(parameters).toEqual([]);
    });

    it("nthValue", () => {
        const builder = q.select(q.nthValue(q.c("salary"), q.v(2)));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toContain("NTH_VALUE(salary, $1)");
        expect(parameters).toEqual([2]);
    });
});
