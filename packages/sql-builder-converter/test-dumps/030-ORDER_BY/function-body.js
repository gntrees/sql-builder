const q = sqlBuilder({formatParamHandler: "pg",execHandler: async ({ sql, parameters, meta }) => { return { sql, parameters }; }});const query = q
  .select(q.c(q.r`*`))
  .from(`products`)
  .orderBy(q.asc(q.c(`price`)), q.desc(q.c(`name`)));return query;