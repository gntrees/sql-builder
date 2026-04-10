import { createFileRoute } from "@tanstack/react-router"
import { DocsLayout } from "#/components/docs-layout"
import { CodeBlock, CodeBlockCopyButton } from "#/components/ai/code-block"
import { highlightCodeBlock } from "#/components/ai/code-block.loader"

export const Route = createFileRoute("/docs/pg/cli")({
  loader: async () => {
    const [
      cliInstall,
      cliConvert,
      cliGenerate,
      cliHelp,
      cliRecipeQuery,
      cliRecipeSchema,
    ] = await Promise.all([
      highlightCodeBlock(cliInstallCode, "bash"),
      highlightCodeBlock(cliConvertCode, "bash"),
      highlightCodeBlock(cliGenerateCode, "bash"),
      highlightCodeBlock(cliHelpCode, "bash"),
      highlightCodeBlock(cliRecipeQueryCode, "ts"),
      highlightCodeBlock(cliRecipeSchemaCode, "ts"),
    ])

    return {
      cliInstall,
      cliConvert,
      cliGenerate,
      cliHelp,
      cliRecipeQuery,
      cliRecipeSchema,
    }
  },
  component: RouteComponent,
})

const cliInstallCode = `npm install -D @gntrees/sql-builder-cli
pnpm add -D @gntrees/sql-builder-cli
yarn add -D @gntrees/sql-builder-cli`

const cliHelpCode = `npx @gntrees/sql-builder-cli --help
npx @gntrees/sql-builder-cli help`

const cliConvertCode = `npx @gntrees/sql-builder-cli convert \
  --sql="SELECT id, email FROM users WHERE is_active = true" \
  --sqlSchema=true \
  --dbSchema=true \
  --simplify-literal=true \
  --output="./src/queries/get-active-users.ts"`

const cliGenerateCode = `npx @gntrees/sql-builder-cli generate \
  --url="postgres://user:password@localhost:5432/app_db" \
  --output="./src/db/app-db.schema.ts"`

const cliRecipeQueryCode = `// generated from convert
import { sqlBuilder } from "@gntrees/sql-builder/pg"

const q = sqlBuilder().setFormatParamHandler("pg")

export const getActiveUsers = q
  .select(q.c("users.id"), q.c("users.email"))
  .from(q.t("users"))
  .where(q.eq(q.c("users.is_active"), q.v(true)))`

const cliRecipeSchemaCode = `// generated from generate
import { account, user } from "./app-db.schema"
import { sqlBuilder } from "@gntrees/sql-builder/pg"

const q = sqlBuilder().setFormatParamHandler("pg")

const query = q
  .select(account.id, user.email)
  .from(account)
  .join(user)
  .on(q.eq(account.userId, user.id))`

