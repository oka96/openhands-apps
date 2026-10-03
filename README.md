# OpenSpec board for OpenHands

A native **Apps for Agent Canvas** page showing requirement delivery across
**SA, Frontend, Backend, and QA**. Each requirement has all four roles. A requirement
reaches **Done** only when every role has tasks, every role task is checked, and
there are no unfinished unassigned tasks.

The redesigned app keeps the `openspec-progress` identity and `/progress` route.
Its source and built entrypoint live in this repository. The sample store lives
separately at `/Users/oka/Desktop/openspec-store` and is registered with OpenSpec
as `openspec-store`.

## Use the board

Open **OpenSpec board** in the OpenHands navigation. The sample directory is
selected by default. Use **Load store** to choose another directory visible to
the connected Agent Server.

- **Board** groups requirements into Backlog, Solution design, Implementation,
  Verification, Blocked, and Done.
- **List** gives a compact cross-requirement comparison.
- Search by ID, title, summary, or change name; filter by an unfinished role.
- Open a card to see all four owners, role checklists, notes, and the original
  proposal, design, specification, and task files.
- Edit files in the store, then select **Refresh**. Progress and checklists are read-only in the board.
- In a requirement, expand **Run OpenSpec skill** under SA, Frontend, Backend, or QA to start work through native OpenHands automations.

The six sample requirements are **illustrative fixtures**. Their seeded
checkboxes demonstrate different stages; they are not claims that the sample
features have been implemented or tested.

## Run a role skill

Open a requirement and expand the action under the role that should do the work.
Select **Connect automations** once to install twelve dedicated role-and-skill definitions from
`/Users/oka/Desktop/openhands-automation` and enable signed local requests. This
starts no agent. Each role has its own Propose, Update and Apply automation.
Connect also retires the seven legacy stage and three generic role definitions
after verifying they have no active runs; existing conversations remain available.
The panel shows the configured code project and spec store.

Choose a skill and supply one prompt:

- **Propose** requires a new kebab-case change name and prompt. It plans a distinct requirement from the selected role's perspective, includes tasks for all four roles, and adds the validated proposal to the board.
- **Update** requires a revision prompt for the current requirement. Submitting authorizes the stated planning edits. It stops before implementation.
- **Apply** works through only the selected role's pending tasks. Its prompt is optional and can narrow the work or add constraints; required verification still applies.

Press **Run <role> <skill>** to create one native automation run. Open its run or
conversation to inspect results, or use **Refresh run status**. Refresh the
requirement afterward to read any source changes. A successful dispatch is not
task completion. Runs stop at their selected skill; they never advance another
stage, commit, push, archive, or deploy. Missing decisions or tool approvals appear
as blocked results for the user to resolve.

New conversations have native `requirement`, `role`, `openspecstage`, and
`openspecskill` tags so you can identify their origin in OpenHands. Propose tags
the selected context requirement and records the new change in `openspecchange`.
Their titles use `[Role] <OpenSpec change name>`, for example
`[SA] add-task-quick-capture`. Propose uses the proposed new change name.

Targets are fixed in
`/Users/oka/Desktop/openhands-automation/role-workflow.json`: code and skills default
to `/Users/oka/Desktop/openhands-demo`, and specs use the registered
`openspec-store` at `/Users/oka/Desktop/openspec-store`. Edit that configuration,
rebuild the automation bundles, then reconnect to change targets. Per-run prompts
cannot override paths or model profiles. Other board stores remain readable but
cannot dispatch against mismatched configuration.

Run and request references are stored per backend, store, requirement and role;
prompt text is not saved in browser storage. If a submission outcome is uncertain,
inspect Automation history before starting another run. Setup and dispatch are
journaled server-side to avoid blindly repeating side effects.

Run one local OpenHands launcher for this shared automation database. Starting a
second launcher on another port can share pending runs while using a different
package storage directory, causing native runs to fail before a conversation
starts. Connect browser and desktop clients to the same retained backend.

## Progress contract

`openspec/requirements.json` is the versioned index. A requirement references one
active change; its task completion is read from that change's `tasks.md`:

```json
{
  "version": 1,
  "name": "My spec store",
  "description": "Delivery requirements",
  "requirements": [{
    "id": "REQ-001",
    "title": "Task descriptions",
    "summary": "Keep task context alongside its title.",
    "change": "add-task-descriptions",
    "roles": {
      "SA": { "owner": "Solution Architecture", "state": "in_progress", "note": "Reviewing scope." },
      "Frontend": { "owner": "Web team", "state": "backlog", "note": "" },
      "Backend": { "owner": "API team", "state": "backlog", "note": "" },
      "QA": { "owner": "Quality team", "state": "backlog", "note": "" }
    }
  }]
}
```

```markdown
- [x] 1.1 [SA] Agree the acceptance scenarios.
- [ ] 1.2 [SA] Review the interface contract.
- [ ] 2.1 [Frontend] Implement the description editor.
- [ ] 3.1 [Backend] Validate description updates.
- [ ] 4.1 [QA] Verify the end-to-end description flow.
```

Role names are exact: `SA`, `Frontend`, `Backend`, `QA`. The board derives
`done` from checkboxes, so the metadata accepts only `backlog`, `in_progress`,
and `blocked`. Partial completion implies in progress unless the role is blocked.
An unfinished blocked role takes precedence over every other stage. SA must
finish before the stage becomes Implementation; both Frontend and Backend must
finish before Verification. Missing role tasks remain incomplete and show warnings.
Checklists, source paths, and warnings are always visible in details.

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
Development dependencies are pinned; there are no runtime package dependencies
and no additional web service.

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
node /Users/oka/Desktop/openhands-demo/node_modules/@openhands/extensions/skills/canvas-extension-api/scripts/validate-extension.mjs . --dist --marker 'Requirement board'
```

The app targets manifest schema **1**, host API **1**, Canvas **1.24.0**, and
the local Agent Server command endpoint. Role actions additionally use the native
advertised Automation service (1.15.1). Cloud backends are not supported.
The collector embeds a fixed read-only Node program, uses structured `cwd`,
validates source paths and data, and bounds files/output. It never reads `.local`
or browser credentials. Symlink aliases and path traversal are rejected.
Limits: 50 requirements, 500 tasks per requirement, 64 KiB per Markdown file,
128 KiB metadata/combined specifications, and 512 KiB aggregate response.

The store directory and role-run references are remembered in browser storage,
separately per backend. Filters survive navigation within an activation. A failed refresh
retains the last successful snapshot with a visible **Stale snapshot** warning.
The board's checklist progress does not certify implementation, tests, or release.
