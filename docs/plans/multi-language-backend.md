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

## 19. Fase 4d — Rust decision gate (end-to-end, difokuskan ke custom function)

Fokus sesuai keputusan: **hanya custom function `parse`** (bukan seluruh model/API tiap bahasa).
Tujuannya membuktikan bahwa jalur LT→bahasa statis **benar-benar bisa dikompilasi & dijalankan**,
bukan sekadar "terlihat valid" seperti probe Fase 4c.

**Artefak (branch `multi-language-backend`, method-chain):**

- `core/lingua-tungga/lingua-tungga-rust-emitter.ts` — emitter Rust nyata (**181 LOC**),
  dipromosikan dari spike. Menyandikan strategi ownership:
  manipulasi read-only → `&arg` (borrow), mutator (`bufferAppend`, `listPush`) → move-in/move-out
  (cocok dengan idiom algoritma `name = op(name, ...)`), konstruktor → `lt::x()`.
- `core/lingua-tungga/runtime/lt.rs` — runtime Rust `lt` (**482 LOC**): enum `Value` +
  primitif (string/array/map/buffer/list/operator bantu). Ini "biaya runtime" bahasa statis.
- `tests/rust-e2e.test.ts` — **gate end-to-end**: satu program LT → render ke TS **dan** Rust →
  transpile+jalankan TS sebagai referensi → `rustc --edition 2021` kompilasi → jalankan →
  **assert stdout Rust == output TS** (`ABC42`). Ini pertama kali jalur ini lolos kompilasi.

**Gate:**

| Gate | Hasil |
|---|---|
| Rust dikompilasi `rustc` | **status 0** (lolos) |
| Output runtime Rust == output TS | **identik** (`ABC42`) |
| `bun test tests/` method-chain | **199 pass, 0 fail** (197 + 2 baru) |
| Output sql-builder byte-for-byte | **identik** (verify hash, build lokal + swap dist) |
| `bun test tests/ --parallel=1` sql-builder | 98 pass, 53 skip, 0 fail |
| `bunx tsc --noEmit` method-chain | bersih |

**Friksi baru yang HANYA muncul saat benar-benar dikompilasi** (di atas temuan Fase 4c):

1. **`forCounter` tidak punya padanan di Rust.** Algoritma meng-hardcode header C-style
   `for (init; cond; update)`; Rust hanya punya `for … in` dan `loop`. Ini di **algoritma**, jadi
   memperbaikinya menyentuh *semua* bahasa → butuh hook emitter (seperti `appendBlock` di Fase 4b).
2. **`localFunction` yang memutasi variabel luar tidak bisa jadi closure Rust.** Pola
   `pushSql`/`pushW` di `parse-body.ts` (`setVariable("sql", bufAppend("sql", …))` di dalam local
   function) menuntut capture `&mut` — tidak ada tanpa `RefCell`. Ini bukan sekadar emitter.
3. **Literal integer ≠ float.** `lt::number(0)` gagal E0308; runtime harus generik
   `number<N: Into<f64>>`. Halus tapi memblokir kompilasi.
4. **`Value` tidak iterable.** `forEach` harus lewat `lt::array_items(&v)` (spike memakai
   `expr.iter()`, yang tidak pernah bisa dikompilasi — jadi probe 4c sebenarnya menyesatkan).
5. **Paren `if (...)` di-hardcode di algoritma** → warning `unused_parens` di Rust.
6. **Entri bahasa yang hilang tidak error.** Record `{ typescript, c }` untuk bahasa ke-3 diam-diam
   dirender jadi literal `undefined` (bukan throw). Footgun nyata saat mem-port `parse-body.ts`.

**Permukaan port `parse-body.ts` untuk Rust (terukur):**

- 1 `addStatements` preamble + 3 `addVariable` + 1 `addStatements` bridge = **6 record per-bahasa**
  yang harus diberi entri `rust`.
- `cPreamble` (**~99 baris** raw C) + `cBridge` (**~37 baris**) harus ditulis ulang sebagai
  `rustPreamble`/`rustBridge` — dan bridge-nya bergantung pada **model Rust** (builder/chain/arg).
