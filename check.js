// SEO kontrolü: node check.js  (dist/ üzerinde çalışır)
const fs = require('fs'), path = require('path');
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((f) => f.isDirectory() ? (f.name === 'assets' ? [] : walk(path.join(d, f.name))) : f.name.endsWith('.html') ? [path.join(d, f.name)] : []);
let bad = 0;
for (const f of walk('dist')) {
  const h = fs.readFileSync(f, 'utf8');
  const t = (h.match(/<title>(.*?)<\/title>/) || [])[1] || '', d = (h.match(/name="description" content="(.*?)"/) || [])[1] || '';
  const h1 = (h.match(/<h1[\s>]/g) || []).length, ds = (h.match(/name="description"/g) || []).length;
  let ld = 'ok'; try { JSON.parse(h.match(/ld\+json">(.*?)<\/script>/s)[1]); } catch (e) { ld = 'BAD'; }
  const warn = h1 !== 1 || ds !== 1 || ld !== 'ok' || t.length > 70 || d.length > 165 || d.length < 70;
  if (warn) bad++;
  console.log((warn ? '⚠ ' : '  ') + f.split(path.sep).join('/').padEnd(60), 'h1:' + h1, 'desc:' + ds, 'T' + t.length, 'D' + d.length, 'ld:' + ld);
}
console.log(bad ? `${bad} sayfada uyarı var` : 'Tüm sayfalar temiz');
