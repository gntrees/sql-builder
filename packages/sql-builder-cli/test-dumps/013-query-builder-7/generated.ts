import { sqlBuilder } from "@gntrees/sql-builder/pg";

const q = sqlBuilder();
const query = q
  .select("*")
  .from(q.t(`users`))
  .where(
    q.and(q.op(q.c(`score`), `=`, q.r`100.5`), q.op(q.c(`level`), `=`, 5)),
  );

export default query;
