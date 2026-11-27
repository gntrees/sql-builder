// Differential gate for the drizzle port on Lingua Tungga v2.
//
// Expected values always come from drizzle-orm 0.44.4 itself. A fixture is
// green only when the .lt implementation produces byte-identical `sql` and
// `params`.
import { describe, expect, test } from "bun:test";
import { sql as drizzleSql } from "drizzle-orm";
import { MySqlDialect } from "drizzle-orm/mysql-core";
import { alias, integer, pgSchema, pgTable, serial, text } from "drizzle-orm/pg-core";
import { PgDialect } from "drizzle-orm/pg-core";

import { LList } from "../../generated/lt-drizzle-v2/typescript/_lingua_rt";
import { mysql, postgres, sqlToQuery } from "../../generated/lt-drizzle-v2/typescript/src/dialect";
import { append, bool, float, identifier, int, nullValue, param, raw, str, tag } from "../../generated/lt-drizzle-v2/typescript/src/sql";
import type { Sql } from "../../generated/lt-drizzle-v2/typescript/src/sql";
import { SqlArg, Value } from "../../generated/lt-drizzle-v2/typescript/src/value";
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
