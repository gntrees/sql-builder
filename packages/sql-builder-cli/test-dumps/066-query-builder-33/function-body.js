const q = sqlBuilder().setFormatParamHandler("pg").setExecutionHandler(async ({ sql, parameters, meta }) => { return { sql, parameters }; });const query = q
  .select(q.c(`users.id`), q.c(`roles.name`))
  .from(q.t(`users`))
  .crossJoin(q.t(`roles`));

export default query;return query;