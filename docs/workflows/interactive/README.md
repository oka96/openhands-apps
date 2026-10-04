# Interactive role workflow

`role-workflow.html` is the complete, unmodified Archify 3.0.1 viewer generated
from `role-workflow.workflow.json`. Stable action IDs connect direct selections
to the role app; arrows show a typical planning sequence, not automatic runs.

The current finalization receipt is
`review-2/role-workflow.finalize-summary.json`: validate, deliver, strict check and
real-browser check all passed, with no diagnostics. Root-level finalization
receipts describe the earlier landscape spacing. The measured second layout
uses the available logical ranks to remove unused right-hand space while
preserving all labels, source claims and relationships.

- Diagram type: workflow; static trace state.
- ViewBox: 874 × 282.
- Specification SHA-256: `e09f69a080a196e7b0377ea87b44b71be6ab31f023b6b1a353696427d259ebb5`.
- HTML SHA-256: `5dca2625f33ed74195eba6cac0e7c7936a46d91ae4f507137a8d90b10c4eafc1`.
- Standalone perceptual capture was not requested; embedded app appearance and
  interactions are verified separately in the change's verification record.

The app imports this HTML as trusted build data and derives a sandboxed document
with a narrow selection adapter. Its canonical artifact remains unchanged.
`npm run workflow:check` verifies candidate and HTML hashes against the passing
delivery receipts before a build. Never edit the generated HTML by hand.

Regenerate with a fresh evidence directory after a candidate edit:

```sh
node /Users/oka/.agents/skills/archify/bin/archify.mjs finalize workflow \
  docs/workflows/interactive/role-workflow.workflow.json \
  docs/workflows/interactive/role-workflow.html \
  --repo-root "$PWD" --quality showcase \
  --out-dir docs/workflows/interactive/review-3 --json
```

Update the build check's receipt path to that successful delivery.
