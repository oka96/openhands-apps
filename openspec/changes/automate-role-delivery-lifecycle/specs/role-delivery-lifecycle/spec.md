## Purpose

Let every delivery role work from a requirement through specification revisions, reviewed implementation and Git delivery using automation-owned operations displayed in its role workspace.

## ADDED Requirements

### Requirement: Automation owns workflow behavior
All authoritative collection, scope, revision, dispatch and Git behavior SHALL be owned by the automation repository. Apps SHALL only visualize returned data and submit explicit automation inputs. Every workflow node SHALL correspond to a native OpenHands automation.

#### Scenario: View without executing
- **WHEN** a user loads or refreshes Kanban, a role workspace, a diff or a workflow node
- **THEN** no agent, repository modification, commit or publication starts
- **AND** the displayed node resolves to that role's installed native automation

### Requirement: Reusable requirement intake
SA SHALL create a new requirement from a prompt and application bindings. Each role SHALL create or update its own specs for different selected requirements. Backend and Frontend SHALL refer to SA; QA SHALL refer to SA, Backend and Frontend. Downstream specs SHALL bind one repository.

#### Scenario: Create another requirement
- **WHEN** SA submits a new canonical requirement ID, a feature, valid applications and a prompt
- **THEN** automation creates its planning change without requiring a pre-existing requirement or changing automation source
- **AND** downstream roles can derive specs from its validated bindings

### Requirement: Implementation workflow with local validation
Role Apps SHALL focus on planning, implementation, diff inspection and delivery. Code validation and regression execution SHALL remain local. The Apps SHALL NOT introduce a validation node, test dashboard or test-result delivery gate. QA SHALL implement regression code in its bound repository. Request, scope and Git snapshot integrity checks SHALL remain in automation.

#### Scenario: Deliver implementation before local validation
- **WHEN** a role has implemented changes and captured their current diff
- **THEN** Commit or Merge Request is available without a test-result record
- **AND** pending local validation is not represented as a passed check or a completed validation task

### Requirement: Durable specification revision diffs
Every run that modifies a selected spec SHALL record its before/after diff, action, time and outcome. The owning role app SHALL list and display those revisions, including additions, deletions, task changes and partial edits from failed runs.

#### Scenario: Inspect two successive updates
- **WHEN** two Update runs change a specification
- **THEN** the role app can display each run's distinct diff after reload
- **AND** it cannot substitute another role, store or spec's revision

### Requirement: Reviewed delivery snapshot
Review automation SHALL show current changes for the selected spec-store scope or bound code repository. Delivery SHALL require a matching immutable review and reject changes to content, repository identity, branch or HEAD after review.

#### Scenario: Changed content requires review again
- **WHEN** a file changes after review and a user submits Commit or Merge Request with that review
- **THEN** automation refuses delivery without committing or pushing
- **AND** requests a new review

### Requirement: Direct local commit
Commit automation SHALL create a local commit of exactly the reviewed paths using the user's commit message. It SHALL preserve unrelated staged files and SHALL report the commit SHA. It SHALL not push as part of the local Commit action.

#### Scenario: Commit selected spec changes
- **WHEN** another spec is staged and a role commits its reviewed spec
- **THEN** the new commit contains only the selected spec's reviewed changes
- **AND** the other staged changes remain staged

### Requirement: Merge request delivery
Merge Request automation SHALL create a unique branch, commit reviewed changes, push without force and open a GitHub pull request for GitHub repositories. It SHALL report the URL and preserve progress across a recoverable publication failure so retries do not duplicate delivery.

#### Scenario: Retry after PR creation failure
- **WHEN** a push succeeds but PR creation fails
- **THEN** the run reports the existing branch and commit
- **AND** retrying the same review reconciles that branch and opens or returns one PR without a second commit

### Requirement: SA remains design only
SA SHALL use its planning workspace and SHALL never implement, commit or publish application code. Its delivery actions SHALL target only its own specification scope. Other roles SHALL be confined to their single bound code repository and selected spec.

#### Scenario: Reject SA code delivery
- **WHEN** an SA event selects a code review or code delivery target
- **THEN** automation rejects it before code checkout, commit or publication

### Requirement: Role workspace delivery interface
Each role app SHALL provide prompt-based planning and implementation, source preview, revision selection, readable diffs, review selection and explicit Commit or Merge Request inputs. The workflow SHALL be generated and validated using Archify, with visual nodes mapped to the six native role automations.

#### Scenario: Review then deliver
- **WHEN** a user selects Review and inspects its returned diff
- **THEN** they can select Commit or Merge Request, supply a message and submit the chosen reviewed snapshot
- **AND** the app displays the native run, actual outcome and commit or PR receipt
