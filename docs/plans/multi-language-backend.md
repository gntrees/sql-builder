# Plan: Multi-Language Backend (Language Backend Registry)

Status: draft
Branch: `multi-language-backend` (dibuat di `gntrees-method-chain` dan `gntrees-sql-builder`)

## 1. Tujuan

Mendukung N bahasa target (TypeScript, C, lalu Go, Rust, PHP, Java, dst.) dari **satu**
definisi project, tanpa duplikasi N× pada permukaan yang sering berubah.

## 2. Masalah

Ada dua permukaan yang sering berubah:

- **Permukaan A — API fluent / model builder** (`col`, `table`, `select`, `struct`,
  bentuk `chain`/`argument`). Digenerate oleh `method-chain`.
- **Permukaan B — model input custom function `parse`** (node kind baru, bentuk
  `chain.values`). Dibaca oleh body `parse`.

Kondisi `method-chain` saat ini **bespoke per bahasa** (dispatch `if/else` hardcoded),
bukan registry:

- `core/core.types.ts` — `LanguageType = "typescript" | "c"`
- `core/core.ts` — `generateProject`: `if (language === "c") { ... } else { typescript }`
- `core/convert/convert.ts` — `if (target == "c") ... if (target == "typescript") ...`
- `core/core-c.ts` — `generateCSingleHeader`, `stringifyCStruct`
- `core/convert/convert-c.ts` — `convertSchemaToC`
- `core/core-typescript.ts` — `generateTypeScriptContent`
- `core/lingua-tungga/lingua-tungga-implementation.ts` — `LANGUAGE_KEYS = ["typescript","c"]`,
  `OPERATORS`, `MANIPULATIONS` (tiap entri punya arm `typescript` & `c`)
- `core/utils.ts` — `prettierContent` hanya mengenal `c` dan `typescript`
- `core/base/**` — runtime library per bahasa (C: `base-utils.{h,c}`, `base-types.h`, `cJSON`)

Implikasi:

- Body `parse` ditulis manual per bahasa (raw) → perubahan permukaan B = **N× edit**.
- Generator bespoke per bahasa → perubahan permukaan A = **N× edit**.

Kombinasi keduanya = kasus terburuk untuk target 10 bahasa dengan perubahan sering.

## 3. Arsitektur target: tiga lapisan

| Lapisan | Isi | Frekuensi ideal |
|---|---|---|
| **L1** | Deskripsi algoritma/struktur (satu kali) | 1× |
| **L2** | Lowering/emitter per bahasa | N×, tapi kecil & mekanis |
| **L3** | Runtime library per bahasa | N×, memang diperlukan builder |

Kunci: pindahkan kerja dari L1 (yang sering berubah) ke L2/L3 (yang jarang berubah dan
mekanis). Perubahan permukaan A/B cukup sekali di L1.

## 4. Interface (draft)

`method-chain`:

```ts
export type LanguageType = string; // diperluas dari registry, bukan union hardcoded

export interface LanguageBackend {
  key: LanguageType;

  /** Nama file output untuk project ini, mis. ["index.ts"] atau ["<name>.h"] */
  fileNames(project: ProjectType): string[];

  /** File runtime yang di-copy apa adanya, mis. cJSON, base-utils */
  runtimeFiles(): Record<string, string>;

  /** Generate seluruh struktur (model + API fluent) */
  emitStructure(project: ProjectType): string;

  /** Generate body custom function/variable (dari string netral) */
  emitCustomBody?(body: string, kind: "function" | "variable"): string;

  /** Tabel operator/manipulasi untuk L1 (menggantikan OPERATORS/MANIPULATIONS hardcoded) */
  operators: Record<string, string>;
  manipulations: Record<string, (args: Record<string, string>) => string>;

  /** Formatter, mis. prettier untuk TS */
  format(code: string): string;
}
```

Registry:

```ts
const BACKENDS: Record<LanguageType, LanguageBackend> = {
  typescript: tsBackend,
  c: cBackend,
  // go: goBackend, ...
};
```

