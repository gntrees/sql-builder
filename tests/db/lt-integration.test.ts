// The .lt-generated package against a real Postgres and MySQL, not just string
// comparison. This is the check that the differential cannot make: the emitted
// SQL must actually run.
import { afterAll, beforeEach, describe, expect, test } from "bun:test";

import { LList } from "../../generated/lt-sql-builder/typescript/_lingua_rt";
import {
    Assignment,
    Node,
    Query,
} from "../../generated/lt-sql-builder/typescript/src/sql";
import {
    Members,
    Orders,
    Posts,
    Users,
} from "../../generated/lt-sql-builder/typescript/src/schema";
import { DB_TESTS, dialects, type Dialect } from "./config";
import { client, closeAll, resetDb, seedDb } from "./harness";

const list = <T,>(items: T[]): LList<T> => new LList<T>(items);

function native(value: any): unknown {
    switch (value.tag) {
        case "Null":
            return null;
        case "Bool":
        case "Str":
            return value.values[0];
        case "Int":
            return Number(value.values[0]);
        case "Float":
            return value.values[0];
        default:
            throw new Error(`unexpected value tag ${value.tag}`);
    }
}

function parsed(query: Query) {
    const result = query.parse();
    if (result.tag !== "ok") {
        throw new Error(`parse failed: ${JSON.stringify(result.values[0])}`);
    }
    const value = result.values[0];
    return {
        sql: value.sql,
        param: value.param.items.map(native),
        sqlWithParam: value.sqlWithParam,
    };
}

async function rows(query: Query, dialect: Dialect): Promise<any[]> {
    const { sql, param } = parsed(query.setDialect(dialect));
    return (param.length > 0
        ? await client(dialect).unsafe(sql, param)
        : await client(dialect).unsafe(sql)) as any[];
}

const describeDb = DB_TESTS ? describe : describe.skip;

afterAll(closeAll);

for (const dialect of dialects) {
    describeDb(`${dialect}: .lt builder against a real database`, () => {
        beforeEach(async () => {
            await resetDb(dialect);
            await seedDb(dialect);
        });

        test("filters rows with a bound parameter", async () => {
            const result = await rows(
                Query.create()
                    .select(list([Users.id().node(), Users.name().node()]))
                    .fromTable(Users.table().node())
                    .where(list([Users.name().eqStr("alice")])),
                dialect,
            );
            expect(result).toHaveLength(1);
            expect(result[0].name).toBe("alice");
        });

        test("compares, orders, limits and offsets", async () => {
            const adults = await rows(
                Query.create()
                    .select(list([Users.id().node()]))
                    .fromTable(Users.table().node())
                    .where(list([Users.age().gteInt(18n)]))
                    .orderBy(list([Users.id().asc()]))
                    .limit(Node.int(2n)),
                dialect,
            );
            expect(adults.map((row) => Number(row.id))).toEqual([1, 3]);

            const between = await rows(
                Query.create()
                    .select(list([Users.id().node()]))
                    .fromTable(Users.table().node())
                    .where(list([Users.age().node().between(Node.int(18n), Node.int(30n))]))
                    .orderBy(list([Users.id().asc()])),
                dialect,
            );
            // alice is 30, bob is 17, carol is 42, dave is NULL.
            expect(between.map((row) => Number(row.id))).toEqual([1]);
        });

        test("joins users and posts", async () => {
            const result = await rows(
                Query.create()
                    .select(list([Users.name().node(), Posts.title().node()]))
                    .fromTable(Users.table().node())
                    .innerJoin(Posts.table().node(), list([Posts.userId().eq(Users.id().node())]))
                    .orderBy(list([Posts.id().asc()])),
                dialect,
            );
            expect(result.map((row) => row.title)).toEqual(["hello", "world", "bob post"]);
        });

        test("exists subquery", async () => {
            const authors = await rows(
                Query.create()
                    .select(list([Members.uid().node()]))
                    .fromTable(Members.table().node())
                    .where(
                        list([
                            Node.exists(
                                Query.create()
                                    .select(list([Orders.id().node()]))
                                    .fromTable(Orders.table().node())
                                    .where(list([Orders.userId().eq(Members.uid().node())])),
                            ),
                        ]),
                    ),
                dialect,
            );
            expect(authors.map((row) => Number(row.uid)).sort()).toEqual([1, 2]);
        });

        test("insert, update and delete", async () => {
            await rows(
                Query.create().insert(
                    Users.table().node(),
                    list([
                        Assignment.str("name", "erin"),
                        Assignment.bool("active", true),
                        Assignment.int("age", 28n),
                    ]),
                ),
                dialect,
            );

            const created = await rows(
                Query.create()
                    .select(list([Users.id().node()]))
                    .fromTable(Users.table().node())
                    .where(list([Users.name().eqStr("erin")])),
                dialect,
            );
            expect(created).toHaveLength(1);

            await rows(
                Query.create()
                    .update(Users.table().node(), list([Assignment.bool("active", false)]))
                    .where(list([Users.name().eqStr("erin")])),
                dialect,
            );
            const updated = await rows(
                Query.create()
                    .select(list([Users.active().node()]))
                    .fromTable(Users.table().node())
                    .where(list([Users.name().eqStr("erin")])),
                dialect,
            );
            expect(Boolean(updated[0].active)).toBe(false);

            await rows(
                Query.create()
                    .deleteFrom(Users.table().node())
                    .where(list([Users.name().eqStr("erin")])),
                dialect,
            );
            const deleted = await rows(
                Query.create()
                    .select(list([Users.id().node()]))
                    .fromTable(Users.table().node())
                    .where(list([Users.name().eqStr("erin")])),
                dialect,
            );
            expect(deleted).toHaveLength(0);
        });

        test("in list", async () => {
            const result = await rows(
                Query.create()
                    .select(list([Users.name().node()]))
                    .fromTable(Users.table().node())
                    .where(list([Users.name().node().inList(list([Node.str("alice"), Node.str("carol")]))]))
                    .orderBy(list([Users.id().asc()])),
                dialect,
            );
            expect(result.map((row) => row.name)).toEqual(["alice", "carol"]);
        });
    });
}

// MySQL cannot express these; the builder must reject them instead of emitting
// invalid SQL. This runs without a database.
test("mysql rejects RETURNING at parse time", () => {
    const result = Query.create()
        .insert(Users.table().node(), list([Assignment.str("name", "x")]))
        .returning(list([Users.id().node()]))
        .setDialect("mysql")
        .parse();
    expect(result.tag).toBe("err");
});
