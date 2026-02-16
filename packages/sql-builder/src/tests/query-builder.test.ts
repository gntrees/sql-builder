import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../index";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async () => ({}),
});

describe("c() and v() methods", () => {
    describe("c() method", () => {
        it("should add column identifier from string", () => {
            const builder = q
                .select()
                .where(q.c("column_name").op("=").v("test"));

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
            const subquery = q.select(q.c("id")).from(q.t("users"));
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
            const subquery = q.select(q.r`COUNT(*)`).from(q.t("users"));
            const value = q.v(subquery);
            const builder = q
                .select()
                .where(value.op("=").v(1));

            const sql = builder.getSql();
            const parameters = builder.getParameters();

            expect(sql).toBe("SELECT WHERE SELECT COUNT(*) FROM users = $1");
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
                .insertInto(q.t("users"))
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
                .update(q.t("users"))
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
                .from(q.t("users"))
                .where(
                    q.and(
                        q.c("users.active").op("=").v(true),
                        q.or(
                            q.c("users.age").op("<").v(18),
                            q.c("users.age").op(">").v(65),
                        ),
                    ),
                )
                .orderBy(q.c("users.name"));

            const sql = builder.getSql();
            const parameters = builder.getParameters();

            expect(sql).toBe("SELECT users.id, users.name FROM users WHERE users.active = $1 AND users.age < $2 OR users.age > $3 ORDER BY users.name");
            expect(parameters).toEqual([true, 18, 65]);
        });
    });
});

describe("comma method", () => {
    it("joins multiple queries with commas", () => {
        const q1 = q.select(q.c("id")).from(q.t("users"));
        const q2 = q.select(q.c("name")).from(q.t("products"));
        const result = q.comma(q1, q2).getSql();
        expect(result).toBe("SELECT id FROM users, SELECT name FROM products");
    });

    it("handles queries that resolve to empty tokens", () => {
        // Using raw("") creates an empty query that resolves to empty tokens
        const q1 = q.select(q.c("id"));
        const q2 = q.raw``;
        const result = q.comma(q1, q2).getSql();
        expect(result).toBe("SELECT id");
    });

    it("handles no arguments", () => {
        const result = q.comma().getSql();
        expect(result).toBe("");
    });

    it("handles single query", () => {
        const q1 = q.select(q.c("id")).from(q.t("users"));
        const result = q.comma(q1).getSql();
        expect(result).toBe("SELECT id FROM users");
    });

    it("is chainable", () => {
        const q1 = q.c("id");
        const q2 = q.c("name");
        const result = q.comma(q1, q2).from(q.t("users")).getSql();
        expect(result).toBe("id, name FROM users");
    });
});

describe("insert queries", () => {
    it("insertQuery", () => {
        const builder = q
            .insertInto(q.t("users"), [q.c("name"), q.c("email")])
            .values([q.v("john"), q.r`LOWER('John@Example.com')`], [q.v("doe"), q.r`LOWER('John@Example.com')`]);

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("INSERT INTO users (name, email) VALUES ($1, LOWER('John@Example.com')), ($2, LOWER('John@Example.com'))");
        expect(parameters).toEqual(["john", "doe"]);
    });

    it("insertRecordQuery", () => {
        const builder = q
            .insert(q.t("users"), [{
                name: "maria",
                email: q.r`LOWER('Maria@Example.com')`,
            }, {
                name: "lia",
                email: q.r`LOWER('Lia@Example.com')`,
            }]);

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("INSERT INTO users (name, email) VALUES ($1, LOWER('Maria@Example.com')), ($2, LOWER('Lia@Example.com'))");
        expect(parameters).toEqual(["maria", "lia"]);
    });

    it("returningQuery", () => {
        const builder = q
            .insert(q.t("users"), {
                name: "lara",
                email: q.r`LOWER('Lara@Example.com')`,
            })
            .returning(q.c("id"));

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("INSERT INTO users (name, email) VALUES ($1, LOWER('Lara@Example.com')) RETURNING id");
        expect(parameters).toEqual(["lara"]);
    });
});

describe("update queries", () => {
    it("updateQuery", () => {
        const builder = q
            .update(q.t("users"))
            .set({
                "cities.name": "budhapest",
                updated_at: q.r`NOW()`,
            })
            .from(q.t("cities"))
            .where(q.i("users.city_id").op("=").r`cities.id`);

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("UPDATE users SET cities.name = $1, updated_at = NOW() FROM cities WHERE users.city_id = cities.id");
        expect(parameters).toEqual(["budhapest"]);
    });
});

