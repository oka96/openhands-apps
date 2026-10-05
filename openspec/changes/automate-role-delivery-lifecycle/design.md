# Design

## Context

The existing Apps embed a Python connection/dispatch service and a Node collector. Automation runs already validate signed role events, lock the store and workspaces, clone scoped repositories and audit agent edits. There are no revision records or Git delivery actions. See proposal.md for motivation.

## Goals / Non-Goals

Operations and authoritative rules live in the automation repository. Apps render data and submit explicit requests; passive reads never start a run. Keep the existing local deployment, standard-library Python runtime and native run records. SA remains design-only. Testing the workflow must not start implementation of the prepared meeting-room demo or publish test PRs to users' repositories.

## Decisions

- Move the collector and connection service to the automation runtime. Apps contain bounded transport loaders and presentation validation only, not duplicate ownership, setup, Git or revision logic. A single automation-owned action catalog drives generated bundles and UI labels.
- Six stages per role: Propose, Update, Review, Apply, Commit, Merge Request. Planning and Apply use the saved OpenHands model profile. Review and Git delivery are deterministic native automations and do not need a model conversation.
- New requirements enter through SA Propose with a requirement ID, feature name, prompt and explicit application bindings. Existing requirements derive downstream bindings and upstream references from validated SA scope. Submitted values are data, never filesystem or command overrides.
- Persist per-run specification before/after diffs in private state outside the store. Save partial changes even when agent execution or audit fails. Role/spec/store identity scopes history; the Apps request bounded records and render unified text without executing Markdown/HTML.
- Review captures current spec and code Git changes, including new/deleted files and binary indicators, and fingerprints the repository HEAD, branch, origin, file contents and modes. Each target has its own immutable review ID. Commit/MR requires that exact ID and rejects changed content or context. SA can only select the spec-store target. Downstream roles can choose their selected spec or their single code repository.
- Commit creates a local commit containing only reviewed paths. An isolated Git index preserves unrelated staging; immutable-tree Git plumbing verifies staged bytes and atomically advances HEAD with an expected old SHA. Repository commit hooks are not executed; task verification belongs to Apply and is visible before delivery. Merge Request creates a unique codex branch, commits the reviewed changes, pushes without force, and opens a GitHub pull request using the installed gh authentication. The review records the original branch as the base. All input travels as argument arrays or body files. Delivery state records side effects so a retry of the same review resumes a failed push/PR step rather than making another commit or PR.
- The UI shows prompt input, current source, revision history, review target, exact diff and explicit delivery controls. Choosing a node only selects an automation. The Archify diagram contains only real automation nodes and branches from Review to either Commit or Merge Request; users may loop through Update/Apply and review again.

## Risks / Trade-offs

- Git or gh can fail after an earlier step succeeded → persist commit/branch/publication receipts and reconcile remote PR state before retry; report the actual completed steps.
- User edits can occur between review and delivery → recheck fingerprint under the same role workspace locks before writing Git state.
- Large or linked files can defeat readable review → reject unsafe or oversized snapshots before delivery, and explicitly identify binary diffs.
- LocalWorkspace is not OS isolation → preserve existing role scope audits, and keep deterministic Git operations outside the model conversation.
- The automation repository must be available to the local Agent Server → fail with an actionable missing-runtime error; never silently fall back to Apps-owned business logic.

## Migration Plan

Add automation runtime control/collection and revision/delivery functions, extend the signed event contract with bounded optional fields, generate 24 bundles, and switch Apps to the runtime transport. Preserve existing automation IDs and history when reconnecting and add the 12 new definitions. Regenerate the workflow with Archify, rebuild/install the Apps, and verify the live read-only screens. Keep previous commits available for rollback and leave this change active.
