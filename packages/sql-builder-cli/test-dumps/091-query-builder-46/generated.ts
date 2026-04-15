import { sqlBuilder } from "@gntrees/sql-builder/pg";

const q = sqlBuilder();
const query = q
  .with(q.i(`admins_cte`).as(q.sub(q.select(q.c(`id`)).from(q.t(`admins`)))))
  .select("*")
  .from(q.t(`admins_cte`));

export default query;
