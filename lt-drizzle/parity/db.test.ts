// Roundtrip gate: the SQL produced by the port must not only match drizzle
// byte-for-byte, it must also be accepted by a real server and return the
// expected rows.
//
// Run through lt-drizzle/verify-db.sh (starts Postgres + MySQL via docker).
import { SQL } from "bun";
import { afterAll, describe, expect, test } from "bun:test";

import { LList } from "../../generated/lt-drizzle/typescript/_lingua_rt";
import { Assignment } from "../../generated/lt-drizzle/typescript/src/assignment";
import { Column } from "../../generated/lt-drizzle/typescript/src/column";
import { Delete } from "../../generated/lt-drizzle/typescript/src/delete";
import { Dialect } from "../../generated/lt-drizzle/typescript/src/dialect";
import { Insert } from "../../generated/lt-drizzle/typescript/src/insert";
import { Select } from "../../generated/lt-drizzle/typescript/src/select";
import { Sql } from "../../generated/lt-drizzle/typescript/src/sql";
import { Table } from "../../generated/lt-drizzle/typescript/src/table";
import { Update } from "../../generated/lt-drizzle/typescript/src/update";
import type { Value } from "../../generated/lt-drizzle/typescript/src/value";

const enabled = process.env.DB_TESTS === "1";
const describeDb = enabled ? describe : describe.skip;

const PG_URL =
  process.env.LT_DRIZZLE_PG_URL ??
  "postgres://gntrees:gntrees@127.0.0.1:5433/gntrees_test";
const MYSQL_URL =
  process.env.LT_DRIZZLE_MYSQL_URL ??
  "mysql://gntrees:gntrees@127.0.0.1:3307/gntrees_test";

function list<T>(items: T[]): LList<T> {
  return new LList<T>(items);
}

function native(value: Value): unknown {
  switch (value.tag) {
    case "Null":
      return null;
    case "Bool":
    case "Str":
      return value.values[0];
    case "Int":
      return Number(value.values[0]);
    case "Float":
      return value.values[0];
    default:
      throw new Error(`unsupported value tag ${value.tag}`);
  }
}

type Query = { sql: string; params: unknown[] };

function unwrap(builder: { build(): any }): Query {
  const result = builder.build();
  if (result.tag === "err") {
    throw new Error(`build failed: ${result.values[0]?.tag}`);
  }
  const rendered = result.values[0];
  return {
    sql: rendered.sql,
    params: rendered.params.items.map(native),
  };
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

const pgTable = Table.plain(
  "lt_drizzle_users",
  list([Column.serial("id"), Column.text("name"), Column.integer("age")]),
);
const myTable = Table.plain(
  "lt_drizzle_users",
  list([Column.integer("id"), Column.varchar("name", 255n), Column.integer("age")]),
);

const insertRows = (table: Table, dialect: Dialect, rows: [string, number][]) =>
  Insert.create(table)
    .values(
      list(
        rows.map(([name, age]) =>
          list([
            Assignment.of("name", Sql.str(name)),
            Assignment.of("age", Sql.int(BigInt(age))),
          ]),
        ),
      ),
    )
    .setDialect(dialect);

describeDb("postgres roundtrip", () => {
  const sql = new SQL({ url: PG_URL, max: 1 } as any);

  afterAll(async () => {
    await sql.close();
  });

  test("insert, select, update, delete", async () => {
    await applyDdl(sql, "lt-drizzle/parity/ddl/postgres.sql");

    const inserted = unwrap(
      insertRows(pgTable, Dialect.postgres(), [["ana", 30], ["budi", 17]]).returningAllColumns(),
    );
    const rows = (await sql.unsafe(inserted.sql, inserted.params)) as { name: string }[];
    expect(rows.map((row) => row.name)).toEqual(["ana", "budi"]);

    const selected = unwrap(
      Select.create()
        .fromTable(pgTable)
        .select(list([pgTable.field("name")]))
        .where(pgTable.col("age").gte(Sql.int(18n)))
        .orderBy(list([pgTable.col("name").asc()]))
        .setDialect(Dialect.postgres()),
    );
    const found = (await sql.unsafe(selected.sql, selected.params)) as { name: string }[];
    expect(found.map((row) => row.name)).toEqual(["ana"]);

    const updated = unwrap(
      Update.create(pgTable)
        .set(list([Assignment.of("age", Sql.int(18n))]))
        .where(pgTable.col("name").eq(Sql.str("budi")))
        .returningAllColumns()
        .setDialect(Dialect.postgres()),
    );
    const updatedRows = (await sql.unsafe(updated.sql, updated.params)) as { age: number }[];
    expect(updatedRows.map((row) => row.age)).toEqual([18]);

    const deleted = unwrap(
      Delete.create(pgTable)
        .where(pgTable.col("name").eq(Sql.str("ana")))
        .setDialect(Dialect.postgres()),
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
    await applyDdl(sql, "lt-drizzle/parity/ddl/mysql.sql");

    const inserted = unwrap(insertRows(myTable, Dialect.mysql(), [["ana", 30]]));
    await sql.unsafe(inserted.sql, inserted.params);

    const selected = unwrap(
      Select.create()
        .fromTable(myTable)
        .select(list([myTable.field("name")]))
        .where(myTable.col("age").gt(Sql.int(18n)))
        .setDialect(Dialect.mysql()),
    );
    const found = (await sql.unsafe(selected.sql, selected.params)) as { name: string }[];
    expect(found.map((row) => row.name)).toEqual(["ana"]);

    const deleted = unwrap(
      Delete.create(myTable)
        .where(myTable.col("name").eq(Sql.str("ana")))
        .setDialect(Dialect.mysql()),
    );
    await sql.unsafe(deleted.sql, deleted.params);
  });
});
