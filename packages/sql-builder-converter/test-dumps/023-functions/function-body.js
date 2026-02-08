const q = sqlBuilder({formatParamHandler: "pg",execHandler: async ({ sql, parameters, meta }) => { return { sql, parameters }; }});const query = q
  .select(q.count(1), q.round(q.avg(q.c(`spend_hours`))))
  .from(`services`);return query;