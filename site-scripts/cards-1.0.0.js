/* Blog article cards (Blog page, home page, landing pages, "Next reads" under articles).
   1. Hover: the cover zooms a little inside its frame. Plain CSS, so the browser animates it smoothly on its own.
      The cards still carry an older Webflow interaction that wrote the zoom into the image on every frame while a CSS
      transition chased it, which made the zoom jerky; the !important rules below keep that interaction from showing.
   2. Video covers: a card whose CMS item has "Cover video" filled (attribute data-mb-video) plays that square MP4
      in place of the cover image: muted, looped, only while the card is on screen. The image stays as the poster and
      for search engines. With reduced motion the image stays. */
(function () {
  if (window.__mbCards) return;
  window.__mbCards = 1;
  var st = document.createElement('style');
  st.textContent =
    '.image-10{transform:none!important;transition:transform .9s cubic-bezier(.16,1,.3,1)!important;backface-visibility:hidden}' +
    '@media (hover:hover) and (pointer:fine){.link-block-4:hover .image-10{transform:scale(1.06)!important}}' +
    'video.image-10{display:block;max-width:none;pointer-events:none}' +
    '.mb-cover-off{display:none!important}';
  document.head.appendChild(st);

  var calm = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (calm) return;
  var io = window.IntersectionObserver ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      var v = e.target;
      if (e.isIntersecting) { if (!v.src) v.src = v.getAttribute('data-src'); var p = v.play(); if (p && p.catch) p.catch(function () {}); }
      else if (!v.paused) v.pause();
    });
  }, { rootMargin: '200px 0px' }) : null;

  [].forEach.call(document.querySelectorAll('[data-mb-video]'), function (card) {
    var url = (card.getAttribute('data-mb-video') || '').trim();
    var img = card.querySelector('img.image-10');
    if (!/^https:\/\/\S+\.mp4(\?\S*)?$/i.test(url) || !img || card.querySelector('video.image-10')) return;
    var v = document.createElement('video');
    v.className = img.className;
    v.muted = true; v.loop = true; v.playsInline = true;
    v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.setAttribute('aria-hidden', 'true');
    v.preload = 'none';
    v.poster = img.currentSrc || img.src;
    v.setAttribute('data-src', url);
    img.parentNode.insertBefore(v, img);
    img.classList.add('mb-cover-off');
    if (io) io.observe(v); else { v.src = url; v.autoplay = true; }
  });
})();
