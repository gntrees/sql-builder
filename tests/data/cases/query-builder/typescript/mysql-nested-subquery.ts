import { sqlBuilder } from "../../../../../generated/gntrees-sql-builder/typescript/index";

const c = sqlBuilder("q");
export const schema = c.select(c.col("id"))
                .where(c.col("id").in(
                    c.select(c.col("uid")).from(c.table("m")).where(
                        c.col("uid").in(c.select(c.col("id")).from(c.table("b")).where(c.col("ok").eq(true))),
                    ),
                ))
                .setDialect("mysql");
