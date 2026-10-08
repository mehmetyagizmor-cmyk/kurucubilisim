// Google Form yapılarını çeker: node forms-sync.js  →  src/content/apply-forms.json
// Google Form'a soru eklenir/çıkarılırsa bu komutu çalıştırıp siteyi yeniden derleyin.
const fs = require('fs');
const path = require('path');
const { applyForms } = require('./src/data');

// Google Forms soru tipleri
const TYPES = { 0: 'text', 1: 'paragraph', 2: 'radio', 3: 'select', 4: 'checkbox', 6: 'section', 9: 'date' };

async function fetchForm(id) {
  const url = `https://docs.google.com/forms/d/e/${id}/viewform`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0', 'Accept-Language': 'tr-TR' } });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  const html = await res.text();
  const m = html.match(/FB_PUBLIC_LOAD_DATA_ = (.*?);<\/script>/s);
  if (!m) throw new Error(`${url} → form verisi bulunamadı (form herkese açık mı?)`);
  const d = JSON.parse(m[1]);
  const items = [];
  for (const it of d[1][1] || []) {
    const type = TYPES[it[3]];
    if (!type) throw new Error(`${url} → desteklenmeyen soru tipi ${it[3]}: ${it[1]}`);
    if (type === 'section') { items.push({ type, title: (it[1] || '').trim(), desc: (it[2] || '').trim() }); continue; }
    const e = it[4][0];
    items.push({
      type,
      entry: e[0],
      label: (it[1] || '').trim(),
      help: (it[2] || '').trim(),
      required: !!e[2],
      ...(e[1] ? { options: e[1].map((o) => o[0]) } : {}),
    });
  }
  return { id, title: (d[1][8] || d[3] || '').trim(), desc: (d[1][0] || '').trim(), items };
}

(async () => {
  const out = {};
  for (const [slug, f] of Object.entries(applyForms)) {
    out[slug] = await fetchForm(f.id);
    console.log(`✔ ${slug}: ${out[slug].items.length} öğe`);
  }
  const file = path.join(__dirname, 'src/content/apply-forms.json');
  fs.writeFileSync(file, JSON.stringify(out, null, 2) + '\n');
  console.log('→ ' + path.relative(__dirname, file));
})().catch((e) => { console.error(e.message); process.exit(1); });