- Body `parse` yang di-generate ≈ **2.585 baris** (C header 5.605 − mulai `parse_impl` di L3.020);
  model + runtime C sisanya ≈ **3.020 baris**.

**Biaya 1 bahasa statis (terukur + estimasi):**

| Komponen | LOC |
|---|---|
| `rustEmitter` | 181 (vs Go 151, C ~75) |
| runtime `lt.rs` | 482 |
| tes conformance end-to-end | 148 |
| per-bahasa raw di `parse-body` (preamble+bridge) | ~137 (C) → perlu versi Rust |
| model/API bahasa target | ~3.000 (dari C) — **belum dibangun untuk Rust** |

**Keputusan:**

- Untuk **custom function `parse`**, jalur LT→Rust **terbukti bekerja** (kompilasi + output sama)
  hanya dengan emitter + runtime — **tanpa** menyentuh `parse-body.ts` untuk subset yang diuji.
- Tetapi port **lengkap** `parse-body` ke Rust menuntut **3 hal non-emitter**: (a) perbaikan
  algoritma untuk `forCounter` + capture mutable, (b) menulis ulang preamble/bridge per-bahasa,
  (c) membangun model Rust (~3k LOC). Inilah biaya sesungguhnya bahasa statis.
- **Konfirmasi hipotesis:** dinamis murah (native dict/list/str, runtime ≈ nol), statis mahal
  (enum `Value` + runtime + ownership). Urutan tetap: **dinamis dulu, statis belakangan**.
- **Rust/Go/C++/Kotlin/Swift: tunda** sampai ada permintaan nyata, dan kerjakan hanya bersama
  **Fase 3 (IR kanonik)** — karena `parse-body.ts` ternyata hanya ~90% netral: preamble/bridge-nya
  per-bahasa raw, dan beberapa konstruk memaksa perubahan algoritma yang menyentuh semua bahasa.
- **Langkah berikutnya yang benar:** spike **Python** (bahasa dinamis) untuk mengonfirmasi angka
  "murah", lalu putuskan roadmap. Bahasa dinamis tidak butuh `Value` enum maupun bridge ownership.

## 20. Fase 4e — Python decision gate (end-to-end) + putusan akhir

Pasangan dari Fase 4d: bahasa **dinamis**. Program LT yang *sama* dirender ke Python, dijalankan
`python3`, dan outputnya dibandingkan dengan TS.

**Artefak (branch `multi-language-backend`, method-chain):**

- `core/lingua-tungga/lingua-tungga-python-emitter.ts` — emitter Python (**154 LOC**). Karena
  Python berbasis indentasi, blok + `elif`/`else`/`def` dirender di emitter (bukan algoritma).
- `core/lingua-tungga/runtime/lt.py` — runtime mini (**102 LOC**) **hanya** untuk tempat di mana
  semantik JS beda dari Python: `truthy` kontainer kosong, `obj[key]`→`None` (bukan `KeyError`),
  `String(x)` vs `str(x)`, arg-order `join`.
- `tests/python-e2e.test.ts` — **2 gate**: (a) program parity dgn gate Rust (`ABC42`);
  (b) program dict/`objGet`/`objHas`/`elif`/`truthy` (`v5`).

**Gate:**

| Gate | Hasil |
|---|---|
| `python3` jalankan output emitter | **status 0** |
| Output runtime Python == output TS | **identik** (`ABC42`, `v5`) |
| `bun test tests/` method-chain | **201 pass, 0 fail** (199 + 2 baru) |
| Output sql-builder byte-for-byte | **identik** (verifikasi hash, build lokal + swap dist) |
| `bunx tsc --noEmit` | bersih |

**Friksi baru untuk bahasa dinamis (jauh lebih ringan dari statis):**

1. **Blok indentasi + `elif`.** `else if (cond)` harus jadi `elif (cond)`; blok dirender di emitter
   (kelas yang sama dengan `} else {` Go).
2. **Semantik JS tembus.** Perlu runtime kecil: `[]`/`{}` truthy di JS tapi falsy di Python;
   `obj[key]` harus `None` saat missing; `String(x)` ≠ `str(x)` untuk `None`/bool/kontainer.
