import { createFileRoute } from "@tanstack/react-router"
import { DocsLayout } from "#/components/docs-layout"
import { CodeBlock, CodeBlockCopyButton } from "#/components/ai/code-block"
import {
  // buildSqlResultFromCode,
  highlightCodeBlock,
} from "#/components/ai/code-block.loader"

export const Route = createFileRoute("/docs/pg/sql-schema")({
  loader: async () => {
    const [
      schemaSetup,
      schemaParamRules,
      schemaParams,
      schemaCaseBehavior,
      nestedSchemaCase,
      // schemaSetupSqlResult,
      // schemaParamsSqlResult,
      // schemaCaseBehaviorSqlResult,
      // nestedSchemaCaseSqlResult,
    ] = await Promise.all([
      highlightCodeBlock(schemaSetupCode, "ts"),
      highlightCodeBlock(schemaParamRulesCode, "ts"),
      highlightCodeBlock(schemaParamsCode, "ts"),
      highlightCodeBlock(schemaCaseBehaviorCode, "ts"),
      highlightCodeBlock(nestedSchemaCaseCode, "ts"),
      // buildSqlResultFromCode(schemaSetupCode),
      // buildSqlResultFromCode(schemaParamsCode),
      // buildSqlResultFromCode(schemaCaseBehaviorCode),
      // buildSqlResultFromCode(nestedSchemaCaseCode),
    ])

    return {
      schemaSetup,
      schemaParamRules,
      schemaParams,
      schemaCaseBehavior,
      nestedSchemaCase,
      // schemaSetupSqlResult,
      // schemaParamsSqlResult,
      // schemaCaseBehaviorSqlResult,
      // nestedSchemaCaseSqlResult,
    }
  },
  component: RouteComponent,
})

const schemaSetupCode = `import { sqlBuilder, sqlSchema } from "@gntrees/sql-builder/pg"

const q = sqlBuilder().setFormatParamHandler("pg")
const sch = sqlSchema()

const schema = sch.setQuery(
  "getUsers",
  sch.set.query(
    q
      .select(q.c("users.id"), q.c("users.name"))
      .from(q.t("users"))
      .schemaCase(
        "filter",
        q.where(
          q.ilike(
            q.c("users.name"),
            q.schemaParam("name").string().default("%john%"),
          ),
        ),
      )
      .limit(q.schemaParam("limit").number().default(10)),
  ),
)`

const schemaParamsCode = `const builder = schema.query("getUsers").setParams({
  filter: { name: "%anna%" },
  limit: 5,
})

builder.getSql()
// SELECT "users"."id", "users"."name" FROM "users" WHERE "users"."name" ILIKE $1 LIMIT $2

builder.getSqlParameters()
// ["%anna%", 5]

// if filter is undefined/false, schemaCase block is skipped
schema.query("getUsers").setParams({ limit: 5 })`

const schemaParamRulesCode = `const q = sqlBuilder().setFormatParamHandler("pg")

// 1) No explicit type
const flexible = q.schemaParam("keyword")
// accepted runtime value: string | number | boolean | null

// 2) Single type
const onlyNumber = q.schemaParam("limit").number()
// accepted runtime value: number

// 3) Multiple type methods produce UNION
const numberOrString = q.schemaParam("page").number().string()
// accepted runtime value: number | string

// 4) Add null explicitly
const nullableText = q.schemaParam("search").string().nullable()
// accepted runtime value: string | null

// 5) default(...) follows the currently declared type union
q.schemaParam("limit").number().string().default("10") // valid
q.schemaParam("limit").number().string().default(10) // valid
// q.schemaParam("limit").number().string().default(true) // type error`

const schemaCaseBehaviorCode = `const query = q
  .select("*")
  .from(q.t("users"))
  .schemaCase(
    "filter",
    q.where(
      q.ilike(q.c("users.name"), q.schemaParam("name").string().default("%test%")),
    ),
  )

query.setParams({ filter: false })
// schemaCase skipped

query.setParams({ filter: true })
// schemaCase included, nested params use their default values

query.setParams({ filter: {} })
// schemaCase included, same as true (nested params fall back to default)

query.setParams({ filter: { name: "%john%" } })
// schemaCase included, nested object overrides matching schemaParam values`

