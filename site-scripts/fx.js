/* Metabrand site effects that live outside Webflow (the site head and footer are close to Webflow's 50,000 character limit).
   The site footer loads this file; this file loads the current version of each effect from the same folder,
   some only on pages that have their element. To ship a change: add the new versioned file and change its name here.
   Browsers keep this file for up to 10 minutes. */
(function () {
  var BASE = 'https://metabrand-agency.github.io/metabrand-media/site-scripts/';
  [
    ['tweaks-1.0.1.js'],                    /* small style fixes: menu lines on phones, line under drop-down menu items */
    ['fill-1.0.0.js'],                      /* single pill buttons: the hover color flows in like a liquid */
    ['faces-1.5.0.js', '[data-mb-faces]'],  /* home, "Who we are": team photos after the heading, confetti on hover */
    ['card-1.0.6.js', '.w-nav-brand'],      /* header logo: an agency card with dry facts drops under it on hover
                                               (replaced logo-2.0.0.js, the 3D figures flying out of the logo) */
    ['arrows-1.0.0.js', '.ind-arrow'],      /* industry rows: the arrow runs out to the right and back in from the left */
    ['stats-1.0.1.js', '.mb-stat'],         /* About: the big numbers roll in like an odometer */
    ['flip-1.0.0.js', 'a.mb-logo'],         /* About, "Startups we launched": a logo card turns over and plays the case video */
    ['marquee-1.0.3.js', '.logos-wrapper'], /* logo carousels: stop on a logo, "Case Study" link under it */
    ['trail-1.0.0.js', '.section.hero .paragraph.bot'], /* home hero: the picture trail keeps above "Trusted by" and the logos */
    ['reviews-1.1.0.js', '.mb-rv-slide'],  /* client reviews: the brand mark turns over to the person's photo on hover; photo always on case cards */
    ['authors-1.0.0.js', '.fs-toc_richtext'], /* blog articles: the author block under the article shows the author's photo and bio (Dmitry), else Metabrand Team */
    ['favicon-1.0.0.js'],                   /* browser tab: the star mark in the favicon makes a half turn every few seconds */
    ['blocks-1.0.2.js', '.mb-blk'],         /* Approach, What you can expect: the picture zooms in its frame, a note shows under it,
                                               the heading comes down to the picture, the number moves up */
    ['cta-1.0.0.js', '[data-project-heading]'], /* yellow CTA: "Let's discuss your project!" changes language word by word */
    ['cards-1.0.3.js', '.image-10']         /* blog article cards: smooth cover zoom on hover, video covers (CMS field, or blog-covers.json by slug on other pages) and short card titles */
  ].forEach(function (f) {
    if (f[1] && !document.querySelector(f[1])) return;
    var s = document.createElement('script');
    s.src = BASE + f[0];
    s.async = true;
    document.head.appendChild(s);
  });
})();
