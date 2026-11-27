# Plan: Port Drizzle ORM ke Lingua Tungga

Status: **draft — belum dieksekusi**
Branch: `experiment/drizzle-port` (base: tip branch `lt-core`)
Repo: `gntrees-sql-builder`
Compiler: `gntrees/lingua-tungga` di commit **`09bffc7`** (typed tagged template)
Referensi perilaku: `drizzle-orm@0.44.4`

Dokumen ini adalah hasil sesi desain. Semua keputusan di bagian 2 sudah dikunci;
yang tidak ada di sini bukan diasumsikan, melainkan di luar scope (bagian 4).

---

## 1. Tujuan

Menulis ulang **semantik** drizzle-orm 0.44.4 — schema DSL dan SQL builder murni — dalam
satu sumber `.lt`, lalu meng-emit library TypeScript, Python, dan Go yang menghasilkan
**SQL dan params identik byte-per-byte** dengan drizzle untuk input yang sama.

Keberhasilan diukur dengan **differential harness terhadap drizzle asli**, bukan dengan
"API-nya mirip" atau "jumlah fitur mirip". Port yang tidak bisa dibandingkan bukan port.

---

## 2. Keputusan yang Dikunci

| # | Keputusan |
|---|---|
| K1 | Ruang lingkup v1 = **core murni**: schema DSL + SQL builder. Tanpa driver/IO. |
| K2 | Relational query API (`db.query.*`) = **M7 opsional**, setelah M6 hijau. |
| K3 | `drizzle-kit` (DDL/migrasi) **di luar branch**; DDL fixture memakai output drizzle-kit asli. |
| K4 | **Semantik parity**, bukan API parity. API mengikuti idiom LT (class, static fn, named args, snake_case). |
| K5 | Dialect: **Postgres + MySQL + SQLite**. Dialect lain (mssql/cockroach) di luar scope. |
| K6 | Lokasi: branch **`experiment/drizzle-port`** dari tip **`lt-core`**. Direktori baru `lt-drizzle/`; `lt/` (port sql-builder) dibiarkan read-only sebagai referensi. |
| K7 | Plan ini: `docs/plans/drizzle-port.md`. |
| K8 | Target: **TS dulu per slice**; gerbang 3 target (TS/Py/Go) baru di **M6**. |
| K9 | Schema **dinamis ala drizzle** (`Table` + eksplisit `Column`). LT tidak punya reflection, jadi class row tidak bisa jadi sumber kolom. |
| K10 | Type-level parity (`InferSelectModel`, `$inferSelect`) **di luar scope**. Kontrak = SQL + params. |
| K11 | AST **mirror drizzle**: `Sql` berisi chunk, deparse lewat `Dialect.sql_to_query()`. |
| K12 | `sql` tag memakai **typed tagged template** + `SqlArg`, plus `Sql.template(parts, values)` untuk host. `Sql.raw` untuk SQL literal. |
| K13 | Model nilai: `null`, `bool`, `int`, `float`, `str`, `list`, `map`. `Date`/`JSON`/`Buffer` di luar v1 (tanggung jawab host). |
| K14 | Verifikasi: differential string/params **dan** roundtrip DB nyata (Postgres + MySQL). |
| K15 | Slicing **M0–M7** (bagian 8). Gate per slice: TS + Postgres. |
| K16 | Opsi kolom = **preset immutable** (`Column.int(...).primary()`), karena LT tidak punya default argumen. |
| K17 | Nama sumber ditulis **snake_case** di `.lt`. Emitter LT menormalkan per target (TS `camelCase`, Go `PascalCase`, Python `snake_case`); port tidak menambah lapisan pemetaan nama sendiri. |
| K18 | Entry point per jenis query: `Select.create()`, `Insert.create(table)`, `Update.create(table)`, `Delete.create(table)`. Bukan satu `Query` besar. |
| K19 | **Tanpa** `.$dynamic()` / builder mutable. |
| K20 | Compiler LT **dipin ke SHA `09bffc7`**; bump hanya lewat keputusan eksplisit. |
| K21 | Ekspresi: **satu class universal `Sql`** + `enum SqlChunk`; `Column`/`Table` adalah objek terpisah yang direferensikan chunk. Tanpa inheritance. |
| K22 | Operator = method instance pada `Sql` (`col.eq(v)`), kombinator statis (`Sql.and([...])`, `Sql.or`, `Sql.not`). Tanpa namespace `Op`. |
| K23 | Harness mengikuti pola `lt-core`: `lt-drizzle/parity/differential.test.ts` + `lt-drizzle/verify.sh`. |
| K24 | Branch **tidak di-merge**. Output = library + laporan gap. Merge adalah keputusan produk terpisah. |

