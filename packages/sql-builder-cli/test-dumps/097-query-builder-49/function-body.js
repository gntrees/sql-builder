const q = sqlBuilder().setFormatParamHandler("pg").setExecutionHandler(async ({ sql, parameters, meta }) => { return { sql, parameters }; });const query = q
  .select(q.c(`users.role`), q.count(`*`))
  .from(q.t(`users`))
  .groupBy(q.c(`users.role`));

export default query;return query;