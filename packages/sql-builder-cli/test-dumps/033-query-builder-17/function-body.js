const q = sqlBuilder().setFormatParamHandler("pg").setExecutionHandler(async ({ sql, parameters, meta }) => { return { sql, parameters }; });const query = q.select(q.c(`id`), q.c(`name`)).from(q.t(`users`));

export default query;return query;