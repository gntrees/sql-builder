// Playground builder: stage the port + cases, run them on three targets,
// compare the real output with drizzle, and render one static HTML page.
//
// Run from the repository root: `bun lt-drizzle-v2/playground/build.ts`.
import { Glob } from "bun";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, basename, relative } from "node:path";
import { pathToFileURL } from "node:url";

import { line } from "./line";

const root = process.cwd();
const playground = join(root, "lt-drizzle-v2/playground");
const work = join(root, ".lt/playground");
const staged = join(work, "src");
const outDir = join(work, "out");
const ltBin = process.env.LT_BIN ?? "lt";

type Meta = { title: string; feature: string; why: string; dialects: string[] };
type CaseFile = { id: string; group: string; file: string; meta: Meta; module: string };

function fail(message: string): never {
  console.error(`playground: ${message}`);
  process.exit(1);
}

function sh(command: string[], cwd = root, quiet = false): { code: number; stdout: string; stderr: string } {
  const run = Bun.spawnSync(command, { cwd, stdout: "pipe", stderr: "pipe" });
  const result = {
    code: run.exitCode ?? 1,
    stdout: run.stdout.toString(),
    stderr: run.stderr.toString(),
  };
  if (!quiet && result.code !== 0) {
    console.error(`$ ${command.join(" ")}`);
    console.error(result.stdout);
    console.error(result.stderr);
  }
  return result;
}

function parseMeta(path: string): Meta {
  const text = readFileSync(path, "utf8");
  const values: Record<string, string> = {};
  for (const raw of text.split("\n")) {
    const row = raw.trim();
    if (row.length === 0 || row.startsWith("#")) continue;
    const index = row.indexOf("=");
    if (index < 0) continue;
    const key = row.slice(0, index).trim();
    let value = row.slice(index + 1).trim();
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    values[key] = value;
  }
  for (const key of ["title", "feature", "why"]) {
    if (!values[key]) fail(`${relative(root, path)}: missing ${key}`);
  }
  return {
    title: values.title!,
    feature: values.feature!,
    why: values.why!,
    dialects: (values.dialects ?? "postgres,mysql,sqlite").split(",").map((item) => item.trim()),
  };
}

function caseModule(source: string): string {
  const match = source.match(/package\s+([a-z][a-z0-9_]*)/);
  if (!match) fail("case has no package declaration");
  return match[1]!;
}

// ---- catalog -------------------------------------------------------------

const features = (() => {
  const text = readFileSync(join(playground, "features.toml"), "utf8");
  return [...text.matchAll(/^id\s*=\s*"([^"]+)"/gm)].map((match) => match[1]!);
})();

const cases: CaseFile[] = [];
for (const group of readdirSync(join(playground, "cases"))) {
  const dir = join(playground, "cases", group);
  if (!statSync(dir).isDirectory()) continue;
  for (const name of readdirSync(dir)) {
    if (!name.endsWith(".lt")) continue;
    if (name.startsWith("_")) continue;
    const file = join(dir, name);
    const id = basename(name, ".lt");
    const source = readFileSync(file, "utf8");
    const meta = parseMeta(join(dir, `${id}.toml`));
    cases.push({ id, group, file, meta, module: caseModule(source) });
  }
}
cases.sort((a, b) => (a.group === b.group ? a.id.localeCompare(b.id) : a.group.localeCompare(b.group)));

if (cases.length === 0) fail("no cases found");
const ids = new Set<string>();
for (const item of cases) {
  if (ids.has(item.id)) fail(`duplicate case id: ${item.id}`);
  ids.add(item.id);
  if (!features.includes(item.meta.feature)) {
    fail(`case ${item.id}: unknown feature ${item.meta.feature}`);
  }
}
for (const feature of features) {
  if (!cases.some((item) => item.meta.feature === feature)) {
    fail(`feature without a case: ${feature}`);
  }
}

// ---- stage ---------------------------------------------------------------

