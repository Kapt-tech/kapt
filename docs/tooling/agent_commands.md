# ⚡ Kapt Agent Orchestration Commands

> **Instruction for the Agent:** Always refer to `kapt_context_skill.md` for governance and technical specs before execution.

---

## 📝 1. Create a New Issue (Planning Phase)
**Context:** Use this to draft a professional task in the Backlog based on your description. This does NOT start implementation.

**Prompt:**
"Based on the governance in `kapt_context_skill.md` and the technical rules in **[SPEC_FILE_NAME.md]**, I will describe a new feature/task. Please:

1. **Draft Issue:** Create a new Issue in the Kapt Project Kanban under the **'BACKLOG'** column.
2. **Detailed Content:** You must draft a professional body for this Issue including:
   - **Business Context:** Rules and logic (e.g., LGPD, AI Bonuses, Zero-Click Discovery).
   - **Technical Requirements:** Specific files to modify (Go/Next.js) and DB migrations if needed.
   - **Definition of Done (DoD):** A technical checklist for validation.
3. **Confirmation:** Once created, confirm the Issue number and stay in the 'BACKLOG' phase."

---

## 🚀 2. Pick up Issue #X (Execution Phase)
**Context:** Use this when you are ready to start coding a specific Issue that already exists in the Backlog.

**Prompt:**
"Please **pick up Issue #[INSERT_NUMBER]** and start implementation following this protocol:

1. **Kanban Update:** Move the Issue from 'BACKLOG' to **'IN PROGRESS'**.
2. **Git Management:** Switch to `develop` and create a branch `feat/[issue-number]-[short-description]`.
3. **Implementation:** Code the feature following the technical requirements described in the Issue and relevant specs.
4. **Pre-Review:** - Push the branch to remote and open a PR to `develop`.
   - Move the Issue to **'CODE REVIEW & QA'**.
5. **STOP & PROMPT:** Do not merge. Halt and say: 
   *'Issue #[NUMBER] is implemented and the PR is open. Please review the diff at [PR_URL]. Waiting for your approval to proceed.'*"

---

## 🏗️ 3. Promote to Staging (Integration)
**Prompt:**
"I have approved the diff for Issue #[NUMBER]. 
1. Merge the feature branch into `develop`.
2. Move the Issue to **'STAGING / UAT'** in the Kanban.
3. **STOP & PROMPT:** Ask me to perform the manual UAT (User Acceptance Testing) on the staging environment."

---

## 🏛️ 4. Release to Production (Main)
**Prompt:**
"The feature(s) for Issue #[NUMBER] passed UAT. 
1. Open a Pull Request from `develop` to `main`.
2. **STOP & PROMPT:** Wait for my explicit confirmation to merge into `main`. 
3. After my approval, perform the merge, move the Issue to **'DONE'**, and delete the feature branch."

## ⚡ 5. Fast-Track Commit (Docs & Chores Only)
**Context:** Use this for quick updates to documentation or non-functional configuration that do not require a full PR cycle.

**Prompt:**
"Categorize these changes as `docs:` or `chore:`. 
Based on the exception rule in `kapt_context_skill.md`:
1. **Commit & Push:** Commit the changes directly to the `develop` branch.
2. **Bypass PR:** Do not open a Pull Request.
3. **No Approval Needed:** Do not prompt me for diff review or merge approval.
4. **Action:** Execute the push and simply confirm when the `develop` branch has been updated."