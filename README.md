# OpenSpec apps for OpenHands

The role apps focus on planning and implementation. Code validation, acceptance
checks and regression execution stay local. Propose, Update and Apply are the
three automated actions; review, commit and merge are manual work in the related
conversation. QA implements regression code in its own repository. Unrun
validation tasks remain unchecked.

Role changes declare repository bindings and upstream references in `scope.json`.
SA (`sa`) can impact several applications and performs design/handoff only.
Frontend (`frontend`) and Backend (`backend`) each bind one repository and refer
to SA. QA (`qa`) binds one regression repository and refers to SA, FE and BE.
Kanban cards and role work lists derive application names from these sources;
role detail panels show repository links and upstream change IDs. Propose offers
an application selector when a downstream role has multiple impacted applications.
Automation creates a managed checkout before starting the conversation. Settings
show the workspace parent; run reports show the actual checkout used.

Five native Canvas apps share one OpenSpec store and the 12 role
automations. **OpenSpec Kanban** shows requirement progress. **SA Workflow**,
**FE Workflow**, **BE Workflow** and **QA Workflow** each provide a fixed-role work
list, interactive workflow and source-artifact workspace for the role's three
related automations.
The app boundary organizes navigation; it does not isolate permissions or data.

All workflow logic lives in `/Users/oka/Desktop/openhands-automation/runtime`.
The Apps render returned data and pass explicit inputs through small fixed
transport loaders. The action catalog is generated from Automation during build.

SA home can propose a new requirement: enter its ID, feature, prompt and one or
more application bindings. Other roles derive their scopes from SA. Inspect
edits in the related conversation; role workspaces do not load or display diffs.

Use **Open conversation** under **Review, commit & merge** to open the newest
conversation for the selected store, requirement, role and spec. It works after
reload without browser run history and includes running conversations once
created. Navigation preserves the selected backend and starts no work. Select
OpenHands' Commits panel inside the conversation to inspect and handle Git actions;
the public App API cannot select that panel directly. If no conversation exists,
run Propose, Update or Apply, then **Refresh conversation**. Lookup errors keep the
button unavailable and can be retried. Stored revisions and delivery records
are retained by Automation; the App does not render an evidence-history panel
or run Git delivery commands. Native automation history remains linked.

The current three-node Archify source and checked standalone viewer are in
`.archify/workflow-role-conversation-20261006/`. `candidate.json` cites the
Automation implementation; the delivery and finalize receipts pin its exact
bytes and passing browser checks. `npm run workflow:check` verifies those receipts
and ensures every node matches the action catalog. Older diagrams under `docs/`
are historical and are not loaded by the Apps.

Role automation controls show the actual profile, selected automation, project,
store and timeout from `role-workflow.json`. Uninstalled changes are marked as
requiring reconnect. Select an action in the workflow, then submit its form;
native Automation **Run now** lacks the required request context, and its profile
selector does not override this workflow's configured profile.

**Refresh run status** distinguishes business blockers, human review and runtime
errors while retaining native lifecycle and conversation links. Validated local
run reports include the original agent explanation, separate audit problems,
next action and configuration used by that run. A checked task may be reopened
only with an exact-task correction reason. Missing, invalid or older reports
show an explicit fallback to native history rather than guessing an outcome.

A requirement reaches **Done** only when every role has changes, all planning
sources are present, and every change has a nonempty, fully checked task list.
Kanban keeps the `openspec-progress` identity and `/progress` route. All five
apps build from shared source in this repository. The sample store lives
separately at `/Users/oka/Desktop/openspec-store` and is registered with OpenSpec
as `openspec-store`.

## Use the board

Open **OpenSpec Kanban** in the OpenHands navigation. The sample directory is
selected by default. Use **Load store** to choose another directory visible to
the connected Agent Server.

- **Board** groups requirements into Backlog, Solution design, Implementation,
  Regression code, Blocked, and Done.
- **List** gives a compact cross-requirement comparison.
- Search by requirement or spec ID/title, summary, or change name; filter by an unfinished role.
- Open a card to see all four owners and each role's named specs, progress, notes
  and checklists. Follow a role or spec link to its dedicated workspace.
- In the role workspace, use **Role spec** to inspect that change's Proposal,
  Design, Specification and Tasks. Documents open in **Preview**. Select **Source** to
  inspect the exact text. Your choice stays selected when switching documents
  or refreshing the requirement.
- Edit files in the store, then select **Refresh**. Progress and checklists are read-only in the board.
- In the role workspace, choose a requirement and **Role spec**, then select
  **Propose**, **Update** or **Apply** in the left workflow. The right panel shows
  the selected automation and prompt. The role stays fixed to that app, and only
  pressing **Run** starts work.

