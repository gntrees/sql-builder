const q = sqlBuilder().setFormatParamHandler("pg").setExecutionHandler(async ({ sql, parameters, meta }) => { return { sql, parameters }; });const query = q
  .select("*")
  .from(q.t(`users`))
  .where(q.op(q.c(`table_name.column_name`), `=`, `admin`));

export default query;return query;