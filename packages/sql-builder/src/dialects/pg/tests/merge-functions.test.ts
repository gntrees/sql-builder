import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../../../pg";
import { expectQuery } from "./test-helpers";

const q = sqlBuilder()
    .setFormatParamHandler("pg")
    .setExecutionHandler(async () => ({}));

describe("merge functions", () => {
    describe("merge_action", () => {
        it("builds merge_action", () => {
            const builder = q.select(q.mergeAction());
            expectQuery(builder, "merge", "merge_action");
        });

        it("builds merge_action with alias", () => {
            const builder = q.select(q.mergeAction().as(q.c("action")));
            expectQuery(builder, "merge", "merge_action with alias");
        });
    });

    describe("complex queries with merge functions", () => {
        it("builds query with merge_action and other columns", () => {
            const builder = q.select(
                q.mergeAction().as(q.c("action_type")),
                q.c("product_id"),
                q.c("in_stock"),
                q.c("quantity"),
            ).from(q.t("products"));
            expectQuery(builder, "merge", "query with merge_action and other columns");
        });
    });
});
