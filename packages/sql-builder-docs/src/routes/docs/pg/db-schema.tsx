import { CodeBlock, CodeBlockCopyButton } from "#/components/ai/code-block"
import {
  highlightCodeBlock
} from "#/components/ai/code-block.loader"
import { DocsLayout } from "#/components/docs-layout"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/docs/pg/db-schema")({
  loader: async () => {
    const [
      cliInstall,
      cliGenerateSchema,
      schemaDefinition,
      schemaSelectJoin,
      schemaWhereGroup,
    ] = await Promise.all([
      highlightCodeBlock(cliInstallCode, "bash"),
      highlightCodeBlock(cliGenerateSchemaCode, "bash"),
      highlightCodeBlock(schemaDefinitionCode, "ts"),
      highlightCodeBlock(schemaSelectJoinCode, "ts"),
      highlightCodeBlock(schemaWhereGroupCode, "ts"),
    ])

    return {
      cliInstall,
      cliGenerateSchema,
      schemaDefinition,
      schemaSelectJoin,
      schemaWhereGroup,
    }
  },
  component: RouteComponent,
})

const cliInstallCode = `npm install -D @gntrees/sql-builder-cli
pnpm add -D @gntrees/sql-builder-cli
yarn add -D @gntrees/sql-builder-cli`

const cliGenerateSchemaCode = `npx @gntrees/sql-builder-cli generate \
  --url="postgres://user:password@localhost:5432/app_db" \
  --output="./src/db/app-db.schema.ts"`

const schemaDefinitionCode = `import { account, user, projects } from "./db.schema"
import { sqlBuilder } from "@gntrees/sql-builder/pg"

const q = sqlBuilder().setFormatParamHandler("pg")

// table and column are strongly typed from schema objects
const accountQuery = q.select(account.id, account.userId).from(account)
const projectQuery = q.select(projects.id, projects.name).from(projects)

accountQuery.getSql()
projectQuery.getSql()`

const schemaSelectJoinCode = `const query = q
  .select(account.id, user.email)
  .from(account)
  .join(user)
  .on(q.eq(account.userId, user.id))

query.getSql()
// SELECT ... FROM "account" JOIN "user" ON "account"."user_id" = "user"."id"`

const schemaWhereGroupCode = `const query = q
  .select(account.userId, q.count("*"))
  .from(account)
  .where(q.op(account.updatedAt, "IS NOT", q.null()))
  .groupBy(account.userId)
  .orderBy(q.desc(account.createdAt))
  .limit(10)

query.getSqlWithParameters()`

function RouteComponent() {
  const highlighted = Route.useLoaderData()

  if (!highlighted) {
    return null
  }

  return (
    <DocsLayout
      breadcrumbHref="/docs/pg"
      pageLabel="DB Schema"
      toc={[
        { label: "Overview", href: "#db-schema-overview" },
        { label: "Why It Exists", href: "#db-schema-benefits" },
        { label: "Install sql-builder-cli", href: "#db-schema-cli-install" },
        { label: "Generate Schema File", href: "#db-schema-cli-generate" },
        { label: "Schema Table/Column", href: "#db-schema-definition" },
        { label: "Join with Schema", href: "#db-schema-join" },
        { label: "Where, Group, Order", href: "#db-schema-where-group" },
      ]}
    >
      <div className="space-y-3" id="db-schema-overview">
        <p className="text-sm font-medium text-muted-foreground">Schema</p>
        <h1 className="text-3xl font-semibold tracking-tight">DB Schema</h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          Use typed table and column objects from your DB schema directly in
          query builder methods such as <code>select</code>, <code>from</code>,
          <code>join</code>, and <code>where</code>.
        </p>
      </div>

      <section className="space-y-3" id="db-schema-benefits">
        <h2 className="text-xl font-semibold">Why It Exists</h2>
        <p className="text-sm text-muted-foreground">
          DB Schema turns your database structure into first-class TypeScript
          values. Instead of typing raw strings repeatedly, you work with
          typed table/column references.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          <article className="rounded-xl border border-border bg-card/60 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Less typo risk
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              <code>account.userId</code> is safer than repeatedly writing
              <code>"account.user_id"</code> by hand.
            </p>
          </article>
          <article className="rounded-xl border border-border bg-card/60 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Better autocomplete
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Query composition is faster because your editor can suggest real
              columns from generated schema files.
            </p>
          </article>
          <article className="rounded-xl border border-border bg-card/60 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Cleaner refactors
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Schema changes are easier to track because typed imports reveal
              affected queries at compile time.
            </p>
          </article>
        </div>
      </section>

      <section className="space-y-3" id="db-schema-cli-install">
        <h2 className="text-xl font-semibold">Install sql-builder-cli</h2>
        <p className="text-sm text-muted-foreground">
          Install CLI once, then generate schema files from your live database.
        </p>
        <CodeBlock
          code={cliInstallCode}
          html={highlighted.cliInstall.light}
          darkHtml={highlighted.cliInstall.dark}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="db-schema-cli-generate">
        <h2 className="text-xl font-semibold">Generate Schema File</h2>
        <p className="text-sm text-muted-foreground">
          Use the <code>generate</code> command to produce a typed DB schema
          file, then import tables/columns in your queries.
        </p>
        <CodeBlock
          code={cliGenerateSchemaCode}
          html={highlighted.cliGenerateSchema.light}
          darkHtml={highlighted.cliGenerateSchema.dark}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="db-schema-definition">
        <h2 className="text-xl font-semibold">Schema Table/Column</h2>
        <p className="text-sm text-muted-foreground">
          Schema literals are accepted in place of string identifiers for safer,
          typed query composition.
        </p>
        <CodeBlock
          code={schemaDefinitionCode}
          html={highlighted.schemaDefinition.light}
          darkHtml={highlighted.schemaDefinition.dark}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="db-schema-join">
        <h2 className="text-xl font-semibold">Join with Schema</h2>
        <p className="text-sm text-muted-foreground">
          Join conditions stay explicit while keeping table and column references
          typed.
        </p>
        <CodeBlock
          code={schemaSelectJoinCode}
          html={highlighted.schemaSelectJoin.light}
          darkHtml={highlighted.schemaSelectJoin.dark}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="db-schema-where-group">
        <h2 className="text-xl font-semibold">Where, Group, Order</h2>
        <p className="text-sm text-muted-foreground">
          Schema-based columns also work for filtering, grouping, sorting, and
          pagination.
        </p>
        <CodeBlock
          code={schemaWhereGroupCode}
          html={highlighted.schemaWhereGroup.light}
          darkHtml={highlighted.schemaWhereGroup.dark}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>
    </DocsLayout>
  )
}
