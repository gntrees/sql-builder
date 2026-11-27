import { and, asc, between, count, desc, eq, exists, gt, gte, ilike, inArray, isNotNull, isNull, like, lt, lte, ne, not, notBetween, notInArray, notLike, notIlike, or, sql, sum } from "drizzle-orm";
import { alias, integer, pgSchema } from "drizzle-orm/pg-core";
import { out, outQuery, pg, my, sq, pgDb, myDb, sqDb, pgUsers, myUsers, sqUsers, pgPosts, myPosts, sqPosts, pgSub, mySub, sqSub, pgCte, myCte, sqCte } from "../../tables";


export const expected = {
  postgres: outQuery(pgDb.select({ id: pgUsers.id }).from(pgUsers).where(exists(pgDb.select({ id: pgPosts.id }).from(pgPosts).where(eq(pgPosts.userId, pgUsers.id)))).toSQL()),
  mysql: outQuery(myDb.select({ id: myUsers.id }).from(myUsers).where(exists(myDb.select({ id: myPosts.id }).from(myPosts).where(eq(myPosts.userId, myUsers.id)))).toSQL()),
  sqlite: outQuery(sqDb.select({ id: sqUsers.id }).from(sqUsers).where(exists(sqDb.select({ id: sqPosts.id }).from(sqPosts).where(eq(sqPosts.userId, sqUsers.id)))).toSQL()),
};
