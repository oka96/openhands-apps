## ADDED Requirements

### Requirement: Planning and implementation automations only
Each role SHALL expose only Propose, Update and Apply automations. Review, Commit and Merge Request submissions SHALL be rejected. Manual delivery SHALL be initiated by the user in the related conversation. Code validation SHALL remain local.

#### Scenario: Removed delivery action
- **WHEN** a stale client submits a Review, Commit or Merge Request event
- **THEN** it is rejected before a conversation or Git mutation starts

### Requirement: Scoped conversation navigation
A selected role spec SHALL expose a button to open its newest related conversation, using the selected backend and exact store, requirement, role and spec identity. Lookup and navigation SHALL NOT start an agent or perform Git operations. The association SHALL survive page reloads without browser storage.

#### Scenario: Other spec ran more recently
- **WHEN** another spec has a newer conversation than the selected spec
- **THEN** the handoff still opens the selected spec's newest conversation

#### Scenario: No associated conversation
- **WHEN** no related conversation is found
- **THEN** the button is unavailable with instructions to run Propose, Update or Apply
- **AND** lookup failures are shown separately with a retry action

#### Scenario: Running conversation
- **WHEN** a role run has created its conversation and is still executing
- **THEN** a refreshed lookup can open that conversation for inspection

### Requirement: Preserve existing evidence and history
Connection migration SHALL disable retired delivery definitions without deleting native runs or conversations. Active work SHALL block retirement. Existing specification revision and delivery records SHALL remain stored. Role workspaces SHALL NOT load or display the inline evidence/diff panel; users SHALL inspect changes in the related conversation, with native automation history still accessible.

#### Scenario: Reconnect after upgrade
- **WHEN** the user reconnects an installation containing the six old actions per role
- **THEN** twelve planning and implementation definitions are active and the twelve delivery definitions are disabled
- **AND** existing native identifiers and history remain intact

#### Scenario: Open a role workspace
- **WHEN** the user opens or refreshes a selected spec's role workspace
- **THEN** it shows no revision diff or evidence-history panel and makes no evidence history or record requests
- **AND** conversation navigation, native automation history and source artifacts remain available

### Requirement: Concise role action panel
The role workspace SHALL prioritize the selected action, required inputs, Run and conversation controls. It SHALL omit repeated instructional paragraphs and selected requirement/spec text. Effective configuration and completed run details SHALL remain accessible in collapsed disclosures. Errors, blockers and unresolved runs SHALL remain visible without opening a disclosure.

#### Scenario: Ready selected spec
- **WHEN** a connected role workspace opens an existing spec
- **THEN** the action form and conversation controls appear without explanatory paragraphs or repeated selection text
- **AND** configuration and completed run details are collapsed by default

#### Scenario: Attention required
- **WHEN** connection, input or run state prevents proceeding
- **THEN** the reason and relevant recovery controls remain visible
