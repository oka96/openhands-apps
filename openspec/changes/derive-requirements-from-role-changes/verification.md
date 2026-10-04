# Verification

Verified on 2026-10-04 against the local OpenHands deployment at `http://127.0.0.1:8000`.

The initial conversion evidence below is historical. The user subsequently
requested removal of migration support; the cleanup section records that follow-up.

## Store migration and preservation

- The active store has six derived requirement groups and 28 independent role changes, with 48 task lines and 22 checked tasks. No active `openspec/requirements.json` exists.
- Each role folder has the standard spec-driven metadata, proposal, design, capability spec and task checklist. Requirement identity comes from the exact prefix and digits in its folder name; optional presentation context is ordinary proposal Markdown.
- All 56 original role spec/task files were preserved byte-for-byte during conversion. The temporary recovery manifest verified 109 original files and 117,677 bytes, including the earlier migration manifest and its 32 original hashes. That recovery data was subsequently removed at the user's request.
- Historical task introductions retain their former registry/path references because whole source files were preserved. The store README identifies those introductions as historical; the active collector, validator and runner do not use them as routing or metadata instructions. Current runtime prompts explicitly forbid registry creation.
- Repeated migration preserves later task edits, added and deleted folders. Interrupted retirement, conflicting destinations and recovery hashes have regression coverage.
- Fresh collection passed the browser's strict wire validator with zero warnings. All 112 selected artifact entries belong to their owning role change, with proposal/design/task bytes matching disk and compiled specification previews including their source files.
- Requirement stages remain backlog, Solution Design, implementation, QA, blocked and done respectively for REQ-001 through REQ-006.

## Automated and native CLI checks

- Store: 26 tests passed, plus `npm run test:seeded`, `npm run schema:validate`, `npm run spec:validate` (29/29), and `npm run store:doctor` (no issues). Log: `/tmp/role-change-store-final-tests.log`.
- OpenSpec 1.14 list, status and apply instructions worked for all 28 real migrated folders. The actual automation preflight independently checked every folder, with 48 tasks and 22 checked, each sourced from its own `tasks.md`; evidence: `/tmp/openhands-folder-native-preflight.json`.
- Native new-change rejects uppercase names; the runner's exclusive folder scaffold supplies the exact canonical name and spec-driven metadata. Existing uppercase folders work with discovery, instructions, strict validation and archive. Archive was exercised only in a disposable fixture.
- Apps: final `npm run check` passed: build, 127 JavaScript tests, 30 Python bridge tests, manifest validation and all six active OpenSpec changes. Log: `/tmp/apps-folder-check-final.log`.
- Official Canvas validator passed for repository source and distribution with the OpenSpec Kanban marker.
- Automation: 88 tests passed after the final review fixes. All twelve bundles were rebuilt and `npm run check` confirmed they match source templates.
- The unchanged legacy App in the automation repository passed its existing 37 JavaScript and six Python tests, build and manifest checks. Log: `/tmp/openhands-folder-legacy-check.log`.
- Regression coverage includes arbitrary requirement prefixes, leading zeroes, missing context, unsafe paths, bounded sources, conflicting role tags, v2 rejection, stale/deleted contexts, cross-role context for Propose, partial planning repair, sibling preservation, no registry writes, duplicate guards and runner-to-bridge report handling.
- Final review fixes ensure blocked/findings planning cannot check tasks; Apply audit I/O errors retain the original agent result; and role parsing agrees with the board on leading FE/BE aliases and ordinary role mentions in prose.

## Installed behavior and history

