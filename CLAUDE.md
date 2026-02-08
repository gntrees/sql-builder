# gntrees-sql-builder Workspace

AGENTS IMPORTANT RULE
======================
- if there is an error just try to fix it. dont find the reason why it happened. just try. read the error message and fix it. dont deep dive into the code to find the reason why it happened. just fix it.

Purpose
-------
Central reference for the gntrees-sql-builder workspace - a multi-language SQL query builder project using Bun workspaces.

Workspace Overview
------------------
This is a Bun workspace containing multiple packages for SQL query building across different languages:

- **@gntrees/sql-builder** - Main PostgreSQL query builder for TypeScript/JavaScript
- **@gntrees/sql-builder-converter** - SQL to TypeScript query builder converter
- **sql-builder-go** - Placeholder for Go implementation (planned)
- **sql-builder-php** - Placeholder for PHP implementation (planned)

Workspace Structure
-------------------
```
gntrees-sql-builder/
├── packages/
│   ├── sql-builder/              # Main query builder package
│   ├── sql-builder-converter/    # SQL to TS converter
│   ├── sql-builder-go/           # Go implementation (empty)
│   └── sql-builder-php/          # PHP implementation (empty)
├── bun-workspace.yaml            # Bun workspace configuration
├── package.json                  # Workspace scripts and config
├── CLAUDE.md                     # This file
└── SQL_BUILDER_GUIDE.md          # Comprehensive SQL builder guide
```

Workspace Scripts
-----------------
From the root `package.json`:

- `bun run install:all` - Install all dependencies for all packages
- `bun run build` - Build the sql-builder package
- `bun run test` - Run sql-builder tests (alias for test:sql-builder)
- `bun run test:sql-builder` - Run sql-builder tests
- `bun run generate` - Generate SQL keyword methods for sql-builder
- `bun run clean` - Remove node_modules from all packages
- `bun run reinstall` - Clean and reinstall all dependencies

Package-Specific Documentation
-------------------------------

### @gntrees/sql-builder
See `packages/sql-builder/CLAUDE.md` for:
- Architecture documentation
- Inheritance structure
- Function builder implementation
- Code generation process
- Testing guidelines

### @gntrees/sql-builder-converter
See `packages/sql-builder-converter/CLAUDE.md` for:
- AST-based SQL parsing
- Conversion architecture
- Type definitions
- Build and test scripts

Development Workflow
--------------------
1. Install dependencies: `bun run install:all`
2. Work on specific packages (cd into package directory)
3. Build from root: `bun run build`
4. Test from root: `bun run test`
5. Generate code: `bun run generate`

Common Patterns
---------------
- All packages use ESM modules
- TypeScript strict mode enabled
- Bun as the primary runtime
- Each package has its own package.json with specific scripts

Git & Workspace Hygiene
-----------------------
- Do not perform destructive git operations (no `--hard`, no forced pushes) unless explicitly requested
- Do not amend commits unless requested and safe per rules
- Never commit secrets or `.env` files
- When creating commits, stage only relevant changes with clear commit messages

Important Files
---------------
- `bun-workspace.yaml` - Bun workspace definition
- `package.json` - Workspace configuration and scripts
- `SQL_BUILDER_GUIDE.md` - Comprehensive guide for the main query builder
- `packages/sql-builder/CLAUDE.md` - SQL builder agent guidelines
- `packages/sql-builder-converter/CLAUDE.md` - Converter agent guidelines

Links to Package Documentation
-------------------------------
- [SQL Builder Package](./packages/sql-builder/CLAUDE.md)
- [Converter Package](./packages/sql-builder-converter/CLAUDE.md)
