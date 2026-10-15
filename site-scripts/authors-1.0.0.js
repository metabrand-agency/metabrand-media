/* Blog articles: the author block under the article. The article kit in the site head always puts "Authors: Metabrand
   Team" there. When the article's CMS author (the byline at the top of the article) is a person listed in PEOPLE, this
   file turns that block into the person's block: photo from the byline, name and a short bio. Articles by the
   Metabrand Team keep the team block. */
(function () {
  if (window.__mbAuthors) return;
  window.__mbAuthors = 1;
  var PEOPLE = {
    'Dmitry Komissarov': 'Dmitry Komissarov is the founder of Metabrand, a <a href="/">startup branding agency</a> in New York. ' +
      'Before Metabrand he worked at Landor in London. He leads strategy and creative direction on our work with AI, SaaS ' +
      'and fintech founders.'
  };
  var st = document.createElement('style');
  st.textContent = '.mb-team.mb-team--person .image-8{background:#e8e8e8;padding:0;object-fit:cover}';
  document.head.appendChild(st);

  function byline() {
    var blocks = document.querySelectorAll('.div-block-24:not(.mb-team)');
    for (var i = 0; i < blocks.length; i++) {
      var n = blocks[i].querySelector('.paragraph.approa'), img = blocks[i].querySelector('img');
      var name = n ? (n.textContent || '').trim() : '';
      if (name) return { name: name, img: img ? (img.currentSrc || img.src) : '' };
    }
    return null;
  }
  function run() {
    var team = document.querySelector('.mb-team');
    var who = byline();
    if (!team || !who || !PEOPLE[who.name] || team.classList.contains('mb-team--person')) return;
    team.classList.add('mb-team--person');
    var img = team.querySelector('.image-8');
    if (img && who.img) { img.src = who.img; img.alt = who.name; }
    var name = team.querySelector('.mb-team__name'), bio = team.querySelector('.mb-team__bio');
    if (name) name.innerHTML = '<span>Author:</span> ' + who.name;
    if (bio) bio.innerHTML = PEOPLE[who.name];
  }
  function start() {
    run();
    /* the article kit adds its block on DOMContentLoaded; try again shortly in case this file came first */
    if (!document.querySelector('.mb-team--person')) { setTimeout(run, 300); setTimeout(run, 1500); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
