// Ortak yardımcılar, ikonlar ve sayfa iskeleti (layout).
const { site, groups, services, applyForms } = require('./data');

const fs = require('fs');
const path = require('path');
const ASSET_VER = Date.now().toString(36);
// CSS küçültülüp her sayfaya gömülür (render-blocking istek yok)
const CSS = fs.readFileSync(path.join(__dirname, '../assets/css/style.css'), 'utf8')
  .replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([{};,>])\s*/g, '$1').replace(/;}/g, '}').trim();

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const abs = (p) => site.url + p;
const svcPath = (s) => `/${s.group}/${s.slug}/`;
const initials = (n) => n.split(' ').map((w) => w[0]).slice(0, 2).join('');

// Basit çizgi ikonlar (24x24, stroke)
const P = {
  doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
  pen: '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/><path d="M13.5 6.5l4 4M14 20h6"/>',
  seal: '<circle cx="12" cy="9" r="6"/><path d="M9 14.5 8 22l4-2 4 2-1-7.5"/><path d="m9.5 9 1.7 1.7L14.5 7.5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  book: '<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 21.5A2.5 2.5 0 0 1 6.5 19H20v3H6.5M9 7h7M9 11h5"/>',
  monitor: '<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4M6 13l3-3 2 2 4-4"/>',
  palette: '<path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.7-.9 1.7-1.8 0-.5-.2-.9-.5-1.2-.3-.4-.5-.8-.5-1.3 0-1 .8-1.7 1.8-1.7H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7.5" r="1"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><path d="M14 17.5h7M17.5 14v7"/>',
  cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L22 7H6"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  bolt: '<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>',
  coin: '<circle cx="12" cy="12" r="9"/><path d="M15 9.5c-.5-1-1.6-1.5-3-1.5-1.7 0-3 .8-3 2s1.3 1.7 3 2 3 .8 3 2-1.3 2-3 2c-1.4 0-2.5-.5-3-1.5M12 6v2M12 16v2"/>',
  pin: '<path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
  at: '<circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.9 7.9"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  chev: '<path d="m6 9 6 6 6-6"/>',
  check: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
  star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" fill="currentColor" stroke="none"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
  handshake: '<path d="m11 17 2 2a1.4 1.4 0 0 0 2-2"/><path d="m14 14 2.5 2.5a1.4 1.4 0 0 0 2-2l-3.9-3.9a3 3 0 0 0-4.2 0l-.9.9a1.4 1.4 0 0 1-2-2l2.8-2.8a5 5 0 0 1 5.7-1l.4.2a5 5 0 0 0 2.3.5H21"/><path d="m21 3 1 11h-2M3 3 2 14l6.5 6.5a1.4 1.4 0 0 0 2-2M3 4h8"/>',
  archive: '<rect x="2" y="3" width="20" height="5" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8M10 12h4"/>',
  truck: '<path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
  briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 4 13C4 7 11 3 11 3s7 4 7 10a7 7 0 0 1-7 7z"/><path d="M11 3v17"/>',
  receipt: '<path d="M4 2v20l3-2 3 2 3-2 3 2 3-2 3 2V2l-3 2-3-2-3 2-3-2-3 2-3-2zM8 8h8M8 12h8M8 16h4"/>',
  banknote: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/>',
  coffee: '<path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/>',
  ticket: '<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/><path d="M9 9h6M9 15h6"/>',
  sync: '<path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>',
  compass: '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
};
const icon = (k, cls = '') => `<svg${cls ? ` class="${cls}"` : ''} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[k] || P.spark}</svg>`;
const icBox = (k) => `<span class="ic">${icon(k)}</span>`;
const SOCIAL = {
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21H9z"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.7 15.1V8.9l5.8 3.1z"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.4zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8zm8.4-18.2A11.8 11.8 0 0 0 1.7 17.8L0 24l6.3-1.7A11.8 11.8 0 0 0 23.8 12c0-3.2-1.2-6.1-3.4-8.4z"/></svg>',
};

