// Differential gate for the drizzle port on Lingua Tungga v2.
//
// Expected values always come from drizzle-orm 0.44.4 itself. A fixture is
// green only when the .lt implementation produces byte-identical `sql` and
// `params`.
import { describe, expect, test } from "bun:test";
import { and, asc, between, count, desc, eq, exists, gt, ilike, inArray, isNotNull, isNull, like, ne, not, notBetween, notIlike, notInArray, notLike, or, sql as drizzleSql, sum } from "drizzle-orm";
import { MySqlDialect } from "drizzle-orm/mysql-core";
import { PgDatabase } from "drizzle-orm/pg-core";
import { alias, integer, pgSchema, pgTable, serial, text } from "drizzle-orm/pg-core";
import { PgDialect } from "drizzle-orm/pg-core";

import { LList } from "../../generated/lt-drizzle-v2/typescript/_lingua_rt";
import { mysql, postgres, sqlToQuery } from "../../generated/lt-drizzle-v2/typescript/src/dialect";
import { append, bool, float, identifier, int, nullValue, param, raw, str, tag } from "../../generated/lt-drizzle-v2/typescript/src/sql";
import type { Sql } from "../../generated/lt-drizzle-v2/typescript/src/sql";
import { SqlArg, Value } from "../../generated/lt-drizzle-v2/typescript/src/value";


import * as ltsql from "../../generated/lt-drizzle-v2/typescript/src/sql";
import * as ltsel from "../../generated/lt-drizzle-v2/typescript/src/select";
import * as ltsch from "../../generated/lt-drizzle-v2/typescript/src/schema";
import * as ltins from "../../generated/lt-drizzle-v2/typescript/src/insert";
import * as ltupd from "../../generated/lt-drizzle-v2/typescript/src/update";
import * as ltdel from "../../generated/lt-drizzle-v2/typescript/src/delete";
import { col, plain, ref, withAlias, withSchema } from "../../generated/lt-drizzle-v2/typescript/src/schema";
import { integer as pgInteger, serial as ltSerial, text as ltText } from "../../generated/lt-drizzle-v2/typescript/src/pg_core";
import type { Value as ValueT } from "../../generated/lt-drizzle-v2/typescript/src/value";

type Outcome = { sql: string; params: unknown[] };

const pg = new PgDialect();

function native(value: ValueT): unknown {
  switch (value.tag) {
    case "Null":
      return null;
    case "Boolean":
    case "Text":
      return value.values[0];
    case "Integer":
      return Number(value.values[0]);
    case "Float":
      return value.values[0];
    default:
      throw new Error(`unsupported value tag in a flat parameter: ${value.tag}`);
  }
}

function fromLt(rendered: { sql: string; params: { items: readonly ValueT[] } }): Outcome {
  return { sql: rendered.sql, params: rendered.params.items.map(native) };
}

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
    fromDrizzle(pg.sqlToQuery(drizzleSql`select 1`)),
    fromLt(sqlToQuery(postgres(), raw("select 1"))),
  );

  diff(
    "one parameter is numbered $1",
    fromDrizzle(pg.sqlToQuery(drizzleSql`select ${"x"}`)),
    fromLt(sqlToQuery(postgres(), append(raw("select "), param(Value.Text("x"))))),
  );
});

function list<T>(items: T[]): LList<T> {
  return new LList<T>(items);
}

function cat(...parts: Sql[]): Sql {
  return parts.reduce((acc, part) => append(acc, part), raw(""));
}

