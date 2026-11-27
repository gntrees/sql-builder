#!/usr/bin/env bash
# Emit and run the `.lt` test classes on all three targets.
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

out="$root/.lt/test-out"
rm -rf "$out"
mkdir -p "$out"

for target in ts py go; do
  "$lt_bin" test -t "$target" lt/query_test.lt --out "$out" >/dev/null
done

echo "== typescript =="
(
  cd "$out/ts"
  if [ ! -d node_modules ]; then
    npm install --no-audit --no-fund --silent >/dev/null
  fi
  ./node_modules/.bin/tsc --noEmit -p tsconfig.json
  ./node_modules/.bin/vitest run
)

echo "== python =="
if [ ! -x "$root/.lt/venv/bin/python" ]; then
  python3 -m venv "$root/.lt/venv"
fi
"$root/.lt/venv/bin/pip" -q install pytest mypy
"$root/.lt/venv/bin/python" -m mypy --strict "$out/py"
"$root/.lt/venv/bin/python" -m pytest -q "$out/py"

echo "== go =="
if ! command -v go >/dev/null 2>&1; then
  echo "go not found on PATH" >&2
  exit 1
fi
( cd "$out/go" && gofmt -w . && go vet ./... && go test ./... )
