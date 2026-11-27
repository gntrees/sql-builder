#!/usr/bin/env bash
# Full gate for the .lt implementation: emit, native checkers, differential,
# and generated-code drift.
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"

out="generated/lt-sql-builder"

./lt/build.sh

echo "== typescript =="
if [ -x node_modules/.bin/tsc ]; then
  node_modules/.bin/tsc --noEmit -p "$out/typescript/tsconfig.json"
else
  # Pinned because CI has no node_modules: the repo's install needs a private
  # registry, so the gate must not depend on it.
  npx --yes --package typescript@5.9.3 tsc --noEmit -p "$out/typescript/tsconfig.json"
fi

echo "== python =="
if [ ! -x .lt/venv/bin/python ]; then
  python3 -m venv .lt/venv
fi
.lt/venv/bin/pip -q install mypy
.lt/venv/bin/python -m mypy --strict "$out/python"

echo "== go =="
if ! command -v go >/dev/null 2>&1; then
  echo "go not found on PATH" >&2
  exit 1
fi
( cd "$out/go" && go vet ./... && test -z "$(gofmt -l .)" && go test ./... )

echo "== lt test classes =="
./lt/test.sh

echo "== differential (legacy vs .lt) =="
bun test tests/lt-differential.test.ts

echo "== drift =="
./lt/check.sh
