# Folder-derived requirements

## Purpose

Let a specification store expose independently scoped role changes and grouped requirement progress directly from its files, without a separately maintained requirement registry.

## ADDED Requirements

### Requirement: Four main role specifications
The store SHALL provide main role specifications for SA, FE, BE and QA at `openspec/specs/<role>/spec.md`, with lowercase role directory names. These specifications SHALL document the current role responsibilities, traceability and four-role completion workflow. The single shared task-workspace baseline and legacy change copies SHALL be absent; the active independent role changes SHALL retain their contracts and task progress.

#### Scenario: Inspect role baselines
- **WHEN** main specifications are listed from the store
- **THEN** SA, FE, BE and QA each have their own main specification instead of a single shared task-workspace specification

#### Scenario: Retire legacy copies
- **WHEN** the role baselines replace the shared specification
- **THEN** existing role change folders and task states remain intact and no legacy copy is retained under openspec/changes

### Requirement: Folder-derived identity
The system SHALL discover canonical role change directories and derive role, requirement prefix, numeric ID and feature from their names. Requirement identity SHALL preserve the exact prefix and digits. Discovery and execution SHALL NOT require requirements.json or another central requirement registry.

#### Scenario: Arbitrary requirement prefix without a registry
- **WHEN** SA-REQ-003-labels, FE-REQ-003-filters and BE-STORY-12-api exist without requirements.json
- **THEN** the first two group under REQ-003 and the third under STORY-12 with their correct roles

#### Scenario: Refresh after direct file changes
- **WHEN** a valid role change is added or removed directly on disk
- **THEN** refresh reflects it without any metadata registration step

#### Scenario: Unsafe or unrelated folders
- **WHEN** discovery encounters archive, unrelated changes, malformed role names, linked directories or configured size limits
- **THEN** archive and unrelated changes are excluded, and unsafe or oversized inputs are reported without reading outside the store

### Requirement: Independent artifacts and progress
Each role change SHALL supply its own proposal, design, specs and task checklist. Optional Markdown context MAY supply display titles, ownership and blockers. Missing context SHALL NOT prevent discovery. Checkbox completion SHALL remain authoritative; incomplete sources, empty tasks and unfinished sibling work SHALL prevent false completion.

#### Scenario: Metadata-free standard change
- **WHEN** a role folder contains ordinary OpenSpec artifacts and untagged tasks
- **THEN** it is grouped by its folder and its tasks inherit the folder's role

#### Scenario: Preserve sample states
- **WHEN** all current role specs are migrated
- **THEN** all six requirement groups, 28 role changes, 48 task lines, check states, context and ownership survive with the same aggregate progress

#### Scenario: Conflicting task role
- **WHEN** an explicit task role tag differs from the owning folder
- **THEN** validation rejects the mismatch instead of attributing work to another role

### Requirement: Selected change navigation
Kanban SHALL show every selected role change's own four artifact tabs and source path. Deep links SHALL select that change within its grouped requirement. Reading, refreshing and changing controls SHALL NOT dispatch work.

#### Scenario: Switch sibling changes
- **WHEN** the user switches from SA-REQ-003-labels to FE-REQ-003-filters
- **THEN** proposal, design, specs and tasks all come from the Frontend change and the skill form targets it

### Requirement: Folder-scoped automation
Signed v3 actions SHALL bind their role and requirement to canonical filesystem identities. Update and Apply SHALL target one existing role change. Propose SHALL create one new role change under the selected requirement without writing a registry. Planning SHALL preserve sibling changes; Apply SHALL retain task-evidence, audit and outcome protections.

#### Scenario: Propose another feature
- **WHEN** Frontend Propose selects REQ-003, an existing same-requirement context and a new feature
- **THEN** it plans a new FE-REQ-003-feature folder that becomes discoverable on refresh without registry edits

#### Scenario: Stale or mismatched action
- **WHEN** an old event, deleted context, wrong role/requirement or existing Propose target is submitted
- **THEN** it is rejected before an agent starts

#### Scenario: Repair incomplete planning
- **WHEN** a role change has incomplete artifacts after a blocked proposal
- **THEN** explicit Update can repair only that change and completion requires valid planning artifacts

### Requirement: Self-contained store and native tooling
The completed store SHALL operate and validate without migration backups, manifests or migration commands. Cleanup SHALL preserve active specification contracts, task lines, check states and presentation context. The pinned OpenSpec CLI SHALL discover, inspect and strictly validate role changes, and return each change's correct task sources and states.

#### Scenario: Remove completed migration data
- **WHEN** completed migration data and tooling are removed
- **THEN** store validation, seeded progress checks and native CLI commands work from current role folders alone, with no stale artifact references to deleted backups

#### Scenario: Deployment preserves history
- **WHEN** the App and twelve existing role automations are updated
- **THEN** native IDs and histories remain intact and no verification action starts an agent
