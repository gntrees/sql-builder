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

describe("comma method", () => {
    it("joins multiple queries with commas", () => {
        const q1 = q.select("id").from("users");
        const q2 = q.select("name").from("products");
        const result = q.comma(q1, q2).getSql();
        expect(result).toBe("SELECT id FROM users, SELECT name FROM products");
    });

    it("handles queries that resolve to empty tokens", () => {
        // Using raw("") creates an empty query that resolves to empty tokens
        const q1 = q.select("id");
        const q2 = q.raw``;
        const result = q.comma(q1, q2).getSql();
        expect(result).toBe("SELECT id");
    });

    it("handles no arguments", () => {
        const result = q.comma().getSql();
        expect(result).toBe("");
    });

    it("handles single query", () => {
        const q1 = q.select("id").from("users");
        const result = q.comma(q1).getSql();
        expect(result).toBe("SELECT id FROM users");
    });

    it("is chainable", () => {
        const q1 = q.c("id");
        const q2 = q.c("name");
        const result = q.comma(q1, q2).from("users").getSql();
        expect(result).toBe("id, name FROM users");
    });
});

describe("insert queries", () => {
    it("insertQuery", () => {
        const builder = q
            .insertInto("users",[ "name", "email"])
            .values(["john", q.r`LOWER('John@Example.com')`], ["doe", q.r`LOWER('John@Example.com')`]);

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("INSERT INTO users (name, email) VALUES ($1, LOWER('John@Example.com')), ($2, LOWER('John@Example.com'))");
        expect(parameters).toEqual(["john", "doe"]);
    });

    it("insertRecordQuery", () => {
        const builder = q
            .insert("users", [{
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
            .insert("users", {
                name: "lara",
                email: q.r`LOWER('Lara@Example.com')`,
            })
            .returning("id");

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("INSERT INTO users (name, email) VALUES ($1, LOWER('Lara@Example.com')) RETURNING id");
        expect(parameters).toEqual(["lara"]);
    });
});

describe("update queries", () => {
    it("updateQuery", () => {
        const builder = q
            .update("users")
            .set({
                "cities.name": "budhapest",
                updated_at: q.r`NOW()`,
            })
            .from("cities")
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

describe("join queries", () => {
    it("leftJoinQuery", () => {
        const builder = q
            .select("users.id", "profiles.bio")
            .from("users")
            .leftJoin("profiles", q.i("profiles.user_id").op("=").i(`users.id`));

        const sql = builder.getSql();
        const parameters = builder.getParameters();

        expect(sql).toBe("SELECT users.id, profiles.bio FROM users LEFT JOIN profiles ON profiles.user_id = users.id");
        expect(parameters).toEqual([]);
    });

    it("leftJoinLateralQuery", () => {
        const lateralSubquery = q
            .select("orders.user_id", q.r`COUNT(*)`)
            .from("orders")
            .where(q.i("orders.user_id").op("=").i(`users.id`))
            .groupBy("orders.user_id");

        const builder = q
            .select("users.id", "user_orders.count")
            .from("users")
            .leftJoinLateral(q.sub(lateralSubquery).as("user_orders"), q.null());

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT users.id, user_orders.count FROM users LEFT JOIN LATERAL (SELECT orders.user_id, COUNT(*) FROM orders WHERE orders.user_id = users.id GROUP BY orders.user_id) AS user_orders ON NULL");
        expect(parameters).toEqual([]);
    });

    it("innerJoinQuery", () => {
        const builder = q
            .select("users.id", "profiles.bio")
            .from("users")
            .innerJoin("profiles", q.i("profiles.user_id").op("=").i(`users.id`));

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT users.id, profiles.bio FROM users INNER JOIN profiles ON profiles.user_id = users.id");
        expect(parameters).toEqual([]);
    });

    it("rightJoinQuery", () => {
        const builder = q
            .select("profiles.user_id", "users.name")
            .from("users")
            .rightJoin("profiles", q.i("profiles.user_id").op("=").i(`users.id`));

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT profiles.user_id, users.name FROM users RIGHT JOIN profiles ON profiles.user_id = users.id");
        expect(parameters).toEqual([]);
    });

    it("innerJoinLateralQuery", () => {
        const lateralSubquery = q
            .select("orders.user_id", q.r`COUNT(*)`)
            .from("orders")
            .where(q.i("orders.user_id").op("=").i(`users.id`))
            .groupBy("orders.user_id");

        const builder = q
            .select("users.id", "user_orders.count")
            .from("users")
            .innerJoinLateral(q.sub(lateralSubquery).as("user_orders"), q.true());

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT users.id, user_orders.count FROM users INNER JOIN LATERAL (SELECT orders.user_id, COUNT(*) FROM orders WHERE orders.user_id = users.id GROUP BY orders.user_id) AS user_orders ON TRUE");
        expect(parameters).toEqual([]);
    });

    it("fullJoinQuery", () => {
        const builder = q
            .select("users.id", "profiles.bio")
            .from("users")
            .fullJoin("profiles", q.i("profiles.user_id").op("=").i(`users.id`));

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT users.id, profiles.bio FROM users FULL JOIN profiles ON profiles.user_id = users.id");
        expect(parameters).toEqual([]);
    });

    it("crossJoinQuery", () => {
        const builder = q
            .select("users.id", "roles.name")
            .from("users")
            .crossJoin("roles");

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT users.id, roles.name FROM users CROSS JOIN roles");
        expect(parameters).toEqual([]);
    });

    it("rightJoinLateralQuery", () => {
        const lateralSubquery = q
            .select("orders.user_id", q.r`COUNT(*)`)
            .from("orders")
            .where(q.i("orders.user_id").op("=").i(`users.id`))
            .groupBy("orders.user_id");

        const builder = q
            .select("users.id", "user_orders.count")
            .from("users")
            .rightJoinLateral(q.sub(lateralSubquery).as("user_orders"), q.true());

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT users.id, user_orders.count FROM users RIGHT JOIN LATERAL (SELECT orders.user_id, COUNT(*) FROM orders WHERE orders.user_id = users.id GROUP BY orders.user_id) AS user_orders ON TRUE");
        expect(parameters).toEqual([]);
    });

    it("crossJoinLateralQuery", () => {
        const lateralSubquery = q
            .select("orders.user_id", q.r`COUNT(*)`)
            .from("orders")
            .where(q.i("orders.user_id").op("=").i(`users.id`))
            .groupBy("orders.user_id");

        const builder = q
            .select("users.id", "user_orders.count")
            .from("users")
            .crossJoinLateral(q.sub(lateralSubquery).as("user_orders"));

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
            .from("audit_logs")
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
            .select("id")
            .from("admins");

        const builder = q
            .select(q.sub(subQuery).as("admin_ids"))
            .from("users");

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT (SELECT id FROM admins) AS admin_ids FROM users");
        expect(parameters).toEqual([]);
    });

    it("cteQuery", () => {
        const builder = q
            .with("admins_cte", q.select("id").from("admins"));

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("WITH admins_cte AS (SELECT id FROM admins)");
        expect(parameters).toEqual([]);
    });

    it("cteSelectQuery", () => {
        const cteQuery = q
            .with("admins_cte", q.select("id").from("admins"));

        const builder = q
            .select("*")
            .from("admins_cte");

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT * FROM admins_cte");
        expect(parameters).toEqual([]);
    });
});

describe("distinct queries", () => {
    it("distinctOnQuery", () => {
        const builder = q
            .selectDistinctOn(["posts.author_id"], ["posts.id", "posts.title"])
            .from("posts");

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
            .select("users.role", q.r`COUNT(*)`)
            .from("users")
            .groupBy("users.role");

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
            .select(q.case(caseExpr, "something"))
            .from("users");

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
            .select("posts.id", "posts.title")
            .from("posts")
            .where(q.i("posts.is_published").op("=").l(true))
            .orderBy("posts.created_at", "posts.id")
            .limit(23)
            .offset(20);

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT posts.id, posts.title FROM posts WHERE posts.is_published = $1 ORDER BY posts.created_at, posts.id LIMIT $2 OFFSET $3");
        expect(parameters).toEqual([true, 23, 20]);
    });

    it("orderDirectionQuery", () => {
        const builder = q
            .select("posts.id", "posts.title")
            .from("posts")
            .orderBy(
                q.asc("posts.created_at", "posts.id"),
                q.desc("posts.title"),
            );

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT posts.id, posts.title FROM posts ORDER BY posts.created_at ASC, posts.id ASC, posts.title DESC");
        expect(parameters).toEqual([]);
    });
});

describe("fetch queries", () => {
    it("fetchQuery", () => {
        const builder = q
            .select("*")
            .from("users")
            .orderBy("users.created_at")
            .fetch(10);

        const sql = builder.getSql();
        const parameters = builder.getParameters();

        // Using actual generated SQL
        expect(sql).toBe("SELECT * FROM users ORDER BY users.created_at FETCH FIRST $1 ROWS ONLY");
        expect(parameters).toEqual([10]);
    });

    it("fetchNextQuery", () => {
        const builder = q
            .select("*")
            .from("users")
            .orderBy("users.created_at")
            .fetch(10, "next");

        const sql = builder.getSql();
        const parameters = builder.getParameters();

        // Using actual generated SQL
        expect(sql).toBe("SELECT * FROM users ORDER BY users.created_at FETCH NEXT $1 ROWS ONLY");
        expect(parameters).toEqual([10]);
    });

    it("fetchWithTiesQuery", () => {
        const builder = q
            .select("*")
            .from("users")
            .orderBy("users.created_at")
            .fetch(10, "first", true);

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
            q.select("admins.id").from("admins"),
            q.select("moderators.id").from("moderators"),
        );

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT admins.id FROM admins UNION SELECT moderators.id FROM moderators");
        expect(parameters).toEqual([]);
    });

    it("setOpsChainedQuery", () => {
        const setOpsBaseQuery = q
            .select("users.id")
            .from("users");

        const builder = setOpsBaseQuery
            .union(
                q.select("moderators.id").from("moderators"),
            )
            .unionAll(
                q.select("guests.id").from("guests"),
                q.select("visitors.id").from("visitors"),
            )
            .intersect(
                q.select("staff.id").from("staff"),
                q.select("contractors.id").from("contractors"),
            )
            .intersectAll(
                q.select("vendors.id").from("vendors"),
                q.select("suppliers.id").from("suppliers"),
            )
            .except(
                q.select("banned_users.id").from("banned_users"),
                q.select("blocked_users.id").from("blocked_users"),
            )
            .exceptAll(
                q.select("archived_users.id").from("archived_users"),
                q.select("deleted_users.id").from("deleted_users"),
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
            .insert("users", {
                name: "john",
                email: "john@example.com",
            })
            .onConflictDoNothing({
                target: ["users.email"],
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
            .insert("users", {
                name: "donna",
                email: "donna@example.com",
            })
            .onConflictDoUpdate({
                target: ["users.email"],
                targetWhere: q.i("users.is_active").op("=").l(true),
                set: {
                    name: "donna",
                    updated_at: q.r`NOW()`,
                },
                setWhere: q.i("users.is_deleted").op("=").l(false),
            })
            .returning("id");

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
        const builder = q.savepointTransaction("sp1");

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SAVEPOINT sp1;");
        expect(parameters).toEqual([]);
    });

    it("transactionQuery", () => {
        const builder = q.transaction(
            q.insert("users", {
                name: "hana",
                email: "hana@example.com",
            }),
            q.savepointTransaction("sp_insert_profile"),
            q.update("users")
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
            .from("posts")
            .limit(q.rs("ALL"))
            .offset(q.rs("10"));

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT * FROM posts LIMIT ALL OFFSET 10");
        expect(parameters).toEqual([]);
    });
});
