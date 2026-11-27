# Schema codegen

Pipeline:

```
Postgres
  -> prisma db pull --force
  -> prisma/schema.prisma
  -> prisma generate
  -> schema/schema.json + schema/unsupported.json
  -> schema/codegen.ts
  -> lt-drizzle-v2/src/generated/schema_*.lt
```

The canonical IR is `schema/schema.json` (version 1). `schema/unsupported.json`
records schema features that are not emitted yet. Neither file is hand-edited.

## Prisma setup

Pin Prisma 7.10.x; DMMF and the generator helper are not semver-stable.

```sh
bun add -d prisma@7.10.1 @prisma/generator-helper@7.10.1
```

Prisma 7 reads the connection URL from `prisma.config.ts`; `prisma/schema.prisma`
only declares the datasource provider and schemas. Add this generator to
`prisma/schema.prisma` after `prisma db pull`:

```prisma
generator ltSchema {
  provider = "bun ./schema/prisma-generator.mjs"
  output   = "../schema"
}
```

Then:

```sh
bunx prisma generate
bun run schema:generate --allow-unsupported
```

`--allow-unsupported` emits `UnsupportedColumn` for columns whose database type
has no LT mapping. Without it, codegen fails and lists the offending columns.
CI uses the allow flag because the fixture deliberately contains `jsonb`; the
unsupported baseline is what actually gates the change.

## Commands

| Command | Meaning |
|---|---|
| `bun run schema:generate` | Write generated LT; fail on unsupported columns. |
| `bun run schema:generate:allow` | Same, but emit `UnsupportedColumn`. |
| `bun run schema:check` | Fail if generated LT is stale. |
| `bun run schema:check:allow` | Same, for the fixture/CI. |
| `bun run schema:test` | Unit tests and an LT compile check. |
| `bun run schema:db:up` | Start the fixture Postgres on port 5434. |
| `bun run schema:db:down` | Stop and remove the fixture database. |
| `bun run schema:introspect` | `prisma db pull --force && prisma generate`. |
| `bun run schema:playground` | Build the static schema playground. |
| `bun run verify:local` | Full local gate: v2 verify + DB roundtrip + playground. |

CI only runs the schema codegen gate (introspection, codegen, unit tests, formatting,
drift check). The heavy native TS/Py/Go gates, database roundtrips, and playground
are local commands so they do not consume GitHub Actions minutes on every push.

Custom output:

```sh
bun schema/codegen.ts generate --out path/to/builder/src/generated
```

## Fixture

`schema/fixtures/postgres.sql` is intentionally separate from
`db/migrations`. It covers an enum, foreign key, composite primary key,
nullability/defaults, `jsonb`, `uuid`, `timestamp`, `numeric`, and a
non-public schema.

```sh
docker compose -f schema/fixtures/docker-compose.yml up -d --wait
DATABASE_URL=postgres://gntrees:gntrees@localhost:5434/gntrees_schema \
  bunx prisma db pull --force
docker compose -f schema/fixtures/docker-compose.yml down -v
```

The DMMF fixture used by the unit tests is
`schema/test/fixtures/dmmf.json`.

## Generated shape

```
schema_expr.lt          ColumnRef, Scalar, Expr
schema_meta.lt          ColumnMeta, TableMeta
schema_int.lt           IntColumn + operators
schema_str.lt           StrColumn + operators (including like/ilike)
schema_bool.lt          BoolColumn + equality/null operators
schema_decimal.lt       DecimalColumn (string values)
schema_uuid.lt          UuidColumn (string values)
schema_temporal.lt      TemporalColumn (string values)
schema_enum_<name>.lt   enum + column + value mapping
schema_unsupported.lt   UnsupportedColumn (no operators)
schema_tables.lt        table structs, bindings such as `users`, and `users_meta`
```

`users.id.eq(...)` returns the neutral `Expr` type. `lt-drizzle-v2/src/schema_adapter.lt`
is the handwritten boundary that converts `Expr` into the v2 `Sql` type and converts
`TableMeta` into the v2 `Table` type, so the select builder can use the generated table:

```lt
let table = to_table(users_meta)
from_table(create(), table)
```

## Playground

`schema/playground/` builds a static gallery of 8 cases: table, column types, composite
key, foreign key, unsupported `jsonb`/array, non-public schema, naming, and composite
unique/index.

```sh
bun run schema:playground
# open schema/playground/out/index.html
```

Each case shows the DMMF input, `schema.json`, `unsupported.json`, generated LT files,
and the `lt check` result. IR snapshots live next to the case as
`<id>.expected.json`; regenerate deliberately with:

```sh
bun schema/playground/build.ts --update
```

## Known DMMF blind spots

Prisma's DMMF does not carry check constraints, view definitions, partial-index
`where` predicates, RLS policies, or always-exact native types. Those are
documented as blind spots; they are not reported as "unsupported" because the
generator cannot see them. See `docs/plans/schema-codegen.md`.
