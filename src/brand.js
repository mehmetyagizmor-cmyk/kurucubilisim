// Favicon, uygulama ikonları, OG paylaşım görseli ve web manifest üretir.
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const iconSvg = (size = 512, pad = 0) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="${size}" height="${size}">
<rect width="512" height="512" rx="${pad ? 112 : 0}" fill="#ffffff"/>
<circle cx="256" cy="256" r="176" fill="#ff3131"/>
<text x="256" y="300" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="150" font-weight="300" letter-spacing="10" fill="#fff">CU</text>
</svg>`;

// Açık tema paylaşım görseli: beyaz zemin, iri koyu başlık, kırmızı vurgu
const ogSvg = (title, sub) => `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs>
  <radialGradient id="g1" cx="92%" cy="0%" r="65%"><stop offset="0" stop-color="#ff3131" stop-opacity=".22"/><stop offset="1" stop-color="#ff3131" stop-opacity="0"/></radialGradient>
  <linearGradient id="t" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#e3262b"/><stop offset=".55" stop-color="#ff5a36"/><stop offset="1" stop-color="#ff8a3d"/></linearGradient>
</defs>
<rect width="1200" height="630" fill="#ffffff"/><rect width="1200" height="630" fill="url(#g1)"/>
<g font-family="Segoe UI, Arial, sans-serif">
  <text x="80" y="128" font-size="46" font-weight="300" letter-spacing="8" fill="#1d1d1f">KURU</text>
  <circle cx="258" cy="112" r="40" fill="#ff3131"/><text x="258" y="128" text-anchor="middle" font-size="40" font-weight="300" letter-spacing="3" fill="#fff">CU</text>
  <text x="318" y="122" font-size="20" font-weight="600" letter-spacing="5" fill="#6e6e73">BİLİŞİM</text>
  <text x="80" y="320" font-size="72" font-weight="700" letter-spacing="-2" fill="#1d1d1f">${title}</text>
  <text x="80" y="402" font-size="72" font-weight="700" letter-spacing="-2" fill="url(#t)">Tek çatı altında.</text>
  <text x="80" y="470" font-size="30" fill="#6e6e73">${sub}</text>
  <text x="80" y="560" font-size="26" fill="#86868b">kurucubilisim.com  ·  0 (553) 559 92 31</text>
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
  await sharp(Buffer.from(ogSvg('Dijital dönüşüm.', 'E-İmza · Mali Mühür · KEP · E-Fatura · Web Tasarım'))).jpeg({ quality: 86 }).toFile(path.join(dir, 'og-default.jpg'));

  fs.writeFileSync(path.join(DIST, 'site.webmanifest'), JSON.stringify({
    name: 'Kurucu Bilişim', short_name: 'Kurucu', lang: 'tr', start_url: '/', display: 'standalone',
    background_color: '#ffffff', theme_color: '#ffffff',
    icons: [{ src: '/assets/img/brand/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/assets/img/brand/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }],
  }, null, 2));
};

module.exports.ogSvg = ogSvg;
