# Role Workspace Apps

## Purpose

Provide independent role workspaces for inspecting OpenSpec artifacts and deliberately running the related native automations from a shared requirement Kanban.

## ADDED Requirements

### Requirement: Independent fixed-role apps
The system SHALL provide separately installable OpenSpec SA, OpenSpec FE, OpenSpec BE and OpenSpec QA Canvas apps alongside OpenSpec Kanban. Each role app SHALL have an immutable role, display that role's work and offer its existing Propose, Update and Apply automations.

#### Scenario: Open a role app directly
- **WHEN** a user opens OpenSpec FE
- **THEN** the app lists Frontend work and the three Frontend automations, without presenting another role's artifacts or execution targets

### Requirement: Contextual Kanban navigation
Kanban SHALL retain the shared requirement overview and role progress, and link role summaries and individual changes to the corresponding role app. Links and return navigation SHALL preserve the exact store, requirement and selected change where applicable. Store selection SHALL be read afresh when a page mounts.

#### Scenario: Follow a selected change
- **WHEN** the user clicks a Backend change in a Kanban requirement detail
- **THEN** OpenSpec BE opens that requirement and change from the same store, and its Kanban link returns to that requirement in the same store

#### Scenario: Switch stores between apps
- **WHEN** a store is selected after other apps have activated
- **THEN** a newly mounted page uses explicit link context or the latest shared store selection, not activation-time state

### Requirement: Role artifact workspace
Each role app SHALL show its requirement progress, role change selector and Proposal, Design, Specification and Tasks artifacts with safe Markdown preview and literal source modes. Artifact content SHALL expand to its full height. Kanban SHALL place artifact inspection and skill execution in these role apps.

#### Scenario: Inspect and switch artifacts
- **WHEN** the user changes the selected role change or artifact tab
- **THEN** the displayed content and execution target refer to that exact change, with Markdown rendered safely and missing or empty artifacts explicitly identified

### Requirement: Related existing automations
Role apps SHALL reuse the twelve existing native definitions and shared connection state, filtering their presentation to the fixed role's three definitions. Existing automation IDs, history, signed dispatch validation, outcomes and pending request references SHALL be preserved. Discovery, navigation, refresh and artifact selection SHALL never dispatch work.

#### Scenario: Read role automation inventory
- **WHEN** a user opens or refreshes the QA app
- **THEN** its related Propose, Update and Apply definitions link to native automation history, and no run is created

#### Scenario: Explicit role execution
- **WHEN** the user submits an eligible skill for a selected role change
- **THEN** the existing validated dispatch path uses the fixed app role and selected change, prevents duplicate submission and retains its recoverable run reference

### Requirement: Explicit unavailable and invalid states
Unavailable or disabled role apps SHALL be identified by Kanban with a Manage Apps route. Invalid routes, missing requirements, stale changes and role-mismatched changes SHALL show explicit errors without silently selecting another execution target. A role with no change SHALL offer Propose using the same requirement's context.

#### Scenario: App is disabled
- **WHEN** a role app is missing or disabled in installed app inventory
- **THEN** Kanban identifies its unavailability and offers app management instead of a broken role destination

#### Scenario: Stale or wrong-role deep link
- **WHEN** a role app receives a selected change that is missing, belongs to another requirement or belongs to another role
- **THEN** it displays an explicit unavailable-target message and does not render an executable fallback target

#### Scenario: Empty role
- **WHEN** an existing requirement has no QA change
- **THEN** the QA workspace explains the empty role and permits Propose with a change from the same requirement as context

### Requirement: Shared build and safe lifecycle
All five app packages SHALL be built and validated from shared source. Page disposal and later refreshes SHALL suppress stale async UI writes and retain existing request recovery without introducing new definitions, store mutations or credentials.

#### Scenario: Leave while loading
- **WHEN** a user navigates away while discovery or artifact loading is pending
- **THEN** the disposed page is not repopulated by the late response and a new page uses its own current context

### Requirement: Distinct ordered native sidebar navigation
The local Canvas sidebar SHALL give Kanban, SA, FE, BE and QA distinct icons and display these apps in that order regardless of activation timing. Visual and keyboard navigation order SHALL agree. Existing app identities, links and unrelated app behavior SHALL be preserved.

#### Scenario: Concurrent activation completes out of order
- **WHEN** role apps register in any sequence or the page reloads
- **THEN** their available sidebar entries appear as Kanban, SA, FE, BE, QA, each with its own icon

#### Scenario: Only some role apps are available
- **WHEN** a role app is disabled or missing
- **THEN** the remaining OpenSpec entries retain their relative order and no unavailable entry is invented

### Requirement: Reproducible local host customization
The native sidebar customization SHALL be applied by a documented reversible script for the supported Canvas version. It SHALL preflight target files before mutation, reject unsupported versions or code shapes, preserve originals and be safe to reapply. It SHALL not require credentials or change automation/store state.

#### Scenario: Reapply or restore
- **WHEN** the same customization is applied twice or restored
- **THEN** reapplication does not duplicate changes and restoration returns the targeted files to their original content

#### Scenario: Existing browser has cached the original assets
- **WHEN** the customization is applied and the user reloads Canvas normally
- **THEN** revised asset URLs load the customized sidebar without clearing browser data or restarting the server

#### Scenario: Unsupported installed package
- **WHEN** the package version or expected sidebar structure differs
- **THEN** the script reports incompatibility before altering the installed package
