import { sqlBuilder } from "@gntrees/sql-builder/pg";

const q = sqlBuilder();
const query = q
  .insertInto(q.t(`users`), [q.c(`name`), q.c(`email`)])
  .values([`Lara`, q.lower(`Lara@Example.com`)])
  .returning(q.c(`id`));

export default query;
