# ⚡ Kapt Agent Orchestration Commands

> **Instruction for the Agent:** Always refer to `kapt_context_skill.md` for governance and `docs/specification/` for technical rules before executing these commands.

---

## 🚀 1. Pick up a New Issue
**Context:** Use this to start a task from the Kanban board. It automates branch creation and status tracking.

**Prompt:**
"Based on the governance in `kapt_context_skill.md`, please **pick up Issue #[INSERT_NUMBER]**. 

Follow this protocol strictly:
1. **Kanban:** Move the Issue to **'IN PROGRESS'**.
2. **Git:** Switch to `develop` and create a branch `feat/[issue-number]-[short-description]`.
3. **Implement:** Build the feature following the relevant `tech-*.md` specs.
4. **Pre-Review:** - Push the branch to remote.
   - Open a Pull Request (PR) targeting the `develop` branch.
   - Move the Issue to **'CODE REVIEW & QA'**.
5. **STOP & PROMPT:** Do not merge. Halt all actions and say: 
   *'PR created for Issue #[NUMBER]. Please review the diff at [PR_URL]. Waiting for your approval to proceed with the merge to develop.'*"

---

## 🧪 2. Validate CI Pipeline (Chaos Test)
**Context:** Use this to verify if your CI/CD automation is actually catching errors.

**Prompt:**
"I want to test our CI pipeline. 
1. Create a temporary branch `debug/test-ci-fail`.
2. Propose a change to the Go backend that intentionally breaks the build or fails a linter rule (e.g., an unused variable or a syntax error).
3. Open a PR to `develop` and check if the CI pipeline correctly identifies and flags the error. 
4. Report the result and wait for my instruction to close the PR."

---

## 🏗️ 3. Promote to Staging (Integration)
**Context:** Use this after you have manually approved the PR diff and want to move to the UAT phase.

**Prompt:**
"I have approved the diff for Issue #[NUMBER]. 
1. Merge the feature branch into `develop`.
2. Move the Issue to **'STAGING / UAT'** in the Kanban.
3. If a deployment trigger exists, confirm the Staging URL is ready.
4. **STOP & PROMPT:** Ask me to perform the manual UAT (User Acceptance Testing) on the staging environment."

---

## 🏛️ 4. Release to Production (Main)
**Context:** Use this only when the feature is 100% validated in Staging and ready for the 'Sacred Solo'.

**Prompt:**
"The feature(s) for Issue #[NUMBER] passed UAT. 
1. Open a Pull Request from `develop` to `main`.
2. **STOP & PROMPT:** Wait for my explicit confirmation to merge into `main`. 
3. After my approval, perform the merge, move the Issue to **'DONE'**, and delete the used feature/develop branches if applicable."