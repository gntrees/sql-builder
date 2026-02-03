import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../index";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async () => ({}),
});

describe("conflict handling", () => {
    it("conflictDoNothingQuery", () => {
        const builder = q
            .insert("users", {
                name: "john",
                email: "john@example.com",
            })
            .onConflictDoNothing({
                target: ["users.email"],
                targetWhere: q.i("users.is_active").op("=").l(true),
            });

        const sql = builder.getSql();
        const parameters = builder.getParameters();

        // Using actual generated SQL (pg format)
        expect(sql).toBe('INSERT INTO users (name, email) VALUES ($1, $2) ON CONFLICT (users.email) WHERE users.is_active = $3 DO NOTHING');
        expect(parameters).toEqual(["john", "john@example.com", true]);
    });

    it("conflictDoUpdateQuery", () => {
        const builder = q
            .insert("users", {
                name: "donna",
                email: "donna@example.com",
            })
            .onConflictDoUpdate({
                target: ["users.email"],
                targetWhere: q.i("users.is_active").op("=").l(true),
                set: {
                    name: "donna",
                    updated_at: q.r`NOW()`,
                },
                setWhere: q.i("users.is_deleted").op("=").l(false),
            })
            .returning("id");

        const sql = builder.getSql();
        const parameters = builder.getParameters();

        // Using actual generated SQL (pg format)
        expect(sql).toBe('INSERT INTO users (name, email) VALUES ($1, $2) ON CONFLICT (users.email) WHERE users.is_active = $3 DO UPDATE SET name = $4, updated_at = NOW() WHERE users.is_deleted = $5 RETURNING id');
        expect(parameters).toEqual(["donna", "donna@example.com", true, "donna", false]);
    });
});