`generateProject`, `convert`, dan implementasi Lingua Tungga semuanya **membaca registry
ini** — bukan `if/else`.

## 5. Fase implementasi

### Fase 0 — Baseline (branch + hijau)
- Buat branch di kedua repo. **Selesai.**
- Jalankan test kedua repo, rekam baseline (output generated + hasil test).
- Catat alur konsumsi: `method-chain` build → publish verdaccio → install di `sql-builder`.

### Fase 1 — Registry + migrasi C/TS (behavior-preserving)
- Definisikan `LanguageBackend` + registry.
- Pindahkan `generateCSingleHeader` / `generateTypeScriptContent` / converter ke backend
  masing-masing.
- Ganti dispatch `if/else` di `generateProject` dan `convert` → iterasi registry.
- Perluas `LanguageType` dari key registry (tetap kompatibel dengan union lama sementara).
- **Gate:** output generated **byte-for-byte identik** + semua test hijau.

### Fase 2 — Unifikasi tabel Lingua Tungga
- `LANGUAGE_KEYS`, `OPERATORS`, `MANIPULATIONS` → disuplai oleh backend.
- `lingua-tungga-implementation.ts` tidak lagi punya arm hardcoded; tiap backend
  menyumbang operator/manipulation-nya.
- **Gate:** regenerasi `parse` identik.

### Fase 3 — Single-source `parse` (AST kanonik + emitter)
- Definisikan **AST kanonik khusus-parse**: `if/else`, `forEach`, `while`, `call`,
  `assign`, `emitText`, `emitParam`, `localFn`, `return`, dst. (subset yang benar-benar
  dipakai `parse-body.ts`, bukan DSL ekspresi umum).
- Tulis emitter TS & C yang memetakan AST ini ke kode.
- Validasi: output == output LT saat ini.
- Alternatif: jika Fase 2 sudah membuat LT cukup general, LT bisa tetap dipakai dan
  Fase ini di-skip. Keputusan di Fase 2.
- **Gate:** `parse-differential` + golden hijau.

### Fase 4 — Bahasa ke-3 (Go) sebagai bukti
- Implement backend Go: runtime lib + `emitStructure` + manipulation arms.
- **Ukur** besar entri backend sebenarnya (target: ratusan baris, bukan generator penuh).
- **Gate:** conformance suite Go == TS/C untuk korpus yang sama.

## 6. Conformance suite sebagai "spec"

- Perluas `tests/parse-differential.test.ts` menjadi **N-bahasa**: satu korpus kasus,
  semua bahasa harus menghasilkan `{ sql, sqlWithParam, param[] }` identik.
- Refresh ke SQLite/DB nyata (sudah ada di `tests/db`) bisa menjadi gate tambahan.
- Inilah kontrak tunggal untuk Permukaan B — bukan kode, bukan DSL.

## 7. Non-goals

- Tidak mengubah perilaku `parse` yang sudah ada.
- Tidak mengganti runtime C (`base-utils.{h,c}`, `cJSON`) yang sudah jalan.
- Tidak memaksa semua bahasa punya idiom identik; perbedaan idiomatik ditangani di L2.

## 8. Verifikasi per fase

| Fase | Gate minimal |
|---|---|
| 0 | test hijau di kedua repo; baseline output direkam |
| 1 | `generated/**` identik byte-for-byte; test hijau |
| 2 | regenerasi `parse` identik; test hijau |
| 3 | `parse-differential` (TS↔C) + golden hijau |
| 4 | conformance 3 bahasa hijau |

Perintah: `bun run generate` + `bun test tests/ --parallel=1` (sql-builder);
`bun test tests/` (method-chain).

## 9. Keputusan terbuka

1. **Lokasi AST kanonik (Fase 3):** di `method-chain` (dipakai ulang) atau di
   `sql-builder` (khusus parse)? Rekomendasi: `method-chain`, agar bisa dipakai custom
   function lain di masa depan.
