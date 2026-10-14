/* Metabrand site effects that live outside Webflow (the site head and footer are close to Webflow's 50,000 character limit).
   The site footer loads this file; this file loads the current version of each effect from the same folder,
   some only on pages that have their element. To ship a change: add the new versioned file and change its name here.
   Browsers keep this file for up to 10 minutes. */
(function () {
  var BASE = 'https://metabrand-agency.github.io/metabrand-media/site-scripts/';
  [
    ['tweaks-1.0.0.js'],                    /* small style fixes: menu lines on phones */
    ['fill-1.0.0.js'],                      /* single pill buttons: the hover color flows in like a liquid */
    ['faces-1.5.0.js', '[data-mb-faces]'],  /* home, "Who we are": team photos after the heading, confetti on hover */
    ['logo-2.0.0.js', '.w-nav-brand'],      /* header logo: small still 3D figures pop out of it on hover */
    ['arrows-1.0.0.js', '.ind-arrow'],      /* industry rows: the arrow runs out to the right and back in from the left */
    ['stats-1.0.1.js', '.mb-stat']          /* About: the big numbers roll in like an odometer */
  ].forEach(function (f) {
    if (f[1] && !document.querySelector(f[1])) return;
    var s = document.createElement('script');
    s.src = BASE + f[0];
    s.async = true;
    document.head.appendChild(s);
  });
})();
