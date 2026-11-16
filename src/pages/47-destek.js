// Destek sayfaları: e-Fatura Web Socket (GİB İmzalama Aracı) rehberi + Gerekli Yazılımlar
// Kural: kurulum dosyası sitede barındırılmaz; tüm indirme butonları resmî sayfalara gider.
// Teknik bilgilerin kaynağı (16.11.2026'da kontrol edildi):
//  - GİB e-Belge ana sayfası "İmzalama Aracı" bölümü: https://ebelge.gib.gov.tr/anasayfa.html
//  - GİB İmzalama Aracı (Windows) Kullanım Kılavuzu, Şubat 2023 (yeni, Java'sız araç)
//  - GİB İmzalama Aracı Kullanım Kılavuzu v1.2, Kasım 2019 (eski EFaturaWebSocket.jnlp)
//  - GİB e-Fatura İptal, İhtar/İtiraz Bildirim Kılavuzu v1.2 (8 gün kuralı)
//  - GİB İptal/İtiraz Portalı sayfası (wss://localhost:8543 bağlantısı ve "Web Socket ile Bağlantı Kurulamadı" uyarısı)
const fs = require('fs');
const path = require('path');
const { site } = require('../data');
const { layout, icon, icBox, esc, abs, crumbsHtml, aurora, pageHero, faqBlock, faqSchema, orgId, ctaBand } = require('../lib');
const { supportCta, topluDestek } = require('../components');

const ROOT = path.join(__dirname, '../..');
const GIB_HOME = 'https://ebelge.gib.gov.tr/anasayfa.html';
const IPTAL_PORTAL = 'https://ebelgebasvuru.gib.gov.tr/iptal-itiraz/sertifika-giris';
const UPDATED = '2026-11-16';
const fmt = (d) => new Date(d + 'T12:00:00').toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
const ext = (href, text) => `<a href="${href}" target="_blank" rel="noopener">${text}</a>`;

// Ekran görüntüsü / video yerleri: assets/img/web-socket/<ad>.webp eklenince otomatik görünür.
const IMG_DIR = 'assets/img/web-socket';
const shot = (name, alt) => {
  const file = path.join(ROOT, IMG_DIR, name + '.webp');
  if (!fs.existsSync(file)) return `<!-- GÖRSEL YERİ: /${IMG_DIR}/${name}.webp (${alt}) -->`;
  return `<figure class="ws-shot"><img src="/${IMG_DIR}/${name}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"><figcaption>${esc(alt)}</figcaption></figure>`;
};

const downloadBox = () => `<div class="ws-download">
  <div><strong>GİB İmzalama Aracı’nı indirin</strong><small>Açılan GİB e-Belge sayfasında, sağ alttaki “İmzalama Aracı” bölümünden indirin.</small></div>
  <div class="ws-download__act"><a class="btn btn--primary" href="${GIB_HOME}" target="_blank" rel="noopener">${icon('link')}Resmî GİB sayfasından indir</a><small>${icon('shield')}Resmî GİB sayfasına gider</small></div>
</div>`;

