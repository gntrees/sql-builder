// Differential gate for the drizzle port.
//
// Every expected value comes from drizzle-orm 0.44.4 itself (the pinned
// reference), never from a hand-written string. A fixture is green only when
// the .lt implementation produces byte-identical `sql` and `params`.
import { describe, expect, test } from "bun:test";
import { and, asc, between, count, desc, eq, exists, gt, ilike, inArray, isNotNull, isNull, like, ne, not, notBetween, notIlike, notInArray, notLike, or, sql, sum } from "drizzle-orm";
import { MySqlDialect } from "drizzle-orm/mysql-core";
import { alias, integer, pgSchema, pgTable, serial, text } from "drizzle-orm/pg-core";
import { PgDatabase } from "drizzle-orm/pg-core";
import { PgDialect } from "drizzle-orm/pg-core";

import { LList } from "../../generated/lt-drizzle/typescript/_lingua_rt";
import { Assignment } from "../../generated/lt-drizzle/typescript/src/assignment";
import { Column } from "../../generated/lt-drizzle/typescript/src/column";
import { Delete } from "../../generated/lt-drizzle/typescript/src/delete";
import { Insert } from "../../generated/lt-drizzle/typescript/src/insert";
import { Update } from "../../generated/lt-drizzle/typescript/src/update";
import { Dialect } from "../../generated/lt-drizzle/typescript/src/dialect";
import { Select } from "../../generated/lt-drizzle/typescript/src/select";
import { Sql } from "../../generated/lt-drizzle/typescript/src/sql";
import { Table } from "../../generated/lt-drizzle/typescript/src/table";
import {
  SqlArg_Bool,
  SqlArg_Float,
  SqlArg_Int,
  SqlArg_Null,
  SqlArg_Str,
} from "../../generated/lt-drizzle/typescript/src/value";
import type { Value } from "../../generated/lt-drizzle/typescript/src/value";

type Outcome = { sql: string; params: unknown[] };

const pg = new PgDialect();
const mysql = new MySqlDialect();

function list<T>(items: T[]): LList<T> {
  return new LList<T>(items);
}

// Convert an emitted `Value` into the plain JS value drizzle would report.
function native(value: Value): unknown {
  switch (value.tag) {
    case "Null":
      return null;
    case "Bool":
    case "Str":
      return value.values[0];
    case "Int":
      // LT `Int` is i64 and is emitted as `bigint`; drizzle reports `number`.
      return Number(value.values[0]);
    case "Float":
      return value.values[0];
    default:
      throw new Error(`unsupported value tag in a flat parameter: ${value.tag}`);
  }
}

function fromLt(rendered: { sql: string; params: { items: readonly Value[] } }): Outcome {
  return { sql: rendered.sql, params: rendered.params.items.map(native) };
}

// Drizzle also returns `typings`; the port does not model it, so compare only
// the two fields the contract covers.
function fromDrizzle(result: { sql: string; params: unknown[] }): Outcome {
  return { sql: result.sql, params: result.params };
}

function diff(name: string, expected: Outcome, actual: Outcome) {
  test(name, () => {
    expect(actual).toEqual(expected);
  });
}

