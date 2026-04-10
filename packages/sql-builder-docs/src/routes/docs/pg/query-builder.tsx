import { createFileRoute } from "@tanstack/react-router"
import { useMemo, useState } from "react"
import { DocsLayout } from "#/components/docs-layout"
import { CodeBlock, CodeBlockCopyButton } from "#/components/ai/code-block"
import {
  buildSqlResultFromCode,
  highlightCodeBlock,
} from "#/components/ai/code-block.loader"

export const Route = createFileRoute("/docs/pg/query-builder")({
  loader: async () => {
    const [
      queryBuilderBasics,
      queryBuilderParam,
      queryBuilderExecute,
      queryBuilderBasicsSqlResult,
      queryBuilderParamSqlResult,
      queryBuilderExecuteSqlResult,
    ] = await Promise.all([
        highlightCodeBlock(queryBuilderBasicsCode, "ts"),
        highlightCodeBlock(queryBuilderParamCode, "ts"),
        highlightCodeBlock(queryBuilderExecuteCode, "ts"),
        buildSqlResultFromCode(queryBuilderBasicsCode),
        buildSqlResultFromCode(queryBuilderParamCode),
        buildSqlResultFromCode(queryBuilderExecuteCode),
      ])

    return {
      queryBuilderBasics,
      queryBuilderParam,
      queryBuilderExecute,
      queryBuilderBasicsSqlResult,
      queryBuilderParamSqlResult,
      queryBuilderExecuteSqlResult,
    }
  },
  component: RouteComponent,
})

const queryBuilderBasicsCode = `const query = q
  .select(q.c("users.id"), q.c("users.email"))
  .from(q.t("users"))

query.getSql()
// SQL: SELECT "users"."id", "users"."email" FROM "users"

query.getSqlParameters()
// SQL: []

query.getSqlAndParameters()
// SQL: { sql: 'SELECT "users"."id", "users"."email" FROM "users"', parameters: [] }

query.getSqlWithParameters()
// SQL: SELECT "users"."id", "users"."email" FROM "users"
`

const queryBuilderParamCode = `const query = q
  .select(q.c("users.id"))
  .from(q.t("users"))
  .where(q.eq(q.c("users.status"), q.v("active")))

query.getSql()
// SQL: SELECT "users"."id" FROM "users" WHERE "users"."status" = $1

query.getSqlParameters()
// SQL: ["active"]

query.getSqlAndParameters()
// SQL: { sql: 'SELECT "users"."id" FROM "users" WHERE "users"."status" = $1', parameters: ['active'] }

query.getSqlWithParameters()
// SQL: SELECT "users"."id" FROM "users" WHERE "users"."status" = 'active'`

const queryBuilderExecuteCode = `const query = q
  .select(q.c("users.id"), q.c("users.email"))
  .from(q.t("users"))

query.execute({ requestId: "docs" })
// SQL: execHandler({ sql, parameters, queryBuilder, meta })`

const queryBuilderIndex = [
  {
    name: "getSql",
    returns: "string",
    note: "Returns the SQL string for the query.",
  },
  {
    name: "getSqlParameters",
    returns: "unknown[]",
    note: "Returns the bound parameter list.",
  },
  {
    name: "getSqlAndParameters",
    returns: "{ sql: string; parameters: unknown[] }",
    note: "Returns SQL and parameters together.",
  },
  {
    name: "getSqlWithParameters",
    returns: "string",
    note: "Returns debug SQL with parameters interpolated.",
  },
  {
    name: "execute",
    returns: "Promise<unknown>",
    note: "Runs via QueryInstance.execHandler(meta) when attached.",
  },
]

