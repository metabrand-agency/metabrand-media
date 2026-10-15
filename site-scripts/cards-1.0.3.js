/* Blog article cards (Blog page, home page, landing pages, "Next reads" under articles).
   1. Hover: the cover zooms a little inside its frame. Plain CSS, so the browser animates it smoothly on its own.
      The cards still carry an older Webflow interaction that wrote the zoom into the image on every frame while a CSS
      transition chased it, which made the zoom jerky; the !important rules below keep that interaction from showing.
   2. Video covers: a card whose CMS item has "Cover video" filled (attribute data-mb-video) plays that square MP4
      in place of the cover image: muted, looped, only while the card is on screen. Video covers are made in their
      final colors, so they are shown without the inversion that image covers get (mix-blend-mode: difference).
      The poster is the JPG with the same name next to the MP4 (name.mp4 -> name.jpg). The cover image stays in the
      HTML for search engines and is shown instead of the video with reduced motion. Cards without a video are unchanged.
      Cards that have no Cover video binding (home page, landing pages, "Next reads") look the video up by the article
      slug in blog-covers.json next to the videos: { "article-slug": "file.mp4", ... }. Keep that file in step with
      the CMS field when a cover video is added or replaced.
   3. Card titles: a card whose CMS item has "Card title" filled (attribute data-mb-card-title) shows that short title;
      the article page and its SEO title keep the full Name. */
(function () {
  if (window.__mbCards) return;
  window.__mbCards = 1;
  var MEDIA = 'https://metabrand-agency.github.io/metabrand-media/';
  var st = document.createElement('style');
  st.textContent =
    '.image-10{transform:none!important;transition:transform .9s cubic-bezier(.16,1,.3,1)!important;backface-visibility:hidden}' +
    '@media (hover:hover) and (pointer:fine){.link-block-4:hover .image-10{transform:scale(1.06)!important}}' +
    'video.image-10{display:block;max-width:none;pointer-events:none;mix-blend-mode:normal!important;background:#eceef2}' +
    '.mb-cover-off{display:none!important}';
  document.head.appendChild(st);

  [].forEach.call(document.querySelectorAll('[data-mb-card-title]'), function (card) {
    var t = (card.getAttribute('data-mb-card-title') || '').trim();
    var el = card.querySelector('.paragraph.article');
    if (t && el && el.textContent.trim() !== t) el.textContent = t;
  });

  var calm = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (calm) return;
  var io = window.IntersectionObserver ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      var v = e.target;
      if (e.isIntersecting) { if (!v.src) v.src = v.getAttribute('data-src'); var p = v.play(); if (p && p.catch) p.catch(function () {}); }
      else if (!v.paused) v.pause();
    });
  }, { rootMargin: '200px 0px' }) : null;

  function attach(img, url) {
    if (!/^https:\/\/\S+\.mp4(\?\S*)?$/i.test(url) || !img || img.classList.contains('mb-cover-off')) return;
    if (img.parentNode.querySelector('video.image-10')) return;
    var v = document.createElement('video');
    v.className = img.className;
    v.muted = true; v.loop = true; v.playsInline = true;
    v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.setAttribute('aria-hidden', 'true');
    v.preload = 'none';
    v.poster = url.replace(/\.mp4(\?\S*)?$/i, '.jpg');
    v.setAttribute('data-src', url);
    img.parentNode.insertBefore(v, img);
    img.classList.add('mb-cover-off');
    if (io) io.observe(v); else { v.src = url; v.autoplay = true; }
  }

  /* cards with the Cover video field bound (Blog page) */
  [].forEach.call(document.querySelectorAll('[data-mb-video]'), function (card) {
    var url = (card.getAttribute('data-mb-video') || '').trim();
    if (url) attach(card.querySelector('img.image-10'), url);
  });

  /* other blog cards: look the video up by article slug */
  var rest = [].filter.call(document.querySelectorAll('img.image-10'), function (img) {
    if (img.classList.contains('mb-cover-off')) return false;
    var bound = img.closest('[data-mb-video]');
    if (bound && (bound.getAttribute('data-mb-video') || '').trim()) return false;
    return !!img.closest('a[href*="/learn/"]');
  });
  if (!rest.length || !window.fetch) return;
  fetch(MEDIA + 'blog-covers.json').then(function (r) { return r.ok ? r.json() : {}; }).then(function (map) {
    rest.forEach(function (img) {
      var href = img.closest('a[href*="/learn/"]').getAttribute('href') || '';
      var slug = (href.split('/learn/')[1] || '').split(/[?#\/]/)[0];
      if (slug && map[slug]) attach(img, MEDIA + map[slug]);
    });
  }).catch(function () {});
})();
