# `lt/` — sql-builder dalam Lingua Tungga

Eksperimen: mengganti generator 15-bahasa dengan sumber tunggal `.lt` untuk
tiga target yang benar-benar dipakai — TypeScript, Python, Go.

Status: **slice 1**. Yang sudah ada: pemodelan nilai, AST bertipe, renderer
Postgres + MySQL, dan query builder untuk `select`/`from`/`where`/`order by`/
`limit`/`offset`/`raw`.

## Perintah

```sh
./lt/build.sh    # emit ke generated/lt-sql-builder/{typescript,python,go}
./lt/verify.sh   # build + tsc + mypy --strict + go vet/gofmt/test + differential
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

## Gate

Slice 1 dianggap selesai bila, untuk dialek Postgres:

- `tsc --strict` bersih pada paket TypeScript,
- `mypy --strict` bersih pada paket Python,
- `go vet` bersih, `gofmt -l` kosong, `go test` hijau pada paket Go,
- setiap kasus di `tests/lt-differential.test.ts` menghasilkan `sql`, `param`,
  dan `sqlWithParam` yang identik dengan implementasi legacy,
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
