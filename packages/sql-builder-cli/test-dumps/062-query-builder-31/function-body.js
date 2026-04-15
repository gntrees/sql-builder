const q = sqlBuilder().setFormatParamHandler("pg").setExecutionHandler(async ({ sql, parameters, meta }) => { return { sql, parameters }; });const query = q
  .select(q.c(`users.id`), q.c(`user_orders.count`))
  .from(q.t(`users`))
  .join(
    q.r`LATERAL ( SELECT
  orders.user_id,
  count(*)
FROM orders
WHERE
  orders.user_id = users.id
GROUP BY
  orders.user_id ) AS user_orders`,
  )
  .on(true);

export default query;return query;