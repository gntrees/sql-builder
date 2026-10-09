import { sqlBuilder } from "../../../../../generated/gntrees-sql-builder/typescript/index";

const c = sqlBuilder("q");
export const schema = c.transaction([c.insert(c.table("t"), { a: 1 }), c.insert(c.table("u"), { b: 2 })])
                .setDialect("postgres");
