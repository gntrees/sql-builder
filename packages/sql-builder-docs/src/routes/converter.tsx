import { CodeCopyButton } from "#/components/code-copy-button";
import { Logo } from "#/components/logo";
import { Button } from "#/components/ui/button";
import { Label } from "#/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "#/components/ui/tooltip";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "#/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/ui/tabs";
import { sqlSamples } from "@gntrees/sql-builder-cli/tests/fixtures/sql-samples";
import { javascript } from '@codemirror/lang-javascript';
import { sql } from "@codemirror/lang-sql";
import { createFileRoute } from "@tanstack/react-router";
import { Check, ChevronsUpDown, Sparkles } from "lucide-react";
import { lazy, Suspense, useMemo, useState } from "react";
import parserEstree from "prettier/plugins/estree";
import parserTypescript from "prettier/plugins/typescript";
import prettier from "prettier/standalone";


type DialectOption = {
  label: string
  value: "pg" | "mysql" | "mssql" | "sqlite"
}

type ExampleSelection = {
  category: string
  index: number
}

type ExampleCategory = {
  category: string
  label: string
  examples: Array<{
    index: number
    sql: string
    label: string
  }>
}

const formatCategoryLabel = (category: string) => {
  return category
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

const formatSqlOverview = (sqlText: string, maxLength = 96) => {
  const compactSql = sqlText.replace(/\s+/g, " ").trim()
  if (compactSql.length <= maxLength) {
    return compactSql
  }

  return `${compactSql.slice(0, maxLength).trimEnd()}...`
}

const extractQueryExpression = (source: string) => {
  const match = source.match(/const query = ([\s\S]*?)\n\nexport default query;/)
  return match?.[1]?.trim() ?? null
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
const emptySqlResult = `-- SQL result will appear here.`
const emptyDbSchemaAssumption = `// DB schema assumption (db.schema.ts) will appear here when Use DB Schema is enabled.`
const emptyQueryBuilderSchema = `// Query Builder Schema (.getSchema()) will appear here.`

type GeneratedSqlResult = {
  sql: string
  sqlWithParameters: string | null
  params: unknown[]
  queryBuilderSchema: string
}

const LazyCodeMirror = lazy(() => import("@uiw/react-codemirror"))

const toExecutableDbSchemaSource = (source: string) => {
  return source
    .replace(/^import\s+\{[\s\S]*?\}\s+from\s+"@gntrees\/sql-builder\/pg";\s*/m, "")
    .replace(/^\s*public\s+[A-Za-z_][A-Za-z0-9_]*\s*:\s*[^;]+;\s*$/gm, "")
    .replace(/constructor\(([^)]*)\)/g, (_, params: string) => {
      const cleaned = params
        .replace(/\bpublic\s+/g, "")
        .replace(/:\s*[^,)]+/g, "")
        .replace(/\s+/g, " ")
        .trim()
      return `constructor(${cleaned})`
    })
    .replace(/\bexport\s+/g, "")
}

function EditorLoadingState() {
  return (
    <div className="flex h-full items-center justify-center bg-muted/20 text-sm text-muted-foreground">
      Loading editor...
    </div>
  )
}

