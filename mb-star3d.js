/* Metabrand 3D star for the hero of the industry and city landings (SaaS, Fintech, Tech, B2B, Rebranding, Brand Strategy,
   Webflow, New York, Berlin). It takes the place of the static render (img.image-31): the same four rings in black chrome
   with a blue light on one side. It turns slowly, leans toward the cursor and can be spun by dragging; after a drag it
   eases back into the slow turn. The picture stays in the page (for search and as a fallback) and fades out once the
   first 3D frame is drawn. Needs three.js 0.147 (window.THREE). */
(function () {
  var D = Math.PI / 180, R = 1, TUBE = 0.12, OPEN = 5;

  function start() {
    var img = document.querySelector('img.image-31');
    if (!img || img.__mbStar || !window.THREE) return;
    img.__mbStar = 1;
    var box = img.parentNode;
    var calm = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    var fine = window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches;
    var cfg = window.MB_STAR || {};

    var canvas = document.createElement('canvas');
    canvas.className = 'mb-star';
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText = 'position:absolute;display:block;opacity:0;transition:opacity .8s ease;cursor:grab;touch-action:pan-y;z-index:1' +
      (fine ? '' : ';pointer-events:none');
    if (getComputedStyle(box).position === 'static') box.style.position = 'relative';
    box.appendChild(canvas);

    var renderer;
    try { renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); }
    catch (e) { canvas.remove(); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = cfg.exposure || 1;
    renderer.setClearColor(0x000000, 0);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);

    /* studio for chrome: near-black room, white soft boxes and strips for the silver highlights, one blue panel on the side */
    (function () {
      var env = new THREE.Scene();
      env.add(new THREE.Mesh(new THREE.SphereGeometry(20, 32, 16), new THREE.MeshBasicMaterial({ color: 0x020203, side: THREE.BackSide })));
      function panel(w, h, x, y, z, c, k) {
        var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }));
        m.material.color.setRGB(c[0] * k, c[1] * k, c[2] * k);
        m.position.set(x, y, z); m.lookAt(0, 0, 0); env.add(m);
      }
      var W = [1, 1, 1], B = [0.05, 0.1, 1];
      (cfg.panels || [
        [18, 5, -2, 9, 1, W, 4],          // long soft box above
        [18, 4, 0, -9, 1, [0.9, 0.9, 1], 2.5], // softer one below
        [4, 18, 9, 1, 1, W, 4],           // tall strip on the right
        [8, 14, -8, -2, -5, B, 14]        // blue panel on the left, a little behind
      ]).forEach(function (p) { panel.apply(null, p); });
      var pm = new THREE.PMREMGenerator(renderer);
      scene.environment = pm.fromScene(env, 0.02).texture;
    })();

    var mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(cfg.color || 0x7c7c84), metalness: 1, roughness: cfg.roughness != null ? cfg.roughness : 0.2,
      clearcoat: 1, clearcoatRoughness: 0.06, envMapIntensity: cfg.env || 1
    });
    var root = new THREE.Group(), spinner = new THREE.Group();
    scene.add(root); root.add(spinner);
    if (cfg.tube) TUBE = cfg.tube; if (cfg.open != null) OPEN = cfg.open;
    var geo = new THREE.TorusGeometry(R, TUBE, 64, 300);
    [0, 45, 90, 135].forEach(function (a, i) {
      var m = new THREE.Mesh(geo, mat);
      /* each ring stands almost edge-on and is turned a little about its long axis, so every ray shows a slim loop */
      m.quaternion.setFromEuler(new THREE.Euler(0, 0, a * D)).multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler((90 - OPEN) * D, 0, 0)));
      m.position.z = -0.002 * i;
      spinner.add(m);
    });

    /* size: the canvas is larger than the picture, so the star never gets cut when it leans; the star fills the picture */
    var OVER = 1.35, FILL = cfg.fill || 0.86;
    function resize() {
      var w = img.offsetWidth, h = img.offsetHeight;
      if (!w || !h) return;
      var r = img.getBoundingClientRect(), room = Math.max(0, Math.min(r.left, document.documentElement.clientWidth - r.right));
      var over = Math.max(1, Math.min(OVER, (w + 2 * room) / w));
      var cw = Math.round(w * over), ch = Math.round(h * over);
      var s = canvas.style;
      s.width = cw + 'px'; s.height = ch + 'px';
      s.left = (img.offsetLeft - (cw - w) / 2) + 'px'; s.top = (img.offsetTop - (ch - h) / 2) + 'px';
      renderer.setSize(cw, ch, false);
      camera.aspect = cw / ch;
      /* the star (radius R + tube) takes FILL of the picture height */
      var half = (R + TUBE) / (FILL / over);
      camera.position.set(0, 0, half / Math.tan(15 * D));
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    }
    if (window.ResizeObserver) new ResizeObserver(resize).observe(img);
    addEventListener('resize', resize);
    resize();

    /* motion: base tilt like the render, slow turn in its own plane, lean toward the cursor, drag to spin */
    var TILT_X = cfg.tiltX != null ? cfg.tiltX : -3, TILT_Y = cfg.tiltY != null ? cfg.tiltY : 4, SPEED = calm ? 0 : (cfg.speed || 0.12);
    var angle = cfg.angle || 0, vel = 0, lx = 0, ly = 0, tx = 0, ty = 0, dragging = false, px = 0, py = 0, dx = 0, dy = 0;
    var qBase = new THREE.Quaternion(), qLean = new THREE.Quaternion(), qDrag = new THREE.Quaternion(), ID = new THREE.Quaternion(), tmp = new THREE.Quaternion();
    var eul = new THREE.Euler(), AX = new THREE.Vector3(0, 1, 0), AY = new THREE.Vector3(1, 0, 0);
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

    var visible = true, shown = false, last = performance.now();
    if (window.IntersectionObserver) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }).observe(canvas);
    var count = 0;
    function frame(now) {
      if (cfg.frames && ++count > cfg.frames) return;
      requestAnimationFrame(frame);
      var dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (!visible && shown) return;
      angle += SPEED * dt;
      lx += (tx - lx) * (1 - Math.exp(-dt * 3)); ly += (ty - ly) * (1 - Math.exp(-dt * 3));
      if (!dragging) qDrag.slerp(ID, 1 - Math.exp(-dt * 1.8));
      qBase.setFromEuler(eul.set((TILT_X + ly * 12) * D, (TILT_Y + lx * 16) * D, 0));
      spinner.quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), angle);
      root.quaternion.copy(qDrag).multiply(qBase);
      renderer.render(scene, camera);
      if (!shown) { shown = true; canvas.style.opacity = '1'; img.style.transition = 'opacity .8s ease'; img.style.opacity = '0'; }
    }
    requestAnimationFrame(frame);
  }

  window.mbStar = start;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
