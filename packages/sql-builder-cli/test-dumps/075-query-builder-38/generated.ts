import { sqlBuilder } from "@gntrees/sql-builder/pg";

const q = sqlBuilder();
const query = q
  .select(q.c(`users.id`), q.c(`profiles.bio`))
  .from(q.t(`users`))
  .join(q.t(`profiles`))
  .on(
    q.and(
      q.op(q.c(`profiles.user_id`), `=`, q.c(`users.id`)),
      q.op(q.c(`profiles.active`), `=`, true),
    ),
  );

export default query;
