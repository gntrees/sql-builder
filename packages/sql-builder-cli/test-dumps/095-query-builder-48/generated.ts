import { sqlBuilder } from "@gntrees/sql-builder/pg";

const q = sqlBuilder();
const query = q
  .selectDistinctOn(
    [q.c(`posts.author_id`)],
    [q.c(`posts.id`), q.c(`posts.title`)],
  )
  .from(q.t(`posts`));

export default query;
