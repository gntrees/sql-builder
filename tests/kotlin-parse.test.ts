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
 * identical results for TypeScript and Kotlin.
 *
 * Kotlin has a universal top type (`Any?`) and closures capture (and may mutate)
 * outer `var`s, so the emitter uses the Go/C#/C++ recipe: real `var`s plus a
 * shared `__fns` table of anonymous functions. Same harness as the Rust/C++ gates:
 * capture the TypeScript schema tree as JSON, feed it to the Kotlin `parse`.
 */

const kotlinDir = process.env.KOTLIN_HOME ?? "/tmp/kotlin";
const kotlinJars = [
    "kce.jar",
    "kotlin-stdlib.jar",
    "kotlin-script-runtime-2.0.21.jar",
    "kotlin-reflect-1.6.10.jar",
    "kotlin-daemon-embeddable-2.0.21.jar",
    "trove4j-1.0.20200330.jar",
    "kotlinx-coroutines-core-jvm-1.6.4.jar",
    "annotations-13.0.jar",
];
const compilerClasspath = kotlinJars.map((jar) => join(kotlinDir, jar)).join(":");
const stdlibJar = join(kotlinDir, "kotlin-stdlib.jar");

const kotlinAvailable = (() => {
    const java = spawnSync("java", ["-version"], { encoding: "utf8" });
    if (java.status !== 0) return false;
    return kotlinJars.every((jar) => existsSync(join(kotlinDir, jar)));
})();

