const q = sqlBuilder().setFormatParamHandler("pg").setExecutionHandler(async ({ sql, parameters, meta }) => { return { sql, parameters }; });const query = q
  .update(q.t(`users`))
  .set(q.op(q.c(`last_login`), `=`, `2024-01-15 10:30:00`))
  .where(q.op(q.c(`id`), `=`, 123));

export default query;return query;