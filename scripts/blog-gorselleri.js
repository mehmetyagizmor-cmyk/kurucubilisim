// Görseli olmayan blog yazıları için marka uyumlu kapak çizimleri üretir.
// Kullanım: node scripts/blog-gorselleri.js            → yalnızca görseli eksik yazılar
//           node scripts/blog-gorselleri.js --hepsi    → listedeki tüm kapakları yeniden üretir
// Çıktı: assets/img/blog/<slug>.webp (1600×1000) ve <slug>-640.webp (640×400)
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { icon } = require('../src/lib');

const OUT = path.join(__dirname, '../assets/img/blog');
const W = 1600, H = 1000;
const RED = '#e3262b', INK = '#1d1d1f', MUTED = '#c7c7cc';

// Konuya göre motif: ana ikon (büyük rozet) ve çevresindeki küçük ikon kutucukları
const KAPAKLAR = {
  'kurumsal-dijitallesmede-e-imzanin-rolu': { ana: 'briefcase', kutu: ['layers', 'users', 'shield'], ton: 0 },
  'avukatlar-icin-e-imza-uyap-ve-dijital-dava-sureclerinde-kullanim': { ana: 'scales', kutu: ['doc', 'monitor', 'pen'], ton: 1 },
  'e-imza-ile-uzaktan-calisma-surecleri-nasil-kolaylasir': { ana: 'monitor', kutu: ['pin', 'clock', 'link'], ton: 2 },
  'e-imza-nasil-alinir-adim-adim-basvuru-rehberi': { ana: 'compass', kutu: ['doc', 'truck', 'check'], ton: 0, adimlar: true },
  'ekap-islemlerinde-e-imza-kamu-ihalelerine-dijital-katilim-rehberi': { ana: 'crane', kutu: ['briefcase', 'doc', 'shield'], ton: 1 },
  'e-imzanin-yasal-gecerliligi-5070-sayili-kanun-ve-hukuki-sonuclari': { ana: 'shield', kutu: ['scales', 'book', 'seal'], ton: 2 },
  'e-imza-basvurusu-gerekli-belgeler-sartlar-ve-basvuru-turleri': { ana: 'archive', kutu: ['users', 'doc', 'check'], ton: 0 },
  'e-imza-kullanim-alanlari-elektronik-imza-nerelerde-kullanilir': { ana: 'grid', kutu: ['monitor', 'banknote', 'mail', 'briefcase'], ton: 1 },
};

// Site ikon setinden (24×24 çizgi ikon) belirli konum ve boyutta, verilen renkte bir ikon
const ic = (k, x, y, size, color, stroke = 1.8) =>
  `<g color="${color}">${icon(k).replace('<svg', `<svg x="${x}" y="${y}" width="${size}" height="${size}"`).replace('stroke-width="1.8"', `stroke-width="${stroke}"`)}</g>`;

const tile = (k, x, y, s) => `
  <g filter="url(#golge-k)"><rect x="${x}" y="${y}" width="${s}" height="${s}" rx="${s * 0.28}" fill="#fff"/></g>
  <rect x="${x + s * 0.2}" y="${y + s * 0.2}" width="${s * 0.6}" height="${s * 0.6}" rx="${s * 0.17}" fill="${RED}" fill-opacity=".09"/>
  ${ic(k, x + s * 0.3, y + s * 0.3, s * 0.4, RED, 1.9)}`;

