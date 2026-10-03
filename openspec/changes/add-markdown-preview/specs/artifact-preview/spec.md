# Artifact preview

## Purpose

Let users read formatted OpenSpec documents within requirement details while retaining exact source access and read-only inspection.

## ADDED Requirements

### Requirement: Preview and source modes
The artifact viewer SHALL default to Preview and provide keyboard-accessible Preview and Source controls with a visible and accessible selected state. It SHALL preserve the selected mode across artifact changes and refresh within the mounted detail page, and retain the artifact path.

#### Scenario: Inspect all artifacts
- **WHEN** a user opens a requirement and selects Proposal, Design, Specification, or Tasks
- **THEN** the selected artifact is rendered in Preview with its source path visible

#### Scenario: Read exact source
- **WHEN** a user selects Source, changes artifacts, or refreshes
- **THEN** Source remains selected and the content matches the latest successful snapshot exactly

### Requirement: Formatted Markdown
Preview SHALL render Markdown headings, paragraphs, emphasis, strikethrough, inline and fenced code, ordered and unordered lists, task lists, blockquotes, horizontal rules, and tables. Task checkboxes SHALL be disabled and code SHALL preserve whitespace. Long content SHALL remain usable on narrow screens.

#### Scenario: Formatted planning document
- **WHEN** a document contains these Markdown structures
- **THEN** Preview displays the corresponding document structure and Source retains the original Markdown

### Requirement: Full-height document content
Preview and Source SHALL expand to show the document's full height without a fixed-height artifact scroll area. Long documents SHALL use the surrounding page scroll, with their final content reachable in normal page flow.

#### Scenario: Long artifact
- **WHEN** the selected artifact is taller than the viewport in Preview or Source
- **THEN** the artifact panel expands to its content height and has no internal vertical scrollbar

### Requirement: Inert document content
The viewer SHALL display raw HTML as text without interpreting scripts or attributes, render images as descriptive text without loading resources, and activate only absolute HTTP or HTTPS links opened in a separate tab without opener access. Other link destinations SHALL remain inert text.

#### Scenario: Hostile or embedded content
- **WHEN** an artifact contains script tags, event handlers, unsafe or relative links, or images
- **THEN** preview executes no document code, loads no embedded resources, and creates no unsafe navigation targets

### Requirement: Read-only and resilient inspection
Mode and artifact changes SHALL use the loaded snapshot without file writes or additional host requests. Missing and empty artifacts SHALL show distinct messages. A rendering failure SHALL show an error with exact source still available, without breaking role actions or the detail page.

#### Scenario: Missing or empty artifact
- **WHEN** a selected artifact is missing or present but empty
- **THEN** the viewer explains that state instead of displaying an unexplained blank preview

#### Scenario: Refresh or parser failure
- **WHEN** refresh fails or Markdown cannot be rendered
- **THEN** the last successful snapshot remains available with the existing stale warning, or the rendering error offers Source access respectively
