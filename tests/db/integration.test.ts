import { afterAll, beforeEach, describe, expect, test } from "bun:test";
import { sqlBuilder } from "../../generated/gntrees-sql-builder/typescript/index";
import { DB_TESTS, dialects, supports, type Dialect } from "./config";
import { closeAll, execute, resetDb, seedDb } from "./harness";

const qb = () => sqlBuilder("q") as any;

const describeDb = DB_TESTS ? describe : describe.skip;

afterAll(closeAll);

for (const dialect of dialects) {
    describeDb(`${dialect}: generated SQL against a real database`, () => {
        beforeEach(async () => {
            await resetDb(dialect);
            await seedDb(dialect);
        });

        test("filters rows with a bound parameter", async () => {
            const c = qb();
            const { sql, param, rows } = await execute(
                dialect,
                c.select([c.col("id"), c.col("name")]).from(c.table("users")).where(c.col("name").eq("alice")),
            );
            expect(sql).toBeTypeOf("string");
            expect(param).toEqual(["alice"]);
            expect(rows).toHaveLength(1);
            expect(rows[0].name).toBe("alice");
        });

        test("orders, limits and offsets rows", async () => {
            const c = qb();
            const { rows } = await execute(
                dialect,
                c.select(c.col("id")).from(c.table("users")).orderBy(c.col("id").asc()).limit(2).offset(1),
            );
            expect(rows.map((row) => Number(row.id))).toEqual([2, 3]);
        });

        test("applies comparison operators", async () => {
            const gte = qb();
            const adults = await execute(
                dialect,
                gte.select(gte.col("id")).from(gte.table("users")).where(gte.col("age").gte(18)),
            );
            expect(adults.rows.map((row) => Number(row.id))).toEqual([1, 3]);

            const lt = qb();
            const minors = await execute(
                dialect,
                lt.select(lt.col("id")).from(lt.table("users")).where(lt.col("age").lt(18)),
            );
            expect(minors.rows.map((row) => Number(row.id))).toEqual([2]);
        });

        test("combines predicates with and/or/not", async () => {
            const and = qb();
            const activeAdults = await execute(
                dialect,
                and.select(and.col("id")).from(and.table("users")).where(
                    and.and([and.col("active").eq(true), and.col("age").gt(18)]),
                ),
            );
            expect(activeAdults.rows.map((row) => Number(row.id))).toEqual([1, 3]);

            const or = qb();
            const either = await execute(
                dialect,
                or.select(or.col("id")).from(or.table("users")).where(
                    or.or([or.col("name").eq("alice"), or.col("name").eq("bob")]),
                ),
            );
            expect(either.rows).toHaveLength(2);

            const not = qb();
            const others = await execute(
                dialect,
                not.select(not.col("id")).from(not.table("users")).where(not.not(not.col("name").eq("alice"))),
            );
            expect(others.rows).toHaveLength(3);
        });

        test("supports null checks", async () => {
            const isNull = qb();
            const missing = await execute(
                dialect,
                isNull.select(isNull.col("id")).from(isNull.table("users")).where(isNull.col("age").isNull()),
            );
            expect(missing.rows.map((row) => Number(row.id))).toEqual([4]);

            const isNotNull = qb();
            const present = await execute(
                dialect,
                isNotNull.select(isNotNull.col("id")).from(isNotNull.table("users")).where(isNotNull.col("age").isNotNull()),
            );
            expect(present.rows).toHaveLength(3);
        });

        test("supports between and in predicates", async () => {
            const between = qb();
            const mid = await execute(
                dialect,
                between.select(between.col("id")).from(between.table("users")).where(between.col("age").between(18, 40)),
            );
            expect(mid.rows.map((row) => Number(row.id))).toEqual([1]);

            const inList = qb();
            const one = await execute(
                dialect,
                inList.select(inList.col("id")).from(inList.table("users")).where(inList.col("name").in("carol")),
            );
            expect(one.rows.map((row) => Number(row.id))).toEqual([3]);
        });

        test("groups rows and filters with having", async () => {
            const c = qb();
            const { rows } = await execute(
                dialect,
                c.select(c.col("age")).from(c.table("users")).groupBy(c.col("age")).having(c.col("age").gt(18)),
            );
            expect(rows.map((row) => Number(row.age)).sort((a, b) => a - b)).toEqual([30, 42]);
        });

        test("joins two tables", async () => {
            const c = qb();
            const { rows } = await execute(
                dialect,
                c.select([c.col("name"), c.col("title")])
                    .from(c.table("authors"))
                    .join(c.table("books"), c.col("id").eq(c.col("author_id"))),
            );
            expect(rows).toHaveLength(3);
            expect(rows.map((row) => row.title).sort()).toEqual(["b1", "b2", "b3"]);
        });

        test("left joins keeping unmatched rows", async () => {
            const c = qb();
            const { rows } = await execute(
                dialect,
                c.select([c.col("name"), c.col("title")])
                    .from(c.table("authors"))
                    .leftJoin(c.table("books"), c.col("id").eq(c.col("author_id"))),
            );
            expect(rows).toHaveLength(4);
            expect(rows.filter((row) => row.title === null)).toHaveLength(1);
        });

        test("inserts rows", async () => {
            const c = qb();
            await execute(dialect, c.insert(c.table("users"), { name: "erin", active: true, age: 25 }));

            const verify = qb();
            const { rows } = await execute(
                dialect,
                verify.select(verify.col("age")).from(verify.table("users")).where(verify.col("name").eq("erin")),
            );
            expect(rows).toHaveLength(1);
            expect(Number(rows[0].age)).toBe(25);
        });

        test("updates rows with a map assignment", async () => {
            const c = qb();
            await execute(dialect, c.update(c.table("users"), { name: "alice2", age: 31 }).where(c.col("name").eq("alice")));

            const verify = qb();
            const { rows } = await execute(
                dialect,
                verify.select([verify.col("name"), verify.col("age")]).from(verify.table("users")).where(verify.col("id").eq(1)),
            );
            expect(rows[0].name).toBe("alice2");
            expect(Number(rows[0].age)).toBe(31);
        });

        test("deletes rows", async () => {
            // carol has no posts or orders, so the foreign keys from the
            // application schema do not block the delete.
            const c = qb();
            await execute(dialect, c.delete(c.table("users")).where(c.col("name").eq("carol")));

            const verify = qb();
            const { rows } = await execute(dialect, verify.select(verify.col("id")).from(verify.table("users")));
            expect(rows).toHaveLength(3);
        });

        test.skipIf(!supports(dialect, "values"))(`builds values tuples (${dialect})`, async () => {
            const c = qb();
            const { rows } = await execute(dialect, c.values([["a", 1], ["b", 2]]));
            expect(rows).toHaveLength(2);
        });

        test("binds parameters instead of inlining them", async () => {
            const insert = qb();
            await execute(dialect, insert.insert(insert.table("users"), { name: "O'Brien" }));

            const select = qb();
            const { rows } = await execute(
                dialect,
                select.select(select.col("name")).from(select.table("users")).where(select.col("name").eq("O'Brien")),
            );
            expect(rows).toHaveLength(1);
            expect(rows[0].name).toBe("O'Brien");
        });

        test("renders raw template literals with bound parameters", async () => {
            const c = qb();
            const { rows } = await execute(
                dialect,
                c.select(c.col("id")).from(c.table("t")).where(c.raw`x = ${10}`),
            );
            expect(rows.map((row) => Number(row.id))).toEqual([1]);
        });

        test("uses a common table expression", async () => {
            const c = qb();
            const adults = c.select(c.col("id")).from(c.table("users")).where(c.col("age").gt(18));
            const { rows } = await execute(
                dialect,
                c.with(adults, "adults").select(c.col("id")).from(c.table("adults")),
            );
            expect(rows.map((row) => Number(row.id)).sort((a, b) => a - b)).toEqual([1, 3]);
        });

        test("uses an in-subquery", async () => {
            const c = qb();
            const { rows } = await execute(
                dialect,
                c.select(c.col("id"))
                    .from(c.table("users"))
                    .where(c.col("id").in(c.select(c.col("user_id")).from(c.table("orders")).where(c.col("total").gt(100)))),
            );
            expect(rows.map((row) => Number(row.id)).sort((a, b) => a - b)).toEqual([1, 2]);
        });

        test("uses an exists subquery", async () => {
            const c = qb();
            const { rows } = await execute(
                dialect,
                c.select(c.col("id"))
                    .from(c.table("users"))
                    .where(c.exists(c.select(c.col("id")).from(c.table("orders")).where(c.col("total").gt(100)))),
            );
            expect(rows).toHaveLength(4);
        });

        test("selects from a subquery with an alias", async () => {
            const c = qb();
            const { rows } = await execute(
                dialect,
                c.select(c.col("id")).from(c.select(c.col("id")).from(c.table("users")).as("u2")),
            );
            expect(rows).toHaveLength(4);
        });

        test("selects a scalar subquery with an alias", async () => {
            const c = qb();
            const inner = c.select(c.col("id")).from(c.table("t")).limit(1).as("c");
            const { rows } = await execute(dialect, c.select(inner).from(c.table("u")));
            expect(rows).toHaveLength(2);
            expect(rows.map((row) => Number(row.c))).toEqual([1, 1]);
        });

        test.skipIf(!supports(dialect, "returning"))(`returning clause (${dialect})`, async () => {
            const c = qb();
            const { rows } = await execute(
                dialect,
                c.insert(c.table("users"), { name: "erin", active: true, age: 25 }).returning(c.col("id")),
            );
            expect(rows).toHaveLength(1);
            expect(Number(rows[0].id)).toBe(5);
        });

        test.skipIf(!supports(dialect, "onConflict"))(`on conflict do update (${dialect})`, async () => {
            const c = qb();
            await execute(
                dialect,
                c.insert(c.table("t"), { id: 1, name: "z" }).onConflictDoUpdate(c.col("id"), { name: "z" }),
            );

            const verify = qb();
            const { rows } = await execute(
                dialect,
                verify.select(verify.col("name")).from(verify.table("t")).where(verify.col("id").eq(1)),
            );
            expect(rows[0].name).toBe("z");

            const count = qb();
            const all = await execute(dialect, count.select(count.col("id")).from(count.table("t")));
            expect(all.rows).toHaveLength(2);
        });

        test.skipIf(!supports(dialect, "transaction"))(`transaction block (${dialect})`, async () => {
            const c = qb();
            await execute(dialect, c.transaction("DELETE FROM users WHERE name = 'dave'"));

            const verify = qb();
            const { rows } = await execute(dialect, verify.select(verify.col("id")).from(verify.table("users")));
            expect(rows).toHaveLength(3);
        });

        test(`quotes dotted column refs as separate identifiers (${dialect})`, async () => {
            const c = qb();
            const { rows } = await execute(
                dialect,
                c.select(c.col("users.id"))
                    .from(c.table("users"))
                    .join(c.table("posts"), c.col("users.id").eq(c.col("posts.user_id"))),
            );
            expect(rows).toHaveLength(3);
        });

        test(`maps ilike to a working predicate (${dialect})`, async () => {
            const c = qb();
            const { rows } = await execute(
                dialect,
                c.select(c.col("id")).from(c.table("users")).where(c.col("name").ilike("ali%")),
            );
            expect(rows.map((row) => Number(row.id))).toEqual([1]);
        });

        if (dialect === "mysql") {
            test("rejects unsupported RETURNING", () => {
                const c = qb();
                expect(() =>
                    c.select(c.col("id")).from(c.table("t")).returning(c.col("id")).setDialect("mysql").parse(),
                ).toThrow(/RETURNING/);
            });

            test("rejects unsupported FULL JOIN", () => {
                const c = qb();
                expect(() =>
                    c.select(c.col("id"))
                        .from(c.table("a"))
                        .fullJoin(c.table("b"), c.col("x").eq(c.col("y")))
                        .setDialect("mysql")
                        .parse(),
                ).toThrow(/FULL JOIN/);
            });

            test("rejects unsupported ON CONFLICT DO NOTHING", () => {
                const c = qb();
                expect(() =>
                    c.insert(c.table("t"), { name: "x" }).onConflictDoNothing(c.col("id")).setDialect("mysql").parse(),
                ).toThrow(/NOTHING/);
            });
        }
    });
}

if (!DB_TESTS) {
    test("real-database tests are skipped (set DB_TESTS=1 to run them)", () => {
        expect(dialects).toEqual(["postgres", "mysql"]);
    });
}
