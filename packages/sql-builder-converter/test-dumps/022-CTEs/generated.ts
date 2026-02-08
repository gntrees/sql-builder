import { sqlBuilder } from "@gntrees/sql-builder";

const q = sqlBuilder({
  formatParamHandler: "pg",
  execHandler: async ({ sql, parameters, meta }): Promise<any> => {
    return "Executed";
  },
});

const query = q
  .select(q.c(q.r`*`))
  .from(`user_counts`)
  .where(q.r`order_count > 5`);
console.log(query.getSql());
