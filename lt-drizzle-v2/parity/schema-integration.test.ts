// The generated schema package against the application database itself.
//
// Unlike the differential gate (hand-built tables) and schema/test (string
// assertions), this test proves that the committed schema IR is usable: table
// metadata, typed accessors, relation bindings, and assignments all come from
// `schema/schema.json`, and the rendered SQL runs against the tables created by
// `db/migrations/{postgres,mysql}`.
//
// Run through lt-drizzle-v2/verify-db.sh, or manually with DB_TESTS=1 after
// applying the application migrations.
import { SQL } from "bun";
import { afterAll, beforeAll, describe, expect, test } from "bun:test";

import { LList } from "../../generated/lt-drizzle-v2/typescript/_lingua_rt";
import { mysql as mysqlDialect, postgres as postgresDialect } from "../../generated/lt-drizzle-v2/typescript/src/dialect";
import * as ltdel from "../../generated/lt-drizzle-v2/typescript/src/delete";
import { assign as assignRole, eq as eqRole, UserRole } from "../../generated/lt-drizzle-v2/typescript/src/generated/schema_enum_user_role";
import { asc, assign as assignInt, assignNull as assignNullInt, isNull } from "../../generated/lt-drizzle-v2/typescript/src/generated/schema_int";
import { postsUsers } from "../../generated/lt-drizzle-v2/typescript/src/generated/schema_relations";
import { assign as assignStr, eq as eqStr } from "../../generated/lt-drizzle-v2/typescript/src/generated/schema_str";
import { assign as assignBool } from "../../generated/lt-drizzle-v2/typescript/src/generated/schema_bool";
import { posts, postsMeta, users, usersMeta } from "../../generated/lt-drizzle-v2/typescript/src/generated/schema_tables";
import * as ltins from "../../generated/lt-drizzle-v2/typescript/src/insert";
import { field } from "../../generated/lt-drizzle-v2/typescript/src/schema";
import { on, toAssignment, toSql, toTable } from "../../generated/lt-drizzle-v2/typescript/src/schema_adapter";
import {
  build as buildSelect,
  create,
  fields,
  fromTable,
  innerJoin,
  orderBy,
  setDialect as setSelectDialect,
  where,
} from "../../generated/lt-drizzle-v2/typescript/src/select";
import * as ltupd from "../../generated/lt-drizzle-v2/typescript/src/update";

const enabled = process.env.DB_TESTS === "1";
const describeDb = enabled ? describe : describe.skip;

const dialects = ["postgres", "mysql"] as const;
type DialectName = (typeof dialects)[number];

const urls: Record<DialectName, string> = {
  postgres:
    process.env.LT_DRIZZLE_PG_URL ?? "postgres://gntrees:gntrees@127.0.0.1:5433/gntrees_test",
  mysql:
    process.env.LT_DRIZZLE_MYSQL_URL ?? "mysql://gntrees:gntrees@127.0.0.1:3307/gntrees_test",
};

const usersTable = toTable(usersMeta);
const postsTable = toTable(postsMeta);

function list<T>(items: T[]): LList<T> {
  return new LList<T>(items);
}

