import { createFileRoute, Link, Navigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"

import { Logo } from "#/components/logo"
import {
  SqlSchemaViewer,
  parseSqlSchemaDocument,
  type SqlSchemaDocument,
} from "#/components/sql-schema-viewer"
import { Button } from "#/components/ui/button"

export const Route = createFileRoute("/view/")({
  validateSearch: (
    search: Record<string, unknown>,
  ): {
    url?: string
  } => {
    return {
      url: typeof search.url === "string" ? search.url : undefined,
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const search = Route.useSearch()
  const [document, setDocument] = useState<SqlSchemaDocument | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    const load = async () => {
      const sourceUrl = search.url?.trim()
      if (!sourceUrl) {
        setDocument(null)
        setError(null)
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        let parsedUrl: URL
        try {
          parsedUrl = new URL(sourceUrl)
        } catch {
          throw new Error("Format URL tidak valid")
        }

        if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
          throw new Error("URL harus memakai protokol http atau https")
        }

        const response = await fetch(parsedUrl.toString(), {
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(`Gagal fetch JSON (${response.status} ${response.statusText})`)
        }

        const raw = await response.json()
        const parsedDocument = parseSqlSchemaDocument(raw)
        setDocument(parsedDocument)
      } catch (loadError) {
        if (controller.signal.aborted) {
          return
        }

        setDocument(null)
        setError(loadError instanceof Error ? loadError.message : "Gagal memuat schema")
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void load()

    return () => {
      controller.abort()
    }
  }, [search.url])

  if (!search.url?.trim()) {
    return <Navigate to="/view/input" replace />
  }

  return (
    <main className="min-h-screen bg-background px-4 pb-8 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 py-6">
        <header className="flex items-center gap-4">
          <Logo />
          <div className="ml-auto flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/view/input">Ganti source</Link>
            </Button>
          </div>
        </header>

        <section className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            View
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">Schema Viewer</h1>
          <p className="break-all text-sm text-muted-foreground">
            Source URL: <code>{search.url}</code>
          </p>
        </section>

        {isLoading ? (
          <div className="rounded-lg border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
            Memuat JSON...
          </div>
        ) : null}

        {error ? (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        ) : null}

        {document ? <SqlSchemaViewer document={document} title={`Swagger View - ${search.url}`} /> : null}
      </div>
    </main>
  )
}
