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
 * for TypeScript and C++.
 *
 * C++ needs a `Value` variant type (no `any`), but it has no borrow checker and
 * lambdas capture by reference, so the emitter uses the Go/C# recipe: real locals
 * plus a shared `__fns` table for local functions. Same harness as the Rust gate:
 * capture the TypeScript schema tree as JSON, feed it to the Rust… err, C++ `parse`.
 */

const gppAvailable = (() => {
    const res = spawnSync("g++", ["--version"], { encoding: "utf8" });
    return res.status === 0;
})();

const runtimePath = new URL(
    "../node_modules/@gntrees/method-chain/dist/base/cpp/lt.hpp",
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

// A tiny JSON <-> `lt::Value` bridge for the harness (no external deps).
const jsonModule = String.raw`
namespace json {

struct Parser {
    const std::string& text;
    std::size_t pos = 0;
    explicit Parser(const std::string& t) : text(t) {}

    char peek() const { return pos < text.size() ? text[pos] : '\0'; }
    char next() { return pos < text.size() ? text[pos++] : '\0'; }
    void skip_ws() {
        while (peek() == ' ' || peek() == '\n' || peek() == '\r' || peek() == '\t') pos++;
    }
    void expect(char c) {
        if (next() != c) throw std::runtime_error("json: unexpected char");
    }
    void literal(const char* lit) {
        for (const char* p = lit; *p; p++) expect(*p);
    }
    std::string parse_string() {
        expect('"');
        std::string out;
        while (true) {
            char c = next();
            if (c == '"') break;
            if (c == '\\') {
                char e = next();
                if (e == '"') out += '"';
                else if (e == '\\') out += '\\';
                else if (e == '/') out += '/';
                else if (e == 'n') out += '\n';
                else if (e == 't') out += '\t';
                else if (e == 'r') out += '\r';
                else if (e == 'b') out += '\b';
                else if (e == 'f') out += '\f';
                else if (e == 'u') {
                    unsigned code = 0;
                    for (int i = 0; i < 4; i++) {
                        char h = next();
                        code = code * 16 + static_cast<unsigned>(std::stoi(std::string(1, h), nullptr, 16));
                    }
                    if (code < 0x80) out += static_cast<char>(code);
                    else if (code < 0x800) {
                        out += static_cast<char>(0xC0 | (code >> 6));
                        out += static_cast<char>(0x80 | (code & 0x3F));
                    } else {
                        out += static_cast<char>(0xE0 | (code >> 12));
                        out += static_cast<char>(0x80 | ((code >> 6) & 0x3F));
                        out += static_cast<char>(0x80 | (code & 0x3F));
                    }
                } else out += e;
            } else out += c;
        }
        return out;
    }
    lt::Value parse_number() {
        std::size_t start = pos;
        while (true) {
            char c = peek();
            if (c == '-' || c == '+' || c == '.' || c == 'e' || c == 'E' || (c >= '0' && c <= '9')) pos++;
            else break;
        }
        return lt::number(std::stod(text.substr(start, pos - start)));
    }
    lt::Value parse_array() {
        expect('[');
        std::vector<lt::Value> items;
        skip_ws();
        if (peek() == ']') { pos++; return lt::array(items); }
        while (true) {
            items.push_back(parse_value());
            skip_ws();
            char c = next();
            if (c == ',') continue;
            if (c == ']') break;
            throw std::runtime_error("json: bad array");
        }
        return lt::array(items);
    }
    lt::Value parse_object() {
        expect('{');
        std::vector<std::pair<std::string, lt::Value>> entries;
        skip_ws();
        if (peek() == '}') { pos++; return lt::map(entries); }
        while (true) {
            skip_ws();
            std::string key = parse_string();
            skip_ws();
            expect(':');
            entries.push_back({key, parse_value()});
            skip_ws();
            char c = next();
            if (c == ',') continue;
            if (c == '}') break;
            throw std::runtime_error("json: bad object");
        }
        return lt::map(entries);
    }
    lt::Value parse_value() {
        skip_ws();
        char c = peek();
        if (c == '{') return parse_object();
        if (c == '[') return parse_array();
        if (c == '"') return lt::string(parse_string());
        if (c == 't') { literal("true"); return lt::boolean(true); }
        if (c == 'f') { literal("false"); return lt::boolean(false); }
        if (c == 'n') { literal("null"); return lt::null(); }
        return parse_number();
    }
};

inline lt::Value parse(const std::string& text) {
    Parser parser(text);
    parser.skip_ws();
    return parser.parse_value();
}

inline std::string escape(const std::string& s) {
    std::string out = "\"";
    for (char c : s) {
        if (c == '"') out += "\\\"";
        else if (c == '\\') out += "\\\\";
        else if (c == '\n') out += "\\n";
        else if (c == '\r') out += "\\r";
        else if (c == '\t') out += "\\t";
        else if (static_cast<unsigned char>(c) < 0x20) {
            char buf[8];
            std::snprintf(buf, sizeof(buf), "\\u%04x", c);
            out += buf;
        } else out += c;
    }
    out += "\"";
    return out;
}

inline std::string to_json(const lt::Value& v) {
    switch (v.kind) {
        case lt::Value::Kind::Null: return "null";
        case lt::Value::Kind::Bool: return v.boolean ? "true" : "false";
        case lt::Value::Kind::Int: return std::to_string(v.integer);
        case lt::Value::Kind::Float: {
            std::ostringstream oss;
            oss << v.number;
            std::string s = oss.str();
            if (s.find('.') == std::string::npos && s.find('e') == std::string::npos && s.find('E') == std::string::npos) s += ".0";
            return s;
        }
        case lt::Value::Kind::Str: return escape(v.text);
        case lt::Value::Kind::Array: {
            std::string out = "[";
            for (std::size_t i = 0; i < v.items.size(); i++) { if (i) out += ","; out += to_json(v.items[i]); }
            return out + "]";
        }
        case lt::Value::Kind::Map: {
            std::string out = "{";
            for (std::size_t i = 0; i < v.entries.size(); i++) {
                if (i) out += ",";
                out += escape(v.entries[i].first) + ":" + to_json(v.entries[i].second);
            }
            return out + "}";
        }
    }
    return "null";
}

}  // namespace json
`;

function buildSource(): string {
    return [
        "#include <cstdio>",
        "#include <fstream>",
        "#include <iostream>",
        "#include <sstream>",
        ltRuntime,
        jsonModule,
        "",
        "struct SqlBuilder {",
        "  lt::Value schema;",
        "  lt::Value getSchema() const { return schema; }",
        "  lt::Value parse() const {",
        sqlBuilderParseBody["cpp"]!,
        "  }",
        "};",
        "",
        "int main() {",
        '  std::ifstream in("schemas.json");',
        "  std::stringstream buffer;",
        "  buffer << in.rdbuf();",
        "  lt::Value schemas = json::parse(buffer.str());",
        "  std::vector<std::string> out;",
        "  for (const lt::Value& schema : lt::array_items(schemas)) {",
        "    SqlBuilder builder;",
        "    builder.schema = schema;",
        "    out.push_back(json::to_json(builder.parse()));",
        "  }",
        '  std::cout << "[";',
        '  for (std::size_t i = 0; i < out.size(); i++) { if (i) std::cout << ","; std::cout << out[i]; }',
        '  std::cout << "]" << std::endl;',
        "  return 0;",
        "}",
        "",
    ].join("\n");
}

test("cpp parse: generated parse() matches TypeScript for every case", () => {
    if (!gppAvailable) {
        console.warn("g++ is not available; skipping cpp parse test");
        return;
    }

    const builders = cases.map((testCase) => testCase.build(sqlBuilder("qb") as any));
    const schemas = builders.map((builder) => builder.getSchema());
    const expected = builders.map((builder) => builder.parse() as ParseResult);

    const dir = mkdtempSync(join(tmpdir(), "sqlbuilder-cpp-"));
    writeFileSync(join(dir, "schemas.json"), JSON.stringify(schemas));
    writeFileSync(join(dir, "main.cpp"), buildSource());
    const bin = join(dir, "main");

    const compile = spawnSync("g++", ["-std=c++17", "-O0", "-o", bin, join(dir, "main.cpp")], { encoding: "utf8" });
    if (compile.status !== 0) {
        throw new Error(`cpp parse failed to compile:\n${compile.stderr}`);
    }

    const run = spawnSync(bin, [], { encoding: "utf8", cwd: dir });
    if (run.status !== 0) {
        throw new Error(`cpp parse failed to run:\n${run.stderr}`);
    }

    const lines = JSON.parse(run.stdout.trim()) as ParseResult[];
    cases.forEach((testCase, index) => {
        expect({ name: testCase.name, ...lines[index] }).toEqual({ name: testCase.name, ...expected[index] });
    });
}, 300000);
