// Birden çok sayfada kullanılan içerik bileşenleri.
const { site, testimonials, process, partners, references, services, meslekler } = require('./data');
const { esc, icon, icBox, svcPath, initials, applyHref, activeCampaigns } = require('./lib');
const { fmtDate } = require('./posts');

const postCard = (p, i = 0) => `<a class="card post-card" href="${p.path}" data-reveal style="--d:${i * 0.07}s" data-cats="${esc(p.cats.join('|'))}">
  <div class="post-card__img">${p.thumb ? `<img src="${p.thumb}" alt="${esc(p.title)}" width="640" height="400" loading="lazy" decoding="async">` : ''}</div>
  <div class="post-card__body">
    <div class="post-card__meta"><span class="chip">${esc(p.cats[0])}</span><time datetime="${p.date.slice(0, 10)}">${fmtDate(p.date)}</time></div>
    <h3>${esc(p.title)}</h3>
    <span class="link-arrow">Yazıyı oku ${icon('arrow')}</span>
  </div>
</a>`;

const serviceCard = (s, i = 0) => `<a class="card" href="${svcPath(s)}" data-reveal style="--d:${(i % 3) * 0.07}s">${icBox(s.icon)}<h3>${esc(s.short)}</h3><p>${esc(s.lead)}</p><span class="link-arrow">Detaylı bilgi ${icon('arrow')}</span></a>`;

const statsBlock = () => `<div class="stats" data-reveal>${site.stats.map((s) => `<div class="stat"><strong>${s.value.toLocaleString('tr-TR')}${s.suffix}</strong><span>${s.label}</span></div>`).join('')}</div>`;

const stepsBlock = (list = process) => `<div class="steps" data-scroll data-scroll-start=".85" data-scroll-len=".45">${list.map(([t, d], i) => `<div class="step" data-reveal style="--d:${i * 0.12}s"><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('')}</div>`;

const quoteCard = ([n, r, q], i = 0) => `<figure class="card quote" data-reveal style="--d:${i * 0.08}s"><div class="stars" role="img" aria-label="5 üzerinden 5 yıldız">${icon('star').repeat(5)}</div><blockquote>“${esc(q)}”</blockquote><figcaption><footer><span class="avatar" aria-hidden="true">${initials(n)}</span><span><strong>${esc(n)}</strong><small>${esc(r)}</small></span></footer></figcaption></figure>`;
const quotesBlock = (list = testimonials) => `<div class="quotes">${list.map(quoteCard).join('')}</div>`;

const partnersMarquee = () => {
  const row = partners.map(([f, n, w, h]) => `<img src="/assets/img/partner/${f}.webp" alt="${esc(n)}" width="${Math.round(w * 34 / h)}" height="34" loading="lazy" decoding="async">`).join('');
  return `<p class="partners-label">Çözüm ortaklarımız</p><div class="marquee"><div class="marquee__track">${row}${row.replace(/alt="[^"]*"/g, 'alt="" aria-hidden="true"')}</div></div>`;
};

const logoWall = (n = references.length) => `<div class="logo-wall">${references.slice(0, n).map((r, i) => `<figure data-reveal style="--d:${(i % 6) * 0.05}s"><img src="/assets/img/ref/referans-${r}.webp" alt="Kurucu Bilişim referans müşteri logosu ${r}" width="240" height="240" loading="lazy" decoding="async"></figure>`).join('')}</div>`;

const trDate = (d) => new Date(d + 'T12:00:00').toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
const campaignCard = (c, i = 0, detail = false) => {
  const svc = services.find((s) => s.slug === c.hizmet);
  return `<article class="promo promo--${c.tema}${detail ? ' promo--detail' : ''}" id="${c.slug}" data-reveal style="--d:${(i % 3) * 0.07}s">
  <span class="promo__badge">${esc(c.rozet)}</span>
  <h3>${esc(c.baslik)}</h3>
  <p>${esc(c.ozet)}</p>
  ${detail ? `<ul class="list-check">${c.detay.map((d) => `<li>${icon('check')}<span>${esc(d)}</span></li>`).join('')}</ul>` : ''}
  <div class="promo__foot">
    <small>${icon('clock')}Son gün: <time datetime="${c.bitis}">${trDate(c.bitis)}</time></small>
    <a class="link-arrow" href="${detail ? applyHref(c.hizmet) : '/kampanyalar/#' + c.slug}">${detail ? 'Hemen yararlanın' : 'Detaylar'} ${icon('arrow')}</a>
  </div>
  ${detail && svc ? `<a class="promo__svc" href="${svcPath(svc)}">${esc(svc.short)} hizmetini inceleyin</a>` : ''}
</article>`;
};

// Mesleğe özel e-imza
const meslekPath = (m) => `/e-donusum-hizmetleri/e-imza/${m.slug}/`;
const meslekCard = (m, i = 0) => `<a class="card" href="${meslekPath(m)}" data-reveal style="--d:${(i % 4) * 0.07}s">${icBox(m.icon)}<h3>${esc(m.name)}</h3><p>${esc(m.ozet)}</p><span class="link-arrow">İncele ${icon('arrow')}</span></a>`;
const meslekGrid = () => `<div class="grid grid--4">${meslekler.map(meslekCard).join('')}</div>`;
// Temsilî "e-imzayla imzalanmış belge" görseli (gerçek ekran görüntüsü değildir)
const esigMock = (m) => `<figure class="esig" data-reveal>
  <div class="esig__win">
    <div class="esig__bar"><i></i><i></i><i></i><span>${esc(m.mock.app)}</span></div>
    <div class="esig__doc">
      <div class="esig__file">${icon('doc')}<div><strong>${esc(m.mock.file)}</strong><small>${esc(m.mock.sub)}</small></div></div>
      <div class="esig__lines" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
      <div class="esig__sign"><svg viewBox="0 0 120 40" aria-hidden="true"><path d="M4 30c8-14 14-22 18-18s-6 18 0 16 10-20 16-18-2 16 4 16 8-12 14-12 2 10 8 10 10-8 18-8 14 4 34-2"/></svg><div><strong>${esc(m.mock.signer)}</strong><small>Nitelikli elektronik sertifika</small></div></div>
      <div class="esig__ok">${icon('shield')}<span>Güvenli elektronik imza ile imzalandı</span></div>
    </div>
  </div>
  <div class="esig__token" aria-hidden="true"><span class="esig__chip"></span><b>e-İmza</b></div>
  <figcaption>Temsilî görsel</figcaption>
</figure>`;

module.exports = { meslekPath, meslekCard, meslekGrid, esigMock, activeCampaigns, campaignCard, postCard, serviceCard, statsBlock, stepsBlock, quotesBlock, quoteCard, partnersMarquee, logoWall };