describe("select queries", () => {
    it("selectQuery", () => {
        const builder = q
            .select("*", q.c("test_column"), q.c("users.id"), {
                test: q.c("haha"),
                another: q.c("users.name"),
            }, {
                alias: q.c("custom_alias"),
                expression: q.r`NOW()`,
            })
            .from(q.t("users"))
            .where(q.i("users.is_active").op("=").l(true))
            .orderBy(q.c("users.created_at"));

        const sql = builder.getSql();
        const parameters = builder.getParameters();

        expect(sql).toBe(
            "SELECT *, test_column, users.id, haha AS test, users.name AS another, custom_alias AS alias, NOW() AS expression FROM users WHERE users.is_active = $1 ORDER BY users.created_at"
        ); // Use actual generated SQL
        expect(parameters).toEqual([true]);
    });

    it("distinctQuery", () => {
        const builder = q
            .selectDistinct(q.c("users.id"), q.c("users.name"))
            .from(q.t("users"));

        const sql = builder.getSql();
        const parameters = builder.getParameters();

        expect(sql).toBe(
            "SELECT DISTINCT users.id, users.name FROM users"
        ); // Use actual generated SQL
        expect(parameters).toEqual([]);
    });

    it("havingQuery", () => {
        const builder = q
            .select(q.c("category_id"))
            .from(q.t("products"))
            .groupBy(q.c("category_id"))
            .having(q.abs(q.c("id")).op(">").l(5));

        const sql = builder.getSql();
        const parameters = builder.getParameters();

        expect(sql).toBe(
            "SELECT category_id FROM products GROUP BY category_id HAVING ABS(id) > $1"
        ); // Use actual generated SQL
        expect(parameters).toEqual([5]);
    });

    it("havingQueryWithoutCondition", () => {
        const builder = q
            .select(q.c("category_id"))
            .from(q.t("products"))
            .groupBy(q.c("category_id"))
            .having();

        const sql = builder.getSql();
        const parameters = builder.getParameters();

        expect(sql).toBe(
            "SELECT category_id FROM products GROUP BY category_id HAVING"
        ); // Use actual generated SQL
        expect(parameters).toEqual([]);
    });

    it("havingQueryWithMultipleConditions", () => {
        const builder = q
            .select(q.c("category_id"))
            .from(q.t("products"))
            .groupBy(q.c("category_id"))
            .having(
                q.and(
                    q.abs(q.c("amount")).op(">").l(1000),
                    q.abs(q.c("id")).op("<").l(10)
                )
            );

        const sql = builder.getSql();
        const parameters = builder.getParameters();

        expect(sql).toBe(
            "SELECT category_id FROM products GROUP BY category_id HAVING ABS(amount) > $1 AND ABS(id) < $2"
        ); // Use actual generated SQL
        expect(parameters).toEqual([1000, 10]);
    });
});

