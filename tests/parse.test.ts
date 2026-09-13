import { expect, test } from "bun:test";
import { sqlBuilder } from "../generated/gntrees-sql-builder/typescript/index";

const qb = () => sqlBuilder("qb") as any;

const firstArg = (schema: any): any => {
    const value = schema.schema.chain.chain.values[0];
    if (!("functionCall" in value)) throw new Error("expected a function call");
    return value.functionCall.arguments[0];
};

test("template literal with undefined expression throws", () => {
    expect(() => qb().raw`a ${undefined}`).toThrow("union");
});

test("template literal with too many expressions throws", () => {
    expect(() => (qb().raw as any)(["a"], "x", "y")).toThrow("expression");
});

test("template literal with too few expressions throws", () => {
    expect(() => (qb().raw as any)(["a", "b", "c"], "x")).toThrow("expression");
});
test("template literal records string parts and normalized expressions", () => {
    const schema = qb().raw`SELECT ${"x"} FROM ${18}`.getSchema();
    const args = (schema.schema.chain.chain.values[0] as any).functionCall.arguments;
    expect(args[0].argument).toEqual({ string: { value: "SELECT " } });
    expect(args[1].argument).toEqual({ string: { value: "x" } });
    expect(args[2].argument).toEqual({ string: { value: " FROM " } });
    expect(args[3].argument).toEqual({ number: { value: 18 } });
});
test("parse builds postgres sql with placeholders and params", () => {
    const c = qb();
    const result = c
        .select(c.col("id"))
        .from(c.table("users"))
        .where(c.col("active").eq(true))
        .limit(10)
        .setDialect("postgres")
        .parse();
    expect(result).toEqual({
        sql: 'SELECT "id" FROM "users" WHERE "active" = $1 LIMIT $2',
        param: [true, 10],
        sqlWithParam: 'SELECT "id" FROM "users" WHERE "active" = TRUE LIMIT 10',
    });
});

test("parse builds mysql sql with question-mark placeholders", () => {
    const c = qb();
    const result = c
        .select([c.col("id"), c.col("name")])
        .from(c.table("users"))
        .where(c.col("age").gte(18))
        .orderBy(c.col("name").desc())
        .setDialect("mysql")
        .parse();
    expect(result).toEqual({
        sql: "SELECT `id`, `name` FROM `users` WHERE `age` >= ? ORDER BY `name` DESC",
        param: [18],
        sqlWithParam: "SELECT `id`, `name` FROM `users` WHERE `age` >= 18 ORDER BY `name` DESC",
    });
});

test("parse requires setDialect before parse", () => {
    const c = qb();
    expect(() => c.select(c.col("id")).parse()).toThrow(/setDialect/);
});

test("parse rejects unsupported dialect", () => {
    const c = qb();
    expect(() => c.select(c.col("id")).setDialect("sqlite").parse()).toThrow(/unsupported dialect/);
});

test("parse builds nested and predicate", () => {
    const c = qb();
    const result = c.select(c.col("id")).where(c.and([c.col("a").eq(1), c.col("b").eq(2)])).setDialect("postgres").parse();
    expect(result).toEqual({
        sql: 'SELECT "id" WHERE ( "a" = $1 AND "b" = $2 )',
        param: [1, 2],
        sqlWithParam: 'SELECT "id" WHERE ( "a" = 1 AND "b" = 2 )',
    });
});

test("parse builds or with not predicate", () => {
    const c = qb();
    const result = c.select(c.col("id")).where(c.or([c.col("a").eq(1), c.not(c.col("b").eq(2))])).setDialect("mysql").parse();
    expect(result).toEqual({
        sql: "SELECT `id` WHERE ( `a` = ? OR NOT ( `b` = ? ) )",
        param: [1, 2],
        sqlWithParam: "SELECT `id` WHERE ( `a` = 1 OR NOT ( `b` = 2 ) )",
    });
});

test("parse builds is null predicate without params", () => {
    const c = qb();
    const result = c.select(c.col("id")).where(c.col("x").isNull()).setDialect("postgres").parse();
    expect(result).toEqual({
        sql: 'SELECT "id" WHERE "x" IS NULL',
        param: [],
        sqlWithParam: 'SELECT "id" WHERE "x" IS NULL',
    });
});

