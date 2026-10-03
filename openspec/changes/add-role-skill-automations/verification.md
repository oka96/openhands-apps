# Verification

Verified on 2026-10-04 against native OpenHands at http://127.0.0.1:8000.

## Initial v0.4.0 verification (superseded inventory)

- App v0.4.0 installed and enabled. Priority is absent from app source and live board controls.
- 79 JavaScript tests and 17 Python bridge tests passed. App build, manifest checks, both strict OpenSpec changes and official Canvas source/dist validation passed.
- Automation runtime: 56 tests passed, ten generated bundles current, and three role bundle prerequisite checks passed against the configured store.
- General store validation and the separate seeded-fixture check passed. A temporary seventh requirement passed general validation and was rejected by the seeded-only check, as intended.
- All four native role forms selected Propose, Update and Apply. Connection showed the code project and separate spec store. Initial setup created three definitions with zero runs and kept the seven original definitions.

## Native read-only request

Submitted SA Apply for REQ-006 / add-task-quick-capture with an explicit prohibition on file edits, checkbox changes and feature implementation.

- Automation: `5e507773-f78d-4a58-b3de-db2b4f3b4314`
- Request: `afb829cc-e7b5-404b-92e9-78927e060fc0`
- Run: `96ec568b-fc0c-4392-956e-208e15b27ea9`
- Conversation: `28d731fd-fb02-4f69-a3a8-595447c5f9f7`

The conversation read the configured apply skill, verified the registered store,
read all selected planning artifacts and passed strict store-scoped validation.
Its terminal result was `findings`: seeded checkboxes are illustrative and do not
prove implementation or acceptance testing. The native run therefore correctly
reports FAILED and the board exposes its run and conversation links. No product
acceptance or mutating skill scenario is claimed as live-tested.

Post-run SHA-256 comparison found no changes among 43 implementation-project and
42 spec-store files. The comparison excluded Git metadata, runtime `.local`,
dependencies, caches and build output. Screenshot:
`artifacts/role-automation-native-result.jpg`.

## Integration issues resolved

The first attempt stopped before creating a conversation because OpenHands wraps
custom events in `{payload, source_override, event_key}`. Runtime validation now
supports and verifies that exact wrapper; regression tests cover all twelve role
and skill combinations and invalid routing metadata.

The second attempt stopped before script execution because an extra OpenHands
launcher on port 8002 shared the SQLite queue with port 8000 but had separate
package storage. The duplicate launcher was stopped gracefully. Ports 8000,
18000 and 18001 remain; ports 8002, 18020 and 18021 stopped. Reconnecting restored
Apply without changing its automation ID. The third attempt produced the linked
conversation and terminal result above.

Native Canvas briefly showed a missing-app route when returning from a
conversation; a page reload restored the installed app. Source changes remain
active and uncommitted; no Git sync, push or archive was performed.

## Conversation tag follow-up

The runtime now supplies requirement and role tags for role runs and the exact
stage-to-skill mapping for every stage. All 58 runtime tests pass, including all
twelve role/skill combinations and seven legacy stage mappings. All ten bundles
were regenerated; the three installed role definitions were reconnected.

Read-only run `b5ba3151-22c5-4b1b-8037-a57918b29b98` created conversation
`b2bba070-784e-4d4b-96d7-ce1ec56ca934`. Its native sidebar tag popover displayed:

- `requirement`: `REQ-006`
- `role`: `SA`
- `openspecstage`: `apply`
- `openspecskill`: `openspec-apply-change`
- `openspecchange`: `add-task-quick-capture`

Screenshot: `artifacts/conversation-origin-tags.jpg`. Existing conversation tags
were preserved. For a new Propose run, the requirement tag identifies the selected
context requirement and the change tag identifies the proposed target.

The tagged smoke conversation finished with findings about the illustrative
checkboxes, as expected. Post-run scope fingerprints confirmed no changes to the
43 implementation-project or 42 spec-store files.

