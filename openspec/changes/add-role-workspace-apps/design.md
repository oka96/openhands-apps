# Design

## Context

OpenSpec Kanban currently owns the shared collector, safe Markdown renderer and role execution form. A v3 collector returns grouped requirements with all four roles, artifacts and progress. Twelve native automations already exist and use a shared signed bridge and persisted request references. Canvas supports independent manifests, per-app page registration and cross-app navigation; installed app inventory reports enabled state.

## Goals / Non-Goals

Goals: four separately installable fixed-role apps; shared Kanban overview; precise store/requirement/change navigation; related automation inventory and existing dispatch; artifact preview in role workspaces; preserve lifecycle, history and safety behavior.

Non-goals: new role permissions, new automations, separate services or stores, data migration, product changes, automatic runs, commit or push.

## Decisions

1. Build five manifests and bundles from shared source. Root remains `openspec-progress` at `/progress`; role packages live under `apps/openspec-{sa,fe,be,qa}` with page `role` at `/role`. Tiny entrypoints bind the immutable collector role (SA, Frontend, Backend, QA). Metadata and route helpers are shared, with version 0.8.0 across packages.
2. Preserve the existing read-only v3 collector. Every app reads the same validated grouped snapshot; role apps filter presentation and execution targets. Cross-role context remains available internally for Propose on an empty role and requirement aggregate calculation. App separation is navigation, not authorization isolation.
3. Encode store context as a canonical UTF-8 base64url path component: `stores/<token>/requirements/<id>/changes/<change>`. This avoids host query parsing and encoded slash ambiguity. Preserve old Kanban requirement/change routes. Re-read the existing shared localStorage key on every mount; explicit valid link context takes precedence. Return links retain exact store and requirement. Reject invalid or mismatched targets rather than silently executing a fallback.
4. Keep requirement summaries and checklists in Kanban. Role pills and spec names link to role apps; cards use non-nested anchors. Fetch installed app inventory through the authenticated host API; absent, disabled or failed inventory gets an explicit unavailable/unknown state and app-management link. Refresh retries inventory.
5. Role home shows its work list and a catalog of three related native automations with history links. Role detail adds fixed-role progress, its change selector, artifact viewer and existing role actions. Safe Markdown, source mode, full-height content and missing-file states remain shared.
6. Keep transport probe/setup's global twelve-definition validation and shared connection directory. Filter only presentation to three matching definitions. Setup is labeled as shared connection setup. Retain role request storage keys independent of app name. Update stale launch guidance to direct users to the role workspace. No additional native definitions or automatic dispatch.
7. Retain generation/disposal guards for async work and dispose role forms when changing targets. Navigating, refreshing or selecting files never executes a skill. Deep-link selection survives refresh; losing a selected target shows an explicit error.
8. Customize the installed Canvas 1.24.0 sidebar through a version- and structure-checked script kept in this repo. Canvas hard-codes one icon and renders pages in concurrent activation completion order; its manifest/API provides neither icon nor order. A presentation map keyed by the five existing app identities assigns Kanban columns, SA design nodes, FE browser window, BE database and QA shield/check icons. Order their React navigation items as Kanban, SA, FE, BE, QA so keyboard and visual order agree. Keep other apps' behavior and relative order intact. Preflight every patch before writing, keep recoverable originals, support idempotent reapplication and restore, and reject an unsupported host instead of guessing at code replacements. No extension DOM observers, CSS-only ordering, renamed identities or SDK schema changes.

## Risks / Trade-offs

- Five packages increase installation work: one build/validation loop and tiny entrypoints prevent source forks.
- App inventory can fail independently of store reads: board stays readable while navigation availability is explained and retried.
- Shared setup still validates all twelve definitions: UI explains shared configuration while showing only the current role's definitions.
- Full collector responses include other roles internally: retain existing contract and avoid an unnecessary schema change; this feature does not promise permission isolation.
- Deep links include a local store path encoded for routing, not secrecy. Validate it with the existing workspace rules before collector access.
- Sidebar customization targets the locally installed host version and can be overwritten by reinstalling that dependency. Document the reapply/restore commands; guard changed versions and source shapes before writing. This is a local integration, not a newly supported upstream manifest field.

## Deployment / Verification

Build and validate every source package and distribution, run focused navigation, role UI, automation and lifecycle regressions plus existing test suite and strict OpenSpec checks. Install/update the five local packages and enable the four role apps through Canvas management. Verify SA/FE/BE/QA links and exact selected artifacts, native automation catalogs, return routes and unchanged automation/run inventory without dispatching agents. Capture browser evidence and leave this change active. Rollback is reinstalling the previous Kanban bundle and disabling role packages; store data is unaffected.

For the sidebar refinement, test ordering from arbitrary activation sequences and partial inventories, distinct icons, unrelated app preservation, guarded/idempotent patching and restoration. Canvas serves asset files with immutable caching, so patch the manifest and HTML references with a deterministic revision derived from the changed sidebar bundle. HTML is read fresh with no-cache headers, making the revised asset URLs available on a normal reload without restarting services. Include these files in the same preflight and recoverable backup as the sidebar modules. Apply the script to the installed 1.24.0 dependency, reload Canvas, verify the real sidebar order and icons, and capture a screenshot. Restore uses the saved original dependency files.
