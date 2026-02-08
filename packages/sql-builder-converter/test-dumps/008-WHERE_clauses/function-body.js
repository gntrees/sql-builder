const q = sqlBuilder({formatParamHandler: "pg",execHandler: async ({ sql, parameters, meta }) => { return { sql, parameters }; }});const query = q
  .select(q.c(q.r`*`))
  .from(`orders`)
  .where(q.and(q.r`status = 'completed'`, q.r`paid = true`));return query;