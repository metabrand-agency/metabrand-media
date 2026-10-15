/* Client reviews (CMS "Clients Feedbacks", Reviews kit): black-and-white photos of the people who signed them.
   - Review ribbon and slider (home, About, Services, landing pages): hovering a card turns its round brand mark over
     like a coin and shows the person's photo on the back; the mark comes back when the cursor leaves. Desktop with a
     mouse only; elsewhere the mark stays as it is.
   - Review card on a case page (.mb-rv-card): the photo is always there, with the brand mark tucked under its right side.
   Whose photo: PHOTOS below, by the name in the card (.mb-rv-name, letters only, lower case). A review without a photo
   here keeps only its brand mark. Photos: square, 256 px, black and white, in the folder reviews/ of this repository. */
(function () {
  if (window.__mbReviews) return;
  window.__mbReviews = 1;
  var BASE = 'https://metabrand-agency.github.io/metabrand-media/reviews/';
  var PHOTOS = {
    renebystron: 'rene-bystron.webp',
    louisschmidlin: 'louis-schmidlin.webp',
    simonzuhlke: 'simon-zuhlke.webp',
    natemordo: 'nate-mordo.webp'
  };
  var mm = window.matchMedia;
  var hover = !!(mm && mm('(hover: hover) and (pointer: fine)').matches);
  var calm = !!(mm && mm('(prefers-reduced-motion: reduce)').matches);

  var st = document.createElement('style');
  st.textContent =
    '.mb-rv-face{display:block;flex:none;object-fit:cover;border-radius:50%;background:#e8e8e8;max-width:none}' +
    '.mb-rv-flip{position:relative;flex:none;display:block;perspective:400px}' +
    '.mb-rv-flip__in{position:relative;display:block;transform-style:preserve-3d;transition:transform .7s cubic-bezier(.2,.75,.25,1)}' +
    '.mb-rv-flip__in>.mb-rv-mark{display:block;margin:0;-webkit-backface-visibility:hidden;backface-visibility:hidden}' +
    '.mb-rv-flip__in>.mb-rv-face{position:absolute;left:0;top:0;width:100%;height:100%;transform:rotateY(180deg);' +
    '-webkit-backface-visibility:hidden;backface-visibility:hidden;box-shadow:inset 0 0 0 1px rgba(0,0,0,.08),0 0 0 1px rgba(0,0,0,.08)}' +
    '.mb-rv-slide:hover .mb-rv-flip__in,.mb-rv-slide:focus-within .mb-rv-flip__in{transform:rotateY(180deg)}' +
    '.mb-rv-pair{position:relative;flex:none;display:flex;align-items:center}' +
    '.mb-rv-pair>.mb-rv-face{position:relative;z-index:2;box-shadow:0 0 0 3px var(--mb-rv-bg,#fff)}' +
    '.mb-rv-pair>.mb-rv-mark{position:relative;z-index:1;margin:0 0 0 calc(var(--mb-rv-s) * -.3)}' +
    (calm ? '.mb-rv-flip__in{transition:none}' : '');
  document.head.appendChild(st);

  function key(s) {
    return (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z]/g, '');
  }
  function bgOf(el) {
    for (var p = el; p && p !== document.documentElement; p = p.parentElement) {
      var c = getComputedStyle(p).backgroundColor;
      if (c && c !== 'transparent' && !/rgba\(.*,\s*0\)$/.test(c)) return c;
    }
    return '#fff';
  }
  function face(name, file) {
    var img = document.createElement('img');
    img.className = 'mb-rv-face';
    img.src = BASE + file;
    img.alt = name;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.draggable = false;
    return img;
  }
  function setup(slide) {
    if (slide.__mbFace || slide.querySelector('.mb-rv-flip, .mb-rv-pair')) return; /* a copy of a card already set up */
    var mark = slide.querySelector('.mb-rv-mark'), nameEl = slide.querySelector('.mb-rv-name');
    if (!mark || !nameEl) return;
    var name = (nameEl.textContent || '').trim(), file = PHOTOS[key(name)];
    if (!file) return;
    slide.__mbFace = 1;
    var size = mark.offsetWidth || 56;
    if (slide.closest('.mb-rv-card')) {
      /* case page: photo always, the brand mark overlaps it */
      var pair = document.createElement('span');
      pair.className = 'mb-rv-pair';
      pair.style.setProperty('--mb-rv-s', size + 'px');
      pair.style.setProperty('--mb-rv-bg', bgOf(slide));
      mark.parentNode.insertBefore(pair, mark);
      var f = face(name, file);
      f.style.width = f.style.height = size + 'px';
      pair.appendChild(f);
      pair.appendChild(mark);
      return;
    }
    if (!hover) return;
    /* ribbon and slider: the mark turns over to the photo while the card is hovered */
    var flip = document.createElement('span'), inner = document.createElement('span');
    flip.className = 'mb-rv-flip';
    inner.className = 'mb-rv-flip__in';
    mark.parentNode.insertBefore(flip, mark);
    flip.appendChild(inner);
    inner.appendChild(mark);
    inner.appendChild(face(name, file));
  }
  function scan(root) {
    [].forEach.call((root || document).querySelectorAll('.mb-rv-slide'), setup);
  }
  function init() {
    scan();
    /* the ribbon copies its cards to run endlessly; copies made later get the photo too */
    if (window.MutationObserver) {
      [].forEach.call(document.querySelectorAll('.mb-rv-grid, .mb-rv-card'), function (box) {
        new MutationObserver(function (list) {
          list.forEach(function (m) {
            [].forEach.call(m.addedNodes, function (n) {
              if (n.nodeType !== 1) return;
              if (n.classList.contains('mb-rv-slide')) setup(n); else scan(n);
            });
          });
        }).observe(box, { childList: true, subtree: true });
      });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
