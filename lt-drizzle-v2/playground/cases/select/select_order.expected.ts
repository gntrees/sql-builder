import { and, asc, between, count, desc, eq, exists, gt, gte, ilike, inArray, isNotNull, isNull, like, lt, lte, ne, not, notBetween, notInArray, notLike, notIlike, or, sql, sum } from "drizzle-orm";
import { alias, integer, pgSchema } from "drizzle-orm/pg-core";
import { out, outQuery, pg, my, sq, pgDb, myDb, sqDb, pgUsers, myUsers, sqUsers, pgPosts, myPosts, sqPosts, pgSub, mySub, sqSub, pgCte, myCte, sqCte } from "../../tables";


export const expected = {
  postgres: outQuery(pgDb.select({ id: pgUsers.id }).from(pgUsers).orderBy(asc(pgUsers.name), desc(pgUsers.id)).toSQL()),
  mysql: outQuery(myDb.select({ id: myUsers.id }).from(myUsers).orderBy(asc(myUsers.name), desc(myUsers.id)).toSQL()),
  sqlite: outQuery(sqDb.select({ id: sqUsers.id }).from(sqUsers).orderBy(asc(sqUsers.name), desc(sqUsers.id)).toSQL()),
};