2. **`LanguageType`:** tetap union tertutup (compile-time safety) atau `string` (registry
   terbuka)? Rekomendasi: union diperluas manual untuk 2–3 bahasa berikutnya, evaluasi
   lagi saat >5.
3. **Cakupan Fase 2 vs 3:** apakah LT digeneralisasi (Fase 2) atau diganti AST sempit
   (Fase 3)? Tergantung seberapa sering primitif *baru* (bukan pemakaian baru) muncul.
4. **Urutan bahasa ke-3:** Go (GC, statis) vs Rust (ownership) vs PHP (dinamis). Go
   biasanya paling murah untuk membuktikan abstraksi; Rust paling menantang model memori.

## 10. Catatan alur kerja dua repo

- Ubah `core/**` di `gntrees-method-chain` → `bun run build` → publish ke verdaccio
  (`bun run publish:local`) → install ulang di `gntrees-sql-builder` → `bun run generate`.
- Untuk iterasi cepat, pertimbangkan link lokal (`bun link`) agar tidak publish tiap kali.
- Working tree `method-chain` saat branch dibuat sudah punya perubahan belum di-commit
  (test case terhapus/dimodifikasi) — **jangan** revert; bukan bagian dari plan ini.

## 11. Baseline (Fase 0) — hasil

Direkam: branch `multi-language-backend`, bun `1.4.2`, `@gntrees/method-chain` `0.0.6`.

**Generator idempoten:** `bun run generate` menghasilkan output **byte-for-byte identik**.
Hash referensi (gate Fase 1):

| File | sha256 |
|---|---|
| `generated/gntrees-sql-builder/c/cJSON.c` | `607e756460fa0de37d20a7a9181f2de29c97bfb7ce5a0e6c2f548243836cd852` |
| `generated/gntrees-sql-builder/c/cJSON.h` | `25b0145150d500498e4d209cec69c18c42cf818bffcc54690be3b895a2a16dee` |
| `generated/gntrees-sql-builder/c/gntrees-sql-builder.h` | `10518ed3c62e441a6eb2b6cab706528289eaf337f0746d1ad6e02ba6a331cf66` |
| `generated/gntrees-sql-builder/typescript/index.ts` | `02c5aaa420382f7929c77557c17d6bbca25c35cfb169e5db79805cf5c1bde058` |

**Tes:**

| Repo | Perintah | Hasil |
|---|---|---|
| gntrees-sql-builder | `bun test tests/ --parallel=1` | 98 pass, 53 skip, 0 fail (222s) |
| gntrees-method-chain | `bun test tests/` | 196 pass, 0 fail (28s) |

Catatan: 53 skip di sql-builder = tes DB (butuh `DB_TESTS=1` + docker; docker tersedia di
lingkungan ini bila ingin dijalankan terpisah).

## 12. Fase 1 — hasil

Selesai pada branch `multi-language-backend` (perubahan di `gntrees-method-chain`).

**Perubahan:**

- Baru: `core/backends/types.ts` (`interface LanguageBackend`), `core/backends/typescript.ts`,
  `core/backends/c.ts`, `core/backends/registry.ts` (`createBackends`).
- `core/core.ts`: dispatch `if (language === "c") ... else ...` di `generateProject` diganti
  iterasi registry; penyalinan `cJSON` dipindah ke `backend.extraFiles()`.
- Pemuatan file `base/` **tetap** di `core/core.ts` (bukan di `core/backends/*`) agar lookup
  `new URL("./base/", import.meta.url)` benar di mode source maupun dist bundle.
- `LanguageType` **tidak** dilebarkan; `convert`/`convertSchemaToC` **tidak** disentuh;
  tabel LT **tidak** disentuh (menunggu Fase 2).

**Gate:**

