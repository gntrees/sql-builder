const q = sqlBuilder().setFormatParamHandler("pg").setExecutionHandler(async ({ sql, parameters, meta }) => { return { sql, parameters }; });const query = q
  .select("*")
  .from(q.t(`users`))
  .where(
    q.op(
      q.sub(
        q
          .select(q.c(`id`))
          .from(q.t(`users`))
          .where(q.op(q.c(`id`), `=`, 1)),
      ),
      `=`,
      1,
    ),
  );

export default query;return query;