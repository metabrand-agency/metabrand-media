/* Approach and What you can expect blocks (.mb-blk, Webflow components). On a computer, pointing at a column zooms its
   picture a little inside the frame (.mb-blk-media) and brings up the short note under the picture (.mb-blk-note).
   On touch screens and in windows narrower than 992px the notes simply stay visible under the pictures, as laid out
   in Webflow; the same happens if this file does not load. */
(function () {
  if (document.getElementById('mb-blk-css')) return;
  var ZOOM = 1.07;
  var css =
    '@media (hover:hover) and (pointer:fine) and (min-width:992px){' +
      '.mb-blk-item{position:relative}' +
      /* the notes sit in the space under the row and do not push the page down */
      '.mb-blk-note{position:absolute;left:0;right:0;top:100%;opacity:0;transform:translateY(10px);' +
        'transition:opacity .3s ease,transform .55s cubic-bezier(.2,.7,.2,1);pointer-events:none}' +
      '.mb-blk-item:hover .mb-blk-note{opacity:1;transform:none;transition-delay:.06s}' +
      '.mb-blk-media img{transition:transform 1.1s cubic-bezier(.2,.7,.2,1)}' +
      '.mb-blk-item:hover .mb-blk-media img{transform:scale(' + ZOOM + ')}' +
      '.mb-blk{padding-bottom:var(--mb-note-room,0px)}' +
    '}' +
    '@media (prefers-reduced-motion:reduce){.mb-blk-media img,.mb-blk-note{transition:opacity .2s ease!important;transform:none!important}}';
  var s = document.createElement('style');
  s.id = 'mb-blk-css';
  s.textContent = css;
  document.head.appendChild(s);

  /* room under each block for its tallest note, so a note never runs into the next section */
  function room() {
    [].forEach.call(document.querySelectorAll('.mb-blk'), function (b) {
      var h = 0;
      [].forEach.call(b.querySelectorAll('.mb-blk-note'), function (n) {
        h = Math.max(h, n.offsetHeight + (parseFloat(getComputedStyle(n).marginTop) || 0));
      });
      var mb = parseFloat(getComputedStyle(b).marginBottom) || 0;
      b.style.setProperty('--mb-note-room', Math.max(0, Math.ceil(h - mb + 40)) + 'px');
    });
  }
  room();
  var t;
  addEventListener('resize', function () { clearTimeout(t); t = setTimeout(room, 150); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(room);
  addEventListener('load', room);
})();
