const q = sqlBuilder().setFormatParamHandler("pg").setExecutionHandler(async ({ sql, parameters, meta }) => { return { sql, parameters }; });const query = q
  .select(q.c(`profiles.user_id`), q.c(`users.name`))
  .from(q.t(`users`))
  .rightJoin(q.t(`profiles`))
  .on(q.op(q.c(`profiles.user_id`), `=`, q.c(`users.id`)));

export default query;return query;