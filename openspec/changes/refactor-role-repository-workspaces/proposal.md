# Role schemas and repository workspaces

## Why

All role automations currently run in one fixed task-demo checkout, while role specs lack repository bindings or upstream references. This prevents a solution spanning multiple applications from handing off safely to independent implementation and regression repositories.

## What Changes

- Add SA, backend, frontend and QA schemas with explicit repository scope and upstream spec references.
- Show impacted applications and upstream references on Kanban and role workspaces.
- Create managed workspaces and clone the bound repository before starting each downstream conversation. SA operates only on store artifacts.
- Replace the old store demo with one meeting-room booking requirement and four role changes, preserving a recovery archive.

## Capabilities

### New Capabilities
- `role-repository-workspaces`: role scope, handoffs, application display and repository-aware execution.

### Modified Capabilities
None.

## Impact

OpenHands Apps collector, client validation and role UI; OpenHands Automation runtime, prompts and generated bundles; OpenSpec Store schemas, validators and demo artifacts. The user explicitly authorized these three repositories as one coordinated refactor. No remote pushes are required.
