const q = sqlBuilder({formatParamHandler: "pg",execHandler: async ({ sql, parameters, meta }) => { return { sql, parameters }; }});const query = q
  .select(q.c(q.r`*`))
  .from(`orders`)
  .rightJoin(`products`, q.r`orders.product_id = products.id`);return query;