# Plan: Playground Komprehensif untuk Port Drizzle v2

Status: **selesai (P0–P5)**
Branch: `experiment/drizzle-port-v2`
Repo: `gntrees-sql-builder`
Compiler: Lingua Tungga v0.3.0 (`d11a4c9`)
Referensi pola: playground Lingua Tungga (`gntrees-lingua-tungga/docs/playground.md`)

Dokumen ini melanjutkan [`drizzle-port-v2.md`](./drizzle-port-v2.md). Port v2 sudah punya
64 fixture differential + roundtrip; playground mengubah bukti itu menjadi **galeri yang bisa
dibaca manusia**, tanpa menduplikasi definisi kasus.

---

## 1. Tujuan

Satu halaman statis yang, untuk setiap fitur port:

1. menampilkan **sumber `.lt`** yang benar-benar dipakai,
2. menampilkan hasil nyata di **tiga bahasa host** (TS/Py/Go) beserta stdout-nya,
3. menampilkan **SQL + params** untuk Postgres, MySQL, SQLite,
4. membandingkannya dengan **expected dari drizzle 0.44.4**,
5. menunjukkan **status** yang berasal dari eksekusi nyata, bukan klaim.

"Komprehensif" harus terukur: setiap fitur di `features.toml` wajib punya kasus, dan gate gagal
kalau daftar kasus tidak cocok dengan evidence.

---

## 2. Fakta yang Mengikat

| # | Fakta | Konsekuensi |
|---|---|---|
| G1 | `lt build`/`lt test` menolak import ke luar direktori entry | kasus harus di-**staging** ke satu direktori datar bersama `src/*.lt` |
| G2 | `lt test -t <t> <cases...> --out <dir> --usage` meng-emit test + usage program | sumber stdout nyata per target |
| G3 | Usage program dijalankan: TS `vite-node src/<module>.usage.ts`, Py `usage/<module>.py`, Go `go run ./usage/<module>` | gate butuh Node, venv Python, Go |
| G4 | Usage program mencetak **argumen pertama** setiap `expect.*` | format output kasus harus deterministik dan mudah diparse |
| G5 | Test/usage tidak di-emit oleh `lt build`, hanya oleh `lt test` | library dan playground dibangun dari entry berbeda |
| G6 | Varian enum tidak boleh menabrak builtin Python (H10) | helper playground tidak memakai nama `Str`/`Int`/`List` |
| G7 | Roundtrip DB memakai `docker-compose.test.yml` (pg 5433, mysql 3307) | kasus DB otomatis bagian gate |
| G8 | `lt test` menerima banyak file kasus dalam satu direktori datar dan meng-emit satu usage program per kasus | staging sekali, semua kasus dijalankan bersamaan (diverifikasi langsung) |

---

## 3. Keputusan yang Dikunci

| # | Keputusan |
|---|---|
| P1 | Playground = **galeri dokumentasi + dashboard bukti parity**, bukan editor query live. |
| P2 | Output: **satu `index.html` statis** dengan vanilla JS (tab dialect/bahasa, filter grup, pencarian), tanpa framework, jalan di `file://`. |
| P3 | Lokasi: `lt-drizzle-v2/playground/` di repo ini; generator `build.ts`; output `out/playground/index.html` (gitignored). |
| P4 | Gate: skrip terpisah `playground.sh`, dipanggil CI; **tidak** memperlambat `verify.sh`. |
| P5 | Sumber kebenaran: **satu kasus `.lt` per fitur/kombinasi**, dieksekusi di 3 target. Tidak ada duplikasi kasus di TS. |
| P6 | Expected drizzle didefinisikan **co-located** di `cases/<group>/<id>.expected.ts`. |
| P7 | Setiap kasus punya tepat **3 test** berjudul `postgres`, `mysql`, `sqlite`; argumen pertama tiap test = satu baris kanonik `<sql>\t<params>`. |
| P8 | Format param kanonik: `null`, `bool:true`, `int:1`, `float:2.5`, `text:x`; dipisah `,`. |
| P9 | Usage program dijalankan nyata di 3 target; hasilnya masuk `usage.json`. |
| P10 | `usage.json` + `evidence.json` di-commit; gate gagal kalau tidak cocok dengan daftar kasus saat ini. |
| P11 | 4 kasus DML menampilkan **baris nyata** dari Postgres/MySQL; kasus SELECT lain cukup SQL + params. |
| P12 | Setiap fitur di `features.toml` wajib punya ≥1 kasus; setiap kasus wajib menunjuk fitur yang dikenal. |
| P13 | Workflow GitHub Pages mem-publish `index.html`; langkah deploy terpisah dari gate. |
| P14 | Interaksi browser: tab, filter grup, pencarian teks. Tidak ada eksekusi kode di browser. |
| P15 | Relational query/M7 tidak masuk playground sampai fiturnya ada. |