describe("postgres", () => {
  diff(
    "raw sql is passed through",
    fromDrizzle(pg.sqlToQuery(sql`select 1`)),
    fromLt(Dialect.postgres().sqlToQuery(Sql.raw("select 1"))),
  );

  diff(
    "one parameter is numbered $1",
    fromDrizzle(pg.sqlToQuery(sql`select ${"x"}`)),
    fromLt(
      Dialect.postgres().sqlToQuery(
        Sql.raw("select ").append(Sql.str("x")),
      ),
    ),
  );

  diff(
    "every scalar parameter type is numbered in order",
    fromDrizzle(pg.sqlToQuery(sql`select ${1}, ${true}, ${false}, ${null}, ${2.5}, ${"x"}`)),
    fromLt(
      Dialect.postgres().sqlToQuery(
        Sql.template(
          list(["select ", ", ", ", ", ", ", ", ", ", ", ""]),
          list([
            SqlArg_Int(1n),
            SqlArg_Bool(true),
            SqlArg_Bool(false),
            SqlArg_Null,
            SqlArg_Float(2.5),
            SqlArg_Str("x"),
          ]),
        ),
      ),
    ),
  );

  diff(
    "identifiers are quoted and table-qualified",
    fromDrizzle(
      pg.sqlToQuery(
        sql`select ${sql.identifier("users")}.${sql.identifier("id")} from ${sql.identifier("users")}`,
      ),
    ),
    fromLt(
      Dialect.postgres().sqlToQuery(
        Sql.raw("select ")
          .append(Sql.identifier("users"))
          .append(Sql.raw("."))
          .append(Sql.identifier("id"))
          .append(Sql.raw(" from "))
          .append(Sql.identifier("users")),
      ),
    ),
  );

  diff(
    "identifier quotes are not escaped (drizzle quirk)",
    fromDrizzle(pg.sqlToQuery(sql`select ${sql.identifier('we"ird')}`)),
    fromLt(
      Dialect.postgres().sqlToQuery(
        Sql.raw("select ").append(Sql.identifier('we"ird')),
      ),
    ),
  );

  diff(
    "raw fragments stay raw and unchanged",
    fromDrizzle(pg.sqlToQuery(sql`select ${sql.raw("now()")}`)),
    fromLt(
      Dialect.postgres().sqlToQuery(
        Sql.raw("select ").append(Sql.raw("now()")),
      ),
    ),
  );
});

describe("mysql", () => {
  diff(
    "one parameter uses ?",
    fromDrizzle(mysql.sqlToQuery(sql`select ${"x"}`)),
    fromLt(
      Dialect.mysql().sqlToQuery(
        Sql.raw("select ").append(Sql.str("x")),
      ),
    ),
  );

  diff(
    "identifiers use backticks",
    fromDrizzle(mysql.sqlToQuery(sql`select ${sql.identifier("users")}`)),
    fromLt(
      Dialect.mysql().sqlToQuery(
        Sql.raw("select ").append(Sql.identifier("users")),
      ),
    ),
  );
});

describe("schema references", () => {
  const users = pgTable("users", { id: serial("id"), name: text("name") });
  const usersTable = Table.plain("users", list([Column.serial("id"), Column.text("name")]));

  diff(
    "column is table-qualified",
    fromDrizzle(pg.sqlToQuery(sql`${users.id}`)),
    fromLt(Dialect.postgres().sqlToQuery(usersTable.col("id"))),
  );

  diff(
    "table ref has no qualification",
    fromDrizzle(pg.sqlToQuery(sql`${users}`)),
    fromLt(Dialect.postgres().sqlToQuery(usersTable.ref())),
  );

  const aliased = alias(users, "u");
  const aliasedTable = Table.withAlias("users", "u", list([Column.serial("id")]));

  diff(
    "aliased column uses the alias",
    fromDrizzle(pg.sqlToQuery(sql`${aliased.id}`)),
    fromLt(Dialect.postgres().sqlToQuery(aliasedTable.col("id"))),
  );

  diff(
    "aliased table ref keeps the original name",
    fromDrizzle(pg.sqlToQuery(sql`${aliased}`)),
    fromLt(Dialect.postgres().sqlToQuery(aliasedTable.ref())),
  );

  const auth = pgSchema("auth");
  const accounts = auth.table("accounts", { id: integer("account_id") });
  const accountsTable = Table.withSchema("accounts", "auth", list([Column.integer("account_id")]));

  diff(
    "schema-qualified column",
    fromDrizzle(pg.sqlToQuery(sql`${accounts.id}`)),
    fromLt(Dialect.postgres().sqlToQuery(accountsTable.col("account_id"))),
  );

  diff(
    "schema-qualified table ref",
    fromDrizzle(pg.sqlToQuery(sql`${accounts}`)),
    fromLt(Dialect.postgres().sqlToQuery(accountsTable.ref())),
  );
});

