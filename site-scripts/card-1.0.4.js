/* Metabrand header logo: hovering the logo (the wordmark at the top of the page, or the round mark after scrolling)
   drops a small agency card under it: dry facts in ruled rows and, at the bottom, "Ask ChatGPT | Claude about Metabrand"
   (each name opens that assistant in a new tab with the question ASK already typed in). The card stays while the cursor
   is on the logo or on the card and closes a moment after it leaves both. Desktop with a mouse only; on phones the logo
   is just the link home. Facts: ROWS below (label, value and an optional grey second line), the line under the name: LEAD. */
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
    ['Sprints', 'Agile, 3-day or weekly'],
    ['Approach', 'Product deep-dive first']
  ];
  var ASK = 'What do you know about Metabrand (metabrand.digital), the branding agency for tech startups? ' +
    'Tell me about their work, clients, reviews and how they run projects.';
  var STAR = '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6">' +
    '<ellipse cx="12" cy="12" rx="10" ry="3.6"/><ellipse cx="12" cy="12" rx="10" ry="3.6" transform="rotate(45 12 12)"/>' +
    '<ellipse cx="12" cy="12" rx="10" ry="3.6" transform="rotate(90 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="3.6" transform="rotate(135 12 12)"/></g></svg>';
  var calm = mm('(prefers-reduced-motion: reduce)').matches;
  var st = document.createElement('style');
  st.textContent = '.mb-card{position:fixed;left:0;top:0;z-index:1002;width:340px;box-sizing:border-box;padding:20px 22px 18px;border-radius:14px;' +
    'font-family:Graphik,Arial,sans-serif;color:#000;text-align:left;background:rgba(255,255,255,.94);-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);' +
    'box-shadow:0 0 0 1px rgba(0,0,0,.06),0 16px 40px rgba(0,0,0,.12);transform-origin:24px 0;opacity:0;visibility:hidden;' +
    'transform:translateY(-8px) scale(.94);transition:opacity .18s linear,transform .25s cubic-bezier(.55,0,1,.45),visibility 0s linear .25s}' +
    '.mb-card.is-on{opacity:1;visibility:visible;transform:none;transition:opacity .2s linear,transform .55s cubic-bezier(.34,1.56,.64,1),visibility 0s}' +
    (calm ? '.mb-card,.mb-card.is-on{transition:none}' : '') +
    '.mb-card__name{display:flex;align-items:center;gap:8px;font-size:17px;line-height:22px}' +
    '.mb-card__lead{margin:4px 0 14px;font-size:14px;line-height:19px;color:#6d6d6d}' +
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
    var html = '<div class="mb-card__name">' + STAR + '<span>Metabrand</span></div><div class="mb-card__lead">' + LEAD + '</div><dl class="mb-card__rows">';
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