| Gate | Hasil |
|---|---|
| Output example-project method-chain byte-for-byte | identik (hash `tests/gntrees-method-chain/**` tak berubah) |
| Output sql-builder byte-for-byte (via build lokal dist) | identik dengan hash Fase 0 |
| `bun test tests/` method-chain | 196 pass, 0 fail |
| `bunx tsc --noEmit` method-chain | bersih |

Catatan verifikasi: gate sql-builder dilakukan dengan menaruh build lokal
`../gntrees-method-chain/dist` ke `node_modules/@gntrees/method-chain/dist` sementara (di-backup
lalu di-restore); tanpa publish ke verdaccio.

## 13. Fase 2 — temuan & re-scope (perlu keputusan)

Saat mulai Fase 2, ditemukan bahwa scope "unifikasi tabel LT" **under-estimate**. Hardcoding
bahasa di LT bukan hanya `LANGUAGE_KEYS`/`OPERATORS`/`MANIPULATIONS`:

- `core/lingua-tungga/lingua-tungga-implementation.ts` (901 baris) memuat **120 literal
  `typescript:` dan 119 literal `c:`**.
- Tipe inti `ExpressionRecord = Record<LanguageType, string>`,
  `StatementsRecord = Record<LanguageType, string[]>`, `VariablesRecord` dipakai di ~7 tempat.
- Control-flow (`if`/`elseIf`/`else`/`while`/`forEach`/`forCounter`/`return`/`throwError`/
  `freeCVariables`), value rendering, operator, dan manipulasi **semua** membangun pasangan
  `{ typescript, c }` secara inline.

Kesimpulan: memindahkan 3 tabel saja **tidak** membuat LT language-agnostic. Yang membuatnya
agnostik adalah mengganti `Record<LanguageType, string>` menjadi `Record<string, string>`
yang di-key oleh bahasa terdaftar, plus sebuah **emitter per bahasa** yang menyuplai seluruh
sintaks spesifik bahasa.

**Opsi:**

- **2a** — pindahkan 3 tabel ke modul terpisah (kecil, nilai rendah, churn).
- **2b** — generalisasi internal LT lewat `LtEmitter` per bahasa. **`src/parse-body.ts` di
  sql-builder TIDAK berubah** (tetap pakai API LT yang sama), dan langsung membuka N bahasa.
- **Fase 3** — ganti LT dengan AST sempit + emitter; `parse-body.ts` ditulis ulang.

**Rekomendasi: 2b** — karena mempertahankan single-source `parse-body.ts` sekaligus membuka N
bahasa. Sketsa `LtEmitter` (per bahasa):

```ts
export interface LtEmitter {
    readonly language: LanguageType;
    // ekspresi
    valueEqual(l: string, r: string): string;
    valueNotEqual(l: string, r: string): string;
    truthy(v: string): string;
    toString(v: string): string;
    member(v: string, path: string): string;
    operators: Record<string, string>;              // add: "+", equal: "=="
    manipulations: Record<string, (...args: string[]) => string>;
    // statement
    ifHeader(cond: string): string;
    elseIfHeader(cond: string): string;
    elseHeader(): string;
    whileHeader(cond: string): string;
    forHeader(init: string, cond: string, update: string): string;
    forEach(arrayExpr: string, varName: string, bodyLines: string[]): string[];
    returnExpr(expr: string): string[];
    returnVoid(): string[];
    throwError(msg: string): string[];
    freeVariables(): string[];
    declareVar(name: string, value: string): string;
    assignVar(name: string, value: string): string;
    // + primitif container (buffer/list/map/array) yang saat ini ada di MANIPULATIONS
}
```

Status: **diputuskan 2b, sudah dieksekusi — lihat §14.**

## 14. Fase 2b — hasil

Selesai pada branch `multi-language-backend` (perubahan di `gntrees-method-chain`).

**Perubahan:**

