# Role automation outcomes

## Purpose

Give users trustworthy explanations, controlled corrections and effective execution settings for role-scoped OpenSpec automation runs.

## ADDED Requirements

### Requirement: Evidenced task corrections
Apply SHALL permit reopening an originally completed selected task only with an explicit reason tied to that exact task. It SHALL preserve task text and structure, reject sibling changes, and require verification evidence for new completion. Pending corrected tasks SHALL prevent a completed result.

#### Scenario: Revoke an unsupported checkbox
- **WHEN** the agent reopens a selected checked task and supplies its exact description and correction reason
- **THEN** the audit accepts the correction and preserves the reported blocker

#### Scenario: Missing reason or changed ownership
- **WHEN** a task is reopened without a reason, its text changes, or a sibling task is modified
- **THEN** the run reports the specific audit failure and cannot complete

### Requirement: Preserve agent and audit results
A postflight failure SHALL preserve the original agent summary and findings separately from audit errors. Runtime faults SHALL be distinguished from valid agent blockers and review findings.

#### Scenario: Blocker and scope violation coexist
- **WHEN** an agent reports a missing Backend dependency and also makes a forbidden task edit
- **THEN** both the original dependency explanation and the precise audit problem remain available

### Requirement: Explain business outcome independently of lifecycle
Kanban SHALL distinguish completed work, waiting on dependencies, human review and execution errors while retaining native lifecycle state and conversation links. It SHALL display available explanations and next steps and safely fall back for legacy or invalid reports.

#### Scenario: Dependency blocker
- **WHEN** a terminal run reports a dependency blocker
- **THEN** Kanban displays Waiting for dependency and its explanation rather than a generic failure alone

#### Scenario: Human review and execution error
- **WHEN** the agent reports findings or waits for confirmation, or the runner encounters a runtime error
- **THEN** Kanban identifies human review separately from execution error and provides the appropriate next action

#### Scenario: Foreign, malformed or legacy result
- **WHEN** a result is absent, malformed, oversized, symlinked or bound to another run, conversation, role or store
- **THEN** Kanban preserves native status and links to history without displaying untrusted details or inventing a business outcome

#### Scenario: Active or cancelled run
- **WHEN** native history says the run is pending, running or cancelled
- **THEN** a local result cannot override that lifecycle state

### Requirement: Effective configuration and launch guidance
Kanban SHALL show the selected Role and OpenSpec skill, configured agent profile, implementation project, spec store and timeout. It SHALL identify configurations requiring reconnect and display recorded settings for past runs. It SHALL explain that role runs require Kanban submission context.

#### Scenario: Change selected skill
- **WHEN** the user changes Skill
- **THEN** the effective skill mapping updates immediately without starting an agent

#### Scenario: Native zero-input run
- **WHEN** a role automation is started without the required signed request
- **THEN** it starts no agent and explains how to submit through Kanban with a requirement, Role spec and Skill

### Requirement: Preserve dispatch safeguards
Setup, status checks and page loads SHALL remain non-dispatching. Existing twelve role/skill bindings, replay prevention, scoped locks and confirmation settings SHALL remain intact.

#### Scenario: Install improved reporting
- **WHEN** the user reconnects updated bundles
- **THEN** the same twelve definitions and signing source are preserved and no conversation starts
