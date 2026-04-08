import { QueryInstance } from "../src/dialects/pg/generated/query-instance";
import type { RequiredDBInstance } from "../src/dialects/pg/types";
import { DBSchema, TableSchema, ColumnSchema } from "../src/dialects/pg/db-schema";

class QueryInstanceBuilder extends QueryInstance {
  setFormatParamHandler(
    formatParamHandler: RequiredDBInstance["formatParamHandler"],
  ): this {
    this.dbInstance.formatParamHandler = formatParamHandler;
    return this;
  }

  setExecutionHandler(
    execHandler: RequiredDBInstance["execHandler"],
  ): this {
    this.dbInstance.execHandler = execHandler;
    return this;
  }
}

export function sqlBuilder(): QueryInstanceBuilder {
  const requiredDbInstance: RequiredDBInstance = {
    execHandler: async () => {
      throw new Error(
        "Execution is not supported in @gntrees/sql-builder/pg/builder",
      );
    },
    formatParamHandler: "pg",
  };
  return new QueryInstanceBuilder(requiredDbInstance);
}

export { DBSchema, TableSchema, ColumnSchema };
