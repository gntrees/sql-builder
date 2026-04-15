import { sqlBuilder } from "@gntrees/sql-builder/pg";

const q = sqlBuilder();
const query = q
  .select(q.c(`category_id`))
  .from(q.t(`products`))
  .groupBy(q.c(`category_id`))
  .having(
    q.and(
      q.op(q.abs(q.c(`amount`)), `>`, 100),
      q.op(q.abs(q.c(`id`)), `<`, 1000),
    ),
  );

export default query;