Kanban links preserve the exact store, requirement and selected change. **Back
to Kanban** returns to the same requirement and store. New pages read the latest
shared store selection unless the link provides explicit store context. Missing
or disabled role apps show an unavailable state with **Manage Apps**; failed app
inventory checks show unknown availability and can be retried with Refresh.

The meeting-room sample is prepared for role automation. Its specs do not claim
that the sample repositories have been implemented or tested.

### Preview documents

The artifact viewer supports headings, emphasis, lists, read-only task checkboxes,
quotes, tables, inline code, and fenced code blocks. Proposal, Design,
Specification, and Tasks all use the same Preview and Source controls. Paths
remain visible; empty and missing documents have explicit messages.
Both views expand to the document's full height, using the page scroll without
an internal vertical scrollbar.

Raw HTML is shown as text. Images show descriptive text without loading embedded
resources. Absolute HTTP(S) links open in a separate tab; relative file links and
other URL schemes remain text. Diagrams and code stay in code blocks. Preview
does not edit documents, check tasks, or start automations. If formatting fails,
**View source** keeps the document available.

## Run a role automation

Open its dedicated role app. The larger left canvas contains the actual Archify
viewer: zoom, pan, reset, node search, focus, route inspection, theme/style,
presentation controls. Export is hidden in the embedded workflow. Select **Propose**, **Update** or **Apply**
directly by click, Enter or Space; the narrower right panel shows its form and
native automation history. Exploring the diagram does not change the automation.
The embedded viewer hides Archify's node-details popup so it does not cover the
workflow; automation details remain in the right panel.
App dropdowns share consistent spacing and focus styles. Supporting browsers
also show styled option menus; other browsers retain their native picker.
The arrows illustrate a typical workflow: actions are independent and run only
when you explicitly submit.

Choose a requirement and **Role spec** to bind the source documents and execution
target. You can draft a prompt on the role home before choosing a requirement;
Run stays disabled until a real target is selected. That first requirement choice
carries the draft once within the same store. Changing an existing requirement or
spec starts a fresh draft. Prompts are never saved persistently.

For a role with no specs, choose its **New spec** entry to propose the first feature.
Switching workflow actions, documents or Preview/Source preserves your current
draft. Source artifacts span the full width below both the canvas and form, and
expand to their full height.
The action panel shows the current action, prompt and conversation controls.
Open **Automation settings** for configuration or **Last run** for a completed
result. Unresolved runs, blockers and errors stay expanded.
Supporting work lists and progress are available in disclosures. On narrow
screens the workflow stacks above the form.
Use the shared automation connection setup once to install or reconnect the
12 role automation definitions from `/Users/oka/Desktop/openhands-automation`
and enable signed local requests. This starts no agent. Every role app uses that
same connection and filters its catalog to the three automations for its role.
The underlying actions remain `openspec-propose`, `openspec-update-change` and
`openspec-apply-change`; Automation is the user-facing name for triggering them.
Connect disables the twelve retired Review, Commit and Merge Request definitions
after checking for active runs, preserving their native IDs, runs and conversations.
The older migration still retires the seven legacy stage and three generic definitions.
The panel shows the configured code project and spec store.
Connection checks are read-only, and Automation remains editable while they run.
Previous run links remain visible without locking Automation. A confirmed finished
run automatically enables the next explicit submission. Loading the page or selecting
the next action checks a saved run's current status; **Refresh run status** checks again without starting work.
Pending, running or unknown results keep submission locked. For an uncertain result,
inspect native history before using **Start another run**. Changing Automation alone
does not start a run or discard its history.

Choose an automation and supply one prompt:

- **Propose** requires a new feature slug and prompt. It derives the role change ID and plans the new folder under the selected requirement; no registration file is needed.
- **Update** requires a selected spec and revision prompt. Submitting authorizes the stated edits to that spec and its tasks. It stops before implementation.
- **Apply** implements the selected spec's pending tasks. Its prompt is optional and can narrow the work or add constraints. Validation remains local; an explicit prompt may request checks, and unrun checks are never reported as passed.

Press **Run <role> <automation>** to create one native automation run. Open its run or
conversation to inspect results, or use **Refresh run status**. Refresh the
requirement afterward to read any source changes. A successful dispatch is not
task completion. Runs stop at their selected automation; they never advance another
stage, archive, or deploy. Use the related conversation for subsequent user-directed Git actions. Missing decisions or tool approvals appear
as blocked results for the user to resolve.

