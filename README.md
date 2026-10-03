# OpenSpec Kanban for OpenHands

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
  to inspect its specification and tasks. Proposal and Design are shared context.
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

`openspec/requirements.json` version 2 groups role specs under each requirement.
The existing lowercase `change` is the requirement's container. Role prefixes
are `SA`, `FE`, `BE`, and `QA`; requirement IDs use `REQ-` followed by at least
three digits. Feature suffixes are lowercase kebab-case. Spec IDs must match
their role and exact parent requirement.

```json
{
  "version": 2,
  "name": "My spec store",
  "description": "Delivery requirements",
  "requirements": [{
    "id": "REQ-001",
    "title": "Task descriptions",
    "summary": "Keep task context alongside its title.",
    "change": "add-task-descriptions",
    "roles": {
      "SA": { "owner": "Solution Architecture", "note": "Reviewing scope.", "specs": [
        { "id": "SA-REQ-001-description-contract", "title": "Description contract", "state": "in_progress", "note": "" }
      ] },
      "Frontend": { "owner": "Web team", "note": "", "specs": [
        { "id": "FE-REQ-001-description-editor", "title": "Description editor", "state": "backlog", "note": "" },
        { "id": "FE-REQ-001-description-preview", "title": "Description preview", "state": "backlog", "note": "" }
      ] },
      "Backend": { "owner": "API team", "note": "", "specs": [] },
      "QA": { "owner": "Quality team", "note": "", "specs": [] }
    }
  }]
}
```

Each named spec has two files inside its requirement's change:

```text
specs/FE-REQ-001-description-editor/spec.md
tasks/FE-REQ-001-description-editor.md
```

The task file contains only its owning role's tasks, for example
`- [ ] 1.1 [Frontend] Implement and verify the description editor.` Local task
numbers can repeat in other specs. Shared `proposal.md` and `design.md` stay at
the change root. The store's local `role-specs` workflow tracks `tasks/*.md`.

Role names are exact: `SA`, `Frontend`, `Backend`, `QA`. Spec state hints accept
only `backlog`, `in_progress`, and `blocked`; `done` is derived. Partial completion
implies in progress unless the spec is blocked. A role finishes only after all
its specs finish; a checked sibling cannot hide an empty or missing task list.
An unfinished blocked spec takes precedence over every other stage. SA must
finish before the stage becomes Implementation; both Frontend and Backend must
finish before Verification. Empty roles and missing source files remain incomplete and show warnings.
Checklists, source paths, and warnings are always visible in details.
Active spec directories and task files must be registered in the index. The board
rejects unregistered sources so its progress cannot silently omit CLI-tracked work.

Version 1 stores remain readable; role actions require migration to version 2.
The configured sample store includes a repeatable migration and retains its
original artifacts in `legacy/` directories. REQ-003 demonstrates two specs per
role; REQ-002 retains its Solution Design progress.

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
use `/progress/requirements/REQ-001`. Previous `/progress/changes/<change>` links
resolve when the change is present in the selected store.

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
per spec ID, 64 KiB per Markdown file, 128 KiB metadata (and combined v1 specs),
and 512 KiB aggregate response.

The store directory and role-run references are remembered in browser storage,
separately per backend. Filters survive navigation within an activation. A failed refresh
retains the last successful snapshot with a visible **Stale snapshot** warning.
The board's checklist progress does not certify implementation, tests, or release.
