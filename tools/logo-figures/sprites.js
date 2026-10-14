const { chromium } = require('playwright');
const fs = require('fs');
const VARIANTS = [
  { form: 'star', look: { accent: [1, 1, 1], k: 6 }, base: [0, 0, 0], axis: [0.25, 1, 0.15], wob: 38 },                   // plain chrome star
  { form: 'star', look: { accent: [1, 0.93, 0.18], k: 9 }, base: [0, 0, 10], axis: [1, 0.35, 0.2], wob: 32 },           // star, Metabrand yellow
  { form: 'star', look: { accent: [1, 0.08, 0.66], right: [0, 0.7, 1] }, base: [-15, 25, 0], axis: [0.2, 0.6, 1] }, // star, magenta and cyan
  { form: 'idea', look: { accent: [0.05, 0.1, 1] }, base: [-70, 16, 0], axis: [0.4, 1, 0.3] },                  // Big Idea, blue
  { form: 'ring', look: { accent: [1, 1, 1], k: 6 }, base: [30, 20, 0], axis: [1, 0.8, 0.1] },                   // Clarity, chrome
  { form: 'plus', look: { accent: [0.42, 0.14, 1] }, base: [10, 30, 45], axis: [0.3, 1, 0.6] },                 // Credibility, violet
  { form: 'chain', look: { accent: [0, 0.72, 1] }, base: [-14, 26, 0], axis: [0.6, 1, 0.2] },                    // Control, cyan
  { form: 'star', look: { metal: 0x303036, rough: 0.12, accent: [0.8, 0.86, 1], k: 6 }, base: [0, 0, 20], axis: [0.7, 0.3, 1], wob: 42 } // black chrome star
];
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const p = await b.newPage();
  p.on('pageerror', e => console.log('ERR', e.message));
  await p.goto('file://' + __dirname + '/sprites.html');
  await p.waitForFunction(() => window.ready);
  fs.mkdirSync(__dirname + '/frames', { recursive: true });
  for (let v = 0; v < VARIANTS.length; v++) {
    const t = Date.now();
    const frames = await p.evaluate(s => window.render(s), VARIANTS[v]);
    frames.forEach((d, i) => fs.writeFileSync(`${__dirname}/frames/v${v}_${String(i).padStart(2, '0')}.png`, Buffer.from(d.split(',')[1], 'base64')));
    console.log('variant', v, frames.length, Date.now() - t, 'ms');
  }
  await b.close();
})();
