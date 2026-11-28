import { asc, eq } from "drizzle-orm";
import { alias as pgAlias } from "drizzle-orm/pg-core";
import { alias as myAlias } from "drizzle-orm/mysql-core";
import { alias as sqAlias } from "drizzle-orm/sqlite-core";
import { outQuery, pgDb, myDb, sqDb, pgUsers, myUsers, sqUsers, pgPosts, myPosts, sqPosts } from "../../tables";

function pg() {
  const u = pgAlias(pgUsers, "u");
  const p = pgAlias(pgPosts, "p");
  return pgDb.select({ name: u.name, title: p.title }).from(u).innerJoin(p, eq(p.userId, u.id)).orderBy(asc(p.title)).toSQL();
}

function my() {
  const u = myAlias(myUsers, "u");
  const p = myAlias(myPosts, "p");
  return myDb.select({ name: u.name, title: p.title }).from(u).innerJoin(p, eq(p.userId, u.id)).orderBy(asc(p.title)).toSQL();
}

function sq() {
  const u = sqAlias(sqUsers, "u");
  const p = sqAlias(sqPosts, "p");
  return sqDb.select({ name: u.name, title: p.title }).from(u).innerJoin(p, eq(p.userId, u.id)).orderBy(asc(p.title)).toSQL();
}

export const expected = {
  postgres: outQuery(pg()),
  mysql: outQuery(my()),
  sqlite: outQuery(sq()),
};
