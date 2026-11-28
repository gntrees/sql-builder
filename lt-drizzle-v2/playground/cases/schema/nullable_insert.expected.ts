import { outQuery, pgDb, myDb, sqDb, pgAppUsers, myAppUsers, sqAppUsers } from "../../tables";

export const expected = {
  postgres: outQuery(pgDb.insert(pgAppUsers).values({ age: 18, name: "a" }).toSQL()),
  mysql: outQuery(myDb.insert(myAppUsers).values({ age: 18, name: "a" }).toSQL()),
  sqlite: outQuery(sqDb.insert(sqAppUsers).values({ age: 18, name: "a" }).toSQL()),
};
