/* SuperPlane app onboarding demo for metabrand.digital. Original: the onboarding screen of the
   superplane.com app (superplane.webflow.io/app-demo), built by Metabrand. Engine: superplane-art.js from
   metabrand-agency/superplane, pinned to the commit the SuperPlane site uses, on three.js r128.
   Embed: <div id="spd-demo-mount"></div><script src="https://metabrand-agency.github.io/metabrand-media/superplane_app_demo.js?v=1"></script> */
(function () {
  var mount = document.getElementById("spd-demo-mount");
  if (!mount || mount.getAttribute("data-spd-mounted") || !mount.attachShadow) return;
  mount.setAttribute("data-spd-mounted", "1");
  var THREE_URL = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
  var ART_URL = "https://cdn.jsdelivr.net/gh/metabrand-agency/superplane@4b13944a6fb8bfa57aaf765e2074fa74b1fe7fc3/superplane-art.js";
  if (!document.querySelector("link[data-spd-fonts]")) {
    var pc = document.createElement("link"); pc.rel = "preconnect"; pc.href = "https://fonts.gstatic.com"; pc.crossOrigin = ""; document.head.appendChild(pc);
    var f = document.createElement("link"); f.rel = "stylesheet"; f.setAttribute("data-spd-fonts", "1");
    f.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Roboto+Mono:wght@400;500&display=swap";
    document.head.appendChild(f);
  }
  var R = mount.attachShadow({ mode: "open" });
  R.innerHTML = "<style>" + ":host{all:initial;display:block;width:100%}.spd-root{--k:1;font-size:calc(var(--k)*14px);line-height:calc(var(--k)*20px);color:#333;text-align:left;letter-spacing:normal;word-spacing:normal;text-transform:none;font-style:normal;font-weight:400;text-indent:0;white-space:normal;text-shadow:none;visibility:visible;cursor:auto}p{margin:0 0 calc(var(--k)*10px);font-size:calc(var(--k)*18px)}button{color:inherit;font:inherit;margin:0;overflow:visible;text-transform:none;cursor:pointer;-webkit-appearance:button;border:0}img{border:0;vertical-align:middle;max-width:100%;display:inline-block}svg:not(:root){overflow:hidden}\n\n*{box-sizing:border-box;}\n.spd-root{display:flex;width:100%;aspect-ratio:1440/1020;overflow:hidden;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#11110e;}\n.spd-left{flex:1 1 50%;min-width:0;background:#11110e;display:flex;flex-direction:column;padding:calc(var(--k)*32px) calc(var(--k)*44px);}\n.spd-logo{flex:0 0 auto;display:flex;align-items:center;margin-bottom:calc(var(--k)*8px);}\n.spd-logo img{height:calc(var(--k)*21px);width:auto;display:block;}\n.spd-main{flex:1 1 auto;position:relative;display:grid;align-items:center;align-content:center;max-width:calc(var(--k)*528px);}\n.spd-panel{grid-area:1/1;display:flex;flex-direction:column;gap:calc(var(--k)*32px);visibility:hidden;}\n.spd-panel.active{visibility:visible;animation:spdFadeIn .4s ease;}\n@keyframes spdFadeIn{from{opacity:0;transform:translateY(calc(var(--k)*6px));}to{opacity:1;transform:translateY(0);}}\n.spd-hi{margin:0;font-size:calc(var(--k)*16px);color:#eeede9;}\n.spd-intro{display:flex;flex-direction:column;gap:calc(var(--k)*12px);}\n.spd-h1{margin:0;font-size:calc(var(--k)*24px);font-weight:400;color:#eeede9;line-height:1.3;}\n.spd-sub{margin:0;font-size:calc(var(--k)*16px);line-height:1.45;color:#9b9993;}\n.spd-sub2{margin:0;font-size:calc(var(--k)*16px);line-height:1.45;color:#9b9993;}\n.spd-empty{display:flex;align-items:center;gap:calc(var(--k)*12px);font-size:calc(var(--k)*14px);color:#eeede9;}\n.spd-note{margin:0;font-size:calc(var(--k)*14px);color:#9b9993;}\n.spd-btn{align-self:flex-start;background:#f3f3f1;color:#11110e;border:none;border-radius:calc(var(--k)*5px);padding:calc(var(--k)*13px) calc(var(--k)*16px);font-family:'Roboto Mono',monospace;font-size:calc(var(--k)*14px);text-transform:uppercase;cursor:pointer;letter-spacing:0.02em;}\n.spd-btn:hover{background:#ffffff;}\n.spd-btn.disabled{background:#a3a29e;cursor:default;}\n.spd-checklist{border:1px solid #34322b;border-radius:calc(var(--k)*12px);overflow:hidden;width:100%;}\n.spd-row{border-bottom:1px solid #34322b;display:flex;align-items:center;gap:calc(var(--k)*12px);height:calc(var(--k)*50px);padding:0 calc(var(--k)*16px);}\n.spd-row:last-child{border-bottom:none;}\n.spd-row-expand{border-bottom:1px solid #34322b;display:flex;flex-direction:column;align-items:flex-start;gap:calc(var(--k)*12px);padding:calc(var(--k)*16px);}\n.spd-checklist .spd-row-expand:last-child{border-bottom:none;}\n.spd-step-num{background:#201f1a;border:1px solid #34322b;border-radius:calc(var(--k)*5px);width:calc(var(--k)*22px);height:calc(var(--k)*22px);flex:0 0 auto;display:flex;align-items:center;justify-content:center;font-size:calc(var(--k)*12px);color:#9b9993;}\n.spd-check{background:#45b88b;border:1px solid #45b88b;border-radius:calc(var(--k)*5px);width:calc(var(--k)*22px);height:calc(var(--k)*22px);flex:0 0 auto;display:flex;align-items:center;justify-content:center;font-size:calc(var(--k)*12px);color:#11110e;}\n.spd-row-label{flex:1;font-size:calc(var(--k)*14px);color:#eeede9;}\n.spd-row-label.muted{color:#9b9993;}\n.spd-row-title{display:flex;align-items:center;gap:calc(var(--k)*10px);font-size:calc(var(--k)*14px);color:#eeede9;}\n.spd-row-title .spd-step-num{background:transparent;border:none;width:auto;height:auto;color:#9b9993;}\n.spd-btn-sm{background:#f3f3f1;color:#11110e;border:none;border-radius:calc(var(--k)*5px);padding:calc(var(--k)*9px) calc(var(--k)*16px);font-family:'Inter',sans-serif;font-size:calc(var(--k)*14px);cursor:pointer;}\n.spd-btn-sm.standalone{align-self:flex-start;}\n.spd-btn-sm.disabled{background:#a3a29e;cursor:default;}\n.spd-hint{margin:0;font-size:calc(var(--k)*14px);line-height:1.4;color:#9b9993;}\n.spd-hint.small{font-size:calc(var(--k)*13px);}\n.spd-search{border:1px solid #34322b;background:#201f1a;color:#9b9993;font-size:calc(var(--k)*14px);padding:calc(var(--k)*10px);border-radius:calc(var(--k)*5px);width:100%;display:flex;align-items:center;gap:calc(var(--k)*8px);}\n.spd-repolist{border:1px solid #34322b;border-radius:calc(var(--k)*5px);width:100%;overflow:hidden;}\n.spd-repo{border-bottom:1px solid #34322b;padding:calc(var(--k)*11px) calc(var(--k)*14px);font-size:calc(var(--k)*14px);color:#eeede9;display:flex;align-items:center;gap:calc(var(--k)*12px);}\n.spd-repo:last-child{border-bottom:none;}\n.spd-repo-icon{flex:0 0 auto;width:calc(var(--k)*18px);height:calc(var(--k)*18px);opacity:0.85;}\n.spd-back{margin:0;font-size:calc(var(--k)*14px);color:#9b9993;cursor:pointer;}\n.spd-bottom-row{flex:0 0 auto;display:flex;align-items:center;justify-content:space-between;padding-top:calc(var(--k)*16px);}\n.spd-logout{font-size:calc(var(--k)*14px);color:#9b9993;cursor:pointer;}\n.spd-progress{display:flex;align-items:center;gap:calc(var(--k)*6px);}\n.spd-progress .dot{width:calc(var(--k)*6px);height:calc(var(--k)*6px);border-radius:50%;background:#34322b;border:none;padding:0;cursor:pointer;}\n.spd-progress .dot.active{background:#eeede9;}\n.spd-divider{flex:0 0 1px;background:#34322b;}\n.spd-right{flex:1 1 50%;min-width:0;position:relative;overflow:hidden;background:#87ae9d;transition:background-color 3.2s cubic-bezier(0.4,0,0.2,1);}\n.spd-canvas-wrap{position:absolute;inset:0;}\n.spd-account{position:absolute;top:calc(var(--k)*22px);right:calc(var(--k)*28px);display:flex;flex-direction:column;align-items:flex-end;gap:calc(var(--k)*5px);font-size:calc(var(--k)*14px);line-height:1.3;z-index:2;}\n.spd-account-label{color:rgba(238,237,233,0.5);}\n.spd-account-value{color:#eeede9;}\n.spd-pill{position:absolute;left:50%;bottom:9%;transform:translateX(-50%);background:rgba(255,255,255,0.08);border-radius:calc(var(--k)*4px);padding:calc(var(--k)*8px) calc(var(--k)*12px);display:flex;align-items:center;gap:calc(var(--k)*7px);font-family:'Roboto Mono',monospace;font-size:calc(var(--k)*13px);letter-spacing:calc(var(--k)*1.3px);text-transform:uppercase;white-space:nowrap;z-index:2;color:#f9f9f3;transition:opacity .3s ease;}\n.spd-pill .dim{color:rgba(228,228,218,0.7);}\n.spd-pill.light-mode{background:rgba(163,162,158,0.08);color:#a3a29e;}\n.spd-pill.light-mode .dim{color:rgba(163,162,158,0.7);}\n.spd-pill.hidden{opacity:0;pointer-events:none;}\n.spd-badge{position:absolute;background:rgba(13,13,11,0.85);border:1px solid #34322b;border-radius:calc(var(--k)*8px);padding:calc(var(--k)*12px);display:flex;flex-direction:column;gap:calc(var(--k)*5px);font-family:'Roboto Mono',monospace;font-size:calc(var(--k)*13px);white-space:nowrap;z-index:2;transition:opacity .3s ease;}\n.spd-badge-discover{left:11%;top:24%;}\n.spd-badge-discover .eyebrow{color:#d69717;}\n.spd-badge-discover .value{color:#eeede9;}\n.spd-badge-verify{right:8%;bottom:22%;border-color:#d69717;color:#d69717;}\n.spd-corners{opacity:0;pointer-events:none;transition:opacity .3s ease;}\n.spd-corners.show{opacity:1;pointer-events:auto;}\n.spd-root.m{flex-direction:column;aspect-ratio:auto}.m .spd-left{padding:24px 20px}.m .spd-divider{display:none}.m .spd-right{flex:none;aspect-ratio:4/5}.m .spd-badge{font-size:11px;padding:9px}" + "</style>" + "<div class=\"spd-root\"><div class=\"spd-left\"><div class=\"spd-logo\"><img src=\"https://metabrand-agency.github.io/metabrand-media/superplane_app_demo/superplane-logo.svg\" alt=\"SuperPlane\"></div><div class=\"spd-main\"><div class=\"spd-panel active\" data-panel=\"1\"><p class=\"spd-hi\">Hi Mirra.</p><div class=\"spd-intro\"><p class=\"spd-h1\">One-shot the routine work in your backlog</p><p class=\"spd-sub\">SuperPlane finds the tickets agents can finish with high confidence and turns them into review-ready pull requests.</p></div><button class=\"spd-btn\">Get started</button></div><div class=\"spd-panel\" data-panel=\"2\"><div class=\"spd-intro\"><p class=\"spd-h1\">Connect SuperPlane to GitHub</p><p class=\"spd-sub\">SuperPlane reads your code and tickets, and returns finished work as pull requests.</p></div><div class=\"spd-checklist\"><div class=\"spd-row\"><span class=\"spd-step-num\">1</span><span class=\"spd-row-label\">Connect GitHub</span><button class=\"spd-btn-sm\">Connect</button></div><div class=\"spd-row\"><span class=\"spd-step-num\">2</span><span class=\"spd-row-label\">Choose organization</span></div><div class=\"spd-row\"><span class=\"spd-step-num\">3</span><span class=\"spd-row-label\">Choose repository</span></div></div><p class=\"spd-back\">Back</p></div><div class=\"spd-panel\" data-panel=\"3\"><div class=\"spd-intro\"><p class=\"spd-h1\">Choose a GitHub organization</p><p class=\"spd-sub\">SuperPlane sees only the repositories and tickets in the organization you choose.</p><p class=\"spd-sub2\">You are signed in to GitHub as metabrand-agency.</p></div><div class=\"spd-checklist\"><div class=\"spd-row\"><span class=\"spd-check\">\u2713</span><span class=\"spd-row-label muted\">Connected to GitHub</span></div><div class=\"spd-row-expand\"><div class=\"spd-row-title\"><span class=\"spd-step-num\">2</span><span>Choose organization</span></div><button class=\"spd-btn-sm standalone\">Use acme-corp</button><p class=\"spd-hint\">Do not see your GitHub account or organization? Install SuperPlane on more GitHub organizations.</p></div><div class=\"spd-row\"><span class=\"spd-step-num\">3</span><span class=\"spd-row-label\">Choose repository</span></div></div><p class=\"spd-back\">Back</p></div><div class=\"spd-panel\" data-panel=\"4\"><div class=\"spd-intro\"><p class=\"spd-h1\">Choose your first repository</p><p class=\"spd-sub\">SuperPlane scores tickets against this codebase and opens pull requests here for review.</p></div><div class=\"spd-checklist\"><div class=\"spd-row\"><span class=\"spd-check\">\u2713</span><span class=\"spd-row-label muted\">Connected to GitHub</span></div><div class=\"spd-row\"><span class=\"spd-check\">\u2713</span><span class=\"spd-row-label muted\">Organization: acme-corp</span></div><div class=\"spd-row-expand\"><div class=\"spd-row-title\"><span class=\"spd-step-num\">3</span><span>Choose repository</span></div><div class=\"spd-search\"><span>\u2315</span><span>Search repositories</span></div><div class=\"spd-repolist\"><div class=\"spd-repo\"><svg class=\"spd-repo-icon\" viewBox=\"0 0 16 16\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.5 7.5 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z\"/></svg><span>acme-corp/letit</span></div><div class=\"spd-repo\"><svg class=\"spd-repo-icon\" viewBox=\"0 0 16 16\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.5 7.5 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z\"/></svg><span>acme-corp/super</span></div></div><p class=\"spd-hint\">Do not see your repository? Grant access on GitHub.</p><button class=\"spd-btn-sm standalone disabled\">Choose a repository to continue</button><p class=\"spd-hint small\">You can add more repositories later.</p></div></div><p class=\"spd-back\">Back</p></div><div class=\"spd-panel\" data-panel=\"5\"><div class=\"spd-intro\"><p class=\"spd-h1\">Your workspace is running</p><p class=\"spd-sub\">SuperPlane scores each ticket for how likely an agent can one-shot it. High-confidence work is ready to run. Ambiguous work stays with your team.</p></div><div class=\"spd-empty\"><span>\ud83e\udd14</span><span>We did not find any issues to import from GitHub issues</span></div><p class=\"spd-note\">You can create a new task on your board.</p><button class=\"spd-btn\">Go to your board</button></div></div><div class=\"spd-bottom-row\"><div class=\"spd-logout\">Log out</div><div class=\"spd-progress\" id=\"spdDots\"><button class=\"dot active\" data-step=\"0\"></button><button class=\"dot\" data-step=\"1\"></button><button class=\"dot\" data-step=\"2\"></button><button class=\"dot\" data-step=\"3\"></button><button class=\"dot\" data-step=\"4\"></button></div></div></div><div class=\"spd-divider\"></div><div class=\"spd-right\" id=\"spdRight\"><div class=\"spd-canvas-wrap\" id=\"sp-field-globe-demo\"></div><div class=\"spd-account\"><span class=\"spd-account-label\">Logged in as</span><span class=\"spd-account-value\">mirra@acmecorp.com</span></div><div class=\"spd-pill\" id=\"spdPill\"><span class=\"dim\">Discover</span><span>\u2192</span><span id=\"spdPillValue\">Awaiting code</span></div><div class=\"spd-corners\" id=\"spdCorners\"><div class=\"spd-badge spd-badge-discover\"><span class=\"eyebrow\">Discover</span><span class=\"value\">acme-corp/letit</span></div><div class=\"spd-badge spd-badge-verify\"><span>Verify</span><span>Review-ready PR</span></div></div></div></div>";
  var root = R.querySelector(".spd-root");

  // size: the 1440 x 1020 frame of the case videos scaled to the block width; the phone layout below 860px
  function fit() {
    var w = mount.getBoundingClientRect().width || 1440;
    var m = w < 860;
    root.classList.toggle("m", m);
    root.style.setProperty("--k", m ? "1" : String(Math.max(0.75, w / 1440)));
  }
  fit();
  if (window.ResizeObserver) new ResizeObserver(fit).observe(mount); else window.addEventListener("resize", fit);

  // ---- the original step script (STEPS, timings and transitions unchanged), queries scoped to the shadow root ----
  var STEPS = [
    {mode:'school', bg:'#87ae9d', arrowColor:'#eeede9', count:null, pill:'Awaiting code', light:false, corners:false},
    {mode:'globe',  bg:'#b7b174', arrowColor:'#eeede9', count:100,  pill:'Awaiting code', light:false, corners:false},
    {mode:'globe',  bg:'#b09532', arrowColor:'#eeede9', count:400,  pill:'Awaiting code', light:false, corners:false},
    {mode:'globe',  bg:'#c5ebc3', arrowColor:'#11110e', count:700,  pill:'acme-corp',     light:true,  corners:false},
    {mode:'globe',  bg:'#EF8D0B', arrowColor:'#11110e', count:1000, pill:'',              light:false, corners:true}
  ];
  var current = 0;
  var timer = null;
  var panels = R.querySelectorAll('.spd-panel');
  var dots = R.querySelectorAll('#spdDots .dot');
  var right = R.getElementById('spdRight');
  var pill = R.getElementById('spdPill');
  var pillValue = R.getElementById('spdPillValue');
  var corners = R.getElementById('spdCorners');
  var canvasTarget = R.getElementById('sp-field-globe-demo');
  var artHandle = null;

  // the engine zooms on mouse wheel and blocks page scroll over the canvas; on the case page the wheel scrolls the page
  function artMount(opts) {
    var P = HTMLCanvasElement.prototype, add = P.addEventListener;
    P.addEventListener = function (type, fn, o) { if (type === "wheel") return; return add.call(this, type, fn, o); };
    try { return window.SuperplaneArt.mount(canvasTarget, opts); } finally { P.addEventListener = add; }
  }
  // every step mounts a new engine; free its WebGL context right away so Chrome never runs out of contexts
  function killArt() {
    if (!artHandle) return;
    var h = artHandle, c = canvasTarget.querySelector("canvas");
    artHandle = null;
    try { h.destroy(); } catch (e) {}
    if (c) {
      var gl = null;
      try { gl = c.getContext("webgl2") || c.getContext("webgl"); } catch (e) {}
      var ext = gl && gl.getExtension("WEBGL_lose_context");
      if (ext) ext.loseContext();
    }
  }

  function mountStep(step){
    var opts = {
      mode: step.mode,
      panel: false,
      minimalSphere: true,
      bgColor: step.bg,
      arrowColor: step.arrowColor,
      allowModeSwitch: false
    };
    if(step.mode === 'globe' && step.count){
      opts.overrides = { globe: { count: step.count } };
    }
    artHandle = artMount(opts);
  }

  function updateChrome(step){
    if(step.corners){
      pill.classList.add('hidden');
      corners.classList.add('show');
    } else {
      pill.classList.remove('hidden');
      corners.classList.remove('show');
      pillValue.textContent = step.pill;
      pill.classList.toggle('light-mode', !!step.light);
    }
  }

  function goTo(i){
    current = i;
    var step = STEPS[i];
    panels.forEach(function(p){ p.classList.toggle('active', p.getAttribute('data-panel') == (i+1)); });
    dots.forEach(function(d,di){ d.classList.toggle('active', di === i); });
    right.style.backgroundColor = step.bg;

    if(!artHandle || !artHandle.setColors){
      mountStep(step);
      updateChrome(step);
      return;
    }

    updateChrome(step);
    artHandle.setColors(step.bg, step.arrowColor, 1400, function(){
      killArt();
      mountStep(step);
    });
  }

  function next(){ goTo((current + 1) % STEPS.length); }

  function startTimer(){
    if(timer) clearInterval(timer);
    timer = setInterval(next, 5000);
  }

  dots.forEach(function(d){
    d.addEventListener('click', function(){
      if(!running) return;
      goTo(parseInt(d.getAttribute('data-step'), 10));
      startTimer();
    });
  });

  // ---- start and stop: libraries load when the block is near, steps run only while it is on screen ----
  var running = false, visible = false, ready = false;
  function play() {
    if (running || !visible || !ready) return;
    running = true;
    goTo(current);
    startTimer();
  }
  function pause() {
    if (!running) return;
    running = false;
    if (timer) { clearInterval(timer); timer = null; }
    killArt();
  }
  function load(src, test, next) {
    if (test()) return next();
    if (!document.querySelector('script[src="' + src + '"]')) {
      var s = document.createElement("script"); s.src = src; s.async = true; document.head.appendChild(s);
    }
    (function wait() { test() ? next() : setTimeout(wait, 50); })();
  }
  var booted = false;
  function boot() {
    if (booted) return;
    booted = true;
    load(THREE_URL, function () { return typeof window.THREE !== "undefined"; }, function () {
      load(ART_URL, function () { return typeof window.SuperplaneArt !== "undefined"; }, function () { ready = true; play(); });
    });
  }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) { if (es[es.length - 1].isIntersecting) boot(); }, { rootMargin: "800px 0px" }).observe(mount);
    new IntersectionObserver(function (es) {
      var e = es[es.length - 1];
      if (e.intersectionRatio >= 0.2) { visible = true; play(); }
      else if (!e.isIntersecting) { visible = false; pause(); }
    }, { threshold: [0, 0.2] }).observe(mount);
  } else { visible = true; boot(); }
})();
