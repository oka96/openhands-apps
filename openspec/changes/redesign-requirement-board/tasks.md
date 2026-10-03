# Tasks

## 1. Store bridge

- [x] 1.1 Implement bounded read-only collection and four-role stage derivation; verify collector tests cover missing roles, blocked work, malformed metadata and unsafe paths.
- [x] 1.2 Implement the authenticated Canvas client bridge; verify Unicode, failed requests, partial output and inconsistent data tests.

## 2. Board experience

- [x] 2.1 Build responsive Kanban and list views with search and role filters; verify rendering and empty-state tests.
- [x] 2.2 Build nested requirement detail routes with role checklists and safe artifact inspection; verify route, XSS, cleanup and stale-refresh tests.
- [x] 2.3 Document store format, sample semantics, local installation and development commands; verify the README matches working commands.

## 3. Native integration

- [x] 3.1 Build a standalone browser bundle and manifest; pass package checks and the official Canvas extension validator.
- [x] 3.2 Install the redesigned App in OpenHands and verify board, filters, detail reload, live source refresh, unknown routes and disable/re-enable; save visual evidence.
- [x] 3.3 Verify the separate sample store is registered, all six requirements contain four roles, and strict OpenSpec validation passes in both repositories.

## 4. Remove priority

- [x] 4.1 Remove priority from the collector/client contract and sample store; retain six sample requirements and four roles, and validate the updated store.
- [x] 4.2 Remove priority labels, list columns, detail badges, filters and styles; update documentation and verify search, role filters and completion behavior.
- [x] 4.3 Build and validate the updated package, update the installed OpenHands App, and verify the board, list and details no longer show priority; save visual evidence.