sh(["rm", "-rf", work]);
sh(["mkdir", "-p", staged]);
const srcDir = join(root, "lt-drizzle-v2/src");
for (const name of readdirSync(srcDir)) {
  if (!name.endsWith(".lt")) continue;
  if (name.endsWith("_test.lt")) continue;
  sh(["cp", join(srcDir, name), staged]);
}
sh(["cp", join(playground, "support.lt"), staged]);
for (const item of cases) {
  const target = join(staged, `${item.id}.lt`);
  const source = readFileSync(item.file, "utf8");
  // Cases import staged modules through a flat relative path.
  Bun.write(target, source);
}

// ---- emit, test, usage ---------------------------------------------------

const casePaths = cases.map((item) => join(staged, `${item.id}.lt`));
const targets = ["ts", "py", "go"] as const;
for (const target of targets) {
  const run = sh([ltBin, "test", "-t", target, ...casePaths, "--out", outDir, "--usage"]);
  if (run.code !== 0) fail(`lt test -t ${target} failed`);
}

const tsDir = join(outDir, "ts");
if (!statSync(join(tsDir, "node_modules"), { throwIfNoEntry: false })) {
  const install = sh(["npm", "install", "--no-audit", "--no-fund", "--silent"], tsDir);
  if (install.code !== 0) fail("npm install for the TypeScript usage programs failed");
}

type TargetRun = { status: "pass" | "fail"; lines: string[]; source: string; stderr: string };
type CaseResult = {
  id: string;
  group: string;
  module: string;
  meta: Meta;
  source: string;
  actual: Record<string, string | null>;
  expected: Record<string, string | null>;
  usage: Record<string, TargetRun | null>;
  status: "pass" | "fail";
};

const results: CaseResult[] = [];
let failures = 0;

for (const item of cases) {
  const expectedPath = join(playground, "cases", item.group, `${item.id}.expected.ts`);
  if (!statSync(expectedPath, { throwIfNoEntry: false })) {
    fail(`missing expected file: ${relative(root, expectedPath)}`);
  }
  const expectedModule = await import(pathToFileURL(expectedPath).href);
  const expected: Record<string, string> = expectedModule.expected;

  const source = readFileSync(item.file, "utf8");
  const actual: Record<string, string | null> = {};
  const usage: Record<string, TargetRun | null> = {};

  for (const target of targets) {
    let run: TargetRun;
    if (target === "ts") {
      const result = sh(["./node_modules/.bin/vite-node", `src/${item.module}.usage.ts`], tsDir, true);
      run = {
        status: result.code === 0 ? "pass" : "fail",
        lines: result.stdout.split("\n").filter((row) => row.length > 0),
        source: readFileSync(join(tsDir, "src", `${item.module}.usage.ts`), "utf8"),
        stderr: result.stderr,
      };
    } else if (target === "py") {
      const result = sh([join(root, ".lt/venv/bin/python"), `usage/${item.module}.py`], join(outDir, "py"), true);
      run = {
        status: result.code === 0 ? "pass" : "fail",
        lines: result.stdout.split("\n").filter((row) => row.length > 0),
        source: readFileSync(join(outDir, "py", "usage", `${item.module}.py`), "utf8"),
        stderr: result.stderr,
      };
    } else {
      const result = sh(["go", "run", `./usage/${item.module}`], join(outDir, "go"), true);
      run = {
        status: result.code === 0 ? "pass" : "fail",
        lines: result.stdout.split("\n").filter((row) => row.length > 0),
        source: readFileSync(join(outDir, "go", "usage", item.module, "main.go"), "utf8"),
        stderr: result.stderr,
      };
    }
    usage[target] = run;
  }

  // The usage program replays the case tests in declaration order; one line per
  // claimed dialect, in the same order as the metadata.
  const lines = usage.ts?.lines ?? [];
  item.meta.dialects.forEach((dialect, index) => {
    actual[dialect] = lines[index] ?? null;
  });

  let ok = true;
  for (const dialect of item.meta.dialects) {
    const want = expected[dialect] ?? null;
    const got = actual[dialect] ?? null;
    if (want === null && got === null) continue;
    if (want !== got) {
      ok = false;
      console.error(`case ${item.id} [${dialect}]`);
      console.error(`  want: ${want}`);
      console.error(`  got : ${got}`);
    }
  }
  if (!ok) failures += 1;
  results.push({
    id: item.id,
    group: item.group,
    module: item.module,
    meta: item.meta,
    source,
    actual,
    expected,
    usage,
    status: ok ? "pass" : "fail",
  });
}

