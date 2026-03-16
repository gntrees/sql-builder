import { createFileRoute } from "@tanstack/react-router"
import { DocsLayout } from "#/components/docs-layout"
import { CodeBlock, CodeBlockCopyButton } from "#/components/ai/code-block"
import { highlightCodeBlock } from "#/components/ai/code-block.loader"

export const Route = createFileRoute("/docs/pg/helpers")({
  loader: async () => {
    const [
      clauseHelpers,
      cteHelpers,
      setOpsHelpers,
      paginationHelpers,
      identifierHelpers,
      windowHelpers,
    ] = await Promise.all([
      highlightCodeBlock(clauseHelpersCode, "ts"),
      highlightCodeBlock(cteHelpersCode, "ts"),
      highlightCodeBlock(setOpsHelpersCode, "ts"),
      highlightCodeBlock(paginationHelpersCode, "ts"),
      highlightCodeBlock(identifierHelpersCode, "ts"),
      highlightCodeBlock(windowHelpersCode, "ts"),
    ])

    return {
      clauseHelpers,
      cteHelpers,
      setOpsHelpers,
      paginationHelpers,
      identifierHelpers,
      windowHelpers,
    }
  },
  component: RouteComponent,
})

const clauseHelpersCode = `const query = q
  .select(
    q.c("orders.user_id"),
    q.count(q.c("orders.id")).as(q.c("order_count")),
  )
  .from(q.t("orders"))
  .groupBy(q.c("orders.user_id"))
  .having(q.gt(q.count(q.c("orders.id")), q.v(1)))`

const cteHelpersCode = `const query = q
  .with(
    q.i("recent_orders"),
    q.select(q.c("orders.id"))
      .from(q.t("orders"))
      .where(q.gt(q.c("orders.created_at"), q.raw\`NOW() - INTERVAL '7 days'\`)),
  )
  .select(q.c("recent_orders.id"))
  .from(q.t("recent_orders"))`

const setOpsHelpersCode = `const query = q
  .select(q.c("users.id")).from(q.t("users"))
  .unionAll(
    q.select(q.c("admins.id")).from(q.t("admins")),
  )
  .orderBy(q.c("id"))`

const paginationHelpersCode = `const query = q
  .select(q.c("events.id"))
  .from(q.t("events"))
  .limit(q.v(25))
  .offset(q.v(50))`

const identifierHelpersCode = `const query = q
  .select(
    q.c("users.id").as(q.c("user_id")),
    q.c("users.email").as(q.c("email")),
  )
  .from(q.t("users"))`

const windowHelpersCode = `const windowSpec = q.partitionBy(q.column("department_id"))

const query = q.select(q.rowNumber().over(windowSpec))`

function RouteComponent() {
  const highlighted = Route.useLoaderData()

  if (!highlighted) {
    return null
  }

  return (
    <DocsLayout
      breadcrumbHref="/docs/pg"
      pageLabel="Override: Helpers"
      toc={[
        { label: "Clause Helpers", href: "#override-helpers-clauses" },
        { label: "With / CTE", href: "#override-helpers-cte" },
        { label: "Set Operations", href: "#override-helpers-sets" },
        { label: "Pagination", href: "#override-helpers-pagination" },
        { label: "Identifiers", href: "#override-helpers-identifiers" },
        { label: "Windows", href: "#override-helpers-windows" },
      ]}
    >
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Basics</p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Override: Helpers
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          Misc helpers cover clause composition, CTEs, and set operations.
        </p>
      </div>

      <section className="space-y-3" id="override-helpers-clauses">
        <h2 className="text-xl font-semibold">Clause Helpers</h2>
        <p className="text-sm text-muted-foreground">
          Helpers like <code>groupBy</code> and <code>having</code> add explicit
          keywords and separators.
        </p>
        <CodeBlock
          code={clauseHelpersCode}
          html={highlighted.clauseHelpers.light}
          darkHtml={highlighted.clauseHelpers.dark}
          sqlResult={{ code: clauseHelpersCode }}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="override-helpers-cte">
        <h2 className="text-xl font-semibold">With / CTE</h2>
        <p className="text-sm text-muted-foreground">
          Use <code>with</code> to emit a CTE and continue the main query.
        </p>
        <CodeBlock
          code={cteHelpersCode}
          html={highlighted.cteHelpers.light}
          darkHtml={highlighted.cteHelpers.dark}
          sqlResult={{ code: cteHelpersCode }}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="override-helpers-sets">
        <h2 className="text-xl font-semibold">Set Operations</h2>
        <p className="text-sm text-muted-foreground">
          Set ops like <code>union</code>, <code>intersect</code>, and
          <code>except</code> wrap subqueries in parentheses.
        </p>
        <CodeBlock
          code={setOpsHelpersCode}
          html={highlighted.setOpsHelpers.light}
          darkHtml={highlighted.setOpsHelpers.dark}
          sqlResult={{ code: setOpsHelpersCode }}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="override-helpers-pagination">
        <h2 className="text-xl font-semibold">Pagination</h2>
        <p className="text-sm text-muted-foreground">
          Use <code>limit</code> and <code>offset</code> for offset-based paging.
        </p>
        <CodeBlock
          code={paginationHelpersCode}
          html={highlighted.paginationHelpers.light}
          darkHtml={highlighted.paginationHelpers.dark}
          sqlResult={{ code: paginationHelpersCode }}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="override-helpers-identifiers">
        <h2 className="text-xl font-semibold">Identifiers</h2>
        <p className="text-sm text-muted-foreground">
          <code>as</code>, <code>t</code>, and <code>c</code> handle identifiers
          with Postgres rules.
        </p>
        <CodeBlock
          code={identifierHelpersCode}
          html={highlighted.identifierHelpers.light}
          darkHtml={highlighted.identifierHelpers.dark}
          sqlResult={{ code: identifierHelpersCode }}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="override-helpers-windows">
        <h2 className="text-xl font-semibold">Windows</h2>
        <p className="text-sm text-muted-foreground">
          Use <code>over</code> and <code>partitionBy</code> for window clauses.
        </p>
        <CodeBlock
          code={windowHelpersCode}
          html={highlighted.windowHelpers.light}
          darkHtml={highlighted.windowHelpers.dark}
          sqlResult={{ code: windowHelpersCode }}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>
    </DocsLayout>
  )
}
