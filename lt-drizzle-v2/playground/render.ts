// Renders the static playground page. One file, no framework, works on
// file://. All statuses come from build.ts runs, never from the browser.
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
  db?: { note: string; rows: Record<string, unknown>[] };
};

function esc(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

// ---- highlighting --------------------------------------------------------

type Spec = { pattern: RegExp };

function spec(parts: Record<string, string>): Spec {
  const order = ["com", "str", "num", "kw", "typ", "fn"];
  const source = order
    .filter((name) => parts[name])
    .map((name) => `(?<${name}>${parts[name]})`)
    .join("|");
  return { pattern: source.length === 0 ? /(?!)/g : new RegExp(source, "g") };
}

const IDENT = "[A-Za-z_][A-Za-z0-9_]*";
const COMMENT = String.raw`\/\/[^\n]*|\/\*[\s\S]*?\*\/`;
const STRING = String.raw`\`(?:[^\\\`]|\\.)*\`|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'`;
const NUMBER = String.raw`\b\d[\d_]*(?:\.\d+)?\b`;
const FN = String.raw`\b[a-z_][a-z0-9_]*(?=\s*\()`;

const SPECS: Record<string, Spec> = {
  lt: spec({
    com: COMMENT,
    str: STRING,
    num: NUMBER,
    kw: String.raw`\b(?:package|export|struct|enum|fn|test|let|mut|return|if|else|for|in|while|match|import|from|as|true|false|None)\b`,
    typ: String.raw`\b(?:Int|Float|Bool|Str|List|Map|Set|Option|Result|Unit|Ordering)\b`,
    fn: FN,
  }),
  ts: spec({
    com: COMMENT,
    str: STRING,
    num: NUMBER,
    kw: String.raw`\b(?:import|export|from|const|let|var|function|return|if|else|for|of|in|new|class|extends|implements|interface|type|as|async|await|throw|switch|case|default|readonly|static|void|unknown|never|any|string|number|boolean|bigint|null|undefined|true|false)\b`,
    typ: String.raw`\b(?:Error|Array|Promise|Record|Partial|Readonly|LList|LMap|Value|Sql|Select|Insert|Update|Delete|Table|Column|Dialect|Rendered|BuildError|SqlArg|SqlChunk)\b`,
    fn: FN,
  }),
  py: spec({
    com: String.raw`#[^\n]*`,
    str: String.raw`"""[\s\S]*?"""|'''[\s\S]*?'''|f?"(?:[^"\\]|\\.)*"|f?'(?:[^'\\]|\\.)*'`,
    num: NUMBER,
    kw: String.raw`\b(?:import|from|def|class|return|if|elif|else|for|in|while|match|case|as|with|try|except|raise|pass|True|False|None|and|or|not|is|lambda|yield|global|nonlocal)\b`,
    typ: String.raw`\b(?:int|str|bool|float|list|dict|set|object|None|Any|Optional|Iterable|Sequence)\b`,
    fn: FN,
  }),
  go: spec({
    com: COMMENT,
    str: STRING,
    num: NUMBER,
    kw: String.raw`\b(?:package|import|func|return|if|else|for|range|var|const|type|struct|interface|map|chan|go|defer|switch|case|default|break|continue|select|nil|true|false)\b`,
    typ: String.raw`\b(?:string|int|int64|float64|bool|byte|rune|error|any|uint|int32)\b`,
    fn: FN,
  }),
  sql: spec({
    com: String.raw`--[^\n]*`,
    str: STRING,
    num: NUMBER,
    kw: String.raw`\b(?:select|from|where|and|or|not|in|is|null|insert|into|values|default|update|set|delete|returning|join|left|right|inner|full|on|as|distinct|group|by|having|order|asc|desc|limit|offset|union|all|intersect|except|with|exists|between|like|ilike|case|when|then|else|end|conflict|do|nothing|duplicate|key)\b`,
    typ: String.raw`\b(?:count|sum|avg|min|max|lower|upper|now)\b`,
    fn: String.raw`\$\d+|\?`,
  }),
  json: spec({
    str: STRING,
    num: NUMBER,
    kw: String.raw`\b(?:true|false|null)\b`,
    fn: String.raw`"[^"]*"(?=\s*:)`,
  }),
  text: spec({}),
};

const SQL_KW = /^(select|insert|update|delete|with)\b/i;

function highlight(code: string, lang: string): string {
  const chosen = SPECS[lang] ?? SPECS.text!;
  let out = "";
  let index = 0;
  for (const match of code.matchAll(chosen.pattern)) {
    const groups = match.groups ?? {};
    const kind = Object.keys(groups).find((key) => groups[key] !== undefined) ?? "text";
    out += esc(code.slice(index, match.index));
    out += `<span class="tok-${kind}">${esc(match[0])}</span>`;
    index = match.index! + match[0].length;
  }
  out += esc(code.slice(index));
  return out;
}

/** Canonical case lines are `<sql>\t<params>`; highlight the SQL half. */
function lineCode(raw: string): string {
  const tab = raw.indexOf("\t");
  if (tab < 0) return highlight(raw, SQL_KW.test(raw) ? "sql" : "text");
  return `${highlight(raw.slice(0, tab), "sql")}<span class="tok-dim">\t${esc(raw.slice(tab + 1))}</span>`;
}

function guessLang(source: string): string {
  if (/\bpackage\s+[a-z]/.test(source) || /expect\./.test(source)) return "lt";
  if (/^import .* from "/m.test(source) || /function \w+\(/.test(source)) return "ts";
  if (/^def |^class |^from .* import/m.test(source)) return "py";
  if (/^package main|func main\(/.test(source)) return "go";
  return "text";
}

// ---- markup --------------------------------------------------------------

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
      <th><span class="dialect">${esc(dialect)}</span></th>
      <td><pre>${actual === null || actual === undefined ? "<em>not run</em>" : lineCode(actual)}</pre></td>
      <td><pre>${expected === null || expected === undefined ? "<em>not supported</em>" : lineCode(expected)}</pre></td>
      <td class="mark">${same ? "match" : "DIFF"}</td>
    </tr>`;
}

function languageTabs(item: CaseResult): string {
  const targets = TARGET_ORDER.filter((target) => item.usage[target]);
  const buttons = targets
    .map(
      (target, index) =>
        `<button class="tab ${index === 0 ? "active" : ""}" data-tab="${target}" type="button">${TARGET_LABEL[target]}</button>`,
    )
    .join("");
  const panels = targets
    .map((target, index) => {
      const run = item.usage[target]!;
      const stdout = run.lines.length > 0 ? run.lines.map(lineCode).join("\n") : esc(run.stderr || "(empty)");
      return `
      <div class="panel ${index === 0 ? "active" : ""}" data-panel="${target}">
        <div class="block">
          <pre class="code">${highlight(run.source, guessLang(run.source))}</pre>
        </div>
        <div class="block">
          <div class="block-head ${run.status === "pass" ? "ok" : run.status === "skipped" ? "skip" : "bad"}">stdout · ${run.status}</div>
          <pre class="code stdout">${stdout}</pre>
        </div>
      </div>`;
    })
    .join("");
  return `<div class="tabs">${buttons}</div>${panels}`;
}

function dbBlock(item: CaseResult): string {
  if (!item.db) return "";
  const rows = item.db.rows;
  return `
    <div class="block db">
      <div class="block-head">database · ${esc(item.db.note)}</div>
      <pre class="code">${rows.length === 0 ? "<em>no rows returned</em>" : highlight(JSON.stringify(rows, null, 2), "json")}</pre>
    </div>`;
}

function caseCard(item: CaseResult, index: number): string {
  const rows = DIALECT_ORDER.filter(
    (dialect) => item.actual[dialect] !== undefined || item.expected[dialect] !== undefined,
  )
    .map((dialect) => parityRow(dialect, item))
    .join("");
  return `
  <article class="case ${item.status}" id="case-${esc(item.id)}" data-id="${esc(item.id)}"
           data-group="${esc(item.group)}" data-feature="${esc(item.meta.feature)}"
           data-status="${item.status}"
           data-search="${esc(`${item.id} ${item.group} ${item.meta.feature} ${item.meta.title}`.toLowerCase())}">
    <header>
      <div class="headline">
        <span class="index">${String(index + 1).padStart(2, "0")}</span>
        <div>
          <h2>${esc(item.meta.title)}</h2>
          <p class="meta"><code>${esc(item.meta.feature)}</code><span class="dot">·</span><code>${esc(item.id)}</code></p>
          <p class="why">${esc(item.meta.why)}</p>
        </div>
      </div>
      <span class="badge ${item.status}">${item.status}</span>
    </header>

    <div class="grid">
      <section class="col">
        <div class="block">
          <div class="block-head">source · lingua tungga</div>
          <pre class="code">${highlight(item.source, "lt")}</pre>
        </div>
      </section>
      <section class="col">
        <div class="block-head">host output · three targets</div>
        ${languageTabs(item)}
      </section>
    </div>

    ${dbBlock(item)}

    <section class="parity-wrap">
      <div class="block-head">parity · port vs drizzle 0.44.4</div>
      <table class="parity">
        <thead><tr><th>dialect</th><th>port</th><th>drizzle</th><th></th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>
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
  :root {
    color-scheme: light dark;
    --fg:#11161c; --muted:#5b6672; --bg:#f7f8fa; --panel:#ffffff; --panel-2:#f2f4f7;
    --line:#dce1e7; --ok:#177a3b; --bad:#c62828; --accent:#0b62d6;
    --tok-com:#6a737d; --tok-str:#0a7d4f; --tok-num:#a35a00; --tok-kw:#8b2fc9;
    --tok-typ:#0b62d6; --tok-fn:#a23b00; --tok-dim:#7b8794;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --fg:#e7edf4; --muted:#9aa8b6; --bg:#0b0f14; --panel:#131a22; --panel-2:#0f151c;
      --line:#26303a; --ok:#4ad07a; --bad:#ff6b6b; --accent:#69a9ff;
      --tok-com:#7d8895; --tok-str:#7cd6a3; --tok-num:#e0a35c; --tok-kw:#c58ef5;
      --tok-typ:#7fb6ff; --tok-fn:#ffb07a; --tok-dim:#7d8895;
    }
  }
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    margin:0; background:var(--bg); color:var(--fg);
    font:15px/1.55 ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  }
  .wrap { max-width: 1240px; margin: 0 auto; padding: 2.2rem clamp(1rem,3.5vw,2.5rem) 4rem; }
  .hero { margin-bottom: 1.4rem; }
  h1 { margin:0 0 .35rem; font-size: clamp(1.5rem, 2.4vw, 2rem); letter-spacing:-.01em; }
  .lede { margin:0; color:var(--muted); max-width: 78ch; }
  .stats { display:flex; flex-wrap:wrap; gap:.45rem; margin:1rem 0 0; }
  .stat { border:1px solid var(--line); background:var(--panel); border-radius:999px;
          padding:.2rem .65rem; font-size:.8rem; color:var(--muted); }
  .stat strong { color:var(--fg); }

  .toolbar {
    position: sticky; top: 0; z-index: 10;
    display:flex; flex-wrap:wrap; gap:.6rem; align-items:center;
    margin: 1.2rem 0 1.6rem; padding:.75rem 0;
    background: color-mix(in srgb, var(--bg) 88%, transparent);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--line);
  }
  input, select {
    padding:.5rem .75rem; border:1px solid var(--line); border-radius:9px;
    background:var(--panel); color:var(--fg); font:inherit; font-size:.9rem;
  }
  input[type=search] { flex:1 1 20rem; min-width:14rem; }
  input:focus, select:focus, .tab:focus-visible { outline:2px solid var(--accent); outline-offset:1px; }
  .check { display:flex; gap:.4rem; align-items:center; color:var(--muted); font-size:.9rem; }

  .case {
    scroll-margin-top: 6rem;
    background:var(--panel); border:1px solid var(--line); border-radius:14px;
    padding:1.1rem 1.2rem 1.2rem; margin:0 0 1.35rem;
    box-shadow: 0 1px 2px rgb(0 0 0 / .04);
  }
  .case.fail { border-color: var(--bad); }
  .case header { display:flex; justify-content:space-between; gap:1rem; align-items:flex-start; }
  .headline { display:flex; gap:.8rem; align-items:flex-start; min-width:0; }
  .index { font:600 .75rem/1 ui-monospace, monospace; color:var(--muted);
           border:1px solid var(--line); border-radius:7px; padding:.3rem .45rem; margin-top:.15rem; }
  .case h2 { margin:0 0 .15rem; font-size:1.05rem; letter-spacing:-.01em; }
  .meta { margin:.05rem 0 .1rem; color:var(--muted); font-size:.8rem; }
  .meta code { background:var(--panel-2); border:1px solid var(--line); border-radius:5px; padding:0 .3rem; }
  .dot { margin: 0 .4rem; }
  .why { margin:.15rem 0 0; color:var(--muted); font-size:.9rem; max-width: 90ch; }
  .badge { flex:none; padding:.2rem .6rem; border-radius:999px; font-size:.75rem; font-weight:700;
           text-transform:uppercase; letter-spacing:.04em; }
  .badge.pass { background:color-mix(in srgb, var(--ok) 16%, transparent); color:var(--ok); }
  .badge.fail { background:color-mix(in srgb, var(--bad) 16%, transparent); color:var(--bad); }

  .grid { display:grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap:1rem; margin:1rem 0 .9rem; }
  .col { min-width:0; }
  .block { min-width:0; margin-bottom:.7rem; }
  .block-head {
    font-size:.72rem; text-transform:uppercase; letter-spacing:.06em; color:var(--muted);
    margin-bottom:.35rem; display:flex; gap:.5rem; align-items:center;
  }
  .block-head.ok { color: var(--ok); }
  .block-head.bad { color: var(--bad); }

  pre.code {
    margin:0; padding:.8rem .9rem; background:var(--panel-2);
    border:1px solid var(--line); border-radius:10px; overflow:auto;
    max-height: 26rem; font:12.8px/1.55 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    white-space: pre; tab-size: 2;
  }
  pre.stdout { white-space: pre-wrap; word-break: break-word; }

  .tabs { display:flex; gap:.4rem; margin-bottom:.55rem; }
  .tab {
    border:1px solid var(--line); background:var(--panel); color:var(--fg);
    border-radius:8px; padding:.32rem .7rem; cursor:pointer;
    font:inherit; font-size:.82rem;
  }
  .tab.active { border-color:var(--accent); color:var(--accent); background:color-mix(in srgb, var(--accent) 9%, transparent); }
  .panel { display:none; }
  .panel.active { display:block; }

  .parity-wrap { margin-top:.8rem; }
  table.parity { width:100%; border-collapse:collapse; table-layout:fixed; font-size:.82rem; }
  .parity th, .parity td { border:1px solid var(--line); padding:.45rem .55rem; vertical-align:top; text-align:left; }
  .parity thead th { background:var(--panel-2); font-weight:600; color:var(--muted); font-size:.75rem;
                     text-transform:uppercase; letter-spacing:.05em; }
  .parity th:first-child { width:6.5rem; }
  .parity th:last-child, .parity td:last-child { width:4.6rem; text-align:center; }
  .parity pre { margin:0; font:12px/1.5 ui-monospace, monospace; white-space:pre-wrap; word-break:break-word; }
  .parity tr.ok .mark { color:var(--ok); font-weight:700; }
  .parity tr.bad .mark { color:var(--bad); font-weight:700; }
  .dialect { font-weight:600; }
  .parity td em { color: var(--muted); }

  .tok-com { color: var(--tok-com); font-style: italic; }
  .tok-str { color: var(--tok-str); }
  .tok-num { color: var(--tok-num); }
  .tok-kw  { color: var(--tok-kw); font-weight:600; }
  .tok-typ { color: var(--tok-typ); }
  .tok-fn  { color: var(--tok-fn); }
  .tok-dim { color: var(--tok-dim); }

  footer { margin-top:2.2rem; padding-top:1rem; border-top:1px solid var(--line);
           color:var(--muted); font-size:.82rem; }
  .hidden { display:none !important; }

  @media (max-width: 900px) {
    .grid { grid-template-columns: minmax(0,1fr); }
    .parity { table-layout:auto; }
    .parity th:first-child { width:auto; }
  }
