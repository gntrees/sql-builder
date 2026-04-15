import { sqlBuilder } from "@gntrees/sql-builder/pg";

const q = sqlBuilder();
const query = q
  .select(q.c(`users.id`), q.c(`profiles.bio`))
  .from(q.t(`users`))
  .fullJoin(q.t(`profiles`))
  .on(q.op(q.c(`profiles.user_id`), `=`, q.c(`users.id`)));

export default query;
