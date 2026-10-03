# Proposal

## Why

One shared specification and task file per requirement cannot represent several independent features owned by the same role. Requirements need explicit role-spec identities and Kanban must show their individual progress and artifacts.

## What Changes

- **BREAKING**: migrate the configured store to metadata version 2 and a local `role-specs` OpenSpec workflow schema with per-spec documents and tasks.
- Preserve requirement IDs and change directories; identify specs as `SA-REQ-xxx-<feature>`, `FE-REQ-xxx-<feature>`, `BE-REQ-xxx-<feature>`, or `QA-REQ-xxx-<feature>`.
- Allow multiple specs per role. Aggregate completion across every spec while retaining per-spec blockers and ownership context.
- Update Kanban detail, search, artifact selection, and role actions to target named specs.
- Bind signed automation requests, conversations, and scoped edits to the selected spec. Propose adds a spec to the selected requirement; Update and Apply affect that spec.
- Preserve original sample artifacts as migration references and all checked/unchecked task states, including REQ-002.

## Capabilities

### New Capabilities

- `role-spec-tracking`: Named role-owned specs, their source artifacts, per-spec progress, requirement aggregation, and scoped actions. This extends the active requirement-board and role-skill-automation changes, whose artifacts remain historical planning context.

### Modified Capabilities

None; this repository has no archived main capability specs yet.

## Impact

The store metadata, local workflow schema, sample artifacts and validator; apps collector, strict client, Kanban and automation bridge; automation runtime, prompts, generated bundles and tests. No target demo application behavior changes and no new runtime dependencies.
