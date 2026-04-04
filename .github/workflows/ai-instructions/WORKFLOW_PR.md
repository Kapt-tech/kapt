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
   - Run `gh pr create` to open a Pull Request.
   - **Title:** Match the Issue title or the commit message.
   - **Body:** **CRITICAL:** You MUST include the string "Closes #[ID]" in the body. This is required by the `move-to-ready.yml` action to trigger the automatic Kanban transition to 'Done'.

6. **Fork Sync (MANDATORY after every push):**
   - After every push to `upstream` (Kapt-tech/kapt), ALWAYS also push to `origin` (antonioroque200OK/kapt):

     ```bash
     git push origin <branch-name>
     ```

   - **CRITICAL:** Explicitly confirm to the user with the message:
     > ✅ Both repos are in sync — `Kapt-tech/kapt` and `antonioroque200OK/kapt` are identical at `<commit-hash>`.

7. **Action:**
   - Execute the entire flow autonomously.
   - Do not ask for confirmation on titles, syncs, or branch names.
   - Report the final PR URL to the user.

8. **Post-Merge Cleanup (MANDATORY):**
   - When the user confirms the PR has been merged into `develop`, autonomously delete the branch to maintain a clean slate.
   - Switch back to the base branch: `git checkout develop`
   - Delete the local branch: `git branch -D <branch-name>`
   - Delete the remote forks: `git push origin --delete <branch-name>` and `git push upstream --delete <branch-name>`
