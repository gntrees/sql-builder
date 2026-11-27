#!/usr/bin/env bash
# Playground gate: stage, run on three targets, compare with drizzle, render,
# and fail if the committed evidence is stale.
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"

./lt-drizzle-v2/build.sh

cleanup() {
  docker compose -f docker-compose.test.yml down -v >/dev/null 2>&1 || true
}
trap cleanup EXIT
docker compose -f docker-compose.test.yml up -d --wait postgres mysql

DB_TESTS=1 bun lt-drizzle-v2/playground/build.ts

echo "== evidence is current =="
if ! git diff --exit-code -- lt-drizzle-v2/playground/evidence.json lt-drizzle-v2/playground/usage.json; then
  echo "playground: evidence/usage changed; commit the regenerated files" >&2
  exit 1
fi
