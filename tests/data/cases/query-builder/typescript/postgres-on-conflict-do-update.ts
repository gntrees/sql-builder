import { sqlBuilder } from "../../../../../generated/gntrees-sql-builder/typescript/index";

const c = sqlBuilder("q");
export const schema = c.insert(c.table("t"), { name: "x" })
                .onConflictDoUpdate(c.col("id"), { name: "y" })
                .setDialect("postgres");
