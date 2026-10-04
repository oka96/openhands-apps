# Proposal

## Why

The store currently needs a manually maintained requirements.json registry in addition to its specification files. The user wants role, requirement and feature identity to come directly from each change folder, so adding a change immediately makes it discoverable without updating an index.

## What Changes

- **BREAKING**: use `openspec/changes/<role>-<requirementPrefix>-<requirementId>-<feature>/` for each independent role change; group the requirement by the exact prefix and numeric ID in that name.
- Remove active requirements.json reads and writes from the store, Kanban and role automation. Move all 28 existing role specs to independent changes while preserving the six requirement groups, all task text/check states, context, owners and notes.
- Each role change uses normal proposal.md, design.md, specs/<capability>/spec.md and tasks.md artifacts. Optional presentation metadata lives in proposal Markdown and is not required for discovery or routing.
- After the verified conversion, remove migration backups, migration commands and their recovery-dependent checks from the store. Keep validation self-contained in the active role folders and remove stale backup references from their prose.
- Replace the single shared main specification with four role baselines in `openspec/specs/sa/`, `fe/`, `be/` and `qa/`. Preserve the independent role changes and keep legacy change copies removed.
- Make source previews, deep links and Propose/Update/Apply target the selected role change. Preserve signing, scope checks, duplicate guards, original blocker/audit outcomes and effective configuration display.

## Capabilities

### New Capabilities

- `folder-requirement-discovery`: Folder-derived requirement grouping, migration and scoped role automation without a registry.

### Modified Capabilities

None in main specs. This supersedes the active support-role-owned-specs change's registry and shared-container assumptions.

## Impact

Coordinates the explicitly requested store restructuring across `/Users/oka/Desktop/openspec-store`, `/Users/oka/Desktop/openhands-apps` and `/Users/oka/Desktop/openhands-automation`. Updates source collection, browser contracts, role dispatch/runtime, migration, tests, generated bundles and documentation. No product workspace edits, agent dispatches, commits or pushes are needed. Preserve pre-existing uncommitted automation-outcome fixes.
