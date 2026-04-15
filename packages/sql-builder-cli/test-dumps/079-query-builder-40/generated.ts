import { sqlBuilder } from "@gntrees/sql-builder/pg";

const q = sqlBuilder();
const query = q
  .select(q.c(`users.id`))
  .from(q.t(`users`))
  .naturalLeftJoin(q.t(`profiles`));

export default query;
