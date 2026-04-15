import { sqlBuilder } from "@gntrees/sql-builder/pg";

const q = sqlBuilder();
const query = q.select(q.c(`id`)).from(q.t(`users`));

export default query;
