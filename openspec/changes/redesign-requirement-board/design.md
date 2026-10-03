# Design

## Context

Canvas 1.24.0 supports one bundled ESM App with `activate(host)` and routed pages. The existing App has ID `openspec-progress`, page `progress`, and uses the local Agent Server bash adapter. The requested store and App are separate Git repositories. See proposal.md for motivation.

## Goals / Non-Goals

**Goals:** A fast, readable requirement board with explicit role handoffs and inspectable Markdown evidence, installed in the existing Canvas instance.

**Non-Goals:** Editing task checkboxes through the board, background agent dispatch, workflow orchestration, authentication, or an extra backend. The Kanban is a progress visualization; source files remain the progress source. Explicit role skill actions are specified separately in `add-role-skill-automations`.

## Decisions

- Use a versioned `openspec/requirements.json` index for requirement identity, owners and unfinished-role state hints. Keep task completion in role-tagged OpenSpec Markdown checkboxes. Duplicating completion into JSON was rejected because it can drift. Priority is excluded from the data contract and all views; search and unfinished-role filtering remain available.
- Collect files with one fixed, embedded Node script. The browser uses structured `cwd` and passes only encoded data. Validate paths, limits, identifiers and output; reject symlinks escaping the selected store. A separate HTTP service was rejected because the authenticated host adapter already exists.
- Derive role completion only from a nonempty set of checked tasks. Blocked unfinished roles take precedence. Remaining work moves through Backlog → SA → Implementation (Frontend + Backend) → QA → Done. Unassigned tasks warn and prevent false completion.
- Render with DOM APIs and scoped CSS, using textContent for all file content. Bundle CSS/collector with esbuild. No runtime dependencies.
- Preserve App/page identity and use `/progress/requirements/REQ-001` for deep links. Map old `/progress/changes/<name>` links when possible. Save selected directory per backend, while filters remain in memory for navigation.
- Keep read-only manual refresh. Retain a previous snapshot with an explicit stale banner after failure. Ignore results from disposed views and obsolete requests.
- Six illustrative requirements exercise every board lane. Checkmarks in the sample store are fixtures, not evidence of shipped software.

## Risks / Trade-offs

- Source files can be inconsistent → validate metadata and expose missing artifacts/role tracking.
- A large store can exceed response limits → bounded reads and an explicit error, never truncated totals.
- Browser storage can be unavailable → fall back to the default directory.
- App installation copies the built bundle → rebuild and reinstall after changes; verify the installed version and reload.

## Migration Plan

Build and test the bundle, install the local directory under the existing `openspec-progress` identity, enable it, and verify native routes/refresh/reload. The prior App package remains available in `openhands-automation/apps/openspec-progress` for rollback. Automations and conversation data are untouched.
