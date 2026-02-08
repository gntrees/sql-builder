import { sqlBuilder } from "@gntrees/sql-builder";

const q = sqlBuilder({
  formatParamHandler: "pg",
  execHandler: async ({ sql, parameters, meta }): Promise<any> => {
    return "Executed";
  },
});

const query = q
  .select(q.c(`id`))
  .from(`users`)
  .where(q.r`active = true`);
console.log(query.getSql());
