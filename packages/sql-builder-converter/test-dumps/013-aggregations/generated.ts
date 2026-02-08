import { sqlBuilder } from "@gntrees/sql-builder";

const q = sqlBuilder({
  formatParamHandler: "pg",
  execHandler: async ({ sql, parameters, meta }): Promise<any> => {
    return "Executed";
  },
});

const query = q.select(q.count(q.r`*`), q.avg(q.c(`price`))).from(`products`);
console.log(query.getSql());