const logo = (sub = true) => `<span class="logo"><span class="logo__word">KURU<span class="logo__cu">CU</span></span>${sub ? '<span class="logo__sub">Bilişim<br>Dijital Dönüşüm</span>' : ''}</span>`;

const btn = (href, text, cls = 'btn--primary', arrow = true, extra = '') => `<a class="btn ${cls}" href="${href}"${extra}>${text}${arrow ? icon('arrow') : ''}</a>`;

const byGroup = (g) => services.filter((s) => s.group === g);
// Hizmetin gömülü başvuru formu varsa hizmet sayfasındaki forma, yoksa genel teklif formuna gider
const applyHref = (slug) => {
  const s = applyForms[slug] && services.find((x) => x.slug === slug);
  return s ? `${svcPath(s)}#basvuru` : '/basvuru-formu/' + (slug ? '?hizmet=' + slug : '');
};

function header(path) {
  const cur = (p) => (path === p ? ' aria-current="page"' : '');
  const svcLinks = (g) => byGroup(g).map((s) => `<a href="${svcPath(s)}">${icBox(s.icon)}<span><strong>${esc(s.short)}</strong><small>${esc(s.highlights[0][1].slice(0, 58))}…</small></span></a>`).join('');
  const eBelgeler = byGroup('e-donusum-hizmetleri').filter((s) => s.category === 'belge');
  const eGuvenlik = byGroup('e-donusum-hizmetleri').filter((s) => s.category !== 'belge');
  const eDonusumDropdown = `<div class="dropdown dropdown--edonusum">
    <div class="dropdown__group">
      <span class="dropdown__group-title">${icon('doc')} e-Belgeler</span>
      <div class="dropdown__grid-dense">
        ${eBelgeler.map((s) => `<a href="${svcPath(s)}">${icBox(s.icon)}<span><strong>${esc(s.short)}</strong></span></a>`).join('')}
      </div>
    </div>
    <div class="dropdown__group">
      <span class="dropdown__group-title">${icon('shield')} Güvenlik &amp; Danışmanlık</span>
      <div class="dropdown__list-sub">
        ${eGuvenlik.map((s) => `<a href="${svcPath(s)}">${icBox(s.icon)}<span><strong>${esc(s.short)}</strong><small>${esc(s.highlights[0][1].slice(0, 48))}…</small></span></a>`).join('')}
      </div>
    </div>
    <a class="dropdown__all" href="/e-donusum-hizmetleri/">Tüm E-Dönüşüm Hizmetlerini İncele →</a>
  </div>`;
  const corp = [['/hakkimizda/', 'Hakkımızda'], ['/vizyon-ve-misyonumuz/', 'Vizyon ve Misyon'], ['/referanslarimiz/', 'Referanslarımız'], ['/sikca-sorulan-sorular/', 'Sıkça Sorulan Sorular'], ['/is-ortagi-basvurusu/', 'İş Ortaklığı'], ['/banka-hesap-bilgilerimiz/', 'Banka Hesap Bilgileri']];
  const corpIcons = ['target', 'layers', 'star', 'doc', 'handshake', 'coin'];
  return `<a class="skip" href="#main">İçeriğe geç</a>
<header class="header">
  <div class="container header__in">
    <a href="/">${logo()}</a>
    <nav class="nav" aria-label="Ana menü">
      <div class="nav__item"><a class="nav__link" href="/e-donusum-hizmetleri/"${cur('/e-donusum-hizmetleri/')}>E-Dönüşüm ${icon('chev')}</a>
        ${eDonusumDropdown}</div>
      <div class="nav__item"><a class="nav__link" href="/dijital-hizmetler/"${cur('/dijital-hizmetler/')}>Dijital Hizmetler ${icon('chev')}</a>
        <div class="dropdown dropdown--mega">${svcLinks('dijital-hizmetler')}<a class="dropdown__all" href="/dijital-hizmetler/">Tüm Dijital Hizmetler</a></div></div>
      <div class="nav__item"><a class="nav__link" href="/hakkimizda/"${cur('/hakkimizda/')}>Kurumsal ${icon('chev')}</a>
        <div class="dropdown">${corp.map(([h, t], i) => `<a href="${h}">${icBox(corpIcons[i])}<span><strong>${t}</strong></span></a>`).join('')}</div></div>
      <div class="nav__item"><a class="nav__link" href="/blog/"${cur('/blog/')}>Blog</a></div>
      <div class="nav__item"><a class="nav__link" href="/iletisim/"${cur('/iletisim/')}>İletişim</a></div>
    </nav>
    <div class="header__cta">
      <a class="header__phone" href="tel:${site.phone}">${icon('phone')}${site.phoneDisplay}</a>
      ${btn('/basvuru-formu/', 'Teklif Al', 'btn--primary btn--sm', false)}
      <button class="burger" type="button" aria-label="Menüyü aç" aria-expanded="false" aria-controls="drawer"><span></span></button>
    </div>
  </div>
</header>
<div class="drawer" id="drawer">
  <details><summary>E-Dönüşüm ${icon('chev')}</summary><div>
    <div class="drawer__subhead">e-Belgeler</div>
    ${eBelgeler.map((s) => `<a href="${svcPath(s)}">${esc(s.short)}</a>`).join('')}
    <div class="drawer__subhead" style="margin-top:10px">Güvenlik &amp; Danışmanlık</div>
    ${eGuvenlik.map((s) => `<a href="${svcPath(s)}">${esc(s.short)}</a>`).join('')}
    <a href="/e-donusum-hizmetleri/" style="color:var(--brand-2);font-weight:700">Tüm E-Dönüşüm Hizmetleri →</a>
  </div></details>
  <details><summary>Dijital Hizmetler ${icon('chev')}</summary><div>${byGroup('dijital-hizmetler').map((s) => `<a href="${svcPath(s)}">${esc(s.short)}</a>`).join('')}<a href="/dijital-hizmetler/">Tümü →</a></div></details>
  <details><summary>Kurumsal ${icon('chev')}</summary><div>${corp.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}</div></details>
  <a href="/blog/">Blog</a>
  <a href="/iletisim/">İletişim</a>
  <div class="drawer__cta">${btn('/basvuru-formu/', 'Ücretsiz Teklif Al')}${btn('tel:' + site.phone, site.phoneDisplay, 'btn--ghost', false)}</div>
</div>`;
}

