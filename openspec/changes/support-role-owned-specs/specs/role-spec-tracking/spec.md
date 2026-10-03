# Role-owned specification tracking

## Purpose

Let teams plan and inspect several named feature specifications for each role within a requirement, with accurate progress and independently scoped work.

## ADDED Requirements

### Requirement: Requirement and role spec identity
The store SHALL group specs under `REQ-<number>` requirements and SA, Frontend, Backend, and QA roles. Spec IDs SHALL be `<prefix>-<requirement ID>-<feature>`, using SA, FE, BE, and QA respectively. Each role SHALL support multiple unique specs. Invalid ownership, duplicate IDs and unsafe feature names SHALL be rejected.

#### Scenario: Multiple frontend features
- **WHEN** REQ-003 has `FE-REQ-003-labels` and `FE-REQ-003-filters`
- **THEN** both remain individually addressable under Frontend and neither overwrites the other

#### Scenario: Wrong requirement or role
- **WHEN** a Backend entry identifies `FE-REQ-002-dates` or a REQ-003 spec is registered under REQ-002
- **THEN** the store is rejected with a useful validation error

### Requirement: Independent spec tasks and aggregate progress
Each spec SHALL have its own source specification and task checklist. Task IDs SHALL be unique within a spec and can repeat across specs. A role SHALL be complete only when all its registered specs have nonempty completed task sets. Requirement stages SHALL aggregate all four roles and prioritize unfinished blockers. Missing specs or tasks SHALL remain visibly incomplete.

#### Scenario: A second spec is unfinished
- **WHEN** one Frontend spec is complete and another contains unchecked tasks
- **THEN** Frontend and its requirement remain incomplete, with individual spec counts shown

#### Scenario: Missing task source
- **WHEN** a registered spec has no task file
- **THEN** a tracking warning is shown and its role cannot be marked complete

#### Scenario: Unregistered source work
- **WHEN** an active spec directory or task file is absent from the metadata index
- **THEN** the board reports that inconsistency instead of omitting the work from progress

### Requirement: Source and role spec navigation
Kanban SHALL show each role's named specs and their progress, support searching by spec ID or title, and allow selection of each spec's specification and tasks. Shared requirement proposal and design SHALL remain accessible. Preview and exact Source modes SHALL render full height and preserve their selection during refresh.

#### Scenario: Inspect sibling specifications
- **WHEN** a user selects the second Frontend spec on a requirement
- **THEN** its own specification and task source are displayed, with the selected ID visible and no mixing with sibling content

### Requirement: Spec-scoped automation
Propose SHALL add a named spec under the selected requirement and role. Update and Apply SHALL target one registered spec. Requests SHALL bind requirement, role, spec, stage and change before starting. Planning SHALL preserve sibling specs and shared context; Apply SHALL only change selected-spec completion markers and verified implementation work. Conversations SHALL include spec tags and use `[Role] <spec ID>` names.

#### Scenario: Add another Backend spec
- **WHEN** Backend Propose supplies a new feature slug and prompt for REQ-002
- **THEN** validated planning registers `BE-REQ-002-<feature>` in that requirement and preserves existing specs and requirements

#### Scenario: Apply one of several specs
- **WHEN** QA Apply selects the second registered QA spec
- **THEN** only that spec's tasks are eligible for completion and the conversation identifies that spec

#### Scenario: Reject stale target
- **WHEN** the selected spec is removed, renamed, belongs to another role or the request uses obsolete bindings
- **THEN** no agent starts and the mismatch is reported

### Requirement: Safe migration and local workflow
Migration SHALL preserve requirement IDs, task descriptions and checkbox states, ownership and blocker context, and original source artifacts. The configured OpenSpec CLI SHALL discover and validate role specs and all per-spec tasks through a local workflow schema. Board loads, connection setup and verification SHALL NOT dispatch agent work.

#### Scenario: Preserve the six sample requirements
- **WHEN** the current samples are migrated
- **THEN** their task totals and stage distribution remain unchanged, including REQ-002 in Solution Design, and REQ-003 demonstrates multiple specs per role

#### Scenario: CLI task discovery
- **WHEN** OpenSpec apply instructions are read for a migrated requirement
- **THEN** tasks from each role spec are returned with their correct file paths and checkbox states
