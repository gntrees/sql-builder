const q = sqlBuilder({formatParamHandler: "pg",execHandler: async ({ sql, parameters, meta }) => { return { sql, parameters }; }});const query = q
  .select(q.c(`department`), q.sum(q.c(`salary`)))
  .from(`employees`)
  .groupBy(q.c(`department`))
  .having(q.r`sum(salary) > 100000`);return query;