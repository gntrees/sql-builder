const q = sqlBuilder().setFormatParamHandler("pg").setExecutionHandler(async ({ sql, parameters, meta }) => { return { sql, parameters }; });const query = q.select(q.c(`id`)).from(q.t(`users`));

export default query;return query;