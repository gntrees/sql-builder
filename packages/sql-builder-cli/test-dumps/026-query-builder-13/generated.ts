import { sqlBuilder } from "@gntrees/sql-builder/pg";

const q = sqlBuilder();
const query = q
  .select(q.c(`users.id`), q.c(`users.name`))
  .from(q.t(`users`))
  .where(
    q.or(
      q.and(
        q.op(q.c(`users.active`), `=`, true),
        q.op(q.c(`users.age`), `<`, 30),
      ),
      q.op(q.c(`users.age`), `>`, 50),
    ),
  )
  .orderBy(q.c(`users.name`));

export default query;
