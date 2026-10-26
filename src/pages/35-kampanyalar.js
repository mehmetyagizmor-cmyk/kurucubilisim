// Kampanyalar sayfası (/kampanyalar/). Kampanya verisi: src/data.js → campaigns
const { campaigns, services, site } = require('../data');
const { layout, pageHero, ctaBand, btn, esc, icBox, svcPath, applyHref } = require('../lib');
const { activeCampaigns, campPath, campaignCard } = require('../components');

module.exports = (ctx) => {
  const p = '/kampanyalar/', crumbs = [['Ana Sayfa', '/'], ['Kampanyalar', p]];
  const list = activeCampaigns();
  if (campaigns.some((c) => c.ornek)) console.warn('⚠ Örnek (yer tutucu) kampanyalar yayına alınmadı: src/data.js → campaigns. Gerçek kampanyaları ornek: true olmadan ekleyin.');
  // Aktif kampanya yoksa sayfa üretilmez; menü bağlantıları da gizlenir (lib.js)
  if (!list.length) return;

  const body = `${pageHero({ eyebrow: 'Kampanyalar', h1: 'Güncel <span class="grad">kampanyalar</span>', lead: 'E-dönüşümden web tasarıma, işletmenize özel avantajlı paketler. Kampanyalar belirtilen tarihe kadar geçerlidir.', crumbs })}
<section class="section" style="padding-top:0"><div class="container">
  ${list.length
    ? `<div class="promo-grid">${list.map((c, i) => campaignCard(c, i, true)).join('')}</div>`
    : '<p class="lead center">Şu anda aktif bir kampanya bulunmuyor. Yeni kampanyalardan haberdar olmak için bizi takip edin.</p>'}
  <div class="promo-terms">
    <h2>Kampanya koşulları</h2>
    <ul>
      <li>Kampanyalar belirtilen son gün dahil geçerlidir ve başka kampanyalarla birleştirilemez.</li>
      <li>İndirimler hizmet bedeline uygulanır; yasal harç ve sertifika sağlayıcı ücretleri hariçtir.</li>
      <li>Kurucu Bilişim kampanya koşullarını önceden duyurmak kaydıyla değiştirme hakkını saklı tutar.</li>
    </ul>
  </div>
</div></section>
${ctaBand('Size en uygun paketi birlikte seçelim', 'Hangi kampanyanın işletmenize uygun olduğunu bilmiyor musunuz? Ücretsiz ön görüşmede birlikte belirleyelim.')}`;

  ctx.add(p, layout({
    path: p, crumbs, body,
    title: 'Kampanyalar | Kurucu Bilişim E-Dönüşüm ve Web Fırsatları',
    desc: 'E-imza, mali mühür, KEP, e-fatura ve kurumsal web sitesi hizmetlerinde güncel Kurucu Bilişim kampanyaları ve avantajlı paketler.',
  }), { priority: '0.7' });

  // Kendi sayfası olan kampanyalar (/kampanyalar/<slug>/)
  for (const c of list.filter((x) => x.sayfa)) {
    const s = c.sayfa, cp = campPath(c), svc = services.find((x) => x.slug === c.hizmet);
    const cc = [...crumbs, [c.baslik, cp]];
    const cbody = `${pageHero({ eyebrow: 'Kampanya', h1: esc(s.h1), lead: esc(s.lead), crumbs: cc, actions: btn(applyHref(c.hizmet), 'Kampanyadan Yararlanın', 'btn--primary btn--lg') + btn(`tel:${site.phone}`, 'Hemen Arayın', 'btn--ghost btn--lg', false) })}
<section class="section" style="padding-top:0"><div class="container">
  <h2>Kampanyada sizi neler bekliyor?</h2>
  <div class="grid grid--3" style="margin-top:28px">${s.ozellikler.map(([t, d], i) => `<div class="card" data-reveal style="--d:${(i % 3) * 0.07}s">${icBox(['coin', 'bolt', 'seal', 'receipt', 'layers'][i] || 'check')}<h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('')}</div>
</div></section>
${c.hizmet === 'e-fatura' ? `<section class="section section--light"><div class="container" style="max-width:820px">
  <h2>2027’de kimler e-faturaya geçmek zorunda?</h2>
  <p>2022 ve sonraki hesap dönemlerinde brüt satış hasılatı 3 milyon TL ve üzeri olan mükellefler, sınırı aştıkları yılı izleyen yılın Temmuz ayından itibaren e-fatura kullanmak zorundadır. Yani 2026 yılında hasılatı 3 milyon TL’yi geçen işletmelerin <strong>1 Temmuz 2027</strong>’ye kadar e-faturaya geçmesi gerekir.</p>
  <p>Zorunlu olup olmadığınızı 30 saniyede öğrenmek için <a href="/e-fatura-zorunlu-muyum/">e-fatura zorunluluk testini</a> çözebilirsiniz.</p>
  <p>Ayrıntılar için <a href="/bilgi-bankasi/e-fatura/e-fatura-rehberi/">E-Fatura Rehberi</a> ve <a href="/bilgi-bankasi/mevzuat/e-donusum-son-tarihler-takvimi/">e-dönüşüm son tarihler takvimi</a> sayfalarımıza göz atabilirsiniz.${svc ? ` Hizmetimizin ayrıntıları: <a href="${svcPath(svc)}">${esc(svc.short)}</a>.` : ''}</p>
</div></section>` : ''}
<section class="section"><div class="container">
  <div class="promo-terms" style="margin-top:0;border-top:0;padding-top:0">
    <h2>Kampanya koşulları</h2>
    <ul>${s.kosullar.map((k) => `<li>${esc(k)}</li>`).join('')}</ul>
  </div>
</div></section>
${ctaBand('Kampanyadan yararlanmak için bize ulaşın', 'E-faturaya geçiş sürecinizi birlikte planlayalım; başvurudan ilk faturanıza kadar yanınızdayız.')}`;
    ctx.add(cp, layout({ path: cp, crumbs: cc, body: cbody, title: s.title, desc: s.desc }), { priority: '0.7' });
  }
};
