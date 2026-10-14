/* Metabrand header logo: hovering it sends out small spinning 3D figures of the mark (the star and the Big Idea, Clarity,
   Credibility and Control forms from /method, in the chrome looks of the landings). The logo works like a generator: the
   figures shoot out downward in different directions, slow down, turn and float up off the top of the screen, for as long
   as the cursor stays on the logo. Desktop with a mouse only.
   The figures are pre-rendered frames in one picture next to this file: logo-figures-1.avif (WebP fallback), ROWS rows
   (one figure each) of FRAMES frames, one full turn per row. */
(function () {
  var mm = window.matchMedia;
  if (!mm || !mm('(hover: hover) and (pointer: fine)').matches || mm('(prefers-reduced-motion: reduce)').matches) return;
  var BASE = 'https://metabrand-agency.github.io/metabrand-media/site-scripts/logo-figures-1';
  var ROWS = 8, FRAMES = 24, MAX = 70;
  var RATE = 55;            /* ms between figures while hovering */
  var SIZE = [16, 30];      /* px on screen */
  var SPEED = [320, 640];   /* px/s, the first push downward */
  var SPREAD = 70;          /* degrees either side of straight down */
  var LIFT = [440, 760];    /* px/s2, how hard they float up */
  var url = null, wait = [], layer = null, parts = [], raf = 0, last = 0, timer = 0, over = null;

  function load(cb) {
    if (url) { if (cb) cb(); return; }
    if (cb) wait.push(cb);
    if (wait.loading) return;
    wait.loading = true;
    function tryOne(ext, next) {
      var im = new Image();
      im.onload = function () {
        (im.decode ? im.decode() : Promise.resolve()).catch(function () {}).then(function () {
          url = im.src; wait.splice(0).forEach(function (f) { f(); });
        });
      };
      im.onerror = next;
      im.src = BASE + ext;
    }
    tryOne('.avif', function () { tryOne('.webp', function () {}); });
  }

  function setup() {
    var st = document.createElement('style');
    st.textContent = '.mb-figs{position:fixed;left:0;top:0;width:100%;height:100%;z-index:999;pointer-events:none;overflow:hidden}' +
      '.mb-fig{position:absolute;left:0;top:0;background-repeat:no-repeat;background-size:' + FRAMES * 100 + '% ' + ROWS * 100 + '%;' +
      'will-change:transform;animation:mbFigSpin 1.2s steps(' + (FRAMES - 1) + ',jump-none) infinite}' +
      '@keyframes mbFigSpin{from{background-position-x:0%}to{background-position-x:100%}}';
    document.head.appendChild(st);
    layer = document.createElement('div');
    layer.className = 'mb-figs';
    layer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(layer);
  }
  function rnd(a) { return a[0] + Math.random() * (a[1] - a[0]); }

  /* the logo that is showing: the wordmark at the top of the page, the round mark once the header has scrolled */
  function source(el) {
    var r = el.getBoundingClientRect();
    return { x: r.left + r.width * (r.width > r.height * 2 ? Math.random() : 0.5), y: r.top + r.height / 2 };
  }
  function spawn(el) {
    if (parts.length >= MAX) return;
    var s = source(el), size = rnd(SIZE), a = (Math.random() * 2 - 1) * SPREAD * Math.PI / 180, v = rnd(SPEED);
    var d = document.createElement('i');
    d.className = 'mb-fig';
    d.style.width = d.style.height = size.toFixed(1) + 'px';
    d.style.backgroundImage = 'url("' + url + '")';
    d.style.backgroundPositionY = (Math.floor(Math.random() * ROWS) / (ROWS - 1) * 100).toFixed(3) + '%';
    d.style.animationDuration = (0.9 + Math.random() * 0.9).toFixed(2) + 's';
    d.style.animationDelay = (-Math.random() * 2).toFixed(2) + 's';
    if (Math.random() < 0.5) d.style.animationDirection = 'reverse';
    layer.appendChild(d);
    parts.push({ el: d, x: s.x, y: s.y, vx: v * Math.sin(a), vy: v * Math.cos(a), lift: rnd(LIFT), h: size / 2, t: 0,
      r: Math.random() * 360, vr: (Math.random() * 2 - 1) * 90, sw: 8 + Math.random() * 14, ph: Math.random() * 6.3 });
    if (!raf) raf = requestAnimationFrame(tick);
  }
  function tick(now) {
    var dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60; last = now;
    for (var i = parts.length - 1; i >= 0; i--) {
      var p = parts[i];
      p.t += dt;
      p.vy -= p.lift * dt;
      p.vx *= Math.exp(-1.4 * dt);
      p.x += (p.vx + Math.sin(p.t * 5 + p.ph) * p.sw) * dt;
      p.y += p.vy * dt;
      p.r += p.vr * dt;
      if (p.y < -p.h * 2 - 20 || p.t > 8) { p.el.remove(); parts.splice(i, 1); continue; }
      var k = Math.min(1, p.t / 0.18), sc = 0.25 + 0.75 * (1 - (1 - k) * (1 - k));
      p.el.style.transform = 'translate3d(' + (p.x - p.h).toFixed(1) + 'px,' + (p.y - p.h).toFixed(1) + 'px,0) rotate(' + p.r.toFixed(1) + 'deg) scale(' + sc.toFixed(3) + ')';
    }
    if (parts.length) raf = requestAnimationFrame(tick); else { raf = 0; last = 0; }
  }
  function start(el) {
    if (over === el) return;
    stop(); over = el;
    load(function () {
      if (over !== el || timer) return;
      if (!layer) setup();
      for (var i = 0; i < 6; i++) spawn(el);
      timer = setInterval(function () { spawn(el); }, RATE);
    });
  }
  function stop() { over = null; clearInterval(timer); timer = 0; }

  function init() {
    var brand = document.querySelector('.navbar:not(.drop) .w-nav-brand');
    if (!brand) return;
    /* only over the logo picture that is showing, not the empty rest of the link */
    brand.addEventListener('mouseover', function (e) {
      var t = e.target;
      if (t.tagName === 'IMG' && parseFloat(getComputedStyle(t).opacity) > 0.5) start(t); else stop();
    });
    brand.addEventListener('mouseleave', stop);
    /* the picture of figures loads when the cursor first comes near the header */
    function near(e) { if (e.clientY < 160) { removeEventListener('mousemove', near); load(); } }
    addEventListener('mousemove', near, { passive: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