const nestedSchemaCaseCode = `const schema = sch.setQuery(
  "getUsers",
  sch.set.query(
    q
      .select("*")
      .from(q.t("users"))
      .schemaCase(
        "filter",
        q.where(
          q.and(
            q.ilike(q.c("users.name"), q.schemaParam("name").string().default("%test%"))
              .schemaCase(
                "ageFilter",
                q.sub(
                  q.and(
                    q.gt(q.c("users.age"), q.schemaParam("age").number().default(18)),
                  ),
                ),
              ),
          ),
        ),
      )
      .limit(q.schemaParam("limit").number().default(10)),
  ),
)

schema.query("getUsers").setParams({
  filter: {
    name: "%magma%",
    ageFilter: {
      age: 21,
    },
  },
  limit: 20,
})`

function RouteComponent() {
  const highlighted = Route.useLoaderData()

  if (!highlighted) {
    return null
  }

  return (
    <DocsLayout
      breadcrumbHref="/docs/pg"
      pageLabel="SQL Schema"
      toc={[
        { label: "Overview", href: "#sql-schema-overview" },
        { label: "Why It Exists", href: "#sql-schema-benefits" },
        { label: "Define Query Schema", href: "#sql-schema-define" },
        { label: "schemaParam Type Rules", href: "#sql-schema-param-rules" },
        { label: "Set Runtime Params", href: "#sql-schema-params" },
        { label: "schemaCase Behavior", href: "#sql-schema-case" },
        { label: "Nested schemaCase", href: "#sql-schema-nested" },
      ]}
    >
      <div className="space-y-3" id="sql-schema-overview">
        <p className="text-sm font-medium text-muted-foreground">Schema</p>
        <h1 className="text-3xl font-semibold tracking-tight">SQL Schema</h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          <code>sqlSchema</code> lets you register named queries and control
          optional SQL blocks with <code>schemaCase</code> and typed inputs via
          <code>schemaParam</code>.
        </p>
      </div>

      <section className="space-y-3" id="sql-schema-benefits">
        <h2 className="text-xl font-semibold">Why It Exists</h2>
        <p className="text-sm text-muted-foreground">
          Think of SQL Schema as a small query DSL for feature flags and typed
          runtime input. You define one canonical query shape, then turn pieces
          on or off safely.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          <article className="rounded-xl border border-border bg-card/60 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Reuse
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Register named queries once with <code>setQuery</code> and call
              them anywhere via <code>schema.query("name")</code>.
            </p>
          </article>
          <article className="rounded-xl border border-border bg-card/60 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Safety
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Constrain input types with <code>schemaParam</code> and fail fast
              when runtime values do not match.
            </p>
          </article>
          <article className="rounded-xl border border-border bg-card/60 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Flexibility
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Toggle optional SQL blocks with <code>schemaCase</code> instead of
              duplicating near-identical query builders.
            </p>
          </article>
        </div>
      </section>

      <section className="space-y-3" id="sql-schema-define">
        <h2 className="text-xl font-semibold">Define Query Schema</h2>
        <p className="text-sm text-muted-foreground">
          Register reusable queries with <code>setQuery</code>, then gate
          optional clauses using <code>schemaCase</code>.
        </p>
        <CodeBlock
          code={schemaSetupCode}
          html={highlighted.schemaSetup.light}
          darkHtml={highlighted.schemaSetup.dark}
          // sqlResult={highlighted.schemaSetupSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="sql-schema-param-rules">
        <h2 className="text-xl font-semibold">schemaParam Type Rules</h2>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            If <code>schemaParam("key")</code> is used without
            <code>.number()</code>, <code>.string()</code>,
            <code>.boolean()</code>, or <code>.nullable()</code>, it accepts
            <code>string | number | boolean | null</code>. No coercion is
            applied.
          </p>
          <p>
            Chaining type methods creates a union. Example:
            <code>.number().string()</code> means valid runtime values are
            <code>number | string</code>.
          </p>
          <p>
            If runtime data does not match declared types, the builder throws
            <code>Invalid value for SqlSchemaParam</code>.
          </p>
          <p>
            <code>default(...)</code> must match the current union. For
            <code>.number().string()</code>, default can only be
            <code>number</code> or <code>string</code>.
          </p>
        </div>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-3 py-2 text-left font-medium">Definition</th>
                <th className="px-3 py-2 text-left font-medium">Accepted Runtime Type</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/60">
                <td className="px-3 py-2 font-mono text-xs">schemaParam("x")</td>
                <td className="px-3 py-2 text-muted-foreground">
                  string | number | boolean | null
                </td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-3 py-2 font-mono text-xs">schemaParam("x").number()</td>
                <td className="px-3 py-2 text-muted-foreground">number</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-3 py-2 font-mono text-xs">schemaParam("x").number().string()</td>
                <td className="px-3 py-2 text-muted-foreground">
                  number | string
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono text-xs">schemaParam("x").string().nullable()</td>
                <td className="px-3 py-2 text-muted-foreground">string | null</td>
              </tr>
            </tbody>
          </table>
        </div>
        <CodeBlock
          code={schemaParamRulesCode}
          html={highlighted.schemaParamRules.light}
          darkHtml={highlighted.schemaParamRules.dark}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="sql-schema-params">
        <h2 className="text-xl font-semibold">Set Runtime Params</h2>
        <p className="text-sm text-muted-foreground">
          Use <code>setParams</code> to override defaults. Missing values keep
          the default value; <code>schemaCase</code> can be skipped by passing
          <code>undefined</code> or <code>false</code>.
        </p>
        <CodeBlock
          code={schemaParamsCode}
          html={highlighted.schemaParams.light}
          darkHtml={highlighted.schemaParams.dark}
          // sqlResult={highlighted.schemaParamsSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="sql-schema-case">
        <h2 className="text-xl font-semibold">schemaCase Behavior</h2>
        <p className="text-sm text-muted-foreground">
          Runtime value controls whether the case block is injected into final
          SQL and how nested params are resolved.
        </p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-3 py-2 text-left font-medium">setParams value</th>
                <th className="px-3 py-2 text-left font-medium">What happens</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/60">
                <td className="px-3 py-2 font-mono text-xs">true</td>
                <td className="px-3 py-2 text-muted-foreground">
                  Case block is included; nested schema params use defaults when provided.
                </td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-3 py-2 font-mono text-xs">false</td>
                <td className="px-3 py-2 text-muted-foreground">Case block is skipped.</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-3 py-2 font-mono text-xs">undefined (missing key)</td>
                <td className="px-3 py-2 text-muted-foreground">Case block is skipped.</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-3 py-2 font-mono text-xs">{"{}"}</td>
                <td className="px-3 py-2 text-muted-foreground">
                  Case block is included; behaves like true with empty nested params.
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono text-xs">{`{ name: "%john%" }`}</td>
                <td className="px-3 py-2 text-muted-foreground">
                  Case block is included; provided object overrides matching nested schemaParam values.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <CodeBlock
          code={schemaCaseBehaviorCode}
          html={highlighted.schemaCaseBehavior.light}
          darkHtml={highlighted.schemaCaseBehavior.dark}
          // sqlResult={highlighted.schemaCaseBehaviorSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="sql-schema-nested">
        <h2 className="text-xl font-semibold">Nested schemaCase</h2>
        <p className="text-sm text-muted-foreground">
          You can nest <code>schemaCase</code> blocks for deeper conditional
          filters, while keeping typed param checks for nested objects.
        </p>
        <CodeBlock
          code={nestedSchemaCaseCode}
          html={highlighted.nestedSchemaCase.light}
          darkHtml={highlighted.nestedSchemaCase.dark}
          // sqlResult={highlighted.nestedSchemaCaseSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>
    </DocsLayout>
  )
}