test("parse builds is not null for isNotNull", () => {
    const c = qb();
    const result = c.select(c.col("id")).where(c.col("x").isNotNull()).setDialect("postgres").parse();
    expect(result).toEqual({
        sql: 'SELECT "id" WHERE "x" IS NOT NULL',
        param: [],
        sqlWithParam: 'SELECT "id" WHERE "x" IS NOT NULL',
    });
});

test("parse binds limit and offset as params", () => {
    const c = qb();
    const result = c.select(c.col("id")).from(c.table("t")).limit(10).offset(2).setDialect("postgres").parse();
    expect(result).toEqual({
        sql: 'SELECT "id" FROM "t" LIMIT $1 OFFSET $2',
        param: [10, 2],
        sqlWithParam: 'SELECT "id" FROM "t" LIMIT 10 OFFSET 2',
    });
});

test("parse handles many parameters", () => {
    const c = qb();
    let chain: any = c.select(c.col("id")).from(c.table("t")).where(c.col("a0").eq(0));
    for (let i = 1; i < 256; i++) {
        chain = chain.where(c.col(`a${i}`).eq(i));
    }
    const result = chain.setDialect("postgres").parse();
    expect(result.param).toHaveLength(256);
    expect(result.param[255]).toBe(255);
    expect(result.sql.endsWith("$256")).toBe(true);
});

test("parse builds in predicate", () => {
    const c = qb();
    const result = c.select(c.col("id")).where(c.col("x").in("1,2,3")).setDialect("postgres").parse();
    expect(result).toEqual({
        sql: 'SELECT "id" WHERE "x" IN ( $1 )',
        param: ["1,2,3"],
        sqlWithParam: `SELECT "id" WHERE "x" IN ( '1,2,3' )`,
    });
});

test("parse builds between predicate", () => {
    const c = qb();
    const result = c.select(c.col("id")).where(c.col("x").between(1, 2)).setDialect("postgres").parse();
    expect(result).toEqual({
        sql: 'SELECT "id" WHERE "x" BETWEEN $1 AND $2',
        param: [1, 2],
        sqlWithParam: 'SELECT "id" WHERE "x" BETWEEN 1 AND 2',
    });
});

test("parse builds group by and multi-order", () => {
    const c = qb();
    const grouped = c.select(c.col("x")).from(c.table("t")).groupBy(c.col("x")).setDialect("postgres").parse();
    expect(grouped.sql).toBe('SELECT "x" FROM "t" GROUP BY "x"');

    const o = qb();
    const ordered = o
        .select(o.col("x"))
        .from(o.table("t"))
        .orderBy([o.col("name").asc(), o.col("age").desc()])
        .setDialect("mysql")
        .parse();
    expect(ordered.sql).toBe("SELECT `x` FROM `t` ORDER BY `name` ASC, `age` DESC");
});

test("parse numbers every placeholder in order", () => {
    const c = qb();
    const result = c.select(c.col("id")).where(c.and([c.col("a").eq(1), c.col("b").eq(2), c.col("c").eq(3)])).setDialect("mysql").parse();
    expect(result).toEqual({
        sql: "SELECT `id` WHERE ( `a` = ? AND `b` = ? AND `c` = ? )",
        param: [1, 2, 3],
        sqlWithParam: "SELECT `id` WHERE ( `a` = 1 AND `b` = 2 AND `c` = 3 )",
    });
});

test("parse with only a dialect yields empty sql", () => {
    const c = qb();
    expect(c.setDialect("postgres").parse()).toEqual({ sql: "", param: [], sqlWithParam: "" });
});

test("parse compares two columns without parameters", () => {
    const c = qb();
    const result = c.select(c.col("id")).from(c.table("users")).where(c.col("a").eq(c.col("b"))).setDialect("postgres").parse();
    expect(result).toEqual({
        sql: 'SELECT "id" FROM "users" WHERE "a" = "b"',
        param: [],
        sqlWithParam: 'SELECT "id" FROM "users" WHERE "a" = "b"',
    });
});

test("parse builds join on column equality", () => {
    const c = qb();
    const result = c
        .select(c.col("id"))
        .from(c.table("users"))
        .join(c.table("posts"), c.col("users.id").eq(c.col("posts.user_id")))
        .setDialect("postgres")
        .parse();
    expect(result).toEqual({
        sql: 'SELECT "id" FROM "users" JOIN "posts" ON "users.id" = "posts.user_id"',
        param: [],
        sqlWithParam: 'SELECT "id" FROM "users" JOIN "posts" ON "users.id" = "posts.user_id"',
    });
});

