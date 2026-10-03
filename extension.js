// src/styles.css
var styles_default = '.osb-root {\n  --ink:#202b3b; --muted:#687485; --border:#dfe5eb; --accent:#465bcb;\n  --green:#187551; --surface:#fff; --paper:#f5f7fa;\n  box-sizing:border-box; width:100%; min-height:calc(100vh - 56px); padding:32px clamp(18px,3vw,44px) 24px;\n  background:var(--paper); color:var(--ink); font:14px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;\n  color-scheme:light;\n}\n.osb-root *, .osb-root *::before, .osb-root *::after { box-sizing:border-box; }\n.osb-root h1,.osb-root h2,.osb-root h3,.osb-root p { margin:0; }\n.osb-root button,.osb-root input,.osb-root select { font:inherit; }\n.osb-root button,.osb-root a,.osb-root input,.osb-root select { -webkit-tap-highlight-color:transparent; }\n.osb-root button,.osb-root a { touch-action:manipulation; }\n.osb-root button { cursor:pointer; }\n.osb-root button:disabled { cursor:wait; opacity:.6; }\n.osb-root :focus-visible { outline:3px solid #8799f1; outline-offset:3px; }\n.osb-root a { color:var(--accent); text-decoration:none; }\n.osb-header,.osb-brand,.osb-header-actions,.osb-store,.osb-card-top,.osb-card-foot,.osb-lane-title,.osb-toolbar,.osb-board-caption,.osb-detail-heading,.osb-role-panel-top,.osb-artifact-heading,.osb-footer { display:flex; align-items:center; }\n.osb-header { justify-content:space-between; gap:20px; }\n.osb-brand { gap:14px; }\n.osb-symbol { background:#243044; color:white; width:47px; height:47px; display:grid; place-items:center; border-radius:13px; font-size:17px; font-weight:750; letter-spacing:-1px; box-shadow:0 4px 12px #1c2c4a17; }\n.osb-eyebrow { color:#738096; font-size:10px; font-weight:750; letter-spacing:1.6px; margin-bottom:2px!important; }\n.osb-root h1 { font-size:28px; font-weight:710; letter-spacing:-.9px; line-height:1.25; }\n.osb-header-actions { gap:12px; flex-shrink:0; }\n.osb-subtitle { color:var(--muted); margin:16px 0 24px!important; font-size:15px; }\n.osb-button { padding:9px 16px; min-height:40px; border:1px solid var(--border); border-radius:8px; background:white; color:var(--ink)!important; font-weight:600!important; white-space:nowrap; }\n.osb-button:hover { background:#edf1f8; }\n.osb-primary { background:var(--accent); color:white!important; border-color:var(--accent); }\n.osb-primary:hover { background:#3548b5; }\n.osb-badge { display:inline-flex; align-items:center; justify-content:center; padding:3px 8px; border-radius:5px; font-size:10px; line-height:1.5; font-weight:680; background:#e9edf3; color:#5d697a; white-space:nowrap; text-transform:capitalize; }\n.osb-live { background:#eaf4ef; color:#227750; font-size:11px; padding:6px 10px; gap:6px; }\n.osb-live::before { content:""; width:5px; height:5px; background:#279064; border-radius:50%; }\n.osb-store { padding:12px 14px; border:1px solid var(--border); border-radius:10px; background:#ffffffa6; gap:12px; }\n.osb-store-field { display:flex; flex:1; align-items:center; gap:18px; min-width:0; }\n.osb-label { font-size:10px; font-weight:700; letter-spacing:.9px; text-transform:uppercase; color:var(--muted); }\n.osb-store-field .osb-label { white-space:nowrap; }\n.osb-store input { border:0; background:transparent; width:100%; min-width:100px; color:#414e62; padding:6px 0; font-size:12px; font-family:ui-monospace,SFMono-Regular,Consolas,monospace; }\n.osb-notice { margin:13px 0 22px; color:#687485; font-size:11px; line-height:1.7; }\n.osb-alert { color:#a44322; background:#fff0e5; border:1px solid #f0d4c5; padding:12px 15px; border-radius:8px; }\n.osb-alert p + p { margin-top:6px; }\n.osb-metrics { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:14px; margin-bottom:30px; }\n.osb-metric { display:flex; flex-direction:column; padding:17px 20px 16px; border:1px solid var(--border); border-radius:10px; background:white; gap:4px; }\n.osb-metric strong { font-size:28px; letter-spacing:-1px; line-height:1.45; font-weight:650; font-variant-numeric:tabular-nums; }\n.osb-metric.active strong { color:var(--accent); }\n.osb-muted { color:var(--muted); }\n.osb-metric .osb-muted { font-size:10px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }\n.osb-toolbar { flex-wrap:wrap; gap:10px; padding-bottom:16px; border-bottom:1px solid var(--border); }\n.osb-views { display:flex; background:#e9edf3; border-radius:8px; padding:3px; gap:2px; }\n.osb-view { border:0; border-radius:6px; background:transparent; color:var(--muted); padding:7px 15px; font-size:12px!important; font-weight:650!important; }\n.osb-view.selected { color:var(--ink); background:white; box-shadow:0 1px 4px #16284915; }\n.osb-toolbar input,.osb-toolbar select { height:36px; border:1px solid var(--border); background:white; border-radius:7px; padding:0 11px; color:var(--ink); font-size:12px; }\n.osb-search { width:245px; margin-left:auto; }\n.osb-toolbar select { max-width:190px; }\n.osb-board-caption { justify-content:space-between; gap:12px; padding:15px 0; color:var(--muted); font-size:11px; }\n.osb-board { display:grid; grid-template-columns:repeat(6,minmax(190px,1fr)); gap:12px; overflow-x:auto; padding:2px 2px 20px; align-items:stretch; scrollbar-color:#bac4d3 #e9edf3; scrollbar-width:thin; }\n.osb-lane { --lane:#8a95a6; background:#eceff4; border:1px solid #e3e8ef; border-radius:10px; padding:12px 8px; min-height:368px; }\n.osb-stage-sa { --lane:#8b69c6; }\n.osb-stage-implementation { --lane:#4f75d0; }\n.osb-stage-qa { --lane:#cf963f; }\n.osb-stage-blocked { --lane:#c46455; background:#f3eeee; }\n.osb-stage-done { --lane:#39836a; background:#edf3f0; }\n.osb-lane-head { margin:0 4px 15px; }\n.osb-lane-title { gap:7px; }\n.osb-dot { width:7px; height:7px; border-radius:50%; background:var(--lane); flex-shrink:0; }\n.osb-root .osb-lane h2 { font-size:12px; font-weight:700; letter-spacing:-.1px; }\n.osb-count { margin-left:auto; padding:0 6px; border-radius:4px; background:#ffffffb8; color:var(--muted); font-size:10px; font-weight:650; }\n.osb-lane-head p { color:#85909f; font-size:10px; margin:4px 0 0 14px; }\n.osb-card { display:block; color:var(--ink)!important; border:1px solid #e0e5eb; background:white; border-radius:8px; padding:13px 12px; box-shadow:0 2px 3px #192f4610; transition:border-color .12s,transform .12s; }\n.osb-card + .osb-card { margin-top:10px; }\n.osb-card:hover { border-color:#98a6d6; transform:translateY(-2px); box-shadow:0 5px 12px #1d2c4712; }\n.osb-card-top { justify-content:space-between; gap:6px; margin-bottom:10px; }\n.osb-id { color:#7b8798; font-size:10px; font-weight:650; letter-spacing:.5px; font-family:ui-monospace,SFMono-Regular,Consolas,monospace; }\n.osb-root .osb-card h3 { font-size:14px; line-height:1.45; font-weight:650; letter-spacing:-.15px; }\n.osb-card-summary { font-size:11px; color:var(--muted); margin-top:7px!important; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; min-height:48px; }\n.osb-role-strip { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:4px; margin:15px 0 12px; }\n.osb-role { display:block; border-radius:4px; padding:4px 2px; text-align:center; font-size:9px; font-weight:700; background:#eff1f5; color:#919aaa; border:1px solid transparent; }\n.osb-root .osb-done { color:#227653; background:#e6f3ec; }\n.osb-root .osb-in_progress,.osb-root .osb-implementation { color:#4669b2; background:#eaf0ff; }\n.osb-root .osb-blocked { color:#b65346; background:#fcece8; }\n.osb-root .osb-sa { color:#8160b1; background:#f0eaf9; }\n.osb-root .osb-qa { color:#9c712e; background:#faf0d9; }\n.osb-role.osb-in_progress { border-color:#c9d5f5; }\n.osb-meter { height:4px; overflow:hidden; background:#e9edf2; border-radius:4px; }\n.osb-meter span { display:block; height:100%; border-radius:4px; background:#6078cb; }\n.osb-stage-done .osb-meter span,.osb-role-panel.osb-done .osb-meter span { background:#4a9a7c; }\n.osb-card-foot { justify-content:space-between; margin-top:8px; font-size:9px; color:#8390a0; }\n.osb-blocker { border-top:1px solid #f0e3df; padding-top:10px; margin-top:11px!important; color:#b36454; font-size:10px; }\n.osb-warning { color:#a66b29; font-size:11px; margin-top:10px; display:block; }\n.osb-lane-empty { padding:25px 5px; border:1px dashed #d5dce6; border-radius:8px; font-size:11px; text-align:center; color:#98a2b0; }\n.osb-empty,.osb-loading { border:1px dashed #d4dce6; border-radius:10px; padding:54px 24px; text-align:center; color:var(--muted); }\n.osb-empty h2 { font-size:20px; color:var(--ink); margin-bottom:8px; }\n.osb-empty button { margin-top:18px; }\n.osb-footer { border-top:1px solid var(--border); padding-top:18px; margin-top:24px; justify-content:space-between; gap:10px; color:#8a95a4; font-size:10px; flex-wrap:wrap; }\n.osb-table-wrap { overflow-x:auto; border:1px solid var(--border); border-radius:10px; }\n.osb-table { border-collapse:collapse; width:100%; min-width:700px; background:white; text-align:left; }\n.osb-table th { color:var(--muted); background:#f0f3f7; font-size:10px; font-weight:600; text-transform:uppercase; letter-spacing:.5px; }\n.osb-table th,.osb-table td { padding:14px 18px; border-bottom:1px solid #e9edf2; }\n.osb-table tr:last-child td { border-bottom:0; }\n.osb-table td { font-size:12px; }\n.osb-list-title { display:block; font-size:13px; font-weight:600; margin-top:4px; }\n.osb-table .osb-role-strip { min-width:150px; margin:0; }\n.osb-breadcrumb { display:flex; gap:12px; align-items:center; font-size:12px; margin-bottom:22px; }\n.osb-detail-heading { justify-content:space-between; align-items:flex-start; gap:24px; }\n.osb-detail-heading h2 { font-size:25px; line-height:1.3; letter-spacing:-.6px; margin-bottom:10px; }\n.osb-detail-heading .osb-muted { font-size:13px; max-width:700px; }\n.osb-completion { display:flex; align-items:center; gap:16px; margin:22px 0; font-size:12px; }\n.osb-completion .osb-meter { flex:1; max-width:320px; }\n.osb-pipeline { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:14px; margin:20px 0 30px; }\n.osb-root .osb-role-panel { padding:18px; background:white; border:1px solid var(--border); border-top:3px solid #ced5e0; border-radius:9px; color:var(--ink); }\n.osb-root .osb-role-panel.osb-done { border-top-color:#5c9c7c; }\n.osb-root .osb-role-panel.osb-in_progress { border-top-color:#6c83cb; }\n.osb-root .osb-role-panel.osb-blocked { border-top-color:#ca7b65; }\n.osb-role-panel-top { justify-content:space-between; gap:8px; margin-bottom:14px; }\n.osb-role-avatar { width:30px; height:30px; border-radius:7px; display:grid; place-items:center; background:#f0f3f7; font-size:11px; font-weight:700; color:#7d899a; }\n.osb-role-panel h3 { font-size:13px; font-weight:700; margin-bottom:5px; }\n.osb-owner { color:var(--muted); font-size:11px; margin-bottom:16px!important; }\n.osb-task-count { font-size:10px; color:var(--muted); margin-top:5px!important; }\n.osb-role-note { margin:15px 0!important; font-size:11px; color:var(--muted); min-height:33px; }\n.osb-checklist { list-style:none; padding:0; margin:16px 0 0; border-top:1px solid #edf0f4; }\n.osb-checklist li { display:flex; gap:9px; font-size:11px; margin-top:14px; line-height:1.6; }\n.osb-check { color:#98a4b5; font-size:14px; flex-shrink:0; }\n.osb-checklist .completed .osb-check { color:#3b8a68; }\n.osb-checklist small { display:block; font-size:9px; color:#9aa5b3; margin-top:3px; }\n.osb-role-actions { margin-top:20px; border-top:1px solid var(--border); padding-top:14px; }\n.osb-role-actions summary { color:var(--accent); cursor:pointer; font-size:12px; font-weight:650; }\n.osb-role-actions-body { padding-top:13px; font-size:11px; }\n.osb-role-actions-body > p { margin-bottom:10px; }\n.osb-automation-target { white-space:pre-wrap; overflow-wrap:anywhere; color:var(--muted); font-size:10px; }\n.osb-run-controls { display:flex; flex-wrap:wrap; gap:7px; margin:12px 0; }\n.osb-role-actions .osb-button { padding:7px 10px; min-height:34px; font-size:11px; white-space:normal; }\n.osb-skill-form { display:grid; gap:12px; margin-top:15px; }\n.osb-skill-field { display:grid; gap:6px; min-width:0; }\n.osb-skill-field[hidden],.osb-role-actions [hidden] { display:none; }\n.osb-skill-field input,.osb-skill-field select,.osb-skill-field textarea { width:100%; min-width:0; border:1px solid var(--border); border-radius:6px; padding:8px; background:white; color:var(--ink); font:12px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; }\n.osb-skill-field textarea { resize:vertical; min-height:100px; }\n.osb-skill-help { color:var(--muted); font-size:11px; }\n.osb-run-result { display:grid; gap:10px; margin-top:14px; overflow-wrap:anywhere; }\n.osb-run-result:empty { display:none; }\n.osb-run-status { font-weight:650; }\n.osb-run-error { color:#a44322; }\n.osb-run-link { display:block; font-weight:600; }\n.osb-request-ref { font-size:9px; color:var(--muted); }\n.osb-unassigned { border:1px solid #e9d8b9; border-radius:8px; padding:18px; margin-bottom:24px; }\n.osb-artifacts { background:white; border:1px solid var(--border); border-radius:10px; overflow:hidden; }\n.osb-artifact-heading { padding:20px; justify-content:space-between; flex-wrap:wrap; gap:12px; }\n.osb-artifact-heading h3 { font-size:15px; }\n.osb-artifact-heading code { color:var(--muted); font-size:11px; overflow-wrap:anywhere; }\n.osb-artifact-tabs { display:flex; gap:18px; padding:0 20px; border-bottom:1px solid var(--border); flex-wrap:wrap; }\n.osb-artifact-tabs button { color:var(--muted); background:transparent; border:0; border-bottom:2px solid transparent; font-size:12px; padding:10px 0; }\n.osb-artifact-tabs button.selected { color:var(--accent); border-color:var(--accent); font-weight:650; }\n.osb-artifact-path { padding:12px 20px; font:10px/1.5 ui-monospace,SFMono-Regular,Consolas,monospace; color:#8a95a5; background:#fafbfc; overflow-wrap:anywhere; }\n.osb-artifact-body pre { margin:0; padding:20px; white-space:pre-wrap; overflow-wrap:anywhere; max-height:530px; overflow:auto; font:12px/1.85 ui-monospace,SFMono-Regular,Consolas,monospace; color:#495970; }\n@media(min-width:1600px) { .osb-board { grid-template-columns:repeat(6,minmax(215px,1fr)); } .osb-card { padding:17px 15px; } }\n@media(max-width:1000px) { .osb-root { padding:24px 20px; } .osb-metrics { gap:10px; } .osb-metric { padding:14px; } .osb-search { width:210px; } .osb-pipeline { grid-template-columns:repeat(2,minmax(0,1fr)); } }\n@media(max-width:650px) { .osb-header { align-items:flex-start; } .osb-root h1 { font-size:23px; } .osb-symbol { display:none; } .osb-live { display:none; } .osb-header-actions { gap:6px; } .osb-metrics { grid-template-columns:repeat(2,minmax(0,1fr)); } .osb-store-field { display:block; } .osb-store .osb-button { padding:8px 10px; } .osb-toolbar { gap:8px; } .osb-search { order:3; width:100%; } .osb-toolbar select { flex:1; min-width:120px; } .osb-views { width:100%; } .osb-board-caption { display:block; } .osb-board-caption span { display:block; margin-top:4px; } .osb-detail-heading { display:block; } .osb-detail-heading .osb-header-actions { margin-top:12px; } .osb-completion { flex-wrap:wrap; } .osb-completion .osb-meter { min-width:130px; } .osb-pipeline { grid-template-columns:1fr; } .osb-footer { align-items:flex-start; flex-direction:column; } }\n@media(prefers-reduced-motion:reduce) { .osb-card { transition:none; } .osb-card:hover { transform:none; } }\n';