---

## 4. Struktur Direktori

```
lt-drizzle-v2/
  playground/
    features.toml                 # daftar fitur yang diklaim
    cases/
      sql/raw_sql.lt
      sql/raw_sql.toml
      sql/raw_sql.expected.ts
      operators/eq.lt | .toml | .expected.ts
      select/...
      joins/...
      dml/...
    build.ts                      # stage, run, compare, render
    render.ts                     # HTML (dipanggil build.ts)
    evidence.json                 # di-commit
    usage.json                    # di-commit
    out/index.html                # gitignored
  playground.sh                   # gate
.github/workflows/playground.yml  # gate + Pages
docs/plans/drizzle-playground.md
```

---

## 5. Format Kasus

### 5.1 `cases/<group>/<id>.lt`

```lt
import sql { raw } "./sql.lt"
import dialect { postgres, sql_to_query } "./dialect.lt"

package case_sql_raw {
  fn line(dialect_name: Str) -> Str {
    // helper kecil per kasus; boleh memakai package port
    ...
  }

  test "postgres" {
    expect.not_equal(render(postgres(), raw("select 1")), "")
  }

  test "mysql" {
    expect.not_equal(render(mysql(), raw("select 1")), "")
  }

  test "sqlite" {
    expect.not_equal(render(sqlite(), raw("select 1")), "")
  }
}
```

Aturan:

- Nama package `case_<group>_<id>` agar unik saat staging datar.
- Import memakai path datar (`./sql.lt`) karena staging menyalin `src/*.lt` ke direktori yang sama.
- Tepat tiga test, judul `postgres`/`mysql`/`sqlite`, urutan tetap.
- Argumen pertama `expect.*` adalah baris kanonik (P7/P8), supaya usage program mencetak
  bukti yang bisa dibandingkan langsung. **Amandemen saat eksekusi:** expected literal tidak
  ditulis di `.lt` (menghindari duplikasi); test memakai `expect.not_equal(line, "")` dan
  pembanding sebenarnya adalah `*.expected.ts` (drizzle).
- Tidak ada IO, tidak ada waktu, tidak ada random.

### 5.2 `cases/<group>/<id>.toml`

```toml
title = "Raw SQL is passed through unchanged"
feature = "sql/raw"
why = "Drizzle menyerahkan teks apa adanya; port tidak boleh menambah quoting."
```

### 5.3 `cases/<group>/<id>.expected.ts`

```ts
import { sql } from "drizzle-orm";
import { PgDialect } from "drizzle-orm/pg-core";
import { MySqlDialect } from "drizzle-orm/mysql-core";
import { SQLiteSyncDialect } from "drizzle-orm/sqlite-core";

const pg = new PgDialect();
const my = new MySqlDialect();
const sq = new SQLiteSyncDialect();

export const expected = {
  postgres: line(pg.sqlToQuery(sql`select 1`)),
  mysql: line(my.sqlToQuery(sql`select 1`)),
  sqlite: line(sq.sqlToQuery(sql`select 1`)),
};
```

`line()` adalah helper bersama di `playground/line.ts` (format P8), dipakai juga oleh build.ts
untuk membandingkan.

---

## 6. Alur Build

`playground/build.ts` menjalankan langkah berikut, gagal di langkah pertama yang tidak valid:

1. **Baca** `features.toml`, semua `*.lt` (kecuali yang berawalan `_`), `*.toml`, `*.expected.ts`.
2. **Validasi katalog**: setiap fitur punya kasus; setiap kasus menunjuk fitur yang ada;
   id unik; metadata wajib lengkap.
