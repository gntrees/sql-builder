import { sqlBuilder } from "@gntrees/sql-builder/pg";

const q = sqlBuilder();
const query = q
  .select("*")
  .from(q.t(`users`))
  .where(
    q.op(
      q.sub(
        q
          .select(q.c(`id`))
          .from(q.t(`users`))
          .where(q.op(q.c(`id`), `=`, 1)),
      ),
      `=`,
      1,
    ),
  );

export default query;
