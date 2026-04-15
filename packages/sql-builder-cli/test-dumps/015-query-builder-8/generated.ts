import { sqlBuilder } from "@gntrees/sql-builder/pg";

const q = sqlBuilder();
const query = q
  .select("*")
  .from(q.t(`users`))
  .where(
    q.and(
      q.op(q.c(`created_at`), `>`, `2024-01-01`),
      q.op(q.c(`status`), `=`, `active`),
    ),
  );

export default query;
