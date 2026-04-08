import { createFileRoute } from "@tanstack/react-router"
import { DocsLayout } from "#/components/docs-layout"
import { CodeBlock, CodeBlockCopyButton } from "#/components/ai/code-block"
import { highlightCodeBlock } from "#/components/ai/code-block.loader"

export const Route = createFileRoute("/docs/pg/installation/")({
  loader: async () => {
    const [install, setup, basic, handler] = await Promise.all([
      highlightCodeBlock(installCode, "bash"),
      highlightCodeBlock(setupCode, "ts"),
      highlightCodeBlock(basicQueryCode, "ts", true),
      highlightCodeBlock(handlerSetupCode, "ts"),
    ])
    return { install, setup, basic, handler }
  },
  component: RouteComponent,
})

const installCode = `npm install @gntrees/sql-builder pg
pnpm add @gntrees/sql-builder pg
yarn add @gntrees/sql-builder pg`

const setupCode = `import { sqlBuilder } from "@gntrees/sql-builder/pg"

sqlBuilder("postgresql://user:password@localhost:5432/app")`

const basicQueryCode = `const query = await q
  .select(
    q.c("users.id"),
    q.c("users.name"),
    q.c("users.email"),
  )
  .from(q.t("users"))
  .where(q.c("users.status").op("=").v("active"))
  .orderBy(q.c("users.name"))
  .limit(10)
  .execute()

console.log(query)`

const handlerSetupCode = `import { sqlBuilder } from "@gntrees/sql-builder/pg"
import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

sqlBuilder()
  // If you want to override the default execution logic.
  .setExecutionHandler(async ({ sql, parameters }) => {
    // implement your custom execution logic here.
    const result = await pool.query(sql, parameters)
    console.log("Executed SQL:", sql)
    return result.rows
  })
  // If you want to override the default parameter formatting.
  .setFormatParamHandler(({ index, value, type }) => {
    // implement your custom formatting logic here. here's a simple example:
    if (type === "identifier") {
      return '"' + String(value).replace(/"/g, '""') + '"'
    }
    if (type === "literal") {
      return "$" + index
    }
    return String(value) // fallback for other types  
  })`

function RouteComponent() {
  const highlighted = Route.useLoaderData()

  if (!highlighted) {
    return null
  }

  return (
    <DocsLayout
      breadcrumbHref="/docs/pg"
      pageLabel="Installation"
      toc={[
        { label: "Install package", href: "#install-package" },
        { label: "Initial setup", href: "#initial-setup" },
        { label: "Simple use case", href: "#simple-use-case" },
        { label: "Custom handlers", href: "#custom-handlers" },
      ]}
    >
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Getting Started</p>
        <h1 className="text-3xl font-semibold tracking-tight">Installation</h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          Install the package, connect it to your database client, and run your first
          query in minutes.
        </p>
      </div>

      <section className="space-y-3" id="install-package">
        <h2 className="text-xl font-semibold">Install package</h2>
        <p className="text-sm text-muted-foreground">
          Use the package manager you prefer.
        </p>
        <CodeBlock
          code={installCode}
          html={highlighted.install.light}
          darkHtml={highlighted.install.dark}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="initial-setup">
        <h2 className="text-xl font-semibold">Initial setup</h2>
        <p className="text-sm text-muted-foreground">
          The simplest setup is passing your database URL directly to the builder.
        </p>
        <CodeBlock
          code={setupCode}
          html={highlighted.setup.light}
          darkHtml={highlighted.setup.dark}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="simple-use-case">
        <h2 className="text-xl font-semibold">Simple use case</h2>
        <p className="text-sm text-muted-foreground">
          Fetch active users, sorted by name, with a limit.
        </p>
        <CodeBlock
          code={basicQueryCode}
          html={highlighted.basic.light}
          darkHtml={highlighted.basic.dark}
          sqlResult={{ code: basicQueryCode }}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="custom-handlers">
        <h2 className="text-xl font-semibold">Custom handlers</h2>
        <p className="text-sm text-muted-foreground">
          Use these when you want full control over parameter formatting and query execution.
        </p>
        <CodeBlock
          code={handlerSetupCode}
          html={highlighted.handler.light}
          darkHtml={highlighted.handler.dark}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>
    </DocsLayout>
  )
}
