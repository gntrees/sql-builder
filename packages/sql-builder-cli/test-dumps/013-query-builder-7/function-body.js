const q = sqlBuilder().setFormatParamHandler("pg").setExecutionHandler(async ({ sql, parameters, meta }) => { return { sql, parameters }; });const query = q
  .select("*")
  .from(q.t(`users`))
  .where(
    q.and(q.op(q.c(`score`), `=`, q.r`100.5`), q.op(q.c(`level`), `=`, 5)),
  );

export default query;return query;