import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../index";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async () => ({}),
});

describe("enum functions", () => {
    it("builds enum_first", () => {
        const builder = q.select().enumFirst(q.rawString("NULL::rainbow"));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT ENUM_FIRST(NULL::rainbow)");
        expect(parameters).toEqual([]);
    });

    it("builds enum_last", () => {
        const builder = q.select(q.enumLast(q.rawString("NULL::rainbow")));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT ENUM_LAST(NULL::rainbow)");
        expect(parameters).toEqual([]);
    });

    it("builds enum_range with two args", () => {
        const builder = q.select(q.enumRange("orange", "green"));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT ENUM_RANGE($1, $2)");
        expect(parameters).toEqual(["orange", "green"]);
    });
});
