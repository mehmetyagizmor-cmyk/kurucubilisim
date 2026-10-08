// Faz 3: Hizmet ana sayfaları (2) + hizmet detay sayfaları (11). URL'ler canlı siteyle aynıdır.
const { site, groups, services, testimonials, reasons, faqs, applyForms } = require('../data');
const { layout, icon, icBox, btn, byGroup, svcPath, pageHero, ctaBand, faqBlock, faqSchema, esc, abs, orgId, applyHref } = require('../lib');
const { serviceCard, stepsBlock, quoteCard, postCard, statsBlock } = require('../components');
const { posts } = require('../posts');

// Hizmete özel müşteri yorumu (varsa)
const quoteFor = { 'e-fatura': 0, 'e-imza': 0, 'kep-ik': 1, 'web-tasarim': 2, 'kurumsal-tasarim': 2 };

const actionsFor = (slug) => btn(applyForms[slug] ? '#basvuru' : applyHref(slug), applyForms[slug] ? 'Hemen Başvur' : 'Ücretsiz Teklif Al', 'btn--primary btn--lg') +
  btn(`https://wa.me/${site.whatsapp}`, 'WhatsApp’tan Yazın', 'btn--ghost btn--lg', false, ' target="_blank" rel="noopener"');
const heroActions = actionsFor('');

