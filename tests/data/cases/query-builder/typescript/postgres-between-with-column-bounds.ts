import { sqlBuilder } from "../../../../../generated/gntrees-sql-builder/typescript/index";

const c = sqlBuilder("q");
export const schema = c.select(c.col("id")).where(c.col("x").between(c.col("lo"), c.col("hi"))).setDialect("postgres");
