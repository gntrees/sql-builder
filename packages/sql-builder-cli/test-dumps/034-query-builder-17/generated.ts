import { sqlBuilder } from "@gntrees/sql-builder/pg";

const q = sqlBuilder();
const query = q.select(q.c(`id`), q.c(`name`)).from(q.t(`users`));

export default query;
