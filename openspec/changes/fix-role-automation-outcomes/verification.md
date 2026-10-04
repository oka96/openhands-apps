# Verification

Verified on 2026-10-04 against the local OpenHands deployment at `http://127.0.0.1:8000`.

## Automated checks

- `openhands-automation`: 72 Python tests passed, generated all twelve bundles, and `npm run check` confirmed they match the source templates.
- `openhands-apps`: `npm run check` passed: build, 127 JavaScript tests, 29 Python bridge tests, manifest validation, and strict validation of all five active OpenSpec changes.
- Official Canvas extension validator passed for both repository source and distribution, with the `OpenSpec Kanban` marker.
- The legacy App within `openhands-automation/apps/openspec-progress` also passed its existing check: 37 JavaScript tests, six Python tests, build and manifest validation.
- Both changed repositories passed `git diff --check`.

Regression coverage includes explained and unexplained task reopening; sibling/text edit rejection; preservation of the agent blocker alongside audit errors; completion refusal while tasks remain; outcome classification and bounds; injected-key redaction; missing, malformed, foreign and symlinked reports; native lifecycle precedence; effective and captured historical settings; safe DOM rendering; and duplicate-submission guards. A temporary-directory test writes a report through the actual runner and reads it through the actual bridge.

## Installed App and native definitions

- Reinstalled and enabled the updated local OpenSpec Kanban App from `/Users/oka/Desktop/openhands-apps` with its existing identity and permissions.
- Used Connect automations once to update the twelve existing role/skill definitions. Kanban returned `Connected · Propose, Update, Apply` with an enabled submit control.
- On REQ-003, switching Role spec to `FE-REQ-003-filters` selected Frontend. Switching Skill to Update and back to Apply immediately showed `openspec-update-change` and `openspec-apply-change`, respectively.
- Effective settings displayed the configured `codex-acp-demo` profile, 1800-second timeout, target code project, spec store and skill source. Launch guidance explained that the native Run now entry lacks requirement context and its profile selector does not override the configured role profile.
- Native Automations still showed 12 active definitions and five total runs. Existing SA, Frontend and Backend histories and run links remained present.
- Native SA Propose retained ID `2d65a56d-f6ab-401c-bf71-c62d8a3a248f`. Its published script included structured outcome handling, and its prompt showed the updated Kanban entry and effective profile/timeout guidance.
- Screenshot: `artifacts/automation-outcomes.jpg` (local ignored artifact, captured at the user's current browser viewport).

No agent was dispatched during verification. New outcome rendering was verified with DOM regression tests and the runner-to-bridge integration test; the live browser verified installation, configuration and selection behavior. Existing historical failures were not rewritten and correctly remain historical records without the new detailed reports.

## Scope and delivery

- `openspec-store` remained clean.
- The tracked app, package and OpenSpec diff in `openhands-demo` exactly matched the baseline captured before verification; its pre-existing changes were preserved.
- Changes are confined to the App and automation repositories. The OpenSpec change remains active with all six tasks complete; changes have not been committed or pushed.