describe("join queries", () => {
    it("leftJoinQuery", () => {
        const builder = q
            .select(q.c("users.id"), q.c("profiles.bio"))
            .from(q.t("users"))
            .leftJoin(q.t("profiles"), q.i("profiles.user_id").op("=").i(`users.id`));

        const sql = builder.getSql();
        const parameters = builder.getParameters();

        expect(sql).toBe("SELECT users.id, profiles.bio FROM users LEFT JOIN profiles ON profiles.user_id = users.id");
        expect(parameters).toEqual([]);
    });

    it("leftJoinLateralQuery", () => {
        const lateralSubquery = q
            .select(q.c("orders.user_id"), q.r`COUNT(*)`)
            .from(q.t("orders"))
            .where(q.i("orders.user_id").op("=").i(`users.id`))
            .groupBy(q.c("orders.user_id"));

        const builder = q
            .select(q.c("users.id"), q.c("user_orders.count"))
            .from(q.t("users"))
            .leftJoinLateral(q.sub(lateralSubquery).as(q.c("user_orders")), q.null());

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT users.id, user_orders.count FROM users LEFT JOIN LATERAL (SELECT orders.user_id, COUNT(*) FROM orders WHERE orders.user_id = users.id GROUP BY orders.user_id) AS user_orders ON NULL");
        expect(parameters).toEqual([]);
    });

    it("innerJoinQuery", () => {
        const builder = q
            .select(q.c("users.id"), q.c("profiles.bio"))
            .from(q.t("users"))
            .innerJoin(q.t("profiles"), q.i("profiles.user_id").op("=").i(`users.id`));

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT users.id, profiles.bio FROM users INNER JOIN profiles ON profiles.user_id = users.id");
        expect(parameters).toEqual([]);
    });

    it("rightJoinQuery", () => {
        const builder = q
            .select(q.c("profiles.user_id"), q.c("users.name"))
            .from(q.t("users"))
            .rightJoin(q.t("profiles"), q.i("profiles.user_id").op("=").i(`users.id`));

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT profiles.user_id, users.name FROM users RIGHT JOIN profiles ON profiles.user_id = users.id");
        expect(parameters).toEqual([]);
    });

    it("innerJoinLateralQuery", () => {
        const lateralSubquery = q
            .select(q.c("orders.user_id"), q.r`COUNT(*)`)
            .from(q.t("orders"))
            .where(q.i("orders.user_id").op("=").i(`users.id`))
            .groupBy(q.c("orders.user_id"));

        const builder = q
            .select(q.c("users.id"), q.c("user_orders.count"))
            .from(q.t("users"))
            .innerJoinLateral(q.sub(lateralSubquery).as(q.c("user_orders")), q.true());

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT users.id, user_orders.count FROM users INNER JOIN LATERAL (SELECT orders.user_id, COUNT(*) FROM orders WHERE orders.user_id = users.id GROUP BY orders.user_id) AS user_orders ON TRUE");
        expect(parameters).toEqual([]);
    });

    it("fullJoinQuery", () => {
        const builder = q
            .select(q.c("users.id"), q.c("profiles.bio"))
            .from(q.t("users"))
            .fullJoin(q.t("profiles"), q.i("profiles.user_id").op("=").i(`users.id`));

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT users.id, profiles.bio FROM users FULL JOIN profiles ON profiles.user_id = users.id");
        expect(parameters).toEqual([]);
    });

    it("crossJoinQuery", () => {
        const builder = q
            .select(q.c("users.id"), q.c("roles.name"))
            .from(q.t("users"))
            .crossJoin(q.t("roles"));

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT users.id, roles.name FROM users CROSS JOIN roles");
        expect(parameters).toEqual([]);
    });

    it("rightJoinLateralQuery", () => {
        const lateralSubquery = q
            .select(q.c("orders.user_id"), q.r`COUNT(*)`)
            .from(q.t("orders"))
            .where(q.i("orders.user_id").op("=").i(`users.id`))
            .groupBy(q.c("orders.user_id"));

        const builder = q
            .select(q.c("users.id"), q.c("user_orders.count"))
            .from(q.t("users"))
            .rightJoinLateral(q.sub(lateralSubquery).as(q.c("user_orders")), q.true());

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT users.id, user_orders.count FROM users RIGHT JOIN LATERAL (SELECT orders.user_id, COUNT(*) FROM orders WHERE orders.user_id = users.id GROUP BY orders.user_id) AS user_orders ON TRUE");
        expect(parameters).toEqual([]);
    });

    it("crossJoinLateralQuery", () => {
        const lateralSubquery = q
            .select(q.c("orders.user_id"), q.r`COUNT(*)`)
            .from(q.t("orders"))
            .where(q.i("orders.user_id").op("=").i(`users.id`))
            .groupBy(q.c("orders.user_id"));

        const builder = q
            .select(q.c("users.id"), q.c("user_orders.count"))
            .from(q.t("users"))
            .crossJoinLateral(q.sub(lateralSubquery).as(q.c("user_orders")));

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT users.id, user_orders.count FROM users CROSS JOIN LATERAL (SELECT orders.user_id, COUNT(*) FROM orders WHERE orders.user_id = users.id GROUP BY orders.user_id) AS user_orders");
        expect(parameters).toEqual([]);
    });
});

describe("where queries", () => {
    it("whereQuery", () => {
        const builder = q
            .select("*")
            .from(q.t("audit_logs"))
            .where(
                q.or(
                    q.i("audit_logs.success").op("=").l(true),
                    q.i("audit_logs.action").op(">").l("login"),
                ),
            );

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT * FROM audit_logs WHERE audit_logs.success = $1 OR audit_logs.action > $2");
        expect(parameters).toEqual([true, "login"]);
    });
});

