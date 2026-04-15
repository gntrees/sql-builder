import { sqlBuilder } from "@gntrees/sql-builder/pg";

const q = sqlBuilder();
const query = q
  .select("*")
  .from(q.t(`audit_logs`))
  .where(
    q.or(
      q.op(q.c(`audit_logs.success`), `=`, true),
      q.op(q.c(`audit_logs.action`), `>`, 100),
    ),
  );

export default query;
