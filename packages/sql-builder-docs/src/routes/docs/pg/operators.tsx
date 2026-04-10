import { createFileRoute } from "@tanstack/react-router"
import { useMemo, useState } from "react"
import { DocsLayout } from "#/components/docs-layout"
import { CodeBlock, CodeBlockCopyButton } from "#/components/ai/code-block"
import {
  buildSqlResultFromCode,
  highlightCodeBlock,
} from "#/components/ai/code-block.loader"

export const Route = createFileRoute("/docs/pg/operators")({
  loader: async () => {
    const [
      comparisonBasics,
      logicalBasics,
      patternMatchingBasics,
      bitwiseBasics,
      arithmeticBasics,
      postgresSpecificBasics,
      geometricBasics,
      betweenBasics,
      comparisonBasicsSqlResult,
      logicalBasicsSqlResult,
      patternMatchingBasicsSqlResult,
      bitwiseBasicsSqlResult,
      arithmeticBasicsSqlResult,
      postgresSpecificBasicsSqlResult,
      geometricBasicsSqlResult,
      betweenBasicsSqlResult,
    ] = await Promise.all([
      highlightCodeBlock(comparisonBasicsCode, "ts"),
      highlightCodeBlock(logicalBasicsCode, "ts"),
      highlightCodeBlock(patternMatchingBasicsCode, "ts"),
      highlightCodeBlock(bitwiseBasicsCode, "ts"),
      highlightCodeBlock(arithmeticBasicsCode, "ts"),
      highlightCodeBlock(postgresSpecificBasicsCode, "ts"),
      highlightCodeBlock(geometricBasicsCode, "ts"),
      highlightCodeBlock(betweenBasicsCode, "ts"),
      buildSqlResultFromCode(comparisonBasicsCode),
      buildSqlResultFromCode(logicalBasicsCode),
      buildSqlResultFromCode(patternMatchingBasicsCode),
      buildSqlResultFromCode(bitwiseBasicsCode),
      buildSqlResultFromCode(arithmeticBasicsCode),
      buildSqlResultFromCode(postgresSpecificBasicsCode),
      buildSqlResultFromCode(geometricBasicsCode),
      buildSqlResultFromCode(betweenBasicsCode),
    ])

    return {
      comparisonBasics,
      logicalBasics,
      patternMatchingBasics,
      bitwiseBasics,
      arithmeticBasics,
      postgresSpecificBasics,
      geometricBasics,
      betweenBasics,
      comparisonBasicsSqlResult,
      logicalBasicsSqlResult,
      patternMatchingBasicsSqlResult,
      bitwiseBasicsSqlResult,
      arithmeticBasicsSqlResult,
      postgresSpecificBasicsSqlResult,
      geometricBasicsSqlResult,
      betweenBasicsSqlResult,
    }
  },
  component: RouteComponent,
})

const comparisonBasicsCode = `const query = q
  .select(q.c("users.id"))
  .from(q.t("users"))
  .where(q.eq(q.c("users.status"), q.v("active")))`

const logicalBasicsCode = `const query = q
  .select(q.c("users.id"))
  .from(q.t("users"))
  .where(q.is(q.c("users.deleted_at"), q.raw\`NULL\`))`

const patternMatchingBasicsCode = `const query = q
  .select(q.c("users.email"))
  .from(q.t("users"))
  .where(q.ilike(q.c("users.email"), q.v("%@example.com")))`

const bitwiseBasicsCode = `const query = q
  .select(q.c("flags.value"))
  .from(q.t("flags"))
  .where(q.bitwiseAnd(q.c("flags.value"), q.v(4)))`

const arithmeticBasicsCode = `const query = q
  .select(q.plus(q.c("orders.total"), q.v(10)))
  .from(q.t("orders"))`

const postgresSpecificBasicsCode = `const query = q
  .select(q.c("tags.label"))
  .from(q.t("tags"))
  .where(q.atSign(q.c("tags.label"), q.v("admin")))`

const geometricBasicsCode = `const query = q
  .select(q.c("places.id"))
  .from(q.t("places"))
  .orderBy(q.distance(q.c("places.location"), q.v("(0,0)")))`

const betweenBasicsCode = `const query = q
  .select(q.c("events.created_at"))
  .from(q.t("events"))
  .where(q.between(q.v("2024-01-01"), q.v("2024-01-31")))`

