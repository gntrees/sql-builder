const q = sqlBuilder({formatParamHandler: "pg",execHandler: async ({ sql, parameters, meta }) => { return { sql, parameters }; }});const query = q
  .select(q.c(q.r`*`))
  .from(`products`)
  .orderBy(q.desc(q.c(`price`)))
  .limit(q.r`5`);return query;