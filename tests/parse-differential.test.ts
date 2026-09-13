import { expect, test } from "bun:test";
import { sqlBuilder } from "../generated/gntrees-sql-builder/typescript/index";
import { compileAndRun } from "./compile-helper";
import { cParseProgram, parseC, type ParseOutput } from "./parse-c-result";

type Case = {
    name: string;
    query: (c: any) => any;
    cArgs: string;
    cSetup?: string;
};

const cases: Case[] = [
    {
        name: "postgres select from where limit",
        query: (c) => c.select(c.col("id")).from(c.table("users")).where(c.col("active").eq(true)).limit(10).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        select(col("id")),
        from(table("users")),
        where(ch(col("active"), eq(true))),
        limit(10)`,
    },
    {
        name: "mysql multi-column with order desc",
        query: (c) => c.select([c.col("id"), c.col("name")]).from(c.table("users")).where(c.col("age").gte(18)).orderBy(c.col("name").desc()).setDialect("mysql"),
        cArgs: `setDialect("mysql"),
        select(arr(col("id"), col("name"))),
        from(table("users")),
        where(ch(col("age"), gte(18))),
        orderBy(ch(col("name"), desc()))`,
    },
    {
        name: "nested and with gte",
        query: (c) => c.select(c.col("id")).from(c.table("users")).where(c.and([c.col("age").gte(18), c.col("active").eq(true)])).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        select(col("id")),
        from(table("users")),
        where(ch(and(arr(
            ch(col("age"), gte(18)),
            ch(col("active"), eq(true))))))`,
    },
    {
        name: "nested or with not",
        query: (c) => c.select(c.col("id")).from(c.table("users")).where(c.or([c.col("a").eq(1), c.not(c.col("b").eq(2))])).setDialect("mysql"),
        cArgs: `setDialect("mysql"),
        select(col("id")),
        from(table("users")),
        where(ch(or(arr(
            ch(col("a"), eq(1)),
            not(ch(col("b"), eq(2)))))))`,
    },
    {
        name: "between",
        query: (c) => c.select(c.col("id")).where(c.col("x").between(1, 2)).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        select(col("id")),
        where(ch(col("x"), between(1, 2)))`,
    },
    {
        name: "is null",
        query: (c) => c.select(c.col("id")).where(c.col("x").isNull()).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        select(col("id")),
        where(ch(col("x"), isNull()))`,
    },
    {
        name: "is not null",
        query: (c) => c.select(c.col("id")).where(c.col("x").isNotNull()).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        select(col("id")),
        where(ch(col("x"), isNotNull()))`,
    },
    {
        name: "in with literal list",
        query: (c) => c.select(c.col("id")).where(c.col("x").in("1,2,3")).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        select(col("id")),
        where(ch(col("x"), in("1,2,3")))`,
    },
    {
        name: "group by",
        query: (c) => c.select(c.col("x")).from(c.table("t")).groupBy(c.col("x")).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        select(col("x")),
        from(table("t")),
        groupBy(col("x"))`,
    },
    {
        name: "order by multiple directions",
        query: (c) => c.select(c.col("x")).from(c.table("t")).orderBy([c.col("name").asc(), c.col("age").desc()]).setDialect("mysql"),
        cArgs: `setDialect("mysql"),
        select(col("x")),
        from(table("t")),
        orderBy(arr(ch(col("name"), asc()), ch(col("age"), desc())))`,
    },
    {
        name: "limit and offset",
        query: (c) => c.select(c.col("id")).from(c.table("t")).limit(5).offset(10).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        select(col("id")),
        from(table("t")),
        limit(5),
        offset(10)`,
    },
    {
        name: "three placeholders in and",
        query: (c) => c.select(c.col("id")).where(c.and([c.col("a").eq(1), c.col("b").eq(2), c.col("c").eq(3)])).setDialect("mysql"),
        cArgs: `setDialect("mysql"),
        select(col("id")),
        where(ch(and(arr(
            ch(col("a"), eq(1)),
            ch(col("b"), eq(2)),
            ch(col("c"), eq(3))))))`,
    },
    {
        name: "postgres column comparison",
        query: (c) => c.select(c.col("id")).from(c.table("users")).where(c.col("a").eq(c.col("b"))).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        select(col("id")),
        from(table("users")),
        where(ch(col("a"), eq(ch(col("b")))))`,
    },
    {
        name: "postgres join on column equality",
        query: (c) => c.select(c.col("id")).from(c.table("users")).join(c.table("posts"), c.col("users.id").eq(c.col("posts.user_id"))).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        select(col("id")),
        from(table("users")),
        join(table("posts"), ch(col("users.id"), eq(ch(col("posts.user_id")))))`,
    },
    {
        name: "mysql left join",
        query: (c) => c.select(c.col("id")).from(c.table("users")).leftJoin(c.table("posts"), c.col("users.id").eq(c.col("posts.user_id"))).setDialect("mysql"),
        cArgs: `setDialect("mysql"),
        select(col("id")),
        from(table("users")),
        leftJoin(table("posts"), ch(col("users.id"), eq(ch(col("posts.user_id")))))`,
    },
    {
        name: "postgres group by having",
        query: (c) => c.select(c.col("x")).from(c.table("t")).groupBy(c.col("x")).having(c.col("count").gt(1)).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        select(col("x")),
        from(table("t")),
        groupBy(col("x")),
        having(ch(col("count"), gt(1)))`,
    },
    {
        name: "postgres between with column bounds",
        query: (c) => c.select(c.col("id")).where(c.col("x").between(c.col("lo"), c.col("hi"))).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        select(col("id")),
        where(ch(col("x"), between(ch(col("lo")), ch(col("hi")))))`,
    },
    {
        name: "postgres aliased columns and tables",
        query: (c) =>
            c.select(c.col("x").as("alias"))
                .from(c.table("users").as("u"))
                .join(c.table("posts").as("p"), c.col("u.id").eq(c.col("p.uid")))
                .setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        select(ch(col("x"), as("alias"))),
        from(ch(table("users"), as("u"))),
        join(ch(table("posts"), as("p")), ch(col("u.id"), eq(ch(col("p.uid")))))`,
    },
    {
        name: "postgres generic operator",
        query: (c) => c.select(c.col("id")).where(c.col("a").op("~", "x")).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        select(col("id")),
        where(ch(col("a"), op("~", "x")))`,
    },
    {
        name: "postgres single CTE",
        query: (c) =>
            c.with(c.select(c.col("id")).from(c.table("users")), "cte")
                .select(c.col("id"))
                .from(c.table("cte"))
                .setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        with(ch(select(col("id")), from(table("users"))), "cte"),
        select(col("id")),
        from(table("cte"))`,
    },
    {
        name: "postgres CTE parameters precede outer parameters",
        query: (c) =>
            c.with(c.select(c.col("id")).from(c.table("users")).where(c.col("active").eq(true)), "cte")
                .select(c.col("id"))
                .from(c.table("cte"))
                .where(c.col("id").gt(5))
                .setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        with(ch(select(col("id")), from(table("users")), where(ch(col("active"), eq(true)))), "cte"),
        select(col("id")),
        from(table("cte")),
        where(ch(col("id"), gt(5)))`,
    },
    {
        name: "postgres returning clause",
        query: (c) => c.select(c.col("id")).from(c.table("t")).returning(c.col("id")).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        select(col("id")),
        from(table("t")),
        returning(col("id"))`,
    },
    {
        name: "postgres update with map",
        query: (c) => c.update(c.table("users"), { name: "bob", age: 3 }).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        update(table("users"), map(entry("name", "bob"), entry("age", 3)))`,
    },
    {
        name: "postgres insert from map",
        query: (c) => c.insert(c.table("users"), { name: "bob" }).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        insert(table("users"), map(entry("name", "bob")))`,
    },
    {
        name: "postgres delete",
        query: (c) => c.delete(c.table("users")).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        delete(table("users"))`,
    },
    {
        name: "postgres values tuples",
        query: (c) => c.values([["a", "b"], ["c", "d"]]).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        values(arr(arr("a", "b"), arr("c", "d")))`,
    },
    {
        name: "postgres values tuples with mixed types",
        query: (c) => c.values([["a", 1], ["b", 2]]).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        values(arr(arr("a", 1), arr("b", 2)))`,
    },
    {
        name: "postgres on conflict do update",
        query: (c) =>
            c.insert(c.table("t"), { name: "x" })
                .onConflictDoUpdate(c.col("id"), { name: "y" })
                .setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        insert(table("t"), map(entry("name", "x"))),
        onConflictDoUpdate(col("id"), map(entry("name", "y")))`,
    },
    {
        name: "mysql raw template literal",
        query: (c) => c.raw`SELECT ${c.col("id")} FROM ${c.table("t")}`.setDialect("mysql"),
        cArgs: `setDialect("mysql"),
        raw("SELECT ", col("id"), " FROM ", table("t"))`,
    },
    {
        name: "postgres exists subquery",
        query: (c) =>
            c.select(c.col("id"))
                .from(c.table("users"))
                .where(c.exists(c.select(c.col("id")).from(c.table("posts")).where(c.col("posts.user_id").eq(c.col("users.id")))))
                .setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        select(col("id")),
        from(table("users")),
        where(ch(exists(ch(select(col("id")), from(table("posts")), where(ch(col("posts.user_id"), eq(ch(col("users.id")))))))))`,
    },
    {
        name: "postgres in subquery",
        query: (c) =>
            c.select(c.col("id"))
                .from(c.table("users"))
                .where(c.col("id").in(c.select(c.col("uid")).from(c.table("members"))))
                .setDialect("postgres"),
        cSetup: `Builder inSub = ch(select(col("uid")), from(table("members")));`,
        cArgs: `setDialect("postgres"),
        select(col("id")),
        from(table("users")),
        where(ch(col("id"), in(inSub)))`,
    },
    {
        name: "postgres scalar subquery with alias",
        query: (c) =>
            c.select(c.select(c.col("cnt")).from(c.table("t")).as("c"))
                .from(c.table("u"))
                .setDialect("postgres"),
        cSetup: `Builder scalarSub = ch(select(col("cnt")), from(table("t")), as("c"));`,
        cArgs: `setDialect("postgres"),
        select(scalarSub),
        from(table("u"))`,
    },
    {
        name: "postgres from subquery with alias",
        query: (c) =>
            c.select(c.col("id"))
                .from(c.select(c.col("id")).from(c.table("users")).as("u"))
                .setDialect("postgres"),
        cSetup: `Builder fromSub = ch(select(col("id")), from(table("users")), as("u"));`,
        cArgs: `setDialect("postgres"),
        select(col("id")),
        from(fromSub)`,
    },
    {
        name: "postgres exists subquery parameter order",
        query: (c) =>
            c.select(c.col("id"))
                .from(c.table("users"))
                .where(c.exists(c.select(c.col("id")).from(c.table("orders")).where(c.col("total").gt(100))))
                .where(c.col("active").eq(true))
                .setDialect("postgres"),
        cSetup: `Builder orderSub = ch(select(col("id")), from(table("orders")), where(ch(col("total"), gt(100))));`,
        cArgs: `setDialect("postgres"),
        select(col("id")),
        from(table("users")),
        where(ch(exists(orderSub))),
        where(ch(col("active"), eq(true)))`,
    },
    {
        name: "mysql nested subquery",
        query: (c) =>
            c.select(c.col("id"))
                .where(c.col("id").in(
                    c.select(c.col("uid")).from(c.table("m")).where(
                        c.col("uid").in(c.select(c.col("id")).from(c.table("b")).where(c.col("ok").eq(true))),
                    ),
                ))
                .setDialect("mysql"),
        cArgs: `setDialect("mysql"),
        select(col("id")),
        where(ch(col("id"), in(ch(select(col("uid")), from(table("m")), where(ch(col("uid"), in(ch(select(col("id")), from(table("b")), where(ch(col("ok"), eq(true)))))))))))`,
    },
    {
        name: "postgres update set subquery",
        query: (c) =>
            c.update(c.table("t"), { x: c.select(c.col("id")).from(c.table("b")) })
                .setDialect("postgres"),
        cSetup: `Builder setSub = ch(select(col("id")), from(table("b")));`,
        cArgs: `setDialect("postgres"),
        update(table("t"), map(entry("x", setSub)))`,
    },
    {
        name: "postgres insert subquery value",
        query: (c) =>
            c.insert(c.table("t"), { x: c.select(c.col("id")).from(c.table("b")) })
                .setDialect("postgres"),
        cSetup: `Builder insSub = ch(select(col("id")), from(table("b")));`,
        cArgs: `setDialect("postgres"),
        insert(table("t"), map(entry("x", insSub)))`,
    },
    {
        name: "postgres values with subquery element",
        query: (c) =>
            c.values([[c.select(c.col("id")).from(c.table("b")), 1]])
                .setDialect("postgres"),
        cSetup: `Builder valSub = ch(select(col("id")), from(table("b")));`,
        cArgs: `setDialect("postgres"),
        values(arr(arr(valSub, 1)))`,
    },
    {
        name: "postgres exists without subquery",
        query: (c) => c.select(c.col("id")).where(c.exists(c.col("x"))).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        select(col("id")),
        where(ch(exists(col("x"))))`,
    },
    {
        name: "postgres transaction block",
        query: (c) =>
            c.transaction([c.insert(c.table("t"), { a: 1 }), c.insert(c.table("u"), { b: 2 })])
                .setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        transaction(arr(insert(table("t"), map(entry("a", 1))), insert(table("u"), map(entry("b", 2)))))`,
    },
];

for (const { name, query, cArgs, cSetup } of cases) {
    test(`differential TS<->C: ${name}`, () => {
        const c = sqlBuilder("q") as any;
        const expected: ParseOutput = query(c).parse();
        const setup = cSetup ? `${cSetup}\n    ` : "";
        const runner = cParseProgram(`${setup}Builder qb = sqlBuilder(variableName("q"), ${cArgs});`);
        const { status, stderr, stdout } = compileAndRun(runner);
        expect(stderr).not.toContain("validate:");
        expect(status).toBe(0);
        expect(parseC(stdout)).toEqual(expected);
    }, 60000);
}
