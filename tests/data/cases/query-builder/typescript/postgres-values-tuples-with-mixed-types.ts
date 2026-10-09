import { sqlBuilder } from "../../../../../generated/gntrees-sql-builder/typescript/index";

const c = sqlBuilder("q");
export const schema = c.values([["a", 1], ["b", 2]]).setDialect("postgres");