3. **Idiom buffer tak bisa in-place.** `(a.push(b), a)` tidak valid di Python → dipakai
   `a + [b]` (benar, tapi O(n²)); ini konsekuensi idiom `name = op(name, ...)`.
4. **Algoritma meng-hardcode `;`** (di `setVariable`/`addExpressionStatements`/`returnRaw`) → Python
   dapat `;` ekor non-idiomatik (`return v.upper();`). Kelas sama dengan `if (...)` yang di-hardcode
   — **algoritma masih bocorkan sintaks keluarga-C**. Kosmetik, tapi nyata untuk output rapi.

**Perbandingan biaya (terukur):**

| Komponen | **Python (dinamis)** | **Rust (statis)** |
|---|---|---|
| emitter | 154 LOC | 181 LOC |
| runtime | **102 LOC** (`lt.py`) | **482 LOC** (`lt.rs`) |
| enum `Value` / ownership | **tidak ada** | wajib |
| friksi pemblokir di algoritma | tidak ada | `forCounter`, closure-capture |
| model/API bahasa target | ~0 (tipe native) | ~3.000 LOC (dari C) |

**Putusan akhir decision gate (hipotesis TERKONFIRMASI):**

- Bahasa **dinamis ≈ 2,5–4× lebih murah** dari statis, **dan** tidak memunculkan friksi yang
  memaksa perubahan algoritma (yang selalu menyentuh *semua* bahasa). Total Python ≈ **256 LOC**;
  Rust ≈ **663 LOC + ~3k model**.
- **Roadmap yang direkomendasikan:**
  1. **Gelombang 1 (dinamis — murah & seragam):** Python, JavaScript, PHP, Ruby. Semuanya mirip
     Python (tipe native + runtime mini); tidak butuh `Value` enum.
  2. **Gelombang 2 (statis GC):** C#, Java, Go — butuh `Value` + runtime, tapi tanpa ownership.
  3. **Gelombang 3 (statis ownership):** Rust, C++ — hanya bila ada permintaan nyata, dan sebaiknya
     bersama **Fase 3 (IR kanonik)**, karena tuntutannya menembus algoritma.
- **Prasyarat lintas gelombang:** pindahkan sisa sintaks yang masih di-hardcode algoritma
  (terminator `;`, paren `if (...)`) ke emitter — satu perubahan kecil yang membereskan Python
  *dan* bahasa berikutnya sekaligus.
- **Catatan single-source:** `parse-body.ts` tetap ~90% netral; preamble/bridge-nya per-bahasa raw.
  Untuk Gelombang 1 preamble/bridge Python juga perlu ditulis, tapi tanpa model memori.

## 21. Fase 5 — sintaks terakhir keluar dari algoritma (prasyarat)

Sebelum menambah bahasa gelombang berikutnya, sisa sintaks keluarga-C yang masih di-hardcode
**algoritma** dipindah ke emitter, sehingga bahasa berikutnya tidak menyentuh algoritma lagi:

- **5a:** `statementTerminator` + `ifHeader`/`elseIfHeader`/`elseHeader`/`whileHeader`/`forHeader`
  + `incrementCounter` (menggantikan `;`, `if (...)`, `while (...)`, `for (;;)`, `break;`,
  `continue;`, `x++` yang tadinya literal di `lingua-tungga-implementation.ts`).
- **5b:** `variableReference` + `assignment` (untuk bahasa bersigil, mis. PHP `$x`).

**Gate:** output TS/C **byte-for-byte identik**; method-chain hijau; tsc bersih. Python memakai
ini untuk `elif` + tanpa `;`; Rust/Python men-*throw* untuk `forCounter` (tak didukung).

## 22. Fase 6 — Gelombang 1: JavaScript, PHP, Ruby (dinamis)

Tiga emitter dinamis, dijalankan **nyata** (bukan struktural), output == referensi TypeScript
(`ABC42`):

| Bahasa | Emitter | Runtime | Dijalankan dengan |
|---|---|---|---|
| JavaScript | **15 LOC** (varian tipis `tsEmitter`, tanpa anotasi tipe) | **0** (native JS) | `node` |
| PHP | 180 LOC | 128 LOC (`lt.php`) | `docker php:8.3-cli-alpine` |
| Ruby | 180 LOC | 95 LOC (`lt.rb`) | `docker ruby:3.3-alpine` |

