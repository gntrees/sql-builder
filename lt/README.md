# `lt/` — sql-builder dalam Lingua Tungga

Eksperimen: mengganti generator 15-bahasa dengan sumber tunggal `.lt` untuk
tiga target yang benar-benar dipakai — TypeScript, Python, Go.

Status: **slice 3**. Yang sudah ada: pemodelan nilai, AST bertipe, renderer
Postgres + MySQL, query (`select`/`from`/`where`/`order by`/`limit`/`offset`/
`raw`/`group by`/`having`/`join`), DML (`insert`/`update`/`delete`/`set`/
`values`/`returning`/`on conflict`), subquery (`exists`, `IN (SELECT ...)`,
`WITH ... AS (...)`), dan transaksi (`BEGIN; ...; COMMIT`).

Paritas MySQL ikut dijaga: backtick, placeholder `?`, `VALUES ROW`, `ILIKE`
yang jatuh ke `LIKE`, dan fitur yang tidak punya padanan (`FULL JOIN`,
`RETURNING`, `ON CONFLICT DO NOTHING`) ditolak dengan `ParseError.Unsupported`
alih-alih diam-diam berbeda perilaku.

Skema bertipe ada di [`lt/src/schema.lt`](src/schema.lt): `Column` dan `Table`
plus deklarasi `Users`/`Posts`. Salah nama tabel atau kolom menjadi compile
error, bukan error SQL saat runtime:

```lt
Query.create()
  .select([Users.id().node(), Users.name().node()])
  .from_table(Users.table().node())
  .where([Users.active().eq_bool(true)])
```

`Column.node()` menghasilkan nama ter-kualifikasi (`"users"."id"`); pakai
`bare()` untuk query satu tabel. `Column.col(...)`/`Table.col(...)` tetap ada
sebagai jalan keluar dinamis.

Seluruh AST ada di satu modul, [`lt/src/sql.lt`](src/sql.lt), karena `Node`
dan `Query` saling merujuk (subquery) sedangkan import melingkar dilarang.
Modul lain: `value.lt` (enum `Value`), `schema.lt` (tipe + skema pilot), dan
`index.lt` (entry point build).

## Perintah

```sh
./lt/build.sh    # emit ke generated/lt-sql-builder/{typescript,python,go}
./lt/test.sh     # emit + jalankan test class .lt di tiga target
./lt/verify.sh   # build + test class + tsc + mypy --strict + go vet/gofmt/test
                 # + differential + drift
./lt/check.sh    # build lalu gagal bila output yang di-commit berbeda
```

`lt` dicari di `PATH`; kalau tidak ada, set `LT_BIN`, atau taruh binary di
`.lt/bin/lt`.

## Kenapa output belum menimpa `generated/gntrees-sql-builder/`

Keputusan awal: output `.lt` menempati path yang sama supaya pemakai lama tidak
berubah. Itu ditunda karena keputusan lain: implementasi lama dibekukan sebagai
**oracle** di `tests/reference/legacy-ts/` dan dipakai test differential. Kalau
path lama ditimpa, seluruh suite legacy (15 bahasa) kehilangan referensinya.

Jadi untuk sekarang keduanya hidup berdampingan:

- `generated/gntrees-sql-builder/` — generator lama, tidak disentuh, tetap hijau.
- `generated/lt-sql-builder/` — hasil `.lt`.
- `tests/lt-differential.test.ts` — membandingkan keduanya byte demi byte.

Saat differential sudah stabil dan slice berikutnya selesai, paket `.lt` pindah
ke path lama dan referensi legacy dihapus.

## CI

Job `lt` di `.github/workflows/ci.yml` membangun compiler dari sumber (aset
rilis belum dipublikasikan), lalu menjalankan `lt/check.sh` dan `lt/verify.sh`.

Job `unit` dan `integration-db` masih merah di runner publik karena
`@gntrees/method-chain@0.0.34` tidak bisa diunduh dari registry publik —
dependensi itu dibutuhkan generator lama, bukan port `.lt`. Selama paket itu
belum dipublikasikan atau di-vendor, hanya job `lt` yang bermakna di CI publik.

## Gate

Slice 1 dianggap selesai bila, untuk dialek Postgres:

- `tsc --strict` bersih pada paket TypeScript,
- `mypy --strict` bersih pada paket Python,
- `go vet` bersih, `gofmt -l` kosong, `go test` hijau pada paket Go,
- setiap kasus di `tests/lt-differential.test.ts` menghasilkan `sql`, `param`,
  dan `sqlWithParam` yang identik dengan implementasi legacy (42 kasus: query,
  DML, join, agregasi, `on conflict`, subquery, subquery-di-FROM, `op`,
  dialek MySQL, skema bertipe, dan transaksi),
- `./lt/check.sh` lulus (tidak ada drift antara `.lt` dan output yang di-commit).

## Perbedaan yang disengaja dari API lama

| Hal | Legacy | `.lt` | Alasan |
|---|---|---|---|
| Argumen dinamis | `string \| number \| boolean \| null` bebas | `Value` enum (`Null`, `Bool`, `Int`, `Float`, `Str`) | LT tidak punya tipe dinamis; `match` exhaustive memaksa semua target menangani semua kasus |
| `from` | `from(...)` | `from_table(...)` | `from` kata kunci di LT |
| Nama method di TS | camelCase | camelCase (hasil emitter) | konsisten dengan target lain yang snake_case |
| `raw` dengan interpolasi | nilai non-string otomatis jadi parameter | semua interpolasi jadi teks literal (`Node.of`) | tag template LT selalu mengirim `List<Str>`; parameterisasi butuh `Value` bertipe |
| `parse()` gagal | melempar exception | `Result<ParseResult, ParseError>` | LT tidak punya exception |
| `sqlWithParam` untuk Float bulat | `1` | `1.0` | `Display` Float di LT membedakan `1` dan `1.0`; hanya memengaruhi string pratinjau |
| Dua `where(...)` berturut-turut | `WHERE a WHERE b` | digabung dengan `AND` | perilaku lama adalah bug |
| `WITH` | `with(sub, "alias")` | `with_cte(sub, "alias")` | `with` kata kunci di TS/Python, dan rename per target merusak kesamaan API |
| Fitur khusus Postgres di MySQL | exception saat `parse()` | `ParseError.Unsupported(pesan)` | LT tidak punya exception; pesannya sama dengan legacy |
| `IN` dengan daftar nilai | hanya teks (`in("1,2,3")`) atau subquery | `in_text(...)` dan `in_list([...])` | daftar bertipe tidak bisa diungkapkan map/array dinamis lama |

## Temuan yang sudah diperbaiki di compiler

Port ini memunculkan empat bug emitter yang tidak tertangkap conformance lama:

1. Python punya function scope saja: dua `match` arm yang mengikat nama sama,
   atau `let` di arm bersaudara, adalah redefinisi di bawah `mypy --strict`.
   Sekarang lokal di-alpha-rename per blok.
2. Method bernama `int`/`str`/`bool`/`float` menutupi tipe bawaan di dalam body
   class; method bernama `lt` menutupi alias runtime. Anotasi primitif
   dikualifikasi bila tertutup, dan runtime di-import sebagai `_lt`.
3. Go menandai setiap binding `match` sebagai terpakai, sehingga binding yang
   tidak dipakai menjadi error `declared and not used`. Sekarang dicek per arm.
4. Emisi Go tidak lolos `gofmt` untuk struct kosong, blok import kosong, urutan
   import, dan newline akhir file.

Ditambah satu kasus conformance baru: `tests/conformance/emitter_edges.lt`.
