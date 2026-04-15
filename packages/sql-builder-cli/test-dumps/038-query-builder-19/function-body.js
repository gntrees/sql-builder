const q = sqlBuilder().setFormatParamHandler("pg").setExecutionHandler(async ({ sql, parameters, meta }) => { return { sql, parameters }; });const query = q
  .insertInto(q.t(`users`), [q.c(`name`), q.c(`email`)])
  .values(
    [`Maria`, q.lower(`Maria@Example.com`)],
    [`Lia`, q.lower(`Lia@Example.com`)],
  );

export default query;return query;