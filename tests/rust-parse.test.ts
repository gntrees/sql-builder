import { expect, test } from "bun:test";
import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { sqlBuilder } from "../generated/gntrees-sql-builder/typescript/index";
import { sqlBuilderParseBody } from "../src/parse-body";

/**
 * Gelombang 3 — end-to-end proof that the *custom function* `parse` — written once
 * in `src/parse-body.ts` and rendered by Lingua Tungga — produces identical results
 * for TypeScript and Rust.
 *
 * Rust has neither `any` nor closure capture of outer `&mut` state, so the emitter
 * keeps LT variables and local functions in thread-local maps (see
 * `lingua-tungga-rust-emitter.ts`). Here we:
 *
 *   1. build the same queries with the TypeScript builder, capture the *schema
 *      tree* (`getSchema()`) and the TypeScript `parse()` result;
 *   2. feed the exact same schema JSON into the Rust `parse` body (rendered by
 *      `generateWith`, exported as `sqlBuilderParseBody.rust`);
 *   3. compile with `rustc`, run, and assert the output matches TypeScript.
 *
 * The Rust side wraps the generated body in a minimal `SqlBuilder` whose
 * `get_schema()` returns the JSON-decoded schema — enough to exercise the custom
 * function without a full Rust `generateProject` backend.
 */

const rustcAvailable = (() => {
    const res = spawnSync("rustc", ["--version"], { encoding: "utf8" });
    return res.status === 0;
})();

