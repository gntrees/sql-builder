import { expect, test } from "bun:test";
import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { sqlBuilder } from "../generated/gntrees-sql-builder/typescript/index";

/**
 * End-to-end proof that `parse` (written once in `src/parse-body.ts`) produces
 * identical results for TypeScript and Ruby. All cases run in ONE container.
 */

const rubyDir = join(import.meta.dir, "..", "generated", "gntrees-sql-builder", "ruby");
const rubyImage = "ruby:3.3-alpine";

const rubyAvailable = spawnSync("docker", ["image", "inspect", rubyImage], { encoding: "utf8" }).status === 0;

const cases: { name: string; ts: (c: any) => any; rb: string }[] = [
    {
        name: "postgres select with params",
        ts: (c) => c.select(c.col("id")).from(c.table("users")).where(c.col("active").eq(true)).limit(10).setDialect("postgres").parse(),
        rb: 'q.select(q.col("id")).from(q.table("users")).where(q.col("active").eq(true)).limit(10).setDialect("postgres").parse()',
    },
    {
        name: "mysql with order by",
        ts: (c) => c.select([c.col("id"), c.col("name")]).from(c.table("users")).where(c.col("age").gte(18)).orderBy(c.col("name").desc()).setDialect("mysql").parse(),
        rb: 'q.select([q.col("id"), q.col("name")]).from(q.table("users")).where(q.col("age").gte(18)).orderBy(q.col("name").desc()).setDialect("mysql").parse()',
    },
    {
        name: "nested and predicate",
        ts: (c) => c.select(c.col("id")).where(c.and([c.col("a").eq(1), c.col("b").eq(2)])).setDialect("postgres").parse(),
        rb: 'q.select(q.col("id")).where(q.and([q.col("a").eq(1), q.col("b").eq(2)])).setDialect("postgres").parse()',
    },
    {
        name: "or with not",
        ts: (c) => c.select(c.col("id")).where(c.or([c.col("a").eq(1), c.not(c.col("b").eq(2))])).setDialect("mysql").parse(),
        rb: 'q.select(q.col("id")).where(q.or([q.col("a").eq(1), q.not(q.col("b").eq(2))])).setDialect("mysql").parse()',
    },
    {
        name: "in predicate",
        ts: (c) => c.select(c.col("id")).where(c.col("x").in("1,2,3")).setDialect("postgres").parse(),
        rb: 'q.select(q.col("id")).where(q.col("x").in("1,2,3")).setDialect("postgres").parse()',
    },
    {
        name: "is null without params",
        ts: (c) => c.select(c.col("id")).where(c.col("x").isNull()).setDialect("postgres").parse(),
        rb: 'q.select(q.col("id")).where(q.col("x").isNull()).setDialect("postgres").parse()',
    },
    {
        name: "between",
        ts: (c) => c.select(c.col("id")).where(c.col("x").between(1, 2)).setDialect("postgres").parse(),
        rb: 'q.select(q.col("id")).where(q.col("x").between(1, 2)).setDialect("postgres").parse()',
    },
    {
        name: "insert from map",
        ts: (c) => c.insert(c.table("users"), { name: "bob" }).setDialect("postgres").parse(),
        rb: 'q.insert(q.table("users"), { "name" => "bob" }).setDialect("postgres").parse()',
    },
    {
        name: "update from map",
        ts: (c) => c.update(c.table("users"), { name: "bob", age: 3 }).setDialect("postgres").parse(),
        rb: 'q.update(q.table("users"), { "name" => "bob", "age" => 3 }).setDialect("postgres").parse()',
    },
];

test("ruby parse: generated parse() matches TypeScript for every case", () => {
    if (!rubyAvailable) {
        console.warn(`docker image ${rubyImage} is not available; skipping ruby parse test`);
        return;
    }

    const script = [
        "$LOAD_PATH.unshift(ARGV[0])",
        'require "json"',
        'require "index"',
        "def q; sqlBuilder(\"qb\"); end",
        `results = [${cases.map((c) => c.rb).join(",\n")}]`,
        "puts JSON.generate(results)",
    ].join("\n");
    const res = spawnSync("docker", ["run", "--rm", "-v", `${rubyDir}:/w`, "-w", "/w", rubyImage, "ruby", "-e", script, "/w"], { encoding: "utf8" });
    if (res.status !== 0) {
        throw new Error(`ruby parse failed:\n${res.stderr}`);
    }
    const results = JSON.parse(res.stdout) as unknown[];

    cases.forEach(({ name, ts }, index) => {
        const expected = ts(sqlBuilder("qb") as any);
        expect({ name, ...(results[index] as object) }).toEqual({ name, ...expected });
    });
}, 60000);