const runtimePath = new URL(
    "../node_modules/@gntrees/method-chain/dist/base/kotlin/lt.kt",
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

// A tiny JSON <-> LT bridge for the harness (no external deps).
const jsonModule = [
    "object Json {",
    "  fun parse(text: String): Any? { val parser = Parser(text); parser.skipWs(); return parser.value() }",
    "",
    "  class Parser(val text: String) {",
    "    var pos = 0",
    "    fun peek(): Char = if (pos < text.length) text[pos] else '\\u0000'",
    "    fun next(): Char = if (pos < text.length) text[pos++] else '\\u0000'",
    "    fun skipWs() { while (peek() == ' ' || peek() == '\\n' || peek() == '\\r' || peek() == '\\t') pos++ }",
    "    fun expect(c: Char) { if (next() != c) throw RuntimeException(\"json: unexpected char\") }",
    "    fun literal(lit: String) { for (c in lit) expect(c) }",
    "    fun string(): String {",
    "      expect('\"')",
    "      val out = StringBuilder()",
    "      while (true) {",
    "        val c = next()",
    "        if (c == '\"') break",
    "        if (c == '\\\\') {",
    "          val e = next()",
    "          when (e) {",
    "            '\"' -> out.append('\"')",
    "            '\\\\' -> out.append('\\\\')",
    "            '/' -> out.append('/')",
    "            'n' -> out.append('\\n')",
    "            't' -> out.append('\\t')",
    "            'r' -> out.append('\\r')",
    "            'b' -> out.append('\\b')",
    "            'f' -> out.append('\\u000C')",
    "            'u' -> { var code = 0; repeat(4) { code = code * 16 + next().digitToInt(16) }; out.append(code.toChar()) }",
    "            else -> out.append(e)",
    "          }",
    "        } else out.append(c)",
    "      }",
    "      return out.toString()",
    "    }",
    "    fun number(): Any? {",
    "      val start = pos",
    "      while (true) {",
    "        val c = peek()",
    "        if (c == '-' || c == '+' || c == '.' || c == 'e' || c == 'E' || (c >= '0' && c <= '9')) pos++ else break",
    "      }",
    "      return Lt.number(text.substring(start, pos).toDouble())",
    "    }",
    "    fun array(): Any? {",
    "      expect('[')",
    "      val items = ArrayList<Any?>()",
    "      skipWs()",
    "      if (peek() == ']') { pos++; return items }",
    "      while (true) {",
    "        items.add(value())",
    "        skipWs()",
    "        val c = next()",
    "        if (c == ',') continue",
    "        if (c == ']') break",
    "        throw RuntimeException(\"json: bad array\")",
    "      }",
    "      return items",
    "    }",
    "    fun obj(): Any? {",
    "      expect('{')",
    "      val entries = ArrayList<Pair<String, Any?>>()",
    "      skipWs()",
    "      if (peek() == '}') { pos++; return Lt.map(entries) }",
    "      while (true) {",
    "        skipWs()",
    "        val key = string()",
    "        skipWs()",
    "        expect(':')",
    "        entries.add(key to value())",
    "        skipWs()",
    "        val c = next()",
    "        if (c == ',') continue",
    "        if (c == '}') break",
    "        throw RuntimeException(\"json: bad object\")",
    "      }",
    "      return Lt.map(entries)",
    "    }",
    "    fun value(): Any? {",
    "      skipWs()",
    "      return when (peek()) {",
    "        '{' -> obj()",
    "        '[' -> array()",
    "        '\"' -> string()",
    "        't' -> { literal(\"true\"); true }",
    "        'f' -> { literal(\"false\"); false }",
    "        'n' -> { literal(\"null\"); null }",
    "        else -> number()",
    "      }",
    "    }",
    "  }",
    "",
    "  fun escape(s: String): String {",
    "    val out = StringBuilder(\"\\\"\")",
    "    for (c in s) {",
    "      when (c) {",
    "        '\"' -> out.append(\"\\\\\\\"\")",
    "        '\\\\' -> out.append(\"\\\\\\\\\")",
    "        '\\n' -> out.append(\"\\\\n\")",
    "        '\\r' -> out.append(\"\\\\r\")",
    "        '\\t' -> out.append(\"\\\\t\")",
    "        else -> if (c < ' ') out.append(\"\\\\u%04x\".format(c.code)) else out.append(c)",
    "      }",
    "    }",
    "    out.append(\"\\\"\")",
    "    return out.toString()",
    "  }",
    "",
    "  fun toJson(v: Any?): String = when (v) {",
    "    null -> \"null\"",
    "    is Boolean -> v.toString()",
    "    is Long -> v.toString()",
    "    is Int -> v.toString()",
    "    is Double -> { val s = v.toString(); if (s.contains('.') || s.contains('e') || s.contains('E')) s else \"$s.0\" }",
    "    is String -> escape(v)",
    "    is List<*> -> \"[\" + v.joinToString(\",\") { toJson(it) } + \"]\"",
    "    is Map<*, *> -> \"{\" + v.entries.joinToString(\",\") { escape(it.key.toString()) + \":\" + toJson(it.value) } + \"}\"",
    "    else -> escape(v.toString())",
    "  }",
    "}",
    "",
].join("\n");

function buildSource(): string {
    return [
        ltRuntime,
        jsonModule,
        "",
        "class SqlBuilder(val rootSchema: Any?) {",
        "  fun getSchema(): Any? = rootSchema",
        "  fun parse(): Any? {",
        sqlBuilderParseBody["kotlin"]!,
        "  }",
        "}",
        "",
        "fun main() {",
        '  val text = java.io.File("schemas.json").readText()',
        "  val schemas = Json.parse(text)",
        "  val out = ArrayList<String>()",
        "  for (schema in Lt.arrayItems(schemas)) {",
        "    val builder = SqlBuilder(schema)",
        "    out.add(Json.toJson(builder.parse()))",
        "  }",
        '  println("[" + out.joinToString(",") + "]")',
        "}",
        "",
    ].join("\n");
}

test("kotlin parse: generated parse() matches TypeScript for every case", () => {
    if (!kotlinAvailable) {
        console.warn("Kotlin toolchain not found at " + kotlinDir + "; skipping kotlin parse test");
        return;
    }

    const builders = cases.map((testCase) => testCase.build(sqlBuilder("qb") as any));
    const schemas = builders.map((builder) => builder.getSchema());
    const expected = builders.map((builder) => builder.parse() as ParseResult);

    const dir = mkdtempSync(join(tmpdir(), "sqlbuilder-kotlin-"));
    writeFileSync(join(dir, "schemas.json"), JSON.stringify(schemas));
    writeFileSync(join(dir, "Main.kt"), buildSource());
    const classes = join(dir, "classes");

    const compile = spawnSync(
        "java",
        ["-cp", compilerClasspath, "org.jetbrains.kotlin.cli.jvm.K2JVMCompiler", "-no-stdlib", "-cp", stdlibJar, "-d", classes, join(dir, "Main.kt")],
        { encoding: "utf8" },
    );
    if (compile.status !== 0) {
        throw new Error(`kotlin parse failed to compile:\n${compile.stderr}\n${compile.stdout}`);
    }

    const run = spawnSync("java", ["-cp", `${classes}:${stdlibJar}`, "MainKt"], { encoding: "utf8", cwd: dir });
    if (run.status !== 0) {
        throw new Error(`kotlin parse failed to run:\n${run.stderr}`);
    }

    const lines = JSON.parse(run.stdout.trim()) as ParseResult[];
    cases.forEach((testCase, index) => {
        expect({ name: testCase.name, ...lines[index] }).toEqual({ name: testCase.name, ...expected[index] });
    });
}, 300000);
