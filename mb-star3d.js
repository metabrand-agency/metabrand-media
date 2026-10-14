/* Metabrand 3D star for the hero of the industry and city landings (SaaS, Fintech, Tech, B2B, Rebranding, Brand Strategy,
   Webflow, New York, Berlin). Four chrome rings, the same mark as on /method. It turns slowly, leans toward the cursor and
   can be spun by dragging; after a drag it eases back into the slow turn.
   Where it goes: the block with the attribute data-mb-star (in the Designer, Div Block 91 + mb-star-box). The value of the
   attribute picks the look of that page, see LOOKS below (saas, fintech, tech, b2b, rebrand, strategy, webflow, newyork,
   berlin). An old page that still has the static picture (img.image-31) also works: the star is drawn over the picture and
   the picture fades out. Needs three.js 0.147 (window.THREE). */
(function () {
  var D = Math.PI / 180, R = 1, TUBE = 0.12, OPEN = 5;

  /* looks: metal = base color of the chrome, rough = roughness, accent = the colored panel on the left (RGB 0..1),
     k = its strength, right = color of the strip on the right (white by default) */
  var LOOKS = {
    saas: { accent: [0.05, 0.1, 1] },                                       // chrome, electric blue
    fintech: { accent: [1, 1, 1], k: 6 },                                   // plain chrome, white light only
    tech: { accent: [0, 0.72, 1] },                                         // chrome, cyan
    b2b: { metal: 0x5c5c64, rough: 0.34, accent: [1, 0.4, 0.04] },          // satin graphite, amber
    rebrand: { accent: [1, 0.08, 0.66], right: [0, 0.7, 1] },              // chrome, magenta and cyan
    strategy: { accent: [1, 0.93, 0.18], k: 9 },                            // chrome, Metabrand yellow
    webflow: { accent: [0.42, 0.14, 1] },                                   // chrome, violet
    newyork: { accent: [1, 0.13, 0.05] },                                   // chrome, red
    berlin: { metal: 0x303036, rough: 0.12, accent: [0.8, 0.86, 1], k: 6 }  // black chrome, cold white only
  };

  function start() {
    var host = document.querySelector('[data-mb-star]'), img = null;
    if (!host) { img = document.querySelector('img.image-31'); host = img && img.parentNode; }
    if (!host || host.__mbStar || !window.THREE) return;
    host.__mbStar = 1;
    var look = LOOKS[(host.getAttribute('data-mb-star') || '').trim()] || LOOKS.saas;
    var calm = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    var fine = window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches;
    var cfg = window.MB_STAR || {};
    for (var key in cfg) look[key] = cfg[key];

    var canvas = document.createElement('canvas');
    canvas.className = 'mb-star';
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', 'Metabrand star mark in chrome');
    canvas.style.cssText = 'position:absolute;display:block;opacity:0;transition:opacity .8s ease;cursor:grab;touch-action:pan-y;z-index:1' +
      (fine ? '' : ';pointer-events:none');
    if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
    host.appendChild(canvas);

    var renderer;
    try { renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); }
    catch (e) { canvas.remove(); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.setClearColor(0x000000, 0);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);

    /* studio for chrome: near-black room, white soft boxes above and below, a strip on the right, a colored panel on the left */
    (function () {
      var env = new THREE.Scene();
      env.add(new THREE.Mesh(new THREE.SphereGeometry(20, 32, 16), new THREE.MeshBasicMaterial({ color: 0x020203, side: THREE.BackSide })));
      function panel(w, h, x, y, z, c, k) {
        var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }));
        m.material.color.setRGB(c[0] * k, c[1] * k, c[2] * k);
        m.position.set(x, y, z); m.lookAt(0, 0, 0); env.add(m);
      }
      var W = [1, 1, 1];
      (look.panels || [
        [18, 5, -2, 9, 1, W, 4],                          // long soft box above
        [18, 4, 0, -9, 1, [0.9, 0.9, 1], 2.5],            // softer one below
        [4, 18, 9, 1, 1, look.right || W, look.right ? 8 : 4], // tall strip on the right
        [8, 14, -8, -2, -5, look.accent, look.k || 14]    // colored panel on the left, a little behind
      ]).forEach(function (p) { panel.apply(null, p); });
      var pm = new THREE.PMREMGenerator(renderer);
      scene.environment = pm.fromScene(env, 0.02).texture;
    })();

    var mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(look.metal || 0x7c7c84), metalness: 1, roughness: look.rough != null ? look.rough : 0.2,
      clearcoat: 1, clearcoatRoughness: 0.06, envMapIntensity: 1
    });
    var root = new THREE.Group(), spinner = new THREE.Group();
    scene.add(root); root.add(spinner);
    var geo = new THREE.TorusGeometry(R, TUBE, 64, 300);
    [0, 45, 90, 135].forEach(function (a, i) {
      var m = new THREE.Mesh(geo, mat);
      /* each ring stands almost edge-on and is turned a little about its long axis, so every ray shows a slim loop */
      m.quaternion.setFromEuler(new THREE.Euler(0, 0, a * D)).multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler((90 - OPEN) * D, 0, 0)));
      m.position.z = -0.002 * i;
      spinner.add(m);
    });

    /* size: the star fills the block (or the old picture); the canvas is larger, so the star never gets cut when it leans,
       but never wider than the room beside the block, so phones get no sideways scroll */
    var frameEl = img || host, OVER = 1.35, FILL = 0.86;
    function resize() {
      var w = frameEl.offsetWidth, h = frameEl.offsetHeight;
      if (!w || !h) return;
      var r = frameEl.getBoundingClientRect(), room = Math.max(0, Math.min(r.left, document.documentElement.clientWidth - r.right));
      var over = Math.max(1, Math.min(OVER, (w + 2 * room) / w));
      var cw = Math.round(w * over), ch = Math.round(h * over), x0 = img ? img.offsetLeft : 0, y0 = img ? img.offsetTop : 0;
      var s = canvas.style;
      s.width = cw + 'px'; s.height = ch + 'px';
      s.left = (x0 - (cw - w) / 2) + 'px'; s.top = (y0 - (ch - h) / 2) + 'px';
      renderer.setSize(cw, ch, false);
      camera.aspect = cw / ch;
      var half = (R + TUBE) / (FILL * Math.min(1, w / h) / over);
      camera.position.set(0, 0, half / Math.tan(15 * D));
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    }
    if (window.ResizeObserver) new ResizeObserver(resize).observe(frameEl);
    addEventListener('resize', resize);
    resize();

    /* motion: a small base tilt, slow turn in its own plane, lean toward the cursor, drag to spin */
    var TILT_X = -3, TILT_Y = 4, SPEED = calm ? 0 : (look.speed || 0.12);
    var angle = look.angle || 0, lx = 0, ly = 0, tx = 0, ty = 0, dragging = false, px = 0, py = 0;
    var qBase = new THREE.Quaternion(), qDrag = new THREE.Quaternion(), ID = new THREE.Quaternion(), tmp = new THREE.Quaternion();
    var eul = new THREE.Euler(), AX = new THREE.Vector3(0, 1, 0), AY = new THREE.Vector3(1, 0, 0), AZ = new THREE.Vector3(0, 0, 1);
    if (fine && !calm) {
      addEventListener('mousemove', function (e) {
        var r = canvas.getBoundingClientRect();
        tx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (innerWidth * 0.5)));
        ty = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (innerHeight * 0.5)));
      }, { passive: true });
      document.documentElement.addEventListener('mouseleave', function () { tx = ty = 0; });
    }
    canvas.addEventListener('pointerdown', function (e) {
      dragging = true; px = e.clientX; py = e.clientY; canvas.style.cursor = 'grabbing';
      try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
    });
    canvas.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var mx = e.clientX - px, my = e.clientY - py; px = e.clientX; py = e.clientY;
      tmp.setFromAxisAngle(AX, mx * 0.008); qDrag.premultiply(tmp);
      if (e.pointerType === 'mouse') { tmp.setFromAxisAngle(AY, my * 0.008); qDrag.premultiply(tmp); }
    });
    function up() { dragging = false; canvas.style.cursor = 'grab'; }
    canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up); canvas.addEventListener('lostpointercapture', up);

    var visible = true, shown = false, last = performance.now(), count = 0;
    if (window.IntersectionObserver) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }).observe(canvas);
    function frame(now) {
      if (look.frames && ++count > look.frames) return;
      requestAnimationFrame(frame);
      var dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (!visible && shown) return;
      angle += SPEED * dt;
      lx += (tx - lx) * (1 - Math.exp(-dt * 3)); ly += (ty - ly) * (1 - Math.exp(-dt * 3));
      if (!dragging) qDrag.slerp(ID, 1 - Math.exp(-dt * 1.8));
      qBase.setFromEuler(eul.set((TILT_X + ly * 12) * D, (TILT_Y + lx * 16) * D, 0));
      spinner.quaternion.setFromAxisAngle(AZ, angle);
      root.quaternion.copy(qDrag).multiply(qBase);
      renderer.render(scene, camera);
      if (!shown) {
        shown = true; canvas.style.opacity = '1';
        if (img) { img.style.transition = 'opacity .8s ease'; img.style.opacity = '0'; }
      }
    }
    requestAnimationFrame(frame);
  }

  window.mbStar = start;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