## Dedicated role/skill definitions (v0.5.0)

The later user revision replaces the initial three generic definitions with
twelve fixed definitions: SA, Frontend, Backend and QA each have Propose, Update
and Apply. Runtime configuration, signed filter, bridge selection and board
selection all bind the same role/stage pair.

- 58 automation runtime/build tests, 79 App JavaScript tests and 22 bridge tests passed (159 total).
- Tests exercise all twelve combinations, cross-role ID rejection, fixed-role runtime rejection, v1 signing-state migration, retirement of all ten recognized definitions, preservation of unrelated definitions/history, active-run blocking and interrupted deletion recovery.
- Twelve generated bundles match their sources. The ten old bundles were archived, byte-verified and removed from `automations/`; the generator rejects unexpected definitions there.
- App v0.5.0 built and passed package validation, strict validation for both active OpenSpec changes, and the official Canvas source and dist validators. The full App check used Node 24.20.0.
- Installed and enabled v0.5.0 from the local source. Explicit Connect completed migration; native Dashboard displayed **12 automations / 12 active** with all four role names and three skills, and no numbered legacy or generic Role entries. Setup started no run.
- Screenshot: `artifacts/dedicated-role-automations.jpg`. Older conversations remained visible in the native sidebar after soft deletion.

Native read-only Backend Apply proof:

- Automation: `54c68282-e0dd-4753-81a6-deb8ec2d231a` (`OpenSpec Backend · Apply`)
- Request: `6b249bd7-e42e-4a77-9562-eb3a2a8ce10b`
- Run: `e00fec18-c25b-4123-ab60-07b53a083277`
- Conversation: `f6efde58-051c-4dc2-8ddf-e1b3c6eba11e`

The native definition displays fixed `role: Backend` and `stage: apply` in its
bundle. The new conversation's tag popover confirms `requirement: REQ-006`,
`role: Backend`, `openspecstage: apply`, and `openspecskill: openspec-apply-change`.
Screenshot: `artifacts/backend-apply-origin-tags.jpg`. The request explicitly
prohibits all file/checkbox/metadata edits and asks for honest audit findings.

The native conversation finished with `findings`, and the run recorded FAILED
with its conversation link and summary. It confirmed the fixed Backend routing
and identified the sample requirement's missing 200-character validation and
durable tests/documentation. This is expected audit behavior, not an automation
routing failure or a claim that the sample product is complete. No implementation
was attempted. A post-run SHA-256 comparison found zero changes among the same
43 implementation files and 42 spec-store files.

The OpenSpec change remains active for review. No commit, push, Git Sync, or
OpenSpec archive was performed.

## Role and spec conversation names

New role conversations are now titled `[Role] <target change>` before sending
the agent's first message. The installed native creation schema has no title
field and its service automatically runs any initial message; the runner creates
without a message, PATCHes the title, then submits the prompt with `run: true`.
Automatic title generation stays disabled and origin tags are preserved.

All 59 runtime/build tests passed. The twelve role/skill cases verify exact
create/name/execute order, including Propose's new target name. Naming transport
errors and rejected updates leave the agent unstarted. All twelve rebuilt native
bundles were reconnected with their existing identities.

Live SA Apply title-only check:

- Automation: `ce6ee97a-d2bb-4e17-80b6-b3337a055135`
- Request: `e7733ddb-97dd-4a95-967e-793f5904127b`
- Run: `8e1f16c2-04b1-4f3c-b0fd-e5f95d1273fa`
- Conversation: `e6224c28-80de-4ec9-85ae-fdb9f017c478`
- Native sidebar and header: `[SA] add-task-quick-capture`
- Screenshot: `artifacts/role-spec-conversation-name.jpg`

The conversation read required instructions and returned the explicitly requested
blocked result because this was a naming-only check, with no implementation
requested. A fresh SHA-256 baseline comparison confirmed zero changes in 43
implementation-project and 42 spec-store files. Existing names were not rewritten.
