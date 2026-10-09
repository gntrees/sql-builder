import { sqlBuilder } from "../../../../../generated/gntrees-sql-builder/typescript/index";

const c = sqlBuilder("q");
export const schema = c.select([c.col("id"), c.col("name")]).from(c.table("users")).where(c.col("age").gte(18)).orderBy(c.col("name").desc()).setDialect("mysql");
