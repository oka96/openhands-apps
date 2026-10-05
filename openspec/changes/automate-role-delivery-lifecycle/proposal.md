# Proposal

## Why

Role workspaces currently stop at Propose, Update and Apply, and the Apps own server-side workflow rules. Users need one visible path from a requirement through specification revisions, implementation review and delivery, with reusable OpenHands automations owning all operations.

## What Changes

- Move collection, dispatch validation, connection management and workflow operations into the automation repository; Apps become visual clients.
- Give every role six native automation nodes: Propose, Update, Review, Apply, Commit and Merge Request. SA continues to design and hand off rather than implement application code.
- Save a durable before/after specification revision for every modifying run, including failed or partial updates; show revision history and diffs in the owning role app.
- Review current spec/code changes before delivery. Commit exactly the reviewed snapshot locally, or push an isolated branch and create a GitHub pull request (the merge-request destination for the supplied GitHub repositories).
- Support new SA requirements and application bindings, downstream derivation, and prompts for different requirements without editing automation code.
- Regenerate the interactive workflow with Archify and update all four role Apps and the Kanban entry points.

## Capabilities

### New Capabilities

- `role-delivery-lifecycle`: automation-owned specification revisions, reviews and Git delivery surfaced through role Apps.

### Modified Capabilities

None; this project's preceding specifications remain active change artifacts.

## Impact

OpenHands Apps presentation and transport, OpenHands Automation runtime/control/build/tests/prompts, and deployment documentation. Existing signed role events and native run history remain. The automation set grows from 12 to 24 definitions. No sample application implementation or unsolicited remote publication is part of validating this change.