- Baru: `core/lingua-tungga/lingua-tungga-emitter.ts` — `interface LtEmitter`, `tsEmitter`,
  `cEmitter`, `createEmitters()`, plus `escapeCString`/`indentLines` yang dipindah ke sini.
  Semua sintaks spesifik bahasa (`if`/`while`/`for` header, `forEach` expansion, `return`,
  `throwError`, literal, operator, manipulasi, deklarasi variabel/fungsi, `autoFree`) hidup
  di sini.
- Ditulis ulang: `core/lingua-tungga/lingua-tungga-implementation.ts` — sekarang agnostik
  bahasa. `ExpressionRecord`/`StatementsRecord`/`VariablesRecord` = `Record<string, ...>` yang
  di-key bahasa terdaftar; `LANGUAGE_KEYS` diturunkan dari registry emitter; arity operator/
  manipulasi jadi tabel bersama.
- **`src/parse-body.ts` di sql-builder tidak tersentuh** (single-source tetap utuh).

**Gate:**

| Gate | Hasil |
|---|---|
| Output example-project method-chain byte-for-byte | identik |
| Output sql-builder byte-for-byte (via build lokal dist) | identik dengan hash Fase 0 |
| `bun test tests/` method-chain | 196 pass, 0 fail |
| `bun test tests/ --parallel=1` sql-builder | 98 pass, 53 skip, 0 fail |
| `bunx tsc --noEmit` method-chain | bersih |

**Dampak:** menambah bahasa sekarang = menambah **satu entri `LtEmitter`** + backend
(`LanguageBackend`) dari Fase 1, tanpa menyentuh algoritma LT maupun `parse-body.ts`.

**Catatan jujur:** `LtEmitter` adalah permukaan porting yang cukup besar (puluhan method)
— itu memang harga dari DSL LT yang kaya. Untuk bahasa berikutnya, ukur berapa besar emitter
sebenarnya sebelum memutuskan strategi bahasa ke-4+.

## 15. Fase 4 — spike Go (hasil & pengukuran)

Tujuan: mengukur biaya menambah sebuah bahasa.

**Artefak (branch `multi-language-backend`, method-chain):**

- `core/lingua-tungga/lingua-tungga-go-emitter.ts` — SPIKE, `LtEmitter` untuk Go (140 LOC).
- `generateWith(schema, emitters)` — hook DI di implementation (untuk test/spike; `generate`
  tetap default).
- `tests/spike-go-emitter.test.ts` — merender satu program LT ke TS/C/Go.

**Temuan #1 (perluasan interface):** rendering operator dipindah dari algoritma ke emitter
(`operatorExpression(name, arity, operands)`), karena Go (`interface{}`) tidak bisa memakai
simbol `+`. `buildOperatorExpression` kini mendelegasikan ke emitter.

**Gate:** method-chain 197 pass (196 + spike), output method-chain & sql-builder byte-for-byte
identik.

**Pengukuran:**

| Item | Ukuran |
|---|---|
| `LtEmitter` method | **33** |
| `tsEmitter` / `cEmitter` | ~49 / ~75 LOC |
| `goEmitter` (baru) | **140 LOC** |
| backend TS (model/API) | 256 LOC |
| backend C (model/API) | 643 + 202 (`convert-c`) LOC |
| runtime C (`base-utils`/`base-types`) | ~2590 LOC |
| primitif runtime (`lt_*`) | **63** |
| entri tabel operator/manipulasi | 171 |

**Temuan #2 (penting): emitter saja TIDAK cukup.** Output Go dari spike **tidak valid Go**
karena algoritma masih meng-hardcode struktur:

1. Block chaining menghasilkan `}\nelse {` — Go mensyaratkan `} else {` satu baris.
2. `localFunction` menghasilkan `func name(...) {}` nested — di Go harus closure.

Keduanya ada di algoritma (`renderBlock`, `addLocalFunction`), bukan di emitter. Jadi menambah
bahasa bisa memaksa **perubahan struktur algoritma LT** — dan itu menyentuh *semua* bahasa.

