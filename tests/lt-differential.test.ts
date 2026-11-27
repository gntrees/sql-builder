// Differential: the .lt implementation must produce byte-identical SQL to the
// frozen legacy TypeScript implementation, for every case the legacy API can
// still express. The legacy copy lives in tests/reference/legacy-ts/ and is
// never regenerated; when this file goes green and stays green, the reference
// can be deleted.
import { describe, expect, test } from "bun:test";

import {
    sqlBuilder,
} from "../tests/reference/legacy-ts/index";
import { LList } from "../generated/lt-sql-builder/typescript/_lingua_rt";
import { Query } from "../generated/lt-sql-builder/typescript/src/sql";
import { Node } from "../generated/lt-sql-builder/typescript/src/sql";
import { Assignment } from "../generated/lt-sql-builder/typescript/src/sql";
import { Users, Posts } from "../generated/lt-sql-builder/typescript/src/schema";
import { type Value } from "../generated/lt-sql-builder/typescript/src/value";

const list = <T,>(items: T[]): LList<T> => new LList<T>(items);

type Outcome = { sql: string; param: unknown[]; sqlWithParam: string };

const legacy = () => sqlBuilder("qb") as any;

function unwrap(result: any): Outcome {
    if (result.tag === "err") {
        throw new Error(`parse failed: ${JSON.stringify(result.values[0])}`);
    }
    const parsed = result.values[0];
    return {
        sql: parsed.sql,
        param: parsed.param.items.map(native),
        sqlWithParam: parsed.sqlWithParam,
    };
}

function native(value: Value): unknown {
    const [tag, payload] = [value.tag, value.values[0]];
    switch (tag) {
        case "Null":
            return null;
        case "Bool":
        case "Str":
            return payload;
        case "Int":
            return Number(payload);
        case "Float":
            return payload;
        default:
            throw new Error(`unexpected value tag ${tag}`);
    }
}

function diff(name: string, build: () => [any, any]) {
    test(name, () => {
        const [legacyResult, nextResult] = build();
        expect(unwrap(nextResult)).toEqual(legacyResult);
    });
}

