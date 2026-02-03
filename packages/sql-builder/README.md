# @gntrees/sql-builder

A type-safe PostgreSQL query builder for TypeScript/Bun with fluent API and comprehensive function coverage.

## Features

- **Fluent Chainable API**: Build queries method by method
- **Type-Safe**: Written in TypeScript with strict mode enabled
- **PostgreSQL Functions**: 800+ SQL keywords and 100+ built-in functions
- **Parameterized Queries**: Automatic parameter handling to prevent SQL injection
- **Bun Runtime**: Optimized for Bun's fast JavaScript runtime

## Quick Start

### Installation

```bash
bun install
```

### Basic Usage

```typescript
import { sqlBuilder } from '@gntrees/sql-builder';

const q = sqlBuilder({
    formatParamHandler: 'pg',
    execHandler: async ({ sql, parameters }) => {
        // Execute query with your database client
        console.log(sql, parameters);
        return { rows: [] };
    },
});

// Simple SELECT
const users = await q
    .select('id', 'name', 'email')
    .from('users')
    .where(q.eq('active', true))
    .execute();

// INSERT with parameters
await q
    .insertInto('users', { name: 'John', email: 'john@example.com' })
    .execute();

// UPDATE
await q
    .update('users')
    .set({ last_login: q.now() })
    .where(q.eq('id', 1))
    .execute();

// DELETE
await q
    .delete('users')
    .where(q.eq('active', false))
    .execute();
```

### Using PostgreSQL Functions

```typescript
// Math functions
q.select(q.round(q.avg('score'), 2)).from('results');

// String functions
q.select(q.concat(q.column('first_name'), ' ', q.column('last_name'))).as('full_name')
    .from('users');

// Sequence functions
q.select(q.nextval('user_id_seq'));

// JSON functions
q.select(q.jsonb_build_object(
    'id', q.column('id'),
    'data', q.column('metadata')
)).from('users');
```

## Development

### Running Tests

```bash
# Run all tests
bun test src/tests/*.test.ts

# Run specific test file
bun test src/tests/math-functions.test.ts
```

### Code Generation

SQL keyword methods are auto-generated from PostgreSQL keywords:

```bash
bun run generate
```

**Note:** After modifying any `override-*-functions.ts` file, run the generator to update `QueryInstance`.

### For Contributors

See [CLAUDE.md](./CLAUDE.md) for detailed development guidelines, architecture documentation, and contribution process.

## License

MIT