**Kesimpulan biaya 1 bahasa ≈** emitter (~140 LOC) + backend model/API (~250–650 LOC) +
runtime bahasa target (C ≈ 2600 LOC; Go/Java/PHP perlu runtime sendiri) + potensi perluasan
algoritma. Yang terakhir inilah yang membuat "10 bahasa" mahal: tiap bahasa baru **bukan
sekadar satu entri emitter**.

**Rekomendasi:** sebelum bahasa ke-4, ekstrak `blockChaining` / `localFunctionDeclaration` /
statement-terminator ke emitter, lalu ulangi spike untuk bahasa yang benar-benar berbeda
(mis. Rust) guna mengungkap friksi berikutnya.

## 16. Fase 4b — ekstraksi blockChaining & localFunction (hasil)

Menindaklanjuti temuan #2 di atas: struktur yang tadinya di-hardcode di algoritma dipindah ke
emitter.

**Perubahan:**

- `LtEmitter.appendBlock(statements, header, bodyLines)` — baru. TS/C men-*push* blok biasa;
  Go menggabungkan `else`/`else if` ke `}` statement sebelumnya menjadi `} else {`.
  `renderBlock` di algoritma digantikan `addBlock` yang mendelegasikan ke emitter.
- `goEmitter.localFunction` → closure (`name := func(...)`) alih-alih deklarasi nested.

**Output Go sekarang (struktur valid):**

```go
var count = lt.Number(5)
if (lt.ValueEquals(count, lt.Number(5))) {
  use(lt.ToUpper(lt.String("start")));
} else {
  panic(lt.String("nope"))
}
for _, item := range lt.Array(lt.String("a"), lt.String("b")) {
  use(item);
}
helper := func(value lt.Value) lt.Value {
  return lt.Get(lt.Map(lt.Entry("k", lt.Number(1))), "k");
}
use(helper(count));
return lt.StrConcat(lt.String("total="), lt.ToString(count));
```

**Gate:** method-chain 197 pass; output method-chain **dan** sql-builder byte-for-byte identik.

**Batasan:** tidak ada toolchain Go di lingkungan ini, jadi validasi bersifat **struktural**
(assertion `} else {`, closure, dll) — **bukan** kompilasi. Kompilasi Go baru bisa diuji setelah
backend Go + runtime `lt` ada.

**Kesimpulan yang diperbarui:** setelah 4a+4b, output Go valid secara struktur. Namun biaya
sebenarnya sebuah bahasa tetap = emitter + backend model/API + runtime target; dan tiap bahasa
yang idiomnya berbeda (Rust ownership, Go `} else {`) berpotensi memaksa perluasan emitter
(yang menyentuh semua bahasa). Ini menegaskan: strategi emitter layak, tapi biayanya nyata dan
bukan "satu entri" — jadi evaluasi Rust sebagai probe berikutnya sebelum komit ke 10 bahasa.

## 17. Fase 4c — probe Rust (hasil)

- Baru: `core/lingua-tungga/lingua-tungga-rust-emitter.ts` — SPIKE, `LtEmitter` untuk Rust
  (144 LOC).
- Spike test kini merender satu program LT ke **TS/C/Go/Rust** lewat algoritma yang sama.

**Output Rust (struktur valid):**

```rust
let mut count = lt::number(5);
if (lt::value_equals(&count, &lt::number(5))) {
  use(lt::to_upper(&lt::string("start")));
}
else {
  panic!("{}", lt::to_string(&lt::string("nope")));
}
for item in lt::array(vec![lt::string("a"), lt::string("b")]).iter() {
  use(item);
}
let helper = |value: lt::Value| -> lt::Value {
  return lt::get(&lt::map(vec![("k", lt::number(1))]), "k");
};
use(helper(count));
return lt::str_concat(&lt::string("total="), &lt::to_string(&count));
```

**Friksi baru yang diungkap Rust** (yang tidak muncul di TS/C/Go):

