/* Client reviews (CMS "Clients Feedbacks", Reviews kit): black-and-white photos of the people who signed them.
   - Review ribbon and slider (home, About, Services, landing pages): hovering a card turns its round brand mark over
     like a coin and shows the person's photo on the back; the mark comes back when the cursor leaves. Desktop with a
     mouse only; elsewhere the mark stays as it is.
   - Review card on a case page (.mb-rv-card): the person's photo takes the place of the brand mark, no ring around it.
     If the review has no photo, or the photo fails to load, the brand mark stays.
   Whose photo: the CMS field "Client photo" of the review. Each review template has a hidden image bound to that field
   (class mb-rv-photo); this file takes its address. Any photo works, color too: the site shows it in black and white.
   A review without a photo keeps only its brand mark.
   1.1.0: photos come from the CMS instead of a list in this file (1.0.0).
   1.1.1: case cards show the photo alone (before: photo with a ring and the brand mark tucked under it). */
(function () {
  if (window.__mbReviews) return;
  window.__mbReviews = 1;
  var mm = window.matchMedia;
  var hover = !!(mm && mm('(hover: hover) and (pointer: fine)').matches);
  var calm = !!(mm && mm('(prefers-reduced-motion: reduce)').matches);

  var st = document.createElement('style');
  st.textContent =
    '.mb-rv-face{display:block;flex:none;object-fit:cover;border-radius:50%;background:#e8e8e8;max-width:none;filter:grayscale(1) contrast(1.05)}' +
    '.mb-rv-flip{position:relative;flex:none;display:block;perspective:400px}' +
    '.mb-rv-flip__in{position:relative;display:block;transform-style:preserve-3d;transition:transform .7s cubic-bezier(.2,.75,.25,1)}' +
    '.mb-rv-flip__in>.mb-rv-mark{display:block;margin:0;-webkit-backface-visibility:hidden;backface-visibility:hidden}' +
    '.mb-rv-flip__in>.mb-rv-face{position:absolute;left:0;top:0;width:100%;height:100%;transform:rotateY(180deg);' +
    '-webkit-backface-visibility:hidden;backface-visibility:hidden;box-shadow:inset 0 0 0 1px rgba(0,0,0,.08),0 0 0 1px rgba(0,0,0,.08)}' +
    '.mb-rv-slide:hover .mb-rv-flip__in,.mb-rv-slide:focus-within .mb-rv-flip__in{transform:rotateY(180deg)}' +
    '.mb-rv-mark.mb-rv-mark--off{display:none!important}' +
    '.mb-rv-photo{display:none!important}' +
    (calm ? '.mb-rv-flip__in{transition:none}' : '');
  document.head.appendChild(st);

  /* the address of the photo bound in the CMS: the smallest size that is still sharp in a 56 px circle on a retina screen */
  function photoOf(slide) {
    var img = slide.querySelector('img.mb-rv-photo');
    if (!img || img.classList.contains('w-dyn-bind-empty')) return '';
    var src = img.getAttribute('src') || '', set = img.getAttribute('srcset') || '', best = 0;
    if (!/^https?:/.test(src) || /placeholder/i.test(src)) return '';
    set.split(',').forEach(function (part) {
      var m = part.trim().match(/^(\S+)\s+(\d+)w$/);
      if (m && +m[2] >= 200 && (!best || +m[2] < best)) { best = +m[2]; src = m[1]; }
    });
    return src;
  }
  function face(name, url) {
    var img = document.createElement('img');
    img.className = 'mb-rv-face';
    img.src = url;
    img.alt = name;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.draggable = false;
    return img;
  }
  function setup(slide) {
    if (slide.__mbFace || slide.querySelector('.mb-rv-flip, .mb-rv-face')) return; /* a copy of a card already set up */
    var mark = slide.querySelector('.mb-rv-mark'), nameEl = slide.querySelector('.mb-rv-name');
    if (!mark || !nameEl) return;
    var name = (nameEl.textContent || '').trim(), url = photoOf(slide);
    if (!url) return;
    slide.__mbFace = 1;
    var size = mark.offsetWidth || 56;
    if (slide.closest('.mb-rv-card')) {
      /* case page: the photo alone in place of the brand mark; the mark comes back if the photo fails to load */
      var f = face(name, url);
      f.style.width = f.style.height = size + 'px';
      f.loading = 'eager';
      f.onerror = function () {
        if (f.parentNode) f.parentNode.removeChild(f);
        mark.classList.remove('mb-rv-mark--off');
      };
      mark.parentNode.insertBefore(f, mark);
      mark.classList.add('mb-rv-mark--off');
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
    inner.appendChild(face(name, url));
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
