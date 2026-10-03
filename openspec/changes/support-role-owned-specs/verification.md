# Role-owned specs verification

Verified 2026-10-04 (Asia/Kuala_Lumpur).

## Automated and CLI evidence

- Apps `npm run check`: 109 JavaScript tests and 25 Python bridge tests passed; browser bundle/manifest valid; all four active OpenSpec changes pass strict validation.
- Official Canvas extension validator passed for both package root and dist, including the OpenSpec Kanban marker.
- Automation repository: 62 Python tests passed and `npm run check` confirms all twelve generated role/skill bundles match source. Retained legacy app check passed (37 JavaScript and 6 Python tests).
- Store: 17 tests passed, covering canonical ownership, multiple specs, local task IDs, orphan sources, migration repeatability, original-byte preservation, and native CLI task discovery. Schema validation and store doctor passed; strict OpenSpec validation passed all seven items.
- Seeded migration checks preserve all 48 original task lines, six requirement stages, role owners/notes, blocker context, and 32 original files. The store has 28 role specs; every role has two specs under REQ-003.
- Read-only runtime preflight against the real migrated store accepted SA-REQ-003-filters, FE-REQ-003-filters, BE-REQ-003-filters and QA-REQ-003-keyboard, selecting exactly the correct task file for each. No conversation or agent execution was started.

## Acceptance audit

| Requirement | Evidence |
| --- | --- |
| REQ parent identity and canonical SA/FE/BE/QA spec names | Six original REQ IDs/change associations retained; 28 on-disk spec directories and metadata entries validate. |
| Multiple independent specs per role | REQ-003 has labels/filters for SA, Frontend and Backend, plus integration/keyboard for QA; eight distinct task files. |
| Accurate progress across all specs | Collector and strict-client tests cover completed sibling plus unfinished sibling, missing/empty sources, zero specs, blockers, duplicate local IDs and invalid associations. Unregistered active source entries fail visibly. |
| Per-spec inspection and search | DOM and live browser checks select FE-REQ-003-filters and FE-REQ-003-labels, read their exact sources, switch Preview/Source, and preserve selection after refresh. Searching FE-REQ-003-filters returns its one parent requirement. |
| Scoped automation and identity | Tests cover all twelve role/actions, v2 event bindings, Propose registration under the existing REQ, Update/Apply sibling preservation, duplicate task-number rejection, stale schema/association rejection, replay/locks/evidence, and conversation names/tags. |
| Preserve existing progress | REQ-001 0/8 Backlog; REQ-002 1/8 Solution Design; REQ-003 3/8 Implementation; REQ-004 7/8 QA; REQ-005 3/8 Blocked; REQ-006 8/8 Done. |
| Custom OpenSpec workflow | role-specs schema tracks tasks/*.md; native apply instructions enumerate every source path and current checkbox. Main task-workspace specification is unchanged. |

## Live installation

- Installed and enabled OpenSpec Kanban 0.7.0 from the local apps repository using the existing extension identity.
- Connected the updated definitions through the role action panel; it reported Connected · Propose, Update, Apply. Native Automation dashboard contains twelve active definitions and only the three pre-existing historical runs.
- SA Propose form visibly derives SA-REQ-003-filter-accessibility from the feature input; the test value was cleared without submitting.
- REQ-003 displays two specs in each role and 3/8 tasks. REQ-002 visibly remains Solution Design at 1/8 tasks.
- At the native 295px viewport, document width is also 295px. Selected specification preview has equal client/scroll height (918px) and overflow-y visible, preserving full-height rendering.
- Screenshot: `artifacts/role-spec-preview.jpg` (local evidence, ignored by Git).

These checks validate routing and guards without asking an agent to implement sample product work. Sample checkboxes remain illustrative. The active planning change is left available for inspection.
