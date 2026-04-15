const q = sqlBuilder().setFormatParamHandler("pg").setExecutionHandler(async ({ sql, parameters, meta }) => { return { sql, parameters }; });const query = q
  .select("*")
  .from(q.t(`users`))
  .where(q.and(q.op(q.c(`age`), `=`, 25), q.op(q.c(`city`), `=`, `Jakarta`)));

export default query;return query;