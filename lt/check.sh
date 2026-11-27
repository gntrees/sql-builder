#!/usr/bin/env bash
# Fails when the committed generated packages are not what the .lt source
# produces. Run in CI and before review.
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"

./lt/build.sh

if ! git diff --quiet -- generated/lt-sql-builder/typescript generated/lt-sql-builder/python generated/lt-sql-builder/go; then
  echo "generated output is stale; run ./lt/build.sh and commit the result" >&2
  git diff --stat -- generated/lt-sql-builder/typescript generated/lt-sql-builder/python generated/lt-sql-builder/go >&2
  exit 1
fi

echo "generated output matches lt/src"
