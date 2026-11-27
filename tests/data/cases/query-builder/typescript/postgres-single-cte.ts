import { sqlBuilder } from "../../../../../generated/gntrees-sql-builder/typescript/index";

const c = sqlBuilder("q");
export const schema = c.with(c.select(c.col("id")).from(c.table("users")), "cte")
                .select(c.col("id"))
                .from(c.table("cte"))
                .setDialect("postgres");
