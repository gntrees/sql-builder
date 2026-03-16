"use client"

import { CheckIcon, CopyIcon } from "lucide-react"
import { useCallback, useState } from "react"
import { cn } from "#/lib/utils"

type CodeCopyButtonProps = {
  value: string
  className?: string
}

export function CodeCopyButton({ value, className }: CodeCopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    if (typeof window === "undefined" || !navigator?.clipboard?.writeText) {
      return
    }

    await navigator.clipboard.writeText(value)
    setIsCopied(true)
    window.setTimeout(() => setIsCopied(false), 1600)
  }, [value])

  const Icon = isCopied ? CheckIcon : CopyIcon

  return (
    <button
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground shadow-xs transition hover:bg-muted",
        className,
      )}
      onClick={handleCopy}
      type="button"
    >
      <Icon size={14} />
    </button>
  )
}
