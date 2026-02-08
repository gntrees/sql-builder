import { sqlBuilder } from "@gntrees/sql-builder";

const q = sqlBuilder({
  formatParamHandler: "pg",
  execHandler: async ({ sql, parameters, meta }): Promise<any> => {
    return "Executed";
  },
});

const query = q.select(q.r`COALESCE(NULLIF (price, 0), 100)`).from(`products`);
console.log(query.getSql());
