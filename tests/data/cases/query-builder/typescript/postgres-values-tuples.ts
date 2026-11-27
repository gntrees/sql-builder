import { sqlBuilder } from "../../../../../generated/gntrees-sql-builder/typescript/index";

const c = sqlBuilder("q");
export const schema = c.values([["a", "b"], ["c", "d"]]).setDialect("postgres");
