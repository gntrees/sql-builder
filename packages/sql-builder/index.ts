import { QueryInstance } from "./src/generated/query-instance";
import type { DBInstance, RequiredDBInstance } from "./src/types";
import { QueryBuilder } from "./src/query-builder";
export { sqlToTypescript, SqlToTypescriptConverter } from "./trash/converter/sql-to-typescript-converter";
export type { SqlToTypescriptOptions } from "./trash/converter/sql-to-typescript-converter";

export function sqlBuilder(db: DBInstance): QueryInstance {
  const requiredDbInstance: RequiredDBInstance = {
    ...db,
    formatParamHandler: db.formatParamHandler || "pg",
  };
  return new QueryInstance(requiredDbInstance);
}

export { QueryBuilder, QueryInstance };
