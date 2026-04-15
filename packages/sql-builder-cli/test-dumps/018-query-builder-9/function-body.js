const q = sqlBuilder().setFormatParamHandler("pg").setExecutionHandler(async ({ sql, parameters, meta }) => { return { sql, parameters }; });const query = q
  .select("*")
  .from(q.t(`users`))
  .where(q.op(q.sub(q.select(q.count(`*`)).from(q.t(`users`))), `>`, 100));

export default query;return query;