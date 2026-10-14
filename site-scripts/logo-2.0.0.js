/* Metabrand header logo: hovering it lets small still 3D figures of the mark pop out of it (the star and the Big Idea,
   Clarity, Credibility and Control forms from /method, in the chrome looks of the landings). They come out downward in
   different directions close to the logo, slow down, turn upward and fade out within about REACH px, for as long as the
   cursor stays on the logo. Desktop with a mouse only.
   The figures are pre-rendered pictures in one file next to this script, logo-figures-2.webp: ROWS rows (one figure each)
   of COLS still views, TILE px each. They are drawn on one small canvas under the header. */
(function () {
  var mm = window.matchMedia;
  if (!mm || !mm('(hover: hover) and (pointer: fine)').matches || mm('(prefers-reduced-motion: reduce)').matches) return;
  var SRC = 'https://metabrand-agency.github.io/metabrand-media/site-scripts/logo-figures-2.webp';
  var ROWS = 8, COLS = 4, TILE = 40, MAX = 24;
  var RATE = 110;           /* ms between figures while hovering */
  var SIZE = [8, 15];       /* px on screen */
  var SPEED = [110, 230];   /* px/s, the first push downward */
  var SPREAD = 65;          /* degrees either side of straight down */
  var LIFT = [260, 420];    /* px/s2, how hard they turn upward */
  var REACH = 200;          /* px from the logo where they are gone */
  var pic = null, loading = false, wait = null, cv = null, cx = null, box = null, parts = [], raf = 0, last = 0, timer = 0, over = null;

  function load(cb) {
    if (pic) { if (cb) cb(); return; }
    if (cb) wait = cb;
    if (loading) return;
    loading = true;
    var im = new Image();
    im.onload = function () {
      (im.decode ? im.decode() : Promise.resolve()).catch(function () {}).then(function () { pic = im; if (wait) { var f = wait; wait = null; f(); } });
    };
    im.src = SRC;
  }
  function rnd(a) { return a[0] + Math.random() * (a[1] - a[0]); }

  /* a canvas just around the logo, under the header */
  function place(el) {
    if (!cv) {
      cv = document.createElement('canvas');
      cv.setAttribute('aria-hidden', 'true');
      cv.style.cssText = 'position:fixed;left:0;top:0;z-index:999;pointer-events:none';
      document.body.appendChild(cv);
      cx = cv.getContext('2d');
    }
    var r = el.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1), pad = REACH + 20;
    box = { x: Math.round(r.left - pad), y: Math.round(Math.max(0, r.top - pad)), w: Math.round(r.width + 2 * pad), h: 0 };
    box.h = Math.round(r.bottom + pad - box.y);
    cv.style.transform = 'translate(' + box.x + 'px,' + box.y + 'px)';
    cv.style.width = box.w + 'px'; cv.style.height = box.h + 'px';
    if (cv.width !== box.w * dpr || cv.height !== box.h * dpr) { cv.width = box.w * dpr; cv.height = box.h * dpr; }
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cx.imageSmoothingEnabled = true; cx.imageSmoothingQuality = 'high';
  }
  function spawn(el) {
    if (parts.length >= MAX) return;
    var r = el.getBoundingClientRect(), wide = r.width > r.height * 2;
    var x = r.left + r.width * (wide ? 0.1 + Math.random() * 0.8 : 0.5) - box.x, y = r.top + r.height / 2 - box.y;
    var a = (Math.random() * 2 - 1) * SPREAD * Math.PI / 180, v = rnd(SPEED);
    parts.push({ x: x, y: y, x0: x, y0: y, vx: v * Math.sin(a), vy: v * Math.cos(a), lift: rnd(LIFT), s: rnd(SIZE), t: 0,
      row: Math.floor(Math.random() * ROWS), col: Math.floor(Math.random() * COLS),
      r: (Math.random() * 2 - 1) * 0.5, vr: (Math.random() * 2 - 1) * 0.6, life: 1.1 + Math.random() * 0.5 });
    if (!raf) raf = requestAnimationFrame(tick);
  }
  function tick(now) {
    var dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60, dpr = cv.width / box.w; last = now;
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cx.clearRect(0, 0, box.w, box.h);
    for (var i = parts.length - 1; i >= 0; i--) {
      var p = parts[i];
      p.t += dt;
      p.vy -= p.lift * dt;
      p.vx *= Math.exp(-2 * dt);
      p.x += p.vx * dt; p.y += p.vy * dt; p.r += p.vr * dt;
      var d = Math.sqrt((p.x - p.x0) * (p.x - p.x0) + (p.y - p.y0) * (p.y - p.y0));
      var al = Math.min(1, (p.life - p.t) / 0.4, (REACH - d) / 60);
      if (al <= 0 && p.t > 0.2) { parts.splice(i, 1); continue; }
      var k = Math.min(1, p.t / 0.15), sc = p.s * (0.3 + 0.7 * (1 - (1 - k) * (1 - k)));
      cx.globalAlpha = Math.max(0, Math.min(1, al));
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx.translate(p.x, p.y); cx.rotate(p.r);
      cx.drawImage(pic, p.col * TILE, p.row * TILE, TILE, TILE, -sc / 2, -sc / 2, sc, sc);
    }
    cx.setTransform(dpr, 0, 0, dpr, 0, 0); cx.globalAlpha = 1;
    if (parts.length) raf = requestAnimationFrame(tick); else { raf = 0; last = 0; cx.clearRect(0, 0, box.w, box.h); }
  }
  function start(el) {
    if (over === el) return;
    stop(); over = el;
    load(function () {
      if (over !== el || timer) return;
      if (!parts.length) place(el);
      for (var i = 0; i < 4; i++) spawn(el);
      timer = setInterval(function () { spawn(el); }, RATE);
    });
  }
  function stop() { over = null; clearInterval(timer); timer = 0; }

  function init() {
    var brand = document.querySelector('.navbar:not(.drop) .w-nav-brand');
    if (!brand) return;
    /* only over the logo picture that is showing (the wordmark at the top, the round mark after scrolling) */
    brand.addEventListener('mouseover', function (e) {
      var t = e.target;
      if (t.tagName === 'IMG' && parseFloat(getComputedStyle(t).opacity) > 0.5) start(t); else stop();
    });
    brand.addEventListener('mouseleave', stop);
    function near(e) { if (e.clientY < 160) { removeEventListener('mousemove', near); load(); } }
    addEventListener('mousemove', near, { passive: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