---

## 3. Definisi "Selesai"

Branch ini selesai ketika **semua** benar:

1. M0–M6 hijau; setiap fixture differential menghasilkan `sql` + `params` identik dengan drizzle 0.44.4.
2. Emit tiga target lolos checker native: `tsc --strict`, `mypy --strict`, `go vet` + `gofmt -l` kosong.
3. `lt test` untuk test class berjalan di ketiga target.
4. Roundtrip DB nyata untuk Postgres dan MySQL lolos.
5. `lt-drizzle/verify.sh` bisa dijalankan lokal dari clean checkout dan hasilnya deterministik.
6. `docs/plans/drizzle-port.md` diperbarui dengan **gap list LT** yang terverifikasi (bagian 11).
7. Tidak ada perubahan pada `lt/` dan tidak ada perubahan compiler LT.

Bukan definisi selesai: "API-nya seperti drizzle", "jumlah fitur sama", "sudah bisa dipakai produksi".

---

## 4. Di Luar Scope

- Driver, koneksi, pooling, transaksi, `db.execute`, async/IO apa pun.
- `drizzle-kit` (generate/migrate/studio).
- Relational query (`with`, `findMany`) sebelum M7.
- `Date`, `Buffer`, `JSON` bertipe, `numeric` sebagai string desimal presisi arbitrer.
- Prepared statement caching, placeholder reuse, `.$dynamic()`.
- Inferensi tipe tingkat lanjut dan `$inferSelect`.
- Dialect mssql/cockroach/singlestore.
- Publikasi paket ke registry.
- Perubahan spec/compiler Lingua Tungga.

---

## 5. Struktur Direktori

```
lt-drizzle/
  src/
    value.lt      # Value, SqlArg, Rendered, BuildError
    sql.lt        # Sql, SqlChunk, operator, Sql.template/raw
    column.lt     # Column, ColumnOpts
    table.lt      # Table
    dialect.lt    # Dialect (pg/mysql/sqlite), quote, placeholder, escape
    select.lt     # Select
    insert.lt     # Insert
    update.lt     # Update
    delete.lt     # Delete
    index.lt      # entry point untuk `lt build` (impor seluruh modul publik)
  tests/          # test class LT (jalan di 3 target)
  parity/
    differential.test.ts   # bun test: drizzle asli vs output LT->TS
    fixtures/              # definisi query berpasangan (TS + LT)
    golden/                # snapshot {sql, params} dari drizzle
    ddl/                   # DDL hasil drizzle-kit untuk roundtrip
  build.sh        # emit ts/py/go ke generated/lt-drizzle/
  verify.sh       # gerbang penuh
docs/plans/drizzle-port.md
.github/workflows/drizzle.yml
```

Graf modul harus asiklik (LT menolak import melingkar). `index.lt` hanya mengimpor.

---

## 6. Model Data

### 6.1 Nilai dan hasil

```lt
pub enum Value {
  Null
  Bool(Bool)
  Int(Int)
  Float(Float)
  Str(Str)
  List(List<Value>)
  Map(Map<Str, Value>)
}

// T untuk typed tagged template: harus konkret, bukan type parameter class.
pub enum SqlArg {
  Null
  Bool(Bool)
  Int(Int)
  Float(Float)
  Str(Str)
}

pub class Rendered {
  sql: Str
  params: List<Value>
}

pub enum BuildError {
  Unsupported(feature: Str, target: Str)
  MissingDialect
  UnknownColumn(table: Str, column: Str)
}
```

