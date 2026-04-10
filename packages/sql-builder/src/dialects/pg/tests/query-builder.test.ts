import { describe, expect, it } from "bun:test";
import { sqlBuilder, sqlSchema } from "../../../../pg";
import { expectQuery } from "./test-helpers";
import { account } from "./schema/db.schema";
import type { QueryBuilder } from "../query-builder";
import { z } from "zod";

const q = sqlBuilder()
    .setFormatParamHandler("pg")
    .setExecutionHandler(async () => ({}));

describe("c() and v() methods", () => {
    describe("c() method", () => {
        it("should add column identifier from string", () => {
            const builder = q.select().where(q.c("column_name").op("=").v("test"));
            expectQuery(builder, "queryBuilder", "should add column identifier from string");
        });

        it("should add column with table prefix", () => {
            const column = q.c("table_name.column_name");
            const builder = q.select().where(column.op("=").v("test"));
            expectQuery(builder, "queryBuilder", "should add column with table prefix");
        });

        it("should add column from QueryBuilder (subquery)", () => {
            const subquery = q.select(q.c("id")).from(q.t("users"));
            const column = q.c(subquery);
            const builder = q.select().where(column.op("=").v(1));
            expectQuery(builder, "queryBuilder", "should add column from QueryBuilder (subquery)");
        });

        it("should be chainable", () => {
            const builder = q.select().where(q.c("status").op("=").v("active"));
            expectQuery(builder, "queryBuilder", "c() should be chainable");
        });
    });

    describe("v() method", () => {
        it("should add string literal", () => {
            const value = q.v("hello world");
            const builder = q.select().where(value.op("=").v(1));
            expectQuery(builder, "queryBuilder", "should add string literal");
        });

        it("should add number literal", () => {
            const value = q.v(42);
            const builder = q.select().where(value.op("=").v(1));
            expectQuery(builder, "queryBuilder", "should add number literal");
        });

        it("should add boolean literal", () => {
            const value = q.v(true);
            const builder = q.select().where(value.op("=").v(1));
            expectQuery(builder, "queryBuilder", "should add boolean literal");
        });

        it("should add false boolean literal", () => {
            const value = q.v(false);
            const builder = q.select().where(value.op("=").v(1));
            expectQuery(builder, "queryBuilder", "should add false boolean literal");
        });

        it("should add value from QueryBuilder (subquery)", () => {
            const subquery = q.select(q.r`COUNT(*)`).from(q.t("users"));
            const value = q.v(subquery);
            const builder = q.select().where(value.op("=").v(1));
            expectQuery(builder, "queryBuilder", "should add value from QueryBuilder (subquery)");
        });

        it("should be chainable", () => {
            const builder = q.select().where(q.c("id").op("=").v(123));
            expectQuery(builder, "queryBuilder", "v() should be chainable");
        });
    });

    describe("c() and v() combination", () => {
        it("should work together in insert statement", () => {
            const builder = q.insertInto(q.t("users")).set({
                name: q.v("John"),
                age: q.v(25),
                active: q.v(true),
            });
            expectQuery(builder, "queryBuilder", "should work together in insert statement");
        });

        it("should work together in update statement", () => {
            const builder = q.update(q.t("users")).set({
                last_login: q.v("2024-01-01"),
            }).where(q.c("id").op("=").v(1));
            expectQuery(builder, "queryBuilder", "should work together in update statement");
        });

        it("should work with complex query", () => {
            const builder = q.select(
                q.c("users.id"),
                q.c("users.name"),
            ).from(q.t("users")).where(
                q.and(
                    q.c("users.active").op("=").v(true),
                    q.or(
                        q.c("users.age").op("<").v(18),
                        q.c("users.age").op(">").v(65),
                    ),
                ),
            ).orderBy(q.c("users.name"));
            expectQuery(builder, "queryBuilder", "should work with complex query");
        });
    });
});

describe("comma method", () => {
    it("joins multiple queries with commas", () => {
        const q1 = q.select(q.c("id")).from(q.t("users"));
        const q2 = q.select(q.c("name")).from(q.t("products"));
        const result = q.comma(q1, q2);
        expectQuery(result, "queryBuilder", "joins multiple queries with commas");
    });

    it("handles queries that resolve to empty tokens", () => {
        const q1 = q.select(q.c("id"));
        const q2 = q.raw``;
        const result = q.comma(q1, q2);
        expectQuery(result, "queryBuilder", "handles queries that resolve to empty tokens");
    });

    it("handles no arguments", () => {
        const result = q.comma();
        expectQuery(result, "queryBuilder", "handles no arguments");
    });

    it("handles single query", () => {
        const q1 = q.select(q.c("id")).from(q.t("users"));
        const result = q.comma(q1);
        expectQuery(result, "queryBuilder", "handles single query");
    });

    it("is chainable", () => {
        const q1 = q.c("id");
        const q2 = q.c("name");
        const result = q.comma(q1, q2).from(q.t("users"));
        expectQuery(result, "queryBuilder", "is chainable");
    });
});

