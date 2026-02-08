# @gntrees/sql-builder-converter

AGENTS IMPORTANT RULE
======================
- if there is an error just try to fix it. dont find the reason why it happened. just try. read the error message and fix it. dont deep dive into the code to find the reason why it happened. just fix it.

Purpose
-------
Central reference for agent behavior, coding rules, and conventions specific to the SQL to TypeScript query builder converter package.

Quick Project Summary
---------------------
- Runtime: Bun + TypeScript (ESM)
- Purpose: Converts SQL queries to TypeScript code using the gntrees-sql-builder query builder API
- Entry point: `index.ts` — exports `convert` function and types
- Core dependency: `pgsql-parser` for SQL AST parsing

Architecture Overview
--------------------
The converter uses an AST-based approach to transform SQL queries into TypeScript code:

1. **Parse**: SQL string is parsed into an AST using `pgsql-parser`
2. **Traverse**: AST is walked using `@pgsql/traverse` visitors
3. **Transform**: Each AST node is converted to function call representations
4. **Generate**: TypeScript code is generated from the transformed representation

Important Files
---------------
- `index.ts` — Public API exports (convert function, ConvertResult, ConvertOptions, FunctionListType)
- `src/convert.ts` — Core conversion logic (11,258+ lines)
  - `specialNode` object: Maps AST node types to conversion handlers
  - `resolveNode`: Main dispatcher for node resolution
  - `resolveRaw`: Fallback for unhandled node types
  - `convert`: Main entry point for conversion
- `src/types.ts` — TypeScript type definitions
  - `ConvertOptions`: Options for formatParamHandler and execHandler
  - `FunctionListType`: Internal representation of function calls
- `src/utils/to-camel-case.ts` — Utility for converting SQL identifiers to camelCase
- `package.json` — Package configuration and scripts

Type Definitions
----------------
```typescript
// Options for the convert function
export interface ConvertOptions {
    formatParamHandler?: string;  // Parameter format handler (default: "pg")
    execHandler?: string;         // Execution handler (default provided)
}

// Internal function representation
export type FunctionListType = {
    name: string;
    arguments: (string | number | boolean | null | undefined | FunctionListType)[];
    paramType: "function" | "template-literal" | "string" | "number" | "boolean" | "null";
}

// Result of conversion
export type ConvertResult = {
    code: string;      // Generated TypeScript code
    query: string;     // Original SQL query
}
```

Build & Run
-----------
1. Install deps: `bun install`
2. Build: `bun run build`
3. Test: `bun test tests/*.test.ts`

Build scripts from `package.json`:
- `prebuild` - Clean dist directory
- `build` - Full build (cjs + esm + combined)
- `build:cjs` - Build CommonJS output
- `build:esm` - Build ESM output
- `build:combine` - Combine outputs into dist/
- `test` - Run test suite

Supported SQL Features
----------------------
The converter supports these PostgreSQL query types:
- **SELECT** - Including joins, where clauses, group by, having, order by, limit, offset
- **INSERT** - Insert statements with values
- **UPDATE** - Update statements with set clauses
- **DELETE** - Delete statements with where clauses

AST Node Handlers (specialNode)
--------------------------------
Key node types handled in `src/convert.ts`:
- `SelectStmt` - SELECT queries
- `ResTarget` - Result targets (columns in SELECT)
- `ColumnRef` - Column references
- `String` - String literals
- `FuncCall` - Function calls
- `A_Expr` - Expressions (operators, comparisons)
- `A_Const` - Constant values
- And many more for complete SQL coverage

Code Generation Process
-----------------------
1. SQL is parsed to AST using `parse()` from pgsql-parser
2. AST walker visits each node using `walk()` from @pgsql/traverse
3. Each node type is resolved to a `FunctionListType` representation
4. The representation is converted to TypeScript code strings
5. Output is formatted using Prettier
6. Complete boilerplate is generated with imports and query builder setup

Dependencies
-----------
- `@pgsql/enums`, `@pgsql/traverse`, `@pgsql/types`, `@pgsql/utils` - PostgreSQL AST handling
- `pgsql-parser` - SQL parsing
- `prettier` - Code formatting

Editing Constraints & Style
---------------------------
- Use ASCII by default for new/edited files unless file already contains non-ASCII
- Keep comments minimal — only where a block is non-obvious
- Indentation: 4 spaces (follow repo conventions)
- Semicolons: keep consistent with surrounding files
- Follow existing quote style when editing a file

Module Style & Imports
----------------------
- ESM (`import`/`export`) only; `type` imports for pure types where appropriate
- Avoid unused imports — TypeScript `strict` is enabled

TypeScript Strictness
---------------------
- Package uses TypeScript strict mode
- Proper typing for all conversion functions
- Type imports from `@pgsql/*` packages for AST nodes

Testing
-------
- Test files located in `tests/` directory
- Run specific test: `bun test tests/convert.test.ts`
- Test fixtures in `tests/fixtures/` if present

Contributing Guidelines
----------------------

### Adding New SQL Feature Support
1. Identify the AST node type to handle (use pgsql-parser to inspect)
2. Add handler to `specialNode` object in `src/convert.ts`
3. Implement resolution logic using `resolveNode` and `resolveRaw`
4. Add tests for the new feature
5. Run `bun test` to verify

### Code Style
- Follow existing patterns in `specialNode` handlers
- Use `normalizeNode` helper for type-safe node access
- Return `FunctionListType[]` from all handlers
- Handle edge cases with fallback to `resolveRaw`

### Commit Message Conventions
Use conventional commit format:
```
<type>(<scope>): <description>

[optional body]
```

**Types:** feat, fix, docs, style, refactor, test, chore

**Examples:**
- `feat(converter): add support for UNION queries`
- `fix(convert): handle NULL values in WHERE clauses`
- `docs: update CLAUDE.md with architecture details`

Git & Workspace Hygiene
-----------------------
- Do not perform destructive git operations (no `--hard`, no forced pushes) unless explicitly requested
- Do not amend commits unless requested and safe per rules
- Never commit secrets or `.env` files
- When creating commits, stage only relevant changes with clear commit messages

Agent Tooling & Behavior
------------------------
- Agents must follow repo constraints: prefer `Read`, `Glob`, `Grep`, `Edit`
- For terminal ops use Bun and validated bash calls
- When presenting code changes, show diffs clearly
- When blocked or needs clarification, ask a single targeted question

Presenting Work (agent output)
-----------------------------
- Be concise and act like a collaborative teammate
- When making code changes: lead with quick explanation, then show details and file references
- Provide verification steps and suggested next actions (tests, build)
- Use inline code formatting for paths and commands

Error Handling & Safety
-----------------------
- Throw descriptive `Error` values on invalid inputs (do not swallow exceptions)
- Handle SQL parsing errors gracefully
- Provide clear error messages for unsupported SQL features

Related Documentation
---------------------
- [Workspace CLAUDE.md](../../CLAUDE.md) - Workspace-level documentation
- [SQL Builder CLAUDE.md](../sql-builder/CLAUDE.md) - Query builder documentation
- SQL_BUILDER_GUIDE.md - Comprehensive guide for the query builder API
