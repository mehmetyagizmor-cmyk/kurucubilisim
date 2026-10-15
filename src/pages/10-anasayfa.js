// Faz 3: Ana sayfa
const { site, services, faqs, reasons, meslekler } = require('../data');
const { layout, aurora, icon, icBox, btn, byGroup, faqBlock, faqSchema, ctaBand, SOCIAL, svcPath, esc } = require('../lib');
const { serviceCard, statsBlock, stepsBlock, quotesBlock, partnersMarquee, logoWall, postCard, activeCampaigns, campaignCard, meslekGrid, meslekPath } = require('../components');
const { posts } = require('../posts');

module.exports = (ctx) => {
  // Çözüm bulucu: ziyaretçi durumunu seçer, ona uygun hizmetlere gider (gerçek bağlantılar, SEO için metin)
  const svc = (slug, why) => { const x = services.find((v) => v.slug === slug); return [svcPath(x), x.icon, x.short, why]; };
  const finder = [
    ['Şirketim var', [
      svc('e-fatura', 'Mükellefler arası faturalarınızı GİB mevzuatına uygun düzenleyin.'),
      svc('e-arsiv-fatura', 'E-faturaya kayıtlı olmayan alıcılara ve tüketicilere fatura.'),
      svc('e-defter', 'Yasal defterlerinizi elektronik ortamda tutun ve saklayın.'),
      svc('mali-muhur', 'Şirketinizin e-belgelerdeki elektronik mührü.'),
      svc('kep-ik', 'Resmi yazışmalarınız için yasal delil niteliğinde e-posta.'),
      svc('e-imza', 'Yetkililer için MERSİS, e-Devlet ve SGK işlemleri.'),
    ]],
    ['Serbest meslek', [
      svc('e-smm', 'Serbest meslek makbuzlarınızı elektronik ortamda düzenleyin.'),
      svc('e-imza', 'E-Devlet ve kurum işlemleriniz için nitelikli e-imza.'),
      svc('kep-ik', 'Kurumlarla resmi yazışmalarınız için KEP adresi.'),
      svc('e-donusum-danismanligi', 'Hangi e-belgeye ne zaman geçmeniz gerektiğini birlikte belirleyelim.'),
    ]],
    ['Avukat, doktor, mühendis', meslekler.map((m) => [meslekPath(m), m.icon, m.short, m.ozet])],
    ['Kamu ihalesi', [
      [meslekPath(meslekler.find((m) => m.slug === 'muteahhitler-icin-e-imza')), 'crane', 'EKAP İçin E-İmza', 'İhalelerde e-teklifinizi yetkili e-imzasıyla verin.'],
      svc('mali-muhur', 'Şirketiniz adına düzenlenen e-belgeler için mali mühür.'),
      svc('kep-ik', 'İdareyle resmi yazışmalarınız için KEP.'),
      ['/ekap-islemlerinde-e-imza-kamu-ihalelerine-dijital-katilim-rehberi/', 'book', 'EKAP Rehberi', 'Kamu ihalelerine e-imzayla katılımı adım adım anlattık.'],
    ]],
    ['Web sitesi', [
      svc('web-tasarim', 'Hızlı, mobil uyumlu ve SEO odaklı kurumsal web sitesi.'),
      svc('eticaret-cozumleri', 'Online satışa başlayın; e-fatura ve pazaryeri entegrasyonuyla.'),
      svc('kurumsal-tasarim', 'Logo ve kurumsal kimlikle markanızı güçlendirin.'),
      svc('sosyal-medya-yonetimi', 'Markanızı sosyal medyada düzenli ve ölçülebilir şekilde büyütün.'),
    ]],
  ];
  // Güven bandı: yalnızca doğrulanabilir bilgiler
  const trust = [
    ['shield', '5070 sayılı Kanun', 'Nitelikli e-imza, ıslak imzayla aynı hukuki geçerliliktedir.'],
    ['doc', 'GİB mevzuatına uygun', 'E-fatura, e-arşiv ve e-defter kurulumlarında güncel mevzuat.'],
    ['check', 'KVKK ile korunur', 'Başvuru bilgileriniz KVKK aydınlatma metni kapsamında işlenir.'],
    ['pin', 'Şişli, İstanbul', 'Ofisimizde yüz yüze, Türkiye geneline uzaktan destek.'],
  ];

  const hero = `<section class="hero hero--home">
  <div class="container hero__center">
    <span class="badge hero-in"><b>10+ YIL</b> İşletmelerin dijital dönüşüm ortağı</span>
    <h1 class="hero-in" style="--d:.05s">Dijital Dönüşüm<br><span class="grad">Çözümleri</span></h1>
    <p class="lead hero-in" style="--d:.12s">E-imza, mali mühür, KEP, e-fatura ve e-defterden web tasarım, e-ticaret ve ERP'ye kadar; tüm dijital süreçlerinizi hızlı, güvenli ve mevzuata uygun şekilde kuruyoruz.</p>
    <div class="hero__actions hero-in" style="--d:.18s">${btn('/basvuru-formu/', 'Ücretsiz Teklif Al', 'btn--primary btn--lg', false)}<a class="link-arrow" href="#hizmetler">Hizmetleri keşfedin ${icon('arrow')}</a></div>
    <ul class="ticks hero-in" style="--d:.24s"><li>${icon('check')}Aynı gün dönüş</li><li>${icon('check')}Yerinde & uzaktan kurulum</li><li>${icon('check')}7/24 destek</li></ul>
  </div>
  <div class="container hero__finder hero-in" style="--d:.3s">
    <div class="finder">
      <div class="finder__head"><h2>Size hangi çözüm lazım?</h2><p>Durumunuzu seçin, işinize uygun hizmetleri gösterelim.</p></div>
      <div class="tabs finder__tabs" role="tablist" aria-label="Durumunuzu seçin">${finder.map(([t], i) => `<button type="button" role="tab" id="ft${i}" aria-controls="fp${i}" aria-selected="${i === 0}"${i ? ' tabindex="-1"' : ''}>${esc(t)}</button>`).join('')}</div>
      ${finder.map(([t, items], i) => `<div class="finder__panel" role="tabpanel" id="fp${i}" aria-labelledby="ft${i}"${i ? ' hidden' : ''}>${items.map(([href, ic, name, why]) => `<a class="finder__item" href="${href}">${icBox(ic)}<span class="finder__txt"><strong>${esc(name)}</strong><small>${esc(why)}</small></span>${icon('arrow')}</a>`).join('')}</div>`).join('')}
      <p class="finder__foot">Hangisi olduğundan emin değil misiniz? <a href="/iletisim/">Ücretsiz danışın ${icon('arrow')}</a></p>
    </div>
    <ul class="trust">${trust.map(([ic, t, d]) => `<li>${icBox(ic)}<span><strong>${t}</strong><small>${d}</small></span></li>`).join('')}</ul>
  </div>
</section>`;

  const keyEDonusumSlugs = ['e-fatura', 'e-arsiv-fatura', 'e-irsaliye', 'e-defter', 'e-smm', 'e-imza', 'mali-muhur', 'kep-ik'];
  const homeEDonusum = byGroup('e-donusum-hizmetleri').filter((s) => keyEDonusumSlugs.includes(s.slug));
  // Yatay kaydırmalı kart şeridi (oklar JS ile çalışır; JS yoksa parmakla/kaydırma çubuğuyla kayar)
  const rail = (cards, label) => `<div class="rail" data-rail><div class="rail__track" tabindex="0" aria-label="${label}">${cards}</div>
    <div class="rail__nav"><button type="button" data-dir="-1" aria-label="Önceki kartlar">${icon('arrow')}</button><button type="button" data-dir="1" aria-label="Sonraki kartlar">${icon('arrow')}</button></div></div>`;
  const tabs = `<section class="section" id="hizmetler"><div class="container">
  <div class="section-head section-head--split">
    <div><span class="eyebrow">Hizmetlerimiz</span><h2>İhtiyacınız olan her şey.<br>Tek bir ekipte.</h2></div>
    <p class="lead" style="margin:0">Yasal zorunluluklardan büyüme odaklı dijital çözümlere kadar işletmenizi uçtan uca destekliyoruz.</p>
  </div>
  <div class="tabs" role="tablist" aria-label="Hizmet grupları">
    <button type="button" role="tab" id="t1" aria-controls="p1" aria-selected="true">E-Dönüşüm</button>
    <button type="button" role="tab" id="t2" aria-controls="p2" aria-selected="false" tabindex="-1">Dijital Hizmetler</button>
  </div>
  <div role="tabpanel" id="p1" aria-labelledby="t1">${rail(homeEDonusum.map(serviceCard).join('') + `
    <a class="card card--feature" href="/e-donusum-hizmetleri/"><h3 style="margin-top:0">Tüm 15 E-Dönüşüm Hizmeti</h3><p>e-Adisyon, e-Bilet, Müstahsil, Entegrasyon, Geçiş Danışmanlığı ve tüm e-belgelerimizi keşfedin.</p><span class="link-arrow">Tümünü incele ${icon('arrow')}</span></a>`, 'E-Dönüşüm hizmetleri')}</div>
  <div role="tabpanel" id="p2" aria-labelledby="t2" hidden>${rail(byGroup('dijital-hizmetler').map(serviceCard).join(''), 'Dijital hizmetler')}</div>
</div></section>`;

  const why = `<section class="section section--light"><div class="container split story">
  <div class="media" data-reveal data-scroll data-scroll-start="1" data-scroll-len="1.3">
    <img src="/assets/img/brand/dijital-donusum-ofis.webp" alt="Kurucu Bilişim dijital dönüşüm ve raporlama ekranı" width="1100" height="770" loading="lazy" decoding="async">
    <div class="media__chip"><strong>%100</strong><span>GİB ve mevzuat uyumlu e-dönüşüm altyapısı</span></div>
  </div>
  <div>
    <span class="eyebrow">Neden Kurucu Bilişim?</span>
    <h2>Teknoloji ortağınızdan beklediğiniz her şey.</h2>
    <p class="lead">Başvurudan kuruluma, eğitimden yenileme takibine kadar tüm süreci biz yönetiyoruz. Siz işinize odaklanın.</p>
    <div>${reasons.map(([t, d], i) => `<div class="reason" data-story>${icBox(['users', 'bolt', 'coin', 'pin'][i])}<div><h3>${t}</h3><p>${d}</p></div></div>`).join('')}</div>
  </div>
</div></section>`;

  const body = `${hero}
<section class="section--tight" style="padding-top:0"><div class="container">${partnersMarquee()}</div></section>
<section class="section--tight"><div class="container">${statsBlock()}</div></section>
${activeCampaigns().length ? `<section class="section section--light promos"><div class="container">
  <div class="section-head section-head--split"><div><span class="eyebrow">Kampanyalar</span><h2>Şimdi başlamak için<br>tam zamanı.</h2></div>${btn('/kampanyalar/', 'Tüm kampanyalar', 'btn--ghost')}</div>
  ${rail(activeCampaigns().map((c, i) => campaignCard(c, i)).join(''), 'Güncel kampanyalar')}
</div></section>` : ''}
<section class="section statement"><div class="container"><p class="statement__text" data-words>E-fatura, e-imza, KEP ya da yepyeni bir web sitesi. Ne gerekiyorsa tek bir ekip baştan sona yönetir. <span class="grad">Siz sadece işinize odaklanın.</span></p></div></section>
${tabs}
<section class="section section--light" style="padding-top:clamp(56px,7vw,96px)"><div class="container">
  <div class="section-head section-head--split"><div><span class="eyebrow">Mesleğinize özel e-imza</span><h2>Avukat, doktor, mühendis<br>ve müteahhitler için.</h2></div>
    <p class="lead" style="margin:0">UYAP’tan e-reçeteye, Yapı Denetim Sistemi’nden EKAP’a; mesleğinizin sistemlerinde sorunsuz çalışan e-imzayı kuruyoruz.</p></div>
  ${meslekGrid()}
</div></section>
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
  <div class="section-head center"><span class="eyebrow">Sıkça sorulan sorular</span><h2>Aklınızdaki sorular</h2><p class="lead">Aradığınız cevap burada yoksa <a href="/iletisim/" style="color:var(--link);font-weight:600">bize ulaşın</a>, hemen yanıtlayalım.</p></div>
  ${faqBlock(faqs.slice(0, 6))}
</div></section>
<section class="section"><div class="container">
  <div class="section-head section-head--split"><div><span class="eyebrow">Blog</span><h2>Rehberler ve güncel bilgiler</h2></div>${btn('/blog/', 'Tüm yazılar', 'btn--ghost')}</div>
  <div class="grid grid--3">${posts.slice(0, 3).map(postCard).join('')}</div>
</div></section>
${ctaBand()}`;

  ctx.add('/', layout({
    path: '/',
    title: 'Kurucu Bilişim | Dijital Dönüşüm Çözümleri',
    desc: 'İstanbul merkezli Kurucu Bilişim; e-imza, mali mühür, KEP, e-fatura, e-defter, web tasarım, e-ticaret, ERP ve CRM çözümleri sunar. Ücretsiz teklif alın.',
    body,
    schema: [
      faqSchema(faqs.slice(0, 6)),
      { '@type': 'WebPage', '@id': site.url + '/#webpage', url: site.url + '/', name: 'Kurucu Bilişim', isPartOf: { '@id': site.url + '/#website' }, about: { '@id': site.url + '/#organization' }, inLanguage: 'tr-TR' },
    ],
  }), { priority: '1.0' });
};
