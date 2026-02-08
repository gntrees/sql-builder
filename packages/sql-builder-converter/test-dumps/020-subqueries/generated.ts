import { sqlBuilder } from "@gntrees/sql-builder";

const q = sqlBuilder({
  formatParamHandler: "pg",
  execHandler: async ({ sql, parameters, meta }): Promise<any> => {
    return "Executed";
  },
});

const query = q.select(q.c(q.r`*`)).from(`products`)
  .where(q.r`category_id IN (SELECT id
    FROM categories
    WHERE
      active = true)`);
console.log(query.getSql());
