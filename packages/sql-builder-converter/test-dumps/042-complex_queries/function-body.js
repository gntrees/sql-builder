const q = sqlBuilder({formatParamHandler: "pg",execHandler: async ({ sql, parameters, meta }) => { return { sql, parameters }; }});const query = q
  .select(
    q.c(`category`),
    q.avg(q.c(`price`)).as(`avg_price`),
    q.count(q.r`*`).as(`product_count`),
  )
  .from(`products`)
  .where(q.r`price > 0`)
  .groupBy(q.c(`category`))
  .having(q.r`avg(price) < 100`)
  .orderBy(q.asc(q.c(`avg_price`)));return query;