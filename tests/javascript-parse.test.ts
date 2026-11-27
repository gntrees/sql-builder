import { expect, test } from "bun:test";
import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { sqlBuilder } from "../generated/gntrees-sql-builder/typescript/index";

/**
 * End-to-end proof that `parse` (written once in `src/parse-body.ts`) produces
 * identical results for TypeScript and JavaScript. The generated JS module is
 * imported with `node` and the same query is built; `parse()` output is compared.
 */

const jsEntry = join(import.meta.dir, "..", "generated", "gntrees-sql-builder", "javascript", "index.js");

const nodeAvailable = (() => {
    const res = spawnSync("node", ["--version"], { encoding: "utf8" });
    return res.status === 0;
})();

function runJsParse(expression: string): { sql: string; sqlWithParam: string; param: unknown[] } {
    const script = [
        `import { sqlBuilder } from ${JSON.stringify(pathToFileURL(jsEntry).href)};`,
        'const c = sqlBuilder("qb");',
        `const r = ${expression};`,
        "console.log(JSON.stringify(r));",
    ].join("\n");
    const res = spawnSync("node", ["--input-type=module", "-e", script], { encoding: "utf8" });
    if (res.status !== 0) {
        throw new Error(`node parse failed:\n${res.stderr}`);
    }
    return JSON.parse(res.stdout);
}

const cases: { name: string; ts: (c: any) => any; js: string }[] = [
    {
        name: "postgres select with params",
        ts: (c) => c.select(c.col("id")).from(c.table("users")).where(c.col("active").eq(true)).limit(10).setDialect("postgres").parse(),
        js: 'c.select(c.col("id")).from(c.table("users")).where(c.col("active").eq(true)).limit(10).setDialect("postgres").parse()',
    },
    {
        name: "mysql with order by",
        ts: (c) => c.select([c.col("id"), c.col("name")]).from(c.table("users")).where(c.col("age").gte(18)).orderBy(c.col("name").desc()).setDialect("mysql").parse(),
        js: 'c.select([c.col("id"), c.col("name")]).from(c.table("users")).where(c.col("age").gte(18)).orderBy(c.col("name").desc()).setDialect("mysql").parse()',
    },
    {
        name: "nested and predicate",
        ts: (c) => c.select(c.col("id")).where(c.and([c.col("a").eq(1), c.col("b").eq(2)])).setDialect("postgres").parse(),
        js: 'c.select(c.col("id")).where(c.and([c.col("a").eq(1), c.col("b").eq(2)])).setDialect("postgres").parse()',
    },
    {
        name: "or with not",
        ts: (c) => c.select(c.col("id")).where(c.or([c.col("a").eq(1), c.not(c.col("b").eq(2))])).setDialect("mysql").parse(),
        js: 'c.select(c.col("id")).where(c.or([c.col("a").eq(1), c.not(c.col("b").eq(2))])).setDialect("mysql").parse()',
    },
    {
        name: "in predicate",
        ts: (c) => c.select(c.col("id")).where(c.col("x").in("1,2,3")).setDialect("postgres").parse(),
        js: 'c.select(c.col("id")).where(c.col("x").in("1,2,3")).setDialect("postgres").parse()',
    },
    {
        name: "is null without params",
        ts: (c) => c.select(c.col("id")).where(c.col("x").isNull()).setDialect("postgres").parse(),
        js: 'c.select(c.col("id")).where(c.col("x").isNull()).setDialect("postgres").parse()',
    },
    {
        name: "between",
        ts: (c) => c.select(c.col("id")).where(c.col("x").between(1, 2)).setDialect("postgres").parse(),
        js: 'c.select(c.col("id")).where(c.col("x").between(1, 2)).setDialect("postgres").parse()',
    },
    {
        name: "insert from map",
        ts: (c) => c.insert(c.table("users"), { name: "bob" }).setDialect("postgres").parse(),
        js: 'c.insert(c.table("users"), { name: "bob" }).setDialect("postgres").parse()',
    },
    {
        name: "update from map",
        ts: (c) => c.update(c.table("users"), { name: "bob", age: 3 }).setDialect("postgres").parse(),
        js: 'c.update(c.table("users"), { name: "bob", age: 3 }).setDialect("postgres").parse()',
    },
];

test("javascript parse: generated parse() matches TypeScript for every case", () => {
    if (!nodeAvailable) {
        console.warn("node is not available; skipping javascript parse test");
        return;
    }

    for (const { name, ts, js } of cases) {
        const expected = ts(sqlBuilder("qb") as any);
        const actual = runJsParse(js);
        expect({ name, ...actual }).toEqual({ name, ...expected });
    }
});
