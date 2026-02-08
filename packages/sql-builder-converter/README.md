# @gntrees/sql-builder-converter

SQL to TypeScript query builder converter for gntrees-sql-builder.

## Installation

```bash
bun add @gntrees/sql-builder-converter
```

## Usage

### `convert()` Function

Converts SQL queries to complete TypeScript code with imports and boilerplate:

```typescript
import { convert } from '@gntrees/sql-builder-converter';

const sql = 'SELECT id, name FROM users WHERE id = 1';
const result = await convert(sql);

console.log(result.formatted);
```

Output:
```typescript
import { sqlBuilder } from "@gntrees/sql-builder";

const q = sqlBuilder({
  formatParamHandler: "pg",
  execHandler: async ({ sql, parameters, meta }): Promise<any> => {
    return "Executed";
  },
});

const query = q.select(q.c("id"), q.c("name")).from("users").where(
  q.c("id").op("=").l(1),
);
console.log(query.getSql());
```

## Options

### `ConvertOptions`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `formatParamHandler` | `string` | `"pg"` | Parameter format handler to use |
| `execHandler` | `string` | Default handler | Custom exec handler code |

## Supported SQL Features

- **SELECT** queries with columns, aliases, and expressions
- **FROM** with table names and aliases
- **JOIN** (INNER, LEFT, RIGHT, FULL)
- **WHERE** clauses with operators (=, !=, <, >, LIKE, IN, IS NULL, etc.)
- **GROUP BY** and **HAVING**
- **ORDER BY** (ASC, DESC)
- **LIMIT** and **OFFSET**
- **INSERT** with VALUES
- **UPDATE** with SET
- **DELETE** with WHERE

## License

MIT
