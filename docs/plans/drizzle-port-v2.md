# Plan: Port Drizzle ke Lingua Tungga v2

Status: **draft — belum dieksekusi**
Branch: `experiment/drizzle-port-v2` (base: tip `experiment/drizzle-port`)
Repo: `gntrees-sql-builder`
Compiler: **Lingua Tungga v0.3.0**, commit **`d11a4c9`** (tag `v0.3.0`)
Referensi perilaku: `drizzle-orm@0.44.4`

Plan v1 ([`drizzle-port.md`](./drizzle-port.md)) tetap berlaku sebagai sejarah dan sebagai
kontrak parity. Dokumen ini menggantikannya untuk port baru karena bahasa berubah total
(`class` dihapus) dan karena API kini bisa dibuat setara dengan drizzle, bukan hanya
semantiknya.

---

## 1. Tujuan

Menulis ulang port drizzle di atas **LT v2** sehingga:

1. Perilaku SQL + params tetap **byte-identik** dengan `drizzle-orm@0.44.4`.
2. Bentuk API mendekati drizzle 1:1 (`pg_table`, `eq`, tag `sql`, `select.create()`,
   `insert.create(table)`), bukan lagi "semantik sama, API beda".
3. Port v2 lulus **kontrak yang sama** dengan v1: 64 fixture differential, tiga target,
   roundtrip Postgres + MySQL.

Bukan tujuan: driver/IO, drizzle-kit, relational query (M7), type-level inference.

---

## 2. Fakta v0.3.0 yang Mengikat Desain

Diverifikasi langsung terhadap compiler `d11a4c9`:

| # | Fakta | Konsekuensi |
|---|---|---|
| F1 | `class` dihapus; unit kode = `package`, tipe = `struct`, metode = fungsi ber-receiver | seluruh 1.659 baris `.lt` v1 ditulis ulang |
| F2 | `package` **wajib** memakai kurung kurawal: `package sql { … }` (grammar menang; contoh di spec yang tanpa kurung sudah usang) | semua file mengikuti bentuk ini |
| F3 | Fungsi package-level sekarang ada; larangan free function dicabut | `eq`, `and`, `pg_table` bisa jadi fungsi bebas seperti drizzle |
| F4 | Receiver sugar `nilai.f(args)` sah lintas package, asal `f` dideklarasikan satu package dengan tipe `nilai` | operator harus di package `sql`; method builder harus di package struct-nya |
| F5 | **Overloading berdasarkan tipe receiver TIDAK diterima**: dua `fn where(...)` di satu package = error, meski spec v2 menyebutnya sah | semua builder tidak boleh satu package; `query` dipecah |
| F6 | Nama dalam satu package unik **case-insensitive** | `Table` struct dan `table()` fungsi tidak boleh berdampingan |
| F7 | Import gaya Go: `import pkg { A, b } "./file.lt"`; path di belakang; blok `import ( … )` | semua file `.lt` memakai sintaks ini |
| F8 | Tagged template: tag = path fungsi package-level, `(List<Str>, List<T>) -> R`, `T` konkret | `import sql { tag as sql }` lalu `sql\`…${SqlArg.Integer(id)}…\`` |
| F9 | Enum di-emit satu nama: TS `Shape.Circle(...)` / `Shape.Point`, bukan `Shape_Circle` | harness harus memakai `Value.Text(...)`, `SqlArg.Integer(...)` |
| F10 | Struct di-emit sebagai class TS (konstruktor named-arg); fungsi snake_case → camelCase. **Receiver sugar hanya ada di source `.lt`**; API host adalah fungsi bebas (`sqlToQuery(d, q)`, `append(a, b)`), bukan method | harness memanggil fungsi bebas, bukan `d.sqlToQuery(...)` |
| F11 | `lt build -t ts` menaruh modul di `out/ts/src/<file>.ts` | build script menyalin dari `src/` |
| F12 | Tetap tanpa default argumen dan tanpa varargs | preset `with_primary` dsb. dan parameter `List<…>` tetap dipakai |
| F13 | Package test ditulis `test "judul" { … }` di dalam package | test LT diletakkan di package `*_test` terpisah |

