#!/usr/bin/env bash
set -euo pipefail

if command -v yamllint >/dev/null 2>&1; then
  yamllint -c .yamllint .
  exit 0
fi

if command -v python3 >/dev/null 2>&1; then
  if python3 - <<'PY' >/dev/null 2>&1
import yamllint  # noqa: F401
PY
  then
    python3 -m yamllint -c .yamllint .
    exit 0
  fi
fi

echo "yamllint is not installed. Install it or run: pip install yamllint" >&2
exit 1