- Reinstalled and enabled the updated local App with the existing identity and permissions, then reconnected the twelve existing definitions. The board displayed `Connected · Propose, Update, Apply`.
- REQ-003 displays its eight role changes, correct owners/context and 3/8 completed tasks. Selecting FE-REQ-003-filters points all four artifact tabs to that folder's proposal, design, specifications and tasks.
- Propose previews `FE-REQ-003-preview-only` for a temporary input; the input was cleared without submitting. Update and Apply immediately display the matching skill and effective configured profile/timeout/workspace/store.
- Refresh preserves the selected Frontend change and Apply choice. The direct `/progress/changes/FE-REQ-003-filters` route selects that change inside REQ-003.
- Native Automations still reports 12 active definitions and five historical runs. SA Apply retains three runs, Frontend Apply one and Backend Apply one, with the same automation IDs and run links. SA Propose retains ID `2d65a56d-f6ab-401c-bf71-c62d8a3a248f`; its published script and filter use v3 and the updated scope/audit logic. The bridge's reconnect regression independently verifies preservation of all twelve IDs and the existing source secret.
- Screenshot: `artifacts/folder-requirements.jpg` (local ignored artifact at the existing browser viewport). The agent-created verification tab was closed; the user's requirement tab remains open.
- No live agent was dispatched. Execution branches were tested with temporary fixtures and mocked agents; native CLI and deployed UI checks were read-only apart from installing/reconnecting the requested App and automation updates. Historical failures were preserved rather than rewritten.

## Delivery

- The tracked product app, package and OpenSpec diff in `/Users/oka/Desktop/openhands-demo` exactly matches its pre-verification baseline. No product implementation files were edited.
- Existing uncommitted automation-outcome corrections remain included. All three changed repositories pass `git diff --check`.
- The implementation change remains active. No commits or pushes were made.

## Requested migration cleanup

Completed on 2026-10-04 after the user requested no migrations in the store.

- Removed `openspec/migrations/` and all 113 files, including both migration generations. Removed migration entrypoints, library, package commands and recovery-dependent tests.
- Ordinary validation now reads only current role folders. The explicit seeded check uses test-only fixed expectations for current sample context, contract hashes and exact task lines; it is not a runtime registry or migration backup.
- Cleaned README/config and all 28 role changes' proposal/design/task references to removed snapshots, legacy paths and the former registry. Task introductions now point to the proposal's Kanban section. Contract bytes, all 48 task lines, 28 schema files and Kanban context were preserved.
- All 20 store tests, seeded checks, spec-driven schema validation, strict OpenSpec validation (29/29), store doctor and whitespace checks passed. Logs: `/tmp/role-change-store-no-migrations.log` and `/tmp/role-change-store-no-migrations-tests.log`.
- A fresh run of the App collector returned six requirements, 28 role changes, 48 tasks, 22 checked and zero warnings without migration data. Independent review found no remaining runtime or validation dependency on removed files.
- The original conversion/recovery tests above record what was verified before cleanup; retained migration support and complete task-file byte preservation are no longer part of the delivered design. Active specification bytes and checklist lines remain unchanged.
- All ten implementation tasks are complete. No App or automation runtime change, live agent dispatch, commit or push was needed for this cleanup.

## Four main role specifications

Completed on 2026-10-04 after the user confirmed replacing the single shared
main specification with four roles.

- Added `openspec/specs/sa/spec.md`, `fe/spec.md`, `be/spec.md` and `qa/spec.md` in the store. Each contains three requirements describing current role responsibilities, traceability, phase handoffs or completion gates.
- Removed the former `openspec/specs/task-workspace/spec.md` and unused main-spec placeholder. Updated README/config to identify all four role baselines.
- Native CLI listing returns exactly `be`, `fe`, `qa`, `sa`; strict validation passes all 32 items (28 active changes and four main specifications). All 20 store tests, seeded checks, schema validation and store doctor pass. Log: `/tmp/openspec-four-main-roles.log`.
- Independent SHA-256 comparison confirmed every one of the 140 active role-change files is unchanged. All six requirements, 28 role changes and 48 task lines retain their prior progress and context.
- No `legacy/` directories remain under `openspec/changes`, and no migration directory exists. The former legacy files remain deleted in the working tree, with no copies retained.
- All twelve implementation tasks are complete. No runtime deployment, agent dispatch, commit or push was performed.
