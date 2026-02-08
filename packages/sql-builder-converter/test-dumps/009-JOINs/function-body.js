const q = sqlBuilder({formatParamHandler: "pg",execHandler: async ({ sql, parameters, meta }) => { return { sql, parameters }; }});const query = q
  .select(q.c(q.r`*`))
  .from(`users`)
  .innerJoin(`orders`, q.r`users.id = orders.user_id`);return query;