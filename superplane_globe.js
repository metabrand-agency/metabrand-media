/* SuperPlane generative globe for metabrand.digital: the orange GLOBE step of the superplane.com onboarding demo
   (superplane.webflow.io/app-demo), without the interface around it. Engine: superplane-art.js from
   metabrand-agency/superplane, pinned to the commit the SuperPlane site uses. Embed:
   <div id="sp-globe-mount"></div><script src="https://metabrand-agency.github.io/metabrand-media/superplane_globe.js?v=1"></script> */
(function () {
  var mount = document.getElementById("sp-globe-mount");
  if (!mount || mount.getAttribute("data-sp-mounted")) return;
  mount.setAttribute("data-sp-mounted", "1");
  var BG = "#EF8D0B";
  var THREE_URL = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
  var ART_URL = "https://cdn.jsdelivr.net/gh/metabrand-agency/superplane@4b13944a6fb8bfa57aaf765e2074fa74b1fe7fc3/superplane-art.js";
  var OPTS = { mode: "globe", panel: false, minimalSphere: true, bgColor: BG, arrowColor: "#11110e",
               allowModeSwitch: false, overrides: { globe: { count: 1000 } } };
  // orange box with the frame of the case videos (1440 x 1020) until the canvas is there
  mount.style.background = BG;
  if (!mount.style.height) { mount.style.width = "100%"; mount.style.aspectRatio = "1440 / 1020"; }
  mount.style.height = mount.style.height || "auto";
  function load(src, next) {
    var s = document.createElement("script"); s.src = src; s.async = true; s.onload = next; document.head.appendChild(s);
  }
  function start() {
    if (!window.SuperplaneArt) return;
    // the engine zooms on mouse wheel and blocks page scroll over the canvas; on the case page the wheel scrolls the page
    var add = HTMLCanvasElement.prototype.addEventListener;
    HTMLCanvasElement.prototype.addEventListener = function (type, fn, o) { if (type === "wheel") return; return add.call(this, type, fn, o); };
    try {
      var h = mount.getBoundingClientRect().height;
      mount.style.height = Math.round(h) + "px";           // the engine needs a fixed height; kept in step with the width below
      window.SuperplaneArt.mount(mount, OPTS);
    } finally { HTMLCanvasElement.prototype.addEventListener = add; }
    var ar = 1020 / 1440;
    var fit = function () { mount.style.height = Math.round(mount.getBoundingClientRect().width * ar) + "px"; };
    if (window.ResizeObserver) new ResizeObserver(fit).observe(mount); else window.addEventListener("resize", fit);
  }
  function boot() {
    var go = function () { window.SuperplaneArt ? start() : load(ART_URL, start); };
    window.THREE ? go() : load(THREE_URL, go);
  }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      for (var i = 0; i < es.length; i++) if (es[i].isIntersecting) { io.disconnect(); boot(); return; }
    }, { rootMargin: "400px 0px" });
    io.observe(mount);
  } else boot();
})();
