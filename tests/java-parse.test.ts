import { expect, test } from "bun:test";
import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { sqlBuilder } from "../generated/gntrees-sql-builder/typescript/index";

/**
 * End-to-end proof that the *custom function* `parse` — written once in
 * `src/parse-body.ts` and rendered by Lingua Tungga — produces identical results
 * for TypeScript and Java.
 *
 * The generated Java module (`generated/.../java/index.java` + `Lt.java`) is
 * compiled with `javac`; a small driver builds the same 9 queries in Java and its
 * `parse()` output is compared with the TypeScript `parse()` output.
 */

const javaDir = join(import.meta.dir, "..", "generated", "gntrees-sql-builder", "java");

const javacAvailable = (() => {
    try {
        const res = spawnSync("javac", ["-version"], { encoding: "utf8" });
        return res.status === 0;
    } catch {
        return false;
    }
})();

type ParseResult = { sql: string; sqlWithParam: string; param: unknown[] };

const cases: { name: string; ts: (c: any) => ParseResult; java: string }[] = [
    {
        name: "postgres select with params",
        ts: (c) => c.select(c.col("id")).from(c.table("users")).where(c.col("active").eq(true)).limit(10).setDialect("postgres").parse(),
        java: 'c.select(c.col("id")).from(c.table("users")).where(c.col("active").eq(true)).limit(10).setDialect("postgres").parse()',
    },
    {
        name: "mysql with order by",
        ts: (c) => c.select([c.col("id"), c.col("name")]).from(c.table("users")).where(c.col("age").gte(18)).orderBy(c.col("name").desc()).setDialect("mysql").parse(),
        java: 'c.select(Lt.array(c.col("id"), c.col("name"))).from(c.table("users")).where(c.col("age").gte(18)).orderBy(c.col("name").desc()).setDialect("mysql").parse()',
    },
    {
        name: "nested and predicate",
        ts: (c) => c.select(c.col("id")).where(c.and([c.col("a").eq(1), c.col("b").eq(2)])).setDialect("postgres").parse(),
        java: 'c.select(c.col("id")).where(c.and(Lt.array(c.col("a").eq(1), c.col("b").eq(2)))).setDialect("postgres").parse()',
    },
    {
        name: "or with not",
        ts: (c) => c.select(c.col("id")).where(c.or([c.col("a").eq(1), c.not(c.col("b").eq(2))])).setDialect("mysql").parse(),
        java: 'c.select(c.col("id")).where(c.or(Lt.array(c.col("a").eq(1), c.not(c.col("b").eq(2))))).setDialect("mysql").parse()',
    },
    {
        name: "in predicate",
        ts: (c) => c.select(c.col("id")).where(c.col("x").in("1,2,3")).setDialect("postgres").parse(),
        java: 'c.select(c.col("id")).where(c.col("x").in("1,2,3")).setDialect("postgres").parse()',
    },
    {
        name: "is null without params",
        ts: (c) => c.select(c.col("id")).where(c.col("x").isNull()).setDialect("postgres").parse(),
        java: 'c.select(c.col("id")).where(c.col("x").isNull()).setDialect("postgres").parse()',
    },
    {
        name: "between",
        ts: (c) => c.select(c.col("id")).where(c.col("x").between(1, 2)).setDialect("postgres").parse(),
        java: 'c.select(c.col("id")).where(c.col("x").between(1, 2)).setDialect("postgres").parse()',
    },
    {
        name: "insert from map",
        ts: (c) => c.insert(c.table("users"), { name: "bob" }).setDialect("postgres").parse(),
        java: 'c.insert(c.table("users"), Lt.map("name", "bob")).setDialect("postgres").parse()',
    },
    {
        name: "update from map",
        ts: (c) => c.update(c.table("users"), { name: "bob", age: 3 }).setDialect("postgres").parse(),
        java: 'c.update(c.table("users"), Lt.map("name", "bob", "age", 3)).setDialect("postgres").parse()',
    },
];

function buildDriver(): string {
    const body = cases
        .map((testCase) => `    { SqlBuilder c = Init.sqlBuilder("qb"); System.out.println(json(${testCase.java})); }`)
        .join("\n");
    return [
        "import java.util.*;",
        "",
        "class Driver {",
        "  static String quote(String s) {",
        "    StringBuilder b = new StringBuilder(\"\\\"\");",
        "    for (int i = 0; i < s.length(); i++) {",
        "      char c = s.charAt(i);",
        "      if (c == '\\\"' || c == '\\\\') b.append('\\\\').append(c);",
        "      else b.append(c);",
        "    }",
        "    return b.append(\"\\\"\").toString();",
        "  }",
        "",
        "  static String json(Object v) {",
        "    if (v == null) return \"null\";",
        "    if (v instanceof Boolean) return v.toString();",
        "    if (v instanceof Number) {",
        "      double d = ((Number) v).doubleValue();",
        "      if (d == Math.rint(d) && !Double.isInfinite(d)) return Long.toString((long) d);",
        "      return Double.toString(d);",
        "    }",
        "    if (v instanceof String) return quote((String) v);",
        "    if (v instanceof List) {",
        "      StringBuilder b = new StringBuilder(\"[\");",
        "      List<?> l = (List<?>) v;",
        "      for (int i = 0; i < l.size(); i++) { if (i > 0) b.append(\",\"); b.append(json(l.get(i))); }",
        "      return b.append(\"]\").toString();",
        "    }",
        "    if (v instanceof Map) {",
        "      StringBuilder b = new StringBuilder(\"{\");",
        "      boolean first = true;",
        "      for (Map.Entry<?, ?> e : ((Map<?, ?>) v).entrySet()) {",
        "        if (!first) b.append(\",\");",
        "        first = false;",
        "        b.append(quote(String.valueOf(e.getKey()))).append(\":\").append(json(e.getValue()));",
        "      }",
        "      return b.append(\"}\").toString();",
        "    }",
        "    return quote(v.toString());",
        "  }",
        "",
        "  public static void main(String[] args) {",
        body,
        "  }",
        "}",
        "",
    ].join("\n");
}

test("java parse: generated parse() matches TypeScript for every case", () => {
    if (!javacAvailable) {
        console.warn("javac is not available; skipping java parse test");
        return;
    }

    const buildDir = mkdtempSync(join(tmpdir(), "sqlbuilder-java-"));
    const driverPath = join(buildDir, "Driver.java");
    writeFileSync(driverPath, buildDriver());
    const compile = spawnSync(
        "javac",
        ["-d", buildDir, join(javaDir, "Lt.java"), join(javaDir, "index.java"), driverPath],
        { encoding: "utf8" },
    );
    if (compile.status !== 0) {
        throw new Error(`javac failed:\n${compile.stderr}`);
    }
    const run = spawnSync("java", ["-cp", buildDir, "Driver"], { encoding: "utf8" });
    if (run.status !== 0) {
        throw new Error(`java parse failed:\n${run.stderr}`);
    }
    const lines = run.stdout.trim().split("\n").map((line) => JSON.parse(line) as ParseResult);

    cases.forEach((testCase, index) => {
        const expected = testCase.ts(sqlBuilder("qb") as any);
        expect({ name: testCase.name, ...lines[index] }).toEqual({ name: testCase.name, ...expected });
    });
}, 180000);
