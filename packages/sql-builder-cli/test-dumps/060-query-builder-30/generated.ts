import { sqlBuilder } from "@gntrees/sql-builder/pg";

const q = sqlBuilder();
const query = q
  .select(q.c(`profiles.user_id`), q.c(`users.name`))
  .from(q.t(`users`))
  .rightJoin(q.t(`profiles`))
  .on(q.op(q.c(`profiles.user_id`), `=`, q.c(`users.id`)));

export default query;
