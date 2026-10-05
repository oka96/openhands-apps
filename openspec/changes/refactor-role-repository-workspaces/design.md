## Context

The Apps collector and Automation runtime independently derive role ownership from canonical folder names. Runtime uses a fixed LocalWorkspace and audits planning changes after execution. Store uses one generic schema and 28 illustrative changes. The supplied sample repositories have only README files.

## Goals / Non-Goals

Keep canonical folder identity, signed explicit dispatch, replay checks, native run history and task evidence. Preserve the Python standard-library runtime and existing browser JavaScript. No database, authentication or remote pushes.

## Decisions

- Add `scope.json` per change: version 1, applications (`id`, `name`, `role`, `repository`) and `references` (canonical upstream change IDs). JSON gives the standalone Python runtime and embedded Node collector deterministic parsing without a YAML library.
- Use `sa`, `backend`, `frontend`, `qa` schemas, keeping proposal/design/specs/tasks artifacts. SA references are empty; downstream references must cover required roles within the same requirement. Backend/frontend repository bindings must occur in referenced SA scope. QA's regression application is also declared by SA.
- Reject unsafe repository URLs (credentials, non-HTTPS, invalid GitHub paths), duplicate bindings and inconsistent references. Legacy generic changes remain readable for migration but cannot run without role scope.
- Configured workspace is the managed parent. A stable change-specific child contains the single downstream checkout; verify Git origin and root before reuse. Never pull or reset. SA runs directly from the registered spec store root so the conversation's files and Git panels identify the specification repository. SA receives no code clones. Keep the managed parent for locking and code-scope audits. Historical SA planning-directory reports remain readable; existing conversations retain their original workspace. Audits are workflow controls, not an OS sandbox.
- Propose inherits the selected context's compatible application binding and derives required upstream references from the requirement. Ambiguous targets require an explicit application selection; repository URLs and filesystem paths never come from event overrides.
- CLI executes from the store, whose pinned CLI and custom schemas are installed. SA conversations use that store; downstream conversations use the generated checkout. Skills remain at the configured skill root; sample repositories need no OpenSpec installation.
- Preserve the old OpenSpec tree in a dated archive outside active discovery. Seed one requirement with honest task progress and documented handoffs.

## Risks / Trade-offs

- Repository clone can fail → bounded timeout, no conversation on failure, leave clear retry guidance.
- LocalWorkspace is not a security sandbox → explicit role prompts, store audits and snapshots of managed sibling checkouts for observed violations.
- Existing installations contain old embedded bundles → rebuild and reconnect Apps and all twelve automation definitions, without auto-starting agents.

## Migration Plan

Backup store, create role schemas and demo, update validators and runtime, update Apps display and dispatch, rebuild packages, run unit/contract/CLI and browser checks, then install local bundles. Restore the backup and previous Git sources to roll back. Leave the change active.
