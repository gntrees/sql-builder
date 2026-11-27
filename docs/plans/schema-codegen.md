# Plan: Schema Codegen dari Database ke Lingua Tungga

Status: **locked — slice pertama mulai dieksekusi**
Repo: `gntrees-sql-builder`
Konsumen: SQL builder v2 di `lt-drizzle-v2/`
Compiler: Lingua Tungga v0.3.0

## 1. Tujuan

Membangun satu pipeline codegen schema:

```
Postgres
  -> prisma db pull --force
  -> prisma/schema.prisma
  -> prisma generate
  -> schema/schema.json + schema/unsupported.json
  -> codegen LT
  -> lt-drizzle-v2/src/generated/*.lt
  -> adapter handwritten
  -> SQL builder v2
```

Bukan tujuan:

- mengganti Prisma Client;
- mem-port SQL builder lagi;
- mengimplementasikan `db pull` di dalam LT;
- menghasilkan DDL atau migrasi;
- mendukung relational query Prisma.

## 2. Keputusan yang Dikunci

| # | Keputusan |
|---|---|
| S1 | Introspection memakai Prisma DMMF, bukan `drizzle-kit pull`. |
| S2 | DB live adalah source of truth; `schema.prisma` adalah generated mirror. |
| S3 | `prisma db pull --force` boleh menimpa `schema.prisma`. |
| S4 | Prisma dipin ke `7.10.x`; jangan memakai `latest`. |
| S5 | `schema.json` adalah IR kanonik dan stabil; `version: 1`. |
| S6 | Generated `.lt` berada di dalam tree entry builder karena LT menolak import ke luar direktori entry. |
| S7 | Konsumen awal adalah v2; v3 nanti memakai adapter baru. |
| S8 | `lt/src/schema.lt` (v1) tidak diubah; ditandai deprecated di dokumentasi. |
| S9 | Scope awal: tabel, kolom, PK, nullability, default, enum, FK, schema `public`. |
| S10 | Fitur di luar scope dicatat di `unsupported.json`, bukan diabaikan diam-diam. |
| S11 | Tipe kolom yang tidak bisa dipetakan menggagalkan codegen, kecuali `--allow-unsupported`. |
| S12 | Semua artefak (`schema.prisma`, `schema.json`, `unsupported.json`, `.lt`) di-commit; CI memeriksa drift. |

## 3. Fakta LT yang Mengikat Desain

- `users.id` bisa diwujudkan sebagai package-level binding + field access + receiver sugar.
- Static access seperti `Users.id` ditolak compiler; tabel harus berupa value binding.
- Overloading berdasarkan tipe receiver ditolak; satu tipe = satu package.
- Receiver sugar menemukan fungsi dari package tipe tanpa import eksplisit.
- Generic `Column<T>` membuat emitter Python menghapus type parameter menjadi `Any`.
- Enum rekursif didukung.
- `lt build` menolak import ke luar direktori entry.

Konsekuensi: generated schema terdiri dari beberapa file/package, bukan satu `schema.lt`.

## 4. Artifact

| Path | Isi |
|---|---|
| `prisma/schema.prisma` | Generated mirror dari DB. |
| `schema/schema.json` | IR kanonik, `version: 1`. |
| `schema/unsupported.json` | Daftar fitur yang belum didukung. |
| `lt-drizzle-v2/src/generated/schema_*.lt` | Package generated. |
| `lt-drizzle-v2/src/schema_adapter.lt` | Adapter handwritten `Expr -> Sql`. |

Codegen LT menerima `--out` agar v3 bisa menulis ke tree-nya sendiri.

## 5. Pipeline

1. `prisma db pull --force`
2. `prisma generate` — custom generator menulis `schema.json` dan `unsupported.json`
3. `bun schema/codegen.ts generate --allow-unsupported`
4. `lt fmt` pada file generated
5. `lt build -t ts|py|go`
6. Adapter mengubah `Expr` menjadi `Sql` v2

Custom generator Prisma dijalankan sebagai `bun schema/prisma-generator.mjs`.
Jika handshake Prisma gagal di Bun, fallback ke Node tanpa mengubah logika converter.

## 6. IR: `schema.json`

Shape:

```json
{
  "version": 1,
  "generator": "prisma-lt",
  "dialect": "postgres",
  "prismaVersion": "7.10.1",
  "tables": [
    {
      "model": "User",
      "name": "users",
      "dbName": "users",
      "schema": "public",
      "primaryKey": ["id"],
      "columns": [
        {
          "name": "id",
          "dbName": "id",
          "type": "Int",
          "nativeType": "Int",
          "nullable": false,
          "default": { "kind": "autoincrement" },
          "unique": true
        }
      ]
    }
  ],
  "enums": [],
  "foreignKeys": []
}
```

Aturan:

