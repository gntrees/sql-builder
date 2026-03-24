"use client"

import { CheckIcon, CopyIcon } from "lucide-react"
import {
  type ComponentProps,
  createContext,
  type HTMLAttributes,
  useContext,
  useEffect,
  useState,
} from "react"
import { cn } from "../../lib/utils"
import { highlightCodeBlock } from "./code-block.loader"

type CodeBlockProps = HTMLAttributes<HTMLDivElement> & {
  code: string
  html: string
  darkHtml: string
  sqlResult?: {
    code?: string
  }
}

interface CodeBlockContextType {
  code: string
}

const CodeBlockContext = createContext<CodeBlockContextType>({
  code: "",
})

const extractQueryBuildingPart = (source: string) => {
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
const { sqlBuilder } = await import("@gntrees/sql-builder/pg/builder")
const run = async (queryBuildingPart: string) => {    
  const functionBody = `const q = sqlBuilder();\n${queryBuildingPart}\nreturn query;`
  const func = new Function("sqlBuilder", functionBody)
  const query = func(sqlBuilder)

  if (!query || typeof query.getSql !== "function") {
    throw new Error("Query builder returned no SQL")
  }

  const sql = query.getSql()
  
  const params = typeof query.getParameters === "function" ? query.getParameters() : []
  const highlighted = await highlightCodeBlock(sql, "sql")
  return { highlighted, params}
}
export const CodeBlock = ({
  code,
  html,
  darkHtml,
  sqlResult,
  className,
  children,
  ...props
}: CodeBlockProps) => {
  const [isResultOpen, setIsResultOpen] = useState(false)
  const [resultHtml, setResultHtml] = useState<string | null>(null)
  const [resultDarkHtml, setResultDarkHtml] = useState<string | null>(null)
  const [resultParams, setResultParams] = useState<unknown[] | null>(null)
  const [isResultLoading, setIsResultLoading] = useState(false)
  const [resultError, setResultError] = useState<string | null>(null)
  const hasResult = Boolean(sqlResult)

  useEffect(() => {
    if (!isResultOpen || !sqlResult || resultHtml || isResultLoading) {
      return
    }
    let isActive = true
    const source = sqlResult.code ?? code
    const queryBuildingPart = extractQueryBuildingPart(source)

    if (!queryBuildingPart) {
      setResultError("Query builder not found")
      return
    }

    setIsResultLoading(true)
    setResultError(null)



    run(queryBuildingPart)
      .then((result) => {
        if (!isActive || !result) {
          return
        }
        setResultHtml(result.highlighted.light)
        setResultDarkHtml(result.highlighted.dark)
        setResultParams(result.params)
      })
      .catch((error) => {
        if (!isActive) {
          return
        }
        setResultError(error instanceof Error ? error.message : "Failed to load")
      })
      .finally(() => {
        if (!isActive) {
          return
        }
        setIsResultLoading(false)
      })

    return () => {
      isActive = false
    }
  }, [isResultOpen])

  return (
    <CodeBlockContext.Provider value={{ code }}>
      <div
        className={cn(
          "group relative w-full overflow-hidden rounded-md border bg-background text-foreground",
          className,
        )}
        {...props}
      >
        <div className="relative">
          <div
            className="overflow-auto dark:hidden [&>pre]:m-0 [&>pre]:bg-background! [&>pre]:p-4 [&>pre]:text-foreground! [&>pre]:whitespace-pre-wrap [&>pre]:break-words"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <div
            className="hidden overflow-auto dark:block [&>pre]:m-0 [&>pre]:bg-background! [&>pre]:p-4 [&>pre]:text-foreground! [&>pre]:whitespace-pre-wrap [&>pre]:break-words"
            dangerouslySetInnerHTML={{ __html: darkHtml }}
          />
          {(children || hasResult) && (
            <div className="absolute top-2 right-2 flex flex-row items-end gap-2">
              {hasResult && (
                <button
                className="inline-flex items-center justify-center rounded-md border border-border bg-background px-3 py-2 text-xs font-medium text-foreground shadow-xs transition hover:bg-muted"
                onClick={() => setIsResultOpen((current) => !current)}
                type="button"
                >
                  {isResultOpen ? "Hide Result" : "Show Result"}
                </button>
              )}
              {children}
            </div>
          )}
        </div>
        {hasResult && isResultOpen && (
          <div className="border-t border-border bg-muted/30 px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              SQL Result
            </p>
            <div className="mt-2">
              {isResultLoading && (
                <p className="text-xs text-muted-foreground">Loading SQL result...</p>
              )}
              {resultError && (
                <p className="text-xs text-destructive">{resultError}</p>
              )}
              {!isResultLoading && !resultError && (
                <>
                  <div
                    className="overflow-auto dark:hidden [&>pre]:m-0 [&>pre]:bg-transparent! [&>pre]:p-0 [&>pre]:text-foreground! [&>pre]:whitespace-pre-wrap [&>pre]:break-words"
                    dangerouslySetInnerHTML={{ __html: resultHtml ?? "" }}
                  />
                  <div
                    className="hidden overflow-auto dark:block [&>pre]:m-0 [&>pre]:bg-transparent! [&>pre]:p-0 [&>pre]:text-foreground! [&>pre]:whitespace-pre-wrap [&>pre]:break-words"
                    dangerouslySetInnerHTML={{ __html: resultDarkHtml ?? "" }}
                  />
                </>
              )}
            </div>
            {resultParams && resultParams.length > 0 && (
              <div className="mt-3 border-t border-border/60 pt-3">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Parameters
                </p>
                <pre className="mt-2 whitespace-pre-wrap break-words text-xs text-foreground">
                  {JSON.stringify(
                    resultParams,
                    null,
                    2,
                  )}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </CodeBlockContext.Provider>
  )
}

export type CodeBlockCopyButtonProps = ComponentProps<"button"> & {
  onCopy?: () => void
  onError?: (error: Error) => void
  timeout?: number
}

export const CodeBlockCopyButton = ({
  onCopy,
  onError,
  timeout = 2000,
  children,
  className,
  ...props
}: CodeBlockCopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false)
  const { code } = useContext(CodeBlockContext)

  const copyToClipboard = async () => {
    if (typeof window === "undefined" || !navigator?.clipboard?.writeText) {
      onError?.(new Error("Clipboard API not available"))
      return
    }

    try {
      await navigator.clipboard.writeText(code)
      setIsCopied(true)
      onCopy?.()
      setTimeout(() => setIsCopied(false), timeout)
    } catch (error) {
      onError?.(error as Error)
    }
  }

  const Icon = isCopied ? CheckIcon : CopyIcon

  return (
    <button
      className={cn("inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-foreground shadow-xs transition hover:bg-muted", className)}
      onClick={copyToClipboard}
      type="button"
      {...props}
    >
      {children ?? <Icon size={14} />}
    </button>
  )
}
