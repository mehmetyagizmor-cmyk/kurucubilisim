// Kullanım: node build.js  →  dist/ klasörüne yayına hazır site üretir.
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');

const pages = []; // { path, html, sitemap?: {priority, lastmod} }
const ctx = {
  add(p, html, meta = {}) {
    if (pages.some((x) => x.path === p)) throw new Error('Aynı yol iki kez üretildi: ' + p);
    pages.push({ path: p, html, ...meta });
  },
  pages,
};

function rmrf(p) { fs.rmSync(p, { recursive: true, force: true }); }
function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const f of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, f.name), d = path.join(dst, f.name);
    f.isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d);
  }
}
function writeOut(p, content) {
  const file = p.endsWith('/') ? path.join(DIST, p, 'index.html') : path.join(DIST, p);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

(async () => {
  rmrf(DIST);
  copyDir(path.join(ROOT, 'assets'), path.join(DIST, 'assets'));
  await require('./src/brand')(DIST);

  // Sayfa modülleri (fazlara göre eklenir)
  const modules = fs.readdirSync(path.join(ROOT, 'src/pages')).filter((f) => f.endsWith('.js')).sort();
  for (const m of modules) await require('./src/pages/' + m)(ctx);

  for (const pg of pages) writeOut(pg.path, pg.html);
  if (fs.existsSync(path.join(ROOT, 'src/seo.js'))) await require('./src/seo')(ctx, DIST);
  if (fs.existsSync(path.join(ROOT, 'server'))) copyDir(path.join(ROOT, 'server'), DIST);

  console.log(`✔ ${pages.length} sayfa üretildi → dist/`);
})().catch((e) => { console.error(e); process.exit(1); });
