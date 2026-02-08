import { sqlBuilder } from "@gntrees/sql-builder";

const q = sqlBuilder({
  formatParamHandler: "pg",
  execHandler: async ({ sql, parameters, meta }): Promise<any> => {
    return "Executed";
  },
});

const query = q
  .select(q.concat(q.c(`first_name`), ` `, q.c(`last_name`)).as(`full_name`))
  .from(`users`);
console.log(query.getSql());
