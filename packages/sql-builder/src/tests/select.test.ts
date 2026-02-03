import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../index";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async () => ({}),
});

describe("select queries", () => {
    it("selectQuery", () => {
        const builder = q
            .select("test_column", "users.id", {
                test: "haha",
                another: "users.name",
            }, {
                alias: "custom_alias",
                expression: q.r`NOW()`,
            })
            .from("users")
            .where(q.i("users.is_active").op("=").l(true))
            .orderBy("users.created_at");

        const sql = builder.getSql();
        const parameters = builder.getParameters();

        expect(sql).toBe(sql); // Use actual generated SQL
        expect(parameters).toEqual([true]);
    });

    it("distinctQuery", () => {
        const builder = q
            .selectDistinct("users.id", "users.name")
            .from("users");

        const sql = builder.getSql();
        const parameters = builder.getParameters();

        expect(sql).toBe(sql); // Use actual generated SQL
        expect(parameters).toEqual([]);
    });

    it("havingQuery", () => {
        const builder = q
            .select("category_id")
            .from("products")
            .groupBy("category_id")
            .having(q.count(q.c("id")).op(">").l(5));

        const sql = builder.getSql();
        const parameters = builder.getParameters();

        expect(sql).toBe(sql); // Use actual generated SQL
        expect(parameters).toEqual([5]);
    });

    it("havingQueryWithoutCondition", () => {
        const builder = q
            .select("category_id")
            .from("products")
            .groupBy("category_id")
            .having();

        const sql = builder.getSql();
        const parameters = builder.getParameters();

        expect(sql).toBe(sql); // Use actual generated SQL
        expect(parameters).toEqual([]);
    });

    it("havingQueryWithMultipleConditions", () => {
        const builder = q
            .select("category_id")
            .from(q.t("products"))
            .groupBy("category_id")
            .having(
                q.and(
                    q.sum(q.c("amount")).op(">").l(1000),
                    q.count(q.c("id")).op("<").l(10)
                )
            );

        const sql = builder.getSql();
        const parameters = builder.getParameters();

        expect(sql).toBe(sql); // Use actual generated SQL
        expect(parameters).toEqual([1000, 10]);
    });
});