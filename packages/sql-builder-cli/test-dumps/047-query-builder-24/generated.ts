import { sqlBuilder } from "@gntrees/sql-builder/pg";

const q = sqlBuilder();
const query = q
  .select(q.c(`category_id`))
  .from(q.t(`products`))
  .groupBy(q.c(`category_id`))
  .having(q.op(q.abs(q.c(`id`)), `>`, 10));

export default query;
