AGENTS
======

AGENTS IMPORTANT RULE
- if there is an error just try to fix it. dont find the reason why it happened. just try. read the error message and fix it. dont deep dive into the code to find the reason why it happened. just fix it. 

Purpose
-------
- Central reference for agent behavior, coding rules, and repo conventions.
- Primary audience: coding agents (automated assistants), contributors updating the query builder.

Quick Project Summary
---------------------
- Runtime: Bun + TypeScript (ESM).
- Entry point: `index.ts` — exports `sqlBuilder`, `QueryInstance`, `QueryBuilder`.
- Core: a Postgres query builder that assembles SQL tokens and formats parameters via `ParameterType`.
- Generator: SQL keyword methods auto-generated from `keywords.json` using `pgsql-parser` (run `bun run generate`).
- Architecture: Multi-layer inheritance with `CoreQueryBuilder` → `BaseQueryBuilder` → `OverrideQueryBuilder` → `QueryBuilder`.

Inheritance Structure
--------------------
The query builder uses a multi-layer inheritance chain. Each layer extends the previous one:

```
CoreQueryBuilder
  ↓ (core query building logic, token resolution)
BaseRawQueryBuilder
  ↓ (low-level parameter primitives)
BaseQueryBuilder (AUTO-GENERATED)
  ↓ (SQL keyword methods from keywords.json)
DateTimeFunctionBuilder
  ↓ (date/time functions: now, current_date, etc.)
EnumFunctionBuilder
  ↓ (enum functions: first, last, etc.)
GeometryFunctionBuilder
  ↓ (geometric functions: area, center, etc.)
MathFunctionBuilder
  ↓ (math functions: abs, floor, random, etc.)
NetworkFunctionBuilder
  ↓ (network functions: inet_merge, macaddr, etc.)
JSONFunctionBuilder
  ↓ (JSON functions: jsonb_build_object, etc.)
XMLFunctionBuilder
  ↓ (XML functions: xmlcomment, etc.)
UUIDFunctionBuilder
  ↓ (UUID functions: uuid_generate_v4, etc.)
TextSearchFunctionBuilder
  ↓ (full-text search: to_tsquery, ts_rank, etc.)
StringFunctionBuilder
  ↓ (string functions: concat, substring, etc.)
SequenceFunctionBuilder
  ↓ (sequence functions: nextval, setval, currval, lastval)
ConditionalFunctionBuilder
  ↓ (conditional functions: coalesce, nullif, etc.)
ArrayFunctionBuilder
  ↓ (array functions: array_append, array_cat, etc.)
TriggerFunctionBuilder
  ↓ (trigger functions: pg_trigger_depth, etc.)
EventTriggerFunctionBuilder
  ↓ (event trigger functions: pg_event_trigger_ddl_commands, etc.)
OverrideQueryBuilder
  ↓ (comprehensive query method overrides)
QueryBuilder
  ↓ (final public class with getSql, getParameters, execute)
```

**Adding New Functions:**
1. Create a new function builder file: `src/override-{category}-functions.ts`
2. Extend from appropriate parent class (usually the last function builder in chain)
3. Add methods using `this.pushFunction("FUNCTION_NAME", [args])`
4. Update `src/extract.ts` to include your new file in `parentFiles` array (line ~115-141)
5. Run `bun run generate` to update `QueryInstance`
6. Create tests in `src/tests/{category}-functions.test.ts`

**Important:** If a function was implemented in `base-query-builder.ts` (as an auto-generated keyword) but needs arguments or special handling, use the `override` keyword in the function builder:

```typescript
// Example: cardinality exists as keyword, but we need it to accept parameters
override cardinality(array?: StatementValue) {
    return this.pushFunction("CARDINALITY", [array]);
}
```

This instructs the generator to delegate to the override implementation in `QueryInstance` instead of the simple keyword push.

