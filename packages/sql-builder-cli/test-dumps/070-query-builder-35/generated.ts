import { sqlBuilder } from "@gntrees/sql-builder/pg";

const q = sqlBuilder();
const query = q
  .select(q.c(`users.id`), q.c(`user_orders.count`))
  .from(q.t(`users`)).crossJoin(q.r`LATERAL ( SELECT
  orders.user_id,
  count(*)
FROM orders
WHERE
  orders.user_id = users.id
GROUP BY
  orders.user_id ) AS user_orders`);

export default query;
