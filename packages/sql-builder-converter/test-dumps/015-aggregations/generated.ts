import { sqlBuilder } from "@gntrees/sql-builder";

const q = sqlBuilder({
  formatParamHandler: "pg",
  execHandler: async ({ sql, parameters, meta }): Promise<any> => {
    return "Executed";
  },
});

const query = q
  .select(q.c(`department`), q.sum(q.c(`salary`)))
  .from(`employees`)
  .groupBy(q.c(`department`))
  .having(q.r`sum(salary) > 100000`);
console.log(query.getSql());
