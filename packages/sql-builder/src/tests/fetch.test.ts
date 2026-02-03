import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../index";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async () => ({}),
});

describe("fetch queries", () => {
    it("fetchQuery", () => {
        const builder = q
            .select("*")
            .from("users")
            .orderBy("users.created_at")
            .fetch(10);

        const sql = builder.getSql();
        const parameters = builder.getParameters();

        // Using actual generated SQL
        expect(sql).toBe("SELECT * FROM users ORDER BY users.created_at FETCH FIRST $1 ROWS ONLY");
        expect(parameters).toEqual([10]);
    });

    it("fetchNextQuery", () => {
        const builder = q
            .select("*")
            .from("users")
            .orderBy("users.created_at")
            .fetch(10, "next");

        const sql = builder.getSql();
        const parameters = builder.getParameters();

        // Using actual generated SQL
        expect(sql).toBe("SELECT * FROM users ORDER BY users.created_at FETCH NEXT $1 ROWS ONLY");
        expect(parameters).toEqual([10]);
    });

    it("fetchWithTiesQuery", () => {
        const builder = q
            .select("*")
            .from("users")
            .orderBy("users.created_at")
            .fetch(10, "first", true);

        const sql = builder.getSql();
        const parameters = builder.getParameters();

        // Using actual generated SQL
        expect(sql).toBe("SELECT * FROM users ORDER BY users.created_at FETCH FIRST $1 ROWS WITH TIES");
        expect(parameters).toEqual([10]);
    });
});