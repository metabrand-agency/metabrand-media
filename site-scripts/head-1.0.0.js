/* Metabrand site head scripts (Article kit, pointer effects), moved out of Webflow custom code on 2026-10-17.
   Loaded in the site head without async/defer, exactly where they used to run. Each block is isolated by try/catch
   like separate <script> tags were. To change: add head-x.y.z.js and change the file name in the site head. */
/* ---- head article kit ---- */
try {
/* Article kit (blog + startup branding guide) */
!function(){var e=location.pathname.match(/^\/(learn|guides)\/(.+?)\/?$/);if(e){var t=e[2].split("/").pop();document.documentElement.classList.add("mb-article");var a="https://calendly.com/metabrand/30min",n="https://cdn.prod.website-files.com/67961be73378773c7b3d359c/",i=n+"6974c18c84e0aafa7f526c6c_meta-logo.svg",r=n+"67961be73378773c7b3d35bf_rotary_1.gif",o="Global branding agency for tech startups. Since 2018, 60+ launches in 12 countries.",s=" Every engagement is scoped individually, from 3–4 weeks.",d={"brand-strategy-a-complete-guide-and-frameworks":{t:"strategy",mid:/^brand strategy for startups/i,box:/^frequently asked questions/i},"startup-brand-strategy-framework":"strategy","how-to-pitch-investors-with-a-strong-startup-brand":"strategy","top-branding-firms-comprehensive-worldwide-guide":{t:"agency",mid:/^how to choose the right branding firm/i},"best-startup-branding-agencies-a-comprehensive-guide":{t:"agency",mid:/^how to choose the right agency/i},"best-tech-branding-agencies":{t:"agency",mid:/^tech branding by subvertical/i},"best-saas-branding-agencies":"agency","best-logo-design-studios-worldwide":{t:"agency",mid:/^startup logo design/i},"branding-agency-what-do-they-actually-do":"agency","how-to-choose-the-right-branding-agency":"agency","how-branding-agencies-price-their-services":"pricing","tech-website-design-best-examples":{t:"website",h3:10},"best-startup-website-examples-2026":{t:"website",h3:10},"how-to-build-an-investor-ready-startup-website":"website","best-web-design-agencies":"website","best-ux-ui-agencies":"website","best-webflow-agencies":"website","brand-bible-complete-guide":{t:"bible",mid:/^when do you need a brand bible/i},"how-to-build-startup-brand-guidelines":"bible","visual-identity-vs-brand-identity-key-differences":"identity","startup-logo-design-guide":"identity","how-to-create-a-visual-identity-for-a-startup":"identity","why-companies-rebrand-reasons-and-examples":"rebrand","rebranding-agency-when-to-refresh-your-identity":"rebrand","rebranding-definition-complete-guide":"rebrand","brand-refresh-vs-rebrand-complete-guide":"rebrand","rebranding-for-startups-when-and-why-to-do-it":"rebrand","time-to-rebrand":"rebrand","b2b-branding-complete-guide":"b2b","tech-company-branding-guide":"tech","fintech-brand-identity-design-explained":"fintech","best-fintech-branding-agencies":"fintech","fintech-branding-for-trust-and-simplicity":"fintech","fintech-ux-that-converts":"fintech","designing-the-fintech-experience-of-tomorrow":"fintech","from-product-to-platform-fintech-brand-evolution":"fintech","branding-for-ai-startups-trends":"ai","brand-differentiation-in-the-age-of-ai":"ai","how-ai-shapes-the-future-of-branding":"ai","startup-branding-guide":"process","branding-process":"process","branding-roi":"process","brand-positioning":"strategy","brand-messaging":"strategy","brand-naming":"strategy","visual-identity":"identity","brand-guidelines":"bible","when-to-rebrand":"rebrand","branding-cost":"pricing","branding-agencies":"agency","fintech-branding":"fintech","b2b-saas-branding":"b2b"}[t];"string"==typeof d&&(d={t:d});var c=d&&{strategy:["Raising, launching or repositioning? Start with the strategy.","We build brand strategy for AI, SaaS and fintech founders: positioning, narrative and brand architecture. Then we carry it through identity and website."+s,"Brand strategy for tech founders, from 3–4 weeks."],process:["Rather have a senior team run this process for you?","Research, positioning, identity and website for AI, SaaS and fintech startups. One senior team from kickoff to launch."+s,"Branding for tech startups. One senior team, from 3–4 weeks."],agency:["Looking for a branding partner for a tech startup?","Metabrand works with AI, SaaS and fintech founders from seed to Series A. Strategy, identity and website, all by one senior team."+s,"Choosing an agency? Talk to a team that works with tech startups."],rebrand:["Outgrown your brand before the next round?","We rebrand AI, SaaS and fintech companies at the moments that change how they’re judged: a new round, a new market, a move upmarket. Strategy, identity and website by one senior team."+s,"Rebranding a tech company? From 3–4 weeks."],identity:["Look like the company you’re about to become.","Logo, typography, color, motion and guidelines for AI, SaaS and fintech startups. One system that scales from a pitch deck to a product interface."+s,"Brand identity for tech startups, from 3–4 weeks."],bible:["Need a brand bible your team will actually use?","We build identity systems for AI, SaaS and fintech startups and deliver them with guidelines and components, so your team can create without starting from scratch."+s,"Brand systems and guidelines for tech startups."],website:["A website that answers the hard questions before the first call.","UX/UI design and development for AI, SaaS and fintech startups, built around what investors, buyers and candidates need to see."+s,"Websites for tech startups, from 3–4 weeks."],fintech:["Building a fintech brand people trust with their money?","We’ve branded payments, trading and fintech platforms. Strategy, identity and website, all by one senior team."+s,"Fintech branding, from 3–4 weeks."],ai:["Make your AI product look as trustworthy as it is impressive.","Positioning, identity and website for AI startups from seed to Series A, by one senior team."+s,"Branding for AI startups, from 3–4 weeks."],b2b:["Selling into enterprise? Make the brand as credible as the product.","Strategy, identity and website for B2B and SaaS teams selling into long, multi-stakeholder deals. One senior team from start to finish."+s,"B2B and SaaS branding, from 3–4 weeks."],tech:["Branding a tech company with a complex product?","Our work sits where products are hard to explain and trust is hard to earn: AI, SaaS and fintech, seed to Series A. Strategy, identity and website by one senior team."+s,"Branding for tech companies, from 3–4 weeks."],pricing:["Want a real number for your project?","Every Metabrand engagement is scoped individually around your next milestone: a raise, a launch or a repositioning. Tell us what you’re building and we’ll send a proposal.","Get a proposal scoped to your next milestone."]}[d.t];document.addEventListener("click",(function(e){var t=e.target.closest&&e.target.closest("[data-mb-call],[data-mb-proposal]");t&&(t.hasAttribute("data-mb-proposal")?b(t.getAttribute("data-mb-proposal"),"proposal"):(e.preventDefault(),b(t.getAttribute("data-mb-call"),"call"),"function"==typeof window.gtag_report_conversion&&window.gtag_report_conversion(),window.Calendly&&window.Calendly.initPopupWidget?window.Calendly.initPopupWidget({url:a}):window.open(a,"_blank","noopener")))})),"loading"===document.readyState?document.addEventListener("DOMContentLoaded",h):h()}function l(e){var t=document.createElement("div");return t.innerHTML=e.trim(),t.firstChild}function b(e,a){try{window.AhrefsAnalytics&&window.AhrefsAnalytics.sendEvent("Article CTA",{props:{article:t,position:e,action:a}})}catch(e){}}function u(e,t){return'<a href="'+a+'" class="button-contact'+(t||"")+'" data-mb-call="'+e+'">Book a call</a><a href="/contact" class="button-contact light'+("bar"===e?" mb-hide-m":"")+'" data-mb-proposal="'+e+'">Get a proposal</a>'}function g(e){return l('<div class="mb-cta" data-mb-cta="'+e+'"><div class="mb-cta__in"><div class="mb-cta__brand"><img class="mb-cta__logo" alt="Metabrand" loading="lazy" src="'+i+'"><div class="mb-cta__about">'+o+'</div></div><div><div class="mb-cta__title">'+c[0]+'</div><div class="mb-cta__text">'+c[1]+'</div><div class="mb-cta__btns">'+u(e)+"</div></div></div></div>")}function h(){var e=document.querySelector(".fs-toc_richtext");if(e){var n=e.closest("section");if(c){var o=function(e){var t=[].slice.call(e.querySelectorAll("h2"));if(d.h3){var a=[].slice.call(e.querySelectorAll("h3")).filter((function(e){return/^\s*\d+\./.test(e.textContent)}));if(a[d.h3])return a[d.h3]}if(d.mid){var n=t.filter((function(e){return d.mid.test(e.textContent.trim())}))[0];if(n)return n}var i=e.getBoundingClientRect(),r=null,o=2;return t.forEach((function(e,a){if(0!==a&&a!==t.length-1&&!/frequently asked|faq|ready to|summary|conclusion/i.test(e.textContent)){var n=Math.abs((e.getBoundingClientRect().top-i.top)/i.height-.5);n<o&&(o=n,r=e)}})),r}(e);if(o){var s=g("mid");s.classList.add("is-inline"),o.parentNode.insertBefore(s,o),function(e){function t(){e.style.marginLeft="0px";var t=document.body.clientWidth,a=e.getBoundingClientRect().left;e.style.marginLeft=-a+"px",e.style.width=t+"px"}t(),addEventListener("resize",t),addEventListener("load",t),window.ResizeObserver&&new ResizeObserver(t).observe(document.body)}(s)}if(d.box){var h=[].slice.call(e.querySelectorAll("h2")).filter((function(e){return d.box.test(e.textContent.trim())}))[0];h&&h.parentNode.insertBefore(l('<div class="mb-cta-box"><div class="mb-cta-box__text">Metabrand runs brand strategy for AI, SaaS and fintech startups: research, positioning and narrative, carried through identity and website.</div><div class="mb-row"><a href="'+a+'" class="button-contact black" data-mb-call="box">Book a call</a><a class="mb-more" href="/brand-strategy-agency">How we work on brand strategy →</a></div></div>'),h)}n&&n.parentNode.insertBefore(g("end"),n.nextSibling)}var m=e.parentNode.querySelector(":scope > .div-block-24"),f=l('<div class="div-block-24 mb-team"><img class="image-8" alt="Metabrand" loading="lazy" src="'+r+'"><div><div class="paragraph mb-team__name"><span>Authors:</span> Metabrand Team</div><div class="paragraph mb-team__bio">Metabrand is a <a href="/">startup branding agency</a> in New York. Our strategists and designers bring 50 years of combined experience in branding, including Landor. We work with AI, SaaS and fintech founders on <a href="/services">brand strategy, identity and websites</a>. And we love design (and avocados).</div></div></div>');m?m.parentNode.replaceChild(f,m):e.parentNode.insertBefore(f,e.nextSibling);var p=l('<div class="mb-bar"><img class="mb-bar__logo" alt="Metabrand" src="'+i+'"><div class="mb-bar__text">'+(c?c[2]:"Global branding agency for tech startups. 60+ launches since 2018.")+"</div>"+u("bar")+'<button class="mb-bar__x" type="button" aria-label="Close">×</button></div>');document.body.appendChild(p);var y=!1,v=0;addEventListener("scroll",_,{passive:!0}),addEventListener("resize",_),_(),p.querySelector(".mb-bar__x").addEventListener("click",(function(){y=!0,p.classList.remove("is-on"),b("bar","close")}));var w=document.querySelector(".section.learn");if(w&&window.fetch&&window.DOMParser){var S=(t+" "+((document.querySelector("h1")||{}).textContent||"")).toLowerCase(),k=[];[[/fintech|financ|bank|payment|trading|crypto|insur|invest/,["fintech"]],[/payment/,["payments"]],[/(^|[\s-])ai([\s-]|$)|artificial intelligence/,["ai"]],[/saas|software/,["saas"]],[/b2b|enterprise|sales/,["b2b"]],[/health|medtech|medical|clinical/,["healthcare","medtech"]],[/cyber|security/,["cybersecurity"]],[/e-?commerce|retail|catalog/,["ecommerce"]],[/investor|pitch|fundrais|series-a/,["series-a","seed"]],[/position-your-agency|agency-of-the-future|agency-team|boutique-creative|agency-rebrands/,["agency"]]].forEach((function(e){e[0].test(S)&&(k=k.concat(e[1]))})),fetch("/work",{credentials:"same-origin"}).then((function(e){return e.ok?e.text():Promise.reject(e.status)})).then((function(e){var t=[].slice.call((new DOMParser).parseFromString(e,"text/html").querySelectorAll("a[data-industry]")).map((function(e,t){var a=(e.getAttribute("data-industry")||"").split(/\s+/);return{a:e,i:t,s:k.filter((function(e){return a.indexOf(e)>-1})).length}})).sort((function(e,t){return t.s-e.s||e.i-t.i})).slice(0,2);if(!(t.length<2)){var a=l('<section class="section mb-work"><div class="container-wrapper text"><div class="div-block-42"><div class="heading more">Selected work</div></div></div><div class="container-wrapper"><div class="w-layout-blockcontainer container wide w-container"><div class="work-grid"></div></div></div></section>'),n=a.querySelector(".work-grid");t.forEach((function(e){var t=document.importNode(e.a,!0);t.removeAttribute("data-w-id"),t.querySelectorAll(".project_name").forEach((function(e){e.removeAttribute("style")})),t.querySelectorAll("video").forEach((function(e){var t=e.getAttribute("poster")||"";e.getAttribute("src")||e.querySelector("source")||!/\.jpe?g$/i.test(t)||(e.src=t.replace(/\.jpe?g$/i,".mp4")),e.muted=!0,e.loop=!0,e.playsInline=!0})),n.appendChild(t)})),w.parentNode.insertBefore(a,w),n.querySelectorAll("video").forEach((function(e){var t=e.play();t&&t.catch((function(){}))})),_()}})).catch((function(){}))}}function x(e){var t=e.getBoundingClientRect();return t.bottom>0&&t.top<innerHeight}function A(){if(v=0,!y){var t=e.getBoundingClientRect(),a=document.querySelector(".mb-cta[data-mb-cta=end],.mb-work,.section.learn,.section.yellow"),n=a&&a.getBoundingClientRect().top<innerHeight||[].some.call(document.querySelectorAll(".mb-cta"),x);p.classList.toggle("is-on",(innerHeight-t.top)/t.height>.3&&!n);var i=p.style;innerWidth>991?(i.left=t.left+"px",i.width=t.width+"px",i.right="auto",i.margin="0"):i.left=i.width=i.right=i.margin=""}}function _(){v||(v=requestAnimationFrame(A))}}}();
} catch (e) { console.error("metabrand: head article kit", e); }
/* ---- head pointer effects ---- */
try {
(function () {
  var fine = window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches;
  var calm = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!fine || calm) return;
  var NS = 'http://www.w3.org/2000/svg', Y = '#fff94b', uid = 0;
  var GOO = '<feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b"/>' +
    '<feColorMatrix in="b" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -11"/>';
  function make(parent, tag, attrs) {
    var el = document.createElementNS(NS, tag);
    for (var k in attrs) el.setAttribute(k, attrs[k]);
    parent.appendChild(el);
    return el;
  }
  function pill(el, x, y, w, h) {
    w = Math.max(0, w);
    el.setAttribute('x', x); el.setAttribute('y', y);
    el.setAttribute('width', w); el.setAttribute('height', h);
    el.setAttribute('rx', Math.min(h / 2, w / 2));
  }
  /* a fill shorter than its height turns into a shrinking drop instead of a thin sliver */
  function blob(el, x, y, w, h) {
    w = Math.max(0, w);
    if (w < h) { y += (h - w) / 2; h = w; }
    pill(el, x, y, w, h);
  }
  function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function svgShell(cls, clipRects) {
    var id = ++uid, svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', cls);
    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = '<defs><filter id="mbGoo' + id + '" x="-30%" y="-80%" width="160%" height="260%">' + GOO + '</filter>' +
      '<clipPath id="mbClip' + id + '">' + new Array(clipRects + 1).join('<rect/>') + '</clipPath></defs>' +
      '<g class="w"></g><g clip-path="url(#mbClip' + id + ')"><g class="y" filter="url(#mbGoo' + id + ')"></g></g><g class="o"></g>';
    return svg;
  }

  /* 1. Button pairs */
  function liquid(a, b) {
    var box = a.parentNode, sa = getComputedStyle(a), sb = getComputedStyle(b);
    var FILL = sa.backgroundColor, BASE = sb.backgroundColor, TA = sa.color, TB = sb.color;
    var LW = parseFloat(sb.borderTopWidth) || 0, LC = sb.borderTopColor;
    var svg = svgShell('mb-liq__svg', 2);
    box.insertBefore(svg, box.firstChild);
    var gw = svg.querySelector('.w'), gy = svg.querySelector('.y'), go_ = svg.querySelector('.o');
    var cr = svg.querySelectorAll('clipPath rect');
    var wa = make(gw, 'rect', { fill: BASE }), wb = make(gw, 'rect', { fill: BASE });
    var ya = make(gy, 'rect', { fill: FILL }), yb = make(gy, 'rect', { fill: FILL });
    var neck = make(gy, 'rect', { fill: FILL }), head = make(gy, 'circle', { fill: FILL, r: 0 });
    var oa = LW ? make(go_, 'rect', { fill: 'none', stroke: LC, 'stroke-width': LW }) : null;
    var ob = LW ? make(go_, 'rect', { fill: 'none', stroke: LC, 'stroke-width': LW }) : null;
    var A, B, side = true, p = 0, target = 0, raf = 0, last = 0, swap = null, DUR = 750;
    function rect(el) {
      var r = el.getBoundingClientRect(), o = box.getBoundingClientRect();
      return { x: r.left - o.left, y: r.top - o.top, w: r.width, h: r.height };
    }
    function draw() {
      var e = ease(p), s = Math.sin(Math.PI * p);
      var aw = A.w * (1 - e), bw = B.w * e;
      blob(ya, A.x + A.w - aw, A.y, aw, A.h);
      blob(yb, B.x, B.y, bw, B.h);
      if (side && s > 0.02) {
        var nh = A.h * (0.3 + 0.3 * s);
        var x0 = A.x + A.w - Math.min(aw, A.h / 2), x1 = B.x + Math.min(bw, B.h / 2);
        pill(neck, x0, A.y + (A.h - nh) / 2, x1 - x0, nh);
        head.setAttribute('cx', Math.min(B.x + B.w - B.h / 2, B.x + bw));
        head.setAttribute('cy', B.y + B.h / 2);
        head.setAttribute('r', bw > 1 ? (B.h / 2) * (0.85 + 0.2 * s) : 0);
      } else {
        neck.setAttribute('width', 0); head.setAttribute('r', 0);
      }
      /* the base under a full fill stays hidden, so no light rim shows around a dark button */
      wa.setAttribute('opacity', Math.min(1, e * 4).toFixed(3));
      wb.setAttribute('opacity', Math.min(1, (1 - e) * 4).toFixed(3));
      if (oa) { oa.setAttribute('stroke-opacity', e.toFixed(3)); ob.setAttribute('stroke-opacity', (1 - e).toFixed(3)); }
      var sw = p >= 0.5;
      if (sw !== swap) {
        swap = sw;
        a.style.setProperty('--mb-ta', sw ? TB : TA);
        b.style.setProperty('--mb-tb', sw ? TA : TB);
      }
    }
    function measure() {
      A = rect(a); B = rect(b);
      side = Math.abs(A.y - B.y) < 4 && B.x > A.x;
      var o = box.getBoundingClientRect();
      svg.setAttribute('width', o.width); svg.setAttribute('height', o.height);
      pill(wa, A.x, A.y, A.w, A.h); pill(wb, B.x, B.y, B.w, B.h);
      pill(cr[0], A.x, A.y, A.w, A.h); pill(cr[1], B.x, B.y, B.w, B.h);
      if (oa) { pill(oa, A.x + LW / 2, A.y + LW / 2, A.w - LW, A.h - LW); pill(ob, B.x + LW / 2, B.y + LW / 2, B.w - LW, B.h - LW); }
      draw();
    }
    function tick(now) {
      var dt = last ? Math.min(50, now - last) : 16; last = now;
      var step = dt / DUR, d = target - p;
      if (Math.abs(d) <= step) { p = target; draw(); raf = 0; last = 0; return; }
      p += d > 0 ? step : -step; draw();
      raf = requestAnimationFrame(tick);
    }
    function go(t) { target = t; if (!raf) raf = requestAnimationFrame(tick); }
    box.classList.add('mb-liq'); a.classList.add('mb-liq__a'); b.classList.add('mb-liq__b');
    measure();
    box.classList.add('is-on');
    if (window.ResizeObserver) new ResizeObserver(measure).observe(box); else addEventListener('resize', measure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    /* the first button's own hover color takes over only once the fill has flowed back into it and the cursor stays a moment;
       the fill under it is hidden once that color is in, so no rim shows at the edge */
    var overA = false, hold = 0, HOLD = 350;
    function arm(wait) {
      clearTimeout(hold);
      hold = setTimeout(function () {
        if (!overA) return;
        if (p === 0) box.classList.add('is-a'); else arm(p * DUR + 60);
      }, wait);
    }
    a.addEventListener('mouseenter', function () { overA = true; arm(Math.max(HOLD, p * DUR + 60)); });
    a.addEventListener('mouseleave', function () { overA = false; clearTimeout(hold); box.classList.remove('is-a'); });
    a.addEventListener('focus', function () { box.classList.add('is-a'); });
    a.addEventListener('blur', function () { if (!overA) box.classList.remove('is-a'); });
    b.addEventListener('mouseenter', function () { go(1); });
    b.addEventListener('mouseleave', function () { go(0); });
    b.addEventListener('focus', function () { go(1); });
    b.addEventListener('blur', function () { go(0); });
  }

  /* 2. Header "Work with us". The header blends with mix-blend-mode: difference, so the yellow is drawn under the header
     (outside it) and the link text turns yellow over the fill: yellow on yellow under difference reads as black. */
  function pour(link) {
    var PX = 22, PY = 15, M = 24, TXT = getComputedStyle(link).color;
    var svg = svgShell('mb-pour', 1);
    document.body.appendChild(svg);
    var clip = svg.querySelector('clipPath rect'), gy = svg.querySelector('.y');
    var fill = make(gy, 'rect', { fill: Y }), head = make(gy, 'circle', { fill: Y, r: 0 });
    var a = 0, b = 0, va = 0, vb = 0, ta = 0, tb = 0, raf = 0, last = 0, W = 15;
    function frame() {
      var rg = document.createRange();
      rg.selectNodeContents(link);
      var t = rg.getBoundingClientRect(), l = link.getBoundingClientRect();
      return { x: t.left - PX, y: t.top - PY, w: t.width + 2 * PX, h: t.height + 2 * PY, lx: l.left };
    }
    function clear() {
      fill.setAttribute('width', 0); head.setAttribute('r', 0);
      link.classList.remove('mb-pour-on'); link.style.backgroundImage = '';
    }
    function draw() {
      var F = frame(), h = F.h, x0 = a * F.w, x1 = b * F.w;
      svg.style.transform = 'translate(' + (F.x - M) + 'px,' + (F.y - M) + 'px)';
      svg.setAttribute('width', F.w + 2 * M); svg.setAttribute('height', h + 2 * M);
      pill(clip, M, M, F.w, h);
      blob(fill, M + x0, M, x1 - x0, h);
      /* the front bulges while it runs */
      var run = Math.min(1, Math.abs(vb) / 6), bulge = 0;
      if (x1 - x0 > h / 2 && tb > b + 0.002) {
        var r = (h / 2) * (1 + 0.3 * run);
        bulge = r - h / 2;
        head.setAttribute('cx', M + x1 - h / 2); head.setAttribute('cy', M + h / 2); head.setAttribute('r', r);
      } else head.setAttribute('r', 0);
      var s = F.x + x0 - F.lx, e = F.x + x1 + bulge - F.lx;
      link.classList.add('mb-pour-on');
      link.style.backgroundImage = 'linear-gradient(90deg,' + TXT + ' ' + s.toFixed(1) + 'px,' + Y + ' ' + s.toFixed(1) + 'px,' +
        Y + ' ' + e.toFixed(1) + 'px,' + TXT + ' ' + e.toFixed(1) + 'px)';
    }
    /* critically damped spring: eases in and out, and turns around smoothly if the cursor comes back */
    function tick(now) {
      var dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60; last = now;
      vb += (W * W * (tb - b) - 2 * W * vb) * dt; b += vb * dt;
      va += (W * W * (ta - a) - 2 * W * va) * dt; a += va * dt;
      b = Math.max(0, Math.min(1, b)); a = Math.max(0, Math.min(b, a));
      var done = Math.abs(tb - b) < 0.002 && Math.abs(ta - a) < 0.002 && Math.abs(va) + Math.abs(vb) < 0.02;
      if (done && ta === 1) { a = b = ta = tb = va = vb = 0; clear(); raf = 0; last = 0; return; }
      draw();
      if (done) { raf = 0; last = 0; return; }
      raf = requestAnimationFrame(tick);
    }
    function run() { if (!raf) raf = requestAnimationFrame(tick); }
    link.addEventListener('mouseenter', function () { ta = 0; tb = 1; run(); });
    link.addEventListener('mouseleave', function () { ta = 1; tb = 1; run(); });
    addEventListener('scroll', function () { if (b > 0 && !raf) draw(); }, { passive: true });
    addEventListener('resize', function () { if (b > 0 && !raf) draw(); });
  }

  /* 3. Image trail behind the cursor: overlapping cards, straight by default, the tilt bends with the path.
     Home and contact heroes use all the pictures. The big industry rows (.ind-row on Services and the home page) show only
     the 4-5 pictures of the row under the cursor: SETS, by the end of the row's link, numbers are positions in MEDIA.
     The pictures stay inside their row; when the cursor leaves the row they fade out quickly. */
  var CDN = 'https://cdn.prod.website-files.com/67961be73378773c7b3d359c/';
  var MEDIA = ['6acf3769878b29b2ae8df165_Frame%2033', '6acf376802df24c9740f5f49_Frame%2030', '6acf376902df24c9740f5fc5_Frame%2041',
    '6acf378c743e0b8dd4ae4a3d_st', '6acf37683a9ace7712a13b7e_Frame%2028', '6acf376a97dd665f24769e58_Rectangle%2041149',
    '6acf376802953e98fecdf772_Frame%2032', '6acf3769b6a337df93212f04_Frame%2040', '6acf3769e60d09796363efaa_Group%202085664712',
    '6acf3769073e591fa6604b89_Frame%2031', '6acf3769743e0b8dd4ae12b2_Frame%2039', '6acf3768d4b9d1d7fde33b69_Frame%2029',
    '6acf376b1e943fcc913ead47_Rectangle%2041532', '6acf3769073e591fa6604ba9_Frame%2038', '6acf3769073e591fa6604bd1_Frame%2035',
    '6acf3769d4b9d1d7fde33bcb_Metabrand', '6acf3769073e591fa6604bad_Frame%2034', '6acf37693e700fb70d0961f1_Frame%2037'];
  var SETS = { 'tech-branding-agency': [7, 6, 17, 0, 2], 'saas-branding-agency': [1, 9, 11, 4, 15],
    'fintech-branding-agency': [8, 14, 13, 5], 'b2b-branding-agency': [10, 3, 12, 16] };
  var TILT = 0, BEND = 10, STEP = 0.5, LIFE = 1600, MAX = 12, IDLE = 110, PACE = 24;
  var IN = 'cubic-bezier(.16,1,.3,1)', OUT = 'cubic-bezier(.55,0,.75,.15)';
  /* a set of pictures, shuffled once per visit */
  function deckOf(list) {
    list = list.slice();
    for (var j = list.length - 1; j > 0; j--) { var q = Math.floor(Math.random() * (j + 1)), t = list[j]; list[j] = list[q]; list[q] = t; }
    return { list: list, i: 0 };
  }
  /* pick(e) gives the set for the point under the cursor, or null where no pictures should come */
  function trail(hero, pick) {
    if (getComputedStyle(hero).position === 'static') hero.style.position = 'relative';
    var layer = document.createElement('div');
    layer.className = 'mb-trail';
    layer.setAttribute('aria-hidden', 'true');
    hero.insertBefore(layer, hero.firstChild);
    var size = 160, live = [], last = null, sx = 1, sy = 0, rot = TILT, ready = false, moved = 0, timer = 0, deck = null;
    /* an image is never on screen twice at the same time (one that is already leaving can come back at the head) */
    var shown = {};
    function free(el) { if (shown[el._k] === el) shown[el._k] = 0; }
    function gone(el) {
      if (el._gone) return;
      el._gone = true; free(el); el.remove();
    }
    function next() {
      var list = deck.list;
      for (var c = 0; c < list.length; c++) {
        var k = list[(deck.i + c) % list.length];
        if (!shown[k]) { deck.i += c + 1; return k; }
      }
      return list[deck.i++ % list.length];
    }
    function measure() {
      size = Math.round(Math.max(100, Math.min(140, innerWidth * 0.085)));
      layer.style.setProperty('--s', size + 'px');
    }
    function preload() {
      if (ready) return; ready = true;
      MEDIA.forEach(function (n) { var i = new Image(); i.decoding = 'async'; i.src = CDN + n + '.avif'; });
    }
    function tf(x, y, r, s) {
      return 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0) rotate(' + r.toFixed(2) + 'deg) scale(' + s + ')';
    }
    function drop(it, fast) {
      var el = it.el, cs = getComputedStyle(el), from = { transform: cs.transform, opacity: cs.opacity };
      it.a.cancel(); it.f.cancel(); free(el);
      el.animate([from, { transform: tf(it.x, it.y, it.r + 3, fast ? 0.85 : 0.6), opacity: 0 }], { duration: fast ? 200 : 380, easing: OUT, fill: 'forwards' })
        .onfinish = function () { gone(el); };
      live.splice(live.indexOf(it), 1);
    }
    /* while the cursor moves the stroke stays, so a shape can be drawn; once it rests the stroke winds up from the tail */
    function sweep() {
      timer = 0;
      var now = performance.now();
      if (live.length && now - moved > IDLE) drop(live[0]);
      while (live.length && now - live[0].born > LIFE) drop(live[0]);
      if (live.length) timer = setTimeout(sweep, PACE);
    }
    function spawn(x0, y0, x1, y1) {
      /* never more on screen than the set has pictures: the oldest leaves first */
      while (live.length >= Math.min(MAX, deck.list.length)) drop(live[0]);
      var el = document.createElement('img');
      el.className = 'mb-trail__t';
      el.alt = ''; el.decoding = 'async'; el.draggable = false;
      var k = next();
      el._k = k; shown[k] = el;
      el.src = CDN + MEDIA[k] + '.avif';
      layer.appendChild(el);
      var it = { el: el, x: x1, y: y1, r: rot, born: performance.now() };
      it.a = el.animate([{ transform: tf(x0, y0, rot - 4, 0.45) }, { transform: tf(x1, y1, rot, 1) }], { duration: 900, easing: IN, fill: 'forwards' });
      it.f = el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 160, easing: 'linear', fill: 'forwards' });
      live.push(it);
      if (!timer) timer = setTimeout(sweep, PACE);
    }
    measure();
    addEventListener('resize', measure);
    hero.addEventListener('mouseenter', preload);
    /* leaving an industry row: its pictures fade out quickly and the next trail starts afresh */
    function leave() {
      if (deck && deck.row) while (live.length) drop(live[0], true);
      last = null;
    }
    hero.addEventListener('mouseleave', leave);
    if (window.requestIdleCallback) requestIdleCallback(preload, { timeout: 4000 });
    hero.addEventListener('mousemove', function (e) {
      preload();
      var r = hero.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, set = pick(e);
      if (!set || (deck && set !== deck)) leave();
      if (!set) return;
      deck = set;
      if (set.row) {
        var b = set.row.getBoundingClientRect(), lo = b.top - r.top + size / 2, hi = b.bottom - r.top - size / 2;
        y = lo < hi ? Math.max(lo, Math.min(hi, y)) : (lo + hi) / 2;
      }
      moved = performance.now();
      if (!last) { last = { x: x, y: y }; return; }
      var dx = x - last.x, dy = y - last.y, d = Math.sqrt(dx * dx + dy * dy), gap = size * STEP;
      if (d < gap) return;
      /* smoothed direction; sin(2a) keeps one tilt for horizontal or vertical moves and bends it on diagonals */
      sx = sx * 0.6 + (dx / d) * 0.4; sy = sy * 0.6 + (dy / d) * 0.4;
      var m = sx * sx + sy * sy || 1, target = TILT + BEND * (2 * sx * sy / m);
      /* fast moves are filled in, so the stroke stays continuous */
      var n = Math.min(4, Math.floor(d / gap)), px = last.x, py = last.y;
      for (var i = 1; i <= n; i++) {
        var qx = last.x + dx * i / n, qy = last.y + dy * i / n;
        rot += (target - rot) * 0.45;
        spawn(px, py, qx, qy);
        px = qx; py = qy;
      }
      last = { x: x, y: y };
    });
  }

  /* 4. Work cards: a flat black-and-white infinity sign whose two loops are eyes follows the cursor;
     the pupils look toward the card's center and it blinks now and then */
  function eyes() {
    var wrap = document.createElement('div');
    wrap.className = 'mb-eyes';
    wrap.setAttribute('aria-hidden', 'true');
    wrap.innerHTML = '<div class="mb-eyes__in"><svg width="38" height="28" viewBox="0 0 38 28"><g class="mb-eyes__lid">' +
      '<path d="M19 14C16 9 13.6 2 9.6 2C5.5 2 2.5 7.4 2.5 14S5.5 26 9.6 26C13.6 26 16 19 19 14S22.4 2 28.4 2C32.5 2 35.5 7.4 35.5 14S32.5 26 28.4 26C24.4 26 22 19 19 14Z" fill="#fff" stroke="#000" stroke-width="1.5" stroke-linejoin="round"/>' +
      '<circle class="mb-eyes__p" cx="10" cy="14" r="3.6"/><circle class="mb-eyes__p" cx="28" cy="14" r="3.6"/></g></svg></div>';
    document.body.appendChild(wrap);
    var pupils = wrap.querySelectorAll('.mb-eyes__p'), card = null, x = 0, y = 0, tx = 0, ty = 0, px = 0, py = 0, raf = 0, blink = 0;
    function frame() {
      x += (tx - x) * 0.22; y += (ty - y) * 0.22;
      wrap.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
      var gx = 0, gy = 0;
      if (card) {
        var r = card.getBoundingClientRect(), vx = r.left + r.width / 2 - (x + 19), vy = r.top + r.height / 2 - (y + 14);
        var d = Math.sqrt(vx * vx + vy * vy) || 1, k = Math.min(1, d / (Math.min(r.width, r.height) * 0.35));
        gx = vx / d * 2.5 * k; gy = vy / d * 6 * k;
      }
      px += (gx - px) * 0.2; py += (gy - py) * 0.2;
      var t = 'translate(' + px.toFixed(2) + ',' + py.toFixed(2) + ')';
      pupils[0].setAttribute('transform', t); pupils[1].setAttribute('transform', t);
      raf = card || Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(frame) : 0;
    }
    function wink() {
      wrap.classList.add('is-blink');
      setTimeout(function () { wrap.classList.remove('is-blink'); }, 130);
      blink = setTimeout(wink, 2500 + Math.random() * 3000);
    }
    function show(c, e) {
      if (!card) { x = tx = e.clientX - 19; y = ty = e.clientY + 16; blink = setTimeout(wink, 1500); }
      card = c; wrap.classList.add('is-on');
      if (!raf) raf = requestAnimationFrame(frame);
    }
    function hide() { card = null; wrap.classList.remove('is-on'); clearTimeout(blink); }
    document.addEventListener('mouseover', function (e) {
      var c = e.target.closest && e.target.closest('a.link-block');
      if (c && c.querySelector('.project_name')) show(c, e); else if (card) hide();
    });
    document.addEventListener('mousemove', function (e) { if (card) { tx = e.clientX - 19; ty = e.clientY + 16; } }, { passive: true });
    document.documentElement.addEventListener('mouseleave', function () { if (card) hide(); });
  }

  function init() {
    [].forEach.call(document.querySelectorAll('.section.hero .div-block-95, .cta .buttons-wrap'), function (box) {
      var k = [].filter.call(box.children, function (n) { return n.tagName === 'A'; });
      if (k.length === 2 && !box.classList.contains('mb-liq')) liquid(k[0], k[1]);
    });
    var w = document.querySelector('.navbar:not(.drop) .nav-link-work');
    if (w) pour(w);
    var path = location.pathname.replace(/\/+$/, '') || '/';
    var host = path === '/' ? document.querySelector('.section.hero') : path === '/contact' ? document.querySelector('body > section') : null;
    if (Element.prototype.animate) {
      var all = deckOf(MEDIA.map(function (n, k) { return k; }));
      if (host) trail(host, function (e) { return e.target.closest && e.target.closest('a, button, input, textarea, select, label, .mb-liq') ? null : all; });
      [].forEach.call(document.querySelectorAll('.ind-list'), function (list) {
        trail(list.closest('section') || list.parentNode, function (e) {
          var row = e.target.closest && e.target.closest('.ind-row');
          if (!row || !list.contains(row)) return null;
          if (!row._mbSet) {
            var key = (row.getAttribute('href') || '').replace(/[?#].*$/, '').replace(/^.*\//, '');
            row._mbSet = deckOf(SETS[key] || all.list);
            row._mbSet.row = row;
          }
          return row._mbSet;
        });
      });
    }
    eyes();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
} catch (e) { console.error("metabrand: head pointer effects", e); }
