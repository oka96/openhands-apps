# Design

## Context

See proposal.md. The runner posts a native completion callback, while the App uses a Python bridge inside Agent Server. Native callbacks accept only COMPLETED/FAILED. Their task_outcome input is not reliably persisted by the installed service; storing only agent final text also misses postflight errors. Both processes share the local user's private OpenHands home.

## Goals / Non-Goals

Goals: preserve audit and agent evidence independently, show truthful business outcomes and actual configuration, and prevent unsupported entry points from starting agents. Non-goals: changing native service code, adding a database, changing historical run records, dependency scheduling, retries, automatic agents or relaxing sibling ownership.

## Decisions

- Apply permits `[x]` to `[ ]` only for originally completed selected tasks, with an exact task description and nonempty reason in `task_corrections`. Newly completed tasks still require `task_evidence`. Structure, text, line endings and sibling files remain immutable. A correction leaves work pending and therefore cannot count as successful completion.
- Postflight failures return an execution-error outcome carrying the original agent result plus a separate audit-errors list. Agent blocked/findings results remain business outcomes; missing dependencies are indicated by optional `blocker_type: dependency`, otherwise blocked means human action is needed. Waiting-for-confirmation is needs-review; runtime/transport/validation failures are execution-error. Unknown agent status or invalid extra structured fields fail closed.
- Write a bounded, atomically replaced, private result file at `~/.openhands/apps/openspec-progress/role-results/<run UUID>.json` before the callback. Bind schema version, run ID, conversation ID, role/stage, requirement/spec identity and configured store/workspace. Capture the actual profile/timeout as run-time configuration. No new service or native API is needed. A report-write failure is explicit and must not claim successful completion.
- Bridge reads only the matching terminal native run's report through no-follow bounded reads, validates every exposed field and identity, and returns a small allowlisted result. It never sends raw logs, arbitrary metadata, injected credentials or exception bodies to the browser. Missing/malformed/foreign reports retain native status and offer a history link without guessing the cause. A failed native lifecycle must not be overwritten by a report claiming success. Active and cancelled runs remain governed by native state.
- Keep native non-completed callback status FAILED for compatibility. Kanban displays business result separately from native lifecycle, along with bounded agent summary/findings, separate audit issues and next action using text nodes. Explicit refresh and duplicate guards remain.
- Probe returns the configured profile, skill root and timeout; UI shows the selected role, mapped OpenSpec skill, configured targets and source. Readiness determines whether these are installed/effective or require reconnecting. Each result shows its captured configuration, not a later edited profile. The form states native Run now lacks required context. The runner's rejection includes the Kanban entry path and never starts an agent.

## Risks / Trade-offs

- Local reports require the current shared-home deployment; absence is an honest legacy fallback, not inferred success. Native history remains authoritative for lifecycle.
- Agent-generated prose is untrusted. Bound strings/lists, redact known injected secrets before persistence/output, validate JSON shape and render text only. Full diagnostics stay in native logs.
- Reopening a checked task is a behavior change. Require an explicit correction reason, preserve task text and scope, and cover both accepted and refused corrections in tests.

## Migration Plan

Build and verify both repositories, reinstall the same App and reconnect the same twelve definitions without dispatching work. Preserve all native IDs, signing source and histories. Rollback uses the previous App and bundle sources; old clients ignore local reports. Leave this change active.
