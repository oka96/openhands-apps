# Tasks

## 1. Role automation runtime

- [x] 1.1 Generate three role skill bundles from fixed store/project configuration with scoped prompts; verify all role/action combinations and legacy bundle compatibility with root automation tests and build checks.
- [x] 1.2 Validate event targets, role task scope, replay protection, locking, proposal registration and terminal outcomes; verify runtime fixtures cover success and blocked paths, and document configuration and boundaries.
- [x] 1.3 Allow store validation to accept new proposals and evolving role progress while retaining an explicit seeded-fixture check; verify both modes on the initial samples and a temporary added requirement.

## 2. App connection and controls

- [x] 2.1 Implement advertised-service connection, native package installation, signed dispatch and status bridge with private credentials; verify malformed responses, partial setup, uncertain outcomes and request isolation in bridge tests.
- [x] 2.2 Add one-prompt Propose/Update/Apply controls to all four role panels, run/status links and disposal-safe state; verify no automatic dispatch, duplicate prevention, input validation, remounting and status behavior in UI tests.
- [x] 2.3 Update app documentation, package version and build checks; verify the standalone bundle, complete app test suite and both OpenSpec changes.

## 3. Native integration

- [x] 3.1 Install and connect the updated App and three native role automations; verify every role can select each skill, source targets are visible and setup launches no conversation.
- [x] 3.2 Run one explicitly read-only native smoke request, verify run/conversation linkage and terminal status, compare source fingerprints, and save visual evidence without claiming unexecuted mutating scenarios passed.

## 4. Conversation origin tags

- [x] 4.1 Add requirement, role and exact stage/skill tags to native conversation creation, preserve existing tags, and verify all twelve role combinations plus the seven legacy stage mappings; rebuild bundles and update documentation.
- [x] 4.2 Reconnect the native role bundles and verify the four origin tags on a new read-only automation conversation; record native evidence and keep source artifacts unchanged.

## 5. Dedicated role and skill definitions

- [x] 5.1 Generate twelve fixed role/skill bundles, enforce role matching in runtime, and retire superseded source bundles outside the Git Sync folder; verify mapping and mismatch tests.
- [x] 5.2 Update connection migration, pair selection and validation; test all twelve routes, safe legacy retirement, partial setup and unknown subscribers.
- [x] 5.3 Build and install the updated App, replace the ten superseded native definitions with twelve dedicated definitions, verify a read-only native run and tags, and record evidence.

## 6. Conversation names

- [x] 6.1 Assign `[Role] <change>` before role execution, preserve tags, and test all twelve combinations plus naming failure; rebuild the twelve bundles.
- [x] 6.2 Reconnect native definitions, verify a new named conversation and unchanged source files, and document the naming behavior.
