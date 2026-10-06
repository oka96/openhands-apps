# Implementation evidence

Verified on 2026-10-06 using Node.js 24.20.0.

## Automated checks

- Apps `npm run check`: 263 tests passed; all five bundles built and manifests validated; all ten OpenSpec changes passed strict validation.
- Automation `npm test`: 147 tests passed. `npm run check` verified the twelve generated bundles.
- Coverage includes selected-spec isolation, running and legacy conversation associations, reload without browser history, backend routing, empty/error states, stale responses, retired-action rejection and migration without deleting delivery history.
- Archify finalization passed validate, deliver, check and browser-check. The checked three-action source and viewer are in `.archify/workflow-role-conversation-20261006/`. Source references pin Automation commit `6de08ca62a1878897c3001de6a7280fca1df2bf6`.
- `git diff --check` passed for both repositories.

## Installed OpenHands verification

- Reinstalled and enabled OpenSpec Kanban and the four role Apps at version 0.13.0.
- Reconnected shared automations. The role App reported all twelve definitions ready. Native Automation showed twelve active definitions and twelve inactive delivery definitions; retired actions had disabled Run now controls and retained their run history.
- In SA Workflow, requirement `ROOM-001` and spec `SA-ROOM-001-booking-contract` resolved to the latest related conversation `0314eb49-dfc8-4e93-838f-5016eb8b276c`. Clicking Open conversation navigated to that native conversation with `backend=default-local`; its repository was `oka96/openspec-store` on `main`.
- Reloading the role page preserved that association. The Frontend spec for the same requirement showed the explanatory empty state and a disabled button instead of linking a conversation from another requirement.
- The App opens the native conversation. It does not select the Commits panel; the user chooses native Git actions there.
- No agent run was started during these checks.

Local screenshot: `/Users/oka/.codex/visualizations/2026/10/05/01a10ddb-8678-72e2-a50c-f284bfc5f261/role-conversation-handoff.png`.

## Publication

Pushed both implementation commits to `origin/main` and verified the remote refs match the local commits:

- Apps: `8e4ad51f31a38e8d4cf2c41c1aea905cc5234a48`.
- Automation: `6de08ca62a1878897c3001de6a7280fca1df2bf6`.

The OpenSpec store had no changes from this implementation. The change remains active for inspection.
