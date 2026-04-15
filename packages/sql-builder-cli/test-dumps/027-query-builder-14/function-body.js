const q = sqlBuilder().setFormatParamHandler("pg").setExecutionHandler(async ({ sql, parameters, meta }) => { return { sql, parameters }; });const query = q.union(
  q.select(q.c(`id`)).from(q.t(`users`)),
  q.select(q.c(`name`)).from(q.t(`products`)),
);

export default query;return query;