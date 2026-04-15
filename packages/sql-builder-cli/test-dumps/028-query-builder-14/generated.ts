import { sqlBuilder } from "@gntrees/sql-builder/pg";

const q = sqlBuilder();
const query = q.union(
  q.select(q.c(`id`)).from(q.t(`users`)),
  q.select(q.c(`name`)).from(q.t(`products`)),
);

export default query;
