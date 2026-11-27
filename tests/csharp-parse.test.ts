import { expect, test } from "bun:test";
import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { writeFileSync, mkdtempSync, copyFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { sqlBuilder } from "../generated/gntrees-sql-builder/typescript/index";

/**
 * End-to-end proof that the *custom function* `parse` — written once in
 * `src/parse-body.ts` and rendered by Lingua Tungga — produces identical results
 * for TypeScript and C#.
 *
 * The generated C# module (`generated/.../csharp/index.cs` + `lt.cs`) is run with
 * `dotnet`; a small driver builds the same 9 queries in C# and its `parse()`
 * output is compared with the TypeScript `parse()` output.
 */

const csharpDir = join(import.meta.dir, "..", "generated", "gntrees-sql-builder", "csharp");

const dotnetBin = existsSync("/tmp/dotnet/dotnet") ? "/tmp/dotnet/dotnet" : "dotnet";
const dotnetAvailable = (() => {
    try {
        const res = spawnSync(dotnetBin, ["--version"], { encoding: "utf8" });
        return res.status === 0;
    } catch {
        return false;
    }
})();

type ParseResult = { sql: string; sqlWithParam: string; param: unknown[] };

const cases: { name: string; ts: (c: any) => ParseResult; csharp: string }[] = [
    {
        name: "postgres select with params",
        ts: (c) => c.select(c.col("id")).from(c.table("users")).where(c.col("active").eq(true)).limit(10).setDialect("postgres").parse(),
        csharp: 'c.Select(c.Col("id")).From(c.Table("users")).Where(c.Col("active").Eq(true)).Limit(10).SetDialect("postgres").Parse()',
    },
    {
        name: "mysql with order by",
        ts: (c) => c.select([c.col("id"), c.col("name")]).from(c.table("users")).where(c.col("age").gte(18)).orderBy(c.col("name").desc()).setDialect("mysql").parse(),
        csharp: 'c.Select(LT.Array(c.Col("id"), c.Col("name"))).From(c.Table("users")).Where(c.Col("age").Gte(18)).OrderBy(c.Col("name").Desc()).SetDialect("mysql").Parse()',
    },
    {
        name: "nested and predicate",
        ts: (c) => c.select(c.col("id")).where(c.and([c.col("a").eq(1), c.col("b").eq(2)])).setDialect("postgres").parse(),
        csharp: 'c.Select(c.Col("id")).Where(c.And(LT.Array(c.Col("a").Eq(1), c.Col("b").Eq(2)))).SetDialect("postgres").Parse()',
    },
    {
        name: "or with not",
        ts: (c) => c.select(c.col("id")).where(c.or([c.col("a").eq(1), c.not(c.col("b").eq(2))])).setDialect("mysql").parse(),
        csharp: 'c.Select(c.Col("id")).Where(c.Or(LT.Array(c.Col("a").Eq(1), c.Not(c.Col("b").Eq(2))))).SetDialect("mysql").Parse()',
    },
    {
        name: "in predicate",
        ts: (c) => c.select(c.col("id")).where(c.col("x").in("1,2,3")).setDialect("postgres").parse(),
        csharp: 'c.Select(c.Col("id")).Where(c.Col("x").In("1,2,3")).SetDialect("postgres").Parse()',
    },
    {
        name: "is null without params",
        ts: (c) => c.select(c.col("id")).where(c.col("x").isNull()).setDialect("postgres").parse(),
        csharp: 'c.Select(c.Col("id")).Where(c.Col("x").IsNull()).SetDialect("postgres").Parse()',
    },
    {
        name: "between",
        ts: (c) => c.select(c.col("id")).where(c.col("x").between(1, 2)).setDialect("postgres").parse(),
        csharp: 'c.Select(c.Col("id")).Where(c.Col("x").Between(1, 2)).SetDialect("postgres").Parse()',
    },
    {
        name: "insert from map",
        ts: (c) => c.insert(c.table("users"), { name: "bob" }).setDialect("postgres").parse(),
        csharp: 'c.Insert(c.Table("users"), LT.Obj("name", "bob")).SetDialect("postgres").Parse()',
    },
    {
        name: "update from map",
        ts: (c) => c.update(c.table("users"), { name: "bob", age: 3 }).setDialect("postgres").parse(),
        csharp: 'c.Update(c.Table("users"), LT.Obj("name", "bob", "age", 3)).SetDialect("postgres").Parse()',
    },
];

function buildDriver(): string {
    const body = cases
        .map((testCase) => `        {\n            var c = Init.NewSqlBuilder("qb");\n            Console.WriteLine(LT.Json(${testCase.csharp}));\n        }`)
        .join("\n");
    return [
        "using System;",
        "using System.Collections.Generic;",
        "",
        "public static class Program",
        "{",
        "    public static void Main()",
        "    {",
        body,
        "    }",
        "}",
        "",
    ].join("\n");
}

test("csharp parse: generated parse() matches TypeScript for every case", () => {
    if (!dotnetAvailable) {
        console.warn("dotnet is not available; skipping csharp parse test");
        return;
    }

    const dir = mkdtempSync(join(tmpdir(), "sqlbuilder-csharp-"));
    copyFileSync(join(csharpDir, "index.cs"), join(dir, "index.cs"));
    copyFileSync(join(csharpDir, "lt.cs"), join(dir, "lt.cs"));
    writeFileSync(join(dir, "Program.cs"), buildDriver());
    writeFileSync(join(dir, "ltmain.csproj"), [
        '<Project Sdk="Microsoft.NET.Sdk">',
        "  <PropertyGroup>",
        "    <OutputType>Exe</OutputType>",
        "    <TargetFramework>net8.0</TargetFramework>",
        "    <Nullable>disable</Nullable>",
        "    <ImplicitUsings>disable</ImplicitUsings>",
        "    <AssemblyName>ltmain</AssemblyName>",
        "    <InvariantGlobalization>true</InvariantGlobalization>",
        "  </PropertyGroup>",
        "</Project>",
        "",
    ].join("\n"));

    const env = {
        ...process.env,
        DOTNET_ROOT: "/tmp/dotnet",
        DOTNET_CLI_TELEMETRY_OPTOUT: "1",
        DOTNET_NOLOGO: "1",
        DOTNET_SKIP_FIRST_TIME_EXPERIENCE: "1",
    };
    const run = spawnSync(dotnetBin, ["run", "--nologo"], { cwd: dir, encoding: "utf8", env });
    if (run.status !== 0) {
        throw new Error(`csharp parse failed:\n${run.stdout}\n${run.stderr}`);
    }
    const lines = run.stdout.trim().split("\n").map((line) => JSON.parse(line) as ParseResult);

    cases.forEach((testCase, index) => {
        const expected = testCase.ts(sqlBuilder("qb") as any);
        expect({ name: testCase.name, ...lines[index] }).toEqual({ name: testCase.name, ...expected });
    });
}, 300000);