`Int` LT = i64. Di TS menjadi `bigint`; konversi ke `number` untuk driver adalah tugas host
(harness membandingkan `Number(bigint)` dengan `number` drizzle).

### 6.2 Chunk dan ekspresi

```lt
pub enum SqlChunk {
  Raw(Str)             // teks SQL literal, tidak di-quote
  Param(Value)         // parameter ber-placeholder
  Ident(Str)           // identifier, di-quote oleh dialect
  ColumnRef(Column)
  TableRef(Table)
}

pub class Sql {
  chunks: List<SqlChunk>
  // instance
  fn eq(self, other: Sql) -> Sql
  fn ne(self, other: Sql) -> Sql
  fn gt(self, other: Sql) -> Sql
  // ... gte, lt, lte, like, not_like, ilike, not_ilike, between, not_between
  fn in_list(self, items: List<Sql>) -> Sql
  fn not_in_list(self, items: List<Sql>) -> Sql
  fn is_null(self) -> Sql
  fn is_not_null(self) -> Sql
  fn asc(self) -> Sql
  fn desc(self) -> Sql
  fn as_(self, alias: Str) -> Sql
  fn append(self, other: Sql) -> Sql
  // static
  static fn raw(text: Str) -> Sql
  static fn template(parts: List<Str>, values: List<SqlArg>) -> Sql
  static fn int(v: Int) -> Sql
  static fn str(v: Str) -> Sql
  static fn bool(v: Bool) -> Sql
  static fn float(v: Float) -> Sql
  static fn null_value() -> Sql
  static fn and(items: List<Sql>) -> Sql
  static fn or(items: List<Sql>) -> Sql
  static fn not(expr: Sql) -> Sql
  static fn exists(query: Select) -> Sql   // jika tidak menimbulkan siklus modul
  static fn col(table: Table, name: Str) -> Sql
}
```

**Tanpa `Nested(Sql)`.** Chunk diratakan saat `append`; tanda kurung ditulis eksplisit
sebagai `Raw("(")` / `Raw(")")`. Ini menghindari tipe rekursif `Sql -> List<SqlChunk> -> Sql`
yang belum tentu diterima typechecker LT.

### 6.3 Kolom dan tabel

```lt
pub class ColumnOpts {
  not_null: Bool
  primary: Bool
  unique: Bool
  has_default: Bool
  default_sql: Str
  static fn none() -> ColumnOpts
  fn with_not_null(self) -> ColumnOpts
  fn with_primary(self) -> ColumnOpts
  fn with_unique(self) -> ColumnOpts
  fn with_default(self, sql: Str) -> ColumnOpts
}

pub class Column {
  table: Str
  name: Str
  sql_type: Str      // "integer", "text", "boolean", "timestamp", ...
  opts: ColumnOpts
  // factory per tipe SQL (tanpa default argumen):
  static fn integer(name: Str) -> Column
  static fn serial(name: Str) -> Column
  static fn bigint(name: Str) -> Column
  static fn text(name: Str) -> Column
  static fn varchar(name: Str, length: Int) -> Column
  static fn char(name: Str, length: Int) -> Column
  static fn boolean(name: Str) -> Column
  static fn timestamp(name: Str) -> Column   // mode string
  static fn date(name: Str) -> Column
  static fn time(name: Str) -> Column
  static fn real(name: Str) -> Column
  static fn double(name: Str) -> Column
  static fn numeric(name: Str, precision: Int, scale: Int) -> Column
  static fn json(name: Str) -> Column
  static fn jsonb(name: Str) -> Column
  static fn uuid(name: Str) -> Column
  static fn custom(name: Str, sql_type: Str) -> Column
}

pub class Table {
  name: Str
  schema: Option<Str>
  alias: Option<Str>
  columns: List<Column>
  static fn postgres(name: Str, schema: Option<Str>, alias: Option<Str>, columns: List<Column>) -> Table
  fn col(self, name: Str) -> Sql   // BuildError tidak dipakai di sini; nama divalidasi saat build
}
```

