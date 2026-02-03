import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../index";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async () => ({}),
});

describe("merge functions", () => {
    describe("merge_action", () => {
        it("builds merge_action", () => {
            const builder = q.select(q.mergeAction());
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT MERGE_ACTION()");
            expect(parameters).toEqual([]);
        });

        it("builds merge_action with alias", () => {
            const builder = q.select(q.mergeAction().as("action"));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT MERGE_ACTION() AS action");
            expect(parameters).toEqual([]);
        });
    });

    describe("complex queries with merge functions", () => {
        it("builds query with merge_action and other columns", () => {
            const builder = q.select(
                q.mergeAction().as("action_type"),
                q.c("product_id"),
                q.c("in_stock"),
                q.c("quantity"),
            ).from("products");
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT MERGE_ACTION() AS action_type, product_id, in_stock, quantity FROM products");
            expect(parameters).toEqual([]);
        });
    });
});
