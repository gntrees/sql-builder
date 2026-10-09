import { sqlBuilder } from "../../../../../generated/gntrees-sql-builder/typescript/index";

const c = sqlBuilder("q");
export const schema = c.select(c.col("id")).from(c.table("t")).limit(5).offset(10).setDialect("postgres");
