// Faz 3: Ana sayfa
const { site, services, faqs, reasons } = require('../data');
const { layout, aurora, icon, icBox, btn, byGroup, faqBlock, faqSchema, ctaBand, SOCIAL } = require('../lib');
const { serviceCard, statsBlock, stepsBlock, quotesBlock, partnersMarquee, logoWall, postCard } = require('../components');
const { posts } = require('../posts');

module.exports = (ctx) => {
  const feed = [
    ['doc', 'E-Fatura gönderildi', 'GİB onaylı'],
    ['seal', 'Mali mühür aktif edildi', 'Hazır'],
    ['mail', 'KEP iletisi teslim edildi', 'Zaman damgalı'],
    ['book', 'E-Defter beratı alındı', 'Saklandı'],
    ['pen', 'E-İmza kurulumu tamam', 'Teslim'],
  ];

  const hero = `<section class="hero">${aurora}
  <div class="container hero__grid">
    <div>
      <span class="badge hero-in"><b>10+ YIL</b> 1.500+ işletmenin dijital dönüşüm ortağı</span>
      <h1 class="hero-in" style="--d:.05s">İşletmenizin dijital dönüşümü <span class="grad">tek çatı altında.</span></h1>
      <p class="lead hero-in" style="--d:.1s">E-imza, mali mühür, KEP, e-fatura ve e-defterden web tasarım, e-ticaret ve ERP'ye kadar; tüm dijital süreçlerinizi hızlı, güvenli ve mevzuata uygun şekilde kuruyoruz.</p>
      <div class="hero__actions hero-in" style="--d:.15s">${btn('/basvuru-formu/', 'Ücretsiz Teklif Al', 'btn--primary btn--lg')}${btn('#hizmetler', 'Hizmetleri Keşfet', 'btn--ghost btn--lg', false)}</div>
      <ul class="ticks hero-in" style="--d:.2s"><li>${icon('check')}Aynı gün dönüş</li><li>${icon('check')}Yerinde & uzaktan kurulum</li><li>${icon('check')}7/24 destek</li></ul>
    </div>
    <div class="panel-stack hero-in" aria-hidden="true" style="--d:.2s">
      <div class="panel panel--a"><div class="mini">${icBox('pen')}<div><strong>E-İmza teslimatı</strong><small>Kurulum sürüyor…</small></div></div><div class="progress"><i></i></div></div>
      <div class="panel panel--main">
        <div class="panel__head"><div class="dots"><i></i><i></i><i></i></div><span>E-Dönüşüm Paneli</span></div>
        <div class="kpis"><div class="kpi"><small>Belge</small><strong>12.480</strong></div><div class="kpi"><small>Uyum</small><strong>%100</strong></div><div class="kpi"><small>Destek</small><strong>7/24</strong></div></div>
        <div class="bars">${[38, 55, 46, 70, 60, 84, 72, 95].map((h, i) => `<i style="--h:${h}%;--i:${i}"></i>`).join('')}</div>
        <div class="feed" data-feed>${feed.map(([ic, t, s]) => `<div class="feed__row">${icBox(ic)}<span>${t}</span><em>${s}</em></div>`).join('')}</div>
      </div>
      <div class="panel panel--b"><div class="mini">${icBox('monitor')}<div><strong>Web siteniz yayında</strong><small>Mobil uyumlu · SEO hazır</small></div></div></div>
    </div>
  </div>
</section>`;

  const keyEDonusumSlugs = ['e-fatura', 'e-arsiv-fatura', 'e-irsaliye', 'e-defter', 'e-smm', 'e-imza', 'mali-muhur', 'kep-ik'];
  const homeEDonusum = byGroup('e-donusum-hizmetleri').filter((s) => keyEDonusumSlugs.includes(s.slug));
  const tabs = `<section class="section" id="hizmetler"><div class="container">
  <div class="section-head section-head--split">
    <div><span class="eyebrow">Hizmetlerimiz</span><h2>İhtiyacınız olan her şey,<br>tek bir ekipte.</h2></div>
    <p class="lead" style="margin:0">Yasal zorunluluklardan büyüme odaklı dijital çözümlere kadar işletmenizi uçtan uca destekliyoruz.</p>
  </div>
  <div class="tabs" role="tablist" aria-label="Hizmet grupları">
    <button type="button" role="tab" id="t1" aria-controls="p1" aria-selected="true">E-Dönüşüm</button>
    <button type="button" role="tab" id="t2" aria-controls="p2" aria-selected="false" tabindex="-1">Dijital Hizmetler</button>
  </div>
  <div role="tabpanel" id="p1" aria-labelledby="t1"><div class="grid grid--3">${homeEDonusum.map(serviceCard).join('')}
    <a class="card" href="/e-donusum-hizmetleri/" style="justify-content:center;background:linear-gradient(135deg,rgba(255,49,49,.14),rgba(108,99,255,.08))"><h3 style="margin-top:0">Tüm 15 E-Dönüşüm Hizmeti</h3><p>e-Adisyon, e-Bilet, Müstahsil, Entegrasyon, Geçiş Danışmanlığı ve tüm e-belgelerimizi keşfedin.</p><span class="link-arrow">Tümünü incele ${icon('arrow')}</span></a></div></div>
  <div role="tabpanel" id="p2" aria-labelledby="t2" hidden><div class="grid grid--3">${byGroup('dijital-hizmetler').map(serviceCard).join('')}</div></div>
</div></section>`;

  const why = `<section class="section section--light"><div class="container split">
  <div class="media" data-reveal>
    <img src="/assets/img/brand/dijital-donusum-ofis.webp" alt="Kurucu Bilişim dijital dönüşüm ve raporlama ekranı" width="1100" height="770" loading="lazy" decoding="async">
    <div class="media__chip"><strong>%100</strong><span>GİB ve mevzuat uyumlu e-dönüşüm altyapısı</span></div>
  </div>
  <div>
    <span class="eyebrow">Neden Kurucu Bilişim?</span>
    <h2>Teknoloji ortağınızdan beklediğiniz her şey.</h2>
    <p class="lead">Başvurudan kuruluma, eğitimden yenileme takibine kadar tüm süreci biz yönetiyoruz. Siz işinize odaklanın.</p>
    <div>${reasons.map(([t, d], i) => `<div class="reason" data-reveal style="--d:${i * 0.08}s">${icBox(['users', 'bolt', 'coin', 'pin'][i])}<div><h3>${t}</h3><p>${d}</p></div></div>`).join('')}</div>
  </div>
</div></section>`;

  const body = `${hero}
<section class="section--tight" style="padding-top:0"><div class="container">${partnersMarquee()}</div></section>
<section class="section--tight"><div class="container">${statsBlock()}</div></section>
${tabs}
${why}
<section class="section section--alt"><div class="container">
  <div class="section-head center"><span class="eyebrow">Nasıl çalışıyoruz?</span><h2>4 adımda sorunsuz geçiş</h2><p class="lead">Net bir plan, şeffaf fiyat ve her adımda ulaşabileceğiniz bir ekip.</p></div>
  ${stepsBlock()}
</div></section>
<section class="section section--light"><div class="container">
  <div class="section-head section-head--split"><div><span class="eyebrow">Referanslarımız</span><h2>Bize güvenen markalar</h2></div>${btn('/referanslarimiz/', 'Tüm referanslar', 'btn--ghost')}</div>
  ${logoWall(18)}
</div></section>
<section class="section"><div class="container">
  <div class="section-head center"><span class="eyebrow">Müşteri yorumları</span><h2>Müşterilerimiz ne diyor?</h2></div>
  ${quotesBlock()}
</div></section>
<section class="section section--light"><div class="container">
  <div class="section-head center"><span class="eyebrow">Sıkça sorulan sorular</span><h2>Aklınızdaki sorular</h2><p class="lead">Aradığınız cevap burada yoksa <a href="/iletisim/" style="color:var(--brand-ink);font-weight:700">bize ulaşın</a>, hemen yanıtlayalım.</p></div>
  ${faqBlock(faqs.slice(0, 6))}
</div></section>
<section class="section"><div class="container">
  <div class="section-head section-head--split"><div><span class="eyebrow">Blog</span><h2>Rehberler ve güncel bilgiler</h2></div>${btn('/blog/', 'Tüm yazılar', 'btn--ghost')}</div>
  <div class="grid grid--3">${posts.slice(0, 3).map(postCard).join('')}</div>
</div></section>
${ctaBand()}`;

  ctx.add('/', layout({
    path: '/',
    title: 'Kurucu Bilişim | E-İmza, Mali Mühür, KEP, E-Fatura ve Web Tasarım',
    desc: 'İstanbul merkezli Kurucu Bilişim; e-imza, mali mühür, KEP, e-fatura, e-defter, web tasarım, e-ticaret, ERP ve CRM çözümleri sunar. Ücretsiz teklif alın.',
    body,
    schema: [
      faqSchema(faqs.slice(0, 6)),
      { '@type': 'WebPage', '@id': site.url + '/#webpage', url: site.url + '/', name: 'Kurucu Bilişim', isPartOf: { '@id': site.url + '/#website' }, about: { '@id': site.url + '/#organization' }, inLanguage: 'tr-TR' },
    ],
  }), { priority: '1.0' });
};
