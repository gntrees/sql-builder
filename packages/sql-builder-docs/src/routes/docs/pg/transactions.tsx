import { createFileRoute } from "@tanstack/react-router"
import { DocsLayout } from "#/components/docs-layout"
import { CodeBlock, CodeBlockCopyButton } from "#/components/ai/code-block"
import {
  buildSqlResultFromCode,
  highlightCodeBlock,
} from "#/components/ai/code-block.loader"

export const Route = createFileRoute("/docs/pg/transactions")({
  loader: async () => {
    const [
      transactionBasics,
      transactionSavepoint,
      transactionPrepared,
      transactionWrapper,
      transactionSemicolon,
      transactionBasicsSqlResult,
      transactionSavepointSqlResult,
      transactionPreparedSqlResult,
      transactionWrapperSqlResult,
      transactionSemicolonSqlResult,
    ] = await Promise.all([
      highlightCodeBlock(transactionBasicsCode, "ts"),
      highlightCodeBlock(transactionSavepointCode, "ts"),
      highlightCodeBlock(transactionPreparedCode, "ts"),
      highlightCodeBlock(transactionWrapperCode, "ts"),
      highlightCodeBlock(transactionSemicolonCode, "ts"),
      buildSqlResultFromCode(transactionBasicsCode),
      buildSqlResultFromCode(transactionSavepointCode),
      buildSqlResultFromCode(transactionPreparedCode),
      buildSqlResultFromCode(transactionWrapperCode),
      buildSqlResultFromCode(transactionSemicolonCode),
    ])

    return {
      transactionBasics,
      transactionSavepoint,
      transactionPrepared,
      transactionWrapper,
      transactionSemicolon,
      transactionBasicsSqlResult,
      transactionSavepointSqlResult,
      transactionPreparedSqlResult,
      transactionWrapperSqlResult,
      transactionSemicolonSqlResult,
    }
  },
  component: RouteComponent,
})

const transactionBasicsCode = `const query = q
  .beginTransaction()
  .select(q.c("users.id"))
  .from(q.t("users"))
  .commitTransaction()`

const transactionSavepointCode = `const query = q
  .beginTransaction()
  .savepointTransaction(q.i("before_update"))
  .update(q.t("users"))
  .set({ status: q.v("active") })
  .rollbackToSavepointTransaction(q.i("before_update"))
  .releaseTransaction(q.i("before_update"))
  .commitTransaction()`

const transactionPreparedCode = `const query = q
  .prepareTransaction(q.i("tx_jobs"))
  .commitPreparedTransaction(q.i("tx_jobs"))`

const transactionWrapperCode = `const query = q.transaction(
  q.select(q.c("users.id")).from(q.t("users")),
  q.update(q.t("users")).set({ status: q.v("active") }).semicolon(),
)`

const transactionSemicolonCode = `const query = q
  .select(q.c("users.id"))
  .from(q.t("users"))
  .semicolon()`

function RouteComponent() {
  const highlighted = Route.useLoaderData()

  if (!highlighted) {
    return null
  }

  return (
    <DocsLayout
      breadcrumbHref="/docs/pg"
      pageLabel="Override: Transactions"
      toc={[
        { label: "Basics", href: "#override-transaction-basics" },
        { label: "Savepoints", href: "#override-transaction-savepoints" },
        { label: "Prepared", href: "#override-transaction-prepared" },
        { label: "Transaction Wrapper", href: "#override-transaction-wrapper" },
        { label: "Semicolons", href: "#override-transaction-semicolons" },
      ]}
    >
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Basics</p>
        <h1 className="text-3xl font-semibold tracking-tight">Override: Transactions</h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          Override query builder adds helpers for transaction statements and
          semicolon-terminated transaction flows.
        </p>
      </div>

      <section className="space-y-3" id="override-transaction-basics">
        <h2 className="text-xl font-semibold">Basics</h2>
        <p className="text-sm text-muted-foreground">
          Use <code>beginTransaction</code>, <code>commitTransaction</code>, and
          <code>rollbackTransaction</code> to build transactional SQL quickly.
        </p>
        <CodeBlock
          code={transactionBasicsCode}
          html={highlighted.transactionBasics.light}
          darkHtml={highlighted.transactionBasics.dark}
          sqlResult={highlighted.transactionBasicsSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="override-transaction-savepoints">
        <h2 className="text-xl font-semibold">Savepoints</h2>
        <p className="text-sm text-muted-foreground">
          Savepoint helpers emit <code>SAVEPOINT</code>, <code>ROLLBACK TO</code>,
          and <code>RELEASE SAVEPOINT</code> statements with semicolons.
        </p>
        <CodeBlock
          code={transactionSavepointCode}
          html={highlighted.transactionSavepoint.light}
          darkHtml={highlighted.transactionSavepoint.dark}
          sqlResult={highlighted.transactionSavepointSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="override-transaction-prepared">
        <h2 className="text-xl font-semibold">Prepared</h2>
        <p className="text-sm text-muted-foreground">
          Prepared transaction helpers emit <code>PREPARE TRANSACTION</code>,
          <code>COMMIT PREPARED</code>, and <code>ROLLBACK PREPARED</code>.
        </p>
        <CodeBlock
          code={transactionPreparedCode}
          html={highlighted.transactionPrepared.light}
          darkHtml={highlighted.transactionPrepared.dark}
          sqlResult={highlighted.transactionPreparedSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="override-transaction-wrapper">
        <h2 className="text-xl font-semibold">Transaction Wrapper</h2>
        <p className="text-sm text-muted-foreground">
          <code>transaction(...statements)</code> wraps statements with
          <code>BEGIN</code> and <code>COMMIT</code> plus semicolons.
        </p>
        <CodeBlock
          code={transactionWrapperCode}
          html={highlighted.transactionWrapper.light}
          darkHtml={highlighted.transactionWrapper.dark}
          sqlResult={highlighted.transactionWrapperSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="override-transaction-semicolons">
        <h2 className="text-xl font-semibold">Semicolons</h2>
        <p className="text-sm text-muted-foreground">
          Use <code>semicolon</code> or its alias <code>sc()</code> to terminate
          statement segments explicitly.
        </p>
        <CodeBlock
          code={transactionSemicolonCode}
          html={highlighted.transactionSemicolon.light}
          darkHtml={highlighted.transactionSemicolon.dark}
          sqlResult={highlighted.transactionSemicolonSqlResult}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>
    </DocsLayout>
  )
}
