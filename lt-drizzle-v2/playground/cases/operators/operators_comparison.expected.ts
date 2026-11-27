import { and, asc, between, count, desc, eq, exists, gt, gte, ilike, inArray, isNotNull, isNull, like, lt, lte, ne, not, notBetween, notInArray, notLike, notIlike, or, sql, sum } from "drizzle-orm";
import { alias, integer, pgSchema } from "drizzle-orm/pg-core";
import { out, outQuery, pg, my, sq, pgDb, myDb, sqDb, pgUsers, myUsers, sqUsers, pgPosts, myPosts, sqPosts, pgSub, mySub, sqSub, pgCte, myCte, sqCte } from "../../tables";


export const expected = {
  postgres: outQuery(pgDb.select({ id: pgUsers.id }).from(pgUsers).where(and(ne(pgUsers.id, 1), gt(pgUsers.age, 18), gte(pgUsers.age, 21), lt(pgUsers.age, 65), lte(pgUsers.age, 64))).toSQL()),
  mysql: outQuery(myDb.select({ id: myUsers.id }).from(myUsers).where(and(ne(myUsers.id, 1), gt(myUsers.age, 18), gte(myUsers.age, 21), lt(myUsers.age, 65), lte(myUsers.age, 64))).toSQL()),
  sqlite: outQuery(sqDb.select({ id: sqUsers.id }).from(sqUsers).where(and(ne(sqUsers.id, 1), gt(sqUsers.age, 18), gte(sqUsers.age, 21), lt(sqUsers.age, 65), lte(sqUsers.age, 64))).toSQL()),
};
