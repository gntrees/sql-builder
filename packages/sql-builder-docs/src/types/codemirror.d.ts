declare module "@uiw/react-codemirror" {
  import type { Extension } from "@codemirror/state"
  import type { ViewUpdate } from "@codemirror/view"
  import type { ReactNode } from "react"

  export interface ReactCodeMirrorProps {
    value?: string
    height?: string
    width?: string
    extensions?: Extension[]
    editable?: boolean
    theme?: "light" | "dark" | string
    basicSetup?: unknown
    onChange?: (value: string, viewUpdate: ViewUpdate) => void
    className?: string
    placeholder?: string
    autoFocus?: boolean
    children?: ReactNode
  }

  export default function CodeMirror(
    props: ReactCodeMirrorProps,
  ): JSX.Element
}

declare module "@codemirror/lang-sql" {
  import type { Extension } from "@codemirror/state"

  export type SQLDialect = "PostgreSQL" | string

  export function sql(options?: { dialect?: SQLDialect }): Extension

  export const PostgreSQL: SQLDialect
  export const MySQL: SQLDialect
  export const MSSQL: SQLDialect
  export const SQLite: SQLDialect
}
