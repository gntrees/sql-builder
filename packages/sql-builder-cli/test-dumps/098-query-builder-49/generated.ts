import { sqlBuilder } from "@gntrees/sql-builder/pg";

const q = sqlBuilder();
const query = q
  .select(q.c(`users.role`), q.count(`*`))
  .from(q.t(`users`))
  .groupBy(q.c(`users.role`));

export default query;
