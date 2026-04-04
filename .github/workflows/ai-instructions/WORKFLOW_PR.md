# Workflow: Autonomous PR, Sync & Kanban Update

When the user signals completion of a task or mentions an Issue ID, proceed IMMEDIATELY with this synchronized flow:

1. **Pre-Work Sync (Keep Repos Equal):**
   - Before branching, run `gh repo sync antonioroque200OK/kapt` to sync the fork with the upstream repository via GitHub API.
   - Run `git checkout develop` followed by `git pull origin develop` to ensure the local environment is identical to the newly synced fork.

2. **Branching:**
   - Create a new branch named `feature/issue-[ID]` or `fix/issue-[ID]` based on the updated `develop`.

3. **Staging & Commit:**
   - Stage all changes (`git add .`).
   - Generate a commit message following 'Conventional Commits' (e.g., `feat: implement photographer login`).

4. **Push:**
   - Push the branch to the remote fork: `git push origin feature/issue-[ID]`.

5. **PR Execution:**
   - Run `gh pr create --base develop` to open a Pull Request targeting `develop`.
   - **Title:** Match the Issue title or the commit message.
   - **Body:** **CRITICAL:** You MUST include the string "Closes #[ID]" in the body. This is required by the `move-to-ready.yml` action to trigger the automatic Kanban transition to 'Done'.

6. **Autonomous Merge & CI Trigger (MANDATORY):**
   - Immediately after creating the PR, merge it autonomously via `gh pr merge <PR_NUMBER> --merge --admin --delete-branch`.
   - Inform the user that the PR has been merged automatically into `develop` and that this has triggered the GitHub Actions CI in the background.

7. **Fork Sync (MANDATORY after every push):**
   - After every push to `upstream` (Kapt-tech/kapt), ALWAYS also push to `origin` (antonioroque200OK/kapt):

     ```bash
     git push origin <branch-name>
     ```

   - **CRITICAL:** Explicitly confirm to the user with the message:
     > ✅ Both repos are in sync — `Kapt-tech/kapt` and `antonioroque200OK/kapt` are identical at `<commit-hash>`.

8. **Action:**
   - Execute the entire flow autonomously.
   - Do not ask for confirmation on titles, syncs, or branch names.
   - Report the final PR URL and the CI trigger status to the user.
