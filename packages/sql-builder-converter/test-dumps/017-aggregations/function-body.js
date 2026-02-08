const q = sqlBuilder({formatParamHandler: "pg",execHandler: async ({ sql, parameters, meta }) => { return { sql, parameters }; }});const query = q
  .select(q.max(q.c(`price`)), q.min(q.c(`price`)))
  .from(`products`);return query;