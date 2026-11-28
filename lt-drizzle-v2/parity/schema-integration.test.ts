// The generated schema package against the application database itself.
//
// Unlike the differential gate (hand-built tables) and schema/test (string
// assertions), this test proves that the committed schema IR is usable: the
// table metadata and typed accessors come from `schema/schema.json`, and the
// rendered SQL runs against the tables created by `db/migrations/postgres`.
//
// Run through lt-drizzle-v2/verify-db.sh, or manually with DB_TESTS=1 after
// applying the application migrations.
import { SQL } from "bun";
import { afterAll, beforeAll, describe, expect, test } from "bun:test";

import { LList } from "../../generated/lt-drizzle-v2/typescript/_lingua_rt";
import { eq as eqRole, UserRole } from "../../generated/lt-drizzle-v2/typescript/src/generated/schema_enum_user_role";
import { asc, isNull } from "../../generated/lt-drizzle-v2/typescript/src/generated/schema_int";
import { postsMeta, users, usersMeta } from "../../generated/lt-drizzle-v2/typescript/src/generated/schema_tables";
import { eq as eqStr } from "../../generated/lt-drizzle-v2/typescript/src/generated/schema_str";
import { toSql, toTable } from "../../generated/lt-drizzle-v2/typescript/src/schema_adapter";
import { postgres } from "../../generated/lt-drizzle-v2/typescript/src/dialect";
import { col, field } from "../../generated/lt-drizzle-v2/typescript/src/schema";
import {
  build,
  create,
  fields,
  fromTable,
  innerJoin,
  orderBy,
  setDialect,
  where,
} from "../../generated/lt-drizzle-v2/typescript/src/select";
import { eq as eqSql } from "../../generated/lt-drizzle-v2/typescript/src/sql";

const enabled = process.env.DB_TESTS === "1";
const describeDb = enabled ? describe : describe.skip;

const PG_URL =
  process.env.LT_DRIZZLE_PG_URL ?? "postgres://gntrees:gntrees@127.0.0.1:5433/gntrees_test";

function list<T>(items: T[]): LList<T> {
  return new LList<T>(items);
}

function native(value: any): unknown {
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

function render(query: ReturnType<typeof setDialect>): Query {
  const result = build(query);
  if (result.tag === "err") {
    throw new Error(`build failed: ${result.values[0]?.tag}`);
  }
  const rendered = result.values[0];
  return { sql: rendered.sql, params: rendered.params.items.map(native) };
}

const usersTable = toTable(usersMeta);
const postsTable = toTable(postsMeta);

describeDb("generated schema against the application database", () => {
  const sql = new SQL({ url: PG_URL, max: 1 } as any);

  beforeAll(async () => {
    await sql.unsafe("TRUNCATE users RESTART IDENTITY CASCADE");
    await sql.unsafe(
      `INSERT INTO users (name, active, age, email, role)
       VALUES ('alice', true, 30, 'alice@example.com', 'admin'),
              ('bob', false, 17, NULL, 'user')`,
    );
    await sql.unsafe("INSERT INTO posts (user_id, title) VALUES (1, 'hello'), (2, 'world')");
  });

  afterAll(async () => {
    await sql.unsafe("TRUNCATE users RESTART IDENTITY CASCADE");
    await sql.close();
  });

  test("table metadata comes from the generated schema", () => {
    expect(usersTable.name).toBe("users");
    expect(usersTable.columns.items.map((column: any) => column.name)).toEqual([
      "id",
      "name",
      "active",
      "age",
      "email",
      "role",
    ]);
    expect(postsTable.name).toBe("posts");
  });

  test("typed accessor renders a parameterised predicate", async () => {
    const query = render(
      setDialect(
        where(
          fields(fromTable(create(), usersTable), list([field(usersTable, "id"), field(usersTable, "name")])),
          toSql(eqStr(users.name, "alice")),
        ),
        postgres(),
      ),
    );

    expect(query.sql).toBe('select "id", "name" from "users" where "users"."name" = $1');
    expect(query.params).toEqual(["alice"]);

    const rows = (await sql.unsafe(query.sql, query.params)) as any[];
    expect(rows).toHaveLength(1);
    expect(rows[0].name).toBe("alice");
  });

  test("enum accessor binds the database value", async () => {
    const query = render(
      setDialect(
        where(
          fields(fromTable(create(), usersTable), list([field(usersTable, "name")])),
          toSql(eqRole(users.role, UserRole.Admin)),
        ),
        postgres(),
      ),
    );

    expect(query.params).toEqual(["admin"]);
    const rows = (await sql.unsafe(query.sql, query.params)) as any[];
    expect(rows.map((row) => row.name)).toEqual(["alice"]);
  });

  test("nullable column accessor", async () => {
    const query = render(
      setDialect(
        where(
          fields(fromTable(create(), usersTable), list([field(usersTable, "name")])),
          toSql(isNull(users.email)),
        ),
        postgres(),
      ),
    );

    const rows = (await sql.unsafe(query.sql, query.params)) as any[];
    expect(rows.map((row) => row.name)).toEqual(["bob"]);
  });

  test("join uses the column metadata of both generated tables", async () => {
    const on = eqSql(col(postsTable, "user_id"), col(usersTable, "id"));
    const query = render(
      setDialect(
        orderBy(
          innerJoin(
            fields(fromTable(create(), usersTable), list([field(usersTable, "name"), field(postsTable, "title")])),
            postsTable,
            on,
          ),
          list([toSql(asc(users.id))]),
        ),
        postgres(),
      ),
    );
    expect(query.sql).toBe(
      'select "name", "title" from "users" inner join "posts" on "posts"."user_id" = "users"."id" order by "users"."id" asc',
    );

    const rows = (await sql.unsafe(query.sql, query.params)) as any[];
    expect(rows.map((row) => row.title)).toEqual(["hello", "world"]);
  });
});
