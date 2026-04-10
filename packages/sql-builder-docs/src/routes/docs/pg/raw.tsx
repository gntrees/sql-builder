import { createFileRoute } from "@tanstack/react-router"
import { DocsLayout } from "#/components/docs-layout"
import { CodeBlock, CodeBlockCopyButton } from "#/components/ai/code-block"
import {
  buildSqlResultFromCode,
  highlightCodeBlock,
} from "#/components/ai/code-block.loader"

export const Route = createFileRoute("/docs/pg/raw")({
  loader: async () => {
    const [
      rawBasics,
      rawAlias,
      rawInterpolation,
      rawFragment,
      rawStandalone,
      rawStringBasics,
      rawStringAlias,
      rawStringCast,
      rawStringLimit,
      literalBasics,
      literalAlias,
      literalArray,
      identifierBasics,
      identifierAlias,
      identifierArray,
      valueBasics,
      valueExpression,
      percentCharacter,
      operatorBasics,
      behaviorNotes,
      rawBasicsSqlResult,
      rawAliasSqlResult,
      rawInterpolationSqlResult,
      rawFragmentSqlResult,
      rawStandaloneSqlResult,
      rawStringBasicsSqlResult,
      rawStringAliasSqlResult,
      rawStringCastSqlResult,
      rawStringLimitSqlResult,
      literalBasicsSqlResult,
      literalAliasSqlResult,
      literalArraySqlResult,
      identifierBasicsSqlResult,
      identifierAliasSqlResult,
      identifierArraySqlResult,
      valueBasicsSqlResult,
      valueExpressionSqlResult,
      percentCharacterSqlResult,
      operatorBasicsSqlResult,
      behaviorNotesSqlResult,
    ] = await Promise.all([
      highlightCodeBlock(rawBasicsCode, "ts"),
      highlightCodeBlock(rawAliasCode, "ts"),
      highlightCodeBlock(rawInterpolationCode, "ts"),
      highlightCodeBlock(rawFragmentCode, "ts"),
      highlightCodeBlock(rawStandaloneCode, "ts"),
      highlightCodeBlock(rawStringBasicsCode, "ts"),
      highlightCodeBlock(rawStringAliasCode, "ts"),
      highlightCodeBlock(rawStringCastCode, "ts"),
      highlightCodeBlock(rawStringLimitCode, "ts"),
      highlightCodeBlock(literalBasicsCode, "ts"),
      highlightCodeBlock(literalAliasCode, "ts"),
      highlightCodeBlock(literalArrayCode, "ts"),
      highlightCodeBlock(identifierBasicsCode, "ts"),
      highlightCodeBlock(identifierAliasCode, "ts"),
      highlightCodeBlock(identifierArrayCode, "ts"),
      highlightCodeBlock(valueBasicsCode, "ts"),
      highlightCodeBlock(valueExpressionCode, "ts"),
      highlightCodeBlock(percentCharacterCode, "ts"),
      highlightCodeBlock(operatorBasicsCode, "ts"),
      highlightCodeBlock(behaviorNotesCode, "ts"),
      buildSqlResultFromCode(rawBasicsCode),
      buildSqlResultFromCode(rawAliasCode),
      buildSqlResultFromCode(rawInterpolationCode),
      buildSqlResultFromCode(rawFragmentCode),
      buildSqlResultFromCode(rawStandaloneCode),
      buildSqlResultFromCode(rawStringBasicsCode),
      buildSqlResultFromCode(rawStringAliasCode),
      buildSqlResultFromCode(rawStringCastCode),
      buildSqlResultFromCode(rawStringLimitCode),
      buildSqlResultFromCode(literalBasicsCode),
      buildSqlResultFromCode(literalAliasCode),
      buildSqlResultFromCode(literalArrayCode),
      buildSqlResultFromCode(identifierBasicsCode),
      buildSqlResultFromCode(identifierAliasCode),
      buildSqlResultFromCode(identifierArrayCode),
      buildSqlResultFromCode(valueBasicsCode),
      buildSqlResultFromCode(valueExpressionCode),
      buildSqlResultFromCode(percentCharacterCode),
      buildSqlResultFromCode(operatorBasicsCode),
      buildSqlResultFromCode(behaviorNotesCode),
    ])

    return {
      rawBasics,
      rawAlias,
      rawInterpolation,
      rawFragment,
      rawStandalone,
      rawStringBasics,
      rawStringAlias,
      rawStringCast,
      rawStringLimit,
      literalBasics,
      literalAlias,
      literalArray,
      identifierBasics,
      identifierAlias,
      identifierArray,
      valueBasics,
      valueExpression,
      percentCharacter,
      operatorBasics,
      behaviorNotes,
      rawBasicsSqlResult,
      rawAliasSqlResult,
      rawInterpolationSqlResult,
      rawFragmentSqlResult,
      rawStandaloneSqlResult,
      rawStringBasicsSqlResult,
      rawStringAliasSqlResult,
      rawStringCastSqlResult,
      rawStringLimitSqlResult,
      literalBasicsSqlResult,
      literalAliasSqlResult,
      literalArraySqlResult,
      identifierBasicsSqlResult,
      identifierAliasSqlResult,
      identifierArraySqlResult,
      valueBasicsSqlResult,
      valueExpressionSqlResult,
      percentCharacterSqlResult,
      operatorBasicsSqlResult,
      behaviorNotesSqlResult,
    }
  },
  component: RouteComponent,
})

