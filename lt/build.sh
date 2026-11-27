#!/usr/bin/env bash
# Emit the TypeScript, Python, and Go packages from the .lt source.
#
#   ./lt/build.sh          write into generated/
#   ./lt/check.sh          build, then fail if the committed output differs
#
# `lt` is resolved from PATH, then from the repository-local .lt/bin/lt.
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"

lt_bin="${LT_BIN:-}"
if [ -z "$lt_bin" ]; then
  if command -v lt >/dev/null 2>&1; then
    lt_bin="$(command -v lt)"
  elif [ -x "$root/.lt/bin/lt" ]; then
    lt_bin="$root/.lt/bin/lt"
  else
    echo "lt not found: put it on PATH or set LT_BIN" >&2
    exit 1
  fi
fi

out="$root/generated/lt-sql-builder"
tmp="$root/.lt/out"
mkdir -p "$out"
rm -rf "$tmp"

"$lt_bin" build -t ts lt/src/index.lt --out "$tmp"
"$lt_bin" build -t py lt/src/index.lt --out "$tmp"
"$lt_bin" build -t go lt/src/index.lt --out "$tmp"

# `lt build` writes <out>/<target>; the committed layout uses the full language
# names, so the import paths match what the legacy generator produced.
rm -rf "$out/typescript" "$out/python" "$out/go"
cp -r "$tmp/ts" "$out/typescript"
cp -r "$tmp/py" "$out/python"
cp -r "$tmp/go" "$out/go"
rm -rf "$tmp"

# gofmt normalizes struct-field alignment and call-argument spacing. The
# emitter does not try to reproduce gofmt byte for byte; the package is
# formatted here, and CI checks that `gofmt -l` stays empty.
if command -v gofmt >/dev/null 2>&1; then
  gofmt -w "$out/go"
else
  echo "warning: gofmt not found; generated Go may fail the gofmt gate" >&2
fi

echo "wrote $out/{typescript,python,go}"
