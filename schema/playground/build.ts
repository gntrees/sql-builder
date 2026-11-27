#!/usr/bin/env bun
// Build the static schema codegen playground.
//
//   bun schema/playground/build.ts            # compare snapshots + render
//   bun schema/playground/build.ts --update   # rewrite expected snapshots
//
// The playground is intentionally database-free: every case is a small DMMF
// fixture. SQL and DB roundtrips live in lt-drizzle-v2/playground.

import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative } from "node:path";

import { buildSchemaIR, type DmmfDocument } from "../dmmf.ts";
import { emitLt } from "../emit-lt.ts";
import { renderPage, type CaseRun, type Feature } from "./render.ts";

const playground = import.meta.dir;
const repoRoot = join(playground, "../..");
const casesDir = join(playground, "cases");
const outDir = join(playground, "out");
const stagingRoot = join(repoRoot, ".lt/schema-playground");
const update = process.argv.includes("--update");

function walk(dir: string): string[] {
    const result: string[] = [];
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) result.push(...walk(full));
        else result.push(full);
    }
    return result;
}

function readMeta(path: string): { title: string; feature: string; why: string } {
    const parsed = Bun.TOML.parse(readFileSync(path, "utf8")) as {
        title?: string;
        feature?: string;
        why?: string;
    };
    if (!parsed.title || !parsed.feature || !parsed.why) {
        throw new Error(`${relative(repoRoot, path)}: title, feature, and why are required`);
    }
    return { title: parsed.title, feature: parsed.feature, why: parsed.why };
}

function findLt(): string | undefined {
    const candidates = [
        process.env.LT_BIN,
        join(repoRoot, "..", "gntrees-lingua-tungga", "target", "release", "lt"),
        Bun.which("lt"),
    ];
    for (const candidate of candidates) {
        if (candidate && existsSync(candidate)) return candidate;
    }
    return undefined;
}

const featuresFile = join(playground, "features.toml");
const featuresDoc = Bun.TOML.parse(readFileSync(featuresFile, "utf8")) as { feature?: Feature[] };
const features = featuresDoc.feature ?? [];
if (features.length === 0) throw new Error("features.toml has no [[feature]] entries");
const featureIds = new Set(features.map((item) => item.id));

const caseFiles = walk(casesDir)
    .filter((file) => file.endsWith(".dmmf.json"))
    .sort();

if (caseFiles.length === 0) throw new Error("no *.dmmf.json cases found");

const ltBin = findLt();
const results: CaseRun[] = [];

for (const file of caseFiles) {
    const id = basename(file).replace(/\.dmmf\.json$/, "");
    const group = relative(casesDir, dirname(file)) || "root";
    const meta = readMeta(file.replace(/\.dmmf\.json$/, ".toml"));
    if (!featureIds.has(meta.feature)) {
        throw new Error(`${relative(repoRoot, file)}: unknown feature "${meta.feature}"`);
    }

    const dmmfSource = readFileSync(file, "utf8");
    const dmmf = JSON.parse(dmmfSource) as DmmfDocument;
    const { schema, unsupported } = buildSchemaIR(dmmf, { prismaVersion: "7.10.1" });
    const files = emitLt(schema);

    const staging = join(stagingRoot, id);
    rmSync(staging, { recursive: true, force: true });
    mkdirSync(staging, { recursive: true });
    for (const generated of files) writeFileSync(join(staging, generated.name), generated.content);

    let lt: CaseRun["lt"];
    if (!ltBin) {
        lt = { status: "skipped", detail: "lt binary not found; set LT_BIN or put lt on PATH" };
    } else {
        const checked = Bun.spawnSync({
            cmd: [ltBin, "check", ...files.map((generated) => join(staging, generated.name))],
            cwd: staging,
            stdout: "pipe",
            stderr: "pipe",
        });
        const stderr = new TextDecoder().decode(checked.stderr).trim();
        lt =
            checked.exitCode === 0
                ? { status: "pass", detail: "lt check clean" }
                : { status: "fail", detail: stderr || `lt check exited ${checked.exitCode}` };
    }

    const expectedPath = file.replace(/\.dmmf\.json$/, ".expected.json");
    const actualSnapshot = `${JSON.stringify({ schema, unsupported }, null, 2)}\n`;
    let ir: CaseRun["ir"];
    if (update) {
        writeFileSync(expectedPath, actualSnapshot);
        ir = { status: "pass", detail: "snapshot written by --update" };
    } else if (!existsSync(expectedPath)) {
        ir = { status: "missing", detail: "missing expected snapshot; run with --update" };
    } else if (readFileSync(expectedPath, "utf8") === actualSnapshot) {
        ir = { status: "pass", detail: "IR matches the committed snapshot" };
    } else {
        ir = { status: "fail", detail: "IR differs from the committed snapshot" };
    }

    results.push({
        id,
        group,
        title: meta.title,
        feature: meta.feature,
        why: meta.why,
        dmmf: dmmfSource,
        schema,
        unsupported,
        files,
        ir,
        lt,
    });
}

for (const feature of features) {
    if (!results.some((item) => item.feature === feature.id)) {
        throw new Error(`feature "${feature.id}" has no case`);
    }
}

for (const item of results) {
    if (item.ir.status !== "pass" || item.lt.status === "fail") {
        console.error(`FAIL ${item.id}: IR=${item.ir.status} (${item.ir.detail}); LT=${item.lt.status} (${item.lt.detail})`);
    }
}

const failing = results.filter((item) => item.ir.status !== "pass" || item.lt.status === "fail").length;
const evidence = {
    version: 1,
    compiler: ltBin ? "pinned lt" : "missing",
    counts: { cases: results.length, features: features.length, failing },
    cases: Object.fromEntries(
        results.map((item) => [
            `${item.group}/${item.id}`,
            {
                feature: item.feature,
                ir: item.ir.status,
                lt: item.lt.status,
            },
        ]),
    ),
};

mkdirSync(outDir, { recursive: true });
writeFileSync(join(playground, "evidence.json"), `${JSON.stringify(evidence, null, 2)}\n`);
writeFileSync(join(outDir, "index.html"), renderPage(results, features, "schema IR v1"));

console.log(`rendered ${results.length} case(s) to ${relative(repoRoot, join(outDir, "index.html"))}`);
if (failing > 0) process.exitCode = 1;
