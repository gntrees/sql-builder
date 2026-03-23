declare module "@gntrees/sql-builder-cli" {
  export type ConvertOptions = {
    formatParamHandler?: string
    execHandler?: string
    testName?: string
    schema?: boolean
  }

  export type FunctionListType = {
    name: string
    arguments: {}[]
    paramType: string
  }

  export type ConvertResult = {
    code: string
    formatted: string
    functionList: FunctionListType[]
    options: ConvertOptions
  }

  export function convert(
    sql: string,
    options?: ConvertOptions,
  ): Promise<ConvertResult>
}
