# Schema codegen playground

Galeri statis untuk pipeline schema:

```
DMMF fixture
  -> buildSchemaIR
  -> schema.json + unsupported.json
  -> emitLt
  -> schema_*.lt packages
  -> lt check
```

Setiap kasus menampilkan:

- DMMF input
- schema IR (`schema.json`)
- `unsupported.json`
- ringkasan tabel, kolom, tipe, nullability, PK, default, enum, FK
- source LT yang di-generate

Halaman output: `schema/playground/out/index.html` (gitignored), bisa dibuka lewat
`file://`.

## Menjalankan

```sh
bun run schema:playground
```

`lt` dicari dari `LT_BIN`, sibling checkout
`../gntrees-lingua-tungga/target/release/lt`, atau `PATH`. Kalau tidak ada, halaman tetap
dibuat dengan status LT `skipped`.

Snapshot IR disimpan di `cases/**/<id>.expected.json` dan ikut di-commit.

```sh
# regenerate snapshot setelah perubahan converter yang disengaja
bun schema/playground/build.ts --update
```

`evidence.json` mencatat status IR dan `lt check` per kasus. Gate lokal:

```sh
bun run schema:playground
git diff --exit-code -- schema/playground/evidence.json
```

## Cakupan kasus

| Group | Kasus |
|---|---|
| `table` | tabel + binding accessor |
| `column` | semua tipe semantik + enum |
| `key` | composite primary key |
| `relation` | foreign key |
| `unsupported` | jsonb/array, composite unique, index |
| `schema` | schema non-public |
| `naming` | rename accessor vs nama SQL, reserved word |

Playground ini tidak menjalankan SQL atau database. Bukti SQL dan roundtrip DB tetap
ada di `lt-drizzle-v2/playground`.
