# Implementation evidence

Verified 2026-10-06. This change is implemented and remains active for inspection.

## Requirement coverage

| Requirement | Implementation and evidence |
| --- | --- |
| Automation owns workflow behavior | `openhands-automation/runtime/control.py`, `collector.cjs`, `run.py` and `delivery.py` own collection, scope, dispatch, history and Git operations. Apps' `src/automation_bridge.py` and `src/collector.cjs` are transport loaders. `runtime/actions.json` generates the six-action UI catalog and 24 native bundles. Control and collector fixtures exercise passive reads, request validation and dispatch. |
| Reusable requirement intake | SA Propose accepts a new requirement ID, feature, prompt and multiple application bindings without existing context. Downstream roles derive one binding and upstream references from SA scope. Runtime tests cover alternate requirements, missing or malformed scope, multiple specs and new SA intake; Apps tests check the exact submitted prompt and bindings. The live SA home displayed three application rows without starting a run. |
| Local validation | Apply prompts implement tasks, leave unrun checks unchecked and keep validation local unless the submitted prompt requests it. QA writes regression code. No validation node, results dashboard or test-result delivery gate was added. Kanban labels the QA lane “Regression code.” Scope, request and Git integrity checks remain. |
| Durable revision diffs | `runtime/delivery.py` stores immutable, role/spec/store-bound revision records outside the source tree, including partial failed edits. Runtime fixtures verify successive updates, failure capture and identity isolation. `tests/role-evidence.test.mjs` verifies readable literal diffs, record switching, reloads, stale-response suppression and disposal. |
| Reviewed snapshot | Review records added, deleted, binary and mode changes plus repository identity, branch, HEAD and content fingerprints. Real Git fixtures reject stale snapshots, unsafe links and content changes during staging. The live native SA Review completed and its persisted snapshot appeared in the owning role app after reload. |
| Direct commit | Isolated-index Git operations commit exactly the reviewed files, preserve unrelated staging and report the commit. The integrated fixture runs Propose → Update → Apply → Review → Commit through native event envelopes with real files, three distinct revision records, real Git history and a clean final tree. Agent and CLI responses are controlled fixtures; Review and Commit start no conversation. |
| Merge request | Deterministic delivery creates an isolated branch, pushes without force to the reviewed repository URL and opens or reuses a GitHub PR. Fixtures cover provider failure and retry without a second commit; a real local bare repository receives the exact reviewed commit and content. GitHub provider responses are mocked, and no test PR was published to a user repository. |
| SA design boundary | SA uses its planning workspace, never clones code for implementation and only reviews or delivers its selected spec. Runtime tests reject SA code targets and application edits. BE, FE and QA workspace tests cover clone/reuse, origin mismatches, bound conversation working directories and sibling repository restrictions. |
| Role interfaces and workflow | All four role interfaces expose Propose, Update, Apply, Review, Commit and Merge Request, with explicit Run submission. Tests cover target and reviewed-snapshot selection in every role. Revision, review and receipt tabs are role-scoped. Live SA, FE, BE and QA screens resolve installed native automation IDs; selecting a node does not dispatch. |

## Checks

- Apps `npm run check`: passed; 246 JavaScript tests, all five App manifests/modules, nine strict OpenSpec validations, generated catalog and workflow checks.
- Automation `npm test`: passed; 143 Python tests.
- Automation `npm run check`: passed; all 24 generated bundles match source.
- Archify `finalize workflow --quality showcase`: all four gates passed (`validate`, `deliver`, `check`, `browser-check`), with zero diagnostics. Candidate, standalone HTML and receipts are retained under `.archify/workflow-role-delivery-20261006-061811/`. HTML SHA-256: `f63ee0ab03c5fd44b5b052c8a5b5a0c4f33cfd225bdf65bc6428c866c151edd7`. The recorded Archify visual-review field is `not-requested`; the embedded live UI was inspected separately.

## Local installation and live evidence

- Installed and enabled OpenSpec Kanban plus SA, FE, BE and QA Apps at version **0.12.0**.
- Reconnected the shared configuration; the live Apps report **all 24 role automations verified**. Existing definitions and run history were reused. For example, SA Apply retains automation ID `ce6ee97a-d2bb-4e17-80b6-b3337a055135`.
- Deterministic SA Review: automation `5ebc27d6-9821-4a76-8694-07c525637c5a`, run `0a8f831e-fda8-495f-b73c-55ac095f9d34`, snapshot `90e658ff-ca30-40cd-aa1f-3ca6fc1f0dcc`. The role app reports **Completed**, shows the planning workspace and displays the persisted zero-file diff after reload. This read-only run started no model conversation.
- The live Kanban derives the three impacted applications from SA scope and displays each downstream role's single application. The demo remains at four specs and zero of eight task checkboxes completed.
- Screenshot of the live native result was saved locally as `/Users/oka/.codex/visualizations/2026/10/05/01a10ddb-8678-72e2-a50c-f284bfc5f261/role-delivery-live.jpg`.

## Verification limits

The meeting-room demo was left ready for the user to run, as requested. No sample application was implemented and no demo agent run, commit or PR was started to test this change. Model behavior is exercised through controlled fixtures; publication uses real local Git plus mocked GitHub responses. Actual publication uses the user's existing Git/gh authentication. Unrun demo validation remains unchecked and is performed locally.

## Finished-run recovery correction — 2026-10-06

The user's Chrome session retained a completed Review reference and therefore kept Run SA Update disabled. An earlier manual reset in Codex's separate browser did not reset Chrome's local reference. The form now checks saved native status on mount and when selecting the next action, automatically releases confirmed finished runs, and preserves their visible evidence. Pending, running, unavailable and mismatched results remain locked with an explanation beside the form.

The added regression tests failed before the fix. `npm run check` now passes **258 tests**, five App package checks and nine strict OpenSpec validations. All five Apps were reinstalled and enabled at **0.12.1**. In Chrome, read-only Review run `b0ed91a6-09a1-42b1-b973-085a6c6d0323` completed with zero changed files. Selecting Update automatically read its result and enabled Run SA Update without pressing Start another run or Refresh run status. Reloading also restored the completed result and enabled submission. No Update agent was started. Screenshot: `/Users/oka/.codex/visualizations/2026/10/05/01a10ddb-8678-72e2-a50c-f284bfc5f261/sa-update-chrome-fixed.jpg`.
