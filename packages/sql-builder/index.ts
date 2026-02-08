import { QueryInstance } from "./src/generated/query-instance";
import type { DBInstance, RequiredDBInstance } from "./src/types";
import { QueryBuilder } from "./src/query-builder";

export function sqlBuilder(db: DBInstance): QueryInstance {
  const requiredDbInstance: RequiredDBInstance = {
    ...db,
    formatParamHandler: db.formatParamHandler || "pg",
  };
  return new QueryInstance(requiredDbInstance);
}

export { QueryBuilder, QueryInstance };
