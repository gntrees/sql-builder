const q = sqlBuilder({formatParamHandler: "pg",execHandler: async ({ sql, parameters, meta }) => { return { sql, parameters }; }});const query = q.select(q.c(q.r`*`)).from(`users`)
  .where(q.r`id IN (SELECT user_id
    FROM orders)`);return query;