describe("insert queries", () => {
    it("insertQuery", () => {
        const builder = q.insertInto(q.t("users"), [q.c("name"), q.c("email")]).values(
            [q.v("john"), q.r`LOWER('John@Example.com')`],
            [q.v("doe"), q.r`LOWER('John@Example.com')`]
        );
        expectQuery(builder, "queryBuilder", "insertQuery");
    });

    it("insertRecordQuery", () => {
        const builder = q.insert(q.t("users"), [{
            name: "maria",
            email: q.r`LOWER('Maria@Example.com')`,
        }, {
            name: "lia",
            email: q.r`LOWER('Lia@Example.com')`,
        }]);
        expectQuery(builder, "queryBuilder", "insertRecordQuery");
    });

    it("returningQuery", () => {
        const builder = q.insert(q.t("users"), {
            name: "lara",
            email: q.r`LOWER('Lara@Example.com')`,
        }).returning(q.c("id"));
        expectQuery(builder, "queryBuilder", "returningQuery");
    });
});

describe("update queries", () => {
    it("updateQuery", () => {
        const builder = q.update(q.t("users")).set({
            "cities.name": "budhapest",
            updated_at: q.r`NOW()`,
        }).from(q.t("cities")).where(q.i("users.city_id").op("=").r`cities.id`);
        expectQuery(builder, "queryBuilder", "updateQuery");
    });
});

describe("select queries", () => {
    it("selectQuery", () => {
        const builder = q.select("*", q.c("test_column"), q.c("users.id"), {
            test: q.c("haha"),
            another: q.c("users.name"),
        }, {
            alias: q.c("custom_alias"),
            expression: q.r`NOW()`,
        }).from(q.t("users")).where(q.i("users.is_active").op("=").l(true)).orderBy(q.c("users.created_at"));
        expectQuery(builder, "queryBuilder", "selectQuery");
    });

    it("distinctQuery", () => {
        const builder = q.selectDistinct(q.c("users.id"), q.c("users.name")).from(q.t("users"));
        expectQuery(builder, "queryBuilder", "distinctQuery");
    });

    it("havingQuery", () => {
        const builder = q.select(q.c("category_id")).from(q.t("products")).groupBy(q.c("category_id")).having(q.abs(q.c("id")).op(">").l(5));
        expectQuery(builder, "queryBuilder", "havingQuery");
    });

    it("havingQueryWithoutCondition", () => {
        const builder = q.select(q.c("category_id")).from(q.t("products")).groupBy(q.c("category_id")).having();
        expectQuery(builder, "queryBuilder", "havingQueryWithoutCondition");
    });

    it("havingQueryWithMultipleConditions", () => {
        const builder = q.select(q.c("category_id")).from(q.t("products")).groupBy(q.c("category_id")).having(
            q.and(
                q.abs(q.c("amount")).op(">").l(1000),
                q.abs(q.c("id")).op("<").l(10)
            )
        );
        expectQuery(builder, "queryBuilder", "havingQueryWithMultipleConditions");
    });
});

