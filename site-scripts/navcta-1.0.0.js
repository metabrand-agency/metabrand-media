/* Metabrand header: "Work with us" opens a small menu with two ways to get in touch.
   Book a call: the Calendly popup on top of the page, as before. Send a message: the form on /contact.
   Desktop with a mouse: the menu drops when the cursor is on the button and closes a moment after it leaves the
   button and the menu; a click on the button itself still opens Calendly, as it always did.
   Phones and tablets: a tap on the button opens or closes the menu; a tap anywhere else, scrolling or Esc closes it.
   The menu lives right after the header, outside it: the header is drawn in "difference" blend mode and would turn
   the menu's colors inside out. Clicks are counted here with place "nav" (Call click, Contact click), and the
   generic click counter in footer-x.js is not called again for them. Texts: ITEMS below. */
(function () {
  var btn = document.querySelector('.navbar:not(.drop) .js-calendly');
  if (!btn || btn.__mbNavCta) return;
  btn.__mbNavCta = 1;
  var nav = btn.closest('.navbar');
  var CAL = 'https://calendly.com/metabrand/30min';
  var ITEMS = [
    { key: 'call', href: CAL, title: 'Book a call', note: '30 minutes, pick a time that works' },
    { key: 'message', href: '/contact', title: 'Send a message', note: 'Tell us about your project' }
  ];
  var mm = window.matchMedia;
  var fine = mm ? mm('(hover: hover) and (pointer: fine)') : { matches: false };
  var calm = mm && mm('(prefers-reduced-motion: reduce)').matches;

  var st = document.createElement('style');
  st.textContent =
    '.mb-wwu{position:fixed;left:0;top:0;z-index:1003;width:270px;box-sizing:border-box;padding:0;' +
      'font-family:Graphik,Arial,sans-serif;color:#000;text-align:left;background:#fff;' +
      'box-shadow:0 0 0 1px rgba(0,0,0,.08),0 16px 40px rgba(0,0,0,.14);transform-origin:100% 0;' +
      'opacity:0;visibility:hidden;transform:translateY(-6px);' +
      'transition:opacity .15s linear,transform .2s ease,visibility 0s linear .2s}' +
    '.mb-wwu.is-on{opacity:1;visibility:visible;transform:none;transition:opacity .18s linear,transform .3s cubic-bezier(.2,.7,.2,1),visibility 0s}' +
    (calm ? '.mb-wwu,.mb-wwu.is-on{transition:none}' : '') +
    '.mb-wwu__item{display:block;padding:15px 18px 16px;color:#000;text-decoration:none;transition:background-color .15s linear}' +
    '.mb-wwu__item+.mb-wwu__item{border-top:1px solid rgba(0,0,0,.09)}' +
    '.mb-wwu__title{display:block;font-size:16px;line-height:21px}' +
    '.mb-wwu__note{display:block;margin-top:2px;font-size:13px;line-height:17px;color:#6d6d6d}' +
    '.mb-wwu__item:hover,.mb-wwu__item:focus-visible{background:#fff94b;outline:none}' +
    '.mb-wwu__item:hover .mb-wwu__note,.mb-wwu__item:focus-visible .mb-wwu__note{color:#000}';
  document.head.appendChild(st);

  var menu = document.createElement('div');
  menu.className = 'mb-wwu';
  menu.id = 'mb-wwu';
  menu.setAttribute('aria-label', 'Work with us');
  ITEMS.forEach(function (it) {
    var a = document.createElement('a');
    a.className = 'mb-wwu__item';
    a.href = it.href;
    a.setAttribute('data-mb-wwu', it.key);
    a.innerHTML = '<span class="mb-wwu__title"></span><span class="mb-wwu__note"></span>';
    a.querySelector('.mb-wwu__title').textContent = it.title;
    a.querySelector('.mb-wwu__note').textContent = it.note;
    menu.appendChild(a);
  });
  nav.parentNode.insertBefore(menu, nav.nextSibling);
  btn.setAttribute('aria-haspopup', 'true');
  btn.setAttribute('aria-controls', 'mb-wwu');
  btn.setAttribute('aria-expanded', 'false');

  var open = false, timer = 0, openedAt = 0;
  function ev(name) { try { if (window.mbEvent) window.mbEvent(name, { place: 'nav' }); } catch (e) {} }
  function calendly() {
    if (window.Calendly && typeof window.Calendly.initPopupWidget === 'function') window.Calendly.initPopupWidget({ url: CAL });
    else window.open(CAL, '_blank', 'noopener');
  }
  function place() {
    /* with a mouse the cursor draws a yellow pill around the button (pointer effects in head-x.js):
       the menu starts under the pill and lines up with its right end */
    var r = btn.getBoundingClientRect();
    var w = menu.offsetWidth || 270;
    var right = Math.min(r.right + (fine.matches ? 20 : 0), innerWidth - 12);
    menu.style.left = Math.max(12, right - w) + 'px';
    menu.style.top = Math.round(r.top + (fine.matches ? 46 : 34)) + 'px';
  }
  function set(v) {
    clearTimeout(timer);
    if (v === open) return;
    open = v;
    if (v) { place(); openedAt = scrollY; }
    menu.classList.toggle('is-on', v);
    btn.setAttribute('aria-expanded', v ? 'true' : 'false');
  }
  function later() { clearTimeout(timer); timer = setTimeout(function () { set(false); }, 180); }

  /* desktop: the cursor opens it */
  [btn, menu].forEach(function (el) {
    el.addEventListener('mouseenter', function () { if (fine.matches) set(true); });
    el.addEventListener('mouseleave', function () { if (fine.matches) later(); });
  });
  /* keyboard: focus on the button or inside the menu keeps it open */
  var quiet = false;
  btn.addEventListener('focus', function () { if (fine.matches && !quiet) set(true); });
  menu.addEventListener('focusout', function (e) { if (!menu.contains(e.relatedTarget) && e.relatedTarget !== btn) set(false); });

  /* the button: on desktop a click books a call, on touch screens a tap opens or closes the menu */
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (fine.matches) { ev('Call click'); set(false); calendly(); }
    else set(!open);
  });

  menu.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-mb-wwu]');
    if (!a) return;
    e.stopPropagation();
    set(false);
    if (a.getAttribute('data-mb-wwu') === 'call') {
      e.preventDefault();
      ev('Call click');
      calendly();
    } else {
      ev('Contact click');
    }
  });

  document.addEventListener('click', function (e) { if (open && !menu.contains(e.target) && e.target !== btn) set(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape' || !open) return;
    var inside = menu.contains(document.activeElement);
    set(false);
    if (inside) { quiet = true; btn.focus({ preventScroll: true }); quiet = false; }
  });
  addEventListener('scroll', function () { if (open && Math.abs(scrollY - openedAt) > 40) set(false); }, { passive: true });
  addEventListener('resize', function () { if (open) set(false); });
})();
