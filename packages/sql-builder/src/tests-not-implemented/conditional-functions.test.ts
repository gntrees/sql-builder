import { describe, test, expect } from "bun:test";
import { sqlBuilder } from "../../index";

describe("Conditional Functions", () => {
    const db = {
        execHandler: async () => [],
        formatParamHandler: "pg" as const,
    };

    test("coalesce with null literal", () => {
        const q = sqlBuilder(db);
        const { sql, parameters } = q
            .select()
            .coalesce(q.l(null), q.l("default"), q.l("value"))
            .getSqlAndParameters();

        expect(sql).toContain("COALESCE($1, $2, $3)");
        expect(parameters).toEqual([null, "default", "value"]);
    });

    test("nullif with equal values", () => {
        const q = sqlBuilder(db);
        const { sql } = q
            .select()
            .nullif(q.c("test"), q.c("test"))
            .getSqlAndParameters();
        expect(sql).toContain("NULLIF");
    });

    test("greatest with numbers", () => {
        const q = sqlBuilder(db);
        const { sql } = q
            .select()
            .greatest(q.l(10), q.l(5), q.l(20), q.l(15))
            .getSqlAndParameters();
        expect(sql).toContain("GREATEST");
    });

    test("least with numbers", () => {
        const q = sqlBuilder(db);
        const { sql } = q
            .select()
            .least(q.l(10), q.l(5), q.l(20), q.l(15))
            .getSqlAndParameters();
        expect(sql).toContain("LEAST");
    });

    test("coalesce in select clause", () => {
        const q = sqlBuilder(db);
        const { sql } = q
            .select("id")
            .coalesce(q.c("name"), q.l("anonymous"))
            .from("users")
            .getSqlAndParameters();
        expect(sql).toContain("SELECT");
        expect(sql).toContain("COALESCE");
        expect(sql).toContain("FROM");
    });

    test("nullif with values", () => {
        const q = sqlBuilder(db);
        const { sql } = q
            .select()
            .nullif(q.l(100), q.l(100))
            .getSqlAndParameters();
        expect(sql).toContain("NULLIF");
    });

    test("greatest with column names", () => {
        const q = sqlBuilder(db);
        const { sql } = q
            .select()
            .greatest(q.c("price_a"), q.c("price_b"), q.c("price_c"))
            .from("products")
            .getSqlAndParameters();
        expect(sql).toContain("GREATEST");
    });

    test("least with mixed values", () => {
        const q = sqlBuilder(db);
        const { sql } = q
            .select()
            .least(q.l(100), q.c("min_price"), q.l(50))
            .getSqlAndParameters();
        expect(sql).toContain("LEAST");
    });
});
