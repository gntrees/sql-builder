import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useMemo, useRef, useState, type ChangeEvent } from "react"

import { Logo } from "#/components/logo"
import {
  SqlSchemaViewer,
  parseSqlSchemaDocument,
  type SqlSchemaDocument,
} from "#/components/sql-schema-viewer"
import { Button } from "#/components/ui/button"
import { Input } from "#/components/ui/input"

export const Route = createFileRoute("/view/input")({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [urlInput, setUrlInput] = useState("")
  const [jsonText, setJsonText] = useState("")
  const [parsedDocument, setParsedDocument] = useState<SqlSchemaDocument | null>(null)
  const [error, setError] = useState<string | null>(null)

  const canSubmitUrl = useMemo(() => urlInput.trim().length > 0, [urlInput])

  const renderJsonDocument = (raw: unknown) => {
    try {
      const document = parseSqlSchemaDocument(raw)
      setParsedDocument(document)
      setError(null)
    } catch (parseError) {
      setParsedDocument(null)
      setError(parseError instanceof Error ? parseError.message : "JSON tidak valid")
    }
  }

  const handleSubmitUrl = () => {
    const normalized = urlInput.trim()
    if (!normalized) {
      setError("URL wajib diisi")
      return
    }

    setError(null)
    void navigate({
      to: "/view",
      search: {
        url: normalized,
      },
    })
  }

  const handleApplyJsonText = () => {
    if (!jsonText.trim()) {
      setError("JSON input tidak boleh kosong")
      setParsedDocument(null)
      return
    }

    try {
      const raw = JSON.parse(jsonText)
      renderJsonDocument(raw)
    } catch {
      setParsedDocument(null)
      setError("JSON tidak valid")
    }
  }

  const handleFilePicked = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    try {
      const fileText = await file.text()
      const raw = JSON.parse(fileText)
      setJsonText(fileText)
      renderJsonDocument(raw)
    } catch {
      setParsedDocument(null)
      setError("File bukan JSON valid")
    } finally {
      event.target.value = ""
    }
  }

  return (
    <main className="min-h-screen bg-background px-4 pb-8 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 py-6">
        <header className="flex items-center gap-4">
          <Logo />
        </header>

        <section className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            View Input
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">Pilih Source Schema</h1>
          <p className="text-sm text-muted-foreground">
            Kamu bisa pakai URL JSON, paste JSON manual, atau upload file JSON.
          </p>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <article className="space-y-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
            <h2 className="text-lg font-semibold">1) URL JSON</h2>
            <p className="text-sm text-muted-foreground">
              Akan diarahkan ke <code>/view?url=...</code> dan otomatis render viewer.
            </p>
            <Input
              placeholder="https://example.com/schema.json"
              value={urlInput}
              onChange={(event) => setUrlInput(event.target.value)}
            />
            <Button type="button" disabled={!canSubmitUrl} onClick={handleSubmitUrl}>
              Buka dari URL
            </Button>
          </article>

          <article className="space-y-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
            <h2 className="text-lg font-semibold">2) Upload File JSON</h2>
            <p className="text-sm text-muted-foreground">
              Pilih file hasil <code>sqlSchema.getJSON()</code>.
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={(event) => {
                void handleFilePicked(event)
              }}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              Pilih File
            </Button>
          </article>
        </section>

        <section className="space-y-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
          <h2 className="text-lg font-semibold">3) Input JSON Manual</h2>
          <textarea
            className="min-h-[220px] w-full rounded-xl border border-border bg-background p-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            placeholder='{"sql": {"getUsers": {"query": {}, "tags": [], "tokens": []}}}'
            value={jsonText}
            onChange={(event) => setJsonText(event.target.value)}
          />
          <Button type="button" onClick={handleApplyJsonText}>
            Render dari JSON
          </Button>
        </section>

        {error ? (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        ) : null}

        {parsedDocument ? <SqlSchemaViewer document={parsedDocument} title="Swagger View - Local Input" /> : null}
      </div>
    </main>
  )
}
