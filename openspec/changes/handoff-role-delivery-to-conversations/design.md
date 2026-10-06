# Design

## Context
The action catalog drives generated bundles and App transport. Native run reports already bind completed conversations to role specs; browser last-run storage is per requirement/role and cannot safely serve selected-spec navigation.

## Goals / Non-Goals
Keep Apps as a visual client of Automation-owned lookup. Preserve existing conversation workspaces and spec history. No cloud transport migration, automatic Git delivery, new agent run for navigation, or unsupported Commits-panel deep link.

## Decisions
- Keep three catalog actions and remove deterministic Git execution and bundles. Reject legacy delivery inputs at both boundaries.
- Disable known retired delivery definitions after checking active runs, preserving native IDs and history. Accept old private connection bindings during migration and prune only retired bindings.
- Resolve conversations from bounded native history and validated local run associations. Persist a minimal association immediately after conversation creation, before starting the agent. Use existing validated terminal reports for older runs. Select by native start time, never by browser last-run cache. Return only validated identifiers, action, status and time.
- Show an independent Open conversation button for the selected spec, with refresh, unavailable and error states. Navigate through the public host API and retain backend identity; users choose review, commit or merge within OpenHands.
- Retain the existing private evidence path for revision/history compatibility; remove its Git mutation helpers. Render past review/delivery evidence as history only.
- Regenerate the three-node Archify diagram from pinned source evidence.

## Risks / Trade-offs
- Missing old reports → no guessed association; user can inspect native history.
- More than 1000 native runs for an action → explicit lookup limit error instead of claiming no conversation.
- Conversation deletion outside the App → native conversation page may report unavailable; lookup does not recreate it.
- Old open browser pages → server rejects removed actions even before UI reload.

## Migration Plan
Build and test Automation and Apps, reconnect the shared definitions, reinstall the five updated App bundles and verify existing-conversation navigation without running an agent. Git history retains removed code for recovery; no business specs change.