- Deterministik: tanpa timestamp, urutan tetap.
- `version` hanya naik saat bentuk/semantik IR berubah, bukan saat schema DB berubah.
- `name` adalah identifier accessor; `dbName` adalah nama SQL.
- `primaryKey` berisi nama accessor kolom.
- `foreignKeys` berisi nama accessor tabel/kolom.

## 7. Type Mapping

| Prisma / native | LT |
|---|---|
| `Int`, `BigInt` | `Int` |
| `Float` | `Float` |
| `String` | `Str` |
| `String @db.Uuid` | `Uuid` (nilai string) |
| `Boolean` | `Bool` |
| `Decimal` | `Decimal` (nilai string) |
| `DateTime` | `Temporal` (nilai string ISO) |
| enum | `Enum` + package enum |
| `Json`, `Bytes`, list/array | `Unsupported` |
| tipe lain yang tidak dikenal | `Unsupported` |

`Decimal`, `Uuid`, dan `Temporal` sengaja bukan `Str` agar tipe aksesornya berbeda dan bisa ditingkatkan nanti.

## 8. Bentuk API

Target: `users.id` seperti drizzle.

```lt
users.id.eq(1)
users.email.like("%@example.com")
users.role.eq(Role.Admin)
```

- Setiap tipe punya package sendiri: `schema_int`, `schema_str`, dst.
- Setiap enum punya package sendiri: `schema_enum_<name>`.
- Tabel berada di `schema_tables`.
- Operator mengembalikan `Expr` netral, bukan `Sql` v2.
- Adapter handwritten mengubah `Expr` menjadi `Sql`.

Set operator awal:

- semua tipe: `eq`, `ne`, `is_null`, `is_not_null`, `asc`, `desc`, `as_alias`
- tipe terurut: `gt`, `gte`, `lt`, `lte`, `in_list`, `not_in_list`, `between`, `not_between`
- `Str`: tambah `like`, `not_like`, `ilike`, `not_ilike`
- enum: `eq`, `ne`, `in_list`, `not_in_list`, `is_null`, `is_not_null`

Operator lain dicatat sebagai backlog.

## 9. Naming dan Collision

- Nama tabel binding berasal dari `dbName`, disanitize ke `snake_case`.
- Nama properti kolom berasal dari `Field.name`, disanitize ke `snake_case`.
- Nama SQL memakai `dbName`.
- Reserved word diberi suffix `_`.
- Collision setelah sanitasi menggagalkan codegen; tidak ada auto-suffix.
- Enum dan variant disanitize; collision menggagalkan codegen.
- Nilai DB asli tidak diubah; dipetakan lewat fungsi `*_value()`.

## 10. Nullability dan Relasi

- Nullability hanya metadata `nullable: Bool`; belum type-level.
- FK hanya metadata di `schema.json`; belum ada accessor relasi.
- Join tetap eksplisit.

## 11. Unsupported

`unsupported.json`:

```json
{
  "version": 1,
  "entries": [
    {
      "kind": "column-type",
      "table": "users",
      "column": "metadata",
      "type": "JsonB",
      "reason": "no LT value type"
    }
  ]
}
```

Aturan:

- `reason` wajib.
- Entri baru menggagalkan CI; entri yang hilang boleh, tetapi harus di-commit.
- Default codegen gagal jika ada kolom `Unsupported`.
- `--allow-unsupported` menghasilkan `UnsupportedColumn` tanpa operator.
- Blind spot DMMF (check constraint, view definition, partial index `where`, RLS, native type persis) didokumentasikan, bukan diklaim tidak ada.

## 12. Package Generated

| Package | Isi |
|---|---|
| `schema_expr` | `ColumnRef`, `Scalar`, `Expr`, combinator. |
| `schema_meta` | `ColumnMeta`, `TableMeta` netral. |
| `schema_int`, `schema_float`, `schema_str`, `schema_bool` | Tipe kolom + operator. |
| `schema_decimal`, `schema_uuid`, `schema_temporal` | Tipe kolom berbasis string + operator. |
| `schema_enum_<name>` | Enum, mapping value, tipe kolom, operator. |
| `schema_unsupported` | `UnsupportedColumn` tanpa operator. |
| `schema_tables` | Struct tabel, binding `users`, `users_meta`, dan `all_table_meta`. |

## 13. Adapter

Adapter adalah boundary yang dijaga:

- handwritten di `lt-drizzle-v2/src/schema_adapter.lt`;
- mengubah `Expr` netral menjadi `Sql` v2;
- memetakan binding generated ke `Table`/`Column` v2 bila diperlukan;
- v3 menulis adapter sendiri;
- logika v2 tidak boleh masuk ke package generated.

## 14. Gate CI

Job `schema` sengaja dibuat ringan:

