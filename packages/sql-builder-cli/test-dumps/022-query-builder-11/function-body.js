const q = sqlBuilder().setFormatParamHandler("pg").setExecutionHandler(async ({ sql, parameters, meta }) => { return { sql, parameters }; });const query = q
  .insertInto(q.t(`users`), [q.c(`name`), q.c(`age`), q.c(`active`)])
  .values([`John Doe`, 30, true]);

export default query;return query;