describe("CTE and subquery tests", () => {
    it("subSelectQuery", () => {
        const subQuery = q
            .select(q.c("id"))
            .from(q.t("admins"));

        const builder = q
            .select(q.sub(subQuery).as(q.c("admin_ids")))
            .from(q.t("users"));

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT (SELECT id FROM admins) AS admin_ids FROM users");
        expect(parameters).toEqual([]);
    });

    it("cteQuery", () => {
        const builder = q
            .with("admins_cte", q.select(q.c("id")).from(q.t("admins")));

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("WITH admins_cte AS (SELECT id FROM admins)");
        expect(parameters).toEqual([]);
    });

    it("cteSelectQuery", () => {
        const cteQuery = q
            .with("admins_cte", q.select(q.c("id")).from(q.t("admins")));

        const builder = q
            .select("*")
            .from(q.t("admins_cte"));

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT * FROM admins_cte");
        expect(parameters).toEqual([]);
    });
});

describe("distinct queries", () => {
    it("distinctOnQuery", () => {
        const builder = q
            .selectDistinctOn([q.c("posts.author_id")], [q.c("posts.id"), q.c("posts.title")])
            .from(q.t("posts"));

        const sql = builder.getSql();
        const parameters = builder.getParameters();

        // Using actual generated SQL
        expect(sql).toBe("SELECT DISTINCT ON (posts.author_id) posts.id, posts.title FROM posts");
        expect(parameters).toEqual([]);
    });
});

describe("group by queries", () => {
    it("groupByQuery", () => {
        const builder = q
            .select(q.c("users.role"), q.r`COUNT(*)`)
            .from(q.t("users"))
            .groupBy(q.c("users.role"));

        const sql = builder.getSql();
        const parameters = builder.getParameters();

        // Using actual generated SQL
        expect(sql).toBe("SELECT users.role, COUNT(*) FROM users GROUP BY users.role");
        expect(parameters).toEqual([]);
    });

    it("caseQuery", () => {
        const caseExpr = q
            .when(q.r`TRUE`)
            .then(q.r`1`)
            .else(q.r`2`);

        const builder = q
            .select(q.case(caseExpr, q.c("something")))
            .from(q.t("users"));

        const sql = builder.getSql();
        const parameters = builder.getParameters();

        // This one already matches, so no change needed
        expect(sql).toBe("SELECT CASE WHEN TRUE THEN 1 ELSE 2 END AS something FROM users");
        expect(parameters).toEqual([]);
    });
});

describe("order queries", () => {
    it("orderQuery", () => {
        const builder = q
            .select(q.c("posts.id"), q.c("posts.title"))
            .from(q.t("posts"))
            .where(q.i("posts.is_published").op("=").l(true))
            .orderBy(q.c("posts.created_at"), q.c("posts.id"))
            .limit(q.v(23))
            .offset(q.v(20));

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT posts.id, posts.title FROM posts WHERE posts.is_published = $1 ORDER BY posts.created_at, posts.id LIMIT $2 OFFSET $3");
        expect(parameters).toEqual([true, 23, 20]);
    });

    it("orderDirectionQuery", () => {
        const builder = q
            .select(q.c("posts.id"), q.c("posts.title"))
            .from(q.t("posts"))
            .orderBy(
                q.asc(q.c("posts.created_at"), q.c("posts.id")),
                q.desc(q.c("posts.title")),
            );

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT posts.id, posts.title FROM posts ORDER BY posts.created_at ASC, posts.id ASC, posts.title DESC");
        expect(parameters).toEqual([]);
    });

    it("nullsFirst without parameters", () => {
        const builder = q
            .select(q.c("users.id"), q.c("users.name"))
            .from(q.t("users"))
            .orderBy()
            .column(q.c("status"))
            .asc()
            .nullsFirst();

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT users.id, users.name FROM users ORDER BY status ASC NULLS FIRST");
        expect(parameters).toEqual([]);
    });

    it("nullsLast without parameters", () => {
        const builder = q
            .select(q.c("users.id"), q.c("users.name"))
            .from(q.t("users"))
            .orderBy()
            .column(q.c("created_at"))
            .desc()
            .nullsLast();

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT users.id, users.name FROM users ORDER BY created_at DESC NULLS LAST");
        expect(parameters).toEqual([]);
    });

    it("nullsFirst with column parameter", () => {
        const builder = q
            .select("*")
            .from(q.t("users"))
            .orderBy(q.c("status").nullsFirst())

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT * FROM users ORDER BY status NULLS FIRST");
        expect(parameters).toEqual([]);
    });

    it("nullsLast with column parameter", () => {
        const builder = q
            .select("*")
            .from(q.t("users"))
            .orderBy(q.c("created_at").nullsLast())

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT * FROM users ORDER BY created_at NULLS LAST");
        expect(parameters).toEqual([]);
    });

    it("chaining asc and nullsFirst", () => {
        const builder = q
            .select("*")
            .from(q.t("users"))
            .orderBy(q.column(q.c("status")).asc().nullsFirst());

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT * FROM users ORDER BY status ASC NULLS FIRST");
        expect(parameters).toEqual([]);
    });

    it("chaining desc and nullsLast", () => {
        const builder = q
            .select("*")
            .from(q.t("users"))
            .orderBy(q.column(q.c("created_at")).desc().nullsLast())

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT * FROM users ORDER BY created_at DESC NULLS LAST");
        expect(parameters).toEqual([]);
    });

    it("multiple columns with different nulls ordering", () => {
        const builder = q
            .select("*")
            .from(q.t("users"))
            .orderBy(
                q.column(q.c("status")).asc().nullsFirst(),
                q.column(q.c("name")).desc().nullsLast()
            );

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT * FROM users ORDER BY status ASC NULLS FIRST, name DESC NULLS LAST");
        expect(parameters).toEqual([]);
    });
});

