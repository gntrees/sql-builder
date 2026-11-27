import { expect, test } from "bun:test";
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { sqlBuilder } from "../generated/gntrees-sql-builder/typescript/index";
import { sqlBuilderParseBody } from "../src/parse-body";

/**
 * Gelombang 2 recipe — end-to-end proof that the *custom function* `parse` —
 * written once in `src/parse-body.ts` and rendered by Lingua Tungga — produces
 * identical results for TypeScript and Scala.
 *
 * Scala has a universal top type (`Any`) and closures capture (and may mutate)
 * outer `var`s, so the emitter uses the Go/C#/C++/Kotlin/Swift recipe: real
 * variables plus a shared `__fns` table of nested `def`s. Scala 3 has no
 * `break`/`continue`, so the emitter emulates them with `LoopContinue`/
 * `LoopBreak` (ControlThrowable) guards — this gate exercises the `continue` in
 * `parse`.
 *
 * The schema is fed in as Scala literals (no JSON parser needed on the Scala
 * side); results come back as JSON via `Lt.json`.
 */

const scalaHome = process.env.SCALA_HOME ?? "/tmp/scala3-3.3.4";
const scalacBin = join(scalaHome, "bin", "scalac");
const scalaBin = join(scalaHome, "bin", "scala");

const scalaAvailable = (() => {
    const java = spawnSync("java", ["-version"], { encoding: "utf8" });
    if (java.status !== 0) return false;
    return existsSync(scalacBin) && existsSync(scalaBin);
})();

const runtimePath = new URL(
    "../node_modules/@gntrees/method-chain/dist/base/scala/lt.scala",
    import.meta.url,
);
const ltRuntime = readFileSync(runtimePath, "utf8");

type ParseResult = { sql: string; sqlWithParam: string; param: unknown[] };

const cases: { name: string; build: (c: any) => any }[] = [
    {
        name: "postgres select with params",
        build: (c) => c.select(c.col("id")).from(c.table("users")).where(c.col("active").eq(true)).limit(10).setDialect("postgres"),
    },
    {
        name: "mysql with order by",
        build: (c) => c.select([c.col("id"), c.col("name")]).from(c.table("users")).where(c.col("age").gte(18)).orderBy(c.col("name").desc()).setDialect("mysql"),
    },
    {
        name: "nested and predicate",
        build: (c) => c.select(c.col("id")).where(c.and([c.col("a").eq(1), c.col("b").eq(2)])).setDialect("postgres"),
    },
    {
        name: "or with not",
        build: (c) => c.select(c.col("id")).where(c.or([c.col("a").eq(1), c.not(c.col("b").eq(2))])).setDialect("mysql"),
    },
    {
        name: "in predicate",
        build: (c) => c.select(c.col("id")).where(c.col("x").in("1,2,3")).setDialect("postgres"),
    },
    {
        name: "is null without params",
        build: (c) => c.select(c.col("id")).where(c.col("x").isNull()).setDialect("postgres"),
    },
    {
        name: "between",
        build: (c) => c.select(c.col("id")).where(c.col("x").between(1, 2)).setDialect("postgres"),
    },
    {
        name: "insert from map",
        build: (c) => c.insert(c.table("users"), { name: "bob" }).setDialect("postgres"),
    },
    {
        name: "update from map",
        build: (c) => c.update(c.table("users"), { name: "bob", age: 3 }).setDialect("postgres"),
    },
];

// Emit a JS value as a Scala expression using the LT runtime's `Lt.map`/`Lt.array`.
// Plain (non-`s`) Scala strings do not interpolate, so `JSON.stringify` is enough.
function scalaLiteral(value: unknown): string {
    if (value === null || value === undefined) return "null";
    if (typeof value === "boolean") return value ? "true" : "false";
    if (typeof value === "number") return String(value);
    if (typeof value === "string") return JSON.stringify(value);
    if (Array.isArray(value)) return `Lt.array(${value.map(scalaLiteral).join(", ")})`;
    const entries = Object.entries(value as Record<string, unknown>)
        .map(([key, val]) => `${JSON.stringify(key)} -> ${scalaLiteral(val)}`);
    return `Lt.map(${entries.join(", ")})`;
}

function buildSource(schemas: unknown[]): string {
    const literals = schemas.map((schema) => `      ${scalaLiteral(schema)}`).join(",\n");
    return [
        "class SqlBuilder(val rootSchema: Any) {",
        "  def getSchema(): Any = rootSchema",
        "  def parse(): Any = {",
        sqlBuilderParseBody["scala"]!,
        "  }",
        "}",
        "",
        "object Main {",
        "  def main(args: Array[String]): Unit = {",
        "    val schemas: List[Any] = List(",
        literals,
        "    )",
        "    val out = schemas.map(s => Lt.json(new SqlBuilder(s).parse()))",
        '    println("[" + out.mkString(",") + "]")',
        "  }",
        "}",
        "",
    ].join("\n");
}

test("scala parse: generated parse() matches TypeScript for every case", () => {
    if (!scalaAvailable) {
        console.warn("Scala toolchain not found (" + scalacBin + "); skipping scala parse test");
        return;
    }

    const builders = cases.map((testCase) => testCase.build(sqlBuilder("qb") as any));
    const schemas = builders.map((builder) => builder.getSchema());
    const expected = builders.map((builder) => builder.parse() as ParseResult);

    const dir = mkdtempSync(join(tmpdir(), "sqlbuilder-scala-"));
    writeFileSync(join(dir, "lt.scala"), ltRuntime);
    writeFileSync(join(dir, "Main.scala"), buildSource(schemas));

    const compile = spawnSync(scalacBin, ["-d", dir, join(dir, "lt.scala"), join(dir, "Main.scala")], {
        encoding: "utf8",
    });
    if (compile.status !== 0) {
        throw new Error(`scala parse failed to compile:\n${compile.stderr}\n${compile.stdout}`);
    }

    const run = spawnSync(scalaBin, ["-cp", dir, "Main"], { encoding: "utf8", cwd: dir });
    if (run.status !== 0) {
        throw new Error(`scala parse failed to run:\n${run.stderr}\n${run.stdout}`);
    }

    const lines = JSON.parse(run.stdout.trim()) as ParseResult[];
    cases.forEach((testCase, index) => {
        expect({ name: testCase.name, ...lines[index] }).toEqual({ name: testCase.name, ...expected[index] });
    });
}, 300000);
