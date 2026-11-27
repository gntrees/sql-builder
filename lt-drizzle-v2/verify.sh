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
.lt/venv/bin/pip -q install mypy
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

echo "== differential (drizzle vs .lt v2) =="
bun test lt-drizzle-v2/parity/differential.test.ts
