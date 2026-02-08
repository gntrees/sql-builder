const q = sqlBuilder({formatParamHandler: "pg",execHandler: async ({ sql, parameters, meta }) => { return { sql, parameters }; }});const query = q.select(q.c(q.r`*`)).from(`products`)
  .where(q.r`category_id IN (SELECT id
    FROM categories
    WHERE
      active = true)`);return query;