# Tasks

## 1. Safe Markdown rendering

- [x] 1.1 Bundle the pinned Markdown tokenizer and implement DOM rendering; verify headings, lists, disabled task checkboxes, quotes, code, tables, entities, and safe links with renderer tests.
- [x] 1.2 Cover hostile HTML, unsafe URLs, image embeds, and unsupported input with renderer tests proving no executable nodes or embedded network loads are created.

## 2. Artifact viewer

- [x] 2.1 Add Preview and Source controls, formatted styles, and missing/empty/error states; verify exact source, keyboard focus, mode retention across artifacts/refresh, and no extra host calls in UI tests.
- [x] 2.2 Document the preview controls and supported content, update app version metadata, and build the self-contained bundle; verify the README and manifest agree with the implementation.

## 3. Integrated verification

- [x] 3.1 Run npm run check and the official Canvas validator for source and dist; record results and resolve failures without weakening checks.
- [x] 3.2 Update the installed local app and verify REQ-002 Preview, Source, artifact switching, disabled task checkboxes, refresh, and narrow layout in Canvas; record evidence and leave the change active.

## 4. Full-height content refinement

- [x] 4.1 Remove the Preview and Source height caps, rebuild and validate, update the installed app, and verify both modes expand past their former limits without internal vertical overflow.
