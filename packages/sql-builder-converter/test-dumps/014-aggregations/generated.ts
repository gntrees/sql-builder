import { sqlBuilder } from "@gntrees/sql-builder";

const q = sqlBuilder({
  formatParamHandler: "pg",
  execHandler: async ({ sql, parameters, meta }): Promise<any> => {
    return "Executed";
  },
});

const query = q
  .select(q.c(`category`), q.count(q.r`*`))
  .from(`products`)
  .groupBy(q.c(`category`));
console.log(query.getSql());
