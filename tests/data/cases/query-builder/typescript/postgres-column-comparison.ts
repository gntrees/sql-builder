import { sqlBuilder } from "../../../../../generated/gntrees-sql-builder/typescript/index";

const c = sqlBuilder("q");
export const schema = c.select(c.col("id")).from(c.table("users")).where(c.col("a").eq(c.col("b"))).setDialect("postgres");
