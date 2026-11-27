#!/usr/bin/env bash
# Gate for the drizzle port: emit, TypeScript check, differential.
#
# The pinned compiler is documented in docs/plans/drizzle-port.md (K20).
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"

out="generated/lt-drizzle"

./lt-drizzle/build.sh

echo "== typescript =="
if [ -x node_modules/.bin/tsc ]; then
  node_modules/.bin/tsc --noEmit -p "$out/typescript/tsconfig.json"
else
  # Same fallback as lt/verify.sh: CI must not depend on a private registry.
  npx --yes --package typescript@5.9.3 tsc --noEmit -p "$out/typescript/tsconfig.json"
fi

echo "== differential (drizzle vs .lt) =="
bun test lt-drizzle/parity/differential.test.ts
