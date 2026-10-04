# Design

## Context

See proposal.md. The current store has six parent changes, 28 role specs and 48 task lines. Kanban, the signed bridge and runner all require requirements.json v2 and shared parent paths. Existing uncommitted outcome/report corrections must survive this migration. OpenSpec 1.14 accepts uppercase existing change names in list/status/instructions/validate/archive, but its new-change command accepts only lowercase names.

## Goals / Non-Goals

Discover requirement membership exclusively from change folders. Preserve specification contracts, task lines, progress and ordinary OpenSpec tooling. No new database, dependency, service, runtime registry, automatic agent dispatch or target-product edits. The completed store keeps no migration backups or migration tooling; active folder validation is self-contained.

## Decisions

- Canonical change identity matches `^(SA|FE|BE|QA)-([A-Z][A-Z0-9]*)-([0-9]+)-([a-z0-9]+(?:-[a-z0-9]+)*)$`, at most 160 characters. Requirement key is exact capture 2 + `-` + capture 3; keep zeroes and support prefixes besides REQ. Folder role is authoritative. Reject malformed role-prefixed names and links; ignore unrelated normal OpenSpec changes and archive. Keep existing limits of 50 requirement groups, 20 role changes per group, 500 tasks per group, bounded source/response sizes.
- Each folder is a standard spec-driven change: `.openspec.yaml`, `proposal.md`, `design.md`, `specs/<capability>/spec.md`, `tasks.md`. Migration retains each existing canonical spec ID as its capability ID. A role change may contain multiple capability documents; the selected change's bounded specs are compiled for preview. Each selected change owns all four artifact tabs. No requirement-level shared change or artifact path is invented.
- The store's main role baselines are `openspec/specs/sa/spec.md`, `fe/spec.md`, `be/spec.md` and `qa/spec.md`. They describe existing role responsibilities, source traceability, delivery handoffs and completion gates. Retire the single `task-workspace` baseline and retain no legacy copies. This does not rename the 28 active role changes or alter their contracts, tasks or progress.
- Optional `## Kanban` section in proposal.md contains ordinary Markdown bullet fields `Requirement title`, `Requirement summary`, `Spec title`, `Owner`, `Role note`, `State`, `Note`. Values are plain text; indented continuation lines preserve multiline values. Limits remain 200 characters for titles/owner, 4000 for notes/summary. State accepts backlog/in_progress/blocked. It is display context only: missing section uses requirement ID, humanized feature name, Unassigned and checkbox-derived progress. Identity never comes from Markdown. When sibling requirement titles/summaries conflict, choose deterministically and warn; roles aggregate unique owners/notes. This avoids another required sidecar or global index.
- Board wire version 3 contains requirement IDs/titles/summary/roles/specs/progress/stage/warnings, without requirement.change or shared requirement.artifacts. Each spec has id==change==folder and four artifacts. New files appear and removed files disappear on Refresh without metadata edits. Missing/empty planning/task files produce warnings and stay incomplete. Untagged tasks inherit folder role; explicit conflicting role tags are rejected. Existing numbered task text is preserved.
- Signed event schema advances to v3 so pending v2 actions cannot be misrouted. Preserve field names and signing/replay protections. Update/Apply bind change=context_change=spec_id to the selected existing folder. Propose binds change=spec_id to a new folder, with an existing context_change under the same derived requirement (another role allowed). Preflight rechecks current filesystem membership and limits under existing locks. No JSON registration after Propose. Partial planning remains discoverable and Update may repair it; completion still requires strict validation.
- Propose scaffolds the exact uppercase folder and `.openspec.yaml` safely before agent work because native new-change rejects that spelling. The metadata uses schema spec-driven; other stages preserve it. Propose/Update can edit only the selected folder's proposal/design/specs/tasks; Apply can change only selected tasks.md markers plus authorized implementation work. Sibling changes and main specs remain immutable. Preserve correction evidence and agent/audit outcome semantics.
- Historical reports/storage are accepted only when their role/requirement/spec identities match; no native history is rewritten. Refresh setup updates the existing twelve definitions and filters to v3, preserving IDs and source credentials. Native zero-input still rejects without starting an agent.

## Risks / Trade-offs

- Several files encode display context → deterministic aggregation and conflict warnings; folder names always define identity.
- Conversion can lose current work → verify source contracts, task lines, context and check states before retiring parent folders. After the completed conversion, preserve those active sources while removing obsolete backup data and tooling at the user's request.
- Uppercase creation differs from default CLI → controlled exact-path scaffold; exercise actual pinned CLI discovery/status/instructions/strict validation for all migrated folders and archive in a disposable fixture.
- Legacy clients/events use old paths → deploy App and twelve bundles together; v3 events reject old bindings, and check readiness before submission.

## Delivery Plan

1. Capture source bytes, task counts/states and existing diffs. Use recovery evidence while verifying the one-time conversion.
2. Build all 28 independent folders with preserved source contracts/tasks and copied shared context. Move active identity/display information into optional proposal Markdown. Remove active requirements.json and old requirement containers only after verification.
3. Update store configuration, validator, docs, Kanban collector/UI and automation runtime/bridge. Normal operation reads only active folder artifacts.
4. Run store, App and automation suites, native CLI gates, real-store collection and no-registry tests. Rebuild/install App and reconnect the same twelve definitions. Verify the live board/previews/configuration with no agent dispatch.
5. Remove the completed migration's backups, commands, implementation and recovery-dependent tests as requested. Clean stale references in active proposal/design/task prose without changing contracts, checklist lines or Kanban context. Validate current folders and seeded stages without historical inputs. Keep the implementation change active.