const runtimePath = new URL(
    "../node_modules/@gntrees/method-chain/dist/base/rust/lt.rs",
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

// A tiny JSON <-> `lt::Value` bridge for the harness (no external crates).
const jsonModule = String.raw`
mod json {
    use crate::lt::Value;

    pub fn parse(text: &str) -> Value {
        let mut parser = Parser { chars: text.chars().collect(), pos: 0 };
        parser.skip_ws();
        parser.value()
    }

    struct Parser {
        chars: Vec<char>,
        pos: usize,
    }

    impl Parser {
        fn peek(&self) -> Option<char> {
            self.chars.get(self.pos).copied()
        }
        fn next(&mut self) -> Option<char> {
            let c = self.peek();
            self.pos += 1;
            c
        }
        fn skip_ws(&mut self) {
            while let Some(c) = self.peek() {
                if c == ' ' || c == '\n' || c == '\r' || c == '\t' {
                    self.pos += 1;
                } else {
                    break;
                }
            }
        }
        fn expect(&mut self, c: char) {
            assert_eq!(self.next(), Some(c));
        }
        fn literal(&mut self, lit: &str) {
            for c in lit.chars() {
                self.expect(c);
            }
        }
        fn value(&mut self) -> Value {
            self.skip_ws();
            match self.peek().unwrap() {
                '{' => self.object(),
                '[' => self.array(),
                '"' => Value::Str(self.string()),
                't' => {
                    self.literal("true");
                    Value::Bool(true)
                }
                'f' => {
                    self.literal("false");
                    Value::Bool(false)
                }
                'n' => {
                    self.literal("null");
                    Value::Null
                }
                _ => self.number(),
            }
        }
        fn string(&mut self) -> String {
            self.expect('"');
            let mut out = String::new();
            loop {
                match self.next().unwrap() {
                    '"' => break,
                    '\\' => match self.next().unwrap() {
                        '"' => out.push('"'),
                        '\\' => out.push('\\'),
                        '/' => out.push('/'),
                        'n' => out.push('\n'),
                        't' => out.push('\t'),
                        'r' => out.push('\r'),
                        'b' => out.push('\u{8}'),
                        'f' => out.push('\u{c}'),
                        'u' => {
                            let mut code = 0u32;
                            for _ in 0..4 {
                                code = code * 16 + self.next().unwrap().to_digit(16).unwrap();
                            }
                            out.push(std::char::from_u32(code).unwrap_or('?'));
                        }
                        other => out.push(other),
                    },
                    c => out.push(c),
                }
            }
            out
        }
        fn number(&mut self) -> Value {
            let start = self.pos;
            while let Some(c) = self.peek() {
                if c.is_ascii_digit() || c == '-' || c == '+' || c == '.' || c == 'e' || c == 'E' {
                    self.pos += 1;
                } else {
                    break;
                }
            }
            let text: String = self.chars[start..self.pos].iter().collect();
            let number: f64 = text.parse().unwrap();
            if number.fract() == 0.0 && number.abs() < 9_007_199_254_740_992.0 {
                Value::Int(number as i64)
            } else {
                Value::Float(number)
            }
        }
        fn array(&mut self) -> Value {
            self.expect('[');
            let mut items = Vec::new();
            self.skip_ws();
            if self.peek() == Some(']') {
                self.pos += 1;
                return Value::Array(items);
            }
            loop {
                items.push(self.value());
                self.skip_ws();
                match self.next() {
                    Some(',') => continue,
                    Some(']') => break,
                    other => panic!("bad array: {:?}", other),
                }
            }
            Value::Array(items)
        }
        fn object(&mut self) -> Value {
            self.expect('{');
            let mut entries = Vec::new();
            self.skip_ws();
            if self.peek() == Some('}') {
                self.pos += 1;
                return Value::Map(entries);
            }
            loop {
                self.skip_ws();
                let key = self.string();
                self.skip_ws();
                self.expect(':');
                let value = self.value();
                entries.push((key, value));
                self.skip_ws();
                match self.next() {
                    Some(',') => continue,
                    Some('}') => break,
                    other => panic!("bad object: {:?}", other),
                }
            }
            Value::Map(entries)
        }
    }

    fn escape(text: &str) -> String {
        let mut out = String::from("\"");
        for c in text.chars() {
            match c {
                '"' => out.push_str("\\\""),
                '\\' => out.push_str("\\\\"),
                '\n' => out.push_str("\\n"),
                '\r' => out.push_str("\\r"),
                '\t' => out.push_str("\\t"),
                c if (c as u32) < 0x20 => out.push_str(&format!("\\u{:04x}", c as u32)),
                c => out.push(c),
            }
        }
        out.push('"');
        out
    }

    pub fn to_json(v: &Value) -> String {
        match v {
            Value::Null => "null".to_string(),
            Value::Bool(b) => b.to_string(),
            Value::Int(i) => i.to_string(),
            Value::Float(f) => {
                let mut s = f.to_string();
                if !s.contains('.') && !s.contains('e') && !s.contains('E') {
                    s.push_str(".0");
                }
                s
            }
            Value::Str(s) => escape(s),
            Value::Array(items) => format!("[{}]", items.iter().map(to_json).collect::<Vec<_>>().join(",")),
            Value::Map(entries) => format!(
                "{{{}}}",
                entries
                    .iter()
                    .map(|(k, val)| format!("{}:{}", escape(k), to_json(val)))
                    .collect::<Vec<_>>()
                    .join(",")
            ),
        }
    }
}
`;

function buildSource(): string {
    return [
        "#![allow(unused_parens)]",
        "#![allow(unreachable_code)]",
        "#![allow(unused_variables)]",
        "#![allow(unused_mut)]",
        "#![allow(dead_code)]",
        "",
        "mod lt {",
        ltRuntime,
        "}",
        jsonModule,
        "",
        "struct SqlBuilder { schema: lt::Value }",
        "",
        "impl SqlBuilder {",
        "  fn get_schema(&self) -> lt::Value { self.schema.clone() }",
        "  fn parse(&self) -> lt::Value {",
        sqlBuilderParseBody["rust"]!,
        "  }",
        "}",
        "",
        "fn main() {",
        '  let input = std::fs::read_to_string("schemas.json").unwrap();',
        "  let schemas = json::parse(&input);",
        "  let mut out: Vec<String> = Vec::new();",
        "  for schema in lt::array_items(&schemas) {",
        "    let builder = SqlBuilder { schema };",
        "    out.push(json::to_json(&builder.parse()));",
        "  }",
        '  println!("[{}]", out.join(","));',
        "}",
        "",
    ].join("\n");
}

test("rust parse: generated parse() matches TypeScript for every case", () => {
    if (!rustcAvailable) {
        console.warn("rustc is not available; skipping rust parse test");
        return;
    }

    const builders = cases.map((testCase) => testCase.build(sqlBuilder("qb") as any));
    const schemas = builders.map((builder) => builder.getSchema());
    const expected = builders.map((builder) => builder.parse() as ParseResult);

    const dir = mkdtempSync(join(tmpdir(), "sqlbuilder-rust-"));
    writeFileSync(join(dir, "schemas.json"), JSON.stringify(schemas));
    writeFileSync(join(dir, "main.rs"), buildSource());
    const bin = join(dir, "main");

    const compile = spawnSync("rustc", ["--edition", "2021", "-A", "warnings", "-o", bin, join(dir, "main.rs")], {
        encoding: "utf8",
    });
    if (compile.status !== 0) {
        throw new Error(`rust parse failed to compile:\n${compile.stderr}`);
    }

    const run = spawnSync(bin, [], { encoding: "utf8", cwd: dir });
    if (run.status !== 0) {
        throw new Error(`rust parse failed to run:\n${run.stderr}`);
    }

    const lines = JSON.parse(run.stdout.trim()) as ParseResult[];
    cases.forEach((testCase, index) => {
        expect({ name: testCase.name, ...lines[index] }).toEqual({ name: testCase.name, ...expected[index] });
    });
}, 300000);
