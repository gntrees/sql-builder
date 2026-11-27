// Roundtrip gate for the v2 port: the SQL must also be accepted by a real
// server and return the expected rows.
//
// Run through lt-drizzle-v2/verify-db.sh (starts Postgres + MySQL via docker).
import { SQL } from "bun";
import { afterAll, describe, expect, test } from "bun:test";

import { LList } from "../../generated/lt-drizzle-v2/typescript/_lingua_rt";
import * as ltdel from "../../generated/lt-drizzle-v2/typescript/src/delete";
import { mysql as mysqlDialect, postgres as postgresDialect } from "../../generated/lt-drizzle-v2/typescript/src/dialect";
import * as ltins from "../../generated/lt-drizzle-v2/typescript/src/insert";
import { integer as pgInteger, serial, text } from "../../generated/lt-drizzle-v2/typescript/src/pg_core";
import * as ltsch from "../../generated/lt-drizzle-v2/typescript/src/schema";
import * as ltsel from "../../generated/lt-drizzle-v2/typescript/src/select";
import * as ltsql from "../../generated/lt-drizzle-v2/typescript/src/sql";
import * as ltupd from "../../generated/lt-drizzle-v2/typescript/src/update";
import type { Value } from "../../generated/lt-drizzle-v2/typescript/src/value";

const enabled = process.env.DB_TESTS === "1";
const describeDb = enabled ? describe : describe.skip;

const PG_URL =
  process.env.LT_DRIZZLE_PG_URL ?? "postgres://gntrees:gntrees@127.0.0.1:5433/gntrees_test";
const MYSQL_URL =
  process.env.LT_DRIZZLE_MYSQL_URL ?? "mysql://gntrees:gntrees@127.0.0.1:3307/gntrees_test";

function list<T>(items: T[]): LList<T> {
  return new LList<T>(items);
}

function native(value: Value): unknown {
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
      throw new Error(`unsupported value tag ${value.tag}`);
  }
}

type Query = { sql: string; params: unknown[] };

function unwrap(result: any): Query {
  if (result.tag === "err") {
    throw new Error(`build failed: ${result.values[0]?.tag}`);
  }
  const rendered = result.values[0];
  return { sql: rendered.sql, params: rendered.params.items.map(native) };
}

async function applyDdl(sql: SQL, path: string): Promise<void> {
  const text = await Bun.file(path).text();
  const body = text
    .split("\n")
    .filter((line) => !line.trimStart().startsWith("--"))
    .join("\n");
  for (const statement of body.split(";")) {
    if (statement.trim().length > 0) {
      await sql.unsafe(statement);
    }
  }
}

const pgTable = ltsch.plain(
  "lt_drizzle_users",
  list([serial("id"), text("name"), pgInteger("age")]),
);
const myTable = ltsch.plain(
  "lt_drizzle_users",
  list([pgInteger("id"), pgInteger("name"), pgInteger("age")]),
);

const insertRows = (table: typeof pgTable, dialect: any, rows: [string, number][]) =>
  ltins.build(
    ltins.setDialect(
      ltins.values(
        ltins.create(table),
        list(
          rows.map(([name, age]) =>
            list([
              ltsch.assign("name", ltsql.str(name)),
              ltsch.assign("age", ltsql.int(BigInt(age))),
            ]),
          ),
        ),
      ),
      dialect,
    ),
  );

describeDb("postgres roundtrip", () => {
  const sql = new SQL({ url: PG_URL, max: 1 } as any);

  afterAll(async () => {
    await sql.close();
  });

  test("insert, select, update, delete", async () => {
    await applyDdl(sql, "lt-drizzle-v2/parity/ddl/postgres.sql");

    const inserted = unwrap(
      ltins.build(
        ltins.setDialect(
          ltins.returningAllColumns(
            ltins.values(
              ltins.create(pgTable),
              list([
                list([ltsch.assign("name", ltsql.str("ana")), ltsch.assign("age", ltsql.int(30n))]),
                list([ltsch.assign("name", ltsql.str("budi")), ltsch.assign("age", ltsql.int(17n))]),
              ]),
            ),
          ),
          postgresDialect(),
        ),
      ),
    );
    const rows = (await sql.unsafe(inserted.sql, inserted.params)) as { name: string }[];
    expect(rows.map((row) => row.name)).toEqual(["ana", "budi"]);

    const selected = unwrap(
      ltsel.build(
        ltsel.orderBy(
          ltsel.where(
            ltsel.fields(
              ltsel.setDialect(ltsel.fromTable(ltsel.create(), pgTable), postgresDialect()),
              list([ltsch.field(pgTable, "name")]),
            ),
            ltsql.gte(ltsch.col(pgTable, "age"), ltsql.int(18n)),
          ),
          list([ltsql.asc(ltsch.col(pgTable, "name"))]),
        ),
      ),
    );
    const found = (await sql.unsafe(selected.sql, selected.params)) as { name: string }[];
    expect(found.map((row) => row.name)).toEqual(["ana"]);

    const updated = unwrap(
      ltupd.build(
        ltupd.setDialect(
          ltupd.returningAllColumns(
            ltupd.where(
              ltupd.set(ltupd.create(pgTable), list([ltsch.assign("age", ltsql.int(18n))])),
              ltsql.eq(ltsch.col(pgTable, "name"), ltsql.str("budi")),
            ),
          ),
          postgresDialect(),
        ),
      ),
    );
    const updatedRows = (await sql.unsafe(updated.sql, updated.params)) as { age: number }[];
    expect(updatedRows.map((row) => row.age)).toEqual([18]);

    const deleted = unwrap(
      ltdel.build(
        ltdel.setDialect(
          ltdel.where(ltdel.create(pgTable), ltsql.eq(ltsch.col(pgTable, "name"), ltsql.str("ana"))),
          postgresDialect(),
        ),
      ),
    );
    await sql.unsafe(deleted.sql, deleted.params);
    const remaining = (await sql.unsafe(`select "name" from "lt_drizzle_users" order by "name"`)) as {
      name: string;
    }[];
    expect(remaining.map((row) => row.name)).toEqual(["budi"]);
  });
});

describeDb("mysql roundtrip", () => {
  const sql = new SQL({ url: MYSQL_URL, allowPublicKeyRetrieval: true, max: 1 } as any);

  afterAll(async () => {
    await sql.close();
  });

  test("insert, select, delete", async () => {
    await applyDdl(sql, "lt-drizzle-v2/parity/ddl/mysql.sql");

    const inserted = unwrap(insertRows(myTable, mysqlDialect(), [["ana", 30]]));
    await sql.unsafe(inserted.sql, inserted.params);

    const selected = unwrap(
      ltsel.build(
        ltsel.where(
          ltsel.fields(
            ltsel.setDialect(ltsel.fromTable(ltsel.create(), myTable), mysqlDialect()),
            list([ltsch.field(myTable, "name")]),
          ),
          ltsql.gt(ltsch.col(myTable, "age"), ltsql.int(18n)),
        ),
      ),
    );
    const found = (await sql.unsafe(selected.sql, selected.params)) as { name: string }[];
    expect(found.map((row) => row.name)).toEqual(["ana"]);

    const deleted = unwrap(
      ltdel.build(
        ltdel.setDialect(
          ltdel.where(ltdel.create(myTable), ltsql.eq(ltsch.col(myTable, "name"), ltsql.str("ana"))),
          mysqlDialect(),
        ),
      ),
    );
    await sql.unsafe(deleted.sql, deleted.params);
  });
});
