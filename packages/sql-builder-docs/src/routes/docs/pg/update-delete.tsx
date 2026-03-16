import { createFileRoute } from "@tanstack/react-router"
import { DocsLayout } from "#/components/docs-layout"
import { CodeBlock, CodeBlockCopyButton } from "#/components/ai/code-block"
import { highlightCodeBlock } from "#/components/ai/code-block.loader"

export const Route = createFileRoute("/docs/pg/update-delete")({
  loader: async () => {
    const [updateBasics, deleteBasics] = await Promise.all([
      highlightCodeBlock(updateBasicsCode, "ts"),
      highlightCodeBlock(deleteBasicsCode, "ts"),
    ])

    return {
      updateBasics,
      deleteBasics,
    }
  },
  component: RouteComponent,
})

const updateBasicsCode = `const query = q
  .update(q.t("users"))
  .set({ status: q.v("active") })
  .where(q.eq(q.c("users.id"), q.v(42)))
  .returning(q.c("users.id"))`

const deleteBasicsCode = `const query = q
  .delete(q.t("sessions"))
  .where(q.lt(q.c("sessions.expires_at"), q.raw\`NOW()\`))`

function RouteComponent() {
  const highlighted = Route.useLoaderData()

  if (!highlighted) {
    return null
  }

  return (
    <DocsLayout
      breadcrumbHref="/docs/pg"
      pageLabel="Override: Update & Delete"
      toc={[
        { label: "Update", href: "#override-update" },
        { label: "Delete", href: "#override-delete" },
      ]}
    >
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Basics</p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Override: Update &amp; Delete
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          Override helpers standardize how update and delete statements are
          assembled with table and predicate handling.
        </p>
      </div>

      <section className="space-y-3" id="override-update">
        <h2 className="text-xl font-semibold">Update</h2>
        <p className="text-sm text-muted-foreground">
          <code>update</code> and <code>set</code> accept plain objects to build
          assignments.
        </p>
        <CodeBlock
          code={updateBasicsCode}
          html={highlighted.updateBasics.light}
          darkHtml={highlighted.updateBasics.dark}
          sqlResult={{ code: updateBasicsCode }}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="override-delete">
        <h2 className="text-xl font-semibold">Delete</h2>
        <p className="text-sm text-muted-foreground">
          <code>delete</code> automatically inserts <code>FROM</code> when a
          table is provided.
        </p>
        <CodeBlock
          code={deleteBasicsCode}
          html={highlighted.deleteBasics.light}
          darkHtml={highlighted.deleteBasics.dark}
          sqlResult={{ code: deleteBasicsCode }}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>
    </DocsLayout>
  )
}
