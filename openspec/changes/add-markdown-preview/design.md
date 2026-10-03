# Design

## Context

The collector and client already validate and return bounded Markdown content for four artifact kinds. The viewer renders that content using `textContent` in a preformatted block. Canvas host API 1 offers no Markdown renderer. See proposal.md for motivation.

## Goals / Non-Goals

**Goals:** Format existing snapshot content locally, preserve exact source and existing read-only boundaries, and keep the extension self-contained.

**Non-Goals:** Editing documents, remote image loading, Mermaid execution, syntax highlighting, file-link resolution, and changes to automation or store data.

## Decisions

- Use pinned Marked 18.0.14 only for tokenization; convert supported tokens to DOM elements and use text nodes for all document strings. This reuses a maintained Markdown grammar without inserting generated or raw HTML. A handwritten grammar would require maintaining nested lists, tables, and escaping; HTML generation plus sanitization adds another security-sensitive stage.
- Add a small renderer module with explicit node and URL handling. Decode text entities with pinned entities 8.1.0 (already used by the test environment; no legacy Node Buffer fallback), preserve code verbatim, render raw HTML and unsupported tokens as text, and never construct document-supplied element names or attributes. Permit only absolute HTTP(S) links with `target=_blank` and `rel=noopener noreferrer`; represent images by their alt text.
- Keep selected mode in the mounted page alongside selected artifact. Use ordinary buttons with `aria-pressed`, preserving keyboard focus when toggling. Reuse existing snapshot and refresh disposal logic; no new asynchronous reads or persistence.
- Style preview content under `.osb-markdown`, with natural document height and wrapping prose. Preview and Source have no height cap or vertical scroll area; reading uses the surrounding page scroll. Wide code and tables retain horizontal overflow where necessary. Missing and empty states live outside rendered content. Catch renderer failure locally and retain Source controls.
- Update the active requirement-board source-inspection wording explicitly; there are no main specs to migrate yet.

## Risks / Trade-offs

- Untrusted Markdown → allowlisted DOM creation, inert HTML/images, URL validation, and adversarial renderer tests.
- Parser or deeply nested input failure → local error fallback with source access; existing collector size limits remain in force.
- Bundled tokenizer and entity decoder increase extension size → two pinned build dependencies and existing single-module validation; no CDN requests or new service.
- Relative links and diagrams remain text/code → exact Source stays available; no new file access or execution channel.

## Migration Plan

Build and validate app version 0.6.0, update the installed local Canvas extension, and verify REQ-002 in Preview and Source. No data migration. Roll back by reinstalling the preceding app bundle. Leave the OpenSpec change active for inspection.
