import { createFileRoute } from "@tanstack/react-router"
import { DocsLayout } from "#/components/docs-layout"

export const Route = createFileRoute("/docs/sqlite")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <DocsLayout
      breadcrumbHref="/docs/sqlite"
      pageLabel="SQLite"
      toc={[{ label: "Overview", href: "#overview" }]}
    >
      <div className="space-y-3" id="overview">
        <p className="text-sm font-medium text-muted-foreground">SQLite</p>
        <h1 className="text-3xl font-semibold tracking-tight">Coming soon</h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          SQLite docs are being prepared.
        </p>
      </div>
    </DocsLayout>
  )
}
