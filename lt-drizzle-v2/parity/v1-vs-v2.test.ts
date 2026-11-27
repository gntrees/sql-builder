// One-off migration check (NOT part of the CI gate): the v1 and v2 ports must
// produce the same SQL and params for the same input.
//
// Requires the v1 artifacts in `generated/lt-drizzle/` (built with the v1
// compiler pin 09bffc7) and the v2 artifacts in `generated/lt-drizzle-v2/`.
import { describe, expect, test } from "bun:test";

import { Dialect as DialectV1 } from "../../generated/lt-drizzle/typescript/src/dialect";
import { Select as SelectV1 } from "../../generated/lt-drizzle/typescript/src/select";
import { Sql as SqlV1 } from "../../generated/lt-drizzle/typescript/src/sql";
import { Table as TableV1 } from "../../generated/lt-drizzle/typescript/src/table";
import { Value_Str as ValueStrV1 } from "../../generated/lt-drizzle/typescript/src/value";
import { Column as ColumnV1 } from "../../generated/lt-drizzle/typescript/src/column";

import { postgres, sqlToQuery } from "../../generated/lt-drizzle-v2/typescript/src/dialect";
import * as ltsel from "../../generated/lt-drizzle-v2/typescript/src/select";
import * as ltsch from "../../generated/lt-drizzle-v2/typescript/src/schema";
import * as ltsql from "../../generated/lt-drizzle-v2/typescript/src/sql";
import * as ltpg from "../../generated/lt-drizzle-v2/typescript/src/pg_core";
import { LList } from "../../generated/lt-drizzle-v2/typescript/_lingua_rt";

type Out = { sql: string; params: unknown[] };

function list<T>(items: T[]): LList<T> {
  return new LList<T>(items);
}

function nat(value: any): unknown {
  switch (value.tag) {
    case "Null":
      return null;
    case "Bool":
    case "Boolean":
    case "Str":
    case "Text":
      return value.values[0];
    case "Int":
    case "Integer":
      return Number(value.values[0]);
    case "Float":
      return value.values[0];
    default:
      throw new Error(`unsupported ${value.tag}`);
  }
}

function v1(rendered: { sql: string; params: { items: readonly any[] } }): Out {
  return { sql: rendered.sql, params: rendered.params.items.map(nat) };
}

function v2(rendered: { sql: string; params: { items: readonly any[] } }): Out {
  return { sql: rendered.sql, params: rendered.params.items.map(nat) };
}

const tv1 = TableV1.plain("users", list([ColumnV1.serial("id"), ColumnV1.text("name"), ColumnV1.integer("age")]));
const tv2 = ltsch.plain("users", list([ltpg.serial("id"), ltpg.text("name"), ltpg.integer("age")]));

describe("v1 vs v2", () => {
  test("raw sql", () => {
    const a = v1(DialectV1.postgres().sqlToQuery(SqlV1.raw("select 1")));
    const b = v2(sqlToQuery(postgres(), ltsql.raw("select 1")));
    expect(a).toEqual(b);
  });

  test("typed parameter", () => {
    const a = v1(
      DialectV1.postgres().sqlToQuery(
        SqlV1.raw("select ").append(SqlV1.param(ValueStrV1("x"))),
      ),
    );
    const b = v2(sqlToQuery(postgres(), ltsql.append(ltsql.raw("select "), ltsql.str("x"))));
    expect(a).toEqual(b);
  });

  test("select with where, order, and limit", () => {
    const a = v1(
      SelectV1.create()
        .fromTable(tv1)
        .select(list([tv1.field("id")]))
        .where(tv1.col("age").gte(SqlV1.int(18n)))
        .orderBy(list([tv1.col("id").asc()]))
        .limit(5n)
        .setDialect(DialectV1.postgres())
        .build().values[0],
    );
    const d = postgres();
    const b = v2(
      ltsel.build(
        ltsel.limit(
          ltsel.orderBy(
            ltsel.where(
              ltsel.fields(ltsel.setDialect(ltsel.fromTable(ltsel.create(), tv2), d), list([ltsch.field(tv2, "id")])),
              ltsql.gte(ltsch.col(tv2, "age"), ltsql.int(18n)),
            ),
            list([ltsql.asc(ltsch.col(tv2, "id"))]),
          ),
          5n,
        ),
      ).values[0],
    );
    expect(a).toEqual(b);
  });
});