`Table.col(name)` mengembalikan `ColumnRef`; kolom yang tidak terdaftar ditolak saat build
(`BuildError.UnknownColumn`), bukan diam-diam diloloskan.

### 6.4 Dialect

```lt
pub class Dialect {
  kind: Str   // "postgres" | "mysql" | "sqlite"
  quote: Str
  placeholder: Str  // "dollar" | "question"
  static fn postgres() -> Dialect
  static fn mysql() -> Dialect
  static fn sqlite() -> Dialect
  fn sql_to_query(self, sql: Sql) -> Rendered
}
```

Perbedaan yang harus persis mengikuti drizzle 0.44.4:
- Quote: `"..."` (pg, sqlite), `` `...` `` (mysql).
- Placeholder: `$1, $2, ...` (pg), `?` (mysql, sqlite).
- **Drizzle 0.44.4 tidak meng-escape karakter quote di dalam identifier**
  (`sql.identifier('we"ird')` → `"we"ird"`). Port meniru apa adanya; escaping adalah
  keputusan terpisah yang harus mengubah kedua sisi sekaligus. (Terverifikasi di M1.)
- Literal boolean di dalam `Raw` tidak diubah; nilai selalu lewat parameter.
- Dukungan `RETURNING`, sintaks `ON CONFLICT`, dan `ON DUPLICATE KEY` diverifikasi per fixture
  pada M5/M6, bukan diasumsikan.

---

## 7. Bentuk API (contoh)

```lt
import Table from "./table.lt"
import Column from "./column.lt"
import Sql from "./sql.lt"
import Select from "./select.lt"
import Insert from "./insert.lt"

pub class Users {
  static fn table() -> Table {
    Table.plain(
      "users",
      [
        Column.serial("id").with_primary(),
        Column.text("name").with_not_null(),
        Column.boolean("active").with_not_null().with_default("true"),
        Column.timestamp("created_at").with_not_null(),
      ],
    )
  }
}
```

Catatan: **static method memakai argumen posisional**, bukan named argument — hanya
konstruktor class yang memakai named argument (spec LT §6.1). Karena itu API publik
memakai bentuk posisional dan menyediakan helper seperti `Table.plain`/`with_schema`/
`with_alias` agar `Option` tidak bocor ke pemanggil.

```lt
let t = Users.table()
let q = Select.create()
  .from_table(t)
  .select([t.col("id"), t.col("name")])
  .where([t.col("active").eq(Sql.bool(true)), t.col("name").like(Sql.str("A%"))])
  .order_by([t.col("name").desc()])
  .limit(Sql.int(10))
  .set_dialect(Dialect.postgres())

match q.build() {
  Ok(rendered) => rendered.sql
  Err(error)   => "build failed"
}
```

```lt
// Gula tagged template, hanya untuk kode .lt:
let needle = Sql.template`lower(${SqlArg.Str(name)}) = lower(${SqlArg.Str("ana")})`
```

Host (TS/Py/Go) memakai `Sql.template(parts, values)` karena tagged template bukan sintaks host.

---

## 8. Milestone dan Acceptance Criteria

Setiap milestone = satu batch commit (`lt-drizzle: Mx - <ringkasan>`) dan harus hijau lokal
sebelum lanjut. Gate per milestone: **TS + Postgres**. Smoke Go/Py boleh dijalankan sebagai
informasi, tetapi bukan gate sampai M6.

