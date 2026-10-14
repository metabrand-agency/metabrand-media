/* Metabrand: small style fixes kept outside Webflow (loaded on every page by fx.js).
   Phones and small tablets: the two menu lines (drawn by the menu script in the site footer) are thinner, closer together
   and a little shorter, right-aligned where the menu picture stands, to match the weight of the logo and "Work with us".
   Phones: the right part of the header ("Work with us" and the menu lines) always stays in place. On /about the Webflow
   header animation shifted it 60 px to the right at the top of the page, so the menu lines were off the screen. */
(function () {
  var st = document.createElement('style');
  st.textContent = '@media (max-width:767px){' +
    'html.mb-burger-on .mb-burger{--t:1.5px!important;--g:3px!important}' +
    'html.mb-burger-on .mb-burger i{left:auto;width:80%}' +
    'html.mb-burger-on .mb-burger.is-open i:first-child{transform:rotate(45deg) scale(var(--x,.76),1)}' +
    'html.mb-burger-on .mb-burger.is-open i:last-child{transform:rotate(-45deg) scale(var(--x,.76),1)}}' +
    '@media (max-width:479px){.navbar:not(.drop) .div-block-13{transform:none!important}}';
  document.head.appendChild(st);
  /* the menu lines follow the menu picture on resize; this makes them catch up with the fixes above right away */
  if (window.matchMedia && matchMedia('(max-width:767px)').matches)
    requestAnimationFrame(function () { window.dispatchEvent(new Event('resize')); });
})();
