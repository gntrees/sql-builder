const q = sqlBuilder().setFormatParamHandler("pg").setExecutionHandler(async ({ sql, parameters, meta }) => { return { sql, parameters }; });const query = q
  .selectDistinct(q.c(`users.id`), q.c(`users.name`))
  .from(q.t(`users`));

export default query;return query;