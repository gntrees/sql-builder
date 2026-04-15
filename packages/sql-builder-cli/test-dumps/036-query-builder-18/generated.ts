import { sqlBuilder } from "@gntrees/sql-builder/pg";

const q = sqlBuilder();
const query = q
  .insertInto(q.t(`users`), [q.c(`name`), q.c(`email`)])
  .values(
    [`John`, q.lower(`John@Example.com`)],
    [`Jane`, q.lower(`Jane@Example.com`)],
  );

export default query;
