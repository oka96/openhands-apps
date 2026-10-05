## Purpose

Associate role specifications with their impacted applications and upstream contracts, then execute authorized actions inside the appropriate repository workspace.

## ADDED Requirements

### Requirement: Role-specific repository scope
SA specifications SHALL support multiple repositories and SHALL hand off code work to backend and frontend. Backend and frontend specifications SHALL each bind exactly one repository and reference SA. QA specifications SHALL bind exactly one regression repository and reference SA, frontend and backend.

#### Scenario: Trace a meeting-room requirement
- **WHEN** the meeting-room role changes are loaded
- **THEN** SA lists the impacted applications, backend and frontend reference SA, and QA references all three upstream roles
- **AND** each downstream change has one implementation repository

#### Scenario: Reject invalid scope
- **WHEN** a downstream change has multiple repositories, a missing required upstream reference, a role mismatch or a reference outside its requirement
- **THEN** execution fails before cloning or starting a conversation

### Requirement: Observable application bindings
Kanban and role workspaces SHALL derive impacted application names, repositories and upstream references from each selected spec's structured scope. Refresh and navigation SHALL remain read-only.

#### Scenario: Inspect each role
- **WHEN** a user opens each role's meeting-room spec
- **THEN** the role displays only its bound applications and its upstream references with navigable repository links

### Requirement: Managed repository execution
Before a downstream conversation starts, automation SHALL create a managed workspace and clone the spec's repository into it, or reuse its existing matching checkout without resetting user work. The conversation SHALL run with that checkout as its working directory. Clone failures and mismatched or linked paths SHALL prevent conversation startup.

#### Scenario: First downstream run
- **WHEN** a valid backend action targets a repository with no managed checkout
- **THEN** automation clones it and passes the resulting checkout to the conversation's LocalWorkspace

#### Scenario: Reuse preserves work
- **WHEN** the same change runs again with uncommitted implementation files
- **THEN** it reuses the matching checkout without resetting or pulling those files

### Requirement: SA design-only execution
Every SA action SHALL use the registered specification store root as its workspace without cloning code repositories. SA Apply SHALL verify design and handoff tasks only. It SHALL never authorize implementation changes, and scope audits SHALL reject observed code modifications.

#### Scenario: Update specifications in the correct repository
- **WHEN** SA Update creates a conversation
- **THEN** its LocalWorkspace working directory is the registered specification store root and its Git repository is the spec store
- **AND** the run report records that workspace, while historical SA planning-directory reports remain readable
- **AND** existing conversations retain the workspace they were created with

#### Scenario: Apply solution design
- **WHEN** SA Apply runs
- **THEN** it can verify its selected checklist and handoff to backend/frontend without editing application code

### Requirement: Recoverable demo reset
Reset SHALL preserve existing specs including uncommitted changes in a recovery archive before replacing active specs. The replacement SHALL demonstrate room listing, booking creation, overlap rejection and cancellation using the three supplied repositories. Implementation tasks SHALL remain unchecked until verified.

#### Scenario: Fresh demonstration
- **WHEN** reset completes
- **THEN** the board shows one coherent meeting-room requirement with four role changes and the prior demo is recoverable outside active discovery