1. nyalakan fixture DB;
2. `prisma db pull --force`;
3. `prisma generate`;
4. `bun schema/codegen.ts generate --allow-unsupported`;
5. `bun test schema/test` + `lt check`;
6. `lt fmt --check` dan `git diff --exit-code`;
7. gagal jika ada entri `unsupported.json` baru.

Build TS/Py/Go, `mypy`, `go vet`, DB roundtrip, dan playground **tidak** dijalankan
di CI schema karena berat dan bisa dijalankan lokal:

```sh
bun run verify:local        # verify + verify-db + playground
bun run lt-drizzle-v2:verify
bun run lt-drizzle-v2:db
bun run playground
```

Job `drizzle-v2` tetap menjalankan parity gate; job `database` hanya berjalan lewat
`workflow_dispatch`. Playground hanya berjalan di `main` atau manual.

Fixture DB terpisah di `schema/fixtures/`, mencakup:

- tabel biasa;
- FK;
- enum;
- composite PK;
- nullable/default;
- `jsonb`, `uuid`, `timestamp`, `numeric`;
- schema non-public.

## 15. Definisi Selesai Slice Pertama

1. Fixture DB bisa di-pull dan menghasilkan `schema.json` + `unsupported.json`.
2. Codegen menghasilkan package LT yang lolos `lt check`.
3. `users.id.eq(...)` bekerja di source `.lt` dan menghasilkan `Expr`.
4. Adapter v2 mengubah `Expr` menjadi `Sql` dan query bisa di-build.
5. Build TS/Py/Go hijau.
6. `lt fmt` + `--check` deterministik.
7. CI `schema` gagal pada drift dan entri unsupported baru.
8. Blind spot DMMF terdokumentasi.

## 16. Backlog

- Nullability type-level.
- Accessor relasi (`users.posts()`).
- Index, unique constraint komposit, check constraint, view.
- Multi-schema.
- `Date`/`Decimal` typed value di builder.
- Operator lanjutan: array, JSON, `is distinct from`, window.
- Host method chaining (di luar codegen).

## 17. Progres Slice Pertama

| Bagian | Status |
|---|---|
| Dokumen desain | selesai |
| Tipe IR + naming | selesai (`schema/types.ts`, `schema/naming.ts`) |
| DMMF -> IR | selesai (`schema/dmmf.ts`) |
| IR -> LT | selesai (`schema/emit-lt.ts`) |
| CLI generate/check | selesai (`schema/codegen.ts`) |
| Prisma generator wrapper | selesai, dijalankan dengan Prisma 7.10.1 |
| Fixture SQL + compose | selesai (`schema/fixtures/`) |
| Fixture DMMF + unit test | selesai (`schema/test/`) |
| `lt check` generated packages | hijau di test |
| Adapter `Expr -> Sql` | selesai (`lt-drizzle-v2/src/schema_adapter.lt`), lolos `lt check` dan runtime assertion |
| TableMeta + adapter `TableMeta -> v2 Table` | selesai; `from_table(create(), to_table(users_meta))` teruji |
| Install Prisma 7.10.x | selesai |
| `db pull` + generate terhadap fixture DB | selesai; hasil deterministik |
| Generated `.lt` | selesai di `lt-drizzle-v2/src/generated/` |
| CI job `schema` | selesai (`.github/workflows/schema.yml`) |
| Schema playground | selesai (`schema/playground/`, 8 kasus, 8 fitur, IR snapshot + `lt check`) |

## 18. Schema Playground

`schema/playground/` adalah galeri statis yang tidak menyentuh database:

- 8 kasus: table, column types, composite key, foreign key, unsupported jsonb/array,
  non-public schema, naming, composite unique/index.
- Setiap kasus: DMMF input, `schema.json`, `unsupported.json`, generated LT, dan
  status `lt check`.
- Snapshot IR disimpan di `cases/**/<id>.expected.json`.
- Output: `schema/playground/out/index.html` (gitignored).
- Perintah: `bun run schema:playground`; regenerate snapshot:
  `bun schema/playground/build.ts --update`.

Catatan: `bun test schema/test` menjalankan 12 test, termasuk `lt check`, runtime SQL
assertion lewat v2 `sqlToQuery`, dan konversi `TableMeta -> v2 Table`. Pipeline fixture
menghasilkan 3 tabel, 1 enum, 1 FK, dan 4 entri unsupported (termasuk schema `auth`,
`jsonb`, composite unique, dan index). Build v2 menghasilkan 23 module dan lolos `tsc`
serta `mypy --strict`; differential tetap 64/64. `to_table(users_meta)` sekarang bisa
dipakai di `from_table`, dan `to_sql(users.id.eq(1))` menghasilkan
`"users"."id" = $1`.
`bunx tsc` penuh masih gagal pada artefak `generated/` lama yang tidak terkait; file
`schema/*.ts` dan `prisma.config.ts` lolos typecheck terpisah.
