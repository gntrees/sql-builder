#!/usr/bin/env bash
# Roundtrip gate: start Postgres + MySQL, apply the fixture DDL, and run the
# SQL the port generates against the real servers.
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"

./lt-drizzle/build.sh

cleanup() {
  docker compose -f docker-compose.test.yml down -v >/dev/null 2>&1 || true
}
trap cleanup EXIT

docker compose -f docker-compose.test.yml up -d --wait postgres mysql
DB_TESTS=1 bun test lt-drizzle/parity/db.test.ts