describe("legacy parity (postgres)", () => {
    diff("select, from, where, limit", () => {
        const c = legacy();
        return [
            c
                .select(c.col("id"))
                .from(c.table("users"))
                .where(c.col("active").eq(true))
                .limit(10)
                .setDialect("postgres")
                .parse(),
            Query.create()
                .select(list([Node.col("id")]))
                .fromTable(Node.table("users"))
                .where(list([Node.col("active").eq(Node.bool(true))]))
                .limit(Node.int(10n))
                .setDialect("postgres")
                .parse(),
        ];
    });

    diff("column list, gte, order by desc", () => {
        const c = legacy();
        return [
            c
                .select([c.col("id"), c.col("name")])
                .from(c.table("users"))
                .where(c.col("age").gte(18))
                .orderBy(c.col("name").desc())
                .setDialect("postgres")
                .parse(),
            Query.create()
                .select(list([Node.col("id"), Node.col("name")]))
                .fromTable(Node.table("users"))
                .where(list([Node.col("age").gte(Node.int(18n))]))
                .orderBy(list([Node.col("name").desc()]))
                .setDialect("postgres")
                .parse(),
        ];
    });

    diff("qualified identifiers", () => {
        const c = legacy();
        return [
            c
                .select(c.col("users.id"))
                .from(c.table("public.users"))
                .setDialect("postgres")
                .parse(),
            Query.create()
                .select(list([Node.col("users.id")]))
                .fromTable(Node.table("public.users"))
                .setDialect("postgres")
                .parse(),
        ];
    });

    diff("and group", () => {
        const c = legacy();
        return [
            c
                .select(c.col("id"))
                .where(c.and([c.col("a").eq(1), c.col("b").eq(2)]))
                .setDialect("postgres")
                .parse(),
            Query.create()
                .select(list([Node.col("id")]))
                .where(list([Node.col("a").eq(Node.int(1n)).and(list([Node.col("b").eq(Node.int(2n))]))]))
                .setDialect("postgres")
                .parse(),
        ];
    });

    diff("or group with negated condition", () => {
        const c = legacy();
        return [
            c
                .select(c.col("id"))
                .where(c.or([c.col("a").eq(1), c.not(c.col("b").eq(2))]))
                .setDialect("postgres")
                .parse(),
            Query.create()
                .select(list([Node.col("id")]))
                .where(list([Node.col("a").eq(Node.int(1n)).or(list([Node.col("b").eq(Node.int(2n)).not()]))]))
                .setDialect("postgres")
                .parse(),
        ];
    });

    diff("is null and is not null", () => {
        const c = legacy();
        return [
            c
                .select(c.col("id"))
                .where(c.and([c.col("x").isNull(), c.col("y").isNotNull()]))
                .setDialect("postgres")
                .parse(),
            Query.create()
                .select(list([Node.col("id")]))
                .where(list([Node.col("x").isNull().and(list([Node.col("y").isNotNull()]))]))
                .setDialect("postgres")
                .parse(),
        ];
    });

    diff("string literal escapes quotes", () => {
        const c = legacy();
        return [
            c
                .select(c.col("id"))
                .where(c.col("name").eq("o'brien"))
                .setDialect("postgres")
                .parse(),
            Query.create()
                .select(list([Node.col("id")]))
                .where(list([Node.col("name").eq(Node.str("o'brien"))]))
                .setDialect("postgres")
                .parse(),
        ];
    });

    diff("raw text without interpolation", () => {
        const c = legacy();
        return [
            c.select(c.col("id")).from(c.table("t")).where(c.raw`x = 5`).setDialect("postgres").parse(),
            Query.create()
                .select(list([Node.col("id")]))
                .fromTable(Node.table("t"))
                .where(list([Node.raw("x = 5")]))
                .setDialect("postgres")
                .parse(),
        ];
    });

    diff("parameter numbering continues across clauses", () => {
        const c = legacy();
        return [
            c
                .select(c.col("id"))
                .from(c.table("users"))
                .where(c.and([c.col("a").eq(1), c.col("b").eq("x")]))
                .limit(5)
                .offset(10)
                .setDialect("postgres")
                .parse(),
            Query.create()
                .select(list([Node.col("id")]))
                .fromTable(Node.table("users"))
                .where(list([Node.col("a").eq(Node.int(1n)).and(list([Node.col("b").eq(Node.str("x"))]))]))
                .limit(Node.int(5n))
                .offset(Node.int(10n))
                .setDialect("postgres")
                .parse(),
        ];
    });
});

