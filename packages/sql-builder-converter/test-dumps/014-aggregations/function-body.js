const q = sqlBuilder({formatParamHandler: "pg",execHandler: async ({ sql, parameters, meta }) => { return { sql, parameters }; }});const query = q
  .select(q.c(`category`), q.count(q.r`*`))
  .from(`products`)
  .groupBy(q.c(`category`));return query;