function RouteComponent() {
  const [sqlInput, setSqlInput] = useState(starterSql)
  const [converted, setConverted] = useState(emptyCode)
  const [generatedSql, setGeneratedSql] = useState(emptySqlResult)
  const [generatedSqlWithParameters, setGeneratedSqlWithParameters] = useState<string | null>(
    null,
  )
  const [generatedSqlParams, setGeneratedSqlParams] = useState<unknown[] | null>(
    null,
  )
  const [dbSchemaAssumption, setDbSchemaAssumption] = useState(
    emptyDbSchemaAssumption,
  )
  const [queryBuilderSchema, setQueryBuilderSchema] = useState(
    emptyQueryBuilderSchema,
  )
  const [isConverting, setIsConverting] = useState(false)
  const [isPrettifyingInput, setIsPrettifyingInput] = useState(false)
  const [isPrettifyingOutput, setIsPrettifyingOutput] = useState(false)
  const [isPrettifyingSqlResult, setIsPrettifyingSqlResult] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dialect, setDialect] = useState<DialectOption>(dialectOptions[0])
  const [useSqlSchema, setUseSqlSchema] = useState(false)
  const [useDbSchema, setUseDbSchema] = useState(true)
  const [showSqlWithParameters, setShowSqlWithParameters] = useState(true)
  const [selectedExample, setSelectedExample] = useState<ExampleSelection | null>(null)

  const exampleCategories = useMemo<ExampleCategory[]>(() => {
    return Object.entries(sqlSamples)
      .map(([category, examples]) => ({
        category,
        label: formatCategoryLabel(category),
        examples: examples.map((sqlText: string, index: number) => ({
          index,
          sql: sqlText,
          label: `Sample ${index + 1}`,
        })),
      }))
      .sort((a, b) => a.label.localeCompare(b.label))
  }, [])

  const selectedExampleLabel = selectedExample
    ? `${formatCategoryLabel(selectedExample.category)} / Sample ${selectedExample.index + 1}`
    : "Choose Example"

  const displayedGeneratedSql = showSqlWithParameters
    && generatedSqlWithParameters
    ? generatedSqlWithParameters
    : generatedSql

  const formatSqlForTextarea = async (input: string) => {
    try {
      const sqlPluginModule = await import("prettier-plugin-sql")
      const sqlPlugin = sqlPluginModule.default ?? sqlPluginModule
      const formatted = await prettier.format(input, {
        parser: "sql",
        plugins: [sqlPlugin],
      })
      return formatted.trim()
    } catch {
      return input
    }
  }

  const generateSqlResultFromBuilder = async (
    source: string,
    dbSchemaSource?: string,
  ): Promise<GeneratedSqlResult> => {
    const queryExpression = extractQueryExpression(source)
    if (!queryExpression) {
      return {
        sql: "-- SQL result unavailable for this output format.",
        sqlWithParameters: null,
        params: [],
        queryBuilderSchema: emptyQueryBuilderSchema,
      }
    }

    try {
      const { sqlBuilder } = await import("@gntrees/sql-builder/pg/builder")
      const { ColumnSchema, DBSchema, TableSchema } = await import(
        "@gntrees/sql-builder/pg/builder"
      )
      const normalizedDbSchema = dbSchemaSource
        ? toExecutableDbSchemaSource(dbSchemaSource)
        : ""
      const buildQuery = new Function(
        "sqlBuilder",
        "ColumnSchema",
        "DBSchema",
        "TableSchema",
        `${normalizedDbSchema}
const q = sqlBuilder();
const query = ${queryExpression};
return query;`,
      )
      const query = buildQuery(sqlBuilder, ColumnSchema, DBSchema, TableSchema)


      if (!query || typeof query.getSql !== "function") {
        return {
          sql: "-- Failed to generate SQL result.",
          sqlWithParameters: null,
          params: [],
          queryBuilderSchema: emptyQueryBuilderSchema,
        }
      }

      const rawSql = query.getSql()
      const rawSqlWithParameters = typeof query.getSqlWithParameters === "function"
        ? query.getSqlWithParameters()
        : null
      const params = typeof query.getSqlParameters === "function"
        ? query.getSqlParameters()
        : []
      const rawQueryBuilderSchema = typeof query.getSchema === "function"
        ? query.getSchema()
        : null
      const formattedQueryBuilderSchema = rawQueryBuilderSchema === null
        ? emptyQueryBuilderSchema
        : JSON.stringify(rawQueryBuilderSchema, null, 2)

      return {
        sql: await formatSqlForTextarea(rawSql),
        sqlWithParameters:
          typeof rawSqlWithParameters === "string"
            ? await formatSqlForTextarea(rawSqlWithParameters)
            : null,
        params: Array.isArray(params) ? params : [],
        queryBuilderSchema: formattedQueryBuilderSchema,
      }
    } catch {
      return {
        sql: "-- Failed to generate SQL result.",
        sqlWithParameters: null,
        params: [],
        queryBuilderSchema: emptyQueryBuilderSchema,
      }
    }
  }

  const handlePrettifyInput = async () => {
    setIsPrettifyingInput(true)
    try {
      const formattedSql = await formatSqlForTextarea(sqlInput)
      setSqlInput(formattedSql)
    } finally {
      setIsPrettifyingInput(false)
    }
  }

  const handlePrettifyOutput = async () => {
    setIsPrettifyingOutput(true)
    try {
      const formatted = await prettier.format(converted, {
        parser: "typescript",
        plugins: [parserTypescript, parserEstree],
      })
      setConverted(formatted)

      if (generatedSql !== emptySqlResult) {
        const formattedSqlResult = await formatSqlForTextarea(generatedSql)
        setGeneratedSql(formattedSqlResult)
      }
    } catch {
      const formattedSql = await formatSqlForTextarea(converted)
      setConverted(formattedSql)

      if (generatedSql !== emptySqlResult) {
        const formattedSqlResult = await formatSqlForTextarea(generatedSql)
        setGeneratedSql(formattedSqlResult)
      }
    } finally {
      setIsPrettifyingOutput(false)
    }
  }

  const handlePrettifySqlResult = async () => {
    if (displayedGeneratedSql === emptySqlResult) {
      return
    }

    setIsPrettifyingSqlResult(true)
    try {
      const formattedSqlResult = await formatSqlForTextarea(displayedGeneratedSql)
      if (showSqlWithParameters && generatedSqlWithParameters) {
        setGeneratedSqlWithParameters(formattedSqlResult)
      } else {
        setGeneratedSql(formattedSqlResult)
      }
    } finally {
      setIsPrettifyingSqlResult(false)
    }
  }

  const handleConvert = async () => {
    setIsConverting(true)
    setError(null)
    try {
      if (dialect.value !== "pg") {
        setConverted(
          "// Dialect not supported yet. Switch to PostgreSQL to convert.",
        )
        setQueryBuilderSchema(emptyQueryBuilderSchema)
        return
      }
      // ;(globalThis as { Module?: { locateFile?: (path: string) => string } })
      //   .Module = {
      //   locateFile: () => "/libpg-query.wasm",
      // }
      const { convert } = await import("@gntrees/sql-builder-cli/src/convert")
      const result = await convert(sqlInput, {
        sqlSchema: useSqlSchema,
        dbSchema: useDbSchema,
      })
      setConverted(result.formatted)
      setDbSchemaAssumption(result.dbSchemaAssumption ?? emptyDbSchemaAssumption)

      const sqlResultSource = useSqlSchema
        ? await convert(sqlInput, {
          sqlSchema: false,
          dbSchema: useDbSchema,
        })
        : result

      const sqlResult = await generateSqlResultFromBuilder(
        sqlResultSource.formatted,
        sqlResultSource.dbSchemaAssumption,
      )
      setGeneratedSql(sqlResult.sql)
      setGeneratedSqlWithParameters(sqlResult.sqlWithParameters)
      setGeneratedSqlParams(sqlResult.params)
      setQueryBuilderSchema(sqlResult.queryBuilderSchema)
      if (!sqlResult.sqlWithParameters) {
        setShowSqlWithParameters(false)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed")
      setConverted(emptyCode)
      setGeneratedSql(emptySqlResult)
      setGeneratedSqlWithParameters(null)
      setGeneratedSqlParams(null)
      setDbSchemaAssumption(emptyDbSchemaAssumption)
      setQueryBuilderSchema(emptyQueryBuilderSchema)
      setShowSqlWithParameters(true)
    } finally {
      setIsConverting(false)
    }
  }

  const handleReset = () => {
    setSqlInput(starterSql)
    setConverted(emptyCode)
    setGeneratedSql(emptySqlResult)
    setGeneratedSqlWithParameters(null)
    setGeneratedSqlParams(null)
    setDbSchemaAssumption(emptyDbSchemaAssumption)
    setQueryBuilderSchema(emptyQueryBuilderSchema)
    setError(null)
    setUseSqlSchema(false)
    setUseDbSchema(true)
    setSelectedExample(null)
    setShowSqlWithParameters(true)
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
    <main className="min-h-screen bg-background px-4 pb-8 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="relative flex w-full items-center gap-10 py-6">
          <Logo />
          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a href="/docs" className="transition hover:text-foreground">
              Docs
            </a>
            <a href="/converter" className="transition hover:text-foreground">
              Converter
            </a>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button asChild variant="outline" size="icon">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.271.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.58 9.58 0 012.504.336c1.909-1.296 2.748-1.026 2.748-1.026.546 1.379.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            </Button>
          </div>
        </header>

        <div className="space-y-3" id="converter-overview">
          <h1 className="text-3xl font-semibold tracking-tight">
            SQL Converter
          </h1>
        </div>

        <ResizablePanelGroup className="min-h-[640px] w-full flex-col rounded-2xl border border-border bg-card shadow-sm lg:flex-row">
          <ResizablePanel
            defaultSize={"100%"}
            minSize={300}
            className="flex flex-col gap-4 p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* <div className="space-y-1">
                <h2 className="text-xl font-semibold">SQL Input</h2>
                <p className="text-sm text-muted-foreground">
                  {dialect.label} syntax aktif.
                </p>
              </div> */}
              <div className="flex flex-wrap items-center gap-2">
                <TooltipProvider delayDuration={150}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className="inline-flex max-w-[260px] items-center justify-center rounded-md border border-border bg-background px-3 py-2 text-xs font-medium text-foreground shadow-xs transition hover:bg-muted"
                        type="button"
                      >
                        <span className="truncate">{selectedExampleLabel}</span>
                        <ChevronsUpDown className="ml-2 size-3 shrink-0" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-72">
                      {exampleCategories.map((category) => (
                        <DropdownMenuSub key={category.category}>
                          <DropdownMenuSubTrigger>
                            {category.label}
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent className="max-h-80 overflow-y-auto">
                            {category.examples.map((example) => {
                              const isSelected = selectedExample?.category === category.category
                                && selectedExample.index === example.index

                              return (
                                <Tooltip key={`${category.category}-${example.index}`}>
                                  <TooltipTrigger asChild>
                                    <DropdownMenuItem
                                      onSelect={() => {
                                        void (async () => {
                                          const formattedSql = await formatSqlForTextarea(example.sql)
                                          setSelectedExample({
                                            category: category.category,
                                            index: example.index,
                                          })
                                          setSqlInput(formattedSql)
                                          setConverted(emptyCode)
                                          setGeneratedSql(emptySqlResult)
                                          setGeneratedSqlWithParameters(null)
                                    setGeneratedSqlParams(null)
                                    setDbSchemaAssumption(emptyDbSchemaAssumption)
                                    setQueryBuilderSchema(emptyQueryBuilderSchema)
                                    setError(null)
                                    setShowSqlWithParameters(true)
                                  })()
                                }}
                                    >
                                      <span className="truncate">{example.label}</span>
                                      {isSelected ? <Check className="ml-auto size-4" /> : null}
                                    </DropdownMenuItem>
                                  </TooltipTrigger>
                                  <TooltipContent side="right" className="max-w-sm px-3 py-2 text-[11px] leading-snug">
                                    {formatSqlOverview(example.sql, 220)}
                                  </TooltipContent>
                                </Tooltip>
                              )
                            })}
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TooltipProvider>
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
                  <DropdownMenuContent align="start">
                    {dialectOptions.map((option) => (
                      <DropdownMenuItem
                        disabled={option.value !== "pg"}
                        key={option.value}
                        onSelect={() => {
                          setDialect(option)
                        }}
                      >
                        {option.label + (option.value !== "pg" ? " (coming soon)" : "")}
                        {option.value === dialect.value ? (
                          <Check className="ml-auto size-4" />
                        ) : null}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex items-center gap-3 rounded-md border border-border bg-background px-3 py-2">
                  <div className="flex items-center gap-2">
                    <input
                      id="use-sql-schema"
                      type="checkbox"
                      className="size-4 rounded border-border"
                      checked={useSqlSchema}
                      onChange={(event) => setUseSqlSchema(event.target.checked)}
                    />
                    <Label htmlFor="use-sql-schema" className="text-xs font-medium">
                      Use Sql Schema
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      id="use-db-schema"
                      type="checkbox"
                      className="size-4 rounded border-border"
                      checked={useDbSchema}
                      onChange={(event) => setUseDbSchema(event.target.checked)}
                    />
                    <Label htmlFor="use-db-schema" className="text-xs font-medium">
                      Use DB Schema
                    </Label>
                  </div>
                </div>
                <button
                  className="inline-flex items-center justify-center rounded-md border border-border bg-background px-3 py-2 text-xs font-medium text-foreground shadow-xs transition hover:bg-muted"
                  onClick={handleReset}
                  type="button"
                >
                  Reset
                </button>
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  onClick={() => {
                    void handlePrettifyInput()
                  }}
                  disabled={isPrettifyingInput}
                  aria-label="Prettify SQL input"
                  title="Prettify"
                >
                  <Sparkles />
                </Button>
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
              <Suspense fallback={<EditorLoadingState />}>
                <LazyCodeMirror
                  className="h-full [&_.cm-editor]:h-full [&_.cm-scroller]:overflow-y-auto"
                  value={sqlInput}
                  height="100%"
                  extensions={[
                    sql(),
                  ]}
                  onChange={(value: string) => setSqlInput(value)}
                  theme="light"
                  basicSetup={{
                    lineNumbers: true,
                    foldGutter: false,
                    highlightActiveLine: true,
                    highlightSelectionMatches: true,
                  }}
                />
              </Suspense>
            </div>
            {/* <p className="text-xs text-muted-foreground">
              Last converted length: {lastRunSql.length} chars
            </p> */}
          </ResizablePanel>

          <ResizableHandle className="hidden lg:flex" withHandle />

          <ResizablePanel
            defaultSize={"100%"}
            minSize={300}
            className="flex flex-col gap-4 border-t border-border p-5 lg:border-t-0"
          >
            <Tabs defaultValue="results" className="flex-1 min-h-0">
              <TabsList>
                <TabsTrigger value="results">Results</TabsTrigger>
                <TabsTrigger value="db-schema">DB Schema</TabsTrigger>
              </TabsList>

              <TabsContent value="results" className="h-full min-h-0 space-y-4">
                <div className="flex flex-wrap items-center justify-end gap-3">
                  <CodeCopyButton value={converted} />
                  <Button
                    variant="outline"
                    size="icon"
                    type="button"
                    onClick={() => {
                      void handlePrettifyOutput()
                    }}
                    disabled={isPrettifyingOutput}
                    aria-label="Prettify output"
                    title="Prettify"
                  >
                    <Sparkles />
                  </Button>
                </div>

                <div className="flex-1 min-h-0 overflow-hidden rounded-xl border border-border bg-background shadow-sm">
                  <Suspense fallback={<EditorLoadingState />}>
                    <LazyCodeMirror
                      className="h-full [&_.cm-editor]:h-full [&_.cm-scroller]:overflow-y-auto"
                      value={converted}
                      height="100%"
                      extensions={[
                        javascript({ typescript: true }),
                      ]}
                      editable={false}
                      theme="light"
                      basicSetup={{
                        lineNumbers: true,
                        foldGutter: false,
                        highlightActiveLine: false,
                        highlightSelectionMatches: false,
                      }}
                    />
                  </Suspense>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Result SQL
                      </p>
                      <label className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground">
                        <input
                          type="checkbox"
                          className="size-3.5 rounded border-border"
                          checked={showSqlWithParameters}
                          onChange={(event) => {
                            setShowSqlWithParameters(event.target.checked)
                          }}
                          disabled={!generatedSqlWithParameters}
                        />
                        Sql With Parameters
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <CodeCopyButton value={displayedGeneratedSql} />
                      <Button
                        variant="outline"
                        size="icon"
                        type="button"
                        onClick={() => {
                          void handlePrettifySqlResult()
                        }}
                        disabled={isPrettifyingSqlResult || displayedGeneratedSql === emptySqlResult}
                        aria-label="Prettify SQL result"
                        title="Prettify SQL"
                      >
                        <Sparkles />
                      </Button>
                    </div>
                  </div>
                  <div className="h-48 overflow-hidden rounded-xl border border-border bg-background shadow-sm">
                    <Suspense fallback={<EditorLoadingState />}>
                      <LazyCodeMirror
                        className="h-full [&_.cm-editor]:h-full [&_.cm-scroller]:overflow-y-auto"
                        value={displayedGeneratedSql}
                        height="100%"
                        extensions={[sql()]}
                        editable={false}
                        theme="light"
                        basicSetup={{
                          lineNumbers: true,
                          foldGutter: false,
                          highlightActiveLine: false,
                          highlightSelectionMatches: false,
                        }}
                      />
                    </Suspense>
                  </div>
                </div>

                {generatedSqlParams && generatedSqlParams.length > 0 ? (
                  <div className="space-y-2 border-t border-border/60 pt-3">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Parameters
                    </p>
                    <pre className="max-h-48 overflow-auto whitespace-pre-wrap break-words rounded-md border border-border bg-background p-3 text-xs text-foreground">
                      {JSON.stringify(generatedSqlParams, null, 2)}
                    </pre>
                  </div>
                ) : null}

                <div className="space-y-2 border-t border-border/60 pt-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Query Builder Schema (.getSchema())
                    </p>
                    <CodeCopyButton value={queryBuilderSchema} />
                  </div>
                  <pre className="max-h-48 overflow-auto whitespace-pre-wrap break-words rounded-md border border-border bg-background p-3 text-xs text-foreground">
                    {queryBuilderSchema}
                  </pre>
                </div>
              </TabsContent>

              <TabsContent value="db-schema" className="h-full min-h-0 space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    DB Schema Assumption (db.schema.ts)
                  </p>
                  <CodeCopyButton value={dbSchemaAssumption} />
                </div>
                <div className="flex-1 min-h-0 overflow-hidden rounded-xl border border-border bg-background shadow-sm">
                  <Suspense fallback={<EditorLoadingState />}>
                    <LazyCodeMirror
                      className="h-full [&_.cm-editor]:h-full [&_.cm-scroller]:overflow-y-auto"
                      value={dbSchemaAssumption}
                      height="100%"
                      extensions={[
                        javascript({ typescript: true }),
                      ]}
                      editable={false}
                      theme="light"
                      basicSetup={{
                        lineNumbers: true,
                        foldGutter: false,
                        highlightActiveLine: false,
                        highlightSelectionMatches: false,
                      }}
                    />
                  </Suspense>
                </div>
              </TabsContent>
            </Tabs>
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