</style>
</head>
<body>
<div class="wrap">
  <header class="hero">
    <h1>Drizzle → Lingua Tungga</h1>
    <p class="lede">
      ${results.length} cases, ${features.length} features, ${failing} failing. Every value below
      comes from a real run — <code>lt test --usage</code> on TypeScript, Python, and Go — compared
      with <code>drizzle-orm@0.44.4</code>. The compiler is pinned to Lingua Tungga v0.3.0.
    </p>
    <div class="stats">
      <span class="stat"><strong>${results.length}</strong> cases</span>
      <span class="stat"><strong>${features.length}</strong> features</span>
      <span class="stat"><strong>3</strong> dialects</span>
      <span class="stat"><strong>3</strong> host languages</span>
      <span class="stat"><strong>${failing === 0 ? "all green" : `${failing} failing`}</strong></span>
    </div>
  </header>

  <div class="toolbar">
    <input id="search" type="search" placeholder="Search cases, features, titles…" aria-label="Search cases">
    <select id="group" aria-label="Filter by group">
      <option value="">All groups</option>
      ${groups.map((group) => `<option value="${esc(group)}">${esc(group)}</option>`).join("")}
    </select>
    <label class="check"><input id="only-fail" type="checkbox"> only failing</label>
  </div>

  ${uncovered.length > 0
    ? `<p class="badge fail">features without a case: ${esc(uncovered.join(", "))}</p>`
    : ""}

  ${results.map((item, index) => caseCard(item, index)).join("\n")}

  <footer>
    Evidence is committed as <code>lt-drizzle-v2/playground/evidence.json</code>;
    this page is regenerated by <code>lt-drizzle-v2/playground.sh</code>.
  </footer>
</div>

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
        for (const other of tabs) {
          other.classList.toggle("active", other === tab);
          other.setAttribute("aria-selected", other === tab ? "true" : "false");
        }
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
