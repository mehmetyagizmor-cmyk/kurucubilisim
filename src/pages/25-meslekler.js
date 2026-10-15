// Mesleğe özel e-imza sayfaları (avukat, doktor, mühendis, müteahhit). İçerik: src/data.js → meslekler
const { site, services, meslekler } = require('../data');
const { layout, icon, icBox, btn, svcPath, pageHero, ctaBand, faqBlock, faqSchema, esc, abs, orgId, applyHref } = require('../lib');
const { serviceCard, stepsBlock, postCard, meslekPath, meslekCard, esigMock } = require('../components');
const { posts } = require('../posts');

module.exports = (ctx) => {
  const eimza = services.find((s) => s.slug === 'e-imza');
  const basvuru = applyHref('e-imza');

  for (const m of meslekler) {
    const p = meslekPath(m);
    const crumbs = [['Ana Sayfa', '/'], ['E-Dönüşüm Hizmetleri', '/e-donusum-hizmetleri/'], ['E-İmza', svcPath(eimza)], [m.short, p]];
    const related = posts.filter((x) => m.blog.test(x.slug)).slice(0, 3);
    const cross = m.related.map((slug) => services.find((s) => s.slug === slug)).filter(Boolean);
    const others = meslekler.filter((x) => x !== m);

    const body = `${pageHero({
      // Tireli kelimeler (E-Reçete gibi) satır sonunda bölünmesin
      eyebrow: `${m.name} için e-imza`, h1: esc(m.h1).replace(/(\S+-\S+)/g, '<span style="white-space:nowrap">$1</span>'), lead: esc(m.lead), crumbs,
      actions: btn(basvuru, 'E-İmza Başvurusu', 'btn--primary btn--lg') + btn(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Merhaba, ${m.short.toLocaleLowerCase('tr-TR')} hakkında bilgi almak istiyorum.`)}`, 'WhatsApp’tan Sorun', 'btn--ghost btn--lg', false, ' target="_blank" rel="noopener"'),
    })}
<section class="section" style="padding-top:0"><div class="container split">
  <div>
    <span class="eyebrow">Neden e-imza?</span>
    <h2>${esc(m.name)} için e-imza ne işe yarar?</h2>
    ${m.intro.map((t) => `<p class="lead" style="max-width:none">${esc(t)}</p>`).join('')}
  </div>
  ${esigMock(m)}
</div></section>
<section class="section section--light"><div class="container">
  <div class="section-head center"><span class="eyebrow">Kullanım alanları</span><h2>E-imzanızı nerelerde kullanırsınız?</h2></div>
  <div class="grid grid--3">${m.systems.map(([t, d, ic], i) => `<div class="card" data-reveal style="--d:${(i % 3) * 0.07}s">${icBox(ic)}<h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('')}</div>
</div></section>
<section class="section"><div class="container split">
  <div>
    <span class="eyebrow">Kurucu Bilişim farkı</span>
    <h2>Başvurudan ilk imzanıza kadar yanınızdayız</h2>
    <p class="lead" style="max-width:none">E-imzanızı almak işin yarısı; asıl önemli olan, ihtiyaç duyduğunuz an sorunsuz çalışması. Kurulumu uzaktan biz yapıyor, kullandığınız sistemde test ediyoruz.</p>
    <div class="hero__actions" style="margin:28px 0 0">${btn(basvuru, 'Hemen Başvur', 'btn--primary')}${btn('tel:' + site.phone, site.phoneDisplay, 'btn--ghost', false)}</div>
  </div>
  <div class="card" data-reveal style="padding:clamp(24px,3vw,40px)">
    <h3 style="margin-top:0">Hizmete dahil olanlar</h3>
    <ul class="list-check" style="margin-top:18px">${m.features.map((f) => `<li>${icon('check')}<span>${esc(f)}</span></li>`).join('')}</ul>
  </div>
</div></section>
<section class="section section--alt"><div class="container">
  <div class="section-head center"><span class="eyebrow">Süreç</span><h2>E-imza başvuru sürecimiz</h2><p class="lead">Başvurudan kuruluma kadar her adımı sizin yerinize takip ediyoruz.</p></div>${stepsBlock()}
</div></section>
<section class="section"><div class="container">
  <div class="section-head center"><span class="eyebrow">S.S.S.</span><h2>${esc(m.name)} için e-imza hakkında sık sorulanlar</h2></div>${faqBlock(m.faqs)}
</div></section>
${cross.length ? `<section class="section section--light"><div class="container">
  <div class="section-head"><span class="eyebrow">Birlikte kullanılan hizmetler</span><h2>İşinizi kolaylaştıracak diğer çözümler</h2></div>
  <div class="grid grid--3">${cross.map(serviceCard).join('')}</div>
</div></section>` : ''}
${related.length ? `<section class="section"><div class="container">
  <div class="section-head section-head--split"><div><span class="eyebrow">Rehberler</span><h2>E-imza hakkında yazılarımız</h2></div>${btn('/blog/', 'Tüm yazılar', 'btn--ghost')}</div>
  <div class="grid grid--3">${related.map(postCard).join('')}</div>
</div></section>` : ''}
<section class="section section--light"><div class="container">
  <div class="section-head"><span class="eyebrow">Diğer meslekler</span><h2>Mesleğinize özel e-imza</h2></div>
  <div class="grid grid--3">${others.map(meslekCard).join('')}</div>
</div></section>
${ctaBand(`${m.name} için e-imzanızı bugün alın`, 'Formu doldurun veya bizi arayın; başvurunuzu aynı gün işleme alalım, kurulumu uzaktan yapalım.')}`;

    ctx.add(p, layout({
      path: p, title: m.title, desc: m.desc, crumbs, body,
      schema: [
        faqSchema(m.faqs),
        {
          '@type': 'Service', '@id': abs(p) + '#service', name: m.short, serviceType: 'E-İmza', description: m.desc, url: abs(p),
          provider: { '@id': orgId }, areaServed: { '@type': 'Country', name: 'Türkiye' },
          audience: { '@type': 'Audience', audienceType: m.name },
          isRelatedTo: { '@type': 'Service', name: eimza.name, url: abs(svcPath(eimza)) },
        },
      ],
    }), { priority: '0.8' });
  }
};
