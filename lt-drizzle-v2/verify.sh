#!/usr/bin/env bash
# Gate for the drizzle port on Lingua Tungga v2: emit, native checkers,
# differential. The database roundtrip lives in verify-db.sh.
#
# Compiler pin: v0.3.0 (`d11a4c9`), see docs/plans/drizzle-port-v2.md (V1).
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"

out="generated/lt-drizzle-v2"

./lt-drizzle-v2/build.sh

echo "== typescript =="
if [ -x node_modules/.bin/tsc ]; then
  node_modules/.bin/tsc --noEmit -p "$out/typescript/tsconfig.json"
else
  npx --yes --package typescript@5.9.3 tsc --noEmit -p "$out/typescript/tsconfig.json"
fi

echo "== python =="
if [ ! -x .lt/venv/bin/python ]; then
  python3 -m venv .lt/venv
fi
.lt/venv/bin/pip -q install mypy pytest
.lt/venv/bin/python -m mypy --strict "$out/python"

echo "== go =="
if command -v go >/dev/null 2>&1; then
  ( cd "$out/go" && go vet ./... && test -z "$(gofmt -l .)" && go test ./... )
elif [ -n "${CI:-}" ]; then
  echo "go not found on PATH" >&2
  exit 1
else
  echo "warning: go not found; skipping the Go gate locally" >&2
fi

echo "== lt test (emit all targets, run TypeScript) =="
lt_bin="${LT_BIN:-}"
if [ -z "$lt_bin" ]; then
  lt_bin="$(command -v lt || true)"
fi
if [ -z "$lt_bin" ]; then
  echo "lt not found: put it on PATH or set LT_BIN" >&2
  exit 1
fi
rm -rf .lt/test-v2
"$lt_bin" test -t ts lt-drizzle-v2/src/sql_test.lt --out .lt/test-v2 >/dev/null
"$lt_bin" test -t py lt-drizzle-v2/src/sql_test.lt --out .lt/test-v2 >/dev/null
"$lt_bin" test -t go lt-drizzle-v2/src/sql_test.lt --out .lt/test-v2 >/dev/null
(
  cd .lt/test-v2/ts
  npm install --no-audit --no-fund --silent >/dev/null
  npm test >/dev/null
)
(
  cd .lt/test-v2/py
  "$root/.lt/venv/bin/python" -m pytest -q >/dev/null
)
if command -v go >/dev/null 2>&1; then
  ( cd .lt/test-v2/go && go test ./... >/dev/null )
fi

echo "== differential (drizzle vs .lt v2) =="
bun test lt-drizzle-v2/parity/differential.test.ts
