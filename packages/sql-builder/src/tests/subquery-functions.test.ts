import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../index";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async () => ({}),
});

describe("subquery expressions", () => {
    describe("EXISTS", () => {
        it("builds EXISTS with simple subquery", () => {
            const subquery = q.select("*").from("orders").where(
                q.i("orders.user_id").op("=").i("users.id")
            );
            const builder = q.select("*").from("users").where(
                q.exists(subquery)
            );
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT * FROM users WHERE EXISTS (SELECT * FROM orders WHERE orders.user_id = users.id)");
            expect(parameters).toEqual([]);
        });

        it("builds EXISTS with complex subquery", () => {
            const subquery = q.select("1").from("order_items").where(
                q.i("order_items.product_id").op("=").i("products.id")
            ).and(
                q.i("order_items.quantity").op(">").l(10)
            );
            const builder = q.select("*").from("products").where(
                q.exists(subquery)
            );
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe('SELECT * FROM products WHERE EXISTS (SELECT "1" FROM order_items WHERE order_items.product_id = products.id AND order_items.quantity > $1)');
            expect(parameters).toEqual([10]);
        });
    });

    describe("NOT EXISTS", () => {
        it("builds NOT EXISTS with simple subquery", () => {
            const subquery = q.select("*").from("banned_users").where(
                q.i("banned_users.user_id").op("=").i("users.id")
            );
            const builder = q.select("*").from("users").where(
                q.notExists(subquery)
            );
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT * FROM users WHERE NOT EXISTS (SELECT * FROM banned_users WHERE banned_users.user_id = users.id)");
            expect(parameters).toEqual([]);
        });

        it("builds NOT EXISTS with parameterized subquery", () => {
            const subquery = q.select("*").from("excursions").where(
                q.i("excursions.employee_id").op("=").i("employees.id")
            ).and(
                q.i("excursions.date").op(">").l(2024)
            );
            const builder = q.select("*").from("employees").where(
                q.notExists(subquery)
            );
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT * FROM employees WHERE NOT EXISTS (SELECT * FROM excursions WHERE excursions.employee_id = employees.id AND excursions.date > $1)");
            expect(parameters).toEqual([2024]);
        });
    });

    describe("IN", () => {
        it("builds IN with subquery", () => {
            const subquery = q.select("user_id").from("premium_users");
            const builder = q.select("*").from("users").where(
                q.i("id").in(subquery)
            );
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT * FROM users WHERE id IN (SELECT user_id FROM premium_users)");
            expect(parameters).toEqual([]);
        });

        it("builds IN with qualified column", () => {
            const subquery = q.select("id").from("active_products");
            const builder = q.select("*").from("orders").where(
                q.i("orders.product_id").in(subquery)
            );
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT * FROM orders WHERE orders.product_id IN (SELECT id FROM active_products)");
            expect(parameters).toEqual([]);
        });

        it("builds IN with parameterized subquery", () => {
            const subquery = q.select("id").from("departments").where(
                q.i("budget").op(">").l(100000)
            );
            const builder = q.select("*").from("users").where(
                q.i("department_id").in(subquery)
            );
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT * FROM users WHERE department_id IN (SELECT id FROM departments WHERE budget > $1)");
            expect(parameters).toEqual([100000]);
        });

        it("builds IN with multiple subqueries", () => {
            const subquery1 = q.select("user_id").from("premium_users");
            const subquery2 = q.select("user_id").from("active_users");
            const builder = q.select("*").from("users").where(
                q.i("id").in(subquery1, subquery2)
            );
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT * FROM users WHERE id IN (SELECT user_id FROM premium_users, SELECT user_id FROM active_users)");
            expect(parameters).toEqual([]);
        });

        it("builds IN without subquery (no parentheses)", () => {
            const builder = q.select("*").from("users").where(
                q.i("id").in()
            );
            const sql = builder.getSql();
            expect(sql).toBe("SELECT * FROM users WHERE id IN");
        });
    });

    describe("NOT IN", () => {
        it("builds NOT IN with subquery", () => {
            const subquery = q.select("user_id").from("suspended_users");
            const builder = q.select("*").from("users").where(
                q.i("id").notIn(subquery)
            );
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT * FROM users WHERE id NOT IN (SELECT user_id FROM suspended_users)");
            expect(parameters).toEqual([]);
        });

        it("builds NOT IN with qualified column", () => {
            const subquery = q.select("id").from("discontinued_categories");
            const builder = q.select("*").from("products").where(
                q.i("products.category_id").notIn(subquery)
            );
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT * FROM products WHERE products.category_id NOT IN (SELECT id FROM discontinued_categories)");
            expect(parameters).toEqual([]);
        });
    });

    describe("ANY", () => {
        it("builds ANY with equals operator", () => {
            const subquery = q.select("price").from("competitor_prices").where(
                q.i("competitor_prices.product_id").op("=").i("products.id")
            );
            const builder = q.select("*").from("products").where(
                q.i("price").op("=").any(subquery)
            );
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT * FROM products WHERE price = ANY (SELECT price FROM competitor_prices WHERE competitor_prices.product_id = products.id)");
            expect(parameters).toEqual([]);
        });

        it("builds ANY with greater than operator", () => {
            const subquery = q.select("avg_salary").from("department_stats").where(
                q.i("department_stats.dept_id").op("=").i("employees.department_id")
            );
            const builder = q.select("*").from("employees").where(
                q.i("salary").op(">").any(subquery)
            );
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT * FROM employees WHERE salary > ANY (SELECT avg_salary FROM department_stats WHERE department_stats.dept_id = employees.department_id)");
            expect(parameters).toEqual([]);
        });

        it("builds ANY with less than operator and parameter", () => {
            const subquery = q.select("threshold").from("alerts").where(
                q.i("alerts.priority").op("=").l(1)
            );
            const builder = q.select("*").from("inventory").where(
                q.i("quantity").op("<").any(subquery)
            );
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT * FROM inventory WHERE quantity < ANY (SELECT threshold FROM alerts WHERE alerts.priority = $1)");
            expect(parameters).toEqual([1]);
        });
    });

    describe("SOME", () => {
        it("builds SOME with equals operator (synonym for ANY)", () => {
            const subquery = q.select("target_price").from("price_targets").where(
                q.i("price_targets.product_id").op("=").i("products.id")
            );
            const builder = q.select("*").from("products").where(
                q.i("price").op("=").some(subquery)
            );
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT * FROM products WHERE price = SOME (SELECT target_price FROM price_targets WHERE price_targets.product_id = products.id)");
            expect(parameters).toEqual([]);
        });

        it("builds SOME with not equals operator", () => {
            const subquery = q.select("status_value").from("status_transitions").where(
                q.i("status_transitions.user_id").op("=").i("users.id")
            );
            const builder = q.select("*").from("users").where(
                q.i("status").op("<>").some(subquery)
            );
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT * FROM users WHERE status <> SOME (SELECT status_value FROM status_transitions WHERE status_transitions.user_id = users.id)");
            expect(parameters).toEqual([]);
        });
    });

    describe("ALL", () => {
        it("builds ALL with greater than operator", () => {
            const subquery = q.select("min_salary").from("departments").where(
                q.i("departments.id").op("=").l(5)
            );
            const builder = q.select("*").from("employees").where(
                q.i("salary").op(">").all(subquery)
            );
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT * FROM employees WHERE salary > ALL (SELECT min_salary FROM departments WHERE departments.id = $1)");
            expect(parameters).toEqual([5]);
        });

        it("builds ALL with less than operator", () => {
            const subquery = q.select("max_price").from("price_limits").where(
                q.i("price_limits.category_id").op("=").i("products.category_id")
            );
            const builder = q.select("*").from("products").where(
                q.i("price").op("<").all(subquery)
            );
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT * FROM products WHERE price < ALL (SELECT max_price FROM price_limits WHERE price_limits.category_id = products.category_id)");
            expect(parameters).toEqual([]);
        });

        it("builds ALL with not equals operator", () => {
            const subquery = q.select("status").from("excluded_statuses").where(
                q.i("excluded_statuses.is_active").op("=").l(true)
            );
            const builder = q.select("*").from("tickets").where(
                q.i("status").op("<>").all(subquery)
            );
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT * FROM tickets WHERE status <> ALL (SELECT status FROM excluded_statuses WHERE excluded_statuses.is_active = $1)");
            expect(parameters).toEqual([true]);
        });
    });

    describe("chaining subquery expressions", () => {
        it("combines EXISTS with AND", () => {
            const existsSubquery = q.select("*").from("orders").where(
                q.i("orders.user_id").op("=").i("users.id")
            );
            const notExistsSubquery = q.select("*").from("banned_users").where(
                q.i("banned_users.user_id").op("=").i("users.id")
            );
            const builder = q.select("*").from("users").where(
                q.and(
                    q.exists(existsSubquery),
                    q.notExists(notExistsSubquery)
                )
            );
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT * FROM users WHERE EXISTS (SELECT * FROM orders WHERE orders.user_id = users.id) AND NOT EXISTS (SELECT * FROM banned_users WHERE banned_users.user_id = users.id)");
            expect(parameters).toEqual([]);
        });

        it("combines IN with OR", () => {
            const categorySubquery = q.select("id").from("featured_categories");
            const supplierSubquery = q.select("supplier_id").from("preferred_suppliers");
            const builder = q.select("*").from("products").where(
                q.or(
                    q.i("category_id").in(categorySubquery),
                    q.i("supplier_id").in(supplierSubquery)
                )
            );
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT * FROM products WHERE category_id IN (SELECT id FROM featured_categories) OR supplier_id IN (SELECT supplier_id FROM preferred_suppliers)");
            expect(parameters).toEqual([]);
        });

        it("combines ALL with regular WHERE condition", () => {
            const allSubquery = q.select("min_salary").from("salary_grades").where(
                q.i("salary_grades.level").op("=").l(5)
            );
            const builder = q.select("*").from("employees").where(
                q.and(
                    q.i("salary").op(">").all(allSubquery),
                    q.i("department_id").op("=").l(10)
                )
            );
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT * FROM employees WHERE salary > ALL (SELECT min_salary FROM salary_grades WHERE salary_grades.level = $1) AND department_id = $2");
            expect(parameters).toEqual([5, 10]);
        });
    });
});
