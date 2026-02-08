import { sqlBuilder } from "@gntrees/sql-builder";

const q = sqlBuilder({
  formatParamHandler: "pg",
  execHandler: async ({ sql, parameters, meta }): Promise<any> => {
    return "Executed";
  },
});

const query = q
  .select(q.c(q.r`*`))
  .from(`products`)
  .orderBy(q.asc(q.c(`price`)), q.desc(q.c(`name`)));
console.log(query.getSql());