describe("join queries", () => {
    it("leftJoinQuery", () => {
        const builder = q.select(q.c("users.id"), q.c("profiles.bio")).from(q.t("users")).leftJoin(q.t("profiles"), q.i("profiles.user_id").op("=").i(`users.id`));
        expectQuery(builder, "queryBuilder", "leftJoinQuery");
    });

    it("leftJoinLateralQuery", () => {
        const lateralSubquery = q.select(q.c("orders.user_id"), q.r`COUNT(*)`).from(q.t("orders")).where(q.i("orders.user_id").op("=").i(`users.id`)).groupBy(q.c("orders.user_id"));
        const builder = q.select(q.c("users.id"), q.c("user_orders.count")).from(q.t("users")).leftJoinLateral(q.sub(lateralSubquery).as(q.c("user_orders")), q.null());
        expectQuery(builder, "queryBuilder", "leftJoinLateralQuery");
    });

    it("innerJoinQuery", () => {
        const builder = q.select(q.c("users.id"), q.c("profiles.bio")).from(q.t("users")).innerJoin(q.t("profiles"), q.i("profiles.user_id").op("=").i(`users.id`));
        expectQuery(builder, "queryBuilder", "innerJoinQuery");
    });

    it("rightJoinQuery", () => {
        const builder = q.select(q.c("profiles.user_id"), q.c("users.name")).from(q.t("users")).rightJoin(q.t("profiles"), q.i("profiles.user_id").op("=").i(`users.id`));
        expectQuery(builder, "queryBuilder", "rightJoinQuery");
    });

    it("innerJoinLateralQuery", () => {
        const lateralSubquery = q.select(q.c("orders.user_id"), q.r`COUNT(*)`).from(q.t("orders")).where(q.i("orders.user_id").op("=").i(`users.id`)).groupBy(q.c("orders.user_id"));
        const builder = q.select(q.c("users.id"), q.c("user_orders.count")).from(q.t("users")).innerJoinLateral(q.sub(lateralSubquery).as(q.c("user_orders")), q.true());
        expectQuery(builder, "queryBuilder", "innerJoinLateralQuery");
    });

    it("fullJoinQuery", () => {
        const builder = q.select(q.c("users.id"), q.c("profiles.bio")).from(q.t("users")).fullJoin(q.t("profiles"), q.i("profiles.user_id").op("=").i(`users.id`));
        expectQuery(builder, "queryBuilder", "fullJoinQuery");
    });

    it("crossJoinQuery", () => {
        const builder = q.select(q.c("users.id"), q.c("roles.name")).from(q.t("users")).crossJoin(q.t("roles"));
        expectQuery(builder, "queryBuilder", "crossJoinQuery");
    });

    it("rightJoinLateralQuery", () => {
        const lateralSubquery = q.select(q.c("orders.user_id"), q.r`COUNT(*)`).from(q.t("orders")).where(q.i("orders.user_id").op("=").i(`users.id`)).groupBy(q.c("orders.user_id"));
        const builder = q.select(q.c("users.id"), q.c("user_orders.count")).from(q.t("users")).rightJoinLateral(q.sub(lateralSubquery).as(q.c("user_orders")), q.true());
        expectQuery(builder, "queryBuilder", "rightJoinLateralQuery");
    });

    it("crossJoinLateralQuery", () => {
        const lateralSubquery = q.select(q.c("orders.user_id"), q.r`COUNT(*)`).from(q.t("orders")).where(q.i("orders.user_id").op("=").i(`users.id`)).groupBy(q.c("orders.user_id"));
        const builder = q.select(q.c("users.id"), q.c("user_orders.count")).from(q.t("users")).crossJoinLateral(q.sub(lateralSubquery).as(q.c("user_orders")));
        expectQuery(builder, "queryBuilder", "crossJoinLateralQuery");
    });

    it("joinQuery", () => {
        const builder = q.select(q.c("users.id"), q.c("profiles.bio")).from(q.t("users")).join(q.t("profiles"), q.i("profiles.user_id").op("=").i(`users.id`));
        expectQuery(builder, "queryBuilder", "joinQuery");
    });

    it("onClauseQuery", () => {
        const builder = q.select(q.c("users.id"), q.c("profiles.bio")).from(q.t("users")).join(q.t("profiles")).on(q.i("profiles.user_id").op("=").i(`users.id`));
        expectQuery(builder, "queryBuilder", "onClauseQuery");
    });

    it("onClauseWithMultipleConditions", () => {
        const builder = q.select(q.c("users.id"), q.c("profiles.bio")).from(q.t("users")).join(q.t("profiles")).on(
            q.and(
                q.i("profiles.user_id").op("=").i(`users.id`),
                q.i("profiles.active").op("=").l(true)
            )
        );
        expectQuery(builder, "queryBuilder", "onClauseWithMultipleConditions");
    });

    it("naturalJoinQuery", () => {
        const builder = q.select(q.c("users.id")).from(q.t("users")).naturalJoin(q.t("profiles"));
        expectQuery(builder, "queryBuilder", "naturalJoinQuery");
    });

    it("naturalLeftJoinQuery", () => {
        const builder = q.select(q.c("users.id")).from(q.t("users")).naturalLeftJoin(q.t("profiles"));
        expectQuery(builder, "queryBuilder", "naturalLeftJoinQuery");
    });

    it("naturalRightJoinQuery", () => {
        const builder = q.select(q.c("users.id")).from(q.t("users")).naturalRightJoin(q.t("profiles"));
        expectQuery(builder, "queryBuilder", "naturalRightJoinQuery");
    });

    it("naturalInnerJoinQuery", () => {
        const builder = q.select(q.c("users.id")).from(q.t("users")).naturalInnerJoin(q.t("profiles"));
        expectQuery(builder, "queryBuilder", "naturalInnerJoinQuery");
    });

    it("naturalFullJoinQuery", () => {
        const builder = q.select(q.c("users.id")).from(q.t("users")).naturalFullJoin(q.t("profiles"));
        expectQuery(builder, "queryBuilder", "naturalFullJoinQuery");
    });

    it("naturalCrossJoinQuery", () => {
        const builder = q.select(q.c("users.id"), q.c("roles.name")).from(q.t("users")).naturalCrossJoin(q.t("roles"));
        expectQuery(builder, "queryBuilder", "naturalCrossJoinQuery");
    });
});

