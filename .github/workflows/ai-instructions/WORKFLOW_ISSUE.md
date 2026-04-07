# Workflow: Proactive Issue Creation

When the user describes a feature, bug, or task, execute these steps IMMEDIATELY without asking for confirmation:

1. **Analysis:** Analyze the user's input and autonomously generate:
   - A professional **Title** following the format: "feat: [Feature Name]" or "fix: [Bug Name]".
   - A detailed **Description** in Markdown, including 'Context' and 'Acceptance Criteria' (technical checklist).
2. **Execution:** Use the `gh issue create` command with these mandatory flags:
   - `--project "Kapt-tech"` (Ensures it lands on the Organization Kanban).
   - `--label "backend,enhancement"`
   - `--assignee "@me"`
3. **Action:** Execute the command and provide the final Issue link and #ID to the user. Do not ask for title or description approval.
