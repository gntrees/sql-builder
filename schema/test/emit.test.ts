import { afterAll, describe, expect, test } from "bun:test";
import { existsSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { buildSchemaIR, type DmmfDocument } from "../dmmf.ts";
import { emitLt } from "../emit-lt.ts";
import { readFileSync } from "node:fs";

const fixture = JSON.parse(
    readFileSync(join(import.meta.dir, "fixtures/dmmf.json"), "utf8"),
) as DmmfDocument;
const { schema } = buildSchemaIR(fixture, { prismaVersion: "7.10.1" });
const files = emitLt(schema);
const byName = new Map(files.map((file) => [file.name, file.content]));

const ltBin =
    process.env.LT_BIN ??
    join(process.cwd(), "..", "gntrees-lingua-tungga", "target", "release", "lt");

const temp = mkdtempSync(join(tmpdir(), "lt-schema-"));
afterAll(() => rmSync(temp, { recursive: true, force: true }));

describe("schema IR -> LT", () => {
    test("emits the expr, scalar, enum, unsupported, and table packages", () => {
        expect([...byName.keys()].sort()).toEqual([
            "schema_bool.lt",
            "schema_decimal.lt",
            "schema_enum_role.lt",
            "schema_expr.lt",
            "schema_float.lt",
            "schema_int.lt",
            "schema_meta.lt",
            "schema_relations.lt",
            "schema_str.lt",
            "schema_tables.lt",
            "schema_temporal.lt",
            "schema_unsupported.lt",
            "schema_uuid.lt",
        ]);
    });

    test("keeps SQL names separate from accessor names", () => {
        const tables = byName.get("schema_tables.lt")!;
        expect(tables).toContain("display_name: StrColumn");
        expect(tables).toContain('column: "displayName"');
        expect(tables).toContain('column: "createdAt"');
        expect(tables).toContain('column: "orgId"');
        expect(tables).toContain("metadata: UnsupportedColumn");
        expect(tables).toContain('sql_type: "JsonB"');
        expect(tables).toContain("export let users_meta: TableMeta");
        expect(tables).toContain('primary_key: ["id"]');
        expect(tables).toContain('default_sql: "autoincrement"');
        expect(tables).toContain("export let all_table_meta: List<TableMeta>");
    });

    test("emits typed operators and enum value mapping", () => {
        expect(byName.get("schema_int.lt")).toContain(
            "export fn gt(c: IntColumn, v: Int) -> Expr",
        );
        expect(byName.get("schema_str.lt")).toContain(
            "export fn ilike(c: StrColumn, v: Str) -> Expr",
        );
        expect(byName.get("schema_bool.lt")).not.toContain("export fn gt");
        expect(byName.get("schema_enum_role.lt")).toContain('Role.Admin => "admin"');
        expect(byName.get("schema_enum_role.lt")).toContain(
            "export fn eq(c: RoleColumn, v: Role) -> Expr",
        );
    });

    test("emits forward and inverse relation bindings", () => {
        const relations = byName.get("schema_relations.lt")!;
        expect(relations).toContain("export struct RelationMeta");
        expect(relations).toContain("export let users_organizations: RelationMeta");
        expect(relations).toContain("export let organizations_users: RelationMeta");
        expect(relations).toContain('from_table: "users"');
        expect(relations).toContain('from_column: "orgId"');
        expect(relations).toContain('to_table: "organizations"');
        expect(relations).toContain('on_delete: "Cascade"');
        expect(relations).toContain("export let all_relations: List<RelationMeta>");
    });
});

describe("generated LT compiles", () => {
    test.skipIf(!existsSync(ltBin))(`lt check (${ltBin})`, () => {
        for (const file of files) writeFileSync(join(temp, file.name), file.content);
        writeFileSync(
            join(temp, "use.lt"),
            `import schema_expr { Expr } "./schema_expr.lt"
import schema_enum_role { Role } "./schema_enum_role.lt"
import schema_relations { users_organizations } "./schema_relations.lt"
import schema_tables { users } "./schema_tables.lt"

package use {
  export fn by_id() -> Expr {
    users.id.eq(1)
  }

  export fn relation_name() -> Str {
    users_organizations.from_table
  }

  export fn admins() -> Expr {
    users.role.eq(Role.Admin)
  }

  export fn names() -> Expr {
    users.display_name.like("%a%")
  }

  export fn recent() -> Expr {
    users.created_at.gt("2020-01-01")
  }

  export fn balance() -> Expr {
    users.balance.gte("0")
  }

  export fn external() -> Expr {
    users.external_id.eq("00000000-0000-0000-0000-000000000000")
  }
}
`,
        );

        const result = Bun.spawnSync({
            cmd: [ltBin, "check", "use.lt"],
            cwd: temp,
            stdout: "pipe",
            stderr: "pipe",
        });

        const stderr = new TextDecoder().decode(result.stderr);
        expect(stderr).toBe("");
        expect(result.exitCode).toBe(0);
    });
});
