# @gntrees/sql-builder-cli

CLI for converting PostgreSQL SQL into `@gntrees/sql-builder` query builder code and generating DB schema files.

## Usage

Run directly with `npx`:

```bash
npx @gntrees/sql-builder-cli help
```

### Convert SQL to query-builder code

```bash
npx @gntrees/sql-builder-cli convert --sql="SELECT id, name FROM users WHERE id = 1"
```

Write output to a file:

```bash
npx @gntrees/sql-builder-cli convert \
  --sql="SELECT id, name FROM users WHERE id = 1" \
  --output="./query.ts"
```

Optional flags:

- `--sqlSchema=true|false`
- `--dbSchema=true|false`
- `--simplify-literal=true|false`

### Generate DB schema file

```bash
npx @gntrees/sql-builder-cli generate --url="postgres://user:password@localhost:5432/my_db"
```

Set custom output path:

```bash
npx @gntrees/sql-builder-cli generate \
  --url="postgres://user:password@localhost:5432/my_db" \
  --output="./my_db.schema.ts"
```

## Commands

- `convert` - Convert SQL query into `@gntrees/sql-builder` code
- `generate` - Generate schema source from a PostgreSQL database URL

## Local development

```bash
bun run build
```