// embedded-raw-source:/Users/oka/Desktop/openhands-apps/src/collector.cjs
var collector_default = new TextDecoder().decode(Uint8Array.from(atob("J3VzZSBzdHJpY3QnOwoKLy8gVGhpcyBmaXhlZCwgcmVhZC1vbmx5IGNvbGxlY3RvciBpcyBlbWJlZGRlZCBpbiB0aGUgQ2FudmFzIGFwcCBhbmQgcnVuIGJ5IGl0cyBBZ2VudCBTZXJ2ZXIuCmNvbnN0IGZzID0gcmVxdWlyZSgnbm9kZTpmcycpOwpjb25zdCBwYXRoID0gcmVxdWlyZSgnbm9kZTpwYXRoJyk7Cgpjb25zdCBST0xFX0lEUyA9IFsnU0EnLCAnRnJvbnRlbmQnLCAnQmFja2VuZCcsICdRQSddOwpjb25zdCBST0xFX0xBQkVMUyA9IFsnU29sdXRpb24gQXJjaGl0ZWN0JywgJ0Zyb250ZW5kJywgJ0JhY2tlbmQnLCAnUXVhbGl0eSBBc3N1cmFuY2UnXTsKY29uc3QgU0xVRyA9IC9eW2EtejAtOV0rKD86LVthLXowLTldKykqJC87CmNvbnN0IFJFUVVJUkVNRU5UX0lEID0gL15bQS1aXVtBLVowLTldKig/Oi1bQS1aMC05XSspKiQvOwpjb25zdCBNQVhfRklMRSA9IDY0ICogMTAyNDsKY29uc3QgTUFYX01FVEFEQVRBID0gMTI4ICogMTAyNDsKY29uc3QgTUFYX09VVFBVVCA9IDUxMiAqIDEwMjQ7CmNvbnN0IE1BWF9SRVFVSVJFTUVOVFMgPSA1MDsKY29uc3QgTUFYX1RBU0tTID0gNTAwOwpjbGFzcyBDb2xsZWN0b3JFcnJvciBleHRlbmRzIEVycm9yIHt9CgpmdW5jdGlvbiByZXF1aXJlVmFsdWUoY29uZGl0aW9uLCBtZXNzYWdlKSB7CiAgaWYgKCFjb25kaXRpb24pIHRocm93IG5ldyBDb2xsZWN0b3JFcnJvcihtZXNzYWdlKTsKfQpmdW5jdGlvbiBvYmplY3QodmFsdWUpIHsgcmV0dXJuIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkodmFsdWUpOyB9CmZ1bmN0aW9uIHRleHQodmFsdWUsIGxpbWl0ID0gMjAwMCwgZW1wdHkgPSBmYWxzZSkgewogIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIChlbXB0eSB8fCB2YWx1ZS50cmltKCkubGVuZ3RoID4gMCkgJiYgdmFsdWUubGVuZ3RoIDw9IGxpbWl0ICYmICF2YWx1ZS5pbmNsdWRlcygnXDAnKTsKfQpmdW5jdGlvbiBmaWVsZHModmFsdWUsIG5hbWVzKSB7IHJldHVybiBPYmplY3Qua2V5cyh2YWx1ZSkuZXZlcnkoa2V5ID0+IG5hbWVzLmluY2x1ZGVzKGtleSkpOyB9CmZ1bmN0aW9uIHVuaXF1ZSh2YWx1ZXMsIG1lc3NhZ2UpIHsgcmVxdWlyZVZhbHVlKG5ldyBTZXQodmFsdWVzKS5zaXplID09PSB2YWx1ZXMubGVuZ3RoLCBtZXNzYWdlKTsgfQpmdW5jdGlvbiBjb250YWluZWQocm9vdCwgdGFyZ2V0KSB7IHJldHVybiB0YXJnZXQgPT09IHJvb3QgfHwgdGFyZ2V0LnN0YXJ0c1dpdGgocm9vdCArIHBhdGguc2VwKTsgfQpmdW5jdGlvbiBsb2NhbFNlZ21lbnQodmFsdWUpIHsgcmV0dXJuIHZhbHVlLnNwbGl0KHBhdGguc2VwKS5pbmNsdWRlcygnLmxvY2FsJyk7IH0KCi8vIFJlc29sdmUgYmVmb3JlIHJlYWRpbmcuIFJlZnVzZSBzeW1saW5rIGFsaWFzZXMgYXMgd2VsbCBhcyBlc2NhcGVzIHNvIGVhY2ggc291cmNlIGxvY2F0aW9uCi8vIHNob3duIGluIHRoZSBhcHAgaWRlbnRpZmllcyBleGFjdGx5IHRoZSBmaWxlIHRoYXQgc3VwcGxpZWQgaXRzIGV2aWRlbmNlLgpmdW5jdGlvbiBzYWZlUGF0aCh0YXJnZXQsIHJvb3QpIHsKICByZXF1aXJlVmFsdWUoY29udGFpbmVkKHJvb3QsIHRhcmdldCkgJiYgIWxvY2FsU2VnbWVudCh0YXJnZXQpLCAnU291cmNlIHBhdGggaXMgb3V0c2lkZSB0aGUgcGVybWl0dGVkIHN0b3JlLicpOwogIGxldCBjYW5vbmljYWw7CiAgdHJ5IHsgY2Fub25pY2FsID0gZnMucmVhbHBhdGhTeW5jKHRhcmdldCk7IH0KICBjYXRjaCAoZXJyb3IpIHsgaWYgKGVycm9yLmNvZGUgPT09ICdFTk9FTlQnKSByZXR1cm4gZmFsc2U7IHRocm93IGVycm9yOyB9CiAgcmVxdWlyZVZhbHVlKGNhbm9uaWNhbCA9PT0gdGFyZ2V0ICYmIGNvbnRhaW5lZChyb290LCBjYW5vbmljYWwpICYmICFsb2NhbFNlZ21lbnQoY2Fub25pY2FsKSwKICAgICdTeW1saW5rZWQgb3IgZXNjYXBpbmcgc291cmNlIHBhdGhzIGFyZSBub3Qgc3VwcG9ydGVkLicpOwogIHJldHVybiB0cnVlOwp9CgpmdW5jdGlvbiByZWFkRmlsZSh0YXJnZXQsIHJvb3QsIGxpbWl0ID0gTUFYX0ZJTEUpIHsKICBpZiAoIXNhZmVQYXRoKHRhcmdldCwgcm9vdCkpIHJldHVybiBudWxsOwogIGxldCBkZXNjcmlwdG9yOwogIHRyeSB7CiAgICBkZXNjcmlwdG9yID0gZnMub3BlblN5bmModGFyZ2V0LCBmcy5jb25zdGFudHMuT19SRE9OTFkgfCBmcy5jb25zdGFudHMuT19OT0ZPTExPVyk7CiAgICBjb25zdCBzdGF0ID0gZnMuZnN0YXRTeW5jKGRlc2NyaXB0b3IpOwogICAgcmVxdWlyZVZhbHVlKHN0YXQuaXNGaWxlKCksICdFeHBlY3RlZCBhIHJlZ3VsYXIgc291cmNlIGZpbGUuJyk7CiAgICByZXF1aXJlVmFsdWUoc3RhdC5zaXplIDw9IGxpbWl0LCAnQSBzdG9yZSBzb3VyY2UgZmlsZSBleGNlZWRlZCBpdHMgc2l6ZSBsaW1pdC4nKTsKICAgIC8vIFJlYWQgYXQgbW9zdCBsaW1pdCsxIGJ5dGVzIGV2ZW4gaWYgdGhlIGZpbGUgZ3Jvd3MgYWZ0ZXIgZnN0YXQuCiAgICBjb25zdCBidWZmZXIgPSBCdWZmZXIuYWxsb2MobGltaXQgKyAxKTsKICAgIGxldCBsZW5ndGggPSAwOwogICAgd2hpbGUgKGxlbmd0aCA8IGJ1ZmZlci5sZW5ndGgpIHsKICAgICAgY29uc3QgcmVhZCA9IGZzLnJlYWRTeW5jKGRlc2NyaXB0b3IsIGJ1ZmZlciwgbGVuZ3RoLCBidWZmZXIubGVuZ3RoIC0gbGVuZ3RoLCBudWxsKTsKICAgICAgaWYgKCFyZWFkKSBicmVhazsKICAgICAgbGVuZ3RoICs9IHJlYWQ7CiAgICB9CiAgICByZXF1aXJlVmFsdWUobGVuZ3RoIDw9IGxpbWl0LCAnQSBzdG9yZSBzb3VyY2UgZmlsZSBleGNlZWRlZCBpdHMgc2l6ZSBsaW1pdC4nKTsKICAgIGNvbnN0IGNvbnRlbnQgPSBidWZmZXIuc3ViYXJyYXkoMCwgbGVuZ3RoKTsKICAgIGNvbnN0IGRlY29kZWQgPSBjb250ZW50LnRvU3RyaW5nKCd1dGY4Jyk7CiAgICByZXF1aXJlVmFsdWUoQnVmZmVyLmZyb20oZGVjb2RlZCwgJ3V0ZjgnKS5lcXVhbHMoY29udGVudCkgJiYgIWRlY29kZWQuaW5jbHVkZXMoJ1wwJyksICdBIHN0b3JlIHNvdXJjZSBmaWxlIGlzIG5vdCB2YWxpZCBVVEYtOCB0ZXh0LicpOwogICAgcmV0dXJuIGRlY29kZWQ7CiAgfSBmaW5hbGx5IHsgaWYgKGRlc2NyaXB0b3IgIT09IHVuZGVmaW5lZCkgZnMuY2xvc2VTeW5jKGRlc2NyaXB0b3IpOyB9Cn0KCmZ1bmN0aW9uIHZhbGlkYXRlTWV0YWRhdGEodmFsdWUpIHsKICByZXF1aXJlVmFsdWUob2JqZWN0KHZhbHVlKSAmJiBmaWVsZHModmFsdWUsIFsndmVyc2lvbicsICduYW1lJywgJ2Rlc2NyaXB0aW9uJywgJ3JlcXVpcmVtZW50cyddKSAmJiB2YWx1ZS52ZXJzaW9uID09PSAxCiAgICAmJiB0ZXh0KHZhbHVlLm5hbWUsIDIwMCkgJiYgdGV4dCh2YWx1ZS5kZXNjcmlwdGlvbiwgNDAwMCwgdHJ1ZSkgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZS5yZXF1aXJlbWVudHMpCiAgICAmJiB2YWx1ZS5yZXF1aXJlbWVudHMubGVuZ3RoIDw9IE1BWF9SRVFVSVJFTUVOVFMsICdJbnZhbGlkIG9wZW5zcGVjL3JlcXVpcmVtZW50cy5qc29uIHN0b3JlIG1ldGFkYXRhLicpOwogIGZvciAoY29uc3QgaXRlbSBvZiB2YWx1ZS5yZXF1aXJlbWVudHMpIHsKICAgIHJlcXVpcmVWYWx1ZShvYmplY3QoaXRlbSkgJiYgZmllbGRzKGl0ZW0sIFsnaWQnLCAndGl0bGUnLCAnc3VtbWFyeScsICdjaGFuZ2UnLCAncm9sZXMnXSkKICAgICAgJiYgdGV4dChpdGVtLmlkLCA2NCkgJiYgUkVRVUlSRU1FTlRfSUQudGVzdChpdGVtLmlkKSAmJiB0ZXh0KGl0ZW0udGl0bGUsIDIwMCkgJiYgdGV4dChpdGVtLnN1bW1hcnksIDQwMDAsIHRydWUpCiAgICAgICYmIHRleHQoaXRlbS5jaGFuZ2UsIDEwMCkgJiYgU0xVRy50ZXN0KGl0ZW0uY2hhbmdlKQogICAgICAmJiBvYmplY3QoaXRlbS5yb2xlcykgJiYgZmllbGRzKGl0ZW0ucm9sZXMsIFJPTEVfSURTKSwgJ0ludmFsaWQgcmVxdWlyZW1lbnQgbWV0YWRhdGEuJyk7CiAgICBmb3IgKGNvbnN0IHJvbGUgb2YgT2JqZWN0LnZhbHVlcyhpdGVtLnJvbGVzKSkgewogICAgICByZXF1aXJlVmFsdWUob2JqZWN0KHJvbGUpICYmIGZpZWxkcyhyb2xlLCBbJ293bmVyJywgJ3N0YXRlJywgJ25vdGUnXSkgJiYgdGV4dChyb2xlLm93bmVyLCAyMDApCiAgICAgICAgJiYgWydiYWNrbG9nJywgJ2luX3Byb2dyZXNzJywgJ2Jsb2NrZWQnXS5pbmNsdWRlcyhyb2xlLnN0YXRlKSAmJiB0ZXh0KHJvbGUubm90ZSwgNDAwMCwgdHJ1ZSksICdJbnZhbGlkIHJlcXVpcmVtZW50IHJvbGUgbWV0YWRhdGEuJyk7CiAgICB9CiAgfQogIHVuaXF1ZSh2YWx1ZS5yZXF1aXJlbWVudHMubWFwKGl0ZW0gPT4gaXRlbS5pZCksICdEdXBsaWNhdGUgcmVxdWlyZW1lbnQgSURzIGluIHN0b3JlIG1ldGFkYXRhLicpOwogIHVuaXF1ZSh2YWx1ZS5yZXF1aXJlbWVudHMubWFwKGl0ZW0gPT4gaXRlbS5jaGFuZ2UpLCAnTXVsdGlwbGUgcmVxdWlyZW1lbnRzIHBvaW50IHRvIHRoZSBzYW1lIGNoYW5nZS4nKTsKICByZXR1cm4gdmFsdWU7Cn0KCmZ1bmN0aW9uIHBhcnNlVGFza3MoY29udGVudCwgc291cmNlUGF0aCkgewogIGNvbnN0IHRhc2tzID0gW107CiAgKGNvbnRlbnQgfHwgJycpLnNwbGl0KC9ccj9cbi8pLmZvckVhY2goKGxpbmUsIGluZGV4KSA9PiB7CiAgICAvLyBNYXRjaCBPcGVuU3BlYyAxLjE0IHRhc2stcHJvZ3Jlc3Mgc2VtYW50aWNzLCBpbmNsdWRpbmcgdW51c3VhbC9lbXB0eSBtYXJrZXJzLAogICAgLy8gbmVzdGVkL29yZGVyZWQgbGlzdHMgYW5kIGZlbmNlZCBleGFtcGxlcy4gT25seSB4IG1lYW5zIGRvbmU7IGxpbmtzIHN0YXkgbGlua3MuCiAgICBjb25zdCBtYXRjaCA9IGxpbmUubWF0Y2goL15ccyooPzpbLSorXXxcZHsxLDl9Wy4pXSlccypcWyg/OlxzKihbXlxdXHNdPylccypcXSg/IVsoW10pfFxzK1xdKVxzKiguKikvKTsKICAgIGlmICghbWF0Y2gpIHJldHVybjsKICAgIGxldCBkZXNjcmlwdGlvbiA9IG1hdGNoWzJdLnRyaW0oKTsKICAgIGxldCBpZCA9IGBsaW5lLSR7aW5kZXggKyAxfWA7CiAgICBsZXQgcm9sZSA9IG51bGw7CiAgICBjb25zdCBudW1iZXIgPSBkZXNjcmlwdGlvbi5tYXRjaCgvXihcZCsoPzpcLlxkKykrfFxkKylcLj9ccysvKTsKICAgIGlmIChudW1iZXIpIHsgaWQgPSBudW1iZXJbMV07IGRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb24uc2xpY2UobnVtYmVyWzBdLmxlbmd0aCk7IH0KICAgIGNvbnN0IHJvbGVQcmVmaXggPSBkZXNjcmlwdGlvbi5tYXRjaCgvXlxbKFNBfEZyb250ZW5kfEJhY2tlbmR8UUEpXF1ccyovKTsKICAgIGlmIChyb2xlUHJlZml4KSB7CiAgICAgIHJvbGUgPSByb2xlUHJlZml4WzFdOwogICAgICBkZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uLnNsaWNlKHJvbGVQcmVmaXhbMF0ubGVuZ3RoKTsKICAgICAgaWYgKCFudW1iZXIpIHsKICAgICAgICBjb25zdCBhZnRlciA9IGRlc2NyaXB0aW9uLm1hdGNoKC9eKFxkKyg/OlwuXGQrKSt8XGQrKVwuP1xzKy8pOwogICAgICAgIGlmIChhZnRlcikgeyBpZCA9IGFmdGVyWzFdOyBkZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uLnNsaWNlKGFmdGVyWzBdLmxlbmd0aCk7IH0KICAgICAgfQogICAgfQogICAgcmVxdWlyZVZhbHVlKHRleHQoZGVzY3JpcHRpb24sIDQwMDApLCAnQSB0YXNrIGhhcyBhbiBlbXB0eSBvciBvdmVyc2l6ZWQgZGVzY3JpcHRpb24uJyk7CiAgICB0YXNrcy5wdXNoKHsgaWQsIGRlc2NyaXB0aW9uLCBkb25lOiAobWF0Y2hbMV0gfHwgJycpLnRvTG93ZXJDYXNlKCkgPT09ICd4JywgbGluZTogaW5kZXggKyAxLCBzb3VyY2VQYXRoLCByb2xlIH0pOwogICAgcmVxdWlyZVZhbHVlKHRhc2tzLmxlbmd0aCA8PSBNQVhfVEFTS1MsICdBIHJlcXVpcmVtZW50IGV4Y2VlZGVkIHRoZSA1MDAtdGFzayBsaW1pdC4nKTsKICB9KTsKICB1bmlxdWUodGFza3MubWFwKHRhc2sgPT4gdGFzay5pZCksICdEdXBsaWNhdGUgdGFzayBJRHMgaW4gYSByZXF1aXJlbWVudC4nKTsKICByZXR1cm4gdGFza3M7Cn0KCmZ1bmN0aW9uIGFydGlmYWN0KGlkLCB0YXJnZXQsIHJvb3QsIHdhcm5pbmdzKSB7CiAgY29uc3QgY29udGVudCA9IHJlYWRGaWxlKHRhcmdldCwgcm9vdCk7CiAgaWYgKGNvbnRlbnQgPT09IG51bGwpIHdhcm5pbmdzLnB1c2goYE1pc3NpbmcgJHtpZH0gYXJ0aWZhY3Q6ICR7cGF0aC5yZWxhdGl2ZShyb290LCB0YXJnZXQpfS5gKTsKICByZXR1cm4geyBpZCwgcGF0aDogdGFyZ2V0LCBzdGF0dXM6IGNvbnRlbnQgPT09IG51bGwgPyAnbWlzc2luZycgOiAncHJlc2VudCcsIGNvbnRlbnQ6IGNvbnRlbnQgfHwgJycgfTsKfQoKZnVuY3Rpb24gc3BlY3NBcnRpZmFjdChjaGFuZ2VSb290LCB3b3Jrc3BhY2UsIHdhcm5pbmdzKSB7CiAgY29uc3QgdGFyZ2V0ID0gcGF0aC5qb2luKGNoYW5nZVJvb3QsICdzcGVjcycpOwogIGNvbnN0IHBpZWNlcyA9IFtdOwogIGxldCBjb21iaW5lZEJ5dGVzID0gMDsKICBsZXQgZW50cnlDb3VudCA9IDA7CiAgZnVuY3Rpb24gc2NhbihkaXJlY3RvcnksIGRlcHRoKSB7CiAgICByZXF1aXJlVmFsdWUoZGVwdGggPD0gOCwgJ0EgcmVxdWlyZW1lbnQgZXhjZWVkZWQgdGhlIHNwZWNpZmljYXRpb24gZGlyZWN0b3J5IGRlcHRoIGxpbWl0LicpOwogICAgcmVxdWlyZVZhbHVlKHNhZmVQYXRoKGRpcmVjdG9yeSwgd29ya3NwYWNlKSAmJiBmcy5zdGF0U3luYyhkaXJlY3RvcnkpLmlzRGlyZWN0b3J5KCksICdFeHBlY3RlZCBhIHNwZWNzIGRpcmVjdG9yeS4nKTsKICAgIGNvbnN0IGVudHJpZXMgPSBmcy5yZWFkZGlyU3luYyhkaXJlY3RvcnksIHsgd2l0aEZpbGVUeXBlczogdHJ1ZSB9KS5zb3J0KChhLCBiKSA9PiBhLm5hbWUubG9jYWxlQ29tcGFyZShiLm5hbWUpKTsKICAgIGVudHJ5Q291bnQgKz0gZW50cmllcy5sZW5ndGg7CiAgICByZXF1aXJlVmFsdWUoZW50cnlDb3VudCA8PSA1MDAsICdBIHJlcXVpcmVtZW50IGV4Y2VlZGVkIHRoZSBzcGVjaWZpY2F0aW9uIGRpcmVjdG9yeSBlbnRyeSBsaW1pdC4nKTsKICAgIGZvciAoY29uc3QgZW50cnkgb2YgZW50cmllcykgewogICAgICByZXF1aXJlVmFsdWUoIWVudHJ5LmlzU3ltYm9saWNMaW5rKCksICdTeW1saW5rZWQgc3BlY2lmaWNhdGlvbiBwYXRocyBhcmUgbm90IHN1cHBvcnRlZC4nKTsKICAgICAgY29uc3QgZmlsZSA9IHBhdGguam9pbihkaXJlY3RvcnksIGVudHJ5Lm5hbWUpOwogICAgICBpZiAoZW50cnkuaXNEaXJlY3RvcnkoKSkgewogICAgICAgIHJlcXVpcmVWYWx1ZShTTFVHLnRlc3QoZW50cnkubmFtZSksICdTcGVjaWZpY2F0aW9uIGRpcmVjdG9yeSBuYW1lcyBtdXN0IGJlIGtlYmFiLWNhc2UuJyk7CiAgICAgICAgc2NhbihmaWxlLCBkZXB0aCArIDEpOwogICAgICB9IGVsc2UgaWYgKGVudHJ5Lm5hbWUgPT09ICdzcGVjLm1kJykgewogICAgICAgIGNvbnN0IGNvbnRlbnQgPSByZWFkRmlsZShmaWxlLCB3b3Jrc3BhY2UpOwogICAgICAgIHJlcXVpcmVWYWx1ZShjb250ZW50ICE9PSBudWxsLCAnQSBzcGVjaWZpY2F0aW9uIGNoYW5nZWQgd2hpbGUgaXQgd2FzIGJlaW5nIHJlYWQ7IHJlZnJlc2ggdG8gdHJ5IGFnYWluLicpOwogICAgICAgIGNvbnN0IHBpZWNlID0gYCMgJHtwYXRoLnJlbGF0aXZlKHdvcmtzcGFjZSwgZmlsZSl9XG5cbiR7Y29udGVudH1gOwogICAgICAgIGNvbWJpbmVkQnl0ZXMgKz0gQnVmZmVyLmJ5dGVMZW5ndGgocGllY2UsICd1dGY4JykgKyAocGllY2VzLmxlbmd0aCA/IDcgOiAwKTsKICAgICAgICByZXF1aXJlVmFsdWUoY29tYmluZWRCeXRlcyA8PSBNQVhfTUVUQURBVEEsICdDb21iaW5lZCByZXF1aXJlbWVudCBzcGVjaWZpY2F0aW9ucyBleGNlZWRlZCB0aGUgMTI4IEtpQiBsaW1pdC4nKTsKICAgICAgICBwaWVjZXMucHVzaChwaWVjZSk7CiAgICAgIH0KICAgIH0KICB9CiAgaWYgKHNhZmVQYXRoKHRhcmdldCwgd29ya3NwYWNlKSkgc2Nhbih0YXJnZXQsIDApOwogIGlmICghcGllY2VzLmxlbmd0aCkgd2FybmluZ3MucHVzaCgnTWlzc2luZyBzcGVjcyBhcnRpZmFjdDogbm8gY2FwYWJpbGl0eSBzcGVjLm1kIGZpbGVzIGZvdW5kLicpOwogIGNvbnN0IGNvbnRlbnQgPSBwaWVjZXMuam9pbignXG5cbi0tLVxuXG4nKTsKICByZXF1aXJlVmFsdWUoQnVmZmVyLmJ5dGVMZW5ndGgoY29udGVudCwgJ3V0ZjgnKSA8PSBNQVhfTUVUQURBVEEsICdDb21iaW5lZCByZXF1aXJlbWVudCBzcGVjaWZpY2F0aW9ucyBleGNlZWRlZCB0aGUgMTI4IEtpQiBsaW1pdC4nKTsKICByZXR1cm4geyBpZDogJ3NwZWNzJywgcGF0aDogdGFyZ2V0LCBzdGF0dXM6IHBpZWNlcy5sZW5ndGggPyAncHJlc2VudCcgOiAnbWlzc2luZycsIGNvbnRlbnQgfTsKfQoKZnVuY3Rpb24gcmVxdWlyZW1lbnQoaXRlbSwgd29ya3NwYWNlKSB7CiAgY29uc3Qgcm9vdCA9IHBhdGguam9pbih3b3Jrc3BhY2UsICdvcGVuc3BlYycsICdjaGFuZ2VzJywgaXRlbS5jaGFuZ2UpOwogIHNhZmVQYXRoKHJvb3QsIHdvcmtzcGFjZSk7CiAgY29uc3Qgd2FybmluZ3MgPSBbXTsKICBjb25zdCBhcnRpZmFjdHMgPSBbYXJ0aWZhY3QoJ3Byb3Bvc2FsJywgcGF0aC5qb2luKHJvb3QsICdwcm9wb3NhbC5tZCcpLCB3b3Jrc3BhY2UsIHdhcm5pbmdzKSwKICAgIGFydGlmYWN0KCdkZXNpZ24nLCBwYXRoLmpvaW4ocm9vdCwgJ2Rlc2lnbi5tZCcpLCB3b3Jrc3BhY2UsIHdhcm5pbmdzKSwgc3BlY3NBcnRpZmFjdChyb290LCB3b3Jrc3BhY2UsIHdhcm5pbmdzKSwKICAgIGFydGlmYWN0KCd0YXNrcycsIHBhdGguam9pbihyb290LCAndGFza3MubWQnKSwgd29ya3NwYWNlLCB3YXJuaW5ncyldOwogIGNvbnN0IHRhc2tzID0gcGFyc2VUYXNrcyhhcnRpZmFjdHNbM10uY29udGVudCwgYXJ0aWZhY3RzWzNdLnBhdGgpOwogIGNvbnN0IHJvbGVzID0gUk9MRV9JRFMubWFwKChpZCwgaW5kZXgpID0+IHsKICAgIGNvbnN0IG1ldGFkYXRhID0gaXRlbS5yb2xlc1tpZF07CiAgICBjb25zdCBvd25UYXNrcyA9IHRhc2tzLmZpbHRlcih0YXNrID0+IHRhc2sucm9sZSA9PT0gaWQpOwogICAgY29uc3QgY29tcGxldGUgPSBvd25UYXNrcy5maWx0ZXIodGFzayA9PiB0YXNrLmRvbmUpLmxlbmd0aDsKICAgIGlmICghbWV0YWRhdGEpIHdhcm5pbmdzLnB1c2goYCR7aWR9IGhhcyBubyBvd25lciBvciBzdGF0ZSBtZXRhZGF0YS5gKTsKICAgIGlmICghb3duVGFza3MubGVuZ3RoKSB3YXJuaW5ncy5wdXNoKGAke2lkfSBoYXMgbm8gdHJhY2tlZCB0YXNrczsgY29tcGxldGlvbiBpcyB1bnZlcmlmaWVkLmApOwogICAgY29uc3Qgc3RhdGUgPSBvd25UYXNrcy5sZW5ndGggPiAwICYmIGNvbXBsZXRlID09PSBvd25UYXNrcy5sZW5ndGggPyAnZG9uZScKICAgICAgOiBtZXRhZGF0YT8uc3RhdGUgPT09ICdibG9ja2VkJyA/ICdibG9ja2VkJwogICAgICAgIDogY29tcGxldGUgPiAwIHx8IG1ldGFkYXRhPy5zdGF0ZSA9PT0gJ2luX3Byb2dyZXNzJyA/ICdpbl9wcm9ncmVzcycgOiAnYmFja2xvZyc7CiAgICByZXR1cm4geyBpZCwgbGFiZWw6IFJPTEVfTEFCRUxTW2luZGV4XSwgb3duZXI6IG1ldGFkYXRhPy5vd25lciB8fCAnVW5hc3NpZ25lZCcsIHN0YXRlLCBub3RlOiBtZXRhZGF0YT8ubm90ZSB8fCAnJywKICAgICAgY29tcGxldGUsIHRvdGFsOiBvd25UYXNrcy5sZW5ndGgsIHRhc2tzOiBvd25UYXNrcyB9OwogIH0pOwogIGNvbnN0IHVuYXNzaWduZWQgPSB0YXNrcy5maWx0ZXIodGFzayA9PiB0YXNrLnJvbGUgPT09IG51bGwpOwogIGlmICh1bmFzc2lnbmVkLmxlbmd0aCkgd2FybmluZ3MucHVzaChgJHt1bmFzc2lnbmVkLmxlbmd0aH0gdGFzayR7dW5hc3NpZ25lZC5sZW5ndGggPT09IDEgPyAnJyA6ICdzJ30gd2l0aG91dCBhIHJlY29nbml6ZWQgcm9sZTsgYXNzaWduIFNBLCBGcm9udGVuZCwgQmFja2VuZCwgb3IgUUEuYCk7CiAgY29uc3Qgcm9sZXNDb21wbGV0ZSA9IHJvbGVzLmZpbHRlcihyb2xlID0+IHJvbGUuc3RhdGUgPT09ICdkb25lJykubGVuZ3RoOwogIGxldCBzdGFnZTsKICBpZiAocm9sZXMuc29tZShyb2xlID0+IHJvbGUuc3RhdGUgPT09ICdibG9ja2VkJykpIHN0YWdlID0gJ2Jsb2NrZWQnOwogIGVsc2UgaWYgKHJvbGVzQ29tcGxldGUgPT09IFJPTEVfSURTLmxlbmd0aCAmJiB1bmFzc2lnbmVkLmV2ZXJ5KHRhc2sgPT4gdGFzay5kb25lKSkgc3RhZ2UgPSAnZG9uZSc7CiAgZWxzZSBpZiAocm9sZXMuZXZlcnkocm9sZSA9PiByb2xlLnN0YXRlID09PSAnYmFja2xvZycpKSBzdGFnZSA9ICdiYWNrbG9nJzsKICBlbHNlIGlmIChyb2xlc1swXS5zdGF0ZSAhPT0gJ2RvbmUnKSBzdGFnZSA9ICdzYSc7CiAgZWxzZSBpZiAocm9sZXNbMV0uc3RhdGUgIT09ICdkb25lJyB8fCByb2xlc1syXS5zdGF0ZSAhPT0gJ2RvbmUnKSBzdGFnZSA9ICdpbXBsZW1lbnRhdGlvbic7CiAgZWxzZSBpZiAocm9sZXNbM10uc3RhdGUgIT09ICdkb25lJykgc3RhZ2UgPSAncWEnOwogIGVsc2Ugc3RhZ2UgPSAnaW1wbGVtZW50YXRpb24nOwogIHJldHVybiB7IGlkOiBpdGVtLmlkLCB0aXRsZTogaXRlbS50aXRsZSwgc3VtbWFyeTogaXRlbS5zdW1tYXJ5LCBjaGFuZ2U6IGl0ZW0uY2hhbmdlLAogICAgc3RhZ2UsIHJvbGVzLCBjb21wbGV0ZTogdGFza3MuZmlsdGVyKHRhc2sgPT4gdGFzay5kb25lKS5sZW5ndGgsIHRvdGFsOiB0YXNrcy5sZW5ndGgsIHJvbGVzQ29tcGxldGUsCiAgICB0YXNrcywgd2FybmluZ3MsIGFydGlmYWN0cyB9Owp9CgpmdW5jdGlvbiBlcnJvclJlc3VsdChlcnJvcikgewogIHJldHVybiB7IHZlcnNpb246IDEsIGtpbmQ6ICdlcnJvcicsIG1lc3NhZ2U6IGVycm9yIGluc3RhbmNlb2YgQ29sbGVjdG9yRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogJ0NvdWxkIG5vdCByZWFkIHRoZSBsb2NhbCBPcGVuU3BlYyBzdG9yZS4gQ2hlY2sgaXRzIGRpcmVjdG9yeSBhbmQgZmlsZSBwZXJtaXNzaW9ucy4nIH07Cn0KCmFzeW5jIGZ1bmN0aW9uIGNvbGxlY3QoaW5wdXQsIHsgY3dkID0gcHJvY2Vzcy5jd2QoKSB9ID0ge30pIHsKICB0cnkgewogICAgcmVxdWlyZVZhbHVlKG9iamVjdChpbnB1dCkgJiYgZmllbGRzKGlucHV0LCBbJ2FjdGlvbiddKSAmJiBpbnB1dC5hY3Rpb24gPT09ICdib2FyZCcsICdVbnN1cHBvcnRlZCBjb2xsZWN0b3IgcmVxdWVzdC4nKTsKICAgIHJlcXVpcmVWYWx1ZSh0ZXh0KGN3ZCwgNDA5NikgJiYgcGF0aC5pc0Fic29sdXRlKGN3ZCkgJiYgIS9bXHJcbl0vLnRlc3QoY3dkKSAmJiAhbG9jYWxTZWdtZW50KGN3ZCksICdXb3Jrc3BhY2UgbXVzdCBiZSBhbiBhYnNvbHV0ZSBsb2NhbCBzdG9yZSBwYXRoLicpOwogICAgY29uc3Qgd29ya3NwYWNlID0gcGF0aC5yZXNvbHZlKGN3ZCk7CiAgICByZXF1aXJlVmFsdWUoc2FmZVBhdGgod29ya3NwYWNlLCB3b3Jrc3BhY2UpICYmIGZzLnN0YXRTeW5jKHdvcmtzcGFjZSkuaXNEaXJlY3RvcnkoKSwgJ1N0b3JlIGRpcmVjdG9yeSBpcyB1bmF2YWlsYWJsZS4nKTsKICAgIGNvbnN0IHJhdyA9IHJlYWRGaWxlKHBhdGguam9pbih3b3Jrc3BhY2UsICdvcGVuc3BlYycsICdyZXF1aXJlbWVudHMuanNvbicpLCB3b3Jrc3BhY2UsIE1BWF9NRVRBREFUQSk7CiAgICByZXF1aXJlVmFsdWUocmF3ICE9PSBudWxsLCAnTWlzc2luZyBvcGVuc3BlYy9yZXF1aXJlbWVudHMuanNvbi4gU2VsZWN0IGFuIE9wZW5TcGVjIHN0b3JlIGRpcmVjdG9yeS4nKTsKICAgIGxldCBtZXRhZGF0YTsKICAgIHRyeSB7IG1ldGFkYXRhID0gSlNPTi5wYXJzZShyYXcpOyB9IGNhdGNoIHsgdGhyb3cgbmV3IENvbGxlY3RvckVycm9yKCdvcGVuc3BlYy9yZXF1aXJlbWVudHMuanNvbiBpcyBub3QgdmFsaWQgSlNPTi4nKTsgfQogICAgdmFsaWRhdGVNZXRhZGF0YShtZXRhZGF0YSk7CiAgICBjb25zdCByZXN1bHQgPSB7IHZlcnNpb246IDEsIGtpbmQ6ICdib2FyZCcsIHdvcmtzcGFjZSwgbmFtZTogbWV0YWRhdGEubmFtZSwgZGVzY3JpcHRpb246IG1ldGFkYXRhLmRlc2NyaXB0aW9uLAogICAgICBnZW5lcmF0ZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLCByZXF1aXJlbWVudHM6IG1ldGFkYXRhLnJlcXVpcmVtZW50cy5tYXAoaXRlbSA9PiByZXF1aXJlbWVudChpdGVtLCB3b3Jrc3BhY2UpKSB9OwogICAgcmVxdWlyZVZhbHVlKEJ1ZmZlci5ieXRlTGVuZ3RoKEpTT04uc3RyaW5naWZ5KHJlc3VsdCksICd1dGY4JykgPD0gTUFYX09VVFBVVCwgJ1N0b3JlIGRhdGEgZXhjZWVkZWQgdGhlIDUxMiBLaUIgb3V0cHV0IGxpbWl0LicpOwogICAgcmV0dXJuIHJlc3VsdDsKICB9IGNhdGNoIChlcnJvcikgeyByZXR1cm4gZXJyb3JSZXN1bHQoZXJyb3IpOyB9Cn0KCmFzeW5jIGZ1bmN0aW9uIG1haW4oKSB7CiAgbGV0IHJlc3VsdDsKICB0cnkgewogICAgY29uc3QgZW5jb2RlZCA9IHByb2Nlc3MuYXJndlttb2R1bGUuaWQgPT09ICdbZXZhbF0nID8gMSA6IDJdOwogICAgcmVxdWlyZVZhbHVlKHR5cGVvZiBlbmNvZGVkID09PSAnc3RyaW5nJyAmJiBlbmNvZGVkLmxlbmd0aCA+IDAgJiYgZW5jb2RlZC5sZW5ndGggPD0gNDA5NgogICAgICAmJiAvXig/OltBLVphLXowLTkrL117NH0pKig/OltBLVphLXowLTkrL117Mn09PXxbQS1aYS16MC05Ky9dezN9PSk/JC8udGVzdChlbmNvZGVkKSwgJ0V4cGVjdGVkIG9uZSBiYXNlNjQtZW5jb2RlZCBKU09OIGlucHV0LicpOwogICAgY29uc3QgZGVjb2RlZCA9IEJ1ZmZlci5mcm9tKGVuY29kZWQsICdiYXNlNjQnKTsKICAgIHJlcXVpcmVWYWx1ZShkZWNvZGVkLnRvU3RyaW5nKCdiYXNlNjQnKSA9PT0gZW5jb2RlZCAmJiBCdWZmZXIuZnJvbShkZWNvZGVkLnRvU3RyaW5nKCd1dGY4JyksICd1dGY4JykuZXF1YWxzKGRlY29kZWQpLCAnSW52YWxpZCBpbnB1dCBlbmNvZGluZy4nKTsKICAgIGxldCBpbnB1dDsKICAgIHRyeSB7IGlucHV0ID0gSlNPTi5wYXJzZShkZWNvZGVkLnRvU3RyaW5nKCd1dGY4JykpOyB9IGNhdGNoIHsgdGhyb3cgbmV3IENvbGxlY3RvckVycm9yKCdJbnB1dCB3YXMgbm90IHZhbGlkIEpTT04uJyk7IH0KICAgIHJlc3VsdCA9IGF3YWl0IGNvbGxlY3QoaW5wdXQpOwogIH0gY2F0Y2ggKGVycm9yKSB7IHJlc3VsdCA9IGVycm9yUmVzdWx0KGVycm9yKTsgfQogIHByb2Nlc3Muc3Rkb3V0LndyaXRlKEpTT04uc3RyaW5naWZ5KHJlc3VsdCkgKyAnXG4nKTsKICBpZiAocmVzdWx0LmtpbmQgPT09ICdlcnJvcicpIHByb2Nlc3MuZXhpdENvZGUgPSAxOwp9Cgptb2R1bGUuZXhwb3J0cyA9IHsgY29sbGVjdCB9OwppZiAocmVxdWlyZS5tYWluID09PSBtb2R1bGUgfHwgbW9kdWxlLmlkID09PSAnW2V2YWxdJykgbWFpbigpOwo="), (character) => character.charCodeAt(0)));