describe("identifiers and typed parameters", () => {
  const my = new MySqlDialect();

  diff(
    "identifiers are quoted and table-qualified",
    fromDrizzle(
      pg.sqlToQuery(
        drizzleSql`select ${drizzleSql.identifier("users")}.${drizzleSql.identifier("id")} from ${drizzleSql.identifier("users")}`,
      ),
    ),
    fromLt(
      sqlToQuery(
        postgres(),
        cat(raw("select "), identifier("users"), raw("."), identifier("id"), raw(" from "), identifier("users")),
      ),
    ),
  );

  diff(
    "identifier quotes are not escaped (drizzle quirk)",
    fromDrizzle(pg.sqlToQuery(drizzleSql`select ${drizzleSql.identifier('we"ird')}`)),
    fromLt(sqlToQuery(postgres(), cat(raw("select "), identifier('we"ird')))),
  );

  diff(
    "mysql identifiers use backticks",
    fromDrizzle(my.sqlToQuery(drizzleSql`select ${drizzleSql.identifier("users")}`)),
    fromLt(sqlToQuery(mysql(), cat(raw("select "), identifier("users")))),
  );

  diff(
    "every scalar parameter type keeps its order",
    fromDrizzle(pg.sqlToQuery(drizzleSql`select ${1}, ${true}, ${false}, ${null}, ${2.5}, ${"x"}`)),
    fromLt(
      sqlToQuery(
        postgres(),
        tag(
          list(["select ", ", ", ", ", ", ", ", ", ", ", ""]),
          list([
            SqlArg.Integer(1n),
            SqlArg.Boolean(true),
            SqlArg.Boolean(false),
            SqlArg.Null,
            SqlArg.Float(2.5),
            SqlArg.Text("x"),
          ]),
        ),
      ),
    ),
  );

  diff(
    "parameter factories match the tag",
    fromDrizzle(pg.sqlToQuery(drizzleSql`select ${1}, ${2.5}, ${true}, ${null}, ${"x"}`)),
    fromLt(
      sqlToQuery(
        postgres(),
        cat(raw("select "), int(1n), raw(", "), float(2.5), raw(", "), bool(true), raw(", "), nullValue(), raw(", "), str("x")),
      ),
    ),
  );
});

describe("schema references", () => {
  const users = pgTable("users", { id: serial("id"), name: text("name") });
  const usersTable = plain("users", list([ltSerial("id"), ltText("name")]));

  diff(
    "column is table-qualified",
    fromDrizzle(pg.sqlToQuery(drizzleSql`${users.id}`)),
    fromLt(sqlToQuery(postgres(), col(usersTable, "id"))),
  );

  diff(
    "table ref has no qualification",
    fromDrizzle(pg.sqlToQuery(drizzleSql`${users}`)),
    fromLt(sqlToQuery(postgres(), ref(usersTable))),
  );

  const aliased = alias(users, "u");
  const aliasedTable = withAlias("users", "u", list([ltSerial("id")]));

  diff(
    "aliased column uses the alias",
    fromDrizzle(pg.sqlToQuery(drizzleSql`${aliased.id}`)),
    fromLt(sqlToQuery(postgres(), col(aliasedTable, "id"))),
  );

  diff(
    "aliased ref is the alias only",
    fromDrizzle(pg.sqlToQuery(drizzleSql`${aliased}`)),
    fromLt(sqlToQuery(postgres(), ref(aliasedTable))),
  );

  const auth = pgSchema("auth");
  const accounts = auth.table("accounts", { id: integer("account_id") });
  const accountsTable = withSchema("accounts", "auth", list([pgInteger("account_id")]));

  diff(
    "schema-qualified column",
    fromDrizzle(pg.sqlToQuery(drizzleSql`${accounts.id}`)),
    fromLt(sqlToQuery(postgres(), col(accountsTable, "account_id"))),
  );

  diff(
    "schema-qualified table ref",
    fromDrizzle(pg.sqlToQuery(drizzleSql`${accounts}`)),
    fromLt(sqlToQuery(postgres(), ref(accountsTable))),
  );
});

