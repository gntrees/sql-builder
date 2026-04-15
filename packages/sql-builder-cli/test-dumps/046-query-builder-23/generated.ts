import { sqlBuilder } from "@gntrees/sql-builder/pg";

const q = sqlBuilder();
const query = q
  .selectDistinct(q.c(`users.id`), q.c(`users.name`))
  .from(q.t(`users`));

export default query;
