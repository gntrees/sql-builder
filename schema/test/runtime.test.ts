import { afterAll, describe, expect, test } from "bun:test";
import {
    existsSync,
    mkdirSync,
    mkdtempSync,
    readFileSync,
    rmSync,
    writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

import { buildSchemaIR, type DmmfDocument } from "../dmmf.ts";
import { emitLt } from "../emit-lt.ts";

const repoRoot = join(import.meta.dir, "../..");
const ltBin =
    process.env.LT_BIN ??
    join(process.cwd(), "..", "gntrees-lingua-tungga", "target", "release", "lt");

const dmmf = JSON.parse(
    readFileSync(join(import.meta.dir, "fixtures/dmmf.json"), "utf8"),
) as DmmfDocument;
const { schema } = buildSchemaIR(dmmf, { prismaVersion: "7.10.1" });

const temp = mkdtempSync(join(tmpdir(), "lt-schema-runtime-"));
afterAll(() => rmSync(temp, { recursive: true, force: true }));

describe("generated schema runtime", () => {
    test.skipIf(!existsSync(ltBin))(`renders SQL through the v2 adapter (${ltBin})`, async () => {
        const generated = join(temp, "generated");
        mkdirSync(generated, { recursive: true });
        for (const file of emitLt(schema)) writeFileSync(join(generated, file.name), file.content);

        for (const file of [
            "sql.lt",
            "value.lt",
            "schema.lt",
            "dialect.lt",
            "select.lt",
            "schema_adapter.lt",
        ]) {
            writeFileSync(
                join(temp, file),
                readFileSync(join(repoRoot, "lt-drizzle-v2/src", file), "utf8"),
            );
        }

        writeFileSync(
            join(temp, "use.lt"),
            `import dialect { postgres } "./dialect.lt"
import schema { Assignment, field } "./schema.lt"
import schema_adapter { on, on_alias, to_assignment, to_sql, to_table } "./schema_adapter.lt"
import schema_expr { Expr } "./generated/schema_expr.lt"
import schema_int { eq } "./generated/schema_int.lt"
import schema_relations { users_organizations } "./generated/schema_relations.lt"
import schema_tables { all_table_meta, users, users_meta } "./generated/schema_tables.lt"
import select { Select, create, fields, from_table, set_dialect, where } "./select.lt"
import sql { Sql } "./sql.lt"

package use {
  export fn by_id() -> Sql {
    to_sql(eq(users.id, 1))
  }

  export fn distinct_from() -> Sql {
    to_sql(users.id.is_distinct_from(1))
  }

  export fn table_count() -> Int {
    all_table_meta.len()
  }

  export fn relation() -> Sql {
    on(users_organizations)
  }

  export fn aliased_relation() -> Sql {
    on_alias(users_organizations, "u", "o")
  }

  export fn assignment() -> Assignment {
    to_assignment(users.display_name.assign(Some("bob")))
  }

  export fn query() -> Select {
    let table = to_table(users_meta)
    set_dialect(
      where(
        fields(from_table(create(), table), [field(table, "id")]),
        to_sql(eq(users.id, 1)),
      ),
      postgres(),
    )
  }
}
`,
        );

        const buildProcess = Bun.spawnSync({
            cmd: [ltBin, "build", "-t", "ts", "use.lt", "--out", "out"],
            cwd: temp,
            stdout: "pipe",
            stderr: "pipe",
        });
        const buildError = new TextDecoder().decode(buildProcess.stderr);
        expect(buildError).toBe("");
        expect(buildProcess.exitCode).toBe(0);

        const root = join(temp, "out/ts");
        const { LList } = await import(pathToFileURL(join(root, "_lingua_rt.ts")).href);
        const { Some } = await import(pathToFileURL(join(root, "_lingua_rt.ts")).href);
        const { users, usersMeta } = await import(
            pathToFileURL(join(root, "src/generated/schema_tables.ts")).href
        );
        const { toSql, toTable, on, onAlias, onComposite, toAssignment } = await import(
            pathToFileURL(join(root, "src/schema_adapter.ts")).href
        );
        const { usersOrganizations } = await import(
            pathToFileURL(join(root, "src/generated/schema_relations.ts")).href
        );
        const { CompositeRelationMeta } = await import(
            pathToFileURL(join(root, "src/generated/schema_relations.ts")).href
        );
        const { assign: assignStr } = await import(
            pathToFileURL(join(root, "src/generated/schema_nullable_str.ts")).href
        );
        const { sqlToQuery, postgres } = await import(
            pathToFileURL(join(root, "src/dialect.ts")).href
        );
        const { build, create, fields, fromTable, setDialect, where } = await import(
            pathToFileURL(join(root, "src/select.ts")).href
        );
        const { field } = await import(pathToFileURL(join(root, "src/schema.ts")).href);
        const { eq: eqInt, isDistinctFrom, notInList } = await import(
            pathToFileURL(join(root, "src/generated/schema_int.ts")).href
        );
        const { Role, eq: eqRole } = await import(
            pathToFileURL(join(root, "src/generated/schema_enum_role.ts")).href
        );

        const table = toTable(usersMeta);
        const query = setDialect(
            where(
                fields(fromTable(create(), table), new LList([field(table, "id")])),
                toSql(eqInt(users.id, 1n)),
            ),
            postgres(),
        );

        const result = build(query);
        expect(result.tag).toBe("ok");
        const rendered = result.values[0];
        expect(rendered.sql).toBe('select "id" from "users" where "users"."id" = $1');
        expect(rendered.params.items.map((item: any) => String(item.values[0]))).toEqual(["1"]);

        const enumSql = sqlToQuery(postgres(), toSql(eqRole(users.role, Role.Admin)));
        expect(enumSql.sql).toBe('"users"."role" = $1');
        expect(enumSql.params.items.map((item: any) => String(item.values[0]))).toEqual(["admin"]);

        const distinctSql = sqlToQuery(postgres(), toSql(isDistinctFrom(users.id, 1n)));
        expect(distinctSql.sql).toBe('"users"."id" is distinct from $1');

        const notInSql = sqlToQuery(
            postgres(),
            toSql(notInList(users.id, new LList([1n, 2n]))),
        );
        expect(notInSql.sql).toBe('"users"."id" not in ($1, $2)');

        const relationSql = sqlToQuery(postgres(), on(usersOrganizations));
        expect(relationSql.sql).toBe('"users"."orgId" = "organizations"."id"');
        expect(relationSql.params.items).toHaveLength(0);

        const aliasedSql = sqlToQuery(postgres(), onAlias(usersOrganizations, "u", "o"));
        expect(aliasedSql.sql).toBe('"u"."orgId" = "o"."id"');

        const composite = new CompositeRelationMeta({
            name: "OrdersToUsers",
            fromTable: "orders",
            fromColumns: new LList(["user_id", "tenant_id"]),
            fromSchema: "public",
            toTable: "users",
            toColumns: new LList(["id", "tenant_id"]),
            toSchema: "public",
            onDelete: "NoAction",
            onUpdate: "NoAction",
        });
        const compositeSql = sqlToQuery(postgres(), onComposite(composite));
        expect(compositeSql.sql).toBe(
            '("orders"."user_id" = "users"."id" and "orders"."tenant_id" = "users"."tenant_id")',
        );

        const assignment = toAssignment(assignStr(users.displayName, Some("bob")));
        expect(assignment.column).toBe("displayName");
        const assignmentSql = sqlToQuery(postgres(), assignment.value);
        expect(assignmentSql.sql).toBe("$1");
        expect(assignmentSql.params.items.map((item: any) => String(item.values[0]))).toEqual([
            "bob",
        ]);
    });
});
