// Static HTML renderer for the schema codegen playground.
//
// No external dependencies: the output is a single file that works over
// file:// and keeps all case data embedded.

import type { SchemaIR, UnsupportedIR } from "../types.ts";

export type CaseRun = {
    id: string;
    group: string;
    title: string;
    feature: string;
    why: string;
    dmmf: string;
    schema: SchemaIR;
    unsupported: UnsupportedIR;
    files: { name: string; content: string }[];
    ir: { status: "pass" | "fail" | "missing"; detail: string };
    lt: { status: "pass" | "fail" | "skipped"; detail: string };
};

export type Feature = { id: string; title: string };

function esc(value: unknown): string {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
}

function json(value: unknown): string {
    return `${JSON.stringify(value, null, 2)}\n`;
}

function escCode(value: string): string {
    return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function hlJson(value: string): string {
    return escCode(value)
        .replace(/("(?:\\.|[^"\\])*")(\s*:)?/g, (_, str: string, colon: string | undefined) =>
            colon ? `<span class="tok-key">${str}</span>${colon}` : `<span class="tok-str">${str}</span>`,
        )
        .replace(/\b(true|false|null)\b/g, '<span class="tok-bool">$1</span>')
        .replace(/\b(-?\d+(?:\.\d+)?)\b/g, '<span class="tok-num">$1</span>');
}

function hlLt(value: string): string {
    return escCode(value)
        .replace(/(\/\/[^\n]*)/g, '<span class="tok-comment">$1</span>')
        .replace(/("(?:\\.|[^"\\])*")/g, '<span class="tok-str">$1</span>')
        .replace(
            /\b(package|import|export|struct|enum|fn|let|match|if|else|for|in|return|true|false|None|Some|self)\b/g,
            '<span class="tok-key">$1</span>',
        );
}

function badge(label: string, status: string): string {
    return `<span class="badge badge-${esc(status)}" title="${esc(status)}">${esc(label)}: ${esc(status)}</span>`;
}

function defaultText(value: unknown): string {
    if (!value) return "—";
    const item = value as Record<string, unknown>;
    if (item.kind === "literal") return JSON.stringify(item.value);
    if (item.kind === "function") return `${item.name}(${(item.args as string[]).join(", ")})`;
    if (item.kind === "unknown") return String(item.value);
    return String(item.kind);
}