const WS_FAQS = [
  ['E-fatura web socket nedir?', 'GİB’in imzalama aracıdır. Mükellefler e-Fatura Portalı, e-Arşiv Portalı ve e-Fatura İptal/İtiraz Portalı başta olmak üzere GİB e-Belge uygulamalarına mali mühür veya e-imzayla bu araç üzerinden giriş yapar ve belge onaylar.'],
  ['Web socket nereden indirilir?', 'GİB e-Belge ana sayfasındaki (ebelge.gib.gov.tr) “İmzalama Aracı” bölümünden indirilir. Kurulum dosyasını yalnızca bu resmî sayfadan indirmenizi öneririz.'],
  ['Yeni imzalama aracı için Java gerekir mi?', 'Hayır. GİB, yeni imzalama aracının Java uygulaması gerektirmeden çalıştığını ve Windows işletim sisteminde geçerli olduğunu belirtir. Eski EFaturaWebSocket.jnlp yöntemi ise Java ile çalışır.'],
  ['“İmza socket sunucusuna erişilemedi” hatası neden çıkar?', 'GİB kılavuzuna göre iki sebebi olabilir: imzalama aracı çalışmıyordur ya da tarayıcınız imzalama aracına (https://localhost:8543) erişemiyordur. Aracı çalıştırıp sayfayı yenileyin; düzelmezse tarayıcıda https://localhost:8543 adresini açıp güvenlik uyarısında devam edin.'],
  ['İmzalama aracı açıkken ikinci kez açılır mı?', 'Hayır. GİB kılavuzuna göre çalışan bir imzalama aracı varsa ikinci bir program çalıştırılamaz; açık olanı kapatıp yenisini açabilirsiniz.'],
  ['E-fatura kaç gün içinde iptal edilir?', 'GİB kılavuzuna göre e-fatura, alıcıya iletildiği tarihten itibaren 8 gün içinde iptal edilebilir. Ticari faturada iptal ret yanıtıyla, temel faturada e-Fatura İptal/İtiraz Portalı’ndan açılan talebin karşı tarafça onaylanmasıyla yapılır.'],
];