test("parse builds left join with mysql quoting", () => {
    const c = qb();
    const result = c
        .select(c.col("id"))
        .from(c.table("users"))
        .leftJoin(c.table("posts"), c.col("users.id").eq(c.col("posts.user_id")))
        .setDialect("mysql")
        .parse();
    expect(result.sql).toBe("SELECT `id` FROM `users` LEFT JOIN `posts` ON `users.id` = `posts.user_id`");
});

test("parse builds group by with having", () => {
    const c = qb();
    const result = c
        .select(c.col("x"))
        .from(c.table("t"))
        .groupBy(c.col("x"))
        .having(c.col("count").gt(1))
        .setDialect("postgres")
        .parse();
    expect(result).toEqual({
        sql: 'SELECT "x" FROM "t" GROUP BY "x" HAVING "count" > $1',
        param: [1],
        sqlWithParam: 'SELECT "x" FROM "t" GROUP BY "x" HAVING "count" > 1',
    });
});

test("parse supports column bounds in between", () => {
    const c = qb();
    const result = c.select(c.col("id")).where(c.col("x").between(c.col("lo"), c.col("hi"))).setDialect("postgres").parse();
    expect(result).toEqual({
        sql: 'SELECT "id" WHERE "x" BETWEEN "lo" AND "hi"',
        param: [],
        sqlWithParam: 'SELECT "id" WHERE "x" BETWEEN "lo" AND "hi"',
    });
});

test("parse aliases select columns", () => {
    const c = qb();
    const result = c.select(c.col("x").as("alias")).from(c.table("t")).setDialect("postgres").parse();
    expect(result.sql).toBe('SELECT "x" AS "alias" FROM "t"');
});

test("parse aliases from and join tables", () => {
    const c = qb();
    const result = c
        .select(c.col("id"))
        .from(c.table("users").as("u"))
        .join(c.table("posts").as("p"), c.col("u.id").eq(c.col("p.uid")))
        .setDialect("postgres")
        .parse();
    expect(result.sql).toBe('SELECT "id" FROM "users" AS "u" JOIN "posts" AS "p" ON "u.id" = "p.uid"');
});

test("parse renders generic operator with literal and column", () => {
    const literal = qb();
    expect(literal.select(literal.col("id")).where(literal.col("a").op("~", "x")).setDialect("postgres").parse()).toEqual({
        sql: 'SELECT "id" WHERE "a" ~ $1',
        param: ["x"],
        sqlWithParam: `SELECT "id" WHERE "a" ~ 'x'`,
    });

    const column = qb();
    expect(column.select(column.col("id")).where(column.col("a").op("~", column.col("b"))).setDialect("mysql").parse().sql).toBe(
        "SELECT `id` WHERE `a` ~ `b`"
    );
});

test("parse builds a single CTE", () => {
    const c = qb();
    const sub = c.select(c.col("id")).from(c.table("users"));
    const result = c.with(sub, "cte").select(c.col("id")).from(c.table("cte")).setDialect("postgres").parse();
    expect(result).toEqual({
        sql: 'WITH "cte" AS (SELECT "id" FROM "users") SELECT "id" FROM "cte"',
        param: [],
        sqlWithParam: 'WITH "cte" AS (SELECT "id" FROM "users") SELECT "id" FROM "cte"',
    });
});

test("parse numbers CTE parameters before outer parameters", () => {
    const c = qb();
    const sub = c.select(c.col("id")).from(c.table("users")).where(c.col("active").eq(true));
    const result = c
        .with(sub, "cte")
        .select(c.col("id"))
        .from(c.table("cte"))
        .where(c.col("id").gt(5))
        .setDialect("postgres")
        .parse();
    expect(result).toEqual({
        sql: 'WITH "cte" AS (SELECT "id" FROM "users" WHERE "active" = $1) SELECT "id" FROM "cte" WHERE "id" > $2',
        param: [true, 5],
        sqlWithParam: 'WITH "cte" AS (SELECT "id" FROM "users" WHERE "active" = TRUE) SELECT "id" FROM "cte" WHERE "id" > 5',
    });
});

