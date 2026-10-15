/* Home hero: the picture trail behind the cursor (site head code, pointer effect 3) keeps above "Trusted by" and the
   logo carousel. The trail lives in a layer (.mb-trail) laid over the whole hero; this file ends that layer GAP px above
   "Trusted by", so nothing can be drawn over the logos, and steers the cursor positions the trail sees:
   - below that line (over "Trusted by" and the logos) the trail gets no moves, so no new pictures come and the ones on
     screen wind up as usual;
   - just above it a picture would hang over the line, so the position is lifted until the whole picture fits above it,
     and the pictures run along the line.
   Desktop with a mouse only, like the trail itself. */
(function () {
  var mm = window.matchMedia;
  if (!mm || !mm('(hover: hover) and (pointer: fine)').matches || mm('(prefers-reduced-motion: reduce)').matches) return;
  if ((location.pathname.replace(/\/+$/, '') || '/') !== '/') return;
  var hero = document.querySelector('.section.hero');
  var floor = hero && hero.querySelector('.paragraph.bot');
  if (!hero || !floor) return;
  var GAP = 24, ROOM = 0.6; /* ROOM: how far the cursor stays above the line, in picture sizes (half a picture plus tilt) */
  hero.addEventListener('mousemove', function (e) {
    if (!e.isTrusted) return;
    var layer = hero.querySelector(':scope > .mb-trail');
    if (!layer) return;
    var line = floor.getBoundingClientRect().top - GAP;
    layer.style.bottom = Math.max(0, hero.getBoundingClientRect().bottom - line) + 'px';
    if (e.clientY <= line - 1) {
      var size = parseFloat(layer.style.getPropertyValue('--s')) || 120, top = line - size * ROOM;
      if (e.clientY <= top) return;
      e.stopImmediatePropagation();
      hero.dispatchEvent(new MouseEvent('mousemove', { clientX: e.clientX, clientY: top, screenX: e.screenX, screenY: e.screenY }));
      return;
    }
    e.stopImmediatePropagation();
  }, true);
})();
