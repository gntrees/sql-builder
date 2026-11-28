import { eq } from "drizzle-orm";
import { outQuery, pgDb, myDb, sqDb, pgUsers, myUsers, sqUsers, pgPosts, myPosts, sqPosts } from "../../tables";

export const expected = {
  postgres: outQuery(
    pgDb.select({ name: pgUsers.name, title: pgPosts.title }).from(pgUsers).innerJoin(pgPosts, eq(pgPosts.userId, pgUsers.id)).toSQL(),
  ),
  mysql: outQuery(
    myDb.select({ name: myUsers.name, title: myPosts.title }).from(myUsers).innerJoin(myPosts, eq(myPosts.userId, myUsers.id)).toSQL(),
  ),
  sqlite: outQuery(
    sqDb.select({ name: sqUsers.name, title: sqPosts.title }).from(sqUsers).innerJoin(sqPosts, eq(sqPosts.userId, sqUsers.id)).toSQL(),
  ),
};
