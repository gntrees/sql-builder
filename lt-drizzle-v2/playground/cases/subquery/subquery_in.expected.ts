import { and, asc, between, count, desc, eq, exists, gt, gte, ilike, inArray, isNotNull, isNull, like, lt, lte, ne, not, notBetween, notInArray, notLike, notIlike, or, sql, sum } from "drizzle-orm";
import { alias, integer, pgSchema } from "drizzle-orm/pg-core";
import { out, outQuery, pg, my, sq, pgDb, myDb, sqDb, pgUsers, myUsers, sqUsers, pgPosts, myPosts, sqPosts, pgSub, mySub, sqSub, pgCte, myCte, sqCte } from "../../tables";


export const expected = {
  postgres: outQuery(pgDb.select({ id: pgUsers.id }).from(pgUsers).where(inArray(pgUsers.id, pgDb.select({ userId: pgPosts.userId }).from(pgPosts))).toSQL()),
  mysql: outQuery(myDb.select({ id: myUsers.id }).from(myUsers).where(inArray(myUsers.id, myDb.select({ userId: myPosts.userId }).from(myPosts))).toSQL()),
  sqlite: outQuery(sqDb.select({ id: sqUsers.id }).from(sqUsers).where(inArray(sqUsers.id, sqDb.select({ userId: sqPosts.userId }).from(sqPosts))).toSQL()),
};
