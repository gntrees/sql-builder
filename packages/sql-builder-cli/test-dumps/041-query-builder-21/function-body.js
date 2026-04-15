const q = sqlBuilder().setFormatParamHandler("pg").setExecutionHandler(async ({ sql, parameters, meta }) => { return { sql, parameters }; });const query = q
  .update(q.t(`users`))
  .set(
    q.op(q.c(`cities.name`), `=`, `New York`),
    q.op(q.c(`updated_at`), `=`, q.now()),
  )
  .from(q.t(`cities`))
  .where(q.op(q.c(`users.city_id`), `=`, q.c(`cities.id`)));

export default query;return query;