Important Locations
-------------------
- `index.ts` — public API.
- `src/types.ts` — core TypeScript types (`DBInstance`, `ParameterType`, `Statement`).
- `src/core-query-builder.ts` — core query building logic (token resolution, SQL formatting).
- `src/base-raw-query-builder.ts` — low-level parameter primitives and helper methods.
- `src/query-builder.ts` — main `QueryBuilder` class with public methods (getSql, getParameters, execute).
- `src/override-query-builder.ts` — comprehensive override extension with custom query methods.
- Function-specific modules (26 categories):
  - `src/override-uuid-functions.ts` — UUID functions
  - `src/override-textsearch-functions.ts` — Full-text search functions
  - `src/override-string-functions.ts` — String manipulation functions
  - `src/override-network-functions.ts` — Network address functions
  - `src/override-math-functions.ts` — Mathematical functions
  - `src/override-geometry-functions.ts` — Geometric functions
  - `src/override-enum-functions.ts` — Enum functions
  - `src/override-date-time-function.ts` — Date/time functions
  - `src/override-sequence-functions.ts` — Sequence manipulation functions (nextval, setval, currval, lastval)
  - `src/override-conditional-functions.ts` — Conditional functions (coalesce, nullif, etc.)
  - `src/override-array-functions.ts` — Array functions (array_append, array_cat, etc.)
  - `src/override-json-functions.ts` — JSON functions
  - `src/override-xml-functions.ts` — XML functions
  - `src/override-trigger-functions.ts` — Trigger functions (pg_trigger_depth, etc.)
  - `src/override-event-trigger-functions.ts` — Event trigger functions (pg_event_trigger_ddl_commands, etc.)
  - `src/override-operator-functions.ts` — SQL operators (=, !=, <>, >, <, >=, <=, AND, OR, NOT, etc.)
  - `src/override-aggregate-functions.ts` — Aggregate functions (count, sum, avg, min, max, etc.)
  - `src/override-window-functions.ts` — Window functions (row_number, rank, dense_rank, etc.)
  - `src/override-set-returning-functions.ts` — Set-returning functions (generate_series, unnest, etc.)
  - `src/override-range-functions.ts` — Range functions (lower, upper, isempty, etc.)
  - `src/override-merge-functions.ts` — Merge functions
  - `src/override-subquery-functions.ts` — Subquery functions (exists, in, any, all, etc.)
  - `src/override-info-functions.ts` — Information functions (current_database, current_user, etc.)
  - `src/override-admin-functions.ts` — Administrative functions
  - `src/override-statistics-functions.ts` — Statistical functions
- Generator:
  - `src/extract.ts` — main generator script using `pgsql-parser`.
  - `keywords.json` — SQL keywords source for generation.
  - `src/generated/base-query-builder.ts` — auto-generated keyword methods (do not edit).
  - `src/generated/query-instance.ts` — auto-generated QueryInstance (do not edit).
  - `src/clone-types.ts` — AST type definitions for generator.
- Tests: `src/tests/*.test.ts` — comprehensive test suite (180+ test files).

Build & Run
-----------
1. Install deps: `bun install`
2. Run: `bun run index.ts`
3. Generate SQL keyword methods: `bun run generate`
Notes: Bun is the supported runtime. There is no additional build script in `package.json`.

Lint & Tests
------------
- Run tests: `bun test src/tests/*.test.ts`
- Run specific test file: `bun test src/tests/network-functions.test.ts`
Recommendation: run specific files while debugging to avoid running entire test suite (180+ test files).

Editing Constraints & Style
---------------------------
- Use ASCII by default for new/edited files unless file already contains non-ASCII.
- Keep comments minimal — only where a block is non-obvious.
- Indentation: 4 spaces (follow repo conventions).
- Semicolons: keep consistent with surrounding files.
- Follow existing quote style when editing a file.

Module Style & Imports
----------------------
- ESM (`import`/`export`) only; `type` imports for pure types where appropriate.
- Avoid unused imports — TypeScript `strict` is enabled.

TypeScript Strictness
---------------------
- `tsconfig.json` uses `strict: true`.
- `noImplicitOverride` is enabled — add `override` for overridden methods.
- `noUncheckedIndexedAccess` is enabled — check array/object accesses carefully.
- Parameter types: use `ParameterValueType` (string | number | boolean | null).

Query Builder Patterns
----------------------
- Methods return `this` for chaining.
- Internal state should be minimal: primarily `query.sql` and `escapedCounter`.
- Use `ParameterType` for dynamic values (avoid string interpolation).
- When pushing SQL keywords, use uppercase literals.
- `QueryBuilder.getSql()` handles token formatting through handlers (pg or custom).

Formatting & Parameter Handling
------------------------------
- For Postgres handler: literals -> `$1`, identifiers -> `%I` (via `node-pg-format` or custom handlers).
- `formatParamHandler` may be provided; ensure handler determinism.
- `execute()` should send `sql` and `parameters` to the configured `execHandler`.

