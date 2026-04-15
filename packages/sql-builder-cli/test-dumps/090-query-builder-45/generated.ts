import { sqlBuilder } from "@gntrees/sql-builder/pg";

const q = sqlBuilder();
const query = q
  .select(
    q.sub(q.select(q.c(`id`)).from(q.t(`admins`)).limit(1)).as(`admin_ids`),
  )
  .from(q.t(`users`));

export default query;
