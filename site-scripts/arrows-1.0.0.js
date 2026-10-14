/* Metabrand industry rows (Industries block on /services and the home page): hovering a row sends its arrow out to the
   right inside its own box and brings it back in from the left. Desktop with a mouse only (the arrow is hidden on phones). */
(function () {
  var mm = window.matchMedia;
  if (!mm || !mm('(hover: hover) and (pointer: fine)').matches || mm('(prefers-reduced-motion: reduce)').matches) return;
  var st = document.createElement('style');
  st.textContent = '.ind-arrow{overflow:hidden}.mb-arr{display:inline-block}' +
    '.ind-row:hover .mb-arr{animation:mbArr .7s both}' +
    '@keyframes mbArr{0%{transform:none;animation-timing-function:cubic-bezier(.55,0,.9,.4)}' +
    '45%{transform:translateX(110%)}45.01%{transform:translateX(-110%);animation-timing-function:cubic-bezier(.1,.6,.3,1)}100%{transform:none}}';
  document.head.appendChild(st);
  function init() {
    [].forEach.call(document.querySelectorAll('.ind-arrow'), function (a) {
      if (a.querySelector('.mb-arr')) return;
      var s = document.createElement('span');
      s.className = 'mb-arr';
      while (a.firstChild) s.appendChild(a.firstChild);
      a.appendChild(s);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