function RouteComponent() {
  const highlighted = Route.useLoaderData()

  if (!highlighted) {
    return null
  }

  return (
    <DocsLayout
      breadcrumbHref="/docs/pg"
      pageLabel="CLI Commands"
      toc={[
        { label: "Overview", href: "#cli-overview" },
        { label: "Why Use CLI", href: "#cli-why" },
        { label: "Install", href: "#cli-install" },
        { label: "Command Map", href: "#cli-command-map" },
        { label: "convert Command", href: "#cli-convert" },
        { label: "generate Command", href: "#cli-generate" },
        { label: "Recipes", href: "#cli-recipes" },
      ]}
    >
      <div className="space-y-3" id="cli-overview">
        <p className="text-sm font-medium text-muted-foreground">Tooling</p>
        <h1 className="text-3xl font-semibold tracking-tight">CLI Commands</h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          <code>@gntrees/sql-builder-cli</code> ships with focused commands to
          speed up query migration and schema generation.
        </p>
      </div>

      <section className="space-y-3" id="cli-why">
        <h2 className="text-xl font-semibold">Why Use CLI</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <article className="rounded-xl border border-border bg-card/60 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Faster onboarding
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Convert existing SQL into builder code instead of rewriting by
              hand.
            </p>
          </article>
          <article className="rounded-xl border border-border bg-card/60 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Typed schema
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Generate schema objects directly from your database for stronger
              autocomplete and safer queries.
            </p>
          </article>
          <article className="rounded-xl border border-border bg-card/60 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Repeatable workflow
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Run the same command in CI or local scripts whenever schema or SQL
              changes.
            </p>
          </article>
        </div>
      </section>

      <section className="space-y-3" id="cli-install">
        <h2 className="text-xl font-semibold">Install</h2>
        <CodeBlock
          code={cliInstallCode}
          html={highlighted.cliInstall.light}
          darkHtml={highlighted.cliInstall.dark}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="cli-command-map">
        <h2 className="text-xl font-semibold">Command Map</h2>
        <p className="text-sm text-muted-foreground">
          The CLI currently provides two core commands plus help output.
        </p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-3 py-2 text-left font-medium">Command</th>
                <th className="px-3 py-2 text-left font-medium">Purpose</th>
                <th className="px-3 py-2 text-left font-medium">Key Flags</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/60">
                <td className="px-3 py-2 font-mono text-xs">convert</td>
                <td className="px-3 py-2 text-muted-foreground">Convert raw SQL string into SQL Builder code.</td>
                <td className="px-3 py-2 text-muted-foreground"><code>--sql</code>, <code>--sqlSchema</code>, <code>--dbSchema</code>, <code>--simplify-literal</code>, <code>--output</code></td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-3 py-2 font-mono text-xs">generate</td>
                <td className="px-3 py-2 text-muted-foreground">Generate typed DB schema file from a Postgres connection URL.</td>
                <td className="px-3 py-2 text-muted-foreground"><code>--url</code>, <code>--output</code></td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono text-xs">help</td>
                <td className="px-3 py-2 text-muted-foreground">Print usage information and command syntax.</td>
                <td className="px-3 py-2 text-muted-foreground"><code>--help</code>, <code>-h</code>, <code>help</code></td>
              </tr>
            </tbody>
          </table>
        </div>
        <CodeBlock
          code={cliHelpCode}
          html={highlighted.cliHelp.light}
          darkHtml={highlighted.cliHelp.dark}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="cli-convert">
        <h2 className="text-xl font-semibold">convert Command</h2>
        <p className="text-sm text-muted-foreground">
          Use <code>convert</code> when you already have SQL and want a fast jump
          to SQL Builder syntax.
        </p>
        <div className="rounded-xl border border-border bg-card/50 p-3 text-sm text-muted-foreground">
          <p>
            <strong>Required:</strong> <code>--sql</code>
          </p>
          <p>
            <strong>Optional:</strong> <code>--sqlSchema</code>,
            <code>--dbSchema</code>, <code>--simplify-literal</code>,
            <code>--output</code>
          </p>
          <p>
            Without <code>--output</code>, generated code is printed to stdout.
          </p>
        </div>
        <CodeBlock
          code={cliConvertCode}
          html={highlighted.cliConvert.light}
          darkHtml={highlighted.cliConvert.dark}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="cli-generate">
        <h2 className="text-xl font-semibold">generate Command</h2>
        <p className="text-sm text-muted-foreground">
          Use <code>generate</code> to introspect your database and create typed
          schema exports for DB Schema workflow.
        </p>
        <div className="rounded-xl border border-border bg-card/50 p-3 text-sm text-muted-foreground">
          <p>
            <strong>Required:</strong> <code>--url</code>
          </p>
          <p>
            <strong>Optional:</strong> <code>--output</code>
          </p>
          <p>
            If no output path is provided, CLI uses its default output strategy
            from the generator.
          </p>
        </div>
        <CodeBlock
          code={cliGenerateCode}
          html={highlighted.cliGenerate.light}
          darkHtml={highlighted.cliGenerate.dark}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="cli-recipes">
        <h2 className="text-xl font-semibold">Recipes</h2>
        <p className="text-sm text-muted-foreground">
          Two common outcomes after running CLI commands.
        </p>
        <div className="rounded-xl border border-border bg-card/50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Output from convert
          </p>
          <div className="mt-2">
            <CodeBlock
              code={cliRecipeQueryCode}
              html={highlighted.cliRecipeQuery.light}
              darkHtml={highlighted.cliRecipeQuery.dark}
            >
              <CodeBlockCopyButton />
            </CodeBlock>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card/50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Output from generate
          </p>
          <div className="mt-2">
            <CodeBlock
              code={cliRecipeSchemaCode}
              html={highlighted.cliRecipeSchema.light}
              darkHtml={highlighted.cliRecipeSchema.dark}
            >
              <CodeBlockCopyButton />
            </CodeBlock>
          </div>
        </div>
      </section>
    </DocsLayout>
  )
}
