const q = sqlBuilder().setFormatParamHandler("pg").setExecutionHandler(async ({ sql, parameters, meta }) => { return { sql, parameters }; });const query = q
  .selectDistinctOn(
    [q.c(`posts.author_id`)],
    [q.c(`posts.id`), q.c(`posts.title`)],
  )
  .from(q.t(`posts`));

export default query;return query;