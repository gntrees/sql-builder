import { CodeCopyButton } from "#/components/code-copy-button"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "#/components/ui/resizable"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu"
import { createFileRoute } from "@tanstack/react-router"
import CodeMirror from "@uiw/react-codemirror"
import { Check, ChevronsUpDown } from "lucide-react"
import { useState } from "react"

type DialectOption = {
  label: string
  value: "pg" | "mysql" | "mssql" | "sqlite"
}

const dialectOptions: DialectOption[] = [
  { label: "PostgreSQL", value: "pg" },
  { label: "MySQL", value: "mysql" },
  { label: "MSSQL", value: "mssql" },
  { label: "SQLite", value: "sqlite" },
]

export const Route = createFileRoute("/converter")({
  component: RouteComponent,
})

const starterSql = `SELECT users.id, users.email
FROM users
WHERE users.status = 'active'
ORDER BY users.created_at DESC
LIMIT 20;`

const emptyCode = `// Conversion output will appear here.`

function RouteComponent() {
  const [sqlInput, setSqlInput] = useState(starterSql)
  const [converted, setConverted] = useState(emptyCode)
  const [isConverting, setIsConverting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastRunSql, setLastRunSql] = useState(starterSql)
  const [dialect, setDialect] = useState<DialectOption>(dialectOptions[0])

  const handleConvert = async () => {
    setIsConverting(true)
    setError(null)
    setLastRunSql(sqlInput)
    try {
      if (dialect.value !== "pg") {
        setConverted(
          "// Dialect not supported yet. Switch to PostgreSQL to convert.",
        )
        return
      }
      ;(globalThis as { Module?: { locateFile?: (path: string) => string } })
        .Module = {
        locateFile: () => "/libpg-query.wasm",
      }
      const { convert } = await import("@gntrees/sql-builder-cli")
      const result = await convert(sqlInput)
      setConverted(result.formatted)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed")
      setConverted(emptyCode)
    } finally {
      setIsConverting(false)
    }
  }

  const handleReset = () => {
    setSqlInput(starterSql)
    setConverted(emptyCode)
    setError(null)
    setLastRunSql(starterSql)
  }

  // const sqlExtensions = useMemo(() => {
  //   const dialectMap = {
  //     pg: "PostgreSQL",
  //     mysql: "MySQL",
  //     mssql: "MSSQL",
  //     sqlite: "SQLite",
  //   }
  //   return [sqlLanguage({ dialect: dialectMap[dialect.value] })]
  // }, [dialect.value])

  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <div className="space-y-3" id="converter-overview">
          <p className="text-sm font-medium text-muted-foreground">Tools</p>
          <h1 className="text-3xl font-semibold tracking-tight">
            SQL to Query Builder Converter
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground">
            Paste SQL and convert it into the equivalent query builder chain.
            This uses <code>@gntrees/sql-builder-cli</code> under the hood.
          </p>
        </div>

        <ResizablePanelGroup className="min-h-[640px] w-full flex-col rounded-2xl border border-border bg-card shadow-sm lg:flex-row">
          <ResizablePanel
            defaultSize={50}
            minSize={30}
            className="flex flex-col gap-4 p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold">SQL Input</h2>
                <p className="text-sm text-muted-foreground">
                  {dialect.label} syntax selected. Use semicolons to separate
                  statements.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="inline-flex items-center justify-center rounded-md border border-border bg-background px-3 py-2 text-xs font-medium text-foreground shadow-xs transition hover:bg-muted"
                      type="button"
                    >
                      {dialect.label}
                      <ChevronsUpDown className="ml-2 size-3" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {dialectOptions.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        onSelect={() => {
                          setDialect(option)
                        }}
                      >
                        {option.label}
                        {option.value === dialect.value ? (
                          <Check className="ml-auto size-4" />
                        ) : null}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <button
                  className="inline-flex items-center justify-center rounded-md border border-border bg-background px-3 py-2 text-xs font-medium text-foreground shadow-xs transition hover:bg-muted"
                  onClick={handleReset}
                  type="button"
                >
                  Reset
                </button>
                <button
                  className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-xs transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
                  onClick={handleConvert}
                  type="button"
                  disabled={isConverting}
                >
                  {isConverting ? "Converting..." : "Convert"}
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-hidden rounded-xl border border-border bg-background shadow-sm">
              <CodeMirror
                value={sqlInput}
                height="100%"
                // extensions={sqlExtensions}
                onChange={(value: string) => setSqlInput(value)}
                theme="light"
                basicSetup={{
                  lineNumbers: true,
                  foldGutter: false,
                  highlightActiveLine: true,
                  highlightSelectionMatches: true,
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Last converted length: {lastRunSql.length} chars
            </p>
          </ResizablePanel>

          <ResizableHandle className="hidden lg:flex" withHandle />

          <ResizablePanel
            defaultSize={50}
            minSize={30}
            className="flex flex-col gap-4 border-t border-border p-5 lg:border-t-0"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold">Generated Builder</h2>
                <p className="text-sm text-muted-foreground">
                  Output uses <code>sqlBuilder()</code> chain with generated
                  calls.
                </p>
              </div>
              <CodeCopyButton value={converted} />
            </div>

            <div className="flex-1 overflow-hidden rounded-xl border border-border bg-background shadow-sm">
              <CodeMirror
                value={converted}
                height="100%"
                extensions={[]}
                editable={false}
                theme="light"
                basicSetup={{
                  lineNumbers: true,
                  foldGutter: false,
                  highlightActiveLine: false,
                  highlightSelectionMatches: false,
                }}
              />
            </div>
            {error ? (
              <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            ) : null}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </main>
  )
}
