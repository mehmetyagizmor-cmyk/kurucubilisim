// Favicon, uygulama ikonları, OG paylaşım görseli ve web manifest üretir.
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const iconSvg = (size = 512, pad = 0) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="${size}" height="${size}">
<rect width="512" height="512" rx="${pad ? 112 : 0}" fill="#07080f"/>
<circle cx="256" cy="256" r="176" fill="#ff3131"/>
<text x="256" y="300" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="150" font-weight="300" letter-spacing="10" fill="#fff">CU</text>
</svg>`;

const ogSvg = (title, sub) => `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs>
  <radialGradient id="g1" cx="85%" cy="5%" r="60%"><stop offset="0" stop-color="#ff3131" stop-opacity=".55"/><stop offset="1" stop-color="#ff3131" stop-opacity="0"/></radialGradient>
  <radialGradient id="g2" cx="0%" cy="90%" r="55%"><stop offset="0" stop-color="#6c63ff" stop-opacity=".35"/><stop offset="1" stop-color="#6c63ff" stop-opacity="0"/></radialGradient>
  <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#fff" stroke-opacity=".05"/></pattern>
</defs>
<rect width="1200" height="630" fill="#07080f"/><rect width="1200" height="630" fill="url(#grid)"/>
<rect width="1200" height="630" fill="url(#g1)"/><rect width="1200" height="630" fill="url(#g2)"/>
<g font-family="Segoe UI, Arial, sans-serif">
  <text x="80" y="128" font-size="46" font-weight="300" letter-spacing="8" fill="#fff">KURU</text>
  <circle cx="290" cy="112" r="40" fill="#ff3131"/><text x="290" y="128" text-anchor="middle" font-size="40" font-weight="300" letter-spacing="3" fill="#fff">CU</text>
  <text x="350" y="122" font-size="20" font-weight="600" letter-spacing="5" fill="#a3a8c9">BİLİŞİM</text>
  <text x="80" y="330" font-size="66" font-weight="700" fill="#fff">${title}</text>
  <text x="80" y="410" font-size="32" fill="#c9cde6">${sub}</text>
  <rect x="80" y="480" width="120" height="6" rx="3" fill="#ff3131"/>
  <text x="80" y="550" font-size="26" fill="#a3a8c9">kurucubilisim.com  ·  0 (553) 559 92 31</text>
</g>
</svg>`;

// PNG'yi saran basit ICO dosyası
function pngToIco(png) {
  const h = Buffer.alloc(22);
  h.writeUInt16LE(0, 0); h.writeUInt16LE(1, 2); h.writeUInt16LE(1, 4);
  h.writeUInt8(32, 6); h.writeUInt8(32, 7); h.writeUInt8(0, 8); h.writeUInt8(0, 9);
  h.writeUInt16LE(1, 10); h.writeUInt16LE(32, 12); h.writeUInt32LE(png.length, 14); h.writeUInt32LE(22, 18);
  return Buffer.concat([h, png]);
}

module.exports = async function brand(DIST) {
  const dir = path.join(DIST, 'assets/img/brand');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'favicon.svg'), iconSvg(512, 1));
  const r = (size, pad) => sharp(Buffer.from(iconSvg(size, pad))).png();
  await r(180, 0).toFile(path.join(dir, 'apple-touch-icon.png'));
  await r(192, 1).toFile(path.join(dir, 'icon-192.png'));
  await r(512, 1).toFile(path.join(dir, 'icon-512.png'));
  await r(512, 0).toFile(path.join(dir, 'logo-512.png'));
  fs.writeFileSync(path.join(DIST, 'favicon.ico'), pngToIco(await r(32, 1).toBuffer()));
  await sharp(Buffer.from(ogSvg("A'dan Z'ye Dijital Dönüşüm", 'E-İmza · Mali Mühür · KEP · E-Fatura · Web Tasarım'))).jpeg({ quality: 86 }).toFile(path.join(dir, 'og-default.jpg'));

  fs.writeFileSync(path.join(DIST, 'site.webmanifest'), JSON.stringify({
    name: 'Kurucu Bilişim', short_name: 'Kurucu', lang: 'tr', start_url: '/', display: 'standalone',
    background_color: '#07080f', theme_color: '#07080f',
    icons: [{ src: '/assets/img/brand/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/assets/img/brand/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }],
  }, null, 2));
};

module.exports.ogSvg = ogSvg;
