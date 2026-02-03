import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../index";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async () => ({}),
});

describe("CTE and subquery tests", () => {
    it("subSelectQuery", () => {
        const subQuery = q
            .select("id")
            .from("admins");

        const builder = q
            .select(q.sub(subQuery).as("admin_ids"))
            .from("users");

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT (SELECT id FROM admins) AS admin_ids FROM users");
        expect(parameters).toEqual([]);
    });

    it("cteQuery", () => {
        const builder = q
            .with("admins_cte", q.select("id").from("admins"));

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("WITH admins_cte AS (SELECT id FROM admins)");
        expect(parameters).toEqual([]);
    });

    it("cteSelectQuery", () => {
        const cteQuery = q
            .with("admins_cte", q.select("id").from("admins"));

        const builder = q
            .select("*")
            .from("admins_cte");

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT * FROM admins_cte");
        expect(parameters).toEqual([]);
    });
});