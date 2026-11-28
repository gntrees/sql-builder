import { afterAll, describe, expect, test } from "bun:test";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

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

const temp = mkdtempSync(join(tmpdir(), "lt-adapter-"));
afterAll(() => rmSync(temp, { recursive: true, force: true }));

describe("generated schema adapter", () => {
    test.skipIf(!existsSync(ltBin))(`Expr -> Sql compiles (${ltBin})`, () => {
        const generated = join(temp, "generated");
        mkdirSync(generated, { recursive: true });

        for (const file of emitLt(schema)) writeFileSync(join(generated, file.name), file.content);

        for (const file of ["sql.lt", "value.lt", "schema.lt", "dialect.lt", "select.lt"]) {
            writeFileSync(
                join(temp, file),
                readFileSync(join(repoRoot, "lt-drizzle-v2/src", file), "utf8"),
            );
        }
        writeFileSync(
            join(temp, "schema_adapter.lt"),
            readFileSync(join(repoRoot, "lt-drizzle-v2/src/schema_adapter.lt"), "utf8"),
        );
        writeFileSync(
            join(temp, "use.lt"),
            `import dialect { postgres } "./dialect.lt"
import schema { Assignment, field } "./schema.lt"
import schema_adapter { on, on_alias, to_assignment, to_sql, to_table } "./schema_adapter.lt"
import schema_enum_role { Role } "./generated/schema_enum_role.lt"
import schema_relations { users_organizations } "./generated/schema_relations.lt"
import schema_tables { users, users_meta } "./generated/schema_tables.lt"
import select { Select, create, fields, from_table, set_dialect, where } "./select.lt"
import sql { Sql } "./sql.lt"

package use {
  export fn by_id() -> Sql {
    to_sql(users.id.eq(1))
  }

  export fn assignment() -> Assignment {
    to_assignment(users.display_name.assign("bob"))
  }

  export fn aliased_relation() -> Sql {
    on_alias(users_organizations, "u", "o")
  }

  export fn admins() -> Sql {
    to_sql(users.role.eq(Role.Admin))
  }

  export fn names() -> Sql {
    to_sql(users.display_name.like("%a%"))
  }

  export fn recent() -> Sql {
    to_sql(users.created_at.gt("2020-01-01"))
  }

  export fn relation() -> Sql {
    on(users_organizations)
  }

  export fn query() -> Select {
    let table = to_table(users_meta)
    set_dialect(
      where(
        fields(from_table(create(), table), [field(table, "id")]),
        to_sql(users.id.eq(1)),
      ),
      postgres(),
    )
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
