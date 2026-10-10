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
 * identical results for TypeScript and Swift.
 *
 * Swift has a universal top type (`Any?`) and closures capture (and may mutate)
 * outer `var`s, so the emitter uses the Go/C#/C++/Kotlin recipe: real `var`s plus
 * a shared `__fns` table. Same harness as the other static gates: capture the
 * TypeScript schema tree as JSON, feed it to the Swift `parse` (via argv, so the
 * runtime stays Foundation-free).
 */

const swiftHome = process.env.SWIFT_HOME ?? "/tmp/swift";
const swiftc = join(swiftHome, "swift-6.0.3-RELEASE-ubuntu24.04", "usr", "bin", "swiftc");

const swiftAvailable = existsSync(swiftc);

const runtimePath = new URL(
    "../node_modules/@gntrees/method-chain/dist/base/swift/lt.swift",
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

// A tiny JSON <-> LT bridge for the harness (Foundation-free, no external deps).
const jsonModule = String.raw`
enum Json {
    static func parse(_ text: String) -> Any? {
        let parser = Parser(text)
        parser.skipWs()
        return parser.value()
    }

    final class Parser {
        let chars: [Character]
        var pos = 0
        init(_ text: String) { chars = Array(text) }
        func peek() -> Character { return pos < chars.count ? chars[pos] : "\0" }
        func next() -> Character { let c = peek(); pos += 1; return c }
        func skipWs() { while peek() == " " || peek() == "\n" || peek() == "\r" || peek() == "\t" { pos += 1 } }
        func expect(_ c: Character) { if next() != c { fatalError("json: unexpected char") } }
        func literal(_ lit: String) { for c in lit { expect(c) } }
        func string() -> String {
            expect("\"")
            var out = ""
            while true {
                let c = next()
                if c == "\"" { break }
                if c == "\\" {
                    let e = next()
                    switch e {
                    case "\"": out.append("\"")
                    case "\\": out.append("\\")
                    case "/": out.append("/")
                    case "n": out.append("\n")
                    case "t": out.append("\t")
                    case "r": out.append("\r")
                    case "b": out.append("\u{8}")
                    case "f": out.append("\u{c}")
                    case "u":
                        var code = 0
                        for _ in 0..<4 { code = code * 16 + (Int(String(next()), radix: 16) ?? 0) }
                        if let scalar = Unicode.Scalar(code) { out.append(Character(scalar)) }
                    default: out.append(e)
                    }
                } else { out.append(c) }
            }
            return out
        }
        func number() -> Any? {
            let start = pos
            while true {
                let c = peek()
                if c == "-" || c == "+" || c == "." || c == "e" || c == "E" || (c >= "0" && c <= "9") { pos += 1 } else { break }
            }
            return Lt.number(Double(String(chars[start..<pos])) ?? 0)
        }
        func array() -> Any? {
            expect("[")
            var items: [Any?] = []
            skipWs()
            if peek() == "]" { pos += 1; return items }
            while true {
                items.append(value())
                skipWs()
                let c = next()
                if c == "," { continue }
                if c == "]" { break }
                fatalError("json: bad array")
            }
            return items
        }
        func object() -> Any? {
            expect("{")
            var entries: [(String, Any?)] = []
            skipWs()
            if peek() == "}" { pos += 1; return Lt.map(entries) }
            while true {
                skipWs()
                let key = string()
                skipWs()
                expect(":")
                entries.append((key, value()))
                skipWs()
                let c = next()
                if c == "," { continue }
                if c == "}" { break }
                fatalError("json: bad object")
            }
            return Lt.map(entries)
        }
        func value() -> Any? {
            skipWs()
            switch peek() {
            case "{": return object()
            case "[": return array()
            case "\"": return string()
            case "t": literal("true"); return true
            case "f": literal("false"); return false
            case "n": literal("null"); return nil
            default: return number()
            }
        }
    }

    static func escape(_ s: String) -> String {
        var out = "\""
        for c in s {
            switch c {
            case "\"": out += "\\\""
            case "\\": out += "\\\\"
            case "\n": out += "\\n"
            case "\r": out += "\\r"
            case "\t": out += "\\t"
            default:
                if let ascii = c.asciiValue, ascii < 0x20 {
                    let hex = String(ascii, radix: 16)
                    out += "\\u" + String(repeating: "0", count: 4 - hex.count) + hex
                } else { out += String(c) }
            }
        }
        out += "\""
        return out
    }

    static func toJson(_ v: Any?) -> String {
        guard let value = v else { return "null" }
        if let b = value as? Bool { return b ? "true" : "false" }
        if let i = value as? Int { return String(i) }
        if let d = value as? Double {
            let s = String(d)
            if s.contains(".") || s.contains("e") || s.contains("E") { return s }
            return s + ".0"
        }
        if let s = value as? String { return escape(s) }
        if let arr = value as? [Any?] { return "[" + arr.map { toJson($0) }.joined(separator: ",") + "]" }
        if let m = value as? LtMap { return "{" + m.entries.map { escape($0.0) + ":" + toJson($0.1) }.joined(separator: ",") + "}" }
        return escape(String(describing: value))
    }
}
`;

function buildSource(): string {
    return [
        ltRuntime,
        jsonModule,
        "",
        "struct SqlBuilder {",
        "    let rootSchema: Any?",
        "    func getSchema() -> Any? { return rootSchema }",
        "    func parse() -> Any? {",
        sqlBuilderParseBody["swift"]!,
        "    }",
        "}",
        "",
        "let schemas = Json.parse(CommandLine.arguments[1])",
        "var out: [String] = []",
        "for schema in Lt.arrayItems(schemas) {",
        "    let builder = SqlBuilder(rootSchema: schema)",
        "    out.append(Json.toJson(builder.parse()))",
        "}",
        'print("[" + out.joined(separator: ",") + "]")',
        "",
    ].join("\n");
}

test("swift parse: generated parse() matches TypeScript for every case", () => {
    if (!swiftAvailable) {
        console.warn("Swift toolchain not found at " + swiftc + "; skipping swift parse test");
        return;
    }

    const builders = cases.map((testCase) => testCase.build(sqlBuilder("qb") as any));
    const schemas = builders.map((builder) => builder.getSchema());
    const expected = builders.map((builder) => builder.parse() as ParseResult);

    const dir = mkdtempSync(join(tmpdir(), "sqlbuilder-swift-"));
    writeFileSync(join(dir, "main.swift"), buildSource());
    const bin = join(dir, "main");

    const compile = spawnSync(swiftc, ["-Onone", join(dir, "main.swift"), "-o", bin], { encoding: "utf8" });
    if (compile.status !== 0) {
        throw new Error(`swift parse failed to compile:\n${compile.stderr}`);
    }

    const run = spawnSync(bin, [JSON.stringify(schemas)], { encoding: "utf8", cwd: dir });
    if (run.status !== 0) {
        throw new Error(`swift parse failed to run:\n${run.stderr}`);
    }

    const lines = JSON.parse(run.stdout.trim()) as ParseResult[];
    cases.forEach((testCase, index) => {
        expect({ name: testCase.name, ...lines[index] }).toEqual({ name: testCase.name, ...expected[index] });
    });
}, 300000);
