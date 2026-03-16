import { createFileRoute } from "@tanstack/react-router"
import { DocsLayout } from "#/components/docs-layout"
import { CodeBlock, CodeBlockCopyButton } from "#/components/ai/code-block"
import { highlightCodeBlock } from "#/components/ai/code-block.loader"

export const Route = createFileRoute("/docs/pg/select")({
  loader: async () => {
    const [selectBasics, selectDistinct, selectDistinctOn] = await Promise.all([
      highlightCodeBlock(selectBasicsCode, "ts"),
      highlightCodeBlock(selectDistinctCode, "ts"),
      highlightCodeBlock(selectDistinctOnCode, "ts"),
    ])

    return {
      selectBasics,
      selectDistinct,
      selectDistinctOn,
    }
  },
  component: RouteComponent,
})

const selectBasicsCode = `const query = q
  .select(
    q.c("users.id"),
    { email: q.c("users.email") },
  )
  .from(q.t("users"))`

const selectDistinctCode = `const query = q
  .selectDistinct(q.c("users.email"))
  .from(q.t("users"))`

const selectDistinctOnCode = `const query = q
  .selectDistinctOn(
    [q.c("events.user_id")],
    [q.c("events.user_id"), q.c("events.created_at")],
  )
  .from(q.t("events"))`

function RouteComponent() {
  const highlighted = Route.useLoaderData()

  if (!highlighted) {
    return null
  }

  return (
    <DocsLayout
      breadcrumbHref="/docs/pg"
      pageLabel="Override: Select Variants"
      toc={[
        { label: "Select", href: "#override-select" },
        { label: "Select Distinct", href: "#override-select-distinct" },
        { label: "Select Distinct On", href: "#override-select-distinct-on" },
      ]}
    >
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Basics</p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Override: Select Variants
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          PostgreSQL overrides extend select helpers with object aliasing,
          distinct variants, and distinct-on clauses.
        </p>
      </div>

      <section className="space-y-3" id="override-select">
        <h2 className="text-xl font-semibold">Select</h2>
        <p className="text-sm text-muted-foreground">
          Object entries are treated as <code>column AS alias</code> pairs.
        </p>
        <CodeBlock
          code={selectBasicsCode}
          html={highlighted.selectBasics.light}
          darkHtml={highlighted.selectBasics.dark}
          sqlResult={{ code: selectBasicsCode }}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="override-select-distinct">
        <h2 className="text-xl font-semibold">Select Distinct</h2>
        <p className="text-sm text-muted-foreground">
          Use <code>selectDistinct</code> to emit <code>SELECT DISTINCT</code>.
        </p>
        <CodeBlock
          code={selectDistinctCode}
          html={highlighted.selectDistinct.light}
          darkHtml={highlighted.selectDistinct.dark}
          sqlResult={{ code: selectDistinctCode }}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="override-select-distinct-on">
        <h2 className="text-xl font-semibold">Select Distinct On</h2>
        <p className="text-sm text-muted-foreground">
          PostgreSQL <code>DISTINCT ON</code> lets you keep the first row per
          grouping key.
        </p>
        <CodeBlock
          code={selectDistinctOnCode}
          html={highlighted.selectDistinctOn.light}
          darkHtml={highlighted.selectDistinctOn.dark}
          sqlResult={{ code: selectDistinctOnCode }}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>
    </DocsLayout>
  )
}