describe("where queries", () => {
    it("whereQuery", () => {
        const builder = q.select("*").from(q.t("audit_logs")).where(
            q.or(
                q.i("audit_logs.success").op("=").l(true),
                q.i("audit_logs.action").op(">").l("login"),
            ),
        );
        expectQuery(builder, "queryBuilder", "whereQuery");
    });
});

describe("CTE and subquery tests", () => {
    it("subSelectQuery", () => {
        const subQuery = q.select(q.c("id")).from(q.t("admins"));
        const builder = q.select(q.sub(subQuery).as(q.c("admin_ids"))).from(q.t("users"));
        expectQuery(builder, "queryBuilder", "subSelectQuery");
    });

    it("cteQuery", () => {
        const builder = q.with(q.t("admins_cte"), q.select(q.c("id")).from(q.t("admins")));
        expectQuery(builder, "queryBuilder", "cteQuery");
    });

    it("cteSelectQuery", () => {
        q.with(q.t("admins_cte"), q.select(q.c("id")).from(q.t("admins")));
        const builder = q.select("*").from(q.t("admins_cte"));
        expectQuery(builder, "queryBuilder", "cteSelectQuery");
    });
});

describe("distinct queries", () => {
    it("distinctOnQuery", () => {
        const builder = q.selectDistinctOn([q.c("posts.author_id")], [q.c("posts.id"), q.c("posts.title")]).from(q.t("posts"));
        expectQuery(builder, "queryBuilder", "distinctOnQuery");
    });
});

describe("group by queries", () => {
    it("groupByQuery", () => {
        const builder = q.select(q.c("users.role"), q.r`COUNT(*)`).from(q.t("users")).groupBy(q.c("users.role"));
        expectQuery(builder, "queryBuilder", "groupByQuery");
    });

    it("groupByDistinctQuery", () => {
        const builder = q.select(q.c("users.role"), q.r`COUNT(*)`).from(q.t("users")).groupByDistinct(q.c("users.role"));
        expectQuery(builder, "queryBuilder", "groupByDistinctQuery");
    });

    it("caseQuery", () => {
        const builder = q.select(q.case().when(q.r`TRUE`).then(q.r`1`).else(q.r`2`)).end().as("something").from(q.t("users"));
        expectQuery(builder, "queryBuilder", "caseQuery");
    });
});