function dialect(name: DialectName) {
  return name === "postgres" ? postgresDialect() : mysqlDialect();
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

function unwrap(result: any): Query {
  if (result.tag === "err") {
    throw new Error(`build failed: ${result.values[0]?.tag}`);
  }
  const rendered = result.values[0];
  return { sql: rendered.sql, params: rendered.params.items.map(native) };
}

function execute(sql: SQL, query: Query): Promise<unknown[]> {
  return query.params.length > 0
    ? (sql.unsafe(query.sql, query.params) as Promise<unknown[]>)
    : (sql.unsafe(query.sql) as Promise<unknown[]>);
}

const selectQuery = (name: DialectName, query: ReturnType<typeof create>) =>
  unwrap(buildSelect(setSelectDialect(query, dialect(name))));

const insertQuery = (name: DialectName, query: ReturnType<typeof ltins.create>) =>
  unwrap(ltins.build(ltins.setDialect(query, dialect(name))));

const updateQuery = (name: DialectName, query: ReturnType<typeof ltupd.create>) =>
  unwrap(ltupd.build(ltupd.setDialect(query, dialect(name))));

const deleteQuery = (name: DialectName, query: ReturnType<typeof ltdel.create>) =>
  unwrap(ltdel.build(ltdel.setDialect(query, dialect(name))));

function userRow(...assignments: ReturnType<typeof toAssignment>[]) {
  return list(assignments);
}

for (const name of dialects) {
  describeDb(`${name}: generated schema against the application database`, () => {
    const sql = new SQL({ url: urls[name], allowPublicKeyRetrieval: true, max: 1 } as any);

    async function reset(): Promise<void> {
      if (name === "postgres") {
        await sql.unsafe("TRUNCATE users RESTART IDENTITY CASCADE");
      } else {
        await sql.unsafe("SET FOREIGN_KEY_CHECKS = 0");
        try {
          await sql.unsafe("TRUNCATE TABLE posts");
          await sql.unsafe("TRUNCATE TABLE users");
        } finally {
          await sql.unsafe("SET FOREIGN_KEY_CHECKS = 1");
        }
      }
    }

    beforeAll(async () => {
      await reset();

      // alice sets every column explicitly; bob omits role and email so the
      // database defaults (role 'user') and NULL are exercised by the insert.
      await execute(
        sql,
        insertQuery(
          name,
          ltins.values(
            ltins.create(usersTable),
            list([
              userRow(
                toAssignment(assignStr(users.name, "alice")),
                toAssignment(assignBool(users.active, true)),
                toAssignment(assignInt(users.age, 30n)),
                toAssignment(assignStr(users.email, "alice@example.com")),
                toAssignment(assignRole(users.role, UserRole.Admin)),
              ),
              userRow(
                toAssignment(assignStr(users.name, "bob")),
                toAssignment(assignBool(users.active, false)),
                toAssignment(assignInt(users.age, 17n)),
              ),
            ]),
          ),
        ),
      );

      await execute(
        sql,
        insertQuery(
          name,
          ltins.values(
            ltins.create(postsTable),
            list([
              list([
                toAssignment(assignInt(posts.userId, 1n)),
                toAssignment(assignStr(posts.title, "hello")),
              ]),
              list([
                toAssignment(assignInt(posts.userId, 2n)),
                toAssignment(assignStr(posts.title, "world")),
              ]),
            ]),
          ),
        ),
      );
    });

    afterAll(async () => {
      await reset();
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
      const query = selectQuery(
        name,
        where(
          fields(fromTable(create(), usersTable), list([field(usersTable, "id"), field(usersTable, "name")])),
          toSql(eqStr(users.name, "alice")),
        ),
      );

      if (name === "postgres") {
        expect(query.sql).toBe('select "id", "name" from "users" where "users"."name" = $1');
        expect(query.params).toEqual(["alice"]);
      } else {
        expect(query.sql).toBe("select `id`, `name` from `users` where `users`.`name` = ?");
        expect(query.params).toEqual(["alice"]);
      }

      const rows = (await execute(sql, query)) as any[];
      expect(rows).toHaveLength(1);
      expect(rows[0].name).toBe("alice");
    });

    test("enum accessor binds the database value", async () => {
      const query = selectQuery(
        name,
        where(
          fields(fromTable(create(), usersTable), list([field(usersTable, "name")])),
          toSql(eqRole(users.role, UserRole.Admin)),
        ),
      );

      expect(query.params).toEqual(["admin"]);
      const rows = (await execute(sql, query)) as any[];
      expect(rows.map((row) => row.name)).toEqual(["alice"]);
    });

    test("omitted insert columns fall back to default and NULL", async () => {
      const rows = (await execute(
        sql,
        selectQuery(
          name,
          where(
            fields(fromTable(create(), usersTable), list([field(usersTable, "name"), field(usersTable, "email"), field(usersTable, "role")])),
            toSql(eqStr(users.name, "bob")),
          ),
        ),
      )) as any[];

      expect(rows).toHaveLength(1);
      expect(rows[0].email).toBe(null);
      expect(rows[0].role).toBe("user");
    });

    test("nullable column accessor", async () => {
      const query = selectQuery(
        name,
        where(
          fields(fromTable(create(), usersTable), list([field(usersTable, "name")])),
          toSql(isNull(users.email)),
        ),
      );

      const rows = (await execute(sql, query)) as any[];
      expect(rows.map((row) => row.name)).toEqual(["bob"]);
    });

    test("join uses the generated relation binding", async () => {
      const query = selectQuery(
        name,
        orderBy(
          innerJoin(
            fields(fromTable(create(), usersTable), list([field(usersTable, "name"), field(postsTable, "title")])),
            postsTable,
            on(postsUsers),
          ),
          list([toSql(asc(users.id))]),
        ),
      );

      if (name === "postgres") {
        expect(query.sql).toBe(
          'select "name", "title" from "users" inner join "posts" on "posts"."user_id" = "users"."id" order by "users"."id" asc',
        );
      }

      const rows = (await execute(sql, query)) as any[];
      expect(rows.map((row) => row.title)).toEqual(["hello", "world"]);
    });

    test("insert, update and delete use generated assignments", async () => {
      await execute(
        sql,
        insertQuery(
          name,
          ltins.values(
            ltins.create(usersTable),
            list([
              userRow(
                toAssignment(assignStr(users.name, "carol")),
                toAssignment(assignBool(users.active, true)),
              ),
            ]),
          ),
        ),
      );

      const created = (await execute(
        sql,
        selectQuery(
          name,
          where(
            fields(fromTable(create(), usersTable), list([field(usersTable, "id"), field(usersTable, "role")])),
            toSql(eqStr(users.name, "carol")),
          ),
        ),
      )) as any[];
      expect(created).toHaveLength(1);
      expect(created[0].role).toBe("user");

      await execute(
        sql,
        updateQuery(
          name,
          ltupd.where(
            ltupd.set(
              ltupd.create(usersTable),
              list([
                toAssignment(assignInt(users.age, 28n)),
                toAssignment(assignRole(users.role, UserRole.Admin)),
              ]),
            ),
            toSql(eqStr(users.name, "carol")),
          ),
        ),
      );

      const updated = (await execute(
        sql,
        selectQuery(
          name,
          where(
            fields(fromTable(create(), usersTable), list([field(usersTable, "age"), field(usersTable, "role")])),
            toSql(eqStr(users.name, "carol")),
          ),
        ),
      )) as any[];
      expect(Number(updated[0].age)).toBe(28);
      expect(updated[0].role).toBe("admin");

      await execute(
        sql,
        deleteQuery(
          name,
          ltdel.where(ltdel.create(usersTable), toSql(eqStr(users.name, "carol"))),
        ),
      );

      const remaining = (await execute(
        sql,
        selectQuery(
          name,
          where(
            fields(fromTable(create(), usersTable), list([field(usersTable, "name")])),
            toSql(eqStr(users.name, "carol")),
          ),
        ),
      )) as any[];
      expect(remaining).toHaveLength(0);
    });

    test("assign_null writes SQL NULL", async () => {
      const query = updateQuery(
        name,
        ltupd.where(
          ltupd.set(ltupd.create(usersTable), list([toAssignment(assignNullInt(users.age))])),
          toSql(eqStr(users.name, "bob")),
        ),
      );

      await execute(sql, query);
      const rows = (await execute(
        sql,
        selectQuery(
          name,
          where(
            fields(fromTable(create(), usersTable), list([field(usersTable, "age")])),
            toSql(eqStr(users.name, "bob")),
          ),
        ),
      )) as any[];
      expect(rows[0].age).toBe(null);
    });
  });
}
