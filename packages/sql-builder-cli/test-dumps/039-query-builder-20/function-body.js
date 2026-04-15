const q = sqlBuilder().setFormatParamHandler("pg").setExecutionHandler(async ({ sql, parameters, meta }) => { return { sql, parameters }; });const query = q
  .insertInto(q.t(`users`), [q.c(`name`), q.c(`email`)])
  .values([`Lara`, q.lower(`Lara@Example.com`)])
  .returning(q.c(`id`));

export default query;return query;