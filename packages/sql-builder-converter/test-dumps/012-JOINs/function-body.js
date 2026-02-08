const q = sqlBuilder({formatParamHandler: "pg",execHandler: async ({ sql, parameters, meta }) => { return { sql, parameters }; }});const query = q
  .select(q.c(q.r`*`))
  .from(q.r`users AS u`)
  .crossJoin(q.r`products AS p`);return query;