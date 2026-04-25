import { QueryInstance } from "./generated/query-instance";
import type { RequiredDBInstance } from "./query-builder.types";

export function sqlBuilder(): QueryInstance {
  const requiredDbInstance: RequiredDBInstance = {
    execHandler: async () => {
      throw new Error(
        "Execution is not supported in @gntrees/sql-builder/pg/builder",
      );
    },
    formatParamHandler: "pg",
  };
  return new QueryInstance(requiredDbInstance);
}

export * from "./base-export"