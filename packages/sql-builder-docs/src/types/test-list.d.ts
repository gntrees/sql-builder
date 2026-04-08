declare module "@gntrees/sql-builder/src/dialects/pg/tests/test-list" {
  export interface TestExpectation {
    sql: string
    parameters?: (string | number | boolean | null)[]
    description?: string
  }

  export const testSql: Record<string, Record<string, TestExpectation>>
}
