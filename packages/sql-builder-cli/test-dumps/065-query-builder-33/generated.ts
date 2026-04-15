import { sqlBuilder } from "@gntrees/sql-builder/pg";

const q = sqlBuilder();
const query = q
  .select(q.c(`users.id`), q.c(`roles.name`))
  .from(q.t(`users`))
  .crossJoin(q.t(`roles`));

export default query;
