import { sqlBuilder } from "@gntrees/sql-builder/pg";

const q = sqlBuilder();
const query = q
  .select("*")
  .from(q.t(`users`))
  .where(q.op(q.c(`table_name.column_name`), `=`, `admin`));

export default query;
