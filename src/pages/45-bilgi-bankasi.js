// Bilgi Bankası: /bilgi-bankasi/ → kategori → yazı (kısa, adım adım rehberler)
const { site, services } = require('../data');
const { layout, icon, icBox, btn, esc, abs, svcPath, pageHero, ctaBand, crumbsHtml, aurora, faqBlock, faqSchema, orgId, applyHref } = require('../lib');
const { slugify, EXCLUDE } = require('../posts');
const { cats, articles, catPath, SHOW_DRAFTS } = require('../kb');

const ROOT = '/bilgi-bankasi/';
const fmt = (d) => new Date(d).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
const inCat = (c) => articles.filter((a) => a.cat === c.slug);
const catOf = (a) => cats.find((c) => c.slug === a.cat);
const svcOf = (slug) => services.find((s) => s.slug === slug);
const wa = (text) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

// h2 başlıklarına id ekle (içindekiler için)
function withToc(html) {
  const toc = [], used = {};
  const out = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (m, inner) => {
    const text = inner.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');
    let id = slugify(text) || 'bolum';
    used[id] = (used[id] || 0) + 1;
    if (used[id] > 1) id += '-' + used[id];
    toc.push([id, text]);
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { html: out, toc };
}

// Mevzuat yazılarında kurum etiketleri (GİB, BTK, SGK…)
const kurumChips = (a) => (a.kurum || []).map((k) => ` <span class="chip" style="background:var(--card);border:1px solid var(--line)">${esc(k)}</span>`).join('');
const itemRow = (a) => `<a class="card kb-item" href="${a.path}" data-q="${esc((a.title + ' ' + a.lead + ' ' + catOf(a).name).toLocaleLowerCase('tr'))}" style="padding:20px 24px">
  <span class="chip">${esc(catOf(a).name)}</span>${kurumChips(a)}${a.taslak ? ' <span class="chip" style="background:#fff3cd;color:#7a5b00">TASLAK</span>' : ''}
  <strong style="display:block;font-size:1.08rem;margin:10px 0 6px">${esc(a.title)}</strong>
  <span class="muted" style="font-size:.95rem">${esc(a.lead)}</span>
</a>`;

const helpCard = (a, svc) => `<div class="card svc-cta">${icBox('phone')}<h3>Çözemediniz mi? Uzaktan bağlanıp biz yapalım</h3><p>Adımlarda takıldıysanız uzmanlarımız uzaktan bağlantıyla işleminizi sizin yerinize tamamlasın.</p><div class="hero__actions" style="margin:18px 0 0">${btn(wa(`Merhaba, Bilgi Bankası'ndaki "${a.title}" konusunda destek almak istiyorum.`), 'WhatsApp’tan Destek Al', 'btn--primary btn--sm', false, ' target="_blank" rel="noopener"')}${btn('tel:' + site.phone, site.phoneDisplay, 'btn--ghost btn--sm', false)}</div>${svc ? `<p style="margin:16px 0 0;font-size:.92rem"><a href="${svcPath(svc)}">${esc(svc.short)} hizmetimizi inceleyin →</a></p>` : ''}</div>`;
// Bilgi sayfalarında (info) tek teklif kutusu: yazının en sonunda
const offerCard = (svc) => `<div class="card svc-cta">${icBox(svc.icon)}<h3>${esc(svc.short)} için teklif alın</h3><p>İhtiyacınızı paylaşın; işletmenize uygun çözümü ve fiyat teklifini uzman ekibimiz hazırlasın.</p><div class="hero__actions" style="margin:18px 0 0">${btn(applyHref(svc.slug), 'Teklif Alın', 'btn--primary', false)}${btn(wa(`Merhaba, ${svc.short} hakkında bilgi almak istiyorum.`), 'WhatsApp’tan Yazın', 'btn--ghost', false, ' target="_blank" rel="noopener"')}</div><p style="margin:16px 0 0;font-size:.92rem"><a href="${svcPath(svc)}">${esc(svc.short)} hizmetimizi inceleyin →</a></p></div>`;

module.exports = async (ctx) => {
  const live = cats.filter((c) => inCat(c).length);
  const noindex = SHOW_DRAFTS ? '<meta name="robots" content="noindex">\n' : '';

  // ---------- Ana sayfa ----------
  {
    const p = ROOT, crumbs = [['Ana Sayfa', '/'], ['Bilgi Bankası', p]];
    const body = `${pageHero({ eyebrow: 'Bilgi Bankası', h1: 'Adım adım <span class="grad">rehberler</span>', lead: 'E-imza, mali mühür, KEP, e-fatura ve entegrasyon işlemlerinde aklınıza takılanları kısa ve anlaşılır rehberlerle anlattık.', crumbs })}
<section class="section" style="padding-top:0"><div class="container">
  <div style="max-width:720px;margin:0 auto 48px">
    <label for="kb-ara" class="sr-only">Bilgi bankasında ara</label>
    <input id="kb-ara" type="search" placeholder="Ne arıyorsunuz? Örn: e-imza kurulumu, KEP adresi" autocomplete="off" style="width:100%;padding:18px 22px;font-size:1.08rem;border:1px solid var(--line);border-radius:999px;background:var(--card);color:var(--text)">
  </div>
  <div data-kb-cats class="grid grid--3">
    ${live.map((c) => `<a class="card" href="${catPath(c)}" data-reveal>${icBox(c.icon)}<h2 style="font-size:1.25rem;margin:14px 0 8px">${esc(c.name)}</h2><p class="muted" style="margin:0 0 12px">${esc(c.desc)}</p><span class="link-arrow">${inCat(c).length} rehber ${icon('arrow')}</span></a>`).join('')}
    <a class="card" href="/sikca-sorulan-sorular/" data-reveal>${icBox('spark')}<h2 style="font-size:1.25rem;margin:14px 0 8px">Genel Sorular</h2><p class="muted" style="margin:0 0 12px">Hizmetlerimiz, süreçler ve destek hakkında sık sorulan sorular.</p><span class="link-arrow">Sıkça Sorulan Sorular ${icon('arrow')}</span></a>
  </div>
  <div style="margin-top:64px">
    <h2 style="text-align:center;margin-bottom:24px">Tüm rehberler</h2>
    <div data-kb-list style="display:grid;gap:14px;max-width:880px;margin:0 auto">${articles.map(itemRow).join('')}</div>
    <p data-kb-empty hidden style="text-align:center;color:var(--muted);margin-top:24px">Aradığınız konuyla ilgili bir rehber bulamadık. <a href="${wa('Merhaba, Bilgi Bankası’nda aradığımı bulamadım, destek almak istiyorum.')}" target="_blank" rel="noopener">WhatsApp’tan sorun</a>, hemen yardımcı olalım.</p>
  </div>
</div></section>
<script>(function(){var i=document.getElementById('kb-ara');if(!i)return;var it=[].slice.call(document.querySelectorAll('[data-kb-list] .kb-item')),e=document.querySelector('[data-kb-empty]');i.addEventListener('input',function(){var q=i.value.toLocaleLowerCase('tr').trim(),n=0;it.forEach(function(a){var ok=!q||q.split(/\\s+/).every(function(w){return a.getAttribute('data-q').indexOf(w)>-1});a.hidden=!ok;if(ok)n++});e.hidden=n>0;});})();</script>
${ctaBand('Aradığınızı bulamadınız mı?', 'Sorunuzu iletin, uzmanlarımız aynı gün içinde size dönüş yapsın.')}`;
    ctx.add(p, layout({
      path: p, crumbs, body, extraHead: noindex,
      title: 'Bilgi Bankası | E-İmza, Mali Mühür, KEP ve E-Fatura Rehberleri',
      desc: 'E-imza kurulumu, şifre işlemleri, mali mühür PIN, KEP adresi alma, e-fatura iptali ve entegrasyonlar hakkında adım adım rehberler.',
      schema: [{ '@type': 'CollectionPage', '@id': abs(p) + '#kb', url: abs(p), name: 'Kurucu Bilişim Bilgi Bankası', inLanguage: 'tr-TR', publisher: { '@id': orgId },
        hasPart: articles.map((a) => ({ '@type': 'TechArticle', headline: a.title, url: abs(a.path) })) }],
    }), { priority: '0.8' });
  }

  // ---------- Kategoriler ----------
  for (const c of live) {
    const p = catPath(c), crumbs = [['Ana Sayfa', '/'], ['Bilgi Bankası', ROOT], [c.name, p]];
    const svc = svcOf(c.svc);
    const body = `${pageHero({ eyebrow: 'Bilgi Bankası', h1: esc(c.name) + ' rehberleri', lead: esc(c.desc), crumbs })}
<section class="section" style="padding-top:0"><div class="container">
  <div style="display:grid;gap:14px;max-width:880px;margin:0 auto">${inCat(c).map(itemRow).join('')}</div>
  ${svc ? `<div class="card svc-cta" style="max-width:880px;margin:48px auto 0">${icBox(svc.icon)}<h3>${esc(svc.short)} hizmetimizle tanışın</h3><p>${esc(svc.lead)}</p><div class="hero__actions" style="margin:18px 0 0">${btn(svcPath(svc), 'Hizmeti incele', 'btn--primary btn--sm')}${btn(applyHref(svc.slug), 'Başvur / Teklif al', 'btn--ghost btn--sm', false)}</div></div>` : ''}
</div></section>
${ctaBand()}`;
    ctx.add(p, layout({
      path: p, crumbs, body, extraHead: noindex,
      title: `${c.name} Rehberleri | ${c.name.length > 22 ? 'Bilgi Bankası' : 'Kurucu Bilişim Bilgi Bankası'}`,
      desc: `${c.name} hakkında adım adım rehberler: ${c.desc}`.slice(0, 160),
      schema: [{ '@type': 'CollectionPage', url: abs(p), name: `${c.name} Rehberleri`, inLanguage: 'tr-TR', isPartOf: { '@id': abs(ROOT) + '#kb' } }],
    }), { priority: '0.6' });
  }

  // ---------- Yazılar ----------
  for (const a of articles) {
    const c = catOf(a), svc = svcOf(a.svc);
    const crumbs = [['Ana Sayfa', '/'], ['Bilgi Bankası', ROOT], [c.name, catPath(c)], [a.title, a.path]];
    const { html, toc } = withToc(a.html);
    const related = articles.filter((x) => x !== a && x.cat === a.cat).slice(0, 4);
    const body = `<section class="hero hero--page">${aurora}
  <div class="container" style="max-width:980px">
    ${crumbsHtml(crumbs)}
    <span class="chip">${esc(c.name)}</span>${kurumChips(a)}${a.taslak ? ' <span class="chip" style="background:#fff3cd;color:#7a5b00">TASLAK – onay bekliyor</span>' : ''}
    <h1 style="font-size:clamp(2rem,4.4vw,3.2rem);margin-top:16px">${esc(a.title)}</h1>
    <p class="lead" style="margin-inline:auto">${esc(a.lead)}</p>
    <div class="post-meta"><span>${icon('doc')}Güncellendi: <time datetime="${a.updated}">${fmt(a.updated)}</time></span><span>${icon('users')}Kurucu Bilişim Destek Ekibi</span></div>
  </div>
</section>
<section class="section" style="padding-top:0"><div class="container" style="max-width:1240px">
  ${a.img ? `<figure class="post-cover" style="margin:0 0 clamp(32px,5vw,56px)"><img src="${a.img}" alt="${esc(a.title)}" width="1600" height="1000" fetchpriority="high" decoding="async"></figure>` : ''}
  <div class="article-layout">
    <article class="prose" data-article>${html}
      ${a.faqs ? `<h2 id="sik-sorulan-sorular">Sık Sorulan Sorular</h2>${faqBlock(a.faqs)}` : ''}
      ${a.outro || ''}
      <div style="margin-top:48px">${a.info ? offerCard(svc) : helpCard(a, svc)}</div>
    </article>
    <aside class="sidebar" aria-label="Rehber araçları">
      ${toc.length >= 2 ? `<nav class="card" aria-label="İçindekiler"><h2>İçindekiler</h2><ol class="toc">${toc.map(([id, t]) => `<li><a href="#${id}">${esc(t)}</a></li>`).join('')}</ol></nav>` : ''}
      ${a.info ? '' : helpCard(a, svc)}
    </aside>
  </div>
</div></section>
${related.length ? `<section class="section section--alt"><div class="container">
  <div class="section-head section-head--split"><div><span class="eyebrow">${esc(c.name)}</span><h2>İlgili rehberler</h2></div>${btn(ROOT, 'Bilgi Bankası', 'btn--ghost')}</div>
  <div style="display:grid;gap:14px;max-width:880px;margin:0 auto">${related.map(itemRow).join('')}</div>
</div></section>` : ''}
${a.info ? '' : ctaBand(svc ? `${svc.short} işlemlerinizi bize bırakın` : undefined, 'Başvurudan kuruluma kadar tüm adımları uzman ekibimizle hızlı ve hatasız yönetiyoruz.')}`;
    const schema = [{
      '@type': 'TechArticle', '@id': abs(a.path) + '#article', mainEntityOfPage: abs(a.path), headline: a.title, description: a.lead,
      dateModified: a.updated, inLanguage: 'tr-TR', articleSection: c.name,
      author: { '@type': 'Organization', '@id': orgId, name: site.name }, publisher: { '@id': orgId },
      // Resmî dayanak: yazının özetlediği düzenleme(ler)
      ...(a.mevzuat && { about: a.mevzuat.map(([name, date, url, by]) => ({ '@type': 'Legislation', name, legislationDate: date, url, legislationJurisdiction: 'TR', legislationPassedBy: { '@type': 'GovernmentOrganization', name: by } })), citation: a.mevzuat.map(([, , url]) => url) }),
    }];
    if (a.faqs) schema.push(faqSchema(a.faqs));
    ctx.add(a.path, layout({
      path: a.path, crumbs, body, extraHead: noindex,
      title: a.title.length > 52 ? a.title : `${a.title} | Kurucu Bilişim`,
      desc: a.lead.slice(0, 160), ogType: 'article', ogImage: a.img, schema,
    }), { priority: '0.6', lastmod: a.updated });
  }

  // Blogdan Bilgi Bankası'na taşınan yazıların eski adresi → yeni adres
  // (.htaccess 301'ine ek statik yedek; canlıdaki .htaccess güncellenmeden de çalışır)
  for (const [from, to] of Object.entries(EXCLUDE)) {
    const moved = articles.find((x) => x.path === `/${to}/`);
    if (!moved) continue;
    ctx.add(`/${from}/`, `<!doctype html><html lang="tr"><head><meta charset="utf-8"><title>${esc(moved.title)} | Kurucu Bilişim</title><link rel="canonical" href="${abs(moved.path)}"><meta http-equiv="refresh" content="0;url=${moved.path}"><meta name="description" content="Bu yazı Kurucu Bilişim Bilgi Bankası’na taşındı."></head><body><h1>${esc(moved.title)}</h1><script>location.replace('${moved.path}');</script><p><a href="${moved.path}">Yazı Bilgi Bankası’na taşındı, devam etmek için tıklayın</a>.</p></body></html>`, { sitemap: false });
  }
};
