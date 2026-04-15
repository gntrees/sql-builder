import { sqlBuilder } from "@gntrees/sql-builder/pg";

const q = sqlBuilder();
const query = q
  .insertInto(q.t(`users`), [q.c(`name`), q.c(`age`), q.c(`active`)])
  .values([`John Doe`, 30, true]);

export default query;