---

## 3. Keputusan yang Dikunci (v2)

| # | Keputusan |
|---|---|
| V1 | Compiler dipin ke **v0.3.0 / `d11a4c9`**; binary dibangun ulang dari commit itu, bukan dari binary lama. |
| V2 | Branch baru **`experiment/drizzle-port-v2`** dari tip `experiment/drizzle-port`; kode di **`lt-drizzle-v2/`**; `lt-drizzle/` (v1) read-only sampai v2 M6 hijau, lalu dihapus. |
| V3 | **API + semantics parity**: nama fungsi mengikuti drizzle dalam snake_case (`pg_table`, `eq`, `and`, `sql` tag, `count`, `on_conflict_do_nothing`). |
| V4 | Free function dipakai; tidak ada lagi class/static method. |
| V5 | Package mengikuti namespace drizzle: `value`, `sql`, `schema`, `dialect`, `select`, `insert`, `update`, `delete`, `pg_core`, `mysql_core`, `sqlite_core`. |
| V6 | `query` **tidak** ada sebagai satu package (F5); dipecah empat package builder. |
| V7 | Tag `sql` diekspor sebagai fungsi `tag` dan diimpor dengan alias: `import sql { tag as sql, raw, identifier, … }`. |
| V8 | Konstruktor kolom per dialect: `pg_core.integer`, `mysql_core.int`, `sqlite_core.integer`, dst. |
| V9 | Entry point: `select.create()`, `insert.create(table)`, `update.create(table)`, `delete.create(table)` lewat qualifier package. |
| V10 | Semua builder mengembalikan `Result<Rendered, BuildError>`. |
| V11 | Milestone tetap **M0–M6**; 64 fixture lama menjadi acceptance target dengan nama kasus identik. |
| V12 | Gate v2: differential v2-vs-drizzle; skrip sekali-jalan `v1-vs-v2` di luar gate. |
| V13 | Test LT di package `*_test` terpisah di `lt-drizzle-v2/tests/`. |
| V14 | M7 (relational query) tetap di luar scope. |

---

## 4. Struktur Direktori

```
lt-drizzle-v2/
  src/
    value.lt        # package value
    sql.lt          # package sql
    schema.lt       # package schema
    dialect.lt      # package dialect
    pg_core.lt      # package pg_core
    mysql_core.lt   # package mysql_core
    sqlite_core.lt  # package sqlite_core
    select.lt       # package select
    insert.lt       # package insert
    update.lt       # package update
    delete.lt       # package delete
    index.lt        # package drizzle_index (mengimpor semua agar ikut ter-emit)
  tests/
    value_test.lt
    sql_test.lt
    select_test.lt
  parity/
    differential.test.ts   # 64 kasus v2 vs drizzle
    v1-vs-v2.test.ts       # sekali-jalan, bukan gate
    db.test.ts             # roundtrip
    ddl/postgres.sql
    ddl/mysql.sql
  build.sh
  verify.sh
  verify-db.sh
docs/plans/drizzle-port-v2.md
.github/workflows/drizzle-v2.yml
```

Catatan: `index.lt` tetap perlu package (tidak ada deklarasi telanjang), isinya hanya `import`.

---

## 5. Peta Package dan Isi

### 5.1 `value`

```lt
package value {
  export enum Value {
    Null
    Boolean(Bool)
    Integer(Int)
    Float(Float)
    Text(Str)
    Array(List<Value>)
    Record(Map<Str, Value>)
  }

  export enum SqlArg {
    Null
    Boolean(Bool)
    Integer(Int)
    Float(Float)
    Text(Str)
  }

  export enum BuildError {
    MissingDialect
    MissingTable
    Unsupported(Str, Str)
    UnknownColumn(Str, Str)
  }

  export struct Rendered {
    sql: Str
    params: List<Value>
  }
}
```