1. **Dinamis tanpa `any`** — butuh enum `lt::Value`; ekspresi jadi `lt::X(...)`.
2. **Borrowing eksplisit** — arg read-only harus `&x`; C memakai copy by-value implisit.
   Emitter harus tahu mana yang di-borrow vs move vs clone.
3. **Mutability** — `let mut` wajib untuk variabel yang nanti di-`set`; emitter tidak tahu di
   muka, jadi harus selalu `let mut` (menimbulkan warning) atau algoritma harus mengirim info
   mutability.
4. **Local function → closure** (seperti Go).
5. Operator tetap **native** (seperti C) karena operand-nya raw — jadi tidak perlu `lt::add`.

Kontras penting: Rust **tidak** butuh merge `} else {` (Rust mengizinkan `else` di baris baru),
berbeda dari Go. Jadi bentuk `appendBlock` berbeda per bahasa.

**Gate:** method-chain 197 pass; output method-chain byte-for-byte identik.

**Kesimpulan:** setiap bahasa yang "jauh" memunculkan kategori friksi **baru** (Go: brace/closure;
Rust: ownership/mutability). Ini menguatkan rekomendasi: jangan komit ke 10 bahasa sebelum pola
friksi stabil; kalau friksi terus bertambah, pertimbangkan **IR kanonik (Fase 3)** alih-alih
memperluas emitter terus-menerus.

## 18. Target set bahasa & analisis biaya

### Berapa banyak bahasa "paling sering digunakan"?

Bergantung metrik (TIOBE, Stack Overflow Survey, GitHub Octoverse, IEEE Spectrum, lowongan):
ribuan bahasa pernah dibuat, **~20–30 masih mainstream**, dan **~10 top-tier** di hampir semua
ranking. Daftar ~20 yang paling konsisten muncul (2024–2025):

Python, JavaScript, Java, C#, C++, TypeScript, C, Go, Rust, PHP, Kotlin, Swift, Ruby, Scala,
Dart, R, Lua, Perl, Julia, Elixir.

**Bukan target SQL-builder:** SQL (itu *output*-nya), HTML/CSS, Shell/Bash.

### Model biaya per bahasa (dari Fase 0–4c)

Tiap bahasa ≈ **emitter** (~140 LOC, 33 method) + **backend** model/API (250–650 LOC) +
**runtime** target. Untuk ~15 bahasa → puluhan ribu LOC + maintenance N× setiap API/model
berubah.

**Temuan kunci yang mengubah kalkulasi:** biaya per bahasa **jauh lebih murah untuk bahasa
dinamis/high-level** daripada statis:

- **Dinamis (Python, JavaScript, PHP, Ruby):** sudah punya tipe dinamis bawaan (dict/object/array).
  Runtime `lt_*` bisa **hampir nol** (pakai tipe native). Emitter lebih sederhana — tanpa enum
  `Value`, tanpa ownership.
- **Statis (Rust, Go, Java, C#, Kotlin, Swift, C/C++):** butuh **enum `Value` + runtime** (dan untuk
  Rust/C: model memori). Inilah yang mahal dan memunculkan friksi yang kita temukan.

### Rekomendasi target set (jangan "cover semua" sekaligus)

| Tier | Bahasa | Alasan |
|---|---|---|
| **Core** | Python, JavaScript, TypeScript*, Java, Go | paling banyak dipakai + umum di server |
| **Mudah berikutnya** | PHP, Ruby, C# | dinamis/GC → biaya rendah |
| **Mahal / opsional** | Rust, C++, Kotlin, Swift, Scala | tambah hanya bila ada permintaan nyata |

\* TypeScript sudah didukung; C juga sudah (native, meski bukan top aplikasi).

### Decision gate

Ukur **satu bahasa dinamis (Python)** dan **satu bahasa statis tersulit (Rust)** secara
end-to-end (emitter + backend + runtime + conformance test). Dua angka itu memvalidasi hipotesis
"dinamis murah vs statis mahal". Kalau benar, "cover ~10 bahasa" realistis dengan urutan:
**dinamis dulu, statis belakangan**.
