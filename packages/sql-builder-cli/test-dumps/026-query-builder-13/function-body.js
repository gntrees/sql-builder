const q = sqlBuilder().setFormatParamHandler("pg").setExecutionHandler(async ({ sql, parameters, meta }) => { return { sql, parameters }; });const query = q
  .select(q.c(`users.id`), q.c(`users.name`))
  .from(q.t(`users`))
  .where(
    q.or(
      q.and(
        q.op(q.c(`users.active`), `=`, true),
        q.op(q.c(`users.age`), `<`, 30),
      ),
      q.op(q.c(`users.age`), `>`, 50),
    ),
  )
  .orderBy(q.c(`users.name`));

export default query;return query;