// Başvuru formu: sorular Google Form'dan (src/content/apply-forms.json), tasarım sitenin.
// Yanıtlar main.js tarafından doğrudan Google Form'a gönderilir.
const applyData = require('../content/apply-forms.json');
const cleanLabel = (t) => t.replace(/\s*\*+\s*$/, '').replace(/\s+/g, ' ').trim();
const cleanOpt = (t) => t.replace(/[-\s]+$/, '').trim();
function applyField(it, i) {
  const id = `af-${it.entry}`, name = `entry.${it.entry}`, req = it.required ? ' required' : '';
  const label = cleanLabel(it.label);
  const star = it.required ? ' <span class="req" aria-hidden="true">*</span>' : ' <span class="opt">(isteğe bağlı)</span>';
  const help = it.help ? `<small class="field__help">${esc(it.help)}</small>` : '';
  if (it.type === 'radio' || it.type === 'checkbox') {
    const t = it.type;
    return `<fieldset class="field field--full"${t === 'checkbox' && it.required ? ' data-need-one' : ''}><legend>${esc(label)}${star}</legend>${help}<div class="checks">${it.options.map((o, k) => `<label><input type="${t}" name="${name}" value="${esc(o)}"${t === 'radio' && k === 0 ? req : ''}>${esc(cleanOpt(o))}</label>`).join('')}</div></fieldset>`;
  }
  let control;
  if (it.type === 'select') {
    control = `<select id="${id}" name="${name}"${req}><option value="">Seçin</option>${it.options.map((o) => `<option>${esc(o)}</option>`).join('')}</select>`;
  } else if (it.type === 'date') {
    control = `<input id="${id}" type="date" data-date="${name}" max="${new Date().toISOString().slice(0, 10)}"${req}>`;
  } else if (/adres/i.test(label)) {
    control = `<textarea id="${id}" name="${name}" rows="3"${req} autocomplete="street-address"></textarea>`;
  } else {
    let attrs = ' type="text"';
    if (/e-?posta|mail/i.test(label)) attrs = ' type="email" autocomplete="email"';
    else if (/VKN|Vergi Numarası/i.test(label)) attrs = ' type="text" inputmode="numeric" pattern="[0-9]{10,11}" maxlength="11" data-tax';
    else if (/TCKN|Kimlik No/i.test(label)) attrs = ' type="text" inputmode="numeric" pattern="[0-9]{11}" maxlength="11" data-tckn';
    else if (/telefon|cep|iletişim numarası/i.test(label)) attrs = ' type="tel" inputmode="tel" autocomplete="tel" pattern="[0-9 +()\\-]{10,20}" placeholder="05xx xxx xx xx"';
    else if (/kontör|adet/i.test(label)) attrs = ' type="number" inputmode="numeric" min="1"';
    control = `<input id="${id}" name="${name}"${attrs}${req}>`;
  }
  const full = (it.type === 'paragraph' && /adres/i.test(label)) || label.length > 44; // uzun etiket satır hizasını bozmasın
  return `<div class="field${full ? ' field--full' : ''}"><label for="${id}">${esc(label)}${star}</label>${help}${control}</div>`;
}
const applySection = (s, f) => {
  const form = applyData[s.slug];
  if (!form) throw new Error('apply-forms.json içinde yok: ' + s.slug + ' (node forms-sync.js çalıştırın)');
  const groups = [{ title: f.first, desc: '', fields: [] }];
  for (const it of form.items) {
    if (it.type === 'section') {
      const [t, ...rest] = it.title.split('\n');
      groups.push({ title: t.trim(), desc: [rest.join(' ').trim(), it.desc].filter(Boolean).join(' '), fields: [] });
    } else groups[groups.length - 1].fields.push(it);
  }
  const gurl = `https://docs.google.com/forms/d/e/${f.id}`;
  return `<section class="section apply" id="basvuru"><div class="container">
  <div class="section-head center"><span class="eyebrow">Online başvuru</span><h2>${esc(s.short)} başvurusu</h2><p class="lead">Formu doldurun, uzmanlarımız başvurunuzu aynı gün işleme alıp sizinle iletişime geçsin.</p></div>
  <div class="apply__card" data-reveal>
    <form class="form apply__form" action="${gurl}/formResponse" method="post" data-gform="${esc(s.short)}" novalidate>
      ${groups.filter((g) => g.fields.length).map((g, gi) => `<div class="apply__group"><div class="apply__head"><span class="apply__num">${gi + 1}</span><div><h3>${esc(g.title)}</h3>${g.desc ? `<p>${esc(g.desc)}</p>` : ''}</div></div>
      <div class="apply__grid">${g.fields.map(applyField).join('')}</div></div>`).join('')}
      <div class="hp" aria-hidden="true"><label>Web sitesi adresi<input type="text" name="website_url" tabindex="-1" autocomplete="off"></label></div>
      <div class="apply__foot">
        <label class="consent"><input type="checkbox" required data-local><span><a href="/kvkk-politikamiz/" target="_blank">KVKK Aydınlatma Metni</a>’ni okudum; kişisel verilerimin başvurumun işleme alınması amacıyla işlenmesini kabul ediyorum.</span></label>
        <div class="apply__submit"><button class="btn btn--primary btn--lg" type="submit">Başvuruyu Gönder${icon('arrow')}</button><p class="form__msg" role="status" aria-live="polite"></p></div>
      </div>
    </form>
    <div class="apply__done" hidden tabindex="-1">
      <span class="ic">${icon('check')}</span>
      <h3>Başvurunuz alındı!</h3>
      <p>Uzmanlarımız bilgilerinizi kontrol edip aynı gün içinde sizinle iletişime geçecek. Acil durumlar için <a href="tel:${site.phone}">${site.phoneDisplay}</a>.</p>
    </div>
  </div>
  <p class="apply__note">${icon('shield')}Bilgileriniz şifreli bağlantıyla doğrudan başvuru sistemimize iletilir.</p>
</div></section>`;
};

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
    <div class="hero__actions" style="margin:28px 0 0">${btn(applyForms[s.slug] ? '#basvuru' : applyHref(s.slug), applyForms[s.slug] ? 'Hemen Başvur' : 'Başvuru / Teklif', 'btn--primary')}${btn('tel:' + site.phone, site.phoneDisplay, 'btn--ghost', false)}</div>
  </div>
  <div class="card" data-reveal style="padding:clamp(24px,3vw,40px)">
    <h3 style="margin-top:0">Hizmete dahil olanlar</h3>
    <ul class="list-check" style="margin-top:18px">${s.features.map((f) => `<li>${icon('check')}<span>${esc(f)}</span></li>`).join('')}</ul>
  </div>
</div></section>
${applyForms[s.slug] ? applySection(s, applyForms[s.slug]) : ''}
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
