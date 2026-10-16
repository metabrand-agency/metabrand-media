/* Metabrand About page, "Startups we launched": hovering a logo card turns it over, and its back plays the case video
   (the light _m version of the video on the case card in /work). The card turns back when the cursor leaves.
   Desktop with a mouse only. Which video goes with which card: VIDEOS below by the end of the card link; a card can
   also carry the attribute data-mb-video="name" (the file name on GitHub Pages without _m.mp4). Cards with no video
   (OTI Capital, The Anesthesia Collective) stay as they are. */
(function () {
  var mm = window.matchMedia;
  if (!mm || !mm('(hover: hover) and (pointer: fine)').matches || mm('(prefers-reduced-motion: reduce)').matches) return;
  var BASE = 'https://metabrand-agency.github.io/metabrand-media/';
  var VIDEOS = {
    'raylu': 'raylu_card', 'qorelo': 'qorelo_card_3', 'everytrade': 'everytrade_card', 'vanadio': 'vanadio_card_3',
    'deltagen': 'deltagen_card_2', 'xenith': 'xenith_card_2', 'sasono': 'sasono_card_4', 'omnimatrix': 'omnimatrix_card_2',
    'neuralfin': 'neuralfin_card', 'faasera': 'faasera_card_2', 'matrixpay': 'matrixpay_card_2', 'jump-point': 'jumppoint_card',
    'replior': 'replior_card', 'skilltree-marketing': 'skilltree_card', 'oxz-capital': 'oxz_card', 'rootkey': 'rootkey_card',
    'superyou': 'superyou_card', 'amitron': 'amitron_card_2', 'blaze': 'blaze_card', 'folio': 'folio_card'
  };
  var st = document.createElement('style');
  st.textContent = '.mb-logo.mb-flip{background:transparent!important;box-shadow:none!important;padding:0!important;perspective:1100px}' +
    '.mb-flip-in{position:relative;display:flex;flex:1 1 auto;flex-direction:column;transform-style:preserve-3d;' +
    'transition:transform .8s cubic-bezier(.3,.7,.2,1)}' +
    '.mb-logo.mb-flip:hover .mb-flip-in,.mb-logo.mb-flip:focus-visible .mb-flip-in{transform:rotateY(180deg)}' +
    '.mb-flip-f{position:relative;flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;align-items:stretch;' +
    'background:#fff;border-radius:4px;-webkit-backface-visibility:hidden;backface-visibility:hidden}' +
    '.mb-flip-b{position:absolute;left:0;top:0;width:100%;height:100%;border-radius:4px;overflow:hidden;background:#111 center/cover no-repeat;' +
    'transform:rotateY(180deg);-webkit-backface-visibility:hidden;backface-visibility:hidden}' +
    '.mb-flip-b video{display:block;width:100%;height:100%;object-fit:cover}';
  document.head.appendChild(st);

  function setup(a) {
    var slug = (a.getAttribute('href') || '').replace(/[?#].*$/, '').replace(/\/+$/, '').split('/').pop();
    var name = a.getAttribute('data-mb-video') || VIDEOS[slug];
    if (!name || a.classList.contains('mb-flip')) return;
    var pad = getComputedStyle(a).padding;
    var inner = document.createElement('span'), front = document.createElement('span'), back = document.createElement('span');
    inner.className = 'mb-flip-in'; front.className = 'mb-flip-f'; back.className = 'mb-flip-b';
    front.style.padding = pad;
    back.setAttribute('aria-hidden', 'true');
    back.style.backgroundImage = 'url("' + BASE + name + '.jpg")';
    while (a.firstChild) front.appendChild(a.firstChild);
    inner.appendChild(front); inner.appendChild(back); a.appendChild(inner);
    a.classList.add('mb-flip');
    var v = null, on = false, t = 0;
    function play() {
      if (!v) {
        v = document.createElement('video');
        v.muted = true; v.loop = true; v.playsInline = true; v.preload = 'auto';
        v.setAttribute('muted', ''); v.setAttribute('playsinline', '');
        v.poster = BASE + name + '.jpg';
        v.src = BASE + name + '_m.mp4';
        /* no light version: the full file */
        v.addEventListener('error', function () { if (/_m\.mp4$/.test(v.src)) { v.src = BASE + name + '.mp4'; if (on) v.play().catch(function () {}); } });
        back.appendChild(v);
      }
      var p = v.play(); if (p) p.catch(function () {});
    }
    a.addEventListener('mouseenter', function () { on = true; clearTimeout(t); play(); });
    /* it keeps playing while the card turns back, then stops */
    a.addEventListener('mouseleave', function () { on = false; clearTimeout(t); t = setTimeout(function () { if (!on && v) v.pause(); }, 800); });
  }
  function init() { [].forEach.call(document.querySelectorAll('a.mb-logo'), setup); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