module.exports = async (ctx) => {
  // ---------- /e-fatura-web-socket/ ----------
  {
    const p = '/e-fatura-web-socket/';
    const crumbs = [['Ana Sayfa', '/'], ['Bilgi Bankası', '/bilgi-bankasi/'], ['e-Fatura Web Socket', p]];
    const toc = [
      ['web-socket-nedir', 'Web Socket nedir?'],
      ['yeni-ve-eski-arac', 'Yeni araç ve eski araç farkı'],
      ['kurulum', 'Adım adım kurulum'],
      ['hatalar', 'Hata mesajları ve çözümleri'],
      ['iptal-itiraz', 'İptal/İtiraz Portalı'],
      ['sss', 'Sık sorulan sorular'],
    ];
    const body = `<section class="hero hero--page">${aurora}
  <div class="container" style="max-width:980px">
    ${crumbsHtml(crumbs)}
    <span class="chip">GİB İmzalama Aracı</span>
    <h1 style="font-size:clamp(2rem,4.4vw,3.2rem);margin-top:16px">e-Fatura Web Socket: GİB İmzalama Aracı İndirme, Kurulum ve Hata Çözümleri</h1>
    <p class="lead" style="margin-inline:auto">e-Fatura, e-Arşiv ve İptal/İtiraz portallarına mali mühür veya e-imzayla girmek için gereken GİB imzalama aracını resmî kaynaktan indirin, adım adım kurun ve sık görülen hataları çözün.</p>
    <div class="post-meta"><span>${icon('doc')}Son güncelleme: <time datetime="${UPDATED}">${fmt(UPDATED)}</time></span><span>${icon('users')}Kurucu Bilişim Destek Ekibi</span></div>
  </div>
</section>
<section class="section" style="padding-top:0"><div class="container" style="max-width:1240px">
  <div class="article-layout">
    <article class="prose" data-article>

<h2 id="web-socket-nedir">Web Socket nedir?</h2>
<p>“e-Fatura web socket” olarak aranan program, Gelir İdaresi Başkanlığı’nın (GİB) <strong>imzalama aracı</strong>dır. GİB’in açıklamasına göre bu araç, e-Belge başvurularınızı imzalamak ve imzalı giriş işlemlerinizi daha kolay yapabilmeniz için geliştirilmiştir.</p>
<p>Mükellefler e-Fatura Portalı ve e-Arşiv Portalı’na, e-Fatura İptal/İtiraz Portalı da dahil olmak üzere, mali mühür veya e-imzayla bu araç üzerinden giriş yapar. GİB kılavuzuna göre araç e-Defter ve e-Bilet uygulamalarında da kullanılır. Araç, tarayıcıyla bilgisayarınızdaki <code>https://localhost:8543</code> adresi üzerinden haberleşir; bu yüzden işlem süresince açık kalmalıdır.</p>
${downloadBox()}
${supportCta('GİB imzalama aracı (web socket) kurulumu')}

<h2 id="yeni-ve-eski-arac">Yeni araç ve eski araç farkı</h2>
<p>GİB e-Belge ana sayfasında iki imzalama aracı yer alır. Eski yöntemi arayan çok kullanıcı olduğu için ikisini de anlatıyoruz.</p>
<div class="table-wrap"><table><thead><tr><th></th><th>Yeni GİB E-İmza Aracı</th><th>Eski araç (EFaturaWebSocket.jnlp)</th></tr></thead><tbody>
<tr><td><strong>Java</strong></td><td>Gerekmez (GİB: “Java Uygulaması gerektirmeden”)</td><td>Gerekir: Java Web Start ile çalışır. GİB ana sayfası “Java 1.7 ve üstü”, 2019 kılavuzu en az Java 1.7 32 bit diyor.</td></tr>
<tr><td><strong>İşletim sistemi</strong></td><td>Windows</td><td>Java’nın çalıştığı sistemler</td></tr>
<tr><td><strong>Dosya</strong></td><td>GibeImzaAraciKurulum.zip içindeki setup.exe</td><td>EFaturaWebSocket.jnlp</td></tr>
<tr><td><strong>Ön koşullar</strong></td><td>KamuSM Sürücü 6.4.1 veya üstü, Visual C++ Redistributable, .NET Framework 4.7.2 veya üstü (eksikse kurulum indirir)</td><td>32 bit Java; Java Kontrol Paneli’nde Runtime Parameters alanına <code>-Djava.security.debug=sunpkcs11</code> yazılması gerekebilir</td></tr>
<tr><td><strong>Kılavuz</strong></td><td>${ext('https://ebelge.gib.gov.tr/dosyalar/kilavuzlar/Imzalama_Araci_Kullanim_Kilavuzu.pdf', 'GİB kılavuzu (Şubat 2023)')}</td><td>${ext('https://ebelge.gib.gov.tr/dosyalar/kilavuzlar/Imzalama_Araci_Kullanim_Kilavuzu-v1.2.pdf', 'GİB kılavuzu v1.2 (Kasım 2019)')}</td></tr>
</tbody></table></div>
<p>Java desteği tarayıcılardan kalktığı için GİB 2019 kılavuzunda ileride imzalama aracı olmadan fatura imzalamanın ve portala girmenin mümkün olmayabileceğini belirtmişti. Bugün yeni kurulum yapacaksanız Java gerektirmeyen yeni aracı öneririz.</p>
${supportCta('imzalama aracı kurulumu')}

<h2 id="kurulum">Adım adım kurulum (yeni GİB E-İmza Aracı)</h2>
<p>Aşağıdaki adımlar GİB’in İmzalama Aracı (Windows) Kullanım Kılavuzu’na göre hazırlanmıştır.</p>
<h3>1. Kurulumdan önce</h3>
<p>Bilgisayarınızda KamuSM Sürücü 6.4.1 veya daha yeni bir sürüm kurulu olmalıdır. Kurulumun sonunda bilgisayar otomatik olarak yeniden başlatılır; açık dosyalarınızı kaydedip kapatın.</p>
${shot('adim-1', 'Kurulum öncesi hazırlık')}
<h3>2. Kurulum dosyasını resmî sayfadan indirin</h3>
<p>GİB e-Belge ana sayfasında sağ alttaki “İmzalama Aracı” bölümüne gidin ve Java gerektirmeyen yeni imzalama aracının yanındaki “İndirmek için tıklayınız” bağlantısıyla GibeImzaAraciKurulum.zip dosyasını indirin.</p>
${shot('adim-2', 'GİB e-Belge ana sayfasında İmzalama Aracı bölümü')}
<h3>3. setup.exe dosyasını çalıştırın</h3>
<p>Zip dosyasını açın ve içindeki setup.exe dosyasına çift tıklayın. Visual C++ Redistributable veya .NET Framework eksikse kurulum bunları indirip kurar.</p>
${shot('adim-3', 'setup.exe ile kurulumun başlatılması')}
<h3>4. Kurulumu tamamlayın</h3>
<p>Bilgilendirme ekranlarında “İleri” ile devam edin, yükleme klasörünü onaylayın ve son ekranı “Kapat” ile kapatın. Bilgisayar yeniden başlar.</p>
${shot('adim-4', 'Kurulum sihirbazı ekranları')}
<h3>5. İmzalama aracını çalıştırın</h3>
<p>Masaüstüne gelen simgeye tıklayın. Araç çalıştığında bilgilendirme ekranı gelir ve tarayıcınızda araçla işlem yapılabilecek uygulama girişleri sekme olarak açılır. İmza atabilmeniz için araç işlem süresince kapatılmamalıdır; “Uygulamayı Gizle” ile ekrandan kaldırabilirsiniz, bu çalışmasını etkilemez.</p>
${shot('adim-5', 'Çalışan imzalama aracı ve menüsü')}
<h3>6. Portala giriş yapın</h3>
<p>e-Fatura Portalı’nda (portal.efatura.gov.tr/efatura/) “İmzalama aracı desteğiyle giriş yapmak için tıklayın” bağlantısını seçin, “Başla”ya basın. “Akıllı kartınızın işlemcisi” alanında kartınızı seçip akıllı kart şifrenizi girin, “Tamam” deyin ve sertifika bilgilerini onaylayın.</p>
${shot('adim-6', 'e-Fatura Portalı’na imzalama aracıyla giriş')}
${shot('video', 'Kurulum videosu')}
<h3>Eski araçla (EFaturaWebSocket.jnlp) kurulum</h3>
<ol>
<li>Bilgisayarınızda en az Java 1.7’nin 32 bit sürümü kurulu olmalıdır. Gerekirse Java Kontrol Paneli’nde Java sekmesi → View → Runtime Parameters alanına <code>-Djava.security.debug=sunpkcs11</code> yazın.</li>
<li>GİB e-Belge ana sayfasındaki “İmzalama Aracı” bölümünden EFaturaWebSocket.jnlp dosyasını indirin ve çift tıklayın. Onay ekranı gelirse “Run (Çalıştır)” deyin.</li>
<li>Tarayıcınızda <code>https://localhost:8543</code> adresini açın ve güvenlik uyarısında siteye devam edin (aşağıdaki hata bölümüne bakın).</li>
</ol>
${supportCta('imzalama aracı kurulumu')}

<h2 id="hatalar">Hata mesajları ve çözümleri</h2>

<h3>“İmza socket sunucusuna erişilemedi”</h3>
<p>Tam metni: “İmza socket sunucusuna erişilemedi. Lütfen imza socket yazılımını çalıştırıp sayfayı yenileyiniz.” GİB kılavuzuna göre bu hatanın iki sebebi olabilir:</p>
<ul>
<li><strong>İmzalama aracı çalışmıyordur.</strong> Aracı masaüstü simgesinden (eski yöntemde EFaturaWebSocket.jnlp ile) başlatın ve sayfayı yenileyin.</li>
<li><strong>Tarayıcı imzalama aracına erişemiyordur.</strong> Araç, mali mühür kullanılan ekranlarla <code>https://localhost:8543</code> adresi üzerinden haberleştiği için bu adresin tarayıcıya güvenli olarak tanıtılması gerekir. Tarayıcıda <code>https://localhost:8543</code> adresini açın. Chrome’da “Gelişmiş” → “localhost sitesine ilerle”, Firefox’ta “Tehlikenin farkındayım” → “Ayrıcalık tanı” → “Güvenlik ayrıcalığını doğrula” adımlarını izleyin. Ardından portal sayfasını yenileyin.</li>
</ul>

<h3>“Web Socket ile Bağlantı Kurulamadı”</h3>
<p>GİB’in yeni e-Fatura İptal/İtiraz Portalı’nda, imzalama aracına ulaşılamadığında akıllı kart alanının altında bu uyarı görünür. Sebep ve çözüm yukarıdakiyle aynıdır: imzalama aracını çalıştırın, tarayıcının <code>https://localhost:8543</code> adresine erişebildiğinden emin olun ve sayfayı yenileyin.</p>

<h3>“Sertifika bulunamadı” / kart listede görünmüyor</h3>
<ul>
<li>Mali mühür veya e-imza kartınızın kart okuyucuya doğru takılı olduğunu kontrol edin.</li>
<li>Giriş ekranındaki “Akıllı kartınızın işlemcisi” alanında doğru kart tipini seçin.</li>
<li>Kart okuyucu sürücüsünün kurulu olduğundan emin olun. GİB, yeni araç için KamuSM Sürücü 6.4.1 veya üstünü şart koşar.</li>
<li>Kartın bilgisayar tarafından görülüp görülmediğini <a href="/bilgi-bankasi/mali-muhur/akis-kart-izleme-araci/">AKİS Kart İzleme Aracı</a> ile kontrol edebilirsiniz.</li>
<li>Sertifikanın süresi dolduysa yenilenmesi gerekir: <a href="/bilgi-bankasi/mali-muhur/mali-muhur-yenileme-nasil-yapilir/">Mali Mühür Yenileme</a>.</li>
</ul>

<h3>Kart okuyucu ve sürücü sorunları</h3>
<p>Kart okuyucu sürücüsü ve AKİS paketi, Kamu SM’nin ${ext('https://kamusm.bilgem.tubitak.gov.tr/islemler/surucu_yukleme_servisi/', 'Sürücü Yükleme Servisi')}’nden işletim sistemine göre indirilir. Sürücü kurulduktan sonra bilgisayarı yeniden başlatın. Ayrıntılar: <a href="/bilgi-bankasi/mali-muhur/mali-muhur-kurulumu-ve-aktivasyonu/">Mali Mühür Kurulumu ve Aktivasyonu</a>.</p>

<h3>İmzalama aracı ikinci kez açılmıyor</h3>
<p>GİB kılavuzuna göre çalışan bir imzalama aracı varsa ikinci bir program çalıştırılamaz. Açık olan aracı kapatıp yeniden açın.</p>

<h3>Portalda “akıllı kartınıza erişim” güvenlik uyarısı</h3>
<p>GİB İptal/İtiraz Portalı’ndaki uyarıya göre, “Tamam” butonuna bastıktan sonra elektronik imza uygulamasının akıllı kartınıza erişiminin engellenmesiyle ilgili bir güvenlik uyarısı verilirse <strong>Hayır (No)</strong> seçilmelidir.</p>

<h3>PIN kilitlendi</h3>
<p>Art arda yanlış şifre girildiğinde kart kilitlenir. Mali mühürde kilit Kamu SM Online İşlemler üzerinden çözülür: <a href="/bilgi-bankasi/mali-muhur/mali-muhur-pin-sifresi-nasil-olusturulur/">Mali Mühür PIN Oluşturma ve Kilit Çözme</a>.</p>
${supportCta('imzalama aracı hatası')}

<h2 id="iptal-itiraz">İptal/İtiraz Portalı</h2>
<p>GİB’in e-Fatura İptal, İhtar/İtiraz Bildirim Kılavuzu’na göre temel senaryodaki bir e-faturanın iptali için, fatura <strong>alıcıya iletildiği tarihten itibaren 8 gün içinde</strong> e-Fatura İptal/İtiraz Portalı’ndan iptal talebi açılır ve talebin <strong>karşı tarafça onaylanması</strong> gerekir. Talebi satıcı açtıysa alıcı, alıcı açtıysa satıcı onaylar. 8 günü aşan sürelerde sistem iptal talebi oluşturulmasına veya onaylanmasına izin vermez.</p>
<div class="table-wrap"><table><thead><tr><th>Senaryo</th><th>İptal nasıl yapılır?</th><th>Süre</th></tr></thead><tbody>
<tr><td><strong>Ticari fatura</strong></td><td>Alıcı, e-fatura sistemi içinden ret yanıtı gönderir.</td><td>Alıcıya iletildiği tarihten itibaren 8 gün</td></tr>
<tr><td><strong>Temel fatura</strong></td><td>İptal/İtiraz Portalı’ndan iptal talebi açılır, karşı taraf onaylar.</td><td>Alıcıya iletildiği tarihten itibaren 8 gün</td></tr>
</tbody></table></div>
<p>Portala imzalama aracı açıkken mali mühür veya e-imzanızla girilir. Portalın güncel adresi: ${ext(IPTAL_PORTAL, 'ebelgebasvuru.gib.gov.tr/iptal-itiraz')}. Adım adım anlatım için <a href="/bilgi-bankasi/e-fatura/e-fatura-nasil-iptal-edilir/">E-Fatura Nasıl İptal Edilir?</a> rehberimize bakın.</p>
${supportCta('e-fatura iptal portalı girişi')}

<h2 id="sss">Sık sorulan sorular</h2>
${faqBlock(WS_FAQS)}

<p><em>Resmî kaynaklar:</em> ${ext(GIB_HOME, 'GİB e-Belge ana sayfası (İmzalama Aracı)')} · ${ext('https://ebelge.gib.gov.tr/dosyalar/kilavuzlar/Imzalama_Araci_Kullanim_Kilavuzu.pdf', 'İmzalama Aracı Kullanım Kılavuzu (2023)')} · ${ext('https://ebelge.gib.gov.tr/dosyalar/kilavuzlar/Imzalama_Araci_Kullanim_Kilavuzu-v1.2.pdf', 'İmzalama Aracı Kullanım Kılavuzu v1.2 (2019)')} · ${ext(IPTAL_PORTAL, 'GİB e-Fatura İptal/İtiraz Portalı')}</p>
<div style="margin-top:32px">${topluDestek()}</div>
    </article>
    <aside class="sidebar" aria-label="Rehber araçları">
      <nav class="card" aria-label="İçindekiler"><h2>İçindekiler</h2><ol class="toc">${toc.map(([id, t]) => `<li><a href="#${id}">${esc(t)}</a></li>`).join('')}</ol></nav>
      <div class="card svc-cta">${icBox('link')}<h3>Resmî indirme</h3><p>Kurulum dosyasını yalnızca GİB’in resmî sayfasından indirin.</p><a class="btn btn--primary btn--sm" href="${GIB_HOME}" target="_blank" rel="noopener">GİB sayfasına git</a><p style="margin:10px 0 0;font-size:.85rem;color:var(--muted)">Resmî GİB sayfasına gider</p></div>
      <div class="card svc-cta">${icBox('briefcase')}<h3>Gerekli yazılımlar</h3><p>AnyDesk, Java, AKİS ve uzak bağlantı araçlarının resmî indirme sayfaları.</p><a class="btn btn--ghost btn--sm" href="/gerekli-yazilimlar/">Listeyi aç</a></div>
    </aside>
  </div>
</div></section>
${ctaBand('Kurulumla uğraşmayın', 'Uzaktan bağlanıp imzalama aracını, sürücüleri ve portal girişini sizin yerinize kuralım.')}`;

    ctx.add(p, layout({
      path: p, crumbs, body,
      title: 'e-Fatura Web Socket İndir: GİB İmzalama Aracı Kurulumu',
      desc: 'e-Fatura web socket (GİB imzalama aracı) nereden indirilir, nasıl kurulur? Java’sız yeni araç, eski .jnlp yöntemi, hata çözümleri ve iptal portalı.',
      ogType: 'article',
      schema: [{
        '@type': 'TechArticle', '@id': abs(p) + '#article', mainEntityOfPage: abs(p),
        headline: 'e-Fatura Web Socket: GİB İmzalama Aracı İndirme, Kurulum ve Hata Çözümleri',
        dateModified: UPDATED, inLanguage: 'tr-TR',
        author: { '@type': 'Organization', '@id': orgId, name: site.name }, publisher: { '@id': orgId },
      }, faqSchema(WS_FAQS)],
    }), { priority: '0.8', lastmod: UPDATED });
  }

  // ---------- /gerekli-yazilimlar/ ----------
  {
    const p = '/gerekli-yazilimlar/';
    const crumbs = [['Ana Sayfa', '/'], ['Gerekli Yazılımlar', p]];
    const apps = [
      ['phone', 'AnyDesk', 'Uzak masaüstü destek bağlantısı. Programı açtığınızda ekranda görünen adres numarasını bize iletirsiniz, onay verdiğinizde uzmanımız bilgisayarınıza bağlanarak kurulumu yapar.', 'https://anydesk.com/tr/downloads'],
      ['monitor', 'Chrome Uzaktan Masaüstü', 'Google’ın uzak bağlantı aracı. Uzaktan Destek sayfasında “Destek Alın” altından bir kod oluşturup bize iletirsiniz; kod yalnızca bir kez çalışır.', 'https://remotedesktop.google.com/support'],
      ['seal', 'AKİS Akıllı Kart İzleme Aracı', 'Mali mühür ve Kamu SM e-imza kartlarının bilgisayarda görünüp görünmediğini, sertifikaları ve PIN işlemlerini gösterir. Kamu SM’nin sürücü paketiyle birlikte gelir.', 'https://kamusm.bilgem.tubitak.gov.tr/islemler/surucu_yukleme_servisi/'],
      ['coin', 'Java', 'Eski GİB imzalama aracı (EFaturaWebSocket.jnlp), E-Fatura Görüntüleyici ve AKİS Kart İzleme Aracı gibi Java tabanlı programlar için gereklidir. GİB’in eski imzalama aracı 32 bit Java ister; açılan listede “Windows Çevrim dışı” sürümünü seçin.', 'https://www.java.com/tr/download/manual.jsp'],
      ['sync', 'GİB İmzalama Aracı (Web Socket)', 'e-Fatura, e-Arşiv ve İptal/İtiraz portallarına mali mühür veya e-imzayla giriş için GİB’in imzalama aracı. GİB e-Belge sayfasında sağ alttaki “İmzalama Aracı” bölümündedir.', GIB_HOME],
    ];
    const body = `${pageHero({ eyebrow: 'Yazılımlar ve Destek', h1: 'Gerekli <span class="grad">yazılımlar</span>', lead: 'Uzaktan destek, e-imza ve mali mühür işlemleri için gereken programlar. Tüm bağlantılar programların resmî indirme sayfalarına gider; sitemizde dosya barındırılmaz.', crumbs })}
<section class="section" style="padding-top:0"><div class="container">
  <div class="grid grid--3">${apps.map(([ic, t, d, href]) => `<div class="card app-card">${icBox(ic)}<h2>${esc(t)}</h2><p>${esc(d)}</p><a class="btn btn--primary btn--sm" href="${href}" target="_blank" rel="noopener">Resmî sayfaya git ${icon('arrow')}</a><small>${esc(new URL(href).hostname)}</small></div>`).join('')}</div>
  <p class="muted" style="text-align:center;margin-top:24px">Kurulum rehberi: <a href="/e-fatura-web-socket/">e-Fatura Web Socket (GİB İmzalama Aracı)</a></p>
  <div style="max-width:980px;margin:40px auto 0">${supportCta('program kurulumu')}</div>
  <div style="max-width:980px;margin:24px auto 0">${topluDestek()}</div>
</div></section>
${ctaBand()}`;
    ctx.add(p, layout({
      path: p, crumbs, body,
      title: 'Gerekli Yazılımlar: AnyDesk, Java, AKİS, GİB İmza Aracı',
      desc: 'Uzaktan destek ve e-imza işlemleri için AnyDesk, Chrome Uzaktan Masaüstü, AKİS Kart İzleme Aracı, Java ve GİB imzalama aracının resmî indirme sayfaları.',
      schema: [{ '@type': 'CollectionPage', url: abs(p), name: 'Gerekli Yazılımlar', inLanguage: 'tr-TR', publisher: { '@id': orgId } }],
    }), { priority: '0.6', lastmod: UPDATED });
  }
};
