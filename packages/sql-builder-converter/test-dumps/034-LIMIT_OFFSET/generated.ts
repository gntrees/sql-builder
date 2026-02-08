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
  .orderBy(q.desc(q.c(`price`)))
  .limit(q.r`5`);
console.log(query.getSql());
