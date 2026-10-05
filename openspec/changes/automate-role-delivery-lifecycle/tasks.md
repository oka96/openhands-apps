# Tasks

## 1. Automation ownership and intake

- [ ] 1.1 Move collector and control logic into Automation; replace Apps implementations with transport loaders, document the boundary and verify collection/dispatch tests against the automation-owned code.
- [ ] 1.2 Add a shared six-action catalog and new SA requirement intake, preserving role scope and explicit prompts; verify malformed inputs, multiple requirements and generated native bundles.

## 2. Revision history and reviewed delivery

- [ ] 2.1 Persist specification revisions for successful and partial modifying runs, expose bounded role-scoped history and document storage; verify successive updates, failure capture and cross-role isolation.
- [ ] 2.2 Implement deterministic Review with spec/code targets and immutable fingerprints; verify added/deleted/binary files, stale content, HEAD/origin/branch changes and SA restrictions.
- [ ] 2.3 Implement local Commit and resumable GitHub Merge Request automation, document failure recovery and verify real local Git history, unrelated staging, no-force push and mocked provider failures/idempotency.

## 3. Role Apps and workflow

- [ ] 3.1 Redesign role workspaces for new requirement intake, prompt actions, revision history, readable diffs and reviewed delivery receipts; verify all four role interfaces and stale async response handling.
- [ ] 3.2 Generate the six-node workflow with Archify, retain candidate and passing finalize/browser receipts, and verify every node maps to a real automation without auto-dispatch.

## 4. Integration

- [ ] 4.1 Run repository checks and fixture end-to-end planning/review/commit/publication flows; record requirement-by-requirement evidence and limitations.
- [ ] 4.2 Rebuild and install the Apps, reconnect 24 native automations preserving existing history, and verify live role/diff screens without starting the meeting-room demo implementation.