function columnsTable(caseRun: CaseRun, table: CaseRun["schema"]["tables"][number]): string {
    const rows = table.columns
        .map(
            (column) => `<tr>
        <td><code>${esc(column.name)}</code></td>
        <td><code>${esc(column.dbName)}</code></td>
        <td><span class="type">${esc(column.type)}${column.enum ? ` ${esc(column.enum)}` : ""}</span></td>
        <td>${column.nullable ? "yes" : "no"}</td>
        <td>${table.primaryKey.includes(column.name) ? "yes" : ""}</td>
        <td>${column.unique ? "yes" : ""}</td>
        <td><code>${esc(defaultText(column.default))}</code></td>
      </tr>`,
        )
        .join("");
    return `<div class="table-block">
      <div class="table-title">
        <strong>${esc(table.name)}</strong>
        <span class="muted">SQL ${esc(table.dbName)} · schema ${esc(table.schema)} · PK ${esc(table.primaryKey.join(", ") || "—")}</span>
      </div>
      <table>
        <thead><tr><th>accessor</th><th>SQL</th><th>type</th><th>nullable</th><th>PK</th><th>unique</th><th>default</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

function tablesSection(caseRun: CaseRun): string {
    if (caseRun.schema.tables.length === 0) {
        return `<p class="empty">No emitted tables. The case is expected to be recorded as unsupported.</p>`;
    }
    return caseRun.schema.tables.map((table) => columnsTable(caseRun, table)).join("");
}

function enumsSection(caseRun: CaseRun): string {
    if (caseRun.schema.enums.length === 0) return `<p class="empty">No enums.</p>`;
    return caseRun.schema.enums
        .map(
            (item) => `<div class="mini-block">
        <div class="table-title"><strong>${esc(item.name)}</strong><span class="muted">package ${esc(item.package)} · SQL ${esc(item.dbName)}</span></div>
        <div class="pills">${item.values
            .map((value) => `<span class="pill"><code>${esc(value.name)}</code> → <code>${esc(value.dbName)}</code></span>`)
            .join("")}</div>
      </div>`,
        )
        .join("");
}

function fkSection(caseRun: CaseRun): string {
    if (caseRun.schema.foreignKeys.length === 0) return `<p class="empty">No foreign keys.</p>`;
    return `<ul class="plain">${caseRun.schema.foreignKeys
        .map(
            (fk) => `<li><code>${esc(fk.fromTable)}.${esc(fk.fromColumns.join(", "))}</code> → <code>${esc(fk.toTable)}.${esc(
                fk.toColumns.join(", "),
            )}</code> <span class="muted">on delete ${esc(fk.onDelete ?? "—")}, on update ${esc(fk.onUpdate ?? "—")}</span></li>`,
        )
        .join("")}</ul>`;
}

function unsupportedSection(caseRun: CaseRun): string {
    if (caseRun.unsupported.entries.length === 0) return `<p class="empty">No unsupported entries.</p>`;
    return `<ul class="plain">${caseRun.unsupported.entries
        .map(
            (entry) => `<li><span class="kind">${esc(entry.kind)}</span> ${
                entry.table ? `<code>${esc(entry.table)}${entry.column ? `.${esc(entry.column)}` : ""}</code>` : ""
            } ${entry.schema ? `<code>${esc(entry.schema)}</code>` : ""} ${entry.name ? `<code>${esc(entry.name)}</code>` : ""}
        <span class="muted">${esc(entry.reason)}</span></li>`,
        )
        .join("")}</ul>`;
}

function filesSection(caseRun: CaseRun): string {
    return caseRun.files
        .map(
            (file) => `<details class="file">
        <summary><code>${esc(file.name)}</code></summary>
        <pre class="code">${hlLt(file.content)}</pre>
      </details>`,
        )
        .join("");
}

function caseCard(caseRun: CaseRun, index: number): string {
    const fail = caseRun.ir.status !== "pass" || caseRun.lt.status === "fail";
    const search = `${caseRun.id} ${caseRun.group} ${caseRun.feature} ${caseRun.title} ${caseRun.why}`.toLowerCase();
    return `<article class="case" id="case-${index}" data-group="${esc(caseRun.group)}" data-fail="${fail ? "1" : "0"}" data-search="${esc(search)}">
    <header class="case-head">
      <div>
        <div class="kicker">${esc(caseRun.group)} <span class="dot">·</span> ${esc(caseRun.id)}</div>
        <h2>${esc(caseRun.title)}</h2>
        <p class="why">${esc(caseRun.why)}</p>
      </div>
      <div class="badges">${badge("IR", caseRun.ir.status)}${badge("LT", caseRun.lt.status)}</div>
    </header>

    <div class="summary-grid">
      <section class="panel wide">
        <h3>Tables and columns</h3>
        ${tablesSection(caseRun)}
      </section>
      <section class="panel">
        <h3>Enums</h3>
        ${enumsSection(caseRun)}
      </section>
      <section class="panel">
        <h3>Foreign keys</h3>
        ${fkSection(caseRun)}
      </section>
      <section class="panel">
        <h3>Unsupported</h3>
        ${unsupportedSection(caseRun)}
      </section>
    </div>

    <details class="block">
      <summary>DMMF input</summary>
      <pre class="code">${hlJson(caseRun.dmmf)}</pre>
    </details>
    <details class="block">
      <summary>schema.json (${caseRun.schema.tables.length} tables, ${caseRun.schema.enums.length} enums)</summary>
      <pre class="code">${hlJson(json(caseRun.schema))}</pre>
    </details>
    <details class="block">
      <summary>unsupported.json (${caseRun.unsupported.entries.length} entries)</summary>
      <pre class="code">${hlJson(json(caseRun.unsupported))}</pre>
    </details>
    <details class="block">
      <summary>Generated LT (${caseRun.files.length} files)</summary>
      <div class="details-body">${filesSection(caseRun)}</div>
    </details>
    <p class="check-line"><span class="muted">IR:</span> ${esc(caseRun.ir.detail)} <span class="muted">· LT:</span> ${esc(caseRun.lt.detail)}</p>
  </article>`;
}

export function renderPage(cases: CaseRun[], features: Feature[], generatedAt: string): string {
    const groups = [...new Set(cases.map((item) => item.group))].sort();
    const failing = cases.filter((item) => item.ir.status !== "pass" || item.lt.status === "fail").length;
    const featureRows = features
        .map((feature) => {
            const covered = cases.some((item) => item.feature === feature.id);
            return `<li class="${covered ? "ok" : "bad"}"><code>${esc(feature.id)}</code> ${esc(feature.title)}</li>`;
        })
        .join("");

    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Schema codegen playground</title>
<style>
:root {
  color-scheme: dark;
  --bg:#0b0f14; --panel:#111821; --panel-2:#151f2b; --line:#263445;
  --text:#dbe6f1; --muted:#8da2b8; --accent:#6ee7b7; --accent-2:#7dd3fc;
  --bad:#fb7185; --warn:#fbbf24; --good:#34d399;
}
* { box-sizing:border-box; }
html,body { margin:0; background:var(--bg); color:var(--text); }
body { font:14px/1.5 ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif; }
code, pre { font-family: ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; }
a { color:var(--accent-2); }
.wrap { max-width:1280px; margin:0 auto; padding:0 20px 80px; }
header.top { padding:36px 0 22px; border-bottom:1px solid var(--line); }
.kicker { color:var(--accent); font-size:12px; letter-spacing:.08em; text-transform:uppercase; }
h1 { margin:.25rem 0 .5rem; font-size:clamp(28px,4vw,44px); letter-spacing:-.03em; }
.lede { max-width:85ch; color:var(--muted); margin:0; }
.stats { display:flex; flex-wrap:wrap; gap:10px; margin-top:18px; }
.stat { border:1px solid var(--line); background:var(--panel); border-radius:999px; padding:6px 12px; color:var(--muted); }
.stat strong { color:var(--text); }
.controls { position:sticky; top:0; z-index:5; background:rgba(11,15,20,.92); backdrop-filter:blur(10px); border-bottom:1px solid var(--line); padding:14px 0; }
.controls-inner { display:flex; flex-wrap:wrap; gap:10px; align-items:center; }
input[type=search] { flex:1 1 280px; min-width:220px; background:var(--panel); color:var(--text); border:1px solid var(--line); border-radius:10px; padding:10px 12px; }
.chip { border:1px solid var(--line); background:var(--panel); color:var(--muted); border-radius:999px; padding:6px 11px; cursor:pointer; }
.chip.active { border-color:var(--accent); color:var(--accent); }
label.toggle { display:flex; gap:8px; align-items:center; color:var(--muted); cursor:pointer; }
.case { border:1px solid var(--line); background:linear-gradient(180deg,var(--panel),#0f161f); border-radius:16px; margin:22px 0; padding:20px; }
.case[data-fail="1"] { border-color:rgba(251,113,133,.55); }
.case-head { display:flex; gap:20px; justify-content:space-between; align-items:flex-start; }
.case h2 { margin:.2rem 0 .25rem; font-size:22px; }
.why { color:var(--muted); margin:.2rem 0 0; max-width:90ch; }
.badges { display:flex; flex-wrap:wrap; gap:6px; justify-content:flex-end; }
.badge { border:1px solid var(--line); border-radius:999px; padding:4px 9px; font-size:12px; white-space:nowrap; }
.badge-pass { border-color:rgba(52,211,153,.5); color:var(--good); }
.badge-fail { border-color:rgba(251,113,133,.5); color:var(--bad); }
.badge-skipped, .badge-missing { border-color:rgba(251,191,36,.5); color:var(--warn); }
.summary-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:12px; margin-top:16px; }
.panel { border:1px solid var(--line); background:var(--panel-2); border-radius:12px; padding:14px; min-width:0; }
.panel.wide { grid-column:1 / -1; }
.panel h3 { margin:0 0 10px; font-size:13px; letter-spacing:.06em; text-transform:uppercase; color:var(--muted); }
.table-block + .table-block { margin-top:16px; }
.table-title { display:flex; flex-wrap:wrap; gap:8px; align-items:baseline; margin-bottom:6px; }
.muted { color:var(--muted); }
table { width:100%; border-collapse:collapse; font-size:13px; }
th { text-align:left; color:var(--muted); font-weight:600; padding:6px 8px; border-bottom:1px solid var(--line); }
td { padding:6px 8px; border-bottom:1px solid rgba(38,52,69,.55); vertical-align:top; }
tr:last-child td { border-bottom:0; }
.type { color:var(--accent-2); }
.empty { color:var(--muted); margin:0; }
.plain { margin:0; padding-left:18px; }
.plain li { margin:4px 0; }
.kind { color:var(--warn); font-size:12px; text-transform:uppercase; }
.pills { display:flex; flex-wrap:wrap; gap:6px; }
.pill { border:1px solid var(--line); border-radius:999px; padding:3px 8px; }
.mini-block + .mini-block { margin-top:10px; }
details.block { border:1px solid var(--line); border-radius:12px; margin-top:10px; background:var(--panel); }
details.block > summary { cursor:pointer; padding:11px 14px; color:var(--accent-2); font-weight:600; }
details.block > pre, .details-body { margin:0; padding:0 14px 14px; }
details.file { border-top:1px solid var(--line); }
details.file > summary { cursor:pointer; padding:9px 0; color:var(--text); }
pre.code { margin:0; padding:12px; border:1px solid var(--line); border-radius:10px; background:#0a1017; overflow:auto; font-size:12.5px; line-height:1.55; }
.details-body pre.code { margin:8px 0 0; }
.tok-key { color:#c4b5fd; } .tok-str { color:#86efac; } .tok-num { color:#fbbf24; } .tok-bool { color:#fca5a5; } .tok-comment { color:#64748b; font-style:italic; }
.check-line { color:var(--muted); font-size:12px; margin:12px 0 0; }
footer { border-top:1px solid var(--line); margin-top:30px; padding-top:18px; color:var(--muted); font-size:12px; }
.feature-list { columns:2; gap:20px; padding-left:18px; }
.feature-list .bad { color:var(--bad); } .feature-list .ok { color:var(--muted); }
@media (max-width:900px) { .summary-grid { grid-template-columns:1fr; } .case-head { flex-direction:column; } .badges { justify-content:flex-start; } .feature-list { columns:1; } }
</style>
</head>
<body>
<header class="top"><div class="wrap">
  <div class="kicker">gntrees · schema codegen</div>
  <h1>Schema codegen playground</h1>
  <p class="lede">Every case starts as Prisma DMMF, becomes the versioned schema IR, then becomes generated Lingua Tungga accessors. IR snapshots and <code>lt check</code> are the gate; SQL and database execution live in the separate drizzle playground.</p>
  <div class="stats">
    <span class="stat"><strong>${cases.length}</strong> cases</span>
    <span class="stat"><strong>${features.length}</strong> features</span>
    <span class="stat"><strong>${failing}</strong> failing</span>
    <span class="stat"><strong>${generatedAt}</strong></span>
  </div>
</div></header>
<div class="controls"><div class="wrap controls-inner">
  <input id="search" type="search" placeholder="Search cases, features, tables…" aria-label="Search cases">
  <button class="chip active" data-group="all">all</button>
  ${groups.map((group) => `<button class="chip" data-group="${esc(group)}">${esc(group)}</button>`).join("")}
  <label class="toggle"><input id="only-fail" type="checkbox"> only failing</label>
</div></div>
<main class="wrap">
  <details class="block" style="margin-top:18px">
    <summary>Feature coverage</summary>
    <div class="details-body"><ul class="feature-list">${featureRows}</ul></div>
  </details>
  <div id="cases">${cases.map(caseCard).join("")}</div>
  <p id="no-results" class="empty" hidden>No cases match the current filter.</p>
</main>
<footer class="wrap">Generated by <code>schema/playground/build.ts</code>. The page is static and works over <code>file://</code>.</footer>
<script>
const cards = [...document.querySelectorAll(".case")];
const chips = [...document.querySelectorAll(".chip")];
const search = document.querySelector("#search");
const onlyFail = document.querySelector("#only-fail");
const noResults = document.querySelector("#no-results");
let group = "all";
function apply() {
  const q = (search.value || "").trim().toLowerCase();
  let shown = 0;
  for (const card of cards) {
    const groupOk = group === "all" || card.dataset.group === group;
    const searchOk = q.length === 0 || card.dataset.search.includes(q);
    const failOk = !onlyFail.checked || card.dataset.fail === "1";
    const ok = groupOk && searchOk && failOk;
    card.hidden = !ok;
    if (ok) shown += 1;
  }
  noResults.hidden = shown !== 0;
}
search.addEventListener("input", apply);
onlyFail.addEventListener("change", apply);
for (const chip of chips) {
  chip.addEventListener("click", () => {
    group = chip.dataset.group;
    for (const item of chips) item.classList.toggle("active", item === chip);
    apply();
  });
}
</script>
</body>
</html>
`;
}
