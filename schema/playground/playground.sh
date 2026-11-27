#!/usr/bin/env bash
# Build the schema codegen playground locally. This is intentionally not wired
# into the automatic CI jobs: it is static and cheap, but still a developer
# artifact.
set -euo pipefail

root="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$root"

bun schema/playground/build.ts "$@"
