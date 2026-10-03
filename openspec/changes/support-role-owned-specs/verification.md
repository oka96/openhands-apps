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

## Conversation metadata simplification

Verified 2026-10-04 after the original role-spec rollout:

- Runtime contract tests now cover plain spec-ID titles and the six retained tags across all twelve role/stage pairs. Seven legacy stages omit the two obsolete tags as well. Naming still succeeds before agent execution, and naming failures never start the agent.
- Automation checks passed: 62 Python tests, twelve generated bundles match source, and the retained legacy app passed 37 JavaScript plus 6 Python tests and build/validation. All four app OpenSpec changes pass strict validation.
- Inspected the full native conversation list with all threads, automation runs, archived conversations included, and old conversations visible: 20 conversations, no further page. Restored the original archived-visibility setting afterward.
- Removed three bracketed role title prefixes: Frontend labels, SA labels, and SA quick capture. Removed `openspecchange` from nine conversations and `openspecskill` from six (15 tag entries), retaining other tags through the native editor. Existing ADLC tags remained unchanged.
- Native tag filters now list no `openspecchange` or `openspecskill`. Reopening Frontend labels after navigation confirms title `FE-REQ-003-labels` and visible tags `openspecspec`, `openspecstage`, `requirement`, and `role`; native internal automation tags are preserved by the editor.
- Reconnected the twelve existing automation definitions. The panel reports `Connected · Propose, Update, Apply`; setup starts no agent. Screenshot evidence: `artifacts/conversation-cleanup.jpg` (ignored local artifact).
- No conversation was deleted, and no agent run was triggered for this cleanup. No spec-store or target application edits were made by this request.

## Skills with source artifacts

- Moved the four existing role skill disclosures into a labeled group inside Source artifacts, above the document toolbar. Visible summaries identify each role; the progress cards retain their checklists and source links.
- Apps `npm run check` passed: 109 JavaScript and 25 Python tests, bundle/manifest validation, and all four strict OpenSpec validations. Official Canvas validators passed for the root package and dist. Updated existing layout assertions confirm four runners inside Source artifacts, zero in progress cards, correct toolbar order, role labels, and no automation request on render.
- Reinstalled and enabled the rebuilt local extension with its existing identity and permissions. Live REQ-003 DOM confirms four source-section runners and no role-card runners. Opened Backend and observed `Connected · Propose, Update, Apply`, then selected the Backend labels source without submitting a run.
- At the native 295px viewport, document width and scroll width both remain 295px. The selected specification preview has equal client and scroll heights of 1014px. The role controls stack in one column and remain independently expandable.
- Screenshot: `artifacts/source-artifact-skills.jpg` (ignored local evidence). No agent execution or store mutation was performed by this layout request.

## Unified Role spec and Skill form

This refinement supersedes the four-disclosure layout above.

- Source artifacts now contains exactly one inline form. Role spec selects its immutable role/spec target as well as its source documents. There are no role disclosures or duplicate Spec selector. Empty roles remain selectable through New spec entries, and Specification/Tasks tabs follow target availability.
- Fixed Skill being disabled by any saved last-run reference or read-only check. Skill and draft fields remain editable during connection/status checks and with history; dispatch still disables editing, and previous/uncertain submissions retain the explicit Start another run guard.
- App `npm run check` passed 119 JavaScript and 25 Python tests (144 total), build/manifest validation, and strict validation for all four changes. The focused form suite passed 42 tests, including bound targets, old history, editable fields during checks, wrong-role/removed targets, empty roles, duplicates and late responses. Parent integration verifies the actual mock dispatch uses the selected second Frontend spec and preserves drafts across artifact tab/mode changes. Official Canvas package and dist validators passed.
- Installed the rebuilt app. In live REQ-003, a direct native click opened Skill and choosing Update changed its value, help, required prompt and Run label. Propose showed the Frontend feature field and `FE-REQ-003-<feature>` preview; Apply hid it and made the prompt optional. No Run action was submitted.
- Selected `FE-REQ-003-filters` and verified one Frontend form, the matching source path, two selects total (Role spec and Skill), and no disclosures. Preview client/scroll heights remain equal at 918px; document client/scroll widths remain 295px.
- Screenshot: `artifacts/unified-spec-skill.jpg` (ignored local evidence). No automation package, spec-store or target application changes were needed for this refinement.