test("parse joins multiple CTEs with commas", () => {
    const c = qb();
    const first = c.select(c.col("id")).from(c.table("users"));
    const second = c.select(c.col("x")).from(c.table("b"));
    const result = c.with(first, "a").with(second, "b").select(c.col("x")).from(c.table("a")).setDialect("mysql").parse();
    expect(result.sql).toBe("WITH `a` AS (SELECT `id` FROM `users`), `b` AS (SELECT `x` FROM `b`) SELECT `x` FROM `a`");
});

test("parse appends returning clause", () => {
    const c = qb();
    const result = c.select(c.col("id")).from(c.table("t")).returning(c.col("id")).setDialect("postgres").parse();
    expect(result.sql).toBe('SELECT "id" FROM "t" RETURNING "id"');
});

test("parse builds update with map assignments", () => {
    const c = qb();
    const result = c.update(c.table("users"), { name: "bob", age: 3 }).setDialect("postgres").parse();
    expect(result).toEqual({
        sql: 'UPDATE "users" SET "name" = $1, "age" = $2',
        param: ["bob", 3],
        sqlWithParam: `UPDATE "users" SET "name" = 'bob', "age" = 3`,
    });
});

test("parse builds insert from a map", () => {
    const c = qb();
    const result = c.insert(c.table("users"), { name: "bob" }).setDialect("postgres").parse();
    expect(result).toEqual({
        sql: 'INSERT INTO "users" ( "name" ) VALUES ( $1 )',
        param: ["bob"],
        sqlWithParam: `INSERT INTO "users" ( "name" ) VALUES ( 'bob' )`,
    });
});

test("parse builds delete", () => {
    const c = qb();
    expect(c.delete(c.table("users")).setDialect("postgres").parse().sql).toBe('DELETE FROM "users"');
});

test("parse builds standalone set", () => {
    const c = qb();
    expect(c.set({ name: "bob" }).setDialect("postgres").parse().sql).toBe('SET "name" = $1');
});

test("parse builds values tuples", () => {
    const c = qb();
    const result = c.values([["a", "b"], ["c", "d"]]).setDialect("postgres").parse();
    expect(result).toEqual({
        sql: "VALUES ( $1, $2 ), ( $3, $4 )",
        param: ["a", "b", "c", "d"],
        sqlWithParam: "VALUES ( 'a', 'b' ), ( 'c', 'd' )",
    });
});

test("parse builds values tuples with mixed row types", () => {
    const c = qb();
    const result = c.values([["a", 1], ["b", 2]]).setDialect("postgres").parse();
    expect(result).toEqual({
        sql: "VALUES ( $1, $2 ), ( $3, $4 )",
        param: ["a", 1, "b", 2],
        sqlWithParam: "VALUES ( 'a', 1 ), ( 'b', 2 )",
    });
});

test("parse builds conflict clauses", () => {
    const nothing = qb();
    expect(
        nothing.insert(nothing.table("t"), { name: "x" }).onConflictDoNothing(nothing.col("id")).setDialect("postgres").parse().sql
    ).toBe('INSERT INTO "t" ( "name" ) VALUES ( $1 ) ON CONFLICT ("id") DO NOTHING');

    const update = qb();
    expect(
        update
            .insert(update.table("t"), { name: "x" })
            .onConflictDoUpdate(update.col("id"), { name: "y" })
            .setDialect("postgres")
            .parse()
            .sql
    ).toBe('INSERT INTO "t" ( "name" ) VALUES ( $1 ) ON CONFLICT ("id") DO UPDATE SET "name" = $2');
});

test("parse builds update with subquery assignment", () => {
    const c = qb();
    const result = c.update(c.table("t"), { x: c.select(c.col("id")).from(c.table("b")) }).setDialect("postgres").parse();
    expect(result).toEqual({
        sql: 'UPDATE "t" SET "x" = (SELECT "id" FROM "b")',
        param: [],
        sqlWithParam: 'UPDATE "t" SET "x" = (SELECT "id" FROM "b")',
    });
});