function footer() {
  const a = site.address;
  const col = (g) => byGroup(g).map((s) => `<li><a href="${svcPath(s)}">${esc(s.short)}</a></li>`).join('');
  return `<footer class="footer">
  <div class="container">
    <div class="footer__grid">
      <div class="footer__brand">
        <a href="/">${logo()}</a>
        <p>${esc(site.slogan)}. E-dönüşümden web tasarıma, işletmenizin tüm dijital ihtiyaçları tek çatı altında.</p>
        <div class="socials">
          <a href="${site.social.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${SOCIAL.instagram}</a>
          <a href="${site.social.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${SOCIAL.linkedin}</a>
          <a href="${site.social.youtube}" target="_blank" rel="noopener" aria-label="YouTube">${SOCIAL.youtube}</a>
          <a href="https://wa.me/${site.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">${SOCIAL.whatsapp}</a>
        </div>
      </div>
      <div><h2>E-Dönüşüm</h2><ul>${col('e-donusum-hizmetleri')}</ul></div>
      <div><h2>Dijital Hizmetler</h2><ul>${col('dijital-hizmetler')}</ul></div>
      <div><h2>İletişim</h2>
        <ul class="contact-list">
          <li>${icon('phone')}<a href="tel:${site.phone}">${site.phoneDisplay}</a></li>
          <li>${icon('at')}<a href="mailto:${site.email}">${site.email}</a></li>
          <li>${icon('pin')}<a href="${site.mapsUrl}" target="_blank" rel="noopener">${esc(a.street)}, ${a.postalCode} ${a.district}/${a.city}</a></li>
        </ul>
        <h2 style="margin-top:28px">Kurumsal</h2>
        <ul><li><a href="/hakkimizda/">Hakkımızda</a></li><li><a href="/referanslarimiz/">Referanslarımız</a></li><li><a href="/blog/">Blog</a></li><li><a href="/sikca-sorulan-sorular/">S.S.S.</a></li></ul>
      </div>
    </div>
    <div class="footer__bottom">
      <span>© <span data-year>${new Date().getFullYear()}</span> ${site.name}. Tüm hakları saklıdır.</span>
      <nav aria-label="Yasal"><a href="/kvkk-politikamiz/">KVKK</a><a href="/cerez-politikasi/">Çerez Politikası</a><a href="/sozlesme-kosullari/">Sözleşme Koşulları</a><a href="/banka-hesap-bilgilerimiz/">Banka Hesapları</a></nav>
    </div>
  </div>
</footer>
<div class="fab">
  <button class="fab__top" type="button" aria-label="Sayfanın başına dön">${icon('up')}</button>
  <a class="fab__wa" href="https://wa.me/${site.whatsapp}?text=${encodeURIComponent('Merhaba, hizmetleriniz hakkında bilgi almak istiyorum.')}" target="_blank" rel="noopener" aria-label="WhatsApp ile yazın">${SOCIAL.whatsapp}</a>
</div>
<div class="cookie" role="dialog" aria-live="polite" aria-label="Çerez bildirimi">
  <strong>Çerez Tercihleri</strong>
  Deneyiminizi iyileştirmek ve site trafiğini analiz etmek için çerezler kullanıyoruz. Ayrıntılar için <a href="/cerez-politikasi/">Çerez Politikası</a> ve <a href="/kvkk-politikamiz/">KVKK Aydınlatma Metni</a>’ni inceleyebilirsiniz.
  <div class="cookie__btns"><button class="btn btn--primary btn--sm" type="button" data-consent="yes">Kabul Et</button><button class="btn btn--ghost btn--sm" type="button" data-consent="no">Reddet</button></div>
</div>`;
}

