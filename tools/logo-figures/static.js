const { chromium } = require('playwright');
const fs = require('fs');
const P = [[0, 0, 0], [16, -12, 18], [-14, 18, 33], [10, 10, 60]];
const V = {
  0: { form: 'star', look: { accent: [1, 1, 1], k: 6 }, base: [0, 0, 0], axis: [0, 0, 1], poses: P },
  1: { form: 'star', look: { accent: [1, 0.93, 0.18], k: 9 }, base: [0, 0, 10], axis: [0, 0, 1], poses: P },
  2: { form: 'star', look: { accent: [1, 0.08, 0.66], right: [0, 0.7, 1] }, base: [0, 0, 5], axis: [0, 0, 1], poses: P },
  7: { form: 'star', look: { metal: 0x303036, rough: 0.12, accent: [0.8, 0.86, 1], k: 6 }, base: [0, 0, 20], axis: [0, 0, 1], poses: P }
};
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const p = await b.newPage(); p.on('pageerror', e => console.log('ERR', e.message));
  await p.goto('file://' + __dirname + '/sprites.html'); await p.waitForFunction(() => window.ready);
  fs.mkdirSync(__dirname + '/static', { recursive: true });
  for (const v of Object.keys(V)) {
    const fr = await p.evaluate(s => window.render(s), V[v]);
    fr.forEach((d, i) => fs.writeFileSync(`${__dirname}/static/v${v}_${i}.png`, Buffer.from(d.split(',')[1], 'base64')));
    console.log('v', v, fr.length);
  }
  await b.close();
})();