describe("order queries", () => {
    it("orderQuery", () => {
        const builder = q.select(q.c("posts.id"), q.c("posts.title")).from(q.t("posts")).where(q.i("posts.is_published").op("=").l(true)).orderBy(q.c("posts.created_at"), q.c("posts.id")).limit(q.v(23)).offset(q.v(20));
        expectQuery(builder, "queryBuilder", "orderQuery");
    });

    it("orderDirectionQuery", () => {
        const builder = q.select(q.c("posts.id"), q.c("posts.title")).from(q.t("posts")).orderBy(
            q.asc(q.c("posts.created_at"), q.c("posts.id")),
            q.desc(q.c("posts.title")),
        );
        expectQuery(builder, "queryBuilder", "orderDirectionQuery");
    });

    it("nullsFirst without parameters", () => {
        const builder = q.select(q.c("users.id"), q.c("users.name")).from(q.t("users")).orderBy().column(q.c("status")).asc().nullsFirst();
        expectQuery(builder, "queryBuilder", "nullsFirst without parameters");
    });

    it("nullsLast without parameters", () => {
        const builder = q.select(q.c("users.id"), q.c("users.name")).from(q.t("users")).orderBy().column(q.c("created_at")).desc().nullsLast();
        expectQuery(builder, "queryBuilder", "nullsLast without parameters");
    });

    it("nullsFirst with column parameter", () => {
        const builder = q.select("*").from(q.t("users")).orderBy(q.c("status").nullsFirst());
        expectQuery(builder, "queryBuilder", "nullsFirst with column parameter");
    });

    it("nullsLast with column parameter", () => {
        const builder = q.select("*").from(q.t("users")).orderBy(q.c("created_at").nullsLast());
        expectQuery(builder, "queryBuilder", "nullsLast with column parameter");
    });

    it("chaining asc and nullsFirst", () => {
        const builder = q.select("*").from(q.t("users")).orderBy(q.column(q.c("status")).asc().nullsFirst());
        expectQuery(builder, "queryBuilder", "chaining asc and nullsFirst");
    });

    it("chaining desc and nullsLast", () => {
        const builder = q.select("*").from(q.t("users")).orderBy(q.column(q.c("created_at")).desc().nullsLast());
        expectQuery(builder, "queryBuilder", "chaining desc and nullsLast");
    });

    it("multiple columns with different nulls ordering", () => {
        const builder = q.select("*").from(q.t("users")).orderBy(
            q.column(q.c("status")).asc().nullsFirst(),
            q.column(q.c("name")).desc().nullsLast()
        );
        expectQuery(builder, "queryBuilder", "multiple columns with different nulls ordering");
    });
});

describe("fetch queries", () => {
    it("fetchQuery", () => {
        const builder = q.select("*").from(q.t("users")).orderBy(q.c("users.created_at")).fetch(q.v(10));
        expectQuery(builder, "queryBuilder", "fetchQuery");
    });

    it("fetchNextQuery", () => {
        const builder = q.select("*").from(q.t("users")).orderBy(q.c("users.created_at")).fetch(q.v(10), "next");
        expectQuery(builder, "queryBuilder", "fetchNextQuery");
    });

    it("fetchWithTiesQuery", () => {
        const builder = q.select("*").from(q.t("users")).orderBy(q.c("users.created_at")).fetch(q.v(10), "first", true);
        expectQuery(builder, "queryBuilder", "fetchWithTiesQuery");
    });

    it("withTiesQuery", () => {
        const builder = q.select("*").from(q.t("users")).orderBy(q.c("users.created_at")).fetch(q.v(10)).withTies();
        expectQuery(builder, "queryBuilder", "withTiesQuery");
    });
});

describe("set operations", () => {
    it("setOpsUnionQuery", () => {
        const builder = q.union(
            q.select(q.c("admins.id")).from(q.t("admins")),
            q.select(q.c("moderators.id")).from(q.t("moderators")),
        );
        expectQuery(builder, "queryBuilder", "setOpsUnionQuery");
    });

    it("setOpsChainedQuery", () => {
        const setOpsBaseQuery = q.select(q.c("users.id")).from(q.t("users"));
        const builder = setOpsBaseQuery.union(
            q.select(q.c("moderators.id")).from(q.t("moderators")),
        ).unionAll(
            q.select(q.c("guests.id")).from(q.t("guests")),
            q.select(q.c("visitors.id")).from(q.t("visitors")),
        ).intersect(
            q.select(q.c("staff.id")).from(q.t("staff")),
            q.select(q.c("contractors.id")).from(q.t("contractors")),
        ).intersectAll(
            q.select(q.c("vendors.id")).from(q.t("vendors")),
            q.select(q.c("suppliers.id")).from(q.t("suppliers")),
        ).except(
            q.select(q.c("banned_users.id")).from(q.t("banned_users")),
            q.select(q.c("blocked_users.id")).from(q.t("blocked_users")),
        ).exceptAll(
            q.select(q.c("archived_users.id")).from(q.t("archived_users")),
            q.select(q.c("deleted_users.id")).from(q.t("deleted_users")),
        );
        expectQuery(builder, "queryBuilder", "setOpsChainedQuery");
    });
});

