# Proposal

## Why

The user wants separate OpenHands apps for SA, FE, BE and QA. Kanban currently combines the shared requirement overview, all role checklists, artifact previews and skill execution in one page, so each role needs a dedicated place to inspect its sources and run its related automations.

## What Changes

- Add four independently installable Canvas app packages: OpenSpec SA, OpenSpec FE, OpenSpec BE and OpenSpec QA. Each has a fixed role, a role work list, its related Propose/Update/Apply automations and a source-artifact workspace.
- Move artifact previews and execution from Kanban requirement details into the role apps. Kanban keeps requirement progress and role summaries, with links to the appropriate app and selected change.
- Preserve the selected store, requirement and change across links and return navigation. Direct links, missing roles, stale changes and unavailable apps have explicit states.
- Reuse the existing twelve native definitions, signed event contract, shared connection and run references. Navigation, discovery and refresh never dispatch work; execution remains an explicit submit action.
- Build all five packages from shared source, validate them, install them locally and verify the actual links, related automation inventories and artifacts.
- Give the five apps distinct sidebar icons and a stable Kanban, SA, FE, BE, QA order. The installed Canvas 1.24.0 host lacks manifest support for this, so provide a guarded, repeatable local sidebar customization.

## Capabilities

### New Capabilities

- `role-workspace-apps`: Independently installed role workspaces, contextual Kanban navigation, role-specific automation presentation and source inspection.

### Modified Capabilities

None in main specs. This supersedes the active changes' requirement-detail placement of artifact previews and skill forms; their safety, progress and artifact-rendering behavior remains applicable.

## Impact

Changes are in openhands-apps (shared UI, manifests, packaging, tests, a local Canvas customization script and documentation), with automation launch guidance updated in openhands-automation if necessary. The navigation script updates the installed Canvas dependency's sidebar presentation; it does not edit the demo product. No OpenSpec store content changes, new services, credentials, data migration, automatic agent dispatch, commit or push is required. App separation is a user-interface boundary, not permission isolation.
