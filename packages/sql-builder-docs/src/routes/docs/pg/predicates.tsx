import { createFileRoute } from "@tanstack/react-router"
import { DocsLayout } from "#/components/docs-layout"
import { CodeBlock, CodeBlockCopyButton } from "#/components/ai/code-block"
import { highlightCodeBlock } from "#/components/ai/code-block.loader"

export const Route = createFileRoute("/docs/pg/predicates")({
  loader: async () => {
    const [whereBasics, logicalBasics, membershipBasics] = await Promise.all([
      highlightCodeBlock(whereBasicsCode, "ts"),
      highlightCodeBlock(logicalBasicsCode, "ts"),
      highlightCodeBlock(membershipBasicsCode, "ts"),
    ])

    return {
      whereBasics,
      logicalBasics,
      membershipBasics,
    }
  },
  component: RouteComponent,
})

const whereBasicsCode = `const query = q
  .select(q.c("users.id"))
  .from(q.t("users"))
  .where(q.eq(q.c("users.status"), q.v("active")))`

const logicalBasicsCode = `const query = q
  .select(q.c("events.id"))
  .from(q.t("events"))
  .where(
    q.and(
      q.gt(q.c("events.score"), q.v(90)),
      q.not(q.eq(q.c("events.type"), q.v("test"))),
    ),
  )`

const membershipBasicsCode = `const query = q
  .select(q.c("users.id"))
  .from(q.t("users"))
  .where(
    q.and(
      q.c("users.status").in(q.v("active"), q.v("trial")),
      q.notExists(
        q.select(q.c("bans.user_id"))
          .from(q.t("bans"))
          .where(q.eq(q.c("bans.user_id"), q.c("users.id"))),
      ),
    ),
  )`

function RouteComponent() {
  const highlighted = Route.useLoaderData()

  if (!highlighted) {
    return null
  }

  return (
    <DocsLayout
      breadcrumbHref="/docs/pg"
      pageLabel="Override: Predicates"
      toc={[
        { label: "Where", href: "#override-predicates-where" },
        { label: "Logical", href: "#override-predicates-logical" },
        { label: "Membership", href: "#override-predicates-membership" },
      ]}
    >
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Basics</p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Override: Predicates
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          Predicate helpers extend how <code>where</code>, logical operators, and
          membership checks are composed.
        </p>
      </div>

      <section className="space-y-3" id="override-predicates-where">
        <h2 className="text-xl font-semibold">Where</h2>
        <p className="text-sm text-muted-foreground">
          <code>where</code> ignores empty statements but still emits the keyword.
        </p>
        <CodeBlock
          code={whereBasicsCode}
          html={highlighted.whereBasics.light}
          darkHtml={highlighted.whereBasics.dark}
          sqlResult={{ code: whereBasicsCode }}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="override-predicates-logical">
        <h2 className="text-xl font-semibold">Logical</h2>
        <p className="text-sm text-muted-foreground">
          <code>and</code>, <code>or</code>, and <code>not</code> accept multiple
          statements and group them correctly.
        </p>
        <CodeBlock
          code={logicalBasicsCode}
          html={highlighted.logicalBasics.light}
          darkHtml={highlighted.logicalBasics.dark}
          sqlResult={{ code: logicalBasicsCode }}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="override-predicates-membership">
        <h2 className="text-xl font-semibold">Membership</h2>
        <p className="text-sm text-muted-foreground">
          <code>in</code>, <code>notIn</code>, <code>exists</code>, and
          <code>notExists</code> handle multiple params and subqueries.
        </p>
        <CodeBlock
          code={membershipBasicsCode}
          html={highlighted.membershipBasics.light}
          darkHtml={highlighted.membershipBasics.dark}
          sqlResult={{ code: membershipBasicsCode }}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>
    </DocsLayout>
  )
}
