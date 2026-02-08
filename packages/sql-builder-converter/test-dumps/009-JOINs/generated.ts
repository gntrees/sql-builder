import { sqlBuilder } from "@gntrees/sql-builder";

const q = sqlBuilder({
  formatParamHandler: "pg",
  execHandler: async ({ sql, parameters, meta }): Promise<any> => {
    return "Executed";
  },
});

const query = q
  .select(q.c(q.r`*`))
  .from(`users`)
  .innerJoin(`orders`, q.r`users.id = orders.user_id`);
console.log(query.getSql());
