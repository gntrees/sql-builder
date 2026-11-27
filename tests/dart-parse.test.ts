import { expect, test } from "bun:test";
import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { sqlBuilder } from "../generated/gntrees-sql-builder/typescript/index";
import { sqlBuilderParseBody } from "../src/parse-body";

/**
 * Gelombang 2 recipe — end-to-end proof that the *custom function* `parse` —
 * written once in `src/parse-body.ts` and rendered by Lingua Tungga — produces
 * identical results for TypeScript and Dart.
 *
 * Dart has a universal top type (`dynamic`) and closures capture (and may mutate)
 * outer variables, so the emitter uses the Go/C#/C++/Kotlin/Swift recipe: real
 * variables plus a shared `__fns` table. Same harness as the Kotlin gate: capture
 * the TypeScript schema tree as JSON, feed it to the Dart `parse`, compare JSON.
 */

const dartBinary = (() => {
    const fromHome = process.env.DART_HOME ? join(process.env.DART_HOME, "bin", "dart") : undefined;
    return process.env.DART ?? fromHome ?? "dart";
})();

const dartAvailable = (() => {
    const probe = spawnSync(dartBinary, ["--version"], { encoding: "utf8" });
    // `dart --version` writes to stderr on some releases.
    return probe.status === 0;
})();

const runtimePath = new URL(
    "../node_modules/@gntrees/method-chain/dist/base/dart/lt.dart",
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

// Dart ships `dart:convert`, so the JSON <-> LT bridge is just `jsonDecode` /
// `jsonEncode` (no hand-rolled parser needed, unlike Kotlin).
function buildSource(): string {
    return [
        'import "dart:convert";',
        'import "dart:io";',
        'import "lt.dart";',
        "",
        "class SqlBuilder {",
        "  final dynamic rootSchema;",
        "  SqlBuilder(this.rootSchema);",
        "  dynamic getSchema() => rootSchema;",
        "  dynamic parse([List<dynamic> __a = const []]) {",
        sqlBuilderParseBody["dart"]!,
        "  }",
        "}",
        "",
        "void main() {",
        '  final text = File("schemas.json").readAsStringSync();',
        "  final schemas = jsonDecode(text) as List;",
        "  final out = <String>[];",
        "  for (final schema in schemas) {",
        "    final builder = SqlBuilder(schema);",
        "    out.add(jsonEncode(builder.parse()));",
        "  }",
        '  print("[" + out.join(",") + "]");',
        "}",
        "",
    ].join("\n");
}

test("dart parse: generated parse() matches TypeScript for every case", () => {
    if (!dartAvailable) {
        console.warn("Dart toolchain not found (" + dartBinary + "); skipping dart parse test");
        return;
    }

    const builders = cases.map((testCase) => testCase.build(sqlBuilder("qb") as any));
    const schemas = builders.map((builder) => builder.getSchema());
    const expected = builders.map((builder) => builder.parse() as ParseResult);

    const dir = mkdtempSync(join(tmpdir(), "sqlbuilder-dart-"));
    writeFileSync(join(dir, "schemas.json"), JSON.stringify(schemas));
    writeFileSync(join(dir, "lt.dart"), ltRuntime);
    writeFileSync(join(dir, "main.dart"), buildSource());

    const run = spawnSync(dartBinary, ["main.dart"], { encoding: "utf8", cwd: dir });
    if (run.status !== 0) {
        throw new Error(`dart parse failed to run:\n${run.stderr}\n${run.stdout}`);
    }

    const lines = JSON.parse(run.stdout.trim()) as ParseResult[];
    cases.forEach((testCase, index) => {
        expect({ name: testCase.name, ...lines[index] }).toEqual({ name: testCase.name, ...expected[index] });
    });
}, 180000);
