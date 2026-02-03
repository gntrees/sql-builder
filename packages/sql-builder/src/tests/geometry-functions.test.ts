import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../index";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async () => ({}),
});

describe("geometry functions", () => {
    it("builds point", () => {
        const builder = q.select(q.point(23.4, -44.5));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT POINT($1, $2)");
        expect(parameters).toEqual([23.4, -44.5]);
    });

    it("builds box of points", () => {
        const builder = q.select(q.box(q.point(1, 0), q.point(-1, 0)));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT BOX(POINT($1, $2), POINT($3, $4))");
        expect(parameters).toEqual([1, 0, -1, 0]);
    });

    it("builds circle", () => {
        const builder = q.select(q.circle(q.point(0, 0), q.l(5)));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT CIRCLE(POINT($1, $2), $3)");
        expect(parameters).toEqual([0, 0, 5]);
    });

    it("builds area", () => {
        const builder = q.select(q.area(q.polygon(q.l(4), q.circle(q.point(0, 0), q.l(1)))));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT AREA(POLYGON($1, CIRCLE(POINT($2, $3), $4)))");
        expect(parameters).toEqual([4, 0, 0, 1]);
    });

    it("builds length", () => {
        const builder = q.select(q.length(q.path(q.point(0, 0))));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT LENGTH(PATH(POINT($1, $2)))");
        expect(parameters).toEqual([0, 0]);
    });
});
