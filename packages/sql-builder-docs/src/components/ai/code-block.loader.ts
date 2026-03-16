import { createServerFn } from "@tanstack/react-start"
import type { BundledLanguage, ShikiTransformer } from "shiki"

type HighlightedBlock = { light: string; dark: string }
type HighlightInput = {
  code: string
  language: BundledLanguage
  showLineNumbers?: boolean
}

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

const highlightCodeServer = createServerFn({ method: "POST" })
  .inputValidator((input: HighlightInput) => input)
  .handler(async ({ data }) => {
    const { code, language, showLineNumbers = false } = data
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
  },
)


export async function highlightCodeBlock(
  code: string,
  language: BundledLanguage,
  showLineNumbers = false,
): Promise<HighlightedBlock> {
  return await highlightCodeServer({ data: { code, language, showLineNumbers } })
}


export async function highlightSqlResult(
  sql: string,
  params?: {}[],
): Promise<{ html: string; darkHtml: string; params?: { value: {} }[] }> {
  const highlighted = await highlightCodeBlock(sql, "sql")
  const normalizedParams = params?.map((value) => ({ value }))
  return { html: highlighted.light, darkHtml: highlighted.dark, params: normalizedParams }
}
