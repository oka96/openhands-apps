# Proposal

## Why

The existing OpenSpec progress app shows change checklists but does not show who must finish a requirement. A shared sample store and role-aware board make the SA, Frontend, Backend, and QA handoffs visible in OpenHands.

## What Changes

- Move the redesigned `openspec-progress` App source into this repository, preserving its App/page identity.
- Read a standalone OpenSpec store containing requirement metadata and role-tagged Markdown tasks.
- Show six Kanban stages, a list view, search and unfinished-role filters, four-role progress, and requirement details with source artifacts.
- Keep requirements focused on role progress without priority fields, labels, or filtering.
- Require all four roles and all tracked tasks to finish before a requirement reaches Done.
- Keep collection read-only and manual; clearly label samples and failed refreshes.
- Replace the project-specific Explore launcher with requirement navigation. Existing OpenHands automations remain available in Automate.

## Capabilities

### New Capabilities

- `requirement-board`: Visualize requirement delivery and source evidence across four roles in a native Canvas App.

### Modified Capabilities

None. This repository has no existing capability specifications.

## Impact

The App loads `/Users/oka/Desktop/openspec-store` by default through the existing authenticated Agent Server command adapter. It uses no new service or credentials. Source data stays in the separate store; App code, tests, bundle, and manifest stay here. The existing installed App is updated locally after validation.
