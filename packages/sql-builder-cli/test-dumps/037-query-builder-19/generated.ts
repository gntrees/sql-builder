import { sqlBuilder } from "@gntrees/sql-builder/pg";

const q = sqlBuilder();
const query = q
  .insertInto(q.t(`users`), [q.c(`name`), q.c(`email`)])
  .values(
    [`Maria`, q.lower(`Maria@Example.com`)],
    [`Lia`, q.lower(`Lia@Example.com`)],
  );

export default query;
