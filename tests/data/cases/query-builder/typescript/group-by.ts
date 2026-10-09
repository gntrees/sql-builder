import { sqlBuilder } from "../../../../../generated/gntrees-sql-builder/typescript/index";

const c = sqlBuilder("q");
export const schema = c.select(c.col("x")).from(c.table("t")).groupBy(c.col("x")).setDialect("postgres");
