import { expect, test } from "bun:test";
import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { sqlBuilder } from "../generated/gntrees-sql-builder/typescript/index";

/**
 * End-to-end proof that the *custom function* `parse` — written once in
 * `src/parse-body.ts` and rendered by Lingua Tungga — produces identical results
 * for TypeScript and Python.
 *
 * The generated Python module (`generated/.../python/index.py` + `lt.py`) is
 * imported and the same query is built in Python; its `parse()` output is
 * compared with the TypeScript `parse()` output.
 */

const pythonDir = join(import.meta.dir, "..", "generated", "gntrees-sql-builder", "python");

const pythonAvailable = (() => {
    const res = spawnSync("python3", ["--version"], { encoding: "utf8" });
    return res.status === 0;
})();

function runPythonParse(expression: string): { sql: string; sqlWithParam: string; param: unknown[] } {
    const script = [
        "import json, sys",
        "sys.path.insert(0, sys.argv[1])",
        "import index",
        'c = index.sqlBuilder("qb")',
        `r = ${expression}`,
        "print(json.dumps(r))",
    ].join("\n");
    const res = spawnSync("python3", ["-c", script, pythonDir], { encoding: "utf8" });
    if (res.status !== 0) {
        throw new Error(`python parse failed:\n${res.stderr}`);
    }
    return JSON.parse(res.stdout);
}

const cases: { name: string; ts: (c: any) => any; py: string }[] = [
    {
        name: "postgres select with params",
        ts: (c) => c.select(c.col("id")).from(c.table("users")).where(c.col("active").eq(true)).limit(10).setDialect("postgres").parse(),
        py: 'c.select(c.col("id")).from_(c.table("users")).where(c.col("active").eq(True)).limit(10).setDialect("postgres").parse()',
    },
    {
        name: "mysql with order by",
        ts: (c) => c.select([c.col("id"), c.col("name")]).from(c.table("users")).where(c.col("age").gte(18)).orderBy(c.col("name").desc()).setDialect("mysql").parse(),
        py: 'c.select([c.col("id"), c.col("name")]).from_(c.table("users")).where(c.col("age").gte(18)).orderBy(c.col("name").desc()).setDialect("mysql").parse()',
    },
    {
        name: "nested and predicate",
        ts: (c) => c.select(c.col("id")).where(c.and([c.col("a").eq(1), c.col("b").eq(2)])).setDialect("postgres").parse(),
        py: 'c.select(c.col("id")).where(c.and_([c.col("a").eq(1), c.col("b").eq(2)])).setDialect("postgres").parse()',
    },
    {
        name: "or with not",
        ts: (c) => c.select(c.col("id")).where(c.or([c.col("a").eq(1), c.not(c.col("b").eq(2))])).setDialect("mysql").parse(),
        py: 'c.select(c.col("id")).where(c.or_([c.col("a").eq(1), c.not_(c.col("b").eq(2))])).setDialect("mysql").parse()',
    },
    {
        name: "in predicate",
        ts: (c) => c.select(c.col("id")).where(c.col("x").in("1,2,3")).setDialect("postgres").parse(),
        py: 'c.select(c.col("id")).where(c.col("x").in_("1,2,3")).setDialect("postgres").parse()',
    },
    {
        name: "is null without params",
        ts: (c) => c.select(c.col("id")).where(c.col("x").isNull()).setDialect("postgres").parse(),
        py: 'c.select(c.col("id")).where(c.col("x").isNull()).setDialect("postgres").parse()',
    },
    {
        name: "between",
        ts: (c) => c.select(c.col("id")).where(c.col("x").between(1, 2)).setDialect("postgres").parse(),
        py: 'c.select(c.col("id")).where(c.col("x").between(1, 2)).setDialect("postgres").parse()',
    },
    {
        name: "insert from map",
        ts: (c) => c.insert(c.table("users"), { name: "bob" }).setDialect("postgres").parse(),
        py: 'c.insert(c.table("users"), {"name": "bob"}).setDialect("postgres").parse()',
    },
    {
        name: "update from map",
        ts: (c) => c.update(c.table("users"), { name: "bob", age: 3 }).setDialect("postgres").parse(),
        py: 'c.update(c.table("users"), {"name": "bob", "age": 3}).setDialect("postgres").parse()',
    },
];

test("python parse: generated parse() matches TypeScript for every case", () => {
    if (!pythonAvailable) {
        console.warn("python3 is not available; skipping python parse test");
        return;
    }

    for (const { name, ts, py } of cases) {
        const expected = ts(sqlBuilder("qb") as any);
        const actual = runPythonParse(py);
        expect({ name, ...actual }).toEqual({ name, ...expected });
    }
});
