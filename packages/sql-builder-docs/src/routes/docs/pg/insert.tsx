import { createFileRoute } from "@tanstack/react-router"
import { DocsLayout } from "#/components/docs-layout"
import { CodeBlock, CodeBlockCopyButton } from "#/components/ai/code-block"
import {
  buildSqlResultFromCode,
  highlightCodeBlock,
} from "#/components/ai/code-block.loader"

export const Route = createFileRoute("/docs/pg/insert")({
  loader: async () => {
    const [
      insertIntoBasics,
      insertValuesBasics,
      upsertBasics,
      conflictTargets,
      conflictActions,
      insertIntoBasicsSqlResult,
      insertValuesBasicsSqlResult,
      upsertBasicsSqlResult,
      conflictTargetsSqlResult,
      conflictActionsSqlResult,
    ] = await Promise.all([
      highlightCodeBlock(insertIntoBasicsCode, "ts"),
      highlightCodeBlock(insertValuesBasicsCode, "ts"),
      highlightCodeBlock(upsertBasicsCode, "ts"),
      highlightCodeBlock(conflictTargetsCode, "ts"),
      highlightCodeBlock(conflictActionsCode, "ts"),
      buildSqlResultFromCode(insertIntoBasicsCode),
      buildSqlResultFromCode(insertValuesBasicsCode),
      buildSqlResultFromCode(upsertBasicsCode),
      buildSqlResultFromCode(conflictTargetsCode),
      buildSqlResultFromCode(conflictActionsCode),
    ])

    return {
      insertIntoBasics,
      insertValuesBasics,
      upsertBasics,
      conflictTargets,
      conflictActions,
      insertIntoBasicsSqlResult,
      insertValuesBasicsSqlResult,
      upsertBasicsSqlResult,
      conflictTargetsSqlResult,
      conflictActionsSqlResult,
    }
  },
  component: RouteComponent,
})

const insertIntoBasicsCode = `

const query = q
  .insertInto(q.t("users"), [q.c("email"), q.c("status")])
  .values([q.v("hello@example.com"), q.v("active")])`

const insertValuesBasicsCode = `const query = q.insert(q.t("users"), {
  email: q.v("hello@example.com"),
  status: q.v("active"),
})`

const upsertBasicsCode = `const query = q
  .insert(q.t("users"), {
    email: q.v("hello@example.com"),
    status: q.v("active"),
  })
  .onConflictDoUpdate({
    target: [q.c("users.email")],
    set: { status: q.v("active") },
  })
  .returning(q.c("users.id"))`

const conflictTargetsCode = `const query = q
  .insert(q.t("users"), {
    email: q.v("hello@example.com"),
    status: q.v("pending"),
  })
  .onConflict(
    [q.c("users.email")],
    q.eq(q.c("users.status"), q.v("pending")),
  )
  .doUpdate({ status: q.v("active") })`

const conflictActionsCode = `const query = q
  .insert(q.t("users"), {
    email: q.v("hello@example.com"),
    status: q.v("active"),
  })
  .onConstraint(q.i("users_email_key"))
  .doNothing()`

function RouteComponent() {
  const highlighted = Route.useLoaderData()

  if (!highlighted) {
    return null
  }

  return (
    <DocsLayout
      breadcrumbHref="/docs/pg"
      pageLabel="Override: Insert & Upsert"
      toc={[
        { label: "Insert Into", href: "#override-insert-into" },
        { label: "Insert Values", href: "#override-insert-values" },
        { label: "On Conflict", href: "#override-insert-upsert" },
        { label: "Conflict Targets", href: "#override-insert-conflict-targets" },
        { label: "Conflict Actions", href: "#override-insert-conflict-actions" },
      ]}
    >
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Basics</p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Override: Insert &amp; Upsert
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          Override helpers add explicit <code>insertInto</code>, flexible
          <code>values</code>, and PostgreSQL upsert helpers.
        </p>
      </div>

      <section className="space-y-3" id="override-insert-into">
        <h2 className="text-xl font-semibold">Insert Into</h2>
        <p className="text-sm text-muted-foreground">
          Use <code>insertInto</code> to define the table and columns explicitly.
        </p>
        <CodeBlock
          code={insertIntoBasicsCode}
          html={highlighted.insertIntoBasics.light}
          darkHtml={highlighted.insertIntoBasics.dark}
          sqlResult={highlighted.insertIntoBasicsSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="override-insert-values">
        <h2 className="text-xl font-semibold">Insert Values</h2>
        <p className="text-sm text-muted-foreground">
          The <code>insert</code> helper builds columns and rows from objects.
        </p>
        <CodeBlock
          code={insertValuesBasicsCode}
          html={highlighted.insertValuesBasics.light}
          darkHtml={highlighted.insertValuesBasics.dark}
          sqlResult={highlighted.insertValuesBasicsSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="override-insert-upsert">
        <h2 className="text-xl font-semibold">On Conflict</h2>
        <p className="text-sm text-muted-foreground">
          <code>onConflictDoUpdate</code> and <code>onConflictDoNothing</code>
          wrap PostgreSQL upserts.
        </p>
        <CodeBlock
          code={upsertBasicsCode}
          html={highlighted.upsertBasics.light}
          darkHtml={highlighted.upsertBasics.dark}
          sqlResult={highlighted.upsertBasicsSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="override-insert-conflict-targets">
        <h2 className="text-xl font-semibold">Conflict Targets</h2>
        <p className="text-sm text-muted-foreground">
          Use <code>onConflict</code> or <code>onConstraint</code> to define
          the target index/constraint.
        </p>
        <CodeBlock
          code={conflictTargetsCode}
          html={highlighted.conflictTargets.light}
          darkHtml={highlighted.conflictTargets.dark}
          sqlResult={highlighted.conflictTargetsSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="override-insert-conflict-actions">
        <h2 className="text-xl font-semibold">Conflict Actions</h2>
        <p className="text-sm text-muted-foreground">
          Use <code>doUpdate</code> and <code>doNothing</code> for explicit
          conflict handling.
        </p>
        <CodeBlock
          code={conflictActionsCode}
          html={highlighted.conflictActions.light}
          darkHtml={highlighted.conflictActions.dark}
          sqlResult={highlighted.conflictActionsSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>
    </DocsLayout>
  )
}
