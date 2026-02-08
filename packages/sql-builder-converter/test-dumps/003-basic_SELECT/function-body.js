const q = sqlBuilder({formatParamHandler: "pg",execHandler: async ({ sql, parameters, meta }) => { return { sql, parameters }; }});const query = q
  .select(q.c(`id`), q.c(`name`), q.c(`email`), q.c(`created_at`))
  .from(`users`);return query;