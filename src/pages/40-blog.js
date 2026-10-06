// Faz 5: Blog listesi + 30 yazı (URL'ler canlı siteyle aynı: /yazi-slug/)
const path = require('path');
const sharp = require('sharp');
const { site, services, blogCats } = require('../data');
const { layout, icon, icBox, btn, esc, abs, svcPath, pageHero, ctaBand, crumbsHtml, aurora, SOCIAL, orgId } = require('../lib');
const { postCard } = require('../components');
const { posts, fmtDate } = require('../posts');

// Kategori → ilgili hizmet (yazı içi teklif kutusu ve iç linkleme için)
const catService = { 'E-İmza': 'e-imza', 'Mali Mühür': 'mali-muhur', KEP: 'kep-ik', 'E-Bordro': 'kep-ik', 'E-Defter': 'e-defter', 'E-Fatura & E-Belge': 'e-fatura' };
function serviceFor(p) {
  let slug = catService[p.cats[0]];
  if (!slug) slug = /erp/.test(p.slug) ? 'erp-yazilimlari' : /sosyal/.test(p.slug) ? 'sosyal-medya-yonetimi' : 'web-tasarim';
  return services.find((s) => s.slug === slug);
}

const ROOT = path.join(__dirname, '../..');

module.exports = async (ctx) => {
  // Görsel boyutları (CLS önlemek için width/height)
  const dims = {};
  for (const p of posts) {
    if (p.img) { const m = await sharp(path.join(ROOT, p.img)).metadata(); dims[p.slug] = [m.width, m.height]; }
  }

  // ---------- Blog listesi ----------
  {
    const p = '/blog/', crumbs = [['Ana Sayfa', '/'], ['Blog', p]];
    const [first, ...rest] = posts;
    const usedCats = blogCats.map(([n]) => n).filter((n) => posts.some((x) => x.cats.includes(n)));
    const body = `${pageHero({ eyebrow: 'Blog', h1: 'Rehberler ve <span class="grad">güncel bilgiler</span>', lead: 'E-imza, mali mühür, KEP, e-fatura, e-defter ve dijital dönüşüm hakkında bilmeniz gereken her şey.', crumbs })}
<section class="section" style="padding-top:0"><div class="container">
  <div class="filters" data-filters role="tablist" aria-label="Kategoriler">
    <button type="button" role="tab" data-cat="all" aria-selected="true">Tümü (${posts.length})</button>
    ${usedCats.map((c) => `<button type="button" role="tab" data-cat="${esc(c)}" aria-selected="false">${esc(c)} (${posts.filter((x) => x.cats.includes(c)).length})</button>`).join('')}
  </div>
  <a class="card post-card featured" href="${first.path}" data-cats="${esc(first.cats.join('|'))}">
    <div class="post-card__img">${first.img ? `<img src="${first.img}" alt="${esc(first.title)}" width="${dims[first.slug][0]}" height="${dims[first.slug][1]}" fetchpriority="high" decoding="async">` : ''}</div>
    <div class="post-card__body">
      <div class="post-card__meta"><span class="chip">${esc(first.cats[0])}</span><time datetime="${first.date.slice(0, 10)}">${fmtDate(first.date)}</time><span>· ${first.minutes} dk okuma</span></div>
      <h2>${esc(first.title)}</h2><p class="muted">${esc(first.desc)}</p>
      <span class="link-arrow">Yazıyı oku ${icon('arrow')}</span>
    </div>
  </a>
  <div class="grid grid--3">${rest.map((x, i) => postCard(x, i % 3)).join('')}</div>
</div></section>
${ctaBand()}`;
    ctx.add(p, layout({
      path: p, crumbs, body,
      title: 'Blog | E-İmza, Mali Mühür, KEP ve E-Dönüşüm Rehberleri',
      desc: 'E-imza, mali mühür, KEP, e-bordro, e-fatura ve e-defter hakkında güncel rehberler. Dijital dönüşüm sürecinizi kolaylaştıracak bilgiler Kurucu Bilişim blogunda.',
      schema: [{
        '@type': 'Blog', '@id': abs(p) + '#blog', url: abs(p), name: 'Kurucu Bilişim Blog', inLanguage: 'tr-TR', publisher: { '@id': orgId },
        blogPost: posts.map((x) => ({ '@type': 'BlogPosting', headline: x.title, url: abs(x.path), datePublished: x.date })),
      }],
    }), { priority: '0.8' });
  }

  // ---------- Yazılar ----------
  for (const p of posts) {
    const crumbs = [['Ana Sayfa', '/'], ['Blog', '/blog/'], [p.title, p.path]];
    const svc = serviceFor(p);
    const related = posts.filter((x) => x !== p && x.cats[0] === p.cats[0]).slice(0, 3);
    const more = related.length < 3 ? posts.filter((x) => x !== p && !related.includes(x)).slice(0, 3 - related.length) : [];
    const url = abs(p.path);
    const [w, h] = dims[p.slug] || [1200, 630];
    const share = encodeURIComponent(url), shareT = encodeURIComponent(p.title);

    const body = `<div class="read-progress" aria-hidden="true"></div>
<section class="hero hero--page">${aurora}
  <div class="container" style="max-width:980px">
    ${crumbsHtml(crumbs)}
    <span class="chip">${esc(p.cats[0])}</span>
    <h1 style="font-size:clamp(2rem,4.4vw,3.4rem);margin-top:16px">${esc(p.title)}</h1>
    <div class="post-meta"><span>${icon('clock')}${p.minutes} dk okuma</span><span>${icon('doc')}<time datetime="${p.date.slice(0, 10)}">${fmtDate(p.date)}</time></span>${p.modified.slice(0, 10) !== p.date.slice(0, 10) ? `<span>Güncellendi: <time datetime="${p.modified.slice(0, 10)}">${fmtDate(p.modified)}</time></span>` : ''}<span>${icon('users')}Kurucu Bilişim Editörü</span></div>
  </div>
</section>
<section class="section" style="padding-top:0"><div class="container" style="max-width:1240px">
  ${p.img ? `<figure class="post-cover" style="margin:0 0 clamp(32px,5vw,56px)"><img src="${p.img}" alt="${esc(p.title)}" width="${w}" height="${h}" fetchpriority="high" decoding="async"></figure>` : ''}
  <div class="article-layout">
    <article class="prose" data-article>${p.html}
      <div class="card svc-cta" style="margin-top:48px">${icBox(svc.icon)}<h3>${esc(svc.short)} hizmetimizle tanışın</h3><p>${esc(svc.lead)}</p><div class="hero__actions" style="margin:18px 0 0">${btn(svcPath(svc), 'Hizmeti incele', 'btn--primary btn--sm')}${btn('/basvuru-formu/?hizmet=' + svc.slug, 'Teklif al', 'btn--ghost btn--sm', false)}</div></div>
    </article>
    <aside class="sidebar" aria-label="Yazı araçları">
      ${p.toc.length >= 2 ? `<nav class="card" aria-label="İçindekiler"><h2>İçindekiler</h2><ol class="toc">${p.toc.map(([id, t]) => `<li><a href="#${id}">${esc(t)}</a></li>`).join('')}</ol></nav>` : ''}
      <div class="card svc-cta">${icBox(svc.icon)}<h3>${esc(svc.short)} için destek mi lazım?</h3><p>Uzmanlarımız aynı gün içinde size dönüş yapsın.</p>${btn('/basvuru-formu/?hizmet=' + svc.slug, 'Ücretsiz Teklif Al', 'btn--primary btn--sm')}</div>
      <div class="card"><h2>Paylaş</h2><div class="share">
        <a href="https://wa.me/?text=${shareT}%20${share}" target="_blank" rel="noopener" aria-label="WhatsApp'ta paylaş">${SOCIAL.whatsapp}</a>
        <a href="https://www.linkedin.com/sharing/share-offsite/?url=${share}" target="_blank" rel="noopener" aria-label="LinkedIn'de paylaş">${SOCIAL.linkedin}</a>
        <a href="https://twitter.com/intent/tweet?url=${share}&amp;text=${shareT}" target="_blank" rel="noopener" aria-label="X'te paylaş"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.2 2.3h3.4l-7.4 8.4 8.7 11.5h-6.8l-5.3-7-6.1 7H1.3l7.9-9L.9 2.3h7l4.8 6.4zm-1.2 17.9h1.9L7.1 4.2H5.1z"/></svg></a>
        <button type="button" data-copy aria-label="Bağlantıyı kopyala">${icon('link')}</button>
      </div></div>
    </aside>
  </div>
</div></section>
<section class="section section--alt"><div class="container">
  <div class="section-head section-head--split"><div><span class="eyebrow">İlgili yazılar</span><h2>Bunlar da ilginizi çekebilir</h2></div>${btn('/blog/', 'Tüm yazılar', 'btn--ghost')}</div>
  <div class="grid grid--3">${related.concat(more).map(postCard).join('')}</div>
</div></section>
${ctaBand(`${svc.short} sürecinizi bize bırakın`, 'Başvurudan kuruluma kadar tüm adımları uzman ekibimizle hızlı ve hatasız yönetiyoruz.')}`;

    ctx.add(p.path, layout({
      path: p.path, crumbs, body,
      title: p.seoTitle.length > 52 ? p.seoTitle : `${p.seoTitle} | Kurucu Bilişim`,
      desc: p.desc, ogType: 'article', ogImage: p.img,
      extraHead: `<meta property="article:published_time" content="${p.date}+03:00">\n<meta property="article:modified_time" content="${p.modified}+03:00">\n<meta property="article:section" content="${esc(p.cats[0])}">\n`,
      schema: [{
        '@type': 'BlogPosting', '@id': url + '#article', mainEntityOfPage: url, headline: p.title, description: p.desc,
        image: p.img ? abs(p.img) : undefined, datePublished: p.date + '+03:00', dateModified: p.modified + '+03:00',
        wordCount: p.words, articleSection: p.cats[0], inLanguage: 'tr-TR',
        author: { '@type': 'Organization', '@id': orgId, name: site.name }, publisher: { '@id': orgId },
      }],
    }), { priority: '0.6', lastmod: p.modified });
  }
};
