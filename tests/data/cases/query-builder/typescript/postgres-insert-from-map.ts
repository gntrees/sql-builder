import { sqlBuilder } from "../../../../../generated/gntrees-sql-builder/typescript/index";

const c = sqlBuilder("q");
export const schema = c.insert(c.table("users"), { name: "bob" }).setDialect("postgres");
