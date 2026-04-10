import { createFileRoute } from "@tanstack/react-router"
import { DocsLayout } from "#/components/docs-layout"
import { CodeBlock, CodeBlockCopyButton } from "#/components/ai/code-block"
import { highlightCodeBlock } from "#/components/ai/code-block.loader"

export const Route = createFileRoute("/docs/pg/validation")({
  loader: async () => {
    const [
      validationInstall,
      builderValidation,
      schemaValidation,
      validationError,
      valibotExample,
      arkTypeExample,
    ] = await Promise.all([
      highlightCodeBlock(validationInstallCode, "bash"),
      highlightCodeBlock(builderValidationCode, "ts"),
      highlightCodeBlock(schemaValidationCode, "ts"),
      highlightCodeBlock(validationErrorCode, "ts"),
      highlightCodeBlock(valibotExampleCode, "ts"),
      highlightCodeBlock(arkTypeExampleCode, "ts"),
    ])

    return {
      validationInstall,
      builderValidation,
      schemaValidation,
      validationError,
      valibotExample,
      arkTypeExample,
    }
  },
  component: RouteComponent,
})

const validationInstallCode = `npm install zod
# optional alternatives (Standard Schema compatible)
npm install valibot arktype @effect/schema`

const builderValidationCode = `import { z } from "zod"

const q = sqlBuilder()
  .setFormatParamHandler("pg")
  .setExecutionHandler(async () => [{ name: "John", age: 20 }])

const result = await q
  .select("*")
  .from(q.t("users"))
  .setValidation(
    z.array(
      z.object({
        name: z.string(),
        age: z.number(),
      }),
    ),
  )
  .execute({ requestId: "docs-1" })`

const schemaValidationCode = `import { z } from "zod"

const sch = sqlSchema().setQuery(
  "getMagma",
  sqlSchema()
    .set
    .query(q.select("*").from(q.t("users")))
    .validation(
      z.array(
        z.object({
          name: z.string(),
          age: z.number(),
        }),
      ),
    ),
)

const result = await sch.query("getMagma").execute({ requestId: "schema-1" })`

const validationErrorCode = `const qValidate = sqlBuilder()
  .setFormatParamHandler("pg")
  .setExecutionHandler(async () => [{ id: 10 }])

const builder = qValidate
  .select("*")
  .from(qValidate.t("users"))
  .setValidation(z.array(z.object({ id: z.string() })))

await builder.execute()
// throws when validation fails`

const valibotExampleCode = `import * as v from "valibot"

const usersSchema = v.array(
  v.object({
    name: v.string(),
    age: v.number(),
  }),
)

const result = await q
  .select("*")
  .from(q.t("users"))
  .setValidation(usersSchema)
  .execute()`

const arkTypeExampleCode = `import { type } from "arktype"

const usersSchema = type("{ name: string, age: number }[]")

const result = await q
  .select("*")
  .from(q.t("users"))
  .setValidation(usersSchema)
  .execute()`