describe("legacy parity (postgres, DML and clauses)", () => {
    diff("update with column values", () => {
        const c = legacy();
        return [
            c.update(c.table("users"), { name: "ana", age: 2 }).setDialect("postgres").parse(),
            Query.create()
                .update(
                    Node.table("users"),
                    list([Assignment.str("name", "ana"), Assignment.int("age", 2n)]),
                )
                .setDialect("postgres")
                .parse(),
        ];
    });

    diff("insert with returning", () => {
        const c = legacy();
        return [
            c
                .insert(c.table("users"), { name: "ana" })
                .returning(c.col("id"))
                .setDialect("postgres")
                .parse(),
            Query.create()
                .insert(Node.table("users"), list([Assignment.str("name", "ana")]))
                .returning(list([Node.col("id")]))
                .setDialect("postgres")
                .parse(),
        ];
    });

    diff("delete with where", () => {
        const c = legacy();
        return [
            c.delete(c.table("users")).where(c.col("id").eq(1)).setDialect("postgres").parse(),
            Query.create()
                .deleteFrom(Node.table("users"))
                .where(list([Node.col("id").eq(Node.int(1n))]))
                .setDialect("postgres")
                .parse(),
        ];
    });

    diff("update with where", () => {
        const c = legacy();
        return [
            c
                .update(c.table("users"), { name: "a" })
                .where(c.col("id").eq(1))
                .setDialect("postgres")
                .parse(),
            Query.create()
                .update(Node.table("users"), list([Assignment.str("name", "a")]))
                .where(list([Node.col("id").eq(Node.int(1n))]))
                .setDialect("postgres")
                .parse(),
        ];
    });

    diff("group by and having", () => {
        const c = legacy();
        return [
            c
                .select([c.col("dept"), c.col("n")])
                .from(c.table("t"))
                .groupBy(c.col("dept"))
                .having(c.col("n").gt(1))
                .setDialect("postgres")
                .parse(),
            Query.create()
                .select(list([Node.col("dept"), Node.col("n")]))
                .fromTable(Node.table("t"))
                .groupBy(list([Node.col("dept")]))
                .having(list([Node.col("n").gt(Node.int(1n))]))
                .setDialect("postgres")
                .parse(),
        ];
    });

    diff("left join", () => {
        const c = legacy();
        return [
            c
                .select(c.col("u.id"))
                .from(c.table("users"))
                .leftJoin(c.table("posts"), c.col("posts.user_id").eq(c.col("u.id")))
                .setDialect("postgres")
                .parse(),
            Query.create()
                .select(list([Node.col("u.id")]))
                .fromTable(Node.table("users"))
                .leftJoin(
                    Node.table("posts"),
                    list([Node.col("posts.user_id").eq(Node.col("u.id"))]),
                )
                .setDialect("postgres")
                .parse(),
        ];
    });

    diff("in with text", () => {
        const c = legacy();
        return [
            c.select(c.col("id")).where(c.col("x").in("1,2,3")).setDialect("postgres").parse(),
            Query.create()
                .select(list([Node.col("id")]))
                .where(list([Node.col("x").inText("1,2,3")]))
                .setDialect("postgres")
                .parse(),
        ];
    });

    diff("between with columns", () => {
        const c = legacy();
        return [
            c
                .select(c.col("id"))
                .where(c.col("x").between(c.col("lo"), c.col("hi")))
                .setDialect("postgres")
                .parse(),
            Query.create()
                .select(list([Node.col("id")]))
                .where(list([Node.col("x").between(Node.col("lo"), Node.col("hi"))]))
                .setDialect("postgres")
                .parse(),
        ];
    });

    diff("like and ilike", () => {
        const c = legacy();
        return [
            c
                .select(c.col("id"))
                .where(c.and([c.col("a").like("x%"), c.col("b").ilike("y%")]))
                .setDialect("postgres")
                .parse(),
            Query.create()
                .select(list([Node.col("id")]))
                .where(
                    list([
                        Node.col("a")
                            .like(Node.str("x%"))
                            .and(list([Node.col("b").ilike(Node.str("y%"))])),
                    ]),
                )
                .setDialect("postgres")
                .parse(),
        ];
    });

    diff("values rows", () => {
        const c = legacy();
        return [
            c.values([["a", "b"], ["c", "d"]]).setDialect("postgres").parse(),
            Query.create()
                .values(
                    list([
                        list([Node.str("a"), Node.str("b")]),
                        list([Node.str("c"), Node.str("d")]),
                    ]),
                )
                .setDialect("postgres")
                .parse(),
        ];
    });

    diff("on conflict do nothing", () => {
        const c = legacy();
        return [
            c
                .insert(c.table("t"), { name: "x" })
                .onConflictDoNothing(c.col("id"))
                .setDialect("postgres")
                .parse(),
            Query.create()
                .insert(Node.table("t"), list([Assignment.str("name", "x")]))
                .onConflictDoNothing(Node.col("id"))
                .setDialect("postgres")
                .parse(),
        ];
    });

    diff("on conflict do update", () => {
        const c = legacy();
        return [
            c
                .insert(c.table("t"), { name: "x" })
                .onConflictDoUpdate(c.col("id"), { name: "y" })
                .setDialect("postgres")
                .parse(),
            Query.create()
                .insert(Node.table("t"), list([Assignment.str("name", "x")]))
                .onConflictDoUpdate(Node.col("id"), list([Assignment.str("name", "y")]))
                .setDialect("postgres")
                .parse(),
        ];
    });
});

