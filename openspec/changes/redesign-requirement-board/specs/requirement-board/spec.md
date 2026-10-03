# Requirement board

## Purpose

Let teams inspect the delivery status and source specifications of requirements across SA, Frontend, Backend, and QA from OpenHands Canvas.

## ADDED Requirements

### Requirement: Four-role completion gate
The App SHALL show SA, Frontend, Backend, and QA progress for every requirement and SHALL report Done only when all four roles have nonempty completed task sets and all tracked tasks are complete.

#### Scenario: QA remains open
- **WHEN** SA, Frontend, and Backend are complete but a QA task is unchecked
- **THEN** the requirement appears in QA and displays three of four roles complete

#### Scenario: Missing role tasks
- **WHEN** a role has no tracked tasks
- **THEN** that role is not complete and the App displays a tracking warning

### Requirement: Kanban and list views
The App SHALL show requirements in Backlog, SA, Implementation, QA, Blocked, and Done lanes and SHALL offer a list view, text search, and unfinished-role filter. Requirement data, cards, list columns, detail summaries, and filters SHALL omit priority.

#### Scenario: Requirements without priority
- **WHEN** a store contains requirement identity, role metadata and task checklists without priority fields
- **THEN** the board, list and detail views render successfully with no priority labels, columns or filter controls

#### Scenario: Blocked work
- **WHEN** an unfinished role is marked blocked
- **THEN** its requirement appears in Blocked with the blocker note available

#### Scenario: No matching requirements
- **WHEN** filters match no requirements
- **THEN** the App shows an empty state and a way to clear the filters

### Requirement: Source inspection
The App SHALL provide requirement detail routes showing role owners, task checklists, completion counts, notes and proposal, design, specification and task artifact contents with formatted Markdown preview and exact source text access.

#### Scenario: Open a requirement
- **WHEN** a user selects a card and reloads its detail route
- **THEN** the same requirement and its four roles are displayed from the selected store

#### Scenario: Malicious Markdown
- **WHEN** an artifact includes HTML or script syntax
- **THEN** raw HTML and script syntax is displayed as inert text in Preview and Source and executes no script

### Requirement: Reliable read-only refresh
The App SHALL read the selected store without changing its files or starting agents, SHALL support manual refresh, and SHALL label retained data stale after a refresh fails.

#### Scenario: Source changes
- **WHEN** a task checkbox is updated in the store and the user refreshes
- **THEN** role counts and the requirement lane reflect the updated file

#### Scenario: Failed refresh
- **WHEN** the backend cannot read the store after a successful load
- **THEN** the previous board remains visible with an explicit stale warning

### Requirement: Native Canvas integration
The App SHALL retain the `openspec-progress` identity, load the requested sample store by default, handle unknown routes visibly, and clean up page resources on navigation or disable.

#### Scenario: Local installation
- **WHEN** the validated App is installed and enabled in Canvas
- **THEN** OpenSpec Kanban appears in navigation and renders the sample requirements

#### Scenario: Dispose while loading
- **WHEN** the user leaves the App before a request completes
- **THEN** the late response does not append content or mutate the new page
