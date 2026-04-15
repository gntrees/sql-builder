const q = sqlBuilder().setFormatParamHandler("pg").setExecutionHandler(async ({ sql, parameters, meta }) => { return { sql, parameters }; });const query = q
  .select("*")
  .from(q.t(`users`))
  .where(
    q.and(
      q.op(q.c(`name`), `=`, `John`),
      q.op(q.c(`email`), `=`, `john@example.com`),
    ),
  );

export default query;return query;