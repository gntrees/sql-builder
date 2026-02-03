import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../index";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async () => ({}),
});

describe("math functions", () => {
    it("builds abs", () => {
        const builder = q.select(q.abs(-17.4));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT ABS($1)");
        expect(parameters).toEqual([-17.4]);
    });

    it("builds log with base", () => {
        const builder = q.select(q.log(2, 64));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT LOG($1, $2)");
        expect(parameters).toEqual([2, 64]);
    });

    it("builds round with scale", () => {
        const builder = q.select(q.round(42.4382, 2));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT ROUND($1, $2)");
        expect(parameters).toEqual([42.4382, 2]);
    });

    it("builds width_bucket", () => {
        const builder = q.select(q.widthBucket(5.35, 0.024, 10.06, 5));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT WIDTH_BUCKET($1, $2, $3, $4)");
        expect(parameters).toEqual([5.35, 0.024, 10.06, 5]);
    });

    it("builds random_normal", () => {
        const builder = q.select(q.randomNormal(0, 1));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT RANDOM_NORMAL($1, $2)");
        expect(parameters).toEqual([0, 1]);
    });

    it("builds pi", () => {
        const builder = q.select(q.pi());
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT PI()");
        expect(parameters).toEqual([]);
    });

    it("builds atan2d", () => {
        const builder = q.select(q.atan2d(1, 0));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT ATAN2D($1, $2)");
        expect(parameters).toEqual([1, 0]);
    });
});