const operatorIndex = [
  { name: "eq", group: "Comparison", sql: "=" },
  { name: "ne", group: "Comparison", sql: "<>" },
  { name: "notEq", group: "Comparison", sql: "!=" },
  { name: "lt", group: "Comparison", sql: "<" },
  { name: "gt", group: "Comparison", sql: ">" },
  { name: "lte", group: "Comparison", sql: "<=" },
  { name: "gte", group: "Comparison", sql: ">=" },
  { name: "exclamation", group: "Logical", sql: "!" },
  { name: "is", group: "Logical", sql: "IS" },
  { name: "isNot", group: "Logical", sql: "IS NOT" },
  { name: "matchRegex", group: "Pattern Matching", sql: "~" },
  { name: "matchRegexInsensitive", group: "Pattern Matching", sql: "~*" },
  { name: "notMatchRegex", group: "Pattern Matching", sql: "!~" },
  { name: "notMatchRegexInsensitive", group: "Pattern Matching", sql: "!~*" },
  { name: "like", group: "Pattern Matching", sql: "LIKE" },
  { name: "notLike", group: "Pattern Matching", sql: "NOT LIKE" },
  { name: "ilike", group: "Pattern Matching", sql: "ILIKE" },
  { name: "notIlike", group: "Pattern Matching", sql: "NOT ILIKE" },
  { name: "similarTo", group: "Pattern Matching", sql: "SIMILAR TO" },
  { name: "notSimilarTo", group: "Pattern Matching", sql: "NOT SIMILAR TO" },
  { name: "bitwiseAnd", group: "Bitwise", sql: "&" },
  { name: "bitwiseOr", group: "Bitwise", sql: "|" },
  { name: "bitwiseXor", group: "Bitwise", sql: "^" },
  { name: "bitwiseLeftShift", group: "Bitwise", sql: "<<" },
  { name: "bitwiseLeftShiftAssign", group: "Bitwise", sql: "<<=" },
  { name: "bitwiseRightShift", group: "Bitwise", sql: ">>" },
  { name: "bitwiseRightShiftAssign", group: "Bitwise", sql: ">>=" },
  { name: "plus", group: "Arithmetic", sql: "+" },
  { name: "minus", group: "Arithmetic", sql: "-" },
  { name: "multiply", group: "Arithmetic", sql: "*" },
  { name: "divide", group: "Arithmetic", sql: "/" },
  { name: "modulo", group: "Arithmetic", sql: "%" },
  { name: "textCat", group: "Arithmetic", sql: "||" },
  { name: "atSign", group: "PostgreSQL Specific", sql: "@" },
  { name: "hash", group: "PostgreSQL Specific", sql: "#" },
  { name: "caretAt", group: "PostgreSQL Specific", sql: "^@" },
  { name: "totalLength", group: "Geometric", sql: "@-@" },
  { name: "middle", group: "Geometric", sql: "@@" },
  { name: "closestPoint", group: "Geometric", sql: "##" },
  { name: "distance", group: "Geometric", sql: "<->" },
  { name: "containment", group: "Geometric", sql: "@>" },
  { name: "containedBy", group: "Geometric", sql: "<@" },
  { name: "notExtendRight", group: "Geometric", sql: "&<" },
  { name: "notExtendLeft", group: "Geometric", sql: "&>" },
  { name: "strictlyBelow", group: "Geometric", sql: "<<|" },
  { name: "strictlyAbove", group: "Geometric", sql: "|>>" },
  { name: "notExtendAbove", group: "Geometric", sql: "&<|" },
  { name: "notExtendBelow", group: "Geometric", sql: "|&>" },
  { name: "below", group: "Geometric", sql: "<^" },
  { name: "above", group: "Geometric", sql: ">^" },
  { name: "crosses", group: "Geometric", sql: "?#" },
  { name: "horizontal", group: "Geometric", sql: "?-" },
  { name: "vertical", group: "Geometric", sql: "?|" },
  { name: "perpendicular", group: "Geometric", sql: "?-|" },
  { name: "isParallel", group: "Geometric", sql: "?||" },
  { name: "sameAs", group: "Geometric", sql: "~=" },
  { name: "between", group: "Between", sql: "BETWEEN" },
  { name: "notBetween", group: "Between", sql: "NOT BETWEEN" },
  { name: "betweenSymmetric", group: "Between", sql: "BETWEEN SYMMETRIC" },
  { name: "notBetweenSymmetric", group: "Between", sql: "NOT BETWEEN SYMMETRIC" },
]

