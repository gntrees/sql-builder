const q = sqlBuilder().setFormatParamHandler("pg").setExecutionHandler(async ({ sql, parameters, meta }) => { return { sql, parameters }; });const query = q
  .select(q.c(`category_id`))
  .from(q.t(`products`))
  .groupBy(q.c(`category_id`))
  .having(q.op(q.count(`*`), `>`, 5));

export default query;return query;