describe("select", () => {
  const users = pgTable("users", {
    id: serial("id"),
    name: text("name"),
    age: integer("age"),
  });
  const t = Table.plain(
    "users",
    list([Column.serial("id"), Column.text("name"), Column.integer("age")]),
  );
  const db = new PgDatabase(new PgDialect(), {});
  const q = () => Select.create().fromTable(t).setDialect(Dialect.postgres());
  const build = (builder: Select): Outcome => {
    const result = builder.build();
    if (result.tag === "err") {
      throw new Error(`build failed: ${result.values[0]?.tag}`);
    }
    return fromLt(result.values[0]);
  };
  const check = (name: string, expected: Outcome, builder: Select) => {
    diff(name, expected, build(builder));
  };

  check(
    "single column is unqualified",
    fromDrizzle(db.select({ id: users.id }).from(users).toSQL()),
    q().select(list([t.field("id")])),
  );

  check(
    "renaming the selection key does not alias the column",
    fromDrizzle(db.select({ userId: users.id }).from(users).toSQL()),
    q().select(list([t.field("id")])),
  );

  check(
    "empty selection means every column",
    fromDrizzle(db.select().from(users).toSQL()),
    q(),
  );

  check(
    "where equality",
    fromDrizzle(db.select({ id: users.id }).from(users).where(eq(users.id, 1)).toSQL()),
    q().select(list([t.field("id")])).where(t.col("id").eq(Sql.int(1n))),
  );

  check(
    "and/or are parenthesized",
    fromDrizzle(
      db
        .select({ id: users.id })
        .from(users)
        .where(and(eq(users.name, "a"), or(gt(users.age, 18), isNull(users.age))))
        .toSQL(),
    ),
    q()
      .select(list([t.field("id")]))
      .where(
        Sql.and(
          list([
            t.col("name").eq(Sql.str("a")),
            Sql.or(
              list([t.col("age").gt(Sql.int(18n)), t.col("age").isNull()]),
            ),
          ]),
        ),
      ),
  );

  check(
    "not has no parentheses",
    fromDrizzle(db.select({ id: users.id }).from(users).where(not(eq(users.id, 1))).toSQL()),
    q().select(list([t.field("id")])).where(Sql.not(t.col("id").eq(Sql.int(1n)))),
  );

  check(
    "ne uses <>",
    fromDrizzle(db.select({ id: users.id }).from(users).where(ne(users.id, 1)).toSQL()),
    q().select(list([t.field("id")])).where(t.col("id").ne(Sql.int(1n))),
  );

  check(
    "in list",
    fromDrizzle(db.select({ id: users.id }).from(users).where(inArray(users.id, [1, 2, 3])).toSQL()),
    q()
      .select(list([t.field("id")]))
      .where(t.col("id").inList(list([Sql.int(1n), Sql.int(2n), Sql.int(3n)]))),
  );

  check(
    "empty in list becomes false",
    fromDrizzle(db.select({ id: users.id }).from(users).where(inArray(users.id, [])).toSQL()),
    q().select(list([t.field("id")])).where(t.col("id").inList(list([]))),
  );

  check(
    "empty not-in list becomes true",
    fromDrizzle(db.select({ id: users.id }).from(users).where(notInArray(users.id, [])).toSQL()),
    q().select(list([t.field("id")])).where(t.col("id").notInList(list([]))),
  );

  check(
    "is not null",
    fromDrizzle(db.select({ id: users.id }).from(users).where(isNotNull(users.age)).toSQL()),
    q().select(list([t.field("id")])).where(t.col("age").isNotNull()),
  );

  check(
    "between",
    fromDrizzle(db.select({ id: users.id }).from(users).where(between(users.age, 1, 10)).toSQL()),
    q()
      .select(list([t.field("id")]))
      .where(t.col("age").between(Sql.int(1n), Sql.int(10n))),
  );

  check(
    "not between",
    fromDrizzle(db.select({ id: users.id }).from(users).where(notBetween(users.age, 1, 10)).toSQL()),
    q()
      .select(list([t.field("id")]))
      .where(t.col("age").notBetween(Sql.int(1n), Sql.int(10n))),
  );

  check(
    "like family",
    fromDrizzle(
      db
        .select({ id: users.id })
        .from(users)
        .where(and(like(users.name, "A%"), notLike(users.name, "B%"), ilike(users.name, "a%"), notIlike(users.name, "b%")))
        .toSQL(),
    ),
    q()
      .select(list([t.field("id")]))
      .where(
        Sql.and(
          list([
            t.col("name").like(Sql.str("A%")),
            t.col("name").notLike(Sql.str("B%")),
            t.col("name").ilike(Sql.str("a%")),
            t.col("name").notIlike(Sql.str("b%")),
          ]),
        ),
      ),
  );

  check(
    "order by, limit, and offset",
    fromDrizzle(
      db
        .select({ id: users.id })
        .from(users)
        .orderBy(asc(users.name), desc(users.id))
        .limit(10)
        .offset(5)
        .toSQL(),
    ),
    q()
      .select(list([t.field("id")]))
      .orderBy(list([t.col("name").asc(), t.col("id").desc()]))
      .limit(10n)
      .offset(5n),
  );

  check(
    "aggregates and group by",
    fromDrizzle(
      db
        .select({ age: users.age, n: count() })
        .from(users)
        .groupBy(users.age)
        .having(gt(count(), 1))
        .toSQL(),
    ),
    q()
      .select(list([t.field("age"), Sql.countAll()]))
      .groupBy(list([t.col("age")]))
      .having(Sql.countAll().gt(Sql.int(1n))),
  );

  check(
    "sum over an unqualified field",
    fromDrizzle(db.select({ s: sum(users.age) }).from(users).toSQL()),
    q().select(list([Sql.sum(t.field("age"))])),
  );

  check(
    "distinct",
    fromDrizzle(db.selectDistinct({ id: users.id }).from(users).toSQL()),
    q().select(list([t.field("id")])).withDistinct(),
  );
});

