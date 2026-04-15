const q = sqlBuilder().setFormatParamHandler("pg").setExecutionHandler(async ({ sql, parameters, meta }) => { return { sql, parameters }; });const query = q
  .select(q.c(`users.id`), q.c(`profiles.bio`))
  .from(q.t(`users`))
  .leftJoin(q.t(`profiles`))
  .on(q.op(q.c(`profiles.user_id`), `=`, q.c(`users.id`)));

export default query;return query;