Generated Files & Generator Pipeline
------------------------------------
**DO NOT EDIT:** Files in `src/generated/` are auto-generated:
- `src/generated/base-query-builder.ts` — SQL keyword methods (844+ keywords)
- `src/generated/query-instance.ts` — Method delegation class

**How Generation Works:**
1. `src/extract.ts` reads `keywords.json` (844 PostgreSQL keywords)
2. Extracts method names from all `override-*-functions.ts` files
3. Uses `pgsql-parser` to validate and parse keywords
4. Generates `BaseQueryBuilder` with simple keyword push methods
5. Generates `QueryInstance` that delegates all methods to `QueryBuilder`
6. Writes both files to `src/generated/`

**When to Regenerate:**
- After adding methods to any `override-*-functions.ts` file
- After modifying `src/extract.ts`
- Run: `bun run generate`

**Generator Configuration (`src/extract.ts`):**
- `parentFiles` array lists all function builder files to scan
- Exception keywords get "Keyword" suffix (CONSTRUCTOR → constructorKeyword)
- All other keywords converted to camelCase (GROUP_BY → groupBy)

Git & Workspace Hygiene
-----------------------
- Do not perform destructive git operations (no `--hard`, no forced pushes) unless explicitly requested.
- Do not amend commits unless requested and safe per rules.
- Never commit secrets or `.env` files.
- If asked to create a commit, the agent should stage only the relevant changes and draft a concise commit message explaining the "why".

Agent Tooling & Behavior
------------------------
- Agents must follow repo constraints: prefer `Read`, `Glob`, `Grep`, `Edit`, `apply_patch` (when authorized).
- For terminal ops use Bun and validated bash calls; avoid file-manipulating shell hacks.
- When presenting code changes, show diffs/patches in the `apply_patch` format.
- When the agent is blocked or needs clarification, ask a single targeted question and propose a default action.

Frontend Task Notes
-------------------
- When implementing UI changes, prefer expressive typography, purposeful color variables, subtle atmosphere (gradients/shapes), and meaningful motion.
- Match the repository's existing design language if present.

Presenting Work (agent output)
-----------------------------
- Be concise and act like a collaborative teammate.
- When making code changes: lead with a quick explanation, then show details and file references.
- When multiple options exist, present them as a numbered list.
- Provide verification steps and suggested next actions (tests, build).
- Use inline code formatting for paths and commands.

Error Handling & Safety
-----------------------
- Throw descriptive `Error` values on invalid inputs (do not swallow exceptions).
- Add new errors only if they clarify edge cases.

Contributing Guidelines
----------------------

### Adding New SQL Functions
1. Create `src/override-{category}-functions.ts` extending appropriate parent
2. Add methods using `this.pushFunction("FUNCTION_NAME", [args])`
3. Add to `parentFiles` array in `src/extract.ts`
4. Run `bun run generate` to update `QueryInstance`
5. Create tests in `src/tests/{category}-functions.test.ts`
6. Run `bun test src/tests/{category}-functions.test.ts`

### Commit Message Conventions
Use conventional commit format:
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:** feat, fix, docs, style, refactor, test, chore

**Examples:**
- `feat(sequence): add nextval, setval, currval, lastval functions`
- `fix(json): correct parameter order in jsonb_build_object`
- `docs: update CLAUDE.md with inheritance structure`
- `test(geometry): add tests for point and circle functions`

### Pull Request Process
1. Fork and create a feature branch
2. Make changes with clear commit messages
3. Run tests: `bun test src/tests/*.test.ts`
4. Update documentation if needed
5. Push and create PR with descriptive title
6. Link related issues in PR description

### PR Checklist
- [ ] Tests pass locally
- [ ] New functions have test coverage
- [ ] Documentation updated (CLAUDE.md, this file)
- [ ] Generated files regenerated if needed (`bun run generate`)
- [ ] Commit messages follow conventions
- [ ] PR description explains the "why"

Related Documentation
---------------------
- [Workspace CLAUDE.md](../../CLAUDE.md) - Workspace-level documentation
- [Converter CLAUDE.md](../sql-builder-converter/CLAUDE.md) - Converter package documentation
- SQL_BUILDER_GUIDE.md - Comprehensive guide for the query builder API
