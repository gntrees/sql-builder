import { describe, it, expect } from "bun:test";
import { sqlBuilder } from "../../index";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async () => ({}),
});

describe("statistics functions", () => {
    describe("pg_mcv_list_items", () => {
        it("builds pg_mcv_list_items with identifier", () => {
            const builder = q.select(q.pgMcvListItems(q.i("stxdmcv")));
            expect(builder.getSql()).toBe("SELECT PG_MCV_LIST_ITEMS(stxdmcv)");
        });

        it("builds pg_mcv_list_items with literal", () => {
            const builder = q.select(q.pgMcvListItems(q.l("some_mcv_list")));
            const sql = builder.getSql();
            const params = builder.getParameters();
            expect(sql).toBe("SELECT PG_MCV_LIST_ITEMS($1)");
            expect(params).toEqual(["some_mcv_list"]);
        });

        it("builds pg_mcv_list_items without parameters", () => {
            const builder = q.select(q.pgMcvListItems());
            expect(builder.getSql()).toBe("SELECT PG_MCV_LIST_ITEMS()");
        });
    });
});
