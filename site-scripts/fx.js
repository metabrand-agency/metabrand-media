/* Metabrand site effects that live outside Webflow (the site head and footer are close to Webflow's 50,000 character limit).
   The site footer loads this file; this file loads the current version of each effect from the same folder.
   To ship a change: add the new versioned file and change its name here. Browsers keep this file for up to 10 minutes. */
(function () {
  var BASE = 'https://metabrand-agency.github.io/metabrand-media/site-scripts/';
  [
    'fill-1.0.0.js'   /* single pill buttons: the hover color flows in like a liquid */
  ].forEach(function (f) {
    var s = document.createElement('script');
    s.src = BASE + f;
    s.async = true;
    document.head.appendChild(s);
  });
})();
