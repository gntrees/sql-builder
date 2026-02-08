import { sqlBuilder } from "@gntrees/sql-builder";

const q = sqlBuilder({
  formatParamHandler: "pg",
  execHandler: async ({ sql, parameters, meta }): Promise<any> => {
    return "Executed";
  },
});

const query = q.select(q.c(q.r`*`)).from(`users`)
  .where(q.r`id IN (SELECT user_id
    FROM orders)`);
console.log(query.getSql());