function kapak(k) {
  // Arka plandaki yumuşak renk lekelerinin yeri her yazıda biraz farklı
  const blob = [[1250, 180], [300, 860], [1380, 820]][k.ton];
  const doc = { x: 300, y: 190, w: 620, h: 640 };
  const lines = [0, 1, 2, 3, 4].map((i) => `<rect x="${doc.x + 70}" y="${doc.y + 250 + i * 46}" width="${[460, 430, 470, 380, 300][i]}" height="16" rx="8" fill="#ececf0"/>`).join('');
  const steps = k.adimlar ? [0, 1, 2, 3].map((i) => {
    const cx = 1030 + i * 120, cy = 860;
    return `${i < 3 ? `<rect x="${cx}" y="${cy - 3}" width="120" height="6" rx="3" fill="${i < 2 ? RED : MUTED}"/>` : ''}
      <circle cx="${cx}" cy="${cy}" r="30" fill="${i < 3 ? RED : '#fff'}" stroke="${i < 3 ? RED : MUTED}" stroke-width="4"/>
      ${i < 3 ? ic('check', cx - 18, cy - 18, 36, '#fff', 2.4) : ''}`;
  }).join('') : '';
  const tiles = k.kutu.map((name, i) => {
    const pos = [[1060, 170], [1260, 330], [1040, 470], [1240, 570]][i];
    return tile(name, pos[0], pos[1], 150);
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="zemin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbfbfd"/><stop offset="1" stop-color="#eceef3"/></linearGradient>
    <radialGradient id="leke" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${RED}" stop-opacity=".16"/><stop offset="1" stop-color="${RED}" stop-opacity="0"/></radialGradient>
    <radialGradient id="leke2" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff8a5c" stop-opacity=".14"/><stop offset="1" stop-color="#ff8a5c" stop-opacity="0"/></radialGradient>
    <pattern id="nokta" width="34" height="34" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="2" fill="#1d1d1f" fill-opacity=".06"/></pattern>
    <filter id="golge" x="-20%" y="-20%" width="140%" height="150%"><feGaussianBlur in="SourceAlpha" stdDeviation="28"/><feOffset dy="34"/><feComponentTransfer><feFuncA type="linear" slope=".18"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="golge-k" x="-30%" y="-30%" width="160%" height="170%"><feGaussianBlur in="SourceAlpha" stdDeviation="14"/><feOffset dy="16"/><feComponentTransfer><feFuncA type="linear" slope=".13"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <linearGradient id="token" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a3a3c"/><stop offset="1" stop-color="#0f0f10"/></linearGradient>
    <linearGradient id="cip" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6dc86"/><stop offset="1" stop-color="#c79b33"/></linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#zemin)"/>
  <rect width="${W}" height="${H}" fill="url(#nokta)"/>
  <circle cx="${blob[0]}" cy="${blob[1]}" r="520" fill="url(#leke)"/>
  <circle cx="${W - blob[0]}" cy="${H - blob[1]}" r="440" fill="url(#leke2)"/>

  <!-- Belge -->
  <g filter="url(#golge)"><rect x="${doc.x}" y="${doc.y}" width="${doc.w}" height="${doc.h}" rx="40" fill="#fff"/></g>
  <rect x="${doc.x}" y="${doc.y}" width="${doc.w}" height="72" rx="40" fill="#f5f5f7"/>
  <rect x="${doc.x}" y="${doc.y + 40}" width="${doc.w}" height="32" fill="#f5f5f7"/>
  <circle cx="${doc.x + 44}" cy="${doc.y + 36}" r="9" fill="#ff5f57"/><circle cx="${doc.x + 74}" cy="${doc.y + 36}" r="9" fill="#febc2e"/><circle cx="${doc.x + 104}" cy="${doc.y + 36}" r="9" fill="#28c840"/>
  <!-- Konu rozeti -->
  <circle cx="${doc.x + 140}" cy="${doc.y + 170}" r="70" fill="${RED}" fill-opacity=".1"/>
  ${ic(k.ana, doc.x + 92, doc.y + 122, 96, RED, 1.7)}
  <rect x="${doc.x + 240}" y="${doc.y + 142}" width="300" height="22" rx="11" fill="${INK}" fill-opacity=".85"/>
  <rect x="${doc.x + 240}" y="${doc.y + 182}" width="210" height="16" rx="8" fill="${MUTED}"/>
  ${lines}
  <!-- İmza ve doğrulama -->
  <path d="M${doc.x + 70} ${doc.y + 560} c24 -40 44 -64 56 -52 s-18 54 0 48 30 -60 48 -54 -6 48 12 48 24 -36 42 -36 6 30 24 30 30 -24 54 -24 42 12 102 -6" fill="none" stroke="#1f3a8a" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="${doc.x + 360}" y="${doc.y + 528}" width="190" height="56" rx="28" fill="#1f9d55" fill-opacity=".12"/>
  ${ic('shield', doc.x + 378, doc.y + 538, 36, '#13713b', 2.2)}
  <rect x="${doc.x + 424}" y="${doc.y + 549}" width="104" height="14" rx="7" fill="#13713b" fill-opacity=".55"/>

  <!-- E-imza belirteci -->
  <g transform="rotate(-8 ${doc.x + 40} ${doc.y + doc.h})" filter="url(#golge-k)">
    <rect x="${doc.x - 90}" y="${doc.y + doc.h - 90}" width="300" height="150" rx="34" fill="url(#token)"/>
    <rect x="${doc.x - 50}" y="${doc.y + doc.h - 45}" width="64" height="52" rx="10" fill="url(#cip)"/>
    <rect x="${doc.x + 40}" y="${doc.y + doc.h - 34}" width="130" height="16" rx="8" fill="#fff" fill-opacity=".85"/>
    <rect x="${doc.x + 40}" y="${doc.y + doc.h - 6}" width="86" height="12" rx="6" fill="#fff" fill-opacity=".4"/>
  </g>

  <!-- Konu kutucukları -->
  ${tiles}
  ${steps}
</svg>`;
}

(async () => {
  const hepsi = process.argv.includes('--hepsi');
  let n = 0;
  for (const [slug, k] of Object.entries(KAPAKLAR)) {
    const out = path.join(OUT, slug + '.webp');
    if (!hepsi && fs.existsSync(out)) continue;
    const png = await sharp(Buffer.from(kapak(k)), { density: 72 }).png().toBuffer();
    await sharp(png).webp({ quality: 88 }).toFile(out);
    await sharp(png).resize(640, 400).webp({ quality: 84 }).toFile(path.join(OUT, slug + '-640.webp'));
    n++;
    console.log('✔', slug);
  }
  console.log(n ? `${n} kapak üretildi → assets/img/blog/` : 'Eksik kapak yok (yeniden üretmek için --hepsi)');
})();