3. **Staging**: salin `lt-drizzle-v2/src/*.lt` + semua kasus ke `.lt/playground/src-flat/`.
4. **Emit + test**: `lt test -t ts|py|go <case files> --out .lt/playground/out --usage`.
5. **Jalankan test 3 target** (vitest, pytest, go test) supaya kasus yang gagal tidak pernah
   masuk halaman.
6. **Jalankan usage program** 3 target, tangkap stdout; parse per kasus/dialect.
7. **Bandingkan** baris hasil dengan `expected.ts`; perbedaan = gate gagal (tampilkan diff).
8. **Kasus DB** (P11): jalankan DDL + query dari 4 kasus DML ke Postgres/MySQL, tangkap baris.
9. **Tulis** `usage.json`, `evidence.json` (versi tool, commit, jumlah kasus, status), lalu
   `out/playground/index.html`.
10. **Cek staleness**: kalau daftar kasus berubah tanpa regenerasi, `build.ts` menolak
    (kecuali `--allow-stale`, yang menandai banner peringatan).

---

## 7. Tampilan Halaman

Satu file HTML, data tertanam sebagai JSON (`<script type="application/json">`).

Per kasus:

| Bagian | Isi |
|---|---|
| Header | `title`, `feature`, `why`, badge status (dari evidence) |
| Sumber | blok `.lt` (syntax highlight sederhana, tanpa dependency) |
| Tab bahasa | TS / Python / Go: kode usage program + stdout nyata |
| Tab dialect | Postgres / MySQL / SQLite: SQL + params hasil port |
| Parity | dua kolom: **port** vs **drizzle**; hijau kalau identik |
| DB (4 kasus) | tabel baris hasil query nyata |

Kontrol global: kotak pencarian (judul/id/feature), filter grup, filter dialect, toggle
"hanya yang gagal".

---

## 8. Cakupan Kasus

Kelompok fitur (`features.toml`) dan target kasus:

| Feature | Kasus minimal |
|---|---|
| `sql/raw`, `sql/params`, `sql/identifier` | 3 |
| `schema/column`, `schema/table`, `schema/alias`, `schema/namespace` | 4 |
| `select/fields`, `select/where`, `select/order`, `select/limit`, `select/distinct`, `select/aggregate` | 8 |
| `operators/comparison`, `operators/logical`, `operators/list`, `operators/null`, `operators/like`, `operators/between` | 8 |
| `joins/inner`, `joins/left`, `joins/right`, `joins/full`, `joins/order-limit` | 5 |
| `subquery/from`, `subquery/exists`, `subquery/in` | 3 |
| `cte` | 1 |
| `set/union`, `set/intersect`, `set/except` | 4 |
| `insert/values`, `insert/returning`, `insert/conflict`, `insert/duplicate` | 5 |
| `update`, `delete` | 2 |
| `dialect/mysql`, `dialect/sqlite` | sudah tercakup tiap kasus (3 dialect) |

**Hasil eksekusi: 37 kasus, satu per fitur** (bukan 64 1:1 dengan differential). Setiap fitur
punya bukti end-to-end; kasus differential yang hanya variasi dari fitur yang sama tidak
diduplikasi. Gate menegakkan **coverage fitur**, bukan jumlah kasus.

---

## 9. Gate dan CI

`lt-drizzle-v2/playground.sh`:

```sh
./lt-drizzle-v2/build.sh                       # library dulu
bun lt-drizzle-v2/playground/build.ts          # staging, lt test, usage, compare, render
bun test lt-drizzle-v2/playground/catalog.test.ts   # validasi katalog murni (cepat)
```

Gate gagal bila:

- ada fitur tanpa kasus, atau kasus tanpa fitur,
- `lt test` gagal di target mana pun,
- usage program non-zero atau stdout kosong,
- hasil port ≠ expected drizzle,
- evidence/usage tidak cocok dengan daftar kasus.

CI `playground.yml`:

- job `gate`: butuh bun, node, python, go, docker, dan `lt` dari `d11a4c9`;
- job `pages`: hanya setelah `gate`, unggah `lt-drizzle-v2/playground/out/` sebagai artifact Pages.

