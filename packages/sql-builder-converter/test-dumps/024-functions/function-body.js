const q = sqlBuilder({formatParamHandler: "pg",execHandler: async ({ sql, parameters, meta }) => { return { sql, parameters }; }});const query = q
  .select(q.concat(q.c(`first_name`), ` `, q.c(`last_name`)).as(`full_name`))
  .from(`users`);return query;