### 5.2 `sql`

```lt
package sql {
  export enum SqlChunk {
    Raw(Str)
    Param(Value)
    Ident(Str)
  }

  export struct Sql {
    chunks: List<SqlChunk>
  }

  // entry
  export fn raw(text: Str) -> Sql
  export fn empty() -> Sql
  export fn param(value: Value) -> Sql
  export fn identifier(name: Str) -> Sql
  export fn int(value: Int) -> Sql
  export fn float(value: Float) -> Sql
  export fn str(value: Str) -> Sql
  export fn bool(value: Bool) -> Sql
  export fn null_value() -> Sql
  export fn tag(parts: List<Str>, values: List<SqlArg>) -> Sql

  // receiver
  export fn append(s: Sql, other: Sql) -> Sql
  export fn is_empty(s: Sql) -> Bool
  export fn eq(s: Sql, other: Sql) -> Sql
  export fn ne(s: Sql, other: Sql) -> Sql
  export fn gt/gte/lt/lte(...)
  export fn like/not_like/ilike/not_ilike(...)
  export fn in_list(s: Sql, items: List<Sql>) -> Sql
  export fn not_in_list(...)
  export fn between(s: Sql, low: Sql, high: Sql) -> Sql
  export fn not_between(...)
  export fn is_null(s: Sql) -> Sql
  export fn is_not_null(s: Sql) -> Sql
  export fn asc(s: Sql) -> Sql
  export fn desc(s: Sql) -> Sql
  export fn as_alias(s: Sql, alias: Str) -> Sql

  // statis
  export fn join(items: List<Sql>, separator: Str) -> Sql
  export fn and(items: List<Sql>) -> Sql
  export fn or(items: List<Sql>) -> Sql
  export fn not(expr: Sql) -> Sql
  export fn count(expr: Sql) -> Sql
  export fn count_all() -> Sql
  export fn sum/avg/min/max(expr: Sql) -> Sql
}
```

Pemakaian:

```lt
import sql { tag as sql, raw, identifier, int, eq }
let q = sql`lower(${SqlArg.Str(name)}) = lower(${SqlArg.Str("ana")})`
```

### 5.3 `schema`

```lt
package schema {
  export struct Column {
    name: Str
    sql_type: Str
    not_null: Bool
    primary: Bool
    unique: Bool
    has_default: Bool
    default_sql: Str
  }

  export struct Table {
    name: Str
    schema: Option<Str>
    alias: Option<Str>
    columns: List<Column>
  }

  export struct Assignment {
    column: Str
    value: Sql
  }

  // Column (receiver)
  export fn with_not_null(c: Column) -> Column
  export fn with_primary(c: Column) -> Column
  export fn with_unique(c: Column) -> Column
  export fn with_default(c: Column, value: Str) -> Column

  // Table
  export fn plain(name: Str, columns: List<Column>) -> Table
  export fn with_schema(name: Str, schema: Str, columns: List<Column>) -> Table
  export fn with_alias(name: Str, alias: Str, columns: List<Column>) -> Table
  export fn with_schema_alias(name: Str, schema: Str, alias: Str, columns: List<Column>) -> Table
  export fn label(t: Table) -> Str
  export fn has_column(t: Table, name: Str) -> Bool
  export fn col(t: Table, name: Str) -> Sql
  export fn field(t: Table, name: Str) -> Sql
  export fn fields(t: Table) -> List<Sql>
  export fn ref(t: Table) -> Sql
  export fn from_ref(t: Table) -> Sql

  // Assignment
  export fn assign(column: Str, value: Sql) -> Assignment
  export fn to_sql(a: Assignment) -> Sql
}
```

`ColumnOpts` v1 dihapus: flag disimpan langsung di `Column` agar tidak ada nama fungsi bertabrakan
(F5/F6).

