#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPO="${CI_REPO:-Kapt-tech/kapt}"
SHA="${CI_SHA:-$(git -C "${ROOT_DIR}" rev-parse HEAD)}"
MODE="${1:-status}"

if ! command -v gh >/dev/null 2>&1; then
  echo "GitHub CLI (gh) is required."
  exit 1
fi

echo "Repo:   ${REPO}"
echo "Commit: ${SHA}"
echo

RUNS_JSON="$(gh run list \
  --repo "${REPO}" \
  --commit "${SHA}" \
  --limit 10 \
  --json databaseId,workflowName,status,conclusion,url,createdAt)"

RUN_COUNT="$(printf '%s' "${RUNS_JSON}" | node -e 'const fs=require("fs"); const input=fs.readFileSync(0,"utf8"); const runs=JSON.parse(input); process.stdout.write(String(runs.length));')"

if [ "${RUN_COUNT}" = "0" ]; then
  echo "No workflow runs found for this commit yet."
  echo "If you just pushed, wait a few seconds and run this again."
  exit 0
fi

printf '%s' "${RUNS_JSON}" | node -e '
const fs = require("fs");
const runs = JSON.parse(fs.readFileSync(0, "utf8"));
for (const run of runs) {
  const conclusion = run.conclusion ? ` / ${run.conclusion}` : "";
  console.log(`${run.workflowName}: ${run.status}${conclusion}`);
  console.log(`${run.url}`);
  console.log("");
}
'

if [ "${MODE}" = "--watch" ] || [ "${MODE}" = "watch" ]; then
  RUN_ID="$(printf '%s' "${RUNS_JSON}" | node -e '
const fs = require("fs");
const runs = JSON.parse(fs.readFileSync(0, "utf8"));
const preferred = runs.find((run) => run.workflowName === "CI") ?? runs[0];
process.stdout.write(String(preferred?.databaseId ?? ""));
')"

  if [ -z "${RUN_ID}" ]; then
    echo "Could not determine a workflow run to watch."
    exit 1
  fi

  echo "Watching run ${RUN_ID}..."
  gh run watch "${RUN_ID}" --repo "${REPO}" --compact --exit-status
fi
