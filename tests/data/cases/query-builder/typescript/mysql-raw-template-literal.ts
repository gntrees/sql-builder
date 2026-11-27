import { sqlBuilder } from "../../../../../generated/gntrees-sql-builder/typescript/index";

const c = sqlBuilder("q");
export const schema = c.raw`SELECT ${c.col("id")} FROM ${c.table("t")}`.setDialect("mysql");
