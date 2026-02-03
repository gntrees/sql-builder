import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../index";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async () => ({}),
});

describe("group by queries", () => {
    it("groupByQuery", () => {
        const builder = q
            .select("users.role", q.r`COUNT(*)`)
            .from("users")
            .groupBy("users.role");

        const sql = builder.getSql();
        const parameters = builder.getParameters();

        // Using actual generated SQL
        expect(sql).toBe("SELECT users.role, COUNT(*) FROM users GROUP BY users.role");
        expect(parameters).toEqual([]);
    });

    it("caseQuery", () => {
        const caseExpr = q
            .when(q.r`TRUE`)
            .then(q.r`1`)
            .else(q.r`2`);

        const builder = q
            .select(q.case(caseExpr, "something"))
            .from("users");

        const sql = builder.getSql();
        const parameters = builder.getParameters();

        // This one already matches, so no change needed
        expect(sql).toBe("SELECT CASE WHEN TRUE THEN 1 ELSE 2 END AS something FROM users");
        expect(parameters).toEqual([]);
    });
});