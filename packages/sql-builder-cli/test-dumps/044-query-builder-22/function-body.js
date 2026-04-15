const q = sqlBuilder().setFormatParamHandler("pg").setExecutionHandler(async ({ sql, parameters, meta }) => { return { sql, parameters }; });const query = q
  .select(
    "*",
    q.c(`test_column`),
    q.c(`users.id`),
    q.c(`haha`).as(`test`),
    q.c(`users.name`).as(`another`),
    q.c(`custom_alias`).as(`alias`),
    q.now().as(`expression`),
  )
  .from(q.t(`users`))
  .where(q.op(q.c(`users.is_active`), `=`, true))
  .orderBy(q.c(`users.created_at`));

export default query;return query;