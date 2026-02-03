import { describe, it, expect } from "bun:test";
import { sqlBuilder } from "../../index";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async () => ({}),
});

describe("Sequence Functions", () => {
    describe("nextval", () => {
        it("builds nextval function", () => {
            const builder = q.select(q.nextval("my_sequence"));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT NEXTVAL($1)");
            expect(parameters).toEqual(["my_sequence"]);
        });
    });

    describe("setval", () => {
        it("builds setval function with 2 parameters", () => {
            const builder = q.select(q.setval("my_sequence", 42));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT SETVAL($1, $2)");
            expect(parameters).toEqual(["my_sequence", 42]);
        });

        it("builds setval function with 3 parameters", () => {
            const builder = q.select(q.setval("my_sequence", 42, true));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT SETVAL($1, $2, $3)");
            expect(parameters).toEqual(["my_sequence", 42, true]);
        });
    });

    describe("currval", () => {
        it("builds currval function", () => {
            const builder = q.select(q.currval("my_sequence"));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT CURRVAL($1)");
            expect(parameters).toEqual(["my_sequence"]);
        });
    });

    describe("lastval", () => {
        it("builds lastval function", () => {
            const builder = q.select(q.lastval());
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT LASTVAL()");
            expect(parameters).toEqual([]);
        });
    });
});