describe("conflict handling", () => {
    it("conflictDoNothingQuery", () => {
        const builder = q.insert(q.t("users"), {
            name: "john",
            email: "john@example.com",
        }).onConflictDoNothing({
            target: [q.c("users.email")],
            targetWhere: q.i("users.is_active").op("=").l(true),
        });        
        expectQuery(builder, "queryBuilder", "conflictDoNothingQuery");
    });

    it("conflictDoUpdateQuery", () => {
        const builder = q.insert(q.t("users"), {
            name: "donna",
            email: "donna@example.com",
        }).onConflictDoUpdate({
            target: [q.c("users.email")],
            targetWhere: q.i("users.is_active").op("=").l(true),
            set: {
                name: "donna",
                updated_at: q.r`NOW()`,
            },
            setWhere: q.i("users.is_deleted").op("=").l(false),
        }).returning(q.c("id"));
        expectQuery(builder, "queryBuilder", "conflictDoUpdateQuery");
    });

    it("chainable onConflict doNothing", () => {
        const builder = q.insert(q.t("users"), {
            name: "john",
            email: "john@example.com",
        }).onConflict(q.c("users.email")).doNothing();
        expectQuery(builder, "queryBuilder", "chainable onConflict doNothing");
    });

    it("chainable onConflict with array target doNothing", () => {
        const builder = q.insert(q.t("users"), {
            name: "john",
            email: "john@example.com",
        }).onConflict([q.c("users.email"), q.c("users.name")]).doNothing();
        expectQuery(builder, "queryBuilder", "chainable onConflict with array target doNothing");
    });

    it("chainable onConflict with target where doNothing", () => {
        const builder = q.insert(q.t("users"), {
            name: "john",
            email: "john@example.com",
        }).onConflict(q.c("users.email"), q.i("users.is_active").op("=").l(true)).doNothing();
        expectQuery(builder, "queryBuilder", "chainable onConflict with target where doNothing");
    });

    it("chainable onConflict doUpdate", () => {
        const builder = q.insert(q.t("users"), {
            name: "donna",
            email: "donna@example.com",
        }).onConflict(q.c("users.email")).doUpdate({
            name: "donna",
            updated_at: q.r`NOW()`,
        }).returning(q.c("id"));
        expectQuery(builder, "queryBuilder", "chainable onConflict doUpdate");
    });

    it("chainable onConflict doUpdate with set where", () => {
        const builder = q.insert(q.t("users"), {
            name: "donna",
            email: "donna@example.com",
        }).onConflict(q.c("users.email")).doUpdate({
            name: "donna",
            updated_at: q.r`NOW()`,
        }, q.i("users.is_deleted").op("=").l(false)).returning(q.c("id"));
        expectQuery(builder, "queryBuilder", "chainable onConflict doUpdate with set where");
    });

    it("chainable onConflict with array target doUpdate", () => {
        const builder = q.insert(q.t("users"), {
            name: "donna",
            email: "donna@example.com",
        }).onConflict([q.c("users.email"), q.c("users.name")]).doUpdate({
            name: "donna",
            updated_at: q.r`NOW()`,
        });
        expectQuery(builder, "queryBuilder", "chainable onConflict with array target doUpdate");
    });

    it("chainable onConflict with target where doUpdate", () => {
        const builder = q.insert(q.t("users"), {
            name: "donna",
            email: "donna@example.com",
        }).onConflict(q.c("users.email"), q.i("users.is_active").op("=").l(true)).doUpdate({
            name: "donna",
            updated_at: q.r`NOW()`,
        });
        expectQuery(builder, "queryBuilder", "chainable onConflict with target where doUpdate");
    });

    it("chainable onConflict doUpdate with array set", () => {
        const builder = q.insert(q.t("users"), {
            name: "donna",
            email: "donna@example.com",
        }).onConflict(q.c("users.email")).doUpdate([{
            name: "donna",
        }, {
            updated_at: q.r`NOW()`,
        }]);
        expectQuery(builder, "queryBuilder", "chainable onConflict doUpdate with array set");
    });

    it("onConstraint doNothing", () => {
        const builder = q.insert(q.t("users"), {
            name: "john",
            email: "john@example.com",
        }).onConflict().onConstraint(q.i("users_email_key")).doNothing();
        expectQuery(builder, "queryBuilder", "onConstraint doNothing");
    });

    it("onConstraint doUpdate", () => {
        const builder = q.insert(q.t("users"), {
            name: "donna",
            email: "donna@example.com",
        }).onConflict().onConstraint(q.i("users_email_key")).doUpdate({
            name: "donna",
            updated_at: q.r`NOW()`,
        });
        expectQuery(builder, "queryBuilder", "onConstraint doUpdate");
    });

    it("onConstraint with string doNothing", () => {
        const builder = q.insert(q.t("users"), {
            name: "john",
            email: "john@example.com",
        }).onConflict().onConstraint(q.c("users_email_key")).doNothing();
        expectQuery(builder, "queryBuilder", "onConstraint with string doNothing");
    });
});