const orgId = site.url + '/#organization';
function orgSchema() {
  const a = site.address;
  return {
    '@type': ['ProfessionalService', 'Organization'],
    '@id': orgId,
    name: site.name,
    url: site.url + '/',
    logo: abs('/assets/img/brand/logo-512.png'),
    image: abs('/assets/img/brand/og-default.jpg'),
    description: 'E-imza, mali mühür, KEP, e-fatura, e-defter, web tasarım, e-ticaret, ERP ve CRM çözümleri sunan İstanbul merkezli bilişim firması.',
    telephone: site.phone,
    email: site.email,
    address: { '@type': 'PostalAddress', streetAddress: a.street, addressLocality: a.district, addressRegion: a.city, postalCode: a.postalCode, addressCountry: a.country },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: site.mapsUrl,
    areaServed: { '@type': 'Country', name: 'Türkiye' },
    priceRange: '₺₺',
    sameAs: Object.values(site.social),
    contactPoint: { '@type': 'ContactPoint', telephone: site.phone, contactType: 'customer service', availableLanguage: ['Turkish'], areaServed: 'TR' },
  };
}

function crumbsSchema(items) {
  return { '@type': 'BreadcrumbList', itemListElement: items.map(([name, p], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(p) })) };
}
const crumbsHtml = (items) => `<nav aria-label="Sayfa yolu"><ol class="crumbs">${items.map(([n, p], i) => `<li>${i < items.length - 1 ? `<a href="${p}">${esc(n)}</a>` : `<span aria-current="page">${esc(n)}</span>`}</li>`).join('')}</ol></nav>`;

/**
 * Sayfa iskeleti
 * @param {object} o { path, title, desc, body, schema:[], noindex, ogImage, ogType, crumbs:[[name,path]], preload }
 */
