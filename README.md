# OpenSpec Kanban for OpenHands

Role skill controls show the actual profile, mapped OpenSpec skill, project,
store and timeout from `role-workflow.json`. Uninstalled changes are marked as
requiring reconnect. Submit from the requirement's Role spec/Skill controls;
native Automation **Run now** lacks the required request context, and its profile
selector does not override this workflow's configured profile.

**Refresh run status** distinguishes business blockers, human review and runtime
errors while retaining native lifecycle and conversation links. Validated local
run reports include the original agent explanation, separate audit problems,
next action and configuration used by that run. A checked task may be reopened
only with an exact-task correction reason. Missing, invalid or older reports
show an explicit fallback to native history rather than guessing an outcome.

A native **Apps for Agent Canvas** page showing requirement delivery across
**SA, Frontend, Backend, and QA**. Each requirement has all four roles, and each
role can own several feature specs. A requirement reaches **Done** only when
every role has specs and every spec has its specification and a nonempty,
fully checked task list.

The redesigned app keeps the `openspec-progress` identity and `/progress` route.
Its source and built entrypoint live in this repository. The sample store lives
separately at `/Users/oka/Desktop/openspec-store` and is registered with OpenSpec
as `openspec-store`.

## Use the board

Open **OpenSpec Kanban** in the OpenHands navigation. The sample directory is
selected by default. Use **Load store** to choose another directory visible to
the connected Agent Server.

- **Board** groups requirements into Backlog, Solution design, Implementation,
  Verification, Blocked, and Done.
- **List** gives a compact cross-requirement comparison.
- Search by requirement or spec ID/title, summary, or change name; filter by an unfinished role.
- Open a card to see all four owners and each role's named specs, progress, notes,
  and checklists. Select a spec ID or use **Role spec** above the artifact viewer
  to inspect its own Proposal, Design, Specification and Tasks artifacts.
- Documents open in **Preview** with formatted Markdown. Select **Source** to
  inspect the exact text. Your choice stays selected when switching documents
  or refreshing the requirement.
- Edit files in the store, then select **Refresh**. Progress and checklists are read-only in the board.
- In **Source artifacts**, choose **Role spec** and then **Skill** to start work through native OpenHands automations. The selected spec determines its role and target.

The six sample requirements are **illustrative fixtures**. Their seeded
checkboxes demonstrate different stages; they are not claims that the sample
features have been implemented or tested.

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

## Run a role skill

Open a requirement and scroll below the role progress cards to **Source artifacts**.
Choose **Role spec** to select both the source document and automation target.
One inline **Skill** form appears immediately below it. For a role with no specs,
choose its **New spec** entry to propose the first feature. Switching documents or
Preview/Source preserves your draft; choosing a different Role spec opens that
target's form.
Select **Connect automations** once to install twelve dedicated role-and-skill definitions from
`/Users/oka/Desktop/openhands-automation` and enable signed local requests. This
starts no agent. Each role has its own Propose, Update and Apply automation.
Connect also retires the seven legacy stage and three generic role definitions
after verifying they have no active runs; existing conversations remain available.
The panel shows the configured code project and spec store.
Connection checks are read-only, and Skill remains editable while they run.
Previous run links remain visible without locking Skill. After a submission,
use **Start another run** to enable another explicit submission; changing Skill
alone does not start a run or discard its history.

Choose a skill and supply one prompt:

- **Propose** requires a new feature slug and prompt. It derives the role spec ID, plans that spec, and registers it under the selected requirement after validation.
- **Update** requires a selected spec and revision prompt. Submitting authorizes the stated edits to that spec and its tasks. It stops before implementation.
- **Apply** works through the selected spec's pending tasks. Its prompt is optional and can narrow the work or add constraints; required verification still applies.

Press **Run <role> <skill>** to create one native automation run. Open its run or
conversation to inspect results, or use **Refresh run status**. Refresh the
requirement afterward to read any source changes. A successful dispatch is not
task completion. Runs stop at their selected skill; they never advance another
stage, commit, push, archive, or deploy. Missing decisions or tool approvals appear
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
All four source tabs and `/progress/changes/FE-REQ-003-filters` resolve to that
selected change. Untagged checklist tasks inherit the folder's role. Optional
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
`openspec-role-dashboard/v3`. Reconnect the twelve definitions after upgrading.
There is no active requirements registry read or write. Existing native run IDs,
history, detailed outcomes and duplicate-submission safeguards are preserved.

The sample store validates directly from its current role folders.
REQ-003 demonstrates two changes per role; REQ-002 retains Solution Design progress.

## Install or update

In **Customize → Apps → Add app**:

| Field | Value |
| --- | --- |
| App source | `/Users/oka/Desktop/openhands-apps` |
| Ref | Leave blank for a local source |
| Repository path | Leave blank; the manifest is at the package root |

Installation leaves the app disabled. Review the source, then choose
**Enable trusted app**. The app runs inside Canvas and uses its authenticated
Agent Server adapter. Page loads, filters, navigation and refresh never edit files
or dispatch agents. Only an explicit role Run action starts an automation, which
may change the configured project or store according to the chosen skill.

To update an installed copy through the Apps screen, uninstall that app and
install the local directory again after rebuilding. App removal does not remove
the separate spec store. The earlier package remains at
`/Users/oka/Desktop/openhands-automation/apps/openspec-progress` for rollback.

The native route is `/extensions/openspec-progress/progress`; requirement routes
use `/progress/requirements/REQ-001`. `/progress/changes/<role-change>` links
select that change within its requirement.

## Develop and verify

Requires Node.js 24 or newer and Python 3.10+ for the local automation bridge.
Development dependencies are pinned; Marked and the entity decoder are bundled
into the extension. There are no runtime package downloads or additional web
services.

```sh
npm ci
npm run check
```

`check` builds one self-contained browser ESM module, runs the data and UI tests,
checks the manifest/bundle, and validates the app's OpenSpec change. The build
validates `dist/extension.js` before copying it to the checked-in `extension.js`.

The official Canvas validator can also be run on this machine:

```sh
node /Users/oka/Desktop/openhands-demo/node_modules/@openhands/extensions/skills/canvas-extension-api/scripts/validate-extension.mjs .
node /Users/oka/Desktop/openhands-demo/node_modules/@openhands/extensions/skills/canvas-extension-api/scripts/validate-extension.mjs . --dist --marker 'OpenSpec Kanban'
```

The app targets manifest schema **1**, host API **1**, Canvas **1.24.0**, and
the local Agent Server command endpoint. Role actions additionally use the native
advertised Automation service (1.15.1). Cloud backends are not supported.
The collector embeds a fixed read-only Node program, uses structured `cwd`,
validates source paths and data, and bounds files/output. It never reads `.local`
or browser credentials. Symlink aliases and path traversal are rejected.
Limits: 50 requirements, 20 specs and 500 tasks per requirement, 160 characters
per spec ID, 64 KiB per Markdown file, 128 KiB combined specs per change (at most 20 capabilities),
and 512 KiB aggregate response.

The store directory and role-run references are remembered in browser storage,
separately per backend. Filters survive navigation within an activation. A failed refresh
retains the last successful snapshot with a visible **Stale snapshot** warning.
The board's checklist progress does not certify implementation, tests, or release.