describe("joins, subqueries, ctes, and set operations", () => {
  const users = pgTable("users", { id: serial("id"), name: text("name") });
  const posts = pgTable("posts", {
    id: serial("id"),
    userId: integer("user_id"),
    title: text("title"),
  });
  const tu = Table.plain("users", list([Column.serial("id"), Column.text("name")]));
  const tp = Table.plain(
    "posts",
    list([Column.serial("id"), Column.integer("user_id"), Column.text("title")]),
  );
  const db = new PgDatabase(new PgDialect(), {});
  const q = () => Select.create().setDialect(Dialect.postgres());
  const build = (builder: Select): Outcome => {
    const result = builder.build();
    if (result.tag === "err") {
      throw new Error(`build failed: ${result.values[0]?.tag}`);
    }
    return fromLt(result.values[0]);
  };
  const check = (name: string, expected: Outcome, builder: Select) => {
    diff(name, expected, build(builder));
  };

  const on = () => tu.col("id").eq(tp.col("user_id"));

  check(
    "left join",
    fromDrizzle(
      db
        .select({ id: users.id })
        .from(users)
        .leftJoin(posts, eq(users.id, posts.userId))
        .toSQL(),
    ),
    q().fromTable(tu).select(list([tu.col("id")])).leftJoin(tp, on()),
  );

  check(
    "inner join",
    fromDrizzle(
      db
        .select({ id: users.id })
        .from(users)
        .innerJoin(posts, eq(users.id, posts.userId))
        .toSQL(),
    ),
    q().fromTable(tu).select(list([tu.col("id")])).innerJoin(tp, on()),
  );

  check(
    "right join",
    fromDrizzle(
      db
        .select({ id: users.id })
        .from(users)
        .rightJoin(posts, eq(users.id, posts.userId))
        .toSQL(),
    ),
    q().fromTable(tu).select(list([tu.col("id")])).rightJoin(tp, on()),
  );

  check(
    "full join",
    fromDrizzle(
      db
        .select({ id: users.id })
        .from(users)
        .fullJoin(posts, eq(users.id, posts.userId))
        .toSQL(),
    ),
    q().fromTable(tu).select(list([tu.col("id")])).fullJoin(tp, on()),
  );

  check(
    "join with order and limit",
    fromDrizzle(
      db
        .select({ id: users.id })
        .from(users)
        .leftJoin(posts, eq(users.id, posts.userId))
        .orderBy(asc(users.id))
        .limit(1)
        .toSQL(),
    ),
    q()
      .fromTable(tu)
      .select(list([tu.col("id")]))
      .leftJoin(tp, on())
      .orderBy(list([tu.col("id").asc()]))
      .limit(1n),
  );

  const inner = () => q().fromTable(tu).select(list([tu.field("id"), tu.field("name")]));
  const subquery = db.select({ id: users.id, name: users.name }).from(users).as("s");

  check(
    "subquery in from",
    fromDrizzle(db.select({ id: subquery.id }).from(subquery).toSQL()),
    q().fromSubquery(inner(), "s").select(list([Sql.identifier("id")])),
  );

  check(
    "exists subquery",
    fromDrizzle(
      db
        .select({ id: users.id })
        .from(users)
        .where(
          exists(
            db
              .select({ id: posts.id })
              .from(posts)
              .where(eq(posts.userId, users.id)),
          ),
        )
        .toSQL(),
    ),
    q()
      .fromTable(tu)
      .select(list([tu.field("id")]))
      .where(
        Select.exists(
          q()
            .fromTable(tp)
            .select(list([tp.field("id")]))
            .where(tp.col("user_id").eq(tu.col("id"))),
        ),
      ),
  );

  check(
    "in subquery",
    fromDrizzle(
      db
        .select({ id: users.id })
        .from(users)
        .where(inArray(users.id, db.select({ userId: posts.userId }).from(posts)))
        .toSQL(),
    ),
    q()
      .fromTable(tu)
      .select(list([tu.field("id")]))
      .where(
        Select.inSubquery(
          tu.col("id"),
          q().fromTable(tp).select(list([tp.field("user_id")])),
        ),
      ),
  );

  const cteQuery = () =>
    q()
      .fromTable(tu)
      .select(list([tu.field("id")]))
      .where(tu.col("name").eq(Sql.str("a")));
  const cte = db.$with("active").as(
    db.select({ id: users.id }).from(users).where(eq(users.name, "a")),
  );

  check(
    "cte",
    fromDrizzle(db.with(cte).select({ id: cte.id }).from(cte).toSQL()),
    q()
      .withCte("active", cteQuery())
      .fromTable(Table.plain("active", list([Column.integer("id")])))
      .select(list([Sql.identifier("id")])),
  );

  const other = () => q().fromTable(tp).select(list([tp.field("id")]));

  check(
    "union",
    fromDrizzle(db.select({ id: users.id }).from(users).union(db.select({ id: posts.id }).from(posts)).toSQL()),
    q().fromTable(tu).select(list([tu.field("id")])).union(other()),
  );

  check(
    "union all",
    fromDrizzle(db.select({ id: users.id }).from(users).unionAll(db.select({ id: posts.id }).from(posts)).toSQL()),
    q().fromTable(tu).select(list([tu.field("id")])).unionAll(other()),
  );

  check(
    "intersect",
    fromDrizzle(db.select({ id: users.id }).from(users).intersect(db.select({ id: posts.id }).from(posts)).toSQL()),
    q().fromTable(tu).select(list([tu.field("id")])).intersect(other()),
  );

  check(
    "except",
    fromDrizzle(db.select({ id: users.id }).from(users).except(db.select({ id: posts.id }).from(posts)).toSQL()),
    q().fromTable(tu).select(list([tu.field("id")])).exceptQuery(other()),
  );
});