| M | Isi | Gate (harus hijau) |
|---|---|---|
| **M0** | `lt-drizzle/` skeleton, `build.sh`, `verify.sh`, differential runner 1 fixture, `drizzle.yml` | `bash lt-drizzle/verify.sh` hijau; CI job jalan; fixture `SELECT 1` identik |
| **M1** | `Value`, `SqlArg`, `Rendered`, `BuildError`, `Sql`, `SqlChunk`, `Dialect` + quote/placeholder/escape | fixture raw/param/identifier Postgres identik, termasuk quirk drizzle yang tidak meng-escape quote identifier dan `$n` |
| **M2** | `Table`, `Column`, `ColumnOpts`; 15 factory kolom; alias/schema | reference kolom (`"users"."id"`, alias) identik |
| **M3** | `Select`: select-list, `where` + semua operator, `order_by`, `limit`, `offset`, agregat (`count/sum/avg/min/max`), `distinct` | setiap operator punya minimal 1 fixture; `and/or/not` bersarang identik |
| **M4** | join (inner/left/right/full), subquery (from/where/select), CTE (`with`), set ops (`union/unionAll/intersect/except`) | fixture join + subquery + CTE identik; error untuk fitur yang tidak didukung |
| **M5** | DML: `Insert` (values multi-row, default values, returning), `on_conflict` (do nothing / do update), `Update`, `Delete` | fixture DML identik untuk Postgres |
| **M6** | parity MySQL + SQLite penuh; gerbang 3 target; roundtrip DB; drift check | `tsc --strict`, `mypy --strict`, `go vet`+`gofmt`; differential 3 dialect; roundtrip pg+mysql |
| **M7** | (opsional) relational query API | hanya dimulai kalau M0–M6 selesai dan diputuskan perlu |

Aturan slice: **tidak boleh ada fitur yang masuk tanpa fixture**. Fitur yang belum bisa
dipetakan ke target/dialect harus menghasilkan `BuildError`, bukan SQL yang berbeda diam-diam
(mengikuti semantik ketat LT).

---

## 9. Strategi Verifikasi

### 9.1 Differential (gate utama)

Untuk setiap fixture, definisikan query dua kali:

- sisi drizzle: `drizzle-orm` 0.44.4, ambil `query.getSQL()` → `{ sql, params }`;
- sisi LT: panggil API `Select/Insert/Update/Delete` dari output `generated/lt-drizzle/typescript`,
  ambil `Rendered` → `{ sql, params }`.

Bandingkan **byte-exact** `sql` dan `params` (setelah normalisasi `bigint` → `number`).
Fixture ditulis sebagai pasangan bernama di `lt-drizzle/parity/fixtures/`, mengikuti pola
`diff(name, build)` yang sudah dipakai `lt-core`.

### 9.2 Golden snapshot

Snapshot `{sql, params}` dihasilkan dari drizzle dan di-commit ke `parity/golden/`.
Tujuannya: CI mendeteksi perubahan output walau versi drizzle atau node berubah, dan review
bisa melihat diff SQL tanpa menjalankan apa pun.

### 9.3 Test class LT

Test class di `lt-drizzle/tests/` mengunci perilaku internal (dialect, escaping, error) dan
dijalankan di tiga target lewat `lt test`.

### 9.4 Roundtrip DB

DDL dari drizzle-kit di `parity/ddl/`, dijalankan lewat `docker-compose.test.yml` yang sudah ada.
SQL hasil port dieksekusi ke Postgres dan MySQL; hasilnya dibandingkan dengan hasil query
drizzle yang setara. Roundtrip membuktikan SQL tidak hanya "sama teks" tetapi juga valid.

---

## 10. CI

Workflow baru `.github/workflows/drizzle.yml`:

- trigger: `push`/`pull_request` pada `experiment/drizzle-port`, path `lt-drizzle/**`,
  `docs/plans/drizzle-port.md`, `.github/workflows/drizzle.yml`;
- build `lt` dari `gntrees/lingua-tungga` pada **SHA `09bffc7`** (bukan `main`);
- job `parity`: `bash lt-drizzle/verify.sh`;
- job `database`: Postgres + MySQL, migrate, roundtrip;
- kegagalan dianotasi seperti `lt.yml` yang sudah ada.

