# AGENTS.md — gntrees-sql-builder

## [PERF] Jangan jalankan full test suite (`bun test tests/`)

Full suite **lambat (~9 menit)** karena gate lintas-bahasa mengompilasi program `parse` yang
di-generate (~2.500 baris) dengan compiler asli (swift/kotlin/rust/cpp/dotnet/docker).
**Jalankan hanya file test yang relevan dengan perubahan.**

| Perubahan pada | Jalankan |
|---|---|
| `src/parse-body.ts` (umum, lintas bahasa) | `bun test tests/parse.test.ts tests/parse-c.test.ts` |
| satu bahasa saja (mis. Go) | `bun test tests/go-parse.test.ts` |
| TypeScript saja | `bun test tests/parse.test.ts` |
| generator/project (`*.project.ts`) | test yang relevan + `bun run generate` |
| DB/SQL nyata | `bun test tests/db/...` (butuh DB) |

Jalankan `bun test tests/ --parallel=1` (full) **hanya bila diminta eksplisit atau sebelum rilis**.

Catatan: test gate otomatis **skip (cepat)** bila toolchain tidak ada (`swiftc`, `kotlinc`,
`dotnet`, image Docker). Karena itu durasi suite bergantung lingkungan.

## [PERF] Flag kompilasi di test gate: jangan pakai optimasi

Test gate hanya butuh **output yang benar**, bukan binary cepat. Pakai `-O0` (g++), `-Onone`
(swiftc), atau tanpa `-O` (rustc). Menambahkan `-O`/`-O1` membuat kompilasi jauh lebih lambat
(mis. `rust-parse` 67s → 4s setelah `-O` dihapus).

## Umum

- Jalankan `bunx tsc --noEmit` sebelum menyelesaikan perubahan TypeScript.
- Jangan commit `generated/` yang berubah hanya karena artefak build (`*.class`, `__pycache__`).
