/* Metabrand home page, "Who we are" heading (the h2 with data-mb-faces): small round team photos stand right after the
   last word and never wrap away from it, each lying over the previous one by a little under half. The lower a photo lies, the
   paler it is: a light grey layer over it, so photos never show through each other. Two are there from the start; while
   the heading scrolls up to the middle of the screen the rest pop in one by one, Dmitry's (photo 1) last and on top.
   On a computer, the photo under the cursor comes to the front, grows a little and loses its grey layer, and black
   confetti strips fly out to the sides, a few at a time, for as long as the cursor stays; they fade out within about 200 px.
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
  var FADE = 0.6;   /* the light grey over the lowest (leftmost) photo; it gets less photo by photo, none on the top one */
  var css = '.mb-faces-tail{white-space:nowrap}' +
    '.mb-faces{display:inline-flex;vertical-align:middle;position:relative;top:-.06em;margin-left:.3em;line-height:0}' +
    '.mb-face{position:relative;display:block;flex:none;width:1.15em;height:1.15em;border-radius:50%;overflow:hidden;background:#e9e9e9;' +
    'opacity:0;transform:translateX(-.35em) scale(.3);transition:opacity .2s linear,transform .3s cubic-bezier(.55,0,1,.45),z-index 0s linear .3s}' +
    '.mb-face+.mb-face{margin-left:-.52em}' +
    '.mb-face.is-on{opacity:1;transform:none;transition:opacity .2s linear,transform .6s cubic-bezier(.34,1.56,.64,1),z-index 0s linear .3s}' +
    '.mb-face img{display:block;width:100%;height:100%;max-width:none;object-fit:cover}' +
    '.mb-face:after{content:"";position:absolute;left:0;top:0;width:100%;height:100%;background:#ececec;opacity:var(--fade,0);transition:opacity .3s linear}' +
    '@media (hover:hover) and (pointer:fine){.mb-face.is-on:hover{z-index:20!important;transform:scale(1.18);' +
    'transition:opacity .2s linear,transform .4s cubic-bezier(.34,1.56,.64,1),z-index 0s}.mb-face.is-on:hover:after{opacity:0}}' +
    '.mb-faces i{position:absolute;left:0;top:0;z-index:0;display:block;background:#000;border-radius:1px;pointer-events:none;will-change:transform,opacity}' +
    '@media (prefers-reduced-motion:reduce){.mb-face{transition:none!important}}';

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
    var box = document.createElement('span'), shown = -1, raf = 0, clr = 0;
    box.className = 'mb-faces';
    box.setAttribute('role', 'img');
    box.setAttribute('aria-label', 'The Metabrand team');
    var last = FACES.length - 1;
    var imgs = FACES.map(function (f, i) {
      var w = document.createElement('span'), im = document.createElement('img');
      w.className = 'mb-face';
      w.style.zIndex = i + 1;
      w.style.setProperty('--fade', (FADE * (last - i) / last).toFixed(3));
      im.src = CDN + f[0] + '-circle-100.webp';
      im.alt = f[1]; im.width = im.height = 100; im.decoding = 'async'; im.draggable = false;
      w.appendChild(im);
      box.appendChild(w);
      return w;
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
      /* the pop-in stagger must not delay the hover later */
      clearTimeout(clr);
      clr = setTimeout(function () { imgs.forEach(function (im) { im.style.transitionDelay = ''; }); }, 1200);
    }
    /* the first photos are in place before the row is added, so they do not pop on load */
    shown = count();
    imgs.forEach(function (im, i) { if (i < shown) im.classList.add('is-on'); });
    tail(h).appendChild(box);
    addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
    addEventListener('resize', update);

    /* confetti: thin black strips come out from behind the photos to the left and right, a little upwards, spinning and flipping as they fall */
    if (calm || !mm || !mm('(hover: hover) and (pointer: fine)').matches || !Element.prototype.animate) return;
    var timer = 0, live = 0, G = 480, REACH = 200;
    function strip() {
      var on = imgs.filter(function (im) { return im.classList.contains('is-on'); });
      if (!on.length || live > 24) return;
      var b = box.getBoundingClientRect(), e = on[on.length - 1].getBoundingClientRect();
      var x0 = Math.random() * (e.right - b.left), y0 = b.height * (0.25 + Math.random() * 0.5);
      var side = x0 < (e.right - b.left) / 2 ? -1 : 1;
      if (Math.random() < 0.2) side = -side;
      var ang = (12 + Math.random() * 58) * Math.PI / 180, v = 100 + Math.random() * 110;
      var vx = side * v * Math.cos(ang), vy = -v * Math.sin(ang);
      var r0 = Math.random() * 360, spin = (Math.random() < 0.5 ? -1 : 1) * (300 + Math.random() * 600);
      var flip = 6 + Math.random() * 10, ph = Math.random() * 6.3, T = 0.7 + Math.random() * 0.3;
      var p = document.createElement('i'), w = 2 + Math.random() * 0.6, hh = 6 + Math.random() * 4;
      p.style.width = w.toFixed(1) + 'px'; p.style.height = hh.toFixed(1) + 'px';
      p.style.marginLeft = (-w / 2).toFixed(1) + 'px'; p.style.marginTop = (-hh / 2).toFixed(1) + 'px';
      box.appendChild(p);
      live++;
      var kf = [], N = 12;
      for (var i = 0; i <= N; i++) {
        var t = T * i / N, k = i / N, drag = 1 - 0.35 * k, dx = vx * t * drag, dy = vy * t + G * t * t / 2;
        /* gone by REACH px from where it started, and by the end of its time */
        var far = Math.max(0, Math.min(1, (REACH - Math.sqrt(dx * dx + dy * dy)) / 70));
        kf.push({
          transform: 'translate(' + (x0 + dx).toFixed(1) + 'px,' + (y0 + dy).toFixed(1) + 'px) rotate(' +
            (r0 + spin * t).toFixed(0) + 'deg) scaleY(' + Math.max(0.15, Math.abs(Math.cos(ph + flip * t))).toFixed(2) + ')',
          opacity: +Math.min(far, k < 0.6 ? 1 : (1 - k) / 0.4).toFixed(3)
        });
      }
      p.animate(kf, { duration: T * 1000, easing: 'linear', fill: 'forwards' }).onfinish = function () { p.remove(); live--; };
    }
    function burst(n) { for (var i = 0; i < n; i++) strip(); }
    function start() {
      if (timer) return;
      burst(5);
      timer = setInterval(function () { burst(1); }, 130);
    }
    function stop() { clearInterval(timer); timer = 0; }
    box.addEventListener('mouseover', function (e) {
      var f = e.target.closest && e.target.closest('.mb-face');
      if (f && f.classList.contains('is-on')) start(); else stop();
    });
    box.addEventListener('mouseleave', stop);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