const rawBasicsCode = `const query = q
  .select(q.raw\`COUNT(*)\`)
  .from(q.t("users"))`

const rawAliasCode = `const query = q
  .select(q.r\`NOW()\`)
  .from(q.t("audit_logs"))`

const rawInterpolationCode = `const query = q
  .select(
    q.r\`DATE_TRUNC('day', \${q.c("events.created_at")})\`,
  )
  .from(q.t("events"))`

const rawFragmentCode = `const query = q
  .select(
    q.c("users.id"),
    q.r\`, LOWER(\${q.c("users.email")})\`,
  )
  .from(q.t("users"))`

const rawStandaloneCode = `const query = q.raw\`
  SELECT \${q.c("users.id")}, \${q.c("users.name")}
  FROM \${q.t("users")}
  WHERE \${q.c("users.status")} = \${q.v("active")}
\``

const rawStringBasicsCode = `const query = q
  .select(q.rawString("NOW()"))
  .from(q.t("audit_logs"))`

const rawStringAliasCode = `const query = q
  .select(q.rs("NOW()"))
  .from(q.t("audit_logs"))`

const rawStringCastCode = `const query = q
  .select(q.rs("NULL::uuid"))
  .from(q.t("events"))`

const rawStringLimitCode = `const query = q
  .select("*")
  .from(q.t("posts"))
  .limit(q.rs("ALL"))
  .offset(q.rs("10"))`

const literalBasicsCode = `const query = q
  .select(q.literal("active"))
  .from(q.t("users"))`

const literalAliasCode = `const query = q
  .select(q.l("active"))
  .from(q.t("users"))`

const literalArrayCode = `const query = q
  .select(
    q.literalArray([
      "active",
      q.raw\`NOW()\`,
      q.v(42),
    ]),
  )
  .from(q.t("users"))`

const identifierBasicsCode = `const query = q
  .select(q.identifier("users.created_at"))
  .from(q.t("users"))`

const identifierAliasCode = `const query = q
  .select(q.i("users.created_at"))
  .from(q.t("users"))`

const identifierArrayCode = `const query = q
  .select(
    q.identifierArray([
      "users.id",
      "users.email",
      q.raw\`LOWER(\${q.c("users.email")})\`,
    ]),
  )
  .from(q.t("users"))`

const valueBasicsCode = `const query = q
  .select(q.v("active"))
  .from(q.t("users"))`

const valueExpressionCode = `const query = q
  .select(q.v(q.raw\`NOW()\`))
  .from(q.t("events"))`