// ---- database rows (only the DML cases) ---------------------------------

type DbInfo = { note: string; rows: Record<string, unknown>[] };
const dbByCase: Record<string, DbInfo> = {};

if (process.env.DB_TESTS === "1") {
  const { SQL } = await import("bun");
  const url = process.env.LT_DRIZZLE_PG_URL ?? "postgres://gntrees:gntrees@127.0.0.1:5433/gntrees_test";
  const db = new SQL({ url, max: 1 } as any);
  await db.unsafe(`drop table if exists "users"`);
  await db.unsafe(
    `create table "users" (id serial primary key, name text not null default '', age integer)`,
  );

  const paramsOf = (text: string): unknown[] =>
    text.length === 0
      ? []
      : text.split(",").map((part) => {
          if (part === "null") return null;
          if (part.startsWith("bool:")) return part.slice(5) === "true";
          if (part.startsWith("int:")) return Number(part.slice(4));
          if (part.startsWith("float:")) return Number(part.slice(6));
          return part.slice(5);
        });

  const runCase = async (id: string) => {
    const item = results.find((row) => row.id === id);
    const line = item?.actual.postgres ?? null;
    if (!line) return null;
    const [text = "", params = ""] = line.split("\t");
    const outcome = (await db.unsafe(text, paramsOf(params ?? ""))) as any;
    return { rows: Array.isArray(outcome) ? outcome : [], note: "" } as DbInfo;
  };

  const inserted = await runCase("insert_values");
  if (inserted) dbByCase.insert_values = { note: "insert (1 row)", rows: inserted.rows };
  // seed one row so the SELECT case has something to show
  await db.unsafe(`insert into "users" ("name") values ('seed')`);
  const selected = await runCase("select_where");
  if (selected) dbByCase.select_where = { note: "rows returned", rows: selected.rows };
  const updated = await runCase("update_row");
  if (updated) dbByCase.update_row = { note: "update (1 row)", rows: updated.rows };
  const deleted = await runCase("delete_row");
  if (deleted) dbByCase.delete_row = { note: "delete (1 row)", rows: deleted.rows };
  await db.close();
}

for (const item of results) {
  if (dbByCase[item.id]) (item as any).db = dbByCase[item.id];
}

// ---- evidence, usage, page ----------------------------------------------

const evidence = {
  version: 1,
  generatedAt: new Date().toISOString(),
  compiler: ltBin,
  counts: { cases: results.length, features: features.length },
  cases: Object.fromEntries(
    results.map((item) => [
      item.id,
      {
        feature: item.meta.feature,
        status: item.status,
        targets: Object.fromEntries(
          Object.entries(item.usage).map(([target, run]) => [target, run?.status ?? "missing"]),
        ),
      },
    ]),
  ),
};

const usage = {
  version: 1,
  cases: Object.fromEntries(
    results.map((item) => [
      item.id,
      Object.fromEntries(
        Object.entries(item.usage).map(([target, run]) => [
          target,
          { status: run?.status ?? "missing", lines: run?.lines ?? [] },
        ]),
      ),
    ]),
  ),
};

Bun.write(join(playground, "evidence.json"), `${JSON.stringify(evidence, null, 2)}\n`);
Bun.write(join(playground, "usage.json"), `${JSON.stringify(usage, null, 2)}\n`);

const { render } = await import("./render");
const html = render(results, features, evidence);
const page = join(playground, "out/index.html");
Bun.write(page, html);

console.log(`playground: ${results.length} cases, ${failures} failing, page at ${relative(root, page)}`);
if (failures > 0) process.exit(1);
