# Role skill automation

## Purpose

Let people start and inspect role-scoped OpenSpec work from requirement details while preserving the selected project, store, and skill boundary.

## ADDED Requirements

### Requirement: Explicit role actions
Each SA, Frontend, Backend, and QA panel SHALL offer Propose, Update, and Apply with one prompt input. Propose SHALL require a distinct new change name and prompt; Update SHALL require a revision prompt; Apply SHALL allow an optional prompt. Loading, filtering and refreshing the board SHALL NOT dispatch runs.

#### Scenario: Start selected role work
- **WHEN** a user submits Backend Apply for a loaded requirement
- **THEN** exactly one native automation request identifies Backend, Apply, that requirement and its active change

#### Scenario: Create related planning
- **WHEN** a role submits Propose with a new change name and concrete prompt
- **THEN** the new change is planned with tasks for all four roles and is added to the board after successful planning without replacing the selected requirement

### Requirement: Fixed execution targets
Automations SHALL keep their implementation workspace, registered spec store, skill source and profile in the automation repository configuration. Requests SHALL NOT override these targets and SHALL be rejected if their requirement, change or store does not match the configured store.

#### Scenario: Store mismatch
- **WHEN** a request refers to another store or an unrelated change
- **THEN** no agent starts and an actionable target mismatch is reported

### Requirement: Role and skill boundaries
Runs SHALL invoke the corresponding existing OpenSpec skill and stop after that skill. Apply SHALL execute and mark complete only verified tasks for the selected role. Update SHALL apply only the supplied revision scope. Propose and Update SHALL NOT implement application code; no run SHALL start another stage, commit, push, archive or deploy.

#### Scenario: Frontend completion
- **WHEN** Frontend Apply verifies its assigned work while QA remains open
- **THEN** only the verified Frontend tasks are completed and the requirement remains unfinished

#### Scenario: Unanswered question
- **WHEN** the request leaves a material decision or required approval unresolved
- **THEN** the run reports a blocked result and links the conversation instead of claiming completion

### Requirement: Native automation connection
An explicit connection action SHALL install or update twelve role-and-skill automation definitions from the automation repository and enable signed local requests. A connection probe SHALL be read-only. Credentials SHALL remain on the Agent Server and ordinary browser code SHALL receive only safe connection metadata and run references.

#### Scenario: Initial connection
- **WHEN** the user connects the role automations
- **THEN** each role’s dedicated Propose, Update and Apply become available without starting an agent or adding a schedule

### Requirement: Submission and status reliability
The App SHALL suppress duplicate submissions, retain a request reference for uncertain outcomes, and expose native run and conversation links with explicit status refresh. Late results SHALL NOT change an unmounted page. The runner SHALL reject replayed requests and serialize work sharing a store or implementation project.

#### Scenario: Lost dispatch response
- **WHEN** dispatch may have succeeded but its response is lost
- **THEN** the App retains the request reference and directs the user to Automation history without silently dispatching another request

#### Scenario: Run finishes
- **WHEN** a status refresh finds a completed native run
- **THEN** the App displays its terminal status and available conversation link, while requirement completion continues to come from source checkboxes

### Requirement: Conversation origin tags
Every newly created role conversation SHALL carry `requirement`, `role`, `openspecstage`, and `openspecskill` tags derived from validated run configuration. It SHALL preserve the existing change, automation run ID and automation trigger tags. Propose SHALL tag the selected context requirement and the new target change, including when planning is blocked. Legacy stage conversations SHALL carry the exact mapped skill without inventing a requirement or role.

#### Scenario: Trace selected role work
- **WHEN** SA Apply starts for REQ-006
- **THEN** the native conversation has requirement `REQ-006`, role `SA`, stage `apply`, and skill `openspec-apply-change` before agent execution

#### Scenario: Trace a related proposal
- **WHEN** Backend Propose starts from REQ-006 to plan a new change
- **THEN** the conversation identifies context requirement `REQ-006`, role `Backend`, stage `propose`, skill `openspec-propose`, and the new target change

### Requirement: Dedicated definitions and retirement
Each of SA, Frontend, Backend and QA SHALL have three distinct native automations, one for each supported skill. The definition filter, generated configuration, runtime and App selection SHALL agree on both role and stage. Setup SHALL remove the seven recognized legacy stage definitions and three superseded generic definitions using native soft deletion, preserving conversations. It SHALL refuse retirement while a superseded definition has pending or running work. Unrecognized automations SHALL remain untouched. Superseded source bundles SHALL remain outside the Git Sync definitions folder.

#### Scenario: Select Backend Apply
- **WHEN** Backend Apply is submitted
- **THEN** only OpenSpec Backend · Apply accepts the event and its runtime rejects any other role

#### Scenario: Upgrade an existing connection
- **WHEN** explicit connection encounters the ten recognized superseded definitions with no active runs
- **THEN** it retires them, preserves the signing source, and makes twelve dedicated role/skill definitions ready without starting an agent

#### Scenario: Migration cannot proceed safely
- **WHEN** a superseded definition has pending or running work or an unknown subscriber shares the role source
- **THEN** setup reports the conflict before mutating definitions and probe remains read-only

### Requirement: Role and spec conversation names
New role conversations SHALL be named `[Role] <OpenSpec change name>` before
agent execution. The name SHALL use the validated role and target change;
Propose SHALL use the new change name. Automatic title generation SHALL remain
disabled. Existing names and conversation tags SHALL be preserved.

#### Scenario: Name selected requirement work
- **WHEN** SA Apply starts for change `add-task-quick-capture`
- **THEN** its conversation is named `[SA] add-task-quick-capture`

#### Scenario: Name a new proposal
- **WHEN** Backend Propose targets change `add-task-attachments`
- **THEN** its conversation is named `[Backend] add-task-attachments` rather than using its context change

#### Scenario: Title update fails
- **WHEN** the native service cannot confirm that the title was saved
- **THEN** the runner reports the error without starting agent execution
