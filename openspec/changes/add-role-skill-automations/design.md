# Design

## Context

Canvas host API 1 provides an authenticated Agent Server request adapter but no Automation adapter. The old progress app already uses a fixed Python command bridge with advertised service metadata and a server-injected key. Automation 1.15.1 manual dispatch has no custom input body; signed events support input. The current board uses a separate spec store and four tagged role checklists. See proposal.md for motivation.

## Goals / Non-Goals

**Goals:** Twelve role/skill combinations, one prompt per submission, native runs with inspectable results, and a clear separation of source code from planning artifacts.

**Non-Goals:** Autonomous handoffs, schedules, a new service, general shell execution, writable task controls.

## Decisions

- Generate twelve definitions: SA, Frontend, Backend, and QA each have Propose, Update, and Apply. Every bundle fixes its role and stage; both the signed event filter and runtime reject a different role. Keep role-workflow.json, generator, runtime and prompts in the requested automation repository; fix its stale demo path. The defaults are source workspace/skill root `/Users/oka/Desktop/openhands-demo`, store `/Users/oka/Desktop/openspec-store`, and registered store ID `openspec-store`.
- Reuse host requests to `/server_info`, `/api/file/home`, and the fixed Bash adapter. The embedded Python helper validates advertised loopback Automation coordinates, uses only the injected key, and never exposes it to the browser. A direct browser Automation connection was rejected because v1 supplies no credential capability.
- An explicit Connect action uploads the generated role bundles, preserves unique existing definition IDs, and registers `openspec-role-dashboard`. Probe performs reads only. Connection state, signatures and dispatch journals live under the backend home `.openhands/apps/openspec-progress/`; source credentials are never checked in. Setup verifies bundle hashes so rebuilt runtime/configuration changes require reconnecting.
- Use schema `openspec-role-dashboard/v1` with exact role, stage, approval, request ID, spec_store, requirement_id, context_change, change and request fields. Stage event names are `<stage>.requested`. Paths/profile remain fixed configuration, with registered-store resolution and requirement mapping checked before an agent starts. Requests are replay protected; workspace/store locks serialize competing runs.
- Native OpenHands serializes custom events as `{payload, source_override, event_key}` inside the dispatcher event. Validate this wrapper's source and stage before validating the exact signed payload; also accept the direct payload shape for compatible native versions. Reject ambiguous wrappers and unexpected fields.
- Add a Run OpenSpec skill disclosure to each role detail panel. Default to Apply for the existing change; show a new change field only for Propose. Provide one prompt box, skill-boundary help, connection state, explicit Run, status refresh and native links. Keep request/run references per backend/store/requirement/role; do not persist prompt text. Duplicate clicks stay disabled and uncertain outcomes require inspecting history before choosing another run. Cleanup invalidates asynchronous UI work.
- Propose plans a distinct change using the selected role's perspective while keeping all four role task sets. On successful validated planning, the runtime registers a new requirement ID under the store lock. Update preserves the selected identity and applies only the user-submitted revision; that submission authorizes its stated artifact edits. Apply limits work and completion marks to the selected role. The existing skills and project instructions supply verification gates; insufficient input produces a blocked run.
- Preserve read-only board data collection. Role runs can change source artifacts through the selected skill; the user refreshes the board to see resulting progress. Dispatch acceptance and native completion never directly mark role tasks done.
- Set native conversation tags atomically in the creation request: `requirement` is the validated selected requirement ID, `role` is its selected delivery role, `openspecstage` is the stage and `openspecskill` comes from the fixed stage-to-skill mapping. Preserve `openspecchange`, `automationrunid` and `automationtrigger`. Propose retains its context requirement because the new requirement does not exist at conversation creation. Legacy stage runs add only the mapped skill; existing conversations are not rewritten.

New role conversations use `[Role] <change>` as a deterministic native title. The
installed Agent Server creation schema does not accept a title, so create the
conversation without an initial message, PATCH only its title, then submit the
prompt to the events endpoint with `run: true` after the metadata update succeeds.
The native creation service runs any supplied initial message regardless of its
`run` field, so omitting it is necessary to enforce naming before execution. Keep `autotitle`
disabled and retain all origin tags. A failed title update must not start the
agent. Propose uses the new target change, while Update and Apply use the selected
requirement's current change. Existing conversation names remain unchanged.

## Risks / Trade-offs

- Automation installation or dispatch can fail after a side effect → persist setup and request journals; resume only provable states and surface uncertain outcomes without blind retries.
- Stored configuration may be changed while the page is open → revalidate it and the target mapping on dispatch and in the runner.
- Model output can violate scope or claim success without evidence → explicit role prompts, runtime validation of role/task and proposal registration results, and honest blocked/error status. This is workflow scoping rather than an OS sandbox.
- Multiple roles share files → serialize runs across both store and source project; the stage remains human-selected.
- Sample checkboxes are illustrative → a live smoke test uses an explicitly read-only request on a completed sample role, and compares source fingerprints. Unit/integration tests exercise mutating skill paths in temporary fixtures.

## Migration Plan

Generate and validate twelve fixed definitions. Move the ten superseded source bundles into a recoverable archive outside `automations/`; the generator rejects unexpected definitions there. Explicit connection soft-deletes only the recognized seven legacy and three generic definitions, after checking they have no pending or running work. Native deletion retains conversation and run records. Preserve the saved signing source while upgrading connection state to role/stage pair keys; probe is read-only and reports reconnection needed while migration remains. Refuse unknown subscribers and duplicate identities. Complete retirement before enabling new routes, and resume partial installation from the setup journal. Build and install the new board package, connect local role automations, then verify all role forms plus one native automation run. No Git push or periodic sync is required. Keep the active changes available for review; disabling role definitions stops new submissions without removing stored specs.
