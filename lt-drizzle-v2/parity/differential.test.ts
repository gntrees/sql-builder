// Differential gate for the drizzle port on Lingua Tungga v2.
//
// Expected values always come from drizzle-orm 0.44.4 itself. A fixture is
// green only when the .lt implementation produces byte-identical `sql` and
// `params`.
import { describe, expect, test } from "bun:test";
import { sql as drizzleSql } from "drizzle-orm";
import { PgDialect } from "drizzle-orm/pg-core";

import { postgres, sqlToQuery } from "../../generated/lt-drizzle-v2/typescript/src/dialect";
import { append, param, raw } from "../../generated/lt-drizzle-v2/typescript/src/sql";
import { Value } from "../../generated/lt-drizzle-v2/typescript/src/value";
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
