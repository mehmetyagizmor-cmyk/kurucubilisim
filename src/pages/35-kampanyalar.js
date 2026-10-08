// Kampanyalar sayfası (/kampanyalar/). Kampanya verisi: src/data.js → campaigns
const { campaigns } = require('../data');
const { layout, pageHero, ctaBand } = require('../lib');
const { activeCampaigns, campaignCard } = require('../components');

module.exports = (ctx) => {
  const p = '/kampanyalar/', crumbs = [['Ana Sayfa', '/'], ['Kampanyalar', p]];
  const list = activeCampaigns();
  const placeholder = campaigns.some((c) => c.ornek);
  if (placeholder) console.warn('⚠ Kampanyalar örnek (yer tutucu) içerik içeriyor: src/data.js → campaigns. Yayından önce gerçek kampanyalarla değiştirin.');

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
    // Örnek içerik varken arama motorlarına kapalı
    noindex: placeholder,
    title: 'Kampanyalar | Kurucu Bilişim E-Dönüşüm ve Web Fırsatları',
    desc: 'E-imza, mali mühür, KEP, e-fatura ve kurumsal web sitesi hizmetlerinde güncel Kurucu Bilişim kampanyaları ve avantajlı paketler.',
  }), placeholder ? { sitemap: false } : { priority: '0.7' });
};