function layout(o) {
  const canonical = abs(o.path);
  const og = o.ogImage ? abs(o.ogImage) : abs('/assets/img/brand/og-default.jpg');
  const graph = [{ '@type': 'WebSite', '@id': site.url + '/#website', url: site.url + '/', name: site.name, inLanguage: 'tr-TR', publisher: { '@id': orgId } }, orgSchema()];
  if (o.crumbs) graph.push(crumbsSchema(o.crumbs));
  (o.schema || []).forEach((s) => graph.push(s));
  const ld = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
  return `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(o.title)}</title>
<meta name="description" content="${esc(o.desc)}">
<meta name="robots" content="${o.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'}">
<link rel="canonical" href="${canonical}">
<meta property="og:locale" content="tr_TR">
<meta property="og:site_name" content="${site.name}">
<meta property="og:type" content="${o.ogType || 'website'}">
<meta property="og:title" content="${esc(o.title)}">
<meta property="og:description" content="${esc(o.desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${og}">
${o.ogImage ? '' : '<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n'}<meta name="twitter:card" content="summary_large_image">
${o.extraHead || ''}<meta name="theme-color" content="#ffffff">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/assets/img/brand/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/img/brand/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="alternate" type="application/rss+xml" title="${site.name} Blog" href="/feed.xml">
<link rel="preload" href="/assets/fonts/jakarta-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/jakarta-latin-ext.woff2" as="font" type="font/woff2" crossorigin>
<style>${CSS}</style>
${o.preload || ''}<script>document.documentElement.className+=' js';window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});try{if(localStorage.getItem('kb-consent')==='yes')gtag('consent','update',{analytics_storage:'granted',ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'})}catch(e){}</script>
<script>/* GTM: ilk etkileşimde veya sayfa yüklendikten 4 sn sonra (hız için) */(function(){var x=0;function g(){if(x)return;x=1;dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});var j=document.createElement('script');j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id=${site.gtm}';document.head.appendChild(j)}['scroll','pointerdown','keydown','touchstart'].forEach(function(e){addEventListener(e,g,{once:true,passive:true})});addEventListener('load',function(){setTimeout(g,4000)})})();</script>
<script type="application/ld+json">${ld}</script>
</head>
<body>
${header(o.path)}
<main id="main">
${o.body}
</main>
${footer()}
<script src="/assets/js/main.js?v=${ASSET_VER}" defer></script>
</body>
</html>
`;
}

// Ortak bölümler
const aurora = ''; // sade tasarım: dekoratif arka plan yok

function pageHero({ eyebrow, h1, lead, crumbs, actions = '' }) {
  return `<section class="hero hero--page">${aurora}
  <div class="container">
    ${crumbs ? crumbsHtml(crumbs) : ''}
    ${eyebrow ? `<span class="eyebrow">${esc(eyebrow)}</span>` : ''}
    <h1>${h1}</h1>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
    ${actions ? `<div class="hero__actions" style="margin:28px 0 0">${actions}</div>` : ''}
  </div>
</section>`;
}

function ctaBand(title = 'İşletmenizi dijitalde bir adım öne taşıyalım', text = 'Ücretsiz ön görüşmede ihtiyaçlarınızı dinleyelim, size özel çözümü ve net fiyatı aynı gün iletelim.') {
  return `<section class="section section--tight"><div class="container"><div class="cta" data-reveal>
  <div><h2>${esc(title)}</h2><p>${esc(text)}</p></div>
  <div class="cta__actions">${btn('/basvuru-formu/', 'Ücretsiz Teklif Al', 'btn--primary btn--lg')}${btn(`https://wa.me/${site.whatsapp}`, 'WhatsApp', 'btn--ghost btn--lg', false, ' target="_blank" rel="noopener"')}</div>
</div></div></section>`;
}

function faqBlock(list, light = false) {
  return `<div class="faq">${list.map(([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary>${esc(q)}<i aria-hidden="true"></i></summary><div class="faq__a"><p>${esc(a)}</p></div></details>`).join('')}</div>`;
}
const faqSchema = (list) => ({ '@type': 'FAQPage', mainEntity: list.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });

module.exports = { applyHref, esc, abs, svcPath, initials, icon, icBox, SOCIAL, logo, btn, byGroup, layout, aurora, pageHero, ctaBand, faqBlock, faqSchema, crumbsHtml, orgId };
