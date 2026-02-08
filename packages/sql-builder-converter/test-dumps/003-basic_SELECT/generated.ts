import { sqlBuilder } from "@gntrees/sql-builder";

const q = sqlBuilder({
  formatParamHandler: "pg",
  execHandler: async ({ sql, parameters, meta }): Promise<any> => {
    return "Executed";
  },
});

const query = q
  .select(q.c(`id`), q.c(`name`), q.c(`email`), q.c(`created_at`))
  .from(`users`);
console.log(query.getSql());
