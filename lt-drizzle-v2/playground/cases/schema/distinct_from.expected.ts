import { sql } from "drizzle-orm";
import { outQuery, pgDb, myDb, sqDb, pgUsers, myUsers, sqUsers } from "../../tables";

const pgWhere = sql`${pgUsers.age} is distinct from ${18}`;
const myWhere = sql`${myUsers.age} is distinct from ${18}`;
const sqWhere = sql`${sqUsers.age} is distinct from ${18}`;

export const expected = {
  postgres: outQuery(pgDb.select({ age: pgUsers.age }).from(pgUsers).where(pgWhere).toSQL()),
  mysql: outQuery(myDb.select({ age: myUsers.age }).from(myUsers).where(myWhere).toSQL()),
  sqlite: outQuery(sqDb.select({ age: sqUsers.age }).from(sqUsers).where(sqWhere).toSQL()),
};
