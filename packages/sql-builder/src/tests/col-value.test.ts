import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../index";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async () => ({}),
});

describe("c() and v() methods", () => {
    describe("c() method", () => {
        it("should add column identifier from string", () => {
            const column = q.c("column_name");
            const builder = q
                .select()
                .where(column.op("=").v("test"));

            const sql = builder.getSql();
            const parameters = builder.getParameters();

            expect(sql).toBe("SELECT WHERE column_name = $1");
            expect(parameters).toEqual(["test"]);
        });

        it("should add column with table prefix", () => {
            const column = q.c("table_name.column_name");
            const builder = q
                .select()
                .where(column.op("=").v("test"));

            const sql = builder.getSql();
            const parameters = builder.getParameters();

            expect(sql).toBe("SELECT WHERE table_name.column_name = $1");
            expect(parameters).toEqual(["test"]);
        });

        it("should add column from QueryBuilder (subquery)", () => {
            const subquery = q.select("id").from("users");
            const column = q.c(subquery);
            const builder = q
                .select()
                .where(column.op("=").v(1));

            const sql = builder.getSql();
            const parameters = builder.getParameters();

            expect(sql).toBe("SELECT WHERE SELECT id FROM users = $1");
            expect(parameters).toEqual([1]);
        });

        it("should be chainable", () => {
            const builder = q
                .select()
                .where(q.c("status").op("=").v("active"));

            const sql = builder.getSql();
            const parameters = builder.getParameters();

            expect(sql).toBe("SELECT WHERE status = $1");
            expect(parameters).toEqual(["active"]);
        });
    });

    describe("v() method", () => {
        it("should add string literal", () => {
            const value = q.v("hello world");
            const builder = q
                .select()
                .where(value.op("=").v(1));

            const sql = builder.getSql();
            const parameters = builder.getParameters();

            expect(sql).toBe("SELECT WHERE $1 = $2");
            expect(parameters).toEqual(["hello world", 1]);
        });

        it("should add number literal", () => {
            const value = q.v(42);
            const builder = q
                .select()
                .where(value.op("=").v(1));

            const sql = builder.getSql();
            const parameters = builder.getParameters();

            expect(sql).toBe("SELECT WHERE $1 = $2");
            expect(parameters).toEqual([42, 1]);
        });

        it("should add boolean literal", () => {
            const value = q.v(true);
            const builder = q
                .select()
                .where(value.op("=").v(1));

            const sql = builder.getSql();
            const parameters = builder.getParameters();

            expect(sql).toBe("SELECT WHERE $1 = $2");
            expect(parameters).toEqual([true, 1]);
        });

        it("should add false boolean literal", () => {
            const value = q.v(false);
            const builder = q
                .select()
                .where(value.op("=").v(1));

            const sql = builder.getSql();
            const parameters = builder.getParameters();

            expect(sql).toBe("SELECT WHERE $1 = $2");
            expect(parameters).toEqual([false, 1]);
        });

        it("should add value from QueryBuilder (subquery)", () => {
            const subquery = q.select("COUNT(*)").from("users");
            const value = q.v(subquery);
            const builder = q
                .select()
                .where(value.op("=").v(1));

            const sql = builder.getSql();
            const parameters = builder.getParameters();

            expect(sql).toBe("SELECT WHERE SELECT \"COUNT(*)\" FROM users = $1");
            expect(parameters).toEqual([1]);
        });

        it("should be chainable", () => {
            const builder = q
                .select()
                .where(q.c("id").op("=").v(123));

            const sql = builder.getSql();
            const parameters = builder.getParameters();

            expect(sql).toBe("SELECT WHERE id = $1");
            expect(parameters).toEqual([123]);
        });
    });

    describe("c() and v() combination", () => {
        it("should work together in insert statement", () => {
            const builder = q
                .insertInto("users")
                .set({
                    name: q.v("John"),
                    age: q.v(25),
                    active: q.v(true),
                });

            const sql = builder.getSql();
            const parameters = builder.getParameters();

            expect(sql).toBe("INSERT INTO users SET name = $1, age = $2, active = $3");
            expect(parameters).toEqual(["John", 25, true]);
        });

        it("should work together in update statement", () => {
            const builder = q
                .update("users")
                .set({
                    last_login: q.v("2024-01-01"),
                })
                .where(q.c("id").op("=").v(1));

            const sql = builder.getSql();
            const parameters = builder.getParameters();

            expect(sql).toBe("UPDATE users SET last_login = $1 WHERE id = $2");
            expect(parameters).toEqual(["2024-01-01", 1]);
        });

        it("should work with complex query", () => {
            const builder = q
                .select(
                    q.c("users.id"),
                    q.c("users.name"),
                )
                .from("users")
                .where(
                    q.and(
                        q.c("users.active").op("=").v(true),
                        q.or(
                            q.c("users.age").op("<").v(18),
                                q.c("users.age").op(">").v(65),
                        ),
                    ),
                )
                .orderBy("users.name");

            const sql = builder.getSql();
            const parameters = builder.getParameters();

            expect(sql).toBe("SELECT users.id, users.name FROM users WHERE users.active = $1 AND users.age < $2 OR users.age > $3 ORDER BY users.name");
            expect(parameters).toEqual([true, 18, 65]);
        });
    });
});
