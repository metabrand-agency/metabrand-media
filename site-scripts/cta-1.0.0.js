/* CTA heading "Let's discuss your project!" (yellow call-to-action block, the heading with data-project-heading).
   Every few seconds the line changes language: German, Spanish, Chinese and back to English, next time French,
   Japanese, Arabic and back. The words of the old line drift up and dissolve with a light blur while the words of the
   new line rise in one after another (Chinese and Japanese character by character). All the lines sit in the same
   place on top of each other, so the block keeps the height of the tallest one and never jumps; Arabic stays on the
   left like the others and reads right to left inside its line.
   Screen readers and search engines get the English line only. It runs while the heading is on screen and stays on
   English with reduced motion. Replaces the letter-by-letter script that lived in the CTA embed: the heading is
   swapped for a fresh copy, which also stops that script if it is still on the page. */
(function () {
  var src = document.querySelector('[data-project-heading]');
  if (!src || src.__mbCta || !src.parentNode) return;

  var EN = { text: 'Let’s discuss your project!', lang: 'en' };
  var SEQ = [
    { text: 'Lass uns über dein Projekt sprechen!', lang: 'de' },
    { text: '¡Hablemos de tu proyecto!', lang: 'es' },
    { text: '让我们聊聊你的项目！', lang: 'zh' },
    EN,
    { text: 'Parlons de votre projet !', lang: 'fr' },
    { text: 'あなたのプロジェクトについて話しましょう！', lang: 'ja' },
    { text: 'لنتحدث عن مشروعك!', lang: 'ar', dir: 'rtl' },
    EN
  ];
  var HOLD_EN = 5000, HOLD = 2300;          /* how long a line stays */
  var OUT = 520, IN = 780;                   /* one word leaving, one word arriving */
  var SPREAD_OUT = 220, SPREAD_IN = 420;     /* the whole line's stagger, however many words */
  var OVERLAP = 160;                         /* the new words start this long after the old ones */

  var calm = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!document.getElementById('mb-cta-css')) {
    var st = document.createElement('style');
    st.id = 'mb-cta-css';
    st.textContent =
      '.mb-cta-sr{position:absolute!important;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}' +
      '.mb-cta-stack{display:grid;text-align:left}' +
      '.mb-cta-l{grid-area:1/1;display:block;visibility:hidden}' +
      '.mb-cta-l.is-on{visibility:visible}' +
      '.mb-cta-u{display:inline-block}';
    document.head.appendChild(st);
  }

  /* a fresh copy of the heading takes the old one's place */
  var h = src.cloneNode(false);
  h.__mbCta = 1;
  h.removeAttribute('lang');
  h.removeAttribute('dir');
  h.innerHTML = '';
  var sr = document.createElement('span');
  sr.className = 'mb-cta-sr';
  sr.textContent = EN.text;
  var stack = document.createElement('span');
  stack.className = 'mb-cta-stack';
  stack.setAttribute('aria-hidden', 'true');
  h.appendChild(sr);
  h.appendChild(stack);
  src.parentNode.replaceChild(h, src);

  var seg = window.Intl && Intl.Segmenter ? new Intl.Segmenter(undefined, { granularity: 'grapheme' }) : null;
  function chars(t) { return seg ? Array.from(seg.segment(t), function (s) { return s.segment; }) : Array.from(t); }

  /* every line is built once and stays in the stack (hidden), which is what keeps the height steady */
  var built = [];
  function layer(item) {
    for (var i = 0; i < built.length; i++) if (built[i].item === item) return built[i];
    var el = document.createElement('span'), units = [];
    el.className = 'mb-cta-l';
    el.lang = item.lang;
    if (item.dir) el.dir = item.dir;
    function unit(t) { var u = document.createElement('span'); u.className = 'mb-cta-u'; u.textContent = t; el.appendChild(u); units.push(u); }
    if (/^(zh|ja)$/.test(item.lang)) chars(item.text).forEach(unit);
    else item.text.split(/( )/).forEach(function (w) { if (w === ' ') el.appendChild(document.createTextNode(' ')); else if (w) unit(w); });
    stack.appendChild(el);
    var L = { item: item, el: el, units: units };
    built.push(L);
    return L;
  }
  layer(EN).el.classList.add('is-on');
  SEQ.forEach(layer);
  var cur = layer(EN);

  if (calm || !h.animate) return;

  function swap(next) {
    var old = cur, n = old.units.length, m = next.units.length;
    var so = Math.min(40, SPREAD_OUT / Math.max(1, n - 1)), si = Math.min(60, SPREAD_IN / Math.max(1, m - 1));
    old.units.forEach(function (u, i) {
      u.animate([
        { opacity: 1, transform: 'none', filter: 'blur(0px)' },
        { opacity: 0, transform: 'translateY(-0.28em)', filter: 'blur(8px)' }
      ], { duration: OUT, delay: i * so, easing: 'cubic-bezier(.55,0,.75,.2)', fill: 'forwards' });
    });
    next.el.classList.add('is-on');
    next.units.forEach(function (u, i) {
      u.animate([
        { opacity: 0, transform: 'translateY(0.32em)', filter: 'blur(8px)' },
        { opacity: 1, transform: 'none', filter: 'blur(0px)' }
      ], { duration: IN, delay: OVERLAP + i * si, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' });
    });
    setTimeout(function () {
      old.el.classList.remove('is-on');
      old.units.forEach(function (u) { u.getAnimations().forEach(function (a) { a.cancel(); }); });
    }, OUT + so * n + 40);
    cur = next;
  }

  /* runs only while the heading is on screen and the tab is open */
  var k = 0, timer = 0, visible = false;
  function plan() {
    clearTimeout(timer);
    if (!visible || document.hidden) return;
    timer = setTimeout(function () {
      if (!visible || document.hidden) return;
      swap(layer(SEQ[k]));
      k = (k + 1) % SEQ.length;
      plan();
    }, cur.item === EN ? HOLD_EN : HOLD);
  }
  if (window.IntersectionObserver) {
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; plan(); }).observe(h);
  } else { visible = true; plan(); }
  document.addEventListener('visibilitychange', plan);
})();