describe("legacy parity (postgres, subqueries)", () => {
    const legacySub = () => {
        const c = legacy();
        return c.select(c.col("uid")).from(c.table("members")).where(c.col("ok").eq(true));
    };

    const nextSub = () =>
        Query.create()
            .select(list([Node.col("uid")]))
            .fromTable(Node.table("members"))
            .where(list([Node.col("ok").eq(Node.bool(true))]));

    diff("exists subquery", () => {
        const c = legacy();
        return [
            c
                .select(c.col("id"))
                .from(c.table("users"))
                .where(c.exists(legacySub()))
                .setDialect("postgres")
                .parse(),
            Query.create()
                .select(list([Node.col("id")]))
                .fromTable(Node.table("users"))
                .where(list([Node.exists(nextSub())]))
                .setDialect("postgres")
                .parse(),
        ];
    });

    diff("in subquery", () => {
        const c = legacy();
        return [
            c
                .select(c.col("id"))
                .from(c.table("users"))
                .where(c.col("id").in(legacySub()))
                .setDialect("postgres")
                .parse(),
            Query.create()
                .select(list([Node.col("id")]))
                .fromTable(Node.table("users"))
                .where(list([Node.col("id").inQuery(nextSub())]))
                .setDialect("postgres")
                .parse(),
        ];
    });

    diff("with clause", () => {
        const c = legacy();
        return [
            c.with(legacySub(), "active").select(c.col("id")).from(c.table("active")).setDialect("postgres").parse(),
            Query.create()
                .withCte(nextSub(), "active")
                .select(list([Node.col("id")]))
                .fromTable(Node.table("active"))
                .setDialect("postgres")
                .parse(),
        ];
    });

    diff("parameter numbering across a subquery", () => {
        const c = legacy();
        return [
            c
                .select(c.col("id"))
                .from(c.table("t"))
                .where(c.and([c.col("a").eq(1), c.exists(legacySub())]))
                .limit(5)
                .setDialect("postgres")
                .parse(),
            Query.create()
                .select(list([Node.col("id")]))
                .fromTable(Node.table("t"))
                .where(
                    list([
                        Node.col("a")
                            .eq(Node.int(1n))
                            .and(list([Node.exists(nextSub())])),
                    ]),
                )
                .limit(Node.int(5n))
                .setDialect("postgres")
                .parse(),
        ];
    });
});

function errorDiff(name: string, build: () => [() => any, () => any]) {
    test(name, () => {
        const [legacyRun, nextRun] = build();
        let legacyMessage = "";
        try {
            legacyRun();
        } catch (error) {
            legacyMessage = (error as Error).message;
        }
        expect(legacyMessage).not.toBe("");

        const result = nextRun();
        if (result.tag !== "err") {
            throw new Error("expected the .lt implementation to reject this query");
        }
        expect(legacyMessage).toContain(result.values[0].values[0]);
    });
}

