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
| S5 | `schema.json` adalah IR kanonik dan stabil; `version: 2`. |
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
| `schema/schema.json` | IR kanonik, `version: 2`. |
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
  "version": 2,
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
      "indexes": [
        { "name": "users_email_org_id_key", "columns": ["email", "orgId"], "unique": true }
      ],
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

Relasi:

- `schema_relations` memuat `RelationMeta` untuk FK satu kolom dan
  `CompositeRelationMeta` untuk FK komposit, masing-masing dengan binding maju/balik.
- Adapter menyediakan `on(rel) -> Sql`, `on_alias(rel, …)`, dan
  `on_composite(rel) -> Sql`.

DML:

- Setiap paket tipe meng-emit `assign(c, v) -> ColumnValue` dan
  `assign_null(c) -> ColumnValue`.
- Adapter menyediakan `to_assignment(cv) -> Assignment` untuk INSERT/UPDATE.
- Kolom yang diomisi tidak masuk list; default/NULL diserahkan ke database.

## 9. Naming dan Collision

- Nama tabel binding berasal dari `dbName`, disanitize ke `snake_case`.
- Nama properti kolom berasal dari `Field.name`, disanitize ke `snake_case`.
- Nama SQL memakai `dbName`.
- Reserved word diberi suffix `_`.
- Collision setelah sanitasi menggagalkan codegen; tidak ada auto-suffix.
- Enum dan variant disanitize; collision menggagalkan codegen.
- Nilai DB asli tidak diubah; dipetakan lewat fungsi `*_value()`.
- Binding relasi memakai nama tabel accessor: `<from>_<to>` dan kebalikannya
  `<to>_<from>`; bila ada lebih dari satu FK antar pasangan yang sama, nama kolom
  pemilik ditambahkan (`messages_users_sender_id`). Collision menggagalkan codegen.

## 10. Nullability dan Relasi

- Nullability: kolom nullable memakai tipe `Nullable<...>Column` dari paket
  `schema_nullable_*`; predikat tetap menerima nilai mentah, sedangkan assignment
  menerima `Option<T>` (`Some(v)` / `None`).
- FK di-emit sebagai `RelationMeta`/`CompositeRelationMeta` di `schema_relations`
  (maju dan balik); join tetap eksplisit lewat `on`/`on_alias`/`on_composite` di adapter.
- `on(rel)` belum mengenal alias tabel; gunakan `on_alias(rel, from_alias, to_alias)`.
  Predikat pada tabel alias tetap memakai referensi kolom eksplisit.

## 11. Unsupported

`unsupported.json`:

```json
{
  "version": 2,
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
| `schema_nullable_<type>` | `Nullable<...>Column` + operator + `assign(Option<T>)`. |
| `schema_enum_<name>` | Enum, mapping value, tipe kolom, operator. |
| `schema_enum_<name>_nullable` | Varian nullable untuk kolom enum nullable. |
| `schema_unsupported` | `UnsupportedColumn` tanpa operator. |
| `schema_relations` | `RelationMeta`, binding relasi maju/balik, dan `all_relations`. |
| `schema_tables` | Struct tabel, binding `users`, `users_meta`, dan `all_table_meta`. |

## 13. Adapter

Adapter adalah boundary yang dijaga:

- handwritten di `lt-drizzle-v2/src/schema_adapter.lt`;
- mengubah `Expr` netral menjadi `Sql` v2;
- mengubah `ColumnValue` menjadi `Assignment` v2;
- memetakan binding generated ke `Table`/`Column` v2 bila diperlukan;
- v3 menulis adapter sendiri;
- logika v2 tidak boleh masuk ke package generated.

## 14. Gate CI

Job `schema` sengaja dibuat ringan:

1. nyalakan database aplikasi (`docker-compose.test.yml`) dan jalankan migrasi;2. `prisma db pull --force`;
3. `prisma generate`;
4. `bun schema/codegen.ts generate`;
5. `bun test schema/test` + `lt check`;
6. `lt fmt --check` dan `git diff --exit-code`;
7. gagal jika ada entri `unsupported.json` baru.

Job juga terpicu ketika `db/migrations/**` berubah, karena migrasi aplikasi adalah
source of truth schema yang di-commit. Integrasi schema generated ke database aplikasi
dijalankan lokal lewat `verify-db.sh` (`lt-drizzle-v2/parity/schema-integration.test.ts`).

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

Schema yang di-commit memakai database aplikasi dari `db/migrations/postgres`.
`schema_migrations` dikecualikan lewat `ignoreTables`. Fixture terpisah di
`schema/fixtures/` hanya dipakai oleh playground/test untuk mencakup:

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

- Accessor relasi many-to-many lewat tabel perantara.
- Check constraint dan view (blind spot DMMF).
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
| `db pull` + generate terhadap database aplikasi | selesai; 10 tabel, 1 enum, 3 FK, 0 unsupported, deterministik |
| Generated `.lt` | selesai di `lt-drizzle-v2/src/generated/` |
| CI job `schema` | selesai (`.github/workflows/schema.yml`); ikut terpicu saat `db/migrations` berubah |
| Schema playground | selesai (`schema/playground/`, 10 kasus, 10 fitur, IR snapshot + `lt check`) |
| Integrasi schema → v2 DB | selesai (`lt-drizzle-v2/parity/schema-integration.test.ts`, dijalankan `verify-db.sh`) |
| Relation metadata + join helper | selesai (`schema_relations.lt`, `schema_adapter.on`) |
| Alias relation | selesai (`schema_adapter.on_alias`) |
| Composite foreign keys | selesai (`CompositeRelationMeta`, `schema_adapter.on_composite`) |
| Index & composite unique metadata | selesai (`IndexMeta` di `TableMeta`, IR version 2) |
| Nullability type-level | selesai (`Nullable<...>Column`, `assign(Option<T>)`) |
| DML assignment | selesai (`assign`/`assign_null`, `schema_adapter.to_assignment`) |

## 18. Schema Playground

`schema/playground/` adalah galeri statis yang tidak menyentuh database:

- 10 kasus: table, column types, composite key, foreign key, ambiguous foreign key,
  composite foreign key, unsupported jsonb/array, non-public schema, naming,
  composite unique/index.
- Setiap kasus: DMMF input, `schema.json`, `unsupported.json`, generated LT, dan
  status `lt check`.
- Snapshot IR disimpan di `cases/**/<id>.expected.json`.
- Output: `schema/playground/out/index.html` (gitignored).
- Perintah: `bun run schema:playground`; regenerate snapshot:
  `bun schema/playground/build.ts --update`.

Schema yang di-commit sekarang berasal dari migrasi aplikasi di
`db/migrations/postgres`: 10 tabel, 1 enum (`user_role`), 3 foreign key, 0 unsupported.
`schema_migrations` dikecualikan lewat konfigurasi generator `ignoreTables`. Fixture
terpisah tetap dipakai untuk menguji tipe unsupported dan schema non-public.

Catatan: `bun test schema/test` menjalankan 19 test, termasuk `lt check`, runtime SQL
assertion lewat v2 `sqlToQuery`, dan konversi `TableMeta -> v2 Table`. Pipeline fixture
menghasilkan 3 tabel, 1 enum, 1 FK, serta 2 entri unsupported (schema `auth` dan
`jsonb`); composite unique dan index kini menjadi `IndexMeta`. IR memakai `version: 2`.
Kolom nullable menghasilkan paket `schema_nullable_*`. Build v2 menghasilkan 23 module
dan lolos `tsc` serta `mypy --strict`; differential tetap 64/64.
`to_table(users_meta)` sekarang bisa dipakai di `from_table`, dan
`to_sql(users.id.eq(1))` menghasilkan `"users"."id" = $1`.

Integrasi ke database aplikasi diuji oleh
`lt-drizzle-v2/parity/schema-integration.test.ts` (bagian dari `verify-db.sh`): tabel,
predikat bertipe, enum, nullability, join lewat `on(posts_users)`, serta
INSERT/UPDATE/DELETE lewat `assign`/`assign_null` dijalankan terhadap tabel
`users`/`posts` hasil migrasi aplikasi, di Postgres dan MySQL.
`bunx tsc` penuh masih gagal pada artefak `generated/` lama yang tidak terkait; file
`schema/*.ts` dan `prisma.config.ts` lolos typecheck terpisah.