### 5.4 `dialect`

```lt
package dialect {
  export struct Dialect {
    kind: Str
  }

  export fn postgres() -> Dialect
  export fn mysql() -> Dialect
  export fn sqlite() -> Dialect
  export fn quote_char(d: Dialect) -> Str
  export fn quote_identifier(d: Dialect, name: Str) -> Str
  export fn sql_to_query(d: Dialect, q: Sql) -> Rendered
}
```

### 5.5 `pg_core` / `mysql_core` / `sqlite_core`

Konstruktor kolom mengikuti drizzle:

| package | fungsi |
|---|---|
| `pg_core` | `integer`, `serial`, `bigint`, `text`, `varchar`, `char`, `boolean`, `timestamp`, `date`, `time`, `real`, `double`, `numeric`, `json`, `jsonb`, `uuid`, `custom` |
| `mysql_core` | `int`, `serial`, `bigint`, `text`, `varchar`, `char`, `boolean`, `timestamp`, `date`, `time`, `float`, `double`, `decimal`, `json`, `custom` |
| `sqlite_core` | `integer`, `real`, `text`, `blob`, `numeric`, `boolean`, `timestamp`, `custom` |

Semua mengembalikan `schema.Column` dengan flag default `false`.

### 5.6 `select`

```lt
package select {
  export struct Select { … }   // table, subquery, fields, where, group, having, order,
                               // limit, offset, distinct, dialect, joins, ctes, set op
  export fn create() -> Select
  export fn from_table(s: Select, t: Table) -> Select
  export fn from_subquery(s: Select, q: Select, alias: Str) -> Select
  export fn fields(s: Select, fields: List<Sql>) -> Select
  export fn where(s: Select, expr: Sql) -> Select
  export fn group_by(s: Select, fields: List<Sql>) -> Select
  export fn having(s: Select, expr: Sql) -> Select
  export fn order_by(s: Select, fields: List<Sql>) -> Select
  export fn limit(s: Select, value: Int) -> Select
  export fn offset(s: Select, value: Int) -> Select
  export fn distinct(s: Select) -> Select
  export fn left_join/inner_join/right_join/full_join(s: Select, t: Table, on: Sql) -> Select
  export fn with_cte(s: Select, name: Str, q: Select) -> Select
  export fn union/union_all/intersect/except_query(s: Select, q: Select) -> Select
  export fn set_dialect(s: Select, d: Dialect) -> Select
  export fn build(s: Select) -> Result<Rendered, BuildError>
  export fn exists(q: Select) -> Sql
  export fn not_exists(q: Select) -> Sql
  export fn in_subquery(expr: Sql, q: Select) -> Sql
  export fn ref(alias: Str, column: Str) -> Sql
  export fn to_sql(s: Select) -> Sql
}
```

### 5.7 `insert` / `update` / `delete`

- `insert`: `create(table)`, `values(i, rows)`, `on_conflict_do_nothing(i)`,
  `on_conflict_do_nothing_target(i, columns)`, `on_conflict_do_update(i, columns, assignments)`,
  `on_duplicate_key_update(i, assignments)`, `returning(i, fields)`,
  `returning_all_columns(i)`, `set_dialect(i, d)`, `build(i)`.
- `update`: `create(table)`, `set(u, assignments)`, `where(u, expr)`, `returning`,
  `returning_all_columns`, `set_dialect`, `build`.
- `delete`: `create(table)`, `where(d, expr)`, `returning`, `returning_all_columns`,
  `set_dialect`, `build`.

Perbedaan dialect yang harus persis drizzle:

- Placeholder kolom yang tidak diberikan: `default` (pg/mysql), `null` (sqlite).
- Konflik: `on conflict … do nothing/do update` (pg/sqlite) vs `on duplicate key update` (mysql).
- `returning` hanya untuk pg.

### 5.8 Contoh pemakaian lengkap