describe("legacy parity (mysql)", () => {
    diff("select, order by, limit", () => {
        const c = legacy();
        return [
            c
                .select([c.col("id"), c.col("name")])
                .from(c.table("users"))
                .where(c.col("a").eq(1))
                .orderBy(c.col("name").desc())
                .limit(10)
                .setDialect("mysql")
                .parse(),
            Query.create()
                .select(list([Node.col("id"), Node.col("name")]))
                .fromTable(Node.table("users"))
                .where(list([Node.col("a").eq(Node.int(1n))]))
                .orderBy(list([Node.col("name").desc()]))
                .limit(Node.int(10n))
                .setDialect("mysql")
                .parse(),
        ];
    });

    diff("insert and update", () => {
        const c = legacy();
        return [
            c.update(c.table("users"), { name: "a" }).where(c.col("id").eq(1)).setDialect("mysql").parse(),
            Query.create()
                .update(Node.table("users"), list([Assignment.str("name", "a")]))
                .where(list([Node.col("id").eq(Node.int(1n))]))
                .setDialect("mysql")
                .parse(),
        ];
    });

    diff("values uses ROW", () => {
        const c = legacy();
        return [
            c.values([["a", 1], ["b", 2]]).setDialect("mysql").parse(),
            Query.create()
                .values(
                    list([
                        list([Node.str("a"), Node.int(1n)]),
                        list([Node.str("b"), Node.int(2n)]),
                    ]),
                )
                .setDialect("mysql")
                .parse(),
        ];
    });

    diff("ilike falls back to LIKE", () => {
        const c = legacy();
        return [
            c.select(c.col("id")).where(c.col("x").ilike("a%")).setDialect("mysql").parse(),
            Query.create()
                .select(list([Node.col("id")]))
                .where(list([Node.col("x").ilike(Node.str("a%"))]))
                .setDialect("mysql")
                .parse(),
        ];
    });

    diff("exists subquery", () => {
        const c = legacy();
        const sub = c.select(c.col("uid")).from(c.table("m")).where(c.col("ok").eq(true));
        return [
            c.select(c.col("id")).where(c.exists(sub)).setDialect("mysql").parse(),
            Query.create()
                .select(list([Node.col("id")]))
                .where(
                    list([
                        Node.exists(
                            Query.create()
                                .select(list([Node.col("uid")]))
                                .fromTable(Node.table("m"))
                                .where(list([Node.col("ok").eq(Node.bool(true))])),
                        ),
                    ]),
                )
                .setDialect("mysql")
                .parse(),
        ];
    });

    errorDiff("full join is rejected", () => {
        const c = legacy();
        return [
            () => c.select(c.col("a")).from(c.table("t")).fullJoin(c.table("u"), c.col("t.x").eq(c.col("u.x"))).setDialect("mysql").parse(),
            () =>
                Query.create()
                    .select(list([Node.col("a")]))
                    .fromTable(Node.table("t"))
                    .fullJoin(Node.table("u"), list([Node.col("t.x").eq(Node.col("u.x"))]))
                    .setDialect("mysql")
                    .parse(),
        ];
    });

    errorDiff("returning is rejected", () => {
        const c = legacy();
        return [
            () => c.insert(c.table("t"), { a: 1 }).returning(c.col("id")).setDialect("mysql").parse(),
            () =>
                Query.create()
                    .insert(Node.table("t"), list([Assignment.int("a", 1n)]))
                    .returning(list([Node.col("id")]))
                    .setDialect("mysql")
                    .parse(),
        ];
    });

    errorDiff("on conflict do nothing is rejected", () => {
        const c = legacy();
        return [
            () =>
                c
                    .insert(c.table("t"), { name: "x" })
                    .onConflictDoNothing(c.col("id"))
                    .setDialect("mysql")
                    .parse(),
            () =>
                Query.create()
                    .insert(Node.table("t"), list([Assignment.str("name", "x")]))
                    .onConflictDoNothing(Node.col("id"))
                    .setDialect("mysql")
                    .parse(),
        ];
    });
});

describe("typed schema produces the same SQL", () => {
    diff("typed columns with filters and ordering", () => {
        const c = legacy();
        return [
            c
                .select([c.col("users.id"), c.col("users.name")])
                .from(c.table("users"))
                .where(c.and([c.col("users.active").eq(true), c.col("users.age").gte(18)]))
                .orderBy(c.col("users.name").desc())
                .setDialect("postgres")
                .parse(),
            Query.create()
                .select(list([Users.id().node(), Users.name().node()]))
                .fromTable(Users.table().node())
                .where(list([Users.active().eqBool(true).and(list([Users.age().gteInt(18n)]))]))
                .orderBy(list([Users.name().desc()]))
                .setDialect("postgres")
                .parse(),
        ];
    });

    diff("typed join", () => {
        const c = legacy();
        return [
            c
                .select([c.col("users.id")])
                .from(c.table("users"))
                .innerJoin(c.table("posts"), c.col("posts.user_id").eq(c.col("users.id")))
                .setDialect("postgres")
                .parse(),
            Query.create()
                .select(list([Users.id().node()]))
                .fromTable(Users.table().node())
                .innerJoin(Posts.table().node(), list([Posts.userId().eq(Users.id().node())]))
                .setDialect("postgres")
                .parse(),
        ];
    });
});
