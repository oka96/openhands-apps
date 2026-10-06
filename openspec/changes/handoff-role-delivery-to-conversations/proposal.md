# Proposal

## Why
Review, commit and merge are user-directed work in an existing OpenHands conversation. Dedicated delivery automations add an unnecessary workflow and can obscure which conversation owns the changes.

## What Changes
- **BREAKING**: retire Review, Commit and Merge Request automation actions; keep Propose, Update and Apply for each role.
- Add a durable, selected-spec conversation handoff for manual review and Git delivery.
- Preserve specification revision diffs and historical delivery evidence.
- Pause retired native definitions without deleting their run history.

## Capabilities
### New Capabilities
- `role-conversation-handoff`: scoped navigation from a role spec to its latest related conversation and retirement of automated delivery.
### Modified Capabilities
None; no main specs have been synced. This change supersedes the delivery requirements and six-node UI in `automate-role-delivery-lifecycle`.

## Impact
OpenHands Apps UI, validated workflow diagram, Automation action catalog, runtime, native connection migration and generated bundles. No sample application or business-spec changes. Validation stays local.
