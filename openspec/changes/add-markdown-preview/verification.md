# Markdown preview verification

Verified on 2026-10-04 using Node.js 24.20.0 and the existing local OpenHands Canvas at port 8000.

## Automated checks

- `npm run check` passed: 93 JavaScript tests, 22 Python bridge tests, manifest/bundle validation, and all three active OpenSpec changes validated strictly.
- Official Canvas extension validator passed for both the package root and `--dist`.
- Renderer coverage includes Markdown structure, nested lists, disabled task controls, code whitespace, once-only entity decoding, safe links, raw HTML, script/event attributes, image embeds, obfuscated URL schemes, unsupported tokens, and invalid input.
- Viewer coverage includes default Preview, exact Source, selected mode/artifact across successful and failed refreshes, keyboard focus, missing/empty documents, parser failure recovery, and unchanged host-request counts.
- Independent read-only correctness review reported no findings. `git diff --check` passed.

## Native Canvas

- Reinstalled and enabled the local OpenSpec board, version 0.6.0, through Customize → Apps.
- Opened `/extensions/openspec-progress/progress/requirements/REQ-002` and verified formatted Proposal, Design, and Tasks content, with Preview selected initially.
- Switched to Source and verified original Markdown. Source remained selected after switching to Design and refreshing the requirement.
- Tasks preview showed eight disabled checkboxes, exactly one checked. REQ-002 remained in Solution Design with 1/8 tasks checked.
- Verified the viewer at effective 390px and 279px widths. Prose and paths wrapped, controls remained available, and the preview had no horizontal overflow at these widths. Restored the original browser viewport afterward.
- Corrected Canvas's inherited list reset with explicit ordered/unordered markers, rebuilt, reinstalled, and confirmed numbered decisions and bullet markers in the native accessibility tree.
- Saved local screenshot evidence at `artifacts/markdown-preview-req002.jpg` (ignored by Git).

## Full-height refinement

On 2026-10-04, removed both artifact height caps and their vertical overflow rules, rebuilt, and reinstalled the enabled local app. `npm run check` and both official Canvas validators passed again. Live REQ-002 Design measurements confirmed Preview client/scroll heights of 1468/1468px and Source heights of 1505/1505px; both report `max-height: none` and `overflow-y: visible`. The last paragraph remains present in normal page flow. Screenshot: `artifacts/markdown-full-height-req002.jpg` (ignored by Git).

## Scope

Only the apps repository changed. Automation and OpenSpec-store working trees remained clean. No automation was started and no requirement data was edited. The new change remains active and complete for inspection.

The preview uses [Marked's token API](https://marked.js.org/using_pro) with explicit DOM construction and an entity decoder. It does not insert raw or generated HTML. Dependencies are pinned and bundled, with no runtime downloads. Existing npm audit findings are confined to the pinned OpenSpec development-tool dependency chain; the added preview packages introduced no additional reported advisories.
