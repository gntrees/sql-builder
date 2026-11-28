// Shared drizzle fixtures for the playground's expected values. These are the
// reference side; the port side lives in the .lt cases.
import { eq as eq2, sql } from "drizzle-orm";
import { MySqlDatabase, MySqlDialect, boolean as myBoolean, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import {
  PgDatabase,
  PgDialect,
  boolean as pgBoolean,
  integer,
  pgTable,
  serial,
  text,
} from "drizzle-orm/pg-core";
import {
  BaseSQLiteDatabase,
  SQLiteSyncDialect,
  integer as sqInteger,
  sqliteTable,
  text as sqText,
} from "drizzle-orm/sqlite-core";

import { line } from "./line";

export const pg = new PgDialect();
export const my = new MySqlDialect();
export const sq = new SQLiteSyncDialect();

export const pgDb = new (PgDatabase as any)(pg, {});
export const myDb = new (MySqlDatabase as any)(my, {});
export const sqDb = new (BaseSQLiteDatabase as any)("sync", sq, {});

export const pgUsers = pgTable("users", {
  id: serial("id"),
  name: text("name"),
  age: integer("age"),
});
export const pgPosts = pgTable("posts", {
  id: serial("id"),
  userId: integer("user_id"),
  title: text("title"),
});
export const pgAccounts = pgTable("accounts", { id: integer("account_id") });

// Full application-shaped users, used by the generated-schema cases.
export const pgAppUsers = pgTable("users", {
  id: serial("id"),
  name: text("name").notNull(),
  active: pgBoolean("active").notNull().default(false),
  age: integer("age"),
  email: text("email"),
  role: text("role").notNull().default("user"),
});

export const myUsers = mysqlTable("users", {
  id: int("id"),
  name: varchar("name", { length: 255 }),
  age: int("age"),
});
export const myPosts = mysqlTable("posts", {
  id: int("id"),
  userId: int("user_id"),
  title: varchar("title", { length: 255 }),
});

export const myAppUsers = mysqlTable("users", {
  id: int("id"),
  name: varchar("name", { length: 255 }).notNull(),
  active: myBoolean("active").notNull().default(false),
  age: int("age"),
  email: varchar("email", { length: 320 }),
  role: varchar("role", { length: 255 }).notNull().default("user"),
});

export const sqUsers = sqliteTable("users", {
  id: sqInteger("id"),
  name: sqText("name"),
  age: sqInteger("age"),
});
export const sqPosts = sqliteTable("posts", {
  id: sqInteger("id"),
  userId: sqInteger("user_id"),
  title: sqText("title"),
});

export const sqAppUsers = sqliteTable("users", {
  id: sqInteger("id"),
  name: sqText("name"),
  active: sqInteger("active"),
  age: sqInteger("age"),
  email: sqText("email"),
  role: sqText("role"),
});

export const pgSub = pgDb.select({ id: pgUsers.id, name: pgUsers.name }).from(pgUsers).as("s");
export const mySub = myDb.select({ id: myUsers.id, name: myUsers.name }).from(myUsers).as("s");
export const sqSub = sqDb.select({ id: sqUsers.id, name: sqUsers.name }).from(sqUsers).as("s");

export const pgCte = pgDb.$with("active").as(pgDb.select({ id: pgUsers.id }).from(pgUsers).where(eq2(pgUsers.name, "a")));
export const myCte = myDb.$with("active").as(myDb.select({ id: myUsers.id }).from(myUsers).where(eq2(myUsers.name, "a")));
export const sqCte = sqDb.$with("active").as(sqDb.select({ id: sqUsers.id }).from(sqUsers).where(eq2(sqUsers.name, "a")));

export type AnyDialect = PgDialect | MySqlDialect | SQLiteSyncDialect;
export type Query = { sql: string; params: readonly unknown[] };

/** Drizzle deparse of a raw `sql` fragment. */
export function out(dialect: AnyDialect, query: { getSQL?: unknown }): string {
  const result = (dialect as any).sqlToQuery(query);
  return line(result.sql, result.params);
}

/** Drizzle deparse of a query builder (`db.select(...).toSQL()`). */
export function outQuery(result: Query): string {
  return line(result.sql, result.params);
}

export { sql };
