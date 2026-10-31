// Blog yazıları için konuya özel, marka uyumlu kapak çizimleri üretir.
// Her yazının kendi sahnesi var (avukat: terazi ve tokmak, KEP: zarf, ihale: resmi bina…), böylece kapaklar birbirine benzemez.
// Kullanım: node scripts/blog-gorselleri.js            → yalnızca görseli eksik yazılar
//           node scripts/blog-gorselleri.js --hepsi    → listedeki tüm kapakları yeniden üretir
//           node scripts/blog-gorselleri.js <slug>     → yalnızca o yazının kapağı
// Çıktı: assets/img/blog/<slug>.webp (1600×1000) ve <slug>-640.webp (640×400)
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { icon } = require('../src/lib');

const OUT = path.join(__dirname, '../assets/img/blog');
const W = 1600, H = 1000;
const RED = '#e3262b', INK = '#1d1d1f', MUTED = '#c7c7cc', LINE = '#ececf0', OK = '#1f9d55', NAVY = '#1f3a8a';

// ---------- Temel parçalar ----------
const TONES = {
  acik: { a: '#fbfbfd', b: '#eceef3', l1: RED, l2: '#ff8a5c', dot: '#1d1d1f' },
  sicak: { a: '#fffaf6', b: '#f6ebe4', l1: '#ff8a5c', l2: RED, dot: '#5a2a12' },
  serin: { a: '#f7f9fd', b: '#e6ecf6', l1: '#4f7cff', l2: RED, dot: '#14213d' },
  koyu: { a: '#121a2e', b: '#0a0f1c', l1: RED, l2: '#4f7cff', dot: '#ffffff' },
};
function bg(tone, blobs = [[1250, 180], [300, 860]]) {
  const t = TONES[tone];
  return `<defs>
    <linearGradient id="zemin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${t.a}"/><stop offset="1" stop-color="${t.b}"/></linearGradient>
    <radialGradient id="l1" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${t.l1}" stop-opacity="${tone === 'koyu' ? '.32' : '.16'}"/><stop offset="1" stop-color="${t.l1}" stop-opacity="0"/></radialGradient>
    <radialGradient id="l2" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${t.l2}" stop-opacity="${tone === 'koyu' ? '.26' : '.13'}"/><stop offset="1" stop-color="${t.l2}" stop-opacity="0"/></radialGradient>
    <pattern id="nokta" width="34" height="34" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="2" fill="${t.dot}" fill-opacity="${tone === 'koyu' ? '.07' : '.06'}"/></pattern>
    <filter id="g" x="-25%" y="-25%" width="150%" height="160%"><feGaussianBlur in="SourceAlpha" stdDeviation="26"/><feOffset dy="30"/><feComponentTransfer><feFuncA type="linear" slope="${tone === 'koyu' ? '.55' : '.17'}"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="gk" x="-30%" y="-30%" width="160%" height="170%"><feGaussianBlur in="SourceAlpha" stdDeviation="13"/><feOffset dy="14"/><feComponentTransfer><feFuncA type="linear" slope="${tone === 'koyu' ? '.5' : '.13'}"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <linearGradient id="token" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a3a3c"/><stop offset="1" stop-color="#0f0f10"/></linearGradient>
    <linearGradient id="cip" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6dc86"/><stop offset="1" stop-color="#c79b33"/></linearGradient>
    <linearGradient id="kirmizi" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff5a4f"/><stop offset="1" stop-color="#c8161b"/></linearGradient>
    <linearGradient id="ahsap" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9a6a42"/><stop offset="1" stop-color="#5e3a1f"/></linearGradient>
    <linearGradient id="altin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f8d77a"/><stop offset="1" stop-color="#d4a637"/></linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#zemin)"/><rect width="${W}" height="${H}" fill="url(#nokta)"/>
  <circle cx="${blobs[0][0]}" cy="${blobs[0][1]}" r="540" fill="url(#l1)"/><circle cx="${blobs[1][0]}" cy="${blobs[1][1]}" r="460" fill="url(#l2)"/>`;
}
// Site ikon setinden (24×24 çizgi ikon) belirli konum/boyut/renkte ikon
const ic = (k, x, y, s, color, sw = 1.8) =>
  `<g color="${color}">${icon(k).replace('<svg', `<svg x="${x}" y="${y}" width="${s}" height="${s}"`).replace('stroke-width="1.8"', `stroke-width="${sw}"`)}</g>`;
