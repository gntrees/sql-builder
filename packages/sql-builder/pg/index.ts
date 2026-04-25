import { Client } from "pg";
import type { RequiredDBInstance } from "./query-builder.types";
import { QueryInstance } from "./generated/query-instance";

export function sqlBuilder(url?: string): QueryInstance{
  const requiredDbInstance: RequiredDBInstance = {
    execHandler: async ({ sql, parameters }) => {
      if (typeof url !== "string") {
        throw new Error("Database connection URL must be provided for execution");
      }
      const client = url
        ? new Client({ connectionString: url })
        : new Client();
      await client.connect();
      try {
        return (await client.query(sql, parameters)).rows;
      } finally {
        await client.end();
      }
    },
    formatParamHandler: "pg",
  };
  return new QueryInstance(requiredDbInstance);
}

export * from "./base-export";