describe("select", () => {
  const users = pgTable("users", { id: serial("id"), name: text("name"), age: integer("age") });
  const t = plain("users", list([ltSerial("id"), ltText("name"), pgInteger("age")]));
  const db = new PgDatabase(new PgDialect(), {});
  const q = () => ltsel.setDialect(ltsel.fromTable(ltsel.create(), t), postgres());
  const build = (builder: ReturnType<typeof q>): Outcome => {
    const result = ltsel.build(builder);
    if (result.tag === "err") {
      throw new Error(`build failed: ${result.values[0]?.tag}`);
    }
    return fromLt(result.values[0]);
  };
  const check = (name: string, expected: Outcome, builder: ReturnType<typeof q>) => {
    diff(name, expected, build(builder));
  };
  const c = (name: string) => ltsch.col(t, name);
  const f = (name: string) => ltsch.field(t, name);

  check(
    "single column is unqualified",
    fromDrizzle(db.select({ id: users.id }).from(users).toSQL()),
    ltsel.fields(q(), list([f("id")])),
  );

  check(
    "empty selection means every column",
    fromDrizzle(db.select().from(users).toSQL()),
    q(),
  );

  check(
    "where equality",
    fromDrizzle(db.select({ id: users.id }).from(users).where(eq(users.id, 1)).toSQL()),
    ltsel.where(ltsel.fields(q(), list([f("id")])), ltsql.eq(c("id"), ltsql.int(1n))),
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
    ltsel.where(
      ltsel.fields(q(), list([f("id")])),
      ltsql.and(
        list([
          ltsql.eq(c("name"), ltsql.str("a")),
          ltsql.or(list([ltsql.gt(c("age"), ltsql.int(18n)), ltsql.isNull(c("age"))])),
        ]),
      ),
    ),
  );

  check(
    "not has no parentheses",
    fromDrizzle(db.select({ id: users.id }).from(users).where(not(eq(users.id, 1))).toSQL()),
    ltsel.where(ltsel.fields(q(), list([f("id")])), ltsql.not(ltsql.eq(c("id"), ltsql.int(1n)))),
  );

  check(
    "ne uses <>",
    fromDrizzle(db.select({ id: users.id }).from(users).where(ne(users.id, 1)).toSQL()),
    ltsel.where(ltsel.fields(q(), list([f("id")])), ltsql.ne(c("id"), ltsql.int(1n))),
  );

  check(
    "in list",
    fromDrizzle(db.select({ id: users.id }).from(users).where(inArray(users.id, [1, 2, 3])).toSQL()),
    ltsel.where(
      ltsel.fields(q(), list([f("id")])),
      ltsql.inList(c("id"), list([ltsql.int(1n), ltsql.int(2n), ltsql.int(3n)])),
    ),
  );

  check(
    "empty in list becomes false",
    fromDrizzle(db.select({ id: users.id }).from(users).where(inArray(users.id, [])).toSQL()),
    ltsel.where(ltsel.fields(q(), list([f("id")])), ltsql.inList(c("id"), list([]))),
  );

  check(
    "empty not-in list becomes true",
    fromDrizzle(db.select({ id: users.id }).from(users).where(notInArray(users.id, [])).toSQL()),
    ltsel.where(ltsel.fields(q(), list([f("id")])), ltsql.notInList(c("id"), list([]))),
  );

  check(
    "is not null",
    fromDrizzle(db.select({ id: users.id }).from(users).where(isNotNull(users.age)).toSQL()),
    ltsel.where(ltsel.fields(q(), list([f("id")])), ltsql.isNotNull(c("age"))),
  );

  check(
    "between",
    fromDrizzle(db.select({ id: users.id }).from(users).where(between(users.age, 1, 10)).toSQL()),
    ltsel.where(
      ltsel.fields(q(), list([f("id")])),
      ltsql.between(c("age"), ltsql.int(1n), ltsql.int(10n)),
    ),
  );

  check(
    "not between",
    fromDrizzle(db.select({ id: users.id }).from(users).where(notBetween(users.age, 1, 10)).toSQL()),
    ltsel.where(
      ltsel.fields(q(), list([f("id")])),
      ltsql.notBetween(c("age"), ltsql.int(1n), ltsql.int(10n)),
    ),
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
    ltsel.where(
      ltsel.fields(q(), list([f("id")])),
      ltsql.and(
        list([
          ltsql.like(c("name"), ltsql.str("A%")),
          ltsql.notLike(c("name"), ltsql.str("B%")),
          ltsql.ilike(c("name"), ltsql.str("a%")),
          ltsql.notIlike(c("name"), ltsql.str("b%")),
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
    ltsel.offset(
      ltsel.limit(
        ltsel.orderBy(
          ltsel.fields(q(), list([f("id")])),
          list([ltsql.asc(c("name")), ltsql.desc(c("id"))]),
        ),
        10n,
      ),
      5n,
    ),
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
    ltsel.having(
      ltsel.groupBy(
        ltsel.fields(q(), list([f("age"), ltsql.countAll()])),
        list([c("age")]),
      ),
      ltsql.gt(ltsql.countAll(), ltsql.int(1n)),
    ),
  );

  check(
    "sum over an unqualified field",
    fromDrizzle(db.select({ s: sum(users.age) }).from(users).toSQL()),
    ltsel.fields(q(), list([ltsql.sum(f("age"))])),
  );

  check(
    "distinct",
    fromDrizzle(db.selectDistinct({ id: users.id }).from(users).toSQL()),
    ltsel.distinct(ltsel.fields(q(), list([f("id")]))),
  );

  const aliased = alias(users, "u");
  const aliasedTable = withAlias("users", "u", list([ltSerial("id"), ltText("name"), pgInteger("age")]));

  check(
    "aliased from keeps the original name",
    fromDrizzle(db.select({ id: aliased.id }).from(aliased).toSQL()),
    ltsel.fields(
      ltsel.setDialect(ltsel.fromTable(ltsel.create(), aliasedTable), postgres()),
      list([ltsch.field(aliasedTable, "id")]),
    ),
  );
});

describe("joins, subqueries, ctes, and set operations", () => {
  const users = pgTable("users", { id: serial("id"), name: text("name") });
  const posts = pgTable("posts", { id: serial("id"), userId: integer("user_id"), title: text("title") });
  const tu = plain("users", list([ltSerial("id"), ltText("name")]));
  const tp = plain("posts", list([ltSerial("id"), pgInteger("user_id"), ltText("title")]));
  const db = new PgDatabase(new PgDialect(), {});
  const base = (table: ReturnType<typeof plain>) =>
    ltsel.setDialect(ltsel.fromTable(ltsel.create(), table), postgres());
  const build = (builder: ReturnType<typeof base>): Outcome => {
    const result = ltsel.build(builder);
    if (result.tag === "err") {
      throw new Error(`build failed: ${result.values[0]?.tag}`);
    }
    return fromLt(result.values[0]);
  };
  const check = (name: string, expected: Outcome, builder: ReturnType<typeof base>) => {
    diff(name, expected, build(builder));
  };
  const on = () => ltsql.eq(ltsch.col(tu, "id"), ltsch.col(tp, "user_id"));

  check(
    "left join",
    fromDrizzle(db.select({ id: users.id }).from(users).leftJoin(posts, eq(users.id, posts.userId)).toSQL()),
    ltsel.leftJoin(ltsel.fields(base(tu), list([ltsch.col(tu, "id")])), tp, on()),
  );

  check(
    "inner join",
    fromDrizzle(db.select({ id: users.id }).from(users).innerJoin(posts, eq(users.id, posts.userId)).toSQL()),
    ltsel.innerJoin(ltsel.fields(base(tu), list([ltsch.col(tu, "id")])), tp, on()),
  );

  check(
    "right join",
    fromDrizzle(db.select({ id: users.id }).from(users).rightJoin(posts, eq(users.id, posts.userId)).toSQL()),
    ltsel.rightJoin(ltsel.fields(base(tu), list([ltsch.col(tu, "id")])), tp, on()),
  );

  check(
    "full join",
    fromDrizzle(db.select({ id: users.id }).from(users).fullJoin(posts, eq(users.id, posts.userId)).toSQL()),
    ltsel.fullJoin(ltsel.fields(base(tu), list([ltsch.col(tu, "id")])), tp, on()),
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
    ltsel.limit(
      ltsel.orderBy(
        ltsel.leftJoin(ltsel.fields(base(tu), list([ltsch.col(tu, "id")])), tp, on()),
        list([ltsql.asc(ltsch.col(tu, "id"))]),
      ),
      1n,
    ),
  );

  const subInner = () =>
    ltsel.fields(base(tu), list([ltsch.field(tu, "id"), ltsch.field(tu, "name")]));
  const subquery = db.select({ id: users.id, name: users.name }).from(users).as("s");

  check(
    "subquery in from",
    fromDrizzle(db.select({ id: subquery.id }).from(subquery).toSQL()),
    ltsel.fields(ltsel.setDialect(ltsel.fromSubquery(ltsel.create(), subInner(), "s"), postgres()), list([ltsql.identifier("id")])),
  );

  check(
    "exists subquery",
    fromDrizzle(
      db
        .select({ id: users.id })
        .from(users)
        .where(exists(db.select({ id: posts.id }).from(posts).where(eq(posts.userId, users.id))))
        .toSQL(),
    ),
    ltsel.where(
      ltsel.fields(base(tu), list([ltsch.field(tu, "id")])),
      ltsel.exists(
        ltsel.where(
          ltsel.fields(base(tp), list([ltsch.field(tp, "id")])),
          ltsql.eq(ltsch.col(tp, "user_id"), ltsch.col(tu, "id")),
        ),
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
    ltsel.where(
      ltsel.fields(base(tu), list([ltsch.field(tu, "id")])),
      ltsel.inSubquery(
        ltsch.col(tu, "id"),
        ltsel.fields(base(tp), list([ltsch.field(tp, "user_id")])),
      ),
    ),
  );

  const cteQuery = () =>
    ltsel.where(
      ltsel.fields(base(tu), list([ltsch.field(tu, "id")])),
      ltsql.eq(ltsch.col(tu, "name"), ltsql.str("a")),
    );
  const cte = db.$with("active").as(db.select({ id: users.id }).from(users).where(eq(users.name, "a")));

  check(
    "cte",
    fromDrizzle(db.with(cte).select({ id: cte.id }).from(cte).toSQL()),
    ltsel.fields(
      ltsel.setDialect(
        ltsel.fromTable(ltsel.withCte(ltsel.create(), "active", cteQuery()), plain("active", list([pgInteger("id")]))),
        postgres(),
      ),
      list([ltsql.identifier("id")]),
    ),
  );

  const other = () => ltsel.fields(base(tp), list([ltsch.field(tp, "id")]));

  check(
    "union",
    fromDrizzle(db.select({ id: users.id }).from(users).union(db.select({ id: posts.id }).from(posts)).toSQL()),
    ltsel.union(ltsel.fields(base(tu), list([ltsch.field(tu, "id")])), other()),
  );

  check(
    "union all",
    fromDrizzle(db.select({ id: users.id }).from(users).unionAll(db.select({ id: posts.id }).from(posts)).toSQL()),
    ltsel.unionAll(ltsel.fields(base(tu), list([ltsch.field(tu, "id")])), other()),
  );

  check(
    "intersect",
    fromDrizzle(db.select({ id: users.id }).from(users).intersect(db.select({ id: posts.id }).from(posts)).toSQL()),
    ltsel.intersect(ltsel.fields(base(tu), list([ltsch.field(tu, "id")])), other()),
  );

  check(
    "except",
    fromDrizzle(db.select({ id: users.id }).from(users).except(db.select({ id: posts.id }).from(posts)).toSQL()),
    ltsel.exceptQuery(ltsel.fields(base(tu), list([ltsch.field(tu, "id")])), other()),
  );
});

describe("dml", () => {
  const users = pgTable("users", { id: serial("id"), name: text("name"), age: integer("age") });
  const t = plain("users", list([ltSerial("id"), ltText("name"), pgInteger("age")]));
  const db = new PgDatabase(new PgDialect(), {});
  const pgDialect = postgres();
  const build = (builder: { build?: unknown }): Outcome => {
    const result = (builder as any).tag === undefined ? undefined : undefined;
    throw new Error("unused");
  };
  const unwrap = (result: any): Outcome => {
    if (result.tag === "err") {
      throw new Error(`build failed: ${result.values[0]?.tag}`);
    }
    return fromLt(result.values[0]);
  };
  const check = (name: string, expected: Outcome, result: any) => {
    diff(name, expected, unwrap(result));
  };
  const assign = (column: string, value: Sql) => ltsch.assign(column, value);

  check(
    "insert fills omitted columns with default",
    fromDrizzle(db.insert(users).values({ name: "a", age: 3 }).toSQL()),
    ltins.build(
      ltins.setDialect(
        ltins.values(
          ltins.create(t),
          list([list([assign("name", ltsql.str("a")), assign("age", ltsql.int(3n))])]),
        ),
        pgDialect,
      ),
    ),
  );

  check(
    "multi-row insert",
    fromDrizzle(db.insert(users).values([{ name: "a", age: 3 }, { name: "b", age: 4 }]).toSQL()),
    ltins.build(
      ltins.setDialect(
        ltins.values(
          ltins.create(t),
          list([
            list([assign("name", ltsql.str("a")), assign("age", ltsql.int(3n))]),
            list([assign("name", ltsql.str("b")), assign("age", ltsql.int(4n))]),
          ]),
        ),
        pgDialect,
      ),
    ),
  );

  check(
    "insert returning every column",
    fromDrizzle(db.insert(users).values({ name: "a" }).returning().toSQL()),
    ltins.build(
      ltins.setDialect(
        ltins.returningAllColumns(
          ltins.values(ltins.create(t), list([list([assign("name", ltsql.str("a"))])])),
        ),
        pgDialect,
      ),
    ),
  );

  check(
    "insert returning a column",
    fromDrizzle(db.insert(users).values({ name: "a" }).returning({ id: users.id }).toSQL()),
    ltins.build(
      ltins.setDialect(
        ltins.returning(
          ltins.values(ltins.create(t), list([list([assign("name", ltsql.str("a"))])])),
          list([ltsch.field(t, "id")]),
        ),
        pgDialect,
      ),
    ),
  );

  check(
    "on conflict do nothing",
    fromDrizzle(db.insert(users).values({ name: "a" }).onConflictDoNothing().toSQL()),
    ltins.build(
      ltins.setDialect(
        ltins.onConflictDoNothing(
          ltins.values(ltins.create(t), list([list([assign("name", ltsql.str("a"))])])),
        ),
        pgDialect,
      ),
    ),
  );

  check(
    "on conflict target do nothing",
    fromDrizzle(db.insert(users).values({ name: "a" }).onConflictDoNothing({ target: users.id }).toSQL()),
    ltins.build(
      ltins.setDialect(
        ltins.onConflictDoNothingTarget(
          ltins.values(ltins.create(t), list([list([assign("name", ltsql.str("a"))])])),
          list(["id"]),
        ),
        pgDialect,
      ),
    ),
  );

  check(
    "on conflict do update",
    fromDrizzle(
      db.insert(users).values({ name: "a" }).onConflictDoUpdate({ target: users.id, set: { name: "b" } }).toSQL(),
    ),
    ltins.build(
      ltins.setDialect(
        ltins.onConflictDoUpdate(
          ltins.values(ltins.create(t), list([list([assign("name", ltsql.str("a"))])])),
          list(["id"]),
          list([assign("name", ltsql.str("b"))]),
        ),
        pgDialect,
      ),
    ),
  );

  check(
    "update",
    fromDrizzle(db.update(users).set({ name: "x" }).where(eq(users.id, 1)).toSQL()),
    ltupd.build(
      ltupd.setDialect(
        ltupd.where(
          ltupd.set(ltupd.create(t), list([assign("name", ltsql.str("x"))])),
          ltsql.eq(ltsch.col(t, "id"), ltsql.int(1n)),
        ),
        pgDialect,
      ),
    ),
  );

  check(
    "update returning every column",
    fromDrizzle(db.update(users).set({ name: "x", age: 2 }).where(eq(users.id, 1)).returning().toSQL()),
    ltupd.build(
      ltupd.setDialect(
        ltupd.returningAllColumns(
          ltupd.where(
            ltupd.set(
              ltupd.create(t),
              list([assign("name", ltsql.str("x")), assign("age", ltsql.int(2n))]),
            ),
            ltsql.eq(ltsch.col(t, "id"), ltsql.int(1n)),
          ),
        ),
        pgDialect,
      ),
    ),
  );

  check(
    "delete",
    fromDrizzle(db.delete(users).where(eq(users.id, 1)).toSQL()),
    ltdel.build(
      ltdel.setDialect(
        ltdel.where(ltdel.create(t), ltsql.eq(ltsch.col(t, "id"), ltsql.int(1n))),
        pgDialect,
      ),
    ),
  );

  check(
    "delete returning a column",
    fromDrizzle(db.delete(users).where(eq(users.id, 1)).returning({ id: users.id }).toSQL()),
    ltdel.build(
      ltdel.setDialect(
        ltdel.returning(
          ltdel.where(ltdel.create(t), ltsql.eq(ltsch.col(t, "id"), ltsql.int(1n))),
          list([ltsch.field(t, "id")]),
        ),
        pgDialect,
      ),
    ),
  );
});
