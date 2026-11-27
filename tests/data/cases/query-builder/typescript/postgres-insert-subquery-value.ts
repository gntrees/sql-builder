import { sqlBuilder } from "../../../../../generated/gntrees-sql-builder/typescript/index";

const c = sqlBuilder("q");
export const schema = c.insert(c.table("t"), { x: c.select(c.col("id")).from(c.table("b")) })
                .setDialect("postgres");
