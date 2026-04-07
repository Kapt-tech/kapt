# Workflow: CI Guardrails & Maintenance

When modifying code or asked to ensure CI is active, follow the rules defined in `.github/workflows/ci.yml`:

1. **Monorepo Awareness:**
   - **Backend:** Located in `services/`. Always run `go vet ./...` and `go build ./...` inside this folder to validate changes.
   - **Frontend:** Located in `apps/web/`. Ensure `npm run lint` and `npm run build` pass before suggesting a PR.
2. **Maintenance:** If asked to update the CI logic, edit `.github/workflows/ci.yml` directly.
3. **CI Failure Recovery:** If a push or PR fails the GitHub Actions CI, autonomously analyze the logs and apply the necessary fix to the code.
4. **Action:** Act as the guardian of the build status. Never skip validation steps.
