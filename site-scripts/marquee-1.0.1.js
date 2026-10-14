/* Metabrand logo carousels ("Trusted by" on the home page, also on About, Services, Industries): hovering a logo stops
   the carousel, the other logos fade back, and if that client has a case study, a small "Case Study" link appears under
   the logo; the logo itself also opens the case. The carousel moves on when the cursor leaves. Desktop with a mouse only.
   Which logo opens which case: CASES below, matched by the start of the logo's alt text (letters only, lower case);
   a logo can also carry the attribute data-mb-case="/work/slug". Logos without a case only stop the carousel.
   1.0.1: the arrow after "Case Study" points right (an inside page; the diagonal arrow is for other sites only), and the
   picture trail of the home hero no longer runs over the carousel: the cursor's moves over it do not reach the trail, and
   pictures already on screen fade out at once, so the hovered logo stays in view. */
(function () {
  var mm = window.matchMedia;
  if (!mm || !mm('(hover: hover) and (pointer: fine)').matches) return;
  var CASES = [
    ['qorelo', '/work/qorelo'], ['faasera', '/work/faasera'], ['omnimatrix', '/work/omnimatrix'], ['deltagen', '/work/deltagen'],
    ['sasono', '/work/sasono'], ['raylu', '/work/raylu'], ['everytrade', '/work/everytrade'], ['vanadio', '/work/vanadio'],
    ['xenith', '/work/xenith'], ['neuralfin', '/work/neuralfin'], ['matrixpay', '/work/matrixpay'], ['jumppoint', '/work/jump-point'],
    ['replior', '/work/replior'], ['skilltree', '/work/skilltree-marketing'], ['oticapital', '/work/oti-capital'],
    ['oxz', '/work/oxz-capital'], ['rootkey', '/work/rootkey'], ['superyou', '/work/superyou'], ['amitron', '/work/amitron'],
    ['blaze', '/work/blaze'], ['folio', '/work/folio']
  ];
  function caseOf(img) {
    var a = img.getAttribute('data-mb-case');
    if (a) return a;
    var key = (img.getAttribute('alt') || '').toLowerCase().replace(/[^a-z]/g, '');
    for (var i = 0; i < CASES.length; i++) if (key.indexOf(CASES[i][0]) === 0) return CASES[i][1];
    return null;
  }
  var st = document.createElement('style');
  st.textContent = '.logos-rail.mb-hold{animation-play-state:paused!important}' +
    '.logos-rail img.logos{transition:opacity .3s linear}' +
    '.logos-rail.mb-hold img.logos{opacity:.3}.logos-rail.mb-hold img.logos.is-hot{opacity:1}' +
    '.logos-rail img.logos.has-case{cursor:pointer}' +
    '.mb-cs{position:absolute;left:0;top:0;z-index:5;padding:6px 8px;font-family:Graphik,Arial,sans-serif;font-size:12px;line-height:16px;' +
    'color:inherit;text-decoration:none;white-space:nowrap;opacity:0;transform:translateY(-4px);pointer-events:none;' +
    'transition:opacity .2s linear,transform .3s cubic-bezier(.2,.8,.2,1)}' +
    '.mb-cs.is-on{opacity:1;transform:none;pointer-events:auto}.mb-cs:hover{text-decoration:underline}' +
    '.mb-cs:after{content:" \\2192"}' +
    '.mb-trail{transition:opacity .15s linear}.mb-trail.mb-trail-off{opacity:0}';
  document.head.appendChild(st);

  function setup(wrap) {
    var rail = wrap.querySelector('.logos-rail');
    if (!rail || wrap.__mbCs) return;
    wrap.__mbCs = 1;
    var host = wrap.parentNode;
    if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
    var cap = document.createElement('a');
    cap.className = 'mb-cs';
    cap.textContent = 'Case Study';
    host.appendChild(cap);
    var hot = null, t = 0, trail = null;
    /* the hero's picture trail (a .mb-trail layer added by the site head script to an ancestor): paused over the carousel */
    function trailLayer() {
      if (trail && trail.isConnected) return trail;
      for (var p = wrap.parentNode; p && p !== document.body; p = p.parentNode) {
        for (var c = p.firstElementChild; c; c = c.nextElementSibling) if (c.classList.contains('mb-trail')) return (trail = c);
      }
      return null;
    }
    function trailOff(on) { var l = trailLayer(); if (l) l.classList.toggle('mb-trail-off', on); }
    wrap.addEventListener('mousemove', function (e) { e.stopPropagation(); });
    wrap.addEventListener('mouseenter', function () { trailOff(true); });
    function show(img) {
      clearTimeout(t);
      if (hot && hot !== img) hot.classList.remove('is-hot');
      hot = img; img.classList.add('is-hot');
      rail.classList.add('mb-hold');
      var url = caseOf(img);
      if (!url) { cap.classList.remove('is-on'); return; }
      img.classList.add('has-case');
      cap.href = url;
      cap.setAttribute('aria-label', 'Case study: ' + (img.getAttribute('alt') || '').split(/\s[\u2014-]\s/)[0]);
      var r = img.getBoundingClientRect(), h = host.getBoundingClientRect();
      cap.style.left = (r.left - h.left + r.width / 2) + 'px';
      cap.style.top = (r.bottom - h.top + 2) + 'px';
      cap.style.marginLeft = (-cap.offsetWidth / 2) + 'px';
      cap.classList.add('is-on');
    }
    function hide() {
      clearTimeout(t);
      t = setTimeout(function () {
        if (hot) hot.classList.remove('is-hot');
        hot = null;
        rail.classList.remove('mb-hold');
        cap.classList.remove('is-on');
        trailOff(false);
      }, 120);
    }
    wrap.addEventListener('mouseover', function (e) {
      var img = e.target.closest && e.target.closest('img.logos');
      if (img && rail.contains(img)) show(img); else hide();
    });
    wrap.addEventListener('mouseleave', function (e) { if (e.relatedTarget !== cap) hide(); });
    cap.addEventListener('mouseenter', function () { clearTimeout(t); });
    cap.addEventListener('mousemove', function (e) { e.stopPropagation(); });
    cap.addEventListener('mouseleave', function (e) { if (!wrap.contains(e.relatedTarget)) hide(); });
    wrap.addEventListener('click', function (e) {
      var img = e.target.closest && e.target.closest('img.logos'), url = img && caseOf(img);
      if (url) location.href = url;
    });
  }
  function init() { [].forEach.call(document.querySelectorAll('.logos-wrapper'), setup); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
