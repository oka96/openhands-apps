# Proposal

## Why

Requirement documents currently display raw Markdown, making designs and specifications harder to read. Users need a formatted preview while retaining the exact source for inspection.

## What Changes

- Add Preview and Source controls to the existing Proposal, Design, Specification, and Tasks viewer; default to Preview.
- Render headings, paragraphs, emphasis, lists, read-only task checkboxes, code blocks, quotes, tables, and safe external links.
- Preserve raw source, paths, missing/empty states, selected mode across artifact changes and refresh, and read-only behavior.
- Expand Preview and Source to the document's full height so reading uses the page scroll rather than a nested artifact scroll area.
- Keep embedded HTML inert and images as text without loading remote resources.
- Clarify the active requirement-board source-inspection spec to permit formatted Markdown alongside source text.

## Capabilities

### New Capabilities

- `artifact-preview`: Safe formatted inspection of OpenSpec Markdown with exact source access. No main capabilities have been archived yet; the active requirement-board change supplies the existing viewer.

### Modified Capabilities

None in the main specs. The active requirement-board source-inspection wording is updated explicitly for compatibility.

## Impact

Changes are confined to the app's browser viewer, styles, tests, documentation, built bundle, and version metadata. A pinned Markdown tokenizer is bundled into the existing single-file extension. Existing collector, client contracts, automation definitions, and spec-store data remain unchanged.
