const q = sqlBuilder({formatParamHandler: "pg",execHandler: async ({ sql, parameters, meta }) => { return { sql, parameters }; }});const query = q.select(
  q.r`(SELECT count(*)
        FROM orders)`.as(`total_orders`),
);return query;