const percentCharacterCode = `const query = q
  .select(
    q.r\`LOWER(\${q.c("users.email")}) LIKE \${q.percentCharacter()}\`)
  .from(q.t("users"))`

const operatorBasicsCode = `const query = q
  .select(q.c("users.id"))
  .from(q.t("users"))
  .where(
    q.op(q.c("users.status"),"=", q.v("active")),
  )`

const behaviorNotesCode = `// if null is passed to the identifier helper, it emits a raw "NULL" token instead of a parameter.
const query = q
  .select(q.i("*"), q.i(null)) // emits "*" and "NULL" tokens, not parameters.
  .from(q.t("users"))`

function RouteComponent() {
  const highlighted = Route.useLoaderData()

  if (!highlighted) {
    return null
  }

  return (
    <DocsLayout
      breadcrumbHref="/docs/pg"
      pageLabel="Raw Query"
      toc={[
        { label: "raw (alias: r)", href: "#raw" },
        { label: "literal (alias: l)", href: "#literal" },
        { label: "literalArray", href: "#literal-array" },
        { label: "identifier (alias: i)", href: "#identifier" },
        { label: "identifierArray", href: "#identifier-array" },
        { label: "rawString (alias: rs)", href: "#raw-string" },
        { label: "v", href: "#v" },
        { label: "percentCharacter", href: "#percent-character" },
        { label: "op", href: "#op" },
        { label: "Behavior Notes", href: "#behavior-notes" },
      ]}
    >
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Basics</p>
        <h1 className="text-3xl font-semibold tracking-tight">Raw Query</h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          Use raw fragments when you need SQL expressions that are not covered by
          helpers yet. This page covers the full raw query surface from the base
          raw query builder.
        </p>
      </div>

      <section className="space-y-3" id="raw">
        <h2 className="text-xl font-semibold">raw (alias: r)</h2>
        <p className="text-sm text-muted-foreground">
          Build SQL fragments with template literals. Interpolations accept other
          statements (columns, subqueries, or other builders).
        </p>
        <CodeBlock
          code={rawBasicsCode}
          html={highlighted.rawBasics.light}
          darkHtml={highlighted.rawBasics.dark}
          sqlResult={highlighted.rawBasicsSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
        <CodeBlock
          code={rawAliasCode}
          html={highlighted.rawAlias.light}
          darkHtml={highlighted.rawAlias.dark}
          sqlResult={highlighted.rawAliasSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
        <CodeBlock
          code={rawInterpolationCode}
          html={highlighted.rawInterpolation.light}
          darkHtml={highlighted.rawInterpolation.dark}
          sqlResult={highlighted.rawInterpolationSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
        <CodeBlock
          code={rawFragmentCode}
          html={highlighted.rawFragment.light}
          darkHtml={highlighted.rawFragment.dark}
          sqlResult={highlighted.rawFragmentSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
        <CodeBlock
          code={rawStandaloneCode}
          html={highlighted.rawStandalone.light}
          darkHtml={highlighted.rawStandalone.dark}
          sqlResult={highlighted.rawStandaloneSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="literal">
        <h2 className="text-xl font-semibold">literal (alias: l)</h2>
        <p className="text-sm text-muted-foreground">
          Push literal values directly into the query, or resolve statements when
          passed a builder.
        </p>
        <CodeBlock
          code={literalBasicsCode}
          html={highlighted.literalBasics.light}
          darkHtml={highlighted.literalBasics.dark}
          sqlResult={highlighted.literalBasicsSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
        <CodeBlock
          code={literalAliasCode}
          html={highlighted.literalAlias.light}
          darkHtml={highlighted.literalAlias.dark}
          sqlResult={highlighted.literalAliasSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="literal-array">
        <h2 className="text-xl font-semibold">literalArray</h2>
        <p className="text-sm text-muted-foreground">
          Emit a sequence of literal values and statements as parameters.
        </p>
        <CodeBlock
          code={literalArrayCode}
          html={highlighted.literalArray.light}
          darkHtml={highlighted.literalArray.dark}
          sqlResult={highlighted.literalArraySqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="identifier">
        <h2 className="text-xl font-semibold">identifier (alias: i)</h2>
        <p className="text-sm text-muted-foreground">
          Emit identifiers (table/column names) with proper quoting rules.
        </p>
        <CodeBlock
          code={identifierBasicsCode}
          html={highlighted.identifierBasics.light}
          darkHtml={highlighted.identifierBasics.dark}
          sqlResult={highlighted.identifierBasicsSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
        <CodeBlock
          code={identifierAliasCode}
          html={highlighted.identifierAlias.light}
          darkHtml={highlighted.identifierAlias.dark}
          sqlResult={highlighted.identifierAliasSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="identifier-array">
        <h2 className="text-xl font-semibold">identifierArray</h2>
        <p className="text-sm text-muted-foreground">
          Emit a sequence of identifiers and statements.
        </p>
        <CodeBlock
          code={identifierArrayCode}
          html={highlighted.identifierArray.light}
          darkHtml={highlighted.identifierArray.dark}
          sqlResult={highlighted.identifierArraySqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="raw-string">
        <h2 className="text-xl font-semibold">rawString (alias: rs)</h2>
        <p className="text-sm text-muted-foreground">
          Inject a string as-is into the SQL token stream. Use this only for
          trusted values that are already safe SQL.
        </p>
        <CodeBlock
          code={rawStringBasicsCode}
          html={highlighted.rawStringBasics.light}
          darkHtml={highlighted.rawStringBasics.dark}
          sqlResult={highlighted.rawStringBasicsSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
        <CodeBlock
          code={rawStringAliasCode}
          html={highlighted.rawStringAlias.light}
          darkHtml={highlighted.rawStringAlias.dark}
          sqlResult={highlighted.rawStringAliasSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
        <CodeBlock
          code={rawStringCastCode}
          html={highlighted.rawStringCast.light}
          darkHtml={highlighted.rawStringCast.dark}
          sqlResult={highlighted.rawStringCastSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
        <CodeBlock
          code={rawStringLimitCode}
          html={highlighted.rawStringLimit.light}
          darkHtml={highlighted.rawStringLimit.dark}
          sqlResult={highlighted.rawStringLimitSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="v">
        <h2 className="text-xl font-semibold">v</h2>
        <p className="text-sm text-muted-foreground">
          Push a literal value or resolve a statement and emit its tokens.
        </p>
        <CodeBlock
          code={valueBasicsCode}
          html={highlighted.valueBasics.light}
          darkHtml={highlighted.valueBasics.dark}
          sqlResult={highlighted.valueBasicsSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
        <CodeBlock
          code={valueExpressionCode}
          html={highlighted.valueExpression.light}
          darkHtml={highlighted.valueExpression.dark}
          sqlResult={highlighted.valueExpressionSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="percent-character">
        <h2 className="text-xl font-semibold">percentCharacter</h2>
        <p className="text-sm text-muted-foreground">
          Emit a percent character token for safe LIKE expressions.
        </p>
        <CodeBlock
          code={percentCharacterCode}
          html={highlighted.percentCharacter.light}
          darkHtml={highlighted.percentCharacter.dark}
          sqlResult={highlighted.percentCharacterSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="op">
        <h2 className="text-xl font-semibold">op</h2>
        <p className="text-sm text-muted-foreground">
          Emit operator tokens and values together. Operators are validated
          against the supported operator list.
        </p>
        <CodeBlock
          code={operatorBasicsCode}
          html={highlighted.operatorBasics.light}
          darkHtml={highlighted.operatorBasics.dark}
          sqlResult={highlighted.operatorBasicsSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="behavior-notes">
        <h2 className="text-xl font-semibold">Behavior Notes</h2>
        <p className="text-sm text-muted-foreground">
          The identifier alias has special handling for wildcards and NULL.
        </p>
        <CodeBlock
          code={behaviorNotesCode}
          html={highlighted.behaviorNotes.light}
          darkHtml={highlighted.behaviorNotes.dark}
          sqlResult={highlighted.behaviorNotesSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>
    </DocsLayout>
  )
}
