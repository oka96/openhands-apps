# Verification

## Baseline

- Native OpenHands automation dashboard before deployment: 12 active automations, 5 total runs (SA Apply 3, Frontend Apply 1, Backend Apply 1).
- OpenSpec store is clean. Demo product/spec diff matches the pre-existing baseline in `/tmp/openhands-demo-after-folder-migration.patch`.
- Navigation tests: 4 passing, including all four roles, Unicode store paths, exact padded requirement IDs, old routes and malformed/unsafe contexts.
- Existing collector client tests after extracting the unchanged workspace validator: 6 passing.

## Integration

- `npm run check`: 180 JavaScript tests and 30 Python bridge tests passed; five-package build/parity validation passed; all seven active OpenSpec changes passed strict validation. Full output is in ignored `artifacts/role-apps-check.log`.
- Official Canvas validator: all five source packages and all five distribution packages passed. Exact app names, versions, page routes and fixed-role wrapper bindings are additionally checked by the 14 packaging tests.
- Automation repository: 88 tests and generated-bundle validation passed. Only launch/outcome guidance changed; all twelve definition YAML files, twelve configuration files and `role-workflow.json` remained byte-identical.
- Independent review found no concrete defects in role targeting, contextual routes, async disposal or submit-only execution.
- Final store status is clean. Demo product/spec diff is byte-identical to the pre-task baseline.

## Installed browser verification

- OpenHands Apps page shows Kanban, SA, FE, BE and QA enabled at version 0.8.0. The existing Kanban package was reinstalled through the management UI because this UI does not expose the API's force-refresh option.
- Followed actual REQ-003 Kanban links to `SA-REQ-003-filters`, `FE-REQ-003-filters`, `BE-REQ-003-filters` and `QA-REQ-003-integration`. Each workspace selected exactly that change, retained `/Users/oka/Desktop/openspec-store`, and showed only its role's three existing Propose/Update/Apply definitions and history links.
- Reconnected the shared definitions once for updated launch guidance. SA's detail catalog refreshed after setup and all four role catalogs reported shared readiness.
- FE Proposal, Design, Specification and Tasks tabs loaded their exact source paths. Selecting `FE-REQ-003-labels` updated the viewer target. The Skill dropdown changed to Update and the button became `Run Frontend Update` without dispatch.
- FE literal source had `overflow-y: visible` and equal client/scroll heights (329px), confirming no nested vertical scrolling. Selected change and Source mode survived refresh.
- Back to Kanban retained REQ-003 and the encoded store context. QA's direct work list contained its seven QA changes across the six requirements. Native sidebar displayed all four role apps plus Kanban.
- Native automation dashboard after setup/navigation still showed 12 active definitions and 5 total runs. No agent was dispatched during browser verification.
- Reloaded the user's original REQ-003 tab to the updated Kanban and closed the temporary verification tab. Screenshot: `artifacts/role-apps-navigation.png` (ignored local evidence).

## Native sidebar refinement

- Canvas 1.24.0 hard-codes one shared extension icon and renders navigation in activation completion order. Added a reversible, version- and structure-checked customization, documented in the README and exposed through `npm run canvas:navigation`.
- 15 focused tests passed, including all 120 registration permutations, partial inventories, exact app matching, unrelated navigation preservation, five distinct icon shapes, rendered native React elements, cache revisions, repeat application, guarded rejection and byte-exact five-file restoration. Patched copies of the actual native modules, manifest and HTML module bootstrap passed syntax checks.
- Independent review found a restrictive-umask permission issue in the file replacement helper. Explicit chmod now preserves intended modes on apply and rollback; restoration uses the saved mode even when only permissions differ. A child-process regression under umask 077 passed. This fix did not change the deployed sidebar output or cache revision.
- Applied to the installed Canvas dependency's three sidebar modules plus its route manifest and HTML bootstrap. Revision `034574481498` changes the manifest and root-layout asset URLs, allowing normal reloads to bypass previously cached immutable assets without restarting services.
- Reloaded the user's existing REQ-003 browser tab normally. Native links appeared in exact DOM and visual order: OpenSpec Kanban, OpenSpec SA, OpenSpec FE, OpenSpec BE, OpenSpec QA. Each contained its own distinct SVG: columns, design nodes, browser window, database and shield/check. Links retained their original destinations. Screenshot: `artifacts/role-apps-icons-order.png` (ignored local evidence).
- Store remained clean; demo product/spec diff matched `/tmp/openhands-demo-before-sidebar-icons.patch` byte for byte. This refinement changed no automation files or state and dispatched no runs. Strict validation of the updated OpenSpec change passed.
