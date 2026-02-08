import { sqlBuilder } from "@gntrees/sql-builder";

const q = sqlBuilder({
  formatParamHandler: "pg",
  execHandler: async ({ sql, parameters, meta }): Promise<any> => {
    return "Executed";
  },
});

const query = q
  .select(q.count(1), q.round(q.avg(q.c(`spend_hours`))))
  .from(`services`);
console.log(query.getSql());
