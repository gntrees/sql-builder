const q = sqlBuilder().setFormatParamHandler("pg").setExecutionHandler(async ({ sql, parameters, meta }) => { return { sql, parameters }; });const query = q
  .insertInto(q.t(`users`), [q.c(`name`), q.c(`email`)])
  .values(
    [`John`, q.lower(`John@Example.com`)],
    [`Jane`, q.lower(`Jane@Example.com`)],
  );

export default query;return query;