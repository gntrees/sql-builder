import { sqlBuilder } from "@gntrees/sql-builder/pg";

const q = sqlBuilder();
const query = q
  .select("*")
  .from(q.t(`users`))
  .where(
    q.and(
      q.op(q.c(`name`), `=`, `John`),
      q.op(q.c(`email`), `=`, `john@example.com`),
    ),
  );

export default query;
