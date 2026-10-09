import { sqlBuilder } from "../../../../../generated/gntrees-sql-builder/typescript/index";

const c = sqlBuilder("q");
export const schema = c.with(c.select(c.col("id")).from(c.table("users")).where(c.col("active").eq(true)), "cte")
                .select(c.col("id"))
                .from(c.table("cte"))
                .where(c.col("id").gt(5))
                .setDialect("postgres");
