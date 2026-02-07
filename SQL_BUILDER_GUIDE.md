# SQL Builder Guide

A comprehensive guide to the gntrees-sql-builder - a type-safe PostgreSQL query builder for TypeScript/Bun with fluent API and comprehensive function coverage.

> **Package Name:** Current: `gntrees-sql-builder` | Future: `@gntrees/sql-builder`

---

## Table of Contents

1. [Introduction](#introduction)
2. [Installation & Setup](#installation--setup)
3. [Quick Start](#quick-start)
4. [Core Query Methods](#core-query-methods)
5. [WHERE Clauses](#where-clauses)
6. [JOINs](#joins)
7. [GROUP BY & HAVING](#group-by--having)
8. [ORDER BY, LIMIT, OFFSET](#order-by-limit-offset)
9. [PostgreSQL Functions](#postgresql-functions)
10. [Advanced Features](#advanced-features)
11. [Raw SQL](#raw-sql)
12. [Common Patterns](#common-patterns)
13. [API Reference](#api-reference)

---

## Introduction

### What is gntrees-sql-builder?

A type-safe PostgreSQL query builder for TypeScript/Bun that provides:

- **Fluent Chainable API** - Build queries method by method
- **Type-Safe** - Written in TypeScript with strict mode enabled
- **Comprehensive Coverage** - 800+ SQL keywords and 100+ built-in functions
- **Parameterized Queries** - Automatic parameter handling to prevent SQL injection
- **Bun Runtime Optimized** - Built for Bun's fast JavaScript runtime

### Why use this library?

- **Safety:** Automatic parameterization prevents SQL injection
- **Productivity:** Chainable API makes query building intuitive
- **Comprehensive:** Full PostgreSQL function coverage
- **Type-Safe:** TypeScript support with strict mode
- **Flexible:** Works with pg, postgres.js, and other clients

---

## Installation & Setup

### Installation

```bash
# npm
npm install gntrees-sql-builder

# yarn
yarn add gntrees-sql-builder

# pnpm
pnpm add gntrees-sql-builder

# bun
bun add gntrees-sql-builder
```

### Basic Setup

```typescript
import { sqlBuilder } from 'gntrees-sql-builder';

const q = sqlBuilder({
    formatParamHandler: 'pg',
    execHandler: async ({ sql, parameters }) => {
        // Execute query with your database client
        const result = await client.query(sql, parameters);
        return result;
    },
});
```

### Setup with pg (node-postgres)

```typescript
import pg from 'pg';
import { sqlBuilder } from 'gntrees-sql-builder';

const { Pool } = pg;
const pool = new Pool({ connectionString: 'postgres://...' });

const q = sqlBuilder({
    formatParamHandler: 'pg',
    execHandler: async ({ sql, parameters }) => {
        const result = await pool.query(sql, parameters);
        return result;
    },
});

// Usage
const users = await q.select('*').from('users').where(q.eq('active', true)).execute();
```

### Setup with postgres.js

```typescript
import postgres from 'postgres';
import { sqlBuilder } from 'gntrees-sql-builder';

const sql = postgres('postgres://...');

const q = sqlBuilder({
    formatParamHandler: 'pg',
    execHandler: async ({ sql, parameters }) => {
        const result = await sql.unsafe(sql, parameters);
        return result;
    },
});
```

### Custom Parameter Format Handler

```typescript
const q = sqlBuilder({
    formatParamHandler: (type, value) => {
        if (type === 'literal') return `$${counter++}`;
        if (type === 'identifier') return `"${value}"`;
        return value;
    },
    execHandler: async ({ sql, parameters }) => {
        // custom execution
    },
});
```

---

## Quick Start

### Basic SELECT

```typescript
import { sqlBuilder } from 'gntrees-sql-builder';

const q = sqlBuilder({
    formatParamHandler: 'pg',
    execHandler: async ({ sql, parameters }) => ({ rows: [] }),
});

// SELECT id, name, email FROM users
const query = q
    .select('id', 'name', 'email')
    .from('users');

console.log(query.getSql());
// Output: SELECT id, name, email FROM users
```

### Basic INSERT

```typescript
// INSERT INTO users (name, email) VALUES ($1, $2)
const query = q
    .insert('users', {
        name: 'John',
        email: 'john@example.com'
    });

console.log(query.getSql());
console.log(query.getParameters());
// Output: ['John', 'john@example.com']
```

### Basic UPDATE

```typescript
// UPDATE users SET last_login = NOW() WHERE id = $1
const query = q
    .update('users')
    .set({ last_login: q.now() })
    .where(q.eq('id', 1));
```

### Basic DELETE

```typescript
// DELETE FROM users WHERE active = $1
const query = q
    .delete('users')
    .where(q.eq('active', false));
```

---

## Core Query Methods

### select()

Select columns from a table.

```typescript
// Single column
q.select('id').from('users');

// Multiple columns
q.select('id', 'name', 'email').from('users');

// With alias object
q.select({
    userId: 'users.id',
    userName: 'users.name'
}).from('users');

// With expression alias
q.select({
    alias: 'user_count',
    expression: q.count(q.c('id'))
}).from('users');
```

### selectDistinct()

```typescript
q.selectDistinct('status').from('orders');

// SQL: SELECT DISTINCT status FROM orders
```

### selectDistinctOn()

```typescript
q.selectDistinctOn(['category'], 'id', 'name').from('products');

// SQL: SELECT DISTINCT ON (category) id, name FROM products
```

### insert()

```typescript
// Single record
q.insert('users', {
    name: 'Alice',
    email: 'alice@example.com'
});

// Multiple records
q.insert('users', [
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' }
]);
```

### insertInto()

```typescript
q.insertInto('users', ['name', 'email'])
    .values(['Alice', 'alice@example.com']);
```

### update()

```typescript
q.update('users')
    .set({ status: 'active' })
    .where(q.eq('id', 1));
```

### delete()

```typescript
q.delete('users').where(q.eq('active', false));

// SQL: DELETE FROM users WHERE active = $1
```

### from()

```typescript
q.select('*').from('users');

// Multiple tables
q.select('*').from('users', 'profiles');
```

### into()

Used with INSERT:

```typescript
q.insert().into('users').values(['name']);
```

### table()

Alias for table reference in various contexts:

```typescript
q.t('users');  // Returns identifier for 'users'
```

---

## WHERE Clauses

### Comparison Operators

```typescript
// Equal (=)
q.eq('status', 'active')

// Not equal (!= or <>)
q.ne('status', 'inactive')

// Greater than (>)
q.gt('age', 18)

// Less than (<)
q.lt('age', 65)

// Greater than or equal (>=)
q.gte('age', 18)

// Less than or equal (<=)
q.lte('age', 65)
```

### Using Identifiers

```typescript
// Create an identifier reference
q.i('column_name')

// Chain with operators
q.i('age').op('>').l(18)

// SQL: age > $1
```

### Logical Operators

```typescript
// AND
q.and(
    q.eq('active', true),
    q.gt('age', 18)
)

// OR
q.or(
    q.eq('status', 'active'),
    q.eq('status', 'pending')
)

// NOT
q.not(q.eq('deleted', true))
```

### WHERE Methods

```typescript
// Initial WHERE
q.select('*').from('users').where(q.eq('active', true));

// Additional AND conditions
q.where(q.eq('active', true))
    .and(q.gte('age', 18));

// Additional OR conditions
q.where(q.eq('status', 'active'))
    .or(q.eq('status', 'pending'));
```

### IN, NOT IN, BETWEEN, LIKE

```typescript
// IN
q.select('*').from('users')
    .where(q.i('id').op('IN').l([1, 2, 3]));

// NOT IN
q.where(q.i('status').op('NOT IN').l(['active', 'pending']));

// BETWEEN
q.where(q.i('age').op('BETWEEN').l([18, 65]));

// LIKE
q.where(q.i('name').op('LIKE').l('John%'));

// ILIKE (case-insensitive)
q.where(q.i('name').op('ILIKE').l('john%'));

// LIKE with escape
q.select('*').from('users')
    .where(q.i('name').op('LIKE').l('A\\_%').escape('\\'));
```

### IS NULL, IS NOT NULL

```typescript
// IS NULL
q.where(q.i('deleted_at').op('IS').l(null))

// IS NOT NULL
q.where(q.i('email').op('IS NOT').l(null))
```

---

## JOINs

### Basic JOIN Methods

```typescript
// LEFT JOIN
q.select('users.id', 'profiles.bio')
    .from('users')
    .leftJoin('profiles', q.i('profiles.user_id').op('=').i('users.id'));

// INNER JOIN
q.innerJoin('profiles', q.i('profiles.user_id').op('=').i('users.id'));

// RIGHT JOIN
q.rightJoin('profiles', q.i('profiles.user_id').op('=').i('users.id'));

// FULL JOIN
q.fullJoin('profiles', q.i('profiles.user_id').op('=').i('users.id'));

// CROSS JOIN
q.crossJoin('profiles');
```

### LATERAL JOINs

```typescript
// LEFT JOIN LATERAL
const subquery = q
    .select('orders.user_id', q.count(q.c('*')).as('count'))
    .from('orders')
    .where(q.i('orders.user_id').op('=').i('users.id'))
    .groupBy('orders.user_id');

q.select('users.id', 'user_orders.count')
    .from('users')
    .leftJoinLateral(q.sub(subquery).as('user_orders'), q.null());

// INNER JOIN LATERAL
q.innerJoinLateral(table, onCondition);

// RIGHT JOIN LATERAL
q.rightJoinLateral(table, onCondition);

// CROSS JOIN LATERAL
q.crossJoinLateral(table);
```

### Multiple JOINs

```typescript
q.select('users.*', 'profiles.*', 'roles.*')
    .from('users')
    .innerJoin('profiles', q.i('profiles.user_id').op('=').i('users.id'))
    .leftJoin('roles', q.i('roles.id').op('=').i('users.role_id'));
```

---

## GROUP BY & HAVING

### groupBy()

```typescript
q.select('category', q.count(q.c('*')).as('count'))
    .from('products')
    .groupBy('category');

// Multiple columns
q.groupBy('category', 'status');
```

### having()

```typescript
q.select('category_id')
    .from('products')
    .groupBy('category_id')
    .having(q.count(q.c('id')).op('>').l(5));

// Multiple conditions
q.select('category')
    .from('products')
    .groupBy('category')
    .having(
        q.and(
            q.sum(q.c('amount')).op('>').l(1000),
            q.count(q.c('id')).op('<').l(10)
        )
    );
```

### Aggregate Functions

```typescript
// COUNT
q.count(q.c('id'))
q.count(q.c('*')).as('total')

// SUM
q.sum(q.c('amount'))
q.sum(q.c('price')).as('total_price')

// AVG
q.avg(q.c('rating'))
q.avg(q.c('score')).as('average_score')

// MAX
q.max(q.c('created_at'))
q.max(q.c('price')).as('highest_price')

// MIN
q.min(q.c('created_at'))
q.min(q.c('price')).as('lowest_price')
```

---

## ORDER BY, LIMIT, OFFSET

### orderBy()

```typescript
q.select('*').from('users').orderBy('created_at');

// Multiple columns
q.orderBy('last_name', 'first_name');
```

### asc() and desc()

```typescript
// ASCENDING
q.select('*').from('users').asc('name');

// DESCENDING
q.select('*').from('users').desc('created_at');

// Mixed
q.select('*').from('users')
    .asc('status')
    .desc('created_at');
```

### limit()

```typescript
q.select('*').from('users').limit(10);
```

### offset()

```typescript
q.select('*').from('users').offset(20);
```

### Pagination Pattern

```typescript
function paginate(page: number, pageSize: number) {
    return q
        .select('*')
        .from('users')
        .limit(pageSize)
        .offset((page - 1) * pageSize);
}

// Page 2, 10 items per page
paginate(2, 10);
// SQL: SELECT * FROM users LIMIT $1 OFFSET $2
// Parameters: [10, 10]
```

### fetch()

PostgreSQL 14+ FETCH clause:

```typescript
// FETCH FIRST 10 ROWS ONLY
q.select('*').from('users').fetch(10);

// FETCH NEXT 10 ROWS ONLY
q.select('*').from('users').fetch(10, 'next');

// FETCH FIRST 10 ROWS WITH TIES
q.select('*').from('users').fetch(10, 'first', true);
```

---

## PostgreSQL Functions

### Math Functions

```typescript
// Absolute value
q.abs(-17.4)
// SQL: ABS($1)

// Round with optional scale
q.round(42.4382, 2)
// SQL: ROUND($1, $2)

// Floor
q.floor(3.7)
// SQL: FLOOR($1)

// Ceiling
q.ceil(3.2)
// SQL: CEIL($1)

// Power
q.power(2, 8)
// SQL: POWER($1, $2)

// Square root
q.sqrt(16)
// SQL: SQRT($1)

// Modulo
q.mod(10, 3)
// SQL: MOD($1, $2)

// Random
q.random()
// SQL: RANDOM()

// Random Normal (Gaussian)
q.randomNormal(0, 1)
// SQL: RANDOM_NORMAL($1, $2)

// PI constant
q.pi()
// SQL: PI()

// Trigonometric
q.sin(1.5)
q.cos(1.5)
q.tan(1.5)
q.asin(0.5)
q.acos(0.5)
q.atan(1)
```

### String Functions

```typescript
// Concatenate
q.concat('first', ' ', 'last')
// SQL: CONCAT($1, $2, $3)

// Concatenate with separator
q.concatWs(', ', 'a', 'b', 'c')
// SQL: CONCAT_WS($1, $2, $3, $4)

// Substring
q.substring('Thomas', 2, 3)
// SQL: SUBSTRING($1, $2, $3)

// Lowercase
q.lower('HELLO')
// SQL: LOWER($1)

// Uppercase
q.upper('hello')
// SQL: UPPER($1)

// Length
q.length('hello')
// SQL: LENGTH($1)

// Trim
q.trim('  hello  ')
// SQL: TRIM($1)

// Left/Right
q.left('hello', 2)
// SQL: LEFT($1, $2)

q.right('hello', 2)
// SQL: RIGHT($1, $2)

// Replace
q.replace('hello world', 'world', 'there')
// SQL: REPLACE($1, $2, $3)

// Reverse
q.reverse('abc')
// SQL: REVERSE($1)

// Repeat
q.repeat('a', 5)
// SQL: REPEAT($1, $2)

// Split part
q.splitPart('a,b,c', ',', 2)
// SQL: SPLIT_PART($1, $2, $3)

// String to array
q.stringToArray('a,b,c', ',')
// SQL: STRING_TO_ARRAY($1, $2)

// Position
q.strpos('hello', 'ell')
// SQL: STRPOS($1, $2)

// MD5 hash
q.md5('password')
// SQL: MD5($1)

// SHA256
q.sha256('data')
// SQL: SHA256($1)
```

### Date/Time Functions

```typescript
// Current timestamp
q.now()
// SQL: NOW()

// Current date
q.currentDate()
// SQL: CURRENT_DATE

// Current time
q.currentTime()
// SQL: CURRENT_TIME

// Date trunc
q.dateTrunc('day', q.c('created_at'))
// SQL: DATE_TRUNC($1, created_at)

// Extract
q.extract('year', q.c('created_at'))
// SQL: EXTRACT($1 FROM created_at)

// Age
q.age(q.c('birthdate'))
// SQL: AGE(birthdate)

// Date part
q.datePart('year', q.c('created_at'))
// SQL: DATE_PART($1, created_at)

// Interval operations
q.c('created_at').op('+').l(q.interval('1 day'))
// SQL: created_at + $1
```

### JSON Functions

```typescript
// Build JSON object
q.jsonbBuildObject(
    q.l('id'), q.i('id'),
    q.l('name'), q.i('name')
)
// SQL: JSONB_BUILD_OBJECT($1, id, $2, name)

// JSON path query
q.jsonbPathQuery(q.i('data'), q.l('$.items[*]'))
// SQL: JSONB_PATH_QUERY(data, $1)

// JSON extract path
q.jsonExtractPath(q.i('data'), q.l('user'), q.l('name'))
// SQL: JSON_EXTRACT_PATH(data, $1, $2)

// JSON array length
q.jsonArrayLength(q.i('data'))
// SQL: JSON_ARRAY_LENGTH(data)

// JSON pretty print
q.jsonbPretty(q.i('data'))
// SQL: JSONB_PRETTY(data)

// JSON aggregate
q.jsonAgg(q.i('data'))
// SQL: JSON_AGG(data)

// JSON object aggregate
q.jsonbObjectAgg(q.i('key'), q.i('value'))
// SQL: JSONB_OBJECT_AGG(key, value)
```

### Array Functions

```typescript
// Array append
q.arrayAppend(q.i('arr'), q.l('new_item'))
// SQL: ARRAY_APPEND(arr, $1)

// Array cat (concatenate)
q.arrayCat(q.i('arr1'), q.i('arr2'))
// SQL: arr1 || arr2

// Array length
q.arrayLength(q.i('arr'))
// SQL: ARRAY_LENGTH(arr)

// Array positions
q.arrayPositions(q.i('arr'), q.l('value'))
// SQL: ARRAY_POSITIONS(arr, $1)

// Array remove
q.arrayRemove(q.i('arr'), q.l('value'))
// SQL: ARRAY_REMOVE(arr, $1)

// Array replace
q.arrayReplace(q.i('arr'), q.l('old'), q.l('new'))
// SQL: ARRAY_REPLACE(arr, $1, $2)

// Unnest (array to rows)
q.unnest(q.i('arr'))
// SQL: UNNEST(arr)

// Array aggregate
q.arrayAgg(q.i('value'))
// SQL: ARRAY_AGG(value)
```

### Conditional Functions

```typescript
// COALESCE
q.coalesce(q.i('name'), q.l('N/A'))
// SQL: COALESCE(name, $1)

// NULLIF
q.nullif(q.i('value'), q.l(0))
// SQL: NULLIF(value, $1)

// GREATEST
q.greatest(q.i('a'), q.i('b'), q.i('c'))
// SQL: GREATEST(a, b, c)

// LEAST
q.least(q.i('a'), q.i('b'), q.i('c'))
// SQL: LEAST(a, b, c)

// CASE expression
q.case()
    .when(q.i('status').op('=').l('active'))
    .then(q.l('Active'))
    .else(q.l('Inactive'))
    .as('status_label')

// SQL: CASE WHEN status = $1 THEN $2 ELSE $3 END AS status_label
```

### Sequence Functions

```typescript
// Next value
q.nextval('user_id_seq')
// SQL: NEXTVAL('user_id_seq')

// Set value
q.setval('user_id_seq', 1000)
// SQL: SETVAL('user_id_seq', $1)

// Current value
q.currval('user_id_seq')
// SQL: CURRVAL('user_id_seq')

// Last value (any sequence)
q.lastval()
// SQL: LASTVAL()
```

### Aggregate Functions

```typescript
// Count
q.count(q.c('*'))
q.count(q.c('id'))

// Sum
q.sum(q.c('amount'))

// Average
q.avg(q.c('rating'))

// Min/Max
q.min(q.c('price'))
q.max(q.c('price'))

// Array_agg
q.arrayAgg(q.c('name'))

// JSON_agg
q.jsonAgg(q.i('data'))
```

---

## Advanced Features

### CTEs (WITH Clauses)

```typescript
// Single CTE
const cte = q.select('id').from('admins');

q.with('admins_cte', cte)
    .select('*')
    .from('admins_cte');

// SQL: WITH admins_cte AS (SELECT id FROM admins) SELECT * FROM admins_cte

// Multiple CTEs
const admins = q.select('id').from('admins');
const moderators = q.select('id').from('moderators');

q.with('admins_cte', admins)
    .with('moderators_cte', moderators)
    .select('*')
    .from('admins_cte')
    .union()
    .select('*')
    .from('moderators_cte');
```

### Subqueries

```typescript
// Subquery in SELECT
const subquery = q.select(q.count(q.c('*'))).from('orders').where(q.i('orders.user_id').op('=').i('users.id'));

q.select('users.*', q.sub(subquery).as('order_count')).from('users');

// Subquery in WHERE
const activeUsers = q.select('id').from('users').where(q.eq('active', true));

q.select('*').from('orders').where(q.i('user_id').op('IN').sub(activeUsers));

// EXISTS subquery
q.select('*')
    .from('users')
    .where(q.exists(q.select('1').from('orders').where(q.i('orders.user_id').op('=').i('users.id'))));
```

### UNION, INTERSECT, EXCEPT

```typescript
// UNION
const query1 = q.select('name').from('users');
const query2 = q.select('name').from('admins');

q.union(query1, query2);
// SQL: (SELECT name FROM users) UNION (SELECT name FROM admins)

// UNION ALL
q.unionAll(query1, query2);

// INTERSECT
q.intersect(query1, query2);

// INTERSECT ALL
q.intersectAll(query1, query2);

// EXCEPT
q.except(query1, query2);

// EXCEPT ALL
q.exceptAll(query1, query2);
```

### Window Functions

```typescript
// ROW_NUMBER
q.rowNumber().over().partitionBy('department').orderBy('salary')

// RANK
q.rank().over().partitionBy('department').orderBy(q.desc('salary'))

// DENSE_RANK
q.denseRank().over().partitionBy('department').orderBy(q.desc('salary'))

// LAG/LEAD
q.lag(q.i('value'), 1, 0).over().partitionBy('user_id').orderBy('created_at')

// FIRST_VALUE/LAST_VALUE
q.firstValue(q.i('price')).over().partitionBy('product_id').orderBy('created_at')

// NTILE
q.ntile(4).over().orderBy('sales')
```

### Transactions

```typescript
// BEGIN transaction
q.beginTransaction();
// SQL: BEGIN;

// COMMIT transaction
q.commitTransaction();
// SQL: COMMIT;

// ROLLBACK transaction
q.rollbackTransaction();
// SQL: ROLLBACK;

// SAVEPOINT
q.savepointTransaction('my_savepoint');
// SQL: SAVEPOINT my_savepoint;
```

### Upsert (INSERT ... ON CONFLICT)

```typescript
// ON CONFLICT DO NOTHING
q.insert('users', { email: 'test@example.com', name: 'Test' })
    .onConflictDoNothing({ target: 'email' });

// ON CONFLICT DO UPDATE
q.insert('users', { email: 'test@example.com', name: 'Test' })
    .onConflictDoUpdate({
        target: 'email',
        set: { name: 'Updated', updated_at: q.now() }
    });

// With conflict target array
q.insert('users', { email: 'test@example.com', name: 'Test' })
    .onConflictDoUpdate({
        target: ['email', 'tenant_id'],
        set: { name: 'Updated' }
    });

// With WHERE conditions
q.insert('users', { email: 'test@example.com' })
    .onConflictDoUpdate({
        target: 'email',
        targetWhere: q.i('users.active').op('=').l(true),
        set: { name: 'Updated' },
        setWhere: q.i('users.version').op('<').l(5)
    });
```

### RETURNING Clause

```typescript
// INSERT with RETURNING
q.insert('users', { name: 'John', email: 'john@example.com' })
    .returning('id');

// UPDATE with RETURNING
q.update('users')
    .set({ status: 'active' })
    .where(q.eq('id', 1))
    .returning('*');

// DELETE with RETURNING
q.delete('users')
    .where(q.eq('id', 1))
    .returning('id', 'name');
```

---

## Raw SQL

### Template Literals (q.r``)

```typescript
// Raw SQL expression
q.select(q.r`NOW()`, q.r`CURRENT_USER`).from('users');
// SQL: SELECT NOW(), CURRENT_USER FROM users

// Raw with column reference
q.select(q.r`COUNT(*)`).from('users');
// SQL: SELECT COUNT(*) FROM users

// Raw in conditions
q.where(q.i('created_at').op('>').r`NOW() - INTERVAL '1 day'`);
// SQL: WHERE created_at > NOW() - INTERVAL '1 day'
```

### Mixing Raw with Builder

```typescript
// Raw function with builder values
q.select(
    'id',
    'name',
    q.r`UPPER(name)` as 'name_upper'
).from('users');

// Complex raw expression
q.select(q.r`
    CASE
        WHEN age < 18 THEN 'minor'
        WHEN age < 65 THEN 'adult'
        ELSE 'senior'
    END
`.as('age_group')).from('users');
```

---

## Common Patterns

### Pagination with Filters

```typescript
async function getUsers(filters: {
    status?: string;
    minAge?: number;
    search?: string;
}, page = 1, pageSize = 20) {
    let query = q.select('*').from('users');

    if (filters.status) {
        query = query.where(q.eq('status', filters.status));
    }

    if (filters.minAge) {
        query = query.where(q.gte('age', filters.minAge));
    }

    if (filters.search) {
        query = query.where(q.i('name').op('ILIKE').l(`%${filters.search}%`));
    }

    return query
        .orderBy('created_at')
        .limit(pageSize)
        .offset((page - 1) * pageSize);
}
```

### Soft Delete Pattern

```typescript
// Query only non-deleted records
function findActive(tableName: string) {
    return q.select('*')
        .from(tableName)
        .where(q.i('deleted_at').op('IS').l(null));
}

// Soft delete
function softDelete(tableName: string, id: number) {
    return q.update(tableName)
        .set({ deleted_at: q.now() })
        .where(q.eq('id', id));
}
```

### Multi-table JOIN

```typescript
q.select(
    'users.id',
    'users.name',
    'profiles.bio',
    'roles.name as role_name',
    q.count(q.i('orders.id')).as('order_count')
)
.from('users')
.innerJoin('profiles', q.i('profiles.user_id').op('=').i('users.id'))
.innerJoin('roles', q.i('roles.id').op('=').i('users.role_id'))
.leftJoin('orders', q.i('orders.user_id').op('=').i('users.id'))
.groupBy('users.id', 'users.name', 'profiles.bio', 'roles.name');
```

### Batch Insert

```typescript
function batchInsert(tableName: string, records: Record<string, any>[], batchSize = 1000) {
    const batches = [];
    for (let i = 0; i < records.length; i += batchSize) {
        batches.push(records.slice(i, i + batchSize));
    }

    return batches.map(batch =>
        q.insert(tableName, batch)
    );
}

// Usage
const users = [
    { name: 'User1', email: 'user1@example.com' },
    { name: 'User2', email: 'user2@example.com' },
    // ... 2000 more records
];

const queries = batchInsert('users', users, 1000);
// Returns 3 query builders
```

### JSON Queries

```typescript
// Query JSONB column
q.select('*')
    .from('products')
    .where(q.jsonbPathExists(q.i('metadata'), q.l('$.attributes.color')));

// Update JSONB value
q.update('products')
    .set({
        metadata: q.jsonbSet(q.i('metadata'), q.l('{price}'), q.l('29.99'))
    })
    .where(q.eq('id', 1));

// Build JSON response
q.select(
    'id',
    'name',
    q.jsonbBuildObject(
        q.l('email'), q.i('email'),
        q.l('phone'), q.i('phone'),
        q.l('address'), q.i('address')
    ).as('contact_info')
).from('users');
```

### Full-text Search

```typescript
// Simple search using to_tsquery
q.select('*')
    .from('articles')
    .where(
        q.i('search_vector').op('@@').q.toTsquery('english', q.l('search & terms'))
    );

// Using ts_rank for ordering
q.select(
    'title',
    'content',
    q.tsRank(q.i('search_vector'), q.toTsquery('english', q.l('search'))).as('rank')
)
.from('articles')
.where(q.i('search_vector').op('@@').q.toTsquery('english', q.l('search')))
.orderBy(q.desc('rank'));

// Using plainto_tsquery for simpler search
q.select('*')
    .from('articles')
    .where(
        q.i('search_vector').op('@@').q.plainToTsquery('english', q.l('search terms here'))
    );
```

---

## API Reference

### Query Instance Methods

| Method | Description | Example |
|--------|-------------|---------|
| `select(...cols)` | SELECT columns | `q.select('id', 'name')` |
| `selectDistinct(...cols)` | SELECT DISTINCT | `q.selectDistinct('status')` |
| `selectDistinctOn(on, ...cols)` | DISTINCT ON | `q.selectDistinctOn(['cat'], 'id')` |
| `insert(table, values)` | INSERT record(s) | `q.insert('users', {name: 'A'})` |
| `insertInto(table, cols)` | INSERT INTO with columns | `q.insertInto('users', ['name'])` |
| `update(table)` | UPDATE table | `q.update('users')` |
| `delete(table)` | DELETE from table | `q.delete('users')` |
| `from(...tables)` | FROM clause | `q.from('users')` |
| `where(condition)` | WHERE clause | `q.where(q.eq('id', 1))` |
| `and(...conditions)` | AND conditions | `q.and(q.eq('a', 1), q.eq('b', 2))` |
| `or(...conditions)` | OR conditions | `q.or(q.eq('a', 1), q.eq('b', 2))` |
| `join(table, on)` | JOIN table | `q.join('profiles', onCondition)` |
| `leftJoin(table, on)` | LEFT JOIN | `q.leftJoin('profiles', onCondition)` |
| `innerJoin(table, on)` | INNER JOIN | `q.innerJoin('profiles', onCondition)` |
| `rightJoin(table, on)` | RIGHT JOIN | `q.rightJoin('profiles', onCondition)` |
| `fullJoin(table, on)` | FULL JOIN | `q.fullJoin('profiles', onCondition)` |
| `crossJoin(table)` | CROSS JOIN | `q.crossJoin('profiles')` |
| `groupBy(...cols)` | GROUP BY columns | `q.groupBy('category')` |
| `having(condition)` | HAVING clause | `q.having(q.count('id').op('>').l(5))` |
| `orderBy(...cols)` | ORDER BY columns | `q.orderBy('created_at')` |
| `asc(...cols)` | ORDER BY ASC | `q.asc('name')` |
| `desc(...cols)` | ORDER BY DESC | `q.desc('created_at')` |
| `limit(value)` | LIMIT rows | `q.limit(10)` |
| `offset(value)` | OFFSET rows | `q.offset(20)` |
| `fetch(count, mode, withTies)` | FETCH clause | `q.fetch(10)` |
| `union(...queries)` | UNION queries | `q.union(query1, query2)` |
| `unionAll(...queries)` | UNION ALL | `q.unionAll(query1, query2)` |
| `intersect(...queries)` | INTERSECT | `q.intersect(query1, query2)` |
| `except(...queries)` | EXCEPT | `q.except(query1, query2)` |
| `with(name, subquery)` | CTE (WITH clause) | `q.with('cte', subquery)` |
| `returning(col)` | RETURNING clause | `q.returning('id')` |
| `as(alias)` | Column alias | `q.count('id').as('total')` |
| `sub(query)` | Subquery wrapper | `q.sub(subquery).as('sub')` |
| `r`` | Raw SQL template | `q.r`NOW()`` |

### Comparison Methods

| Method | Description | SQL |
|--------|-------------|-----|
| `eq(col, val)` | Equal | `col = $1` |
| `ne(col, val)` | Not equal | `col != $1` |
| `gt(col, val)` | Greater than | `col > $1` |
| `lt(col, val)` | Less than | `col < $1` |
| `gte(col, val)` | Greater or equal | `col >= $1` |
| `lte(col, val)` | Less or equal | `col <= $1` |

### Identifier/Value Methods

| Method | Description | Example |
|--------|-------------|---------|
| `i(name)` | Identifier | `q.i('table.column')` |
| `c(name)` | Column reference | `q.c('column_name')` |
| `t(name)` | Table reference | `q.t('table_name')` |
| `l(value)` | Literal value | `q.l('string')` |
| `r`` | Raw SQL | `q.r`NOW()`` |

### Output Methods

| Method | Description | Returns |
|--------|-------------|---------|
| `getSql()` | Get SQL string | `string` |
| `getParameters()` | Get parameters array | `any[]` |
| `getSqlAndParameters()` | Get both | `{sql, parameters}` |
| `getSqlWithParameters()` | Get SQL with inline params | `string` |
| `execute(meta?)` | Execute the query | Promise with result |

---

## License

MIT

---

## Quick Reference Card

```
Import:     import { sqlBuilder } from 'gntrees-sql-builder';

Create:     const q = sqlBuilder({ formatParamHandler: 'pg', execHandler });

SELECT:     q.select('*').from('users').where(q.eq('active', true))
INSERT:     q.insert('users', { name: 'John' })
UPDATE:     q.update('users').set({ name: 'Jane' }).where(q.eq('id', 1))
DELETE:     q.delete('users').where(q.eq('active', false))

JOIN:       q.select('*').from('users').leftJoin('profiles', on)
GROUP BY:   q.select('cat', q.count('*')).from('items').groupBy('cat')
ORDER BY:   q.select('*').from('users').orderBy('created_at')
LIMIT:      q.select('*').from('users').limit(10).offset(20)

Identifiers:  q.i('column'), q.c('column'), q.t('table')
Literals:     q.l('value'), q.r`RAW SQL()`
Operators:    q.eq(), q.ne(), q.gt(), q.lt(), q.gte(), q.lte()
Logic:        q.and(), q.or(), q.not()

Functions:
  Math:      q.abs(), q.round(), q.floor(), q.ceil(), q.power(), q.sqrt()
  String:    q.concat(), q.lower(), q.upper(), q.substring(), q.replace()
  Date:      q.now(), q.currentDate(), q.dateTrunc(), q.extract()
  JSON:      q.jsonbBuildObject(), q.jsonbPathQuery(), q.jsonbPretty()
  Array:     q.arrayAppend(), q.arrayAgg(), q.unnest()
  Cond:      q.coalesce(), q.nullif(), q.greatest(), q.least()

Aggregates:  q.count(), q.sum(), q.avg(), q.max(), q.min()
Sequence:    q.nextval(), q.setval(), q.currval(), q.lastval()
```

---

*For detailed contribution guidelines, see CLAUDE.md in the repository.*
