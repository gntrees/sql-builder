import { sqlBuilder } from "../../../../../generated/gntrees-sql-builder/typescript/index";

const c = sqlBuilder("q");
export const schema = c.select(c.col("x")).from(c.table("t")).orderBy([c.col("name").asc(), c.col("age").desc()]).setDialect("mysql");
