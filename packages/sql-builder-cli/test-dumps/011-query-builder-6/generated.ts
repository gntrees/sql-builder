import { sqlBuilder } from "@gntrees/sql-builder/pg";

const q = sqlBuilder();
const query = q
  .select("*")
  .from(q.t(`users`))
  .where(q.and(q.op(q.c(`age`), `=`, 25), q.op(q.c(`city`), `=`, `Jakarta`)));

export default query;