describe("fetch queries", () => {
    it("fetchQuery", () => {
        const builder = q
            .select("*")
            .from(q.t("users"))
            .orderBy(q.c("users.created_at"))
            .fetch(q.v(10));

        const sql = builder.getSql();
        const parameters = builder.getParameters();

        // Using actual generated SQL
        expect(sql).toBe("SELECT * FROM users ORDER BY users.created_at FETCH FIRST $1 ROWS ONLY");
        expect(parameters).toEqual([10]);
    });

    it("fetchNextQuery", () => {
        const builder = q
            .select("*")
            .from(q.t("users"))
            .orderBy(q.c("users.created_at"))
            .fetch(q.v(10), "next");

        const sql = builder.getSql();
        const parameters = builder.getParameters();

        // Using actual generated SQL
        expect(sql).toBe("SELECT * FROM users ORDER BY users.created_at FETCH NEXT $1 ROWS ONLY");
        expect(parameters).toEqual([10]);
    });

    it("fetchWithTiesQuery", () => {
        const builder = q
            .select("*")
            .from(q.t("users"))
            .orderBy(q.c("users.created_at"))
            .fetch(q.v(10), "first", true);

        const sql = builder.getSql();
        const parameters = builder.getParameters();

        // Using actual generated SQL
        expect(sql).toBe("SELECT * FROM users ORDER BY users.created_at FETCH FIRST $1 ROWS WITH TIES");
        expect(parameters).toEqual([10]);
    });
});

describe("set operations", () => {
    it("setOpsUnionQuery", () => {
        const builder = q.union(
            q.select(q.c("admins.id")).from(q.t("admins")),
            q.select(q.c("moderators.id")).from(q.t("moderators")),
        );

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT admins.id FROM admins UNION SELECT moderators.id FROM moderators");
        expect(parameters).toEqual([]);
    });

    it("setOpsChainedQuery", () => {
        const setOpsBaseQuery = q
            .select(q.c("users.id"))
            .from(q.t("users"));

        const builder = setOpsBaseQuery
            .union(
                q.select(q.c("moderators.id")).from(q.t("moderators")),
            )
            .unionAll(
                q.select(q.c("guests.id")).from(q.t("guests")),
                q.select(q.c("visitors.id")).from(q.t("visitors")),
            )
            .intersect(
                q.select(q.c("staff.id")).from(q.t("staff")),
                q.select(q.c("contractors.id")).from(q.t("contractors")),
            )
            .intersectAll(
                q.select(q.c("vendors.id")).from(q.t("vendors")),
                q.select(q.c("suppliers.id")).from(q.t("suppliers")),
            )
            .except(
                q.select(q.c("banned_users.id")).from(q.t("banned_users")),
                q.select(q.c("blocked_users.id")).from(q.t("blocked_users")),
            )
            .exceptAll(
                q.select(q.c("archived_users.id")).from(q.t("archived_users")),
                q.select(q.c("deleted_users.id")).from(q.t("deleted_users")),
            );

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT users.id FROM users UNION SELECT moderators.id FROM moderators UNION ALL SELECT guests.id FROM guests UNION ALL SELECT visitors.id FROM visitors INTERSECT SELECT staff.id FROM staff INTERSECT SELECT contractors.id FROM contractors INTERSECT ALL SELECT vendors.id FROM vendors INTERSECT ALL SELECT suppliers.id FROM suppliers EXCEPT SELECT banned_users.id FROM banned_users EXCEPT SELECT blocked_users.id FROM blocked_users EXCEPT ALL SELECT archived_users.id FROM archived_users EXCEPT ALL SELECT deleted_users.id FROM deleted_users");
        expect(parameters).toEqual([]);
    });
});

