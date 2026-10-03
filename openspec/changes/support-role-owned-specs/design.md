# Design

## Context

See proposal.md. The store uses one lowercase change directory and one all-role tasks.md per requirement; the app and signed automation runtime validate that association strictly. OpenSpec 1.14 rejects uppercase change names but discovers uppercase capability directories and supports globbed task tracking in custom schemas.

## Goals / Non-Goals

Deliver actual independent role specs while preserving the requirement route, lowercase change ID, shared planning context, fixed twelve automation definitions, and existing preview safety. No demo application behavior change, new service, database, or automatic agent execution.

## Decisions

- Keep each requirement's existing `change`. Metadata v2 retains `{id,title,summary,change,roles}`. Each role is `{owner,note,specs}`; each spec is `{id,title,state,note}`, with state `backlog|in_progress|blocked`. Completion is derived from files. Role state hints move to spec entries. This avoids two independently editable levels of state.
- Require `REQ-[0-9]{3,}` and canonical IDs `<SA|FE|BE|QA>-<exact REQ ID>-<lowercase feature slug>`, maximum 160 characters. Allow zero specs for newly shaped roles but warn and prevent completion; at most 20 specs per requirement and 500 total tasks. Reject duplicate IDs globally and mismatched ownership.
- Shared artifacts remain `proposal.md` and `design.md`. Each named spec has `specs/<ID>/spec.md` and `tasks/<ID>.md`. Task role markers must match its owning role. Custom schema `role-specs` tracks `tasks/*.md`. Main task-workspace behavior remains unchanged; original source files move to `legacy/` inside each change as migration references.
- Collector returns board v2, preserving requirement summary fields and role task/count fields. Add `requirement.specs` objects `{id,title,role,state,note,complete,total,tasks,artifacts,warnings}`. Its two artifacts have IDs `specs` and `tasks` and exact file paths. `requirement.artifacts` contains shared proposal/design only. Each role adds `specs` containing its spec IDs. Every v2 task adds `specId`; task identity is `(specId,id)`. Duplicate task numbers across specs are allowed. Role done requires a nonempty spec list and every spec done. Keep v1 read-only board compatibility; actions require v2.
- UI groups task lists by spec within role panels and provides a named spec selector for artifact inspection and Update/Apply. Propose takes a feature slug and previews the derived canonical ID. Search includes spec IDs/titles. Shared proposal/design tabs remain available, and Preview/Source retain full-height behavior.
- Source artifacts uses one Role spec dropdown and one inline skill form, without role disclosures or a duplicate Spec selector. The selected spec determines the immutable role/spec passed to that form. Remount only when the target changes; document tabs and Preview/Source changes preserve the form. Roles without specs have a `<role> · New spec` dropdown option, defaulting to Propose while shared artifacts remain readable. Tab availability follows the selected target.
- Skill, prompt, and feature fields remain editable during read-only connection/status checks and while previous-run metadata is shown. Only an active dispatch or unsupported target disables editing. Keep the prior run reference and explicit Start another run guard against duplicate/uncertain submissions; changing Skill itself neither dispatches nor clears that reference. Saved run metadata must never override the Role spec target. Preserve disposal and request-ID checks against late asynchronous results.
- Signed role events become v2 with `spec_id`. Both `context_change` and `change` refer to the selected requirement's existing change. Propose creates only the selected spec and task paths, registers that spec after validation, and does not allocate a new REQ. Update permits only the selected spec/task planning paths; shared proposal/design and siblings are read-only context. Apply permits selected task checkbox updates plus verified target implementation. Preserve locks, replay protection, fixed bindings, rejection-before-agent, byte-level sibling audit, and verification evidence requirements.
- Conversations are named `<spec ID>` before agent execution, with automatic naming disabled. Keep `requirement`, `role`, `openspecstage`, `openspecspec`, `automationrunid`, and `automationtrigger` tags; omit `openspecchange` and `openspecskill`. Normalize existing conversations by stripping leading bracketed role prefixes and removing only those two tag keys through the native metadata API. Preserve the remaining title, all other tags, messages, and run history. Persisted UI run state records spec ID, preventing the UI from attributing an earlier run to another selection.

## Risks / Trade-offs

- Uppercase capability paths differ from default kebab guidance → the local schema explicitly defines canonical names, with CLI integration checks.
- Missing source files or unfinished zero-task specs → show warnings and keep the role incomplete.
- Metadata and agent outputs can change between display and dispatch → revalidate exact current association under existing locks and reject obsolete v1 requests.
- Migration could falsely advance samples → preserve all original task descriptions and checkboxes and compare totals and stage distribution.
- A response may exceed existing bounded snapshot limits as specs grow → retain bounded reads and explicit errors rather than truncate artifacts.

## Migration Plan

Migrate store metadata and source artifacts with a repeatable script, retain byte-preserved originals in legacy/, validate the local schema and sample outcomes, then build/install the app and reconnect the twelve native role definitions. Verify local source and live UI without starting agents. Git history plus legacy originals permit rollback as one coordinated store/app/runtime change.