New conversations have native `requirement`, `role`, `openspecstage`,
`openspecspec`, `automationrunid`, and `automationtrigger` tags so you can identify
their origin in OpenHands. The redundant `openspecchange` and `openspecskill` tags
are omitted. Titles use the plain spec ID, for example `SA-REQ-002-date-contract`.

Targets are fixed in
`/Users/oka/Desktop/openhands-automation/role-workflow.json`: code and skills default
to `/Users/oka/Desktop/openhands-demo`, and specs use the registered
`openspec-store` at `/Users/oka/Desktop/openspec-store`. Edit that configuration,
rebuild the automation bundles, then reconnect to change targets. Per-run prompts
cannot override paths or model profiles. Other board stores remain readable but
cannot dispatch against mismatched configuration.

Run and request references are stored per backend, store, requirement and role,
and retain the exact selected spec ID; prompt text is not saved in browser storage. If a submission outcome is uncertain,
inspect Automation history before starting another run. Setup and dispatch are
journaled server-side to avoid blindly repeating side effects.

Run one local OpenHands launcher for this shared automation database. Starting a
second launcher on another port can share pending runs while using a different
package storage directory, causing native runs to fail before a conversation
starts. Connect browser and desktop clients to the same retained backend.

## Progress contract

The board discovers independent changes directly under `openspec/changes/`:

```text
openspec/changes/SA-REQ-003-labels/
openspec/changes/FE-REQ-003-filters/
openspec/changes/BE-STORY-12-api/
```

The first two belong to `REQ-003`; the third belongs to `STORY-12`. Role prefixes
are `SA`, `FE`, `BE`, and `QA`. Requirement prefixes are uppercase alphanumeric
starting with a letter, followed by one or more digits; zeroes remain significant.
Feature suffixes are lowercase kebab-case. The complete folder name is the spec
and change identity. Refresh discovers additions and removals without a registry.
Unrelated ordinary changes and `archive/` are excluded; malformed role folders
and symlinks are rejected.

Each role change owns normal OpenSpec artifacts:

```text
FE-REQ-003-filters/
  .openspec.yaml
  proposal.md
  design.md
  specs/filters/spec.md
  tasks.md
```

Multiple capability specifications are compiled into its Specification preview.
All four source tabs in the corresponding role app resolve to that selected
change. Existing Kanban `/progress/changes/FE-REQ-003-filters` links retain the
change context and link into its role workspace. Untagged checklist tasks inherit the folder's role. Optional
explicit task tags must match it; local task numbers can repeat in sibling changes.

Optional presentation context belongs in ordinary proposal Markdown:

```markdown
## Kanban
- Requirement title: Labels & filters
- Requirement summary: Organize tasks by labels.
- Spec title: Filter controls
- Owner: Web team
- Role note: Review keyboard behavior.
- State: in_progress
- Note: Awaiting the filter contract.
  Continue after the API is verified.
```

Missing fields use the requirement ID, humanized feature name, Unassigned owner
and checkbox progress. Indented continuation lines preserve multiline values.
Conflicting requirement titles/summaries produce warnings and use folder-name
order; distinct role owners/notes are combined. These fields never define identity.
State accepts `backlog`, `in_progress` or `blocked`; `done` is derived from completed
checkboxes and present, nonempty planning artifacts. Missing tasks, empty planning
and unfinished siblings cannot count as completion. All four roles must finish.

Propose creates a new canonical role change with context from any existing change
in the same requirement. Update and Apply target exactly the selected existing
change; Update can repair partial planning. Signed automation events use schema
`openspec-role-dashboard/v3`. Reconnect the 12 definitions after upgrading.
There is no active requirements registry read or write. Existing native run IDs,
history, detailed outcomes and duplicate-submission safeguards are preserved.

The meeting-room sample is ROOM-001 with four scoped role changes and eight
unchecked tasks, ready for the role automations.

## Install or update

Build once, then add each package in **Customize → Apps → Add app**:

| App | App source |
| --- | --- |
| OpenSpec Kanban | `/Users/oka/Desktop/openhands-apps` |
| SA Workflow | `/Users/oka/Desktop/openhands-apps/apps/openspec-sa` |
| FE Workflow | `/Users/oka/Desktop/openhands-apps/apps/openspec-fe` |
| BE Workflow | `/Users/oka/Desktop/openhands-apps/apps/openspec-be` |
| QA Workflow | `/Users/oka/Desktop/openhands-apps/apps/openspec-qa` |

Leave Ref and Repository path blank for these local directories. Each manifest
and self-contained `extension.js` is at its package root. Install and enable all
five packages at the same release version, currently 0.13.2.

