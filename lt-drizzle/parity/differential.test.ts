// Differential gate for the drizzle port.
//
// Every expected value comes from drizzle-orm 0.44.4 itself (the pinned
// reference), never from a hand-written string. A fixture is green only when
// the .lt implementation produces byte-identical `sql` and `params`.
import { describe, expect, test } from "bun:test";
import { sql } from "drizzle-orm";
import { MySqlDialect } from "drizzle-orm/mysql-core";
import { PgDialect } from "drizzle-orm/pg-core";

import { Dialect } from "../../generated/lt-drizzle/typescript/src/dialect";
import { Sql } from "../../generated/lt-drizzle/typescript/src/sql";
import { Value_Str } from "../../generated/lt-drizzle/typescript/src/value";
import type { Value } from "../../generated/lt-drizzle/typescript/src/value";

type Outcome = { sql: string; params: unknown[] };

const pg = new PgDialect();
const mysql = new MySqlDialect();

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
        Sql.raw("select ").append(Sql.param(Value_Str("x"))),
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
        Sql.raw("select ").append(Sql.param(Value_Str("x"))),
      ),
    ),
  );
});
