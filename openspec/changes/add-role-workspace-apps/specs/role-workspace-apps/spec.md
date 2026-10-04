# Role Workspace Apps

## Purpose

Provide independent role workspaces for inspecting OpenSpec artifacts and deliberately running the related native automations from a shared requirement Kanban.

## ADDED Requirements

### Requirement: Independent fixed-role apps
The system SHALL provide separately installable SA Workflow, FE Workflow, BE Workflow and QA Workflow Canvas apps alongside OpenSpec Kanban. The app management name, sidebar label and page heading SHALL use these names. Each role app SHALL have an immutable role, display that role's work and offer its existing Propose, Update and Apply automations.

#### Scenario: Open a role app directly
- **WHEN** a user opens FE Workflow
- **THEN** the app lists Frontend work and the three Frontend automations, without presenting another role's artifacts or execution targets

### Requirement: Contextual Kanban navigation
Kanban SHALL retain the shared requirement overview and role progress, and link role summaries and individual changes to the corresponding role app. Links and return navigation SHALL preserve the exact store, requirement and selected change where applicable. Store selection SHALL be read afresh when a page mounts.

#### Scenario: Follow a selected change
- **WHEN** the user clicks a Backend change in a Kanban requirement detail
- **THEN** BE Workflow opens that requirement and change from the same store, and its Kanban link returns to that requirement in the same store

#### Scenario: Switch stores between apps
- **WHEN** a store is selected after other apps have activated
- **THEN** a newly mounted page uses explicit link context or the latest shared store selection, not activation-time state

### Requirement: Role artifact workspace
Each role app SHALL show its requirement progress, role change selector and Proposal, Design, Specification and Tasks artifacts with safe Markdown preview and literal source modes. Artifact content SHALL expand to its full height. Kanban SHALL place artifact inspection and automation execution in these role apps.

#### Scenario: Inspect and switch artifacts
- **WHEN** the user changes the selected role change or artifact tab
- **THEN** the displayed content and execution target refer to that exact change, with Markdown rendered safely and missing or empty artifacts explicitly identified

### Requirement: Related existing automations
Role apps SHALL reuse the twelve existing native definitions and shared connection state, filtering their presentation to the fixed role's three definitions. Existing automation IDs, history, signed dispatch validation, outcomes and pending request references SHALL be preserved. Discovery, navigation, refresh and artifact selection SHALL never dispatch work.

#### Scenario: Read role automation inventory
- **WHEN** a user opens or refreshes the QA app
- **THEN** its related Propose, Update and Apply definitions link to native automation history, and no run is created

#### Scenario: Explicit role execution
- **WHEN** the user submits an eligible automation for a selected role change
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

### Requirement: Automation terminology with stable execution
App-owned controls, help, footers, configuration captions, accessible names and errors SHALL describe execution as automation rather than skills. The workflow diagram SHALL select Propose, Update and Apply automations with one authoritative action state. Existing OpenSpec action mappings, role/stage payloads, app routes, automation IDs, run history and source artifact text SHALL be preserved.

#### Scenario: Choose an automation
- **WHEN** the user selects Propose, Update or Apply in a role workflow
- **THEN** automation labels and the matching form requirements update without dispatch, and explicit submission still targets the corresponding existing OpenSpec action for that role

#### Scenario: Existing installation is upgraded
- **WHEN** the five apps are updated to the workflow naming release
- **THEN** prior deep links, shared store selection, existing automation history, distinct sidebar icons and Kanban/SA/FE/BE/QA order remain valid

### Requirement: Shared build and safe lifecycle
All five app packages SHALL be built and validated from shared source. Page disposal and later refreshes SHALL suppress stale async UI writes and retain existing request recovery without introducing new definitions, store mutations or credentials.

#### Scenario: Leave while loading
- **WHEN** a user navigates away while discovery or artifact loading is pending
- **THEN** the disposed page is not repopulated by the late response and a new page uses its own current context

### Requirement: Interactive Archify workflow workspace
Each role app SHALL show the actual Archify Propose, Update and Apply viewer in a larger left canvas and the selected automation details, real target selection and prompt form in a smaller right column. Archify zoom, pan, reset, finder, focus, lens, radar, route, presentation, theme/style and export controls SHALL remain available where supported by the viewer. Nodes SHALL support pointer and keyboard selection, expose selection accessibly and never dispatch on selection. The selected automation marker and form stage SHALL stay synchronized independently of viewer inspection focus, preserving draft text and current source view during node changes. Narrow layouts SHALL stack the panels without horizontal page overflow or hidden controls.

#### Scenario: Explore the interactive canvas
- **WHEN** the user zooms, pans, resets the view, searches or inspects a route
- **THEN** Archify's native viewer performs that interaction without changing the automation target, losing the prompt or starting work

#### Scenario: Reject unrelated or stale viewer messages
- **WHEN** another window, an invalid message or a disposed viewer sends a selection event
- **THEN** the app ignores it and preserves its current form stage, target and draft

#### Scenario: Select a workflow node
- **WHEN** the user clicks or activates Update with the keyboard in any role app
- **THEN** Update is selected on the diagram and the right panel shows that role's existing Update automation, prompt and applicable run control without remounting or clearing the draft or artifact, and no node-details popup obscures the canvas

#### Scenario: Embedded node details stay hidden
- **WHEN** node selection or viewer inspection focuses a node in a role workflow
- **THEN** the embedded Semantic Passport panel remains hidden while native zoom, pan and other canvas controls remain usable; the standalone Archify artifact retains its own viewer behavior

#### Scenario: Start without a requirement
- **WHEN** the user opens a role home and selects an automation
- **THEN** its prompt can be drafted on the right, Run remains disabled until an actual requirement/spec is selected, and an explicit first-target selection may carry that in-memory draft only to the exact selected destination

#### Scenario: Preserve target and artifact boundaries
- **WHEN** the user changes an already selected requirement or role spec, switches artifact Preview/Source, or changes an automation during dispatch
- **THEN** a different target clears its draft, artifact mode changes preserve the current form and source target, and in-flight dispatch refuses workflow node changes

#### Scenario: Source artifacts remain available
- **WHEN** the selected role spec has source artifacts
- **THEN** a full-width section below both upper columns retains safe Markdown Preview, literal Source and the artifact tabs, and content expands in the page without a nested vertical scrollbar

#### Scenario: Typical flow is illustrative
- **WHEN** a user selects any valid automation node out of diagram order
- **THEN** selection is allowed subject to existing target validation and only explicit Run submits one corresponding automation; no other node runs automatically

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
