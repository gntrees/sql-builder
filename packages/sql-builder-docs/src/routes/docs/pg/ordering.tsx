import { createFileRoute } from "@tanstack/react-router"
import { DocsLayout } from "#/components/docs-layout"
import { CodeBlock, CodeBlockCopyButton } from "#/components/ai/code-block"
import {
  buildSqlResultFromCode,
  highlightCodeBlock,
} from "#/components/ai/code-block.loader"

export const Route = createFileRoute("/docs/pg/ordering")({
  loader: async () => {
    const [
      orderByBasics,
      orderNullsBasics,
      fetchBasics,
      orderByBasicsSqlResult,
      orderNullsBasicsSqlResult,
      fetchBasicsSqlResult,
    ] = await Promise.all([
      highlightCodeBlock(orderByBasicsCode, "ts"),
      highlightCodeBlock(orderNullsBasicsCode, "ts"),
      highlightCodeBlock(fetchBasicsCode, "ts"),
      buildSqlResultFromCode(orderByBasicsCode),
      buildSqlResultFromCode(orderNullsBasicsCode),
      buildSqlResultFromCode(fetchBasicsCode),
    ])

    return {
      orderByBasics,
      orderNullsBasics,
      fetchBasics,
      orderByBasicsSqlResult,
      orderNullsBasicsSqlResult,
      fetchBasicsSqlResult,
    }
  },
  component: RouteComponent,
})

const orderByBasicsCode = `const query = q
  .select(q.c("events.id"))
  .from(q.t("events"))
  .orderBy(q.c("events.created_at"))
  .desc(q.c("events.priority"))`

const orderNullsBasicsCode = `const query = q
  .select(q.c("users.id"))
  .from(q.t("users"))
  .orderBy(q.c("users.last_login"))
  .nullsLast()`

const fetchBasicsCode = `const query = q
  .select(q.c("users.id"))
  .from(q.t("users"))
  .fetch(q.v(5), "next", true)`

function RouteComponent() {
  const highlighted = Route.useLoaderData()

  if (!highlighted) {
    return null
  }

  return (
    <DocsLayout
      breadcrumbHref="/docs/pg"
      pageLabel="Override: Ordering & Fetch"
      toc={[
        { label: "Order By", href: "#override-order-by" },
        { label: "Nulls Position", href: "#override-nulls" },
        { label: "Limit / Fetch", href: "#override-fetch" },
      ]}
    >
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Basics</p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Override: Ordering &amp; Fetch
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          Override ordering helpers add multi-column ordering, nulls handling,
          and fetch/ties clauses.
        </p>
      </div>

      <section className="space-y-3" id="override-order-by">
        <h2 className="text-xl font-semibold">Order By</h2>
        <p className="text-sm text-muted-foreground">
          Use <code>orderBy</code> with <code>asc</code> or <code>desc</code> to
          set per-column direction.
        </p>
        <CodeBlock
          code={orderByBasicsCode}
          html={highlighted.orderByBasics.light}
          darkHtml={highlighted.orderByBasics.dark}
          sqlResult={highlighted.orderByBasicsSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="override-nulls">
        <h2 className="text-xl font-semibold">Nulls Position</h2>
        <p className="text-sm text-muted-foreground">
          <code>nullsFirst</code> and <code>nullsLast</code> apply to the last
          ordering clause.
        </p>
        <CodeBlock
          code={orderNullsBasicsCode}
          html={highlighted.orderNullsBasics.light}
          darkHtml={highlighted.orderNullsBasics.dark}
          sqlResult={highlighted.orderNullsBasicsSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="override-fetch">
        <h2 className="text-xl font-semibold">Limit / Fetch</h2>
        <p className="text-sm text-muted-foreground">
          <code>fetch</code> emits <code>FETCH FIRST/NEXT ... ROWS</code> with
          optional ties.
        </p>
        <CodeBlock
          code={fetchBasicsCode}
          html={highlighted.fetchBasics.light}
          darkHtml={highlighted.fetchBasics.dark}
          sqlResult={highlighted.fetchBasicsSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>
    </DocsLayout>
  )
}