```lt
import schema { plain, col, field }
import pg_core { serial, text, integer }
import select { create, from_table, fields, where, order_by, limit, set_dialect, build }
import dialect { postgres }
import sql { eq, and, int, str, asc }

let users = plain("users", [
  serial("id").with_primary(),
  text("name").with_not_null(),
  integer("age"),
])

let q = create()
  .from_table(users)
  .fields([field(users, "id"), field(users, "name")])
  .where(and([col(users, "name").eq(str("a")), col(users, "age").gt(int(18))]))
  .order_by([col(users, "name").asc()])
  .limit(10)
  .set_dialect(postgres())

match q.build() {
  Ok(rendered) => rendered.sql
  Err(error) => "build failed"
}
```

---

## 6. Milestone dan Gate

Gate per milestone: **TS + Postgres**. Smoke Go/Py bersifat informasi sampai M6.

| M | Isi | Gate |
|---|---|---|
| **M0** | skeleton `lt-drizzle-v2/`, `build.sh`, `verify.sh`, differential runner 1 kasus, CI `drizzle-v2.yml` | `bash lt-drizzle-v2/verify.sh` hijau; fixture `SELECT 1` identik |
| **M1** | `value` + `sql` + `dialect` (chunk, identifier, quoting, `$n`/`?`, escaping, `SqlArg`/`tag`) | fixture raw/param/identifier Postgres identik + quirk drizzle |
| **M2** | `schema` + `pg_core`/`mysql_core`/`sqlite_core`, referensi kolom/alias/schema | referensi `"users"."id"`, alias, schema identik |
| **M3** | package `select` + semua operator + order/limit/offset + agregat + distinct | setiap operator punya fixture; `and/or/not` bersarang identik |
| **M4** | join, subquery (from/exists/in), CTE, set operations | fixture join/subquery/CTE/union identik |
| **M5** | `insert`/`update`/`delete` + conflict + returning | fixture DML identik untuk Postgres |
| **M6** | parity MySQL+SQLite, gerbang 3 target, roundtrip DB, skrip v1-vs-v2 | `tsc`, `mypy --strict`, `go vet`+`gofmt`; 64 fixture; roundtrip pg+mysql |

Urutan commit: `lt-drizzle-v2: Mx - <ringkasan>`.

---

## 7. Strategi Verifikasi

1. **Differential (gate)**: definisi query yang sama di drizzle 0.44.4 dan di output v2;
   bandingkan `sql` + `params` byte-exact. Nama kasus dipertahankan dari v1 (64 kasus).
2. **Harness**: `parity/differential.test.ts` memakai bentuk emit v2 — `Value.Text(...)`,
   `SqlArg.Integer(...)`, fungsi camelCase bebas (`sqlToQuery(d, q)`, `orderBy(s, …)`), struct sebagai class.
3. **v1 vs v2 (sekali jalan)**: `parity/v1-vs-v2.test.ts` membandingkan output `lt-drizzle`
   (v1) dan `lt-drizzle-v2` untuk fixture yang sama; tidak masuk gate CI.
4. **Test LT**: package `*_test` di `lt-drizzle-v2/tests/`, dijalankan `lt test` di tiga target.
5. **Roundtrip**: DDL yang sama dengan v1 (`ddl/postgres.sql`, `ddl/mysql.sql`), eksekusi ke
   Postgres 5433 dan MySQL 3307 lewat `docker-compose.test.yml`.
6. **Native checkers**: `tsc --noEmit`, `mypy --strict`, `go vet` + `gofmt -l` kosong.

---

## 8. Definisi Selesai

1. 64 fixture differential v2-vs-drizzle hijau (pg, mysql, sqlite).
2. `tsc`, `mypy --strict`, `go vet`/`gofmt` bersih untuk tiga target.
3. `lt test` package test jalan di tiga target.
4. Roundtrip Postgres + MySQL hijau.
5. `drizzle-port-v2.md` memuat tabel perbandingan API v2 vs drizzle dan gap tersisa.
6. Skrip v1-vs-v2 dijalankan sekali dan hasilnya dicatat di plan.
7. Tidak ada perubahan pada `lt-drizzle/` (v1) selama migrasi, dan tidak ada perubahan compiler LT.

