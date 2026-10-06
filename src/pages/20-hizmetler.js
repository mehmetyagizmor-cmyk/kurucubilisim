// Faz 3: Hizmet ana sayfaları (2) + hizmet detay sayfaları (11). URL'ler canlı siteyle aynıdır.
const { site, groups, services, testimonials, reasons, faqs } = require('../data');
const { layout, icon, icBox, btn, byGroup, svcPath, pageHero, ctaBand, faqBlock, faqSchema, esc, abs, orgId } = require('../lib');
const { serviceCard, stepsBlock, quoteCard, postCard, statsBlock } = require('../components');
const { posts } = require('../posts');

// Hizmete özel müşteri yorumu (varsa)
const quoteFor = { 'e-fatura': 0, 'e-imza': 0, 'kep-ik': 1, 'web-tasarim': 2, 'kurumsal-tasarim': 2 };

const actionsFor = (slug) => btn('/basvuru-formu/' + (slug ? '?hizmet=' + slug : ''), 'Ücretsiz Teklif Al', 'btn--primary btn--lg') +
  btn(`https://wa.me/${site.whatsapp}`, 'WhatsApp’tan Yazın', 'btn--ghost btn--lg', false, ' target="_blank" rel="noopener"');
const heroActions = actionsFor('');

module.exports = (ctx) => {
  // Hub sayfaları
  for (const [g, G] of Object.entries(groups)) {
    const p = `/${g}/`;
    const crumbs = [['Ana Sayfa', '/'], [G.name, p]];
    const list = byGroup(g);
    const groupFaqs = g === 'e-donusum-hizmetleri' ? [faqs[1], faqs[2], faqs[3]] : [faqs[4], faqs[5], faqs[7]];

    let servicesSection = '';
    if (g === 'e-donusum-hizmetleri') {
      const belgeler = list.filter((s) => s.category === 'belge');
      const guvenlik = list.filter((s) => s.category !== 'belge');
      servicesSection = `
<section class="section" style="padding-top:0"><div class="container">
  <div class="section-head center"><span class="eyebrow">e-Belge Çözümleri</span><h2>GİB Uyumlu Dijital Belgeler</h2><p class="lead">Kağıt, baskı ve kargo maliyetlerini sıfırlayan, Gelir İdaresi Başkanlığı standartlarına tam uyumlu e-belge çözümleri.</p></div>
  <div class="grid grid--3">${belgeler.map(serviceCard).join('')}</div>
</div></section>
<section class="section section--alt"><div class="container">
  <div class="section-head center"><span class="eyebrow">Kimlik, Altyapı &amp; Danışmanlık</span><h2>Güvenlik, İmza &amp; Entegrasyon</h2><p class="lead">E-dönüşümün yasal ön koşulu olan nitelikli sertifikalar, resmi yazışma altyapısı ve uzman geçiş danışmanlığı.</p></div>
  <div class="grid grid--3">${guvenlik.map(serviceCard).join('')}</div>
</div></section>`;
    } else {
      servicesSection = `<section class="section" style="padding-top:0"><div class="container"><h2 class="sr-only">${esc(G.name)} listesi</h2><div class="grid grid--3">${list.map(serviceCard).join('')}</div></div></section>`;
    }

    const body = `${pageHero({ eyebrow: 'Hizmetlerimiz', h1: esc(G.h1), lead: esc(G.lead), crumbs, actions: heroActions })}
${servicesSection}
<section class="section--tight"><div class="container">${statsBlock()}</div></section>
<section class="section section--light"><div class="container">
  <div class="section-head center"><span class="eyebrow">Neden biz?</span><h2>Güvenle ilerleyen bir dönüşüm</h2></div>
  <div class="grid grid--4">${reasons.map(([t, d], i) => `<div class="card" data-reveal style="--d:${i * 0.07}s">${icBox(['users', 'bolt', 'coin', 'pin'][i])}<h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
</div></section>
<section class="section section--alt"><div class="container">
  <div class="section-head center"><span class="eyebrow">Süreç</span><h2>Nasıl ilerliyoruz?</h2></div>${stepsBlock()}
</div></section>
<section class="section"><div class="container">
  <div class="section-head center"><span class="eyebrow">S.S.S.</span><h2>Sık sorulan sorular</h2></div>${faqBlock(groupFaqs)}
</div></section>
${ctaBand()}`;
    ctx.add(p, layout({
      path: p, title: G.title, desc: G.desc, crumbs, body,
      schema: [
        faqSchema(groupFaqs),
        { '@type': 'ItemList', name: G.name, itemListElement: list.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.name, url: abs(svcPath(s)) })) },
      ],
    }), { priority: '0.9' });
  }

  // Eski URL yönlendirmeleri (404 önleme & SEO uyumluluğu)
  const legacyRedirects = [
    ['/e-donusum-hizmetleri/e-belge/', '/e-donusum-hizmetleri/e-fatura/', 'E-Fatura Sayfasına Yönlendiriliyorsunuz', 'E-fatura ve e-belge çözümlerimiz için yeni sayfamıza yönlendiriliyorsunuz.'],
    ['/e-donusum-hizmetleri/e-defter-e-defter-saklama/', '/e-donusum-hizmetleri/e-defter/', 'E-Defter Sayfasına Yönlendiriliyorsunuz', 'E-defter ve saklama hizmetlerimiz için yeni sayfamıza yönlendiriliyorsunuz.'],
  ];
  for (const [from, to, title, desc] of legacyRedirects) {
    ctx.add(from, `<!doctype html><html lang="tr"><head><meta charset="utf-8"><title>${title} | Kurucu Bilişim</title><meta name="description" content="${desc}"><link rel="canonical" href="${abs(to)}"><meta http-equiv="refresh" content="0;url=${to}"><script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"${title}"}</script></head><body><h1>${title}</h1><script>location.href='${to}';</script><p><a href="${to}">Buraya tıklayarak devam edin</a>.</p></body></html>`);
  }

  // Hizmet detay sayfaları
  for (const s of services) {
    const p = svcPath(s);
    const G = groups[s.group];
    const crumbs = [['Ana Sayfa', '/'], [G.name, `/${s.group}/`], [s.short, p]];
    const related = posts.filter((x) => s.blog.test(x.slug)).slice(0, 3);
    const others = byGroup(s.group).filter((x) => x !== s);
    const q = quoteFor[s.slug];

    const body = `${pageHero({ eyebrow: G.name, h1: esc(s.h1), lead: esc(s.lead), crumbs, actions: actionsFor(s.slug) })}
<section class="section" style="padding-top:0"><div class="container">
  <h2 class="sr-only">Öne çıkan özellikler</h2>
  <div class="grid grid--3">${s.highlights.map(([t, d], i) => `<div class="card" data-reveal style="--d:${i * 0.08}s">${icBox(['bolt', 'shield', 'coin'][i])}<h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('')}</div>
</div></section>
<section class="section section--light"><div class="container split">
  <div>
    <span class="eyebrow">${esc(s.short)} hizmeti</span>
    <h2>${esc(s.name)} ile neler kazanırsınız?</h2>
    ${s.intro.map((t) => `<p class="lead" style="max-width:none">${esc(t)}</p>`).join('')}
    <div class="hero__actions" style="margin:28px 0 0">${btn('/basvuru-formu/?hizmet=' + s.slug, 'Başvuru / Teklif', 'btn--primary')}${btn('tel:' + site.phone, site.phoneDisplay, 'btn--ghost', false)}</div>
  </div>
  <div class="card" data-reveal style="padding:clamp(24px,3vw,40px)">
    <h3 style="margin-top:0">Hizmete dahil olanlar</h3>
    <ul class="list-check" style="margin-top:18px">${s.features.map((f) => `<li>${icon('check')}<span>${esc(f)}</span></li>`).join('')}</ul>
  </div>
</div></section>
<section class="section section--alt"><div class="container">
  <div class="section-head center"><span class="eyebrow">Süreç</span><h2>${esc(s.short)} sürecimiz</h2><p class="lead">Başvurudan teslime kadar her adımı sizin yerinize takip ediyoruz.</p></div>${stepsBlock()}
</div></section>
${q !== undefined ? `<section class="section section--tight"><div class="container" style="max-width:820px">${quoteCard(testimonials[q])}</div></section>` : ''}
<section class="section"><div class="container">
  <div class="section-head center"><span class="eyebrow">S.S.S.</span><h2>${esc(s.short)} hakkında sık sorulanlar</h2></div>${faqBlock(s.faqs)}
</div></section>
${related.length ? `<section class="section section--light"><div class="container">
  <div class="section-head section-head--split"><div><span class="eyebrow">Rehberler</span><h2>${esc(s.short)} hakkında yazılarımız</h2></div>${btn('/blog/', 'Tüm yazılar', 'btn--ghost')}</div>
  <div class="grid grid--3">${related.map(postCard).join('')}</div>
</div></section>` : ''}
<section class="section"><div class="container">
  <div class="section-head"><span class="eyebrow">Diğer hizmetler</span><h2>${esc(G.name)}</h2></div>
  <div class="grid grid--3">${others.slice(0, 3).map(serviceCard).join('')}</div>
</div></section>
${ctaBand(`${s.short} için hemen teklif alın`, 'Formu doldurun veya bizi arayın; ihtiyacınıza uygun paketi ve net fiyatı aynı gün iletelim.')}`;

    ctx.add(p, layout({
      path: p, title: s.title, desc: s.desc, crumbs, body,
      schema: [
        faqSchema(s.faqs),
        {
          '@type': 'Service', '@id': abs(p) + '#service', name: s.name, serviceType: s.short, description: s.desc, url: abs(p),
          provider: { '@id': orgId }, areaServed: { '@type': 'Country', name: 'Türkiye' },
          hasOfferCatalog: { '@type': 'OfferCatalog', name: s.name, itemListElement: s.features.map((f) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: f } })) },
        },
      ],
    }), { priority: '0.9' });
  }
};