Installation leaves the app disabled. Review the source, then choose
**Enable trusted app**. The app runs inside Canvas and uses its authenticated
Agent Server adapter. Page loads, filters, navigation and refresh never edit files
or dispatch agents. Only an explicit role Run action starts an automation, which
may change the configured project or store according to the chosen automation.

To update an installed copy through the Apps screen, uninstall that app and
install the local directory again after rebuilding. App removal does not remove
the separate spec store. The earlier package remains at
`/Users/oka/Desktop/openhands-automation/apps/openspec-progress` for rollback.

Kanban's native route is `/extensions/openspec-progress/progress`; role home
routes are `/extensions/openspec-{sa,fe,be,qa}/role`. Cross-app links encode the
selected store as a canonical base64url path component:
`stores/<store-token>/requirements/<id>/changes/<change>`.
The token preserves a local path; it is not a secret. Legacy Kanban routes
`/progress/requirements/REQ-001` and `/progress/changes/<role-change>` remain
supported. A stale, mismatched or wrong-role target shows an explicit error
instead of choosing another execution target.

### Sidebar icons and order

The local Canvas sidebar displays the apps in this order:

| App | Icon |
| --- | --- |
| OpenSpec Kanban | Kanban columns |
| SA Workflow | Connected design nodes |
| FE Workflow | Browser window |
| BE Workflow | Database |
| QA Workflow | Shield with a check |

Canvas 1.24.0 does not expose manifest fields for custom icons or ordering. This
repo supplies a small host customization for that version. It sorts the five
OpenSpec navigation entries before rendering, so keyboard and visual order
match even when apps finish loading in a different sequence. Other apps retain
their original slots and icons.

Apply it to the installed Canvas package, then reload OpenHands:

```sh
npm run canvas:navigation -- /Users/oka/Desktop/openhands-demo/node_modules/@openhands/agent-canvas
```

The command checks the package version and expected code before writing, saves
the original files, and can be run again safely. It also revises the changed
asset URLs so a normal reload picks up the customization despite browser caching;
no server restart is required. Reinstalling Canvas may replace
the customization; run the command again for the supported version. A different
version or unexpected code is rejected before any file is changed.

Restore the original sidebar with:

```sh
npm run canvas:navigation -- /Users/oka/Desktop/openhands-demo/node_modules/@openhands/agent-canvas --restore
```

## Develop and verify

Requires Node.js 24 or newer and Python 3.10+ for the local automation bridge.
Development dependencies are pinned; Marked and the entity decoder are bundled
into the extension. There are no runtime package downloads or additional web
services.

```sh
npm ci
npm run check
```

`check` builds all five self-contained browser ESM modules, runs the data, UI
and packaging tests, validates every manifest/bundle and checks the OpenSpec
changes. Each package has its own `dist/extension.js`. The build validates all
five distributions before copying them to the corresponding checked-in
`extension.js` files. `npm run validate` checks source/distribution parity for
every package. Tiny entrypoints bind each role while the collector, rendering,
navigation and automation logic stay shared.

The official Canvas validator can also be run on this machine:

```sh
for app in . apps/openspec-sa apps/openspec-fe apps/openspec-be apps/openspec-qa; do
  node /Users/oka/Desktop/openhands-demo/node_modules/@openhands/extensions/skills/canvas-extension-api/scripts/validate-extension.mjs "$app"
  node /Users/oka/Desktop/openhands-demo/node_modules/@openhands/extensions/skills/canvas-extension-api/scripts/validate-extension.mjs "$app" --dist
done
```

The app targets manifest schema **1**, host API **1**, Canvas **1.24.0**, and
the local Agent Server command endpoint. Role actions additionally use the native
advertised Automation service (1.15.1). Cloud backends are not supported.
The collector transport calls the fixed read-only Automation runtime with structured
`cwd`. Automation owns scope checks, progress rules and bounded file reads. It never reads `.local`
or browser credentials. Symlink aliases and path traversal are rejected.
Limits: 50 requirements, 20 specs and 500 tasks per requirement, 160 characters
per spec ID, 64 KiB per Markdown file, 128 KiB combined specs per change (at most 20 capabilities),
and 512 KiB aggregate response.

The store directory and role-run references are remembered in shared browser
storage, separately per backend. Store selection is read afresh on each page mount;
role-run references do not depend on which app opened them. Filters survive
navigation within an activation. A failed refresh
retains the last successful snapshot with a visible **Stale snapshot** warning.
The board's checklist progress does not certify implementation, tests, or release.
