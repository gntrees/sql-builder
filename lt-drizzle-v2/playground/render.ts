// Renders the static playground page. One file, no framework, works on
// file://. All statuses come from build.ts runs, never from the browser.
import type { } from "bun";

type TargetRun = { status: string; lines: string[]; source: string; stderr: string } | null;
type CaseResult = {
  id: string;
  group: string;
  meta: { title: string; feature: string; why: string; dialects: string[] };
  source: string;
  actual: Record<string, string | null>;
  expected: Record<string, string | null>;
  usage: Record<string, TargetRun>;
  status: string;
};

function esc(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const DIALECT_ORDER = ["postgres", "mysql", "sqlite"];
const TARGET_ORDER = ["ts", "py", "go"];
const TARGET_LABEL: Record<string, string> = { ts: "TypeScript", py: "Python", go: "Go" };

function parityRow(dialect: string, item: CaseResult): string {
  const actual = item.actual[dialect];
  const expected = item.expected[dialect];
  if (actual === undefined && expected === undefined) return "";
  const same = actual === expected;
  return `
    <tr class="${same ? "ok" : "bad"}">
      <th>${esc(dialect)}</th>
      <td><pre>${esc(actual ?? "(not run)")}</pre></td>
      <td><pre>${esc(expected ?? "(not supported)")}</pre></td>
      <td class="mark">${same ? "match" : "DIFF"}</td>
    </tr>`;
}

function languageTabs(item: CaseResult): string {
  const buttons = TARGET_ORDER.filter((target) => item.usage[target])
    .map(
      (target, index) =>
        `<button class="tab ${index === 0 ? "active" : ""}" data-tab="${target}">${TARGET_LABEL[target]}</button>`,
    )
    .join("");
  const panels = TARGET_ORDER.filter((target) => item.usage[target])
    .map((target, index) => {
      const run = item.usage[target]!;
      return `
      <div class="panel ${index === 0 ? "active" : ""}" data-panel="${target}">
        <pre class="code">${esc(run.source)}</pre>
        <div class="stdout ${run.status === "pass" ? "ok" : "bad"}">
          <div class="label">stdout (${run.status})</div>
          <pre>${esc(run.lines.join("\n") || run.stderr || "(empty)")}</pre>
        </div>
      </div>`;
    })
    .join("");
  return `<div class="tabs">${buttons}</div>${panels}`;
}

function caseCard(item: CaseResult): string {
  const rows = DIALECT_ORDER.filter(
    (dialect) => item.actual[dialect] !== undefined || item.expected[dialect] !== undefined,
  )
    .map((dialect) => parityRow(dialect, item))
    .join("");
  return `
  <article class="case ${item.status}" data-id="${esc(item.id)}" data-group="${esc(item.group)}"
           data-feature="${esc(item.meta.feature)}" data-status="${item.status}"
           data-search="${esc(`${item.id} ${item.group} ${item.meta.feature} ${item.meta.title}`.toLowerCase())}">
    <header>
      <div>
        <h2>${esc(item.meta.title)}</h2>
        <p class="meta"><code>${esc(item.meta.feature)}</code> · <code>${esc(item.id)}</code></p>
        <p class="why">${esc(item.meta.why)}</p>
      </div>
      <span class="badge ${item.status}">${item.status}</span>
    </header>

    <div class="grid">
      <section>
        <h3>Source (.lt)</h3>
        <pre class="code">${esc(item.source)}</pre>
      </section>
      <section>
        <h3>Host output</h3>
        ${languageTabs(item)}
      </section>
    </div>

    ${
      (item as any).db
        ? `<h3>Database result (${esc((item as any).db.note)})</h3>
           <pre class="code">${esc(
             (item as any).db.rows.length === 0
               ? "(no rows)"
               : JSON.stringify((item as any).db.rows, null, 2),
           )}</pre>`
        : ""
    }

    <h3>Parity</h3>
    <table class="parity">
      <thead><tr><th>dialect</th><th>port</th><th>drizzle 0.44.4</th><th></th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </article>`;
}

export function render(results: CaseResult[], features: string[], evidence: unknown): string {
  const groups = [...new Set(results.map((item) => item.group))].sort();
  const failing = results.filter((item) => item.status !== "pass").length;
  const covered = new Set(results.map((item) => item.meta.feature));
  const uncovered = features.filter((feature) => !covered.has(feature));

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Drizzle port playground</title>
<style>
  :root { color-scheme: light dark; --fg:#1b1f24; --muted:#5a6672; --bg:#ffffff; --panel:#f6f8fa;
          --line:#d8dee4; --ok:#1a7f37; --bad:#cf222e; --accent:#0969da; }
  @media (prefers-color-scheme: dark) {
    :root { --fg:#e6edf3; --muted:#9aa7b4; --bg:#0d1117; --panel:#161b22; --line:#30363d;
            --ok:#3fb950; --bad:#f85149; --accent:#58a6ff; }
  }
  * { box-sizing: border-box; }
  body { margin:0; padding:2rem clamp(1rem,4vw,4rem); background:var(--bg); color:var(--fg);
         font:15px/1.55 ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif; }
  h1 { margin:0 0 .25rem; font-size:1.6rem; }
  .lede { color:var(--muted); margin:0 0 1.5rem; }
  .controls { display:flex; flex-wrap:wrap; gap:.6rem; margin-bottom:1.5rem; }
  input, select { padding:.5rem .7rem; border:1px solid var(--line); border-radius:8px;
                  background:var(--bg); color:var(--fg); font:inherit; }
  input[type=search] { min-width:18rem; }
  .case { border:1px solid var(--line); border-radius:12px; padding:1rem 1.2rem; margin:0 0 1.2rem;
          background:var(--panel); }
  .case.fail { border-color:var(--bad); }
  .case header { display:flex; justify-content:space-between; gap:1rem; align-items:flex-start; }
  .case h2 { margin:0 0 .2rem; font-size:1.1rem; }
  .meta, .why { margin:.15rem 0; color:var(--muted); }
  .badge { padding:.15rem .55rem; border-radius:999px; font-size:.8rem; font-weight:600; }
  .badge.pass { background:color-mix(in srgb, var(--ok) 18%, transparent); color:var(--ok); }
  .badge.fail { background:color-mix(in srgb, var(--bad) 18%, transparent); color:var(--bad); }
  .grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(22rem,1fr)); gap:1rem; margin:1rem 0; }
  h3 { font-size:.85rem; text-transform:uppercase; letter-spacing:.04em; color:var(--muted); margin:.6rem 0 .4rem; }
  pre { margin:0; padding:.7rem .8rem; overflow:auto; background:var(--bg); border:1px solid var(--line);
        border-radius:8px; font:12.5px/1.5 ui-monospace, SFMono-Regular, Menlo, monospace; }
  .tabs { display:flex; gap:.4rem; margin-bottom:.5rem; }
  .tab { border:1px solid var(--line); background:var(--bg); color:var(--fg); border-radius:8px;
         padding:.3rem .7rem; cursor:pointer; font:inherit; font-size:.85rem; }
  .tab.active { border-color:var(--accent); color:var(--accent); }
  .panel { display:none; }
  .panel.active { display:block; }
  .stdout { margin-top:.5rem; border:1px solid var(--line); border-radius:8px; padding:.5rem .7rem; }
  .stdout .label { font-size:.75rem; color:var(--muted); text-transform:uppercase; letter-spacing:.04em; }
  .stdout.ok .label { color:var(--ok); }
  .stdout.bad .label { color:var(--bad); }
  table.parity { width:100%; border-collapse:collapse; font-size:.85rem; }
  .parity th, .parity td { border:1px solid var(--line); padding:.45rem .6rem; vertical-align:top; text-align:left; }
  .parity th { width:6rem; }
  .parity pre { border:0; padding:0; background:transparent; }
  .parity tr.ok .mark { color:var(--ok); }
  .parity tr.bad .mark { color:var(--bad); font-weight:700; }
  footer { margin-top:2rem; color:var(--muted); font-size:.85rem; }
  .hidden { display:none !important; }
</style>
</head>
<body>
<h1>Drizzle → Lingua Tungga</h1>
<p class="lede">
  ${results.length} cases · ${features.length} features · ${failing} failing ·
  compiler pinned to Lingua Tungga v0.3.0. Every value below comes from a real
  run: <code>lt test --usage</code> on TypeScript, Python, and Go, compared with
  <code>drizzle-orm@0.44.4</code>.
</p>

<div class="controls">
  <input id="search" type="search" placeholder="Search cases, features, titles…">
  <select id="group">
    <option value="">All groups</option>
    ${groups.map((group) => `<option value="${esc(group)}">${esc(group)}</option>`).join("")}
  </select>
  <label><input id="only-fail" type="checkbox"> only failing</label>
</div>

${uncovered.length > 0
  ? `<p class="badge fail">features without a case: ${esc(uncovered.join(", "))}</p>`
  : ""}

${results.map(caseCard).join("\n")}

<footer>
  Generated ${esc(String((evidence as any).generatedAt ?? ""))} ·
  evidence is committed as <code>lt-drizzle-v2/playground/evidence.json</code>.
</footer>

<script>
  const search = document.getElementById("search");
  const group = document.getElementById("group");
  const onlyFail = document.getElementById("only-fail");
  const cards = [...document.querySelectorAll(".case")];

  function apply() {
    const needle = search.value.trim().toLowerCase();
    for (const card of cards) {
      const matchesText = needle === "" || card.dataset.search.includes(needle);
      const matchesGroup = group.value === "" || card.dataset.group === group.value;
      const matchesFail = !onlyFail.checked || card.dataset.status !== "pass";
      card.classList.toggle("hidden", !(matchesText && matchesGroup && matchesFail));
    }
  }
  search.addEventListener("input", apply);
  group.addEventListener("change", apply);
  onlyFail.addEventListener("change", apply);

  for (const card of cards) {
    const tabs = [...card.querySelectorAll(".tab")];
    for (const tab of tabs) {
      tab.addEventListener("click", () => {
        for (const other of tabs) other.classList.toggle("active", other === tab);
        for (const panel of card.querySelectorAll(".panel")) {
          panel.classList.toggle("active", panel.dataset.panel === tab.dataset.tab);
        }
      });
    }
  }
</script>
</body>
</html>`;
}
