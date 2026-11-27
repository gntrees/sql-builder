// Differential gate for the drizzle port.
//
// Every expected value comes from drizzle-orm 0.44.4 itself (the pinned
// reference), never from a hand-written string. A fixture is green only when
// the .lt implementation produces byte-identical `sql` and `params`.
import { describe, expect, test } from "bun:test";
import { and, asc, between, count, desc, eq, gt, ilike, inArray, isNotNull, isNull, like, ne, not, notBetween, notIlike, notInArray, notLike, or, sql, sum } from "drizzle-orm";
import { MySqlDialect } from "drizzle-orm/mysql-core";
import { alias, integer, pgSchema, pgTable, serial, text } from "drizzle-orm/pg-core";
import { PgDatabase } from "drizzle-orm/pg-core";
import { PgDialect } from "drizzle-orm/pg-core";

import { LList } from "../../generated/lt-drizzle/typescript/_lingua_rt";
import { Column } from "../../generated/lt-drizzle/typescript/src/column";
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
