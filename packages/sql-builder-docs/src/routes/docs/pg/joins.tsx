import { createFileRoute } from "@tanstack/react-router"
import { DocsLayout } from "#/components/docs-layout"
import { CodeBlock, CodeBlockCopyButton } from "#/components/ai/code-block"
import { highlightCodeBlock } from "#/components/ai/code-block.loader"

export const Route = createFileRoute("/docs/pg/joins")({
  loader: async () => {
    const [joinBasics, joinLateralBasics, joinNaturalBasics] = await Promise.all([
      highlightCodeBlock(joinBasicsCode, "ts"),
      highlightCodeBlock(joinLateralBasicsCode, "ts"),
      highlightCodeBlock(joinNaturalBasicsCode, "ts"),
    ])

    return {
      joinBasics,
      joinLateralBasics,
      joinNaturalBasics,
    }
  },
  component: RouteComponent,
})

const joinBasicsCode = `const query = q
  .select(q.c("orders.id"), q.c("users.email"))
  .from(q.t("orders"))
  .innerJoin(
    q.t("users"),
    q.eq(q.c("orders.user_id"), q.c("users.id")),
  )`

const joinLateralBasicsCode = `const query = q
  .select(q.c("users.id"), q.c("events.id"))
  .from(q.t("users"))
  .leftJoinLateral(
    q.sub(
      q.select(q.c("events.id"))
        .from(q.t("events"))
        .where(q.eq(q.c("events.user_id"), q.c("users.id"))),
    ).as(q.c("user_events")),
    q.raw\`TRUE\`,
  )`

const joinNaturalBasicsCode = `const query = q
  .select(q.c("users.id"), q.c("profiles.bio"))
  .from(q.t("users"))
  .naturalLeftJoin(q.t("profiles"))`

function RouteComponent() {
  const highlighted = Route.useLoaderData()

  if (!highlighted) {
    return null
  }

  return (
    <DocsLayout
      breadcrumbHref="/docs/pg"
      pageLabel="Override: Joins"
      toc={[
        { label: "Join Basics", href: "#override-join-basics" },
        { label: "Lateral Join", href: "#override-join-lateral" },
        { label: "Natural Join", href: "#override-join-natural" },
      ]}
    >
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Basics</p>
        <h1 className="text-3xl font-semibold tracking-tight">Override: Joins</h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          Join helpers cover standard joins plus Postgres-specific lateral and
          natural variants.
        </p>
      </div>

      <section className="space-y-3" id="override-join-basics">
        <h2 className="text-xl font-semibold">Join Basics</h2>
        <p className="text-sm text-muted-foreground">
          Use <code>innerJoin</code>, <code>leftJoin</code>, <code>rightJoin</code>,
          <code>fullJoin</code>, or <code>crossJoin</code>.
        </p>
        <CodeBlock
          code={joinBasicsCode}
          html={highlighted.joinBasics.light}
          darkHtml={highlighted.joinBasics.dark}
          sqlResult={{ code: joinBasicsCode }}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="override-join-lateral">
        <h2 className="text-xl font-semibold">Lateral Join</h2>
        <p className="text-sm text-muted-foreground">
          Lateral joins allow correlated subqueries using
          <code>leftJoinLateral</code> and <code>innerJoinLateral</code>.
        </p>
        <CodeBlock
          code={joinLateralBasicsCode}
          html={highlighted.joinLateralBasics.light}
          darkHtml={highlighted.joinLateralBasics.dark}
          sqlResult={{ code: joinLateralBasicsCode }}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="override-join-natural">
        <h2 className="text-xl font-semibold">Natural Join</h2>
        <p className="text-sm text-muted-foreground">
          Natural join helpers emit <code>NATURAL</code> with the join keyword.
        </p>
        <CodeBlock
          code={joinNaturalBasicsCode}
          html={highlighted.joinNaturalBasics.light}
          darkHtml={highlighted.joinNaturalBasics.dark}
          sqlResult={{ code: joinNaturalBasicsCode }}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>
    </DocsLayout>
  )
}