const card = (x, y, w, h, r = 36, fill = '#fff', f = 'g') => `<g filter="url(#${f})"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"/></g>`;
const lines = (x, y, widths, gap = 40, h = 14, fill = LINE) => widths.map((w, i) => `<rect x="${x}" y="${y + i * gap}" width="${w}" height="${h}" rx="${h / 2}" fill="${fill}"/>`).join('');
const tile = (k, x, y, s = 140) => `${card(x, y, s, s, s * 0.28, '#fff', 'gk')}<rect x="${x + s * .2}" y="${y + s * .2}" width="${s * .6}" height="${s * .6}" rx="${s * .17}" fill="${RED}" fill-opacity=".09"/>${ic(k, x + s * .3, y + s * .3, s * .4, RED, 1.9)}`;
const badge = (k, cx, cy, r, fill = RED) => `<g filter="url(#gk)"><circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/></g>${ic(k, cx - r * .55, cy - r * .55, r * 1.1, '#fff', 2)}`;
const signature = (x, y, s = 1, c = NAVY) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 0 c24 -40 44 -64 56 -52 s-18 54 0 48 30 -60 48 -54 -6 48 12 48 24 -36 42 -36 6 30 24 30 30 -24 54 -24 42 12 102 -6" fill="none" stroke="${c}" stroke-width="${6 / s}" stroke-linecap="round" stroke-linejoin="round"/>`;
const verified = (x, y) => `<rect x="${x}" y="${y}" width="200" height="56" rx="28" fill="${OK}" fill-opacity=".13"/>${ic('shield', x + 18, y + 10, 36, '#13713b', 2.2)}<rect x="${x + 66}" y="${y + 21}" width="110" height="14" rx="7" fill="#13713b" fill-opacity=".55"/>`;
const token = (x, y, rot = -8, s = 1) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" filter="url(#gk)"><rect width="300" height="150" rx="34" fill="url(#token)"/><rect x="40" y="45" width="64" height="52" rx="10" fill="url(#cip)"/><rect x="130" y="56" width="130" height="16" rx="8" fill="#fff" fill-opacity=".85"/><rect x="130" y="84" width="86" height="12" rx="6" fill="#fff" fill-opacity=".4"/></g>`;
const doc = (x, y, w, h, o = {}) => `${card(x, y, w, h, 30)}
  ${o.head ? `<rect x="${x}" y="${y}" width="${w}" height="64" rx="30" fill="#f5f5f7"/><rect x="${x}" y="${y + 34}" width="${w}" height="30" fill="#f5f5f7"/><circle cx="${x + 40}" cy="${y + 32}" r="8" fill="#ff5f57"/><circle cx="${x + 66}" cy="${y + 32}" r="8" fill="#febc2e"/><circle cx="${x + 92}" cy="${y + 32}" r="8" fill="#28c840"/>` : ''}
  ${lines(x + 56, y + (o.head ? 110 : 70), [w * .62, w * .72, w * .66, w * .48].map(Math.round), 40)}
  <rect x="${x + 56}" y="${y + (o.head ? 110 : 70) - 2}" width="${Math.round(w * .4)}" height="20" rx="10" fill="${INK}" fill-opacity=".82"/>`;
const envelope = (x, y, w, h) => `${card(x, y, w, h, 26)}<path d="M${x + 14} ${y + 18} L${x + w / 2} ${y + h * .58} L${x + w - 14} ${y + 18}" fill="none" stroke="${MUTED}" stroke-width="6" stroke-linejoin="round"/><path d="M${x + 14} ${y + h - 18} L${x + w * .38} ${y + h * .5}M${x + w - 14} ${y + h - 18} L${x + w * .62} ${y + h * .5}" stroke="${LINE}" stroke-width="5"/>`;
const clock = (cx, cy, r, h = -60, m = 60) => `<g filter="url(#g)"><circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff"/></g><circle cx="${cx}" cy="${cy}" r="${r - 22}" fill="none" stroke="${RED}" stroke-opacity=".18" stroke-width="10"/>
  ${[...Array(12)].map((_, i) => { const a = i * Math.PI / 6; return `<circle cx="${cx + Math.sin(a) * (r - 46)}" cy="${cy - Math.cos(a) * (r - 46)}" r="${i % 3 ? 4 : 7}" fill="${INK}" fill-opacity=".55"/>`; }).join('')}
  <line x1="${cx}" y1="${cy}" x2="${cx + Math.sin(h * Math.PI / 180) * r * .42}" y2="${cy - Math.cos(h * Math.PI / 180) * r * .42}" stroke="${INK}" stroke-width="12" stroke-linecap="round"/>
  <line x1="${cx}" y1="${cy}" x2="${cx + Math.sin(m * Math.PI / 180) * r * .62}" y2="${cy - Math.cos(m * Math.PI / 180) * r * .62}" stroke="${RED}" stroke-width="8" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="12" fill="${RED}"/>`;
// Resmi bina (sütunlu)
const govt = (x, y, w, h, fill = '#fff') => {
  const cols = 5, cw = w * .09, gap = (w - 80 - cols * cw) / (cols - 1);
  return `<g filter="url(#g)"><path d="M${x - 20} ${y + h * .28} L${x + w / 2} ${y} L${x + w + 20} ${y + h * .28} Z" fill="${fill}"/>
  <rect x="${x}" y="${y + h * .3}" width="${w}" height="${h * .06}" fill="${fill}"/>
  ${[...Array(cols)].map((_, i) => `<rect x="${x + 40 + i * (cw + gap)}" y="${y + h * .38}" width="${cw}" height="${h * .48}" rx="6" fill="${fill}"/>`).join('')}
  <rect x="${x - 30}" y="${y + h * .88}" width="${w + 60}" height="${h * .12}" rx="8" fill="${fill}"/></g>
  <circle cx="${x + w / 2}" cy="${y + h * .17}" r="${h * .06}" fill="${RED}" fill-opacity=".85"/>`;
};
const towers = (x, y, fill = '#fff') => [[0, 160, 150, 420], [170, 60, 170, 520], [360, 220, 130, 360]].map(([dx, dy, w, h]) => `${card(x + dx, y + dy, w, h, 14, fill)}
  ${[...Array(Math.floor((h - 60) / 60))].map((_, r) => [0, 1, 2].map((c) => `<rect x="${x + dx + 22 + c * (w - 44) / 3}" y="${y + dy + 34 + r * 60}" width="${(w - 44) / 3 - 14}" height="28" rx="5" fill="${(r + c) % 4 ? '#e6ecf6' : RED}" fill-opacity="${(r + c) % 4 ? 1 : .35}"/>`).join('')).join('')}`).join('');
const laptop = (x, y, w) => { const h = w * .62; return `${card(x, y, w, h, 24, '#1d1d1f')}<rect x="${x + 18}" y="${y + 18}" width="${w - 36}" height="${h - 36}" rx="10" fill="#fff"/>
  <g filter="url(#gk)"><path d="M${x - w * .08} ${y + h} H${x + w * 1.08} L${x + w * 1.02} ${y + h + 34} H${x - w * .02} Z" fill="#d9dbe1"/></g><rect x="${x + w * .42}" y="${y + h}" width="${w * .16}" height="10" rx="5" fill="#b9bcc4"/>`; };
const shield = (cx, cy, s, fill = 'url(#kirmizi)') => `<g filter="url(#g)"><path transform="translate(${cx - 120 * s} ${cy - 150 * s}) scale(${s})" d="M120 0 L240 44 V140 C240 220 180 270 120 300 C60 270 0 220 0 140 V44 Z" fill="${fill}"/></g>`;
const gavel = (x, y, s = 1, rot = -32) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" filter="url(#gk)"><rect x="-26" y="40" width="52" height="300" rx="20" fill="url(#ahsap)"/><rect x="-130" y="-40" width="260" height="110" rx="34" fill="url(#ahsap)"/><rect x="-142" y="-40" width="40" height="110" rx="16" fill="#3e2614"/><rect x="102" y="-40" width="40" height="110" rx="16" fill="#3e2614"/></g>
  <g filter="url(#gk)"><rect x="${x - 40}" y="${y + 230 * s}" width="${260 * s}" height="${44 * s}" rx="${16 * s}" fill="url(#ahsap)"/></g>`;
const seal = (cx, cy, r, color = RED) => `<g filter="url(#gk)"><circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}"/></g><circle cx="${cx}" cy="${cy}" r="${r * .78}" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="5" stroke-dasharray="6 9"/>${ic('seal', cx - r * .45, cy - r * .45, r * .9, '#fff', 2)}`;
const idCard = (x, y, w, h) => `${card(x, y, w, h, 28)}<rect x="${x}" y="${y}" width="${w}" height="${h * .2}" rx="28" fill="${RED}" fill-opacity=".9"/><rect x="${x}" y="${y + h * .1}" width="${w}" height="${h * .1}" fill="${RED}" fill-opacity=".9"/>
  <rect x="${x + 40}" y="${y + h * .32}" width="${w * .28}" height="${h * .52}" rx="16" fill="#eef0f4"/><circle cx="${x + 40 + w * .14}" cy="${y + h * .48}" r="${w * .07}" fill="${MUTED}"/><path d="M${x + 40 + w * .04} ${y + h * .82} a${w * .1} ${w * .1} 0 0 1 ${w * .2} 0" fill="${MUTED}"/>
  ${lines(x + 80 + w * .28, y + h * .36, [w * .44, w * .36, w * .4, w * .26].map(Math.round), h * .12, 14)}`;
const checklist = (x, y, w, rows, done) => `${card(x, y, w, 90 + rows * 86, 30)}<rect x="${x + w * .32}" y="${y - 22}" width="${w * .36}" height="44" rx="16" fill="#3a3a3c"/>
  ${[...Array(rows)].map((_, i) => { const yy = y + 70 + i * 86, on = i < done; return `<rect x="${x + 40}" y="${yy}" width="44" height="44" rx="12" fill="${on ? OK : '#fff'}" stroke="${on ? OK : MUTED}" stroke-width="4"/>${on ? `<path d="M${x + 51} ${yy + 23} l9 9 l16 -18" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>` : ''}${lines(x + 110, yy + 14, [Math.round(w * (.6 - (i % 2) * .14))], 0, 16)}`; }).join('')}`;
const coins = (x, y, n, w = 150) => [...Array(n)].map((_, i) => `<ellipse cx="${x + w / 2}" cy="${y - i * 26 + 26}" rx="${w / 2}" ry="${w * .2}" fill="#c79b33"/><rect x="${x}" y="${y - i * 26}" width="${w}" height="26" fill="url(#altin)"/><ellipse cx="${x + w / 2}" cy="${y - i * 26}" rx="${w / 2}" ry="${w * .2}" fill="#f8d77a" stroke="#c79b33" stroke-width="3"/>`).join('');
const hub = (cx, cy, items, r) => items.map((k, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / items.length, x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r * .82; return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="${RED}" stroke-opacity=".28" stroke-width="5" stroke-dasharray="4 14" stroke-linecap="round"/>${tile(k, x - 82, y - 82, 164)}`; }).join('');
const lock = (cx, cy, s) => `<path d="M${cx - 50 * s} ${cy} v-40 a${50 * s} ${50 * s} 0 0 1 ${100 * s} 0 v40" fill="none" stroke="${INK}" stroke-width="${18 * s}" stroke-linecap="round"/><g filter="url(#gk)"><rect x="${cx - 80 * s}" y="${cy - 6 * s}" width="${160 * s}" height="${130 * s}" rx="${28 * s}" fill="url(#kirmizi)"/></g><circle cx="${cx}" cy="${cy + 50 * s}" r="${16 * s}" fill="#fff"/><rect x="${cx - 6 * s}" y="${cy + 54 * s}" width="${12 * s}" height="${36 * s}" rx="${6 * s}" fill="#fff"/>`;
const refund = (cx, cy, r) => `<path d="M${cx + r} ${cy} A${r} ${r} 0 1 1 ${cx + r * .5} ${cy - r * .866}" fill="none" stroke="${OK}" stroke-width="22" stroke-linecap="round"/><path d="M${cx + r * .5 - 46} ${cy - r * .866 - 40} L${cx + r * .5 + 12} ${cy - r * .866 + 4} L${cx + r * .5 - 54} ${cy - r * .866 + 44}" fill="none" stroke="${OK}" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>`;
const bookStack = (x, y) => [[0, 0, 360, RED], [24, -64, 320, '#1f3a8a'], [-10, -128, 340, '#3a3a3c']].map(([dx, dy, w, c]) => `<g filter="url(#gk)"><rect x="${x + dx}" y="${y + dy}" width="${w}" height="60" rx="10" fill="${c}"/></g><rect x="${x + dx + w - 70}" y="${y + dy + 10}" width="58" height="40" rx="6" fill="#fff" fill-opacity=".9"/><rect x="${x + dx + 30}" y="${y + dy + 24}" width="${w * .4}" height="12" rx="6" fill="#fff" fill-opacity=".45"/>`).join('');

// ---------- Konuya özel sahneler ----------
const SAHNELER = {
  // E-imza yazıları
  'kurumsal-dijitallesmede-e-imzanin-rolu': () => `${bg('serin', [[1300, 160], [260, 880]])}
    ${towers(170, 230)}
    ${doc(800, 250, 470, 520, { head: true })}${signature(860, 650, .9)}${verified(1020, 680)}
    ${tile('users', 1310, 210)}${tile('layers', 1330, 420)}${token(640, 760, -10, .85)}`,
  'avukatlar-icin-e-imza-uyap-ve-dijital-dava-sureclerinde-kullanim': () => `${bg('sicak', [[1200, 220], [320, 840]])}
    <circle cx="470" cy="470" r="300" fill="${RED}" fill-opacity=".07"/>${ic('scales', 210, 200, 520, RED, 1.25)}
    ${doc(860, 190, 470, 560, { head: true })}${signature(920, 640, .9)}<rect x="1150" y="226" width="140" height="44" rx="22" fill="${NAVY}" fill-opacity=".12"/><rect x="1172" y="241" width="96" height="14" rx="7" fill="${NAVY}" fill-opacity=".6"/>
    ${gavel(1210, 720, .78, -30)}`,
  'e-imza-ile-uzaktan-calisma-surecleri-nasil-kolaylasir': () => `${bg('acik', [[1320, 760], [300, 200]])}
    ${laptop(330, 270, 760)}${lines(420, 380, [420, 520, 480, 360], 46, 16)}<rect x="420" y="376" width="300" height="22" rx="11" fill="${INK}" fill-opacity=".8"/>${signature(430, 610, .95)}${verified(760, 580)}
    ${badge('pin', 1280, 250, 86)}${tile('clock', 1260, 420, 150)}${tile('link', 1250, 640, 130)}`,
  'e-imza-nasil-alinir-adim-adim-basvuru-rehberi': () => `${bg('acik', [[260, 200], [1350, 860]])}
    ${[['doc', 'Başvuru'], ['users', 'Kimlik'], ['truck', 'Teslim'], ['monitor', 'Kurulum']].map(([k], i) => {
      const x = 170 + i * 330, y = 330 + (i % 2) * 120, on = i < 3;
      return `${i < 3 ? `<path d="M${x + 250} ${y + 120} C${x + 300} ${y + 120} ${x + 300} ${y + 120 + ((i + 1) % 2 ? 120 : -120)} ${x + 330} ${y + 120 + ((i + 1) % 2 ? 120 : -120)}" fill="none" stroke="${on && i < 2 ? RED : MUTED}" stroke-width="8" stroke-dasharray="2 16" stroke-linecap="round"/>` : ''}
        ${card(x, y, 250, 240, 40)}<circle cx="${x + 125}" cy="${y + 100}" r="58" fill="${on ? RED : '#eef0f4'}" fill-opacity="${on ? .12 : 1}"/>${ic(k, x + 95, y + 70, 60, on ? RED : '#8e8e93', 2)}
        ${lines(x + 60, y + 182, [130], 0, 16, on ? '#d9dbe1' : LINE)}
        <circle cx="${x + 216}" cy="${y + 34}" r="22" fill="${on ? OK : '#fff'}" stroke="${on ? OK : MUTED}" stroke-width="4"/>${on ? `<path d="M${x + 206} ${y + 34} l7 7 l12 -14" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>` : `<text x="${x + 216}" y="${y + 43}"/>`}`;
    }).join('')}${token(1090, 160, 8, .8)}`,
  'ekap-islemlerinde-e-imza-kamu-ihalelerine-dijital-katilim-rehberi': () => `${bg('koyu', [[1250, 200], [280, 860]])}
    ${govt(170, 260, 560, 500, '#e9edf5')}
    ${doc(860, 220, 440, 540, { head: true })}${signature(915, 630, .85)}${seal(1250, 700, 78)}
    ${badge('clock', 1390, 230, 74)}`,
  'e-imzanin-yasal-gecerliligi-5070-sayili-kanun-ve-hukuki-sonuclari': () => `${bg('koyu', [[400, 260], [1300, 840]])}
    ${shield(520, 470, 1.35)}${ic('scales', 400, 330, 240, '#fff', 1.6)}
    ${bookStack(880, 720)}${doc(930, 170, 420, 400)}${signature(985, 470, .8)}${verified(1090, 490)}`,
  'e-imza-basvurusu-gerekli-belgeler-sartlar-ve-basvuru-turleri': () => `${bg('sicak', [[1300, 180], [300, 880]])}
    ${idCard(180, 300, 620, 380)}${checklist(900, 210, 470, 5, 3)}${token(260, 720, -6, .75)}`,
  'e-imza-kullanim-alanlari-elektronik-imza-nerelerde-kullanilir': () => `${bg('serin', [[800, 500], [1400, 900]])}
    ${hub(800, 500, ['scales', 'stethoscope', 'briefcase', 'banknote', 'monitor', 'mail', 'crane', 'doc'], 470)}
    ${token(610, 400, -8, 1.3)}`,
  // Tekrarlanan eski görsellerin yerine
  'kep-ve-elektronik-fatura-gonderimi-dijital-faturalama-cozumleri': () => `${bg('acik', [[1250, 240], [300, 820]])}
    ${doc(420, 140, 440, 470)}<rect x="476" y="200" width="150" height="40" rx="12" fill="${RED}" fill-opacity=".12"/>${ic('receipt', 490, 204, 32, RED, 2)}${lines(640, 210, [150], 0, 18, INK)}
    ${envelope(300, 460, 700, 380)}${seal(980, 470, 86)}
    ${tile('mail', 1180, 230, 150)}${tile('shield', 1230, 470, 130)}`,
  'kep-ve-iletisimde-zaman-damgasi-dijital-gonderilerin-takibi': () => `${bg('koyu', [[400, 300], [1250, 800]])}
    ${envelope(200, 330, 640, 380)}${clock(1040, 450, 250, 300, 60)}
    <g filter="url(#gk)"><rect x="840" y="760" width="400" height="70" rx="35" fill="#fff"/></g>${ic('check', 866, 777, 36, OK, 2.4)}${lines(918, 788, [280], 0, 14, '#d9dbe1')}`,
  'e-bordroda-kvkk-uyum-sureci-ve-veri-guvenligi': () => `${bg('serin', [[1300, 220], [260, 860]])}
    ${card(300, 180, 520, 640, 30)}<rect x="300" y="180" width="520" height="120" rx="30" fill="${NAVY}" fill-opacity=".9"/><rect x="300" y="250" width="520" height="50" fill="${NAVY}" fill-opacity=".9"/>${lines(350, 222, [200], 0, 18, '#fff')}
    ${[0, 1, 2, 3, 4].map((i) => `${lines(350, 350 + i * 70, [200], 0, 16)}${lines(640, 350 + i * 70, [130], 0, 16, i === 4 ? INK : '#d9dbe1')}`).join('')}<rect x="350" y="680" width="420" height="4" fill="${LINE}"/>
    ${lock(1100, 470, 1.6)}${tile('users', 1290, 650, 140)}`,
  'kep-ve-kamu-sektoru-devletle-dijital-yazismalar': () => `${bg('serin', [[300, 200], [1300, 860]])}
    ${govt(900, 230, 520, 470)}
    ${[[160, 430, .9], [430, 300, .7], [470, 600, .6]].map(([x, y, s]) => `${envelope(x, y, 360 * s, 220 * s)}`).join('')}
    <path d="M760 450 C820 450 820 420 880 420" fill="none" stroke="${RED}" stroke-width="8" stroke-dasharray="3 18" stroke-linecap="round"/>${badge('shield', 820, 760, 64, OK)}`,
  'mali-muhur-ve-vergi-iadeleri-dijital-imzalar-ile-iade-sureclerinin-hizlandirilmasi': () => `${bg('sicak', [[1250, 220], [300, 860]])}
    ${doc(260, 180, 440, 580)}${seal(640, 690, 90)}
    ${refund(1050, 470, 190)}${coins(975, 590, 5, 150)}${tile('receipt', 1290, 680, 130)}`,
  'mali-muhur-ve-dijital-hukuki-belgeler-dijital-imzalarin-yasal-gecerliligi': () => `${bg('acik', [[260, 220], [1340, 840]])}
    ${doc(640, 170, 520, 640, { head: true })}${signature(700, 640, .9)}${seal(1120, 690, 104)}
    ${gavel(330, 470, .8, -24)}${tile('book', 1300, 230, 150)}`,
  // Kâğıt faturadan e-Arşiv'e geçiş: koçan → portal
  'kagit-fatura-kalkiyor-mu-e-arsiv-2027': () => `${bg('sicak', [[1280, 220], [280, 860]])}
    ${doc(170, 210, 430, 560)}<rect x="226" y="600" width="180" height="44" rx="22" fill="${RED}" fill-opacity=".12"/>${ic('receipt', 240, 606, 32, RED, 2)}
    ${badge('arrow', 730, 490, 78)}
    ${laptop(880, 240, 560)}${lines(960, 330, [300, 380, 340, 240], 42, 15)}<rect x="960" y="326" width="210" height="22" rx="11" fill="${INK}" fill-opacity=".8"/>${verified(960, 500)}
    ${tile('archive', 1290, 640, 140)}${badge('check', 1190, 740, 56, OK)}`,
};

(async () => {
  const args = process.argv.slice(2);
  const hepsi = args.includes('--hepsi');
  const tek = args.filter((a) => !a.startsWith('--'));
  let n = 0;
  for (const [slug, sahne] of Object.entries(SAHNELER)) {
    if (tek.length && !tek.includes(slug)) continue;
    const out = path.join(OUT, slug + '.webp');
    if (!hepsi && !tek.length && fs.existsSync(out)) continue;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${sahne()}</svg>`;
    const png = await sharp(Buffer.from(svg), { density: 72 }).png().toBuffer();
    await sharp(png).webp({ quality: 88 }).toFile(out);
    await sharp(png).resize(640, 400).webp({ quality: 84 }).toFile(path.join(OUT, slug + '-640.webp'));
    n++;
    console.log('✔', slug);
  }
  console.log(n ? `${n} kapak üretildi → assets/img/blog/` : 'Üretilecek kapak yok (tümü için --hepsi)');
})();
