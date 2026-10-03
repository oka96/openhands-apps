// src/styles.css
var styles_default = '.osb-root {\n  --ink:#202b3b; --muted:#687485; --border:#dfe5eb; --accent:#465bcb;\n  --green:#187551; --surface:#fff; --paper:#f5f7fa;\n  box-sizing:border-box; width:100%; min-height:calc(100vh - 56px); padding:32px clamp(18px,3vw,44px) 24px;\n  background:var(--paper); color:var(--ink); font:14px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;\n  color-scheme:light;\n}\n.osb-root *, .osb-root *::before, .osb-root *::after { box-sizing:border-box; }\n.osb-root h1,.osb-root h2,.osb-root h3,.osb-root p { margin:0; }\n.osb-root button,.osb-root input,.osb-root select { font:inherit; }\n.osb-root button,.osb-root a,.osb-root input,.osb-root select { -webkit-tap-highlight-color:transparent; }\n.osb-root button,.osb-root a { touch-action:manipulation; }\n.osb-root button { cursor:pointer; }\n.osb-root button:disabled { cursor:wait; opacity:.6; }\n.osb-root :focus-visible { outline:3px solid #8799f1; outline-offset:3px; }\n.osb-root a { color:var(--accent); text-decoration:none; }\n.osb-header,.osb-brand,.osb-header-actions,.osb-store,.osb-card-top,.osb-card-foot,.osb-lane-title,.osb-toolbar,.osb-board-caption,.osb-detail-heading,.osb-role-panel-top,.osb-artifact-heading,.osb-footer { display:flex; align-items:center; }\n.osb-header { justify-content:space-between; gap:20px; }\n.osb-brand { gap:14px; }\n.osb-symbol { background:#243044; color:white; width:47px; height:47px; display:grid; place-items:center; border-radius:13px; font-size:17px; font-weight:750; letter-spacing:-1px; box-shadow:0 4px 12px #1c2c4a17; }\n.osb-eyebrow { color:#738096; font-size:10px; font-weight:750; letter-spacing:1.6px; margin-bottom:2px!important; }\n.osb-root h1 { font-size:28px; font-weight:710; letter-spacing:-.9px; line-height:1.25; }\n.osb-header-actions { gap:12px; flex-shrink:0; }\n.osb-subtitle { color:var(--muted); margin:16px 0 24px!important; font-size:15px; }\n.osb-button { padding:9px 16px; min-height:40px; border:1px solid var(--border); border-radius:8px; background:white; color:var(--ink)!important; font-weight:600!important; white-space:nowrap; }\n.osb-button:hover { background:#edf1f8; }\n.osb-primary { background:var(--accent); color:white!important; border-color:var(--accent); }\n.osb-primary:hover { background:#3548b5; }\n.osb-badge { display:inline-flex; align-items:center; justify-content:center; padding:3px 8px; border-radius:5px; font-size:10px; line-height:1.5; font-weight:680; background:#e9edf3; color:#5d697a; white-space:nowrap; text-transform:capitalize; }\n.osb-live { background:#eaf4ef; color:#227750; font-size:11px; padding:6px 10px; gap:6px; }\n.osb-live::before { content:""; width:5px; height:5px; background:#279064; border-radius:50%; }\n.osb-store { padding:12px 14px; border:1px solid var(--border); border-radius:10px; background:#ffffffa6; gap:12px; }\n.osb-store-field { display:flex; flex:1; align-items:center; gap:18px; min-width:0; }\n.osb-label { font-size:10px; font-weight:700; letter-spacing:.9px; text-transform:uppercase; color:var(--muted); }\n.osb-store-field .osb-label { white-space:nowrap; }\n.osb-store input { border:0; background:transparent; width:100%; min-width:100px; color:#414e62; padding:6px 0; font-size:12px; font-family:ui-monospace,SFMono-Regular,Consolas,monospace; }\n.osb-notice { margin:13px 0 22px; color:#687485; font-size:11px; line-height:1.7; }\n.osb-alert { color:#a44322; background:#fff0e5; border:1px solid #f0d4c5; padding:12px 15px; border-radius:8px; }\n.osb-alert p + p { margin-top:6px; }\n.osb-metrics { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:14px; margin-bottom:30px; }\n.osb-metric { display:flex; flex-direction:column; padding:17px 20px 16px; border:1px solid var(--border); border-radius:10px; background:white; gap:4px; }\n.osb-metric strong { font-size:28px; letter-spacing:-1px; line-height:1.45; font-weight:650; font-variant-numeric:tabular-nums; }\n.osb-metric.active strong { color:var(--accent); }\n.osb-muted { color:var(--muted); }\n.osb-metric .osb-muted { font-size:10px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }\n.osb-toolbar { flex-wrap:wrap; gap:10px; padding-bottom:16px; border-bottom:1px solid var(--border); }\n.osb-views { display:flex; background:#e9edf3; border-radius:8px; padding:3px; gap:2px; }\n.osb-view { border:0; border-radius:6px; background:transparent; color:var(--muted); padding:7px 15px; font-size:12px!important; font-weight:650!important; }\n.osb-view.selected { color:var(--ink); background:white; box-shadow:0 1px 4px #16284915; }\n.osb-toolbar input,.osb-toolbar select { height:36px; border:1px solid var(--border); background:white; border-radius:7px; padding:0 11px; color:var(--ink); font-size:12px; }\n.osb-search { width:245px; margin-left:auto; }\n.osb-toolbar select { max-width:190px; }\n.osb-board-caption { justify-content:space-between; gap:12px; padding:15px 0; color:var(--muted); font-size:11px; }\n.osb-board { display:grid; grid-template-columns:repeat(6,minmax(190px,1fr)); gap:12px; overflow-x:auto; padding:2px 2px 20px; align-items:stretch; scrollbar-color:#bac4d3 #e9edf3; scrollbar-width:thin; }\n.osb-lane { --lane:#8a95a6; background:#eceff4; border:1px solid #e3e8ef; border-radius:10px; padding:12px 8px; min-height:368px; }\n.osb-stage-sa { --lane:#8b69c6; }\n.osb-stage-implementation { --lane:#4f75d0; }\n.osb-stage-qa { --lane:#cf963f; }\n.osb-stage-blocked { --lane:#c46455; background:#f3eeee; }\n.osb-stage-done { --lane:#39836a; background:#edf3f0; }\n.osb-lane-head { margin:0 4px 15px; }\n.osb-lane-title { gap:7px; }\n.osb-dot { width:7px; height:7px; border-radius:50%; background:var(--lane); flex-shrink:0; }\n.osb-root .osb-lane h2 { font-size:12px; font-weight:700; letter-spacing:-.1px; }\n.osb-count { margin-left:auto; padding:0 6px; border-radius:4px; background:#ffffffb8; color:var(--muted); font-size:10px; font-weight:650; }\n.osb-lane-head p { color:#85909f; font-size:10px; margin:4px 0 0 14px; }\n.osb-card { display:block; color:var(--ink)!important; border:1px solid #e0e5eb; background:white; border-radius:8px; padding:13px 12px; box-shadow:0 2px 3px #192f4610; transition:border-color .12s,transform .12s; }\n.osb-card + .osb-card { margin-top:10px; }\n.osb-card:hover { border-color:#98a6d6; transform:translateY(-2px); box-shadow:0 5px 12px #1d2c4712; }\n.osb-card-top { justify-content:space-between; gap:6px; margin-bottom:10px; }\n.osb-id { color:#7b8798; font-size:10px; font-weight:650; letter-spacing:.5px; font-family:ui-monospace,SFMono-Regular,Consolas,monospace; }\n.osb-root .osb-card h3 { font-size:14px; line-height:1.45; font-weight:650; letter-spacing:-.15px; }\n.osb-card-summary { font-size:11px; color:var(--muted); margin-top:7px!important; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; min-height:48px; }\n.osb-role-strip { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:4px; margin:15px 0 12px; }\n.osb-role { display:block; border-radius:4px; padding:4px 2px; text-align:center; font-size:9px; font-weight:700; background:#eff1f5; color:#919aaa; border:1px solid transparent; }\n.osb-root .osb-done { color:#227653; background:#e6f3ec; }\n.osb-root .osb-in_progress,.osb-root .osb-implementation { color:#4669b2; background:#eaf0ff; }\n.osb-root .osb-blocked { color:#b65346; background:#fcece8; }\n.osb-root .osb-sa { color:#8160b1; background:#f0eaf9; }\n.osb-root .osb-qa { color:#9c712e; background:#faf0d9; }\n.osb-role.osb-in_progress { border-color:#c9d5f5; }\n.osb-meter { height:4px; overflow:hidden; background:#e9edf2; border-radius:4px; }\n.osb-meter span { display:block; height:100%; border-radius:4px; background:#6078cb; }\n.osb-stage-done .osb-meter span,.osb-role-panel.osb-done .osb-meter span { background:#4a9a7c; }\n.osb-card-foot { justify-content:space-between; margin-top:8px; font-size:9px; color:#8390a0; }\n.osb-blocker { border-top:1px solid #f0e3df; padding-top:10px; margin-top:11px!important; color:#b36454; font-size:10px; }\n.osb-warning { color:#a66b29; font-size:11px; margin-top:10px; display:block; }\n.osb-lane-empty { padding:25px 5px; border:1px dashed #d5dce6; border-radius:8px; font-size:11px; text-align:center; color:#98a2b0; }\n.osb-empty,.osb-loading { border:1px dashed #d4dce6; border-radius:10px; padding:54px 24px; text-align:center; color:var(--muted); }\n.osb-empty h2 { font-size:20px; color:var(--ink); margin-bottom:8px; }\n.osb-empty button { margin-top:18px; }\n.osb-footer { border-top:1px solid var(--border); padding-top:18px; margin-top:24px; justify-content:space-between; gap:10px; color:#8a95a4; font-size:10px; flex-wrap:wrap; }\n.osb-table-wrap { overflow-x:auto; border:1px solid var(--border); border-radius:10px; }\n.osb-table { border-collapse:collapse; width:100%; min-width:700px; background:white; text-align:left; }\n.osb-table th { color:var(--muted); background:#f0f3f7; font-size:10px; font-weight:600; text-transform:uppercase; letter-spacing:.5px; }\n.osb-table th,.osb-table td { padding:14px 18px; border-bottom:1px solid #e9edf2; }\n.osb-table tr:last-child td { border-bottom:0; }\n.osb-table td { font-size:12px; }\n.osb-list-title { display:block; font-size:13px; font-weight:600; margin-top:4px; }\n.osb-table .osb-role-strip { min-width:150px; margin:0; }\n.osb-breadcrumb { display:flex; gap:12px; align-items:center; font-size:12px; margin-bottom:22px; }\n.osb-detail-heading { justify-content:space-between; align-items:flex-start; gap:24px; }\n.osb-detail-heading h2 { font-size:25px; line-height:1.3; letter-spacing:-.6px; margin-bottom:10px; }\n.osb-detail-heading .osb-muted { font-size:13px; max-width:700px; }\n.osb-completion { display:flex; align-items:center; gap:16px; margin:22px 0; font-size:12px; }\n.osb-completion .osb-meter { flex:1; max-width:320px; }\n.osb-pipeline { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:14px; margin:20px 0 30px; }\n.osb-root .osb-role-panel { padding:18px; background:white; border:1px solid var(--border); border-top:3px solid #ced5e0; border-radius:9px; color:var(--ink); }\n.osb-root .osb-role-panel.osb-done { border-top-color:#5c9c7c; }\n.osb-root .osb-role-panel.osb-in_progress { border-top-color:#6c83cb; }\n.osb-root .osb-role-panel.osb-blocked { border-top-color:#ca7b65; }\n.osb-role-panel-top { justify-content:space-between; gap:8px; margin-bottom:14px; }\n.osb-role-avatar { width:30px; height:30px; border-radius:7px; display:grid; place-items:center; background:#f0f3f7; font-size:11px; font-weight:700; color:#7d899a; }\n.osb-role-panel h3 { font-size:13px; font-weight:700; margin-bottom:5px; }\n.osb-owner { color:var(--muted); font-size:11px; margin-bottom:16px!important; }\n.osb-task-count { font-size:10px; color:var(--muted); margin-top:5px!important; }\n.osb-spec-count { font-size:11px; font-weight:650; margin-top:14px!important; }\n.osb-role-spec { margin-top:16px; padding-top:16px; border-top:1px solid var(--border); }\n.osb-role-spec h4 { font-size:12px; margin:7px 0 10px; }\n.osb-spec-link { border:0; background:transparent; color:var(--accent); text-align:left; font:600 10px/1.6 ui-monospace,SFMono-Regular,Consolas,monospace; padding:0; overflow-wrap:anywhere; cursor:pointer; }\n.osb-spec-progress { display:block; font-size:10px; color:var(--muted); margin-top:8px; }\n.osb-role-spec .osb-checklist { border:0; margin-top:8px; }\n.osb-checklist small { overflow-wrap:anywhere; }\n.osb-artifact-spec { display:grid; gap:7px; flex-basis:100%; min-width:0; }\n.osb-spec-select { width:100%; min-width:0; max-width:100%; border:1px solid var(--border); border-radius:6px; padding:9px; background:white; color:var(--ink); font:12px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; }\n.osb-role-note { margin:15px 0!important; font-size:11px; color:var(--muted); min-height:33px; }\n.osb-checklist { list-style:none; padding:0; margin:16px 0 0; border-top:1px solid #edf0f4; }\n.osb-checklist li { display:flex; gap:9px; font-size:11px; margin-top:14px; line-height:1.6; }\n.osb-check { color:#98a4b5; font-size:14px; flex-shrink:0; }\n.osb-checklist .completed .osb-check { color:#3b8a68; }\n.osb-checklist small { display:block; font-size:9px; color:#9aa5b3; margin-top:3px; }\n.osb-role-actions { margin-top:20px; border-top:1px solid var(--border); padding-top:14px; }\n.osb-role-actions summary { color:var(--accent); cursor:pointer; font-size:12px; font-weight:650; }\n.osb-role-actions-body { padding-top:13px; font-size:11px; }\n.osb-role-actions-body > p { margin-bottom:10px; }\n.osb-automation-target { white-space:pre-wrap; overflow-wrap:anywhere; color:var(--muted); font-size:10px; }\n.osb-run-controls { display:flex; flex-wrap:wrap; gap:7px; margin:12px 0; }\n.osb-role-actions .osb-button { padding:7px 10px; min-height:34px; font-size:11px; white-space:normal; }\n.osb-skill-form { display:grid; gap:12px; margin-top:15px; }\n.osb-skill-field { display:grid; gap:6px; min-width:0; }\n.osb-skill-field[hidden],.osb-role-actions [hidden] { display:none; }\n.osb-skill-field input,.osb-skill-field select,.osb-skill-field textarea { width:100%; min-width:0; border:1px solid var(--border); border-radius:6px; padding:8px; background:white; color:var(--ink); font:12px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; }\n.osb-skill-field textarea { resize:vertical; min-height:100px; }\n.osb-skill-help { color:var(--muted); font-size:11px; }\n.osb-run-result { display:grid; gap:10px; margin-top:14px; overflow-wrap:anywhere; }\n.osb-run-result:empty { display:none; }\n.osb-run-status { font-weight:650; }\n.osb-run-error { color:#a44322; }\n.osb-run-link { display:block; font-weight:600; }\n.osb-request-ref { font-size:9px; color:var(--muted); }\n.osb-unassigned { border:1px solid #e9d8b9; border-radius:8px; padding:18px; margin-bottom:24px; }\n.osb-artifacts { background:white; border:1px solid var(--border); border-radius:10px; overflow:hidden; }\n.osb-artifact-heading { padding:20px; justify-content:space-between; flex-wrap:wrap; gap:12px; }\n.osb-artifact-heading h3 { font-size:15px; }\n.osb-artifact-heading code { color:var(--muted); font-size:11px; overflow-wrap:anywhere; }\n.osb-artifact-toolbar { display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px 18px; border-bottom:1px solid var(--border); padding-right:20px; }\n.osb-artifact-tabs { display:flex; gap:18px; padding:0 20px; flex-wrap:wrap; }\n.osb-artifact-modes { margin:5px 0 8px; }\n.osb-artifact-modes .osb-view { padding:5px 12px; }\n.osb-artifact-tabs button { color:var(--muted); background:transparent; border:0; border-bottom:2px solid transparent; font-size:12px; padding:10px 0; }\n.osb-artifact-tabs button.selected { color:var(--accent); border-color:var(--accent); font-weight:650; }\n.osb-artifact-path { padding:12px 20px; font:10px/1.5 ui-monospace,SFMono-Regular,Consolas,monospace; color:#8a95a5; background:#fafbfc; overflow-wrap:anywhere; }\n.osb-artifact-body .osb-artifact-source { margin:0; padding:20px; white-space:pre-wrap; overflow-wrap:anywhere; font:12px/1.85 ui-monospace,SFMono-Regular,Consolas,monospace; color:#495970; }\n.osb-artifact-message { padding:24px; color:var(--muted); }\n.osb-artifact-message .osb-button { margin-top:12px; }\n.osb-markdown { padding:28px clamp(20px,4vw,48px); overflow-wrap:anywhere; line-height:1.75; font-size:14px; }\n.osb-markdown > :first-child { margin-top:0!important; }\n.osb-markdown > :last-child { margin-bottom:0!important; }\n.osb-markdown h1,.osb-markdown h2,.osb-markdown h3,.osb-markdown h4,.osb-markdown h5,.osb-markdown h6 { margin:26px 0 12px; line-height:1.35; font-weight:650; letter-spacing:-.3px; }\n.osb-markdown h1 { font-size:26px; padding-bottom:12px; border-bottom:1px solid var(--border); }\n.osb-markdown h2 { font-size:20px; }\n.osb-markdown h3 { font-size:17px; }\n.osb-markdown h4,.osb-markdown h5,.osb-markdown h6 { font-size:14px; }\n.osb-markdown p { margin:0 0 14px; }\n.osb-markdown ul,.osb-markdown ol { padding-left:26px; margin:0 0 16px; }\n.osb-markdown ul { list-style:disc; }\n.osb-markdown ol { list-style:decimal; }\n.osb-markdown ul ul { list-style:circle; }\n.osb-markdown li { margin:5px 0; }\n.osb-markdown li > p { margin:8px 0; }\n.osb-markdown li > ul,.osb-markdown li > ol { margin-bottom:6px; }\n.osb-markdown a { text-decoration:underline; text-underline-offset:3px; }\n.osb-markdown blockquote { margin:18px 0; padding:4px 18px; border-left:3px solid #aab9e1; color:#5c697c; background:#f6f8fc; }\n.osb-markdown blockquote > :last-child { margin-bottom:0; }\n.osb-markdown code { padding:2px 5px; border-radius:4px; background:#edf1f6; color:#42516a; font:12px/1.6 ui-monospace,SFMono-Regular,Consolas,monospace; }\n.osb-markdown pre { margin:16px 0; padding:16px 18px; overflow:auto; background:#f5f7fa; border:1px solid var(--border); border-radius:7px; white-space:pre; overflow-wrap:normal; }\n.osb-markdown pre code { padding:0; background:transparent; }\n.osb-markdown .osb-markdown-literal { white-space:pre-wrap; overflow-wrap:anywhere; }\n.osb-markdown hr { border:0; border-top:1px solid var(--border); margin:24px 0; }\n.osb-markdown-table-wrap { max-width:100%; overflow-x:auto; margin:18px 0; }\n.osb-markdown table { border-collapse:collapse; width:100%; font-size:13px; }\n.osb-markdown th,.osb-markdown td { border:1px solid var(--border); padding:9px 12px; text-align:left; min-width:100px; }\n.osb-markdown th { background:#f1f4f8; font-weight:650; }\n.osb-markdown tr:nth-child(even) { background:#fafbfc; }\n.osb-markdown .osb-markdown-task-item { list-style:none; }\n.osb-markdown input[type="checkbox"] { width:14px; height:14px; margin:0 8px 0 -22px; vertical-align:middle; accent-color:var(--accent); }\n@media(min-width:1600px) { .osb-board { grid-template-columns:repeat(6,minmax(215px,1fr)); } .osb-card { padding:17px 15px; } }\n@media(max-width:1000px) { .osb-root { padding:24px 20px; } .osb-metrics { gap:10px; } .osb-metric { padding:14px; } .osb-search { width:210px; } .osb-pipeline { grid-template-columns:repeat(2,minmax(0,1fr)); } }\n@media(max-width:650px) { .osb-header { align-items:flex-start; } .osb-root h1 { font-size:23px; } .osb-symbol { display:none; } .osb-live { display:none; } .osb-header-actions { gap:6px; } .osb-metrics { grid-template-columns:repeat(2,minmax(0,1fr)); } .osb-store-field { display:block; } .osb-store .osb-button { padding:8px 10px; } .osb-toolbar { gap:8px; } .osb-search { order:3; width:100%; } .osb-toolbar select { flex:1; min-width:120px; } .osb-views { width:100%; } .osb-board-caption { display:block; } .osb-board-caption span { display:block; margin-top:4px; } .osb-detail-heading { display:block; } .osb-detail-heading .osb-header-actions { margin-top:12px; } .osb-completion { flex-wrap:wrap; } .osb-completion .osb-meter { min-width:130px; } .osb-pipeline { grid-template-columns:1fr; } .osb-footer { align-items:flex-start; flex-direction:column; } }\n@media(prefers-reduced-motion:reduce) { .osb-card { transition:none; } .osb-card:hover { transform:none; } }\n@media(max-width:650px) { .osb-artifact-toolbar { padding:0 14px 8px; gap:4px; } .osb-artifact-tabs { padding:0; gap:15px; } .osb-artifact-modes { width:auto; margin:0; } .osb-markdown { padding:20px; } }\n';

// embedded-raw-source:/Users/oka/Desktop/openhands-apps/src/collector.cjs
var collector_default = new TextDecoder().decode(Uint8Array.from(atob("J3VzZSBzdHJpY3QnOwoKLy8gVGhpcyBmaXhlZCwgcmVhZC1vbmx5IGNvbGxlY3RvciBpcyBlbWJlZGRlZCBpbiB0aGUgQ2FudmFzIGFwcCBhbmQgcnVuIGJ5IGl0cyBBZ2VudCBTZXJ2ZXIuCmNvbnN0IGZzID0gcmVxdWlyZSgnbm9kZTpmcycpOwpjb25zdCBwYXRoID0gcmVxdWlyZSgnbm9kZTpwYXRoJyk7Cgpjb25zdCBST0xFX0lEUyA9IFsnU0EnLCAnRnJvbnRlbmQnLCAnQmFja2VuZCcsICdRQSddOwpjb25zdCBST0xFX0xBQkVMUyA9IFsnU29sdXRpb24gQXJjaGl0ZWN0JywgJ0Zyb250ZW5kJywgJ0JhY2tlbmQnLCAnUXVhbGl0eSBBc3N1cmFuY2UnXTsKY29uc3QgUk9MRV9QUkVGSVggPSB7IFNBOiAnU0EnLCBGcm9udGVuZDogJ0ZFJywgQmFja2VuZDogJ0JFJywgUUE6ICdRQScgfTsKY29uc3QgU0xVRyA9IC9eW2EtejAtOV0rKD86LVthLXowLTldKykqJC87CmNvbnN0IFJFUVVJUkVNRU5UX0lEID0gL15bQS1aXVtBLVowLTldKig/Oi1bQS1aMC05XSspKiQvOwpjb25zdCBNQVhfRklMRSA9IDY0ICogMTAyNDsKY29uc3QgTUFYX01FVEFEQVRBID0gMTI4ICogMTAyNDsKY29uc3QgTUFYX09VVFBVVCA9IDUxMiAqIDEwMjQ7CmNvbnN0IE1BWF9SRVFVSVJFTUVOVFMgPSA1MDsKY29uc3QgTUFYX1RBU0tTID0gNTAwOwpjbGFzcyBDb2xsZWN0b3JFcnJvciBleHRlbmRzIEVycm9yIHt9CgpmdW5jdGlvbiByZXF1aXJlVmFsdWUoY29uZGl0aW9uLCBtZXNzYWdlKSB7CiAgaWYgKCFjb25kaXRpb24pIHRocm93IG5ldyBDb2xsZWN0b3JFcnJvcihtZXNzYWdlKTsKfQpmdW5jdGlvbiBvYmplY3QodmFsdWUpIHsgcmV0dXJuIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkodmFsdWUpOyB9CmZ1bmN0aW9uIHRleHQodmFsdWUsIGxpbWl0ID0gMjAwMCwgZW1wdHkgPSBmYWxzZSkgewogIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIChlbXB0eSB8fCB2YWx1ZS50cmltKCkubGVuZ3RoID4gMCkgJiYgdmFsdWUubGVuZ3RoIDw9IGxpbWl0ICYmICF2YWx1ZS5pbmNsdWRlcygnXDAnKTsKfQpmdW5jdGlvbiBmaWVsZHModmFsdWUsIG5hbWVzKSB7IHJldHVybiBPYmplY3Qua2V5cyh2YWx1ZSkuZXZlcnkoa2V5ID0+IG5hbWVzLmluY2x1ZGVzKGtleSkpOyB9CmZ1bmN0aW9uIHVuaXF1ZSh2YWx1ZXMsIG1lc3NhZ2UpIHsgcmVxdWlyZVZhbHVlKG5ldyBTZXQodmFsdWVzKS5zaXplID09PSB2YWx1ZXMubGVuZ3RoLCBtZXNzYWdlKTsgfQpmdW5jdGlvbiBjb250YWluZWQocm9vdCwgdGFyZ2V0KSB7IHJldHVybiB0YXJnZXQgPT09IHJvb3QgfHwgdGFyZ2V0LnN0YXJ0c1dpdGgocm9vdCArIHBhdGguc2VwKTsgfQpmdW5jdGlvbiBsb2NhbFNlZ21lbnQodmFsdWUpIHsgcmV0dXJuIHZhbHVlLnNwbGl0KHBhdGguc2VwKS5pbmNsdWRlcygnLmxvY2FsJyk7IH0KCi8vIFJlc29sdmUgYmVmb3JlIHJlYWRpbmcuIFJlZnVzZSBzeW1saW5rIGFsaWFzZXMgYXMgd2VsbCBhcyBlc2NhcGVzIHNvIGVhY2ggc291cmNlIGxvY2F0aW9uCi8vIHNob3duIGluIHRoZSBhcHAgaWRlbnRpZmllcyBleGFjdGx5IHRoZSBmaWxlIHRoYXQgc3VwcGxpZWQgaXRzIGV2aWRlbmNlLgpmdW5jdGlvbiBzYWZlUGF0aCh0YXJnZXQsIHJvb3QpIHsKICByZXF1aXJlVmFsdWUoY29udGFpbmVkKHJvb3QsIHRhcmdldCkgJiYgIWxvY2FsU2VnbWVudCh0YXJnZXQpLCAnU291cmNlIHBhdGggaXMgb3V0c2lkZSB0aGUgcGVybWl0dGVkIHN0b3JlLicpOwogIGxldCBjYW5vbmljYWw7CiAgdHJ5IHsgY2Fub25pY2FsID0gZnMucmVhbHBhdGhTeW5jKHRhcmdldCk7IH0KICBjYXRjaCAoZXJyb3IpIHsgaWYgKGVycm9yLmNvZGUgPT09ICdFTk9FTlQnKSByZXR1cm4gZmFsc2U7IHRocm93IGVycm9yOyB9CiAgcmVxdWlyZVZhbHVlKGNhbm9uaWNhbCA9PT0gdGFyZ2V0ICYmIGNvbnRhaW5lZChyb290LCBjYW5vbmljYWwpICYmICFsb2NhbFNlZ21lbnQoY2Fub25pY2FsKSwKICAgICdTeW1saW5rZWQgb3IgZXNjYXBpbmcgc291cmNlIHBhdGhzIGFyZSBub3Qgc3VwcG9ydGVkLicpOwogIHJldHVybiB0cnVlOwp9CgpmdW5jdGlvbiByZWFkRmlsZSh0YXJnZXQsIHJvb3QsIGxpbWl0ID0gTUFYX0ZJTEUpIHsKICBpZiAoIXNhZmVQYXRoKHRhcmdldCwgcm9vdCkpIHJldHVybiBudWxsOwogIGxldCBkZXNjcmlwdG9yOwogIHRyeSB7CiAgICBkZXNjcmlwdG9yID0gZnMub3BlblN5bmModGFyZ2V0LCBmcy5jb25zdGFudHMuT19SRE9OTFkgfCBmcy5jb25zdGFudHMuT19OT0ZPTExPVyk7CiAgICBjb25zdCBzdGF0ID0gZnMuZnN0YXRTeW5jKGRlc2NyaXB0b3IpOwogICAgcmVxdWlyZVZhbHVlKHN0YXQuaXNGaWxlKCksICdFeHBlY3RlZCBhIHJlZ3VsYXIgc291cmNlIGZpbGUuJyk7CiAgICByZXF1aXJlVmFsdWUoc3RhdC5zaXplIDw9IGxpbWl0LCAnQSBzdG9yZSBzb3VyY2UgZmlsZSBleGNlZWRlZCBpdHMgc2l6ZSBsaW1pdC4nKTsKICAgIC8vIFJlYWQgYXQgbW9zdCBsaW1pdCsxIGJ5dGVzIGV2ZW4gaWYgdGhlIGZpbGUgZ3Jvd3MgYWZ0ZXIgZnN0YXQuCiAgICBjb25zdCBidWZmZXIgPSBCdWZmZXIuYWxsb2MobGltaXQgKyAxKTsKICAgIGxldCBsZW5ndGggPSAwOwogICAgd2hpbGUgKGxlbmd0aCA8IGJ1ZmZlci5sZW5ndGgpIHsKICAgICAgY29uc3QgcmVhZCA9IGZzLnJlYWRTeW5jKGRlc2NyaXB0b3IsIGJ1ZmZlciwgbGVuZ3RoLCBidWZmZXIubGVuZ3RoIC0gbGVuZ3RoLCBudWxsKTsKICAgICAgaWYgKCFyZWFkKSBicmVhazsKICAgICAgbGVuZ3RoICs9IHJlYWQ7CiAgICB9CiAgICByZXF1aXJlVmFsdWUobGVuZ3RoIDw9IGxpbWl0LCAnQSBzdG9yZSBzb3VyY2UgZmlsZSBleGNlZWRlZCBpdHMgc2l6ZSBsaW1pdC4nKTsKICAgIGNvbnN0IGNvbnRlbnQgPSBidWZmZXIuc3ViYXJyYXkoMCwgbGVuZ3RoKTsKICAgIGNvbnN0IGRlY29kZWQgPSBjb250ZW50LnRvU3RyaW5nKCd1dGY4Jyk7CiAgICByZXF1aXJlVmFsdWUoQnVmZmVyLmZyb20oZGVjb2RlZCwgJ3V0ZjgnKS5lcXVhbHMoY29udGVudCkgJiYgIWRlY29kZWQuaW5jbHVkZXMoJ1wwJyksICdBIHN0b3JlIHNvdXJjZSBmaWxlIGlzIG5vdCB2YWxpZCBVVEYtOCB0ZXh0LicpOwogICAgcmV0dXJuIGRlY29kZWQ7CiAgfSBmaW5hbGx5IHsgaWYgKGRlc2NyaXB0b3IgIT09IHVuZGVmaW5lZCkgZnMuY2xvc2VTeW5jKGRlc2NyaXB0b3IpOyB9Cn0KCmZ1bmN0aW9uIHZhbGlkYXRlTWV0YWRhdGEodmFsdWUpIHsKICByZXF1aXJlVmFsdWUob2JqZWN0KHZhbHVlKSAmJiBmaWVsZHModmFsdWUsIFsndmVyc2lvbicsICduYW1lJywgJ2Rlc2NyaXB0aW9uJywgJ3JlcXVpcmVtZW50cyddKSAmJiBbMSwgMl0uaW5jbHVkZXModmFsdWUudmVyc2lvbikKICAgICYmIHRleHQodmFsdWUubmFtZSwgMjAwKSAmJiB0ZXh0KHZhbHVlLmRlc2NyaXB0aW9uLCA0MDAwLCB0cnVlKSAmJiBBcnJheS5pc0FycmF5KHZhbHVlLnJlcXVpcmVtZW50cykKICAgICYmIHZhbHVlLnJlcXVpcmVtZW50cy5sZW5ndGggPD0gTUFYX1JFUVVJUkVNRU5UUywgJ0ludmFsaWQgb3BlbnNwZWMvcmVxdWlyZW1lbnRzLmpzb24gc3RvcmUgbWV0YWRhdGEuJyk7CiAgZm9yIChjb25zdCBpdGVtIG9mIHZhbHVlLnJlcXVpcmVtZW50cykgewogICAgcmVxdWlyZVZhbHVlKG9iamVjdChpdGVtKSAmJiBmaWVsZHMoaXRlbSwgWydpZCcsICd0aXRsZScsICdzdW1tYXJ5JywgJ2NoYW5nZScsICdyb2xlcyddKQogICAgICAmJiB0ZXh0KGl0ZW0uaWQsIDY0KSAmJiBSRVFVSVJFTUVOVF9JRC50ZXN0KGl0ZW0uaWQpICYmIHRleHQoaXRlbS50aXRsZSwgMjAwKSAmJiB0ZXh0KGl0ZW0uc3VtbWFyeSwgNDAwMCwgdHJ1ZSkKICAgICAgJiYgdGV4dChpdGVtLmNoYW5nZSwgMTAwKSAmJiBTTFVHLnRlc3QoaXRlbS5jaGFuZ2UpCiAgICAgICYmIG9iamVjdChpdGVtLnJvbGVzKSAmJiBmaWVsZHMoaXRlbS5yb2xlcywgUk9MRV9JRFMpLCAnSW52YWxpZCByZXF1aXJlbWVudCBtZXRhZGF0YS4nKTsKICAgIGlmICh2YWx1ZS52ZXJzaW9uID09PSAyKSB7CiAgICAgIHJlcXVpcmVWYWx1ZSgvXlJFUS1bMC05XXszLH0kLy50ZXN0KGl0ZW0uaWQpICYmIFJPTEVfSURTLmV2ZXJ5KGlkID0+IE9iamVjdC5oYXNPd24oaXRlbS5yb2xlcywgaWQpKSwgJ0ludmFsaWQgcmVxdWlyZW1lbnQgSUQgb3IgbWlzc2luZyByb2xlIG1ldGFkYXRhLicpOwogICAgICBsZXQgc3BlY3MgPSAwOwogICAgICBmb3IgKGNvbnN0IFtpZCwgcm9sZV0gb2YgT2JqZWN0LmVudHJpZXMoaXRlbS5yb2xlcykpIHsKICAgICAgICByZXF1aXJlVmFsdWUob2JqZWN0KHJvbGUpICYmIGZpZWxkcyhyb2xlLCBbJ293bmVyJywgJ25vdGUnLCAnc3BlY3MnXSkgJiYgdGV4dChyb2xlLm93bmVyLCAyMDApCiAgICAgICAgICAmJiB0ZXh0KHJvbGUubm90ZSwgNDAwMCwgdHJ1ZSkgJiYgQXJyYXkuaXNBcnJheShyb2xlLnNwZWNzKSwgJ0ludmFsaWQgcm9sZS1zcGVjIG1ldGFkYXRhLicpOwogICAgICAgIHNwZWNzICs9IHJvbGUuc3BlY3MubGVuZ3RoOwogICAgICAgIGZvciAoY29uc3Qgc3BlYyBvZiByb2xlLnNwZWNzKSB7CiAgICAgICAgICBjb25zdCBwcmVmaXggPSBgJHtST0xFX1BSRUZJWFtpZF19LSR7aXRlbS5pZH0tYDsKICAgICAgICAgIHJlcXVpcmVWYWx1ZShvYmplY3Qoc3BlYykgJiYgZmllbGRzKHNwZWMsIFsnaWQnLCAndGl0bGUnLCAnc3RhdGUnLCAnbm90ZSddKSAmJiB0ZXh0KHNwZWMuaWQsIDE2MCkKICAgICAgICAgICAgJiYgc3BlYy5pZC5zdGFydHNXaXRoKHByZWZpeCkgJiYgU0xVRy50ZXN0KHNwZWMuaWQuc2xpY2UocHJlZml4Lmxlbmd0aCkpICYmIHRleHQoc3BlYy50aXRsZSwgMjAwKQogICAgICAgICAgICAmJiBbJ2JhY2tsb2cnLCAnaW5fcHJvZ3Jlc3MnLCAnYmxvY2tlZCddLmluY2x1ZGVzKHNwZWMuc3RhdGUpICYmIHRleHQoc3BlYy5ub3RlLCA0MDAwLCB0cnVlKSwKICAgICAgICAgICdJbnZhbGlkIHNwZWMgaWRlbnRpdHksIHJvbGUgb3duZXJzaGlwLCBvciBzcGVjIG1ldGFkYXRhLicpOwogICAgICAgIH0KICAgICAgfQogICAgICByZXF1aXJlVmFsdWUoc3BlY3MgPD0gMjAsICdBIHJlcXVpcmVtZW50IGV4Y2VlZGVkIHRoZSAyMC1zcGVjIGxpbWl0LicpOwogICAgICBjb250aW51ZTsKICAgIH0KICAgIGZvciAoY29uc3Qgcm9sZSBvZiBPYmplY3QudmFsdWVzKGl0ZW0ucm9sZXMpKSB7CiAgICAgIHJlcXVpcmVWYWx1ZShvYmplY3Qocm9sZSkgJiYgZmllbGRzKHJvbGUsIFsnb3duZXInLCAnc3RhdGUnLCAnbm90ZSddKSAmJiB0ZXh0KHJvbGUub3duZXIsIDIwMCkKICAgICAgICAmJiBbJ2JhY2tsb2cnLCAnaW5fcHJvZ3Jlc3MnLCAnYmxvY2tlZCddLmluY2x1ZGVzKHJvbGUuc3RhdGUpICYmIHRleHQocm9sZS5ub3RlLCA0MDAwLCB0cnVlKSwgJ0ludmFsaWQgcmVxdWlyZW1lbnQgcm9sZSBtZXRhZGF0YS4nKTsKICAgIH0KICB9CiAgdW5pcXVlKHZhbHVlLnJlcXVpcmVtZW50cy5tYXAoaXRlbSA9PiBpdGVtLmlkKSwgJ0R1cGxpY2F0ZSByZXF1aXJlbWVudCBJRHMgaW4gc3RvcmUgbWV0YWRhdGEuJyk7CiAgdW5pcXVlKHZhbHVlLnJlcXVpcmVtZW50cy5tYXAoaXRlbSA9PiBpdGVtLmNoYW5nZSksICdNdWx0aXBsZSByZXF1aXJlbWVudHMgcG9pbnQgdG8gdGhlIHNhbWUgY2hhbmdlLicpOwogIGlmICh2YWx1ZS52ZXJzaW9uID09PSAyKSB1bmlxdWUodmFsdWUucmVxdWlyZW1lbnRzLmZsYXRNYXAoaXRlbSA9PiBPYmplY3QudmFsdWVzKGl0ZW0ucm9sZXMpLmZsYXRNYXAocm9sZSA9PiByb2xlLnNwZWNzLm1hcChzcGVjID0+IHNwZWMuaWQpKSksICdEdXBsaWNhdGUgc3BlYyBJRHMgaW4gc3RvcmUgbWV0YWRhdGEuJyk7CiAgcmV0dXJuIHZhbHVlOwp9CgpmdW5jdGlvbiBwYXJzZVRhc2tzKGNvbnRlbnQsIHNvdXJjZVBhdGgpIHsKICBjb25zdCB0YXNrcyA9IFtdOwogIChjb250ZW50IHx8ICcnKS5zcGxpdCgvXHI/XG4vKS5mb3JFYWNoKChsaW5lLCBpbmRleCkgPT4gewogICAgLy8gTWF0Y2ggT3BlblNwZWMgMS4xNCB0YXNrLXByb2dyZXNzIHNlbWFudGljcywgaW5jbHVkaW5nIHVudXN1YWwvZW1wdHkgbWFya2VycywKICAgIC8vIG5lc3RlZC9vcmRlcmVkIGxpc3RzIGFuZCBmZW5jZWQgZXhhbXBsZXMuIE9ubHkgeCBtZWFucyBkb25lOyBsaW5rcyBzdGF5IGxpbmtzLgogICAgY29uc3QgbWF0Y2ggPSBsaW5lLm1hdGNoKC9eXHMqKD86Wy0qK118XGR7MSw5fVsuKV0pXHMqXFsoPzpccyooW15cXVxzXT8pXHMqXF0oPyFbKFtdKXxccytcXSlccyooLiopLyk7CiAgICBpZiAoIW1hdGNoKSByZXR1cm47CiAgICBsZXQgZGVzY3JpcHRpb24gPSBtYXRjaFsyXS50cmltKCk7CiAgICBsZXQgaWQgPSBgbGluZS0ke2luZGV4ICsgMX1gOwogICAgbGV0IHJvbGUgPSBudWxsOwogICAgY29uc3QgbnVtYmVyID0gZGVzY3JpcHRpb24ubWF0Y2goL14oXGQrKD86XC5cZCspK3xcZCspXC4/XHMrLyk7CiAgICBpZiAobnVtYmVyKSB7IGlkID0gbnVtYmVyWzFdOyBkZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uLnNsaWNlKG51bWJlclswXS5sZW5ndGgpOyB9CiAgICBjb25zdCByb2xlUHJlZml4ID0gZGVzY3JpcHRpb24ubWF0Y2goL15cWyhTQXxGcm9udGVuZHxCYWNrZW5kfFFBKVxdXHMqLyk7CiAgICBpZiAocm9sZVByZWZpeCkgewogICAgICByb2xlID0gcm9sZVByZWZpeFsxXTsKICAgICAgZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbi5zbGljZShyb2xlUHJlZml4WzBdLmxlbmd0aCk7CiAgICAgIGlmICghbnVtYmVyKSB7CiAgICAgICAgY29uc3QgYWZ0ZXIgPSBkZXNjcmlwdGlvbi5tYXRjaCgvXihcZCsoPzpcLlxkKykrfFxkKylcLj9ccysvKTsKICAgICAgICBpZiAoYWZ0ZXIpIHsgaWQgPSBhZnRlclsxXTsgZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbi5zbGljZShhZnRlclswXS5sZW5ndGgpOyB9CiAgICAgIH0KICAgIH0KICAgIHJlcXVpcmVWYWx1ZSh0ZXh0KGRlc2NyaXB0aW9uLCA0MDAwKSwgJ0EgdGFzayBoYXMgYW4gZW1wdHkgb3Igb3ZlcnNpemVkIGRlc2NyaXB0aW9uLicpOwogICAgdGFza3MucHVzaCh7IGlkLCBkZXNjcmlwdGlvbiwgZG9uZTogKG1hdGNoWzFdIHx8ICcnKS50b0xvd2VyQ2FzZSgpID09PSAneCcsIGxpbmU6IGluZGV4ICsgMSwgc291cmNlUGF0aCwgcm9sZSB9KTsKICAgIHJlcXVpcmVWYWx1ZSh0YXNrcy5sZW5ndGggPD0gTUFYX1RBU0tTLCAnQSByZXF1aXJlbWVudCBleGNlZWRlZCB0aGUgNTAwLXRhc2sgbGltaXQuJyk7CiAgfSk7CiAgdW5pcXVlKHRhc2tzLm1hcCh0YXNrID0+IHRhc2suaWQpLCAnRHVwbGljYXRlIHRhc2sgSURzIGluIGEgcmVxdWlyZW1lbnQuJyk7CiAgcmV0dXJuIHRhc2tzOwp9CgpmdW5jdGlvbiBhcnRpZmFjdChpZCwgdGFyZ2V0LCByb290LCB3YXJuaW5ncykgewogIGNvbnN0IGNvbnRlbnQgPSByZWFkRmlsZSh0YXJnZXQsIHJvb3QpOwogIGlmIChjb250ZW50ID09PSBudWxsKSB3YXJuaW5ncy5wdXNoKGBNaXNzaW5nICR7aWR9IGFydGlmYWN0OiAke3BhdGgucmVsYXRpdmUocm9vdCwgdGFyZ2V0KX0uYCk7CiAgcmV0dXJuIHsgaWQsIHBhdGg6IHRhcmdldCwgc3RhdHVzOiBjb250ZW50ID09PSBudWxsID8gJ21pc3NpbmcnIDogJ3ByZXNlbnQnLCBjb250ZW50OiBjb250ZW50IHx8ICcnIH07Cn0KCmZ1bmN0aW9uIHNwZWNzQXJ0aWZhY3QoY2hhbmdlUm9vdCwgd29ya3NwYWNlLCB3YXJuaW5ncykgewogIGNvbnN0IHRhcmdldCA9IHBhdGguam9pbihjaGFuZ2VSb290LCAnc3BlY3MnKTsKICBjb25zdCBwaWVjZXMgPSBbXTsKICBsZXQgY29tYmluZWRCeXRlcyA9IDA7CiAgbGV0IGVudHJ5Q291bnQgPSAwOwogIGZ1bmN0aW9uIHNjYW4oZGlyZWN0b3J5LCBkZXB0aCkgewogICAgcmVxdWlyZVZhbHVlKGRlcHRoIDw9IDgsICdBIHJlcXVpcmVtZW50IGV4Y2VlZGVkIHRoZSBzcGVjaWZpY2F0aW9uIGRpcmVjdG9yeSBkZXB0aCBsaW1pdC4nKTsKICAgIHJlcXVpcmVWYWx1ZShzYWZlUGF0aChkaXJlY3RvcnksIHdvcmtzcGFjZSkgJiYgZnMuc3RhdFN5bmMoZGlyZWN0b3J5KS5pc0RpcmVjdG9yeSgpLCAnRXhwZWN0ZWQgYSBzcGVjcyBkaXJlY3RvcnkuJyk7CiAgICBjb25zdCBlbnRyaWVzID0gZnMucmVhZGRpclN5bmMoZGlyZWN0b3J5LCB7IHdpdGhGaWxlVHlwZXM6IHRydWUgfSkuc29ydCgoYSwgYikgPT4gYS5uYW1lLmxvY2FsZUNvbXBhcmUoYi5uYW1lKSk7CiAgICBlbnRyeUNvdW50ICs9IGVudHJpZXMubGVuZ3RoOwogICAgcmVxdWlyZVZhbHVlKGVudHJ5Q291bnQgPD0gNTAwLCAnQSByZXF1aXJlbWVudCBleGNlZWRlZCB0aGUgc3BlY2lmaWNhdGlvbiBkaXJlY3RvcnkgZW50cnkgbGltaXQuJyk7CiAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIGVudHJpZXMpIHsKICAgICAgcmVxdWlyZVZhbHVlKCFlbnRyeS5pc1N5bWJvbGljTGluaygpLCAnU3ltbGlua2VkIHNwZWNpZmljYXRpb24gcGF0aHMgYXJlIG5vdCBzdXBwb3J0ZWQuJyk7CiAgICAgIGNvbnN0IGZpbGUgPSBwYXRoLmpvaW4oZGlyZWN0b3J5LCBlbnRyeS5uYW1lKTsKICAgICAgaWYgKGVudHJ5LmlzRGlyZWN0b3J5KCkpIHsKICAgICAgICByZXF1aXJlVmFsdWUoU0xVRy50ZXN0KGVudHJ5Lm5hbWUpLCAnU3BlY2lmaWNhdGlvbiBkaXJlY3RvcnkgbmFtZXMgbXVzdCBiZSBrZWJhYi1jYXNlLicpOwogICAgICAgIHNjYW4oZmlsZSwgZGVwdGggKyAxKTsKICAgICAgfSBlbHNlIGlmIChlbnRyeS5uYW1lID09PSAnc3BlYy5tZCcpIHsKICAgICAgICBjb25zdCBjb250ZW50ID0gcmVhZEZpbGUoZmlsZSwgd29ya3NwYWNlKTsKICAgICAgICByZXF1aXJlVmFsdWUoY29udGVudCAhPT0gbnVsbCwgJ0Egc3BlY2lmaWNhdGlvbiBjaGFuZ2VkIHdoaWxlIGl0IHdhcyBiZWluZyByZWFkOyByZWZyZXNoIHRvIHRyeSBhZ2Fpbi4nKTsKICAgICAgICBjb25zdCBwaWVjZSA9IGAjICR7cGF0aC5yZWxhdGl2ZSh3b3Jrc3BhY2UsIGZpbGUpfVxuXG4ke2NvbnRlbnR9YDsKICAgICAgICBjb21iaW5lZEJ5dGVzICs9IEJ1ZmZlci5ieXRlTGVuZ3RoKHBpZWNlLCAndXRmOCcpICsgKHBpZWNlcy5sZW5ndGggPyA3IDogMCk7CiAgICAgICAgcmVxdWlyZVZhbHVlKGNvbWJpbmVkQnl0ZXMgPD0gTUFYX01FVEFEQVRBLCAnQ29tYmluZWQgcmVxdWlyZW1lbnQgc3BlY2lmaWNhdGlvbnMgZXhjZWVkZWQgdGhlIDEyOCBLaUIgbGltaXQuJyk7CiAgICAgICAgcGllY2VzLnB1c2gocGllY2UpOwogICAgICB9CiAgICB9CiAgfQogIGlmIChzYWZlUGF0aCh0YXJnZXQsIHdvcmtzcGFjZSkpIHNjYW4odGFyZ2V0LCAwKTsKICBpZiAoIXBpZWNlcy5sZW5ndGgpIHdhcm5pbmdzLnB1c2goJ01pc3Npbmcgc3BlY3MgYXJ0aWZhY3Q6IG5vIGNhcGFiaWxpdHkgc3BlYy5tZCBmaWxlcyBmb3VuZC4nKTsKICBjb25zdCBjb250ZW50ID0gcGllY2VzLmpvaW4oJ1xuXG4tLS1cblxuJyk7CiAgcmVxdWlyZVZhbHVlKEJ1ZmZlci5ieXRlTGVuZ3RoKGNvbnRlbnQsICd1dGY4JykgPD0gTUFYX01FVEFEQVRBLCAnQ29tYmluZWQgcmVxdWlyZW1lbnQgc3BlY2lmaWNhdGlvbnMgZXhjZWVkZWQgdGhlIDEyOCBLaUIgbGltaXQuJyk7CiAgcmV0dXJuIHsgaWQ6ICdzcGVjcycsIHBhdGg6IHRhcmdldCwgc3RhdHVzOiBwaWVjZXMubGVuZ3RoID8gJ3ByZXNlbnQnIDogJ21pc3NpbmcnLCBjb250ZW50IH07Cn0KCmZ1bmN0aW9uIHJlcXVpcmVtZW50KGl0ZW0sIHdvcmtzcGFjZSkgewogIGNvbnN0IHJvb3QgPSBwYXRoLmpvaW4od29ya3NwYWNlLCAnb3BlbnNwZWMnLCAnY2hhbmdlcycsIGl0ZW0uY2hhbmdlKTsKICBzYWZlUGF0aChyb290LCB3b3Jrc3BhY2UpOwogIGNvbnN0IHdhcm5pbmdzID0gW107CiAgY29uc3QgYXJ0aWZhY3RzID0gW2FydGlmYWN0KCdwcm9wb3NhbCcsIHBhdGguam9pbihyb290LCAncHJvcG9zYWwubWQnKSwgd29ya3NwYWNlLCB3YXJuaW5ncyksCiAgICBhcnRpZmFjdCgnZGVzaWduJywgcGF0aC5qb2luKHJvb3QsICdkZXNpZ24ubWQnKSwgd29ya3NwYWNlLCB3YXJuaW5ncyksIHNwZWNzQXJ0aWZhY3Qocm9vdCwgd29ya3NwYWNlLCB3YXJuaW5ncyksCiAgICBhcnRpZmFjdCgndGFza3MnLCBwYXRoLmpvaW4ocm9vdCwgJ3Rhc2tzLm1kJyksIHdvcmtzcGFjZSwgd2FybmluZ3MpXTsKICBjb25zdCB0YXNrcyA9IHBhcnNlVGFza3MoYXJ0aWZhY3RzWzNdLmNvbnRlbnQsIGFydGlmYWN0c1szXS5wYXRoKTsKICBjb25zdCByb2xlcyA9IFJPTEVfSURTLm1hcCgoaWQsIGluZGV4KSA9PiB7CiAgICBjb25zdCBtZXRhZGF0YSA9IGl0ZW0ucm9sZXNbaWRdOwogICAgY29uc3Qgb3duVGFza3MgPSB0YXNrcy5maWx0ZXIodGFzayA9PiB0YXNrLnJvbGUgPT09IGlkKTsKICAgIGNvbnN0IGNvbXBsZXRlID0gb3duVGFza3MuZmlsdGVyKHRhc2sgPT4gdGFzay5kb25lKS5sZW5ndGg7CiAgICBpZiAoIW1ldGFkYXRhKSB3YXJuaW5ncy5wdXNoKGAke2lkfSBoYXMgbm8gb3duZXIgb3Igc3RhdGUgbWV0YWRhdGEuYCk7CiAgICBpZiAoIW93blRhc2tzLmxlbmd0aCkgd2FybmluZ3MucHVzaChgJHtpZH0gaGFzIG5vIHRyYWNrZWQgdGFza3M7IGNvbXBsZXRpb24gaXMgdW52ZXJpZmllZC5gKTsKICAgIGNvbnN0IHN0YXRlID0gb3duVGFza3MubGVuZ3RoID4gMCAmJiBjb21wbGV0ZSA9PT0gb3duVGFza3MubGVuZ3RoID8gJ2RvbmUnCiAgICAgIDogbWV0YWRhdGE/LnN0YXRlID09PSAnYmxvY2tlZCcgPyAnYmxvY2tlZCcKICAgICAgICA6IGNvbXBsZXRlID4gMCB8fCBtZXRhZGF0YT8uc3RhdGUgPT09ICdpbl9wcm9ncmVzcycgPyAnaW5fcHJvZ3Jlc3MnIDogJ2JhY2tsb2cnOwogICAgcmV0dXJuIHsgaWQsIGxhYmVsOiBST0xFX0xBQkVMU1tpbmRleF0sIG93bmVyOiBtZXRhZGF0YT8ub3duZXIgfHwgJ1VuYXNzaWduZWQnLCBzdGF0ZSwgbm90ZTogbWV0YWRhdGE/Lm5vdGUgfHwgJycsCiAgICAgIGNvbXBsZXRlLCB0b3RhbDogb3duVGFza3MubGVuZ3RoLCB0YXNrczogb3duVGFza3MgfTsKICB9KTsKICBjb25zdCB1bmFzc2lnbmVkID0gdGFza3MuZmlsdGVyKHRhc2sgPT4gdGFzay5yb2xlID09PSBudWxsKTsKICBpZiAodW5hc3NpZ25lZC5sZW5ndGgpIHdhcm5pbmdzLnB1c2goYCR7dW5hc3NpZ25lZC5sZW5ndGh9IHRhc2ske3VuYXNzaWduZWQubGVuZ3RoID09PSAxID8gJycgOiAncyd9IHdpdGhvdXQgYSByZWNvZ25pemVkIHJvbGU7IGFzc2lnbiBTQSwgRnJvbnRlbmQsIEJhY2tlbmQsIG9yIFFBLmApOwogIGNvbnN0IHJvbGVzQ29tcGxldGUgPSByb2xlcy5maWx0ZXIocm9sZSA9PiByb2xlLnN0YXRlID09PSAnZG9uZScpLmxlbmd0aDsKICBsZXQgc3RhZ2U7CiAgaWYgKHJvbGVzLnNvbWUocm9sZSA9PiByb2xlLnN0YXRlID09PSAnYmxvY2tlZCcpKSBzdGFnZSA9ICdibG9ja2VkJzsKICBlbHNlIGlmIChyb2xlc0NvbXBsZXRlID09PSBST0xFX0lEUy5sZW5ndGggJiYgdW5hc3NpZ25lZC5ldmVyeSh0YXNrID0+IHRhc2suZG9uZSkpIHN0YWdlID0gJ2RvbmUnOwogIGVsc2UgaWYgKHJvbGVzLmV2ZXJ5KHJvbGUgPT4gcm9sZS5zdGF0ZSA9PT0gJ2JhY2tsb2cnKSkgc3RhZ2UgPSAnYmFja2xvZyc7CiAgZWxzZSBpZiAocm9sZXNbMF0uc3RhdGUgIT09ICdkb25lJykgc3RhZ2UgPSAnc2EnOwogIGVsc2UgaWYgKHJvbGVzWzFdLnN0YXRlICE9PSAnZG9uZScgfHwgcm9sZXNbMl0uc3RhdGUgIT09ICdkb25lJykgc3RhZ2UgPSAnaW1wbGVtZW50YXRpb24nOwogIGVsc2UgaWYgKHJvbGVzWzNdLnN0YXRlICE9PSAnZG9uZScpIHN0YWdlID0gJ3FhJzsKICBlbHNlIHN0YWdlID0gJ2ltcGxlbWVudGF0aW9uJzsKICByZXR1cm4geyBpZDogaXRlbS5pZCwgdGl0bGU6IGl0ZW0udGl0bGUsIHN1bW1hcnk6IGl0ZW0uc3VtbWFyeSwgY2hhbmdlOiBpdGVtLmNoYW5nZSwKICAgIHN0YWdlLCByb2xlcywgY29tcGxldGU6IHRhc2tzLmZpbHRlcih0YXNrID0+IHRhc2suZG9uZSkubGVuZ3RoLCB0b3RhbDogdGFza3MubGVuZ3RoLCByb2xlc0NvbXBsZXRlLAogICAgdGFza3MsIHdhcm5pbmdzLCBhcnRpZmFjdHMgfTsKfQoKZnVuY3Rpb24gcmVxdWlyZW1lbnRXaXRoU3BlY3MoaXRlbSwgd29ya3NwYWNlKSB7CiAgY29uc3Qgcm9vdCA9IHBhdGguam9pbih3b3Jrc3BhY2UsICdvcGVuc3BlYycsICdjaGFuZ2VzJywgaXRlbS5jaGFuZ2UpOwogIHNhZmVQYXRoKHJvb3QsIHdvcmtzcGFjZSk7CiAgY29uc3QgcmVnaXN0ZXJlZCA9IG5ldyBTZXQoUk9MRV9JRFMuZmxhdE1hcChyb2xlID0+IGl0ZW0ucm9sZXNbcm9sZV0uc3BlY3MubWFwKHNwZWMgPT4gc3BlYy5pZCkpKTsKICBmb3IgKGNvbnN0IGtpbmQgb2YgWydzcGVjcycsICd0YXNrcyddKSB7CiAgICBjb25zdCBkaXJlY3RvcnkgPSBwYXRoLmpvaW4ocm9vdCwga2luZCk7CiAgICBpZiAoIXNhZmVQYXRoKGRpcmVjdG9yeSwgd29ya3NwYWNlKSkgY29udGludWU7CiAgICByZXF1aXJlVmFsdWUoZnMuc3RhdFN5bmMoZGlyZWN0b3J5KS5pc0RpcmVjdG9yeSgpLCBgRXhwZWN0ZWQgYSAke2tpbmR9IGRpcmVjdG9yeS5gKTsKICAgIGNvbnN0IGVudHJpZXMgPSBmcy5yZWFkZGlyU3luYyhkaXJlY3RvcnksIHsgd2l0aEZpbGVUeXBlczogdHJ1ZSB9KTsKICAgIHJlcXVpcmVWYWx1ZShlbnRyaWVzLmxlbmd0aCA8PSA1MDAsICdBIHJlcXVpcmVtZW50IGV4Y2VlZGVkIHRoZSBzb3VyY2UgZGlyZWN0b3J5IGVudHJ5IGxpbWl0LicpOwogICAgZm9yIChjb25zdCBlbnRyeSBvZiBlbnRyaWVzKSB7CiAgICAgIGNvbnN0IHRyYWNrZWQgPSBraW5kID09PSAnc3BlY3MnID8gZW50cnkuaXNEaXJlY3RvcnkoKSB8fCBlbnRyeS5pc1N5bWJvbGljTGluaygpIDogZW50cnkubmFtZS5lbmRzV2l0aCgnLm1kJyk7CiAgICAgIGlmICghdHJhY2tlZCkgY29udGludWU7CiAgICAgIGNvbnN0IGlkID0ga2luZCA9PT0gJ3NwZWNzJyA/IGVudHJ5Lm5hbWUgOiBlbnRyeS5uYW1lLnNsaWNlKDAsIC0zKTsKICAgICAgcmVxdWlyZVZhbHVlKCFlbnRyeS5pc1N5bWJvbGljTGluaygpICYmIChraW5kICE9PSAndGFza3MnIHx8IGVudHJ5LmlzRmlsZSgpKSwgJ1N5bWxpbmtlZCBvciBpcnJlZ3VsYXIgcm9sZSBzcGVjIHNvdXJjZSBwYXRocyBhcmUgbm90IHN1cHBvcnRlZC4nKTsKICAgICAgcmVxdWlyZVZhbHVlKHJlZ2lzdGVyZWQuaGFzKGlkKSwgYFVucmVnaXN0ZXJlZCAke2tpbmR9IHNvdXJjZSAke2VudHJ5Lm5hbWV9IGluICR7aXRlbS5pZH07IHJlZ2lzdGVyIHRoZSByb2xlIHNwZWMgb3IgbW92ZSB0aGUgc291cmNlIG91dHNpZGUgdGhlIGFjdGl2ZSBzY2hlbWEgcGF0aHMuYCk7CiAgICB9CiAgfQogIGNvbnN0IHdhcm5pbmdzID0gW107CiAgY29uc3QgYXJ0aWZhY3RzID0gWydwcm9wb3NhbCcsICdkZXNpZ24nXS5tYXAoaWQgPT4gYXJ0aWZhY3QoaWQsIHBhdGguam9pbihyb290LCBgJHtpZH0ubWRgKSwgd29ya3NwYWNlLCB3YXJuaW5ncykpOwogIGNvbnN0IHNwZWNzID0gUk9MRV9JRFMuZmxhdE1hcChyb2xlID0+IGl0ZW0ucm9sZXNbcm9sZV0uc3BlY3MubWFwKG1ldGFkYXRhID0+IHsKICAgIGNvbnN0IG93bldhcm5pbmdzID0gW107CiAgICBjb25zdCBvd25BcnRpZmFjdHMgPSBbYXJ0aWZhY3QoJ3NwZWNzJywgcGF0aC5qb2luKHJvb3QsICdzcGVjcycsIG1ldGFkYXRhLmlkLCAnc3BlYy5tZCcpLCB3b3Jrc3BhY2UsIG93bldhcm5pbmdzKSwKICAgICAgYXJ0aWZhY3QoJ3Rhc2tzJywgcGF0aC5qb2luKHJvb3QsICd0YXNrcycsIGAke21ldGFkYXRhLmlkfS5tZGApLCB3b3Jrc3BhY2UsIG93bldhcm5pbmdzKV07CiAgICBjb25zdCB0YXNrcyA9IHBhcnNlVGFza3Mob3duQXJ0aWZhY3RzWzFdLmNvbnRlbnQsIG93bkFydGlmYWN0c1sxXS5wYXRoKS5tYXAodGFzayA9PiAoeyAuLi50YXNrLCBzcGVjSWQ6IG1ldGFkYXRhLmlkIH0pKTsKICAgIHJlcXVpcmVWYWx1ZSh0YXNrcy5ldmVyeSh0YXNrID0+IHRhc2sucm9sZSA9PT0gcm9sZSksIGBFdmVyeSB0YXNrIGluICR7bWV0YWRhdGEuaWR9IG11c3QgaGF2ZSBpdHMgb3duaW5nIFske3JvbGV9XSByb2xlIHRhZy5gKTsKICAgIGNvbnN0IGNvbXBsZXRlID0gdGFza3MuZmlsdGVyKHRhc2sgPT4gdGFzay5kb25lKS5sZW5ndGg7CiAgICBpZiAoIXRhc2tzLmxlbmd0aCkgb3duV2FybmluZ3MucHVzaCgnTm8gdHJhY2tlZCB0YXNrczsgY29tcGxldGlvbiBpcyB1bnZlcmlmaWVkLicpOwogICAgaWYgKCFvd25BcnRpZmFjdHNbMF0uY29udGVudC50cmltKCkpIG93bldhcm5pbmdzLnB1c2goJ1NwZWNpZmljYXRpb24gY29udGVudCBpcyBtaXNzaW5nIG9yIGVtcHR5OyBjb21wbGV0aW9uIGlzIHVudmVyaWZpZWQuJyk7CiAgICBjb25zdCBzdGF0ZSA9IHRhc2tzLmxlbmd0aCAmJiBjb21wbGV0ZSA9PT0gdGFza3MubGVuZ3RoICYmIG93bkFydGlmYWN0c1swXS5jb250ZW50LnRyaW0oKSA/ICdkb25lJwogICAgICA6IG1ldGFkYXRhLnN0YXRlID09PSAnYmxvY2tlZCcgPyAnYmxvY2tlZCcgOiBjb21wbGV0ZSB8fCBtZXRhZGF0YS5zdGF0ZSA9PT0gJ2luX3Byb2dyZXNzJyA/ICdpbl9wcm9ncmVzcycgOiAnYmFja2xvZyc7CiAgICB3YXJuaW5ncy5wdXNoKC4uLm93bldhcm5pbmdzLm1hcCh3YXJuaW5nID0+IGAke21ldGFkYXRhLmlkfTogJHt3YXJuaW5nfWApKTsKICAgIHJldHVybiB7IGlkOiBtZXRhZGF0YS5pZCwgdGl0bGU6IG1ldGFkYXRhLnRpdGxlLCByb2xlLCBzdGF0ZSwgbm90ZTogbWV0YWRhdGEubm90ZSwKICAgICAgY29tcGxldGUsIHRvdGFsOiB0YXNrcy5sZW5ndGgsIHRhc2tzLCBhcnRpZmFjdHM6IG93bkFydGlmYWN0cywgd2FybmluZ3M6IG93bldhcm5pbmdzIH07CiAgfSkpOwogIGNvbnN0IHRhc2tzID0gc3BlY3MuZmxhdE1hcChzcGVjID0+IHNwZWMudGFza3MpOwogIHJlcXVpcmVWYWx1ZSh0YXNrcy5sZW5ndGggPD0gTUFYX1RBU0tTLCAnQSByZXF1aXJlbWVudCBleGNlZWRlZCB0aGUgNTAwLXRhc2sgbGltaXQuJyk7CiAgY29uc3Qgcm9sZXMgPSBST0xFX0lEUy5tYXAoKGlkLCBpbmRleCkgPT4gewogICAgY29uc3Qgb3duU3BlY3MgPSBzcGVjcy5maWx0ZXIoc3BlYyA9PiBzcGVjLnJvbGUgPT09IGlkKTsKICAgIGNvbnN0IG93blRhc2tzID0gb3duU3BlY3MuZmxhdE1hcChzcGVjID0+IHNwZWMudGFza3MpOwogICAgaWYgKCFvd25TcGVjcy5sZW5ndGgpIHdhcm5pbmdzLnB1c2goYCR7aWR9IGhhcyBubyByZWdpc3RlcmVkIHNwZWNzOyBjb21wbGV0aW9uIGlzIHVudmVyaWZpZWQuYCk7CiAgICBjb25zdCBzdGF0ZSA9IG93blNwZWNzLmxlbmd0aCAmJiBvd25TcGVjcy5ldmVyeShzcGVjID0+IHNwZWMuc3RhdGUgPT09ICdkb25lJykgPyAnZG9uZScKICAgICAgOiBvd25TcGVjcy5zb21lKHNwZWMgPT4gc3BlYy5zdGF0ZSA9PT0gJ2Jsb2NrZWQnKSA/ICdibG9ja2VkJwogICAgICAgIDogb3duU3BlY3Muc29tZShzcGVjID0+IFsnZG9uZScsICdpbl9wcm9ncmVzcyddLmluY2x1ZGVzKHNwZWMuc3RhdGUpKSA/ICdpbl9wcm9ncmVzcycgOiAnYmFja2xvZyc7CiAgICByZXR1cm4geyBpZCwgbGFiZWw6IFJPTEVfTEFCRUxTW2luZGV4XSwgb3duZXI6IGl0ZW0ucm9sZXNbaWRdLm93bmVyLCBub3RlOiBpdGVtLnJvbGVzW2lkXS5ub3RlLCBzdGF0ZSwKICAgICAgc3BlY3M6IG93blNwZWNzLm1hcChzcGVjID0+IHNwZWMuaWQpLCB0YXNrczogb3duVGFza3MsIGNvbXBsZXRlOiBvd25UYXNrcy5maWx0ZXIodGFzayA9PiB0YXNrLmRvbmUpLmxlbmd0aCwgdG90YWw6IG93blRhc2tzLmxlbmd0aCB9OwogIH0pOwogIGNvbnN0IHJvbGVzQ29tcGxldGUgPSByb2xlcy5maWx0ZXIocm9sZSA9PiByb2xlLnN0YXRlID09PSAnZG9uZScpLmxlbmd0aDsKICBjb25zdCBzdGFnZSA9IHJvbGVzLnNvbWUocm9sZSA9PiByb2xlLnN0YXRlID09PSAnYmxvY2tlZCcpID8gJ2Jsb2NrZWQnIDogcm9sZXNDb21wbGV0ZSA9PT0gNCA/ICdkb25lJwogICAgOiByb2xlcy5ldmVyeShyb2xlID0+IHJvbGUuc3RhdGUgPT09ICdiYWNrbG9nJykgPyAnYmFja2xvZycgOiByb2xlc1swXS5zdGF0ZSAhPT0gJ2RvbmUnID8gJ3NhJwogICAgICA6IHJvbGVzWzFdLnN0YXRlICE9PSAnZG9uZScgfHwgcm9sZXNbMl0uc3RhdGUgIT09ICdkb25lJyA/ICdpbXBsZW1lbnRhdGlvbicgOiAncWEnOwogIHJldHVybiB7IGlkOiBpdGVtLmlkLCB0aXRsZTogaXRlbS50aXRsZSwgc3VtbWFyeTogaXRlbS5zdW1tYXJ5LCBjaGFuZ2U6IGl0ZW0uY2hhbmdlLCBzdGFnZSwgcm9sZXMsCiAgICBjb21wbGV0ZTogdGFza3MuZmlsdGVyKHRhc2sgPT4gdGFzay5kb25lKS5sZW5ndGgsIHRvdGFsOiB0YXNrcy5sZW5ndGgsIHJvbGVzQ29tcGxldGUsIHRhc2tzLCB3YXJuaW5ncywgYXJ0aWZhY3RzLCBzcGVjcyB9Owp9CgpmdW5jdGlvbiBlcnJvclJlc3VsdChlcnJvcikgewogIHJldHVybiB7IHZlcnNpb246IDEsIGtpbmQ6ICdlcnJvcicsIG1lc3NhZ2U6IGVycm9yIGluc3RhbmNlb2YgQ29sbGVjdG9yRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogJ0NvdWxkIG5vdCByZWFkIHRoZSBsb2NhbCBPcGVuU3BlYyBzdG9yZS4gQ2hlY2sgaXRzIGRpcmVjdG9yeSBhbmQgZmlsZSBwZXJtaXNzaW9ucy4nIH07Cn0KCmFzeW5jIGZ1bmN0aW9uIGNvbGxlY3QoaW5wdXQsIHsgY3dkID0gcHJvY2Vzcy5jd2QoKSB9ID0ge30pIHsKICB0cnkgewogICAgcmVxdWlyZVZhbHVlKG9iamVjdChpbnB1dCkgJiYgZmllbGRzKGlucHV0LCBbJ2FjdGlvbiddKSAmJiBpbnB1dC5hY3Rpb24gPT09ICdib2FyZCcsICdVbnN1cHBvcnRlZCBjb2xsZWN0b3IgcmVxdWVzdC4nKTsKICAgIHJlcXVpcmVWYWx1ZSh0ZXh0KGN3ZCwgNDA5NikgJiYgcGF0aC5pc0Fic29sdXRlKGN3ZCkgJiYgIS9bXHJcbl0vLnRlc3QoY3dkKSAmJiAhbG9jYWxTZWdtZW50KGN3ZCksICdXb3Jrc3BhY2UgbXVzdCBiZSBhbiBhYnNvbHV0ZSBsb2NhbCBzdG9yZSBwYXRoLicpOwogICAgY29uc3Qgd29ya3NwYWNlID0gcGF0aC5yZXNvbHZlKGN3ZCk7CiAgICByZXF1aXJlVmFsdWUoc2FmZVBhdGgod29ya3NwYWNlLCB3b3Jrc3BhY2UpICYmIGZzLnN0YXRTeW5jKHdvcmtzcGFjZSkuaXNEaXJlY3RvcnkoKSwgJ1N0b3JlIGRpcmVjdG9yeSBpcyB1bmF2YWlsYWJsZS4nKTsKICAgIGNvbnN0IHJhdyA9IHJlYWRGaWxlKHBhdGguam9pbih3b3Jrc3BhY2UsICdvcGVuc3BlYycsICdyZXF1aXJlbWVudHMuanNvbicpLCB3b3Jrc3BhY2UsIE1BWF9NRVRBREFUQSk7CiAgICByZXF1aXJlVmFsdWUocmF3ICE9PSBudWxsLCAnTWlzc2luZyBvcGVuc3BlYy9yZXF1aXJlbWVudHMuanNvbi4gU2VsZWN0IGFuIE9wZW5TcGVjIHN0b3JlIGRpcmVjdG9yeS4nKTsKICAgIGxldCBtZXRhZGF0YTsKICAgIHRyeSB7IG1ldGFkYXRhID0gSlNPTi5wYXJzZShyYXcpOyB9IGNhdGNoIHsgdGhyb3cgbmV3IENvbGxlY3RvckVycm9yKCdvcGVuc3BlYy9yZXF1aXJlbWVudHMuanNvbiBpcyBub3QgdmFsaWQgSlNPTi4nKTsgfQogICAgdmFsaWRhdGVNZXRhZGF0YShtZXRhZGF0YSk7CiAgICBjb25zdCByZXN1bHQgPSB7IHZlcnNpb246IG1ldGFkYXRhLnZlcnNpb24sIGtpbmQ6ICdib2FyZCcsIHdvcmtzcGFjZSwgbmFtZTogbWV0YWRhdGEubmFtZSwgZGVzY3JpcHRpb246IG1ldGFkYXRhLmRlc2NyaXB0aW9uLAogICAgICBnZW5lcmF0ZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLCByZXF1aXJlbWVudHM6IG1ldGFkYXRhLnJlcXVpcmVtZW50cy5tYXAoaXRlbSA9PgogICAgICAgIG1ldGFkYXRhLnZlcnNpb24gPT09IDIgPyByZXF1aXJlbWVudFdpdGhTcGVjcyhpdGVtLCB3b3Jrc3BhY2UpIDogcmVxdWlyZW1lbnQoaXRlbSwgd29ya3NwYWNlKSkgfTsKICAgIHJlcXVpcmVWYWx1ZShCdWZmZXIuYnl0ZUxlbmd0aChKU09OLnN0cmluZ2lmeShyZXN1bHQpLCAndXRmOCcpIDw9IE1BWF9PVVRQVVQsICdTdG9yZSBkYXRhIGV4Y2VlZGVkIHRoZSA1MTIgS2lCIG91dHB1dCBsaW1pdC4nKTsKICAgIHJldHVybiByZXN1bHQ7CiAgfSBjYXRjaCAoZXJyb3IpIHsgcmV0dXJuIGVycm9yUmVzdWx0KGVycm9yKTsgfQp9Cgphc3luYyBmdW5jdGlvbiBtYWluKCkgewogIGxldCByZXN1bHQ7CiAgdHJ5IHsKICAgIGNvbnN0IGVuY29kZWQgPSBwcm9jZXNzLmFyZ3ZbbW9kdWxlLmlkID09PSAnW2V2YWxdJyA/IDEgOiAyXTsKICAgIHJlcXVpcmVWYWx1ZSh0eXBlb2YgZW5jb2RlZCA9PT0gJ3N0cmluZycgJiYgZW5jb2RlZC5sZW5ndGggPiAwICYmIGVuY29kZWQubGVuZ3RoIDw9IDQwOTYKICAgICAgJiYgL14oPzpbQS1aYS16MC05Ky9dezR9KSooPzpbQS1aYS16MC05Ky9dezJ9PT18W0EtWmEtejAtOSsvXXszfT0pPyQvLnRlc3QoZW5jb2RlZCksICdFeHBlY3RlZCBvbmUgYmFzZTY0LWVuY29kZWQgSlNPTiBpbnB1dC4nKTsKICAgIGNvbnN0IGRlY29kZWQgPSBCdWZmZXIuZnJvbShlbmNvZGVkLCAnYmFzZTY0Jyk7CiAgICByZXF1aXJlVmFsdWUoZGVjb2RlZC50b1N0cmluZygnYmFzZTY0JykgPT09IGVuY29kZWQgJiYgQnVmZmVyLmZyb20oZGVjb2RlZC50b1N0cmluZygndXRmOCcpLCAndXRmOCcpLmVxdWFscyhkZWNvZGVkKSwgJ0ludmFsaWQgaW5wdXQgZW5jb2RpbmcuJyk7CiAgICBsZXQgaW5wdXQ7CiAgICB0cnkgeyBpbnB1dCA9IEpTT04ucGFyc2UoZGVjb2RlZC50b1N0cmluZygndXRmOCcpKTsgfSBjYXRjaCB7IHRocm93IG5ldyBDb2xsZWN0b3JFcnJvcignSW5wdXQgd2FzIG5vdCB2YWxpZCBKU09OLicpOyB9CiAgICByZXN1bHQgPSBhd2FpdCBjb2xsZWN0KGlucHV0KTsKICB9IGNhdGNoIChlcnJvcikgeyByZXN1bHQgPSBlcnJvclJlc3VsdChlcnJvcik7IH0KICBwcm9jZXNzLnN0ZG91dC53cml0ZShKU09OLnN0cmluZ2lmeShyZXN1bHQpICsgJ1xuJyk7CiAgaWYgKHJlc3VsdC5raW5kID09PSAnZXJyb3InKSBwcm9jZXNzLmV4aXRDb2RlID0gMTsKfQoKbW9kdWxlLmV4cG9ydHMgPSB7IGNvbGxlY3QgfTsKaWYgKHJlcXVpcmUubWFpbiA9PT0gbW9kdWxlIHx8IG1vZHVsZS5pZCA9PT0gJ1tldmFsXScpIG1haW4oKTsK"), (character) => character.charCodeAt(0)));

// src/client.js
var ROLES = ["SA", "Frontend", "Backend", "QA"];
var LABELS = ["Solution Architect", "Frontend", "Backend", "Quality Assurance"];
var PREFIXES = { SA: "SA", Frontend: "FE", Backend: "BE", QA: "QA" };
var SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
var LIMIT = 512 * 1024;
var encoder = new TextEncoder();
function object(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function text(value, limit = 2e3, empty = false) {
  return typeof value === "string" && (empty || value.trim().length > 0) && value.length <= limit && !value.includes("\0");
}
function count(value) {
  return Number.isSafeInteger(value) && value >= 0 && value <= 500;
}
function fields(value, names) {
  return object(value) && Object.keys(value).every((key) => names.includes(key));
}
function check(value, message = "The store returned invalid or inconsistent board data.") {
  if (!value) throw new Error(message);
}
function unique(values) {
  return new Set(values).size === values.length;
}
function sameTask(left, right) {
  return ["id", "description", "done", "line", "sourcePath", "role"].every((key) => left[key] === right[key]);
}
function validateWorkspace(value) {
  check(
    typeof value === "string" && value.startsWith("/") && value.length <= 4096 && !/[\0\r\n\\]/.test(value) && !value.split("/").some((part) => [".", "..", ".local"].includes(part)),
    "Enter an absolute store directory on the connected Agent Server, without symlinks or parent-directory segments."
  );
  return value.replace(/\/{2,}/g, "/").replace(/\/+$/, "") || "/";
}
function validateTask(task, tasksPath, specId) {
  check(fields(task, ["id", "description", "done", "line", "sourcePath", "role", ...specId ? ["specId"] : []]) && text(task.id, 100) && text(task.description, 4e3) && typeof task.done === "boolean" && Number.isSafeInteger(task.line) && task.line > 0 && task.line <= 65536 && task.sourcePath === tasksPath && (task.role === null || ROLES.includes(task.role)) && (!specId || task.specId === specId));
}
function validateRequirementWithSpecs(item, workspace) {
  check(fields(item, ["id", "title", "summary", "change", "stage", "roles", "complete", "total", "rolesComplete", "tasks", "warnings", "artifacts", "specs"]) && text(item.id, 64) && /^REQ-[0-9]{3,}$/.test(item.id) && text(item.title, 200) && text(item.summary, 4e3, true) && text(item.change, 100) && SLUG.test(item.change) && Array.isArray(item.specs) && item.specs.length <= 20 && Array.isArray(item.roles) && item.roles.length === 4 && Array.isArray(item.tasks) && count(item.total) && count(item.complete) && item.complete <= item.total && item.tasks.length === item.total && Array.isArray(item.warnings) && item.warnings.length <= 100 && item.warnings.every((warning) => text(warning, 4e3)) && unique(item.warnings) && Array.isArray(item.artifacts) && item.artifacts.length === 2);
  const root = `${workspace === "/" ? "" : workspace}/openspec/changes/${item.change}`;
  function validateArtifact(artifact, id, sourcePath, warnings) {
    check(fields(artifact, ["id", "path", "status", "content"]) && artifact.id === id && artifact.path === sourcePath && ["present", "missing"].includes(artifact.status) && text(artifact.content, 64 * 1024, true) && encoder.encode(artifact.content).length <= 64 * 1024 && (artifact.status !== "missing" || artifact.content === "" && warnings.length > 0));
  }
  item.artifacts.forEach((artifact, index) => {
    const id = ["proposal", "design"][index];
    validateArtifact(artifact, id, `${root}/${id}.md`, item.warnings);
  });
  check(unique(item.specs.map((spec) => spec.id)));
  for (const spec of item.specs) {
    check(fields(spec, ["id", "title", "role", "state", "note", "complete", "total", "tasks", "artifacts", "warnings"]) && text(spec.id, 160) && text(spec.title, 200) && ROLES.includes(spec.role) && spec.id.startsWith(`${PREFIXES[spec.role]}-${item.id}-`) && SLUG.test(spec.id.slice(`${PREFIXES[spec.role]}-${item.id}-`.length)) && ["backlog", "in_progress", "blocked", "done"].includes(spec.state) && text(spec.note, 4e3, true) && count(spec.total) && count(spec.complete) && spec.complete <= spec.total && Array.isArray(spec.tasks) && spec.tasks.length === spec.total && Array.isArray(spec.artifacts) && spec.artifacts.length === 2 && Array.isArray(spec.warnings) && spec.warnings.length <= 10 && spec.warnings.every((warning) => text(warning, 4e3)) && unique(spec.warnings));
    validateArtifact(spec.artifacts[0], "specs", `${root}/specs/${spec.id}/spec.md`, spec.warnings);
    validateArtifact(spec.artifacts[1], "tasks", `${root}/tasks/${spec.id}.md`, spec.warnings);
    spec.tasks.forEach((task) => {
      validateTask(task, spec.artifacts[1].path, spec.id);
      check(task.role === spec.role);
    });
    check(unique(spec.tasks.map((task) => task.id)) && unique(spec.tasks.map((task) => task.line)) && spec.complete === spec.tasks.filter((task) => task.done).length && (spec.artifacts[1].status === "present" || spec.total === 0));
    const completed = spec.total > 0 && spec.complete === spec.total && spec.artifacts[0].content.trim().length > 0;
    check(spec.state === "done" === completed && (spec.complete === 0 || spec.state !== "backlog"));
    if (!spec.total) check(spec.warnings.includes("No tracked tasks; completion is unverified."));
    if (!spec.artifacts[0].content.trim()) check(spec.warnings.includes("Specification content is missing or empty; completion is unverified."));
    check(spec.warnings.every((warning) => item.warnings.includes(`${spec.id}: ${warning}`)));
  }
  function compareTasks(actual, expected) {
    check(Array.isArray(actual) && actual.length === expected.length);
    actual.forEach((task, index) => {
      const wanted = expected[index];
      validateTask(task, wanted.sourcePath, wanted.specId);
      check(sameTask(task, wanted));
    });
  }
  compareTasks(item.tasks, item.specs.flatMap((spec) => spec.tasks));
  check(item.complete === item.tasks.filter((task) => task.done).length);
  item.roles.forEach((role, index) => {
    check(fields(role, ["id", "label", "owner", "state", "note", "complete", "total", "tasks", "specs"]) && role.id === ROLES[index] && role.label === LABELS[index] && text(role.owner, 200) && text(role.note, 4e3, true) && Array.isArray(role.specs));
    const specs = item.specs.filter((spec) => spec.role === role.id);
    check(JSON.stringify(role.specs) === JSON.stringify(specs.map((spec) => spec.id)));
    compareTasks(role.tasks, specs.flatMap((spec) => spec.tasks));
    check(role.total === role.tasks.length && role.complete === role.tasks.filter((task) => task.done).length);
    const state = specs.length && specs.every((spec) => spec.state === "done") ? "done" : specs.some((spec) => spec.state === "blocked") ? "blocked" : specs.some((spec) => ["done", "in_progress"].includes(spec.state)) ? "in_progress" : "backlog";
    check(role.state === state);
    if (!specs.length) check(item.warnings.includes(`${role.id} has no registered specs; completion is unverified.`));
  });
  check(item.rolesComplete === item.roles.filter((role) => role.state === "done").length);
  const states = item.roles.map((role) => role.state);
  const stage = states.includes("blocked") ? "blocked" : item.rolesComplete === 4 ? "done" : states.every((state) => state === "backlog") ? "backlog" : states[0] !== "done" ? "sa" : states[1] !== "done" || states[2] !== "done" ? "implementation" : "qa";
  check(item.stage === stage);
}
function validateRequirement(item, workspace) {
  check(fields(item, ["id", "title", "summary", "change", "stage", "roles", "complete", "total", "rolesComplete", "tasks", "warnings", "artifacts"]) && text(item.id, 64) && /^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)*$/.test(item.id) && text(item.title, 200) && text(item.summary, 4e3, true) && text(item.change, 100) && SLUG.test(item.change) && Array.isArray(item.roles) && item.roles.length === 4 && count(item.total) && count(item.complete) && item.complete <= item.total && Number.isInteger(item.rolesComplete) && item.rolesComplete >= 0 && item.rolesComplete <= 4 && Array.isArray(item.tasks) && item.tasks.length === item.total && Array.isArray(item.warnings) && item.warnings.length <= 100 && item.warnings.every((warning) => text(warning, 4e3)) && unique(item.warnings) && Array.isArray(item.artifacts) && item.artifacts.length === 4);
  const root = `${workspace === "/" ? "" : workspace}/openspec/changes/${item.change}`;
  const tasksPath = `${root}/tasks.md`;
  item.tasks.forEach((task) => validateTask(task, tasksPath));
  check(unique(item.tasks.map((task) => task.id)) && unique(item.tasks.map((task) => task.line)) && item.tasks.filter((task) => task.done).length === item.complete);
  const artifactIds = ["proposal", "design", "specs", "tasks"];
  item.artifacts.forEach((artifact, index) => {
    const id = artifactIds[index];
    check(fields(artifact, ["id", "path", "status", "content"]) && artifact.id === id && artifact.path === `${root}/${id === "specs" ? "specs" : `${id}.md`}` && ["present", "missing"].includes(artifact.status) && text(artifact.content, 128 * 1024, true) && encoder.encode(artifact.content).length <= (id === "specs" ? 128 * 1024 : 64 * 1024) && (artifact.status !== "missing" || artifact.content === ""));
    if (artifact.status === "missing") check(item.warnings.length > 0);
  });
  check(item.artifacts[3].status === "present" || item.total === 0);
  item.roles.forEach((role, index) => {
    check(fields(role, ["id", "label", "owner", "state", "note", "complete", "total", "tasks"]) && role.id === ROLES[index] && role.label === LABELS[index] && text(role.owner, 200) && text(role.note, 4e3, true) && ["backlog", "in_progress", "blocked", "done"].includes(role.state) && count(role.complete) && count(role.total) && role.complete <= role.total && Array.isArray(role.tasks));
    const expected = item.tasks.filter((task) => task.role === role.id);
    check(role.total === expected.length && role.complete === expected.filter((task) => task.done).length && role.tasks.length === expected.length);
    role.tasks.forEach((task, taskIndex) => {
      validateTask(task, tasksPath);
      check(sameTask(task, expected[taskIndex]));
    });
    check(role.state === "done" === (role.total > 0 && role.complete === role.total));
    check(role.complete === 0 || role.state !== "backlog");
    if (!role.total) check(item.warnings.some((warning) => warning.startsWith(`${role.id} has no tracked tasks;`)));
  });
  const unassigned = item.tasks.filter((task) => task.role === null);
  if (unassigned.length) check(item.warnings.some((warning) => warning.includes("without a recognized role")));
  check(item.rolesComplete === item.roles.filter((role) => role.state === "done").length);
  const states = item.roles.map((role) => role.state);
  const stage = states.includes("blocked") ? "blocked" : item.rolesComplete === 4 && unassigned.every((task) => task.done) ? "done" : states.every((state) => state === "backlog") ? "backlog" : states[0] !== "done" ? "sa" : states[1] !== "done" || states[2] !== "done" ? "implementation" : states[3] !== "done" ? "qa" : "implementation";
  check(item.stage === stage);
}
function validateBoard(data, workspace, now = Date.now()) {
  const cwd = validateWorkspace(workspace);
  check(fields(data, ["version", "kind", "workspace", "name", "description", "generatedAt", "requirements"]) && [1, 2].includes(data.version) && data.kind === "board" && data.workspace === cwd && text(data.name, 200) && text(data.description, 4e3, true) && typeof data.generatedAt === "string" && Number.isFinite(Date.parse(data.generatedAt)) && new Date(data.generatedAt).toISOString() === data.generatedAt && Array.isArray(data.requirements) && data.requirements.length <= 50);
  const age = now - Date.parse(data.generatedAt);
  check(age >= -6e4 && age <= 3e5, "The store returned an old snapshot or its server clock differs. Refresh and check the Agent Server clock.");
  check(encoder.encode(JSON.stringify(data)).length <= LIMIT, "Store data exceeded the 512 KiB output limit.");
  data.requirements.forEach((item) => data.version === 2 ? validateRequirementWithSpecs(item, cwd) : validateRequirement(item, cwd));
  check(unique(data.requirements.map((item) => item.id)) && unique(data.requirements.map((item) => item.change)));
  if (data.version === 2) check(unique(data.requirements.flatMap((item) => item.specs.map((spec) => spec.id))));
  return data;
}
async function loadBoard(host, workspace) {
  const cwd = validateWorkspace(workspace);
  const bytes = encoder.encode(JSON.stringify({ action: "board" }));
  const encoded = btoa(String.fromCharCode(...bytes));
  const quote2 = (value) => "'" + value.replaceAll("'", "'\\''") + "'";
  const command = `node -e ${quote2(collector_default)} ${quote2(encoded)}`;
  let response;
  try {
    response = await host.agentServer.request({
      method: "POST",
      path: "/api/bash/execute_bash_command",
      body: { command, cwd, timeout: 30 }
    });
  } catch {
    throw new Error("Cannot read this store from the Agent Server. Check its connection and store directory, then refresh.");
  }
  check(
    object(response) && typeof response.stdout === "string" && encoder.encode(response.stdout).length <= LIMIT + 1 && response.order === 0 && Number.isInteger(response.exit_code),
    "The store query did not return complete output. Refresh or inspect the Agent Server."
  );
  let data;
  try {
    data = JSON.parse(response.stdout);
  } catch {
    throw new Error("The store query returned invalid output. Check that Node.js is installed on the Agent Server.");
  }
  if (fields(data, ["version", "kind", "message"]) && data.version === 1 && data.kind === "error" && text(data.message, 600)) {
    throw new Error(data.message);
  }
  check(response.exit_code === 0, "The store query failed on the Agent Server. Refresh to try again.");
  return validateBoard(data, cwd);
}

// embedded-raw-source:/Users/oka/Desktop/openhands-apps/src/automation_bridge.py
var automation_bridge_default = new TextDecoder().decode(Uint8Array.from(atob("IiIiQm91bmRlZCBuYXRpdmUgQXV0b21hdGlvbiBicmlkZ2UuIEV4ZWN1dGVkIGluc2lkZSBBZ2VudCBTZXJ2ZXIsIG5ldmVyIENhbnZhcy4KCk9ubHkgZXhwbGljaXQgc2V0dXAgaW5zdGFsbHMgdGhlIGZpeGVkIHJlcG9zaXRvcnkncyBidW5kbGVzLiBPbmx5IGRpc3BhdGNoIHNlbmRzCmFuIGV2ZW50LiBDcmVkZW50aWFscyByZW1haW4gaW4gdGhpcyBwcm9jZXNzIGFuZCBwcml2YXRlLCBwZXItYmFja2VuZCBzdGF0ZS4KIiIiCmltcG9ydCBiYXNlNjQKaW1wb3J0IGNvbnRleHRsaWIKaW1wb3J0IGZjbnRsCmltcG9ydCBoYXNobGliCmltcG9ydCBobWFjCmltcG9ydCBpbwppbXBvcnQganNvbgppbXBvcnQgb3MKZnJvbSBwYXRobGliIGltcG9ydCBQYXRoCmltcG9ydCByZQppbXBvcnQgc2VjcmV0cwppbXBvcnQgc3lzCmltcG9ydCB0YXJmaWxlCmltcG9ydCB0ZW1wZmlsZQppbXBvcnQgdXJsbGliLmVycm9yCmltcG9ydCB1cmxsaWIucGFyc2UKaW1wb3J0IHVybGxpYi5yZXF1ZXN0CmltcG9ydCB1dWlkCgpSRVBPU0lUT1JZID0gUGF0aCgnL1VzZXJzL29rYS9EZXNrdG9wL29wZW5oYW5kcy1hdXRvbWF0aW9uJykKU09VUkNFID0gJ29wZW5zcGVjLXJvbGUtZGFzaGJvYXJkJwpTQ0hFTUEgPSBTT1VSQ0UgKyAnL3YyJwpTVEFHRVMgPSAoJ3Byb3Bvc2UnLCAndXBkYXRlJywgJ2FwcGx5JykKUk9MRVMgPSAoJ1NBJywgJ0Zyb250ZW5kJywgJ0JhY2tlbmQnLCAnUUEnKQpST0xFX1BSRUZJWEVTID0geydTQSc6ICdTQScsICdGcm9udGVuZCc6ICdGRScsICdCYWNrZW5kJzogJ0JFJywgJ1FBJzogJ1FBJ30KUEFJUlMgPSB0dXBsZSgocm9sZSwgc3RhZ2UpIGZvciByb2xlIGluIFJPTEVTIGZvciBzdGFnZSBpbiBTVEFHRVMpClNUQVRVU0VTID0gKCdQRU5ESU5HJywgJ1JVTk5JTkcnLCAnQ09NUExFVEVEJywgJ0ZBSUxFRCcsICdDQU5DRUxMRUQnLCAnU0tJUFBFRCcpCkJVTkRMRV9GSUxFUyA9ICgnY29uZmlnLmpzb24nLCAncHJvbXB0Lm1kJywgJ3J1bi5weScpClNPVVJDRV9OQU1FID0gJ09wZW5TcGVjIHJvbGUgZGFzaGJvYXJkIMK3IGV4cGxpY2l0IHNraWxsIHJlcXVlc3RzJwoKCmNsYXNzIEJyaWRnZUVycm9yKEV4Y2VwdGlvbik6CiAgICBwYXNzCgoKZGVmIHJlcXVpcmUoY29uZGl0aW9uLCBtZXNzYWdlKToKICAgIGlmIG5vdCBjb25kaXRpb246CiAgICAgICAgcmFpc2UgQnJpZGdlRXJyb3IobWVzc2FnZSkKCgpkZWYgaWRlbnRpZmllcih2YWx1ZSk6CiAgICB0cnk6CiAgICAgICAgcmV0dXJuIGlzaW5zdGFuY2UodmFsdWUsIHN0cikgYW5kIHN0cih1dWlkLlVVSUQodmFsdWUpKSA9PSB2YWx1ZQogICAgZXhjZXB0IChWYWx1ZUVycm9yLCBBdHRyaWJ1dGVFcnJvcik6CiAgICAgICAgcmV0dXJuIEZhbHNlCgoKZGVmIHNsdWcodmFsdWUpOgogICAgcmV0dXJuIGlzaW5zdGFuY2UodmFsdWUsIHN0cikgYW5kIGxlbih2YWx1ZSkgPD0gMTAwIGFuZCByZS5mdWxsbWF0Y2gocidbYS16MC05XSsoPzotW2EtejAtOV0rKSonLCB2YWx1ZSkKCgpkZWYgbG9jYWxfcGF0aCh2YWx1ZSk6CiAgICByZXF1aXJlKGlzaW5zdGFuY2UodmFsdWUsIHN0cikgYW5kIDEgPCBsZW4odmFsdWUpIDw9IDQwOTYgYW5kIHZhbHVlLnN0YXJ0c3dpdGgoJy8nKQogICAgICAgICAgICBhbmQgbm90IGFueShjaGFyIGluIHZhbHVlIGZvciBjaGFyIGluICdceDAwXHJcblxcJykgYW5kIG5vdCB2YWx1ZS5lbmRzd2l0aCgnLycpCiAgICAgICAgICAgIGFuZCAnLy8nIG5vdCBpbiB2YWx1ZSBhbmQgbm90IHNldChQYXRoKHZhbHVlKS5wYXJ0cykgJiB7Jy4nLCAnLi4nLCAnLmxvY2FsJ30KICAgICAgICAgICAgYW5kICcvLi8nIG5vdCBpbiB2YWx1ZSwgJ0V4cGVjdGVkIGEgY2Fub25pY2FsIGFic29sdXRlIGxvY2FsIGRpcmVjdG9yeScpCiAgICBwYXRoID0gUGF0aCh2YWx1ZSkKICAgIHJlcXVpcmUocGF0aC5yZXNvbHZlKCkgPT0gcGF0aCwgJ1N5bWxpbmtlZCBzb3VyY2UgZGlyZWN0b3JpZXMgYXJlIG5vdCBzdXBwb3J0ZWQnKQogICAgcmV0dXJuIHBhdGgKCgpkZWYgZW5jb2RlKHZhbHVlKToKICAgIHJldHVybiBqc29uLmR1bXBzKHZhbHVlLCBlbnN1cmVfYXNjaWk9RmFsc2UsIGFsbG93X25hbj1GYWxzZSwgc2VwYXJhdG9ycz0oJywnLCAnOicpKS5lbmNvZGUoKQoKCmRlZiByZWFkX2J5dGVzKHBhdGgsIGxpbWl0PTEyOCAqIDEwMjQpOgogICAgcmVxdWlyZShwYXRoLnJlc29sdmUoKSA9PSBwYXRoIGFuZCBwYXRoLmlzX2ZpbGUoKSBhbmQgbm90IHBhdGguaXNfc3ltbGluaygpLCAnTWlzc2luZyBvciBzeW1saW5rZWQgbG9jYWwgc291cmNlIGZpbGUnKQogICAgZGVzY3JpcHRvciA9IG9zLm9wZW4ocGF0aCwgb3MuT19SRE9OTFkgfCBvcy5PX05PRk9MTE9XKQogICAgd2l0aCBvcy5mZG9wZW4oZGVzY3JpcHRvciwgJ3JiJykgYXMgc3RyZWFtOgogICAgICAgIHJhdyA9IHN0cmVhbS5yZWFkKGxpbWl0ICsgMSkKICAgIHJlcXVpcmUobGVuKHJhdykgPD0gbGltaXQsICdMb2NhbCBzb3VyY2UgZmlsZSBleGNlZWRlZCBpdHMgc2l6ZSBsaW1pdCcpCiAgICByZXR1cm4gcmF3CgoKZGVmIHJlYWRfanNvbihwYXRoLCBsaW1pdD0xMjggKiAxMDI0KToKICAgIHRyeToKICAgICAgICByZXR1cm4ganNvbi5sb2FkcyhyZWFkX2J5dGVzKHBhdGgsIGxpbWl0KS5kZWNvZGUoJ3V0Zi04JykpCiAgICBleGNlcHQgKFVuaWNvZGVFcnJvciwgVmFsdWVFcnJvcik6CiAgICAgICAgcmFpc2UgQnJpZGdlRXJyb3IoJ0ludmFsaWQgSlNPTiBpbiBhIGxvY2FsIEF1dG9tYXRpb24gc291cmNlIGZpbGUnKSBmcm9tIE5vbmUKCgpkZWYgYXRvbWljX2pzb24ocGF0aCwgdmFsdWUpOgogICAgZGVzY3JpcHRvciwgdGVtcG9yYXJ5ID0gdGVtcGZpbGUubWtzdGVtcChkaXI9cGF0aC5wYXJlbnQpCiAgICB0cnk6CiAgICAgICAgd2l0aCBvcy5mZG9wZW4oZGVzY3JpcHRvciwgJ3diJykgYXMgc3RyZWFtOgogICAgICAgICAgICBzdHJlYW0ud3JpdGUoZW5jb2RlKHZhbHVlKSkKICAgICAgICAgICAgc3RyZWFtLmZsdXNoKCkKICAgICAgICAgICAgb3MuZnN5bmMoc3RyZWFtLmZpbGVubygpKQogICAgICAgIG9zLnJlcGxhY2UodGVtcG9yYXJ5LCBwYXRoKQogICAgZmluYWxseToKICAgICAgICBpZiBvcy5wYXRoLmV4aXN0cyh0ZW1wb3JhcnkpOgogICAgICAgICAgICBvcy51bmxpbmsodGVtcG9yYXJ5KQoKCmNsYXNzIE5vUmVkaXJlY3QodXJsbGliLnJlcXVlc3QuSFRUUFJlZGlyZWN0SGFuZGxlcik6CiAgICBkZWYgcmVkaXJlY3RfcmVxdWVzdChzZWxmLCByZXEsIGZwLCBjb2RlLCBtc2csIGhlYWRlcnMsIG5ld3VybCk6CiAgICAgICAgcmV0dXJuIE5vbmUKCgpkZWYgcmVxdWVzdF9qc29uKHVybCwgKiwgbWV0aG9kPSdHRVQnLCBib2R5PU5vbmUsIGhlYWRlcnM9Tm9uZSk6CiAgICByYXcgPSBib2R5IGlmIGlzaW5zdGFuY2UoYm9keSwgYnl0ZXMpIGVsc2UgTm9uZSBpZiBib2R5IGlzIE5vbmUgZWxzZSBlbmNvZGUoYm9keSkKICAgIHJlcXVlc3QgPSB1cmxsaWIucmVxdWVzdC5SZXF1ZXN0KHVybCwgZGF0YT1yYXcsIG1ldGhvZD1tZXRob2QsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM9eydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsICoqKGhlYWRlcnMgb3Ige30pfSkKICAgIHRyeToKICAgICAgICB3aXRoIHVybGxpYi5yZXF1ZXN0LmJ1aWxkX29wZW5lcihOb1JlZGlyZWN0KS5vcGVuKHJlcXVlc3QsIHRpbWVvdXQ9NSkgYXMgcmVzcG9uc2U6CiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3BvbnNlLnJlYWQoMV8wMDBfMDAxKQogICAgICAgIHJlcXVpcmUobGVuKHJlc3VsdCkgPD0gMV8wMDBfMDAwLCAnQXV0b21hdGlvbiByZXNwb25zZSBleGNlZWRlZCBpdHMgc2l6ZSBsaW1pdCcpCiAgICAgICAgaWYgbWV0aG9kID09ICdERUxFVEUnIGFuZCBub3QgcmVzdWx0OgogICAgICAgICAgICByZXR1cm4gTm9uZQogICAgICAgIHJldHVybiBqc29uLmxvYWRzKHJlc3VsdCkKICAgIGV4Y2VwdCB1cmxsaWIuZXJyb3IuSFRUUEVycm9yIGFzIGVycm9yOgogICAgICAgIHN0YXR1cyA9IGVycm9yLmNvZGUKICAgICAgICBlcnJvci5jbG9zZSgpCiAgICAgICAgcmFpc2UgQnJpZGdlRXJyb3IoZidBdXRvbWF0aW9uIHJlcXVlc3QgZmFpbGVkIChIVFRQIHtzdGF0dXN9KTsgaW5zcGVjdCBpdHMgaGlzdG9yeSBiZWZvcmUgcmV0cnlpbmcnKSBmcm9tIE5vbmUKICAgIGV4Y2VwdCAodXJsbGliLmVycm9yLlVSTEVycm9yLCBUaW1lb3V0RXJyb3IsIE9TRXJyb3IsIFZhbHVlRXJyb3IpOgogICAgICAgIHJhaXNlIEJyaWRnZUVycm9yKCdBdXRvbWF0aW9uIHJlcXVlc3Qgb3V0Y29tZSBpcyB1bmtub3duOyBpbnNwZWN0IGl0cyBoaXN0b3J5IGJlZm9yZSByZXRyeWluZycpIGZyb20gTm9uZQoKCmRlZiB0cmlnZ2VyKHJvbGUsIHN0YWdlKToKICAgIHJldHVybiB7J3R5cGUnOiAnZXZlbnQnLCAnc291cmNlJzogU09VUkNFLCAnb24nOiBzdGFnZSArICcucmVxdWVzdGVkJywKICAgICAgICAgICAgJ2ZpbHRlcic6IGYic2NoZW1hID09ICd7U0NIRU1BfScgJiYgc3RhZ2UgPT0gJ3tzdGFnZX0nICYmIGFwcHJvdmFsID09ICd7c3RhZ2V9JyAmJiByb2xlID09ICd7cm9sZX0nIn0KCgpkZWYgYXV0b21hdGlvbl9uYW1lKHJvbGUsIHN0YWdlKToKICAgIHJldHVybiBmJ09wZW5TcGVjIHtyb2xlfSDCtyB7c3RhZ2UudGl0bGUoKX0nCgoKZGVmIHBhaXJfa2V5KHJvbGUsIHN0YWdlKToKICAgIHJldHVybiByb2xlICsgJzonICsgc3RhZ2UKCgpkZWYgcmV0aXJlZF9kZWZpbml0aW9ucyhpbnZlbnRvcnkpOgogICAgIiIiUmVjb2duaXplIG9ubHkgdGhlIHRlbiBkZWZpbml0aW9ucyBzdXBlcnNlZGVkIGJ5IHRoZSBkZWRpY2F0ZWQgd29ya2Zsb3cuIiIiCiAgICBleHBlY3RlZCA9IHtmJ09wZW5TcGVjIHtudW1iZXI6MDJkfSDCtyB7c3RhZ2UudGl0bGUoKX0nOgogICAgICAgICAgICAgICAgKCdvcGVuc3BlYy1kYXNoYm9hcmQnLCAnZXhwbG9yZS5yZXF1ZXN0ZWQnKSBpZiBzdGFnZSA9PSAnZXhwbG9yZScgZWxzZSAoJ29wZW5zcGVjLW1hbnVhbCcsICdtYW51YWwtb25seScpCiAgICAgICAgICAgICAgICBmb3IgbnVtYmVyLCBzdGFnZSBpbiBlbnVtZXJhdGUoKCdleHBsb3JlJywgJ3Byb3Bvc2UnLCAndXBkYXRlJywgJ2FwcGx5JywgJ3ZlcmlmeScsICdzeW5jJywgJ2FyY2hpdmUnKSwgMSl9CiAgICBleHBlY3RlZC51cGRhdGUoe2YnT3BlblNwZWMgUm9sZSDCtyB7c3RhZ2UudGl0bGUoKX0nOiAoU09VUkNFLCBzdGFnZSArICcucmVxdWVzdGVkJykgZm9yIHN0YWdlIGluIFNUQUdFU30pCiAgICByZXN1bHQgPSBbXQogICAgZm9yIG5hbWUsIChzb3VyY2UsIGV2ZW50KSBpbiBleHBlY3RlZC5pdGVtcygpOgogICAgICAgIHJvd3MgPSBbcm93IGZvciByb3cgaW4gaW52ZW50b3J5IGlmIHJvdy5nZXQoJ25hbWUnKSA9PSBuYW1lXQogICAgICAgIHJlcXVpcmUobGVuKHJvd3MpIDw9IDEsICdEdXBsaWNhdGUgc3VwZXJzZWRlZCBhdXRvbWF0aW9uIG5hbWVzOyBpbnNwZWN0IG5hdGl2ZSBkZWZpbml0aW9ucycpCiAgICAgICAgaWYgcm93czoKICAgICAgICAgICAgcm93ID0gcm93c1swXQogICAgICAgICAgICByb3V0aW5nID0gcm93LmdldCgndHJpZ2dlcicpCiAgICAgICAgICAgIHJlcXVpcmUoaWRlbnRpZmllcihyb3cuZ2V0KCdpZCcpKSBhbmQgaXNpbnN0YW5jZShyb3V0aW5nLCBkaWN0KQogICAgICAgICAgICAgICAgICAgIGFuZCByb3V0aW5nLmdldCgnc291cmNlJykgPT0gc291cmNlIGFuZCByb3V0aW5nLmdldCgnb24nKSA9PSBldmVudCwKICAgICAgICAgICAgICAgICAgICAnQSBzdXBlcnNlZGVkIG5hbWUgaGFzIHVuZmFtaWxpYXIgcm91dGluZzsgaW5zcGVjdCBpdCBiZWZvcmUgcmVtb3ZhbCcpCiAgICAgICAgICAgIHJlc3VsdC5hcHBlbmQocm93KQogICAgcmV0dXJuIHJlc3VsdAoKCmNsYXNzIEJyaWRnZToKICAgIGRlZiBfX2luaXRfXyhzZWxmLCBzZXJ2aWNlLCBob21lLCAqLCBlbnY9Tm9uZSwgcmVxdWVzdGVyPXJlcXVlc3RfanNvbiwgcmVwb3NpdG9yeT1Ob25lKToKICAgICAgICBlbnYgPSBvcy5lbnZpcm9uIGlmIGVudiBpcyBOb25lIGVsc2UgZW52CiAgICAgICAgcmVxdWlyZShpc2luc3RhbmNlKHNlcnZpY2UsIGRpY3QpLCAnVGhpcyBiYWNrZW5kIGhhcyBubyBhZHZlcnRpc2VkIEF1dG9tYXRpb24gc2VydmljZScpCiAgICAgICAgb3JpZ2luID0gc2VydmljZS5nZXQoJ3VybF9mcm9tX2FnZW50JykKICAgICAgICB0cnk6CiAgICAgICAgICAgIHBhcnNlZCA9IHVybGxpYi5wYXJzZS51cmxzcGxpdChvcmlnaW4pCiAgICAgICAgICAgIHBhcnNlZC5wb3J0CiAgICAgICAgZXhjZXB0IChWYWx1ZUVycm9yLCBUeXBlRXJyb3IsIEF0dHJpYnV0ZUVycm9yKToKICAgICAgICAgICAgcmFpc2UgQnJpZGdlRXJyb3IoJ0ludmFsaWQgQXV0b21hdGlvbiBzZXJ2aWNlIGFkZHJlc3MnKSBmcm9tIE5vbmUKICAgICAgICByZXF1aXJlKHBhcnNlZC5zY2hlbWUgaW4gKCdodHRwJywgJ2h0dHBzJykgYW5kIHBhcnNlZC5ob3N0bmFtZSBpbiAoJ2xvY2FsaG9zdCcsICcxMjcuMC4wLjEnLCAnOjoxJykKICAgICAgICAgICAgICAgIGFuZCBub3QgcGFyc2VkLnVzZXJuYW1lIGFuZCBub3QgcGFyc2VkLnBhc3N3b3JkIGFuZCBwYXJzZWQucGF0aCBpbiAoJycsICcvJykKICAgICAgICAgICAgICAgIGFuZCBub3QgcGFyc2VkLnF1ZXJ5IGFuZCBub3QgcGFyc2VkLmZyYWdtZW50LCAnT25seSB0aGUgYWR2ZXJ0aXNlZCBsb2NhbCBBdXRvbWF0aW9uIHNlcnZpY2UgaXMgc3VwcG9ydGVkJykKICAgICAgICByZXF1aXJlKHNlcnZpY2UuZ2V0KCdhcGlfcHJlZml4JykgPT0gJy9hcGkvYXV0b21hdGlvbicgYW5kIHNlcnZpY2UuZ2V0KCdhdXRoX2Vudl92YXInKSA9PSAnT1BFTkhBTkRTX0FVVE9NQVRJT05fQVBJX0tFWScsCiAgICAgICAgICAgICAgICAnVW5zdXBwb3J0ZWQgQXV0b21hdGlvbiBBUEkgcHJlZml4IG9yIGF1dGhlbnRpY2F0aW9uJykKICAgICAgICBzZWxmLmtleSA9IGVudi5nZXQoJ09QRU5IQU5EU19BVVRPTUFUSU9OX0FQSV9LRVknKQogICAgICAgIHJlcXVpcmUoaXNpbnN0YW5jZShzZWxmLmtleSwgc3RyKSBhbmQgc2VsZi5rZXksICdBZ2VudCBTZXJ2ZXIgaGFzIG5vIGluamVjdGVkIEF1dG9tYXRpb24ga2V5OyB1c2UgdGhlIG5hdGl2ZSBsb2NhbCBsYXVuY2hlcicpCiAgICAgICAgc2VsZi5ob21lID0gbG9jYWxfcGF0aChob21lKQogICAgICAgIHJlcXVpcmUoc2VsZi5ob21lID09IFBhdGguaG9tZSgpLnJlc29sdmUoKSwgJ0FnZW50IFNlcnZlciBob21lIGRvZXMgbm90IG1hdGNoIHRoZSBoZWxwZXIgaG9tZScpCiAgICAgICAgc2VsZi5iYXNlID0gb3JpZ2luLnJzdHJpcCgnLycpICsgJy9hcGkvYXV0b21hdGlvbi92MScKICAgICAgICBzZWxmLnJvb3QgPSBzZWxmLmhvbWUgLyAnLm9wZW5oYW5kcy9hcHBzL29wZW5zcGVjLXByb2dyZXNzL3JvbGUtYXV0b21hdGlvbicgLyBoYXNobGliLnNoYTI1NihzZWxmLmJhc2UuZW5jb2RlKCkpLmhleGRpZ2VzdCgpWzoxNl0KICAgICAgICByZXF1aXJlKHNlbGYucm9vdC5yZXNvbHZlKCkgPT0gc2VsZi5yb290LCAnU3ltbGlua2VkIGJyaWRnZSBzdGF0ZSBkaXJlY3RvcmllcyBhcmUgbm90IHN1cHBvcnRlZCcpCiAgICAgICAgc2VsZi5yZXBvc2l0b3J5ID0gbG9jYWxfcGF0aChzdHIoUkVQT1NJVE9SWSBpZiByZXBvc2l0b3J5IGlzIE5vbmUgZWxzZSByZXBvc2l0b3J5KSkKICAgICAgICBzZWxmLnJlcXVlc3RlciA9IHJlcXVlc3RlcgogICAgICAgIHNlbGYuY29uZmlnID0gc2VsZi5sb2FkX2NvbmZpZygpCgogICAgZGVmIGFwaShzZWxmLCBwYXRoPScnLCAqLCBtZXRob2Q9J0dFVCcsIGJvZHk9Tm9uZSwgaGVhZGVycz1Ob25lKToKICAgICAgICByZXR1cm4gc2VsZi5yZXF1ZXN0ZXIoc2VsZi5iYXNlICsgcGF0aCwgbWV0aG9kPW1ldGhvZCwgYm9keT1ib2R5LAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzPXsnWC1TZXNzaW9uLUFQSS1LZXknOiBzZWxmLmtleSwgKiooaGVhZGVycyBvciB7fSl9KQoKICAgIGRlZiBsb2FkX2NvbmZpZyhzZWxmKToKICAgICAgICBjb25maWcgPSByZWFkX2pzb24oc2VsZi5yZXBvc2l0b3J5IC8gJ3JvbGUtd29ya2Zsb3cuanNvbicpCiAgICAgICAgZmllbGRzID0geyd3b3Jrc3BhY2UnLCAnc3BlY19zdG9yZScsICdzdG9yZV9pZCcsICdza2lsbF9yb290JywgJ3Byb2ZpbGUnLCAndGltZW91dF9zZWNvbmRzJywgJ2NhbnZhc191cmwnfQogICAgICAgIHJlcXVpcmUoaXNpbnN0YW5jZShjb25maWcsIGRpY3QpIGFuZCBmaWVsZHMgPD0gc2V0KGNvbmZpZykgYW5kIHNldChjb25maWcpIDw9IGZpZWxkcyB8IHsndmVyc2lvbid9CiAgICAgICAgICAgICAgICBhbmQgdHlwZShjb25maWcuZ2V0KCd2ZXJzaW9uJywgMSkpIGlzIGludCBhbmQgY29uZmlnLmdldCgndmVyc2lvbicsIDEpID09IDEsICdJbnZhbGlkIHJvbGUtd29ya2Zsb3cuanNvbiBjb25maWd1cmF0aW9uJykKICAgICAgICBmb3IgZmllbGQgaW4gKCd3b3Jrc3BhY2UnLCAnc3BlY19zdG9yZScsICdza2lsbF9yb290Jyk6CiAgICAgICAgICAgIGRpcmVjdG9yeSA9IGxvY2FsX3BhdGgoY29uZmlnW2ZpZWxkXSkKICAgICAgICAgICAgcmVxdWlyZShkaXJlY3RvcnkuaXNfZGlyKCksICdBIGNvbmZpZ3VyZWQgcm9sZSB3b3JrZmxvdyBkaXJlY3RvcnkgaXMgbWlzc2luZycpCiAgICAgICAgcmVxdWlyZShzbHVnKGNvbmZpZ1snc3RvcmVfaWQnXSkgYW5kIGlzaW5zdGFuY2UoY29uZmlnWydwcm9maWxlJ10sIHN0cikgYW5kIDAgPCBsZW4oY29uZmlnWydwcm9maWxlJ10pIDw9IDIwMAogICAgICAgICAgICAgICAgYW5kICdceDAwJyBub3QgaW4gY29uZmlnWydwcm9maWxlJ10gYW5kIHR5cGUoY29uZmlnWyd0aW1lb3V0X3NlY29uZHMnXSkgaXMgaW50CiAgICAgICAgICAgICAgICBhbmQgNjAgPD0gY29uZmlnWyd0aW1lb3V0X3NlY29uZHMnXSA8PSA3MjAwLCAnSW52YWxpZCByb2xlIHdvcmtmbG93IHN0b3JlLCBwcm9maWxlLCBvciB0aW1lb3V0JykKICAgICAgICB0cnk6CiAgICAgICAgICAgIGNhbnZhcyA9IHVybGxpYi5wYXJzZS51cmxzcGxpdChjb25maWdbJ2NhbnZhc191cmwnXSkKICAgICAgICAgICAgY2FudmFzLnBvcnQKICAgICAgICBleGNlcHQgKFZhbHVlRXJyb3IsIFR5cGVFcnJvciwgQXR0cmlidXRlRXJyb3IpOgogICAgICAgICAgICByYWlzZSBCcmlkZ2VFcnJvcignSW52YWxpZCByb2xlIHdvcmtmbG93IENhbnZhcyBhZGRyZXNzJykgZnJvbSBOb25lCiAgICAgICAgcmVxdWlyZShjYW52YXMuc2NoZW1lIGluICgnaHR0cCcsICdodHRwcycpIGFuZCBjYW52YXMuaG9zdG5hbWUgaW4gKCdsb2NhbGhvc3QnLCAnMTI3LjAuMC4xJywgJzo6MScpCiAgICAgICAgICAgICAgICBhbmQgbm90IGNhbnZhcy51c2VybmFtZSBhbmQgbm90IGNhbnZhcy5wYXNzd29yZCBhbmQgY2FudmFzLnBhdGggaW4gKCcnLCAnLycpCiAgICAgICAgICAgICAgICBhbmQgbm90IGNhbnZhcy5xdWVyeSBhbmQgbm90IGNhbnZhcy5mcmFnbWVudCwgJ1JvbGUgd29ya2Zsb3cgQ2FudmFzIG11c3QgYmUgYSBsb2NhbCBvcmlnaW4nKQogICAgICAgIHJldHVybiBjb25maWcKCiAgICBkZWYgc2FmZV9jb25maWcoc2VsZik6CiAgICAgICAgcmV0dXJuIHtrZXk6IHNlbGYuY29uZmlnW2tleV0gZm9yIGtleSBpbiAoJ3dvcmtzcGFjZScsICdzcGVjX3N0b3JlJywgJ3N0b3JlX2lkJyl9IHwgeydyZXBvc2l0b3J5Jzogc3RyKHNlbGYucmVwb3NpdG9yeSl9CgogICAgZGVmIGludmVudG9yeShzZWxmLCBlbmRwb2ludD0nJywga2V5PSdhdXRvbWF0aW9ucycpOgogICAgICAgIHZhbHVlID0gc2VsZi5hcGkoZW5kcG9pbnQgKyAnP2xpbWl0PTEwMCcpCiAgICAgICAgcmVxdWlyZShpc2luc3RhbmNlKHZhbHVlLCBkaWN0KSBhbmQgaXNpbnN0YW5jZSh2YWx1ZS5nZXQoa2V5KSwgbGlzdCkgYW5kIHR5cGUodmFsdWUuZ2V0KCd0b3RhbCcpKSBpcyBpbnQKICAgICAgICAgICAgICAgIGFuZCBsZW4odmFsdWVba2V5XSkgPT0gdmFsdWVbJ3RvdGFsJ10gPD0gMTAwIGFuZCBhbGwoaXNpbnN0YW5jZShyb3csIGRpY3QpIGZvciByb3cgaW4gdmFsdWVba2V5XSksCiAgICAgICAgICAgICAgICAnQ2Fubm90IGluc3BlY3QgdGhlIGNvbXBsZXRlIGxvY2FsIEF1dG9tYXRpb24gaW52ZW50b3J5IChtYXhpbXVtIDEwMCknKQogICAgICAgIHJldHVybiB2YWx1ZVtrZXldCgogICAgZGVmIHNlbGVjdGVkKHNlbGYsIGludmVudG9yeSwgKiwgYWxsb3dfcmV0aXJlZD1GYWxzZSk6CiAgICAgICAgcmVzdWx0ID0ge30KICAgICAgICBmb3Igcm9sZSwgc3RhZ2UgaW4gUEFJUlM6CiAgICAgICAgICAgIHJvd3MgPSBbcm93IGZvciByb3cgaW4gaW52ZW50b3J5IGlmIHJvdy5nZXQoJ25hbWUnKSA9PSBhdXRvbWF0aW9uX25hbWUocm9sZSwgc3RhZ2UpXQogICAgICAgICAgICByZXF1aXJlKGxlbihyb3dzKSA8PSAxLCAnRHVwbGljYXRlIHJvbGUgYXV0b21hdGlvbiBuYW1lczsgaW5zcGVjdCBuYXRpdmUgQXV0b21hdGlvbiBkZWZpbml0aW9ucycpCiAgICAgICAgICAgIGlmIHJvd3M6CiAgICAgICAgICAgICAgICByZXF1aXJlKGlkZW50aWZpZXIocm93c1swXS5nZXQoJ2lkJykpLCAnSW52YWxpZCByb2xlIGF1dG9tYXRpb24gaWRlbnRpdHknKQogICAgICAgICAgICAgICAgcmVzdWx0W3BhaXJfa2V5KHJvbGUsIHN0YWdlKV0gPSByb3dzWzBdCiAgICAgICAgaWRzID0ge3Jvd1snaWQnXSBmb3Igcm93IGluIHJlc3VsdC52YWx1ZXMoKX0KICAgICAgICByZXF1aXJlKGxlbihpZHMpID09IGxlbihyZXN1bHQpLCAnRHVwbGljYXRlIHJvbGUgYXV0b21hdGlvbiBpZGVudGl0aWVzJykKICAgICAgICBpZiBhbGxvd19yZXRpcmVkOgogICAgICAgICAgICBpZHMudXBkYXRlKHJvd1snaWQnXSBmb3Igcm93IGluIHJldGlyZWRfZGVmaW5pdGlvbnMoaW52ZW50b3J5KSkKICAgICAgICByZXF1aXJlKG5vdCBhbnkocm93LmdldCgnZW5hYmxlZCcpIGFuZCBpc2luc3RhbmNlKHJvdy5nZXQoJ3RyaWdnZXInKSwgZGljdCkKICAgICAgICAgICAgICAgICAgICAgICAgYW5kIHJvd1sndHJpZ2dlciddLmdldCgnc291cmNlJykgPT0gU09VUkNFIGFuZCByb3cuZ2V0KCdpZCcpIG5vdCBpbiBpZHMgZm9yIHJvdyBpbiBpbnZlbnRvcnkpLAogICAgICAgICAgICAgICAgJ0Fub3RoZXIgZW5hYmxlZCBhdXRvbWF0aW9uIHVzZXMgdGhlIHJvbGUgZGFzaGJvYXJkIHNvdXJjZTsgcmVzb2x2ZSByb3V0aW5nIGZpcnN0JykKICAgICAgICByZXR1cm4gcmVzdWx0CgogICAgZGVmIGJ1bmRsZXMoc2VsZik6CiAgICAgICAgYnVuZGxlcyA9IHt9CiAgICAgICAgZm9yIHJvbGUsIHN0YWdlIGluIFBBSVJTOgogICAgICAgICAgICByb290ID0gc2VsZi5yZXBvc2l0b3J5IC8gJ2F1dG9tYXRpb25zJyAvIGYnb3BlbnNwZWMte3JvbGUubG93ZXIoKX0te3N0YWdlfScKICAgICAgICAgICAgZGVmaW5pdGlvbiA9IHJlYWRfanNvbihyb290IC8gJ2F1dG9tYXRpb24ueWFtbCcpCiAgICAgICAgICAgIGV4cGVjdGVkID0geyduYW1lJzogYXV0b21hdGlvbl9uYW1lKHJvbGUsIHN0YWdlKSwgJ3N0YXRlJzogJ0FDVElWRScsICdlbmFibGVkJzogVHJ1ZSwKICAgICAgICAgICAgICAgICAgICAgICAgJ3RyaWdnZXInOiB0cmlnZ2VyKHJvbGUsIHN0YWdlKSwgJ2VudHJ5cG9pbnQnOiAncHl0aG9uMyBydW4ucHknLAogICAgICAgICAgICAgICAgICAgICAgICAndGltZW91dCc6IHNlbGYuY29uZmlnWyd0aW1lb3V0X3NlY29uZHMnXSwgJ2tlZXBfYWxpdmUnOiBGYWxzZX0KICAgICAgICAgICAgcmVxdWlyZShpc2luc3RhbmNlKGRlZmluaXRpb24sIGRpY3QpIGFuZCBhbGwoZGVmaW5pdGlvbi5nZXQoa2V5KSA9PSB2YWx1ZSBmb3Iga2V5LCB2YWx1ZSBpbiBleHBlY3RlZC5pdGVtcygpKQogICAgICAgICAgICAgICAgICAgIGFuZCBzZXQoZGVmaW5pdGlvbikgPD0gc2V0KGV4cGVjdGVkKSB8IHsndGFyYmFsbF9zb3VyY2UnfQogICAgICAgICAgICAgICAgICAgIGFuZCBkZWZpbml0aW9uLmdldCgndGFyYmFsbF9zb3VyY2UnKSA9PSB7J3R5cGUnOiAnaW50ZXJuYWwnfSwgJ1JvbGUgYnVuZGxlcyBhcmUgc3RhbGUgb3IgaW52YWxpZDsgcnVuIG5wbSBydW4gYnVpbGQgaW4gdGhlIGF1dG9tYXRpb24gcmVwb3NpdG9yeScpCiAgICAgICAgICAgIGRpcmVjdG9yeSA9IHJvb3QgLyAndGFyYmFsbCcKICAgICAgICAgICAgcmVxdWlyZShkaXJlY3RvcnkucmVzb2x2ZSgpID09IGRpcmVjdG9yeSBhbmQgZGlyZWN0b3J5LmlzX2RpcigpCiAgICAgICAgICAgICAgICAgICAgYW5kIHtmaWxlLm5hbWUgZm9yIGZpbGUgaW4gZGlyZWN0b3J5Lml0ZXJkaXIoKX0gPT0gc2V0KEJVTkRMRV9GSUxFUyksICdVbmV4cGVjdGVkIHJvbGUgYnVuZGxlIGZpbGVzJykKICAgICAgICAgICAgZmlsZXMgPSB7bmFtZTogcmVhZF9ieXRlcyhkaXJlY3RvcnkgLyBuYW1lLCA1MTIgKiAxMDI0KSBmb3IgbmFtZSBpbiBCVU5ETEVfRklMRVN9CiAgICAgICAgICAgIHRyeToKICAgICAgICAgICAgICAgIGdlbmVyYXRlZCA9IGpzb24ubG9hZHMoZmlsZXNbJ2NvbmZpZy5qc29uJ10pCiAgICAgICAgICAgIGV4Y2VwdCAoVmFsdWVFcnJvciwgVW5pY29kZUVycm9yKToKICAgICAgICAgICAgICAgIHJhaXNlIEJyaWRnZUVycm9yKCdJbnZhbGlkIGdlbmVyYXRlZCByb2xlIGNvbmZpZ3VyYXRpb24nKSBmcm9tIE5vbmUKICAgICAgICAgICAgcmVxdWlyZShpc2luc3RhbmNlKGdlbmVyYXRlZCwgZGljdCkgYW5kIGdlbmVyYXRlZC5nZXQoJ21vZGUnKSA9PSAncm9sZScgYW5kIGdlbmVyYXRlZC5nZXQoJ3N0YWdlJykgPT0gc3RhZ2UKICAgICAgICAgICAgICAgICAgICBhbmQgZ2VuZXJhdGVkLmdldCgncm9sZScpID09IHJvbGUKICAgICAgICAgICAgICAgICAgICBhbmQgYWxsKGdlbmVyYXRlZC5nZXQoa2V5KSA9PSB2YWx1ZSBmb3Iga2V5LCB2YWx1ZSBpbiBzZWxmLmNvbmZpZy5pdGVtcygpKSwKICAgICAgICAgICAgICAgICAgICAnR2VuZXJhdGVkIHJvbGUgY29uZmlndXJhdGlvbiBpcyBzdGFsZTsgcmVidWlsZCB0aGUgYXV0b21hdGlvbiByZXBvc2l0b3J5JykKICAgICAgICAgICAgZGlnZXN0ID0gaGFzaGxpYi5zaGEyNTYoZW5jb2RlKGV4cGVjdGVkKSkKICAgICAgICAgICAgYnVmZmVyID0gaW8uQnl0ZXNJTygpCiAgICAgICAgICAgIHdpdGggdGFyZmlsZS5vcGVuKGZpbGVvYmo9YnVmZmVyLCBtb2RlPSd3Omd6JykgYXMgYXJjaGl2ZToKICAgICAgICAgICAgICAgIGZvciBuYW1lLCBjb250ZW50IGluIGZpbGVzLml0ZW1zKCk6CiAgICAgICAgICAgICAgICAgICAgZGlnZXN0LnVwZGF0ZShuYW1lLmVuY29kZSgpICsgYidcMCcgKyBjb250ZW50KQogICAgICAgICAgICAgICAgICAgIGl0ZW0gPSB0YXJmaWxlLlRhckluZm8obmFtZSkKICAgICAgICAgICAgICAgICAgICBpdGVtLnNpemUsIGl0ZW0ubW9kZSwgaXRlbS5tdGltZSA9IGxlbihjb250ZW50KSwgMG82MDAsIDAKICAgICAgICAgICAgICAgICAgICBhcmNoaXZlLmFkZGZpbGUoaXRlbSwgaW8uQnl0ZXNJTyhjb250ZW50KSkKICAgICAgICAgICAgcmVxdWlyZShidWZmZXIudGVsbCgpIDw9IDEwMjQgKiAxMDI0LCAnUm9sZSBidW5kbGUgZXhjZWVkcyB0aGUgbmF0aXZlIDEgTWlCIHVwbG9hZCBsaW1pdCcpCiAgICAgICAgICAgIGJ1bmRsZXNbcGFpcl9rZXkocm9sZSwgc3RhZ2UpXSA9IHsnZGVmaW5pdGlvbic6IGV4cGVjdGVkLCAnaGFzaCc6IGRpZ2VzdC5oZXhkaWdlc3QoKSwgJ3RhcmJhbGwnOiBidWZmZXIuZ2V0dmFsdWUoKX0KICAgICAgICByZXR1cm4gYnVuZGxlcwoKICAgIGRlZiBzdGF0ZShzZWxmKToKICAgICAgICBwYXRoID0gc2VsZi5yb290IC8gJ2Nvbm5lY3Rpb24uanNvbicKICAgICAgICBpZiBub3QgcGF0aC5leGlzdHMoKToKICAgICAgICAgICAgcmV0dXJuIHsndmVyc2lvbic6IDIsICdiaW5kaW5ncyc6IHt9LCAnc291cmNlJzogTm9uZX0KICAgICAgICBzdGF0ZSA9IHJlYWRfanNvbihwYXRoKQogICAgICAgIGlmIGlzaW5zdGFuY2Uoc3RhdGUsIGRpY3QpIGFuZCBzdGF0ZS5nZXQoJ3ZlcnNpb24nKSA9PSAxOgogICAgICAgICAgICByZXF1aXJlKGlzaW5zdGFuY2Uoc3RhdGUuZ2V0KCdzdGFnZXMnKSwgZGljdCkgYW5kIHNldChzdGF0ZVsnc3RhZ2VzJ10pIDw9IHNldChTVEFHRVMpCiAgICAgICAgICAgICAgICAgICAgYW5kIGFsbChpc2luc3RhbmNlKGl0ZW0sIGRpY3QpIGFuZCBpdGVtLmdldCgnc3RhdGUnKSA9PSAncmVhZHknIGZvciBpdGVtIGluIHN0YXRlWydzdGFnZXMnXS52YWx1ZXMoKSksCiAgICAgICAgICAgICAgICAgICAgJ1Jlc29sdmUgdGhlIGluY29tcGxldGUgcHJldmlvdXMgY29ubmVjdGlvbiBiZWZvcmUgbWlncmF0aW9uJykKICAgICAgICAgICAgcmV0dXJuIHsndmVyc2lvbic6IDIsICdiaW5kaW5ncyc6IHt9LCAnc291cmNlJzogc3RhdGUuZ2V0KCdzb3VyY2UnKX0KICAgICAgICByZXF1aXJlKGlzaW5zdGFuY2Uoc3RhdGUsIGRpY3QpIGFuZCBzdGF0ZS5nZXQoJ3ZlcnNpb24nKSA9PSAyIGFuZCBpc2luc3RhbmNlKHN0YXRlLmdldCgnYmluZGluZ3MnKSwgZGljdCkKICAgICAgICAgICAgICAgIGFuZCBzZXQoc3RhdGVbJ2JpbmRpbmdzJ10pIDw9IHtwYWlyX2tleSgqcGFpcikgZm9yIHBhaXIgaW4gUEFJUlN9LCAnSW52YWxpZCBwcml2YXRlIGNvbm5lY3Rpb24gc3RhdGU7IGluc3BlY3QgdGhlIGxvY2FsIHNldHVwJykKICAgICAgICByZXR1cm4gc3RhdGUKCiAgICBkZWYgc2F2ZShzZWxmLCBzdGF0ZSk6CiAgICAgICAgYXRvbWljX2pzb24oc2VsZi5yb290IC8gJ2Nvbm5lY3Rpb24uanNvbicsIHN0YXRlKQoKICAgIEBjb250ZXh0bGliLmNvbnRleHRtYW5hZ2VyCiAgICBkZWYgbG9jayhzZWxmKToKICAgICAgICBzZWxmLnJvb3QubWtkaXIocGFyZW50cz1UcnVlLCBleGlzdF9vaz1UcnVlLCBtb2RlPTBvNzAwKQogICAgICAgIHJlcXVpcmUoc2VsZi5yb290LnJlc29sdmUoKSA9PSBzZWxmLnJvb3QsICdTeW1saW5rZWQgYnJpZGdlIHN0YXRlIGlzIG5vdCBzdXBwb3J0ZWQnKQogICAgICAgIG9zLmNobW9kKHNlbGYucm9vdCwgMG83MDApCiAgICAgICAgZGVzY3JpcHRvciA9IG9zLm9wZW4oc2VsZi5yb290IC8gJy5sb2NrJywgb3MuT19DUkVBVCB8IG9zLk9fUkRXUiB8IG9zLk9fTk9GT0xMT1csIDBvNjAwKQogICAgICAgIHdpdGggb3MuZmRvcGVuKGRlc2NyaXB0b3IsICdhJykgYXMgc3RyZWFtOgogICAgICAgICAgICB0cnk6CiAgICAgICAgICAgICAgICBmY250bC5mbG9jayhzdHJlYW0sIGZjbnRsLkxPQ0tfRVggfCBmY250bC5MT0NLX05CKQogICAgICAgICAgICBleGNlcHQgQmxvY2tpbmdJT0Vycm9yOgogICAgICAgICAgICAgICAgcmFpc2UgQnJpZGdlRXJyb3IoJ0Fub3RoZXIgcm9sZSBBdXRvbWF0aW9uIG9wZXJhdGlvbiBpcyBydW5uaW5nOyBjaGVjayBpdHMgcmVzdWx0IGZpcnN0JykgZnJvbSBOb25lCiAgICAgICAgICAgIHlpZWxkCgogICAgQHN0YXRpY21ldGhvZAogICAgZGVmIGRlZmluaXRpb25fbWF0Y2hlcyhyb3csIGRlc2lyZWQpOgogICAgICAgIHJldHVybiBhbGwoKGlzaW5zdGFuY2Uocm93LmdldCgndHJpZ2dlcicpLCBkaWN0KSBhbmQgYWxsKHJvd1sndHJpZ2dlciddLmdldChrKSA9PSB2IGZvciBrLCB2IGluIHZhbHVlLml0ZW1zKCkpCiAgICAgICAgICAgICAgICAgICAgYW5kIHJvd1sndHJpZ2dlciddLmdldCgnZGVzdGluYXRpb24nLCAnZGlzcGF0Y2hfcnVuJykgPT0gJ2Rpc3BhdGNoX3J1bicKICAgICAgICAgICAgICAgICAgICBhbmQgcm93Wyd0cmlnZ2VyJ10uZ2V0KCdzdWJqZWN0X2tleV9leHByJykgaXMgTm9uZSBhbmQgcm93Wyd0cmlnZ2VyJ10uZ2V0KCd0dXJuX3RleHRfZXhwcicpIGlzIE5vbmUKICAgICAgICAgICAgICAgICAgICBhbmQgcm93Wyd0cmlnZ2VyJ10uZ2V0KCd3YWtlX2FnZW50JywgVHJ1ZSkgaXMgVHJ1ZQogICAgICAgICAgICAgICAgICAgIGFuZCBzZXQocm93Wyd0cmlnZ2VyJ10pIDw9IHNldCh2YWx1ZSkgfCB7J2Rlc3RpbmF0aW9uJywgJ3N1YmplY3Rfa2V5X2V4cHInLCAndHVybl90ZXh0X2V4cHInLCAnd2FrZV9hZ2VudCd9KSBpZiBrZXkgPT0gJ3RyaWdnZXInCiAgICAgICAgICAgICAgICAgICBlbHNlIHJvdy5nZXQoa2V5KSA9PSB2YWx1ZSBmb3Iga2V5LCB2YWx1ZSBpbiBkZXNpcmVkLml0ZW1zKCkpCgogICAgZGVmIHNvdXJjZV9yZWFkeShzZWxmLCBzb3VyY2UsIHdlYmhvb2tzKToKICAgICAgICByb3dzID0gW3JvdyBmb3Igcm93IGluIHdlYmhvb2tzIGlmIHJvdy5nZXQoJ3NvdXJjZScpID09IFNPVVJDRV0KICAgICAgICByZXF1aXJlKGxlbihyb3dzKSA8PSAxLCAnRHVwbGljYXRlIHJvbGUgZGFzaGJvYXJkIHNvdXJjZXM7IGluc3BlY3QgbmF0aXZlIEF1dG9tYXRpb24gc291cmNlcycpCiAgICAgICAgaWYgbm90IGlzaW5zdGFuY2Uoc291cmNlLCBkaWN0KSBvciBzb3VyY2UuZ2V0KCdzdGF0ZScpICE9ICdyZWFkeScgb3Igbm90IHJvd3Mgb3Igbm90IGlzaW5zdGFuY2Uoc291cmNlLmdldCgnc2VjcmV0JyksIHN0cikgb3Igbm90IDggPD0gbGVuKHNvdXJjZVsnc2VjcmV0J10pIDw9IDI1NToKICAgICAgICAgICAgcmV0dXJuIEZhbHNlCiAgICAgICAgcm93ID0gcm93c1swXQogICAgICAgIHJldHVybiAocm93LmdldCgnaWQnKSA9PSBzb3VyY2UuZ2V0KCdpZCcpIGFuZCByb3cuZ2V0KCdvcmdfaWQnKSA9PSBzb3VyY2UuZ2V0KCdvcmdfaWQnKQogICAgICAgICAgICAgICAgYW5kIHJvdy5nZXQoJ2VuYWJsZWQnKSBpcyBUcnVlIGFuZCByb3cuZ2V0KCdldmVudF9rZXlfZXhwcicpID09ICd0eXBlJwogICAgICAgICAgICAgICAgYW5kIHJvdy5nZXQoJ3NpZ25hdHVyZV9oZWFkZXInKSA9PSAnWC1TaWduYXR1cmUtMjU2JyBhbmQgcm93LmdldCgnc2lnbmF0dXJlX3NjaGVtZScpID09ICdobWFjX3NoYTI1Nl9oZXgnKQoKICAgIGRlZiByZWFkaW5lc3Moc2VsZiwgc2VsZWN0ZWQsIGJ1bmRsZXMsIHN0YXRlLCB3ZWJob29rcyk6CiAgICAgICAgaWYgbGVuKHNlbGVjdGVkKSAhPSBsZW4oUEFJUlMpIG9yIG5vdCBzZWxmLnNvdXJjZV9yZWFkeShzdGF0ZS5nZXQoJ3NvdXJjZScpLCB3ZWJob29rcyk6CiAgICAgICAgICAgIHJldHVybiBGYWxzZQogICAgICAgIGZvciBzdGFnZSwgYnVuZGxlIGluIGJ1bmRsZXMuaXRlbXMoKToKICAgICAgICAgICAgc2F2ZWQgPSBzdGF0ZVsnYmluZGluZ3MnXS5nZXQoc3RhZ2UsIHt9KQogICAgICAgICAgICBkZXNpcmVkID0gYnVuZGxlWydkZWZpbml0aW9uJ10gfCB7J3RhcmJhbGxfcGF0aCc6IHNhdmVkLmdldCgndGFyYmFsbF9wYXRoJyl9CiAgICAgICAgICAgIGlmIHNhdmVkLmdldCgnc3RhdGUnKSAhPSAncmVhZHknIG9yIHNhdmVkLmdldCgnaGFzaCcpICE9IGJ1bmRsZVsnaGFzaCddIG9yIHNhdmVkLmdldCgnaWQnKSAhPSBzZWxlY3RlZFtzdGFnZV1bJ2lkJ10gb3Igbm90IHNlbGYuZGVmaW5pdGlvbl9tYXRjaGVzKHNlbGVjdGVkW3N0YWdlXSwgZGVzaXJlZCk6CiAgICAgICAgICAgICAgICByZXR1cm4gRmFsc2UKICAgICAgICByZXR1cm4gVHJ1ZQoKICAgIGRlZiByZXN1bHQoc2VsZiwga2luZCwgcmVhZHksIHNlbGVjdGVkKToKICAgICAgICByZXR1cm4geydraW5kJzoga2luZCwgJ3JlYWR5JzogcmVhZHksICdhdXRvbWF0aW9ucyc6IFsKICAgICAgICAgICAgICAgIHsnaWQnOiBzZWxlY3RlZFtwYWlyX2tleShyb2xlLCBzdGFnZSldWydpZCddLCAnbmFtZSc6IGF1dG9tYXRpb25fbmFtZShyb2xlLCBzdGFnZSksICdzdGFnZSc6IHN0YWdlLCAncm9sZSc6IHJvbGV9CiAgICAgICAgICAgICAgICBmb3Igcm9sZSwgc3RhZ2UgaW4gUEFJUlMgaWYgcGFpcl9rZXkocm9sZSwgc3RhZ2UpIGluIHNlbGVjdGVkXSwgJ2NvbmZpZ3VyYXRpb24nOiBzZWxmLnNhZmVfY29uZmlnKCksCiAgICAgICAgICAgICAgICAnbWVzc2FnZSc6ICdDb25uZWN0ZWQgdG8gYWxsIHR3ZWx2ZSByb2xlIGFuZCBza2lsbCBhdXRvbWF0aW9ucy4nIGlmIHJlYWR5IGVsc2UKICAgICAgICAgICAgICAgICdDb25uZWN0IGF1dG9tYXRpb25zIHRvIGluc3RhbGwgZGVkaWNhdGVkIHJvbGUgc2tpbGxzIGFuZCByZW1vdmUgc3VwZXJzZWRlZCBPcGVuU3BlYyBkZWZpbml0aW9ucy4nfQoKICAgIGRlZiBwcm9iZShzZWxmKToKICAgICAgICBpbnZlbnRvcnkgPSBzZWxmLmludmVudG9yeSgpCiAgICAgICAgc2VsZWN0ZWQgPSBzZWxmLnNlbGVjdGVkKGludmVudG9yeSwgYWxsb3dfcmV0aXJlZD1UcnVlKQogICAgICAgIHJlYWR5ID0gc2VsZi5yZWFkaW5lc3Moc2VsZWN0ZWQsIHNlbGYuYnVuZGxlcygpLCBzZWxmLnN0YXRlKCksIHNlbGYuaW52ZW50b3J5KCcvd2ViaG9va3MnLCAnd2ViaG9va3MnKSkgYW5kIG5vdCByZXRpcmVkX2RlZmluaXRpb25zKGludmVudG9yeSkKICAgICAgICByZXR1cm4gc2VsZi5yZXN1bHQoJ3Byb2JlJywgcmVhZHksIHNlbGVjdGVkKQoKICAgIGRlZiBzZXR1cChzZWxmKToKICAgICAgICBidW5kbGVzID0gc2VsZi5idW5kbGVzKCkKICAgICAgICB3aXRoIHNlbGYubG9jaygpOgogICAgICAgICAgICBzdGF0ZSA9IHNlbGYuc3RhdGUoKQogICAgICAgICAgICBpbnZlbnRvcnkgPSBzZWxmLmludmVudG9yeSgpCiAgICAgICAgICAgIHNlbGVjdGVkID0gc2VsZi5zZWxlY3RlZChpbnZlbnRvcnksIGFsbG93X3JldGlyZWQ9VHJ1ZSkKICAgICAgICAgICAgcmV0aXJlZCA9IHJldGlyZWRfZGVmaW5pdGlvbnMoaW52ZW50b3J5KQogICAgICAgICAgICB3ZWJob29rcyA9IHNlbGYuaW52ZW50b3J5KCcvd2ViaG9va3MnLCAnd2ViaG9va3MnKQogICAgICAgICAgICBzb3VyY2UgPSBzdGF0ZS5nZXQoJ3NvdXJjZScpCiAgICAgICAgICAgIGV4aXN0aW5nX3NvdXJjZXMgPSBbcm93IGZvciByb3cgaW4gd2ViaG9va3MgaWYgcm93LmdldCgnc291cmNlJykgPT0gU09VUkNFXQogICAgICAgICAgICByZXF1aXJlKG5vdCBleGlzdGluZ19zb3VyY2VzIG9yIHNlbGYuc291cmNlX3JlYWR5KHNvdXJjZSwgd2ViaG9va3MpLAogICAgICAgICAgICAgICAgICAgICdUaGUgcm9sZSBzb3VyY2UgZXhpc3RzIHdpdGhvdXQgYSB2ZXJpZmllZCBzYXZlZCBjb25uZWN0aW9uOyBkbyBub3Qgb3ZlcndyaXRlIGl0cyBzZWNyZXQnKQogICAgICAgICAgICByZXF1aXJlKG5vdCBzb3VyY2Ugb3Igc291cmNlLmdldCgnc3RhdGUnKSA9PSAncmVhZHknLAogICAgICAgICAgICAgICAgICAgICdTb3VyY2UgcmVnaXN0cmF0aW9uIG91dGNvbWUgaXMgdW5rbm93bjsgaW5zcGVjdCB0aGUgbG9jYWwgY29ubmVjdGlvbiBiZWZvcmUgcmV0cnlpbmcnKQogICAgICAgICAgICAjIFZhbGlkYXRlIGV2ZXJ5IGNhbmRpZGF0ZSBiZWZvcmUgYW55IHJldGlyZW1lbnQsIHVwbG9hZCBvciBpbnN0YWxsYXRpb24uCiAgICAgICAgICAgIGZvciByb3cgaW4gcmV0aXJlZDoKICAgICAgICAgICAgICAgIGhpc3RvcnkgPSBzZWxmLmFwaSgnLycgKyByb3dbJ2lkJ10gKyAnL3J1bnM/bGltaXQ9MTAwJm9mZnNldD0wJykKICAgICAgICAgICAgICAgIGNvdW50cyA9IGhpc3RvcnkuZ2V0KCdzdGF0dXNfY291bnRzJykgaWYgaXNpbnN0YW5jZShoaXN0b3J5LCBkaWN0KSBlbHNlIE5vbmUKICAgICAgICAgICAgICAgIHJlcXVpcmUoaXNpbnN0YW5jZShjb3VudHMsIGRpY3QpIGFuZCBzZXQoY291bnRzKSA8PSBzZXQoU1RBVFVTRVMpCiAgICAgICAgICAgICAgICAgICAgICAgIGFuZCBhbGwodHlwZShjb3VudCkgaXMgaW50IGFuZCBjb3VudCA+PSAwIGZvciBjb3VudCBpbiBjb3VudHMudmFsdWVzKCkpCiAgICAgICAgICAgICAgICAgICAgICAgIGFuZCBoaXN0b3J5LmdldCgndG90YWwnKSA9PSBzdW0oY291bnRzLnZhbHVlcygpKSwgJ0Nhbm5vdCB2ZXJpZnkgc3VwZXJzZWRlZCBhdXRvbWF0aW9uIGFjdGl2aXR5JykKICAgICAgICAgICAgICAgIHJlcXVpcmUoY291bnRzLmdldCgnUEVORElORycsIDApID09IGNvdW50cy5nZXQoJ1JVTk5JTkcnLCAwKSA9PSAwLAogICAgICAgICAgICAgICAgICAgICAgICAnQSBzdXBlcnNlZGVkIGF1dG9tYXRpb24gaGFzIHBlbmRpbmcgb3IgcnVubmluZyB3b3JrOyBsZXQgaXQgZmluaXNoIGJlZm9yZSByZWNvbm5lY3RpbmcnKQogICAgICAgICAgICBmb3Igcm93IGluIHJldGlyZWQ6CiAgICAgICAgICAgICAgICBzZWxmLmFwaSgnLycgKyByb3dbJ2lkJ10sIG1ldGhvZD0nREVMRVRFJykKICAgICAgICAgICAgcmVxdWlyZShub3QgcmV0aXJlZF9kZWZpbml0aW9ucyhzZWxmLmludmVudG9yeSgpKSwgJ1N1cGVyc2VkZWQgZGVmaW5pdGlvbnMgcmVtYWluOyByZWNvbm5lY3QgYmVmb3JlIHJ1bm5pbmcnKQogICAgICAgICAgICBmb3Igc3RhZ2UsIGJ1bmRsZSBpbiBidW5kbGVzLml0ZW1zKCk6CiAgICAgICAgICAgICAgICBzYXZlZCA9IHN0YXRlWydiaW5kaW5ncyddLmdldChzdGFnZSkKICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBzZWxlY3RlZC5nZXQoc3RhZ2UpCiAgICAgICAgICAgICAgICBpZiBzYXZlZCBhbmQgc2F2ZWQuZ2V0KCdoYXNoJykgIT0gYnVuZGxlWydoYXNoJ106CiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZShzYXZlZC5nZXQoJ3N0YXRlJykgPT0gJ3JlYWR5JywgJ0FuIGVhcmxpZXIgc2V0dXAgaXMgaW5jb21wbGV0ZTsgcmVzb2x2ZSBpdCBiZWZvcmUgY2hhbmdpbmcgYnVuZGxlcycpCiAgICAgICAgICAgICAgICAgICAgc2F2ZWQgPSBOb25lCiAgICAgICAgICAgICAgICBpZiBzYXZlZCBhbmQgc2F2ZWQuZ2V0KCdzdGF0ZScpID09ICdyZWFkeScgYW5kIGN1cnJlbnQgYW5kIHNlbGYuZGVmaW5pdGlvbl9tYXRjaGVzKGN1cnJlbnQsIGJ1bmRsZVsnZGVmaW5pdGlvbiddIHwgeyd0YXJiYWxsX3BhdGgnOiBzYXZlZC5nZXQoJ3RhcmJhbGxfcGF0aCcpfSk6CiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZShzYXZlZC5nZXQoJ2lkJykgPT0gY3VycmVudFsnaWQnXSwgJ1RoZSBpbnN0YWxsZWQgcm9sZSBhdXRvbWF0aW9uIGlkZW50aXR5IGNoYW5nZWQnKQogICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlCiAgICAgICAgICAgICAgICBpZiBub3Qgc2F2ZWQ6CiAgICAgICAgICAgICAgICAgICAgc2F2ZWQgPSB7J3N0YXRlJzogJ3VwbG9hZGluZycsICdoYXNoJzogYnVuZGxlWydoYXNoJ10sICdpZCc6IGN1cnJlbnRbJ2lkJ10gaWYgY3VycmVudCBlbHNlIE5vbmV9CiAgICAgICAgICAgICAgICAgICAgc3RhdGVbJ2JpbmRpbmdzJ11bc3RhZ2VdID0gc2F2ZWQKICAgICAgICAgICAgICAgICAgICBzZWxmLnNhdmUoc3RhdGUpCiAgICAgICAgICAgICAgICAgICAgdXBsb2FkZWQgPSBzZWxmLmFwaSgnL3VwbG9hZHM/bmFtZT0nICsgdXJsbGliLnBhcnNlLnF1b3RlKCdvcGVuc3BlYy1yb2xlLScgKyBzdGFnZSksIG1ldGhvZD0nUE9TVCcsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5PWJ1bmRsZVsndGFyYmFsbCddLCBoZWFkZXJzPXsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2d6aXAnfSkKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKGlzaW5zdGFuY2UodXBsb2FkZWQsIGRpY3QpIGFuZCB1cGxvYWRlZC5nZXQoJ3N0YXR1cycpID09ICdDT01QTEVURUQnCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmQgaXNpbnN0YW5jZSh1cGxvYWRlZC5nZXQoJ3RhcmJhbGxfcGF0aCcpLCBzdHIpCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmQgdXBsb2FkZWRbJ3RhcmJhbGxfcGF0aCddLnN0YXJ0c3dpdGgoJ29oLWludGVybmFsOi8vdXBsb2Fkcy8nKQogICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5kIGlkZW50aWZpZXIodXBsb2FkZWRbJ3RhcmJhbGxfcGF0aCddLnJlbW92ZXByZWZpeCgnb2gtaW50ZXJuYWw6Ly91cGxvYWRzLycpKSwgJ0J1bmRsZSB1cGxvYWQgZGlkIG5vdCBjb21wbGV0ZTsgaW5zcGVjdCBuYXRpdmUgQXV0b21hdGlvbiB1cGxvYWRzJykKICAgICAgICAgICAgICAgICAgICBzYXZlZC51cGRhdGUoc3RhdGU9J3VwbG9hZGVkJywgdGFyYmFsbF9wYXRoPXVwbG9hZGVkWyd0YXJiYWxsX3BhdGgnXSkKICAgICAgICAgICAgICAgICAgICBzZWxmLnNhdmUoc3RhdGUpCiAgICAgICAgICAgICAgICByZXF1aXJlKHNhdmVkLmdldCgnc3RhdGUnKSAhPSAndXBsb2FkaW5nJywgJ0J1bmRsZSB1cGxvYWQgb3V0Y29tZSBpcyB1bmtub3duOyBpbnNwZWN0IG5hdGl2ZSBBdXRvbWF0aW9uIHVwbG9hZHMgYmVmb3JlIHJldHJ5aW5nJykKICAgICAgICAgICAgICAgIGRlc2lyZWQgPSBidW5kbGVbJ2RlZmluaXRpb24nXSB8IHsndGFyYmFsbF9wYXRoJzogc2F2ZWRbJ3RhcmJhbGxfcGF0aCddfQogICAgICAgICAgICAgICAgaWYgY3VycmVudCBhbmQgc2VsZi5kZWZpbml0aW9uX21hdGNoZXMoY3VycmVudCwgZGVzaXJlZCk6CiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZShzYXZlZC5nZXQoJ2lkJykgaW4gKE5vbmUsIGN1cnJlbnRbJ2lkJ10pLCAnUm9sZSBhdXRvbWF0aW9uIGlkZW50aXR5IGNoYW5nZWQgZHVyaW5nIHNldHVwJykKICAgICAgICAgICAgICAgICAgICBpbnN0YWxsZWQgPSBjdXJyZW50CiAgICAgICAgICAgICAgICBlbHNlOgogICAgICAgICAgICAgICAgICAgIHJlcXVpcmUobm90IChzYXZlZC5nZXQoJ3N0YXRlJykgPT0gJ2luc3RhbGxpbmcnIGFuZCBzYXZlZC5nZXQoJ2lkJykgaXMgTm9uZSksCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQXV0b21hdGlvbiBjcmVhdGlvbiBvdXRjb21lIGlzIHVua25vd247IGluc3BlY3QgaXRzIGhpc3RvcnkgYmVmb3JlIHJldHJ5aW5nJykKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKG5vdCBjdXJyZW50IG9yIHNhdmVkLmdldCgnaWQnKSA9PSBjdXJyZW50WydpZCddLCAnUm9sZSBhdXRvbWF0aW9uIGlkZW50aXR5IGNoYW5nZWQgZHVyaW5nIHNldHVwJykKICAgICAgICAgICAgICAgICAgICBzYXZlZFsnc3RhdGUnXSA9ICdpbnN0YWxsaW5nJwogICAgICAgICAgICAgICAgICAgIHNlbGYuc2F2ZShzdGF0ZSkKICAgICAgICAgICAgICAgICAgICBpbnN0YWxsZWQgPSBzZWxmLmFwaSgnLycgKyBjdXJyZW50WydpZCddIGlmIGN1cnJlbnQgZWxzZSAnJywgbWV0aG9kPSdQQVRDSCcgaWYgY3VycmVudCBlbHNlICdQT1NUJywgYm9keT1kZXNpcmVkKQogICAgICAgICAgICAgICAgICAgIHJlcXVpcmUoaXNpbnN0YW5jZShpbnN0YWxsZWQsIGRpY3QpIGFuZCBpZGVudGlmaWVyKGluc3RhbGxlZC5nZXQoJ2lkJykpIGFuZCBzZWxmLmRlZmluaXRpb25fbWF0Y2hlcyhpbnN0YWxsZWQsIGRlc2lyZWQpCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmQgKG5vdCBjdXJyZW50IG9yIGluc3RhbGxlZFsnaWQnXSA9PSBjdXJyZW50WydpZCddKSwgJ05hdGl2ZSBpbnN0YWxsYXRpb24gcmV0dXJuZWQgdW5leHBlY3RlZCBkYXRhOyBpbnNwZWN0IGRlZmluaXRpb25zIGJlZm9yZSByZXRyeWluZycpCiAgICAgICAgICAgICAgICBzYXZlZC51cGRhdGUoc3RhdGU9J3JlYWR5JywgaWQ9aW5zdGFsbGVkWydpZCddKQogICAgICAgICAgICAgICAgc2VsZWN0ZWRbc3RhZ2VdID0gaW5zdGFsbGVkCiAgICAgICAgICAgICAgICBzZWxmLnNhdmUoc3RhdGUpCiAgICAgICAgICAgIGlmIG5vdCBzb3VyY2U6CiAgICAgICAgICAgICAgICBzb3VyY2UgPSB7J3N0YXRlJzogJ3JlZ2lzdGVyaW5nJywgJ3NlY3JldCc6IHNlY3JldHMudG9rZW5fdXJsc2FmZSgzMil9CiAgICAgICAgICAgICAgICBzdGF0ZVsnc291cmNlJ10gPSBzb3VyY2UKICAgICAgICAgICAgICAgIHNlbGYuc2F2ZShzdGF0ZSkKICAgICAgICAgICAgICAgIGNyZWF0ZWQgPSBzZWxmLmFwaSgnL3dlYmhvb2tzJywgbWV0aG9kPSdQT1NUJywgYm9keT17J25hbWUnOiBTT1VSQ0VfTkFNRSwgJ3NvdXJjZSc6IFNPVVJDRSwKICAgICAgICAgICAgICAgICAgICAnZXZlbnRfa2V5X2V4cHInOiAndHlwZScsICdzaWduYXR1cmVfaGVhZGVyJzogJ1gtU2lnbmF0dXJlLTI1NicsICdzaWduYXR1cmVfc2NoZW1lJzogJ2htYWNfc2hhMjU2X2hleCcsCiAgICAgICAgICAgICAgICAgICAgJ3dlYmhvb2tfc2VjcmV0Jzogc291cmNlWydzZWNyZXQnXX0pCiAgICAgICAgICAgICAgICByZXF1aXJlKGlzaW5zdGFuY2UoY3JlYXRlZCwgZGljdCkgYW5kIGlkZW50aWZpZXIoY3JlYXRlZC5nZXQoJ2lkJykpIGFuZCBpZGVudGlmaWVyKGNyZWF0ZWQuZ2V0KCdvcmdfaWQnKSkKICAgICAgICAgICAgICAgICAgICAgICAgYW5kIGNyZWF0ZWQuZ2V0KCdzb3VyY2UnKSA9PSBTT1VSQ0UsICdTb3VyY2UgcmVnaXN0cmF0aW9uIHJldHVybmVkIHVuZXhwZWN0ZWQgZGF0YTsgaW5zcGVjdCB0aGUgbG9jYWwgY29ubmVjdGlvbicpCiAgICAgICAgICAgICAgICBzb3VyY2UudXBkYXRlKHN0YXRlPSdyZWFkeScsIGlkPWNyZWF0ZWRbJ2lkJ10sIG9yZ19pZD1jcmVhdGVkWydvcmdfaWQnXSkKICAgICAgICAgICAgICAgIHNlbGYuc2F2ZShzdGF0ZSkKICAgICAgICAgICAgc2VsZWN0ZWQgPSBzZWxmLnNlbGVjdGVkKHNlbGYuaW52ZW50b3J5KCkpCiAgICAgICAgICAgIHJlYWR5ID0gc2VsZi5yZWFkaW5lc3Moc2VsZWN0ZWQsIGJ1bmRsZXMsIHN0YXRlLCBzZWxmLmludmVudG9yeSgnL3dlYmhvb2tzJywgJ3dlYmhvb2tzJykpCiAgICAgICAgICAgIHJlcXVpcmUocmVhZHksICdSb2xlIGF1dG9tYXRpb24gc2V0dXAgY2hhbmdlZCBvciBpcyBpbmNvbXBsZXRlOyBpbnNwZWN0IG5hdGl2ZSBkZWZpbml0aW9ucyBhbmQgc291cmNlcycpCiAgICAgICAgICAgIHJldHVybiBzZWxmLnJlc3VsdCgnc2V0dXAnLCBUcnVlLCBzZWxlY3RlZCkKCiAgICBkZWYgdmFsaWRhdGVfaW5wdXQoc2VsZiwgZGF0YSwgKiwgY29udGV4dD1UcnVlKToKICAgICAgICBmaWVsZHMgPSB7J2F1dG9tYXRpb25faWQnLCAncmVxdWVzdF9pZCcsICdzdGFnZScsICdzcGVjX3N0b3JlJywgJ3JlcXVpcmVtZW50X2lkJywgJ2NvbnRleHRfY2hhbmdlJywgJ3JvbGUnLCAnc3BlY19pZCcsICdjaGFuZ2UnLCAncmVxdWVzdCd9CiAgICAgICAgcmVxdWlyZShpc2luc3RhbmNlKGRhdGEsIGRpY3QpIGFuZCBzZXQoZGF0YSkgPT0gZmllbGRzLCAnVW5leHBlY3RlZCByb2xlIGF1dG9tYXRpb24gaW5wdXQgZmllbGRzJykKICAgICAgICByZXF1aXJlKGlkZW50aWZpZXIoZGF0YVsnYXV0b21hdGlvbl9pZCddKSBhbmQgaWRlbnRpZmllcihkYXRhWydyZXF1ZXN0X2lkJ10pLCAnSW52YWxpZCBhdXRvbWF0aW9uIG9yIHJlcXVlc3QgSUQnKQogICAgICAgIHJlcXVpcmUoZGF0YVsnc3RhZ2UnXSBpbiBTVEFHRVMgYW5kIGRhdGFbJ3JvbGUnXSBpbiBST0xFUywgJ1Vuc3VwcG9ydGVkIE9wZW5TcGVjIHNraWxsIG9yIHJvbGUnKQogICAgICAgIHJlcXVpcmUobG9jYWxfcGF0aChkYXRhWydzcGVjX3N0b3JlJ10pID09IFBhdGgoc2VsZi5jb25maWdbJ3NwZWNfc3RvcmUnXSksICdTZWxlY3RlZCBzdG9yZSBkb2VzIG5vdCBtYXRjaCB0aGUgY29uZmlndXJlZCByb2xlIHdvcmtmbG93JykKICAgICAgICByZXF1aXJlKGlzaW5zdGFuY2UoZGF0YVsncmVxdWlyZW1lbnRfaWQnXSwgc3RyKSBhbmQgcmUuZnVsbG1hdGNoKHInUkVRLVswLTldezMsfScsIGRhdGFbJ3JlcXVpcmVtZW50X2lkJ10pLCAnSW52YWxpZCByZXF1aXJlbWVudCBJRCcpCiAgICAgICAgcHJlZml4ID0gUk9MRV9QUkVGSVhFU1tkYXRhWydyb2xlJ11dICsgJy0nICsgZGF0YVsncmVxdWlyZW1lbnRfaWQnXSArICctJwogICAgICAgIHJlcXVpcmUoaXNpbnN0YW5jZShkYXRhWydzcGVjX2lkJ10sIHN0cikgYW5kIGxlbihkYXRhWydzcGVjX2lkJ10pIDw9IDE2MCBhbmQgZGF0YVsnc3BlY19pZCddLnN0YXJ0c3dpdGgocHJlZml4KQogICAgICAgICAgICAgICAgYW5kIHJlLmZ1bGxtYXRjaChyJ1thLXowLTldKyg/Oi1bYS16MC05XSspKicsIGRhdGFbJ3NwZWNfaWQnXVtsZW4ocHJlZml4KTpdKSwgJ1NwZWMgSUQgbXVzdCBtYXRjaCB0aGUgcmVxdWlyZW1lbnQgYW5kIHJvbGUnKQogICAgICAgIHJlcXVpcmUoc2x1ZyhkYXRhWydjaGFuZ2UnXSkgYW5kIHNsdWcoZGF0YVsnY29udGV4dF9jaGFuZ2UnXSkgYW5kIGRhdGFbJ2NoYW5nZSddID09IGRhdGFbJ2NvbnRleHRfY2hhbmdlJ10sCiAgICAgICAgICAgICAgICAnUm9sZSBhY3Rpb25zIG11c3QgdXNlIHRoZSByZXF1aXJlbWVudCBjb250ZXh0IGNoYW5nZScpCiAgICAgICAgcmVxdWlyZShpc2luc3RhbmNlKGRhdGFbJ3JlcXVlc3QnXSwgc3RyKSBhbmQgbGVuKGRhdGFbJ3JlcXVlc3QnXSkgPD0gMTAwMDAgYW5kICdceDAwJyBub3QgaW4gZGF0YVsncmVxdWVzdCddCiAgICAgICAgICAgICAgICBhbmQgKGRhdGFbJ3N0YWdlJ10gPT0gJ2FwcGx5JyBvciBkYXRhWydyZXF1ZXN0J10uc3RyaXAoKSksICdQcm9wb3NlIGFuZCBVcGRhdGUgcmVxdWlyZSBhIHByb21wdDsgbWF4aW11bSAxMDAwMCBjaGFyYWN0ZXJzJykKICAgICAgICBpZiBub3QgY29udGV4dDoKICAgICAgICAgICAgcmV0dXJuCiAgICAgICAgc3RvcmUgPSBQYXRoKHNlbGYuY29uZmlnWydzcGVjX3N0b3JlJ10pCiAgICAgICAgbWV0YWRhdGEgPSByZWFkX2pzb24oc3RvcmUgLyAnb3BlbnNwZWMvcmVxdWlyZW1lbnRzLmpzb24nKQogICAgICAgIHJvd3MgPSBtZXRhZGF0YS5nZXQoJ3JlcXVpcmVtZW50cycpIGlmIGlzaW5zdGFuY2UobWV0YWRhdGEsIGRpY3QpIGFuZCB0eXBlKG1ldGFkYXRhLmdldCgndmVyc2lvbicpKSBpcyBpbnQgYW5kIG1ldGFkYXRhWyd2ZXJzaW9uJ10gPT0gMiBlbHNlIE5vbmUKICAgICAgICByZXF1aXJlKGlzaW5zdGFuY2Uocm93cywgbGlzdCkgYW5kIDAgPCBsZW4ocm93cykgPD0gNTAsICdSb2xlIGFjdGlvbnMgcmVxdWlyZSBzdG9yZSBtZXRhZGF0YSB2MicpCiAgICAgICAgaWRzLCBjaGFuZ2VzLCBzcGVjX2lkcyA9IHNldCgpLCBzZXQoKSwgc2V0KCkKICAgICAgICBmb3Igcm93IGluIHJvd3M6CiAgICAgICAgICAgIHJlcXVpcmUoaXNpbnN0YW5jZShyb3csIGRpY3QpIGFuZCBpc2luc3RhbmNlKHJvdy5nZXQoJ2lkJyksIHN0cikgYW5kIHJlLmZ1bGxtYXRjaChyJ1JFUS1bMC05XXszLH0nLCByb3dbJ2lkJ10pCiAgICAgICAgICAgICAgICAgICAgYW5kIHNsdWcocm93LmdldCgnY2hhbmdlJykpIGFuZCByb3dbJ2lkJ10gbm90IGluIGlkcyBhbmQgcm93WydjaGFuZ2UnXSBub3QgaW4gY2hhbmdlcwogICAgICAgICAgICAgICAgICAgIGFuZCBpc2luc3RhbmNlKHJvdy5nZXQoJ3JvbGVzJyksIGRpY3QpIGFuZCBzZXQocm93Wydyb2xlcyddKSA9PSBzZXQoUk9MRVMpLCAnRHVwbGljYXRlIG9yIGludmFsaWQgc3RvcmUgcmVxdWlyZW1lbnRzJykKICAgICAgICAgICAgaWRzLmFkZChyb3dbJ2lkJ10pCiAgICAgICAgICAgIGNoYW5nZXMuYWRkKHJvd1snY2hhbmdlJ10pCiAgICAgICAgICAgIGNvdW50ID0gMAogICAgICAgICAgICBmb3Igcm9sZSwgZW50cnkgaW4gcm93Wydyb2xlcyddLml0ZW1zKCk6CiAgICAgICAgICAgICAgICByZXF1aXJlKGlzaW5zdGFuY2UoZW50cnksIGRpY3QpIGFuZCBzZXQoZW50cnkpID09IHsnb3duZXInLCAnbm90ZScsICdzcGVjcyd9CiAgICAgICAgICAgICAgICAgICAgICAgIGFuZCBpc2luc3RhbmNlKGVudHJ5Wydvd25lciddLCBzdHIpIGFuZCBpc2luc3RhbmNlKGVudHJ5Wydub3RlJ10sIHN0cikKICAgICAgICAgICAgICAgICAgICAgICAgYW5kIGlzaW5zdGFuY2UoZW50cnlbJ3NwZWNzJ10sIGxpc3QpLCAnSW52YWxpZCByb2xlIHNwZWMgbWV0YWRhdGEnKQogICAgICAgICAgICAgICAgY291bnQgKz0gbGVuKGVudHJ5WydzcGVjcyddKQogICAgICAgICAgICAgICAgZm9yIHNwZWMgaW4gZW50cnlbJ3NwZWNzJ106CiAgICAgICAgICAgICAgICAgICAgZXhwZWN0ZWQgPSBST0xFX1BSRUZJWEVTW3JvbGVdICsgJy0nICsgcm93WydpZCddICsgJy0nCiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZShpc2luc3RhbmNlKHNwZWMsIGRpY3QpIGFuZCBzZXQoc3BlYykgPT0geydpZCcsICd0aXRsZScsICdzdGF0ZScsICdub3RlJ30KICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZCBpc2luc3RhbmNlKHNwZWNbJ2lkJ10sIHN0cikgYW5kIGxlbihzcGVjWydpZCddKSA8PSAxNjAgYW5kIHNwZWNbJ2lkJ10uc3RhcnRzd2l0aChleHBlY3RlZCkKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZCByZS5mdWxsbWF0Y2gocidbYS16MC05XSsoPzotW2EtejAtOV0rKSonLCBzcGVjWydpZCddW2xlbihleHBlY3RlZCk6XSkKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZCBzcGVjWydpZCddIG5vdCBpbiBzcGVjX2lkcyBhbmQgaXNpbnN0YW5jZShzcGVjWyd0aXRsZSddLCBzdHIpIGFuZCAwIDwgbGVuKHNwZWNbJ3RpdGxlJ10uc3RyaXAoKSkgPD0gMjAwCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmQgc3BlY1snc3RhdGUnXSBpbiAoJ2JhY2tsb2cnLCAnaW5fcHJvZ3Jlc3MnLCAnYmxvY2tlZCcpIGFuZCBpc2luc3RhbmNlKHNwZWNbJ25vdGUnXSwgc3RyKSwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICdJbnZhbGlkLCBkdXBsaWNhdGUgb3Igd3Jvbmctcm9sZSBzcGVjIG1ldGFkYXRhJykKICAgICAgICAgICAgICAgICAgICBzcGVjX2lkcy5hZGQoc3BlY1snaWQnXSkKICAgICAgICAgICAgcmVxdWlyZShjb3VudCA8PSAyMCwgJ0EgcmVxdWlyZW1lbnQgbWF5IGNvbnRhaW4gYXQgbW9zdCAyMCBzcGVjcycpCiAgICAgICAgbWF0Y2hlcyA9IFtyb3cgZm9yIHJvdyBpbiByb3dzIGlmIHJvd1snaWQnXSA9PSBkYXRhWydyZXF1aXJlbWVudF9pZCddXQogICAgICAgIHJlcXVpcmUobGVuKG1hdGNoZXMpID09IDEgYW5kIG1hdGNoZXNbMF1bJ2NoYW5nZSddID09IGRhdGFbJ2NvbnRleHRfY2hhbmdlJ10sCiAgICAgICAgICAgICAgICAnVGhlIHJlcXVpcmVtZW50IG9yIGNvbnRleHQgY2hhbmdlIG5vIGxvbmdlciBtYXRjaGVzIHRoZSBzdG9yZScpCiAgICAgICAgcmVxdWlyZW1lbnQgPSBtYXRjaGVzWzBdCiAgICAgICAgcm9vdCA9IHN0b3JlIC8gJ29wZW5zcGVjL2NoYW5nZXMnIC8gZGF0YVsnY2hhbmdlJ10KICAgICAgICByZXF1aXJlKHJvb3QucmVzb2x2ZSgpID09IHJvb3QgYW5kIHJvb3QuaXNfZGlyKCksICdUaGUgcmVxdWlyZW1lbnQgY29udGV4dCBjaGFuZ2UgaXMgbWlzc2luZyBvciBzeW1saW5rZWQnKQogICAgICAgIHNwZWNfcm9vdCA9IHJvb3QgLyAnc3BlY3MnIC8gZGF0YVsnc3BlY19pZCddCiAgICAgICAgdGFzayA9IHJvb3QgLyAndGFza3MnIC8gKGRhdGFbJ3NwZWNfaWQnXSArICcubWQnKQogICAgICAgIHJlcXVpcmUoc3BlY19yb290LnJlc29sdmUoKSA9PSBzcGVjX3Jvb3QgYW5kIHRhc2sucmVzb2x2ZSgpID09IHRhc2ssICdTcGVjIGFydGlmYWN0cyBtdXN0IG5vdCB1c2Ugc3ltbGlua3MnKQogICAgICAgIHJlZ2lzdGVyZWQgPSBhbnkoc3BlY1snaWQnXSA9PSBkYXRhWydzcGVjX2lkJ10gZm9yIHNwZWMgaW4gcmVxdWlyZW1lbnRbJ3JvbGVzJ11bZGF0YVsncm9sZSddXVsnc3BlY3MnXSkKICAgICAgICBpZiBkYXRhWydzdGFnZSddID09ICdwcm9wb3NlJzoKICAgICAgICAgICAgcmVxdWlyZShkYXRhWydzcGVjX2lkJ10gbm90IGluIHNwZWNfaWRzIGFuZCBub3Qgc3BlY19yb290LmV4aXN0cygpIGFuZCBub3Qgc3BlY19yb290LmlzX3N5bWxpbmsoKQogICAgICAgICAgICAgICAgICAgIGFuZCBub3QgdGFzay5leGlzdHMoKSBhbmQgbm90IHRhc2suaXNfc3ltbGluaygpLCAnUHJvcG9zZSByZWZ1c2VzIHRvIG92ZXJ3cml0ZSBhbiBleGlzdGluZyBzcGVjJykKICAgICAgICAgICAgcmVxdWlyZShzdW0obGVuKHJvbGVbJ3NwZWNzJ10pIGZvciByb2xlIGluIHJlcXVpcmVtZW50Wydyb2xlcyddLnZhbHVlcygpKSA8IDIwLCAnVGhlIHJlcXVpcmVtZW50IGhhcyByZWFjaGVkIGl0cyAyMCBzcGVjIGxpbWl0JykKICAgICAgICBlbHNlOgogICAgICAgICAgICByZXF1aXJlKHJlZ2lzdGVyZWQsICdUaGUgcmVxdWlyZW1lbnQsIHJvbGUgb3Igc3BlYyBubyBsb25nZXIgbWF0Y2hlcyB0aGUgc3RvcmU7IHJlZnJlc2ggdGhlIGJvYXJkJykKICAgICAgICAgICAgcmVhZF9ieXRlcyhzcGVjX3Jvb3QgLyAnc3BlYy5tZCcsIDY0ICogMTAyNCkKICAgICAgICAgICAgcmVhZF9ieXRlcyh0YXNrLCA2NCAqIDEwMjQpCgogICAgZGVmIGRpc3BhdGNoKHNlbGYsIGRhdGEpOgogICAgICAgIHNlbGYudmFsaWRhdGVfaW5wdXQoZGF0YSwgY29udGV4dD1GYWxzZSkKICAgICAgICBmaW5nZXJwcmludCA9IGhhc2hsaWIuc2hhMjU2KGVuY29kZShkYXRhKSkuaGV4ZGlnZXN0KCkKICAgICAgICB3aXRoIHNlbGYubG9jaygpOgogICAgICAgICAgICBqb3VybmFsID0gc2VsZi5yb290IC8gKGRhdGFbJ3JlcXVlc3RfaWQnXSArICcuanNvbicpCiAgICAgICAgICAgIGlmIGpvdXJuYWwuZXhpc3RzKCk6CiAgICAgICAgICAgICAgICBzYXZlZCA9IHJlYWRfanNvbihqb3VybmFsKQogICAgICAgICAgICAgICAgcmVxdWlyZShzYXZlZC5nZXQoJ2ZpbmdlcnByaW50JykgPT0gZmluZ2VycHJpbnQsICdUaGlzIHJlcXVlc3QgSUQgYmVsb25ncyB0byBkaWZmZXJlbnQgaW5wdXRzJykKICAgICAgICAgICAgICAgIHJlcXVpcmUoc2F2ZWQuZ2V0KCdzdGF0ZScpID09ICdkaXNwYXRjaGVkJywgJ1RoaXMgcmVxdWVzdCBtYXkgYWxyZWFkeSBoYXZlIHN0YXJ0ZWQ7IGluc3BlY3QgbmF0aXZlIEF1dG9tYXRpb24gaGlzdG9yeScpCiAgICAgICAgICAgICAgICByZXR1cm4geydraW5kJzogJ2Rpc3BhdGNoJywgKip7a2V5OiBzYXZlZFtrZXldIGZvciBrZXkgaW4gKCdhdXRvbWF0aW9uX2lkJywgJ3JlcXVlc3RfaWQnLCAncnVuX2lkJyl9fQogICAgICAgICAgICBzZWxmLnZhbGlkYXRlX2lucHV0KGRhdGEpCiAgICAgICAgICAgIHNlbGVjdGVkID0gc2VsZi5zZWxlY3RlZChzZWxmLmludmVudG9yeSgpKQogICAgICAgICAgICBzdGF0ZSA9IHNlbGYuc3RhdGUoKQogICAgICAgICAgICByZXF1aXJlKHNlbGYucmVhZGluZXNzKHNlbGVjdGVkLCBzZWxmLmJ1bmRsZXMoKSwgc3RhdGUsIHNlbGYuaW52ZW50b3J5KCcvd2ViaG9va3MnLCAnd2ViaG9va3MnKSksICdDb25uZWN0IG9yIHVwZGF0ZSB0aGUgcm9sZSBhdXRvbWF0aW9ucyBiZWZvcmUgcnVubmluZycpCiAgICAgICAgICAgIHJlcXVpcmUoc2VsZWN0ZWRbcGFpcl9rZXkoZGF0YVsncm9sZSddLCBkYXRhWydzdGFnZSddKV1bJ2lkJ10gPT0gZGF0YVsnYXV0b21hdGlvbl9pZCddLCAnU2VsZWN0ZWQgcm9sZSBhdXRvbWF0aW9uIGNoYW5nZWQ7IHJlY29ubmVjdCBmaXJzdCcpCiAgICAgICAgICAgIGV2ZW50ID0geydzY2hlbWEnOiBTQ0hFTUEsICd0eXBlJzogZGF0YVsnc3RhZ2UnXSArICcucmVxdWVzdGVkJywgJ2FwcHJvdmFsJzogZGF0YVsnc3RhZ2UnXSwKICAgICAgICAgICAgICAgICAgICAgKip7a2V5OiB2YWx1ZSBmb3Iga2V5LCB2YWx1ZSBpbiBkYXRhLml0ZW1zKCkgaWYga2V5ICE9ICdhdXRvbWF0aW9uX2lkJ319CiAgICAgICAgICAgIHNhdmVkID0geydzdGF0ZSc6ICdkaXNwYXRjaGluZycsICdmaW5nZXJwcmludCc6IGZpbmdlcnByaW50LCAnYXV0b21hdGlvbl9pZCc6IGRhdGFbJ2F1dG9tYXRpb25faWQnXSwgJ3JlcXVlc3RfaWQnOiBkYXRhWydyZXF1ZXN0X2lkJ119CiAgICAgICAgICAgIGF0b21pY19qc29uKGpvdXJuYWwsIHNhdmVkKQogICAgICAgICAgICByYXcgPSBlbmNvZGUoZXZlbnQpCiAgICAgICAgICAgIHNvdXJjZSA9IHN0YXRlWydzb3VyY2UnXQogICAgICAgICAgICBzaWduYXR1cmUgPSAnc2hhMjU2PScgKyBobWFjLm5ldyhzb3VyY2VbJ3NlY3JldCddLmVuY29kZSgpLCByYXcsIGhhc2hsaWIuc2hhMjU2KS5oZXhkaWdlc3QoKQogICAgICAgICAgICByZXN1bHQgPSBzZWxmLnJlcXVlc3RlcihzZWxmLmJhc2UgKyBmIi9ldmVudHMve3NvdXJjZVsnb3JnX2lkJ119L3tTT1VSQ0V9IiwgbWV0aG9kPSdQT1NUJywgYm9keT1yYXcsIGhlYWRlcnM9eydYLVNpZ25hdHVyZS0yNTYnOiBzaWduYXR1cmV9KQogICAgICAgICAgICByZXF1aXJlKGlzaW5zdGFuY2UocmVzdWx0LCBkaWN0KSBhbmQgcmVzdWx0LmdldCgncmVjZWl2ZWQnKSBpcyBUcnVlIGFuZCByZXN1bHQuZ2V0KCdtYXRjaGVkJykgPT0gMQogICAgICAgICAgICAgICAgICAgIGFuZCBpc2luc3RhbmNlKHJlc3VsdC5nZXQoJ3J1bnNfY3JlYXRlZCcpLCBsaXN0KSBhbmQgbGVuKHJlc3VsdFsncnVuc19jcmVhdGVkJ10pID09IDEgYW5kIGlkZW50aWZpZXIocmVzdWx0WydydW5zX2NyZWF0ZWQnXVswXSksCiAgICAgICAgICAgICAgICAgICAgJ0V4cGVjdGVkIGV4YWN0bHkgb25lIHJvbGUgYXV0b21hdGlvbiBydW47IGluc3BlY3QgbmF0aXZlIGhpc3RvcnkgYmVmb3JlIHJldHJ5aW5nJykKICAgICAgICAgICAgc2F2ZWQudXBkYXRlKHN0YXRlPSdkaXNwYXRjaGVkJywgcnVuX2lkPXJlc3VsdFsncnVuc19jcmVhdGVkJ11bMF0pCiAgICAgICAgICAgIGF0b21pY19qc29uKGpvdXJuYWwsIHNhdmVkKQogICAgICAgICAgICByZXR1cm4geydraW5kJzogJ2Rpc3BhdGNoJywgKip7a2V5OiBzYXZlZFtrZXldIGZvciBrZXkgaW4gKCdhdXRvbWF0aW9uX2lkJywgJ3JlcXVlc3RfaWQnLCAncnVuX2lkJyl9fQoKICAgIGRlZiBzdGF0dXMoc2VsZiwgZGF0YSk6CiAgICAgICAgcmVxdWlyZShpc2luc3RhbmNlKGRhdGEsIGRpY3QpIGFuZCBzZXQoZGF0YSkgPT0geydhdXRvbWF0aW9uX2lkJywgJ3J1bl9pZCd9IGFuZCBhbGwoaWRlbnRpZmllcih2YWx1ZSkgZm9yIHZhbHVlIGluIGRhdGEudmFsdWVzKCkpLCAnSW52YWxpZCByb2xlIHJ1biBzdGF0dXMgcmVxdWVzdCcpCiAgICAgICAgcm93cyA9IHNlbGYuc2VsZWN0ZWQoc2VsZi5pbnZlbnRvcnkoKSkKICAgICAgICByZXF1aXJlKGFueShyb3dbJ2lkJ10gPT0gZGF0YVsnYXV0b21hdGlvbl9pZCddIGZvciByb3cgaW4gcm93cy52YWx1ZXMoKSksICdUaGUgc2VsZWN0ZWQgcm9sZSBhdXRvbWF0aW9uIGlzIHVuYXZhaWxhYmxlJykKICAgICAgICAjIEJvdW5kIGJvdGggaGlzdG9yeSBsb29rdXAgYW5kIHJldHVybmVkIGRhdGE7IG5ldmVyIGV4cG9zZSByYXcgcnVuIG1ldGFkYXRhLgogICAgICAgIGZvciBvZmZzZXQgaW4gcmFuZ2UoMCwgMTAwMCwgMTAwKToKICAgICAgICAgICAgcGFnZSA9IHNlbGYuYXBpKGYiL3tkYXRhWydhdXRvbWF0aW9uX2lkJ119L3J1bnM/bGltaXQ9MTAwJm9mZnNldD17b2Zmc2V0fSIpCiAgICAgICAgICAgIHJlcXVpcmUoaXNpbnN0YW5jZShwYWdlLCBkaWN0KSBhbmQgaXNpbnN0YW5jZShwYWdlLmdldCgncnVucycpLCBsaXN0KSBhbmQgbGVuKHBhZ2VbJ3J1bnMnXSkgPD0gMTAwCiAgICAgICAgICAgICAgICAgICAgYW5kIHR5cGUocGFnZS5nZXQoJ3RvdGFsJykpIGlzIGludCBhbmQgcGFnZVsndG90YWwnXSA+PSBvZmZzZXQgKyBsZW4ocGFnZVsncnVucyddKSwgJ0ludmFsaWQgbmF0aXZlIEF1dG9tYXRpb24gaGlzdG9yeScpCiAgICAgICAgICAgIGZvdW5kID0gW3JvdyBmb3Igcm93IGluIHBhZ2VbJ3J1bnMnXSBpZiBpc2luc3RhbmNlKHJvdywgZGljdCkgYW5kIHJvdy5nZXQoJ2lkJykgPT0gZGF0YVsncnVuX2lkJ11dCiAgICAgICAgICAgIHJlcXVpcmUobGVuKGZvdW5kKSA8PSAxLCAnRHVwbGljYXRlIHJ1biBpZGVudGl0aWVzIGluIG5hdGl2ZSBoaXN0b3J5JykKICAgICAgICAgICAgaWYgZm91bmQ6CiAgICAgICAgICAgICAgICByb3cgPSBmb3VuZFswXQogICAgICAgICAgICAgICAgcmVxdWlyZShyb3cuZ2V0KCdhdXRvbWF0aW9uX2lkJykgPT0gZGF0YVsnYXV0b21hdGlvbl9pZCddIGFuZCByb3cuZ2V0KCdzdGF0dXMnKSBpbiBTVEFUVVNFUwogICAgICAgICAgICAgICAgICAgICAgICBhbmQgKHJvdy5nZXQoJ2NvbnZlcnNhdGlvbl9pZCcpIGlzIE5vbmUgb3IgaWRlbnRpZmllcihyb3dbJ2NvbnZlcnNhdGlvbl9pZCddKSksICdJbnZhbGlkIG5hdGl2ZSByb2xlIHJ1biBzdGF0dXMnKQogICAgICAgICAgICAgICAgIyBTZXJ2aWNlIGVycm9ycyBtYXkgY29udGFpbiBlbnZpcm9ubWVudCBvciBtb2RlbCBkZXRhaWxzLiBLZWVwIHRob3NlIGluCiAgICAgICAgICAgICAgICAjIG5hdGl2ZSBoaXN0b3J5OyBkaXNwbGF5IG9ubHkgYW4gYWN0aW9uYWJsZSwgZml4ZWQgc3VtbWFyeSBpbiBDYW52YXMuCiAgICAgICAgICAgICAgICBlcnJvciA9ICdUaGlzIHJ1biBuZWVkcyBhdHRlbnRpb24uIE9wZW4gbmF0aXZlIEF1dG9tYXRpb24gaGlzdG9yeSBmb3IgZGV0YWlscy4nIGlmIHJvdy5nZXQoJ2Vycm9yX2RldGFpbCcpIG9yIHJvd1snc3RhdHVzJ10gPT0gJ0ZBSUxFRCcgZWxzZSBOb25lCiAgICAgICAgICAgICAgICByZXR1cm4geydraW5kJzogJ3N0YXR1cycsICoqZGF0YSwgJ3N0YXR1cyc6IHJvd1snc3RhdHVzJ10sICdjb252ZXJzYXRpb25faWQnOiByb3cuZ2V0KCdjb252ZXJzYXRpb25faWQnKSwgJ2Vycm9yJzogZXJyb3J9CiAgICAgICAgICAgIGlmIG9mZnNldCArIGxlbihwYWdlWydydW5zJ10pID49IHBhZ2VbJ3RvdGFsJ106CiAgICAgICAgICAgICAgICBicmVhawogICAgICAgICAgICByZXF1aXJlKGxlbihwYWdlWydydW5zJ10pID09IDEwMCwgJ0luY29tcGxldGUgbmF0aXZlIEF1dG9tYXRpb24gaGlzdG9yeScpCiAgICAgICAgcmFpc2UgQnJpZGdlRXJyb3IoJ1J1biB3YXMgbm90IGZvdW5kIGluIHRoZSBsYXRlc3QgMTAwMCBlbnRyaWVzOyBpbnNwZWN0IG5hdGl2ZSBBdXRvbWF0aW9uIGhpc3RvcnknKQoKCmRlZiBoYW5kbGUodmFsdWUpOgogICAgcmVxdWlyZShpc2luc3RhbmNlKHZhbHVlLCBkaWN0KSBhbmQgc2V0KHZhbHVlKSA8PSB7J2FjdGlvbicsICdzZXJ2aWNlJywgJ2hvbWUnLCAnaW5wdXQnfQogICAgICAgICAgICBhbmQgdmFsdWUuZ2V0KCdhY3Rpb24nKSBpbiAoJ3Byb2JlJywgJ3NldHVwJywgJ2Rpc3BhdGNoJywgJ3N0YXR1cycpLCAnSW52YWxpZCByb2xlIGJyaWRnZSByZXF1ZXN0JykKICAgIGJyaWRnZSA9IEJyaWRnZSh2YWx1ZS5nZXQoJ3NlcnZpY2UnKSwgdmFsdWUuZ2V0KCdob21lJykpCiAgICBhY3Rpb24gPSB2YWx1ZVsnYWN0aW9uJ10KICAgIGlmIGFjdGlvbiBpbiAoJ2Rpc3BhdGNoJywgJ3N0YXR1cycpOgogICAgICAgIHJldHVybiBnZXRhdHRyKGJyaWRnZSwgYWN0aW9uKSh2YWx1ZS5nZXQoJ2lucHV0JykpCiAgICByZXF1aXJlKCdpbnB1dCcgbm90IGluIHZhbHVlLCAnVW5leHBlY3RlZCByb2xlIGJyaWRnZSBpbnB1dHMnKQogICAgcmV0dXJuIGdldGF0dHIoYnJpZGdlLCBhY3Rpb24pKCkKCgppZiBfX25hbWVfXyA9PSAnX19tYWluX18nOgogICAgdHJ5OgogICAgICAgIHJlcXVpcmUobGVuKHN5cy5hcmd2KSA9PSAyIGFuZCBsZW4oc3lzLmFyZ3ZbMV0pIDw9IDEwMDAwMCwgJ0ludmFsaWQgcm9sZSBicmlkZ2UgaW5wdXQnKQogICAgICAgIHJlc3VsdCA9IGhhbmRsZShqc29uLmxvYWRzKGJhc2U2NC5iNjRkZWNvZGUoc3lzLmFyZ3ZbMV0sIHZhbGlkYXRlPVRydWUpKSkKICAgICAgICBwcmludChqc29uLmR1bXBzKHsndmVyc2lvbic6IDEsICoqcmVzdWx0fSwgZW5zdXJlX2FzY2lpPUZhbHNlKSkKICAgIGV4Y2VwdCBCcmlkZ2VFcnJvciBhcyBlcnJvcjoKICAgICAgICBwcmludChqc29uLmR1bXBzKHsndmVyc2lvbic6IDEsICdraW5kJzogJ2Vycm9yJywgJ21lc3NhZ2UnOiBzdHIoZXJyb3IpWzo2MDBdfSkpCiAgICAgICAgc3lzLmV4aXQoMSkKICAgIGV4Y2VwdCBFeGNlcHRpb246CiAgICAgICAgcHJpbnQoanNvbi5kdW1wcyh7J3ZlcnNpb24nOiAxLCAna2luZCc6ICdlcnJvcicsICdtZXNzYWdlJzogJ0NvdWxkIG5vdCBjb21wbGV0ZSB0aGUgcm9sZSBBdXRvbWF0aW9uIHJlcXVlc3Q7IGluc3BlY3QgbmF0aXZlIGhpc3RvcnkgYmVmb3JlIHJldHJ5aW5nJ30pKQogICAgICAgIHN5cy5leGl0KDEpCg=="), (character) => character.charCodeAt(0)));

// src/automation.js
var ROLES2 = ["SA", "Frontend", "Backend", "QA"];
var STAGES = ["propose", "update", "apply"];
var STATES = ["PENDING", "RUNNING", "COMPLETED", "FAILED", "CANCELLED", "SKIPPED"];
var UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
var SLUG2 = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
var REPOSITORY = "/Users/oka/Desktop/openhands-automation";
var quote = (value) => "'" + value.replaceAll("'", "'\\''") + "'";
var object2 = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
var exact = (value, fields2) => object2(value) && Object.keys(value).length === fields2.length && fields2.every((field) => Object.hasOwn(value, field));
var uuid = (value) => typeof value === "string" && UUID.test(value);
var path = (value) => typeof value === "string" && value.startsWith("/") && value.length <= 4096 && !/[\0\r\n\\]/.test(value) && !value.split("/").some((part) => [".", "..", ".local"].includes(part)) && value !== "/" && !value.endsWith("/") && !value.includes("//");
var slug = (value) => typeof value === "string" && value.length <= 100 && SLUG2.test(value);
var text2 = (value, max) => typeof value === "string" && value.length <= max && !value.includes("\0");
var requireValue = (condition, message) => {
  if (!condition) throw new Error(message);
};
function validateRoleInput(input) {
  const fields2 = ["stage", "spec_store", "requirement_id", "context_change", "role", "spec_id", "change", "request"];
  const withIds = object2(input) && (Object.hasOwn(input, "automation_id") || Object.hasOwn(input, "request_id"));
  requireValue(exact(input, withIds ? [...fields2, "automation_id", "request_id"] : fields2), "Invalid role automation input fields.");
  requireValue(STAGES.includes(input.stage) && ROLES2.includes(input.role), "Choose a supported role and OpenSpec skill.");
  requireValue(path(input.spec_store), "Load an absolute local spec store directory first.");
  requireValue(typeof input.requirement_id === "string" && input.requirement_id.length <= 64 && /^REQ-[0-9]{3,}$/.test(input.requirement_id), "Choose a valid requirement.");
  requireValue(slug(input.context_change) && slug(input.change), "Enter a kebab-case change name of at most 100 characters.");
  requireValue(input.change === input.context_change, "Role actions must use this requirement\u2019s change.");
  const prefix = `${{ SA: "SA", Frontend: "FE", Backend: "BE", QA: "QA" }[input.role]}-${input.requirement_id}-`;
  requireValue(typeof input.spec_id === "string" && input.spec_id.length <= 160 && input.spec_id.startsWith(prefix) && SLUG2.test(input.spec_id.slice(prefix.length)), "Choose a spec belonging to this requirement and role.");
  requireValue(
    text2(input.request, 1e4) && (input.stage === "apply" || input.request.trim().length > 0),
    "Enter a prompt of at most 10000 characters. Propose and Update require a prompt."
  );
  if (withIds) requireValue(uuid(input.automation_id) && uuid(input.request_id), "Invalid automation or request ID.");
  return input;
}
function validateResponse(data, action, input) {
  const invalid = "Invalid role automation response. Inspect native Automation history before retrying.";
  requireValue(object2(data) && data.version === 1 && data.kind === action, invalid);
  if (action === "dispatch") {
    requireValue(exact(data, ["version", "kind", "run_id", "automation_id", "request_id"]) && uuid(data.run_id) && data.automation_id === input.automation_id && data.request_id === input.request_id, invalid);
  } else if (action === "status") {
    requireValue(exact(data, ["version", "kind", "run_id", "automation_id", "status", "conversation_id", "error"]) && data.run_id === input.run_id && data.automation_id === input.automation_id && STATES.includes(data.status) && (data.conversation_id === null || uuid(data.conversation_id)) && (data.error === null || text2(data.error, 600)), invalid);
  } else {
    requireValue(exact(data, ["version", "kind", "ready", "automations", "configuration", "message"]) && typeof data.ready === "boolean" && text2(data.message, 600) && Array.isArray(data.automations) && data.automations.length <= 12, invalid);
    const config = data.configuration;
    requireValue(exact(config, ["workspace", "spec_store", "store_id", "repository"]) && path(config.workspace) && path(config.spec_store) && slug(config.store_id) && config.repository === REPOSITORY, invalid);
    const ids = /* @__PURE__ */ new Set(), stages = /* @__PURE__ */ new Set();
    for (const row of data.automations) {
      const pair = `${row.role}:${row.stage}`;
      requireValue(exact(row, ["id", "name", "stage", "role"]) && uuid(row.id) && STAGES.includes(row.stage) && ROLES2.includes(row.role) && row.name === `OpenSpec ${row.role} \xB7 ${row.stage[0].toUpperCase()}${row.stage.slice(1)}` && !ids.has(row.id) && !stages.has(pair), invalid);
      ids.add(row.id);
      stages.add(pair);
    }
    requireValue(!data.ready || data.automations.length === 12, invalid);
    requireValue(action !== "setup" || data.ready, invalid);
  }
  return data;
}
async function callRoleAutomation(host, action, input) {
  requireValue(["probe", "setup", "dispatch", "status"].includes(action), "Unsupported role automation action.");
  if (action === "dispatch") {
    validateRoleInput(input);
    requireValue(uuid(input.automation_id) && uuid(input.request_id), "A submission needs automation and request IDs.");
  } else if (action === "status") {
    requireValue(exact(input, ["run_id", "automation_id"]) && uuid(input.run_id) && uuid(input.automation_id), "Invalid run status request.");
  } else requireValue(input === void 0, "Unexpected role automation inputs.");
  let info, home;
  try {
    [info, home] = await Promise.all([
      host.agentServer.request({ method: "GET", path: "/server_info" }),
      host.agentServer.request({ method: "GET", path: "/api/file/home" })
    ]);
  } catch {
    throw new Error("Cannot discover this backend\u2019s local Automation service.");
  }
  const service = info?.runtime_services?.services?.automation;
  requireValue(
    object2(service) && typeof service.url_from_agent === "string" && path(home?.home),
    "This backend does not advertise local Automation. Use the native local Canvas stack."
  );
  let origin;
  try {
    origin = new URL(service.url_from_agent);
  } catch {
    throw new Error("Invalid advertised Automation service.");
  }
  requireValue(
    ["http:", "https:"].includes(origin.protocol) && ["localhost", "127.0.0.1", "[::1]"].includes(origin.hostname) && !origin.username && !origin.password && !origin.search && !origin.hash && origin.pathname === "/" && service.api_prefix === "/api/automation" && service.auth_env_var === "OPENHANDS_AUTOMATION_API_KEY",
    "Only the advertised local Automation service is supported."
  );
  const payload = { action, service: {
    url_from_agent: service.url_from_agent,
    api_prefix: service.api_prefix,
    auth_env_var: service.auth_env_var
  }, home: home.home, ...input ? { input } : {} };
  const encoded = btoa(Array.from(new TextEncoder().encode(JSON.stringify(payload)), (byte) => String.fromCharCode(byte)).join(""));
  let output;
  try {
    output = await host.agentServer.request({ method: "POST", path: "/api/bash/execute_bash_command", body: {
      command: `python3 -c ${quote(automation_bridge_default)} ${quote(encoded)}`,
      cwd: home.home,
      timeout: action === "setup" ? 180 : 30
    } });
  } catch {
    throw new Error("The Automation request outcome is unknown. Inspect native Automation history before retrying.");
  }
  requireValue(
    object2(output) && output.order === 0 && Number.isInteger(output.exit_code) && typeof output.stdout === "string" && new TextEncoder().encode(output.stdout).length <= 128 * 1024,
    "Incomplete Automation output. Inspect native Automation history before retrying."
  );
  let data;
  try {
    data = JSON.parse(output.stdout);
  } catch {
    throw new Error("Invalid Automation output. Inspect native Automation history before retrying.");
  }
  if (exact(data, ["version", "kind", "message"]) && data.version === 1 && data.kind === "error" && text2(data.message, 600)) throw new Error(data.message);
  requireValue(output.exit_code === 0, "Automation failed. Inspect native Automation history before retrying.");
  return validateResponse(data, action, input);
}

// src/role-actions.js
var UUID2 = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
var SKILLS = { propose: "Propose", update: "Update", apply: "Apply" };
var HELP = {
  propose: "Add a named spec to this requirement and role. Stops before implementation.",
  update: "Revise the selected spec and its tasks. Submitting authorizes the edits in your prompt. Shared planning and sibling specs stay unchanged. Stops before implementation.",
  apply: "Work through this role\u2019s selected spec tasks. Check tasks only after their required verification succeeds."
};
function el(tag, className, text3) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text3 !== void 0) node.textContent = text3;
  return node;
}
function button(text3, action) {
  const node = el("button", "osb-button", text3);
  node.type = "button";
  node.addEventListener("click", action);
  return node;
}
function mountRoleActions({ host, container, navigate, workspace, requirement, role }) {
  let disposed = false, busy = false, opened = false, connection = null, last = null;
  const supportsSpecs = Array.isArray(requirement.specs) && Array.isArray(role.specs);
  const specs = supportsSpecs ? requirement.specs.filter((spec2) => spec2.role === role.id && role.specs.includes(spec2.id)) : [];
  const prefix = `${{ SA: "SA", Frontend: "FE", Backend: "BE", QA: "QA" }[role.id]}-${requirement.id}-`;
  const key = `openhands.apps.openspec-progress:v5:${host.backend.id}:${workspace}:${requirement.id}:${role.id}:run`;
  try {
    const value = JSON.parse(localStorage.getItem(key));
    if (value && UUID2.test(value.request_id) && UUID2.test(value.automation_id) && SKILLS[value.stage] && typeof value.spec_id === "string" && value.spec_id.startsWith(prefix) && (!value.run_id || UUID2.test(value.run_id))) last = value;
  } catch {
  }
  function remember(value) {
    last = value;
    try {
      if (value) localStorage.setItem(key, JSON.stringify(value));
      else localStorage.removeItem(key);
    } catch {
    }
  }
  function rememberResult(attempt, runId) {
    last = { ...attempt, run_id: runId };
    try {
      if (JSON.parse(localStorage.getItem(key))?.request_id === attempt.request_id) {
        localStorage.setItem(key, JSON.stringify(last));
      }
    } catch {
    }
  }
  function link(text3, href) {
    const node = el("a", "osb-run-link", text3);
    node.href = href;
    node.addEventListener("click", (event) => {
      if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      navigate(href);
    });
    return node;
  }
  const panel = el("details", "osb-role-actions");
  const summary = el("summary", "", "Run OpenSpec skill");
  summary.setAttribute("aria-label", `Run OpenSpec skill for ${role.id}`);
  panel.append(summary);
  const body = el("div", "osb-role-actions-body");
  const connectionText = el("p", "osb-muted", "Open this panel to check the automation connection.");
  const target = el("p", "osb-automation-target");
  const setup = button("Connect automations", () => connect("setup"));
  const probe = button("Check connection", () => connect("probe"));
  const connectionActions = el("div", "osb-run-controls");
  connectionActions.append(setup, probe);
  const setupHelp = el("p", "osb-muted", "Connect installs Propose, Update and Apply for each role and removes superseded OpenSpec automations. It starts no agent.");
  const form = el("form", "osb-skill-form");
  form.setAttribute("aria-label", `${role.id} automation`);
  const skillLabel = el("label", "osb-skill-field");
  skillLabel.append(el("span", "osb-label", "Skill"));
  const skill = el("select");
  skill.setAttribute("aria-label", `${role.id} skill`);
  for (const [value, label] of Object.entries(SKILLS)) {
    const option = el("option", "", label);
    option.value = value;
    skill.append(option);
  }
  skill.value = last?.stage || (supportsSpecs && !specs.length ? "propose" : "apply");
  skillLabel.append(skill);
  const specLabel = el("label", "osb-skill-field");
  specLabel.append(el("span", "osb-label", "Spec"));
  const spec = el("select");
  spec.setAttribute("aria-label", `${role.id} spec`);
  for (const item of specs) {
    const option = el("option", "", `${item.id} \xB7 ${item.title}`);
    option.value = item.id;
    spec.append(option);
  }
  if (last && specs.some((item) => item.id === last.spec_id)) spec.value = last.spec_id;
  specLabel.append(spec);
  const changeLabel = el("label", "osb-skill-field");
  changeLabel.append(el("span", "osb-label", "New feature name"));
  const change = el("input");
  change.setAttribute("aria-label", `${role.id} new feature name`);
  change.placeholder = "date-validation";
  change.maxLength = 160 - prefix.length;
  changeLabel.append(change);
  const specPreview = el("p", "osb-muted");
  specPreview.setAttribute("aria-live", "polite");
  if (last?.stage === "propose") change.value = last.spec_id.slice(prefix.length);
  const promptLabel = el("label", "osb-skill-field");
  const promptTitle = el("span", "osb-label");
  promptLabel.append(promptTitle);
  const prompt = el("textarea");
  prompt.setAttribute("aria-label", `${role.id} prompt`);
  prompt.rows = 4;
  prompt.maxLength = 1e4;
  prompt.placeholder = "Describe the work or constraints for this role\u2026";
  promptLabel.append(prompt);
  const help = el("p", "osb-skill-help");
  const submit = el("button", "osb-button osb-primary");
  submit.type = "submit";
  form.append(skillLabel, specLabel, changeLabel, specPreview, promptLabel, help, submit);
  const result = el("div", "osb-run-result");
  result.setAttribute("role", "status");
  result.setAttribute("aria-live", "polite");
  body.append(connectionText, target, connectionActions, setupHelp, form, result);
  panel.append(body);
  container.append(panel);
  function update() {
    const stage = skill.value;
    const matches = connection?.configuration?.spec_store === workspace;
    submit.disabled = !supportsSpecs || busy || !connection?.ready || !matches || Boolean(last) || stage !== "propose" && !spec.value;
    skill.disabled = spec.disabled = change.disabled = prompt.disabled = !supportsSpecs || busy || Boolean(last);
    setup.disabled = probe.disabled = busy;
    setup.hidden = Boolean(connection?.ready);
    setupHelp.hidden = Boolean(connection?.ready);
    changeLabel.hidden = stage !== "propose";
    change.required = stage === "propose";
    specLabel.hidden = stage === "propose";
    spec.required = stage !== "propose";
    specPreview.hidden = stage !== "propose";
    specPreview.textContent = `New spec: ${prefix}${change.value.trim() || "<feature>"}`;
    prompt.required = stage !== "apply";
    promptTitle.textContent = stage === "apply" ? "Prompt (optional)" : "Prompt";
    help.textContent = supportsSpecs ? HELP[stage] : "This store uses the legacy requirement format. Migrate it to role specs before running automations.";
    submit.textContent = `Run ${role.id} ${SKILLS[stage]}`;
    panel.setAttribute("aria-busy", String(busy));
  }
  function renderLast(message) {
    result.replaceChildren();
    if (message) result.append(el("p", "osb-run-error", message));
    if (!last) return;
    result.append(
      el("p", "", last.run_id ? `${SKILLS[last.stage]} submitted for ${last.spec_id}. Refresh status or open the run for its result.` : `The request for ${last.spec_id} may have started. Inspect automation history before starting another run.`),
      link(last.run_id ? "Open automation run \u2192" : "Inspect automation history \u2192", `/automations/${last.automation_id}${last.run_id ? `?run=${last.run_id}` : ""}`)
    );
    if (last.run_id) {
      const refresh = button("Refresh run status", refreshStatus);
      refresh.disabled = busy;
      result.append(refresh);
    }
    const another = button("Start another run", () => {
      if (busy || disposed) return;
      remember(null);
      renderLast();
      update();
    });
    another.disabled = busy;
    result.append(another);
    result.append(el("small", "osb-request-ref", `Request ${last.request_id}`));
  }
  async function connect(action) {
    if (busy || disposed) return;
    busy = true;
    update();
    connectionText.textContent = action === "setup" ? "Connecting role automations\u2026" : "Checking role automations\u2026";
    try {
      const value = await callRoleAutomation(host, action);
      if (disposed) return;
      connection = value;
      const matches = value.configuration.spec_store === workspace;
      connectionText.textContent = !matches ? "This store is not the configured automation store. Update role-workflow.json and reconnect." : value.ready ? "Connected \xB7 Propose, Update, Apply" : value.message;
      target.textContent = `Code project: ${value.configuration.workspace}
Spec store: ${value.configuration.spec_store}`;
    } catch (error) {
      if (!disposed) {
        connection = null;
        connectionText.textContent = error.message || "Cannot connect to automations.";
      }
    } finally {
      busy = false;
      if (!disposed) update();
    }
  }
  async function refreshStatus() {
    if (busy || disposed || !last?.run_id) return;
    const attempt = last;
    busy = true;
    update();
    renderLast();
    try {
      const status = await callRoleAutomation(host, "status", { automation_id: attempt.automation_id, run_id: attempt.run_id });
      if (disposed || last !== attempt) return;
      renderLast();
      result.prepend(el("p", "osb-run-status", `Status: ${status.status.toLowerCase()}`));
      if (status.error) result.append(el("p", "osb-run-error", status.error));
      if (status.conversation_id) result.append(link("Open conversation \u2192", `/conversations/${status.conversation_id}`));
      if (status.status === "COMPLETED") result.append(el("p", "osb-muted", "Refresh the requirement to read any source changes."));
    } catch (error) {
      if (!disposed) renderLast(error.message || "Cannot read run status.");
    } finally {
      busy = false;
      if (!disposed) {
        update();
        for (const control of result.querySelectorAll("button")) control.disabled = false;
      }
    }
  }
  skill.addEventListener("change", update);
  spec.addEventListener("change", update);
  change.addEventListener("input", update);
  panel.addEventListener("toggle", () => {
    if (!panel.open || opened || disposed) return;
    opened = true;
    renderLast();
    connect("probe");
  });
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!supportsSpecs || busy || last || disposed || !connection?.ready || connection.configuration.spec_store !== workspace) return;
    let input;
    try {
      if (skill.value === "propose" && specs.some((item) => item.id === prefix + change.value.trim())) throw new Error("This spec already exists. Choose a new feature name.");
      input = validateRoleInput({
        stage: skill.value,
        spec_store: workspace,
        requirement_id: requirement.id,
        context_change: requirement.change,
        role: role.id,
        change: requirement.change,
        spec_id: skill.value === "propose" ? prefix + change.value.trim() : spec.value,
        request: prompt.value
      });
    } catch (error) {
      renderLast(error.message);
      return;
    }
    const automation = connection.automations.find((item) => item.stage === skill.value && item.role === role.id);
    if (!automation) {
      renderLast("Reconnect the role automations before running this skill.");
      return;
    }
    const attempt = { request_id: crypto.randomUUID(), automation_id: automation.id, stage: skill.value, spec_id: input.spec_id };
    remember(attempt);
    busy = true;
    update();
    result.textContent = "Submitting one automation request\u2026";
    try {
      const response = await callRoleAutomation(host, "dispatch", { ...input, automation_id: attempt.automation_id, request_id: attempt.request_id });
      rememberResult(attempt, response.run_id);
      if (!disposed) renderLast();
    } catch (error) {
      if (!disposed) renderLast(error.message || "Unknown submission outcome. Inspect automation history.");
    } finally {
      busy = false;
      if (!disposed) {
        update();
        for (const control of result.querySelectorAll("button")) control.disabled = false;
      }
    }
  });
  update();
  return () => {
    disposed = true;
    panel.remove();
  };
}

// node_modules/marked/lib/marked.esm.js
function I() {
  return { async: false, breaks: false, extensions: null, gfm: true, hooks: null, pedantic: false, renderer: null, silent: false, tokenizer: null, walkTokens: null };
}
var y = I();
function W(l3) {
  y = l3;
}
var A = { exec: () => null };
function C(l3) {
  let e = [];
  return (t) => {
    let n = Math.max(0, Math.min(3, t - 1)), s = e[n];
    return s || (s = l3(n), e[n] = s), s;
  };
}
function h(l3, e = "") {
  let t = typeof l3 == "string" ? l3 : l3.source, n = { replace: (s, r) => {
    let o = typeof r == "string" ? r : r.source;
    return o = o.replace(x.caret, "$1"), t = t.replace(s, o), n;
  }, getRegex: () => new RegExp(t, e) };
  return n;
}
var _e = ((l3 = "") => {
  try {
    return !!new RegExp("(?<=1)(?<!1)" + l3);
  } catch {
    return false;
  }
})();
var x = { codeRemoveIndent: /^(?: {0,3}\t| {1,4})/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, endingSpaceTabChar: /[ \t]$/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, leadingSpaceTab: /^[ \t]+/, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] +\S/, listReplaceTask: /^\[[ xX]\] +/, listTaskCheckbox: /\[[ xX]\]/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, numericCharacterReference: /&#(?:(\d{1,7})|[Xx]([A-Fa-f0-9]{1,6}));/g, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (l3) => new RegExp(`^( {0,3}${l3})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: C((l3) => new RegExp(`^ {0,${l3}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)), hrRegex: C((l3) => new RegExp(`^ {0,${l3}}((?:-[ 	]*){3,}|(?:_[ 	]*){3,}|(?:\\*[ 	]*){3,})(?:\\n+|$)`)), fencesBeginRegex: C((l3) => new RegExp(`^ {0,${l3}}(?:\`\`\`|~~~)`)), headingBeginRegex: C((l3) => new RegExp(`^ {0,${l3}}#`)), htmlBeginRegex: C((l3) => new RegExp(`^ {0,${l3}}(?:</?(?:${N})(?: +|$|/?>)|<(?:script|pre|style|textarea|!--))`, "i")), blockquoteBeginRegex: C((l3) => new RegExp(`^ {0,${l3}}>`)) };
var $e = /^(?:[ \t]*(?:\n|$))+/;
var Le = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/;
var ze = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
var G = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
var Ae = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
var J = / {0,3}(?:[*+-]|\d{1,9}[.)])/;
var ce = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |fences|blockquote|heading|hr|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/;
var he = h(ce).replace(/bull/g, J).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/hr/g, / {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex();
var Ee = h(ce).replace(/bull/g, J).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/hr/g, / {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex();
var V = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/;
var Me = /^[^\n]+/;
var Y = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/;
var Ie = h(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", Y).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex();
var Ce = h(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g, J).getRegex();
var N = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
var ee = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
var Be = h("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][a-z0-9-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][a-z0-9-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", ee).replace("tag", N).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
var de = (l3) => h(V).replace("hr", G).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", l3).replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", N).getRegex();
var De = de(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/);
var qe = de(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/);
var ve = h(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", qe).getRegex();
var te = { blockquote: ve, code: Le, def: Ie, fences: ze, heading: Ae, hr: G, html: Be, lheading: he, list: Ce, newline: $e, paragraph: De, table: A, text: Me };
var le = h("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", G).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", N).getRegex();
var Ze = { ...te, lheading: Ee, table: le, paragraph: h(V).replace("hr", G).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", le).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", N).getRegex() };
var He = { ...te, html: h(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", ee).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: A, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: h(V).replace("hr", G).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", he).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() };
var Ge = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
var Ne = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
var ke = /^( {2,}|\\)\n(?!\s*$)[ \t]*/;
var Qe = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
var $ = /[\p{P}\p{S}]/u;
var B = /[\s\p{P}\p{S}]/u;
var Q = /[^\s\p{P}\p{S}]/u;
var je = h(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, B).getRegex();
var Fe = /[\p{Pi}\p{Ps}"']/u;
var ge = /(?!~)[\p{P}\p{S}]/u;
var Ue = /(?!~)[\s\p{P}\p{S}]/u;
var Ke = /(?:[^\s\p{P}\p{S}]|~)/u;
var We = h(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", _e ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex();
var fe = /^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/;
var Xe = h(fe, "u").replace(/punct/g, $).getRegex();
var Je = h(fe, "u").replace(/punct/g, ge).getRegex();
var Ve = /^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/;
var Ye = h(Ve, "u").replace(/openQuote/g, Fe).replace(/punct/g, $).getRegex();
var me = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)";
var et = h(me, "gu").replace(/notPunctSpace/g, Q).replace(/punctSpace/g, B).replace(/punct/g, $).getRegex();
var tt = h(me, "gu").replace(/notPunctSpace/g, Ke).replace(/punctSpace/g, Ue).replace(/punct/g, ge).getRegex();
var nt = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)";
var rt = h(nt, "gu").replace(/notPunctSpace/g, Q).replace(/punctSpace/g, B).replace(/punct/g, $).getRegex();
var st = h("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, Q).replace(/punctSpace/g, B).replace(/punct/g, $).getRegex();
var it = "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)";
var ot = h(it, "gu").replace(/notPunctSpace/g, Q).replace(/punctSpace/g, B).replace(/punct/g, $).getRegex();
var at = h(/^~~?(?:((?!~)punct)|[^\s~])/, "u").replace(/punct/g, $).getRegex();
var lt = "^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)";
var ut = h(lt, "gu").replace(/notPunctSpace/g, Q).replace(/punctSpace/g, B).replace(/punct/g, $).getRegex();
var pt = h(/\\(punct)/, "gu").replace(/punct/g, $).getRegex();
var ct = h(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex();
var ht = h(ee).replace("(?:-->|$)", "-->").getRegex();
var dt = h("^comment|^</[a-zA-Z][a-zA-Z0-9-]*\\s*>|^<[a-zA-Z][a-zA-Z0-9-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", ht).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex();
var xe = /\[(?:\\[\s\S]|[^\[\]\\])*\]/;
var U = h(/(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/).replace("brackets", xe).getRegex();
var kt = h(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label", U).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex();
var gt = h(/^!?\[(label)\]\[(ref)\]/).replace("label", U).replace("ref", Y).getRegex();
var ft = h(/^!?\[(ref)\](?:\[\])?/).replace("ref", Y).getRegex();
var ue = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\]){1,999}/;
var mt = h(/(?:[^\[\]\\`]*(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\]))){0,999}?[^\[\]\\`]*?/).replace("brackets", xe).getRegex();
var xt = h("reflink|nolink(?!\\()", "g").replace("reflink", h(/^!?\[(label)\]\[(ref)\]/).replace("label", mt).replace("ref", ue).getRegex()).replace("nolink", h(/^!?\[(ref)\](?:\[\])?/).replace("ref", ue).getRegex()).getRegex();
var pe = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/;
var bt = /[A-Za-z0-9._+-]+@[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/;
var Rt = h(/(?:mailto:email|xmpp:email(?:\/[A-Za-z0-9@.]+)?)/).replace(/email/g, bt).getRegex();
var ne = { _backpedal: A, anyPunctuation: pt, autolink: ct, blockSkip: We, br: ke, code: Ne, del: A, delLDelim: A, delRDelim: A, emStrongLDelim: Xe, emStrongRDelimAst: et, emStrongRDelimUnd: st, escape: Ge, link: kt, nolink: ft, punctuation: je, reflink: gt, reflinkSearch: xt, tag: dt, text: Qe, url: A };
var Tt = { ...ne, emStrongLDelim: Ye, emStrongRDelimAst: rt, emStrongRDelimUnd: ot, link: h(/^!?\[(label)\]\((.*?)\)/).replace("label", U).getRegex(), reflink: h(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", U).getRegex() };
var X = { ...ne, emStrongRDelimAst: tt, emStrongLDelim: Je, delLDelim: at, delRDelim: ut, url: h(/^emailProtocol|^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("emailProtocol", Rt).replace("protocol", pe).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: h(/^(?:[^a-zA-Z0-9](?=emailProtocol)|(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9](?=emailProtocol)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))))/).replace("protocol", pe).replace(/emailProtocol/g, /(?:mailto|xmpp):/).getRegex() };
var Ot = { ...X, br: h(ke).replace("{2,}", "*").getRegex(), text: h(X.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() };
var j = { normal: te, gfm: Ze, pedantic: He };
var D = { normal: ne, gfm: X, breaks: Ot, pedantic: Tt };
var wt = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
var be = (l3) => wt[l3];
function O(l3, e) {
  if (e) {
    if (x.escapeTest.test(l3)) return l3.replace(x.escapeReplace, be);
  } else if (x.escapeTestNoEncode.test(l3)) return l3.replace(x.escapeReplaceNoEncode, be);
  return l3;
}
function Re(l3) {
  return l3.replace(x.numericCharacterReference, (e, t, n) => {
    let s = t === void 0 ? Number.parseInt(n, 16) : Number.parseInt(t, 10);
    return s === 0 || s > 1114111 || s >= 55296 && s <= 57343 ? "\uFFFD" : String.fromCodePoint(s);
  });
}
function re(l3) {
  try {
    l3 = encodeURI(l3).replace(x.percentDecode, "%");
  } catch {
    return null;
  }
  return l3;
}
function se(l3, e) {
  let t = l3.replace(x.findPipe, (r, o, i) => {
    let u = false, a = o;
    for (; --a >= 0 && i[a] === "\\"; ) u = !u;
    return u ? "|" : " |";
  }), n = t.split(x.splitPipe), s = 0;
  if (n[0].trim() || n.shift(), n.length > 0 && !n.at(-1)?.trim() && n.pop(), e) if (n.length > e) n.splice(e);
  else for (; n.length < e; ) n.push("");
  for (; s < n.length; s++) n[s] = n[s].trim().replace(x.slashPipe, "|");
  return n;
}
function L(l3, e, t) {
  let n = l3.length;
  if (n === 0) return "";
  let s = 0;
  for (; s < n; ) {
    let r = l3.charAt(n - s - 1);
    if (r === e && !t) s++;
    else if (r !== e && t) s++;
    else break;
  }
  return l3.slice(0, n - s);
}
function ie(l3) {
  let e = l3.split(`
`), t = e.length - 1;
  for (; t >= 0 && x.blankLine.test(e[t]); ) t--;
  return e.length - t <= 2 ? l3 : e.slice(0, t + 1).join(`
`);
}
function q(l3) {
  return l3.trim().toLowerCase().toUpperCase().toLowerCase();
}
function Te(l3, e) {
  if (l3.indexOf(e[1]) === -1) return -1;
  let t = 0;
  for (let n = 0; n < l3.length; n++) if (l3[n] === "\\") n++;
  else if (l3[n] === e[0]) t++;
  else if (l3[n] === e[1] && (t--, t < 0)) return n;
  return t > 0 ? -2 : -1;
}
function oe(l3, e = 0) {
  let t = e, n = "";
  for (let s of l3) if (s === "	") {
    let r = 4 - t % 4;
    n += " ".repeat(r), t += r;
  } else n += s, t++;
  return n;
}
function Oe(l3, e, t, n, s) {
  let r = e.href, o = e.title || null, i = l3[1].replace(s.other.outputLinkReplace, "$1"), u = l3[0].charAt(0) === "!";
  n.state.inLink = true;
  let a = n.state.linkEmitted, p = n.state.inRawBlock;
  n.state.linkEmitted = false;
  let c = n.inlineTokens(i), d = n.state.linkEmitted;
  if (n.state.linkEmitted = a, n.state.inLink = false, !u) {
    if (d) {
      n.state.inRawBlock = p;
      return;
    }
    n.state.linkEmitted = true;
  }
  return { type: u ? "image" : "link", raw: t, href: r, title: o, text: i, tokens: c };
}
function yt(l3, e, t) {
  let n = l3.match(t.other.indentCodeCompensation);
  if (n === null) return e;
  let s = n[1];
  return e.split(`
`).map((r) => {
    let o = r.match(t.other.beginningSpace);
    if (o === null) return r;
    let [i] = o;
    return r.slice(Math.min(i.length, s.length));
  }).join(`
`);
}
function we(l3, e, t, n) {
  if (!e.includes("<")) return false;
  for (let s = 0; s < e.length; s++) {
    if (e[s] === "\\") {
      s++;
      continue;
    }
    if (e[s] === "`") {
      let i = n.inline.code.exec(e.slice(s));
      if (i) {
        s += i[0].length - 1;
        continue;
      }
    }
    if (e[s] !== "<") continue;
    let r = l3.slice(t + s), o = n.inline.tag.exec(r) || n.inline.autolink.exec(r);
    if (o) {
      if (o[0].length > e.length - s) return true;
      s += o[0].length - 1;
    }
  }
  return false;
}
var P = class {
  options;
  rules;
  lexer;
  constructor(e) {
    this.options = e || y;
  }
  space(e) {
    let t = this.rules.block.newline.exec(e);
    if (t && t[0].length > 0) return { type: "space", raw: t[0] };
  }
  code(e) {
    let t = this.rules.block.code.exec(e);
    if (t) {
      let n = this.options.pedantic ? t[0] : ie(t[0]), s = n.replace(this.rules.other.codeRemoveIndent, "");
      return { type: "code", raw: n, codeBlockStyle: "indented", text: s };
    }
  }
  fences(e) {
    let t = this.rules.block.fences.exec(e);
    if (t) {
      let n = t[0], s = yt(n, t[3] || "", this.rules);
      return { type: "code", raw: n, lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2], text: s };
    }
  }
  heading(e) {
    let t = this.rules.block.heading.exec(e);
    if (t) {
      let n = t[2].trim();
      if (this.rules.other.endingHash.test(n)) {
        let s = L(n, "#");
        (this.options.pedantic || !s || this.rules.other.endingSpaceTabChar.test(s)) && (n = s.trim());
      }
      return { type: "heading", raw: L(t[0], `
`), depth: t[1].length, text: n, tokens: this.lexer.inline(n) };
    }
  }
  hr(e) {
    let t = this.rules.block.hr.exec(e);
    if (t) return { type: "hr", raw: L(t[0], `
`) };
  }
  blockquote(e) {
    let t = this.rules.block.blockquote.exec(e);
    if (t) {
      let n = L(t[0], `
`).split(`
`), s = "", r = "", o = [];
      for (; n.length > 0; ) {
        let i = false, u = [], a;
        for (a = 0; a < n.length; a++) if (this.rules.other.blockquoteStart.test(n[a])) u.push(n[a]), i = true;
        else if (!i) u.push(n[a]);
        else break;
        n = n.slice(a);
        let p = u.join(`
`), c = p.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        s = s ? `${s}
${p}` : p, r = r ? `${r}
${c}` : c;
        let d = this.lexer.state.top;
        if (this.lexer.state.top = true, this.lexer.blockTokens(c, o, true), this.lexer.state.top = d, n.length === 0) break;
        let m = o.at(-1);
        if (m?.type === "code") break;
        if (m?.type === "blockquote") {
          let b = m, g = n.join(`
`), w = b.raw + `
` + g.replace(this.rules.other.blockquoteSetextReplace2, ""), f = this.blockquote(w);
          o[o.length - 1] = f;
          let M = w.substring(f.raw.length).replace(/^\n/, ""), v = M ? M.split(`
`).length : 0, Z = v ? n.slice(0, -v) : n;
          Z.length > 0 && (s = `${s}
${Z.join(`
`)}`), r = r.substring(0, r.length - b.text.length) + f.text;
          break;
        } else if (m?.type === "list") {
          let b = m, g = b.raw + `
` + n.join(`
`), w = this.list(g);
          o[o.length - 1] = w, s = s.substring(0, s.length - m.raw.length) + w.raw, r = r.substring(0, r.length - b.raw.length) + w.raw, n = g.substring(o.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return { type: "blockquote", raw: s, tokens: o, text: r };
    }
  }
  list(e) {
    let t = this.rules.block.list.exec(e);
    if (t) {
      let n = t[1].trim(), s = n.length > 1, r = { type: "list", raw: "", ordered: s, start: s ? +n.slice(0, -1) : "", loose: false, items: [] };
      n = s ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = s ? n : "[*+-]");
      let o = this.rules.other.listItemRegex(n), i = false;
      for (; e; ) {
        let a = false, p = "", c = "";
        if (!(t = o.exec(e)) || this.rules.block.hr.test(e)) break;
        p = t[0], e = e.substring(p.length);
        let d = t[2].split(`
`, 1)[0], m = t[1].length, b = this.options.pedantic ? oe(d, m) : d.replace(this.rules.other.leadingSpaceTab, (M) => oe(M, m)), g = e.split(`
`, 1)[0], w = !b.trim(), f = 0;
        if (this.options.pedantic ? (f = 2, c = b.trimStart()) : w ? f = m + 1 : (f = b.search(this.rules.other.nonSpaceChar), f = f > 4 ? 1 : f, c = b.slice(f), f += m), w && this.rules.other.blankLine.test(g) && (p += g + `
`, e = e.substring(g.length + 1), a = true), !a) {
          let M = this.rules.other.nextBulletRegex(f), v = this.rules.other.hrRegex(f), Z = this.rules.other.fencesBeginRegex(f), ae = this.rules.other.headingBeginRegex(f), ye = this.rules.other.htmlBeginRegex(f), Pe = this.rules.other.blockquoteBeginRegex(f);
          for (; e; ) {
            let K = e.split(`
`, 1)[0], H;
            if (g = K, this.options.pedantic ? (g = g.replace(this.rules.other.listReplaceNesting, "  "), H = g) : H = g.replace(this.rules.other.leadingSpaceTab, (Se) => Se.replace(this.rules.other.tabCharGlobal, "    ")), Z.test(g) || ae.test(g) || ye.test(g) || Pe.test(g) || M.test(g) || v.test(g)) break;
            if (H.search(this.rules.other.nonSpaceChar) >= f || !g.trim()) c += `
` + H.slice(f);
            else {
              if (w || b.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || Z.test(b) || ae.test(b) || v.test(b)) break;
              c += `
` + g;
            }
            w = !g.trim(), p += K + `
`, e = e.substring(K.length + 1), b = H.slice(f);
          }
        }
        r.loose || (i ? r.loose = true : this.rules.other.doubleBlankLine.test(p) && (i = true)), r.items.push({ type: "list_item", raw: p, task: !!this.options.gfm && this.rules.other.listIsTask.test(c), loose: false, text: c, tokens: [] }), r.raw += p;
      }
      let u = r.items.at(-1);
      if (u) u.raw = u.raw.trimEnd(), u.text = u.text.trimEnd();
      else return;
      r.raw = r.raw.trimEnd();
      for (let a of r.items) if (this.lexer.state.top = false, a.tokens = this.lexer.blockTokens(a.text, []), !r.loose) {
        let p = a.tokens.filter((d) => d.type === "space"), c = p.length > 0 && p.some((d) => this.rules.other.anyLine.test(d.raw));
        r.loose = c;
      }
      for (let a of r.items) {
        let p = a.tokens[0];
        if (a.task && (p?.type === "text" || p?.type === "paragraph")) {
          a.text = a.text.replace(this.rules.other.listReplaceTask, ""), p.raw = p.raw.replace(this.rules.other.listReplaceTask, ""), p.text = p.text.replace(this.rules.other.listReplaceTask, "");
          for (let d = this.lexer.inlineQueue.length - 1; d >= 0; d--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)) {
            this.lexer.inlineQueue[d].src = this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask, "");
            break;
          }
          let c = this.rules.other.listTaskCheckbox.exec(a.raw);
          if (c) {
            let d = { type: "checkbox", raw: c[0] + " ", checked: c[0] !== "[ ]" };
            a.checked = d.checked, r.loose ? a.tokens[0] && ["paragraph", "text"].includes(a.tokens[0].type) && "tokens" in a.tokens[0] && a.tokens[0].tokens ? (a.tokens[0].raw = d.raw + a.tokens[0].raw, a.tokens[0].text = d.raw + a.tokens[0].text, a.tokens[0].tokens.unshift(d)) : a.tokens.unshift({ type: "paragraph", raw: d.raw, text: d.raw, tokens: [d] }) : a.tokens.unshift(d);
          }
        } else a.task && (a.task = false);
      }
      if (r.loose) for (let a of r.items) {
        a.loose = true;
        for (let p of a.tokens) p.type === "text" && (p.type = "paragraph");
      }
      return r;
    }
  }
  html(e) {
    let t = this.rules.block.html.exec(e);
    if (t) {
      let n = ie(t[0]);
      return { type: "html", block: true, raw: n, pre: t[1] === "pre" || t[1] === "script" || t[1] === "style", text: n };
    }
  }
  def(e) {
    let t = this.rules.block.def.exec(e);
    if (t) {
      let n = q(t[1]).replace(this.rules.other.multipleSpaceGlobal, " "), s = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", r = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
      return { type: "def", tag: n, raw: L(t[0], `
`), href: s, title: r };
    }
  }
  table(e) {
    let t = this.rules.block.table.exec(e);
    if (!t || !this.rules.other.tableDelimiter.test(t[2])) return;
    let n = se(t[1]), s = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), r = t[3]?.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], o = { type: "table", raw: L(t[0], `
`), header: [], align: [], rows: [] };
    if (n.length === s.length) {
      for (let i of s) this.rules.other.tableAlignRight.test(i) ? o.align.push("right") : this.rules.other.tableAlignCenter.test(i) ? o.align.push("center") : this.rules.other.tableAlignLeft.test(i) ? o.align.push("left") : o.align.push(null);
      for (let i = 0; i < n.length; i++) o.header.push({ text: n[i], tokens: this.lexer.inline(n[i]), header: true, align: o.align[i] });
      for (let i of r) o.rows.push(se(i, o.header.length).map((u, a) => ({ text: u, tokens: this.lexer.inline(u), header: false, align: o.align[a] })));
      return o;
    }
  }
  lheading(e) {
    let t = this.rules.block.lheading.exec(e);
    if (t) {
      let n = t[1].trim();
      return { type: "heading", raw: L(t[0], `
`), depth: t[2].charAt(0) === "=" ? 1 : 2, text: n, tokens: this.lexer.inline(n) };
    }
  }
  paragraph(e) {
    let t = this.rules.block.paragraph.exec(e);
    if (t) {
      let n = t[1].charAt(t[1].length - 1) === `
` ? t[1].slice(0, -1) : t[1];
      return { type: "paragraph", raw: t[0], text: n, tokens: this.lexer.inline(n) };
    }
  }
  text(e) {
    let t = this.rules.block.text.exec(e);
    if (t) return { type: "text", raw: t[0], text: t[0], tokens: this.lexer.inline(t[0]) };
  }
  escape(e) {
    let t = this.rules.inline.escape.exec(e);
    if (t) return { type: "escape", raw: t[0], text: t[1] };
  }
  tag(e) {
    let t = this.rules.inline.tag.exec(e);
    if (t) return !this.lexer.state.inLink && this.rules.other.startATag.test(t[0]) ? this.lexer.state.inLink = true : this.lexer.state.inLink && this.rules.other.endATag.test(t[0]) && (this.lexer.state.inLink = false), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t[0]) ? this.lexer.state.inRawBlock = true : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t[0]) && (this.lexer.state.inRawBlock = false), { type: "html", raw: t[0], inLink: this.lexer.state.inLink, inRawBlock: this.lexer.state.inRawBlock, block: false, text: t[0] };
  }
  link(e) {
    let t = this.rules.inline.link.exec(e);
    if (t) {
      let n = t[0].charAt(0) === "!" ? 2 : 1;
      if (!this.options.pedantic && we(e, t[1], n, this.rules)) return;
      let s = t[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(s)) {
        if (!this.rules.other.endAngleBracket.test(s)) return;
        let i = L(s.slice(0, -1), "\\");
        if ((s.length - i.length) % 2 === 0) return;
      } else {
        let i = Te(t[2], "()");
        if (i === -2) return;
        if (i > -1) {
          let a = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + i;
          t[2] = t[2].substring(0, i), t[0] = t[0].substring(0, a).trim(), t[3] = "";
        }
      }
      let r = t[2], o = "";
      if (this.options.pedantic) {
        let i = this.rules.other.pedanticHrefTitle.exec(r);
        i && (r = i[1], o = i[3]);
      } else o = t[3] ? t[3].slice(1, -1) : "";
      return r = r.trim(), this.rules.other.startAngleBracket.test(r) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(s) ? r = r.slice(1) : r = r.slice(1, -1)), Oe(t, { href: r && r.replace(this.rules.inline.anyPunctuation, "$1"), title: o && o.replace(this.rules.inline.anyPunctuation, "$1") }, t[0], this.lexer, this.rules);
    }
  }
  reflink(e, t) {
    let n;
    if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
      let s = n[0].charAt(0) === "!" ? 2 : 1;
      if (!this.options.pedantic && we(e, n[1], s, this.rules)) return;
      let r = (n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, " "), o = t[q(r)];
      if (!o) {
        let i = n[0].charAt(0);
        return { type: "text", raw: i, text: i };
      }
      return Oe(n, o, n[0], this.lexer, this.rules);
    }
  }
  emStrong(e, t, n = "") {
    let s = this.rules.inline.emStrongLDelim.exec(e);
    if (!s || !s[1] && !s[2] && !s[3] && !s[4] || s[4] && n.match(this.rules.other.unicodeAlphaNumeric)) return;
    if (!(s[1] || s[3] || "") || !n || this.rules.inline.punctuation.exec(n)) {
      let o = [...s[0]].length - 1, i, u, a = o, p = 0, c = s[0][0], d = n === c, m = c === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (m.lastIndex = 0, t = t.slice(-1 * e.length + o); (s = m.exec(t)) !== null; ) {
        if (i = s[1] || s[2] || s[3] || s[4] || s[5] || s[6], !i) continue;
        if (u = [...i].length, s[3] || s[4]) {
          a += u;
          continue;
        } else if (s[5] || s[6]) {
          if (o % 3 && !((o + u) % 3)) {
            p += u;
            continue;
          }
          if (d) break;
        }
        if (a -= u, a > 0) continue;
        u = Math.min(u, u + a + p);
        let b = [...s[0]][0].length, g = e.slice(0, o + s.index + b + u);
        if (Math.min(o, u) % 2) {
          let f = g.slice(1, -1);
          return { type: "em", raw: g, text: f, tokens: this.lexer.inlineTokens(f) };
        }
        let w = g.slice(2, -2);
        return { type: "strong", raw: g, text: w, tokens: this.lexer.inlineTokens(w) };
      }
    }
  }
  codespan(e) {
    let t = this.rules.inline.code.exec(e);
    if (t) {
      let n = t[2].replace(this.rules.other.newLineCharGlobal, " "), s = this.rules.other.nonSpaceChar.test(n), r = this.rules.other.startingSpaceChar.test(n) && this.rules.other.endingSpaceChar.test(n);
      return s && r && (n = n.substring(1, n.length - 1)), { type: "codespan", raw: t[0], text: n };
    }
  }
  br(e) {
    let t = this.rules.inline.br.exec(e);
    if (t) return { type: "br", raw: t[0] };
  }
  del(e, t, n = "") {
    let s = this.rules.inline.delLDelim.exec(e);
    if (!s) return;
    if (!(s[1] || "") || !n || this.rules.inline.punctuation.exec(n)) {
      let o = [...s[0]].length - 1, i, u, a = o, p = this.rules.inline.delRDelim;
      for (p.lastIndex = 0, t = t.slice(-1 * e.length + o); (s = p.exec(t)) !== null; ) {
        if (i = s[1] || s[2] || s[3] || s[4] || s[5] || s[6], !i || (u = [...i].length, u !== o)) continue;
        if (s[3] || s[4]) {
          a += u;
          continue;
        }
        if (a -= u, a > 0) continue;
        u = Math.min(u, u + a);
        let c = [...s[0]][0].length, d = e.slice(0, o + s.index + c + u), m = d.slice(o, -o);
        return { type: "del", raw: d, text: m, tokens: this.lexer.inlineTokens(m) };
      }
    }
  }
  autolink(e) {
    let t = this.rules.inline.autolink.exec(e);
    if (t) {
      let n, s;
      return t[2] === "@" ? (n = t[1], s = "mailto:" + n) : (n = t[1], s = n), { type: "link", raw: t[0], text: n, href: s, autolink: true, tokens: [{ type: "text", raw: n, text: n }] };
    }
  }
  url(e) {
    let t;
    if (t = this.rules.inline.url.exec(e)) {
      let n, s;
      if (t[2] === "@") n = t[0], s = "mailto:" + n;
      else {
        let r;
        do
          r = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])?.[0] ?? "";
        while (r !== t[0]);
        n = t[0], t[1] === "www." ? s = "http://" + t[0] : s = t[0];
      }
      return { type: "link", raw: t[0], text: n, href: s, autolink: true, tokens: [{ type: "text", raw: n, text: n }] };
    }
  }
  inlineText(e) {
    let t = this.rules.inline.text.exec(e);
    if (t) {
      let n = this.lexer.state.inRawBlock;
      return { type: "text", raw: t[0], text: n ? t[0] : Re(t[0]), escaped: n };
    }
  }
};
var R = class l {
  tokens;
  options;
  state;
  inlineQueue;
  tokenizer;
  constructor(e) {
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || y, this.options.tokenizer = this.options.tokenizer || new P(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: false, inRawBlock: false, linkEmitted: false, top: true };
    let t = { other: x, block: j.normal, inline: D.normal };
    this.options.pedantic ? (t.block = j.pedantic, t.inline = D.pedantic) : this.options.gfm && (t.block = j.gfm, this.options.breaks ? t.inline = D.breaks : t.inline = D.gfm), this.tokenizer.rules = t;
  }
  static get rules() {
    return { block: j, inline: D };
  }
  static lex(e, t) {
    return new l(t).lex(e);
  }
  static lexInline(e, t) {
    return new l(t).inlineTokens(e);
  }
  lex(e) {
    e = e.replace(x.carriageReturn, `
`), this.blockTokens(e, this.tokens);
    for (let t = 0; t < this.inlineQueue.length; t++) {
      let n = this.inlineQueue[t];
      this.inlineTokens(n.src, n.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, t = [], n = false) {
    this.tokenizer.lexer = this, this.options.pedantic && (e = e.replace(x.tabCharGlobal, "    ").replace(x.spaceLine, ""));
    let s = 1 / 0;
    for (; e; ) {
      if (e.length < s) s = e.length;
      else {
        this.infiniteLoopError(e.charCodeAt(0));
        break;
      }
      let r;
      if (this.options.extensions?.block?.some((i) => (r = i.call({ lexer: this }, e, t)) ? (e = e.substring(r.raw.length), t.push(r), true) : false)) continue;
      if (r = this.tokenizer.space(e)) {
        e = e.substring(r.raw.length);
        let i = t.at(-1);
        r.raw.length === 1 && i !== void 0 ? i.raw += `
` : t.push(r);
        continue;
      }
      if (r = this.tokenizer.code(e)) {
        e = e.substring(r.raw.length);
        let i = t.at(-1);
        i?.type === "paragraph" || i?.type === "text" ? (i.raw += (i.raw.endsWith(`
`) ? "" : `
`) + r.raw, i.text += `
` + r.text, this.inlineQueue.at(-1).src = i.text) : t.push(r);
        continue;
      }
      if (r = this.tokenizer.fences(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      if (r = this.tokenizer.heading(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      if (r = this.tokenizer.hr(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      if (r = this.tokenizer.blockquote(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      if (r = this.tokenizer.list(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      if (r = this.tokenizer.html(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      if (r = this.tokenizer.def(e)) {
        e = e.substring(r.raw.length);
        let i = t.at(-1);
        i?.type === "paragraph" || i?.type === "text" ? (i.raw += (i.raw.endsWith(`
`) ? "" : `
`) + r.raw, i.text += `
` + r.raw, this.inlineQueue.at(-1).src = i.text) : this.tokens.links[r.tag] || (this.tokens.links[r.tag] = { href: r.href, title: r.title }, t.push(r));
        continue;
      }
      if (r = this.tokenizer.table(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      if (r = this.tokenizer.lheading(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      let o = e;
      if (this.options.extensions?.startBlock) {
        let i = 1 / 0, u = e.slice(1), a;
        this.options.extensions.startBlock.forEach((p) => {
          a = p.call({ lexer: this }, u), typeof a == "number" && a >= 0 && (i = Math.min(i, a));
        }), i < 1 / 0 && i >= 0 && (o = e.substring(0, i + 1));
      }
      if (this.state.top && (r = this.tokenizer.paragraph(o))) {
        let i = t.at(-1);
        n && i?.type === "paragraph" ? (i.raw += (i.raw.endsWith(`
`) ? "" : `
`) + r.raw, i.text += `
` + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = i.text) : t.push(r), n = o.length !== e.length, e = e.substring(r.raw.length);
        continue;
      }
      if (r = this.tokenizer.text(e)) {
        e = e.substring(r.raw.length);
        let i = t.at(-1);
        i?.type === "text" ? (i.raw += (i.raw.endsWith(`
`) ? "" : `
`) + r.raw, i.text += `
` + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = i.text) : t.push(r);
        continue;
      }
      if (e) {
        this.infiniteLoopError(e.charCodeAt(0));
        break;
      }
    }
    return this.state.top = true, t;
  }
  inline(e, t = []) {
    return this.inlineQueue.push({ src: e, tokens: t }), t;
  }
  linkInText(e) {
    if (!e.includes("[")) return false;
    let t = this.tokenizer.rules.inline.link;
    for (let n of e.matchAll(this.tokenizer.rules.inline.blockSkip)) if (t.test(n[0]) && e.charAt(n.index - 1) !== "!") return true;
    for (let n of e.matchAll(this.tokenizer.rules.inline.reflinkSearch)) {
      let s = n[0], r = s.lastIndexOf("[");
      if (!(s.charAt(0) === "!" || !Object.hasOwn(this.tokens.links, q(s.slice(r + 1, -1)))) && !(r > 1 && this.linkInText(s.slice(1, r - 1)))) return true;
    }
    return false;
  }
  inlineTokens(e, t = []) {
    this.tokenizer.lexer = this;
    let n = e;
    if (this.tokens.links && e.includes("[")) {
      let i = this.tokenizer.rules.inline.reflinkSearch, u = (a) => {
        let p = a.lastIndexOf("[");
        if (!Object.hasOwn(this.tokens.links, q(a.slice(p + 1, -1)))) return a;
        if (p > 1 && a.charAt(0) !== "!") {
          let c = a.slice(1, p - 1);
          if (this.linkInText(c)) return "[" + c.replace(i, u) + "][" + "a".repeat(a.length - p - 2) + "]";
        }
        return "[" + "a".repeat(a.length - 2) + "]";
      };
      n = n.replace(i, u);
    }
    n = n.replace(this.tokenizer.rules.inline.anyPunctuation, (i) => "+".repeat(i.length)), n = n.replace(this.tokenizer.rules.inline.blockSkip, (i, u, a) => {
      let p = a ? a.length : 0;
      return i.slice(0, p) + "[" + "a".repeat(i.length - p - 2) + "]";
    }), n = this.options.hooks?.emStrongMask?.call({ lexer: this }, n) ?? n;
    let s = false, r = "", o = 1 / 0;
    for (; e; ) {
      if (e.length < o) o = e.length;
      else {
        this.infiniteLoopError(e.charCodeAt(0));
        break;
      }
      s || (r = ""), s = false;
      let i;
      if (this.options.extensions?.inline?.some((a) => (i = a.call({ lexer: this }, e, t)) ? (e = e.substring(i.raw.length), t.push(i), true) : false)) continue;
      if (i = this.tokenizer.escape(e)) {
        e = e.substring(i.raw.length), t.push(i);
        continue;
      }
      if (i = this.tokenizer.tag(e)) {
        e = e.substring(i.raw.length), t.push(i);
        continue;
      }
      if (i = this.tokenizer.link(e)) {
        e = e.substring(i.raw.length), t.push(i);
        continue;
      }
      if (i = this.tokenizer.reflink(e, this.tokens.links)) {
        e = e.substring(i.raw.length);
        let a = t.at(-1);
        i.type === "text" && a?.type === "text" ? (a.raw += i.raw, a.text += i.text) : t.push(i);
        continue;
      }
      if (i = this.tokenizer.emStrong(e, n, r)) {
        e = e.substring(i.raw.length), t.push(i);
        continue;
      }
      if (i = this.tokenizer.codespan(e)) {
        e = e.substring(i.raw.length), t.push(i);
        continue;
      }
      if (i = this.tokenizer.br(e)) {
        e = e.substring(i.raw.length), t.push(i);
        continue;
      }
      if (i = this.tokenizer.del(e, n, r)) {
        e = e.substring(i.raw.length), t.push(i);
        continue;
      }
      if (i = this.tokenizer.autolink(e)) {
        e = e.substring(i.raw.length), t.push(i);
        continue;
      }
      if (!this.state.inLink && (i = this.tokenizer.url(e))) {
        e = e.substring(i.raw.length), t.push(i);
        continue;
      }
      let u = e;
      if (this.options.extensions?.startInline) {
        let a = 1 / 0, p = e.slice(1), c;
        this.options.extensions.startInline.forEach((d) => {
          c = d.call({ lexer: this }, p), typeof c == "number" && c >= 0 && (a = Math.min(a, c));
        }), a < 1 / 0 && a >= 0 && (u = e.substring(0, a + 1));
      }
      if (i = this.tokenizer.inlineText(u)) {
        e = e.substring(i.raw.length), i.raw.slice(-1) !== "_" && (r = i.raw.slice(-1)), s = true;
        let a = t.at(-1);
        a?.type === "text" ? (a.raw += i.raw, a.text += i.text) : t.push(i);
        continue;
      }
      if (e) {
        this.infiniteLoopError(e.charCodeAt(0));
        break;
      }
    }
    return t;
  }
  infiniteLoopError(e) {
    let t = "Infinite loop on byte: " + e;
    if (this.options.silent) console.error(t);
    else throw new Error(t);
  }
};
var S = class {
  options;
  parser;
  constructor(e) {
    this.options = e || y;
  }
  space(e) {
    return "";
  }
  code({ text: e, lang: t, escaped: n }) {
    let s = (t || "").match(x.notSpaceStart)?.[0], r = e ? e.replace(x.endingNewline, "") + `
` : "";
    return s ? '<pre><code class="language-' + O(s) + '">' + (n ? r : O(r, true)) + `</code></pre>
` : "<pre><code>" + (n ? r : O(r, true)) + `</code></pre>
`;
  }
  blockquote({ tokens: e }) {
    return `<blockquote>
${this.parser.parse(e)}</blockquote>
`;
  }
  html({ text: e }) {
    return e;
  }
  def(e) {
    return "";
  }
  heading({ tokens: e, depth: t }) {
    return `<h${t}>${this.parser.parseInline(e)}</h${t}>
`;
  }
  hr(e) {
    return `<hr>
`;
  }
  list(e) {
    let t = e.ordered, n = e.start, s = "";
    for (let i = 0; i < e.items.length; i++) {
      let u = e.items[i];
      s += this.listitem(u);
    }
    let r = t ? "ol" : "ul", o = t && n !== 1 ? ' start="' + n + '"' : "";
    return "<" + r + o + `>
` + s + "</" + r + `>
`;
  }
  listitem(e) {
    return `<li>${this.parser.parse(e.tokens)}</li>
`;
  }
  checkbox({ checked: e }) {
    return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox"> ';
  }
  paragraph({ tokens: e }) {
    return `<p>${this.parser.parseInline(e)}</p>
`;
  }
  table(e) {
    let t = "", n = "";
    for (let r = 0; r < e.header.length; r++) n += this.tablecell(e.header[r]);
    t += this.tablerow({ text: n });
    let s = "";
    for (let r = 0; r < e.rows.length; r++) {
      let o = e.rows[r];
      n = "";
      for (let i = 0; i < o.length; i++) n += this.tablecell(o[i]);
      s += this.tablerow({ text: n });
    }
    return s && (s = `<tbody>${s}</tbody>`), `<table>
<thead>
` + t + `</thead>
` + s + `</table>
`;
  }
  tablerow({ text: e }) {
    return `<tr>
${e}</tr>
`;
  }
  tablecell(e) {
    let t = this.parser.parseInline(e.tokens), n = e.header ? "th" : "td";
    return (e.align ? `<${n} align="${e.align}">` : `<${n}>`) + t + `</${n}>
`;
  }
  strong({ tokens: e }) {
    return `<strong>${this.parser.parseInline(e)}</strong>`;
  }
  em({ tokens: e }) {
    return `<em>${this.parser.parseInline(e)}</em>`;
  }
  codespan({ text: e }) {
    return `<code>${O(e, true)}</code>`;
  }
  br(e) {
    return "<br>";
  }
  del({ tokens: e }) {
    return `<del>${this.parser.parseInline(e)}</del>`;
  }
  link({ href: e, title: t, text: n, tokens: s, autolink: r }) {
    let o = r ? O(n, true) : this.parser.parseInline(s), i = re(e);
    if (i === null) return o;
    e = O(i, r);
    let u = '<a href="' + e + '"';
    return t && (u += ' title="' + O(t) + '"'), u += ">" + o + "</a>", u;
  }
  image({ href: e, title: t, text: n, tokens: s }) {
    s && (n = this.parser.parseInline(s, this.parser.textRenderer));
    let r = re(e);
    if (r === null) return O(n);
    e = r;
    let o = `<img src="${O(e)}" alt="${O(n)}"`;
    return t && (o += ` title="${O(t)}"`), o += ">", o;
  }
  text(e) {
    return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : O(e.text);
  }
};
var z = class {
  strong({ text: e }) {
    return e;
  }
  em({ text: e }) {
    return e;
  }
  codespan({ text: e }) {
    return e;
  }
  del({ text: e }) {
    return e;
  }
  html({ text: e }) {
    return e;
  }
  text({ text: e }) {
    return e;
  }
  link({ text: e }) {
    return "" + e;
  }
  image({ text: e }) {
    return "" + e;
  }
  br() {
    return "";
  }
  checkbox({ raw: e }) {
    return e;
  }
};
var T = class l2 {
  options;
  renderer;
  textRenderer;
  constructor(e) {
    this.options = e || y, this.options.renderer = this.options.renderer || new S(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new z();
  }
  static parse(e, t) {
    return new l2(t).parse(e);
  }
  static parseInline(e, t) {
    return new l2(t).parseInline(e);
  }
  parse(e) {
    this.renderer.parser = this;
    let t = "";
    for (let n = 0; n < e.length; n++) {
      let s = e[n];
      if (this.options.extensions?.renderers?.[s.type]) {
        let o = s, i = this.options.extensions.renderers[o.type].call({ parser: this }, o);
        if (i !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "checkbox", "html", "def", "paragraph", "text"].includes(o.type)) {
          t += i || "";
          continue;
        }
      }
      let r = s;
      switch (r.type) {
        case "space": {
          t += this.renderer.space(r);
          break;
        }
        case "hr": {
          t += this.renderer.hr(r);
          break;
        }
        case "heading": {
          t += this.renderer.heading(r);
          break;
        }
        case "code": {
          t += this.renderer.code(r);
          break;
        }
        case "table": {
          t += this.renderer.table(r);
          break;
        }
        case "blockquote": {
          t += this.renderer.blockquote(r);
          break;
        }
        case "list": {
          t += this.renderer.list(r);
          break;
        }
        case "checkbox": {
          t += this.renderer.checkbox(r);
          break;
        }
        case "html": {
          t += this.renderer.html(r);
          break;
        }
        case "def": {
          t += this.renderer.def(r);
          break;
        }
        case "paragraph": {
          t += this.renderer.paragraph(r);
          break;
        }
        case "text": {
          t += this.renderer.text(r);
          break;
        }
        default: {
          let o = 'Token with "' + r.type + '" type was not found.';
          if (this.options.silent) return console.error(o), "";
          throw new Error(o);
        }
      }
    }
    return t;
  }
  parseInline(e, t = this.renderer) {
    this.renderer.parser = this;
    let n = "";
    for (let s = 0; s < e.length; s++) {
      let r = e[s];
      if (this.options.extensions?.renderers?.[r.type]) {
        let i = this.options.extensions.renderers[r.type].call({ parser: this }, r);
        if (i !== false || !["escape", "html", "link", "image", "checkbox", "strong", "em", "codespan", "br", "del", "text"].includes(r.type)) {
          n += i || "";
          continue;
        }
      }
      let o = r;
      switch (o.type) {
        case "escape": {
          n += t.text(o);
          break;
        }
        case "html": {
          n += t.html(o);
          break;
        }
        case "link": {
          n += t.link(o);
          break;
        }
        case "image": {
          n += t.image(o);
          break;
        }
        case "checkbox": {
          n += t.checkbox(o);
          break;
        }
        case "strong": {
          n += t.strong(o);
          break;
        }
        case "em": {
          n += t.em(o);
          break;
        }
        case "codespan": {
          n += t.codespan(o);
          break;
        }
        case "br": {
          n += t.br(o);
          break;
        }
        case "del": {
          n += t.del(o);
          break;
        }
        case "text": {
          n += t.text(o);
          break;
        }
        default: {
          let i = 'Token with "' + o.type + '" type was not found.';
          if (this.options.silent) return console.error(i), "";
          throw new Error(i);
        }
      }
    }
    return n;
  }
};
var _ = class {
  options;
  block;
  constructor(e) {
    this.options = e || y;
  }
  static passThroughHooks = /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"]);
  static passThroughHooksRespectAsync = /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"]);
  preprocess(e) {
    return e;
  }
  postprocess(e) {
    return e;
  }
  processAllTokens(e) {
    return e;
  }
  emStrongMask(e) {
    return e;
  }
  provideLexer(e = this.block) {
    return e ? R.lex : R.lexInline;
  }
  provideParser(e = this.block) {
    return e ? T.parse : T.parseInline;
  }
};
var F = class {
  defaults = I();
  options = this.setOptions;
  parse = this.parseMarkdown(true);
  parseInline = this.parseMarkdown(false);
  Parser = T;
  Renderer = S;
  TextRenderer = z;
  Lexer = R;
  Tokenizer = P;
  Hooks = _;
  constructor(...e) {
    this.use(...e);
  }
  walkTokens(e, t) {
    let n = [];
    for (let s of e) switch (n = n.concat(t.call(this, s)), s.type) {
      case "table": {
        let r = s;
        for (let o of r.header) n = n.concat(this.walkTokens(o.tokens, t));
        for (let o of r.rows) for (let i of o) n = n.concat(this.walkTokens(i.tokens, t));
        break;
      }
      case "list": {
        let r = s;
        n = n.concat(this.walkTokens(r.items, t));
        break;
      }
      default: {
        let r = s;
        this.defaults.extensions?.childTokens?.[r.type] ? this.defaults.extensions.childTokens[r.type].forEach((o) => {
          let i = r[o].flat(1 / 0);
          n = n.concat(this.walkTokens(i, t));
        }) : r.tokens && (n = n.concat(this.walkTokens(r.tokens, t)));
      }
    }
    return n;
  }
  use(...e) {
    let t = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return e.forEach((n) => {
      let s = { ...n };
      if (s.async = this.defaults.async || s.async || false, n.extensions && (n.extensions.forEach((r) => {
        if (!r.name) throw new Error("extension name required");
        if ("renderer" in r) {
          let o = t.renderers[r.name];
          o ? t.renderers[r.name] = function(...i) {
            let u = r.renderer.apply(this, i);
            return u === false && (u = o.apply(this, i)), u;
          } : t.renderers[r.name] = r.renderer;
        }
        if ("tokenizer" in r) {
          if (!r.level || r.level !== "block" && r.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          let o = t[r.level];
          o ? o.unshift(r.tokenizer) : t[r.level] = [r.tokenizer], r.start && (r.level === "block" ? t.startBlock ? t.startBlock.push(r.start) : t.startBlock = [r.start] : r.level === "inline" && (t.startInline ? t.startInline.push(r.start) : t.startInline = [r.start]));
        }
        "childTokens" in r && r.childTokens && (t.childTokens[r.name] = r.childTokens);
      }), s.extensions = t), n.renderer) {
        let r = this.defaults.renderer || new S(this.defaults);
        for (let o in n.renderer) {
          if (!(o in r)) throw new Error(`renderer '${o}' does not exist`);
          if (["options", "parser"].includes(o)) continue;
          let i = o, u = n.renderer[i], a = r[i];
          r[i] = (...p) => {
            let c = u.apply(r, p);
            return c === false && (c = a.apply(r, p)), c || "";
          };
        }
        s.renderer = r;
      }
      if (n.tokenizer) {
        let r = this.defaults.tokenizer || new P(this.defaults);
        for (let o in n.tokenizer) {
          if (!(o in r)) throw new Error(`tokenizer '${o}' does not exist`);
          if (["options", "rules", "lexer"].includes(o)) continue;
          let i = o, u = n.tokenizer[i], a = r[i];
          r[i] = (...p) => {
            let c = u.apply(r, p);
            return c === false && (c = a.apply(r, p)), c;
          };
        }
        s.tokenizer = r;
      }
      if (n.hooks) {
        let r = this.defaults.hooks || new _();
        for (let o in n.hooks) {
          if (!(o in r)) throw new Error(`hook '${o}' does not exist`);
          if (["options", "block"].includes(o)) continue;
          let i = o, u = n.hooks[i], a = r[i];
          _.passThroughHooks.has(o) ? r[i] = (p) => {
            if (this.defaults.async && _.passThroughHooksRespectAsync.has(o)) return (async () => {
              let d = await u.call(r, p);
              return a.call(r, d);
            })();
            let c = u.call(r, p);
            return a.call(r, c);
          } : r[i] = (...p) => {
            if (this.defaults.async) return (async () => {
              let d = await u.apply(r, p);
              return d === false && (d = await a.apply(r, p)), d;
            })();
            let c = u.apply(r, p);
            return c === false && (c = a.apply(r, p)), c;
          };
        }
        s.hooks = r;
      }
      if (n.walkTokens) {
        let r = this.defaults.walkTokens, o = n.walkTokens;
        s.walkTokens = function(i) {
          let u = [];
          return u.push(o.call(this, i)), r && (u = u.concat(r.call(this, i))), u;
        };
      }
      this.defaults = { ...this.defaults, ...s };
    }), this;
  }
  setOptions(e) {
    return this.defaults = { ...this.defaults, ...e }, this;
  }
  lexer(e, t) {
    return R.lex(e, t ?? this.defaults);
  }
  parser(e, t) {
    return T.parse(e, t ?? this.defaults);
  }
  parseMarkdown(e) {
    return (n, s) => {
      let r = { ...s }, o = { ...this.defaults, ...r }, i = this.onError(!!o.silent, !!o.async);
      if (this.defaults.async === true && r.async === false) return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof n > "u" || n === null) return i(new Error("marked(): input parameter is undefined or null"));
      if (typeof n != "string") return i(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(n) + ", string expected"));
      if (o.hooks && (o.hooks.options = o, o.hooks.block = e), o.async) return (async () => {
        let u = o.hooks ? await o.hooks.preprocess(n) : n, p = await (o.hooks ? await o.hooks.provideLexer(e) : e ? R.lex : R.lexInline)(u, o), c = o.hooks ? await o.hooks.processAllTokens(p) : p;
        o.walkTokens && await Promise.all(this.walkTokens(c, o.walkTokens));
        let m = await (o.hooks ? await o.hooks.provideParser(e) : e ? T.parse : T.parseInline)(c, o);
        return o.hooks ? await o.hooks.postprocess(m) : m;
      })().catch(i);
      try {
        o.hooks && (n = o.hooks.preprocess(n));
        let a = (o.hooks ? o.hooks.provideLexer(e) : e ? R.lex : R.lexInline)(n, o);
        o.hooks && (a = o.hooks.processAllTokens(a)), o.walkTokens && this.walkTokens(a, o.walkTokens);
        let c = (o.hooks ? o.hooks.provideParser(e) : e ? T.parse : T.parseInline)(a, o);
        return o.hooks && (c = o.hooks.postprocess(c)), c;
      } catch (u) {
        return i(u);
      }
    };
  }
  onError(e, t) {
    return (n) => {
      if (n.message += `
Please report this to https://github.com/markedjs/marked.`, e) {
        let s = "<p>An error occurred:</p><pre>" + O(n.message + "", true) + "</pre>";
        return t ? Promise.resolve(s) : s;
      }
      if (t) return Promise.reject(n);
      throw n;
    };
  }
};
var E = new F();
function k(l3, e) {
  return E.parse(l3, e);
}
k.options = k.setOptions = function(l3) {
  return E.setOptions(l3), k.defaults = E.defaults, W(k.defaults), k;
};
k.getDefaults = I;
k.defaults = y;
function Pt(...l3) {
  return E.use(...l3), k.defaults = E.defaults, W(k.defaults), k;
}
k.use = Pt;
k.walkTokens = function(l3, e) {
  return E.walkTokens(l3, e);
};
k.parseInline = E.parseInline;
k.Parser = T;
k.parser = T.parse;
k.Renderer = S;
k.TextRenderer = z;
k.Lexer = R;
k.lexer = R.lex;
k.Tokenizer = P;
k.Hooks = _;
k.parse = k;
var gn = k.options;
var fn = k.setOptions;
var mn = k.walkTokens;
var xn = k.parseInline;
var Rn = T.parse;
var Tn = R.lex;

// node_modules/entities/dist/decode-codepoint.js
var c1 = [
  8364,
  0,
  8218,
  402,
  8222,
  8230,
  8224,
  8225,
  710,
  8240,
  352,
  8249,
  338,
  0,
  381,
  0,
  0,
  8216,
  8217,
  8220,
  8221,
  8226,
  8211,
  8212,
  732,
  8482,
  353,
  8250,
  339,
  0,
  382,
  376
];
function isInvalidCodePoint(codePoint) {
  return codePoint === 0 || codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111;
}
function replaceCodePoint(codePoint) {
  if (isInvalidCodePoint(codePoint)) {
    return 65533;
  }
  if (codePoint >= 128 && codePoint <= 159) {
    return c1[codePoint - 128] || codePoint;
  }
  return codePoint;
}
function codePointToString(codePoint) {
  return codePoint - 1 >>> 0 < 127 || codePoint - 160 >>> 0 < 55136 ? String.fromCharCode(codePoint) : String.fromCodePoint(replaceCodePoint(codePoint));
}

// node_modules/entities/dist/internal/decode-shared.js
var BASE91_INVERSE = /* @__PURE__ */ (() => {
  const table = new Uint8Array(127);
  let code = 0;
  for (let char = 33; char <= 126; char++) {
    if (char !== 34 && char !== 36 && char !== 92) {
      table[char] = code++;
    }
  }
  return table;
})();
function decodeTrieDict(input, resultLength, atomCount, dict1AtomCount, ngramCount, dictSize) {
  const base = 91;
  const inputLength = input.length;
  const twoCharBias = dictSize * (base - 1);
  let pos = 0;
  const readSlotCode = () => {
    const c12 = BASE91_INVERSE[input.charCodeAt(pos++)];
    return c12 < dictSize ? c12 : c12 * base - twoCharBias + BASE91_INVERSE[input.charCodeAt(pos++)];
  };
  const dict2AtomCount = atomCount - dict1AtomCount;
  const slotCount = atomCount + ngramCount;
  const single = new Int32Array(slotCount);
  single.fill(-1, dict1AtomCount, dictSize);
  single.fill(-1, dictSize + dict2AtomCount, slotCount);
  const start = new Int32Array(slotCount);
  const length = new Int32Array(slotCount);
  function decodeDelta(count2, off) {
    let previous = 0;
    let slot = off;
    const end = off + count2;
    while (slot < end) {
      const code = BASE91_INVERSE[input.charCodeAt(pos++)];
      if (code < 89) {
        previous += code;
        single[slot++] = previous;
      } else if (code === 89) {
        let runLength = BASE91_INVERSE[input.charCodeAt(pos++)] + 2;
        while (runLength--)
          single[slot++] = ++previous;
      } else {
        const next = BASE91_INVERSE[input.charCodeAt(pos++)];
        previous += 89 + // eslint-disable-next-line unicorn/prefer-minimal-ternary -- branches read a different number of side-effecting input bytes
        (next < 90 ? next * base + BASE91_INVERSE[input.charCodeAt(pos++)] : BASE91_INVERSE[input.charCodeAt(pos++)] * 8281 + BASE91_INVERSE[input.charCodeAt(pos++)] * base + BASE91_INVERSE[input.charCodeAt(pos++)]);
        single[slot++] = previous;
      }
    }
  }
  decodeDelta(dict1AtomCount, 0);
  decodeDelta(dict2AtomCount, dictSize);
  const references = new Int32Array(ngramCount * 2);
  let poolSize = 0;
  let ngramIndex = 0;
  function readNgramReferences(count2, startSlot) {
    for (let index = 0; index < count2; index++) {
      const slot = startSlot + index;
      const a = readSlotCode();
      const b = readSlotCode();
      references[ngramIndex * 2] = a;
      references[ngramIndex * 2 + 1] = b;
      ngramIndex += 1;
      start[slot] = poolSize;
      const entryLength = (single[a] < 0 ? length[a] : 1) + (single[b] < 0 ? length[b] : 1);
      length[slot] = entryLength;
      poolSize += entryLength;
    }
  }
  readNgramReferences(ngramCount - dictSize + dict1AtomCount, dictSize + dict2AtomCount);
  readNgramReferences(dictSize - dict1AtomCount, dict1AtomCount);
  const pool = new Uint16Array(poolSize);
  let write = 0;
  for (let index = 0; index < ngramIndex; index++) {
    for (let half = 0; half < 2; half++) {
      const source = references[index * 2 + half];
      const value = single[source];
      if (value < 0) {
        let read = start[source];
        const readEnd = read + length[source];
        while (read < readEnd)
          pool[write++] = pool[read++];
      } else {
        pool[write++] = value;
      }
    }
  }
  const out = new Uint16Array(resultLength);
  let outIndex = 0;
  while (pos < inputLength) {
    let slot = BASE91_INVERSE[input.charCodeAt(pos++)];
    if (slot >= dictSize) {
      slot = slot * base - twoCharBias + BASE91_INVERSE[input.charCodeAt(pos++)];
    }
    const value = single[slot];
    if (value < 0) {
      let read = start[slot];
      const readEnd = read + length[slot];
      while (read < readEnd)
        out[outIndex++] = pool[read++];
    } else {
      out[outIndex++] = value;
    }
  }
  return out;
}

// node_modules/entities/dist/generated/decode-data-html.js
var htmlDecodeTree = /* @__PURE__ */ decodeTrieDict("!}.&u%}'&}*'~!6*)%&,~!J~!J~%L~y<~!R,~~%Lu~~#GD~~#|)1#%}^%}2%+#.##%##%}&%##%'#%##&%#%#'%#&#%#&#'#%%#&#%##%#)%''%&%#%#'%#%%#%%}%%%#%#&(23#%%#&-%0%('1#(##%#'##+%'*.:1}#%#6-+(%'%%#%%%}#L'2351&('%}&/N'(0(/*-%(%%}#'+&T%7.2}#&%&#%#36/5##%&%%#&#%%#))2%%##%&&'0~!#*+&'%1~!%).'3q?&%'1~!.##%6(~!+%%%(Gw'rT~!E#<nA%#jZ~!H%(~!42##~!*31&~!G%U~#)5~#`3~!J~!Z~%]~%Y~%C~!q~!u~#kz~%#~!6'~!D~!U~!?~#T~!c%~!G#'~%7|~!G~!J~!G&~#pb~(Df}#%}*&}#%##%##%##&#-}&'#'&%#.++}%mI,#,@&(}*%}*'%&##&#%##%}&0}#.},U},%}+%}&%}#%##&}B%(}(%}+%)})%##%#&}&%##%&}<%}>%#%&}*%}(%}9%}/%})%}*%}*%}?&}&%}3%}&*#%})%#%#)}#&#-#+*%E%%'%'#%}#*V##&##I}#&&##%&%#&&Qf%%))w/0+&%#(#.%-''''++++7}>%4'',##1,#%#&%##&#'##&#*#9)%&%}#*}%,#+P(%A&%#'&##wSD',9E00#y#@}(+}&%&>~!#~!X}#*}(&&}(&}(,%}%&#+&}#&}I%#%}%)#(},'%#*}4%%#%}(''}#/##(##),%-##%%)#&}(.}&%#&}%%}*&#%},&&}&%}#%*'#%})%}D&}&%}-&}6&#&}-,%}#%})-(~+`~,=?~I9'9%~!,#%})%})%}@%}?%}(~!?~#<~#pP~#BG~#=1#%K+~#?#~%;)~#A~#mF1~#A'~'X%'~#lR~#N~'N~#r~#m#-~#i'?%#'%~#B%##%,%#~#_%#0%~#]732~,w~2+#:&#%&'0%&>%}#>##F+)#%&&#(+_}4&}-%}(&}@&}O7Fdf0@+/v4}&WU##&/0#&'('B#%}.%}'+#%}#%%&#&%#%##+#&#)#6#'#.},%}c%},%#%##%&#&%#&~#>'*-.%##%##%}#%%}%'~#)D1}#%*&~#_%%'(~#S2%'.}#~#=##*'*-%}&'%'##&&~'E%.#&~#M4}%%##&'%#~#O1##%&#'+~#<B%##%%'%+~#;#@%}#&%#&&%#(~#H1}'%'##&&~#?A}&'~#D#%32}'&&&&~#[}'(#%}'~#;C})&}%%#%~#=&%,3}%'(#%%~#^'#&&)#%'~#Y%-~#d-%'~#^%%&#&&&}#~#b~2t*&'~&(~&@~0%~e~3}%*''0})&}+~!9##-}#%-hD*)1fC#%/&/fB#40~!+#)*4~!+~!K'&:~!/*7~!.#~!H~!L':~%x&~!H#~!*~%1~!I#~!+A~#p'~!F~~#-#~,,(~.Z~!V~%;'B'mq-W~!N~%I%#&&#&}#%},%%}'%}+X#%}#&}(%}'%}<%}#%}%%'}'%}:~![)9@~%>~#UA%-%##&~!C%~!-.9:~!1~!-^2/:a~!y,D*J#-5)/4~%23,~#G~!L1~!0X3`~!2+~!!0-~&E~!W~!o,>Y&]~%cZx_&~#O*9#A#'#+I'%#)~!0B*-5A+-((F&*M#)(-7-5+'-3a5Vi~!Y~!?+[)%3),ERHm~!+:D,VG.+)?fB%%*(%)'(#&80%1'8`K8?`+'Z#&O&'H5#*9)A%%5&3))0%39+.*7#()&&*=4@**L)<'_&*+..;(#*+)./&0#3)%')-8(4ixD(&.}%,('aI:,)%,k2231T)I'#/-W7,/'Q#.'Y24+h')37</31&83##&0#),H(?'&?/1##%#&&#%''-%&&&#(&''&#.-'%#%%(,')*'&#&#'##%(%(#%('#&##%%%%('%#%#%%#%#&%##h>w+v<ayvyvcg.uuhKr}g/v|g>u9i[~>g5uI~=RvdwEg;v/g;uk!!TTSx]@RT!U!#!@VBRUU!'UTe-d0c`e&gSdicedFcrdTaqb.kYcAohdYd@a3e+d}dMdtd.aJ#bqcK`dle/e.e'dwdPdodddjbEb}ogd^ofdpduc6j?l%d{drdqc)d7bacOdQ%T#Y)X.sR[yH>6Vyv3[xwLu>vo'!*.[yBacahoj>6Rew3[xqdZa#!a&#^(X-[yG>6Vyu3[xvg3sEr|g.u/Ri9db0T#^(Xa)!-[y;>6Vylg4wKs{JwNZt3@3r=c4Z([xlg;wKt!cpq's@v7A'*a(a+!-a#[y<3Dt?3Dt'>6Vym3[xmg9rxsNJwLZt4~?r?db1T#`-!(Xa,!0[yS>6Vz%NuQs.g4wKtnJwNZtS@3r>c4Z([y%g;wKtrdga8!a(!#&T*Y-Xa#!a0<or[yc3Dtq>6Vz43[y3JwNZtf@3s!Ju}!%Dti:pm3c_%X#tjB5pkd6q!r]u?voC'*-a.a2!0a&a+[yI3DtI3Ds~3DtH>6Vyw3[xx;:s#~<5pKJwNZtE@3r~d`a)!a2T#a.(!+U.X1[yT3Dt`3Dtv>6Vz&3[y&g9rxwzcxstPu.<rAJwLZtT~?r@dZa%!a.&^*Za(/Reu[ya>6Vz23[y1g3sEr}wkg{NuQRg{ci(U#5@b`~,cg#U(2WnH5wugcRh7dX#T(Y,a'Ta!!a,[yZ<]mj>6Vz,3[y+Pv#5ReZKu+=,%!H}7ABwkaS?Rh:BcW(X#<]mrj:ubv/ARekdg%!(!a.*Ta(Y.X1!#sP>Rl*Dt6[y>>6Vyo3Wf*jOvuumvuRgRJuq*!:9<B@bX~3jVv&v@s@5Re[d/rQt{uAvo&a&a*)a2!,0Wf!3Dt0=Bs'>6Re}3[xy~<5s%JwJZt1~Gs)c;&!#2sJkNuXvzq7rxu,Re8dka4!a8(aEZ+a@Y.X1Xa)[yd=Bs(3DtP>6Vz53[y4cX#X&Re:avRe9~<5s&JwJZtQ~Gs*i^rzvdRg+Jv{%!2sbB@bX}kdga,!Za?&^*T1/!a'Dt+[y6>6Vyf3Wf%g/u;s4hGu6?Rh-JvZ,!c%#&RoX54Rivj7uyvf8RgTKvZB%*!2sGh<vu5Rgq<=C::9bb~#dZ#T&Ta6Y.X*Dt>[y93Wf)coZ(T,6VyifluvRgC@95@B@bX~/hFu34cC#T,k/unq8w8Q5RkUklwQuzunq8w8Q5Rk8d/rJu?v8w9)-&!a0a;a&aIWejg3sEr/h1s<DtDJvyZqY5aws3Jvy!&Wei~Hr1:au5@Bag>23E~5c:Z&bX};kKv?w&unuVu5Rjc;>bs)#~@:Rh.=ay<a]C;b`}Vd6s/t{uAvoaxa()!a,a7%-a#a2Dt,[yF2Wo[>6Vyt3[xuNuPRi&NuPwpi#RoWh?vf8Ri%Jv]!%Ri:KvxD!.'2WeAjZu`q9rxu,Re7woeAg-unLq(qA_/*2Wg_g3u5q^9:4E}/jTrxrzv=Wkkd~0UX#^^Xa-a1a5T&a=U1a'*aEa]!a*aPaA-adok[y54Rn>;:p3~Dp5g9rpsFNvZqjg3uJp4~<5p0Pw;5qlJwNZt*@3p1Pw:5p/Ou!5p2JvG'!6Vye=<qnJvh_[xhg3v,Rh3kOwOw-sDuev/Re^dha[a%!%!a+#Ta7)-5TaCaO!aka!a)sf[yb2>Rl!9ARiq5E}Qg=ucRkBE|oJrJ_@Wk~@Wk{JrJ_@Wk|@WkyJrJ_@Wk}@WkzJvO_[y2g-vMRmiKuYC!)&>Ri;>Ri<@3RkNc](X#@9Rk=g5vuRmhKvDB!+'=]meg3u4Rmgd)#Y'Vz3CARmfd`a+!%T'!+#Ta1Ta6TaM-sTDt9[yA9sYd'%Y#s[[xpj:ueunaXRgEjRq,v-vuqdd2'`#6Rev<32@5>:2<E}5xIo9a*X#Y(;5RePJvD_g>vyRgNj8w)v8<wggs:RgXiZt|vjx,hSq3ah!-(~@:Ro/Ou!5RhWj^v(pyw8unRhUdx-UY#^Ua.a3a70!)%UX1TaDa)'omRiRRhE[y:3Dsz=Br,>6Vyj3[xkg6ruwjcqsrPw;5r*Ku]D'Zt-@3r(~?r.i[vwv]dU1a--U#`a4(g/vsRhPOu!5RhLj:rmu9Wo!~@:wdh@g/vsRiTjXuvvNr}:RhBj^v(pyw8unRn]dz1UYa'a+^Y(!aETZalaRY.Ta?a4[yDJw1!#qLsW>6Vyrfzq-pLflpwRe|Js>%!Dt@3Dt&Jvy_[xs~HrnjMuwpsw'RecKu+D#'!t<~Grl~?rjg5u-x,gwp{ah!-(~@:Rg~Ou!5Rh'jXuvvNr}:Rh#cW#X/c;&!#2sLi[v7u7RgpJv)(!iLrxu,Re6j7v@s@5Se[e7d`aW!Za(a`T.a#!a3!&aDa-!9)Dt_=6s+3[x~~DR|h~DS6avhGun5RkZj3w)v-]mkKunB!&*]kb97R|i<ARk<c:Z(6Vy}Juh'!wziMRoS:F|vkLuauJv5vtvQRh1d='T+Y#VyO~DR|jcF#T'7R|g97R|kJv3'!ay<Rj,Jvh&!:ReXcsa6*a+#a#_aIRf9aLRf?c,Z&Rf5Rf7c.Z&Rf;Rf>cQ#%T'p-Rf8Rf=ct#%'(*!,p,Rf4p+Rf6Rf:Rf<d~'Ua%U*^UYa(!a,-!#a4YaTalaEX0a8a<Weo3Dt/3Dsx=Br93Wen~Dr;~<5p<JwNZt2@3p=Pw:5p;Ou!5r3c7&!#:p>3Ds}KvGB)_6Vyk2sM=<r7x'eovA(!hFu1ARf}cV#X&@r5j6rvwQa^Rf3c=Za'wkghJv__g;unRggA53B9=b^}%j6uduo5Jq;!(hIv%2Re`Ou4ARe_e%a#^^^Xa&!a*a2!&a6YaP!*ad!#a:aE/5Rn?[y@>6Vyp;:pE~DrY~<5pBJwNZt8@3pCh=rt3rWPw:5pAJup_[xoNuPpF9c!#'45pD5ARn)d8#X'X*3@rU72s]h>v<<sSjJpqvewOJq/(!hNw'5ReBk0s2u3w/w'5ReE5@Jq.!a+JQ!&WeU23d(#Y&RjG5]jBk!u7w&u0udARjEe#+^^^Ub#!a2/a`Z(agT1!a-a;|@TaG!aS[yV=Re~fow'RguNuPRe?bz#'>RoUWeL>:Cbb|?JwPZtVg6ruRmzJvD'!6Vz(g/vmRh~Jvy_[y(g9voRgyx*cy(#2>Ri2B9b]~9kIw9u7rluJu3Rg]dI#a%UY'@=p%CAx.gQZ&RhwwygtRm{x5g_Z'+ABqR9Woa=Bp&dV#^*Xa'!&@o{g4v]Rk;Jv{!%Rk[wkkiA5RkiwwfUB=x,fUuqC&*!>RfTg8v0RfV~ARfSd;rJsAuAv9wR'ae+/aO!a@aza/a#[yQ@Wg!2Wemg3sEr0JvB_g>uvReWg2v+Re=KupB_+[y!2AbY~-~Hr2AJwD!(h<~El>h<~El?Kun@+_:9b`}Kg-v/Ri3g;vtwyk_9]k_d=&T#*U.6qh@Ab`|K9:H|CJv[!&3Dtex'fDwC%!Rf[9WlMd[(^X,!a%Z06Vz!@WgBg=v~Rgvg,QRe@awd,#Y+jTv|Q~EfWj]uNr|~FRfXdy#Y&^Ua%!aO.!(a)Ua;=!a@aKap!a-,a!Ta]a[rSa]p?[y82sK=Bq~;:p:~<5p8Pw:5p7d'#Y'Wf(;RnRi[u4w&RgJJvG'!6Vyh=<r#ijuuv/sIKuYD'ZtG@3p9~Gr&d2#`(g<vtRgFj`u5w&rqpxRf2CJuY!+:wfnTOu!5Rg}jNs1ucv&RfwJvA!&3@q|BDcC#T,k/unq8w8Q5RkTklwQuzunq8w8Q5Rk9dga#!a'!a=#a0!:+Tb*b@aO.a4!aba8aFJv^}?!VyR~Dr<g;u%Rn.~<5p[x'e`wNZtR@3p]Pw:5pZhNvjBp.woe_g5u-r4JwF!%DtO3:ooc7&!#:p^3DtpLuGw(!+%)Dtk6Vz#2sd=<r8d'#Y([y#<x3gJt`w@!)%}MRiowzikRij=]ilxAf3,U(#B2Rf#g0v-Rm[ck{`U#]giKv3>)!&6Ri154s,KuGB_%@r68r:dJ|t`#X(9<E|u2@H|rx3gJu?w'!+'1Nu7Reg4=H~+9<wxgY95Rm]xLggZ-`(X}U2:Ri4h<uOawRmsJv__5@bb{jbV~3dka#a'a]!,#a+U=a>b6a3b%!/aKa/)!arwve^VyJ;:pR~DpTg3uJpS~<5pOPw;5qmPw:5pNOu!5pQJvG'!6Vyx=<qoJvA!{~Jup!%@qk7Rn/KvyD!}''[xz;>wkh'?Rh,x8gyt`w5D!&),(SgyccRgztJ@3pPB5p#d'(Y#<]mmifubw&RgoJvE&!82s^JvF&!8Rf,ADb]~;x=h'rNu]vK!,%'*0RnORh)4Rh*AqQg-vaRnNg;wHwkh'ba~4cE#Ta*x3gctyw@'!+%RnFRnD<4Rn@hFvK5RnCxWg[#`&a0Ua()`1Rm75Rg[c]%X#qi8Rg^NvdRj>BwzgZauwji7Rm6A4wgg]d1#&(*,.0a#Rm;Rm<Rm=Rm>Rm?Rm@RmARmBe%#^^^Xaea?aC/b+(,!a+a#!a/!>a&Ta<aKbD!2wphBRnk[yPw}hE|.=Br-3Dtm>6Vy~g6urRf.x,hPrNav!%'RnqRo%Ro#Nu;q[Pw;5r+JwNZtM@3r)d'#Y'Weh;xChL#`&RnmRnoKu}>%(!Rne~Bs-;2wjcussJv+'!aYSO}6@B<5?ba~8LrNvj!.%*ROwungw~ng~:9;Ri^>wtnig;wHRnixDh@|(UZ.x1h@|)!#:2<H|*xHn]#-UX'3Ro)z=iT}6ARns=Bwsn_wpnaRncw]aR(#UXa&Ua*a/=]iPd'#Y&Ro'WnXf{QRm2hNvj]nZd`'T~&1`{|`#9b]{}c:'!#Wl{>@=be}]?cl{{U#:5Abb}Jds#^YaF!a*b4a#a3aPa>&Tb!bH!*a_!Eau?/a&RjY<]gj>6Vz*;:pe~DrZg,QRj1JwNZtX@wihspcJvZ&!VyX9WmOJu|!|N2WmHJvh&!]ht~Bpbcn&T(!#RmQ<s7Nu;padH#X'`+WmJ@>RmKCARhnKup=!)&Wf+:RhqNuPpf9c!#'45pd5AwghpARn(Ls@w!%,)!RmP@Wfe<E|IJva!&WmNg8vsRmLd`*.`#Y'Xa!axRn*]hrA8Rhug5s@rXg8u!RmMd8#X'X*3@rV72smdI*#UY&RmICARho~GsgxVgd)Ta'U-Y&Xa!T#RnEWnA@Wffg1uDRi0hFvK5RnBxGnG&#`%owp)@wsf+bX}Ze-*1!a*^^^Ua|!#a.aq&Ya2!a>.a6!a:aO`aJDtL[y`@Wg#>6Vz12@wzoYRoZNuPRi!NuPRhzg=ucRi,@=b`{Yg=ucRi-ACJvB!&Sh[ebSh]ebi`wUuFRm4Jw2_[y0JvB!.<Ju(!&SoG}6Shd}6<Ju(!&SoH}6She}6Kur@._g5vHRieJvx!{L2G{Kx6gd'T#?Rh82Wi5cZ#X(g1w)Rm5dW-Y(Ta#!a)!#aYa=wnfE=su2>>bU{0j9udv:<svj8uQv-7RgHdE%#^'sq9sp=>Bb_{TJv`!&g/r|snj6v(us5d,#Y(56H}[978H}]Jw5!&g1rushJvB!+j;v{u5?zDhd}6}bj;v{u5?zDhe}6}ce*#`(^^^a[aea!=!a6a*aoXb1a.!aAbL!b>,b'aL!aV@Wf|2Wlg3[y/JwNZt^@3piPw:5pgJunZou3@rsJva&!Vy_g<v~Rm#JvG'!6Vz0=<r{Ju{%!:pj@WfsiXuJu3Rm:JvZ&!WfA~Bph@c4Z&Dtwax5rubx(#:awRk1@d,#Y&RfjRfid1#,Y(@Wfp2Wlrg5s@ryKu[@!,'=]ig9wlk?Rk>g5u-rqJvy'!@9RkQcH(T#=>Ri~@<wkj(Wj(KuZB*!&<7rw@9RkRcH(T#=>Ri}@<wkj)Wj)dg(Ta2Xa9X#`-!a*CARhg@@=I}d9x;c~#X%so=<sj>2@@=aybb}XjWv0Q~EfEj3vLv;<d,#Y(56H}`978H}_dgaPaFa'a/!#a3Y0a_a;a|!1(a7-[yE3[xt;:pJNvZrrg3uJrvJwNZt=@3pIh=rt3rxPw:5pGOu!5rpJvG'!6Vys=<rz@c4Z&Dt(ax5rtJvZ!&~BpH@wsfNg-vaRlNci*U#=<wei<F}a5@Jq.!a*JQ!%@qZ23d(#Y&RjH5]jCk!u7w&u0udARjFd/prq=tyvpaEa(a:.!a1aZ(@@=I}:9wpd%=<sX55w_h}@@=I{t=ay<aU@@=I}T=ay<2@@=I})?C9:9au@9Cb]}DP~=x-fAZ(2Wl1=ay<aU@@=I}>5@d##Y+jTv|vV~EfFj]uNpn~FRfGdgaK!Z2&!a8a-Tb({E!acTbM*!a(DtY[yYd'%Y#sl[y*hHvh>Re5x2c{Z}.j4uCvcawRiMd+#X+_x&d!},<5RkX;2Hzw@x,gavfB-!{CcF&T#Roe;RodwWbBg5urRgaKvHC*_6Vz+<4opieuew&Rmq@d]&Y)X,T#X0Rh}<BqP=4qS9:ReMg/ujReNJw0!/<Jui%!bd{kawwnemRelAxUa?a3#*.&UX(Ya+a/RhvRnQ<o}9Wmtd-#Y&RgSRmw9;Rmxay=Rmyg-vaRmuxEhSrNu,v-voC!%(aR.a(a7+1Ro1>Ro5CE{A9b]{@;5x#eO{:g;urRi+KrNA!%(Ro3>Ro79;Ri_Ku@>{;&!x%gX|{KunA_+g5QRj/g3u5Rj#g>uERj%wio/xRhS&!,!#^1U}wba{8>>@=be}qC@:D5ba{7Ku+A&!}x?ba}t>>@=be}se(aA^^^Uat!b0#{pa+awUazbGa#aLb9bgaWac'a5TbS=Br!d1#`%scp_Jvl!#rT>Re0JvX&!VyN=H{Fcm#U&:pY=ReaJv2&!]h0=]nUJvG'!6Vy|=<r%JrM_=]h2@Wlud'#)U'Wf'b]{i=]h/Jvh!&~BpWg=v]RnMx+ny#'Nu;pVwjnu=]nwxJnx,T#`&Reqwjnt=]nvieu9vrRjLLuYwP(#+!th@wih5pX~Gr'g5v/Rh4KunA'!-CARnP@wwiN:Rm_9x'cvw>!|l=<saKvAA!0&3@q}>w^e1bp#&Re2Re3BDx7gH#T|f5H|eKuZ>!%(:qNAH{]Jv6!+3B2B9=b^{X<5<B92:E{ZLvhwA(a;a%!igQuyRmad+#Y}m@3Rh5d8#X'X*:AqUAHzmaxwbh<aXRnVcF}RT#Nw&cj#U(BWnug/vsRntdka)(a3+.Zb7aYYan1!bVa@Xa}[y^@b[{G=H{+hFu73Rj&Pv#5ReQcK%T#sig1v{Rj'Ku+D#'!t]~Grm~?rkKuMB!01d5#`'Vy.ta3Dtu~Hroc8#'{^45s85AwZbP&!#Rn!wghxWn#KvEA!)&2RlA2RlBx:h|#(T,=]j09Wobz>x]z/@awRoTd+#Y(az]hFhCrm4d,#Y+jTv|Q~EfMj]uNr|~FRfOdCa!Xa9_X#@<plJvf!%b`{(9;Rgwc;.!#2x7cw#T|UDb]|T5Ju={(!=@E{&Jv)&!Ab`{'awJvf!~*>>@=be{#KuY>!+&4Ezyi[ugv&RjIdea+T)#UXa&T-T&a!Rh9auRmW=]kLg5vuRn+g3u4Rn-Ow6ARn,hHus5xNk?#UX(U~)/g8v0RkD~AwkkF?Ri.OuNBwkkA?Ri/d|a2`a*^UYa.!aBTZaTa'Xa;!(!2!-a#b2[yC>6Vyq3[xr2Wi?g1rusVh%s?DtF~<5rbJs;%!DtBfswKtCj[uvuSsEu3RgVx3o:u+wN'*Zt;@3rd~Grh~?rfg8w)Lq)qE&-a%!>bI|`jWv0vV~EfCjTv|vV~Ef@j]uNpn~FRfBcK#T']gWNu7x,k7q4ai(0!hHv8<RhmkMu9vrsBuev/RhlCJvB!,g<v{wchh~@:Rhji[vrv{wchi~@:RhkdS&a5UY#Ta!RgPwwiI5BwciI~@:Rh`x'iJvj'!5]iJPu8Bwch]~@:Rhach)U#h3rp]gLh@t|Ax,hTq3ah!-(~@:Ro0Ou!5RhXj^v(pyw8unRhVd|)`,^UYas!a?/a2Z'a^Ta{Tb7Ta(a#!a,Wf&9sZ3DtAadamov=Bqt3[xig8vsRm~>waiL2b`{QJv*_Ouv2qgj<v]v2BqfdR'X*X#Y-@3qr~Gqv~?p6hHv-]glPup5Lq+q?_%*b_{qF{n9b^{rOu4ARhpKvCD!+&~Bqp:5Dbb}nwoiKl&unuTuBv]v+ueunaXRf0=Jvh!0nKufu8v1w&w7q%w&uHrz:Rgnj5w,uxDJq/(!hNw'5ReCk0s2u3w/w'5ReFd>Za&!*UaA=<wkgsRnSJv^!%Refifw3vyRgOKu_B'!,<]gkiiu:w&Rh<=C@a^<B57@2F{[<B5@aW:=3away9A5aW=<B=C@a^<B57@2F{Ie-#`(^^^bCara.b8aza6!/bZ,!adTbnTbOb+aFaS!aAT9@Wf~2Wli3Dtl2@d,#Y&RfnRfmJwJZtN~GqyJva&!VyMg<v~Rm%iXuJu3Rm9Jv[_=]ih9wlkDRkCd1#`(@Wg>2Wls3cH#T(@<Rj*=>Ri|b~'#23s9h<~El.d'#Y&Dtxi^rzvdRl#d*#U%(o|B2s`hJwSaxRmDKv4B&!1:Rmdd5#`'Vx}to~Hq{x'f1v3(!BA5ba|bJv_&!Wfug1v]ReIdO+U/Y#&G}-8wze=Rh{g1v]ReHg/uQRf/by#)ibQwERl/cH#T(@<Rj+=>Ri{cNu+vlax-!(#a0qa9<Rii2;;bU{H;x<i=&X#Rk`<4wwi=C9H~8xAI(Y#<azRi@45wXI<B9;5bb~7dL(X#Xa(+!aL6Vy{g5QqOau:5au2@ay547EzbxOcU(UX-T#Ta#:Cbb|A?wjh/b_|SOw6ARgtihr}u7Rhy<d1#T)X1@@=I|~=ay<2@@=aybb}Sj3vLv;<d,#Y(56H}A978H}@dGpvs@uAu`vcw9*!aFa+ai%(b!aXa8.a?a[ozWey=sU2@G}Nch&U#Rf_WexKu+D#'!t:~Gr`~?r^j]uNr|~FRg*j^psurwJt|RmcKv)@&!)7Rkv~Br[@wxfO:Rl3co#U'6Rezj_q#vIuavjRltwzeyh@vr5JqD0!>aY?C9:9au@9Cb]}9cl#U*5;5<H||jbuus1ucv&Rfvg1v~d/pppzqFr^a--a~!aMat1(hFv;Wiz@@=Izoj5uuv-7Rix~Cw`fk2WlVcZ#X,k)u3vWs@u2]ktg;wEx'fBq(_2Wg/jTv|vV~EfoJv]!15x'hzqG!(P~EfU~CRl_j6v(us5x4i-#T(2WmZ?C2F|d>Kq<aj1!*jTqIsBv=Wl`~Cw`fi2WlWj`v0u*~>RlR=c>Z,k#u3vWs@u2]kr<c1Z+jTqIsBv=Wla~Cw`fm2WlXdmb3!a{(arZa`bkTa%TbQTa-a9+c'!aM!/[yL=Bqug.w'RifhFvyDRj.g>vgwyk^9]k^Jv3_@WfbAARkhJw2_[x|JvB_wkoIRoKwkoJRoLd'(Y#<]gm=<9<H|yd'%_X#skDtb3awwqkgNulRkgdB#^',9:p'hJwSaxRmEBwVb8@4=H|qLu+w50&!)@3qs~?pU>Awwn;;Rn=c:Z'ARn<=<qwKvC@!/&~BqqJv6!&]eVb^z^xRge'/a%+^`#Sge}6<4Rn3=]n0Pw2>Rn8Jw0!&>Rn:>Rn6cY#a7+!a&=<wkaNw~h3z_c5Z{=wjh#=]nLKv^D!&)Vyz=bW|swYb<WetcG#T(2wxa@qVx@gD#Y&b^|V5JwG&!5bb|pg/w&RgD@x=kHs=uAvn!a%%/'+RmSRh694Ro`g-vaRmRhHv-]mlxCcS#`&ba~.5cD#Ta)P~=d,#Y(56H{>978H{Dd_#{2^Y%_+qbbb{6g3sERhsbU{?dfa.,`a(Xa<!aiX#(55RiG54RiHcI#T'WiU3RiVNvdwtfcRlKNvdd,#Y&RlHRlExQgf.1*^T'X#Sgf}6Wn4=]hfPrk>Rn7Jw0!&>Rn5>Rn9Lunw?&a2!,5<oq@@wqfdRlJj5Q~=d,#Y(~ARfcOuN]fdDKw;ay(}i!547E}j?cI#T(@5bV}iCbV}hdv(^^Tb?a40,b##Tbo!a*bR!a<b|a/!aKai!aU[yK=]o^g:v>ReGJwPZtK<7Rh+h<~El,Pv#5ReR@awwxjCg,ulRjDJv6&!]j!z?aQeeg>w=Sh<eeJw;!&axEzOg,Qosc!#*:wkeJ]eJ>x'h-u(!%Ro.w~h.zPdNZ(X,Ya![x{;9ReY;wkgxRiF:x?ap#Y&RmUg<s2Rkod]+UY0TZ'!a&A9sw<=bczLNvuw{gqzNhJwSaxRmCKuLay!#&s_Rf-55b^{uJvZa!!c%#(55Ri654wmiu5RiuawLu,vp!+}^%b_}Y9;wkgxba}o>A9:=b^}zKuh=a''!3awRk3c*'!#aHRk6c+Z&Rk5Rk4Jv)&!awRjSawd9*`#0?C2@EzMj8u<uJ5RmbjQrquJu3x,k>uq@_+=ayb^|W~ARkEOuN]k@7dhzV^X/X&a-#zRzSb`zXcJzTT#2WkVKvDBzW!%FzY9;5bbzWjQrquJu3Jw3%!b`zU=ayb^zQd:#X(T-a!6Vyywxh}=b]{Jg=u1RiAdGp~qHtzv!w(wA+a+a;<!aJaYai'anasb(=azRmV:Cbb{MLq2vb!%')RjuRjrRjtRjqx3jnqCw3!%')Rk(Rk+Rk&Rk)Lq2vb!%')Rj{RjxRjzRjwLq2vb!%')RjsRjpRjfRjex3jcqCw3!%')Rk'Rk*RjkRjl9<CbbzfOu4ARhxLq2vb!%')RjyRjvRjhRjgx=joq*uKvb!%')+-Rk.Rk%Rj~Rk-Rk#Rj}x=jdq*uKvb!%')+-Rk,Rk!Rj|RjmRjjRjidAq&qKs@uAv8Aa.'*-a@a&0!aM@a5[y73Dsy3Ds|3Dt):wxgI2sHJwJZt.~Gqxwsf0ikrzt}Rl0Jvy_[xj~HqzKv_A|D!&WfP8axRoVcf,U#k(v]v+ueunaXRf1Ju}'!g8u#Ri=jQw!sCunLprq>!,')~<5qeGzq9F{W=c##%s5au:5aU3CBE|;d4#X(D!a&6Vygx(b;#(=]ed?C2F{N<capoq2r[a&!aPa9,'Pw;5s:@@=I|,55w_h|@@=IzcP~=x'fCqB_2Wl2>aU@@=I|1OuNBc1Z+jTqIsBv=Wlc~Cw`fl2WlZ~AcTa%!Z+jTqIsBv=Wlb~Cw`fh2WlYk+uNqJsBv=WlSg,u3dca3#UXaMYa)TaB-=cM|7T#<bI}l5@B932:aV2G{BOuNBJq:|M!5Ezt=<B=C@a^<B57@2F{v>cB{/T#=ay<bI{3Jv6!a.6BKq0ah&+!5E}HP~Ef{978BaU@@=Iza<7d#.Y#978BaU@@=IzH~AJq0!(@@=IzG978BaU@@=IzFe,aU*Y&^^^bvJb,b:bFad!a,c2Ta>aL.bo6!a#CbTa'T#Re{2Wlh2@G{yg6t~Ro_NvdRfticuRQRllJv3&!x&c|zs@Jw3!%RflwpfkRlpKuL;%(!Re<@G|C2GzdhIvuBwgjAg-u0RjAKQB%!(GzZ@G|5NuuRl7d='T+Y#Vy[g<v~Rm!==G|>JvA!)@wma=]m1ifuaw&RmnLs@vT'!|/+[y,g:v>ReTJw1!#qX=x!eC{bLu+wT&)ZtZauq_~Graci&U#F|89:r_Lupvq!.)&2RlG8RfaC=x!eF{_h?rpWlmd&'!#X|&]k::xJey#`'T|+<E|&2@H|%dE#(^,g;u.RiEg6vjRiC9xCkA{O|zY#g=ucRmXKs0@!&*@G|m@awRknJuh!,3d(}gY}eJvj!%Rm):Jw3!%Rm+Rm-Ls0w(&!a(a#@b[|6cZ#X'7RkxWgAOu4ARn'dH'U#Y*Vz-Wm'CARm}d]*#a%^a*T'aK!a<9bV{PC=p*Jw4!&SgxcbB5r]idw(wBRmF7xFkt#&`(Rm/Rm8E|!JuY_9:Rl5=wrgr2:bbxd@xXfB(a*#T+!.X0X1Ta/a'T&RlDRfL>RlyARl9b[z[>RfZ:RlL:RfRwlg/ARl;9;RlxKv,A/!%7s69<74=BA5ba{-8Bde#`a<XaKYa1,a'P~=wxfB2bZ}}?C972@@=I}r8@55B9;5bb}G978B2@@=aybb}3j3vLv;<Jw3&!>Rfk=ayb^}4~Ad1#`*@@=aybb{w2@>==<bbz]dx+UY#^UaF!a9!bB'Ya1.!ajXa#%olRhD[y=3Dt#Ov5BrHKuMB%!(Rf^Wep~HrJwkiQjKr|~FRg)Ku+D#'!t5~GrF~?rDdV)UY,Z/_7RkuG{<~BrBg,rlsO:235B@bX}|d?a1!#`(6Vyn5@d##Y+jTv|vV~EfIj]uNpn~FRfH7Lq2vb1!a9-978BaU@@=Iz9978BbU}#~AJq0!(@@=Iz8978BaU@@=Iz7~AJQ|}!978BbU}!JvkaK!AdUa21-U#`a+(g/vsRn~Ou!5RPj:rmu9WhOjXuvvNr}:RhAj^v(pyw8unRn[kPr}p|u7vwv]RiSBd;pppzq@qHQa?(b.!a.a`@.|xa(hFv;Wiyj5uuv-7Riw~Cw`fg2WlU978BbU|wOuNBJqG!(P~EfD~CRlQcZ#X,k)u3vWs@u2]ksg;wEx'f@q1_2Wg.j]uNpn~FRfqJv]!15x'h{qG!(@@=IzK~CRl^j6v(us5x4i,#T(2WmY?C2F{1>Kq<aj1!*jTqIsBv=Wld~Cw`fj2Wl[j`v0u*~>RlT=c>Z,k#u3vWs@u2]kq<c1Z+jTqIsBv=Wle~Cw`fn2Wl]dn1#c(a(b^a2!b/bAT(bj!aDa7bu,a_a{c0!2T0g:v>ReD2@G{42@G{5~DpM~<5rc=Bx6i>{RT#RnI@zCx]y]z:2Jv[!zr5Awyk]9]k]dD(Y+X#6Vz.g=wKtgwhaCwgmTWj2Lu,w%_+/[y-B;b^xeg3u3Rj-2@bX{*KrJ<!+'@Wg(g?QRlC@Jv`!%b[zIwsfII}8JQ_@w|kW|=Jv(%!AqcOuNBJvEzh!bYzjLs@wP#(0!oy@>RkdJwMZtc3Dtd@BcG#T'9bWxg2@2Fznd*#Y+;2x'c}w<zizixNgwa#Z'U+!/!a'!a+w~g~z6wcn{Rn}wcnzRn|5Rh%=]nJg5vuRmvNvdRlvcprJu}w*az*a#!%.a.'Bot9qT]kj@Wg'ay2Gzv@Jv`!%b[zEwsfHI}1;ck#Ux`<Cbbx_Lu+w!a&0*!wko*wwo,So,}6Juqxf!E}PigQuyRm`d3(`#8>Rn%:A5B;bZ~%KvhCa!a2!x>k7#Uxb@b{#xaRk7Jw0!)>wwhlShl}6>wwhmShm}6CJvB!.x'hhvj{!!5Bwkhhbaz}x'hivjz~!5Bwkhibaz|xEhTrNu,v-vpD!a%&/)a3a.,%Ro2t[CE{)@3re9b]{%wjo09:rgc:Z&Ro6=<riifuaw&RmoKrNA!%(Ro4>Ro89;Ri`dSaL'UYzxZb)7Rka3xRhT&!,!#^1U}vbaz{>>@=be}yC@:D5bazzKu+A&!}{?ba}y>>@=be}wxBh[t`u~vJvr!%a!a()a,a0a4RoC=]o;Ju(!%RoGRhdwjh`=]oAg>w#Ro?g5vuRo=NvdRl|Ku]C.!&;RoEJvB!%RoORoMBx'h[v+_?w~h`}~5?w~hd~!xKh]oiptu-utv.vp!#%&a30a@a'a+(a/aOp(o~p!RoDJu(!%RoHRhewjha=]oBNvdRl}g>w#Ro@g5vuRo>c[#X']o<CauRoRAd-#Y':RkpauRoQKu]C.!&;RoFJvB!%RoNRoPBx'h]v+_?w~ha}t5?w~he}ue!/UbhYacXaW^Tc&a;b:a-c/#b&aja1(!cL+!bKbt!bmcRc9aIc?8[yW3Dtt94Rg`Jv}!&SiRMzBhEebShEMNuPRe>x7gL#TzuwjirRipc<Z&>on;>z=h-MSh.Mwqczx'a7vj&!>Re4@=ResJt__NuPRi*NuPRi)j]uNr|~FRfzKrJ>_+@Wfy@Wf]2WocKrJ<!+'@Wg%g/QRl@@Jv`!&awRl<wsfFIzgLu(w*!.*&ShBMwvhIRhI9;RhNx1hK'!#Sn]Mx1hK~0!#:2<H~7cNu+w7D*'1ZtW>Rn1~?rOc:Z&Rn2=<rQ<7wjh&=BSnLMc]#X(6Vz)w[b=a!U#9wzgMc3#&(RgMRitRis<x,gKt`ax!&+SioM=BSilMc3#&(RgKRinRimKurB,!&SiQMzBhDebShDM6BJQ!(P~Efx978B2@@=I}WLrJw!!,a*&@G}O@9wkibRid@@x'fKwC!&SlDMSfLMjUv~Q~EfKKv3@a+!(hFv-]mpx/hYZ(C5RiWz<o/MwkhY?So/M@x,gbvfB*&!SgEM:SoeeehFu3:Rgbda(,^TZa)X/7Sg[eb:2RgI~BrMC@wgkc:wwkcRerx3h(uUvK!&*,SnOM4Sh*MArRg;wHRh(x=h;rJvPwI!a4',a'0@Wg&=BSh/Mg>w=Rh=g3w*wwgGRgGcW(X#;Sg}M2Gzk@Jv`!&awRl=wsfGIz`dKZ*T'Y-:RhR7RhQg5u-p`j6v(us5d,#Y+~Awkia?RicOuNBwkibba}Ld6p~tyu_vbAa'a+!a/'a3aEa8a!>Sh,ebJv{!&Sh@ebSaReb9;SgwebNuPRi(NvdRl)NuPRi'hHu^<Rm^Jvv_@Wl(g;u1Si/ebKu'B&!*Sh?eb@Wl'z@aPeb95Si.ebcpputyvjB)!,&a+0a%ShAMWeK@G}C@WfJ9;RhMwvhH9w{ia}ix,hJvRA1(!zAn[MRhHx1hJ~*!#hFv(BSn[MBJQ!(@@=I~'978B2@@=I}2db.Ua<'X}+T#a0XaG2G}E;wkg|wuh!Rh!x,hZu,@)!&So0MVy)C5RiXACJvB!&5RiY5RiZg8w)cG}*T#2@bU}=KsA>(!a.3wkhZba~(x,h^u(A!&(SoCMRhb5Bz=h[eb?w~hb~6x,h_u(A!&(SoDMRhc5Bz=h]eb?w~hc~6e)aA1T#T,^^^c-bMb&blcPaP(a/!0!bA=b5c@a(!bfbrc#2afwmhARnjwchORnp2Wlf3DtsNvdRl-2@wpa<]m0bx(#:awRk2@Jw3!%RfhwpfgRlnKQB%!(G{V@G|'NuuRl6d='T+Y#VyUg<v~Rl~==G|<Jv+'!aYShC}6@B<5?ba~8@Jw3'!g2QRljhLrpWlOd+#Y'g.w'rIg>w*wgj@g-u0Rj@Lu+wT&)ZtUauq]~GrGci&U#F|39:rELrNvj!.%*RhCwunfw~nf~:9;Ri]>wtnhg;wHRnhx3hDs@v~!/+'@Wfr@9RkSNu&Rlo=@<5GzoKs0@_+@Wl+@awRkmJuh!-3d(}pY#qWJvj!%Rm(:Jw3!%Rm,Rm*de&!1U-U#`)Re;@G|.@9Ri82@wjfvRlq=@<5GzpLvOvr!).&2RlF8Rf`C=x!eE{.Jw3_g2QRlkhLrpWlPde(!#U{s,UXa*Ta'[y'g:v>ReS;x0PZ&RnlRnn~HrKJw1}f!=x!eB|2w]aP(#Xa&a*Ta.Ua2a7=]iOd'#Y&Ro&WnWg;u.RiDg6vjRiBNvdRlzhNvj]nYJuW_2Wm3x)kFze{9d])!a.!,Y01!#&aC!a3RndC=ox~BrC@2b^{pg,rlse7x'ksuq!%Rm.E{xidw(wBRmGx9o+)X#wwo-So-}69:Rl4@xSf@a#XZ'X)X,Ta(/ARl8b[xc>RfY:RlI:RfQwlg.ARl:9;Rlwdn'#^XafaQa1X1TaHTa)@b[{zcZ#X'7RkwWg@Ou4ARn&x)kG#{,g7u/RkGdH'U#Y*Vz'Wm&CARm|bx#(A]gUbUzJj9Q~=d,#Y(56H}l978H{U7d,0#U*2>ABb_xZ978BbU{e~AJQ{g!978BbU{hxMh?ad{oUYZ.x1h?{l!#:2<H{mx3n[t{vl!,&a%3Ro(z=iS}6ARnr=Bwsn^wvn`Rnbd`*T}B0!#^X'BG{c9b]{a>>@=be}F?JvS!&BG{d7BG}(Bde#`a1X,Ya@!a'P~=wxf@2bZ}I56B2@@=aybb}08@55B9;5bb}<j3vLv;<Jw3&!>Rfg=ayb^}&OuNBKuLA!)a!P~=x#fD{f2@>==<bbzl?C972@@=Ix^d6rSu,v7w*C(0a)a6#B+a%!sQ[y?3Dt%3[xn~<5rLOu!5p@Ku+D#'!t7~GrP~?rNKvlaya7'!h+v-5qMg=t|cd,U#5AAaa5Abb{S@52B5@a[@52B5Gx[iXueu;d<#`a(!/549C;ag>23ExY5@Dah89b^~689Jv)!~2b[~1Lv'w(%*!a#bX|aPrmawRe]keu7uhv-q6rxu,q`xTo]/a5aU!bNaDXbi!b-!ao!b<bwA!#5@B932:aV2G|:d-)Y#hJrL>RhG<7@C5<H|_=Cau:5aj5@B932:bJ|ng>vIbs)#?C2F|9jPv0w.vISh-MKvUaz(.!9ABbb|[5;5<H|Eg>unwfh;9:4E|YjQsBt|vjx'hYq3!(?C2F|J:2<BaY?C2F|GOu!5x,g|p{ah!-(?C2F|c9:4E|OjXuvvNr}:Rh&i[w*t|cd+U#jJvsu)vsSn~Mkfrmu9p}u7vwv]So!McW#Xa!ax5@A5aY:5;5<H|>kJv~vYrquJu3x4ib#T)2@SmZM?C2F|Bj:rmu9@xPhI(a*a#U#`a3-5Abb|L~@:RhK9:4E|0@52B5G|#C::aY?C2F|-:2<BaY?C2F|.5Jvk!a)javYrquJu3x4ia#T)2@SmYM?C2F|HAxPhH(!a#U#`a*-5Abb|4~@:RhJ9:4E|R@52B5G|F:2<BaY?C2F|Sc^#Xa2j=Qq5CJvB!-g<v{z;hhM?C2F|Zi[vrv{z;hiM?C2F|XKsA>!a)-g<v{z;h[eb?C2F|]i[vrv{z;h]eb?C2F|^iZu.vix,hZq3ah!.(?C2F|QOu!5ShXM:2<BaY?C2F|P", 13494, 2713, 49, 25, 61);

// node_modules/entities/dist/internal/bin-trie-flags.js
var BinTrieFlags;
(function(BinTrieFlags2) {
  BinTrieFlags2[BinTrieFlags2["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
  BinTrieFlags2[BinTrieFlags2["FLAG13"] = 8192] = "FLAG13";
  BinTrieFlags2[BinTrieFlags2["BRANCH_LENGTH"] = 8064] = "BRANCH_LENGTH";
  BinTrieFlags2[BinTrieFlags2["JUMP_TABLE"] = 127] = "JUMP_TABLE";
  BinTrieFlags2[BinTrieFlags2["VALUE_MASK"] = 8191] = "VALUE_MASK";
})(BinTrieFlags || (BinTrieFlags = {}));

// node_modules/entities/dist/decode.js
var CharCodes;
(function(CharCodes2) {
  CharCodes2[CharCodes2["AMP"] = 38] = "AMP";
  CharCodes2[CharCodes2["NUM"] = 35] = "NUM";
  CharCodes2[CharCodes2["SEMI"] = 59] = "SEMI";
  CharCodes2[CharCodes2["EQUALS"] = 61] = "EQUALS";
  CharCodes2[CharCodes2["ZERO"] = 48] = "ZERO";
  CharCodes2[CharCodes2["NINE"] = 57] = "NINE";
  CharCodes2[CharCodes2["LOWER_A"] = 97] = "LOWER_A";
  CharCodes2[CharCodes2["LOWER_X"] = 120] = "LOWER_X";
})(CharCodes || (CharCodes = {}));
var TO_LOWER_BIT = 32;
var CONSUMED_SHIFT = 21;
var CODE_POINT_MASK = 2097151;
var CONSUMED_OVERFLOW = 2047;
var longNumericConsumed = 0;
function unpackConsumed(packed) {
  const consumed = packed >>> CONSUMED_SHIFT;
  return consumed === CONSUMED_OVERFLOW ? longNumericConsumed : consumed;
}
function isNumber(code) {
  return code - CharCodes.ZERO >>> 0 <= 9;
}
function isHexadecimalCharacter(code) {
  return (code | TO_LOWER_BIT) - CharCodes.LOWER_A >>> 0 <= 5;
}
function isAlpha(code) {
  return (code | TO_LOWER_BIT) - CharCodes.LOWER_A >>> 0 <= 25;
}
function isEntityInAttributeInvalidEnd(code) {
  return code === CharCodes.EQUALS || isAlpha(code) || isNumber(code);
}
var EntityDecoderState;
(function(EntityDecoderState2) {
  EntityDecoderState2[EntityDecoderState2["EntityStart"] = 0] = "EntityStart";
  EntityDecoderState2[EntityDecoderState2["NumericStart"] = 1] = "NumericStart";
  EntityDecoderState2[EntityDecoderState2["NumericDecimal"] = 2] = "NumericDecimal";
  EntityDecoderState2[EntityDecoderState2["NumericHex"] = 3] = "NumericHex";
  EntityDecoderState2[EntityDecoderState2["NamedEntity"] = 4] = "NamedEntity";
})(EntityDecoderState || (EntityDecoderState = {}));
var DecodingMode;
(function(DecodingMode2) {
  DecodingMode2[DecodingMode2["Legacy"] = 0] = "Legacy";
  DecodingMode2[DecodingMode2["Strict"] = 1] = "Strict";
  DecodingMode2[DecodingMode2["Attribute"] = 2] = "Attribute";
})(DecodingMode || (DecodingMode = {}));
function determineBranch(decodeTree, current, nodeIndex, char) {
  const branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
  const jumpOffset = current & BinTrieFlags.JUMP_TABLE;
  if (jumpOffset) {
    if (branchCount === 0) {
      return char === jumpOffset ? nodeIndex : -1;
    }
    const slot = char - jumpOffset;
    if (slot >>> 0 >= branchCount)
      return -1;
    const stored = decodeTree[nodeIndex + slot];
    return stored === 0 ? -1 : nodeIndex + branchCount + stored - 1 & 65535;
  }
  if (branchCount === 0)
    return -1;
  const packedKeySlots = branchCount + 1 >> 1;
  const branchEnd = nodeIndex + packedKeySlots + branchCount;
  for (let index = 0; index < branchCount; index++) {
    const packed = decodeTree[nodeIndex + (index >> 1)];
    const key = packed >> ((index & 1) << 3) & 255;
    if (key === char) {
      const pointerIndex = nodeIndex + packedKeySlots + index;
      return branchEnd + decodeTree[pointerIndex] & 65535;
    }
    if (key > char)
      return -1;
  }
  return -1;
}
function readTrieValue(decodeTree, nodeIndex, valueLength) {
  if (valueLength === 1) {
    return String.fromCharCode(decodeTree[nodeIndex] & BinTrieFlags.VALUE_MASK);
  }
  if (valueLength === 2) {
    return String.fromCharCode(decodeTree[nodeIndex + 1]);
  }
  return String.fromCharCode(decodeTree[nodeIndex + 1], decodeTree[nodeIndex + 2]);
}
function parseNumericEntity(input, numberStart, inputLength) {
  let offset = numberStart + 1;
  let cp = 0;
  let digitStart = offset;
  if (offset < inputLength && (input.charCodeAt(offset) | TO_LOWER_BIT) === CharCodes.LOWER_X) {
    offset += 1;
    digitStart = offset;
    while (offset < inputLength) {
      const char = input.charCodeAt(offset);
      if (isNumber(char)) {
        cp = cp * 16 + (char - CharCodes.ZERO);
      } else if (isHexadecimalCharacter(char)) {
        cp = cp * 16 + ((char | TO_LOWER_BIT) - CharCodes.LOWER_A + 10);
      } else {
        break;
      }
      offset += 1;
    }
  } else {
    while (offset < inputLength) {
      const digit = input.charCodeAt(offset) - CharCodes.ZERO;
      if (digit >>> 0 > 9)
        break;
      cp = cp * 10 + digit;
      offset += 1;
    }
  }
  if (offset === digitStart)
    return 0;
  if (offset < inputLength && input.charCodeAt(offset) === CharCodes.SEMI) {
    offset += 1;
  }
  if (cp > 1114111)
    cp = 1114112;
  let consumed = offset - numberStart;
  if (consumed >= CONSUMED_OVERFLOW) {
    longNumericConsumed = consumed;
    consumed = CONSUMED_OVERFLOW;
  }
  return consumed << CONSUMED_SHIFT | cp;
}
function decodeWithTrie(input, isStrict, isAttribute) {
  const decodeTree = htmlDecodeTree;
  let offset = input.indexOf("&");
  if (offset < 0)
    return input;
  const inputLength = input.length;
  let chunkStart = 0;
  let result = "";
  const root = decodeTree[0];
  const rootJumpOffset = root & BinTrieFlags.JUMP_TABLE;
  const rootBranchCount = (root & BinTrieFlags.BRANCH_LENGTH) >> 7;
  do {
    const entityStart = offset + 1;
    const firstChar = input.charCodeAt(entityStart);
    let consumed;
    let value;
    if (firstChar === CharCodes.NUM) {
      const packed = parseNumericEntity(input, entityStart, inputLength);
      consumed = unpackConsumed(packed);
      if (isStrict && consumed > 0 && input.charCodeAt(entityStart + consumed - 1) !== CharCodes.SEMI) {
        consumed = 0;
      }
      value = consumed === 0 ? "" : codePointToString(packed & CODE_POINT_MASK);
    } else if (isAlpha(firstChar)) {
      consumed = 0;
      value = "";
      const rootSlotIndex = firstChar - rootJumpOffset;
      let nodeIndex;
      if (rootSlotIndex >>> 0 < rootBranchCount) {
        const stored = decodeTree[1 + rootSlotIndex];
        nodeIndex = stored === 0 ? -1 : rootBranchCount + stored & 65535;
      } else {
        nodeIndex = -1;
      }
      let bestNodeIndex = 0;
      let bestValueLength = 0;
      let current = nodeIndex < 0 ? 0 : decodeTree[nodeIndex];
      let index = entityStart + 1;
      trie: while (index < inputLength) {
        while (
          // Value-less, non-run node with a nonzero jump offset.
          (current & (BinTrieFlags.VALUE_LENGTH | BinTrieFlags.FLAG13)) === 0 && (current & BinTrieFlags.JUMP_TABLE) !== 0
        ) {
          const jumpOffset = current & BinTrieFlags.JUMP_TABLE;
          const branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
          if (branchCount === 0) {
            if (input.charCodeAt(index) !== jumpOffset)
              break trie;
            nodeIndex += 1;
          } else {
            const slot = input.charCodeAt(index) - jumpOffset;
            if (slot >>> 0 >= branchCount)
              break trie;
            const stored = decodeTree[nodeIndex + 1 + slot];
            if (stored === 0)
              break trie;
            nodeIndex = nodeIndex + branchCount + stored & 65535;
          }
          current = decodeTree[nodeIndex];
          index += 1;
          if (index >= inputLength)
            break trie;
        }
        if ((current & (BinTrieFlags.VALUE_LENGTH | BinTrieFlags.FLAG13)) === BinTrieFlags.FLAG13) {
          const runLength = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
          if (input.charCodeAt(index) !== (current & BinTrieFlags.JUMP_TABLE)) {
            break;
          }
          index += 1;
          const remaining = runLength - 1;
          let wordIndex = nodeIndex + 1;
          let charIndexInPacked = 0;
          for (; charIndexInPacked + 1 < remaining; charIndexInPacked += 2) {
            const packed = decodeTree[wordIndex];
            if (input.charCodeAt(index) !== (packed & 255))
              break trie;
            index += 1;
            if (input.charCodeAt(index) !== (packed >> 8 & 255))
              break trie;
            index += 1;
            wordIndex += 1;
          }
          if (charIndexInPacked < remaining) {
            if (input.charCodeAt(index) !== (decodeTree[wordIndex] & 255))
              break;
            index += 1;
          }
          nodeIndex += 1 + (runLength >> 1);
          current = decodeTree[nodeIndex];
          continue;
        }
        const valueLength = current >>> 14;
        const char = input.charCodeAt(index);
        if (valueLength !== 0) {
          if (char === CharCodes.SEMI) {
            consumed = index - entityStart + 1;
            value = valueLength === 1 ? String.fromCharCode(current & BinTrieFlags.VALUE_MASK) : readTrieValue(decodeTree, nodeIndex, valueLength);
            break;
          }
          if (!isStrict && (current & BinTrieFlags.FLAG13) === 0) {
            consumed = index - entityStart;
            bestNodeIndex = nodeIndex;
            bestValueLength = valueLength;
          }
          if (valueLength === 1)
            break;
        }
        const next = determineBranch(decodeTree, current, nodeIndex + (valueLength || 1), char);
        if (next < 0)
          break;
        nodeIndex = next;
        current = decodeTree[nodeIndex];
        index += 1;
      }
      if (value === "") {
        const finalVL = current >>> 14;
        if (finalVL !== 0 && !isStrict && (current & BinTrieFlags.FLAG13) === 0) {
          consumed = index - entityStart;
          bestNodeIndex = nodeIndex;
          bestValueLength = finalVL;
        }
        if (consumed > 0) {
          value = readTrieValue(decodeTree, bestNodeIndex, bestValueLength);
        }
      }
    } else {
      consumed = 0;
      value = "";
    }
    if (consumed === 0 || isAttribute && firstChar !== CharCodes.NUM && input.charCodeAt(entityStart + consumed - 1) !== CharCodes.SEMI && entityStart + consumed < inputLength && isEntityInAttributeInvalidEnd(input.charCodeAt(entityStart + consumed))) {
      offset = entityStart;
    } else {
      if (chunkStart < offset) {
        result += input.slice(chunkStart, offset);
      }
      result += value;
      offset = chunkStart = entityStart + consumed;
    }
    if (input.charCodeAt(offset) !== CharCodes.AMP) {
      offset = input.indexOf("&", offset);
    }
  } while (offset >= 0);
  return result + input.slice(chunkStart);
}
function decodeHTMLStrict(htmlString) {
  return decodeWithTrie(htmlString, true, false);
}

// node_modules/entities/dist/index.js
var EntityLevel;
(function(EntityLevel2) {
  EntityLevel2[EntityLevel2["XML"] = 0] = "XML";
  EntityLevel2[EntityLevel2["HTML"] = 1] = "HTML";
})(EntityLevel || (EntityLevel = {}));
var EncodingMode;
(function(EncodingMode2) {
  EncodingMode2[EncodingMode2["UTF8"] = 0] = "UTF8";
  EncodingMode2[EncodingMode2["ASCII"] = 1] = "ASCII";
  EncodingMode2[EncodingMode2["Extensive"] = 2] = "Extensive";
  EncodingMode2[EncodingMode2["Attribute"] = 3] = "Attribute";
  EncodingMode2[EncodingMode2["Text"] = 4] = "Text";
})(EncodingMode || (EncodingMode = {}));

// src/markdown.js
function safeLink(token) {
  const destination = token.autolink ? token.href : decodeHTMLStrict(token.href);
  if (!/^https?:\/\//i.test(destination) || /[\u0000-\u0020\u007f\\]/.test(destination)) return null;
  try {
    const url = new URL(destination);
    return ["http:", "https:"].includes(url.protocol) && url.hostname ? url.href : null;
  } catch {
    return null;
  }
}
function renderMarkdown(source, doc = document) {
  if (typeof source !== "string") throw new TypeError("Markdown source must be a string.");
  const text3 = (value) => doc.createTextNode(value ?? "");
  const element = (tag, children) => {
    const node = doc.createElement(tag);
    if (children) appendTokens(children, node);
    return node;
  };
  function appendTokens(tokens, parent) {
    for (const token of tokens) {
      switch (token.type) {
        case "space":
        case "def":
          break;
        case "heading": {
          const tag = ["h1", "h2", "h3", "h4", "h5", "h6"][token.depth - 1];
          parent.append(tag ? element(tag, token.tokens) : text3(token.raw));
          break;
        }
        case "paragraph":
          parent.append(element("p", token.tokens));
          break;
        case "blockquote":
          parent.append(element("blockquote", token.tokens));
          break;
        case "strong":
          parent.append(element("strong", token.tokens));
          break;
        case "em":
          parent.append(element("em", token.tokens));
          break;
        case "del":
          parent.append(element("del", token.tokens));
          break;
        case "text":
          if (token.tokens) appendTokens(token.tokens, parent);
          else parent.append(text3(token.escaped ? token.raw : decodeHTMLStrict(token.raw)));
          break;
        case "escape":
          parent.append(text3(token.text));
          break;
        case "codespan": {
          const code = element("code");
          code.textContent = token.text;
          parent.append(code);
          break;
        }
        case "code": {
          const pre = element("pre");
          const code = element("code");
          code.textContent = token.text;
          pre.append(code);
          parent.append(pre);
          break;
        }
        case "hr":
          parent.append(element("hr"));
          break;
        case "br":
          parent.append(element("br"));
          break;
        case "list": {
          const list = element(token.ordered ? "ol" : "ul");
          if (token.ordered && Number.isSafeInteger(token.start)) list.start = token.start;
          if (token.items.some((item) => item.task)) list.className = "osb-markdown-task-list";
          for (const item of token.items) {
            const li = element("li", item.tokens);
            if (item.task) {
              li.className = "osb-markdown-task-item";
              const checkbox = li.querySelector('input[type="checkbox"]');
              if (checkbox) checkbox.setAttribute("aria-label", `${item.checked ? "Completed" : "Incomplete"} task: ${li.textContent.trim()}`);
            }
            list.append(li);
          }
          parent.append(list);
          break;
        }
        case "checkbox": {
          const checkbox = element("input");
          checkbox.type = "checkbox";
          checkbox.disabled = true;
          checkbox.checked = token.checked === true;
          checkbox.setAttribute("aria-label", token.checked ? "Completed task" : "Incomplete task");
          parent.append(checkbox, text3(" "));
          break;
        }
        case "table": {
          const wrapper = element("div");
          wrapper.className = "osb-markdown-table-wrap";
          const table = element("table");
          const head = element("thead");
          const body = element("tbody");
          for (const [rows, tag, section] of [[[token.header], "th", head], [token.rows, "td", body]]) {
            for (const cells of rows) {
              const row = element("tr");
              for (const cell of cells) {
                const node = element(tag, cell.tokens);
                if (tag === "th") node.scope = "col";
                if (["left", "center", "right"].includes(cell.align)) node.style.textAlign = cell.align;
                row.append(node);
              }
              section.append(row);
            }
          }
          table.append(head, body);
          wrapper.append(table);
          parent.append(wrapper);
          break;
        }
        case "link": {
          const label = doc.createDocumentFragment();
          if (token.autolink) label.append(text3(token.text));
          else appendTokens(token.tokens, label);
          const href = safeLink(token);
          if (href) {
            const anchor = element("a");
            anchor.href = href;
            anchor.target = "_blank";
            anchor.rel = "noopener noreferrer";
            anchor.append(label);
            parent.append(anchor);
          } else {
            parent.append(text3(label.textContent));
          }
          break;
        }
        case "image": {
          const label = doc.createDocumentFragment();
          appendTokens(token.tokens, label);
          parent.append(text3(label.textContent || "[Image]"));
          break;
        }
        case "html":
          if (token.block) {
            const literal = element("pre");
            literal.className = "osb-markdown-literal";
            literal.textContent = token.raw;
            parent.append(literal);
          } else parent.append(text3(token.raw));
          break;
        default:
          parent.append(text3(token.raw));
      }
    }
  }
  const fragment = doc.createDocumentFragment();
  appendTokens(R.lex(source, { gfm: true, breaks: false }), fragment);
  return fragment;
}

// src/extension.js
var DEFAULT_STORE = "/Users/oka/Desktop/openspec-store";
var STAGES2 = [
  ["backlog", "Backlog", "Ready to shape"],
  ["sa", "Solution design", "SA"],
  ["implementation", "Implementation", "Frontend + Backend"],
  ["qa", "Verification", "QA"],
  ["blocked", "Blocked", "Needs a decision"],
  ["done", "Done", "All four roles complete"]
];
var STATES2 = { backlog: "Not started", in_progress: "In progress", blocked: "Blocked", done: "Complete" };
var SHORT = { SA: "SA", Frontend: "FE", Backend: "BE", QA: "QA" };
var ARTIFACTS = { proposal: "Proposal", design: "Design", specs: "Specification", tasks: "Tasks" };
function el2(tag, className, text3) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text3 !== void 0) node.textContent = text3;
  return node;
}
function button2(text3, className, handler) {
  const node = el2("button", className, text3);
  node.type = "button";
  node.addEventListener("click", handler);
  return node;
}
function badge(text3, kind = "") {
  return el2("span", `osb-badge ${kind ? `osb-${kind}` : ""}`, text3);
}
function meter(done, total, label) {
  const node = el2("div", "osb-meter");
  node.setAttribute("role", "progressbar");
  node.setAttribute("aria-label", label);
  node.setAttribute("aria-valuenow", String(done));
  node.setAttribute("aria-valuemax", String(total || 1));
  node.setAttribute("aria-valuemin", "0");
  const fill = el2("span");
  fill.style.width = `${total ? done / total * 100 : 0}%`;
  node.append(fill);
  return node;
}
function stageLabel(stage) {
  return STAGES2.find(([id]) => id === stage)?.[1] || stage;
}
function time(value) {
  return new Date(value).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
function activate(host) {
  if (host.apiVersion !== "1") throw new Error("OpenSpec Kanban requires Canvas host API 1.");
  const base = `/extensions/${encodeURIComponent(host.extension.name)}/progress`;
  const key = `openhands.apps.openspec-progress:v3:${host.backend.id}:store`;
  let workspace = DEFAULT_STORE;
  try {
    workspace = validateWorkspace(localStorage.getItem(key) || DEFAULT_STORE);
  } catch {
  }
  const filters = { query: "", role: "", view: "board" };
  const mounts = /* @__PURE__ */ new Set();
  const unregister = host.registerPage("progress", ({ container, path: path2, navigate }) => {
    let disposed = false, busy = false, generation = 0, snapshot = null;
    let selectedArtifact = "proposal", artifactMode = "preview", selectedSpec = "";
    const actionDisposers = /* @__PURE__ */ new Set();
    function clearActions() {
      for (const cleanup of actionDisposers) cleanup();
      actionDisposers.clear();
    }
    const root = el2("section", "osb-root");
    const style = el2("style");
    style.dataset.openspecBoard = "true";
    style.textContent = styles_default;
    root.append(style);
    container.append(root);
    const dispose = () => {
      disposed = true;
      generation++;
      clearActions();
      root.remove();
      mounts.delete(dispose);
    };
    mounts.add(dispose);
    const route = path2 ? /^(requirements|changes)\/([A-Za-z0-9]+(?:-[A-Za-z0-9]+)*)$/.exec(path2) : null;
    function link(text3, href, className) {
      const node = el2("a", className, text3);
      node.href = href;
      node.addEventListener("click", (event) => {
        if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        navigate(href);
      });
      return node;
    }
    if (path2 && !route) {
      root.append(el2("h1", "", "Page not found"), el2("p", "osb-muted", "This board route is not available."), link("\u2190 Back to board", base, "osb-button"));
      return dispose;
    }
    if (host.backend.kind !== "local") {
      root.append(el2("h1", "", "OpenSpec Kanban"), el2("p", "osb-alert", "Connect a local Agent Server to read your OpenSpec store."));
      return dispose;
    }
    const header = el2("header", "osb-header");
    const branding = el2("div", "osb-brand");
    branding.append(el2("div", "osb-symbol", "OS"));
    const title = el2("div");
    title.append(el2("p", "osb-eyebrow", "OPENSPEC / DELIVERY WORKSPACE"), el2("h1", "", "OpenSpec Kanban"));
    branding.append(title);
    const actions = el2("div", "osb-header-actions");
    const refresh = button2("\u21BB  Refresh", "osb-button osb-primary", () => refreshData());
    actions.append(badge("Live from files", "live"), refresh);
    header.append(branding, actions);
    const subtitle = el2("p", "osb-subtitle", "Requirements \u2192 role specs \u2192 verified tasks.");
    const storeForm = el2("form", "osb-store");
    const storeLabel = el2("label", "osb-store-field");
    storeLabel.append(el2("span", "osb-label", "SPEC STORE"));
    const storeInput = el2("input");
    storeInput.value = workspace;
    storeInput.spellcheck = false;
    storeInput.setAttribute("aria-label", "Spec store directory");
    storeInput.autocomplete = "off";
    storeLabel.append(storeInput);
    const load = el2("button", "osb-button", "Load store");
    load.type = "submit";
    storeForm.append(storeLabel, load);
    storeForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (busy) return;
      try {
        const nextWorkspace = validateWorkspace(storeInput.value.trim());
        workspace = nextWorkspace;
        try {
          localStorage.setItem(key, workspace);
        } catch {
        }
        if (path2) {
          navigate(base);
          return;
        }
        snapshot = null;
        clearActions();
        content.replaceChildren();
        metrics.replaceChildren();
        refreshData();
      } catch (error) {
        showError(error.message);
      }
    });
    const notice = el2("div", "osb-notice");
    notice.setAttribute("role", "status");
    notice.setAttribute("aria-live", "polite");
    const metrics = el2("div", "osb-metrics");
    const content = el2("div", "osb-content");
    const footer = el2("footer", "osb-footer");
    footer.append(el2("span", "", "Completion follows task checkboxes. All four roles must finish."), el2("span", "", "Read-only progress \xB7 Run role skills from requirement details"));
    root.append(header, subtitle, storeForm, notice, metrics, content, footer);
    function showError(message) {
      notice.className = "osb-notice osb-alert";
      notice.setAttribute("role", "alert");
      notice.textContent = `${snapshot ? "Stale snapshot \u2014 " : ""}${message}`;
    }
    function drawMetrics() {
      const reqs = snapshot.requirements;
      const rolesDone = reqs.reduce((n, r) => n + r.rolesComplete, 0);
      metrics.replaceChildren();
      for (const [label, value, hint, kind] of [
        ["Requirements", String(reqs.length).padStart(2, "0"), snapshot.name, ""],
        ["In delivery", String(reqs.filter((r) => !["backlog", "done", "blocked"].includes(r.stage)).length).padStart(2, "0"), "Across design, build & verification", "active"],
        ["Roles complete", `${rolesDone} / ${reqs.length * 4}`, "SA \xB7 Frontend \xB7 Backend \xB7 QA", ""],
        ["Ready / blocked", `${reqs.filter((r) => r.stage === "done").length} / ${reqs.filter((r) => r.stage === "blocked").length}`, "All roles done / needs attention", ""]
      ]) {
        const metric = el2("div", `osb-metric ${kind}`);
        metric.append(el2("span", "osb-label", label), el2("strong", "", value), el2("span", "osb-muted", hint));
        metrics.append(metric);
      }
    }
    function roleStrip(requirement) {
      const strip = el2("div", "osb-role-strip");
      for (const role of requirement.roles) {
        const pill = el2("span", `osb-role osb-${role.state}`, `${role.state === "done" ? "\u2713 " : role.state === "blocked" ? "! " : ""}${SHORT[role.id]}`);
        pill.title = `${role.id}: ${STATES2[role.state]}${role.specs ? ` \xB7 ${role.specs.length} specs` : ""} \xB7 ${role.complete}/${role.total} tasks`;
        pill.setAttribute("aria-label", pill.title);
        strip.append(pill);
      }
      return strip;
    }
    function card(requirement) {
      const item = link("", `${base}/requirements/${encodeURIComponent(requirement.id)}`, "osb-card");
      const top = el2("div", "osb-card-top");
      top.append(el2("span", "osb-id", requirement.id));
      item.append(top, el2("h3", "", requirement.title), el2("p", "osb-card-summary", requirement.summary), roleStrip(requirement));
      const foot = el2("div", "osb-card-foot");
      foot.append(el2("span", "", `${requirement.rolesComplete}/4 roles${requirement.specs ? ` \xB7 ${requirement.specs.length} specs` : ""}`), el2("span", "", `${requirement.complete}/${requirement.total} tasks`));
      item.append(meter(requirement.complete, requirement.total, `${requirement.id} tasks complete`), foot);
      const blocked = requirement.roles.find((r) => r.state === "blocked");
      if (blocked) item.append(el2("p", "osb-blocker", `! ${requirement.specs?.find((spec) => spec.role === blocked.id && spec.state === "blocked")?.note || blocked.note || `${blocked.id} is blocked`}`));
      if (requirement.warnings.length) item.append(el2("span", "osb-warning", `${requirement.warnings.length} tracking warning${requirement.warnings.length === 1 ? "" : "s"}`));
      return item;
    }
    function drawBoard() {
      clearActions();
      content.replaceChildren();
      const toolbar = el2("div", "osb-toolbar");
      const views = el2("div", "osb-views");
      views.setAttribute("role", "group");
      views.setAttribute("aria-label", "View");
      for (const [id, label] of [["board", "\u25A5  Board"], ["list", "\u2637  List"]]) {
        const control = button2(label, `osb-view ${filters.view === id ? "selected" : ""}`, () => {
          filters.view = id;
          drawBoard();
        });
        control.setAttribute("aria-pressed", String(filters.view === id));
        views.append(control);
      }
      const search = el2("input", "osb-search");
      search.type = "search";
      search.placeholder = "Search requirements\u2026";
      search.value = filters.query;
      search.setAttribute("aria-label", "Search requirements");
      search.addEventListener("input", () => {
        filters.query = search.value;
        drawResults();
      });
      function select(label, field, choices) {
        const node = el2("select");
        node.setAttribute("aria-label", label);
        for (const [value, labelText] of choices) {
          const option = el2("option", "", labelText);
          option.value = value;
          node.append(option);
        }
        node.value = filters[field];
        node.addEventListener("change", () => {
          filters[field] = node.value;
          drawResults();
        });
        return node;
      }
      toolbar.append(
        views,
        search,
        select("Filter by unfinished role", "role", [["", "All roles"], ["SA", "SA remaining"], ["Frontend", "Frontend remaining"], ["Backend", "Backend remaining"], ["QA", "QA remaining"]])
      );
      const caption = el2("div", "osb-board-caption");
      const count2 = el2("span");
      caption.append(count2, el2("span", "", "SA \u2192 Frontend + Backend \u2192 QA \u2192 Done"));
      const results = el2("div");
      content.append(toolbar, caption, results);
      function drawResults() {
        const query = filters.query.trim().toLowerCase();
        const reqs = snapshot.requirements.filter((r) => (!query || `${r.id} ${r.title} ${r.summary} ${r.change} ${(r.specs || []).map((spec) => `${spec.id} ${spec.title}`).join(" ")}`.toLowerCase().includes(query)) && (!filters.role || r.roles.some((role) => role.id === filters.role && role.state !== "done")));
        count2.textContent = `${reqs.length} of ${snapshot.requirements.length} requirements`;
        results.replaceChildren();
        if (!reqs.length) {
          const empty = el2("div", "osb-empty");
          empty.append(
            el2("h2", "", snapshot.requirements.length ? "No matching requirements" : "Your board is ready"),
            el2("p", "osb-muted", snapshot.requirements.length ? "Try another search or clear your filters." : "Add requirements to openspec/requirements.json, then refresh.")
          );
          if (snapshot.requirements.length) empty.append(button2("Clear filters", "osb-button", () => {
            filters.query = "";
            filters.role = "";
            drawBoard();
          }));
          results.append(empty);
          return;
        }
        if (filters.view === "list") {
          const wrap = el2("div", "osb-table-wrap");
          const table = el2("table", "osb-table");
          const head = el2("thead");
          const tr = el2("tr");
          for (const label of ["Requirement", "Stage", "Role progress", "Tasks"]) tr.append(el2("th", "", label));
          head.append(tr);
          table.append(head);
          const body = el2("tbody");
          for (const r of reqs) {
            const row = el2("tr");
            const name = el2("td");
            name.append(el2("span", "osb-id", r.id), link(r.title, `${base}/requirements/${encodeURIComponent(r.id)}`, "osb-list-title"));
            const stage = el2("td");
            stage.append(badge(stageLabel(r.stage), r.stage));
            const roles = el2("td");
            roles.append(roleStrip(r));
            row.append(name, stage, roles, el2("td", "", `${r.complete} / ${r.total}`));
            body.append(row);
          }
          table.append(body);
          wrap.append(table);
          results.append(wrap);
          return;
        }
        const board = el2("div", "osb-board");
        board.setAttribute("aria-label", "Requirement Kanban");
        board.tabIndex = 0;
        for (const [id, label, hint] of STAGES2) {
          const lane = el2("section", `osb-lane osb-stage-${id}`);
          lane.setAttribute("aria-label", `${label} lane`);
          const items = reqs.filter((r) => r.stage === id);
          const head = el2("div", "osb-lane-head");
          const laneTitle = el2("div", "osb-lane-title");
          laneTitle.append(el2("span", "osb-dot"), el2("h2", "", label), el2("span", "osb-count", String(items.length)));
          head.append(laneTitle, el2("p", "", hint));
          lane.append(head);
          for (const item of items) lane.append(card(item));
          if (!items.length) lane.append(el2("div", "osb-lane-empty", "No requirements"));
          board.append(lane);
        }
        results.append(board);
      }
      drawResults();
    }
    function drawDetail(requirement) {
      clearActions();
      content.replaceChildren();
      const crumb = el2("div", "osb-breadcrumb");
      crumb.append(link("\u2190 All requirements", base, ""), el2("span", "", "/"), el2("span", "osb-id", requirement.id));
      const heading = el2("div", "osb-detail-heading");
      const title2 = el2("div");
      title2.append(el2("h2", "", requirement.title), el2("p", "osb-muted", requirement.summary));
      const badges = el2("div", "osb-header-actions");
      badges.append(badge(stageLabel(requirement.stage), requirement.stage));
      heading.append(title2, badges);
      content.append(crumb, heading);
      const summary = el2("div", "osb-completion");
      summary.append(el2("strong", "", `${requirement.rolesComplete} of 4 roles complete`), meter(requirement.complete, requirement.total, "Requirement task progress"), el2("span", "osb-muted", `${requirement.complete} of ${requirement.total} tasks checked`));
      content.append(summary);
      if (requirement.warnings.length) {
        const warnings = el2("div", "osb-alert");
        for (const warning of requirement.warnings) warnings.append(el2("p", "", warning));
        content.append(warnings);
      }
      const specs = requirement.specs || [];
      if (!specs.some((spec) => spec.id === selectedSpec)) selectedSpec = specs[0]?.id || "";
      function taskList(tasks, emptyMessage = "No tracked tasks.") {
        const list = el2("ul", "osb-checklist");
        for (const task of tasks) {
          const item = el2("li", task.done ? "completed" : "");
          const mark = el2("span", "osb-check", task.done ? "\u2713" : "\u25CB");
          mark.setAttribute("aria-label", task.done ? "Complete" : "Remaining");
          const text3 = el2("div");
          text3.append(el2("span", "", task.description), el2("small", "", `${task.specId ? `${task.specId}.md` : "tasks.md"}:${task.line}`));
          item.append(mark, text3);
          list.append(item);
        }
        if (!tasks.length) list.append(el2("li", "osb-warning", emptyMessage));
        return list;
      }
      const pipeline = el2("div", "osb-pipeline");
      for (const role of requirement.roles) {
        const panel = el2("section", `osb-role-panel osb-${role.state}`);
        const top = el2("div", "osb-role-panel-top");
        top.append(el2("span", "osb-role-avatar", SHORT[role.id]), badge(STATES2[role.state], role.state));
        panel.append(top, el2("h3", "", role.id === "SA" ? "SA \xB7 Solution Architect" : role.id), el2("p", "osb-owner", role.owner), meter(role.complete, role.total, `${role.id} task progress`), el2("p", "osb-task-count", `${role.complete} / ${role.total} tasks`));
        if (role.note) panel.append(el2("p", "osb-role-note", role.note));
        if (requirement.specs) {
          const ownSpecs = specs.filter((spec) => spec.role === role.id);
          panel.append(el2("p", "osb-spec-count", `${ownSpecs.filter((spec) => spec.state === "done").length} / ${ownSpecs.length} specs complete`));
          for (const spec of ownSpecs) {
            const group = el2("section", "osb-role-spec");
            group.setAttribute("aria-label", spec.id);
            const open = button2(spec.id, "osb-spec-link", () => {
              selectedSpec = spec.id;
              specSelect.value = selectedSpec;
              selectedArtifact = "specs";
              drawArtifact();
              artifactSection.scrollIntoView?.({ behavior: "smooth", block: "start" });
              specSelect.focus({ preventScroll: true });
            });
            group.append(
              open,
              el2("h4", "", spec.title),
              badge(STATES2[spec.state], spec.state),
              el2("span", "osb-spec-progress", `${spec.complete} / ${spec.total} tasks`)
            );
            if (spec.note) group.append(el2("p", "osb-role-note", spec.note));
            group.append(taskList(spec.tasks));
            panel.append(group);
          }
          if (!ownSpecs.length) panel.append(el2("p", "osb-warning", "No specs yet. Propose a feature for this role."));
        } else panel.append(taskList(role.tasks, "No tasks assigned to this role."));
        actionDisposers.add(mountRoleActions({ host, container: panel, navigate, workspace, requirement, role }));
        pipeline.append(panel);
      }
      content.append(pipeline);
      const unassigned = requirement.tasks.filter((t) => !t.role);
      if (unassigned.length) {
        const other = el2("section", "osb-unassigned");
        other.append(el2("h3", "", "Unassigned tasks"));
        for (const task of unassigned) other.append(el2("p", "", `${task.done ? "\u2713" : "\u25CB"} ${task.description}`));
        content.append(other);
      }
      const artifactSection = el2("section", "osb-artifacts");
      const artifactHeader = el2("div", "osb-artifact-heading");
      artifactHeader.append(el2("h3", "", "Source artifacts"), el2("code", "", `openspec/changes/${requirement.change}`));
      const specSelect = el2("select", "osb-spec-select");
      specSelect.setAttribute("aria-label", "Artifact spec");
      for (const spec of specs) {
        const option = el2("option", "", `${spec.id} \xB7 ${spec.title}`);
        option.value = spec.id;
        specSelect.append(option);
      }
      specSelect.value = selectedSpec;
      specSelect.addEventListener("change", () => {
        selectedSpec = specSelect.value;
        if (!["specs", "tasks"].includes(selectedArtifact)) selectedArtifact = "specs";
        drawArtifact();
      });
      if (specs.length) {
        const specLabel = el2("label", "osb-artifact-spec");
        specLabel.append(el2("span", "osb-label", "Role spec"), specSelect);
        artifactHeader.append(specLabel);
      }
      const tabs = el2("div", "osb-artifact-tabs");
      tabs.setAttribute("role", "group");
      tabs.setAttribute("aria-label", "Source artifact");
      const toolbar = el2("div", "osb-artifact-toolbar");
      const modes = el2("div", "osb-views osb-artifact-modes");
      modes.setAttribute("role", "group");
      modes.setAttribute("aria-label", "Artifact display");
      const body = el2("div", "osb-artifact-body");
      const modeButtons = /* @__PURE__ */ new Map();
      for (const [mode, label] of [["preview", "Preview"], ["source", "Source"]]) {
        const control = button2(label, "osb-view", () => {
          artifactMode = mode;
          drawArtifact();
        });
        modeButtons.set(mode, control);
        modes.append(control);
      }
      const artifactButtons = /* @__PURE__ */ new Map();
      const artifacts = () => [...requirement.artifacts, ...specs.find((spec) => spec.id === selectedSpec)?.artifacts || []];
      for (const id of artifacts().map((artifact) => artifact.id)) {
        const control = button2(ARTIFACTS[id], "", () => {
          selectedArtifact = id;
          drawArtifact();
        });
        artifactButtons.set(id, control);
        tabs.append(control);
      }
      function drawArtifact() {
        const available = artifacts();
        const artifact = available.find((a) => a.id === selectedArtifact) || available[0];
        body.replaceChildren();
        for (const [id, control] of artifactButtons) {
          control.textContent = `${ARTIFACTS[id]}${available.find((a) => a.id === id)?.status === "missing" ? " \xB7 missing" : ""}`;
          control.classList.toggle("selected", id === artifact?.id);
          control.setAttribute("aria-pressed", String(id === artifact?.id));
        }
        for (const [mode, control] of modeButtons) {
          control.classList.toggle("selected", artifactMode === mode);
          control.setAttribute("aria-pressed", String(artifactMode === mode));
        }
        if (!artifact) {
          body.append(el2("p", "osb-artifact-message", "No artifacts are available."));
          return;
        }
        body.append(el2("div", "osb-artifact-path", artifact.path));
        if (artifact.status === "missing") {
          body.append(el2("p", "osb-artifact-message", "This artifact has not been created yet."));
          return;
        }
        if (!artifact.content.trim()) body.append(el2("p", "osb-artifact-message", "This artifact is empty."));
        if (artifactMode === "source") {
          body.append(el2("pre", "osb-artifact-source", artifact.content));
          return;
        }
        if (!artifact.content.trim()) return;
        const preview = el2("div", "osb-markdown");
        preview.setAttribute("role", "region");
        preview.setAttribute("aria-label", `${ARTIFACTS[artifact.id]} preview`);
        preview.tabIndex = 0;
        try {
          preview.append(renderMarkdown(artifact.content));
          body.append(preview);
        } catch {
          const fallback = el2("div", "osb-artifact-message");
          const message = el2("p", "", "This Markdown could not be previewed. You can still read its source.");
          message.setAttribute("role", "alert");
          fallback.append(message, button2("View source", "osb-button", () => {
            artifactMode = "source";
            drawArtifact();
            modeButtons.get("source").focus();
          }));
          body.append(fallback);
        }
      }
      toolbar.append(tabs, modes);
      artifactSection.append(artifactHeader, toolbar, body);
      content.append(artifactSection);
      drawArtifact();
    }
    async function refreshData() {
      if (busy || disposed) return;
      busy = true;
      const current = ++generation;
      refresh.disabled = load.disabled = storeInput.disabled = true;
      refresh.textContent = "Refreshing\u2026";
      root.setAttribute("aria-busy", "true");
      notice.className = "osb-notice";
      notice.setAttribute("role", "status");
      notice.textContent = "Reading requirements and role checklists\u2026";
      if (!snapshot) content.replaceChildren(el2("div", "osb-loading", "Loading OpenSpec Kanban\u2026"));
      try {
        const data = await loadBoard(host, workspace);
        if (disposed || current !== generation) return;
        snapshot = data;
        drawMetrics();
        notice.textContent = `${data.description} \xB7 Refreshed ${time(data.generatedAt)}`;
        if (route) {
          const requirement = data.requirements.find((r) => route[1] === "requirements" ? r.id === route[2] : r.change === route[2]);
          if (requirement) drawDetail(requirement);
          else {
            clearActions();
            content.replaceChildren(el2("h2", "", "Requirement not found"), el2("p", "osb-muted", "This requirement is not in the selected store."), link("\u2190 Back to board", base, "osb-button"));
          }
        } else drawBoard();
      } catch (error) {
        if (disposed || current !== generation) return;
        showError(error.message);
        if (!snapshot) content.replaceChildren(el2("div", "osb-empty", "Check the store directory and Agent Server connection, then refresh."));
      } finally {
        if (!disposed && current === generation) {
          busy = false;
          refresh.disabled = load.disabled = storeInput.disabled = false;
          refresh.textContent = "\u21BB  Refresh";
          root.setAttribute("aria-busy", "false");
        }
      }
    }
    refreshData();
    return dispose;
  });
  return () => {
    for (const dispose of [...mounts]) dispose();
    unregister();
  };
}
export {
  activate
};
