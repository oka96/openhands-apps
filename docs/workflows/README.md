# Role workflow diagram

The current app uses the complete interactive viewer in
[`interactive/role-workflow.html`](interactive/role-workflow.html). Its horizontal
layout gives the larger canvas room for zoom, pan and Archify's other native
controls. The files described below record the earlier 0.9.0 SVG-only integration.

The interactive candidate, immutable HTML and four passing finalization gates
are retained together in `interactive/`. `npm run workflow:check` verifies their
hashes before every build. The app derives an isolated iframe document with a
small selection bridge; it does not modify the checked HTML or reimplement the
viewer. App interaction and sandbox behavior require separate live verification.

The committed source references still pin `74c2051740e51116517db6a60fb822d13c126632`;
the three operations and explicit-submit boundary were re-read from committed
`src/role-actions.js` for the interactive candidate. The diagram describes their
meaning, not the uncommitted viewer integration.

`role-workflow.workflow.json` is the Archify schema-v2 source for the shared
SA, Frontend, Backend, and QA automation diagram. `role-workflow.html` is its
unaltered standalone output from Archify 3.0.1.

Propose plans a new role change, Update revises its planning, and Apply
implements its tasks. Arrows describe the typical order. They do not create
execution dependencies or start another automation. Selecting any action is
independent; the existing explicit Run submission starts work.

## Verified artifact

The current complete receipt is `review-2/role-workflow.finalize.json`; use
`review-2/role-workflow.finalize-summary.json` for its compact result. Earlier
root-directory finalize/browser receipts refer to the previous, larger layout
and are retained as historical evidence. `role-workflow.delivery.json` is the
current output provenance.

| Evidence | Result |
| --- | --- |
| Diagram type | `workflow` |
| Archify | `3.0.1` |
| Validate, deliver, strict check, browser-check | All passed |
| Artifact checks | 9/9 showcase, zero errors, zero warnings |
| Browser evidence | Passed; exact delivered artifact |
| Perceptual review | Not requested; no visual-polish claim |
| Visual correction rounds | 0 |
| Specification bytes | 2,412 |
| Specification SHA-256 | `a9eb7a0018b908209510a6c27c29cbcb0e091f768208a950082b74c68355f506` |
| HTML bytes | 744,689 |
| HTML SHA-256 | `54275c09f12604b502caf01849ab8f8d330710b869ced9641df7b10f62f60441` |

The browser gate measured the four desktop viewports 1440×900, 1600×1000,
1920×1080, and 2048×1320, including light theme throughout and dark theme at
the endpoints. It verifies READ/Still state without producing screenshots.
The current update receipt reports Archify 3.0.1 is current.

To regenerate from the repository root, choose a fresh evidence directory if
the candidate changes; preserve previously owned browser evidence:

```sh
node /Users/oka/.agents/skills/archify/bin/archify.mjs finalize workflow \
  docs/workflows/role-workflow.workflow.json \
  docs/workflows/role-workflow.html \
  --repo-root "$PWD" --quality showcase \
  --out-dir docs/workflows/review-3 --json
```

Never hand-edit the delivered HTML. A derived SVG is an app integration asset;
the standalone artifact receipt does not validate its embedded behavior.

The deterministic extractor is `scripts/extract-role-workflow.mjs`. It uses
the existing development dependency JSDOM to parse the delivered document
without enabling scripts or external resources, verifies the HTML and source
hashes against successful Archify receipts, and copies generated SVG content.

```sh
node scripts/extract-role-workflow.mjs
node scripts/extract-role-workflow.mjs --check
```

`--check` compares both the SVG and extraction receipt without writing. The
current `role-workflow.svg` is 8,395 bytes with SHA-256
`b06f48ded412f7a4d0302c8d44a5ecfd9f2648c6556c581dfbc0725c6ccbcca1`.
`role-workflow.extraction.json` binds that digest to the delivered HTML and
lists every embedding adaptation. The accessible SVG root uses `role="group"`
so its action buttons remain individually exposed, with scoped source semantic
styles and source light/dark palette values. The app supplies selection state
and activation behavior.

Extraction verification covers byte-identical regeneration, stale-output
rejection without writes in `--check`, mismatched HTML provenance rejection
before output writes, exact generated node/edge/label tree preservation,
Propose–Update–Apply DOM order, and XML plus inline-HTML parsing. App browser
checks remain the authority for the embedded result.

## Embedding contract

Use generated SVG geometry and labels from the delivered HTML. No Viewer
scripts are needed for selecting actions in the application.

| Stage | Generated group selector | DOM ID |
| --- | --- | --- |
| `propose` | `g[data-node-id="action-propose"]` | `node-action-propose` |
| `update` | `g[data-node-id="action-update"]` | `node-action-update` |
| `apply` | `g[data-node-id="action-apply"]` | `node-action-apply` |

The action rectangles span x=48…224 and y=86…370. Generated vertical edges
and their label groups are wholly inside that footprint. A derived viewBox
`40 78 192 300` includes all three actions and both relationships with 8px
padding. Copy the original `defs`, action groups, edge paths, and edge label
groups; omit only the standalone grid and lane frame/title when the app
supplies its own Workflow heading. Preserve the geometry, labels, and arrow
directions. At 300px width, the authored 11px titles and 8px supporting text
scale to approximately 17px and 12.5px respectively.

Preserve the renderer's class meaning when applying app theme colors:
`c-mask`, `c-backend`, `t-primary`, `t-muted`, `t-edge-default`, `a-default`,
`m-default`, `semantic-sigil`, and `s-backend`. The SVG already has node
keyboard hooks; integration must order them Propose, Update, Apply, set
`aria-pressed` from the selected automation, and handle both click and
Enter/Space. Activation selects the existing form action and prompt; it must
not dispatch or clear the draft. Guard stale targets and dispose listeners
with the mounted workspace. Keep the independent-selection explanation in
the surrounding UI.

Bind any extraction receipt to both input HTML and output SVG hashes and
record omitted viewer framing and the derived viewBox. Verify the embedded
300px layout, keyboard behavior, active state, themes, and narrow layout in
the live app separately.

## Source evidence and authoring history

The repository identity is `https://github.com/oka96/openhands-apps.git`,
pinned to `74c2051740e51116517db6a60fb822d13c126632`. Node source references
were read from committed `src/role-actions.js` at that revision using
`git show HEAD:src/role-actions.js`, not from uncommitted bytes. Lines 4–12
define the three operations; lines 259–279 separate selection updates from
guarded explicit submission and dispatch. Current uncommitted terminology
changes and the new diagram-selection UI do not form part of that pinned
source claim. In particular, the diagram does not claim automatic chaining.

The original Archify 2.17 development renderer routed a vertical relationship
through a wide side corridor. Two focused repairs reported
`workflow/route-preset-conflict` even with increased vertical clearance.
The layout was then explicitly revised to one role lane. After the requested
upgrade, Archify 3.0.1 rendered both automatic routes as straight vertical
edges and passed all gates. A final measured compactness revision reduced
the action footprint for the embedded column and is the current delivery.
