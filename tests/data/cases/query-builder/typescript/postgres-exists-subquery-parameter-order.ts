import { sqlBuilder } from "../../../../../generated/gntrees-sql-builder/typescript/index";

const c = sqlBuilder("q");
export const schema = c.select(c.col("id"))
                .from(c.table("users"))
                .where(c.exists(c.select(c.col("id")).from(c.table("orders")).where(c.col("total").gt(100))))
                .where(c.col("active").eq(true))
                .setDialect("postgres");