function RouteComponent() {
  const highlighted = Route.useLoaderData()
  const [methodSearch, setMethodSearch] = useState("")
  const normalizedMethodSearch = methodSearch.trim().toLowerCase()
  const filteredMethods = useMemo(() => {
    if (!normalizedMethodSearch) {
      return queryBuilderIndex
    }
    return queryBuilderIndex.filter((item) => {
      return (
        item.name.toLowerCase().includes(normalizedMethodSearch) ||
        item.note.toLowerCase().includes(normalizedMethodSearch) ||
        item.returns.toLowerCase().includes(normalizedMethodSearch)
      )
    })
  }, [normalizedMethodSearch])

  if (!highlighted) {
    return null
  }

  return (
    <DocsLayout
      breadcrumbHref="/docs/pg"
      pageLabel="Query Builder"
      toc={[
        { label: "Overview", href: "#query-builder-overview" },
        { label: "SQL Helpers", href: "#query-builder-sql" },
        { label: "With Parameters", href: "#query-builder-params" },
        { label: "Execute", href: "#query-builder-execute" },
        { label: "Method Index", href: "#query-builder-index" },
      ]}
    >
      <div className="space-y-3" id="query-builder-overview">
        <p className="text-sm font-medium text-muted-foreground">Basics</p>
        <h1 className="text-3xl font-semibold tracking-tight">Query Builder</h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          <code>QueryBuilder</code> wraps the built query and provides helpers
          for retrieving SQL strings, parameters, and executing against an
          attached <code>QueryInstance</code>.
        </p>
      </div>

      <section className="space-y-3" id="query-builder-sql">
        <h2 className="text-xl font-semibold">SQL Helpers</h2>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            <code>getSql()</code> returns the raw SQL string.
          </p>
          <p>
            <code>getSqlParameters()</code> returns the bound parameter list.
          </p>
          <p>
            <code>getSqlAndParameters()</code> returns both in a single object.
          </p>
          <p>
            <code>getSqlWithParameters()</code> returns SQL with parameters
            interpolated for debugging.
          </p>
        </div>
        <CodeBlock
          code={queryBuilderBasicsCode}
          html={highlighted.queryBuilderBasics.light}
          darkHtml={highlighted.queryBuilderBasics.dark}
          sqlResult={highlighted.queryBuilderBasicsSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="query-builder-params">
        <h2 className="text-xl font-semibold">With Parameters</h2>
        <p className="text-sm text-muted-foreground">
          Parameterized queries surface placeholders in <code>getSql()</code> and
          values in <code>getSqlParameters()</code>. For debugging, use
          <code>getSqlWithParameters()</code>.
        </p>
        <CodeBlock
          code={queryBuilderParamCode}
          html={highlighted.queryBuilderParam.light}
          darkHtml={highlighted.queryBuilderParam.dark}
          sqlResult={highlighted.queryBuilderParamSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="query-builder-execute">
        <h2 className="text-xl font-semibold">Execute</h2>
        <p className="text-sm text-muted-foreground">
          <code>execute(meta?)</code> forwards SQL, parameters, and the builder
          to the attached <code>QueryInstance</code> via <code>execHandler</code>.
        </p>
        <CodeBlock
          code={queryBuilderExecuteCode}
          html={highlighted.queryBuilderExecute.light}
          darkHtml={highlighted.queryBuilderExecute.dark}
          sqlResult={highlighted.queryBuilderExecuteSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="query-builder-index">
        <h2 className="text-xl font-semibold">Method Index</h2>
        <p className="text-sm text-muted-foreground">
          Quick reference for <code>QueryBuilder</code> helpers.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <label className="text-sm text-muted-foreground">
            <input
              className="w-full max-w-xs rounded-md border border-border bg-transparent px-3 py-1 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              type="search"
              value={methodSearch}
              onChange={(event) => setMethodSearch(event.target.value)}
              placeholder="Filter by method or return"
            />
          </label>
          <p className="text-xs text-muted-foreground">
            Showing {filteredMethods.length} methods
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 text-left font-medium">Method</th>
                <th className="py-2 text-left font-medium">Returns</th>
                <th className="py-2 text-left font-medium">Notes</th>
              </tr>
            </thead>
            <tbody>
              {filteredMethods.map((item) => (
                <tr key={item.name} className="border-b border-border/60">
                  <td className="py-2 px-1 font-mono text-xs">{item.name}</td>
                  <td className="py-2 px-1 font-mono text-xs">{item.returns}</td>
                  <td className="py-2 px-1 text-muted-foreground">{item.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </DocsLayout>
  )
}