function RouteComponent() {
  const highlighted = Route.useLoaderData()

  if (!highlighted) {
    return null
  }

  return (
    <DocsLayout
      breadcrumbHref="/docs/pg"
      pageLabel="Validation"
      toc={[
        { label: "Overview", href: "#validation-overview" },
        { label: "Why It Exists", href: "#validation-benefits" },
        { label: "Install Validator", href: "#validation-install" },
        { label: "Supported Libraries", href: "#validation-libraries" },
        { label: "QueryBuilder Validation", href: "#validation-builder" },
        { label: "sqlSchema Validation", href: "#validation-schema" },
        { label: "Validation Errors", href: "#validation-errors" },
      ]}
    >
      <div className="space-y-3" id="validation-overview">
        <p className="text-sm font-medium text-muted-foreground">Validation</p>
        <h1 className="text-3xl font-semibold tracking-tight">Validation</h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          Attach a Standard Schema validator (for example, Zod) to validate
          execution result after SQL runs.
        </p>
      </div>

      <section className="space-y-3" id="validation-benefits">
        <h2 className="text-xl font-semibold">Why It Exists</h2>
        <p className="text-sm text-muted-foreground">
          Validation adds a runtime contract for query results. SQL can be
          syntactically correct but still return unexpected shapes. Validation
          catches that mismatch before data flows deeper into your app.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          <article className="rounded-xl border border-border bg-card/60 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Runtime safety
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Ensure row shape is exactly what your service layer expects.
            </p>
          </article>
          <article className="rounded-xl border border-border bg-card/60 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Better debugging
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Validation failures make data contract breaks obvious and fast to
              diagnose.
            </p>
          </article>
          <article className="rounded-xl border border-border bg-card/60 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Shared contract
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Same schema can represent both expected runtime data and docs for
              your team.
            </p>
          </article>
        </div>
      </section>

      <section className="space-y-3" id="validation-install">
        <h2 className="text-xl font-semibold">Install Validator</h2>
        <p className="text-sm text-muted-foreground">
          Pick any validator compatible with Standard Schema.
        </p>
        <CodeBlock
          code={validationInstallCode}
          html={highlighted.validationInstall.light}
          darkHtml={highlighted.validationInstall.dark}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="validation-libraries">
        <h2 className="text-xl font-semibold">Supported Libraries</h2>
        <p className="text-sm text-muted-foreground">
          This project accepts Standard Schema implementations (see{" "}
          <code>standardschema.dev</code>). In practice, any library exposing
          the Standard Schema contract can be used.
        </p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-3 py-2 text-left font-medium">Library</th>
                <th className="px-3 py-2 text-left font-medium">Status</th>
                <th className="px-3 py-2 text-left font-medium">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/60">
                <td className="px-3 py-2 font-medium">Zod</td>
                <td className="px-3 py-2 text-muted-foreground">Recommended</td>
                <td className="px-3 py-2 text-muted-foreground">Used in repository tests and examples.</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-3 py-2 font-medium">Valibot</td>
                <td className="px-3 py-2 text-muted-foreground">Supported via Standard Schema</td>
                <td className="px-3 py-2 text-muted-foreground">Good option for lightweight, composable validation.</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">ArkType</td>
                <td className="px-3 py-2 text-muted-foreground">Supported via Standard Schema</td>
                <td className="px-3 py-2 text-muted-foreground">Great for expressive type-first schema declarations.</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">Effect Schema</td>
                <td className="px-3 py-2 text-muted-foreground">Supported via Standard Schema</td>
                <td className="px-3 py-2 text-muted-foreground">Strong option if you already use Effect in your app architecture.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3" id="validation-builder">
        <h2 className="text-xl font-semibold">QueryBuilder Validation</h2>
        <p className="text-sm text-muted-foreground">
          Call <code>setValidation</code> on a query. Runtime <code>meta</code>
          passed to <code>execute(meta)</code> is forwarded to the execution
          handler.
        </p>
        <CodeBlock
          code={builderValidationCode}
          html={highlighted.builderValidation.light}
          darkHtml={highlighted.builderValidation.dark}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
        <div className="rounded-xl border border-border bg-card/50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Alternative example: Valibot
          </p>
          <div className="mt-2">
            <CodeBlock
              code={valibotExampleCode}
              html={highlighted.valibotExample.light}
              darkHtml={highlighted.valibotExample.dark}
            >
              <CodeBlockCopyButton />
            </CodeBlock>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card/50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Alternative example: ArkType
          </p>
          <div className="mt-2">
            <CodeBlock
              code={arkTypeExampleCode}
              html={highlighted.arkTypeExample.light}
              darkHtml={highlighted.arkTypeExample.dark}
            >
              <CodeBlockCopyButton />
            </CodeBlock>
          </div>
        </div>
      </section>

      <section className="space-y-3" id="validation-schema">
        <h2 className="text-xl font-semibold">sqlSchema Validation</h2>
        <p className="text-sm text-muted-foreground">
          You can also define validator once at schema query registration with
          <code>validation(...)</code>.
        </p>
        <CodeBlock
          code={schemaValidationCode}
          html={highlighted.schemaValidation.light}
          darkHtml={highlighted.schemaValidation.dark}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-3" id="validation-errors">
        <h2 className="text-xl font-semibold">Validation Errors</h2>
        <p className="text-sm text-muted-foreground">
          If execution result does not satisfy the validation schema, execution
          throws an error.
        </p>
        <CodeBlock
          code={validationErrorCode}
          html={highlighted.validationError.light}
          darkHtml={highlighted.validationError.dark}
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>
    </DocsLayout>
  )
}
