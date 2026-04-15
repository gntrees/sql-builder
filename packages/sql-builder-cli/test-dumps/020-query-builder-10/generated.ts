import { sqlBuilder } from "@gntrees/sql-builder/pg";

const q = sqlBuilder();
const query = q
  .select("*")
  .from(q.t(`users`))
  .where(q.op(q.c(`id`), `=`, 42));

export default query;
