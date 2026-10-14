/* Metabrand favicon: the star mark turns in the browser tab. Every few seconds the mark makes a half turn around its
   upright axis, like a coin, and comes back to the logo pose (the mark looks the same after a half turn).
   The mark is the logo's four rings: one seen edge-on (the horizontal line) and three tilted the same way, so they
   show as the upright and the two diagonal ovals. The frames are drawn once on a 32px canvas in the colors of the
   Webflow favicons: black square with a white mark, or white with a dark mark when the system is in dark mode.
   A small worker keeps the clock, because browsers slow down page timers in background tabs, and the tab is
   where the favicon is seen. Desktop only (phones show no tabs), off with reduced motion and in Safari, which
   does not update favicons on the fly. */
(function () {
  if (window.__mbFav) return;
  window.__mbFav = 1;
  var mm = function (q) { return !!(window.matchMedia && matchMedia(q).matches); };
  var ua = navigator.userAgent;
  if (mm('(prefers-reduced-motion: reduce)') || !mm('(hover: hover) and (pointer: fine)')) return;
  if (/safari/i.test(ua) && !/chrome|chromium|crios|edg|fxios|firefox/i.test(ua)) return;

  var S = 32, C = S / 2, R = 10.6, LINE = 2, OPEN = Math.acos(0.366);
  var FRAMES = 48;            /* frames per half turn */
  var TURN = 1800, REST = 3000, TICK = 40;
  var D = Math.PI / 180;

  /* rings: angle of the long axis on the screen, and how far the ring is turned out of the screen plane
     (the three ovals are turned the same way, so early in the turn they line up for a moment into the star of eight rays) */
  var RINGS = [[0, 90 * D], [45 * D, OPEN], [90 * D, OPEN], [135 * D, OPEN]];

  function draw(cv, turn, dark) {
    var g = cv.getContext('2d');
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.clearRect(0, 0, S, S);
    g.fillStyle = dark ? '#fff' : '#000';
    g.fillRect(0, 0, S, S);
    g.strokeStyle = dark ? '#212121' : '#fff';
    g.lineWidth = LINE;
    g.lineCap = 'round';
    g.lineJoin = 'round';
    var ct = Math.cos(turn), st = Math.sin(turn);
    RINGS.forEach(function (r) {
      /* u: long axis (in the screen plane), v: short axis, tilted out of the plane */
      var a = r[0], t = r[1];
      var u = [Math.cos(a), Math.sin(a), 0];
      var v = [-Math.sin(a) * Math.cos(t), Math.cos(a) * Math.cos(t), Math.sin(t)];
      /* turn about the upright axis, then look straight on */
      var U = [u[0] * ct + u[2] * st, u[1]], V = [v[0] * ct + v[2] * st, v[1]];
      g.beginPath();
      for (var i = 0; i <= 96; i++) {
        var s = i / 96 * Math.PI * 2, cs = Math.cos(s), sn = Math.sin(s);
        var x = C + R * (U[0] * cs + V[0] * sn), y = C - R * (U[1] * cs + V[1] * sn);
        if (i) g.lineTo(x, y); else g.moveTo(x, y);
      }
      g.stroke();
    });
  }

  function build(dark) {
    var cv = document.createElement('canvas'), out = [];
    cv.width = cv.height = S;
    for (var i = 0; i < FRAMES; i++) { draw(cv, i / FRAMES * Math.PI, dark); out.push(cv.toDataURL('image/png')); }
    return out;
  }

  var frames = [], link = null, shown = -1;
  var darkQ = window.matchMedia ? matchMedia('(prefers-color-scheme: dark)') : null;
  function rebuild() { frames = build(!!(darkQ && darkQ.matches)); show(shown < 0 ? 0 : shown, true); }
  function show(i, force) {
    if (i === shown && !force) return;
    shown = i;
    link.href = frames[i];
  }

  /* take over the favicon: the Webflow links (light and dark) are set aside, one link of ours takes their place */
  function takeOver() {
    [].slice.call(document.querySelectorAll('link[rel~="icon"]')).forEach(function (l) {
      if (!/apple/i.test(l.rel)) l.parentNode.removeChild(l);
    });
    link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    link.setAttribute('sizes', '32x32');
    document.head.appendChild(link);
  }

  /* clock: a tiny worker answers each request after the asked delay; plain timers if a worker is not allowed */
  var later;
  try {
    var w = new Worker(URL.createObjectURL(new Blob(['onmessage=function(e){setTimeout(function(){postMessage(0)},e.data)}'], { type: 'text/javascript' })));
    var cb = null;
    w.onmessage = function () { var f = cb; cb = null; if (f) f(); };
    later = function (f, ms) { cb = f; w.postMessage(ms); };
  } catch (e) {
    later = function (f, ms) { setTimeout(f, ms); };
  }

  function ease(p) { return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2; }
  var t0 = 0;
  function turn() {
    var p = Math.min(1, (performance.now() - t0) / TURN);
    show(Math.round(ease(p) * FRAMES) % FRAMES);
    if (p < 1) later(turn, TICK);
    else later(start, REST);
  }
  function start() { t0 = performance.now(); turn(); }

  function init() {
    try { frames = build(!!(darkQ && darkQ.matches)); } catch (e) { return; }
    takeOver();
    show(0, true);
    if (darkQ && darkQ.addEventListener) darkQ.addEventListener('change', rebuild);
    window.mbFav = { frames: function () { return frames; }, draw: draw, S: S };
    later(start, 1800);
  }
  if (document.readyState === 'complete') init(); else addEventListener('load', init);
})();
