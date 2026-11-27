import { and, asc, between, count, desc, eq, exists, gt, gte, ilike, inArray, isNotNull, isNull, like, lt, lte, ne, not, notBetween, notInArray, notLike, notIlike, or, sql, sum } from "drizzle-orm";
import { alias, integer, pgSchema } from "drizzle-orm/pg-core";
import { out, outQuery, pg, my, sq, pgDb, myDb, sqDb, pgUsers, myUsers, sqUsers, pgPosts, myPosts, sqPosts, pgSub, mySub, sqSub, pgCte, myCte, sqCte } from "../../tables";


export const expected = {
  postgres: outQuery(pgDb.select({ age: pgUsers.age, n: count() }).from(pgUsers).groupBy(pgUsers.age).having(gt(count(), 1)).toSQL()),
  mysql: outQuery(myDb.select({ age: myUsers.age, n: count() }).from(myUsers).groupBy(myUsers.age).having(gt(count(), 1)).toSQL()),
  sqlite: outQuery(sqDb.select({ age: sqUsers.age, n: count() }).from(sqUsers).groupBy(sqUsers.age).having(gt(count(), 1)).toSQL()),
};
