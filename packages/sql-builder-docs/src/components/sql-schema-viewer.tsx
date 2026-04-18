import { useEffect, useMemo, useState } from "react"
import { sqlBuilder } from "@gntrees/sql-builder/pg/builder"

type SqlSchemaQueryDefinition = {
  query: unknown
  tags: string[]
  tokens: unknown
}

export type SqlSchemaDocument = {
  sql: Record<string, SqlSchemaQueryDefinition>
}

export function parseSqlSchemaDocument(input: unknown): SqlSchemaDocument {
  if (!input || typeof input !== "object") {
    throw new Error("JSON harus berupa object")
  }

  const source = input as { sql?: unknown }
  if (!source.sql || typeof source.sql !== "object" || Array.isArray(source.sql)) {
    throw new Error('Format tidak valid. Diharapkan object dengan key "sql"')
  }

  const sqlEntries = Object.entries(source.sql)
  if (sqlEntries.length === 0) {
    throw new Error("Object sql kosong")
  }

  const sql = Object.fromEntries(
    sqlEntries.map(([queryName, queryValue]) => {
      if (!queryValue || typeof queryValue !== "object" || Array.isArray(queryValue)) {
        throw new Error(`Query "${queryName}" tidak valid`)
      }

      const rawQueryValue = queryValue as {
        query?: unknown
        tags?: unknown
        tokens?: unknown
      }

      if (!("query" in rawQueryValue)) {
        throw new Error(`Query "${queryName}" tidak memiliki properti query`)
      }

      return [
        queryName,
        {
          query: rawQueryValue.query,
          tags: Array.isArray(rawQueryValue.tags)
            ? rawQueryValue.tags.filter((tag): tag is string => typeof tag === "string")
            : [],
          tokens: rawQueryValue.tokens ?? null,
        },
      ]
    }),
  )

  return { sql }
}

function prettyJson(value: unknown) {
  return JSON.stringify(value, null, 2)
}

type QueryBuilderPreview = {
  sql: string
  sqlWithParameters: string | null
  params: unknown[]
  error: string | null
}

function createQueryBuilderPreview(tokens: unknown): QueryBuilderPreview {
  try {
    const q = sqlBuilder() as {
      setFormatParamHandler: (handler: "pg") => {
        a: () => {
          setTokens: (nextTokens: unknown[]) => void
          getSql: () => string
          getSqlWithParameters: () => string
          getSqlParameters: () => unknown[]
        }
      }
    }
    const qb = q.setFormatParamHandler("pg")
    const builder = qb.a()
    builder.setTokens(Array.isArray(tokens) ? (tokens as never[]) : ([] as never[]))

    const sql = builder.getSql()
    const sqlWithParameters = builder.getSqlWithParameters()
    const params = builder.getSqlParameters()

    return {
      sql,
      sqlWithParameters,
      params,
      error: null,
    }
  } catch (error) {
    return {
      sql: "",
      sqlWithParameters: null,
      params: [],
      error:
        error instanceof Error
          ? error.message
          : "Gagal membuat query builder dari tokens",
    }
  }
}

export function SqlSchemaViewer({
  document,
  title,
}: {
  document: SqlSchemaDocument
  title?: string
}) {
  const queryNames = useMemo(() => Object.keys(document.sql), [document])
  const [selectedQueryName, setSelectedQueryName] = useState(queryNames[0] ?? "")

  useEffect(() => {
    if (!queryNames.includes(selectedQueryName)) {
      setSelectedQueryName(queryNames[0] ?? "")
    }
  }, [queryNames, selectedQueryName])

  const selectedQuery = document.sql[selectedQueryName]
  const preview = useMemo(() => {
    if (!selectedQuery) {
      return null
    }
    return createQueryBuilderPreview(selectedQuery.tokens)
  }, [selectedQuery])

  return (
    <section className="rounded-2xl border border-border bg-card shadow-sm">
      <header className="border-b border-border px-4 py-3 sm:px-5">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          SQL Schema Viewer
        </p>
        <h2 className="mt-1 text-xl font-semibold tracking-tight">
          {title ?? "Swagger-like View"}
        </h2>
      </header>

      <div className="grid gap-0 lg:grid-cols-[260px_1fr]">
        <aside className="border-b border-border p-3 lg:border-b-0 lg:border-r">
          <p className="px-2 pb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Queries ({queryNames.length})
          </p>
          <div className="space-y-1">
            {queryNames.map((queryName) => {
              const isActive = queryName === selectedQueryName
              return (
                <button
                  key={queryName}
                  type="button"
                  onClick={() => setSelectedQueryName(queryName)}
                  className={`w-full rounded-md px-2 py-2 text-left text-sm transition ${
                    isActive
                      ? "bg-primary/10 text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <span className="font-medium">{queryName}</span>
                </button>
              )
            })}
          </div>
        </aside>

        <div className="space-y-4 p-4 sm:p-5">
          {selectedQuery ? (
            <>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold">{selectedQueryName}</h3>
                {selectedQuery.tags.length > 0
                  ? selectedQuery.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-background px-2 py-0.5 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))
                  : null}
              </div>

              <section className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  sql (from setTokens)
                </p>
                <pre className="max-h-[220px] overflow-auto rounded-xl border border-border bg-background p-3 text-xs leading-5 text-foreground">
                  {preview?.sql || "-"}
                </pre>
              </section>

              <section className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  sql with parameters
                </p>
                <pre className="max-h-[220px] overflow-auto rounded-xl border border-border bg-background p-3 text-xs leading-5 text-foreground">
                  {preview?.sqlWithParameters || "-"}
                </pre>
              </section>

              <section className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  parameters
                </p>
                <pre className="max-h-[180px] overflow-auto rounded-xl border border-border bg-background p-3 text-xs leading-5 text-foreground">
                  {prettyJson(preview?.params ?? [])}
                </pre>
              </section>

              {preview?.error ? (
                <section className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wide text-destructive">
                    preview error
                  </p>
                  <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
                    {preview.error}
                  </div>
                </section>
              ) : null}

              <section className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  query
                </p>
                <pre className="max-h-[460px] overflow-auto rounded-xl border border-border bg-background p-3 text-xs leading-5 text-foreground">
                  {prettyJson(selectedQuery.query)}
                </pre>
              </section>

              <section className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  tokens
                </p>
                <pre className="max-h-[280px] overflow-auto rounded-xl border border-border bg-background p-3 text-xs leading-5 text-foreground">
                  {prettyJson(selectedQuery.tokens)}
                </pre>
              </section>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Tidak ada query untuk ditampilkan.</p>
          )}
        </div>
      </div>
    </section>
  )
}
