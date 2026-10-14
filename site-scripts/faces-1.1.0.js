/* Metabrand home page, "Who we are" heading (the h2 with data-mb-faces): small round team photos stand right after the
   last word and never wrap away from it, each lying a little over the previous one. Two are there from the start; while
   the heading scrolls up to the middle of the screen the rest pop in one by one, Dmitry's (photo 1) last and on top.
   Hovering the photos throws black confetti strips out to the sides for as long as the cursor stays (desktop only).
   Photos: assets folder "people" in Webflow. */
(function () {
  var CDN = 'https://cdn.prod.website-files.com/67961be73378773c7b3d359c/';
  /* left to right; each next photo lies over the previous one */
  var FACES = [
    ['6acf803848bbb11f4735e779_photo_7', 'Metabrand team member'],
    ['6acf8038660eb112e414116f_photo_6', 'Metabrand team member'],
    ['6acf803840f24f155e41ccc0_photo_5', 'Metabrand team member'],
    ['6acf8047a0140ff21d17685a_photo_4', 'Metabrand team member'],
    ['6acf8038a3ae221e7c62de35_photo_3', 'Metabrand team member'],
    ['6acf80386d729731394d524c_photo_2', 'Metabrand team member'],
    ['6acf8038a9d36f5e231577a3_photo_1', 'Dmitry, founder of Metabrand']
  ];
  var START = 2;
  var css = '.mb-faces-tail{white-space:nowrap}' +
    '.mb-faces{display:inline-flex;vertical-align:middle;position:relative;top:-.06em;margin-left:.3em;line-height:0}' +
    '.mb-faces img{position:relative;display:block;width:1.15em;height:1.15em;max-width:none;border-radius:50%;object-fit:cover;background:#e9e9e9;' +
    'opacity:0;transform:translateX(-.35em) scale(.3);transition:opacity .2s linear,transform .3s cubic-bezier(.55,0,1,.45)}' +
    '.mb-faces img+img{margin-left:-.28em}' +
    '.mb-faces img.is-on{opacity:1;transform:none;transition:opacity .2s linear,transform .6s cubic-bezier(.34,1.56,.64,1)}' +
    '.mb-faces i{position:absolute;left:0;top:0;z-index:0;display:block;background:#000;border-radius:1px;pointer-events:none;will-change:transform,opacity}' +
    '@media (prefers-reduced-motion:reduce){.mb-faces img{transition:none!important}}';

  /* wraps the last word of the heading so the photos stay on its line */
  function tail(h) {
    var w = document.createTreeWalker(h, NodeFilter.SHOW_TEXT, null), n, last = null;
    while ((n = w.nextNode())) if (/\S/.test(n.textContent)) last = n;
    var span = document.createElement('span');
    span.className = 'mb-faces-tail';
    if (!last) { h.appendChild(span); return span; }
    var t = last.textContent.replace(/[\s\u200b-\u200d\ufeff]+$/, ''), i = t.search(/\S+$/);
    var word = i > 0 ? last.splitText(i) : last;
    word.parentNode.insertBefore(span, word);
    span.appendChild(word);
    return span;
  }

  function init() {
    var h = document.querySelector('[data-mb-faces]');
    if (!h || h.querySelector('.mb-faces')) return;
    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);
    var mm = window.matchMedia, calm = mm && mm('(prefers-reduced-motion: reduce)').matches;
    var box = document.createElement('span'), shown = -1, raf = 0;
    box.className = 'mb-faces';
    box.setAttribute('role', 'img');
    box.setAttribute('aria-label', 'The Metabrand team');
    var imgs = FACES.map(function (f, i) {
      var im = document.createElement('img');
      im.src = CDN + f[0] + '-circle-100.webp';
      im.alt = f[1]; im.width = im.height = 100; im.decoding = 'async'; im.draggable = false;
      im.style.zIndex = i + 1;
      box.appendChild(im);
      return im;
    });
    /* how many photos stand: two while the heading is below the screen, all once its middle reaches the middle */
    function count() {
      if (calm) return imgs.length;
      var r = h.getBoundingClientRect(), vh = innerHeight, p = (vh - (r.top + r.height / 2)) / (vh / 2);
      return START + Math.round(Math.max(0, Math.min(1, p)) * (imgs.length - START));
    }
    function update() {
      raf = 0;
      var n = count();
      if (n === shown) return;
      var k = 0;
      imgs.forEach(function (im, i) {
        var on = i < n;
        if (on && !im.classList.contains('is-on')) im.style.transitionDelay = (k++ * 0.07) + 's';
        else if (!on) im.style.transitionDelay = '';
        im.classList.toggle('is-on', on);
      });
      shown = n;
    }
    /* the first photos are in place before the row is added, so they do not pop on load */
    shown = count();
    imgs.forEach(function (im, i) { if (i < shown) im.classList.add('is-on'); });
    tail(h).appendChild(box);
    addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
    addEventListener('resize', update);

    /* confetti: thin black strips come out from behind the photos to the left and right, a little upwards, spinning and flipping as they fall */
    if (calm || !mm || !mm('(hover: hover) and (pointer: fine)').matches || !Element.prototype.animate) return;
    var timer = 0, live = 0, G = 900;
    function strip() {
      var on = imgs.filter(function (im) { return im.classList.contains('is-on'); });
      if (!on.length || live > 70) return;
      var b = box.getBoundingClientRect(), e = on[on.length - 1].getBoundingClientRect();
      var x0 = Math.random() * (e.right - b.left), y0 = b.height * (0.25 + Math.random() * 0.5);
      var side = x0 < (e.right - b.left) / 2 ? -1 : 1;
      if (Math.random() < 0.2) side = -side;
      var ang = (12 + Math.random() * 58) * Math.PI / 180, v = 240 + Math.random() * 300;
      var vx = side * v * Math.cos(ang), vy = -v * Math.sin(ang);
      var r0 = Math.random() * 360, spin = (Math.random() < 0.5 ? -1 : 1) * (300 + Math.random() * 600);
      var flip = 6 + Math.random() * 10, ph = Math.random() * 6.3, T = 0.95 + Math.random() * 0.45;
      var p = document.createElement('i'), w = 2.5 + Math.random(), hh = 8 + Math.random() * 7;
      p.style.width = w.toFixed(1) + 'px'; p.style.height = hh.toFixed(1) + 'px';
      p.style.marginLeft = (-w / 2).toFixed(1) + 'px'; p.style.marginTop = (-hh / 2).toFixed(1) + 'px';
      box.appendChild(p);
      live++;
      var kf = [], N = 12;
      for (var i = 0; i <= N; i++) {
        var t = T * i / N, k = i / N, drag = 1 - 0.35 * k;
        kf.push({
          transform: 'translate(' + (x0 + vx * t * drag).toFixed(1) + 'px,' + (y0 + vy * t + G * t * t / 2).toFixed(1) + 'px) rotate(' +
            (r0 + spin * t).toFixed(0) + 'deg) scaleY(' + Math.max(0.15, Math.abs(Math.cos(ph + flip * t))).toFixed(2) + ')',
          opacity: k < 0.65 ? 1 : (1 - k) / 0.35
        });
      }
      p.animate(kf, { duration: T * 1000, easing: 'linear', fill: 'forwards' }).onfinish = function () { p.remove(); live--; };
    }
    function burst(n) { for (var i = 0; i < n; i++) strip(); }
    function start() {
      if (timer) return;
      burst(10);
      timer = setInterval(function () { burst(2); }, 70);
    }
    function stop() { clearInterval(timer); timer = 0; }
    box.addEventListener('mouseover', function (e) { if (e.target.classList && e.target.classList.contains('is-on')) start(); else stop(); });
    box.addEventListener('mouseleave', stop);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
