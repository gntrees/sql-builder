import { sqlBuilder } from "@gntrees/sql-builder";

const q = sqlBuilder({
  formatParamHandler: "pg",
  execHandler: async ({ sql, parameters, meta }): Promise<any> => {
    return "Executed";
  },
});

const query = q.select(
  q.r`(SELECT count(*)
        FROM orders)`.as(`total_orders`),
);
console.log(query.getSql());