---

## 9. Gap List LT v2 (hipotesis, diverifikasi selama M0–M6)

| # | Keterbatasan | Dampak | Workaround | Status |
|---|---|---|---|---|
| H1 | Tanpa default argumen & varargs | opsi kolom wajib eksplisit | flag di `Column` + `with_*` | dikunci |
| H2 | Tanpa reflection | skema dinamis, bukan turunan struct | `Table` + `Column` eksplisit | dikunci |
| H3 | Tanpa IO/async | driver/transaksi mustahil | core murni | dikunci |
| H4 | Tagged `T` harus konkret | parameter campuran butuh enum | `SqlArg` + pembungkusan eksplisit | dikunci |
| H5 | Tanpa `Date`/`JSON`/`Buffer` | tipe host tidak bisa dipetakan | `Value` tertutup | dikunci |
| H6 | **Overloading receiver tidak diterima** (beda dengan spec v2) | satu package tidak bisa memuat `where` untuk Select/Update/Delete | pecah package builder | dikunci (F5) |
| H7 | Nama unik case-insensitive | `Table` vs `table()`, `Column` vs `column()` | konstruktor diberi nama lain (`plain`, dst.) | dikunci (F6) |
| H8 | Package wajib kurung kurawal | contoh spec usang | ikuti grammar | dikunci (F2) |
| H9 | Emitter Go/Py untuk struct/fungsi/enum baru | risiko terbesar di M6 | smoke tiap milestone | **terbuka** |
| H10 | Varian enum bernama builtin Python (`Int`, `Str`, `Bool`, `List`, `Map`) membayangi builtin di output Python dan ditolak `mypy --strict` | `Value.Str` tidak bisa dipakai | varian dinamai `Integer/Text/Boolean/Array/Record` | dikunci (diverifikasi M0) |

H6 perlu dilaporkan sebagai **bug/ketidaksesuaian spec di LT** (spec menyebut overloading sah,
compiler menolak) — di luar wewenang branch ini untuk memperbaiki.

---

## 10. Risiko

| Risiko | Mitigasi |
|---|---|
| API parity meleset karena batasan bahasa (nama, package) | tabel API di §5 dikunci sebelum M1; penyimpangan dicatat di laporan |
| v1 dan v2 menyimpang tanpa sadar | skrip v1-vs-v2 + 64 fixture nama sama |
| Emitter Go/Py tidak siap untuk struct/fungsi | smoke emit tiap milestone, gate penuh M6 |
| Perubahan compiler setelah v0.3.0 | pin `d11a4c9`, bump eksplisit |
| DDL roundtrip bukan keluaran drizzle-kit | masih terbuka dari v1 (K3), dicatat |

---

## 11. Prosedur Kerja

1. Buat branch `experiment/drizzle-port-v2` dari tip `experiment/drizzle-port`.
2. Commit plan ini (di branch v2, bukan di branch v1).
3. Rebuild `lt` dari `d11a4c9`, catat perintahnya di plan/CI.
4. Kerjakan M0 → M6; satu batch commit per milestone; `verify.sh` wajib hijau.
5. `lt-drizzle/` v1 tidak disentuh sampai M6 v2 selesai.
6. Setelah M6: jalankan v1-vs-v2 sekali, tulis laporan gap, lalu putuskan apakah v1 dihapus.
7. Branch tidak di-merge (mengikuti K24 v1).

---

## 12. Pertanyaan Terbuka

Tidak ada keputusan desain yang tersisa. Yang masih perlu **fakta** hanya H9 (kesiapan emitter
Go/Py), dan itu diverifikasi saat M6.
