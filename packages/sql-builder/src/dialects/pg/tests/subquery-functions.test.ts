import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../../../pg";
import { expectQuery } from "./test-helpers";

const q = sqlBuilder()
    .setFormatParamHandler("pg")
    .setExecutionHandler(async () => ({}));

describe("subquery expressions", () => {
    describe("EXISTS", () => {
        it("builds EXISTS with simple subquery", () => {
            const subquery = q.select("*").from(q.t("orders")).where(
                q.i("orders.user_id").op("=").i("users.id")
            );
            const builder = q.select("*").from(q.t("users")).where(
                q.exists(subquery)
            );
            expectQuery(builder, "subquery", "EXISTS with simple subquery");
        });

        it("builds EXISTS with complex subquery", () => {
            const subquery = q.select(q.l(1)).from(q.t("order_items")).where(
                q.i("order_items.product_id").op("=").i("products.id")
            ).and(
                q.i("order_items.quantity").op(">").l(10)
            );
            const builder = q.select("*").from(q.t("products")).where(
                q.exists(subquery)
            );
            expectQuery(builder, "subquery", "EXISTS with complex subquery");
        });
    });

    describe("NOT EXISTS", () => {
        it("builds NOT EXISTS with simple subquery", () => {
            const subquery = q.select("*").from(q.t("banned_users")).where(
                q.i("banned_users.user_id").op("=").i("users.id")
            );
            const builder = q.select("*").from(q.t("users")).where(
                q.notExists(subquery)
            );
            expectQuery(builder, "subquery", "NOT EXISTS with simple subquery");
        });

        it("builds NOT EXISTS with parameterized subquery", () => {
            const subquery = q.select("*").from(q.t("excursions")).where(
                q.i("excursions.employee_id").op("=").i("employees.id")
            ).and(
                q.i("excursions.date").op(">").l(2024)
            );
            const builder = q.select("*").from(q.t("employees")).where(
                q.notExists(subquery)
            );
            expectQuery(builder, "subquery", "NOT EXISTS with parameterized subquery");
        });
    });

    describe("IN", () => {
        it("builds IN with subquery", () => {
            const subquery = q.select(q.c("user_id")).from(q.t("premium_users"));
            const builder = q.select("*").from(q.t("users")).where(
                q.i("id").in(subquery)
            );
            expectQuery(builder, "subquery", "IN with subquery");
        });

        it("builds IN with qualified column", () => {
            const subquery = q.select(q.c("id")).from(q.t("active_products"));
            const builder = q.select("*").from(q.t("orders")).where(
                q.i("orders.product_id").in(subquery)
            );
            expectQuery(builder, "subquery", "IN with qualified column");
        });

        it("builds IN with parameterized subquery", () => {
            const subquery = q.select(q.c("id")).from(q.t("departments")).where(
                q.i("budget").op(">").l(100000)
            );
            const builder = q.select("*").from(q.t("users")).where(
                q.i("department_id").in(subquery)
            );
            expectQuery(builder, "subquery", "IN with parameterized subquery");
        });

        it("builds IN with multiple subqueries", () => {
            const subquery1 = q.select(q.c("user_id")).from(q.t("premium_users"));
            const subquery2 = q.select(q.c("user_id")).from(q.t("active_users"));
            const builder = q.select("*").from(q.t("users")).where(
                q.i("id").in(subquery1, subquery2)
            );
            expectQuery(builder, "subquery", "IN with multiple subqueries");
        });

        it("builds IN without subquery (no parentheses)", () => {
            const builder = q.select("*").from(q.t("users")).where(
                q.i("id").in()
            );
            expectQuery(builder, "subquery", "IN without subquery");
        });
    });

    describe("NOT IN", () => {
        it("builds NOT IN with subquery", () => {
            const subquery = q.select(q.c("user_id")).from(q.t("suspended_users"));
            const builder = q.select("*").from(q.t("users")).where(
                q.i("id").notIn(subquery)
            );
            expectQuery(builder, "subquery", "NOT IN with subquery");
        });

        it("builds NOT IN with qualified column", () => {
            const subquery = q.select(q.c("id")).from(q.t("discontinued_categories"));
            const builder = q.select("*").from(q.t("products")).where(
                q.i("products.category_id").notIn(subquery)
            );
            expectQuery(builder, "subquery", "NOT IN with qualified column");
        });
    });

    describe("ANY", () => {
        it("builds ANY with equals operator", () => {
            const subquery = q.select(q.c("price")).from(q.t("competitor_prices")).where(
                q.i("competitor_prices.product_id").op("=").i("products.id")
            );
            const builder = q.select("*").from(q.t("products")).where(
                q.i("price").op("=").any(subquery)
            );
            expectQuery(builder, "subquery", "ANY with equals operator");
        });

        it("builds ANY with greater than operator", () => {
            const subquery = q.select(q.c("avg_salary")).from(q.t("department_stats")).where(
                q.i("department_stats.dept_id").op("=").i("employees.department_id")
            );
            const builder = q.select("*").from(q.t("employees")).where(
                q.i("salary").op(">").any(subquery)
            );
            expectQuery(builder, "subquery", "ANY with greater than operator");
        });

        it("builds ANY with less than operator and parameter", () => {
            const subquery = q.select(q.c("threshold")).from(q.t("alerts")).where(
                q.i("alerts.priority").op("=").l(1)
            );
            const builder = q.select("*").from(q.t("inventory")).where(
                q.i("quantity").op("<").any(subquery)
            );
            expectQuery(builder, "subquery", "ANY with less than operator and parameter");
        });
    });

    describe("SOME", () => {
        it("builds SOME with equals operator (synonym for ANY)", () => {
            const subquery = q.select(q.c("target_price")).from(q.t("price_targets")).where(
                q.i("price_targets.product_id").op("=").i("products.id")
            );
            const builder = q.select("*").from(q.t("products")).where(
                q.i("price").op("=").some(subquery)
            );
            expectQuery(builder, "subquery", "SOME with equals operator");
        });

        it("builds SOME with not equals operator", () => {
            const subquery = q.select(q.c("status_value")).from(q.t("status_transitions")).where(
                q.i("status_transitions.user_id").op("=").i("users.id")
            );
            const builder = q.select("*").from(q.t("users")).where(
                q.i("status").op("<>").some(subquery)
            );
            expectQuery(builder, "subquery", "SOME with not equals operator");
        });
    });

    describe("ALL", () => {
        it("builds ALL with greater than operator", () => {
            const subquery = q.select(q.c("min_salary")).from(q.t("departments")).where(
                q.i("departments.id").op("=").l(5)
            );
            const builder = q.select("*").from(q.t("employees")).where(
                q.i("salary").op(">").all(subquery)
            );
            expectQuery(builder, "subquery", "ALL with greater than operator");
        });

        it("builds ALL with less than operator", () => {
            const subquery = q.select(q.c("max_price")).from(q.t("price_limits")).where(
                q.i("price_limits.category_id").op("=").i("products.category_id")
            );
            const builder = q.select("*").from(q.t("products")).where(
                q.i("price").op("<").all(subquery)
            );
            expectQuery(builder, "subquery", "ALL with less than operator");
        });

        it("builds ALL with not equals operator", () => {
            const subquery = q.select(q.c("status")).from(q.t("excluded_statuses")).where(
                q.i("excluded_statuses.is_active").op("=").l(true)
            );
            const builder = q.select("*").from(q.t("tickets")).where(
                q.i("status").op("<>").all(subquery)
            );
            expectQuery(builder, "subquery", "ALL with not equals operator");
        });
    });

    describe("chaining subquery expressions", () => {
        it("combines EXISTS with AND", () => {
            const existsSubquery = q.select("*").from(q.t("orders")).where(
                q.i("orders.user_id").op("=").i("users.id")
            );
            const notExistsSubquery = q.select("*").from(q.t("banned_users")).where(
                q.i("banned_users.user_id").op("=").i("users.id")
            );
            const builder = q.select("*").from(q.t("users")).where(
                q.and(
                    q.exists(existsSubquery),
                    q.notExists(notExistsSubquery)
                )
            );
            expectQuery(builder, "subquery", "combines EXISTS with AND");
        });

        it("combines IN with OR", () => {
            const categorySubquery = q.select(q.c("id")).from(q.t("featured_categories"));
            const supplierSubquery = q.select(q.c("supplier_id")).from(q.t("preferred_suppliers"));
            const builder = q.select("*").from(q.t("products")).where(
                q.or(
                    q.i("category_id").in(categorySubquery),
                    q.i("supplier_id").in(supplierSubquery)
                )
            );
            expectQuery(builder, "subquery", "combines IN with OR");
        });

        it("combines ALL with regular WHERE condition", () => {
            const allSubquery = q.select(q.c("min_salary")).from(q.t("salary_grades")).where(
                q.i("salary_grades.level").op("=").l(5)
            );
            const builder = q.select("*").from(q.t("employees")).where(
                q.and(
                    q.i("salary").op(">").all(allSubquery),
                    q.i("department_id").op("=").l(10)
                )
            );
            expectQuery(builder, "subquery", "combines ALL with regular WHERE condition");
        });
    });
});