test("parse builds insert with subquery value", () => {
    const c = qb();
    const result = c.insert(c.table("t"), { x: c.select(c.col("id")).from(c.table("b")) }).setDialect("postgres").parse();
    expect(result).toEqual({
        sql: 'INSERT INTO "t" ( "x" ) VALUES ( (SELECT "id" FROM "b") )',
        param: [],
        sqlWithParam: 'INSERT INTO "t" ( "x" ) VALUES ( (SELECT "id" FROM "b") )',
    });
});

test("parse builds values with subquery element", () => {
    const c = qb();
    const result = c.values([[c.select(c.col("id")).from(c.table("b")), 1]]).setDialect("postgres").parse();
    expect(result).toEqual({
        sql: 'VALUES ( (SELECT "id" FROM "b"), $1 )',
        param: [1],
        sqlWithParam: 'VALUES ( (SELECT "id" FROM "b"), 1 )',
    });
});

test("parse builds on conflict update with subquery assignment", () => {
    const c = qb();
    const result = c.insert(c.table("t"), { name: "x" })
        .onConflictDoUpdate(c.col("id"), { name: c.select(c.col("n")).from(c.table("b")) })
        .setDialect("mysql")
        .parse();
    expect(result).toEqual({
        sql: "INSERT INTO `t` ( `name` ) VALUES ( ? ) ON CONFLICT (`id`) DO UPDATE SET `name` = (SELECT `n` FROM `b`)",
        param: ["x"],
        sqlWithParam: "INSERT INTO `t` ( `name` ) VALUES ( 'x' ) ON CONFLICT (`id`) DO UPDATE SET `name` = (SELECT `n` FROM `b`)",
    });
});

test("parse renders raw template literals", () => {
    const c = qb();
    const identifiers = c.raw`SELECT ${c.col("id")} FROM ${c.table("t")}`.setDialect("mysql").parse();
    expect(identifiers).toEqual({
        sql: "SELECT `id` FROM `t`",
        param: [],
        sqlWithParam: "SELECT `id` FROM `t`",
    });

    const literal = qb();
    expect(literal.where(literal.raw`x = ${5}`).setDialect("postgres").parse()).toEqual({
        sql: "WHERE x = $1",
        param: [5],
        sqlWithParam: "WHERE x = 5",
    });
});

test("parse builds exists subquery", () => {
    const c = qb();
    const result = c.select(c.col("id"))
        .from(c.table("users"))
        .where(c.exists(c.select(c.col("id")).from(c.table("posts")).where(c.col("posts.user_id").eq(c.col("users.id")))))
        .setDialect("postgres")
        .parse();
    expect(result).toEqual({
        sql: 'SELECT "id" FROM "users" WHERE EXISTS (SELECT "id" FROM "posts" WHERE "posts.user_id" = "users.id")',
        param: [],
        sqlWithParam: 'SELECT "id" FROM "users" WHERE EXISTS (SELECT "id" FROM "posts" WHERE "posts.user_id" = "users.id")',
    });
});

test("parse allows exists without a subquery", () => {
    const c = qb();
    expect(c.select(c.col("id")).where(c.exists(c.col("x"))).setDialect("postgres").parse()).toEqual({
        sql: 'SELECT "id" WHERE EXISTS "x"',
        param: [],
        sqlWithParam: 'SELECT "id" WHERE EXISTS "x"',
    });
});

test("parse builds transaction block", () => {
    const c = qb();
    const chained = c.transaction(c.insert(c.table("t"), { a: 1 })).setDialect("postgres").parse();
    expect(chained).toEqual({
        sql: 'BEGIN INSERT INTO "t" ( "a" ) VALUES ( $1 ) COMMIT',
        param: [1],
        sqlWithParam: 'BEGIN INSERT INTO "t" ( "a" ) VALUES ( 1 ) COMMIT',
    });

    const batch = qb();
    const array = batch.transaction([batch.insert(batch.table("t"), { a: 1 }), batch.insert(batch.table("u"), { b: 2 })]).setDialect("postgres").parse();
    expect(array).toEqual({
        sql: 'BEGIN INSERT INTO "t" ( "a" ) VALUES ( $1 ); INSERT INTO "u" ( "b" ) VALUES ( $2 ) COMMIT',
        param: [1, 2],
        sqlWithParam: 'BEGIN INSERT INTO "t" ( "a" ) VALUES ( 1 ); INSERT INTO "u" ( "b" ) VALUES ( 2 ) COMMIT',
    });

    const raw = qb();
    expect(raw.transaction("UPDATE t SET a=1").setDialect("postgres").parse().sql).toBe("BEGIN UPDATE t SET a=1 COMMIT");
});