`lt/` dan workflow `lt.yml` tidak diubah.

---

## 11. Gap List Lingua Tungga (hipotesis, diverifikasi selama M0–M6)

| # | Keterbatasan LT | Dampak pada port | Workaround di plan | Status |
|---|---|---|---|---|
| G1 | Tanpa free function | `eq`, `and`, `pgTable` tidak bisa jadi fungsi bebas | method pada `Sql`, static factory | dikunci (K21/K22) |
| G2 | Tanpa inheritance | hirarki `SQL/Column/Table/Param` tidak bisa ditiru | `Sql` universal + `SqlChunk` | dikunci (K21) |
| G3 | Tanpa reflection | kolom tidak bisa diturunkan dari class | schema dinamis | dikunci (K9) |
| G4 | Tanpa default argumen & varargs | opsi wajib semua, argumen list | preset `ColumnOpts`, parameter `List<...>` | dikunci (K16) |
| G5 | Tanpa IO/async | driver, transaksi, `db.execute` mustahil | core murni saja | dikunci (K1) |
| G6 | `T` tagged template harus konkret | tipe campuran butuh enum | `SqlArg` + pembungkusan eksplisit | dikunci (K12) |
| G7 | Tanpa `Date`/`JSON`/`Buffer` | parameter bertipe host tidak bisa dipetakan | `Value` tertutup, host menanggung konversi | dikunci (K13) |
| G8 | Tanpa type-level inference | `InferSelectModel` mustahil | di luar scope | dikunci (K10) |
| G9 | Tanpa state mutable | `$dynamic` mustahil | builder immutable | dikunci (K19) |
| G10 | Static fn tidak boleh memakai type parameter class | factory generik tidak bisa | factory non-generik | konsekuensi K18 |
| G11 | Emitter Go/Py untuk generik/enum kompleks | risiko terbesar di M6 | smoke tiap milestone (advisory) | **terbuka — diverifikasi M6** |

G11 adalah risiko utama: kalau emitter tidak bisa menangani bentuk yang dipakai port, M6 gagal.
Karena itu smoke emit Go/Py dijalankan (tanpa jadi gate) sejak M2 supaya kegagalan terdeteksi
lebih awal, tanpa melanggar K8.

---

## 12. Risiko

| Risiko | Mitigasi |
|---|---|
| Format SQL drizzle punya detail tak terduga (spasi, urutan params) | expected selalu diambil dari `getSQL()`, bukan ditulis tangan |
| Versi drizzle berubah di mesin pengembang | pin `drizzle-orm@0.44.4` di devDependencies + golden snapshot |
| Compiler LT `main` berubah dan mematahkan branch | pin SHA, prosedur bump eksplisit |
| Roundtrip DB memperlambat CI | job terpisah, hanya jalan pada perubahan `lt-drizzle/**` |
| Scope merembet ke relational/drizzle-kit | K2/K3; M7 hanya setelah M6 |
| Port menyimpang dari drizzle tanpa sadar | differential wajib untuk setiap fitur; tidak ada fitur tanpa fixture |

---

## 13. Prosedur Kerja

1. Buat branch `experiment/drizzle-port` dari tip `lt-core`.
2. Commit plan ini sebagai commit pertama.
3. Kerjakan M0 → M6 berurutan; satu batch commit per milestone.
4. `verify.sh` wajib hijau sebelum commit milestone.
5. Setelah M6, tulis hasil eksperimen: apa yang LT mampu, apa yang tidak, dan gap yang
   terverifikasi (memperbarui bagian 11).
6. Branch tidak di-merge (K24).

---

## 14. Pertanyaan Terbuka

Tidak ada. Semua keputusan desain yang memengaruhi bentuk kode sudah dikunci di bagian 2.
Hal yang masih perlu **fakta** (bukan keputusan) dicatat sebagai risiko G11 dan diverifikasi
saat M6.
