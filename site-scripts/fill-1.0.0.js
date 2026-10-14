/* Metabrand: single pill buttons ("All industries", hero "Book a discovery call", "Get in Touch", "Let's talk" and similar).
   On hover the button's own hover color flows in from the left with a stretched front and flows out to the right on leave.
   Desktop with a mouse only. The hero and footer CTA pairs keep their own effect (.mb-liq); the menu, sticky bar and article CTA are left out.
   Opt in any other element with data-mb-fill="#hex" (and data-mb-fill-text="#hex"), opt out with data-mb-fill="off". */
(function () {
  var mm = window.matchMedia;
  if (!mm || !mm('(hover: hover) and (pointer: fine)').matches || mm('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.CSS || !CSS.supports || !CSS.supports('clip-path', 'path("M0 0")')) return;
  /* selector, fill, text over the fill ('' keeps the button's own text color). First match wins, so specific ones go first.
     These repeat the hover colors set in Designer: if a hover color changes there, change it here too. */
  var HOV = [
    ['.button-contact.black.sms.le', '#fff94b', '#000'],
    ['.button-contact.black', '#fff', '#000'],
    ['.button-contact.light', '#000', '#fff'],
    ['.button-contact', '#000', '#fff'],
    ['.button.main', '#fff94b', ''],
    ['.button', '#445fe5', ''],
    ['.ind-more-btn', '#fff', '#000'],
    ['.mm-btn', '#fff', '#000']
  ];
  var SEL = HOV.map(function (h) { return h[0]; }).join(',') + ',[data-mb-fill]';
  var SKIP = '.mb-liq,.w-nav,.navbar,.mb-bar,.mb-cta,[data-mb-fill="off"]';
  var NONE = 'path("M0 0")', K = 15;
  var st = document.createElement('style');
  st.textContent = '.mb-fl{isolation:isolate;transition-duration:0s!important;background-color:var(--mb-fl-bg)!important;color:var(--mb-fl-c)!important;border-color:var(--mb-fl-bd)!important}' +
    '.mb-fl__f{position:absolute;z-index:1;box-sizing:border-box;pointer-events:none;overflow:hidden;-webkit-clip-path:' + NONE + ';clip-path:' + NONE + '}';
  document.head.appendChild(st);

  function n(v) { return parseFloat(v) || 0; }
  function f1(v) { return Math.round(v * 10) / 10; }
  /* the base look is read from an unhovered copy, since the button itself is already under the cursor here */
  function base(el) {
    var c = el.cloneNode(false);
    c.removeAttribute('id');
    c.style.cssText = 'position:absolute;left:-9999px;top:0;visibility:hidden;transition:none';
    el.parentNode.insertBefore(c, el);
    var s = getComputedStyle(c), r = [s.backgroundColor, s.color, s.borderTopColor];
    el.parentNode.removeChild(c);
    return r;
  }

  function setup(el) {
    var s = getComputedStyle(el), h = null;
    if (!el.hasAttribute('data-mb-fill') && n(s.borderTopLeftRadius) < el.offsetHeight / 2 - 1) return false;
    for (var i = 0; i < HOV.length; i++) if (el.matches(HOV[i][0])) { h = HOV[i]; break; }
    var b = base(el), fill = el.getAttribute('data-mb-fill') || (h && h[1]);
    if (!fill) return false;
    var txt = el.getAttribute('data-mb-fill-text') || (h && h[2]) || b[1];
    el.style.setProperty('--mb-fl-bg', b[0]);
    el.style.setProperty('--mb-fl-c', b[1]);
    el.style.setProperty('--mb-fl-bd', b[2]);
    if (s.position === 'static') el.style.position = 'relative';
    el.classList.add('mb-fl');
    var f = document.createElement('span');
    f.className = 'mb-fl__f';
    f.setAttribute('aria-hidden', 'true');
    for (var c = el.firstChild; c; c = c.nextSibling) f.appendChild(c.cloneNode(true));
    [].forEach.call(f.querySelectorAll('[id]'), function (x) { x.removeAttribute('id'); });
    f.style.background = fill;
    f.style.color = txt;
    el.appendChild(f);

    var W = 0, H = 0, a = 0, bb = 0, va = 0, vb = 0, ta = 0, tb = 0, raf = 0, last = 0;
    /* the copy of the label sits exactly over the real one: same box, padding and alignment */
    function fit() {
      var s = getComputedStyle(el), bt = n(s.borderTopWidth), br = n(s.borderRightWidth), bo = n(s.borderBottomWidth), bl = n(s.borderLeftWidth);
      /* fractional size from the layout, so the copy never wraps where the label does not */
      var r = el.getBoundingClientRect(), ow = el.offsetWidth, oh = el.offsetHeight;
      var exact = Math.abs(r.width - ow) < 1 && Math.abs(r.height - oh) < 1;
      W = exact ? r.width : ow; H = exact ? r.height : oh;
      var y = f.style;
      y.left = -bl + 'px'; y.top = -bt + 'px'; y.width = W + 'px'; y.height = H + 'px';
      y.padding = (n(s.paddingTop) + bt) + 'px ' + (n(s.paddingRight) + br) + 'px ' + (n(s.paddingBottom) + bo) + 'px ' + (n(s.paddingLeft) + bl) + 'px';
      y.borderRadius = s.borderTopLeftRadius;
      y.textAlign = s.textAlign;
      if (/flex|grid/.test(s.display)) {
        y.display = s.display.replace('inline-', '');
        y.flexDirection = s.flexDirection; y.justifyContent = s.justifyContent; y.alignItems = s.alignItems; y.gap = s.gap;
      }
    }
    /* a pill from x0 to x1 whose end caps stretch while they move; shorter than its height it is a round drop */
    function shape(x0, x1, sa, sb) {
      var w = x1 - x0, r = H / 2;
      if (w < 0.5) return NONE;
      if (w < H) {
        var c = x0 + w / 2, q = w / 2;
        return 'path("M' + f1(c - q) + ' ' + f1(r) + 'A' + f1(q) + ' ' + f1(q) + ' 0 1 1 ' + f1(c + q) + ' ' + f1(r) +
          'A' + f1(q) + ' ' + f1(q) + ' 0 1 1 ' + f1(c - q) + ' ' + f1(r) + 'Z")';
      }
      var p = x0 + r, q2 = x1 - r;
      return 'path("M' + f1(p) + ' 0H' + f1(q2) + 'A' + f1(r * sb) + ' ' + f1(r) + ' 0 0 1 ' + f1(q2) + ' ' + f1(H) +
        'H' + f1(p) + 'A' + f1(r * sa) + ' ' + f1(r) + ' 0 0 1 ' + f1(p) + ' 0Z")';
    }
    /* under a full fill the button itself takes the fill color, so no dark rim shows at the rounded edge */
    var full = false;
    function draw() {
      var p = a < 0.001 && bb > 0.999 ? 'none' :
        shape(a * W, bb * W, 1 + 0.5 * Math.min(1, Math.abs(va) / 6), 1 + 0.5 * Math.min(1, Math.abs(vb) / 6));
      f.style.webkitClipPath = p; f.style.clipPath = p;
      if ((p === 'none') !== full) {
        full = !full;
        el.style.setProperty('--mb-fl-bg', full ? fill : b[0]);
        el.style.setProperty('--mb-fl-bd', full ? fill : b[2]);
      }
    }
    /* critically damped spring, as on "Work with us": eases in and out and turns around smoothly */
    function tick(now) {
      var dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60; last = now;
      vb += (K * K * (tb - bb) - 2 * K * vb) * dt; bb += vb * dt;
      va += (K * K * (ta - a) - 2 * K * va) * dt; a += va * dt;
      bb = Math.max(0, Math.min(1, bb)); a = Math.max(0, Math.min(bb, a));
      var done = Math.abs(tb - bb) < 0.002 && Math.abs(ta - a) < 0.002 && Math.abs(va) + Math.abs(vb) < 0.02;
      if (done) { a = ta; bb = tb; va = vb = 0; }
      if (done && ta === 1) { a = bb = ta = tb = 0; f.style.webkitClipPath = f.style.clipPath = NONE; raf = 0; last = 0; return; }
      draw();
      if (done) { raf = 0; last = 0; return; }
      raf = requestAnimationFrame(tick);
    }
    function run() { if (!raf) raf = requestAnimationFrame(tick); }
    function on() { if (!raf && ta === 0 && tb === 0) fit(); ta = 0; tb = 1; run(); }
    function off() { if (tb) { ta = 1; tb = 1; run(); } }
    el.addEventListener('mouseenter', on);
    el.addEventListener('mouseleave', off);
    el.addEventListener('focus', function () { if (el.matches(':focus-visible')) on(); });
    el.addEventListener('blur', off);
    return on;
  }

  document.addEventListener('mouseover', function (e) {
    var el = e.target.closest && e.target.closest(SEL);
    if (!el || el._mbFl !== undefined) return;
    el._mbFl = !el.closest(SKIP) && setup(el);
    if (el._mbFl) el._mbFl();
  });
})();