test("parse leaves SQL responsibility to the caller", () => {
    const dup = qb();
    expect(dup.select(dup.col("id")).where(dup.col("x").eq(1)).where(dup.col("y").eq(2)).setDialect("postgres").parse().sql).toBe(
        'SELECT "id" WHERE "x" = $1 WHERE "y" = $2'
    );

    const empty = qb();
    expect(empty.select(empty.col("id")).where(empty.and([])).setDialect("postgres").parse().sql).toBe('SELECT "id" WHERE ( )');

    const emptyValues = qb();
    expect(emptyValues.values([]).setDialect("postgres").parse().sql).toBe("VALUES ( )");
});

test("parse builds in subquery", () => {
    const c = qb();
    const result = c.select(c.col("id"))
        .from(c.table("users"))
        .where(c.col("id").in(c.select(c.col("uid")).from(c.table("members"))))
        .setDialect("postgres")
        .parse();
    expect(result).toEqual({
        sql: 'SELECT "id" FROM "users" WHERE "id" IN (SELECT "uid" FROM "members")',
        param: [],
        sqlWithParam: 'SELECT "id" FROM "users" WHERE "id" IN (SELECT "uid" FROM "members")',
    });
});

test("parse builds scalar subquery with alias", () => {
    const c = qb();
    const result = c.select(c.select(c.col("cnt")).from(c.table("t")).as("c"))
        .from(c.table("u"))
        .setDialect("postgres")
        .parse();
    expect(result).toEqual({
        sql: 'SELECT (SELECT "cnt" FROM "t") AS "c" FROM "u"',
        param: [],
        sqlWithParam: 'SELECT (SELECT "cnt" FROM "t") AS "c" FROM "u"',
    });
});

test("parse builds from subquery with alias", () => {
    const c = qb();
    const result = c.select(c.col("id"))
        .from(c.select(c.col("id")).from(c.table("users")).as("u"))
        .setDialect("postgres")
        .parse();
    expect(result).toEqual({
        sql: 'SELECT "id" FROM (SELECT "id" FROM "users") AS "u"',
        param: [],
        sqlWithParam: 'SELECT "id" FROM (SELECT "id" FROM "users") AS "u"',
    });
});

test("parse numbers subquery parameters before outer parameters", () => {
    const c = qb();
    const result = c.select(c.col("id"))
        .from(c.table("users"))
        .where(c.exists(c.select(c.col("id")).from(c.table("orders")).where(c.col("total").gt(100))))
        .where(c.col("active").eq(true))
        .setDialect("postgres")
        .parse();
    expect(result).toEqual({
        sql: 'SELECT "id" FROM "users" WHERE EXISTS (SELECT "id" FROM "orders" WHERE "total" > $1) WHERE "active" = $2',
        param: [100, true],
        sqlWithParam: 'SELECT "id" FROM "users" WHERE EXISTS (SELECT "id" FROM "orders" WHERE "total" > 100) WHERE "active" = TRUE',
    });
});

test("parse builds nested subquery with mysql quoting", () => {
    const c = qb();
    const result = c.select(c.col("id"))
        .where(c.col("id").in(
            c.select(c.col("uid")).from(c.table("m")).where(
                c.col("uid").in(c.select(c.col("id")).from(c.table("b")).where(c.col("ok").eq(true))),
            ),
        ))
        .setDialect("mysql")
        .parse();
    expect(result).toEqual({
        sql: "SELECT `id` WHERE `id` IN (SELECT `uid` FROM `m` WHERE `uid` IN (SELECT `id` FROM `b` WHERE `ok` = ?))",
        param: [true],
        sqlWithParam: "SELECT `id` WHERE `id` IN (SELECT `uid` FROM `m` WHERE `uid` IN (SELECT `id` FROM `b` WHERE `ok` = TRUE))",
    });
});

test("literal string argument accepts matching value", () => {
    const arg = firstArg(qb().setDialect("postgres").getSchema());
    expect(arg.argument).toEqual({ string: { value: "postgres" } });
});

test("literal string argument rejects mismatched value", () => {
    expect(() => qb().setDialect("oracle")).toThrow("does not match any type in the union");
});
