import { sqlBuilder } from "../../../../../generated/gntrees-sql-builder/typescript/index";

const c = sqlBuilder("q");
export const schema = c.select(c.col("id")).where(c.col("x").in("1,2,3")).setDialect("postgres");
