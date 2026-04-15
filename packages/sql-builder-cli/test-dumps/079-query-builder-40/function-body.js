const q = sqlBuilder().setFormatParamHandler("pg").setExecutionHandler(async ({ sql, parameters, meta }) => { return { sql, parameters }; });const query = q
  .select(q.c(`users.id`))
  .from(q.t(`users`))
  .naturalLeftJoin(q.t(`profiles`));

export default query;return query;