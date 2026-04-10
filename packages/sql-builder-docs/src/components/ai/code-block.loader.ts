import type { BundledLanguage, ShikiTransformer } from "shiki"

type HighlightedBlock = { light: string; dark: string }
type QueryLike = {
  getSql: () => string
  getSqlParameters?: () => unknown[]
}
type QueryWrapper = { query: QueryLike }

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor as new (
  ...args: string[]
) => (...args: unknown[]) => Promise<unknown>

const lineNumberTransformer: ShikiTransformer = {
  name: "line-numbers",
  line(node, line) {
    node.children.unshift({
      type: "element",
      tagName: "span",
      properties: {
        className: [
          "inline-block",
          // "min-w-10",
          "mr-4",
          "text-right",
          "select-none",
          "text-muted-foreground",
        ],
      },
      children: [{ type: "text", value: String(line) }],
    })
  },
}

export async function highlightCodeBlock(
  code: string,
  language: BundledLanguage,
  showLineNumbers = false,
): Promise<HighlightedBlock> {
  const { codeToHtml } = await import("shiki")
  const transformers: ShikiTransformer[] = showLineNumbers ? [lineNumberTransformer] : []

  const [light, dark] = await Promise.all([
    codeToHtml(code, {
      lang: language,
      theme: "one-light",
      transformers,
    }),
    codeToHtml(code, {
      lang: language,
      theme: "one-dark-pro",
      transformers,
    }),
  ])

  return { light, dark }
}


export async function highlightSqlResult(
  sql: string,
  params?: unknown[],
): Promise<{ html: string; darkHtml: string; params?: { value: unknown }[] }> {
  const highlighted = await highlightCodeBlock(sql, "sql")
  const normalizedParams = params?.map((value) => ({ value }))
  return { html: highlighted.light, darkHtml: highlighted.dark, params: normalizedParams }
}

function extractQueryBuildingPart(source: string) {
  const lines = source.split("\n")
  let queryBuildingPart = ""
  let inQueryBuilding = false

  for (const line of lines) {
    const trimmedLine = line.trim()
    if (!inQueryBuilding && /^const\s+query\s*=/.test(trimmedLine)) {
      inQueryBuilding = true
    }

    if (!inQueryBuilding) {
      continue
    }

    if (
      (trimmedLine.startsWith("query.") && !/^const\s+query\s*=/.test(trimmedLine)) ||
      (trimmedLine.startsWith("const ") && !/^const\s+query\s*=/.test(trimmedLine)) ||
      trimmedLine.startsWith("return ")
    ) {
      break
    }

    queryBuildingPart += line + "\n"
  }

  return queryBuildingPart.trim()
}

export async function buildSqlResultFromCode(source: string) {
  const queryBuildingPart = extractQueryBuildingPart(source)

  if (!queryBuildingPart) {
    throw new Error("Query builder not found")
  }

  const { sqlBuilder } = await import("@gntrees/sql-builder/pg/builder")
  const functionBody = `const q = sqlBuilder();\n${queryBuildingPart}\nreturn { query };`
  const func = new AsyncFunction("sqlBuilder", functionBody) as (
    sqlBuilderFn: typeof sqlBuilder,
  ) => Promise<QueryWrapper>
  const { query } = await func(sqlBuilder)

  if (!query || typeof query.getSql !== "function") {
    throw new Error("Query builder returned no SQL")
  }

  const sql = query.getSql()
  const params = typeof query.getSqlParameters === "function" ? query.getSqlParameters() : []
  const highlighted = await highlightSqlResult(sql, params)

  return {
    code: sql,
    ...highlighted,
  }
}
