/* SuperPlane board demo for metabrand.digital. Original: superplane.com hero board, built by Metabrand. */
(function () {
  var mount = document.getElementById("sp-demo-mount");
  if (!mount || mount.getAttribute("data-sp-mounted") || !mount.attachShadow) return;
  mount.setAttribute("data-sp-mounted", "1");
  if (!document.querySelector("link[data-sp-fonts]")) {
    var pc = document.createElement("link"); pc.rel = "preconnect"; pc.href = "https://fonts.gstatic.com"; pc.crossOrigin = ""; document.head.appendChild(pc);
    var f = document.createElement("link"); f.rel = "stylesheet"; f.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"; f.setAttribute("data-sp-fonts", "1"); document.head.appendChild(f);
  }
  var R = mount.attachShadow({ mode: "open" });
  R.innerHTML = "<style>" + ":host{all:initial;display:block;background:linear-gradient(#08090a66,#08090a66),url(https://metabrand-agency.github.io/metabrand-media/superplane_demo/kv.avif) 50% 62%/cover no-repeat #08090a;padding:3vw 0}.sp-root{font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:var(--text-primary);-webkit-font-smoothing:antialiased;font-size:14px;line-height:20px;text-align:left}article,aside,header,section{display:block}img{border:0;vertical-align:middle;max-width:100%;display:inline-block}svg:not(:root){overflow:hidden}code{font-family:monospace;font-size:1em}button{color:inherit;font:inherit;margin:0;overflow:visible;text-transform:none;-webkit-appearance:button;cursor:pointer;border:0}h4{margin-top:10px;margin-bottom:10px;font-weight:bold;font-size:18px;line-height:24px}p{margin-top:0;margin-bottom:10px;font-size:18px}ul{margin-top:0;margin-bottom:10px;padding-left:40px}\n:host{\n--bg-page:#0b0b0c;\n--bg-frame:#11110e;\n--bg-sidebar:#151510;\n--bg-topbar:#11110e;\n--bg-col-default:#1d2121;\n--bg-col-active:#121417;\n--bg-col-header:#1b1b17;\n--line:#30302b;\n--line-soft:#292924;\n--text-primary:#e7e7e5;\n--text-muted:#a1a19e;\n--text-dim:#6d6d69;\n--icon-chip:#20201c;\n--card-bg-top:#26262a;\n--card-bg-bot:#1f1f22;\n--card-border:rgba(216,216,216,0.2);\n--tag-bg:#28282a;\n--blue:#6f90bc;\n--coral:#d66a63;\n--purple:#9b6ddb;\n--purple-pill:#362d48;\n--purple-pill-text:#a7a0b9;\n--amber:#f59e0b;\n--btn-bg:#4b4e54;\n--btn-border:#73777e;\n}\n*{box-sizing:border-box;}\n\n\nimg{ display:block; }\n.ic{ flex:0 0 auto; display:inline-block; }\n.stage{\ndisplay:flex;\nalign-items:center;\njustify-content:center;\npadding:clamp(8px, 1.5vw, 20px) clamp(16px, 4vw, 56px);\n}\n.board-frame{\nwidth:100%;\nmax-width:1354px;\nbackground:var(--bg-frame);\nborder-radius:8px;\noverflow:hidden;\ndisplay:flex;\nposition:relative;\nbox-shadow:0 40px 90px -30px rgba(0,0,0,0.7);\nborder:1px solid var(--line-soft);\naspect-ratio:1354/719;\n}\n@media (max-width:900px){\n.board-frame{ aspect-ratio:auto; height:min(88vh, 760px); }\n}\n.sidebar{\nflex:0 0 54px;\nwidth:54px;\nbackground:var(--bg-sidebar);\nborder-right:1px solid var(--line);\ndisplay:flex;\nflex-direction:column;\nalign-items:center;\npadding:10px 0;\n}\n.sidebar .rail-top{ display:flex; flex-direction:column; gap:10px; }\n.rail-btn{\nwidth:34px; height:34px; border-radius:6px;\nbackground:var(--icon-chip);\ndisplay:flex; align-items:center; justify-content:center;\ncolor:var(--text-muted);\n}\n.rail-btn.mark{ color:var(--text-primary); font-size:12px; font-weight:600; }\n.sidebar .rail-spacer{ flex:1; }\n.rail-avatar{\nwidth:27px; height:27px; border-radius:50%;\noverflow:hidden;\nborder:1px solid var(--line);\nmargin-bottom:2px;\n}\n.rail-avatar img{ width:100%; height:100%; object-fit:cover; }\n@media (max-width:640px){ .sidebar{ display:none; } }\n.main{ flex:1; min-width:0; display:flex; flex-direction:column; }\n.topbar{\nheight:56px; flex:0 0 56px;\nbackground:var(--bg-topbar);\nborder-bottom:1px solid var(--line);\ndisplay:flex; align-items:center; justify-content:space-between;\npadding:0 clamp(12px,2vw,20px);\ngap:12px;\n}\n.topbar-left{ display:flex; align-items:center; gap:10px; min-width:0; }\n.board-title{ font-size:15px; font-weight:600; color:var(--text-primary); white-space:nowrap; }\n.pill{\ndisplay:inline-flex; align-items:center; gap:6px;\nheight:28px; padding:0 12px; border-radius:14px;\nfont-size:12px; white-space:nowrap;\n}\n.pill-purple{ background:var(--purple-pill); color:var(--purple-pill-text); }\n.configure-row{\ndisplay:flex; align-items:center; gap:6px;\ncolor:var(--text-muted); font-size:12px; white-space:nowrap;\n}\n@media (max-width:760px){ .configure-row{ display:none; } }\n.topbar-right{ display:flex; align-items:center; gap:10px; flex:0 0 auto; }\n.segmented{\ndisplay:flex; align-items:center; height:28px;\nbackground:var(--icon-chip); border-radius:14px; padding:2px;\n}\n.segmented button{\nall:unset; cursor:pointer;\npadding:0 12px; height:24px; display:flex; align-items:center;\nborder-radius:12px; font-size:12px; color:var(--text-muted);\nfont-family:inherit;\ntransition:background 0.15s ease, color 0.15s ease;\n}\n.segmented button.is-active{ background:#373735; color:var(--text-primary); }\n.segmented button:not(.is-active):hover{ color:var(--text-primary); background:rgba(255,255,255,0.05); }\n@media (max-width:560px){ .segmented button:not(.is-active){ display:none; } }\n.icon-btn{\nwidth:28px; height:28px; border-radius:6px;\ndisplay:flex; align-items:center; justify-content:center;\nbackground:transparent;\ntransition:background 0.15s ease;\n}\n.icon-btn:hover{ background:var(--icon-chip); }\n.rail-btn{ transition:background 0.15s ease; }\n.rail-btn:not(.mark):hover{ background:#2a2a24; cursor:pointer; }\n@media (max-width:480px){ .icon-btn.hide-xs{ display:none; } }\n.board{\nflex:1; min-height:0;\ndisplay:flex; gap:11px;\npadding:12px;\noverflow-x:auto;\noverflow-y:hidden;\nscroll-snap-type:x proximity;\n}\n.board::-webkit-scrollbar{ height:8px; }\n.board::-webkit-scrollbar-thumb{ background:var(--line); border-radius:4px; }\n.column{\nflex:1 1 0;\nmin-width:238px;\nmax-width:420px;\nscroll-snap-align:start;\nbackground:var(--bg-col-default);\nborder-radius:9px;\nborder:1px solid var(--line-soft);\ndisplay:flex; flex-direction:column;\noverflow:hidden;\nmin-height:0;\n}\n.column.is-active{ background:var(--bg-col-active); }\n.column-header{\nbackground:var(--bg-col-header);\nborder-bottom:1px solid var(--line);\npadding:12px 14px 10px;\nflex:0 0 auto;\n}\n.column-header-row{\ndisplay:flex; align-items:center; justify-content:space-between;\nmargin-bottom:8px;\n}\n.column-title{ font-size:15px; font-weight:600; color:var(--text-primary); }\n.column-header-actions{ display:flex; align-items:center; gap:11px; }\n.column-header-actions .ic{ cursor:pointer; opacity:0.9; }\n.column-header-actions .ic:hover{ opacity:1; }\n.column-meta-line{\ndisplay:flex; align-items:center; justify-content:space-between; gap:7px;\nfont-size:12.5px; color:var(--text-primary);\nline-height:1.5;\n}\n.column-meta-line-left{ display:flex; align-items:center; gap:7px; min-width:0; }\n.column-meta-line.muted{ color:var(--text-dim); text-decoration:line-through; }\n.column-meta-line + .column-meta-line{ margin-top:4px; }\n.meta-settings{ opacity:0.75; flex:0 0 auto; cursor:pointer; }\n.meta-settings:hover{ opacity:1; }\n.column-body{\nflex:1; min-height:0;\noverflow-y:auto;\npadding:12px;\ndisplay:flex; flex-direction:column; gap:12px;\n}\n.column-body::-webkit-scrollbar{ width:6px; }\n.column-body::-webkit-scrollbar-thumb{ background:var(--line); border-radius:3px; }\n.card{\nbackground:linear-gradient(180deg,var(--card-bg-top),var(--card-bg-bot));\nborder:1px solid var(--card-border);\nborder-radius:8px;\npadding:12px 12px 10px;\ntransition:border-color 0.15s ease, background 0.15s ease, transform 0.15s ease;\ncursor:pointer;\n}\n.card:hover{\nborder-color:rgba(216,216,216,0.4);\nbackground:linear-gradient(180deg,#2c2c31,#242428);\n}\n.card-top{\ndisplay:flex; align-items:flex-start; justify-content:space-between;\ngap:8px; margin-bottom:9px;\n}\n.card-title-row{ display:flex; align-items:center; gap:8px; min-width:0; }\n.card-title{\nfont-size:13px; color:var(--text-primary);\noverflow:hidden; text-overflow:ellipsis; white-space:nowrap;\nmax-width:100%;\n}\n.card-title code{ font-family:inherit; background:rgba(255,255,255,0.06); padding:0 3px; border-radius:3px; }\n.tag-row{ display:flex; flex-wrap:wrap; gap:6px; margin-bottom:10px; }\n.tag{\ndisplay:inline-flex; align-items:center; gap:5px;\nheight:20px; padding:0 8px; border-radius:4px;\nbackground:var(--tag-bg);\nfont-size:9.5px; white-space:nowrap;\nborder:1px solid transparent;\ntransition:background 0.15s ease, border-color 0.15s ease;\n}\n.tag.tag-blue{ color:var(--blue); border-color:rgba(111,144,188,0.35); }\n.tag.tag-coral{ color:var(--coral); border-color:rgba(214,106,99,0.35); }\n.tag.tag-purple{ color:var(--purple); border-color:rgba(155,109,219,0.35); }\n.tag.tag-amber{ color:var(--amber); border-color:rgba(245,158,11,0.35); }\n.tag.tag-neutral{ color:var(--text-muted); border-color:rgba(161,161,158,0.3); }\n.card-footer{\ndisplay:flex; align-items:center; justify-content:space-between;\ngap:8px;\n}\n.card-time{ font-size:11.5px; color:var(--text-dim); white-space:nowrap; }\n.footer-right{ display:flex; align-items:center; gap:7px; }\n.person-name{ font-size:11px; color:var(--text-muted); white-space:nowrap; }\n.card-avatar{\nwidth:21px; height:21px; border-radius:50%;\noverflow:hidden;\nborder:1px solid var(--line);\nflex:0 0 auto;\n}\n.card-avatar img{ width:100%; height:100%; object-fit:cover; }\n.start-btn{\nheight:20px; padding:0 10px; border-radius:4.5px;\nbackground:var(--btn-bg); border:1px solid var(--btn-border);\ncolor:var(--text-primary); font-size:11px; font-family:inherit;\ncursor:pointer;\ntransition:background 0.15s ease, border-color 0.15s ease, color 0.15s ease;\n}\n.start-btn:hover{ background:#f5f5f5; border-color:#f5f5f5; color:#18181a; }\n.create-task{\nmargin-top:2px;\nmin-height:82px;\nborder:1px dashed var(--line);\nborder-radius:8px;\npadding:14px;\ndisplay:flex; align-items:center; justify-content:center; gap:6px;\ncolor:var(--text-muted);\nfont-size:12.5px;\ncursor:pointer;\ntransition:border-color 0.15s ease, color 0.15s ease, background 0.15s ease;\n}\n.create-task:hover{ border-color:var(--text-dim); color:var(--text-primary); background:rgba(255,255,255,0.02); }\n.create-task .ic{ opacity:0.8; }\n@keyframes spin-ease{ to{ transform:rotate(360deg); } }\n.status-spin{\nanimation:spin-ease 1.8s cubic-bezier(0.65,0,0.35,1) infinite;\n}\n.demo-card.attn{\nanimation: demo-pulse 0.9s ease-in-out 2;\n}\n@keyframes demo-pulse{\n0%,100%{ border-color:var(--card-border); box-shadow:none; }\n50%{ border-color:rgba(231,231,229,0.55); box-shadow:0 0 0 3px rgba(231,231,229,0.08); }\n}\n.demo-card.pressed{ transform:scale(0.97); transition:transform 0.12s ease; }\n.demo-card-leaving{\nanimation: card-fade-out 0.45s ease forwards;\n}\n@keyframes card-fade-out{\nto{ opacity:0; transform:scale(0.92); max-height:0; margin:0; padding:0; border-width:0; }\n}\n.done-card-entering{\nanimation: card-fade-in 0.5s cubic-bezier(0.2,0.8,0.3,1.1) both;\n}\n@keyframes card-fade-in{\nfrom{ opacity:0; transform:translateY(-14px) scale(0.96); }\nto{ opacity:1; transform:translateY(0) scale(1); }\n}\n.modal-overlay{\nposition:absolute; inset:0;\nbackground:rgba(5,5,4,0.22);\ndisplay:flex; align-items:center; justify-content:flex-start;\npadding-left:5%;\nopacity:0; pointer-events:none;\ntransition:opacity 0.25s ease;\nz-index:50;\nborder-radius:8px;\n}\n.modal-overlay.open{ opacity:1; pointer-events:auto; }\n@media (max-width:760px){ .modal-overlay{ justify-content:center; padding-left:0; } }\n.modal{\nwidth:min(420px, 60%); height:68%;\nbackground:var(--bg-frame);\nborder:1px solid #585854;\nborder-radius:8px;\nbox-shadow:0 30px 70px -20px rgba(0,0,0,0.8);\ndisplay:flex; flex-direction:column;\noverflow:hidden;\ntransform:translateY(-18px) scale(0.94);\nopacity:0;\ntransition:transform 0.32s cubic-bezier(0.2,0.8,0.2,1), opacity 0.28s ease, width 0.5s cubic-bezier(0.2,0.7,0.2,1);\n}\n.modal-overlay.open .modal{ transform:translateY(0) scale(1); opacity:1; }\n.modal.expanded{ width:66%; max-width:920px; }\n@media (max-width:760px){\n.modal{ width:92%; height:84%; }\n.modal.expanded{ width:96%; }\n}\n.modal-header{\nflex:0 0 auto;\nheight:44px;\nbackground:#1c1c18;\nborder-bottom:1px solid var(--line);\ndisplay:flex; align-items:center; justify-content:space-between;\npadding:0 12px;\ngap:10px;\n}\n.modal-header-left{ display:flex; align-items:center; gap:8px; min-width:0; }\n.modal-title{ font-size:13px; font-weight:600; color:var(--text-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }\n.modal-chip{\ndisplay:inline-flex; align-items:center; gap:5px;\nheight:19px; padding:0 8px; border-radius:4px;\nbackground:#28282a; color:var(--text-muted); font-size:10.5px; white-space:nowrap; flex:0 0 auto;\n}\n.modal-chip .dot{ width:5px; height:5px; border-radius:50%; background:var(--text-muted); }\n.modal-header-right{ display:flex; align-items:center; gap:6px; flex:0 0 auto; }\n.modal-icon-btn{\nwidth:24px; height:24px; border-radius:5px;\nbackground:#28282a; display:flex; align-items:center; justify-content:center;\ncursor:pointer; transition:background 0.15s ease;\n}\n.modal-icon-btn:hover{ background:#33332f; }\n.modal-tabs{ display:flex; align-items:center; height:22px; background:#28282a; border-radius:5px; padding:2px; }\n.modal-tabs span{ padding:0 9px; height:18px; display:flex; align-items:center; border-radius:4px; font-size:10.5px; color:var(--text-muted); }\n.modal-tabs span.active{ background:#4a3418; color:#f5a742; }\n.modal-body{ flex:1; min-height:0; position:relative; overflow:hidden; }\n.modal-view{\nposition:absolute; inset:0;\ndisplay:flex;\nopacity:0; transform:translateX(8px);\ntransition:opacity 0.25s ease, transform 0.25s ease;\npointer-events:none;\n}\n.modal-view.active{ opacity:1; transform:translateX(0); pointer-events:auto; }\n.modal-log-col{\nflex:1 1 100%;\nbackground:#161614;\nborder-right:1px solid var(--line);\ndisplay:flex; flex-direction:column;\nmin-width:0;\ntransition:flex-basis 0.5s cubic-bezier(0.2,0.7,0.2,1);\n}\n.modal.expanded .modal-log-col{ flex:0 0 46%; }\n.modal-log-scroll{\nflex:1; min-height:0; overflow-y:auto;\npadding:14px 16px;\nfont-size:11.5px; line-height:1.7;\n}\n.log-line{\ncolor:var(--text-muted);\nopacity:0; transform:translateY(4px);\ntransition:opacity 0.3s ease, transform 0.3s ease;\nmargin-bottom:2px;\n}\n.log-line.shown{ opacity:1; transform:translateY(0); }\n.log-line.dim{ color:var(--text-dim); padding-left:14px; font-size:11px; }\n.log-line.note{ color:var(--text-muted); margin:8px 0; }\n.log-line b{ color:var(--text-primary); font-weight:600; }\n.chat-bubble{\nbackground:#f3f0e8; color:#1c1c18;\nborder-radius:8px; padding:10px 12px;\nfont-size:11.5px; line-height:1.5;\nmargin:8px 0;\nmax-width:92%;\nopacity:0; transform:translateY(6px);\ntransition:opacity 0.3s ease, transform 0.3s ease;\n}\n.chat-bubble.shown{ opacity:1; transform:translateY(0); }\n.score-dots i.on-amber{ background:var(--amber); transition:background 0.4s ease; }\n.score-dots i.on{ transition:background 0.4s ease; }\n.ready-dot{ transition:background 0.4s ease; }\n.ready-dot.amber{ background:var(--amber); }\n#inputTypedWrap{ color:var(--text-primary); }\n.type-cursor{\ndisplay:inline-block; width:1.5px; height:12px;\nbackground:var(--text-primary); margin-left:1px; vertical-align:middle;\nanimation:cursor-blink 0.9s step-end infinite;\n}\n@keyframes cursor-blink{ 50%{ opacity:0; } }\n.modal-ready-bar{\nflex:0 0 auto; border-top:1px solid var(--line);\npadding:10px 16px;\n}\n.ready-row{ display:flex; align-items:center; gap:6px; font-size:11.5px; font-weight:600; color:var(--text-primary); margin-bottom:8px; }\n.ready-dot{ width:7px; height:7px; border-radius:50%; background:var(--green); flex:0 0 auto; }\n.score-row{ display:flex; align-items:center; gap:14px; margin-bottom:10px; flex-wrap:wrap; }\n.score-label{ font-size:10.5px; color:var(--text-muted); display:flex; align-items:center; gap:6px; }\n.score-dots{ display:flex; gap:3px; }\n.score-dots i{ width:6px; height:6px; border-radius:1.5px; background:#30302b; display:block; }\n.score-dots i.on{ background:#00ae85; }\n.score-num{ font-size:10.5px; font-weight:600; color:var(--text-primary); }\n.ready-actions{ display:flex; align-items:center; gap:6px; }\n.ghost-btn{ height:22px; padding:0 9px; border-radius:5px; background:#28282a; color:var(--text-muted); font-size:10.5px; display:flex; align-items:center; gap:5px; }\n.run-btn{\nheight:23px; padding:0 12px; border-radius:5px; background:#f3f9f6; border:1px solid #374151;\ncolor:#0e1a18; font-size:10.5px; font-weight:600; display:flex; align-items:center; gap:5px; cursor:pointer;\nmargin-left:auto;\n}\n.modal-input-box{ margin-top:10px; border:1px solid var(--line); border-radius:7px; background:#1c1c18; padding:10px 12px; font-size:11.5px; color:#4a4a46; display:flex; flex-direction:column; gap:14px; }\n.input-box-bottom{ display:flex; align-items:center; gap:8px; }\n.input-box-bottom .ic{ opacity:0.7; }\n.input-enter-hint{ margin-left:auto; font-size:10.5px; color:#4a4a46; }\n.input-send-btn{ width:22px; height:22px; display:flex; align-items:center; justify-content:center; }\n.input-send-btn img{ width:100%; height:100%; }\n.modal-spec-col{\nflex:0 0 0%; min-width:0; background:#161614;\noverflow-y:auto; overflow-x:hidden; padding:16px 18px;\nopacity:0;\ntransition:opacity 0.35s ease 0.15s;\n}\n.modal.expanded .modal-spec-col{ flex:1 1 auto; opacity:1; }\n.spec-block{ opacity:0; transform:translateY(6px); transition:opacity 0.35s ease, transform 0.35s ease; padding-bottom:14px; margin-bottom:14px; border-bottom:1px solid var(--line); }\n.spec-block:last-child{ border-bottom:none; }\n.spec-block.shown{ opacity:1; transform:translateY(0); }\n.spec-block h4{ margin:0 0 6px; font-size:13.5px; font-weight:600; color:var(--text-primary); }\n.spec-block p{ margin:0; font-size:11.5px; line-height:1.55; color:var(--text-muted); }\n.spec-block ul{ margin:6px 0 0; padding-left:16px; font-size:11.5px; line-height:1.6; color:var(--text-muted); }\n.spec-block .eyebrow{ font-size:11px; color:var(--text-dim); margin:8px 0 4px; }\n.modal-auto-col{ flex:1; background:var(--bg-frame); padding:14px 16px; overflow-y:auto; }\n.auto-row{\nbackground:#1b1b17; border:1px solid var(--line); border-radius:7px;\npadding:10px 12px; margin-bottom:8px;\nopacity:0; transform:translateY(6px);\ntransition:opacity 0.3s ease, transform 0.3s ease;\n}\n.auto-row.shown{ opacity:1; transform:translateY(0); }\n.auto-row-top{ display:flex; align-items:center; justify-content:space-between; font-size:12px; color:var(--text-primary); font-weight:500; }\n.auto-row-top .left{ display:flex; align-items:center; gap:8px; }\n.auto-status{ width:15px; height:15px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex:0 0 auto; }\n.auto-status.pending{ background:transparent; }\n.auto-status.pending .ring{ width:13px; height:13px; border-radius:50%; border:2px solid #30302b; border-top-color:#6f90bc; animation:spin-ease 1s linear infinite; }\n.auto-status.done{ background:#1f3d2c; color:#56c98b; font-size:10px; font-weight:700; }\n.auto-meta{ font-size:10.5px; color:var(--text-dim); }\n.auto-sub{ margin-top:8px; padding-top:8px; border-top:1px solid var(--line); font-size:11px; color:var(--text-muted); display:flex; flex-direction:column; gap:5px; }\n.auto-sub div{ display:flex; align-items:center; justify-content:space-between; }\n.auto-chip{ display:inline-flex; align-items:center; gap:4px; height:18px; padding:0 7px; border-radius:9px; background:#1f3d2c; color:#56c98b; font-size:10px; }\n.auto-chip.blue{ background:#1c2733; color:#6f90bc; }\n@media (max-width:560px){.modal-chip,.modal-tabs,.modal-header-right .modal-icon-btn:not(#modalCloseBtn){display:none}}" + "</style><div class=\"sp-root\">" + "<div class=\"stage\">\n<div class=\"board-frame\">\n<aside class=\"sidebar\">\n<div class=\"rail-top\">\n<div class=\"rail-btn mark\">S</div>\n<div class=\"rail-btn\"><img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/house.svg\" width=\"15\" height=\"15\" alt=\"\"></div>\n<div class=\"rail-btn\"><img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/chart-line.svg\" width=\"15\" height=\"15\" alt=\"\"></div>\n</div>\n<div class=\"rail-spacer\"></div>\n<div class=\"rail-avatar\"><img src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/account.png\" alt=\"Account\"></div>\n</aside>\n<div class=\"main\">\n<header class=\"topbar\">\n<div class=\"topbar-left\">\n<span class=\"board-title\">Implement</span>\n<span class=\"pill pill-purple\">Business</span>\n<span class=\"configure-row\">\n<span>3/4</span> Configure status checks\n<svg width=\"10\" height=\"10\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M6 9l6 6 6-6\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>\n</span>\n</div>\n<div class=\"topbar-right\">\n<div class=\"segmented\">\n<button class=\"is-active\">All</button>\n<button>Active</button>\n<button>My</button>\n</div>\n<div class=\"icon-btn hide-xs\"><img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/filter.svg\" width=\"14\" height=\"14\" alt=\"Filter\"></div>\n<div class=\"icon-btn hide-xs\"><img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/search.svg\" width=\"14\" height=\"14\" alt=\"Search\"></div>\n<div class=\"icon-btn\"><img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/settings.svg\" width=\"14\" height=\"14\" alt=\"Settings\"></div>\n</div>\n</header>\n<div class=\"board\">\n<section class=\"column\" data-col=\"backlog\">\n<div class=\"column-header\">\n<div class=\"column-header-row\">\n<span class=\"column-title\">Backlog</span>\n<span class=\"column-header-actions\">\n<img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/add-icon.svg\" width=\"9\" height=\"9\" alt=\"Add\">\n<img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/more-icon.svg\" width=\"11\" height=\"3\" alt=\"More\">\n</span>\n</div>\n<div class=\"column-meta-line\">\n<span class=\"column-meta-line-left\">\n<img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/github-copy.svg\" width=\"13\" height=\"13\" alt=\"\">\nListens to GitHub issues\n</span>\n<img class=\"ic meta-settings\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/sliders-horizontal.svg\" width=\"13\" height=\"13\" alt=\"Settings\">\n</div>\n<div class=\"column-meta-line muted\">\n<span class=\"column-meta-line-left\">\n<img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/wand-2.svg\" width=\"13\" height=\"13\" alt=\"\" style=\"filter:grayscale(1) opacity(0.6);\">\nPlanning is off\n</span>\n<img class=\"ic meta-settings\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/sliders-horizontal.svg\" width=\"13\" height=\"13\" alt=\"Settings\">\n</div>\n</div>\n<div class=\"column-body\">\n<article class=\"card demo-card\" id=\"demoCard\">\n<div class=\"card-top\">\n<div class=\"card-title-row\">\n<img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/status-indicator.svg\" width=\"15\" height=\"15\" alt=\"\">\n<span class=\"card-title\">Update <code>retrieve</code> Function To Return LocalPath</span>\n</div>\n<img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/github.svg\" width=\"18\" height=\"17\" alt=\"\">\n</div>\n<div class=\"tag-row\">\n<span class=\"tag tag-neutral\">On Issue</span>\n</div>\n<div class=\"card-footer\">\n<span class=\"card-time\">2 minutes ago</span>\n<button class=\"start-btn\" id=\"demoStartBtn\">Start</button>\n</div>\n</article>\n<article class=\"card\">\n<div class=\"card-top\">\n<div class=\"card-title-row\">\n<img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/status-indicator.svg\" width=\"15\" height=\"15\" alt=\"\">\n<span class=\"card-title\">Re-run hooks on client navigati&#8230;</span>\n</div>\n<img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/superplan.svg\" width=\"18\" height=\"18\" alt=\"\">\n</div>\n<div class=\"tag-row\">\n<span class=\"tag tag-blue\"><img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/bot.svg\" width=\"10\" height=\"10\" alt=\"\">Agent question</span>\n<span class=\"tag tag-coral\">Clarity 2</span>\n<span class=\"tag tag-coral\">Confidence 2</span>\n</div>\n<div class=\"card-footer\">\n<span class=\"card-time\">2 minutes ago</span>\n<button class=\"start-btn\">Start</button>\n</div>\n</article>\n<div class=\"create-task\">\n<img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/add-icon.svg\" width=\"11\" height=\"11\" alt=\"\">\nCreate task\n</div>\n</div>\n</section>\n<section class=\"column is-active\" data-col=\"implement\">\n<div class=\"column-header\">\n<div class=\"column-header-row\">\n<span class=\"column-title\">Implement</span>\n<span class=\"column-header-actions\">\n<img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/more-icon.svg\" width=\"11\" height=\"3\" alt=\"More\">\n</span>\n</div>\n<div class=\"column-meta-line\">\n<span class=\"column-meta-line-left\">\n<img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/bot.svg\" width=\"13\" height=\"13\" alt=\"\">\nRuns the Implement agent\n</span>\n<img class=\"ic meta-settings\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/sliders-horizontal.svg\" width=\"13\" height=\"13\" alt=\"Settings\">\n</div>\n</div>\n<div class=\"column-body\">\n<article class=\"card\">\n<div class=\"card-top\">\n<div class=\"card-title-row\">\n<img class=\"ic status-spin\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/rotating-status-indicator.svg\" width=\"15\" height=\"15\" alt=\"\">\n<span class=\"card-title\">Fix <code>deploy</code> and <code>retrieve</code> Tes&#8230;</span>\n</div>\n<img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/github.svg\" width=\"18\" height=\"17\" alt=\"\">\n</div>\n<div class=\"card-footer\" style=\"margin-top:2px;\">\n<span class=\"card-time\">34 minutes ago</span>\n<div class=\"footer-right\">\n<span class=\"person-name\">Mateo</span>\n<span class=\"card-avatar\"><img src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/avatar-image.png\" alt=\"Mateo\"></span>\n</div>\n</div>\n</article>\n<article class=\"card\">\n<div class=\"card-top\">\n<div class=\"card-title-row\">\n<img class=\"ic status-spin\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/rotating-status-indicator.svg\" width=\"15\" height=\"15\" alt=\"\">\n<span class=\"card-title\">Remove unused .superplane/se&#8230;</span>\n</div>\n<img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/github.svg\" width=\"18\" height=\"17\" alt=\"\">\n</div>\n<div class=\"card-footer\" style=\"margin-top:2px;\">\n<span class=\"card-time\">1d ago</span>\n<div class=\"footer-right\">\n<span class=\"person-name\">Diego</span>\n<span class=\"card-avatar\"><img src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/avatar-image2.png\" alt=\"Diego\"></span>\n</div>\n</div>\n</article>\n</div>\n</section>\n<section class=\"column\" data-col=\"verify\">\n<div class=\"column-header\">\n<div class=\"column-header-row\">\n<span class=\"column-title\">Verify</span>\n<span class=\"column-header-actions\">\n<img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/add-icon.svg\" width=\"9\" height=\"9\" alt=\"Add\">\n<img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/more-icon.svg\" width=\"11\" height=\"3\" alt=\"More\">\n</span>\n</div>\n<div class=\"column-meta-line\">\n<span class=\"column-meta-line-left\">\n<img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/github-copy.svg\" width=\"13\" height=\"13\" alt=\"\">\nAddresses pull request comments\n</span>\n<img class=\"ic meta-settings\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/sliders-horizontal.svg\" width=\"13\" height=\"13\" alt=\"Settings\">\n</div>\n</div>\n<div class=\"column-body\">\n<article class=\"card\">\n<div class=\"card-top\">\n<div class=\"card-title-row\">\n<img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/icon-time.svg\" width=\"14\" height=\"14\" alt=\"\">\n<span class=\"card-title\">Store Work Orders state at cl&#8230;</span>\n</div>\n<img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/github.svg\" width=\"18\" height=\"17\" alt=\"\">\n</div>\n<div class=\"tag-row\">\n<span class=\"tag tag-amber\"><img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/tabler-icon-route.svg\" width=\"10\" height=\"10\" alt=\"\">Review #27</span>\n<span class=\"tag tag-blue\"><img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/rotating-status-indicator.svg\" width=\"9\" height=\"9\" alt=\"\">Addressing user feedback</span>\n</div>\n<div class=\"card-footer\">\n<span class=\"card-time\">1d ago</span>\n<div class=\"footer-right\">\n<span class=\"person-name\">Noah</span>\n<span class=\"card-avatar\"><img src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/avatar-image3.png\" alt=\"Noah\"></span>\n</div>\n</div>\n</article>\n<article class=\"card\">\n<div class=\"card-top\">\n<div class=\"card-title-row\">\n<img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/icon-time.svg\" width=\"14\" height=\"14\" alt=\"\">\n<span class=\"card-title\">Workorder: Link artifact type</span>\n</div>\n<img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/jira.svg\" width=\"18\" height=\"18\" alt=\"\">\n</div>\n<div class=\"tag-row\">\n<span class=\"tag tag-amber\"><img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/tabler-icon-route.svg\" width=\"10\" height=\"10\" alt=\"\">Review #27</span>\n<span class=\"tag tag-blue\"><img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/rotating-status-indicator.svg\" width=\"9\" height=\"9\" alt=\"\">Addressing user feedback</span>\n</div>\n<div class=\"card-footer\">\n<span class=\"card-time\">1d ago</span>\n<div class=\"footer-right\">\n<span class=\"person-name\">Kwame</span>\n<span class=\"card-avatar\"><img src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/avatar-image4.png\" alt=\"Kwame\"></span>\n</div>\n</div>\n</article>\n</div>\n</section>\n<section class=\"column\" data-col=\"done\">\n<div class=\"column-header\">\n<div class=\"column-header-row\">\n<span class=\"column-title\">Done</span>\n<span class=\"column-header-actions\">\n<img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/more-icon.svg\" width=\"11\" height=\"3\" alt=\"More\">\n</span>\n</div>\n<div class=\"column-meta-line\">\n<span class=\"column-meta-line-left\">\n<img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/github-copy.svg\" width=\"13\" height=\"13\" alt=\"\">\nCloses tasks when pull requests merge\n</span>\n<img class=\"ic meta-settings\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/sliders-horizontal.svg\" width=\"13\" height=\"13\" alt=\"Settings\">\n</div>\n</div>\n<div class=\"column-body\" id=\"doneBody\">\n<article class=\"card\">\n<div class=\"card-top\">\n<div class=\"card-title-row\">\n<img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/state.svg\" width=\"14\" height=\"14\" alt=\"\">\n<span class=\"card-title\">Fix notification settings so user&#8230;</span>\n</div>\n<img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/github.svg\" width=\"18\" height=\"17\" alt=\"\">\n</div>\n<div class=\"tag-row\">\n<span class=\"tag tag-purple\"><img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/tabler-icon-git-merge.svg\" width=\"10\" height=\"10\" alt=\"\">Merged #25</span>\n</div>\n<div class=\"card-footer\">\n<span class=\"card-time\">34 minutes ago</span>\n<div class=\"footer-right\">\n<span class=\"person-name\">Leila</span>\n<span class=\"card-avatar\"><img src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/avatar-image.png\" alt=\"Leila\"></span>\n</div>\n</div>\n</article>\n<article class=\"card\">\n<div class=\"card-top\">\n<div class=\"card-title-row\">\n<img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/state.svg\" width=\"14\" height=\"14\" alt=\"\">\n<span class=\"card-title\">Store Work Orders state at clie&#8230;</span>\n</div>\n<img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/jira.svg\" width=\"18\" height=\"18\" alt=\"\">\n</div>\n<div class=\"tag-row\">\n<span class=\"tag tag-purple\"><img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/tabler-icon-git-merge.svg\" width=\"10\" height=\"10\" alt=\"\">Merged #27</span>\n</div>\n<div class=\"card-footer\">\n<span class=\"card-time\">1d ago</span>\n<div class=\"footer-right\">\n<span class=\"person-name\">Zuri</span>\n<span class=\"card-avatar\"><img src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/avatar-image2.png\" alt=\"Zuri\"></span>\n</div>\n</div>\n</article>\n</div>\n</section>\n</div>\n</div>\n<div class=\"modal-overlay\" id=\"modalOverlay\">\n<div class=\"modal\" id=\"modalEl\">\n<div class=\"modal-header\">\n<div class=\"modal-header-left\">\n<span class=\"modal-title\">Update <code>retrieve</code> Function To Return LocalPath</span>\n<span class=\"modal-chip\" id=\"modalOnIssueChip\"><span class=\"dot\"></span>On Issue</span>\n<span class=\"modal-chip\" id=\"modalCostChip\">$0.00 \u00b7 0 tokens</span>\n<span class=\"modal-tabs\" id=\"modalTabs\" style=\"display:none;\">\n<span id=\"tabTask\">Task</span>\n<span class=\"active\" id=\"tabAutomations\">Automations</span>\n</span>\n</div>\n<div class=\"modal-header-right\">\n<div class=\"modal-icon-btn\"><img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/delete.svg\" width=\"13\" height=\"13\" alt=\"Delete\"></div>\n<div class=\"modal-icon-btn\"><img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/link.svg\" width=\"13\" height=\"13\" alt=\"Link\"></div>\n<div class=\"modal-icon-btn\"><img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/expand.svg\" width=\"13\" height=\"13\" alt=\"Expand\"></div>\n<div class=\"modal-icon-btn\" id=\"modalCloseBtn\"><img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/close.svg\" width=\"13\" height=\"13\" alt=\"Close\"></div>\n</div>\n</div>\n<div class=\"modal-body\">\n<div class=\"modal-view active\" id=\"viewDetail\">\n<div class=\"modal-log-col\">\n<div class=\"modal-log-scroll\" id=\"logScroll\">\n<div class=\"log-line\" data-t=\"0\">Explored codebase, researched sources, prepared task \u203a</div>\n<div class=\"log-line dim\" data-t=\"1\">\u203a Thought briefly</div>\n<div class=\"log-line\" data-t=\"2\">Explored 4 files, searched code \u203a</div>\n<div class=\"log-line dim\" data-t=\"3\">\u203a Thought for 11 seconds</div>\n<div class=\"log-line\" data-t=\"4\">Scored task 2 times \u203a</div>\n<div class=\"log-line note\" data-t=\"5\">Download already writes files to disk. The return value is still plain strings \u2014 treating this as a breaking change so callers get local path objects.</div>\n<div class=\"log-line\" data-t=\"6\">Prepared specification \u203a</div>\n<div class=\"log-line\" data-t=\"7\" style=\"font-weight:600;color:var(--text-primary);\">Compactions remaining: 0</div>\n<div class=\"chat-bubble\" id=\"userBubble1\"><span id=\"userBubbleText\"></span></div>\n</div>\n<div class=\"modal-ready-bar\">\n<div class=\"ready-row\"><span class=\"ready-dot amber\" id=\"readyDot\"></span><span id=\"readyText\">Needs a bit more clarity</span></div>\n<div class=\"score-row\">\n<span class=\"score-label\">Clarity <span class=\"score-dots\" id=\"clarityDots\"><i class=\"on-amber\"></i><i class=\"on-amber\"></i><i></i><i></i><i></i></span> <span class=\"score-num\" id=\"clarityNum\">2</span></span>\n<span class=\"score-label\">Confidence <span class=\"score-dots\" id=\"confidenceDots\"><i class=\"on-amber\"></i><i class=\"on-amber\"></i><i class=\"on-amber\"></i><i></i><i></i></span> <span class=\"score-num\" id=\"confidenceNum\">3</span></span>\n</div>\n<div class=\"ready-actions\">\n<span class=\"ghost-btn\" id=\"planBtn\"><img class=\"ic\" id=\"planEyeIcon\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/tabler-icon-eye-on.svg\" width=\"12\" height=\"12\" alt=\"\">Plan</span>\n<span class=\"ghost-btn\"><img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/bot-a1c2.svg\" width=\"11\" height=\"11\" alt=\"\">Auto \u25be</span>\n<button class=\"run-btn\" id=\"modalStartBtn\"><img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/play.svg\" width=\"10\" height=\"10\" alt=\"\">Start</button>\n</div>\n<div class=\"modal-input-box\">\n<span id=\"inputPlaceholder\">Tell the agent more about this task</span>\n<span id=\"inputTypedWrap\" style=\"display:none;\"><span id=\"typedText\"></span><span class=\"type-cursor\" id=\"typeCursor\"></span></span>\n<div class=\"input-box-bottom\">\n<img class=\"ic\" src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/attach.svg\" width=\"14\" height=\"14\" alt=\"\">\n<span class=\"input-enter-hint\">Enter</span>\n<span class=\"input-send-btn\"><img src=\"https://metabrand-agency.github.io/metabrand-media/superplane_demo/send.svg\" width=\"22\" height=\"22\" alt=\"\"></span>\n</div>\n</div>\n</div>\n</div>\n<div class=\"modal-spec-col\" id=\"specCol\">\n<div class=\"spec-block\">\n<h4>Return written local paths</h4>\n<p>Retrieve should return the files it wrote as local path objects, not strings. Callers can then use those objects without wrapping.</p>\n</div>\n<div class=\"spec-block\">\n<h4>Problem</h4>\n<p>Retrieve reports downloaded files as strings. Callers cannot treat those results as local path objects.</p>\n</div>\n<div class=\"spec-block\">\n<h4>Proposed outcome</h4>\n<p>Retrieve returns a list of local path objects, one for each file written.</p>\n</div>\n<div class=\"spec-block\">\n<h4>Constraints</h4>\n<p>Do not change which files are downloaded or where they are written. Do not change deploy or delete. A breaking return type is accepted.</p>\n</div>\n<div class=\"spec-block\">\n<h4>Scope</h4>\n<div class=\"eyebrow\">In scope:</div>\n<ul><li>The public retrieve return type and docstring.</li><li>Private retrieve helpers that accumulate the download list.</li><li>Existing retrieve tests, so they assert local path objects.</li></ul>\n<div class=\"eyebrow\">Out of scope:</div>\n<ul><li>Deploy and delete.</li><li>Download layout, recursion, and repository-in-path behavior.</li></ul>\n</div>\n</div>\n</div>\n<div class=\"modal-view\" id=\"viewAuto\">\n<div class=\"modal-auto-col\">\n<div class=\"auto-row\" id=\"autoRow1\">\n<div class=\"auto-row-top\">\n<span class=\"left\"><span class=\"auto-status done\">\u2713</span>GitHub issues</span>\n<span class=\"auto-meta\">description.md \u00b7 2s</span>\n</div>\n</div>\n<div class=\"auto-row\" id=\"autoRow2\">\n<div class=\"auto-row-top\">\n<span class=\"left\"><span class=\"auto-status done\">\u2713</span>Analysis</span>\n<span class=\"auto-meta\">16m18s</span>\n</div>\n<div class=\"auto-sub\">\n<div><span class=\"auto-chip\">Clarity score 5/5</span><span class=\"auto-chip blue\">Confidence score 4/5</span></div>\n</div>\n</div>\n<div class=\"auto-row\" id=\"autoRow3\">\n<div class=\"auto-row-top\">\n<span class=\"left\"><span class=\"auto-status pending\" id=\"autoRow3Status\"><span class=\"ring\"></span></span>Implement</span>\n<span class=\"auto-meta\" id=\"autoRow3Meta\">Waiting for logs\u2026</span>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>" + "</div>";
(function(){
var demoCard = R.getElementById('demoCard');
var overlay = R.getElementById('modalOverlay');
var viewDetail = R.getElementById('viewDetail');
var viewAuto = R.getElementById('viewAuto');
var modalTabs = R.getElementById('modalTabs');
var modalOnIssueChip = R.getElementById('modalOnIssueChip');
var modalCostChip = R.getElementById('modalCostChip');
var logLines = Array.prototype.slice.call(R.querySelectorAll('#logScroll .log-line'));
var specBlocks = Array.prototype.slice.call(R.querySelectorAll('#specCol .spec-block'));
var autoRows = [R.getElementById('autoRow1'), R.getElementById('autoRow2'), R.getElementById('autoRow3')];
var autoRow3Status = R.getElementById('autoRow3Status');
var autoRow3Meta = R.getElementById('autoRow3Meta');
var doneBody = R.getElementById('doneBody');
var startBtn = R.getElementById('modalStartBtn');
var logScroll = R.getElementById('logScroll');
var boardFrame = R.querySelector('.board-frame');
var modalEl = R.getElementById('modalEl');
var planBtn = R.getElementById('planBtn');
var planEyeIcon = R.getElementById('planEyeIcon');
var EYE_ON = 'https://metabrand-agency.github.io/metabrand-media/superplane_demo/tabler-icon-eye-on.svg';
var EYE_OFF = 'https://metabrand-agency.github.io/metabrand-media/superplane_demo/tabler-icon-eye-off.svg';
var userBubble1 = R.getElementById('userBubble1');
var userBubbleText = R.getElementById('userBubbleText');
var readyDot = R.getElementById('readyDot');
var readyText = R.getElementById('readyText');
var clarityDots = R.getElementById('clarityDots');
var clarityNum = R.getElementById('clarityNum');
var confidenceDots = R.getElementById('confidenceDots');
var confidenceNum = R.getElementById('confidenceNum');
var inputPlaceholder = R.getElementById('inputPlaceholder');
var inputTypedWrap = R.getElementById('inputTypedWrap');
var typedText = R.getElementById('typedText');
var sendBtn = R.querySelector('.input-send-btn');
var USER_MSG = 'Just check the mock tests pass, not the full suite.';
var TYPE_SPEED = 32;
var timers = [];
function at(ms, fn){ timers.push(setTimeout(fn, ms)); }
function setScore(dotsEl, numEl, count, cls){
var dots = dotsEl.querySelectorAll('i');
for(var i=0;i<dots.length;i++){ dots[i].className = i < count ? cls : ''; }
numEl.textContent = count;
}
function typeText(el, text, speed){
var i = 0;
el.textContent = '';
function step(){
el.textContent = text.slice(0, i);
i++;
if(i <= text.length) timers.push(setTimeout(step, speed));
}
step();
}
function doneCardHTML(){
return '<div class="card-top">'+
'<div class="card-title-row">'+
'<img class="ic" src="https://metabrand-agency.github.io/metabrand-media/superplane_demo/state.svg" width="14" height="14" alt="">'+
'<span class="card-title">Update <code>retrieve</code> Function To Return LocalPath</span>'+
'</div>'+
'<img class="ic" src="https://metabrand-agency.github.io/metabrand-media/superplane_demo/github.svg" width="18" height="17" alt="">'+
'</div>'+
'<div class="tag-row">'+
'<span class="tag tag-purple"><img class="ic" src="https://metabrand-agency.github.io/metabrand-media/superplane_demo/tabler-icon-git-merge.svg" width="10" height="10" alt="">Merged #28</span>'+
'</div>'+
'<div class="card-footer">'+
'<span class="card-time">just now</span>'+
'<div class="footer-right">'+
'<span class="person-name">ytkme</span>'+
'<span class="card-avatar"><img src="https://metabrand-agency.github.io/metabrand-media/superplane_demo/avatar-image5.png" alt="ytkme"></span>'+
'</div>'+
'</div>';
}
function flyCardToDone(){
var frameRect = boardFrame.getBoundingClientRect();
var startRect = demoCard.getBoundingClientRect();
var newCard = document.createElement('article');
newCard.className = 'card';
newCard.id = 'insertedDoneCard';
newCard.style.opacity = '0';
newCard.innerHTML = doneCardHTML();
doneBody.insertBefore(newCard, doneBody.firstChild);
var endRect = newCard.getBoundingClientRect();
var flyer = document.createElement('div');
flyer.id = 'flyingGhost';
flyer.style.position = 'absolute';
flyer.style.left = (startRect.left - frameRect.left) + 'px';
flyer.style.top = (startRect.top - frameRect.top) + 'px';
flyer.style.width = startRect.width + 'px';
flyer.style.height = startRect.height + 'px';
flyer.style.zIndex = '60';
flyer.style.pointerEvents = 'none';
var layerOld = document.createElement('div');
layerOld.className = 'card';
layerOld.style.position = 'absolute';
layerOld.style.inset = '0';
layerOld.style.margin = '0';
layerOld.innerHTML = demoCard.innerHTML;
var layerNew = document.createElement('div');
layerNew.className = 'card';
layerNew.style.position = 'absolute';
layerNew.style.inset = '0';
layerNew.style.margin = '0';
layerNew.style.opacity = '0';
layerNew.style.transition = 'opacity 0.45s ease';
layerNew.innerHTML = doneCardHTML();
flyer.appendChild(layerOld);
flyer.appendChild(layerNew);
boardFrame.appendChild(flyer);
demoCard.style.display = 'none';
requestAnimationFrame(function(){
requestAnimationFrame(function(){
flyer.style.transition = 'left 0.7s cubic-bezier(0.3,0.7,0.2,1), top 0.7s cubic-bezier(0.3,0.7,0.2,1)';
flyer.style.left = (endRect.left - frameRect.left) + 'px';
flyer.style.top = (endRect.top - frameRect.top) + 'px';
});
});
timers.push(setTimeout(function(){ layerNew.style.opacity = '1'; }, 340));
timers.push(setTimeout(function(){
flyer.remove();
newCard.style.opacity = '';
}, 760));
}
var navEl = R.querySelector('.site-nav');
var h1El = R.querySelector('.h1-group');
var line2El = R.querySelector('.h1-line2-group');
var eyebrowEl = R.querySelector('.hero-eyebrow');
var subEl = R.querySelector('.hero-sub');
var ctasEl = R.querySelector('.hero-ctas');
var boardWrapEl = R.querySelector('.board-wrap');
var heroSectionEl = R.querySelector('.hero-section');
var REAL_CARDS = Array.prototype.slice.call(R.querySelectorAll('.column-body .card'));
var eTimers = [];
function eAt(ms, fn){ eTimers.push(setTimeout(fn, ms)); }
function centerDelta(el){
var r = el.getBoundingClientRect();
var cx = window.innerWidth/2, cy = window.innerHeight/2;
return { dx: cx - (r.left + r.width/2), dy: cy - (r.top + r.height/2) };
}
var CLUSTER_FRACS = [
{fx:0.16, fy:0.26}, {fx:0.84, fy:0.26}, {fx:0.11, fy:0.5},
{fx:0.89, fy:0.5}, {fx:0.24, fy:0.82}, {fx:0.76, fy:0.82},
{fx:0.5, fy:0.2}, {fx:0.63, fy:0.9}
];
var DECOY_FRACS = [
{fx:0.32, fy:0.3}, {fx:0.68, fy:0.3}, {fx:0.34, fy:0.62},
{fx:0.66, fy:0.62}, {fx:0.5, fy:0.36}
];
function getSafeZone(){
var hero = heroSectionEl.getBoundingClientRect();
var navBottom = navEl ? navEl.getBoundingClientRect().bottom : hero.top + hero.height * 0.1;
var subTop = subEl ? subEl.getBoundingClientRect().top : hero.top + hero.height * 0.62;
var margin = 180;
var top = Math.max(navBottom - hero.top + margin, hero.height * 0.16);
var bottom = Math.min(subTop - hero.top - 26, hero.height * 0.66);
if (bottom - top < hero.height * 0.18) {
top = hero.height * 0.2;
bottom = hero.height * 0.62;
}
return { width: hero.width, top: top, height: bottom - top };
}
var GLOBAL_NUDGE = -110;
function fracToPx(frac, zone){
return { left: (frac.fx * zone.width) + 'px', top: (zone.top + frac.fy * zone.height + GLOBAL_NUDGE) + 'px' };
}
var arrowImg = R.querySelector('.arrow-slide-img');
function cycleArrow(){
if(!arrowImg) return;
arrowImg.style.transition = 'transform 0.3s cubic-bezier(0.6,0,1,0.3)';
arrowImg.style.transform = 'translateX(160%)';
setTimeout(function(){
arrowImg.style.transition = 'none';
arrowImg.style.transform = 'translateX(-160%)';
requestAnimationFrame(function(){
requestAnimationFrame(function(){
arrowImg.style.transition = 'transform 0.9s cubic-bezier(0.16,1,0.3,1)';
arrowImg.style.transform = 'translateX(0%)';
});
});
}, 300);
}
function runEntrance(){
if(!boardWrapEl || !h1El || !REAL_CARDS.length){ eAt(400, runLoop); return; }
if((window.scrollY || window.pageYOffset || 0) > 40){
if(navEl){ navEl.style.opacity = '1'; navEl.style.transform = 'translateY(0)'; }
h1El.style.opacity = '1'; h1El.style.filter = 'blur(0px)'; h1El.style.transform = 'translate(0px,0px) scale(1)';
if(line2El){ line2El.style.opacity = '1'; line2El.style.filter = 'blur(0px)'; line2El.style.transform = 'translateX(0)'; }
if(eyebrowEl){ eyebrowEl.style.opacity = '1'; eyebrowEl.style.transform = 'translateY(0)'; }
if(subEl){ subEl.style.opacity = '1'; subEl.style.transform = 'translateY(0)'; }
if(ctasEl){ ctasEl.style.opacity = '1'; ctasEl.style.transform = 'translateY(0)'; }
boardWrapEl.style.opacity = '1'; boardWrapEl.style.transform = 'translateY(0px)';
REAL_CARDS.forEach(function(card){ card.style.opacity = '1'; });
eAt(200, function(){ runLoop(); setInterval(cycleArrow, 8000); });
return;
}
var heroRectAtStart = (heroSectionEl || document.body).getBoundingClientRect();
var safeZone = getSafeZone();
var realTargets = REAL_CARDS.map(function(c){
var r = c.getBoundingClientRect();
return { left: r.left - heroRectAtStart.left, top: r.top - heroRectAtStart.top };
});
REAL_CARDS.forEach(function(card){ card.style.transition = 'none'; card.style.opacity = '0'; });
boardWrapEl.style.transition = 'none';
boardWrapEl.style.opacity = '0';
boardWrapEl.style.transform = 'translateY(280px)';
if(navEl){ navEl.style.transition = 'none'; navEl.style.opacity = '0'; navEl.style.transform = 'translateY(-24px)'; }
var h1Delta = centerDelta(h1El);
h1El.style.transition = 'none';
h1El.style.opacity = '0';
h1El.style.filter = 'blur(72px)';
h1El.style.transform = 'translate('+h1Delta.dx+'px,'+(h1Delta.dy+130)+'px) scale(0.02)';
if(line2El){ line2El.style.transition = 'none'; line2El.style.opacity = '0'; line2El.style.filter = 'blur(22px)'; line2El.style.transform = 'translateX(-30vw)'; }
if(eyebrowEl){ eyebrowEl.style.transition = 'none'; eyebrowEl.style.opacity = '0'; eyebrowEl.style.transform = 'translateY(14px)'; }
if(subEl){ subEl.style.transition = 'none'; subEl.style.opacity = '0'; subEl.style.transform = 'translateY(14px)'; }
if(ctasEl){ ctasEl.style.transition = 'none'; ctasEl.style.opacity = '0'; ctasEl.style.transform = 'translateY(14px)'; }
function makeGhost(sourceCard, width){
var g = sourceCard.cloneNode(true);
g.removeAttribute('id');
g.style.position = 'absolute';
g.style.zIndex = '9999';
g.style.pointerEvents = 'none';
g.style.margin = '0';
g.style.width = width + 'px';
g.style.left = (heroRectAtStart.width/2) + 'px';
g.style.top = (safeZone.top + safeZone.height*0.1) + 'px';
g.style.transform = 'translate(-50%,-50%) scale(0.02)';
g.style.opacity = '0';
g.style.filter = 'blur(76px)';
g.style.transition = 'none';
(heroSectionEl || document.body).appendChild(g);
return g;
}
var landGhosts = REAL_CARDS.map(function(card){
var w = card.getBoundingClientRect().width;
return makeGhost(card, w);
});
var DELAYS = [40, 90, 520, 680, 780, 980, 1180, 1420, 1720];
var OVERSHOOT = [0.86, 0.92, 1.18, 1.12, 1.16, 1.55, 1.16, 0.75, 1.2];
requestAnimationFrame(function(){
requestAnimationFrame(function(){
var maxDelay = 0;
landGhosts.forEach(function(_, i){ maxDelay = Math.max(maxDelay, DELAYS[i % DELAYS.length]); });
var SYNC_T = maxDelay + 950;
eAt(0, function(){
navEl && (navEl.style.transition = 'opacity 0.45s ease, transform 0.45s ease');
navEl && (navEl.style.opacity = '1');
navEl && (navEl.style.transform = 'translateY(0)');
});
eAt(60, function(){
h1El.style.transition = 'opacity 1.1s cubic-bezier(0.08,0.72,0.18,1), filter 1.1s cubic-bezier(0.08,0.72,0.18,1), transform 1.1s cubic-bezier(0.16,1,0.3,1)';
h1El.style.opacity = '1';
h1El.style.filter = 'blur(0px)';
h1El.style.transform = 'translate(0px,130px) scale(1)';
});
eAt(Math.max(SYNC_T - 550, 900), function(){
if(line2El){
line2El.style.transition = 'opacity 0.4s ease, filter 0.4s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1)';
line2El.style.opacity = '1';
line2El.style.filter = 'blur(0px)';
line2El.style.transform = 'translateX(0)';
}
});
landGhosts.forEach(function(g, i){
var delay = DELAYS[i % DELAYS.length];
var overshoot = OVERSHOOT[i % OVERSHOOT.length];
var pos = fracToPx(CLUSTER_FRACS[i % CLUSTER_FRACS.length], safeZone);
eAt(delay, function(){
g.style.transition = 'left 0.95s cubic-bezier(0.16,1,0.3,1), top 0.95s cubic-bezier(0.16,1,0.3,1), opacity 0.6s ease, filter 0.6s ease, transform 0.95s cubic-bezier(0.34,1.56,0.64,1)';
g.style.left = pos.left; g.style.top = pos.top;
g.style.opacity = '1';
g.style.filter = 'blur(0px)';
g.style.transform = 'translate(-50%,-50%) scale(1)';
});
});
eAt(SYNC_T, function(){
h1El.style.transition = 'transform 0.42s cubic-bezier(0.2,0.9,0.3,1)';
h1El.style.transform = 'translate(0px,0px) scale(1)';
boardWrapEl.style.transition = 'transform 0.46s cubic-bezier(0.2,0.9,0.3,1), opacity 0.4s ease';
boardWrapEl.style.transform = 'translateY(0px)';
boardWrapEl.style.opacity = '1';
landGhosts.forEach(function(g, i){
eAt(i*25, function(){
var rect = realTargets[i];
g.style.transition = 'left 0.75s cubic-bezier(0.22,1,0.36,1), top 0.75s cubic-bezier(0.22,1,0.36,1)';
g.style.left = rect.left + 'px';
g.style.top = rect.top + 'px';
g.style.transform = 'translate(0,0) scale(1)';
});
eAt(i*25 + 780, function(){
g.style.transition = 'opacity 0.28s ease';
g.style.opacity = '0';
REAL_CARDS[i].style.transition = 'opacity 0.28s ease';
REAL_CARDS[i].style.opacity = '1';
});
eAt(i*25 + 1080, function(){ if(g.parentNode) g.parentNode.removeChild(g); });
});
});
eAt(SYNC_T + 900, function(){
if(eyebrowEl){ eyebrowEl.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)'; eyebrowEl.style.transform = 'translateY(0)'; eyebrowEl.style.opacity = '1'; }
});
eAt(SYNC_T + 1180, function(){
if(subEl){ subEl.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)'; subEl.style.transform = 'translateY(0)'; subEl.style.opacity = '1'; }
});
eAt(SYNC_T + 1460, function(){
if(ctasEl){ ctasEl.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)'; ctasEl.style.transform = 'translateY(0)'; ctasEl.style.opacity = '1'; }
});
eAt(SYNC_T + 2500, function(){ runLoop(); setInterval(cycleArrow, 8000); });
});
});
}
function resetState(){
timers.forEach(clearTimeout); timers = [];
demoCard.style.display = '';
demoCard.classList.remove('attn','pressed');
overlay.classList.remove('open');
modalEl.classList.remove('expanded');
planEyeIcon.src = EYE_ON;
viewDetail.classList.add('active');
viewAuto.classList.remove('active');
modalTabs.style.display = 'none';
modalOnIssueChip.style.display = '';
modalCostChip.textContent = '$0.00 \u00b7 0 tokens';
logLines.forEach(function(l){ l.classList.remove('shown'); });
specBlocks.forEach(function(b){ b.classList.remove('shown'); });
autoRows.forEach(function(r){ r.classList.remove('shown'); });
autoRow3Status.className = 'auto-status pending';
autoRow3Status.innerHTML = '<span class="ring"></span>';
autoRow3Meta.textContent = 'Waiting for logs\u2026';
if(logScroll) logScroll.scrollTop = 0;
var inserted = R.getElementById('insertedDoneCard');
if(inserted) inserted.remove();
var ghost = R.getElementById('flyingGhost');
if(ghost) ghost.remove();
userBubble1.classList.remove('shown');
userBubbleText.textContent = '';
inputPlaceholder.style.display = '';
inputTypedWrap.style.display = 'none';
typedText.textContent = '';
setScore(clarityDots, clarityNum, 2, 'on-amber');
setScore(confidenceDots, confidenceNum, 3, 'on-amber');
readyDot.classList.add('amber');
readyText.textContent = 'Needs a bit more clarity';
}
function runLoop(){
resetState();
var t = 500;
at(t, function(){ demoCard.classList.add('attn'); });
t += 1100;
at(t, function(){ demoCard.classList.add('pressed'); });
at(t+130, function(){
demoCard.classList.remove('pressed');
overlay.classList.add('open');
});
t += 480;
logLines.forEach(function(line, i){
at(t + i*210, function(){
line.classList.add('shown');
if(logScroll) logScroll.scrollTop = logScroll.scrollHeight;
});
});
t += logLines.length*210 + 400;
at(t, function(){
inputPlaceholder.style.display = 'none';
inputTypedWrap.style.display = '';
typeText(typedText, USER_MSG, TYPE_SPEED);
});
t += USER_MSG.length*TYPE_SPEED + 250;
at(t, function(){ sendBtn.style.transform = 'scale(0.9)'; });
at(t+120, function(){
sendBtn.style.transform = '';
inputTypedWrap.style.display = 'none';
inputPlaceholder.style.display = '';
userBubbleText.textContent = USER_MSG;
userBubble1.classList.add('shown');
if(logScroll) logScroll.scrollTop = logScroll.scrollHeight;
});
t += 700;
at(t, function(){
setScore(clarityDots, clarityNum, 5, 'on');
setScore(confidenceDots, confidenceNum, 4, 'on');
readyDot.classList.remove('amber');
readyText.textContent = 'This task is ready to start';
});
t += 950;
at(t, function(){ planBtn.style.transform = 'scale(0.93)'; });
at(t+130, function(){
planBtn.style.transform = '';
modalEl.classList.add('expanded');
planEyeIcon.src = EYE_OFF;
});
t += 620;
specBlocks.forEach(function(b, i){
at(t + i*130, function(){ b.classList.add('shown'); });
});
t += specBlocks.length*130 + 700;
at(t, function(){ startBtn.style.transform = 'scale(0.93)'; });
at(t+130, function(){ startBtn.style.transform = ''; });
t += 380;
at(t, function(){
viewDetail.classList.remove('active');
viewAuto.classList.add('active');
modalTabs.style.display = '';
modalOnIssueChip.style.display = 'none';
modalCostChip.textContent = '$0.75 \u00b7 693.1k tokens';
});
t += 450;
at(t, function(){ autoRows[0].classList.add('shown'); });
at(t+480, function(){ autoRows[1].classList.add('shown'); });
at(t+960, function(){ autoRows[2].classList.add('shown'); });
t += 1700;
at(t, function(){
autoRow3Status.className = 'auto-status done';
autoRow3Status.innerHTML = '\u2713';
autoRow3Meta.textContent = '4s';
});
t += 950;
at(t, function(){ overlay.classList.remove('open'); });
t += 380;
at(t, flyCardToDone);
t += 1800;
at(t, function(){ runLoop(); });
}
var spStarted=false;function spStart(){if(spStarted)return;spStarted=true;runEntrance();}
if('IntersectionObserver' in window){var spIO=new IntersectionObserver(function(es){for(var k=0;k<es.length;k++){if(es[k].isIntersecting){spIO.disconnect();spStart();return;}}},{threshold:0.2});spIO.observe(R.host);}else{spStart();}
})();
})();
