#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "== Repo Root =="
echo "${ROOT_DIR}"
echo

echo "== docs/specification/ =="
if [ -d "${ROOT_DIR}/docs/specification" ]; then
  ls -la "${ROOT_DIR}/docs/specification"
else
  echo "(missing) ${ROOT_DIR}/docs/specification"
fi
echo

echo "== CLAUDE.md =="
if [ -f "${ROOT_DIR}/CLAUDE.md" ]; then
  sed -n '1,200p' "${ROOT_DIR}/CLAUDE.md"
else
  echo "(missing) ${ROOT_DIR}/CLAUDE.md"
fi
echo

echo "== docs/PRD-Executivo.md =="
if [ -f "${ROOT_DIR}/docs/PRD-Executivo.md" ]; then
  sed -n '1,200p' "${ROOT_DIR}/docs/PRD-Executivo.md"
else
  echo "(missing) ${ROOT_DIR}/docs/PRD-Executivo.md"
fi
