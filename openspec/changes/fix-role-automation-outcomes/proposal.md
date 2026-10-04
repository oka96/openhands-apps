# Proposal

## Why

Role runs currently lose their original blocker when postflight auditing fails, and correcting an unsupported checked task is reported as editing task text. Kanban also collapses business blockers into generic failures and hides the actual fixed agent profile, making the next action unclear.

## What Changes

- Preserve the agent result alongside specific postflight audit errors; allow selected-task completion to be revoked only with an explicit correction reason.
- Report completed, blocked, needs-review and execution-error outcomes separately from native run lifecycle state, with bounded explanations and next steps in Kanban.
- Show effective role, OpenSpec skill, profile, workspace, spec store and timeout, with a clear Kanban-only submission instruction and actionable native zero-input rejection.
- Preserve twelve fixed role/skill definitions, signed event bindings, replay guards and source ownership. Do not add dependency scheduling, automatic retries or automatic follow-up runs.

## Capabilities

### New Capabilities

- `role-automation-outcomes`: Faithful role-run results, evidenced task corrections, effective configuration and explicit launch guidance. This extends the role automation behavior described by the existing active changes; no durable main specs have yet been synced.

### Modified Capabilities

None.

## Impact

The user-authorized scope spans `/Users/oka/Desktop/openhands-apps` (bridge, response validation, UI and tests) and `/Users/oka/Desktop/openhands-automation` (shared runner, prompts, generated bundles and tests). Planning is recorded here alongside the existing integration changes. Target application and spec-store artifacts are unchanged. Existing run history remains readable with an explicit legacy fallback.
