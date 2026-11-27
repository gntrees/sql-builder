import { sqlBuilder } from "../../../../../generated/gntrees-sql-builder/typescript/index";

const c = sqlBuilder("q");
export const schema = c.select(c.select(c.col("cnt")).from(c.table("t")).as("c"))
                .from(c.table("u"))
                .setDialect("postgres");
