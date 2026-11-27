import { expect, test } from "bun:test";
import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { writeFileSync, mkdtempSync, mkdirSync, copyFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { sqlBuilder } from "../generated/gntrees-sql-builder/typescript/index";

/**
 * End-to-end proof that the *custom function* `parse` — written once in
 * `src/parse-body.ts` and rendered by Lingua Tungga — produces identical results
 * for TypeScript and Go.
 *
 * The generated Go module (`generated/.../go/index.go` + `lt.go`) is run with the
 * `golang` Docker image; a small driver builds the same 9 queries in Go and its
 * `parse()` output is compared with the TypeScript `parse()` output.
 */

const goDir = join(import.meta.dir, "..", "generated", "gntrees-sql-builder", "go");

const dockerAvailable = (() => {
    try {
        const res = spawnSync("docker", ["--version"], { encoding: "utf8" });
        return res.status === 0;
    } catch {
        return false;
    }
})();

type ParseResult = { sql: string; sqlWithParam: string; param: unknown[] };

const cases: { name: string; ts: (c: any) => ParseResult; go: string }[] = [
    {
        name: "postgres select with params",
        ts: (c) => c.select(c.col("id")).from(c.table("users")).where(c.col("active").eq(true)).limit(10).setDialect("postgres").parse(),
        go: 'c.Select(c.Col("id")).From(c.Table("users")).Where(c.Col("active").Eq(true)).Limit(10).SetDialect("postgres").Parse()',
    },
    {
        name: "mysql with order by",
        ts: (c) => c.select([c.col("id"), c.col("name")]).from(c.table("users")).where(c.col("age").gte(18)).orderBy(c.col("name").desc()).setDialect("mysql").parse(),
        go: 'c.Select([]any{c.Col("id"), c.Col("name")}).From(c.Table("users")).Where(c.Col("age").Gte(18)).OrderBy(c.Col("name").Desc()).SetDialect("mysql").Parse()',
    },
    {
        name: "nested and predicate",
        ts: (c) => c.select(c.col("id")).where(c.and([c.col("a").eq(1), c.col("b").eq(2)])).setDialect("postgres").parse(),
        go: 'c.Select(c.Col("id")).Where(c.And([]any{c.Col("a").Eq(1), c.Col("b").Eq(2)})).SetDialect("postgres").Parse()',
    },
    {
        name: "or with not",
        ts: (c) => c.select(c.col("id")).where(c.or([c.col("a").eq(1), c.not(c.col("b").eq(2))])).setDialect("mysql").parse(),
        go: 'c.Select(c.Col("id")).Where(c.Or([]any{c.Col("a").Eq(1), c.Not(c.Col("b").Eq(2))})).SetDialect("mysql").Parse()',
    },
    {
        name: "in predicate",
        ts: (c) => c.select(c.col("id")).where(c.col("x").in("1,2,3")).setDialect("postgres").parse(),
        go: 'c.Select(c.Col("id")).Where(c.Col("x").In("1,2,3")).SetDialect("postgres").Parse()',
    },
    {
        name: "is null without params",
        ts: (c) => c.select(c.col("id")).where(c.col("x").isNull()).setDialect("postgres").parse(),
        go: 'c.Select(c.Col("id")).Where(c.Col("x").IsNull()).SetDialect("postgres").Parse()',
    },
    {
        name: "between",
        ts: (c) => c.select(c.col("id")).where(c.col("x").between(1, 2)).setDialect("postgres").parse(),
        go: 'c.Select(c.Col("id")).Where(c.Col("x").Between(1, 2)).SetDialect("postgres").Parse()',
    },
    {
        name: "insert from map",
        ts: (c) => c.insert(c.table("users"), { name: "bob" }).setDialect("postgres").parse(),
        go: 'c.Insert(c.Table("users"), gntrees.Obj("name", "bob")).SetDialect("postgres").Parse()',
    },
    {
        name: "update from map",
        ts: (c) => c.update(c.table("users"), { name: "bob", age: 3 }).setDialect("postgres").parse(),
        go: 'c.Update(c.Table("users"), gntrees.Obj("name", "bob", "age", 3)).SetDialect("postgres").Parse()',
    },
];

function buildDriver(): string {
    const body = cases
        .map((testCase) => `\t{\n\t\tc := gntrees.NewSqlBuilder("qb")\n\t\tprintJSON(${testCase.go})\n\t}`)
        .join("\n");
    return [
        "package main",
        "",
        "import (",
        '\t"encoding/json"',
        '\t"fmt"',
        "",
        '\t"gntrees"',
        ")",
        "",
        "func printJSON(v any) {",
        "\tdata, err := json.Marshal(v)",
        "\tif err != nil {",
        "\t\tpanic(err)",
        "\t}",
        "\tfmt.Println(string(data))",
        "}",
        "",
        "func main() {",
        body,
        "}",
        "",
    ].join("\n");
}

test("go parse: generated parse() matches TypeScript for every case", () => {
    if (!dockerAvailable) {
        console.warn("docker is not available; skipping go parse test");
        return;
    }

    const dir = mkdtempSync(join(tmpdir(), "sqlbuilder-go-"));
    copyFileSync(join(goDir, "index.go"), join(dir, "index.go"));
    copyFileSync(join(goDir, "lt.go"), join(dir, "lt.go"));
    writeFileSync(join(dir, "go.mod"), "module gntrees\n\ngo 1.22\n");
    mkdirSync(join(dir, "driver"), { recursive: true });
    writeFileSync(join(dir, "driver", "main.go"), buildDriver());

    const run = spawnSync(
        "docker",
        ["run", "--rm", "-e", "GOTOOLCHAIN=local", "-v", `${dir}:/w`, "-w", "/w", "golang:1.22-alpine", "go", "run", "./driver"],
        { encoding: "utf8" },
    );
    if (run.status !== 0) {
        throw new Error(`go parse failed:\n${run.stderr}`);
    }
    const lines = run.stdout.trim().split("\n").map((line) => JSON.parse(line) as ParseResult);

    cases.forEach((testCase, index) => {
        const expected = testCase.ts(sqlBuilder("qb") as any);
        expect({ name: testCase.name, ...lines[index] }).toEqual({ name: testCase.name, ...expected });
    });
}, 300000);
