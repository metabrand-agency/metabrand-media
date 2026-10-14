/* Metabrand header logo: hovering the logo (the wordmark at the top of the page, or the round mark after scrolling)
   drops a small agency card under it: dry facts in ruled rows and, at the bottom, "Ask ChatGPT | Claude about Metabrand"
   (each name opens that assistant in a new tab with the question ASK already typed in). The card stays while the cursor
   is on the logo or on the card and closes a moment after it leaves both. Desktop with a mouse only; on phones the logo
   is just the link home. Facts: ROWS below (label, value and an optional grey second line), the line under the name: LEAD.
   At the top: the star mark in a yellow circle as tall as the two first lines, then "Metabrand" set as plain text (the
   wordmark is already right above, in the header) and LEAD under it. */
(function () {
  var mm = window.matchMedia;
  if (!mm || !mm('(hover: hover) and (pointer: fine)').matches) return;
  var LEAD = 'Leading US startup branding agency';
  var ROWS = [
    ['Founded', '2018'],
    ['Founder', 'Dmitry Komissarov'],
    ['Launches', '60+'],
    ['Clients from', '12 countries'],
    ['Clutch', '27 five-star reviews'],
    ['Locations', 'USA, Germany, Cyprus'],
    ['Focus', 'Fintech, AI, SaaS, B2B'],
    ['Teams', 'Top-tier senior dedicated teams'],
    ['Sprints', 'Agile, 3-day or weekly']
  ];
  var ASK = 'What do you know about Metabrand (metabrand.digital), the branding agency for tech startups? ' +
    'Tell me about their work, clients, reviews and how they run projects.';
  /* the star mark of the logo (the same drawing as in meta-logo.svg, centered) */
  var MARK = '<svg viewBox="-42 -42 84 84" width="30" height="30" fill="none" stroke="#000" stroke-width="4.95" stroke-linecap="round" aria-hidden="true"><path d="M 0-36.34 C 1.29-36.34 2.76-35.71 4.35-34.06 C 5.94-32.39 7.5-29.86 8.85-26.52 C 11.55-19.86 13.28-10.48 13.28 0 C 13.28 10.49 11.55 19.86 8.85 26.53 C 7.5 29.86 5.94 32.4 4.35 34.06 C 2.76 35.72 1.29 36.35 0 36.35 C-1.29 36.35-2.76 35.72-4.35 34.06 C-5.94 32.4-7.5 29.86-8.85 26.53 C-11.56 19.86-13.28 10.49-13.28 0 C-13.28-10.48-11.56-19.86-8.85-26.52 C-7.5-29.86-5.94-32.39-4.35-34.06 C-2.76-35.71-1.29-36.34 0-36.34 Z"/><path d="M 25.7-25.7 C 26.62-24.79 27.21-23.3 27.16-21.01 C 27.11-18.7 26.41-15.81 25.01-12.49 C 22.21-5.87 16.81 1.99 9.39 9.4 C 1.98 16.81-5.87 22.22-12.5 25.02 C-15.81 26.42-18.7 27.11-21.01 27.16 C-23.3 27.21-24.79 26.62-25.7 25.71 C-26.61 24.79-27.2 23.31-27.16 21.01 C-27.11 18.71-26.41 15.82-25.01 12.5 C-22.21 5.88-16.8-1.98-9.39-9.39 C-1.98-16.8 5.87-22.21 12.5-25.01 C 15.81-26.41 18.71-27.11 21.01-27.15 C 23.3-27.2 24.79-26.61 25.7-25.7 Z"/><path d="M 25.7 25.71 C 24.79 26.62 23.3 27.21 21.01 27.16 C 18.7 27.11 15.81 26.42 12.5 25.02 C 5.87 22.22-1.98 16.81-9.39 9.4 C-16.81 1.98-22.21-5.87-25.01-12.49 C-26.41-15.81-27.11-18.7-27.16-21 C-27.21-23.3-26.62-24.79-25.7-25.7 C-24.79-26.61-23.3-27.2-21.01-27.15 C-18.71-27.11-15.81-26.41-12.5-25.01 C-5.87-22.21 1.98-16.8 9.39-9.39 C 16.8-1.98 22.21 5.88 25.01 12.5 C 26.41 15.82 27.11 18.71 27.16 21.01 C 27.2 23.31 26.61 24.79 25.7 25.71 Z"/><path d="M-36.99 0.4 H 38.27"/></svg>';
  var calm = mm('(prefers-reduced-motion: reduce)').matches;
  var st = document.createElement('style');
  st.textContent = '.mb-card{position:fixed;left:0;top:0;z-index:1002;width:340px;box-sizing:border-box;padding:20px 22px 18px;border-radius:14px;' +
    'font-family:Graphik,Arial,sans-serif;color:#000;text-align:left;background:rgba(255,255,255,.94);-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);' +
    'box-shadow:0 0 0 1px rgba(0,0,0,.06),0 16px 40px rgba(0,0,0,.12);transform-origin:24px 0;opacity:0;visibility:hidden;' +
    'transform:translateY(-8px) scale(.94);transition:opacity .18s linear,transform .25s cubic-bezier(.55,0,1,.45),visibility 0s linear .25s}' +
    '.mb-card.is-on{opacity:1;visibility:visible;transform:none;transition:opacity .2s linear,transform .55s cubic-bezier(.34,1.56,.64,1),visibility 0s}' +
    (calm ? '.mb-card,.mb-card.is-on{transition:none}' : '') +
    '.mb-card__head{display:flex;align-items:center;gap:12px;margin-bottom:14px}' +
    '.mb-card__mark{flex:none;display:flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:50%;background:#fff94b}' +
    '.mb-card__mark svg{display:block}' +
    '.mb-card__name{font-size:17px;line-height:22px;letter-spacing:-.01em}' +
    '.mb-card__lead{margin:1px 0 0;font-size:14px;line-height:19px;color:#6d6d6d}' +
    '.mb-card__rows{margin:0;padding:0}' +
    '.mb-card__row{display:flex;justify-content:space-between;gap:16px;padding:7px 0;border-top:1px solid rgba(0,0,0,.09);font-size:13px;line-height:17px}' +
    '.mb-card__row dt{color:#8a8a8a;white-space:nowrap}.mb-card__row dd{margin:0;text-align:right}' +
    '.mb-card__row small{display:block;margin-top:2px;font-size:12px;line-height:16px;color:#8a8a8a}' +
    '.mb-card__ask{margin-top:4px;padding-top:12px;border-top:1px solid rgba(0,0,0,.09);font-size:13px;line-height:17px;color:#8a8a8a}' +
    '.mb-card__ask a{color:#000;text-decoration:underline;text-underline-offset:2px}.mb-card__ask a:hover{text-decoration-thickness:2px}';
  document.head.appendChild(st);

  function build() {
    var c = document.createElement('div');
    c.className = 'mb-card';
    c.setAttribute('role', 'region');
    c.setAttribute('aria-label', 'Metabrand at a glance');
    var html = '<div class="mb-card__head"><span class="mb-card__mark">' + MARK + '</span><div>' +
      '<div class="mb-card__name">Metabrand</div><div class="mb-card__lead">' + LEAD + '</div></div></div><dl class="mb-card__rows">';
    ROWS.forEach(function (r) {
      html += '<div class="mb-card__row"><dt>' + r[0] + '</dt><dd>' + r[1] + (r[2] ? '<small>' + r[2] + '</small>' : '') + '</dd></div>';
    });
    var q = encodeURIComponent(ASK);
    html += '</dl><div class="mb-card__ask">Ask <a href="https://chatgpt.com/?q=' + q + '" target="_blank" rel="noopener">ChatGPT</a> | ' +
      '<a href="https://claude.ai/new?q=' + q + '" target="_blank" rel="noopener">Claude</a> about Metabrand</div>';
    c.innerHTML = html;
    document.body.appendChild(c);
    return c;
  }

  function init() {
    var brand = document.querySelector('.navbar:not(.drop) .w-nav-brand');
    if (!brand) return;
    var card = null, t = 0, logo = null;
    function place() {
      var r = logo.getBoundingClientRect();
      card.style.left = Math.round(r.left) + 'px';
      card.style.top = Math.round(r.bottom + 12) + 'px';
    }
    function open(img) {
      clearTimeout(t);
      if (!card) card = build(), wire();
      logo = img; place();
      card.classList.add('is-on');
    }
    function close(wait) {
      clearTimeout(t);
      t = setTimeout(function () { if (card) card.classList.remove('is-on'); }, wait == null ? 160 : wait);
    }
    function wire() {
      card.addEventListener('mouseenter', function () { clearTimeout(t); });
      card.addEventListener('mouseleave', function (e) { if (!brand.contains(e.relatedTarget)) close(); });
    }
    /* only over the logo picture that is showing, not the empty rest of the link */
    brand.addEventListener('mouseover', function (e) {
      var img = e.target;
      if (img.tagName === 'IMG' && parseFloat(getComputedStyle(img).opacity) > 0.5) open(img);
      else if (!card || !card.contains(e.relatedTarget)) close();
    });
    brand.addEventListener('mouseleave', function (e) { if (!card || !card.contains(e.relatedTarget)) close(); });
    addEventListener('scroll', function () { if (card && card.classList.contains('is-on')) close(0); }, { passive: true });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(0); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
