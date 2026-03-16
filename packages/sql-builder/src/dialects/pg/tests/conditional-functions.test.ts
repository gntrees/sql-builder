import { describe, test, expect } from "bun:test";
import { sqlBuilder } from "../../../../pg";
import { expectQuery } from "./test-helpers";

describe("Conditional Functions", () => {
    const q = sqlBuilder()
        .setFormatParamHandler("pg")
        .setExecutionHandler(async () => []);

    test("coalesce with null literal", () => {
        const builder = q
            .select()
            .coalesce(q.l(null), q.l("default"), q.l("value"));
        expectQuery(builder, "conditional", "coalesce with null literal");
    });

    test("nullif with equal values", () => {
        const builder = q
            .select()
            .nullif(q.c("test"), q.c("test"));
        expectQuery(builder, "conditional", "nullif with equal values");
    });

    test("greatest with numbers", () => {
        const builder = q
            .select()
            .greatest(q.l(10), q.l(5), q.l(20), q.l(15));
        expectQuery(builder, "conditional", "greatest with numbers");
    });

    test("least with numbers", () => {
        const builder = q
            .select()
            .least(q.l(10), q.l(5), q.l(20), q.l(15));
        expectQuery(builder, "conditional", "least with numbers");
    });

    test("coalesce in select clause", () => {
        const builder = q
            .select(q.c("id"))
            .coalesce(q.c("name"), q.l("anonymous"))
            .from(q.t("users"));
        expectQuery(builder, "conditional", "coalesce in select clause");
    });

    test("nullif with values", () => {
        const builder = q
            .select()
            .nullif(q.l(100), q.l(100));
        expectQuery(builder, "conditional", "nullif with values");
    });

    test("greatest with column names", () => {
        const builder = q
            .select()
            .greatest(q.c("price_a"), q.c("price_b"), q.c("price_c"))
            .from(q.t("products"));
        expectQuery(builder, "conditional", "greatest with column names");
    });

    test("least with mixed values", () => {
        const builder = q
            .select()
            .least(q.l(100), q.c("min_price"), q.l(50));
        expectQuery(builder, "conditional", "least with mixed values");
    });
});