// src/client.js
var ROLES = ["SA", "Frontend", "Backend", "QA"];
var LABELS = ["Solution Architect", "Frontend", "Backend", "Quality Assurance"];
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
function validateTask(task, tasksPath) {
  check(fields(task, ["id", "description", "done", "line", "sourcePath", "role"]) && text(task.id, 100) && text(task.description, 4e3) && typeof task.done === "boolean" && Number.isSafeInteger(task.line) && task.line > 0 && task.line <= 65536 && task.sourcePath === tasksPath && (task.role === null || ROLES.includes(task.role)));
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
  check(fields(data, ["version", "kind", "workspace", "name", "description", "generatedAt", "requirements"]) && data.version === 1 && data.kind === "board" && data.workspace === cwd && text(data.name, 200) && text(data.description, 4e3, true) && typeof data.generatedAt === "string" && Number.isFinite(Date.parse(data.generatedAt)) && new Date(data.generatedAt).toISOString() === data.generatedAt && Array.isArray(data.requirements) && data.requirements.length <= 50);
  const age = now - Date.parse(data.generatedAt);
  check(age >= -6e4 && age <= 3e5, "The store returned an old snapshot or its server clock differs. Refresh and check the Agent Server clock.");
  check(encoder.encode(JSON.stringify(data)).length <= LIMIT, "Store data exceeded the 512 KiB output limit.");
  data.requirements.forEach((item) => validateRequirement(item, cwd));
  check(unique(data.requirements.map((item) => item.id)) && unique(data.requirements.map((item) => item.change)));
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
var automation_bridge_default = new TextDecoder().decode(Uint8Array.from(atob("IiIiQm91bmRlZCBuYXRpdmUgQXV0b21hdGlvbiBicmlkZ2UuIEV4ZWN1dGVkIGluc2lkZSBBZ2VudCBTZXJ2ZXIsIG5ldmVyIENhbnZhcy4KCk9ubHkgZXhwbGljaXQgc2V0dXAgaW5zdGFsbHMgdGhlIGZpeGVkIHJlcG9zaXRvcnkncyBidW5kbGVzLiBPbmx5IGRpc3BhdGNoIHNlbmRzCmFuIGV2ZW50LiBDcmVkZW50aWFscyByZW1haW4gaW4gdGhpcyBwcm9jZXNzIGFuZCBwcml2YXRlLCBwZXItYmFja2VuZCBzdGF0ZS4KIiIiCmltcG9ydCBiYXNlNjQKaW1wb3J0IGNvbnRleHRsaWIKaW1wb3J0IGZjbnRsCmltcG9ydCBoYXNobGliCmltcG9ydCBobWFjCmltcG9ydCBpbwppbXBvcnQganNvbgppbXBvcnQgb3MKZnJvbSBwYXRobGliIGltcG9ydCBQYXRoCmltcG9ydCByZQppbXBvcnQgc2VjcmV0cwppbXBvcnQgc3lzCmltcG9ydCB0YXJmaWxlCmltcG9ydCB0ZW1wZmlsZQppbXBvcnQgdXJsbGliLmVycm9yCmltcG9ydCB1cmxsaWIucGFyc2UKaW1wb3J0IHVybGxpYi5yZXF1ZXN0CmltcG9ydCB1dWlkCgpSRVBPU0lUT1JZID0gUGF0aCgnL1VzZXJzL29rYS9EZXNrdG9wL29wZW5oYW5kcy1hdXRvbWF0aW9uJykKU09VUkNFID0gJ29wZW5zcGVjLXJvbGUtZGFzaGJvYXJkJwpTQ0hFTUEgPSBTT1VSQ0UgKyAnL3YxJwpTVEFHRVMgPSAoJ3Byb3Bvc2UnLCAndXBkYXRlJywgJ2FwcGx5JykKUk9MRVMgPSAoJ1NBJywgJ0Zyb250ZW5kJywgJ0JhY2tlbmQnLCAnUUEnKQpQQUlSUyA9IHR1cGxlKChyb2xlLCBzdGFnZSkgZm9yIHJvbGUgaW4gUk9MRVMgZm9yIHN0YWdlIGluIFNUQUdFUykKU1RBVFVTRVMgPSAoJ1BFTkRJTkcnLCAnUlVOTklORycsICdDT01QTEVURUQnLCAnRkFJTEVEJywgJ0NBTkNFTExFRCcsICdTS0lQUEVEJykKQlVORExFX0ZJTEVTID0gKCdjb25maWcuanNvbicsICdwcm9tcHQubWQnLCAncnVuLnB5JykKU09VUkNFX05BTUUgPSAnT3BlblNwZWMgcm9sZSBkYXNoYm9hcmQgwrcgZXhwbGljaXQgc2tpbGwgcmVxdWVzdHMnCgoKY2xhc3MgQnJpZGdlRXJyb3IoRXhjZXB0aW9uKToKICAgIHBhc3MKCgpkZWYgcmVxdWlyZShjb25kaXRpb24sIG1lc3NhZ2UpOgogICAgaWYgbm90IGNvbmRpdGlvbjoKICAgICAgICByYWlzZSBCcmlkZ2VFcnJvcihtZXNzYWdlKQoKCmRlZiBpZGVudGlmaWVyKHZhbHVlKToKICAgIHRyeToKICAgICAgICByZXR1cm4gaXNpbnN0YW5jZSh2YWx1ZSwgc3RyKSBhbmQgc3RyKHV1aWQuVVVJRCh2YWx1ZSkpID09IHZhbHVlCiAgICBleGNlcHQgKFZhbHVlRXJyb3IsIEF0dHJpYnV0ZUVycm9yKToKICAgICAgICByZXR1cm4gRmFsc2UKCgpkZWYgc2x1Zyh2YWx1ZSk6CiAgICByZXR1cm4gaXNpbnN0YW5jZSh2YWx1ZSwgc3RyKSBhbmQgbGVuKHZhbHVlKSA8PSAxMDAgYW5kIHJlLmZ1bGxtYXRjaChyJ1thLXowLTldKyg/Oi1bYS16MC05XSspKicsIHZhbHVlKQoKCmRlZiBsb2NhbF9wYXRoKHZhbHVlKToKICAgIHJlcXVpcmUoaXNpbnN0YW5jZSh2YWx1ZSwgc3RyKSBhbmQgMSA8IGxlbih2YWx1ZSkgPD0gNDA5NiBhbmQgdmFsdWUuc3RhcnRzd2l0aCgnLycpCiAgICAgICAgICAgIGFuZCBub3QgYW55KGNoYXIgaW4gdmFsdWUgZm9yIGNoYXIgaW4gJ1x4MDBcclxuXFwnKSBhbmQgbm90IHZhbHVlLmVuZHN3aXRoKCcvJykKICAgICAgICAgICAgYW5kICcvLycgbm90IGluIHZhbHVlIGFuZCBub3Qgc2V0KFBhdGgodmFsdWUpLnBhcnRzKSAmIHsnLicsICcuLicsICcubG9jYWwnfQogICAgICAgICAgICBhbmQgJy8uLycgbm90IGluIHZhbHVlLCAnRXhwZWN0ZWQgYSBjYW5vbmljYWwgYWJzb2x1dGUgbG9jYWwgZGlyZWN0b3J5JykKICAgIHBhdGggPSBQYXRoKHZhbHVlKQogICAgcmVxdWlyZShwYXRoLnJlc29sdmUoKSA9PSBwYXRoLCAnU3ltbGlua2VkIHNvdXJjZSBkaXJlY3RvcmllcyBhcmUgbm90IHN1cHBvcnRlZCcpCiAgICByZXR1cm4gcGF0aAoKCmRlZiBlbmNvZGUodmFsdWUpOgogICAgcmV0dXJuIGpzb24uZHVtcHModmFsdWUsIGVuc3VyZV9hc2NpaT1GYWxzZSwgYWxsb3dfbmFuPUZhbHNlLCBzZXBhcmF0b3JzPSgnLCcsICc6JykpLmVuY29kZSgpCgoKZGVmIHJlYWRfYnl0ZXMocGF0aCwgbGltaXQ9MTI4ICogMTAyNCk6CiAgICByZXF1aXJlKHBhdGgucmVzb2x2ZSgpID09IHBhdGggYW5kIHBhdGguaXNfZmlsZSgpIGFuZCBub3QgcGF0aC5pc19zeW1saW5rKCksICdNaXNzaW5nIG9yIHN5bWxpbmtlZCBsb2NhbCBzb3VyY2UgZmlsZScpCiAgICBkZXNjcmlwdG9yID0gb3Mub3BlbihwYXRoLCBvcy5PX1JET05MWSB8IG9zLk9fTk9GT0xMT1cpCiAgICB3aXRoIG9zLmZkb3BlbihkZXNjcmlwdG9yLCAncmInKSBhcyBzdHJlYW06CiAgICAgICAgcmF3ID0gc3RyZWFtLnJlYWQobGltaXQgKyAxKQogICAgcmVxdWlyZShsZW4ocmF3KSA8PSBsaW1pdCwgJ0xvY2FsIHNvdXJjZSBmaWxlIGV4Y2VlZGVkIGl0cyBzaXplIGxpbWl0JykKICAgIHJldHVybiByYXcKCgpkZWYgcmVhZF9qc29uKHBhdGgsIGxpbWl0PTEyOCAqIDEwMjQpOgogICAgdHJ5OgogICAgICAgIHJldHVybiBqc29uLmxvYWRzKHJlYWRfYnl0ZXMocGF0aCwgbGltaXQpLmRlY29kZSgndXRmLTgnKSkKICAgIGV4Y2VwdCAoVW5pY29kZUVycm9yLCBWYWx1ZUVycm9yKToKICAgICAgICByYWlzZSBCcmlkZ2VFcnJvcignSW52YWxpZCBKU09OIGluIGEgbG9jYWwgQXV0b21hdGlvbiBzb3VyY2UgZmlsZScpIGZyb20gTm9uZQoKCmRlZiBhdG9taWNfanNvbihwYXRoLCB2YWx1ZSk6CiAgICBkZXNjcmlwdG9yLCB0ZW1wb3JhcnkgPSB0ZW1wZmlsZS5ta3N0ZW1wKGRpcj1wYXRoLnBhcmVudCkKICAgIHRyeToKICAgICAgICB3aXRoIG9zLmZkb3BlbihkZXNjcmlwdG9yLCAnd2InKSBhcyBzdHJlYW06CiAgICAgICAgICAgIHN0cmVhbS53cml0ZShlbmNvZGUodmFsdWUpKQogICAgICAgICAgICBzdHJlYW0uZmx1c2goKQogICAgICAgICAgICBvcy5mc3luYyhzdHJlYW0uZmlsZW5vKCkpCiAgICAgICAgb3MucmVwbGFjZSh0ZW1wb3JhcnksIHBhdGgpCiAgICBmaW5hbGx5OgogICAgICAgIGlmIG9zLnBhdGguZXhpc3RzKHRlbXBvcmFyeSk6CiAgICAgICAgICAgIG9zLnVubGluayh0ZW1wb3JhcnkpCgoKY2xhc3MgTm9SZWRpcmVjdCh1cmxsaWIucmVxdWVzdC5IVFRQUmVkaXJlY3RIYW5kbGVyKToKICAgIGRlZiByZWRpcmVjdF9yZXF1ZXN0KHNlbGYsIHJlcSwgZnAsIGNvZGUsIG1zZywgaGVhZGVycywgbmV3dXJsKToKICAgICAgICByZXR1cm4gTm9uZQoKCmRlZiByZXF1ZXN0X2pzb24odXJsLCAqLCBtZXRob2Q9J0dFVCcsIGJvZHk9Tm9uZSwgaGVhZGVycz1Ob25lKToKICAgIHJhdyA9IGJvZHkgaWYgaXNpbnN0YW5jZShib2R5LCBieXRlcykgZWxzZSBOb25lIGlmIGJvZHkgaXMgTm9uZSBlbHNlIGVuY29kZShib2R5KQogICAgcmVxdWVzdCA9IHVybGxpYi5yZXF1ZXN0LlJlcXVlc3QodXJsLCBkYXRhPXJhdywgbWV0aG9kPW1ldGhvZCwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVycz17J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJywgKiooaGVhZGVycyBvciB7fSl9KQogICAgdHJ5OgogICAgICAgIHdpdGggdXJsbGliLnJlcXVlc3QuYnVpbGRfb3BlbmVyKE5vUmVkaXJlY3QpLm9wZW4ocmVxdWVzdCwgdGltZW91dD01KSBhcyByZXNwb25zZToKICAgICAgICAgICAgcmVzdWx0ID0gcmVzcG9uc2UucmVhZCgxXzAwMF8wMDEpCiAgICAgICAgcmVxdWlyZShsZW4ocmVzdWx0KSA8PSAxXzAwMF8wMDAsICdBdXRvbWF0aW9uIHJlc3BvbnNlIGV4Y2VlZGVkIGl0cyBzaXplIGxpbWl0JykKICAgICAgICBpZiBtZXRob2QgPT0gJ0RFTEVURScgYW5kIG5vdCByZXN1bHQ6CiAgICAgICAgICAgIHJldHVybiBOb25lCiAgICAgICAgcmV0dXJuIGpzb24ubG9hZHMocmVzdWx0KQogICAgZXhjZXB0IHVybGxpYi5lcnJvci5IVFRQRXJyb3IgYXMgZXJyb3I6CiAgICAgICAgc3RhdHVzID0gZXJyb3IuY29kZQogICAgICAgIGVycm9yLmNsb3NlKCkKICAgICAgICByYWlzZSBCcmlkZ2VFcnJvcihmJ0F1dG9tYXRpb24gcmVxdWVzdCBmYWlsZWQgKEhUVFAge3N0YXR1c30pOyBpbnNwZWN0IGl0cyBoaXN0b3J5IGJlZm9yZSByZXRyeWluZycpIGZyb20gTm9uZQogICAgZXhjZXB0ICh1cmxsaWIuZXJyb3IuVVJMRXJyb3IsIFRpbWVvdXRFcnJvciwgT1NFcnJvciwgVmFsdWVFcnJvcik6CiAgICAgICAgcmFpc2UgQnJpZGdlRXJyb3IoJ0F1dG9tYXRpb24gcmVxdWVzdCBvdXRjb21lIGlzIHVua25vd247IGluc3BlY3QgaXRzIGhpc3RvcnkgYmVmb3JlIHJldHJ5aW5nJykgZnJvbSBOb25lCgoKZGVmIHRyaWdnZXIocm9sZSwgc3RhZ2UpOgogICAgcmV0dXJuIHsndHlwZSc6ICdldmVudCcsICdzb3VyY2UnOiBTT1VSQ0UsICdvbic6IHN0YWdlICsgJy5yZXF1ZXN0ZWQnLAogICAgICAgICAgICAnZmlsdGVyJzogZiJzY2hlbWEgPT0gJ3tTQ0hFTUF9JyAmJiBzdGFnZSA9PSAne3N0YWdlfScgJiYgYXBwcm92YWwgPT0gJ3tzdGFnZX0nICYmIHJvbGUgPT0gJ3tyb2xlfScifQoKCmRlZiBhdXRvbWF0aW9uX25hbWUocm9sZSwgc3RhZ2UpOgogICAgcmV0dXJuIGYnT3BlblNwZWMge3JvbGV9IMK3IHtzdGFnZS50aXRsZSgpfScKCgpkZWYgcGFpcl9rZXkocm9sZSwgc3RhZ2UpOgogICAgcmV0dXJuIHJvbGUgKyAnOicgKyBzdGFnZQoKCmRlZiByZXRpcmVkX2RlZmluaXRpb25zKGludmVudG9yeSk6CiAgICAiIiJSZWNvZ25pemUgb25seSB0aGUgdGVuIGRlZmluaXRpb25zIHN1cGVyc2VkZWQgYnkgdGhlIGRlZGljYXRlZCB3b3JrZmxvdy4iIiIKICAgIGV4cGVjdGVkID0ge2YnT3BlblNwZWMge251bWJlcjowMmR9IMK3IHtzdGFnZS50aXRsZSgpfSc6CiAgICAgICAgICAgICAgICAoJ29wZW5zcGVjLWRhc2hib2FyZCcsICdleHBsb3JlLnJlcXVlc3RlZCcpIGlmIHN0YWdlID09ICdleHBsb3JlJyBlbHNlICgnb3BlbnNwZWMtbWFudWFsJywgJ21hbnVhbC1vbmx5JykKICAgICAgICAgICAgICAgIGZvciBudW1iZXIsIHN0YWdlIGluIGVudW1lcmF0ZSgoJ2V4cGxvcmUnLCAncHJvcG9zZScsICd1cGRhdGUnLCAnYXBwbHknLCAndmVyaWZ5JywgJ3N5bmMnLCAnYXJjaGl2ZScpLCAxKX0KICAgIGV4cGVjdGVkLnVwZGF0ZSh7ZidPcGVuU3BlYyBSb2xlIMK3IHtzdGFnZS50aXRsZSgpfSc6IChTT1VSQ0UsIHN0YWdlICsgJy5yZXF1ZXN0ZWQnKSBmb3Igc3RhZ2UgaW4gU1RBR0VTfSkKICAgIHJlc3VsdCA9IFtdCiAgICBmb3IgbmFtZSwgKHNvdXJjZSwgZXZlbnQpIGluIGV4cGVjdGVkLml0ZW1zKCk6CiAgICAgICAgcm93cyA9IFtyb3cgZm9yIHJvdyBpbiBpbnZlbnRvcnkgaWYgcm93LmdldCgnbmFtZScpID09IG5hbWVdCiAgICAgICAgcmVxdWlyZShsZW4ocm93cykgPD0gMSwgJ0R1cGxpY2F0ZSBzdXBlcnNlZGVkIGF1dG9tYXRpb24gbmFtZXM7IGluc3BlY3QgbmF0aXZlIGRlZmluaXRpb25zJykKICAgICAgICBpZiByb3dzOgogICAgICAgICAgICByb3cgPSByb3dzWzBdCiAgICAgICAgICAgIHJvdXRpbmcgPSByb3cuZ2V0KCd0cmlnZ2VyJykKICAgICAgICAgICAgcmVxdWlyZShpZGVudGlmaWVyKHJvdy5nZXQoJ2lkJykpIGFuZCBpc2luc3RhbmNlKHJvdXRpbmcsIGRpY3QpCiAgICAgICAgICAgICAgICAgICAgYW5kIHJvdXRpbmcuZ2V0KCdzb3VyY2UnKSA9PSBzb3VyY2UgYW5kIHJvdXRpbmcuZ2V0KCdvbicpID09IGV2ZW50LAogICAgICAgICAgICAgICAgICAgICdBIHN1cGVyc2VkZWQgbmFtZSBoYXMgdW5mYW1pbGlhciByb3V0aW5nOyBpbnNwZWN0IGl0IGJlZm9yZSByZW1vdmFsJykKICAgICAgICAgICAgcmVzdWx0LmFwcGVuZChyb3cpCiAgICByZXR1cm4gcmVzdWx0CgoKY2xhc3MgQnJpZGdlOgogICAgZGVmIF9faW5pdF9fKHNlbGYsIHNlcnZpY2UsIGhvbWUsICosIGVudj1Ob25lLCByZXF1ZXN0ZXI9cmVxdWVzdF9qc29uLCByZXBvc2l0b3J5PU5vbmUpOgogICAgICAgIGVudiA9IG9zLmVudmlyb24gaWYgZW52IGlzIE5vbmUgZWxzZSBlbnYKICAgICAgICByZXF1aXJlKGlzaW5zdGFuY2Uoc2VydmljZSwgZGljdCksICdUaGlzIGJhY2tlbmQgaGFzIG5vIGFkdmVydGlzZWQgQXV0b21hdGlvbiBzZXJ2aWNlJykKICAgICAgICBvcmlnaW4gPSBzZXJ2aWNlLmdldCgndXJsX2Zyb21fYWdlbnQnKQogICAgICAgIHRyeToKICAgICAgICAgICAgcGFyc2VkID0gdXJsbGliLnBhcnNlLnVybHNwbGl0KG9yaWdpbikKICAgICAgICAgICAgcGFyc2VkLnBvcnQKICAgICAgICBleGNlcHQgKFZhbHVlRXJyb3IsIFR5cGVFcnJvciwgQXR0cmlidXRlRXJyb3IpOgogICAgICAgICAgICByYWlzZSBCcmlkZ2VFcnJvcignSW52YWxpZCBBdXRvbWF0aW9uIHNlcnZpY2UgYWRkcmVzcycpIGZyb20gTm9uZQogICAgICAgIHJlcXVpcmUocGFyc2VkLnNjaGVtZSBpbiAoJ2h0dHAnLCAnaHR0cHMnKSBhbmQgcGFyc2VkLmhvc3RuYW1lIGluICgnbG9jYWxob3N0JywgJzEyNy4wLjAuMScsICc6OjEnKQogICAgICAgICAgICAgICAgYW5kIG5vdCBwYXJzZWQudXNlcm5hbWUgYW5kIG5vdCBwYXJzZWQucGFzc3dvcmQgYW5kIHBhcnNlZC5wYXRoIGluICgnJywgJy8nKQogICAgICAgICAgICAgICAgYW5kIG5vdCBwYXJzZWQucXVlcnkgYW5kIG5vdCBwYXJzZWQuZnJhZ21lbnQsICdPbmx5IHRoZSBhZHZlcnRpc2VkIGxvY2FsIEF1dG9tYXRpb24gc2VydmljZSBpcyBzdXBwb3J0ZWQnKQogICAgICAgIHJlcXVpcmUoc2VydmljZS5nZXQoJ2FwaV9wcmVmaXgnKSA9PSAnL2FwaS9hdXRvbWF0aW9uJyBhbmQgc2VydmljZS5nZXQoJ2F1dGhfZW52X3ZhcicpID09ICdPUEVOSEFORFNfQVVUT01BVElPTl9BUElfS0VZJywKICAgICAgICAgICAgICAgICdVbnN1cHBvcnRlZCBBdXRvbWF0aW9uIEFQSSBwcmVmaXggb3IgYXV0aGVudGljYXRpb24nKQogICAgICAgIHNlbGYua2V5ID0gZW52LmdldCgnT1BFTkhBTkRTX0FVVE9NQVRJT05fQVBJX0tFWScpCiAgICAgICAgcmVxdWlyZShpc2luc3RhbmNlKHNlbGYua2V5LCBzdHIpIGFuZCBzZWxmLmtleSwgJ0FnZW50IFNlcnZlciBoYXMgbm8gaW5qZWN0ZWQgQXV0b21hdGlvbiBrZXk7IHVzZSB0aGUgbmF0aXZlIGxvY2FsIGxhdW5jaGVyJykKICAgICAgICBzZWxmLmhvbWUgPSBsb2NhbF9wYXRoKGhvbWUpCiAgICAgICAgcmVxdWlyZShzZWxmLmhvbWUgPT0gUGF0aC5ob21lKCkucmVzb2x2ZSgpLCAnQWdlbnQgU2VydmVyIGhvbWUgZG9lcyBub3QgbWF0Y2ggdGhlIGhlbHBlciBob21lJykKICAgICAgICBzZWxmLmJhc2UgPSBvcmlnaW4ucnN0cmlwKCcvJykgKyAnL2FwaS9hdXRvbWF0aW9uL3YxJwogICAgICAgIHNlbGYucm9vdCA9IHNlbGYuaG9tZSAvICcub3BlbmhhbmRzL2FwcHMvb3BlbnNwZWMtcHJvZ3Jlc3Mvcm9sZS1hdXRvbWF0aW9uJyAvIGhhc2hsaWIuc2hhMjU2KHNlbGYuYmFzZS5lbmNvZGUoKSkuaGV4ZGlnZXN0KClbOjE2XQogICAgICAgIHJlcXVpcmUoc2VsZi5yb290LnJlc29sdmUoKSA9PSBzZWxmLnJvb3QsICdTeW1saW5rZWQgYnJpZGdlIHN0YXRlIGRpcmVjdG9yaWVzIGFyZSBub3Qgc3VwcG9ydGVkJykKICAgICAgICBzZWxmLnJlcG9zaXRvcnkgPSBsb2NhbF9wYXRoKHN0cihSRVBPU0lUT1JZIGlmIHJlcG9zaXRvcnkgaXMgTm9uZSBlbHNlIHJlcG9zaXRvcnkpKQogICAgICAgIHNlbGYucmVxdWVzdGVyID0gcmVxdWVzdGVyCiAgICAgICAgc2VsZi5jb25maWcgPSBzZWxmLmxvYWRfY29uZmlnKCkKCiAgICBkZWYgYXBpKHNlbGYsIHBhdGg9JycsICosIG1ldGhvZD0nR0VUJywgYm9keT1Ob25lLCBoZWFkZXJzPU5vbmUpOgogICAgICAgIHJldHVybiBzZWxmLnJlcXVlc3RlcihzZWxmLmJhc2UgKyBwYXRoLCBtZXRob2Q9bWV0aG9kLCBib2R5PWJvZHksCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM9eydYLVNlc3Npb24tQVBJLUtleSc6IHNlbGYua2V5LCAqKihoZWFkZXJzIG9yIHt9KX0pCgogICAgZGVmIGxvYWRfY29uZmlnKHNlbGYpOgogICAgICAgIGNvbmZpZyA9IHJlYWRfanNvbihzZWxmLnJlcG9zaXRvcnkgLyAncm9sZS13b3JrZmxvdy5qc29uJykKICAgICAgICBmaWVsZHMgPSB7J3dvcmtzcGFjZScsICdzcGVjX3N0b3JlJywgJ3N0b3JlX2lkJywgJ3NraWxsX3Jvb3QnLCAncHJvZmlsZScsICd0aW1lb3V0X3NlY29uZHMnLCAnY2FudmFzX3VybCd9CiAgICAgICAgcmVxdWlyZShpc2luc3RhbmNlKGNvbmZpZywgZGljdCkgYW5kIGZpZWxkcyA8PSBzZXQoY29uZmlnKSBhbmQgc2V0KGNvbmZpZykgPD0gZmllbGRzIHwgeyd2ZXJzaW9uJ30KICAgICAgICAgICAgICAgIGFuZCB0eXBlKGNvbmZpZy5nZXQoJ3ZlcnNpb24nLCAxKSkgaXMgaW50IGFuZCBjb25maWcuZ2V0KCd2ZXJzaW9uJywgMSkgPT0gMSwgJ0ludmFsaWQgcm9sZS13b3JrZmxvdy5qc29uIGNvbmZpZ3VyYXRpb24nKQogICAgICAgIGZvciBmaWVsZCBpbiAoJ3dvcmtzcGFjZScsICdzcGVjX3N0b3JlJywgJ3NraWxsX3Jvb3QnKToKICAgICAgICAgICAgZGlyZWN0b3J5ID0gbG9jYWxfcGF0aChjb25maWdbZmllbGRdKQogICAgICAgICAgICByZXF1aXJlKGRpcmVjdG9yeS5pc19kaXIoKSwgJ0EgY29uZmlndXJlZCByb2xlIHdvcmtmbG93IGRpcmVjdG9yeSBpcyBtaXNzaW5nJykKICAgICAgICByZXF1aXJlKHNsdWcoY29uZmlnWydzdG9yZV9pZCddKSBhbmQgaXNpbnN0YW5jZShjb25maWdbJ3Byb2ZpbGUnXSwgc3RyKSBhbmQgMCA8IGxlbihjb25maWdbJ3Byb2ZpbGUnXSkgPD0gMjAwCiAgICAgICAgICAgICAgICBhbmQgJ1x4MDAnIG5vdCBpbiBjb25maWdbJ3Byb2ZpbGUnXSBhbmQgdHlwZShjb25maWdbJ3RpbWVvdXRfc2Vjb25kcyddKSBpcyBpbnQKICAgICAgICAgICAgICAgIGFuZCA2MCA8PSBjb25maWdbJ3RpbWVvdXRfc2Vjb25kcyddIDw9IDcyMDAsICdJbnZhbGlkIHJvbGUgd29ya2Zsb3cgc3RvcmUsIHByb2ZpbGUsIG9yIHRpbWVvdXQnKQogICAgICAgIHRyeToKICAgICAgICAgICAgY2FudmFzID0gdXJsbGliLnBhcnNlLnVybHNwbGl0KGNvbmZpZ1snY2FudmFzX3VybCddKQogICAgICAgICAgICBjYW52YXMucG9ydAogICAgICAgIGV4Y2VwdCAoVmFsdWVFcnJvciwgVHlwZUVycm9yLCBBdHRyaWJ1dGVFcnJvcik6CiAgICAgICAgICAgIHJhaXNlIEJyaWRnZUVycm9yKCdJbnZhbGlkIHJvbGUgd29ya2Zsb3cgQ2FudmFzIGFkZHJlc3MnKSBmcm9tIE5vbmUKICAgICAgICByZXF1aXJlKGNhbnZhcy5zY2hlbWUgaW4gKCdodHRwJywgJ2h0dHBzJykgYW5kIGNhbnZhcy5ob3N0bmFtZSBpbiAoJ2xvY2FsaG9zdCcsICcxMjcuMC4wLjEnLCAnOjoxJykKICAgICAgICAgICAgICAgIGFuZCBub3QgY2FudmFzLnVzZXJuYW1lIGFuZCBub3QgY2FudmFzLnBhc3N3b3JkIGFuZCBjYW52YXMucGF0aCBpbiAoJycsICcvJykKICAgICAgICAgICAgICAgIGFuZCBub3QgY2FudmFzLnF1ZXJ5IGFuZCBub3QgY2FudmFzLmZyYWdtZW50LCAnUm9sZSB3b3JrZmxvdyBDYW52YXMgbXVzdCBiZSBhIGxvY2FsIG9yaWdpbicpCiAgICAgICAgcmV0dXJuIGNvbmZpZwoKICAgIGRlZiBzYWZlX2NvbmZpZyhzZWxmKToKICAgICAgICByZXR1cm4ge2tleTogc2VsZi5jb25maWdba2V5XSBmb3Iga2V5IGluICgnd29ya3NwYWNlJywgJ3NwZWNfc3RvcmUnLCAnc3RvcmVfaWQnKX0gfCB7J3JlcG9zaXRvcnknOiBzdHIoc2VsZi5yZXBvc2l0b3J5KX0KCiAgICBkZWYgaW52ZW50b3J5KHNlbGYsIGVuZHBvaW50PScnLCBrZXk9J2F1dG9tYXRpb25zJyk6CiAgICAgICAgdmFsdWUgPSBzZWxmLmFwaShlbmRwb2ludCArICc/bGltaXQ9MTAwJykKICAgICAgICByZXF1aXJlKGlzaW5zdGFuY2UodmFsdWUsIGRpY3QpIGFuZCBpc2luc3RhbmNlKHZhbHVlLmdldChrZXkpLCBsaXN0KSBhbmQgdHlwZSh2YWx1ZS5nZXQoJ3RvdGFsJykpIGlzIGludAogICAgICAgICAgICAgICAgYW5kIGxlbih2YWx1ZVtrZXldKSA9PSB2YWx1ZVsndG90YWwnXSA8PSAxMDAgYW5kIGFsbChpc2luc3RhbmNlKHJvdywgZGljdCkgZm9yIHJvdyBpbiB2YWx1ZVtrZXldKSwKICAgICAgICAgICAgICAgICdDYW5ub3QgaW5zcGVjdCB0aGUgY29tcGxldGUgbG9jYWwgQXV0b21hdGlvbiBpbnZlbnRvcnkgKG1heGltdW0gMTAwKScpCiAgICAgICAgcmV0dXJuIHZhbHVlW2tleV0KCiAgICBkZWYgc2VsZWN0ZWQoc2VsZiwgaW52ZW50b3J5LCAqLCBhbGxvd19yZXRpcmVkPUZhbHNlKToKICAgICAgICByZXN1bHQgPSB7fQogICAgICAgIGZvciByb2xlLCBzdGFnZSBpbiBQQUlSUzoKICAgICAgICAgICAgcm93cyA9IFtyb3cgZm9yIHJvdyBpbiBpbnZlbnRvcnkgaWYgcm93LmdldCgnbmFtZScpID09IGF1dG9tYXRpb25fbmFtZShyb2xlLCBzdGFnZSldCiAgICAgICAgICAgIHJlcXVpcmUobGVuKHJvd3MpIDw9IDEsICdEdXBsaWNhdGUgcm9sZSBhdXRvbWF0aW9uIG5hbWVzOyBpbnNwZWN0IG5hdGl2ZSBBdXRvbWF0aW9uIGRlZmluaXRpb25zJykKICAgICAgICAgICAgaWYgcm93czoKICAgICAgICAgICAgICAgIHJlcXVpcmUoaWRlbnRpZmllcihyb3dzWzBdLmdldCgnaWQnKSksICdJbnZhbGlkIHJvbGUgYXV0b21hdGlvbiBpZGVudGl0eScpCiAgICAgICAgICAgICAgICByZXN1bHRbcGFpcl9rZXkocm9sZSwgc3RhZ2UpXSA9IHJvd3NbMF0KICAgICAgICBpZHMgPSB7cm93WydpZCddIGZvciByb3cgaW4gcmVzdWx0LnZhbHVlcygpfQogICAgICAgIHJlcXVpcmUobGVuKGlkcykgPT0gbGVuKHJlc3VsdCksICdEdXBsaWNhdGUgcm9sZSBhdXRvbWF0aW9uIGlkZW50aXRpZXMnKQogICAgICAgIGlmIGFsbG93X3JldGlyZWQ6CiAgICAgICAgICAgIGlkcy51cGRhdGUocm93WydpZCddIGZvciByb3cgaW4gcmV0aXJlZF9kZWZpbml0aW9ucyhpbnZlbnRvcnkpKQogICAgICAgIHJlcXVpcmUobm90IGFueShyb3cuZ2V0KCdlbmFibGVkJykgYW5kIGlzaW5zdGFuY2Uocm93LmdldCgndHJpZ2dlcicpLCBkaWN0KQogICAgICAgICAgICAgICAgICAgICAgICBhbmQgcm93Wyd0cmlnZ2VyJ10uZ2V0KCdzb3VyY2UnKSA9PSBTT1VSQ0UgYW5kIHJvdy5nZXQoJ2lkJykgbm90IGluIGlkcyBmb3Igcm93IGluIGludmVudG9yeSksCiAgICAgICAgICAgICAgICAnQW5vdGhlciBlbmFibGVkIGF1dG9tYXRpb24gdXNlcyB0aGUgcm9sZSBkYXNoYm9hcmQgc291cmNlOyByZXNvbHZlIHJvdXRpbmcgZmlyc3QnKQogICAgICAgIHJldHVybiByZXN1bHQKCiAgICBkZWYgYnVuZGxlcyhzZWxmKToKICAgICAgICBidW5kbGVzID0ge30KICAgICAgICBmb3Igcm9sZSwgc3RhZ2UgaW4gUEFJUlM6CiAgICAgICAgICAgIHJvb3QgPSBzZWxmLnJlcG9zaXRvcnkgLyAnYXV0b21hdGlvbnMnIC8gZidvcGVuc3BlYy17cm9sZS5sb3dlcigpfS17c3RhZ2V9JwogICAgICAgICAgICBkZWZpbml0aW9uID0gcmVhZF9qc29uKHJvb3QgLyAnYXV0b21hdGlvbi55YW1sJykKICAgICAgICAgICAgZXhwZWN0ZWQgPSB7J25hbWUnOiBhdXRvbWF0aW9uX25hbWUocm9sZSwgc3RhZ2UpLCAnc3RhdGUnOiAnQUNUSVZFJywgJ2VuYWJsZWQnOiBUcnVlLAogICAgICAgICAgICAgICAgICAgICAgICAndHJpZ2dlcic6IHRyaWdnZXIocm9sZSwgc3RhZ2UpLCAnZW50cnlwb2ludCc6ICdweXRob24zIHJ1bi5weScsCiAgICAgICAgICAgICAgICAgICAgICAgICd0aW1lb3V0Jzogc2VsZi5jb25maWdbJ3RpbWVvdXRfc2Vjb25kcyddLCAna2VlcF9hbGl2ZSc6IEZhbHNlfQogICAgICAgICAgICByZXF1aXJlKGlzaW5zdGFuY2UoZGVmaW5pdGlvbiwgZGljdCkgYW5kIGFsbChkZWZpbml0aW9uLmdldChrZXkpID09IHZhbHVlIGZvciBrZXksIHZhbHVlIGluIGV4cGVjdGVkLml0ZW1zKCkpCiAgICAgICAgICAgICAgICAgICAgYW5kIHNldChkZWZpbml0aW9uKSA8PSBzZXQoZXhwZWN0ZWQpIHwgeyd0YXJiYWxsX3NvdXJjZSd9CiAgICAgICAgICAgICAgICAgICAgYW5kIGRlZmluaXRpb24uZ2V0KCd0YXJiYWxsX3NvdXJjZScpID09IHsndHlwZSc6ICdpbnRlcm5hbCd9LCAnUm9sZSBidW5kbGVzIGFyZSBzdGFsZSBvciBpbnZhbGlkOyBydW4gbnBtIHJ1biBidWlsZCBpbiB0aGUgYXV0b21hdGlvbiByZXBvc2l0b3J5JykKICAgICAgICAgICAgZGlyZWN0b3J5ID0gcm9vdCAvICd0YXJiYWxsJwogICAgICAgICAgICByZXF1aXJlKGRpcmVjdG9yeS5yZXNvbHZlKCkgPT0gZGlyZWN0b3J5IGFuZCBkaXJlY3RvcnkuaXNfZGlyKCkKICAgICAgICAgICAgICAgICAgICBhbmQge2ZpbGUubmFtZSBmb3IgZmlsZSBpbiBkaXJlY3RvcnkuaXRlcmRpcigpfSA9PSBzZXQoQlVORExFX0ZJTEVTKSwgJ1VuZXhwZWN0ZWQgcm9sZSBidW5kbGUgZmlsZXMnKQogICAgICAgICAgICBmaWxlcyA9IHtuYW1lOiByZWFkX2J5dGVzKGRpcmVjdG9yeSAvIG5hbWUsIDUxMiAqIDEwMjQpIGZvciBuYW1lIGluIEJVTkRMRV9GSUxFU30KICAgICAgICAgICAgdHJ5OgogICAgICAgICAgICAgICAgZ2VuZXJhdGVkID0ganNvbi5sb2FkcyhmaWxlc1snY29uZmlnLmpzb24nXSkKICAgICAgICAgICAgZXhjZXB0IChWYWx1ZUVycm9yLCBVbmljb2RlRXJyb3IpOgogICAgICAgICAgICAgICAgcmFpc2UgQnJpZGdlRXJyb3IoJ0ludmFsaWQgZ2VuZXJhdGVkIHJvbGUgY29uZmlndXJhdGlvbicpIGZyb20gTm9uZQogICAgICAgICAgICByZXF1aXJlKGlzaW5zdGFuY2UoZ2VuZXJhdGVkLCBkaWN0KSBhbmQgZ2VuZXJhdGVkLmdldCgnbW9kZScpID09ICdyb2xlJyBhbmQgZ2VuZXJhdGVkLmdldCgnc3RhZ2UnKSA9PSBzdGFnZQogICAgICAgICAgICAgICAgICAgIGFuZCBnZW5lcmF0ZWQuZ2V0KCdyb2xlJykgPT0gcm9sZQogICAgICAgICAgICAgICAgICAgIGFuZCBhbGwoZ2VuZXJhdGVkLmdldChrZXkpID09IHZhbHVlIGZvciBrZXksIHZhbHVlIGluIHNlbGYuY29uZmlnLml0ZW1zKCkpLAogICAgICAgICAgICAgICAgICAgICdHZW5lcmF0ZWQgcm9sZSBjb25maWd1cmF0aW9uIGlzIHN0YWxlOyByZWJ1aWxkIHRoZSBhdXRvbWF0aW9uIHJlcG9zaXRvcnknKQogICAgICAgICAgICBkaWdlc3QgPSBoYXNobGliLnNoYTI1NihlbmNvZGUoZXhwZWN0ZWQpKQogICAgICAgICAgICBidWZmZXIgPSBpby5CeXRlc0lPKCkKICAgICAgICAgICAgd2l0aCB0YXJmaWxlLm9wZW4oZmlsZW9iaj1idWZmZXIsIG1vZGU9J3c6Z3onKSBhcyBhcmNoaXZlOgogICAgICAgICAgICAgICAgZm9yIG5hbWUsIGNvbnRlbnQgaW4gZmlsZXMuaXRlbXMoKToKICAgICAgICAgICAgICAgICAgICBkaWdlc3QudXBkYXRlKG5hbWUuZW5jb2RlKCkgKyBiJ1wwJyArIGNvbnRlbnQpCiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IHRhcmZpbGUuVGFySW5mbyhuYW1lKQogICAgICAgICAgICAgICAgICAgIGl0ZW0uc2l6ZSwgaXRlbS5tb2RlLCBpdGVtLm10aW1lID0gbGVuKGNvbnRlbnQpLCAwbzYwMCwgMAogICAgICAgICAgICAgICAgICAgIGFyY2hpdmUuYWRkZmlsZShpdGVtLCBpby5CeXRlc0lPKGNvbnRlbnQpKQogICAgICAgICAgICByZXF1aXJlKGJ1ZmZlci50ZWxsKCkgPD0gMTAyNCAqIDEwMjQsICdSb2xlIGJ1bmRsZSBleGNlZWRzIHRoZSBuYXRpdmUgMSBNaUIgdXBsb2FkIGxpbWl0JykKICAgICAgICAgICAgYnVuZGxlc1twYWlyX2tleShyb2xlLCBzdGFnZSldID0geydkZWZpbml0aW9uJzogZXhwZWN0ZWQsICdoYXNoJzogZGlnZXN0LmhleGRpZ2VzdCgpLCAndGFyYmFsbCc6IGJ1ZmZlci5nZXR2YWx1ZSgpfQogICAgICAgIHJldHVybiBidW5kbGVzCgogICAgZGVmIHN0YXRlKHNlbGYpOgogICAgICAgIHBhdGggPSBzZWxmLnJvb3QgLyAnY29ubmVjdGlvbi5qc29uJwogICAgICAgIGlmIG5vdCBwYXRoLmV4aXN0cygpOgogICAgICAgICAgICByZXR1cm4geyd2ZXJzaW9uJzogMiwgJ2JpbmRpbmdzJzoge30sICdzb3VyY2UnOiBOb25lfQogICAgICAgIHN0YXRlID0gcmVhZF9qc29uKHBhdGgpCiAgICAgICAgaWYgaXNpbnN0YW5jZShzdGF0ZSwgZGljdCkgYW5kIHN0YXRlLmdldCgndmVyc2lvbicpID09IDE6CiAgICAgICAgICAgIHJlcXVpcmUoaXNpbnN0YW5jZShzdGF0ZS5nZXQoJ3N0YWdlcycpLCBkaWN0KSBhbmQgc2V0KHN0YXRlWydzdGFnZXMnXSkgPD0gc2V0KFNUQUdFUykKICAgICAgICAgICAgICAgICAgICBhbmQgYWxsKGlzaW5zdGFuY2UoaXRlbSwgZGljdCkgYW5kIGl0ZW0uZ2V0KCdzdGF0ZScpID09ICdyZWFkeScgZm9yIGl0ZW0gaW4gc3RhdGVbJ3N0YWdlcyddLnZhbHVlcygpKSwKICAgICAgICAgICAgICAgICAgICAnUmVzb2x2ZSB0aGUgaW5jb21wbGV0ZSBwcmV2aW91cyBjb25uZWN0aW9uIGJlZm9yZSBtaWdyYXRpb24nKQogICAgICAgICAgICByZXR1cm4geyd2ZXJzaW9uJzogMiwgJ2JpbmRpbmdzJzoge30sICdzb3VyY2UnOiBzdGF0ZS5nZXQoJ3NvdXJjZScpfQogICAgICAgIHJlcXVpcmUoaXNpbnN0YW5jZShzdGF0ZSwgZGljdCkgYW5kIHN0YXRlLmdldCgndmVyc2lvbicpID09IDIgYW5kIGlzaW5zdGFuY2Uoc3RhdGUuZ2V0KCdiaW5kaW5ncycpLCBkaWN0KQogICAgICAgICAgICAgICAgYW5kIHNldChzdGF0ZVsnYmluZGluZ3MnXSkgPD0ge3BhaXJfa2V5KCpwYWlyKSBmb3IgcGFpciBpbiBQQUlSU30sICdJbnZhbGlkIHByaXZhdGUgY29ubmVjdGlvbiBzdGF0ZTsgaW5zcGVjdCB0aGUgbG9jYWwgc2V0dXAnKQogICAgICAgIHJldHVybiBzdGF0ZQoKICAgIGRlZiBzYXZlKHNlbGYsIHN0YXRlKToKICAgICAgICBhdG9taWNfanNvbihzZWxmLnJvb3QgLyAnY29ubmVjdGlvbi5qc29uJywgc3RhdGUpCgogICAgQGNvbnRleHRsaWIuY29udGV4dG1hbmFnZXIKICAgIGRlZiBsb2NrKHNlbGYpOgogICAgICAgIHNlbGYucm9vdC5ta2RpcihwYXJlbnRzPVRydWUsIGV4aXN0X29rPVRydWUsIG1vZGU9MG83MDApCiAgICAgICAgcmVxdWlyZShzZWxmLnJvb3QucmVzb2x2ZSgpID09IHNlbGYucm9vdCwgJ1N5bWxpbmtlZCBicmlkZ2Ugc3RhdGUgaXMgbm90IHN1cHBvcnRlZCcpCiAgICAgICAgb3MuY2htb2Qoc2VsZi5yb290LCAwbzcwMCkKICAgICAgICBkZXNjcmlwdG9yID0gb3Mub3BlbihzZWxmLnJvb3QgLyAnLmxvY2snLCBvcy5PX0NSRUFUIHwgb3MuT19SRFdSIHwgb3MuT19OT0ZPTExPVywgMG82MDApCiAgICAgICAgd2l0aCBvcy5mZG9wZW4oZGVzY3JpcHRvciwgJ2EnKSBhcyBzdHJlYW06CiAgICAgICAgICAgIHRyeToKICAgICAgICAgICAgICAgIGZjbnRsLmZsb2NrKHN0cmVhbSwgZmNudGwuTE9DS19FWCB8IGZjbnRsLkxPQ0tfTkIpCiAgICAgICAgICAgIGV4Y2VwdCBCbG9ja2luZ0lPRXJyb3I6CiAgICAgICAgICAgICAgICByYWlzZSBCcmlkZ2VFcnJvcignQW5vdGhlciByb2xlIEF1dG9tYXRpb24gb3BlcmF0aW9uIGlzIHJ1bm5pbmc7IGNoZWNrIGl0cyByZXN1bHQgZmlyc3QnKSBmcm9tIE5vbmUKICAgICAgICAgICAgeWllbGQKCiAgICBAc3RhdGljbWV0aG9kCiAgICBkZWYgZGVmaW5pdGlvbl9tYXRjaGVzKHJvdywgZGVzaXJlZCk6CiAgICAgICAgcmV0dXJuIGFsbCgoaXNpbnN0YW5jZShyb3cuZ2V0KCd0cmlnZ2VyJyksIGRpY3QpIGFuZCBhbGwocm93Wyd0cmlnZ2VyJ10uZ2V0KGspID09IHYgZm9yIGssIHYgaW4gdmFsdWUuaXRlbXMoKSkKICAgICAgICAgICAgICAgICAgICBhbmQgcm93Wyd0cmlnZ2VyJ10uZ2V0KCdkZXN0aW5hdGlvbicsICdkaXNwYXRjaF9ydW4nKSA9PSAnZGlzcGF0Y2hfcnVuJwogICAgICAgICAgICAgICAgICAgIGFuZCByb3dbJ3RyaWdnZXInXS5nZXQoJ3N1YmplY3Rfa2V5X2V4cHInKSBpcyBOb25lIGFuZCByb3dbJ3RyaWdnZXInXS5nZXQoJ3R1cm5fdGV4dF9leHByJykgaXMgTm9uZQogICAgICAgICAgICAgICAgICAgIGFuZCByb3dbJ3RyaWdnZXInXS5nZXQoJ3dha2VfYWdlbnQnLCBUcnVlKSBpcyBUcnVlCiAgICAgICAgICAgICAgICAgICAgYW5kIHNldChyb3dbJ3RyaWdnZXInXSkgPD0gc2V0KHZhbHVlKSB8IHsnZGVzdGluYXRpb24nLCAnc3ViamVjdF9rZXlfZXhwcicsICd0dXJuX3RleHRfZXhwcicsICd3YWtlX2FnZW50J30pIGlmIGtleSA9PSAndHJpZ2dlcicKICAgICAgICAgICAgICAgICAgIGVsc2Ugcm93LmdldChrZXkpID09IHZhbHVlIGZvciBrZXksIHZhbHVlIGluIGRlc2lyZWQuaXRlbXMoKSkKCiAgICBkZWYgc291cmNlX3JlYWR5KHNlbGYsIHNvdXJjZSwgd2ViaG9va3MpOgogICAgICAgIHJvd3MgPSBbcm93IGZvciByb3cgaW4gd2ViaG9va3MgaWYgcm93LmdldCgnc291cmNlJykgPT0gU09VUkNFXQogICAgICAgIHJlcXVpcmUobGVuKHJvd3MpIDw9IDEsICdEdXBsaWNhdGUgcm9sZSBkYXNoYm9hcmQgc291cmNlczsgaW5zcGVjdCBuYXRpdmUgQXV0b21hdGlvbiBzb3VyY2VzJykKICAgICAgICBpZiBub3QgaXNpbnN0YW5jZShzb3VyY2UsIGRpY3QpIG9yIHNvdXJjZS5nZXQoJ3N0YXRlJykgIT0gJ3JlYWR5JyBvciBub3Qgcm93cyBvciBub3QgaXNpbnN0YW5jZShzb3VyY2UuZ2V0KCdzZWNyZXQnKSwgc3RyKSBvciBub3QgOCA8PSBsZW4oc291cmNlWydzZWNyZXQnXSkgPD0gMjU1OgogICAgICAgICAgICByZXR1cm4gRmFsc2UKICAgICAgICByb3cgPSByb3dzWzBdCiAgICAgICAgcmV0dXJuIChyb3cuZ2V0KCdpZCcpID09IHNvdXJjZS5nZXQoJ2lkJykgYW5kIHJvdy5nZXQoJ29yZ19pZCcpID09IHNvdXJjZS5nZXQoJ29yZ19pZCcpCiAgICAgICAgICAgICAgICBhbmQgcm93LmdldCgnZW5hYmxlZCcpIGlzIFRydWUgYW5kIHJvdy5nZXQoJ2V2ZW50X2tleV9leHByJykgPT0gJ3R5cGUnCiAgICAgICAgICAgICAgICBhbmQgcm93LmdldCgnc2lnbmF0dXJlX2hlYWRlcicpID09ICdYLVNpZ25hdHVyZS0yNTYnIGFuZCByb3cuZ2V0KCdzaWduYXR1cmVfc2NoZW1lJykgPT0gJ2htYWNfc2hhMjU2X2hleCcpCgogICAgZGVmIHJlYWRpbmVzcyhzZWxmLCBzZWxlY3RlZCwgYnVuZGxlcywgc3RhdGUsIHdlYmhvb2tzKToKICAgICAgICBpZiBsZW4oc2VsZWN0ZWQpICE9IGxlbihQQUlSUykgb3Igbm90IHNlbGYuc291cmNlX3JlYWR5KHN0YXRlLmdldCgnc291cmNlJyksIHdlYmhvb2tzKToKICAgICAgICAgICAgcmV0dXJuIEZhbHNlCiAgICAgICAgZm9yIHN0YWdlLCBidW5kbGUgaW4gYnVuZGxlcy5pdGVtcygpOgogICAgICAgICAgICBzYXZlZCA9IHN0YXRlWydiaW5kaW5ncyddLmdldChzdGFnZSwge30pCiAgICAgICAgICAgIGRlc2lyZWQgPSBidW5kbGVbJ2RlZmluaXRpb24nXSB8IHsndGFyYmFsbF9wYXRoJzogc2F2ZWQuZ2V0KCd0YXJiYWxsX3BhdGgnKX0KICAgICAgICAgICAgaWYgc2F2ZWQuZ2V0KCdzdGF0ZScpICE9ICdyZWFkeScgb3Igc2F2ZWQuZ2V0KCdoYXNoJykgIT0gYnVuZGxlWydoYXNoJ10gb3Igc2F2ZWQuZ2V0KCdpZCcpICE9IHNlbGVjdGVkW3N0YWdlXVsnaWQnXSBvciBub3Qgc2VsZi5kZWZpbml0aW9uX21hdGNoZXMoc2VsZWN0ZWRbc3RhZ2VdLCBkZXNpcmVkKToKICAgICAgICAgICAgICAgIHJldHVybiBGYWxzZQogICAgICAgIHJldHVybiBUcnVlCgogICAgZGVmIHJlc3VsdChzZWxmLCBraW5kLCByZWFkeSwgc2VsZWN0ZWQpOgogICAgICAgIHJldHVybiB7J2tpbmQnOiBraW5kLCAncmVhZHknOiByZWFkeSwgJ2F1dG9tYXRpb25zJzogWwogICAgICAgICAgICAgICAgeydpZCc6IHNlbGVjdGVkW3BhaXJfa2V5KHJvbGUsIHN0YWdlKV1bJ2lkJ10sICduYW1lJzogYXV0b21hdGlvbl9uYW1lKHJvbGUsIHN0YWdlKSwgJ3N0YWdlJzogc3RhZ2UsICdyb2xlJzogcm9sZX0KICAgICAgICAgICAgICAgIGZvciByb2xlLCBzdGFnZSBpbiBQQUlSUyBpZiBwYWlyX2tleShyb2xlLCBzdGFnZSkgaW4gc2VsZWN0ZWRdLCAnY29uZmlndXJhdGlvbic6IHNlbGYuc2FmZV9jb25maWcoKSwKICAgICAgICAgICAgICAgICdtZXNzYWdlJzogJ0Nvbm5lY3RlZCB0byBhbGwgdHdlbHZlIHJvbGUgYW5kIHNraWxsIGF1dG9tYXRpb25zLicgaWYgcmVhZHkgZWxzZQogICAgICAgICAgICAgICAgJ0Nvbm5lY3QgYXV0b21hdGlvbnMgdG8gaW5zdGFsbCBkZWRpY2F0ZWQgcm9sZSBza2lsbHMgYW5kIHJlbW92ZSBzdXBlcnNlZGVkIE9wZW5TcGVjIGRlZmluaXRpb25zLid9CgogICAgZGVmIHByb2JlKHNlbGYpOgogICAgICAgIGludmVudG9yeSA9IHNlbGYuaW52ZW50b3J5KCkKICAgICAgICBzZWxlY3RlZCA9IHNlbGYuc2VsZWN0ZWQoaW52ZW50b3J5LCBhbGxvd19yZXRpcmVkPVRydWUpCiAgICAgICAgcmVhZHkgPSBzZWxmLnJlYWRpbmVzcyhzZWxlY3RlZCwgc2VsZi5idW5kbGVzKCksIHNlbGYuc3RhdGUoKSwgc2VsZi5pbnZlbnRvcnkoJy93ZWJob29rcycsICd3ZWJob29rcycpKSBhbmQgbm90IHJldGlyZWRfZGVmaW5pdGlvbnMoaW52ZW50b3J5KQogICAgICAgIHJldHVybiBzZWxmLnJlc3VsdCgncHJvYmUnLCByZWFkeSwgc2VsZWN0ZWQpCgogICAgZGVmIHNldHVwKHNlbGYpOgogICAgICAgIGJ1bmRsZXMgPSBzZWxmLmJ1bmRsZXMoKQogICAgICAgIHdpdGggc2VsZi5sb2NrKCk6CiAgICAgICAgICAgIHN0YXRlID0gc2VsZi5zdGF0ZSgpCiAgICAgICAgICAgIGludmVudG9yeSA9IHNlbGYuaW52ZW50b3J5KCkKICAgICAgICAgICAgc2VsZWN0ZWQgPSBzZWxmLnNlbGVjdGVkKGludmVudG9yeSwgYWxsb3dfcmV0aXJlZD1UcnVlKQogICAgICAgICAgICByZXRpcmVkID0gcmV0aXJlZF9kZWZpbml0aW9ucyhpbnZlbnRvcnkpCiAgICAgICAgICAgIHdlYmhvb2tzID0gc2VsZi5pbnZlbnRvcnkoJy93ZWJob29rcycsICd3ZWJob29rcycpCiAgICAgICAgICAgIHNvdXJjZSA9IHN0YXRlLmdldCgnc291cmNlJykKICAgICAgICAgICAgZXhpc3Rpbmdfc291cmNlcyA9IFtyb3cgZm9yIHJvdyBpbiB3ZWJob29rcyBpZiByb3cuZ2V0KCdzb3VyY2UnKSA9PSBTT1VSQ0VdCiAgICAgICAgICAgIHJlcXVpcmUobm90IGV4aXN0aW5nX3NvdXJjZXMgb3Igc2VsZi5zb3VyY2VfcmVhZHkoc291cmNlLCB3ZWJob29rcyksCiAgICAgICAgICAgICAgICAgICAgJ1RoZSByb2xlIHNvdXJjZSBleGlzdHMgd2l0aG91dCBhIHZlcmlmaWVkIHNhdmVkIGNvbm5lY3Rpb247IGRvIG5vdCBvdmVyd3JpdGUgaXRzIHNlY3JldCcpCiAgICAgICAgICAgIHJlcXVpcmUobm90IHNvdXJjZSBvciBzb3VyY2UuZ2V0KCdzdGF0ZScpID09ICdyZWFkeScsCiAgICAgICAgICAgICAgICAgICAgJ1NvdXJjZSByZWdpc3RyYXRpb24gb3V0Y29tZSBpcyB1bmtub3duOyBpbnNwZWN0IHRoZSBsb2NhbCBjb25uZWN0aW9uIGJlZm9yZSByZXRyeWluZycpCiAgICAgICAgICAgICMgVmFsaWRhdGUgZXZlcnkgY2FuZGlkYXRlIGJlZm9yZSBhbnkgcmV0aXJlbWVudCwgdXBsb2FkIG9yIGluc3RhbGxhdGlvbi4KICAgICAgICAgICAgZm9yIHJvdyBpbiByZXRpcmVkOgogICAgICAgICAgICAgICAgaGlzdG9yeSA9IHNlbGYuYXBpKCcvJyArIHJvd1snaWQnXSArICcvcnVucz9saW1pdD0xMDAmb2Zmc2V0PTAnKQogICAgICAgICAgICAgICAgY291bnRzID0gaGlzdG9yeS5nZXQoJ3N0YXR1c19jb3VudHMnKSBpZiBpc2luc3RhbmNlKGhpc3RvcnksIGRpY3QpIGVsc2UgTm9uZQogICAgICAgICAgICAgICAgcmVxdWlyZShpc2luc3RhbmNlKGNvdW50cywgZGljdCkgYW5kIHNldChjb3VudHMpIDw9IHNldChTVEFUVVNFUykKICAgICAgICAgICAgICAgICAgICAgICAgYW5kIGFsbCh0eXBlKGNvdW50KSBpcyBpbnQgYW5kIGNvdW50ID49IDAgZm9yIGNvdW50IGluIGNvdW50cy52YWx1ZXMoKSkKICAgICAgICAgICAgICAgICAgICAgICAgYW5kIGhpc3RvcnkuZ2V0KCd0b3RhbCcpID09IHN1bShjb3VudHMudmFsdWVzKCkpLCAnQ2Fubm90IHZlcmlmeSBzdXBlcnNlZGVkIGF1dG9tYXRpb24gYWN0aXZpdHknKQogICAgICAgICAgICAgICAgcmVxdWlyZShjb3VudHMuZ2V0KCdQRU5ESU5HJywgMCkgPT0gY291bnRzLmdldCgnUlVOTklORycsIDApID09IDAsCiAgICAgICAgICAgICAgICAgICAgICAgICdBIHN1cGVyc2VkZWQgYXV0b21hdGlvbiBoYXMgcGVuZGluZyBvciBydW5uaW5nIHdvcms7IGxldCBpdCBmaW5pc2ggYmVmb3JlIHJlY29ubmVjdGluZycpCiAgICAgICAgICAgIGZvciByb3cgaW4gcmV0aXJlZDoKICAgICAgICAgICAgICAgIHNlbGYuYXBpKCcvJyArIHJvd1snaWQnXSwgbWV0aG9kPSdERUxFVEUnKQogICAgICAgICAgICByZXF1aXJlKG5vdCByZXRpcmVkX2RlZmluaXRpb25zKHNlbGYuaW52ZW50b3J5KCkpLCAnU3VwZXJzZWRlZCBkZWZpbml0aW9ucyByZW1haW47IHJlY29ubmVjdCBiZWZvcmUgcnVubmluZycpCiAgICAgICAgICAgIGZvciBzdGFnZSwgYnVuZGxlIGluIGJ1bmRsZXMuaXRlbXMoKToKICAgICAgICAgICAgICAgIHNhdmVkID0gc3RhdGVbJ2JpbmRpbmdzJ10uZ2V0KHN0YWdlKQogICAgICAgICAgICAgICAgY3VycmVudCA9IHNlbGVjdGVkLmdldChzdGFnZSkKICAgICAgICAgICAgICAgIGlmIHNhdmVkIGFuZCBzYXZlZC5nZXQoJ2hhc2gnKSAhPSBidW5kbGVbJ2hhc2gnXToKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKHNhdmVkLmdldCgnc3RhdGUnKSA9PSAncmVhZHknLCAnQW4gZWFybGllciBzZXR1cCBpcyBpbmNvbXBsZXRlOyByZXNvbHZlIGl0IGJlZm9yZSBjaGFuZ2luZyBidW5kbGVzJykKICAgICAgICAgICAgICAgICAgICBzYXZlZCA9IE5vbmUKICAgICAgICAgICAgICAgIGlmIHNhdmVkIGFuZCBzYXZlZC5nZXQoJ3N0YXRlJykgPT0gJ3JlYWR5JyBhbmQgY3VycmVudCBhbmQgc2VsZi5kZWZpbml0aW9uX21hdGNoZXMoY3VycmVudCwgYnVuZGxlWydkZWZpbml0aW9uJ10gfCB7J3RhcmJhbGxfcGF0aCc6IHNhdmVkLmdldCgndGFyYmFsbF9wYXRoJyl9KToKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKHNhdmVkLmdldCgnaWQnKSA9PSBjdXJyZW50WydpZCddLCAnVGhlIGluc3RhbGxlZCByb2xlIGF1dG9tYXRpb24gaWRlbnRpdHkgY2hhbmdlZCcpCiAgICAgICAgICAgICAgICAgICAgY29udGludWUKICAgICAgICAgICAgICAgIGlmIG5vdCBzYXZlZDoKICAgICAgICAgICAgICAgICAgICBzYXZlZCA9IHsnc3RhdGUnOiAndXBsb2FkaW5nJywgJ2hhc2gnOiBidW5kbGVbJ2hhc2gnXSwgJ2lkJzogY3VycmVudFsnaWQnXSBpZiBjdXJyZW50IGVsc2UgTm9uZX0KICAgICAgICAgICAgICAgICAgICBzdGF0ZVsnYmluZGluZ3MnXVtzdGFnZV0gPSBzYXZlZAogICAgICAgICAgICAgICAgICAgIHNlbGYuc2F2ZShzdGF0ZSkKICAgICAgICAgICAgICAgICAgICB1cGxvYWRlZCA9IHNlbGYuYXBpKCcvdXBsb2Fkcz9uYW1lPScgKyB1cmxsaWIucGFyc2UucXVvdGUoJ29wZW5zcGVjLXJvbGUtJyArIHN0YWdlKSwgbWV0aG9kPSdQT1NUJywKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk9YnVuZGxlWyd0YXJiYWxsJ10sIGhlYWRlcnM9eydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vZ3ppcCd9KQogICAgICAgICAgICAgICAgICAgIHJlcXVpcmUoaXNpbnN0YW5jZSh1cGxvYWRlZCwgZGljdCkgYW5kIHVwbG9hZGVkLmdldCgnc3RhdHVzJykgPT0gJ0NPTVBMRVRFRCcKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZCBpc2luc3RhbmNlKHVwbG9hZGVkLmdldCgndGFyYmFsbF9wYXRoJyksIHN0cikKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZCB1cGxvYWRlZFsndGFyYmFsbF9wYXRoJ10uc3RhcnRzd2l0aCgnb2gtaW50ZXJuYWw6Ly91cGxvYWRzLycpCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmQgaWRlbnRpZmllcih1cGxvYWRlZFsndGFyYmFsbF9wYXRoJ10ucmVtb3ZlcHJlZml4KCdvaC1pbnRlcm5hbDovL3VwbG9hZHMvJykpLCAnQnVuZGxlIHVwbG9hZCBkaWQgbm90IGNvbXBsZXRlOyBpbnNwZWN0IG5hdGl2ZSBBdXRvbWF0aW9uIHVwbG9hZHMnKQogICAgICAgICAgICAgICAgICAgIHNhdmVkLnVwZGF0ZShzdGF0ZT0ndXBsb2FkZWQnLCB0YXJiYWxsX3BhdGg9dXBsb2FkZWRbJ3RhcmJhbGxfcGF0aCddKQogICAgICAgICAgICAgICAgICAgIHNlbGYuc2F2ZShzdGF0ZSkKICAgICAgICAgICAgICAgIHJlcXVpcmUoc2F2ZWQuZ2V0KCdzdGF0ZScpICE9ICd1cGxvYWRpbmcnLCAnQnVuZGxlIHVwbG9hZCBvdXRjb21lIGlzIHVua25vd247IGluc3BlY3QgbmF0aXZlIEF1dG9tYXRpb24gdXBsb2FkcyBiZWZvcmUgcmV0cnlpbmcnKQogICAgICAgICAgICAgICAgZGVzaXJlZCA9IGJ1bmRsZVsnZGVmaW5pdGlvbiddIHwgeyd0YXJiYWxsX3BhdGgnOiBzYXZlZFsndGFyYmFsbF9wYXRoJ119CiAgICAgICAgICAgICAgICBpZiBjdXJyZW50IGFuZCBzZWxmLmRlZmluaXRpb25fbWF0Y2hlcyhjdXJyZW50LCBkZXNpcmVkKToKICAgICAgICAgICAgICAgICAgICByZXF1aXJlKHNhdmVkLmdldCgnaWQnKSBpbiAoTm9uZSwgY3VycmVudFsnaWQnXSksICdSb2xlIGF1dG9tYXRpb24gaWRlbnRpdHkgY2hhbmdlZCBkdXJpbmcgc2V0dXAnKQogICAgICAgICAgICAgICAgICAgIGluc3RhbGxlZCA9IGN1cnJlbnQKICAgICAgICAgICAgICAgIGVsc2U6CiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZShub3QgKHNhdmVkLmdldCgnc3RhdGUnKSA9PSAnaW5zdGFsbGluZycgYW5kIHNhdmVkLmdldCgnaWQnKSBpcyBOb25lKSwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICdBdXRvbWF0aW9uIGNyZWF0aW9uIG91dGNvbWUgaXMgdW5rbm93bjsgaW5zcGVjdCBpdHMgaGlzdG9yeSBiZWZvcmUgcmV0cnlpbmcnKQogICAgICAgICAgICAgICAgICAgIHJlcXVpcmUobm90IGN1cnJlbnQgb3Igc2F2ZWQuZ2V0KCdpZCcpID09IGN1cnJlbnRbJ2lkJ10sICdSb2xlIGF1dG9tYXRpb24gaWRlbnRpdHkgY2hhbmdlZCBkdXJpbmcgc2V0dXAnKQogICAgICAgICAgICAgICAgICAgIHNhdmVkWydzdGF0ZSddID0gJ2luc3RhbGxpbmcnCiAgICAgICAgICAgICAgICAgICAgc2VsZi5zYXZlKHN0YXRlKQogICAgICAgICAgICAgICAgICAgIGluc3RhbGxlZCA9IHNlbGYuYXBpKCcvJyArIGN1cnJlbnRbJ2lkJ10gaWYgY3VycmVudCBlbHNlICcnLCBtZXRob2Q9J1BBVENIJyBpZiBjdXJyZW50IGVsc2UgJ1BPU1QnLCBib2R5PWRlc2lyZWQpCiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZShpc2luc3RhbmNlKGluc3RhbGxlZCwgZGljdCkgYW5kIGlkZW50aWZpZXIoaW5zdGFsbGVkLmdldCgnaWQnKSkgYW5kIHNlbGYuZGVmaW5pdGlvbl9tYXRjaGVzKGluc3RhbGxlZCwgZGVzaXJlZCkKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZCAobm90IGN1cnJlbnQgb3IgaW5zdGFsbGVkWydpZCddID09IGN1cnJlbnRbJ2lkJ10pLCAnTmF0aXZlIGluc3RhbGxhdGlvbiByZXR1cm5lZCB1bmV4cGVjdGVkIGRhdGE7IGluc3BlY3QgZGVmaW5pdGlvbnMgYmVmb3JlIHJldHJ5aW5nJykKICAgICAgICAgICAgICAgIHNhdmVkLnVwZGF0ZShzdGF0ZT0ncmVhZHknLCBpZD1pbnN0YWxsZWRbJ2lkJ10pCiAgICAgICAgICAgICAgICBzZWxlY3RlZFtzdGFnZV0gPSBpbnN0YWxsZWQKICAgICAgICAgICAgICAgIHNlbGYuc2F2ZShzdGF0ZSkKICAgICAgICAgICAgaWYgbm90IHNvdXJjZToKICAgICAgICAgICAgICAgIHNvdXJjZSA9IHsnc3RhdGUnOiAncmVnaXN0ZXJpbmcnLCAnc2VjcmV0Jzogc2VjcmV0cy50b2tlbl91cmxzYWZlKDMyKX0KICAgICAgICAgICAgICAgIHN0YXRlWydzb3VyY2UnXSA9IHNvdXJjZQogICAgICAgICAgICAgICAgc2VsZi5zYXZlKHN0YXRlKQogICAgICAgICAgICAgICAgY3JlYXRlZCA9IHNlbGYuYXBpKCcvd2ViaG9va3MnLCBtZXRob2Q9J1BPU1QnLCBib2R5PXsnbmFtZSc6IFNPVVJDRV9OQU1FLCAnc291cmNlJzogU09VUkNFLAogICAgICAgICAgICAgICAgICAgICdldmVudF9rZXlfZXhwcic6ICd0eXBlJywgJ3NpZ25hdHVyZV9oZWFkZXInOiAnWC1TaWduYXR1cmUtMjU2JywgJ3NpZ25hdHVyZV9zY2hlbWUnOiAnaG1hY19zaGEyNTZfaGV4JywKICAgICAgICAgICAgICAgICAgICAnd2ViaG9va19zZWNyZXQnOiBzb3VyY2VbJ3NlY3JldCddfSkKICAgICAgICAgICAgICAgIHJlcXVpcmUoaXNpbnN0YW5jZShjcmVhdGVkLCBkaWN0KSBhbmQgaWRlbnRpZmllcihjcmVhdGVkLmdldCgnaWQnKSkgYW5kIGlkZW50aWZpZXIoY3JlYXRlZC5nZXQoJ29yZ19pZCcpKQogICAgICAgICAgICAgICAgICAgICAgICBhbmQgY3JlYXRlZC5nZXQoJ3NvdXJjZScpID09IFNPVVJDRSwgJ1NvdXJjZSByZWdpc3RyYXRpb24gcmV0dXJuZWQgdW5leHBlY3RlZCBkYXRhOyBpbnNwZWN0IHRoZSBsb2NhbCBjb25uZWN0aW9uJykKICAgICAgICAgICAgICAgIHNvdXJjZS51cGRhdGUoc3RhdGU9J3JlYWR5JywgaWQ9Y3JlYXRlZFsnaWQnXSwgb3JnX2lkPWNyZWF0ZWRbJ29yZ19pZCddKQogICAgICAgICAgICAgICAgc2VsZi5zYXZlKHN0YXRlKQogICAgICAgICAgICBzZWxlY3RlZCA9IHNlbGYuc2VsZWN0ZWQoc2VsZi5pbnZlbnRvcnkoKSkKICAgICAgICAgICAgcmVhZHkgPSBzZWxmLnJlYWRpbmVzcyhzZWxlY3RlZCwgYnVuZGxlcywgc3RhdGUsIHNlbGYuaW52ZW50b3J5KCcvd2ViaG9va3MnLCAnd2ViaG9va3MnKSkKICAgICAgICAgICAgcmVxdWlyZShyZWFkeSwgJ1JvbGUgYXV0b21hdGlvbiBzZXR1cCBjaGFuZ2VkIG9yIGlzIGluY29tcGxldGU7IGluc3BlY3QgbmF0aXZlIGRlZmluaXRpb25zIGFuZCBzb3VyY2VzJykKICAgICAgICAgICAgcmV0dXJuIHNlbGYucmVzdWx0KCdzZXR1cCcsIFRydWUsIHNlbGVjdGVkKQoKICAgIGRlZiB2YWxpZGF0ZV9pbnB1dChzZWxmLCBkYXRhLCAqLCBjb250ZXh0PVRydWUpOgogICAgICAgIGZpZWxkcyA9IHsnYXV0b21hdGlvbl9pZCcsICdyZXF1ZXN0X2lkJywgJ3N0YWdlJywgJ3NwZWNfc3RvcmUnLCAncmVxdWlyZW1lbnRfaWQnLCAnY29udGV4dF9jaGFuZ2UnLCAncm9sZScsICdjaGFuZ2UnLCAncmVxdWVzdCd9CiAgICAgICAgcmVxdWlyZShpc2luc3RhbmNlKGRhdGEsIGRpY3QpIGFuZCBzZXQoZGF0YSkgPT0gZmllbGRzLCAnVW5leHBlY3RlZCByb2xlIGF1dG9tYXRpb24gaW5wdXQgZmllbGRzJykKICAgICAgICByZXF1aXJlKGlkZW50aWZpZXIoZGF0YVsnYXV0b21hdGlvbl9pZCddKSBhbmQgaWRlbnRpZmllcihkYXRhWydyZXF1ZXN0X2lkJ10pLCAnSW52YWxpZCBhdXRvbWF0aW9uIG9yIHJlcXVlc3QgSUQnKQogICAgICAgIHJlcXVpcmUoZGF0YVsnc3RhZ2UnXSBpbiBTVEFHRVMgYW5kIGRhdGFbJ3JvbGUnXSBpbiBST0xFUywgJ1Vuc3VwcG9ydGVkIE9wZW5TcGVjIHNraWxsIG9yIHJvbGUnKQogICAgICAgIHJlcXVpcmUobG9jYWxfcGF0aChkYXRhWydzcGVjX3N0b3JlJ10pID09IFBhdGgoc2VsZi5jb25maWdbJ3NwZWNfc3RvcmUnXSksICdTZWxlY3RlZCBzdG9yZSBkb2VzIG5vdCBtYXRjaCB0aGUgY29uZmlndXJlZCByb2xlIHdvcmtmbG93JykKICAgICAgICByZXF1aXJlKGlzaW5zdGFuY2UoZGF0YVsncmVxdWlyZW1lbnRfaWQnXSwgc3RyKSBhbmQgbGVuKGRhdGFbJ3JlcXVpcmVtZW50X2lkJ10pIDw9IDY0CiAgICAgICAgICAgICAgICBhbmQgcmUuZnVsbG1hdGNoKHInW0EtWl1bQS1aMC05XSooPzotW0EtWjAtOV0rKSonLCBkYXRhWydyZXF1aXJlbWVudF9pZCddKSwgJ0ludmFsaWQgcmVxdWlyZW1lbnQgSUQnKQogICAgICAgIHJlcXVpcmUoc2x1ZyhkYXRhWydjaGFuZ2UnXSkgYW5kIHNsdWcoZGF0YVsnY29udGV4dF9jaGFuZ2UnXSksICdDaGFuZ2UgbmFtZXMgbXVzdCBiZSBrZWJhYi1jYXNlJykKICAgICAgICByZXF1aXJlKGlzaW5zdGFuY2UoZGF0YVsncmVxdWVzdCddLCBzdHIpIGFuZCBsZW4oZGF0YVsncmVxdWVzdCddKSA8PSAxMDAwMCBhbmQgJ1x4MDAnIG5vdCBpbiBkYXRhWydyZXF1ZXN0J10KICAgICAgICAgICAgICAgIGFuZCAoZGF0YVsnc3RhZ2UnXSA9PSAnYXBwbHknIG9yIGRhdGFbJ3JlcXVlc3QnXS5zdHJpcCgpKSwgJ1Byb3Bvc2UgYW5kIFVwZGF0ZSByZXF1aXJlIGEgcHJvbXB0OyBtYXhpbXVtIDEwMDAwIGNoYXJhY3RlcnMnKQogICAgICAgIHJlcXVpcmUoZGF0YVsnY2hhbmdlJ10gIT0gZGF0YVsnY29udGV4dF9jaGFuZ2UnXSBpZiBkYXRhWydzdGFnZSddID09ICdwcm9wb3NlJyBlbHNlIGRhdGFbJ2NoYW5nZSddID09IGRhdGFbJ2NvbnRleHRfY2hhbmdlJ10sCiAgICAgICAgICAgICAgICAnVGhlIGNoYW5nZSBuYW1lIGRvZXMgbm90IG1hdGNoIHRoZSBzZWxlY3RlZCBPcGVuU3BlYyBza2lsbCcpCiAgICAgICAgaWYgbm90IGNvbnRleHQ6CiAgICAgICAgICAgIHJldHVybgogICAgICAgIHN0b3JlID0gUGF0aChzZWxmLmNvbmZpZ1snc3BlY19zdG9yZSddKQogICAgICAgIG1ldGFkYXRhID0gcmVhZF9qc29uKHN0b3JlIC8gJ29wZW5zcGVjL3JlcXVpcmVtZW50cy5qc29uJykKICAgICAgICByb3dzID0gbWV0YWRhdGEuZ2V0KCdyZXF1aXJlbWVudHMnKSBpZiBpc2luc3RhbmNlKG1ldGFkYXRhLCBkaWN0KSBhbmQgdHlwZShtZXRhZGF0YS5nZXQoJ3ZlcnNpb24nKSkgaXMgaW50IGFuZCBtZXRhZGF0YVsndmVyc2lvbiddID09IDEgZWxzZSBOb25lCiAgICAgICAgcmVxdWlyZShpc2luc3RhbmNlKHJvd3MsIGxpc3QpIGFuZCAwIDwgbGVuKHJvd3MpIDw9IDUwIGFuZCBhbGwoaXNpbnN0YW5jZShyb3csIGRpY3QpIGFuZCBpc2luc3RhbmNlKHJvdy5nZXQoJ2lkJyksIHN0cikKICAgICAgICAgICAgICAgIGFuZCBpc2luc3RhbmNlKHJvdy5nZXQoJ2NoYW5nZScpLCBzdHIpIGZvciByb3cgaW4gcm93cyksICdJbnZhbGlkIHN0b3JlIHJlcXVpcmVtZW50IG1ldGFkYXRhJykKICAgICAgICByZXF1aXJlKGxlbih7cm93LmdldCgnaWQnKSBmb3Igcm93IGluIHJvd3N9KSA9PSBsZW4ocm93cykgYW5kIGxlbih7cm93LmdldCgnY2hhbmdlJykgZm9yIHJvdyBpbiByb3dzfSkgPT0gbGVuKHJvd3MpLCAnRHVwbGljYXRlIHN0b3JlIHJlcXVpcmVtZW50cycpCiAgICAgICAgbWF0Y2hlcyA9IFtyb3cgZm9yIHJvdyBpbiByb3dzIGlmIHJvdy5nZXQoJ2lkJykgPT0gZGF0YVsncmVxdWlyZW1lbnRfaWQnXV0KICAgICAgICByZXF1aXJlKGxlbihtYXRjaGVzKSA9PSAxIGFuZCBtYXRjaGVzWzBdLmdldCgnY2hhbmdlJykgPT0gZGF0YVsnY29udGV4dF9jaGFuZ2UnXQogICAgICAgICAgICAgICAgYW5kIGlzaW5zdGFuY2UobWF0Y2hlc1swXS5nZXQoJ3JvbGVzJyksIGRpY3QpIGFuZCBkYXRhWydyb2xlJ10gaW4gbWF0Y2hlc1swXVsncm9sZXMnXSwKICAgICAgICAgICAgICAgICdUaGUgcmVxdWlyZW1lbnQsIHJvbGUsIG9yIGNvbnRleHQgY2hhbmdlIG5vIGxvbmdlciBtYXRjaGVzIHRoZSBzdG9yZScpCiAgICAgICAgY29udGV4dCA9IHN0b3JlIC8gJ29wZW5zcGVjL2NoYW5nZXMnIC8gZGF0YVsnY29udGV4dF9jaGFuZ2UnXQogICAgICAgIHJlcXVpcmUoY29udGV4dC5yZXNvbHZlKCkgPT0gY29udGV4dCBhbmQgY29udGV4dC5pc19kaXIoKSwgJ1RoZSByZXF1aXJlbWVudCBjb250ZXh0IGNoYW5nZSBpcyBtaXNzaW5nIG9yIHN5bWxpbmtlZCcpCiAgICAgICAgaWYgZGF0YVsnc3RhZ2UnXSA9PSAncHJvcG9zZSc6CiAgICAgICAgICAgIHJlcXVpcmUoZGF0YVsnY2hhbmdlJ10gIT0gZGF0YVsnY29udGV4dF9jaGFuZ2UnXSwgJ1Byb3Bvc2UgcmVxdWlyZXMgYSBuZXcgY2hhbmdlIG5hbWUnKQogICAgICAgICAgICB0YXJnZXQgPSBzdG9yZSAvICdvcGVuc3BlYy9jaGFuZ2VzJyAvIGRhdGFbJ2NoYW5nZSddCiAgICAgICAgICAgIHJlcXVpcmUobm90IHRhcmdldC5leGlzdHMoKSBhbmQgbm90IHRhcmdldC5pc19zeW1saW5rKCksICdQcm9wb3NlIHJlZnVzZXMgdG8gb3ZlcndyaXRlIGFuIGV4aXN0aW5nIGNoYW5nZScpCiAgICAgICAgZWxzZToKICAgICAgICAgICAgcmVxdWlyZShkYXRhWydjaGFuZ2UnXSA9PSBkYXRhWydjb250ZXh0X2NoYW5nZSddLCAnVXBkYXRlIGFuZCBBcHBseSBtdXN0IHVzZSB0aGUgcmVxdWlyZW1lbnQgY29udGV4dCBjaGFuZ2UnKQoKICAgIGRlZiBkaXNwYXRjaChzZWxmLCBkYXRhKToKICAgICAgICBzZWxmLnZhbGlkYXRlX2lucHV0KGRhdGEsIGNvbnRleHQ9RmFsc2UpCiAgICAgICAgZmluZ2VycHJpbnQgPSBoYXNobGliLnNoYTI1NihlbmNvZGUoZGF0YSkpLmhleGRpZ2VzdCgpCiAgICAgICAgd2l0aCBzZWxmLmxvY2soKToKICAgICAgICAgICAgam91cm5hbCA9IHNlbGYucm9vdCAvIChkYXRhWydyZXF1ZXN0X2lkJ10gKyAnLmpzb24nKQogICAgICAgICAgICBpZiBqb3VybmFsLmV4aXN0cygpOgogICAgICAgICAgICAgICAgc2F2ZWQgPSByZWFkX2pzb24oam91cm5hbCkKICAgICAgICAgICAgICAgIHJlcXVpcmUoc2F2ZWQuZ2V0KCdmaW5nZXJwcmludCcpID09IGZpbmdlcnByaW50LCAnVGhpcyByZXF1ZXN0IElEIGJlbG9uZ3MgdG8gZGlmZmVyZW50IGlucHV0cycpCiAgICAgICAgICAgICAgICByZXF1aXJlKHNhdmVkLmdldCgnc3RhdGUnKSA9PSAnZGlzcGF0Y2hlZCcsICdUaGlzIHJlcXVlc3QgbWF5IGFscmVhZHkgaGF2ZSBzdGFydGVkOyBpbnNwZWN0IG5hdGl2ZSBBdXRvbWF0aW9uIGhpc3RvcnknKQogICAgICAgICAgICAgICAgcmV0dXJuIHsna2luZCc6ICdkaXNwYXRjaCcsICoqe2tleTogc2F2ZWRba2V5XSBmb3Iga2V5IGluICgnYXV0b21hdGlvbl9pZCcsICdyZXF1ZXN0X2lkJywgJ3J1bl9pZCcpfX0KICAgICAgICAgICAgc2VsZi52YWxpZGF0ZV9pbnB1dChkYXRhKQogICAgICAgICAgICBzZWxlY3RlZCA9IHNlbGYuc2VsZWN0ZWQoc2VsZi5pbnZlbnRvcnkoKSkKICAgICAgICAgICAgc3RhdGUgPSBzZWxmLnN0YXRlKCkKICAgICAgICAgICAgcmVxdWlyZShzZWxmLnJlYWRpbmVzcyhzZWxlY3RlZCwgc2VsZi5idW5kbGVzKCksIHN0YXRlLCBzZWxmLmludmVudG9yeSgnL3dlYmhvb2tzJywgJ3dlYmhvb2tzJykpLCAnQ29ubmVjdCBvciB1cGRhdGUgdGhlIHJvbGUgYXV0b21hdGlvbnMgYmVmb3JlIHJ1bm5pbmcnKQogICAgICAgICAgICByZXF1aXJlKHNlbGVjdGVkW3BhaXJfa2V5KGRhdGFbJ3JvbGUnXSwgZGF0YVsnc3RhZ2UnXSldWydpZCddID09IGRhdGFbJ2F1dG9tYXRpb25faWQnXSwgJ1NlbGVjdGVkIHJvbGUgYXV0b21hdGlvbiBjaGFuZ2VkOyByZWNvbm5lY3QgZmlyc3QnKQogICAgICAgICAgICBldmVudCA9IHsnc2NoZW1hJzogU0NIRU1BLCAndHlwZSc6IGRhdGFbJ3N0YWdlJ10gKyAnLnJlcXVlc3RlZCcsICdhcHByb3ZhbCc6IGRhdGFbJ3N0YWdlJ10sCiAgICAgICAgICAgICAgICAgICAgICoqe2tleTogdmFsdWUgZm9yIGtleSwgdmFsdWUgaW4gZGF0YS5pdGVtcygpIGlmIGtleSAhPSAnYXV0b21hdGlvbl9pZCd9fQogICAgICAgICAgICBzYXZlZCA9IHsnc3RhdGUnOiAnZGlzcGF0Y2hpbmcnLCAnZmluZ2VycHJpbnQnOiBmaW5nZXJwcmludCwgJ2F1dG9tYXRpb25faWQnOiBkYXRhWydhdXRvbWF0aW9uX2lkJ10sICdyZXF1ZXN0X2lkJzogZGF0YVsncmVxdWVzdF9pZCddfQogICAgICAgICAgICBhdG9taWNfanNvbihqb3VybmFsLCBzYXZlZCkKICAgICAgICAgICAgcmF3ID0gZW5jb2RlKGV2ZW50KQogICAgICAgICAgICBzb3VyY2UgPSBzdGF0ZVsnc291cmNlJ10KICAgICAgICAgICAgc2lnbmF0dXJlID0gJ3NoYTI1Nj0nICsgaG1hYy5uZXcoc291cmNlWydzZWNyZXQnXS5lbmNvZGUoKSwgcmF3LCBoYXNobGliLnNoYTI1NikuaGV4ZGlnZXN0KCkKICAgICAgICAgICAgcmVzdWx0ID0gc2VsZi5yZXF1ZXN0ZXIoc2VsZi5iYXNlICsgZiIvZXZlbnRzL3tzb3VyY2VbJ29yZ19pZCddfS97U09VUkNFfSIsIG1ldGhvZD0nUE9TVCcsIGJvZHk9cmF3LCBoZWFkZXJzPXsnWC1TaWduYXR1cmUtMjU2Jzogc2lnbmF0dXJlfSkKICAgICAgICAgICAgcmVxdWlyZShpc2luc3RhbmNlKHJlc3VsdCwgZGljdCkgYW5kIHJlc3VsdC5nZXQoJ3JlY2VpdmVkJykgaXMgVHJ1ZSBhbmQgcmVzdWx0LmdldCgnbWF0Y2hlZCcpID09IDEKICAgICAgICAgICAgICAgICAgICBhbmQgaXNpbnN0YW5jZShyZXN1bHQuZ2V0KCdydW5zX2NyZWF0ZWQnKSwgbGlzdCkgYW5kIGxlbihyZXN1bHRbJ3J1bnNfY3JlYXRlZCddKSA9PSAxIGFuZCBpZGVudGlmaWVyKHJlc3VsdFsncnVuc19jcmVhdGVkJ11bMF0pLAogICAgICAgICAgICAgICAgICAgICdFeHBlY3RlZCBleGFjdGx5IG9uZSByb2xlIGF1dG9tYXRpb24gcnVuOyBpbnNwZWN0IG5hdGl2ZSBoaXN0b3J5IGJlZm9yZSByZXRyeWluZycpCiAgICAgICAgICAgIHNhdmVkLnVwZGF0ZShzdGF0ZT0nZGlzcGF0Y2hlZCcsIHJ1bl9pZD1yZXN1bHRbJ3J1bnNfY3JlYXRlZCddWzBdKQogICAgICAgICAgICBhdG9taWNfanNvbihqb3VybmFsLCBzYXZlZCkKICAgICAgICAgICAgcmV0dXJuIHsna2luZCc6ICdkaXNwYXRjaCcsICoqe2tleTogc2F2ZWRba2V5XSBmb3Iga2V5IGluICgnYXV0b21hdGlvbl9pZCcsICdyZXF1ZXN0X2lkJywgJ3J1bl9pZCcpfX0KCiAgICBkZWYgc3RhdHVzKHNlbGYsIGRhdGEpOgogICAgICAgIHJlcXVpcmUoaXNpbnN0YW5jZShkYXRhLCBkaWN0KSBhbmQgc2V0KGRhdGEpID09IHsnYXV0b21hdGlvbl9pZCcsICdydW5faWQnfSBhbmQgYWxsKGlkZW50aWZpZXIodmFsdWUpIGZvciB2YWx1ZSBpbiBkYXRhLnZhbHVlcygpKSwgJ0ludmFsaWQgcm9sZSBydW4gc3RhdHVzIHJlcXVlc3QnKQogICAgICAgIHJvd3MgPSBzZWxmLnNlbGVjdGVkKHNlbGYuaW52ZW50b3J5KCkpCiAgICAgICAgcmVxdWlyZShhbnkocm93WydpZCddID09IGRhdGFbJ2F1dG9tYXRpb25faWQnXSBmb3Igcm93IGluIHJvd3MudmFsdWVzKCkpLCAnVGhlIHNlbGVjdGVkIHJvbGUgYXV0b21hdGlvbiBpcyB1bmF2YWlsYWJsZScpCiAgICAgICAgIyBCb3VuZCBib3RoIGhpc3RvcnkgbG9va3VwIGFuZCByZXR1cm5lZCBkYXRhOyBuZXZlciBleHBvc2UgcmF3IHJ1biBtZXRhZGF0YS4KICAgICAgICBmb3Igb2Zmc2V0IGluIHJhbmdlKDAsIDEwMDAsIDEwMCk6CiAgICAgICAgICAgIHBhZ2UgPSBzZWxmLmFwaShmIi97ZGF0YVsnYXV0b21hdGlvbl9pZCddfS9ydW5zP2xpbWl0PTEwMCZvZmZzZXQ9e29mZnNldH0iKQogICAgICAgICAgICByZXF1aXJlKGlzaW5zdGFuY2UocGFnZSwgZGljdCkgYW5kIGlzaW5zdGFuY2UocGFnZS5nZXQoJ3J1bnMnKSwgbGlzdCkgYW5kIGxlbihwYWdlWydydW5zJ10pIDw9IDEwMAogICAgICAgICAgICAgICAgICAgIGFuZCB0eXBlKHBhZ2UuZ2V0KCd0b3RhbCcpKSBpcyBpbnQgYW5kIHBhZ2VbJ3RvdGFsJ10gPj0gb2Zmc2V0ICsgbGVuKHBhZ2VbJ3J1bnMnXSksICdJbnZhbGlkIG5hdGl2ZSBBdXRvbWF0aW9uIGhpc3RvcnknKQogICAgICAgICAgICBmb3VuZCA9IFtyb3cgZm9yIHJvdyBpbiBwYWdlWydydW5zJ10gaWYgaXNpbnN0YW5jZShyb3csIGRpY3QpIGFuZCByb3cuZ2V0KCdpZCcpID09IGRhdGFbJ3J1bl9pZCddXQogICAgICAgICAgICByZXF1aXJlKGxlbihmb3VuZCkgPD0gMSwgJ0R1cGxpY2F0ZSBydW4gaWRlbnRpdGllcyBpbiBuYXRpdmUgaGlzdG9yeScpCiAgICAgICAgICAgIGlmIGZvdW5kOgogICAgICAgICAgICAgICAgcm93ID0gZm91bmRbMF0KICAgICAgICAgICAgICAgIHJlcXVpcmUocm93LmdldCgnYXV0b21hdGlvbl9pZCcpID09IGRhdGFbJ2F1dG9tYXRpb25faWQnXSBhbmQgcm93LmdldCgnc3RhdHVzJykgaW4gU1RBVFVTRVMKICAgICAgICAgICAgICAgICAgICAgICAgYW5kIChyb3cuZ2V0KCdjb252ZXJzYXRpb25faWQnKSBpcyBOb25lIG9yIGlkZW50aWZpZXIocm93Wydjb252ZXJzYXRpb25faWQnXSkpLCAnSW52YWxpZCBuYXRpdmUgcm9sZSBydW4gc3RhdHVzJykKICAgICAgICAgICAgICAgICMgU2VydmljZSBlcnJvcnMgbWF5IGNvbnRhaW4gZW52aXJvbm1lbnQgb3IgbW9kZWwgZGV0YWlscy4gS2VlcCB0aG9zZSBpbgogICAgICAgICAgICAgICAgIyBuYXRpdmUgaGlzdG9yeTsgZGlzcGxheSBvbmx5IGFuIGFjdGlvbmFibGUsIGZpeGVkIHN1bW1hcnkgaW4gQ2FudmFzLgogICAgICAgICAgICAgICAgZXJyb3IgPSAnVGhpcyBydW4gbmVlZHMgYXR0ZW50aW9uLiBPcGVuIG5hdGl2ZSBBdXRvbWF0aW9uIGhpc3RvcnkgZm9yIGRldGFpbHMuJyBpZiByb3cuZ2V0KCdlcnJvcl9kZXRhaWwnKSBvciByb3dbJ3N0YXR1cyddID09ICdGQUlMRUQnIGVsc2UgTm9uZQogICAgICAgICAgICAgICAgcmV0dXJuIHsna2luZCc6ICdzdGF0dXMnLCAqKmRhdGEsICdzdGF0dXMnOiByb3dbJ3N0YXR1cyddLCAnY29udmVyc2F0aW9uX2lkJzogcm93LmdldCgnY29udmVyc2F0aW9uX2lkJyksICdlcnJvcic6IGVycm9yfQogICAgICAgICAgICBpZiBvZmZzZXQgKyBsZW4ocGFnZVsncnVucyddKSA+PSBwYWdlWyd0b3RhbCddOgogICAgICAgICAgICAgICAgYnJlYWsKICAgICAgICAgICAgcmVxdWlyZShsZW4ocGFnZVsncnVucyddKSA9PSAxMDAsICdJbmNvbXBsZXRlIG5hdGl2ZSBBdXRvbWF0aW9uIGhpc3RvcnknKQogICAgICAgIHJhaXNlIEJyaWRnZUVycm9yKCdSdW4gd2FzIG5vdCBmb3VuZCBpbiB0aGUgbGF0ZXN0IDEwMDAgZW50cmllczsgaW5zcGVjdCBuYXRpdmUgQXV0b21hdGlvbiBoaXN0b3J5JykKCgpkZWYgaGFuZGxlKHZhbHVlKToKICAgIHJlcXVpcmUoaXNpbnN0YW5jZSh2YWx1ZSwgZGljdCkgYW5kIHNldCh2YWx1ZSkgPD0geydhY3Rpb24nLCAnc2VydmljZScsICdob21lJywgJ2lucHV0J30KICAgICAgICAgICAgYW5kIHZhbHVlLmdldCgnYWN0aW9uJykgaW4gKCdwcm9iZScsICdzZXR1cCcsICdkaXNwYXRjaCcsICdzdGF0dXMnKSwgJ0ludmFsaWQgcm9sZSBicmlkZ2UgcmVxdWVzdCcpCiAgICBicmlkZ2UgPSBCcmlkZ2UodmFsdWUuZ2V0KCdzZXJ2aWNlJyksIHZhbHVlLmdldCgnaG9tZScpKQogICAgYWN0aW9uID0gdmFsdWVbJ2FjdGlvbiddCiAgICBpZiBhY3Rpb24gaW4gKCdkaXNwYXRjaCcsICdzdGF0dXMnKToKICAgICAgICByZXR1cm4gZ2V0YXR0cihicmlkZ2UsIGFjdGlvbikodmFsdWUuZ2V0KCdpbnB1dCcpKQogICAgcmVxdWlyZSgnaW5wdXQnIG5vdCBpbiB2YWx1ZSwgJ1VuZXhwZWN0ZWQgcm9sZSBicmlkZ2UgaW5wdXRzJykKICAgIHJldHVybiBnZXRhdHRyKGJyaWRnZSwgYWN0aW9uKSgpCgoKaWYgX19uYW1lX18gPT0gJ19fbWFpbl9fJzoKICAgIHRyeToKICAgICAgICByZXF1aXJlKGxlbihzeXMuYXJndikgPT0gMiBhbmQgbGVuKHN5cy5hcmd2WzFdKSA8PSAxMDAwMDAsICdJbnZhbGlkIHJvbGUgYnJpZGdlIGlucHV0JykKICAgICAgICByZXN1bHQgPSBoYW5kbGUoanNvbi5sb2FkcyhiYXNlNjQuYjY0ZGVjb2RlKHN5cy5hcmd2WzFdLCB2YWxpZGF0ZT1UcnVlKSkpCiAgICAgICAgcHJpbnQoanNvbi5kdW1wcyh7J3ZlcnNpb24nOiAxLCAqKnJlc3VsdH0sIGVuc3VyZV9hc2NpaT1GYWxzZSkpCiAgICBleGNlcHQgQnJpZGdlRXJyb3IgYXMgZXJyb3I6CiAgICAgICAgcHJpbnQoanNvbi5kdW1wcyh7J3ZlcnNpb24nOiAxLCAna2luZCc6ICdlcnJvcicsICdtZXNzYWdlJzogc3RyKGVycm9yKVs6NjAwXX0pKQogICAgICAgIHN5cy5leGl0KDEpCiAgICBleGNlcHQgRXhjZXB0aW9uOgogICAgICAgIHByaW50KGpzb24uZHVtcHMoeyd2ZXJzaW9uJzogMSwgJ2tpbmQnOiAnZXJyb3InLCAnbWVzc2FnZSc6ICdDb3VsZCBub3QgY29tcGxldGUgdGhlIHJvbGUgQXV0b21hdGlvbiByZXF1ZXN0OyBpbnNwZWN0IG5hdGl2ZSBoaXN0b3J5IGJlZm9yZSByZXRyeWluZyd9KSkKICAgICAgICBzeXMuZXhpdCgxKQo="), (character) => character.charCodeAt(0)));

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
  const fields2 = ["stage", "spec_store", "requirement_id", "context_change", "role", "change", "request"];
  const withIds = object2(input) && (Object.hasOwn(input, "automation_id") || Object.hasOwn(input, "request_id"));
  requireValue(exact(input, withIds ? [...fields2, "automation_id", "request_id"] : fields2), "Invalid role automation input fields.");
  requireValue(STAGES.includes(input.stage) && ROLES2.includes(input.role), "Choose a supported role and OpenSpec skill.");
  requireValue(path(input.spec_store), "Load an absolute local spec store directory first.");
  requireValue(typeof input.requirement_id === "string" && input.requirement_id.length <= 64 && /^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)*$/.test(input.requirement_id), "Choose a valid requirement.");
  requireValue(slug(input.context_change) && slug(input.change), "Enter a kebab-case change name of at most 100 characters.");
  requireValue(
    input.stage === "propose" ? input.change !== input.context_change : input.change === input.context_change,
    input.stage === "propose" ? "Propose needs a new change name." : "Update and Apply must use this requirement\u2019s change."
  );
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
  propose: "Plan a new requirement from this role\u2019s perspective, with tasks for all four roles. Stops before implementation.",
  update: "Revise this requirement\u2019s planning artifacts. Submitting authorizes the edits described in your prompt. Stops before implementation.",
  apply: "Work through this role\u2019s tasks in the selected change. Check tasks only after their required verification succeeds."
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
  const key = `openhands.apps.openspec-progress:v4:${host.backend.id}:${workspace}:${requirement.id}:${role.id}:run`;
  try {
    const value = JSON.parse(localStorage.getItem(key));
    if (value && UUID2.test(value.request_id) && UUID2.test(value.automation_id) && SKILLS[value.stage] && (!value.run_id || UUID2.test(value.run_id))) last = value;
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
  skill.value = last?.stage || "apply";
  skillLabel.append(skill);
  const changeLabel = el("label", "osb-skill-field");
  changeLabel.append(el("span", "osb-label", "New change name"));
  const change = el("input");
  change.setAttribute("aria-label", `${role.id} new change name`);
  change.placeholder = "add-task-reminders";
  change.maxLength = 100;
  changeLabel.append(change);
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
  form.append(skillLabel, changeLabel, promptLabel, help, submit);
  const result = el("div", "osb-run-result");
  result.setAttribute("role", "status");
  result.setAttribute("aria-live", "polite");
  body.append(connectionText, target, connectionActions, setupHelp, form, result);
  panel.append(body);
  container.append(panel);
  function update() {
    const stage = skill.value;
    const matches = connection?.configuration?.spec_store === workspace;
    submit.disabled = busy || !connection?.ready || !matches || Boolean(last);
    skill.disabled = change.disabled = prompt.disabled = busy || Boolean(last);
    setup.disabled = probe.disabled = busy;
    setup.hidden = Boolean(connection?.ready);
    setupHelp.hidden = Boolean(connection?.ready);
    changeLabel.hidden = stage !== "propose";
    change.required = stage === "propose";
    prompt.required = stage !== "apply";
    promptTitle.textContent = stage === "apply" ? "Prompt (optional)" : "Prompt";
    help.textContent = HELP[stage];
    submit.textContent = `Run ${role.id} ${SKILLS[stage]}`;
    panel.setAttribute("aria-busy", String(busy));
  }
  function renderLast(message) {
    result.replaceChildren();
    if (message) result.append(el("p", "osb-run-error", message));
    if (!last) return;
    result.append(
      el("p", "", last.run_id ? `${SKILLS[last.stage]} submitted for ${role.id}. Refresh status or open the run for its result.` : "This request may have started. Inspect automation history before starting another run."),
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
  panel.addEventListener("toggle", () => {
    if (!panel.open || opened || disposed) return;
    opened = true;
    renderLast();
    connect("probe");
  });
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (busy || last || disposed || !connection?.ready || connection.configuration.spec_store !== workspace) return;
    let input;
    try {
      input = validateRoleInput({
        stage: skill.value,
        spec_store: workspace,
        requirement_id: requirement.id,
        context_change: requirement.change,
        role: role.id,
        change: skill.value === "propose" ? change.value.trim() : requirement.change,
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
    const attempt = { request_id: crypto.randomUUID(), automation_id: automation.id, stage: skill.value };
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
  if (host.apiVersion !== "1") throw new Error("OpenSpec board requires Canvas host API 1.");
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
    let selectedArtifact = "proposal";
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
      root.append(el2("h1", "", "OpenSpec board"), el2("p", "osb-alert", "Connect a local Agent Server to read your OpenSpec store."));
      return dispose;
    }
    const header = el2("header", "osb-header");
    const branding = el2("div", "osb-brand");
    branding.append(el2("div", "osb-symbol", "OS"));
    const title = el2("div");
    title.append(el2("p", "osb-eyebrow", "OPENSPEC / DELIVERY WORKSPACE"), el2("h1", "", "Requirement board"));
    branding.append(title);
    const actions = el2("div", "osb-header-actions");
    const refresh = button2("\u21BB  Refresh", "osb-button osb-primary", () => refreshData());
    actions.append(badge("Live from files", "live"), refresh);
    header.append(branding, actions);
    const subtitle = el2("p", "osb-subtitle", "One requirement. Four roles. A shared definition of done.");
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
        pill.title = `${role.id}: ${STATES2[role.state]} \xB7 ${role.complete}/${role.total} tasks`;
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
      foot.append(el2("span", "", `${requirement.rolesComplete}/4 roles`), el2("span", "", `${requirement.complete}/${requirement.total} tasks`));
      item.append(meter(requirement.complete, requirement.total, `${requirement.id} tasks complete`), foot);
      const blocked = requirement.roles.find((r) => r.state === "blocked");
      if (blocked) item.append(el2("p", "osb-blocker", `! ${blocked.note || `${blocked.id} is blocked`}`));
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
        const reqs = snapshot.requirements.filter((r) => (!query || `${r.id} ${r.title} ${r.summary} ${r.change}`.toLowerCase().includes(query)) && (!filters.role || r.roles.some((role) => role.id === filters.role && role.state !== "done")));
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
      const pipeline = el2("div", "osb-pipeline");
      for (const role of requirement.roles) {
        const panel = el2("section", `osb-role-panel osb-${role.state}`);
        const top = el2("div", "osb-role-panel-top");
        top.append(el2("span", "osb-role-avatar", SHORT[role.id]), badge(STATES2[role.state], role.state));
        panel.append(top, el2("h3", "", role.id === "SA" ? "SA \xB7 Solution Architect" : role.id), el2("p", "osb-owner", role.owner), meter(role.complete, role.total, `${role.id} task progress`), el2("p", "osb-task-count", `${role.complete} / ${role.total} tasks`));
        if (role.note) panel.append(el2("p", "osb-role-note", role.note));
        const tasks = el2("ul", "osb-checklist");
        for (const task of role.tasks) {
          const item = el2("li", task.done ? "completed" : "");
          const mark = el2("span", "osb-check", task.done ? "\u2713" : "\u25CB");
          mark.setAttribute("aria-label", task.done ? "Complete" : "Remaining");
          const text3 = el2("div");
          text3.append(el2("span", "", task.description), el2("small", "", `tasks.md:${task.line}`));
          item.append(mark, text3);
          tasks.append(item);
        }
        if (!role.tasks.length) tasks.append(el2("li", "osb-warning", "No tasks assigned to this role."));
        panel.append(tasks);
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
      const tabs = el2("div", "osb-artifact-tabs");
      tabs.setAttribute("role", "group");
      tabs.setAttribute("aria-label", "Source artifact");
      const body = el2("div", "osb-artifact-body");
      function drawArtifact() {
        tabs.replaceChildren();
        body.replaceChildren();
        for (const artifact2 of requirement.artifacts) {
          const control = button2(`${ARTIFACTS[artifact2.id]}${artifact2.status === "missing" ? " \xB7 missing" : ""}`, selectedArtifact === artifact2.id ? "selected" : "", () => {
            selectedArtifact = artifact2.id;
            drawArtifact();
          });
          control.setAttribute("aria-pressed", String(selectedArtifact === artifact2.id));
          tabs.append(control);
        }
        const artifact = requirement.artifacts.find((a) => a.id === selectedArtifact) || requirement.artifacts[0];
        if (!artifact) return;
        body.append(el2("div", "osb-artifact-path", artifact.path), el2("pre", "", artifact.status === "missing" ? "This artifact has not been created yet." : artifact.content));
      }
      artifactSection.append(artifactHeader, tabs, body);
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
      if (!snapshot) content.replaceChildren(el2("div", "osb-loading", "Loading your requirement board\u2026"));
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