---

## 10. Definisi Selesai

1. `playground.sh` hijau dari clean checkout (staging → 3 target → usage → parity → evidence).
2. Setiap fitur di `features.toml` punya ≥1 kasus; gate menolak sebaliknya.
3. Halaman memuat 64 kasus + 4 kasus DB, tiga dialect, tiga bahasa.
4. `index.html` terbuka via `file://` tanpa server.
5. Workflow Pages mem-publish halaman.
6. Dokumen ini diperbarui dengan hasil dan batasan yang ditemukan saat eksekusi.

---

## 11. Milestone

| P | Isi | Gate |
|---|---|---|
| **P0** | `features.toml`, staging, runner, `line.ts`, 3 kasus pilot (raw/param/select), HTML shell | `playground.sh` hijau untuk 3 kasus |
| **P1** | Semua kasus `sql`/`schema`/`select`/`operators` (23 kasus) | katalog lengkap untuk grup itu |
| **P2** | `joins`/`subquery`/`cte`/`set` (13 kasus) | parity hijau |
| **P3** | `insert`/`update`/`delete` + 4 kasus DB (9 kasus) | roundtrip baris nyata |
| **P4** | Halaman final (filter/tab/pencarian), `evidence.json`/`usage.json`, Pages, docs | definisi selesai §10 |
| **P5** | Kasus `schema/*` memakai generated schema: relation join, alias, nullable insert, distinct-from | parity hijau + bukti DB join |

---

## 12. Risiko

| Risiko | Mitigasi |
|---|---|
| 64 kasus `.lt` + expected = pekerjaan besar dan rawan | dikerjakan per grup (P1–P3), tiap grup harus hijau sebelum lanjut |
| Format baris kanonik berubah dan membuat semua expected basi | `line.ts` satu implementasi; versi format dicatat di evidence |
| Usage program mencetak lebih dari satu argumen | konvensi: hanya `expect.eq(line, expected)`, argumen pertama = baris |
| Staging menyembunyikan import yang salah | staging menolak file dengan import di luar `./`; build.ts memeriksa sebelum menyalin |
| Gate butuh 4 toolchain + docker | cache venv/node_modules; job DB terpisah seperti `verify-db.sh` |
| Pages belum diaktifkan di repo | langkah deploy tetap dibuat; aktivasi settings didokumentasikan |

---

## 15. Progres

| P | Status | Bukti |
|---|---|---|
| P0 | selesai | staging + runner + `line.ts` + HTML shell |
| P1 | selesai | kasus `sql`/`schema`/`select`/`operators` |
| P2 | selesai | `joins`/`subquery`/`cte`/`set` |
| P3 | selesai | `insert`/`update`/`delete` + baris DB Postgres |
| P4 | selesai | halaman final, `evidence.json`/`usage.json`, workflow Pages, docs |
| P5 | selesai | 4 kasus `schema/*` dari generated schema; join dijalankan ke Postgres |

Hasil:

- `playground.sh` hijau: **41 kasus, 0 gagal**, 3 dialect.
- Staging kini ikut menyalin `src/generated/`, sehingga kasus bisa memakai
  `schema_tables`, `schema_relations`, dan `schema_adapter` yang di-commit.
- Usage program dijalankan nyata di TS dan Py; target Go mengikuti toolchain dan
  tercatat apa adanya di `evidence.json`.
- Temuan nyata: **SQLite tidak memakai tanda kurung pada set operation** (drizzle:
  `select ... union select ...`), sedangkan port selalu membungkus. Ini memperbaiki
  `select.lt`: pembungkusan set-op sekarang sadar-dialect (SQLite tanpa kurung).
- Baris DB baru diambil untuk Postgres (insert/select/update/delete); MySQL belum
  (rencana lanjutan, bukan blocker).
- `P7` diamandemen: expected tidak ditulis di `.lt`; pembanding ada di `*.expected.ts`.

---

## 13. Pertanyaan Terbuka

Tidak ada keputusan desain yang tersisa. Satu-satunya hal yang belum diketahui adalah **durasi**
gate penuh (64 kasus × 3 target × usage + 4 kasus DB); itu diukur saat P0, bukan diputuskan
sekarang.