**Gate:** method-chain **206 pass, 0 fail**; output sql-builder byte-for-byte identik; tsc bersih.

**Friksi baru yang diungkap:**

1. **PHP: closure tak bisa dipanggil dengan nama bare.** `$label = function(){}; label();` fatal —
   algoritma men-*render* `callFunction` sebagai `label(...)`. Solusi: *nested named function*
   (sama seperti Python/JS).
2. **Ruby: blok ber-`end` + rantai `if/elsif/else` berbagi satu `end`.** `appendBlock`
   menggabungkan header lanjutan (`elsif`/`else`) ke statement sebelumnya (trik sama seperti Go).
3. **Ruby: lambda tak bisa dipanggil bare** (`label(...)` selalu pemanggilan method) → dipakai
   `->(){} ` + `define_singleton_method` agar pemanggilan bare tetap resolve sekaligus menjaga
   closure.

## 23. Fase 7 — port custom function `parse` ke Python (fokus custom function)

Sesuai fokus ("hanya custom function"), yang diport adalah **pola `parse`**, bukan seluruh API:

- `index.ts` kini mengekspor `createEmitters`, `generateWith`, dan **semua emitter** sebagai API
  publik — jadi proyek hilir bisa menambahkan bahasa tanpa mengubah registry default.
- `tests/python-parse-e2e.test.ts` mereplikasi **bentuk** `parse-body.ts` — *preamble* per-bahasa
  (`addStatements({typescript, c, python})`), record *variable* per-bahasa, dan *bridge* per-bahasa
  — lalu menjalankan versi TypeScript **dan** Python pada schema yang sama; keduanya menghasilkan
  `xyz`.

**Temuan penting:** untuk *host* dinamis, preamble/bridge **nyaris kosong** (`root = self.get_schema()`
/ `return {"sql": lt.buf_str(out)}`) karena data host sudah dinamis — beda dengan C/Rust yang harus
mem-*marshal* struct statis. Ini menegaskan biaya port custom function ke Python jauh lebih murah.

**Sengaja TIDAK dilakukan (dan alasannya):**

- **`createEmitters()` tetap ts+c.** Menambah Python ke registry default akan mengubah `generate()`
  untuk semua konsumen dan memecah 63 assertion di `lingua-tungga.test.ts`. Sebagai gantinya
  disediakan `generateWith` + emitter ter-ekspor (opt-in).
- **Backend Python penuh belum dibuat.** Fluent API + model Python = mem-port `base-utils`
  (~1.000 LOC) + generator — di luar cakupan "custom function saja" dan sesi ini. Ini pekerjaan
  berikutnya bila ingin `generateProject` menghasilkan file Python utuh.
- **`parse-body.ts` di sql-builder belum diubah.** Ia mengonsumsi method-chain versi npm; memakai
  `generateWith`/`pythonEmitter` baru butuh rilis method-chain (alur dua repo). Perubahan yang
  diperlukan: 6 record per-bahasa diberi entri `python` + `pythonPreamble`/`pythonBridge`, dan
  `sqlBuilderParseBody` di-*render* via `generateWith({typescript, c, python})`.

## 24. Ringkasan status bahasa

| Bahasa | Emitter | Runtime | Terbukti jalan | Catatan |
|---|---|---|---|---|
| TypeScript | ✅ (default) | base-utils | ✅ | asli |
| C | ✅ (default) | ~2.6k LOC | ✅ | asli |
| Python | ✅ 154 | 102 | ✅ `python3` | port custom function siap |
| JavaScript | ✅ 15 | 0 | ✅ `node` | varian TS |
| PHP | ✅ 180 | 128 | ✅ docker | sigil `$` |
| Ruby | ✅ 180 | 95 | ✅ docker | blok `end` |
| Go | ✅ 151 | — | struktural | spike |
| Rust | ✅ 181 | 482 | ✅ `rustc` | butuh model + algoritma |