function RouteComponent() {
  const highlighted = Route.useLoaderData()
  const [operatorSearch, setOperatorSearch] = useState("")
  const [operatorPage, setOperatorPage] = useState(1)
  const operatorPageSize = 15
  const normalizedOperatorSearch = operatorSearch.trim().toLowerCase()
  const filteredOperators = useMemo(() => {
    if (!normalizedOperatorSearch) {
      return operatorIndex
    }
    return operatorIndex.filter((item) => {
      return (
        item.name.toLowerCase().includes(normalizedOperatorSearch) ||
        item.group.toLowerCase().includes(normalizedOperatorSearch) ||
        item.sql.toLowerCase().includes(normalizedOperatorSearch)
      )
    })
  }, [normalizedOperatorSearch])
  const totalOperatorPages = Math.max(
    1,
    Math.ceil(filteredOperators.length / operatorPageSize),
  )
  const currentOperatorPage = Math.min(operatorPage, totalOperatorPages)
  const pagedOperators = useMemo(() => {
    const start = (currentOperatorPage - 1) * operatorPageSize
    return filteredOperators.slice(start, start + operatorPageSize)
  }, [currentOperatorPage, filteredOperators])

  if (!highlighted) {
    return null
  }

  return (
    <DocsLayout
      breadcrumbHref="/docs/pg"
      pageLabel="Operators"
      toc={[
        { label: "Comparison", href: "#comparison" },
        { label: "Logical", href: "#logical" },
        { label: "Pattern Matching", href: "#pattern-matching" },
        { label: "Bitwise", href: "#bitwise" },
        { label: "Arithmetic", href: "#arithmetic" },
        { label: "PostgreSQL Specific", href: "#postgres-specific" },
        { label: "Geometric", href: "#geometric" },
        { label: "Between", href: "#between" },
        { label: "Operator Index", href: "#operator-index" },
      ]}
    >
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Basics</p>
        <h1 className="text-3xl font-semibold tracking-tight">Operators</h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          Operator helpers are thin wrappers around <code>op</code>. Pass two
          statements for binary operators, one statement for unary operators, or
          none to emit the operator token for raw fragments.
        </p>
      </div>

      <section className="space-y-3" id="comparison">
        <h2 className="text-xl font-semibold">Comparison</h2>
        <p className="text-sm text-muted-foreground">
          Equality and ordering helpers such as <code>eq</code>, <code>ne</code>,
          <code>lt</code>, <code>lte</code>, <code>gt</code>, and <code>gte</code>.
        </p>
        <CodeBlock
          code={comparisonBasicsCode}
          html={highlighted.comparisonBasics.light}
          darkHtml={highlighted.comparisonBasics.dark}
          sqlResult={highlighted.comparisonBasicsSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="logical">
        <h2 className="text-xl font-semibold">Logical</h2>
        <p className="text-sm text-muted-foreground">
          Logical helpers such as <code>is</code>, <code>isNot</code>, and
          <code>exclamation</code>.
        </p>
        <CodeBlock
          code={logicalBasicsCode}
          html={highlighted.logicalBasics.light}
          darkHtml={highlighted.logicalBasics.dark}
          sqlResult={highlighted.logicalBasicsSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="pattern-matching">
        <h2 className="text-xl font-semibold">Pattern Matching</h2>
        <p className="text-sm text-muted-foreground">
          LIKE/ILIKE and regex operators: <code>like</code>, <code>ilike</code>,
          <code>notLike</code>, <code>matchRegex</code>, and friends.
        </p>
        <CodeBlock
          code={patternMatchingBasicsCode}
          html={highlighted.patternMatchingBasics.light}
          darkHtml={highlighted.patternMatchingBasics.dark}
          sqlResult={highlighted.patternMatchingBasicsSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="bitwise">
        <h2 className="text-xl font-semibold">Bitwise</h2>
        <p className="text-sm text-muted-foreground">
          Bitwise helpers such as <code>bitwiseAnd</code>, <code>bitwiseOr</code>,
          and shift operators.
        </p>
        <CodeBlock
          code={bitwiseBasicsCode}
          html={highlighted.bitwiseBasics.light}
          darkHtml={highlighted.bitwiseBasics.dark}
          sqlResult={highlighted.bitwiseBasicsSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="arithmetic">
        <h2 className="text-xl font-semibold">Arithmetic</h2>
        <p className="text-sm text-muted-foreground">
          Arithmetic helpers such as <code>plus</code>, <code>minus</code>,
          <code>multiply</code>, <code>divide</code>, and <code>modulo</code>.
        </p>
        <CodeBlock
          code={arithmeticBasicsCode}
          html={highlighted.arithmeticBasics.light}
          darkHtml={highlighted.arithmeticBasics.dark}
          sqlResult={highlighted.arithmeticBasicsSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="postgres-specific">
        <h2 className="text-xl font-semibold">PostgreSQL Specific</h2>
        <p className="text-sm text-muted-foreground">
          PostgreSQL operator helpers such as <code>atSign</code>,
          <code>hash</code>, and <code>caretAt</code>.
        </p>
        <CodeBlock
          code={postgresSpecificBasicsCode}
          html={highlighted.postgresSpecificBasics.light}
          darkHtml={highlighted.postgresSpecificBasics.dark}
          sqlResult={highlighted.postgresSpecificBasicsSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="geometric">
        <h2 className="text-xl font-semibold">Geometric</h2>
        <p className="text-sm text-muted-foreground">
          Geometric operators such as <code>distance</code>, <code>closestPoint</code>,
          and <code>totalLength</code>.
        </p>
        <CodeBlock
          code={geometricBasicsCode}
          html={highlighted.geometricBasics.light}
          darkHtml={highlighted.geometricBasics.dark}
          sqlResult={highlighted.geometricBasicsSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="between">
        <h2 className="text-xl font-semibold">Between</h2>
        <p className="text-sm text-muted-foreground">
          Between helpers such as <code>between</code>, <code>notBetween</code>,
          and symmetric variants.
        </p>
        <CodeBlock
          code={betweenBasicsCode}
          html={highlighted.betweenBasics.light}
          darkHtml={highlighted.betweenBasics.dark}
          sqlResult={highlighted.betweenBasicsSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="operator-index">
        <h2 className="text-xl font-semibold">Operator Index</h2>
        <p className="text-sm text-muted-foreground">
          Complete list of operator helpers grouped by category.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <label className="text-sm text-muted-foreground">
            <input
              className="w-full max-w-xs rounded-md border border-border bg-transparent px-3 py-1 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              type="search"
              value={operatorSearch}
              onChange={(event) => {
                setOperatorSearch(event.target.value)
                setOperatorPage(1)
              }}
              placeholder="Filter by name, group, or SQL"
            />
          </label>
          <p className="text-xs text-muted-foreground">
            Showing {pagedOperators.length} of {filteredOperators.length}
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 text-left font-medium">#</th>
                <th className="py-2 text-left font-medium">Operator Helper</th>
                <th className="py-2 text-left font-medium">SQL</th>
                <th className="py-2 text-left font-medium">Group</th>
              </tr>
            </thead>
            <tbody>
              {pagedOperators.map((item, index) => (
                <tr key={item.name} className="border-b border-border/60">
                  <td className="py-2 text-muted-foreground">
                    {(currentOperatorPage - 1) * operatorPageSize + index + 1}
                  </td>
                  <td className="py-2 font-mono text-xs">{item.name}</td>
                  <td className="py-2 font-mono text-xs">{item.sql}</td>
                  <td className="py-2 text-muted-foreground">{item.group}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <p className="text-muted-foreground">
            Page {currentOperatorPage} of {totalOperatorPages}
          </p>
          <div className="flex items-center gap-2">
            <button
              className="rounded-md border border-border px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
              disabled={currentOperatorPage <= 1}
              onClick={() =>
                setOperatorPage((prev) => Math.max(1, prev - 1))
              }
              type="button"
            >
              Prev
            </button>
            <button
              className="rounded-md border border-border px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
              disabled={currentOperatorPage >= totalOperatorPages}
              onClick={() =>
                setOperatorPage((prev) =>
                  Math.min(totalOperatorPages, prev + 1),
                )
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
