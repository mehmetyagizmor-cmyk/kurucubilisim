// Faz 3: Ana sayfa
const { site, services, faqs, meslekler } = require('../data');
const { layout, icon, icBox, btn, byGroup, faqBlock, faqSchema, ctaBand, svcPath, esc } = require('../lib');
const { serviceCard, quotesBlock, partnersMarquee, logoWall, activeCampaigns, campaignCard, meslekGrid, meslekPath } = require('../components');

module.exports = (ctx) => {
  // Çözüm bulucu: ziyaretçi durumunu seçer, ona uygun hizmetlere gider (gerçek bağlantılar, SEO için metin)
  const svc = (slug, why) => { const x = services.find((v) => v.slug === slug); return [svcPath(x), x.icon, x.short, why]; };
  const finder = [
    ['Şirketler', [
      svc('e-fatura', 'Mükellefler arası faturalarınızı GİB mevzuatına uygun düzenleyin.'),
      svc('e-arsiv-fatura', 'E-faturaya kayıtlı olmayan alıcılara ve tüketicilere fatura.'),
      svc('e-defter', 'Yasal defterlerinizi elektronik ortamda tutun ve saklayın.'),
      svc('mali-muhur', 'Aynı gün, dakikalar içinde teslim; şirketinizin e-belge mührü.'),
      svc('kep-ik', 'Resmi yazışmalarınız için yasal delil niteliğinde e-posta.'),
      svc('e-imza', 'İstanbul içi hızlı kurye; MERSİS, e-Devlet ve SGK işlemleri.'),
    ]],
    ['Serbest meslek', [
      svc('e-smm', 'Serbest meslek makbuzlarınızı elektronik ortamda düzenleyin.'),
      svc('e-imza', 'İstanbul içi hızlı kurye, 81 ile aynı gün kargo ile nitelikli e-imza.'),
      svc('kep-ik', 'Kurumlarla resmi yazışmalarınız için KEP adresi.'),
      svc('e-donusum-danismanligi', 'Hangi e-belgeye ne zaman geçmeniz gerektiğini birlikte belirleyelim.'),
    ]],
    ['Avukat, doktor, mühendis', meslekler.map((m) => [meslekPath(m), m.icon, m.short, m.ozet])],
    ['Kamu ihaleleri', [
      [meslekPath(meslekler.find((m) => m.slug === 'muteahhitler-icin-e-imza')), 'crane', 'EKAP İçin E-İmza', 'İhalelerde e-teklifinizi yetkili e-imzasıyla verin.'],
      svc('mali-muhur', 'Aynı gün, dakikalar içinde teslim edilen mali mühür.'),
      svc('kep-ik', 'İdareyle resmi yazışmalarınız için KEP.'),
      ['/ekap-islemlerinde-e-imza-kamu-ihalelerine-dijital-katilim-rehberi/', 'book', 'EKAP Rehberi', 'Kamu ihalelerine e-imzayla katılımı adım adım anlattık.'],
    ]],
    ['Web ve dijital', [
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
    <h1 class="hero-in" style="--d:.05s"><span style="white-space:nowrap">E-İmza,</span> <span style="white-space:nowrap">Mali Mühür,</span> KEP ve <span style="white-space:nowrap">E-Fatura</span><br><span class="grad">tek ekipte</span></h1>
    <p class="lead hero-in" style="--d:.12s">Başvurudan kuruluma kadar tüm e-dönüşüm işlemlerinizi hızlı, güvenli ve mevzuata uygun şekilde yönetiyoruz. Web tasarım, e-ticaret ve ERP çözümleriyle dijital büyümenizi de destekliyoruz.</p>
    <div class="hero__actions hero-in" style="--d:.18s">${btn('/basvuru-formu/', 'Ücretsiz Teklif Al', 'btn--primary btn--lg', false)}<a class="link-arrow" href="#hizmetler">Hizmetleri keşfedin ${icon('arrow')}</a></div>
    <ul class="ticks hero-in" style="--d:.24s"><li>${icon('check')}İstanbul içi hızlı kurye</li><li>${icon('check')}81 ile kargo</li><li>${icon('check')}Yerinde & uzaktan kurulum</li></ul>
  </div>
  <div class="container hero__finder hero-in" style="--d:.3s">
    <div class="finder">
      <div class="finder__head"><h2>Faaliyet alanınıza uygun çözümler</h2><p>Faaliyet alanınızı seçin, ilgili hizmetlerimizi listeleyelim.</p></div>
      <div class="tabs finder__tabs" role="tablist" aria-label="Faaliyet alanınızı seçin">${finder.map(([t], i) => `<button type="button" role="tab" id="ft${i}" aria-controls="fp${i}" aria-selected="${i === 0}"${i ? ' tabindex="-1"' : ''}>${esc(t)}</button>`).join('')}</div>
      ${finder.map(([t, items], i) => `<div class="finder__panel" role="tabpanel" id="fp${i}" aria-labelledby="ft${i}"${i ? ' hidden' : ''}>${items.map(([href, ic, name, why]) => `<a class="finder__item" href="${href}">${icBox(ic)}<span class="finder__txt"><strong>${esc(name)}</strong><small>${esc(why)}</small></span>${icon('arrow')}</a>`).join('')}</div>`).join('')}
      <p class="finder__foot">İhtiyacınız olan çözümü birlikte belirleyelim. <a href="/iletisim/">Ücretsiz danışmanlık alın ${icon('arrow')}</a></p>
    </div>
    <ul class="trust">${trust.map(([ic, t, d]) => `<li>${icBox(ic)}<span><strong>${t}</strong><small>${d}</small></span></li>`).join('')}</ul>
  </div>
</section>`;

  // En çok aranan hizmetler önce (Search Console): e-imza, mali mühür, KEP, e-fatura
  const keyEDonusumSlugs = ['e-imza', 'mali-muhur', 'kep-ik', 'e-fatura', 'e-arsiv-fatura', 'e-defter', 'e-irsaliye', 'e-smm'];
  const homeEDonusum = keyEDonusumSlugs.map((slug) => byGroup('e-donusum-hizmetleri').find((s) => s.slug === slug)).filter(Boolean);

  // Ayrıcalıklar: patronun öne çıkardığı, doğrulanmış hizmet farkları (butonsuz, hizmet sayfasına bağlanır)
  const perks = [
    ['pen', 'E-İmza Teslimatı', 'İstanbul içi hızlı kurye, 81 ile kargo', 'İstanbul içinde e-imzanız hızlı kuryeyle adresinize yönlendirilir; diğer illere aynı gün kargoya verilir, ertesi gün teslimat seçeneği sunulur.', '/e-donusum-hizmetleri/e-imza/'],
    ['mail', 'KEP Başvuru Ayrıcalığı', 'NFC + e-Devlet ile tamamen online', 'Fiziki evrak gerekmeden; kimliğiniz çipli kimlik kartınızla NFC üzerinden doğrulanır, onay e-Devlet’ten verilir ve KEP hesabınız dakikalar içinde açılır.', '/e-donusum-hizmetleri/kep-ik/'],
    ['seal', 'Mali Mühür', 'Aynı gün, dakikalar içinde teslim', 'Şirketinizin e-fatura, e-arşiv ve e-defter işlemlerinde kullanacağı mali mührü aynı gün teslim ediyor, kurulumunu uzaktan yapıyoruz.', '/e-donusum-hizmetleri/mali-muhur/'],
  ];
  const perksSection = `<section class="section section--light"><div class="container">
  <div class="section-head center"><span class="eyebrow">Kurucu Bilişim ayrıcalıkları</span><h2>Beklemeden, evrak taşımadan.</h2></div>
  <div class="grid grid--3">${perks.map(([ic, t, s, d, href], i) => `<a class="card" href="${href}" data-reveal style="--d:${i * 0.08}s">${icBox(ic)}<h3 style="margin:14px 0 4px">${esc(t)}</h3><p style="margin:0 0 10px;font-weight:600;color:var(--link)">${esc(s)}</p><p class="muted" style="margin:0">${esc(d)}</p><span class="link-arrow" style="margin-top:14px">Detayları inceleyin ${icon('arrow')}</span></a>`).join('')}</div>
</div></section>`;

  // Ana sayfaya özel "neden biz" maddeleri (fiyat ve 7/24 iddiası içermez)
  const homeReasons = [
    ['Uzman Kadro', 'E-dönüşüm ve dijital çözümlerde 10 yılı aşkın deneyime sahip ekip.'],
    ['Uçtan Uca Takip', 'Başvuru, kurulum, eğitim ve yenileme tarihlerini sizin yerinize takip ediyoruz.'],
    ['Mevzuata Uyum', 'GİB ve ilgili mevzuattaki değişiklikleri izliyor, kurulumları güncel kurallara göre yapıyoruz.'],
    ['Yerinde Hizmet', 'İstanbul’da yerinde kurulum, Türkiye genelinde uzaktan destek.'],
  ];

  // Bilgi Bankası: en güçlü rehberler
  const kb = require('../kb');
  const kbHome = ['e-imza-rehberi', 'kep-rehberi', 'e-fatura-rehberi', 'e-donusum-gecis-rehberi'].map((s) => kb.articles.find((a) => a.slug === s)).filter(Boolean);
  const kbSection = `<section class="section section--light"><div class="container">
  <div class="section-head section-head--split"><div><span class="eyebrow">Bilgi Bankası</span><h2>Aklınıza takılanlar,<br>adım adım rehberler.</h2></div><div class="hero__actions" style="margin:0">${btn('/bilgi-bankasi/', 'Bilgi Bankası', 'btn--ghost')}${btn('/blog/', 'Blog', 'btn--ghost')}</div></div>
  <div class="grid grid--2">${kbHome.map((a) => `<a class="card" href="${a.path}" data-reveal><span class="chip" style="align-self:flex-start">${esc(kb.cats.find((c) => c.slug === a.cat).name)}</span><h3 style="margin:12px 0 8px;font-size:1.15rem">${esc(a.title)}</h3><p class="muted" style="margin:0">${esc(a.lead)}</p><span class="link-arrow" style="margin-top:14px">Rehberi oku ${icon('arrow')}</span></a>`).join('')}</div>
</div></section>`;
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
    <div class="media__chip"><strong>10+</strong><span>yıllık e-dönüşüm deneyimi</span></div>
  </div>
  <div>
    <span class="eyebrow">Neden Kurucu Bilişim?</span>
    <h2>Teknoloji ortağınızdan beklediğiniz her şey.</h2>
    <p class="lead">E-fatura, e-imza, KEP ya da yepyeni bir web sitesi. Başvurudan kuruluma, eğitimden yenileme takibine kadar tüm süreci tek ekip yönetir; siz işinize odaklanın.</p>
    <div>${homeReasons.map(([t, d], i) => `<div class="reason" data-story>${icBox(['users', 'bolt', 'coin', 'pin'][i])}<div><h3>${t}</h3><p>${d}</p></div></div>`).join('')}</div>
  </div>
</div></section>`;

  // Akış: ilk ekran → ayrıcalıklar → hizmetler → mesleğe özel e-imza → kampanyalar → neden biz → referanslar ve yorumlar → bilgi bankası → SSS → tek teklif bandı
  const body = `${hero}
<section class="section--tight" style="padding-top:0"><div class="container">${partnersMarquee()}</div></section>
${perksSection}
${tabs}
<section class="section section--light" style="padding-top:clamp(56px,7vw,96px)"><div class="container">
  <div class="section-head section-head--split"><div><span class="eyebrow">Mesleğinize özel e-imza</span><h2>Avukat, doktor, mühendis<br>ve müteahhitler için.</h2></div>
    <p class="lead" style="margin:0">UYAP’tan e-reçeteye, Yapı Denetim Sistemi’nden EKAP’a; mesleğinizin sistemlerinde sorunsuz çalışan e-imzayı kuruyoruz.</p></div>
  ${meslekGrid()}
</div></section>
${activeCampaigns().length ? `<section class="section promos"><div class="container">
  <div class="section-head section-head--split"><div><span class="eyebrow">Kampanyalar</span><h2>Şimdi başlamak için<br>tam zamanı.</h2></div>${btn('/kampanyalar/', 'Tüm kampanyalar', 'btn--ghost')}</div>
  ${rail(activeCampaigns().map((c, i) => campaignCard(c, i)).join(''), 'Güncel kampanyalar')}
</div></section>` : ''}
${why}
<section class="section"><div class="container">
  <div class="section-head section-head--split"><div><span class="eyebrow">Referanslarımız</span><h2>Bize güvenen markalar</h2></div>${btn('/referanslarimiz/', 'Tüm referanslar', 'btn--ghost')}</div>
  ${logoWall(18)}
  <div style="margin-top:clamp(40px,5vw,64px)">${quotesBlock()}</div>
</div></section>
${kbSection}
<section class="section"><div class="container">
  <div class="section-head center"><span class="eyebrow">Sıkça sorulan sorular</span><h2>Aklınızdaki sorular</h2><p class="lead">Aradığınız cevap burada yoksa <a href="/iletisim/" style="color:var(--link);font-weight:600">bize ulaşın</a>, hemen yanıtlayalım.</p></div>
  ${faqBlock(faqs.slice(0, 6))}
</div></section>
${ctaBand('İşletmenizi dijitalde bir adım öne taşıyalım', 'Ücretsiz ön görüşmede ihtiyaçlarınızı dinleyelim; işletmenize özel çözümü ve teklifi hazırlayalım.')}`;

  ctx.add('/', layout({
    path: '/',
    title: 'Kurucu Bilişim | E-İmza, Mali Mühür, KEP ve E-Fatura',
    desc: 'İstanbul merkezli Kurucu Bilişim; e-imza, mali mühür, KEP, e-fatura, e-defter, web tasarım, e-ticaret, ERP ve CRM çözümleri sunar. Ücretsiz teklif alın.',
    body,
    schema: [
      faqSchema(faqs.slice(0, 6)),
      { '@type': 'WebPage', '@id': site.url + '/#webpage', url: site.url + '/', name: 'Kurucu Bilişim', isPartOf: { '@id': site.url + '/#website' }, about: { '@id': site.url + '/#organization' }, inLanguage: 'tr-TR' },
    ],
  }), { priority: '1.0' });
};