**Rekomendasi akhir:** Gelombang 1 (dinamis) **selesai & terverifikasi**. Berikutnya: (1) backend
Python penuh bila ingin output `generateProject` Python, atau (2) Gelombang 2 (C#/Java/Go) yang
membutuhkan `Value` enum + runtime (tanpa ownership).

## 25. Fase 8 — backend Python penuh (`generateProject`)

Melengkapi Fase 7: kini `generateProject` bisa menghasilkan **modul Python utuh** (model + fluent
API), bukan hanya body custom function.

**Artefak (branch `multi-language-backend`, method-chain):**

| File | LOC | Isi |
|---|---|---|
| `core/base/python/base-utils.py` | 306 | port runtime TS: `create_schema`, `create_property_call_schema`, `normalize_argument`, `validate_schema`, `make_copy`, `apply_copies` |
| `core/core-python.ts` | 337 | generator (class, method fluent, `@property`, `customFunction.body.python`, init function, escaping keyword) |
| `core/backends/python.ts` | 22 | entri `LanguageBackend` |
| `tests/python-backend.test.ts` | 198 | parity TS↔Python |
| wiring | — | `core.ts` (load base), `registry.ts`, `LanguageType += "python"` |

**Gate:**

| Gate | Hasil |
|---|---|
| Test parity: schema TS == schema Python (deep-equal) untuk query sama | **lolos** |
| Property access + `copy()` + custom function (`qb:hi`) | **lolos** |
| `bun test tests/` method-chain | **207 pass, 0 fail** |
| Output sql-builder TS/C byte-for-byte | **identik** |
| `bunx tsc --noEmit` | bersih |

**Temuan:** `from`/`with`/`in`/`and`/`or`/`not`/`as` adalah keyword Python → method yang di-generate
mendapat akhiran `_` (`from_`, `with_`, …), sementara nama di schema tetap asli. Ini friksi khas
bahasa yang **tidak muncul** di TS/C.

**Biaya total Python (terukur):** emitter 154 + runtime LT 102 + base-utils 306 + generator 337 +
backend 22 ≈ **~920 LOC** — semuanya tanpa `Value` enum maupun model memori. Bandingkan Rust:
~663 LOC emitter+runtime **+ ~3.000 LOC model** yang belum dibangun.

**Sisa satu langkah untuk Python end-to-end di sql-builder:** `parse-body.ts` (sql-builder) masih
mengonsumsi method-chain versi npm. Untuk mengaktifkan Python di sana: (1) rilis method-chain,
(2) beri entri `python` pada 6 record per-bahasa di `parse-body.ts` + `pythonPreamble`/`pythonBridge`,
(3) tambah `python` ke `languages`/`beforeScript`/`importPaths` di `sql-builder.project.ts`. Body
`parse` Python sendiri sudah terbukti jalan (Fase 7).

## 26. Fase 9 — `parse` Python end-to-end di sql-builder

Ini penutup rangkaian: `parse` yang ditulis **sekali** di `src/parse-body.ts` kini di-generate dan
**dijalankan** untuk Python di repo sql-builder, dengan output identik TypeScript.

**Alur rilis dua repo (akhirnya dipakai):** verdaccio lokal (`docker compose up -d registry`) →
`bun run publish:local` → method-chain `0.0.7`/`0.0.8`/`0.0.9` → sql-builder `bun install`
(`bunfig.toml` sudah me-route `@gntrees` ke `localhost:4873`).

**Perubahan method-chain:**

- **9a — `nonlocal`:** `LtEmitter.localFunction` menerima daftar variabel *enclosing*; algoritma
  meneruskannya; `pythonEmitter` men-*emit* `nonlocal a, b, …`. Tanpa ini, local function yang
  memutasi buffer luar (`pushSql`/`pushW`) **tidak akan** mengubah buffer (Python membuat variabel
  lokal baru) → output salah. Ini analog `nonlocal` dari closure JS / nested function C.
- **9b — `lt.py` ikut dikirim:** `lt.py` dipindah ke `core/base/python/` (agar ikut `cp` ke `dist`),
  dan backend Python menambahkannya sebagai `extraFiles`; modul Python yang di-generate men-*emit*
  `import lt`.

**Perubahan sql-builder:**

- `src/parse-body.ts`: `pythonPreamble` (`root = self.get_schema()`) + `pythonBridge` + entri
  `python` pada 3 record variabel & 2 record `addStatements`; di-render via
  `generateWith({ ...createEmitters(), python: pythonEmitter })`.
- `src/sql-builder.project.ts`: `languages += "python"`, `beforeScript.python`, `body.python`,
  `return.python = "dict"`.
- `tests/python-parse.test.ts`: membangun query **sama** di TS dan Python, membandingkan
  `parse()` untuk **9 kasus** (select/where/order/and/or/not/in/isNull/between/insert/update).

**Gate:**

| Gate | Hasil |
|---|---|
| `parse()` Python == TS (9 kasus) | **identik** |
| Output sql-builder TS/C byte-for-byte | **identik** |
| sql-builder `bun test --parallel=1` | **99 pass, 53 skip, 0 fail** |
| method-chain `bun test tests/` | 207 pass, 0 fail |

**Temuan:** untuk host dinamis, preamble/bridge `parse` **nyaris kosong** (data host sudah dict),
**tetapi** `localFunction` yang memutasi variabel luar tetap butuh perluasan emitter+algoritma
(`nonlocal`) — jadi bahkan bahasa "mudah" pun bisa menuntut perubahan algoritma kecil. Ini
melembutkan kesimpulan Fase 4e: dinamis lebih murah, **bukan** berarti nol perubahan struktural.

**Status:** `parse` kini benar-benar berjalan untuk **TypeScript, C, dan Python** dari satu sumber.

## 27. Fase 10 — JavaScript end-to-end (backend + `parse`)

Melengkapi Gelombang 1 dengan bahasa dinamis kedua yang jalan penuh: JavaScript.

**Artefak method-chain:**

| File | LOC | Isi |
|---|---|---|
| `core/base/javascript/base-utils.js` | 287 | port runtime tanpa tipe (`createSchema`/`normalizeArgument`/… ) |
| `core/core-javascript.ts` | 222 | generator JS murni (class, method fluent, `get`, custom function) |
| `core/backends/javascript.ts` | 22 | entri backend |
| `tests/javascript-backend.test.ts` | 157 | parity TS↔JS |

**Kunci:** JS **tidak butuh runtime `lt` sama sekali** — manipulasi LT di emitter TS/JS sudah
native (`+`, `.toUpperCase()`, `obj[key]`, `!!x`, `String(x)`). Jadi backend JS lebih murah dari
Python (tak ada `lt.py` untuk dikirim).

**sql-builder:** `parse-body.ts` diberi `javascript` preamble (`const root = this.getSchema();`),
record variabel (`[]`), dan bridge (memakai ulang `tsBridge` — sudah JS valid); config
`languages += "javascript"`.

**Gate:**

| Gate | Hasil |
|---|---|
| `parse()` JS == TS (9 kasus) | **identik** |
| Output sql-builder TS/C byte-for-byte | **identik** |
| sql-builder `bun test --parallel=1` | **100 pass, 53 skip, 0 fail** |
| method-chain `bun test tests/` | 208 pass, 0 fail |

**Status akhir:** `parse` berjalan untuk **TypeScript, C, Python, JavaScript** dari satu sumber
(`src/parse-body.ts`). Backend penuh: TS, C, Python, JS. Emitter siap (belum backend): Go, Rust, PHP, Ruby.

## 28. Fase 11 — PHP + Ruby end-to-end: **Gelombang 1 selesai**

Backend PHP dan Ruby, lalu `parse` di-wire untuk keduanya.

**Backend (method-chain):**

| Bahasa | Generator | Runtime | Backend |
|---|---|---|---|
| PHP | `core-php.ts` | `base/php/{base-types,base-utils,lt}.php` | `backends/php.ts` |
| Ruby | `core-ruby.ts` (350) | `base/ruby/{base-types,base-utils,lt}.rb` (273) | `backends/ruby.ts` |

**Temuan penting — "dinamis murah" bukan berarti bebas biaya:**

1. **PHP tidak mewarisi scope.** Nested `function` PHP tidak melihat `$sql` induknya, dan closure tak bisa
dipanggil dengan nama bare. Solusinya butuh **perubahan algoritma**: hook `localFunctionCall` (PHP: `$name(...)`)
+ capture list (variabel + fungsi saudara + diri sendiri) sehingga PHP men-*emit*
`$name = function(...) use (&$sql, ...) {...};`. Ini analog `nonlocal` Python, tetapi **lebih berat**.
2. **Ruby tak punya `continue`** (pakai `next`) → hook `breakStatement`/`continueStatement` (keluaran dari
hardcode di algoritma). Ruby sendiri aman karena lambda menangkap scope.
3. **PHP array ambigu list vs map.** Runtime PHP harus pakai `array_is_list` untuk membedakan `array<T>`
dan `map<T>` (kalau tidak: "matches multiple types in the union").

**Gate:**

| Gate | Hasil |
|---|---|
| `parse()` PHP == TS (9 kasus) | **identik** |
| `parse()` Ruby == TS (9 kasus) | **identik** |
| Output sql-builder TS/C byte-for-byte | **identik** |
| sql-builder `bun test --parallel=1` | **102 pass, 53 skip, 0 fail** |
| method-chain `bun test tests/` | 210 pass, 0 fail |

**Status akhir Gelombang 1 — `parse` berjalan dari satu sumber `src/parse-body.ts`:**

| Bahasa | Emitter | Backend | `parse` jalan |
|---|---|---|---|
| TypeScript | ✅ | ✅ | ✅ |
| C | ✅ | ✅ | ✅ |
| Python | ✅ | ✅ | ✅ |
| JavaScript | ✅ | ✅ | ✅ |
| Ruby | ✅ | ✅ | ✅ |
| PHP | ✅ | ✅ | ✅ |
| Go / Rust | ✅ | — | — |

**Pelajaran:** biaya per bahasa **bukan** sekadar "dinamis vs statis". PHP (dinamis) lebih mahal dari Ruby
karena semantik scope-nya memaksa perluasan algoritma. Urutan realistis: **Python/JS/Ruby (paling murah) →
PHP → bahasa statis**. Emitter Go/Rust sudah ada untuk Gelombang berikutnya.

## 29. Fase 12 — Gelombang 2 dimulai: Java end-to-end (**statis GC, tanpa `Value` enum**)

Gelombang 2 = bahasa statis ber-GC (Go, Java, C#). Java dikerjakan lebih dulu karena toolchain-nya
tersedia lokal (`javac` 17), sehingga verifikasi tidak bergantung jaringan/Docker.

**Temuan kunci — "statis" ≠ "butuh enum `Value`".**
Rust butuh enum `Value` + model ownership karena **tidak** punya tipe dinamis. Tetapi Go/Java/C#
semuanya punya *top type* (`any`/`Object`). Jadi untuk bahasa-bahasa ini, "LT Value" cukup `Object`
(skema = `Map<String,Object>` / `List<Object>` / `String` / `Double` / `Boolean` / `null`) dan
runtime-nya sekadar helper statis. Ini menurunkan biaya Gelombang 2 mendekati bahasa dinamis, jauh di
bawah perkiraan §18.

**Dua masalah khas Java (bukan milik Rust/Python) — keduanya di emitter, tanpa mengubah algoritma:**

1. **Lexical capture.** Local function LT menangkap dan *memutasi* variabel luar, sedangkan lambda
   Java hanya boleh menangkap variabel *effectively final*. Solusi: **setiap variabel LT di-`box`** ke
   array satu-elemen (`Object[] sql = new Object[]{ ... }`); baca → `sql[0]`, tulis → `sql[0] = ...`.
   Referensi holder tidak pernah berubah, sehingga lambda bisa menangkapnya dan tetap memutasi isinya.
2. **Forward reference.** Local function LT boleh saling memanggil sebelum definisi teksnya (dan
   rekursif); Java melarang merujuk variabel lokal yang belum dideklarasikan. Solusi: local function
   disimpan di satu `Map<String, Lt.Fn> __fns` yang dideklarasikan program LT di preamble. Lookup
   terjadi saat pemanggilan, jadi urutan dan rekursi aman.

**Artefak method-chain (branch `multi-language-backend`):**

| File | LOC | Isi |
|---|---|---|
| `core/lingua-tungga/lingua-tungga-java-emitter.ts` | ~175 | emitter Java (boxing + `__fns` + `Lt.*`) |
| `core/base/java/lt.java` | ~330 | runtime `Lt` berbasis `Object` + `interface Fn` |
| `core/base/java/base-utils.java` | ~330 | port runtime method-chain (Map/List) |
| `core/base/java/base-types.java` | ~10 | `interface Structure` |
| `core/core-java.ts` | ~300 | generator `generateProject` |
| `core/backends/java.ts` | ~25 | entri backend |
| `tests/java-e2e.test.ts` | ~140 | gate LT→Java (compile+run == TS) |
| `tests/java-backend.test.ts` | ~230 | parity schema/property/copy/customFunction |

**Gate:**

| Gate | Hasil |
|---|---|
| `java gate`: LT→Java compile + run == TS (`ABC42`) | **identik** |
| `java backend`: schema/property/`copy()`/customFunction == TS | **identik** |
| `java parse` (sql-builder): `parse()` Java == TS (9 kasus) | **identik** |
| method-chain `bun test tests/` | **212 pass, 0 fail** |
| sql-builder `bun test --parallel=1` | **103 pass, 53 skip, 0 fail** |
| `bunx tsc --noEmit` | bersih |

**Friksi baru (dan perbaikannya):**

1. **`and`/`or`/`not` harus `boolean`.** Di TS `(a || b)` bisa langsung dipakai di `if`; di Java
   `Object` tidak. Runtime Java mengembalikan `boolean` (aman karena LT hanya memakainya sebagai
   kondisi). Emitter lain tidak terpengaruh.
2. **Nested `forEach` tidak boleh menamai variabel lokal sama.** Java melarang *shadowing* variabel
   lokal blok luar (beda dari C). Temporer loop dinamai per variabel (`__arr_<name>` / `__i_<name>`).
3. **`else` boleh di baris baru setelah `}`** — jadi `if {...}` lalu `else {...}` (dua push terpisah)
   tetap valid, seperti TS/C.
4. **Kode mati ditolak Java.** `renderNodes` di `parse-body.ts` punya `returnRaw(NULL_EXPR())` setelah
   `if/else` yang kedua cabangnya sudah `return` → *unreachable statement* di Java. Ini kode mati di
   **semua** bahasa; `returnRaw` terakhir dihapus (satu baris) — perilaku identik, output TS/C berubah
   hanya karena satu `return null;` mati hilang. Ini mengubah invariant dev "byte-for-byte TS/C",
   tetapi semua tes hasil-parse lintas bahasa tetap lolos.
5. **`Lt.java` dikirim sebagai `extraFiles`** seperti `lt.py`/`lt.rb`; `index.java` berisi kelas
   package-private (tanpa kelas `public`) sehingga nama file tak harus sama dengan kelas.

**Biaya terukur Java:** emitter ~175 + runtime ~330 + base-utils ~330 + generator ~300 + backend 25
≈ **~1.160 LOC** — tanpa enum `Value`, tanpa ownership, tanpa perubahan algoritma (kecuali satu
penghapusan kode mati di sumber LT). Bandingkan Rust (~663 + ~3.000 model).

**Status Gelombang 2:** Java **selesai & terverifikasi end-to-end**. Berikutnya: **Go** (emitter sudah
ada, tinggal runtime + backend; butuh toolchain/Docker) dan **C#** (perlu runtime + backend; butuh
`.NET`/Docker).

**Status akhir `parse` dari satu sumber `src/parse-body.ts`:**

| Bahasa | Emitter | Backend | `parse` jalan |
|---|---|---|---|
| TypeScript | ✅ | ✅ | ✅ |
| C | ✅ | ✅ | ✅ |
| Python | ✅ | ✅ | ✅ |
| JavaScript | ✅ | ✅ | ✅ |
| Ruby | ✅ | ✅ | ✅ |
| PHP | ✅ | ✅ | ✅ |
| Java | ✅ | ✅ | ✅ |
| Go / Rust | ✅ | — | — |