describe("transaction queries", () => {
    it("beginTransactionQuery", () => {
        const builder = q.beginTransaction();
        expectQuery(builder, "queryBuilder", "beginTransactionQuery");
    });

    it("commitTransactionQuery", () => {
        const builder = q.commitTransaction();
        expectQuery(builder, "queryBuilder", "commitTransactionQuery");
    });

    it("rollbackTransactionQuery", () => {
        const builder = q.rollbackTransaction();
        expectQuery(builder, "queryBuilder", "rollbackTransactionQuery");
    });

    it("savepointTransactionQuery", () => {
        const builder = q.savepointTransaction(q.c("sp1"));
        expectQuery(builder, "queryBuilder", "savepointTransactionQuery");
    });

    it("transactionQuery", () => {
        const builder = q.transaction(
            q.insert(q.t("users"), {
                name: "hana",
                email: "hana@example.com",
            }),
            q.savepointTransaction(q.c("sp_insert_profile")),
            q.update(q.t("users")).set({
                updated_at: q.r`NOW()`,
            }).where(q.i("users.email").op("=").l("hana@example.com")),
        );
        expectQuery(builder, "queryBuilder", "transactionQuery");
    });

    it("rawLimitOffsetQuery", () => {
        const builder = q.select("*").from(q.t("posts")).limit(q.rs("ALL")).offset(q.rs("10"));
        expectQuery(builder, "queryBuilder", "rawLimitOffsetQuery");
    });
});

describe("rebuild queries", () => {
    it("rebuilds a simple query from instanceStructure", () => {
        const builder = q
            .select(q.c("users.id"), q.c("users.name"))
            .from(q.t("users"))
            .where(q.i("users.active").op("=").v(true));

        const sqlBefore = builder.getSql();
        const paramsBefore = builder.getSqlParameters();

        // builder.setTokens([]);
        // builder.rebuild();

        expect(builder.getSql()).toBe(sqlBefore);
        expect(builder.getSqlParameters()).toEqual(paramsBefore);
    });

    it("rebuilds query with nested subquery", () => {
        const sub = q.select(q.c("orders.user_id")).from(q.t("orders")).where(q.i("orders.total").op(">").v(100));
        const builder = q.select(q.c("users.id")).from(q.t("users")).where(q.i("users.id").in(sub));

        const sqlBefore = builder.getSql();
        const paramsBefore = builder.getSqlParameters();

        // builder.setTokens([]);
        // builder.rebuild();

        expect(builder.getSql()).toBe(sqlBefore);
        expect(builder.getSqlParameters()).toEqual(paramsBefore);
    });

    it("rebuild is idempotent", () => {
        const builder = q
                    .select(
                        account.userId, 
                        q.count("*"),
                        q.sub(
                            q.select(q.c("id"))
                                .from(account)
                                .where(q.i("is_active").op("=").l(true))
                                .r`AND ${q.i("created_at").op(">").l("2024-01-01")}`
                        ).as("active_accounts")
                    )
                    .from(account)
                    .groupBy(account.userId)
                    .innerJoin(account).on(q.c(account.userId).op("=").i("users.id"))
                    .r`WHERE users.is_active = ${true} AND users.created_at > ${"2024-01-01"}`;

        const sqlBefore = builder.getSql();
        const paramsBefore = builder.getSqlParameters();
        
        // builder.rebuild();
        // builder.rebuild();

        expect(builder.getSql()).toBe(sqlBefore);
        expect(builder.getSqlParameters()).toEqual(paramsBefore);
    });
});

