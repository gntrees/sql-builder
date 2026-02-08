import { sqlBuilder } from "@gntrees/sql-builder";

const q = sqlBuilder({
  formatParamHandler: "pg",
  execHandler: async ({ sql, parameters, meta }): Promise<any> => {
    return "Executed";
  },
});

const query = q
  .select(q.i(`u.name`), q.i(`o.total`))
  .from(q.r`users AS u`)
  .leftJoin(q.r`orders AS o`, q.r`u.id = o.user_id`);
console.log(query.getSql());
