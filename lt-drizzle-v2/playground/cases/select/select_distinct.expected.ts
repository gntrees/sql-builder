import { and, asc, between, count, desc, eq, exists, gt, gte, ilike, inArray, isNotNull, isNull, like, lt, lte, ne, not, notBetween, notInArray, notLike, notIlike, or, sql, sum } from "drizzle-orm";
import { alias, integer, pgSchema } from "drizzle-orm/pg-core";
import { out, outQuery, pg, my, sq, pgDb, myDb, sqDb, pgUsers, myUsers, sqUsers, pgPosts, myPosts, sqPosts, pgSub, mySub, sqSub, pgCte, myCte, sqCte } from "../../tables";


export const expected = {
  postgres: outQuery(pgDb.selectDistinct({ id: pgUsers.id }).from(pgUsers).toSQL()),
  mysql: outQuery(myDb.selectDistinct({ id: myUsers.id }).from(myUsers).toSQL()),
  sqlite: outQuery(sqDb.selectDistinct({ id: sqUsers.id }).from(sqUsers).toSQL()),
};
