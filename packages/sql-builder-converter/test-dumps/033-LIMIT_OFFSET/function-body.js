const q = sqlBuilder({formatParamHandler: "pg",execHandler: async ({ sql, parameters, meta }) => { return { sql, parameters }; }});const query = q
  .select(q.c(q.r`*`))
  .from(`users`)
  .limit(q.r`10`)
  .offset(q.r`20`);return query;