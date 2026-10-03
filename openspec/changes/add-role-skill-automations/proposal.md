# Proposal

## Why

The requirement board shows each role's work but cannot start it. Role actions should pass one request to native OpenHands automations so planning and implementation remain traceable in Automation history and conversations.

## What Changes

- Add Propose, Update, and Apply actions for SA, Frontend, Backend, and QA in requirement details, with one prompt field.
- Store twelve fixed role-and-skill automation definitions, prompts, and runtime in `/Users/oka/Desktop/openhands-automation`.
- Keep the spec store separate from the implementation project and validate both targets before a run.
- Propose creates a distinct change and board requirement; Update revises the selected requirement; Apply executes only the selected role's tasks.
- Install/connect the definitions explicitly, submit one native automation run, and expose its status and conversation links.
- Tag each role conversation with its selected requirement, role, OpenSpec stage and exact skill name so its origin is visible in native conversation lists.
- Name new role conversations `[Role] <OpenSpec change name>` before agent execution, using the proposed target name for Propose.
- Preserve read-only board loading and refresh; only an explicit Run action dispatches work. No stage chaining, priority fields, commits, or deployment.

## Capabilities

### New Capabilities

- `role-skill-automation`: Start and inspect role-scoped OpenSpec skill runs from requirement details.

### Modified Capabilities

None. The board specification is in an active change rather than the main specification inventory. This change supersedes its no-dispatch design constraint only for explicit role actions.

## Impact

App UI, scoped styles, authenticated command bridge, package tests, and installed Canvas package in `openhands-apps`. Automation source, generated bundles, tests, and configuration in the user-requested `openhands-automation` repository. The seven legacy stage definitions and three superseded generic role definitions are removed from native inventory and the Git Sync source folder; conversations remain intact. Specs stay in `openspec-store`; code runs target `openhands-demo` by default.
