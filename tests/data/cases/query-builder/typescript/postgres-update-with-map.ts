import { sqlBuilder } from "../../../../../generated/gntrees-sql-builder/typescript/index";

const c = sqlBuilder("q");
export const schema = c.update(c.table("users"), { name: "bob", age: 3 }).setDialect("postgres");