describe("schema params", () => {
    const buildSchemaParamQuery = (): QueryBuilder => {
        const builder = q.select("*").from(q.t("users"));
        return builder
            .schemaCase(
                "filter",
                q.where(
                    q.ilike(
                        q.c("users.name"),
                        builder.schemaParam("name").string().default("test"),
                    ),
                ),
            )
            .limit(builder.schemaParam("limit").number().default(10));
    };

    const asQueryBuilder = (builder: unknown): QueryBuilder => builder as QueryBuilder;

    it("uses default value for schemaParam when runtime param is missing", () => {
        const builder = asQueryBuilder(buildSchemaParamQuery());
        expect(builder.getSql()).toBe("SELECT * FROM \"users\" LIMIT $1");
        expect(builder.getSqlParameters()).toEqual([10]);
    });

    it("overrides default schemaParam value from setParams", () => {
        const builder = asQueryBuilder(buildSchemaParamQuery().setParams({ limit: 5 }));
        expect(builder.getSql()).toBe("SELECT * FROM \"users\" LIMIT $1");
        expect(builder.getSqlParameters()).toEqual([5]);
    });

    it("skips schemaCase when value is undefined", () => {
        const builder = asQueryBuilder(buildSchemaParamQuery().setParams({ limit: 5 }));
        expect(builder.getSql()).toBe("SELECT * FROM \"users\" LIMIT $1");
        expect(builder.getSqlParameters()).toEqual([5]);
    });

    it("skips schemaCase when value is false", () => {
        const builder = asQueryBuilder(buildSchemaParamQuery().setParams({ filter: false, limit: 5 }));
        expect(builder.getSql()).toBe("SELECT * FROM \"users\" LIMIT $1");
        expect(builder.getSqlParameters()).toEqual([5]);
    });

    it("enables schemaCase with default nested params when value is true", () => {
        const builder = asQueryBuilder(buildSchemaParamQuery().setParams({ filter: true, limit: 5 }));
        expect(builder.getSql()).toBe ("SELECT * FROM \"users\" WHERE \"users\".\"name\" ILIKE $1 LIMIT $2");
        expect(builder.getSqlParameters()).toEqual(["test", 5]);
    });

    it("passes nested params object to schemaCase query", () => {
        const builder = asQueryBuilder(buildSchemaParamQuery().setParams({
            filter: { name: "john" },
            limit: 5,
        }));
        expect(builder.getSql()).toBe("SELECT * FROM \"users\" WHERE \"users\".\"name\" ILIKE $1 LIMIT $2");
        expect(builder.getSqlParameters()).toEqual(["john", 5]);
    });

    it("throws on schemaParam type mismatch", () => {
        expect(() => buildSchemaParamQuery().setParams({ limit: "5" })).toThrow(
            "Invalid value for SqlSchemaParam 'limit'",
        );
    });

    it("throws on nested schemaCase param type mismatch", () => {
        expect(() => buildSchemaParamQuery().setParams({
            filter: { name: 123 },
            limit: 5,
        })).toThrow("Invalid value for SqlSchemaParam 'name'");
    });
});

describe("validate()", () => {
    it("forwards meta only to execHandler", async () => {
        const execMetaList: unknown[] = [];
        const qValidate = sqlBuilder()
            .setFormatParamHandler("pg")
            .setExecutionHandler(async ({ meta }) => {
                execMetaList.push(meta);
                return [{ name: "John", age: 20 }];
            });

        const schema = z.array(z.object({
            name: z.string(),
            age: z.number(),
        }));

        const builder = qValidate
            .select("*")
            .from(qValidate.t("users"))
            .setValidation(schema);

        const result = await builder.execute({ requestId: "req-1" });
        expect(result).toEqual([{ name: "John", age: 20 }]);
        expect(execMetaList).toEqual([{ requestId: "req-1" }]);
    });

    it("throws when zod validation fails", async () => {
        const qValidate = sqlBuilder()
            .setFormatParamHandler("pg")
            .setExecutionHandler(async () => ([{ id: 10 }]));

        const builder = qValidate
            .select("*")
            .from(qValidate.t("users"))
            .setValidation(z.array(z.object({ id: z.string() })));

        await expect(
            builder.execute(),
        ).rejects.toThrow();
    });

    it("supports sqlSchema validate and execute(meta)", async () => {
        const execMetaList: unknown[] = [];
        const qValidate = sqlBuilder()
            .setFormatParamHandler("pg")
            .setExecutionHandler(async ({ meta }) => {
                execMetaList.push(meta);
                return [{ name: "Magma", age: 18 }];
            });

        const sch = sqlSchema().setQuery(
            "getMagma",
            sqlSchema()
                .set
                .query(
                    qValidate
                        .select("*")
                        .from(qValidate.t("users")),
                )
                .validation(
                    z.array(z.object({
                        name: z.string(),
                        age: z.number(),
                    })),
                ),
        );

        const result = await sch.query("getMagma").execute({ requestId: "schema-1" });
        expect(result).toEqual([{ name: "Magma", age: 18 }]);
        expect(execMetaList).toEqual([{ requestId: "schema-1" }]);
    });
});
