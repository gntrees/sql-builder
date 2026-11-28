#!/usr/bin/env bash
# Roundtrip gate for the v2 port: start Postgres + MySQL, apply the fixture
# DDL, and run the SQL the port generates against the real servers.
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"

./lt-drizzle-v2/build.sh

cleanup() {
  docker compose -f docker-compose.test.yml down -v >/dev/null 2>&1 || true
}
trap cleanup EXIT

docker compose -f docker-compose.test.yml up -d --wait postgres mysql
docker compose -f docker-compose.test.yml run --rm migrate-postgres >/dev/null
docker compose -f docker-compose.test.yml run --rm migrate-mysql >/dev/null
DB_TESTS=1 bun test lt-drizzle-v2/parity/db.test.ts lt-drizzle-v2/parity/schema-integration.test.ts