describe("dml", () => {
  const users = pgTable("users", {
    id: serial("id"),
    name: text("name"),
    age: integer("age"),
  });
  const t = Table.plain(
    "users",
    list([Column.serial("id"), Column.text("name"), Column.integer("age")]),
  );
  const db = new PgDatabase(new PgDialect(), {});
  const pgDialect = Dialect.postgres();
  const build = (builder: { build(): any }): Outcome => {
    const result = builder.build();
    if (result.tag === "err") {
      throw new Error(`build failed: ${result.values[0]?.tag}`);
    }
    return fromLt(result.values[0]);
  };
  const check = (name: string, expected: Outcome, builder: { build(): any }) => {
    diff(name, expected, build(builder));
  };
  const assign = (column: string, value: Sql) => Assignment.of(column, value);

  check(
    "insert fills omitted columns with default",
    fromDrizzle(db.insert(users).values({ name: "a", age: 3 }).toSQL()),
    Insert.create(t)
      .values(list([list([assign("name", Sql.str("a")), assign("age", Sql.int(3n))])]))
      .setDialect(pgDialect),
  );

  check(
    "multi-row insert",
    fromDrizzle(db.insert(users).values([{ name: "a", age: 3 }, { name: "b", age: 4 }]).toSQL()),
    Insert.create(t)
      .values(
        list([
          list([assign("name", Sql.str("a")), assign("age", Sql.int(3n))]),
          list([assign("name", Sql.str("b")), assign("age", Sql.int(4n))]),
        ]),
      )
      .setDialect(pgDialect),
  );

  check(
    "insert returning every column",
    fromDrizzle(db.insert(users).values({ name: "a" }).returning().toSQL()),
    Insert.create(t)
      .values(list([list([assign("name", Sql.str("a"))])]))
      .returningAllColumns()
      .setDialect(pgDialect),
  );

  check(
    "insert returning a column",
    fromDrizzle(db.insert(users).values({ name: "a" }).returning({ id: users.id }).toSQL()),
    Insert.create(t)
      .values(list([list([assign("name", Sql.str("a"))])]))
      .returning(list([t.field("id")]))
      .setDialect(pgDialect),
  );

  check(
    "on conflict do nothing",
    fromDrizzle(db.insert(users).values({ name: "a" }).onConflictDoNothing().toSQL()),
    Insert.create(t)
      .values(list([list([assign("name", Sql.str("a"))])]))
      .onConflictDoNothing()
      .setDialect(pgDialect),
  );

  check(
    "on conflict target do nothing",
    fromDrizzle(db.insert(users).values({ name: "a" }).onConflictDoNothing({ target: users.id }).toSQL()),
    Insert.create(t)
      .values(list([list([assign("name", Sql.str("a"))])]))
      .onConflictDoNothingTarget(list(["id"]))
      .setDialect(pgDialect),
  );

  check(
    "on conflict do update",
    fromDrizzle(
      db
        .insert(users)
        .values({ name: "a" })
        .onConflictDoUpdate({ target: users.id, set: { name: "b" } })
        .toSQL(),
    ),
    Insert.create(t)
      .values(list([list([assign("name", Sql.str("a"))])]))
      .onConflictDoUpdate(list(["id"]), list([assign("name", Sql.str("b"))]))
      .setDialect(pgDialect),
  );

  check(
    "update",
    fromDrizzle(db.update(users).set({ name: "x" }).where(eq(users.id, 1)).toSQL()),
    Update.create(t)
      .set(list([assign("name", Sql.str("x"))]))
      .where(t.col("id").eq(Sql.int(1n)))
      .setDialect(pgDialect),
  );

  check(
    "update returning every column",
    fromDrizzle(db.update(users).set({ name: "x", age: 2 }).where(eq(users.id, 1)).returning().toSQL()),
    Update.create(t)
      .set(list([assign("name", Sql.str("x")), assign("age", Sql.int(2n))]))
      .where(t.col("id").eq(Sql.int(1n)))
      .returningAllColumns()
      .setDialect(pgDialect),
  );

  check(
    "delete",
    fromDrizzle(db.delete(users).where(eq(users.id, 1)).toSQL()),
    Delete.create(t)
      .where(t.col("id").eq(Sql.int(1n)))
      .setDialect(pgDialect),
  );

  check(
    "delete returning a column",
    fromDrizzle(db.delete(users).where(eq(users.id, 1)).returning({ id: users.id }).toSQL()),
    Delete.create(t)
      .where(t.col("id").eq(Sql.int(1n)))
      .returning(list([t.field("id")]))
      .setDialect(pgDialect),
  );
});
