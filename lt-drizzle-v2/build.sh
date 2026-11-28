#!/usr/bin/env bash
# Emit the TypeScript, Python, and Go packages from the .lt v2 source.
#
#   ./lt-drizzle-v2/build.sh    write into generated/lt-drizzle-v2/
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
  elif [ -x "$root/../gntrees-lingua-tungga/target/release/lt" ]; then
    lt_bin="$root/../gntrees-lingua-tungga/target/release/lt"
  else
    echo "lt not found: put it on PATH, set LT_BIN, or build ../gntrees-lingua-tungga" >&2
    exit 1
  fi
fi

out="$root/generated/lt-drizzle-v2"
tmp="$root/.lt/out-drizzle-v2"
mkdir -p "$out"
rm -rf "$tmp"

"$lt_bin" build -t ts lt-drizzle-v2/src/index.lt --out "$tmp"
"$lt_bin" build -t py lt-drizzle-v2/src/index.lt --out "$tmp"
"$lt_bin" build -t go lt-drizzle-v2/src/index.lt --out "$tmp"

rm -rf "$out/typescript" "$out/python" "$out/go"
cp -r "$tmp/ts" "$out/typescript"
cp -r "$tmp/py" "$out/python"
cp -r "$tmp/go" "$out/go"
rm -rf "$tmp"

if command -v gofmt >/dev/null 2>&1; then
  gofmt -w "$out/go"
else
  echo "warning: gofmt not found; generated Go may fail the gofmt gate" >&2
fi

echo "wrote $out/{typescript,python,go}"
