"use client"

import { CheckIcon, CopyIcon } from "lucide-react"
import {
  type ComponentProps,
  createContext,
  type HTMLAttributes,
  useContext,
  useState,
} from "react"
import { cn } from "../../lib/utils"

type CodeBlockProps = HTMLAttributes<HTMLDivElement> & {
  code: string
  html: string
  darkHtml: string
  sqlResult?: {
    code: string
    html: string
    darkHtml: string
    params?: { value: unknown }[]
  }
}

interface CodeBlockContextType {
  code: string
}

const CodeBlockContext = createContext<CodeBlockContextType>({
  code: "",
})

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
  const hasResult = Boolean(sqlResult)

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
              <div
                className="overflow-auto dark:hidden [&>pre]:m-0 [&>pre]:bg-transparent! [&>pre]:p-0 [&>pre]:text-foreground! [&>pre]:whitespace-pre-wrap [&>pre]:break-words"
                dangerouslySetInnerHTML={{ __html: sqlResult?.html ?? "" }}
              />
              <div
                className="hidden overflow-auto dark:block [&>pre]:m-0 [&>pre]:bg-transparent! [&>pre]:p-0 [&>pre]:text-foreground! [&>pre]:whitespace-pre-wrap [&>pre]:break-words"
                dangerouslySetInnerHTML={{ __html: sqlResult?.darkHtml ?? "" }}
              />
            </div>
            {sqlResult?.params && sqlResult.params.length > 0 && (
              <div className="mt-3 border-t border-border/60 pt-3">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Parameters
                </p>
                <pre className="mt-2 whitespace-pre-wrap break-words text-xs text-foreground">
                  {JSON.stringify(
                    sqlResult.params,
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
