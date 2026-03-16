import { describe, it, expect } from "bun:test";
import { sqlBuilder } from "../../../../pg";
import { expectQuery } from "./test-helpers";

const q = sqlBuilder()
    .setFormatParamHandler("pg")
    .setExecutionHandler(async () => ({}));

describe("statistics functions", () => {
    describe("pg_mcv_list_items", () => {
        it("builds pg_mcv_list_items with identifier", () => {
            const builder = q.select(q.pgMcvListItems(q.i("stxdmcv")));
            expectQuery(builder, "statistics", "pg_mcv_list_items with identifier");
        });

        it("builds pg_mcv_list_items with literal", () => {
            const builder = q.select(q.pgMcvListItems(q.l("some_mcv_list")));
            expectQuery(builder, "statistics", "pg_mcv_list_items with literal");
        });

        it("builds pg_mcv_list_items without parameters", () => {
            const builder = q.select(q.pgMcvListItems());
            expectQuery(builder, "statistics", "pg_mcv_list_items without parameters");
        });
    });
});