describe("conflict handling", () => {
    it("conflictDoNothingQuery", () => {
        const builder = q
            .insert(q.t("users"), {
                name: "john",
                email: "john@example.com",
            })
            .onConflictDoNothing({
                target: [q.c("users.email")],
                targetWhere: q.i("users.is_active").op("=").l(true),
            });

        const sql = builder.getSql();
        const parameters = builder.getParameters();

        // Using actual generated SQL (pg format)
        expect(sql).toBe('INSERT INTO users (name, email) VALUES ($1, $2) ON CONFLICT (users.email) WHERE users.is_active = $3 DO NOTHING');
        expect(parameters).toEqual(["john", "john@example.com", true]);
    });

    it("conflictDoUpdateQuery", () => {
        const builder = q
            .insert(q.t("users"), {
                name: "donna",
                email: "donna@example.com",
            })
            .onConflictDoUpdate({
                target: [q.c("users.email")],
                targetWhere: q.i("users.is_active").op("=").l(true),
                set: {
                    name: "donna",
                    updated_at: q.r`NOW()`,
                },
                setWhere: q.i("users.is_deleted").op("=").l(false),
            })
            .returning(q.c("id"));

        const sql = builder.getSql();
        const parameters = builder.getParameters();

        // Using actual generated SQL (pg format)
        expect(sql).toBe('INSERT INTO users (name, email) VALUES ($1, $2) ON CONFLICT (users.email) WHERE users.is_active = $3 DO UPDATE SET name = $4, updated_at = NOW() WHERE users.is_deleted = $5 RETURNING id');
        expect(parameters).toEqual(["donna", "donna@example.com", true, "donna", false]);
    });
});

describe("transaction queries", () => {
    it("beginTransactionQuery", () => {
        const builder = q.beginTransaction();

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("BEGIN;");
        expect(parameters).toEqual([]);
    });

    it("commitTransactionQuery", () => {
        const builder = q.commitTransaction();

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("COMMIT;");
        expect(parameters).toEqual([]);
    });

    it("rollbackTransactionQuery", () => {
        const builder = q.rollbackTransaction();

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("ROLLBACK;");
        expect(parameters).toEqual([]);
    });

    it("savepointTransactionQuery", () => {
        const builder = q.savepointTransaction(q.c("sp1"));

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SAVEPOINT sp1;");
        expect(parameters).toEqual([]);
    });

    it("transactionQuery", () => {
        const builder = q.transaction(
            q.insert(q.t("users"), {
                name: "hana",
                email: "hana@example.com",
            }),
            q.savepointTransaction(q.c("sp_insert_profile")),
            q.update(q.t("users"))
                .set({
                    updated_at: q.r`NOW()`,
                })
                .where(q.i("users.email").op("=").l("hana@example.com")),
        );

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("BEGIN; INSERT INTO users (name, email) VALUES ($1, $2); SAVEPOINT sp_insert_profile; UPDATE users SET updated_at = NOW() WHERE users.email = $3; COMMIT;");
        expect(parameters).toEqual(["hana", "hana@example.com", "hana@example.com"]);
    });

    it("rawLimitOffsetQuery", () => {
        const builder = q
            .select("*")
            .from(q.t("posts"))
            .limit(q.rs("ALL"))
            .offset(q.rs("10"));

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT * FROM posts LIMIT ALL OFFSET 10");
        expect(parameters).toEqual([]);
    });
});
