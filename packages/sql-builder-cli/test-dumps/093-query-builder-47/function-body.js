const q = sqlBuilder().setFormatParamHandler("pg").setExecutionHandler(async ({ sql, parameters, meta }) => { return { sql, parameters }; });const query = q
  .with(q.i(`admins_cte`).as(q.sub(q.select(q.c(`id`)).from(q.t(`admins`)))))
  .select("*")
  .from(q.t(`admins_cte`));

export default query;return query;