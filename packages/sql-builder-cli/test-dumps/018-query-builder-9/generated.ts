import { sqlBuilder } from "@gntrees/sql-builder/pg";

const q = sqlBuilder();
const query = q
  .select("*")
  .from(q.t(`users`))
  .where(q.op(q.sub(q.select(q.count(`*`)).from(q.t(`users`))), `>`, 100));

export default query;
