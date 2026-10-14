/* Metabrand About page: the big numbers (2018, 60+, 12; the class mb-stat in the Designer) roll in like an odometer when
   they come into view. Every digit runs up from 0 to its value, the digits further right a turn or two more, so the
   right end spins longest; a sign such as "+" fades in at the end. The plain number stays in the page for screen readers
   and search. With "reduce motion" the numbers just stand still. Size and spacing are set in the Designer
   (.heading.large.mb-stat); the rolling strip takes the line height from there. */
(function () {
  var mm = window.matchMedia;
  if (mm && mm('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.IntersectionObserver || !Element.prototype.animate) return;
  var EASE = 'cubic-bezier(.16,1,.3,1)';
  var DUR = 1500;    /* ms for the first digit */
  var MORE = 250;    /* ms more for each next digit */
  var GAP = 150;     /* ms between the numbers */
  var st = document.createElement('style');
  st.textContent = '.mb-od{display:inline-block;position:relative;vertical-align:top;' +
    '-webkit-clip-path:inset(.08em -.3em .1em);clip-path:inset(.08em -.3em .1em)}' +
    '.mb-od>i{font-style:normal;visibility:hidden}' +
    '.mb-od>b{position:absolute;left:0;right:0;top:0;font-weight:inherit;text-align:center;will-change:transform}' +
    '.mb-od>b>span{display:block;height:1.4em}' +
    '.mb-od.is-sign>i{visibility:visible;opacity:0}' +
    '.mb-sr{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}';
  document.head.appendChild(st);

  /* the number becomes one box per character: an invisible copy of the final character keeps the size, and over it
     a column of digits that slides up. The box shows only the height of the digits themselves (the clip), and the digits
     in the column stand 1.4em apart, so mostly one digit is seen at a time, like in a counter window. */
  function build(el) {
    var txt = el.textContent.trim();
    if (!/\d/.test(txt) || el.querySelector('.mb-od')) return null;
    var sr = document.createElement('span'), vis = document.createElement('span'), parts = [], k = 0;
    sr.className = 'mb-sr'; sr.textContent = txt;
    vis.setAttribute('aria-hidden', 'true');
    txt.split('').forEach(function (ch) {
      var box = document.createElement('span'), ph = document.createElement('i');
      box.className = 'mb-od'; ph.textContent = ch; box.appendChild(ph);
      if (/\d/.test(ch)) {
        var turns = Math.min(2, k), n = turns * 10 + +ch + 1, strip = document.createElement('b');
        for (var j = 0; j < n; j++) { var s = document.createElement('span'); s.textContent = j % 10; strip.appendChild(s); }
        box.appendChild(strip);
        parts.push({ el: strip, n: n, k: k++ });
      } else {
        box.classList.add('is-sign');
        parts.push({ el: ph, sign: true });
      }
      vis.appendChild(box);
    });
    el.textContent = '';
    el.appendChild(sr); el.appendChild(vis);
    return parts;
  }
  function roll(parts, delay) {
    var end = 0;
    parts.forEach(function (p) {
      if (p.sign) return;
      var d = DUR + p.k * MORE;
      end = Math.max(end, d);
      p.el.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(' + (-(p.n - 1) / p.n * 100).toFixed(4) + '%)' }],
        { duration: d, delay: delay, easing: EASE, fill: 'forwards' });
    });
    parts.forEach(function (p) {
      if (p.sign) p.el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, delay: delay + end * 0.6, easing: 'linear', fill: 'forwards' });
    });
  }
  function init() {
    var groups = new Map();
    [].forEach.call(document.querySelectorAll('.mb-stat'), function (el) {
      var parts = build(el);
      if (!parts) return;
      var g = el.closest('.div-block-30') || el;
      if (!groups.has(g)) groups.set(g, []);
      groups.get(g).push(parts);
    });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        groups.get(e.target).forEach(function (parts, i) { roll(parts, i * GAP); });
      });
    }, { threshold: 0.5 });
    groups.forEach(function (v, g) { io.observe(g); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
