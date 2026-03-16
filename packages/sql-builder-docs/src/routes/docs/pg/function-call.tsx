import { createFileRoute } from "@tanstack/react-router"
import { useMemo, useState } from "react"
import { DocsLayout } from "#/components/docs-layout"
import { CodeBlock, CodeBlockCopyButton } from "#/components/ai/code-block"
import { highlightCodeBlock, highlightSqlResult } from "#/components/ai/code-block.loader"
import pgFunctionList from "../../../../../sql-builder/src/dialects/pg/postgres-functions-list"

export const Route = createFileRoute("/docs/pg/function-call")({
  loader: async () => {
    const [functionBasics, functionCastBasics] = await Promise.all([
      highlightCodeBlock(functionBasicsCode, "ts"),
      highlightCodeBlock(functionCastBasicsCode, "ts"),
    ])
    const [functionBasicsResult, functionCastBasicsResult] = await Promise.all([
      highlightSqlResult('SELECT LOWER("users"."email") FROM "users"'),
      highlightSqlResult('SELECT CAST("events"."payload" AS TEXT) FROM "events"'),
    ])

    return {
      functionBasics,
      functionCastBasics,
      functionBasicsResult,
      functionCastBasicsResult,
    }
  },
  component: RouteComponent,
})

const functionBasicsCode = `const query = q
  .select(q.lower(q.c("users.email")))
  .from(q.t("users"))`

const functionCastBasicsCode = `const query = q
  .select(q.toText(q.c("events.payload")))
  .from(q.t("events"))`

function toCamelCase(str: string) {
  return str
    .split(/[_-]+/)
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase()
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join("")
    .replace(/\u200B/g, "")
}

const functionIndex = pgFunctionList.map((func) => {
  const argsLabel = func.args.length
    ? func.args
        .map((arg) => (arg.variadic ? `${arg.name}...` : arg.name))
        .join(", ")
    : "-"
  const formatLabel =
    func.format === "COERCE_EXPLICIT_CAST" ? "CAST" : "CALL"
  const baseName = func.name.toLowerCase()
  const helperName =
    func.format === "COERCE_EXPLICIT_CAST"
      ? toCamelCase(`to_${baseName}`)
      : toCamelCase(baseName)
  return {
    name: func.name,
    helperName,
    argsLabel,
    formatLabel,
  }
})

function RouteComponent() {
  const highlighted = Route.useLoaderData()
  const [functionSearch, setFunctionSearch] = useState("")
  const [functionPage, setFunctionPage] = useState(1)
  const functionPageSize = 20
  const normalizedFunctionSearch = functionSearch.trim().toLowerCase()
  const filteredFunctions = useMemo(() => {
    if (!normalizedFunctionSearch) {
      return functionIndex
    }
    return functionIndex.filter((item) => {
      return (
        item.name.toLowerCase().includes(normalizedFunctionSearch) ||
        item.argsLabel.toLowerCase().includes(normalizedFunctionSearch) ||
        item.formatLabel.toLowerCase().includes(normalizedFunctionSearch)
      )
    })
  }, [normalizedFunctionSearch])
  const totalFunctionPages = Math.max(
    1,
    Math.ceil(filteredFunctions.length / functionPageSize),
  )
  const currentFunctionPage = Math.min(functionPage, totalFunctionPages)
  const pagedFunctions = useMemo(() => {
    const start = (currentFunctionPage - 1) * functionPageSize
    return filteredFunctions.slice(start, start + functionPageSize)
  }, [currentFunctionPage, filteredFunctions])

  if (!highlighted) {
    return null
  }

  return (
    <DocsLayout
      breadcrumbHref="/docs/pg"
      pageLabel="Function Call"
      toc={[
        { label: "Basics", href: "#function-basics" },
        { label: "Cast Helpers", href: "#function-cast" },
        { label: "Function Index", href: "#function-index" },
      ]}
    >
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Basics</p>
        <h1 className="text-3xl font-semibold tracking-tight">Function Call</h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          PostgreSQL functions are generated from the list in
          <code>postgres-functions-list.ts</code>. The generator in
          <code>extract.ts</code> produces camelCase helpers for each function,
          while cast-style entries are exposed as <code>toX</code> helpers.
        </p>
      </div>

      <section className="space-y-3" id="function-basics">
        <h2 className="text-xl font-semibold">Basics</h2>
        <p className="text-sm text-muted-foreground">
          Call PostgreSQL functions using the generated helpers.
        </p>
        <CodeBlock
          code={functionBasicsCode}
          html={highlighted.functionBasics.light}
          darkHtml={highlighted.functionBasics.dark}
          // sqlResult={highlighted.functionBasicsResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="function-cast">
        <h2 className="text-xl font-semibold">Cast Helpers</h2>
        <p className="text-sm text-muted-foreground">
          Cast-style functions are exposed as <code>toX</code> helpers.
        </p>
        <CodeBlock
          code={functionCastBasicsCode}
          html={highlighted.functionCastBasics.light}
          darkHtml={highlighted.functionCastBasics.dark}
          // sqlResult={highlighted.functionCastBasicsResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="function-index">
        <h2 className="text-xl font-semibold">Function Index</h2>
        <p className="text-sm text-muted-foreground">
          Complete list of PostgreSQL functions.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <label className="text-sm text-muted-foreground">
            <input
              className="w-full max-w-xs rounded-md border border-border bg-transparent px-3 py-1 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              type="search"
              value={functionSearch}
              onChange={(event) => {
                setFunctionSearch(event.target.value)
                setFunctionPage(1)
              }}
              placeholder="Filter by name or args"
            />
          </label>
          <p className="text-xs text-muted-foreground">
            Showing {pagedFunctions.length} of {filteredFunctions.length}
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 text-left font-medium">#</th>
                <th className="py-2 text-left font-medium">Helper</th>
                <th className="py-2 text-left font-medium">Function</th>
                <th className="py-2 text-left font-medium">Args</th>
                <th className="py-2 text-left font-medium">Format</th>
              </tr>
            </thead>
            <tbody>
              {pagedFunctions.map((item, index) => (
                <tr key={`${item.name}-${index}`} className="border-b border-border/60">
                  <td className="py-2 text-muted-foreground">
                    {(currentFunctionPage - 1) * functionPageSize + index + 1}
                  </td>
                  <td className="py-2 font-mono text-xs">
                    {item.helperName}
                  </td>
                  <td className="py-2 font-mono text-xs">{item.name}</td>
                  <td className="py-2 font-mono text-xs">{item.argsLabel}</td>
                  <td className="py-2 text-muted-foreground">
                    {item.formatLabel}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <p className="text-muted-foreground">
            Page {currentFunctionPage} of {totalFunctionPages}
          </p>
          <div className="flex items-center gap-2">
            <button
              className="rounded-md border border-border px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
              disabled={currentFunctionPage <= 1}
              onClick={() => setFunctionPage((prev) => Math.max(1, prev - 1))}
              type="button"
            >
              Prev
            </button>
            <button
              className="rounded-md border border-border px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
              disabled={currentFunctionPage >= totalFunctionPages}
              onClick={() =>
                setFunctionPage((prev) => Math.min(totalFunctionPages, prev + 1))
              }
              type="button"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </DocsLayout>
  )
}
