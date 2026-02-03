import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../index";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async () => ({}),
});

describe("insert queries", () => {
    it("insertQuery", () => {
        const builder = q
            .insertInto("users",[ "name", "email"])
            .values(["john", q.r`LOWER('John@Example.com')`], ["doe", q.r`LOWER('John@Example.com')`]);

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("INSERT INTO users (name, email) VALUES ($1, LOWER('John@Example.com')), ($2, LOWER('John@Example.com'))");
        expect(parameters).toEqual(["john", "doe"]);
    });

    it("insertRecordQuery", () => {
        const builder = q
            .insert("users", [{
                name: "maria",
                email: q.r`LOWER('Maria@Example.com')`,
            }, {
                name: "lia",
                email: q.r`LOWER('Lia@Example.com')`,
            }]);

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("INSERT INTO users (name, email) VALUES ($1, LOWER('Maria@Example.com')), ($2, LOWER('Lia@Example.com'))");
        expect(parameters).toEqual(["maria", "lia"]);
    });

    it("returningQuery", () => {
        const builder = q
            .insert("users", {
                name: "lara",
                email: q.r`LOWER('Lara@Example.com')`,
            })
            .returning("id");

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("INSERT INTO users (name, email) VALUES ($1, LOWER('Lara@Example.com')) RETURNING id");
        expect(parameters).toEqual(["lara"]);
    });
});