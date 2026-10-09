import { sqlBuilder } from "../../../../../generated/gntrees-sql-builder/typescript/index";

const c = sqlBuilder("q");
export const schema = c.select(c.col("x").as("alias"))
                .from(c.table("users").as("u"))
                .join(c.table("posts").as("p"), c.col("u.id").eq(c.col("p.uid")))
                .setDialect("postgres");
