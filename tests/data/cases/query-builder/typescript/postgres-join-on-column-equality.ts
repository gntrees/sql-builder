import { sqlBuilder } from "../../../../../generated/gntrees-sql-builder/typescript/index";

const c = sqlBuilder("q");
export const schema = c.select(c.col("id")).from(c.table("users")).join(c.table("posts"), c.col("users.id").eq(c.col("posts.user_id"))).setDialect("postgres");
