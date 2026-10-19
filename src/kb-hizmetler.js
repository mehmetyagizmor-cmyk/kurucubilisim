// Bilgi Bankası: her e-dönüşüm hizmeti için bir bilgi sayfası (patronun gönderdiği haberlerin yapısında).
// Patron onayladı (19 Ekim 2026). Yeni taslaklar için yazıya `taslak: true` eklenir.
const { esc } = require('./lib');

const p = (t) => `<p>${esc(t)}</p>`;
const sub = (t) => `<p><strong>${esc(t)}</strong></p>`;
const h2 = (t) => `<h2>${esc(t)}</h2>`;
const h3 = (t) => `<h3>${esc(t)}</h3>`;
const ulBold = (items) => `<ul>${items.map(([t, d]) => `<li><strong>${esc(t)}:</strong> ${esc(d)}</li>`).join('')}</ul>`;
const ul = (items) => `<ul>${items.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`;
const olBold = (items) => `<ol>${items.map(([t, d]) => `<li><strong>${esc(t)}:</strong> ${esc(d)}</li>`).join('')}</ol>`;
const note = (t) => `<blockquote><p>${esc(t)}</p></blockquote>`;

// Ek bölüm: [başlık, ...html parçaları] — html parçası düz metinse <p> olur
const sect = ([t, ...parts]) => [h2(t), ...parts.map((x) => (x.startsWith('<') ? x : p(x)))].join('\n');
// Resmî kaynaklar (yeni sekmede açılır)
const sources = (list) => `<p><em>Resmî kaynaklar:</em> ${list.map(([t, u]) => `<a href="${u}" target="_blank" rel="noopener">${esc(t)}</a>`).join(' · ')}</p>`;

// Ortak iskelet: (kısaca) → giriş → nedir → [ekler] → kimler → [ekler] → avantajlar → süreç → [ekler] → fiyat → [kaynaklar] → kapanış
// Google: aranan soru ilk paragrafta 2 cümleyle cevaplanır (öne çıkan snippet), ardından kapsamlı bölümler gelir.
function info(o) {
  const html = [
    ...(o.kisaca ? [`<p><strong>Kısaca:</strong> ${esc(o.kisaca)}</p>`] : []),
    ...o.intro.map(p),
    sub(o.subline),
    h2(o.nedirTitle || `${o.name} Nedir?`), ...o.nedir.map(p),
    ...(o.afterNedir || []).map(sect),
    h2(o.kimlerTitle || `${o.name} Kimler İçin Zorunlu?`), ...(o.kimlerIntro ? [p(o.kimlerIntro)] : []), ul(o.kimler), ...(o.kimlerNote ? [note(o.kimlerNote)] : []),
    ...(o.afterKimler || []).map(sect),
    h2(`${o.name} Kullanmanın Avantajları`), ...o.avantaj.map(([t, d], i) => `${h3(`${i + 1}. ${t}`)}${p(d)}`),
    h2(o.surecTitle || `Kurucu Bilişim ile ${o.name} Süreci Nasıl İşler?`), olBold(o.surec),
    ...(o.afterSurec || []).map(sect),
    h2(`${o.name} Fiyatları`), p(o.fiyat || `${o.name} ücretleri; kullanım hacmine, seçilen pakete, entegrasyon ihtiyacına ve hizmet kapsamına göre değişir. İşletmenizin ihtiyaçlarını belirleyerek size özel fiyat teklifi hazırlıyoruz.`),
    ...(o.fiyatLink ? [o.fiyatLink] : []),
    ...(o.sources ? [sources(o.sources)] : []),
  ].join('\n');
  // Kapanış SSS'den sonra, tek teklif kutusunun hemen üstünde durur (patron: butonlar yalnız en sonda)
  const outro = [h2(`Kurucu Bilişim ile ${o.name} Süreçlerinizi Dijitalleştirin`), p(o.kapanis), sub(o.kapanisSub)].join('\n');
  return { cat: o.cat, slug: o.slug, svc: o.svc, title: o.title, lead: o.lead, html, outro, faqs: o.faqs, info: true, updated: o.updated || '2026-10-19' };
}

module.exports = [
  info({
    cat: 'e-fatura', svc: 'e-fatura', slug: 'e-fatura-rehberi', name: 'E-Fatura',
    title: 'E-Fatura Nedir? Kimler Geçmek Zorunda, Nasıl Başvurulur? (2026)',
    lead: 'E-fatura; GİB sistemine kayıtlı mükellefler arasında elektronik ortamda düzenlenip iletilen yasal faturadır. Kimlerin geçmek zorunda olduğunu, nasıl çalıştığını ve başvuru adımlarını anlattık.',
    updated: '2026-10-20',
    kisaca: 'E-fatura, kâğıt faturayla aynı hukuki niteliğe sahip olan ve Gelir İdaresi Başkanlığı (GİB) sistemine kayıtlı iki mükellef arasında elektronik ortamda düzenlenip iletilen faturadır. 2022 ve sonraki hesap dönemlerinde brüt satış hasılatı 3 milyon TL ve üzeri olan mükellefler, izleyen yılın Temmuz ayından itibaren e-faturaya geçmek zorundadır.',
    intro: [
      'Faturaların kâğıda basılması, imzalanması, kargoyla gönderilmesi ve arşivlenmesi işletmeler için ciddi zaman ve maliyet demektir. E-fatura bu süreci tamamen dijital ortama taşır: fatura saniyeler içinde alıcıya ulaşır, elektronik olarak saklanır ve muhasebe programınıza otomatik aktarılabilir.',
      'Bu rehberde e-faturanın ne olduğunu, kimler için zorunlu olduğunu, nasıl çalıştığını, e-arşiv faturadan farkını ve başvuru adımlarını tek yerde topladık.',
    ],
    subline: 'E-faturaya geçişinizi mali mühür temininden program entegrasyonuna kadar tek noktadan yönetiyoruz.',
    nedir: [
      'E-fatura, Vergi Usul Kanunu’na göre kâğıt faturayla aynı hukuki niteliğe sahip olan ve elektronik ortamda düzenlenen faturadır. E-fatura yalnızca GİB’in e-fatura sistemine kayıtlı iki mükellef arasında, GİB altyapısı üzerinden iletilir.',
      'Faturalar şirketler için mali mühürle, gerçek kişi mükellefler için e-imzayla imzalanır. Bu sayede faturanın kim tarafından düzenlendiği ve sonradan değiştirilmediği güvence altına alınır.',
    ],
    afterNedir: [
      ['E-Fatura Nasıl Çalışır?',
        olBold([
          ['Düzenleme', 'Fatura, muhasebe programınızda, entegratör ekranında veya GİB portalında elektronik olarak hazırlanır.'],
          ['İmzalama', 'Fatura mali mühür veya e-imzayla (ya da özel entegratör aracılığıyla) imzalanır.'],
          ['İletim', 'İmzalı fatura GİB altyapısı üzerinden alıcının e-fatura kutusuna ulaşır.'],
          ['Yanıt', 'Ticari fatura senaryosunda alıcı faturayı kabul veya reddedebilir; temel faturada yanıt beklenmez.'],
          ['Saklama', 'Fatura, mevzuattaki saklama süreleri boyunca elektronik ortamda saklanır.'],
        ])],
      ['Temel Fatura ve Ticari Fatura Senaryoları',
        'E-faturada iki senaryo vardır. Temel faturada fatura alıcıya iletildiğinde süreç tamamlanır; itiraz gerekirse sistem dışındaki yöntemlerle yapılır. Ticari faturada ise alıcı, faturayı sistem üzerinden kabul veya reddedebilir; ret için mevzuatta belirlenen süre (8 gün) içinde yanıt verilir.'],
      ['E-Fatura ile E-Arşiv Fatura Arasındaki Fark',
        ulBold([
          ['E-fatura', 'Alıcı da e-fatura sistemine kayıtlıysa düzenlenir ve GİB üzerinden alıcının e-fatura kutusuna iletilir.'],
          ['E-arşiv fatura', 'Alıcı e-fatura sistemine kayıtlı değilse (ör. son tüketici veya kayıtlı olmayan firma) düzenlenir; alıcıya e-posta veya kâğıt çıktı olarak iletilir ve GİB’e raporlanır.'],
        ]),
        `<p>Ayrıntılar için <a href="/bilgi-bankasi/e-arsiv-fatura/e-arsiv-fatura-rehberi/">E-Arşiv Fatura Rehberi</a>’ne bakabilirsiniz.</p>`],
    ],
    kimlerTitle: 'E-Faturaya Geçmek Kimler İçin Zorunlu?',
    kimlerIntro: 'E-faturaya geçiş zorunluluğu GİB’in yayımladığı Vergi Usul Kanunu genel tebliğleriyle belirlenir. Başlıca kapsamdaki mükellefler:',
    kimler: [
      '2022 ve sonraki hesap dönemlerinde brüt satış hasılatı 3 milyon TL ve üzeri olan mükellefler (izleyen yılın Temmuz ayından itibaren)',
      'İnternet üzerinden mal ve hizmet satışı yapan ve tebliğde belirlenen hasılat sınırını (500 bin TL) aşan mükellefler',
      'Gayrimenkul alım satımı, kiralanması veya motorlu taşıt ticaretiyle uğraşan ve belirlenen hadleri aşan mükellefler',
      'Turizm işletme belgesine sahip konaklama işletmeleri gibi sektörel olarak kapsama alınanlar',
      'Bu mükelleflerden mal veya hizmet alımı yapan ve belirli koşulları taşıyan diğer mükellefler',
    ],
    kimlerNote: 'Ciro sınırları, sektörel kapsam ve geçiş tarihleri GİB tebliğleriyle güncellenebilir. İşletmenizin kapsamda olup olmadığını mali müşavirinizle veya bizimle birlikte kontrol etmeniz önerilir.',
    afterKimler: [
      ['E-Faturaya Geçmezsem Ne Olur?',
        'Zorunlu kapsamda olduğu hâlde e-faturaya geçmeyen veya kâğıt fatura düzenlemeye devam eden mükelleflere Vergi Usul Kanunu kapsamında özel usulsüzlük cezası uygulanabilir. Ayrıca düzenlenen kâğıt faturalar hiç düzenlenmemiş sayılabilir. Ceza tutarları her yıl yeniden belirlendiği için güncel tutarı mali müşavirinizden teyit etmeniz önerilir.'],
      ['E-Faturaya Geçmek İçin Ne Gerekir?',
        ulBold([
          ['Mali mühür veya e-imza', 'Şirketler mali mühür, gerçek kişi mükellefler mali mühür veya e-imza kullanabilir.'],
          ['Kullanım yöntemi', 'GİB portalı, özel entegratör veya doğrudan entegrasyon yöntemlerinden biri seçilir.'],
          ['Başvuru', 'E-fatura başvurusu GİB sistemi üzerinden yapılır ve onaylandığında mükellef e-fatura kayıtlı kullanıcılar listesine eklenir.'],
        ])],
    ],
    avantaj: [
      ['Anında İletim', 'Faturalarınız saniyeler içinde alıcıya ulaşır; kargo ve posta beklemesi ortadan kalkar.'],
      ['Maliyet Tasarrufu', 'Kâğıt, baskı, zarf ve kargo masrafları azalır.'],
      ['Daha Az Hata', 'Muhasebe veya ERP programınızla entegrasyon sayesinde manuel veri girişi azalır.'],
      ['Güvenli Arşiv', 'Faturalarınız yasal saklama süresi boyunca elektronik ortamda güvenle saklanır.'],
    ],
    surec: [
      ['Ön görüşme', 'Mükellefiyet durumunuzu ve kullandığınız programı inceliyoruz.'],
      ['Mali mühür veya e-imza', 'E-fatura için gerekli mali mühür veya e-imzanızı temin ediyoruz.'],
      ['GİB başvurusu', 'E-fatura başvurunuzu sizin adınıza yapıyoruz.'],
      ['Entegrasyon ve eğitim', 'Programınızla entegrasyonu kurup ekibinize fatura kesmeyi gösteriyoruz.'],
    ],
    afterSurec: [
      ['E-Fatura Kullanım Yöntemleri',
        ulBold([
          ['GİB Portal', 'GİB’in ücretsiz portalı üzerinden fatura düzenlenir. Az sayıda fatura kesen işletmeler için uygundur; muhasebe programıyla otomatik bağlantı yoktur.'],
          ['Özel entegratör', 'GİB’den izinli bir entegratör aracılığıyla faturalar kesilir, saklanır ve muhasebe veya ERP programınızla entegre çalışır. Çok sayıda fatura kesen işletmeler için en pratik yöntemdir.'],
          ['Doğrudan entegrasyon', 'Kendi bilgi işlem altyapısını GİB sistemine doğrudan bağlayan büyük ölçekli işletmeler tarafından tercih edilir.'],
        ]),
        `<p>Kullandığınız muhasebe veya ERP programıyla entegrasyon seçenekleri için <a href="/bilgi-bankasi/entegrasyon/muhasebe-ve-erp-programlari-entegrasyonu/">Muhasebe ve ERP Entegrasyonu</a> rehberimize, hatalı bir faturayı iptal etmek için <a href="/bilgi-bankasi/e-fatura/e-fatura-nasil-iptal-edilir/">E-Fatura Nasıl İptal Edilir?</a> rehberimize göz atabilirsiniz.</p>`],
    ],
    fiyat: 'E-fatura ücreti; kullanacağınız yönteme (GİB portalı veya özel entegratör), yıllık fatura adedine (kontör), arşivleme ihtiyacına, entegrasyon kapsamına ve mali mühür ihtiyacınıza göre değişir. İşletmenizin fatura hacmini birlikte belirleyerek size özel teklif hazırlıyoruz.',
    sources: [['GİB e-Belge', 'https://ebelge.gib.gov.tr'], ['Gelir İdaresi Başkanlığı', 'https://www.gib.gov.tr']],
    kapanis: 'E-faturaya geçiş, doğru planlandığında işletmenize hem zaman hem maliyet kazandırır. Kurucu Bilişim olarak tüm adımları sizin yerinize takip ediyoruz.',
    kapanisSub: 'E-fatura geçişiniz için bugün teklif alın; faturalarınızı dijitalde güvenle yönetin.',
    faqs: [
      ['E-faturaya kimler geçmek zorunda?', '2022 ve sonraki hesap dönemlerinde brüt satış hasılatı 3 milyon TL ve üzeri olan mükellefler ile internet satışı, gayrimenkul ve motorlu taşıt ticareti gibi faaliyetlerde belirlenen hadleri aşan mükellefler e-faturaya geçmek zorundadır. Sınırlar GİB tebliğleriyle güncellenebilir.'],
      ['E-faturaya ne zaman geçilmesi gerekir?', 'Hasılat sınırını aşan mükellefler, sınırın aşıldığı hesap dönemini izleyen yılın Temmuz ayı başından itibaren e-fatura uygulamasına geçmek zorundadır.'],
      ['E-faturaya geçiş ne kadar sürer?', 'Mali mührünüz veya e-imzanız hazır olduğunda başvuru ve kurulum genellikle birkaç iş günü içinde tamamlanır.'],
      ['Zorunlu olmadan e-faturaya geçebilir miyim?', 'Evet. Zorunlu kapsamda olmayan işletmeler de isteğe bağlı olarak e-fatura sistemine dahil olabilir.'],
      ['E-fatura ile e-arşiv fatura arasındaki fark nedir?', 'E-fatura, iki e-fatura mükellefi arasında GİB üzerinden iletilir. Alıcı e-fatura sistemine kayıtlı değilse e-arşiv fatura düzenlenir.'],
      ['Karşı tarafın e-fatura mükellefi olup olmadığını nasıl öğrenirim?', 'GİB’in e-fatura kayıtlı kullanıcılar listesinden alıcının vergi numarasıyla sorgulama yapabilirsiniz. Muhasebe ve entegratör programları bu kontrolü genellikle otomatik yapar.'],
      ['E-fatura için mali mühür şart mı?', 'Şirketler için mali mühür gerekir; gerçek kişi mükellefler e-imza da kullanabilir. Özel entegratör kullanıldığında imzalama entegratör tarafından da yapılabilir.'],
    ],
  }),
  info({
    cat: 'e-arsiv-fatura', svc: 'e-arsiv-fatura', slug: 'e-arsiv-fatura-rehberi', name: 'E-Arşiv Fatura',
    title: 'E-Arşiv Fatura Rehberi: Nedir, Kimlere Düzenlenir, Nasıl Geçilir?',
    lead: 'E-arşiv fatura; e-fatura sistemine kayıtlı olmayan kişi ve kurumlara elektronik ortamda düzenlenen faturadır. Nasıl çalıştığını ve geçiş adımlarını anlattık.',
    intro: [
      'Müşterilerinizin bir kısmı e-fatura sistemine kayıtlı olmayabilir. Bu kişi ve kurumlara da faturanızı dijital olarak iletmenin yolu e-arşiv faturadır.',
      'E-arşiv fatura sayesinde son tüketicilere ve e-fatura mükellefi olmayan firmalara faturalarınızı e-posta veya SMS ile anında ulaştırabilirsiniz.',
    ],
    subline: 'E-arşiv faturaya geçişinizi ve e-ticaret entegrasyonunuzu uçtan uca yönetiyoruz.',
    nedir: [
      'E-arşiv fatura, e-fatura sistemine kayıtlı olmayan alıcılara düzenlenen elektronik faturadır. Faturanın bir nüshası elektronik ortamda saklanır; alıcıya ise e-posta, SMS bağlantısı veya kâğıt çıktı olarak teslim edilir.',
      'E-arşiv fatura düzenlenen bilgiler GİB’e belirlenen dönemlerde raporlanır.',
    ],
    kimlerIntro: 'E-arşiv fatura uygulamasına geçiş zorunluluğu GİB düzenlemeleriyle belirlenir. Genel olarak:',
    kimler: [
      'E-fatura uygulamasına geçmiş olan mükellefler',
      'İnternet üzerinden mal ve hizmet satışı yapan ve belirlenen hadleri aşan işletmeler',
      'GİB’in belirlediği diğer kriterleri sağlayan mükellefler',
    ],
    kimlerNote: 'Zorunluluk kapsamı ve sınırlar mevzuata göre değişebilir; güncel durumu birlikte değerlendirebiliriz.',
    avantaj: [
      ['Hızlı Teslim', 'Faturanız müşterinize e-posta veya SMS ile anında ulaşır.'],
      ['E-Ticarete Uygun', 'Online siparişleriniz otomatik olarak faturalandırılabilir.'],
      ['Kâğıt ve Baskı Tasarrufu', 'Fatura basma ve gönderme masrafları azalır.'],
      ['Kolay Erişim', 'Geçmiş faturalarınıza tarih ve müşteri bazında hızlıca ulaşırsınız.'],
    ],
    surec: [
      ['İhtiyaç analizi', 'Satış kanallarınızı ve fatura hacminizi inceliyoruz.'],
      ['Başvuru', 'E-arşiv fatura başvurunuzu sizin adınıza yapıyoruz.'],
      ['Entegrasyon', 'Muhasebe programınız veya e-ticaret sitenizle bağlantıyı kuruyoruz.'],
      ['Eğitim ve destek', 'Ekibinize e-arşiv fatura düzenlemeyi gösteriyoruz.'],
    ],
    kapanis: 'E-arşiv fatura, özellikle son tüketiciye satış yapan işletmeler için faturalandırmayı hızlı ve düzenli hâle getirir.',
    kapanisSub: 'E-arşiv fatura geçişiniz için bugün teklif alın.',
    faqs: [
      ['E-arşiv faturanın çıktısı geçerli midir?', 'Evet. Üzerinde gerekli bilgiler ve karekod/barkod bulunan e-arşiv fatura çıktısı geçerli bir belgedir.'],
      ['E-arşiv fatura kimlere kesilir?', 'E-fatura sistemine kayıtlı olmayan kişi ve kurumlara e-arşiv fatura düzenlenir.'],
    ],
  }),
  info({
    cat: 'e-irsaliye', svc: 'e-irsaliye', slug: 'e-irsaliye-rehberi', name: 'E-İrsaliye',
    title: 'E-İrsaliye Rehberi: Nedir, Kimler İçin Zorunlu, Nasıl Geçilir?',
    lead: 'E-irsaliye; sevk irsaliyesinin elektronik ortamda düzenlenip GİB üzerinden iletilmesidir. Zorunluluk kapsamını ve geçiş adımlarını anlattık.',
    intro: [
      'Mal sevkiyatlarında kâğıt irsaliye koçanı taşımak, irsaliyeleri arşivlemek ve teslimatları takip etmek zaman alır. E-irsaliye bu süreci dijital ortama taşır.',
    ],
    subline: 'E-irsaliyeye geçişinizi depo ve muhasebe sistemlerinizle entegre şekilde yönetiyoruz.',
    nedir: [
      'E-irsaliye, malın sevki sırasında düzenlenen sevk irsaliyesinin elektronik versiyonudur. Alıcıya GİB altyapısı üzerinden iletilir; alıcı da kabul, ret veya kısmi kabul yanıtı verebilir.',
      'Yol denetimlerinde e-irsaliyenin karekodu veya mobil cihazdaki görüntüsü gösterilebilir.',
    ],
    kimlerIntro: 'E-irsaliye zorunluluğu GİB tebliğleriyle belirlenir. Genel olarak:',
    kimler: [
      'GİB’in belirlediği ciro sınırlarını aşan mükellefler',
      'Belirli sektörlerde (ör. demir-çelik, maden, şeker, gübre gibi) faaliyet gösteren mükellefler',
      'ÖTV kapsamındaki bazı ürünlerin üretim ve satışını yapan mükellefler',
    ],
    kimlerNote: 'Sektörel kapsam ve sınırlar mevzuata göre değişebilir; işletmenizin durumunu birlikte kontrol edebiliriz.',
    avantaj: [
      ['Koçan Masrafı Yok', 'Matbu irsaliye basımı ve arşivleme ihtiyacı ortadan kalkar.'],
      ['Anlık Takip', 'Sevkiyat ve mal kabul süreçlerini sistem üzerinden takip edersiniz.'],
      ['Kolay Denetim', 'Karekod ile yol denetimleri hızlı tamamlanır.'],
      ['Entegre Çalışma', 'Depo, lojistik ve muhasebe sistemlerinizle birlikte çalışır.'],
    ],
    surec: [
      ['Ön kontrol', 'Mali mühür veya e-imza ve e-fatura durumunuzu kontrol ediyoruz.'],
      ['GİB başvurusu', 'E-irsaliye başvurunuzu sizin adınıza yapıyoruz.'],
      ['Entegrasyon', 'Depo ve muhasebe programlarınızla bağlantıyı kuruyoruz.'],
      ['Eğitim ve destek', 'Ekibinize e-irsaliye düzenlemeyi gösteriyoruz.'],
    ],
    kapanis: 'E-irsaliye, sevkiyat süreçlerinizi hızlandırır ve kâğıt yükünü ortadan kaldırır.',
    kapanisSub: 'E-irsaliye geçişiniz için bugün teklif alın.',
    faqs: [
      ['E-irsaliye araçta nasıl taşınır?', 'Matbu kâğıt şart değildir; e-irsaliyenin karekodu, mobil cihazdaki görüntüsü veya çıktısı gösterilebilir.'],
      ['Alıcı e-irsaliye mükellefi değilse ne olur?', 'Alıcı mükellef olmasa da e-irsaliye düzenlenebilir ve sevkiyat kâğıt çıktısıyla yapılabilir.'],
    ],
  }),
  info({
    cat: 'e-defter', svc: 'e-defter', slug: 'e-defter-rehberi', name: 'E-Defter',
    title: 'E-Defter Rehberi: Nedir, Kimler Kullanmak Zorunda, Nasıl Saklanır?',
    lead: 'E-defter; yasal defterlerin elektronik ortamda tutulup beratlarının GİB’e yüklendiği uygulamadır. Kapsamı, süreleri ve saklama yükümlülüklerini anlattık.',
    intro: [
      'Yevmiye ve kebir defterlerinin kâğıtta tutulması, onaylatılması ve yıllarca saklanması işletmeler için ciddi bir yüktür. E-defter bu süreçleri elektronik ortama taşır.',
    ],
    subline: 'E-defter oluşturma, beratlama ve güvenli saklama süreçlerinizi tek noktadan yönetiyoruz.',
    nedir: [
      'E-defter, yevmiye defteri ve defter-i kebirin GİB’in belirlediği formatta elektronik ortamda oluşturulması ve beratlarının GİB sistemine yüklenmesidir.',
      'E-defterler ve beratlar mali mühür veya e-imza ile imzalanır; değiştirilmediğini garanti altına almak için zaman damgası kullanılır.',
    ],
    kimlerIntro: 'E-defter zorunluluğu GİB düzenlemeleriyle belirlenir. Genel olarak:',
    kimler: [
      'E-fatura uygulamasına geçmiş olan mükellefler',
      'GİB’in belirlediği ciro ve sektör kriterlerini sağlayan mükellefler',
      'Bağımsız denetime tabi şirketler ve belirli lisanslı faaliyetlerde bulunan mükellefler',
    ],
    kimlerNote: 'Berat yükleme süreleri ve zorunluluk kriterleri mevzuata göre değişebilir; güncel takvimi birlikte takip edebiliriz.',
    avantaj: [
      ['Kâğıt ve Noter Masrafı Yok', 'Defter basımı ve onay süreçleri ortadan kalkar.'],
      ['Güvenli Saklama', 'Defterleriniz yasal süre boyunca yedekli ortamda korunur.'],
      ['Zamanında Gönderim', 'Berat yükleme süreleri takip edilerek ceza riski azalır.'],
      ['Program Uyumu', 'Mevcut muhasebe programınızla birlikte çalışır.'],
    ],
    surec: [
      ['Ön görüşme', 'Muhasebe programınızı ve mevcut sürecinizi inceliyoruz.'],
      ['Başvuru ve kurulum', 'E-defter başvurusunu ve gerekli kurulumları yapıyoruz.'],
      ['Beratlama takibi', 'Aylık veya dönemsel berat süreçlerinizi takip ediyoruz.'],
      ['Saklama', 'E-defter ve beratlarınızı güvenli ortamda saklıyoruz.'],
    ],
    kapanis: 'E-defter, yasal defter yükümlülüklerinizi daha düzenli ve güvenli şekilde yerine getirmenizi sağlar.',
    kapanisSub: 'E-defter ve e-defter saklama hizmeti için bugün teklif alın.',
    faqs: [
      ['E-defterler ne kadar süre saklanmalıdır?', 'Ticari defter ve belgelerin mevzuat gereği 10 yıl saklanması gerekir.'],
      ['E-defter saklama hizmeti neden gerekli?', 'Donanım arızası veya veri kaybı gibi durumlarda defterlerinizin yedekli ve güvenli ortamda korunmasını sağlar.'],
    ],
  }),
  info({
    cat: 'e-smm', svc: 'e-smm', slug: 'e-smm-rehberi', name: 'E-SMM',
    title: 'E-SMM Rehberi: Elektronik Serbest Meslek Makbuzu Nedir?',
    lead: 'E-SMM; serbest meslek erbaplarının makbuzlarını elektronik ortamda düzenlediği uygulamadır. Kimlerin kullanması gerektiğini ve geçiş adımlarını anlattık.',
    intro: [
      'Avukatlar, mali müşavirler, doktorlar, mühendisler ve mimarlar gibi serbest meslek erbapları, verdikleri hizmetler için serbest meslek makbuzu düzenler. E-SMM bu makbuzların dijital hâlidir.',
    ],
    subline: 'E-SMM başvurunuzu ve kurulumunuzu sizin yerinize tamamlıyoruz.',
    nedir: [
      'E-SMM (Elektronik Serbest Meslek Makbuzu), serbest meslek makbuzunun elektronik ortamda düzenlenmesi, alıcıya iletilmesi ve saklanmasıdır.',
      'Makbuz e-imza veya mali mühür ile imzalanır; stopaj ve KDV gibi kesintiler sistem üzerinden hesaplanabilir.',
    ],
    kimler: [
      'Serbest meslek faaliyetinde bulunan avukatlar, mali müşavirler ve danışmanlar',
      'Serbest çalışan doktorlar ve diş hekimleri',
      'Serbest çalışan mühendisler ve mimarlar',
      'GİB düzenlemeleriyle kapsama alınan diğer serbest meslek erbapları',
    ],
    kimlerNote: 'Zorunluluk kapsamı GİB düzenlemelerine göre belirlenir; durumunuzu birlikte değerlendirebiliriz.',
    avantaj: [
      ['Pratik Kullanım', 'Makbuzunuzu bilgisayardan veya telefondan dakikalar içinde düzenlersiniz.'],
      ['Otomatik Hesaplama', 'Stopaj ve KDV kesintileri hatasız hesaplanır.'],
      ['Anında Paylaşım', 'Makbuz müşterinize e-posta ile hemen ulaşır.'],
      ['Kolay Arşiv', 'Geçmiş makbuzlarınıza istediğiniz zaman erişirsiniz.'],
    ],
    surec: [
      ['E-imza veya mali mühür', 'Gerekli e-imza veya mali mühürü temin ediyoruz.'],
      ['Başvuru', 'E-SMM başvurunuzu sizin adınıza yapıyoruz.'],
      ['Kurulum', 'Kullanacağınız uygulamayı kuruyor ve ayarlıyoruz.'],
      ['Eğitim', 'İlk makbuzunuzu birlikte düzenliyoruz.'],
    ],
    kapanis: 'E-SMM, serbest meslek erbaplarının makbuz süreçlerini hızlı, hatasız ve düzenli hâle getirir.',
    kapanisSub: 'E-SMM geçişiniz için bugün teklif alın.',
    faqs: [
      ['E-SMM kesmek için ne gerekir?', 'Geçerli bir e-imza veya mali mühür ve E-SMM başvurusu gerekir. Başvuru ve kurulumu sizin adınıza tamamlıyoruz.'],
      ['Makbuz alıcıya nasıl ulaştırılır?', 'Düzenlenen e-SMM alıcının e-posta adresine gönderilir veya çıktısı verilebilir.'],
    ],
  }),
  info({
    cat: 'e-mustahsil', svc: 'e-mustahsil-makbuzu', slug: 'e-mustahsil-makbuzu-rehberi', name: 'E-Müstahsil Makbuzu',
    title: 'E-Müstahsil Makbuzu Rehberi: Nedir, Kimler İçin Zorunlu?',
    lead: 'E-müstahsil makbuzu; çiftçi ve üreticilerden yapılan tarımsal ürün alımlarında düzenlenen belgenin elektronik versiyonudur. Kapsamı ve adımları anlattık.',
    intro: [
      'Tarımsal ürün alımı yapan tüccar ve sanayiciler, gerçek usulde vergiye tabi olmayan çiftçilerden yaptıkları alımlar için müstahsil makbuzu düzenler. E-müstahsil makbuzu bu belgenin dijital hâlidir.',
    ],
    subline: 'E-müstahsil makbuzuna geçişinizi sahada kullanıma uygun şekilde kuruyoruz.',
    nedir: [
      'E-müstahsil makbuzu, tarımsal ürün alımlarında düzenlenen müstahsil makbuzunun elektronik ortamda oluşturulması, imzalanması ve saklanmasıdır.',
      'Gelir vergisi stopajı ve diğer kesintiler makbuz üzerinde hesaplanır; çiftçinin sisteme kayıtlı olması gerekmez.',
    ],
    kimler: [
      'Tarımsal ürün alımı yapan ve e-fatura uygulamasına kayıtlı mükellefler',
      'GİB’in belirlediği hadleri aşan tarım tüccarları ve sanayiciler',
    ],
    kimlerNote: 'Zorunluluk kapsamı GİB düzenlemelerine göre değişebilir; durumunuzu birlikte kontrol edebiliriz.',
    avantaj: [
      ['Sahada Kullanım', 'Makbuzu tarlada veya alım noktasında mobil cihazdan düzenleyebilirsiniz.'],
      ['Hatasız Kesinti', 'Stopaj ve diğer kesintiler otomatik hesaplanır.'],
      ['Koçan Taşımaya Son', 'Kâğıt koçan ve arşiv yükü ortadan kalkar.'],
      ['Yasal Güvence', 'Belgeler elektronik ortamda güvenle saklanır.'],
    ],
    surec: [
      ['Ön görüşme', 'Alım süreçlerinizi ve kullandığınız programı inceliyoruz.'],
      ['Başvuru', 'E-müstahsil başvurunuzu sizin adınıza yapıyoruz.'],
      ['Kurulum', 'Mobil ve masaüstü kullanım için gerekli kurulumu yapıyoruz.'],
      ['Eğitim', 'Ekibinize makbuz düzenlemeyi gösteriyoruz.'],
    ],
    kapanis: 'E-müstahsil makbuzu, tarımsal alımlarınızı hızlı ve hatasız şekilde belgelemenizi sağlar.',
    kapanisSub: 'E-müstahsil makbuzu geçişiniz için bugün teklif alın.',
    faqs: [
      ['Çiftçinin sistemde kayıtlı olması gerekir mi?', 'Hayır. Belgeyi ürünü satın alan mükellef elektronik olarak düzenler.'],
      ['Çiftçiye nasıl teslim edilir?', 'Belgenin çıktısı verilebilir veya SMS/e-posta ile paylaşılabilir.'],
    ],
  }),
  info({
    cat: 'e-gider-pusulasi', svc: 'e-gider-pusulasi', slug: 'e-gider-pusulasi-rehberi', name: 'E-Gider Pusulası',
    title: 'E-Gider Pusulası Rehberi: Nedir, Ne Zaman Düzenlenir?',
    lead: 'E-gider pusulası; vergiden muaf esnaf veya nihai tüketiciden yapılan alımlar için düzenlenen gider pusulasının elektronik hâlidir. Kullanımını anlattık.',
    intro: [
      'Vergi mükellefi olmayan kişilerden mal veya hizmet satın aldığınızda gider pusulası düzenlemeniz gerekir. E-gider pusulası bu belgeyi dijital ortama taşır.',
    ],
    subline: 'E-gider pusulası kurulumunuzu muhasebe sisteminizle uyumlu şekilde yapıyoruz.',
    nedir: [
      'E-gider pusulası, vergiden muaf esnaftan veya nihai tüketiciden yapılan alımlarda düzenlenen gider pusulasının elektronik ortamda oluşturulması ve saklanmasıdır.',
      'Stopaj oranları iş türüne göre uygulanır ve belge elektronik ortamda arşivlenir.',
    ],
    kimlerTitle: 'E-Gider Pusulası Kimler İçin Gerekli?',
    kimler: [
      'GİB tarafından e-belge kapsamına alınan ve gider pusulası düzenlemesi gereken mükellefler',
      'Vergiden muaf esnaftan düzenli alım yapan işletmeler',
    ],
    kimlerNote: 'Kapsam GİB düzenlemelerine göre belirlenir; işletmenizin durumunu birlikte değerlendirebiliriz.',
    avantaj: [
      ['Hızlı Düzenleme', 'Belge dakikalar içinde dijital olarak oluşturulur.'],
      ['Stopaj Takibi', 'Kesintiler iş türüne göre doğru hesaplanır.'],
      ['Kâğıtsız Arşiv', 'Fiziki koçan saklama ihtiyacı ortadan kalkar.'],
      ['Program Uyumu', 'Ön muhasebe ve ERP sistemlerinizle birlikte çalışır.'],
    ],
    surec: [
      ['Ön görüşme', 'Alım süreçlerinizi inceliyoruz.'],
      ['Başvuru', 'Gerekli başvuruyu sizin adınıza yapıyoruz.'],
      ['Kurulum', 'Kullanacağınız uygulamayı kuruyoruz.'],
      ['Eğitim', 'Ekibinize belge düzenlemeyi gösteriyoruz.'],
    ],
    kapanis: 'E-gider pusulası, vergiden muaf kişilerden yaptığınız alımları düzenli ve mevzuata uygun şekilde belgelemenizi sağlar.',
    kapanisSub: 'E-gider pusulası için bugün teklif alın.',
    faqs: [
      ['E-gider pusulası ne zaman düzenlenir?', 'Vergiden muaf esnaftan veya nihai tüketiciden mal ya da hizmet satın alındığında düzenlenir.'],
    ],
  }),
  info({
    cat: 'e-dekont', svc: 'e-dekont', slug: 'e-dekont-rehberi', name: 'E-Dekont',
    title: 'E-Dekont Rehberi: Nedir, Kimler Kullanır?',
    lead: 'E-dekont; bankalar ve finans kuruluşlarının düzenlediği dekontların elektronik ortamda üretilip saklanmasıdır. Kapsamını ve işleyişini anlattık.',
    intro: [
      'Bankalar, ödeme kuruluşları ve diğer finans kurumları her gün çok sayıda dekont düzenler. E-dekont bu dekontların elektronik ortamda üretilmesini ve saklanmasını sağlar.',
    ],
    subline: 'Yüksek işlem hacmine uygun e-dekont altyapısı için danışmanlık ve entegrasyon desteği veriyoruz.',
    nedir: [
      'E-dekont, finansal kuruluşların düzenlediği dekontların GİB’in belirlediği standartlarda elektronik ortamda oluşturulması, iletilmesi ve saklanmasıdır.',
    ],
    kimlerTitle: 'E-Dekont Kimler Tarafından Kullanılır?',
    kimler: [
      'Bankalar ve katılım bankaları',
      'Ödeme ve elektronik para kuruluşları',
      'GİB düzenlemeleriyle kapsama alınan diğer finans kuruluşları',
    ],
    avantaj: [
      ['Yüksek Hacim', 'Çok sayıda işlem hızlı ve güvenli şekilde belgelenir.'],
      ['Güvenli Arşiv', 'Dekontlar yasal süre boyunca elektronik ortamda saklanır.'],
      ['Kolay Erişim', 'Müşteriler dekontlarına dijital kanallardan ulaşır.'],
      ['Maliyet Tasarrufu', 'Kâğıt dekont basım ve dağıtım masrafı azalır.'],
    ],
    surec: [
      ['Analiz', 'Mevcut altyapınızı ve işlem hacminizi inceliyoruz.'],
      ['Entegrasyon', 'E-dekont altyapısını sistemlerinizle entegre ediyoruz.'],
      ['Test', 'Canlıya geçmeden önce test süreçlerini yönetiyoruz.'],
      ['Destek', 'Canlı kullanımda teknik destek veriyoruz.'],
    ],
    kapanis: 'E-dekont, finansal işlemlerin güvenli ve mevzuata uygun şekilde belgelenmesini sağlar.',
    kapanisSub: 'E-dekont altyapısı için bugün teklif alın.',
    faqs: [
      ['Müşteriler e-dekonta nasıl ulaşır?', 'İnternet şubesi, mobil uygulama veya e-posta bildirimleri üzerinden ulaşabilir.'],
    ],
  }),
  info({
    cat: 'e-adisyon', svc: 'e-adisyon', slug: 'e-adisyon-rehberi', name: 'E-Adisyon',
    title: 'E-Adisyon Rehberi: Restoran ve Kafeler İçin Elektronik Adisyon',
    lead: 'E-adisyon; restoran, kafe ve benzeri işletmelerde siparişlerin anında elektronik adisyonla belgelenmesidir. Kapsamını ve geçiş adımlarını anlattık.',
    intro: [
      'Restoran, kafe, pastane ve eğlence yerlerinde masaya sunulan hizmetlerin adisyonla belgelenmesi gerekir. E-adisyon bu belgeyi sipariş anında dijital olarak oluşturur.',
    ],
    subline: 'E-adisyona geçişinizi kullandığınız POS ve restoran yazılımıyla uyumlu şekilde yapıyoruz.',
    nedir: [
      'E-adisyon, hizmet işletmelerinde sunulan sipariş ve hizmetlerin adisyon belgesinin elektronik ortamda düzenlenmesidir. Hesap kapandığında adisyon e-fatura veya e-arşiv faturaya dönüştürülebilir.',
    ],
    kimler: [
      'GİB’in belirlediği hasılat sınırını aşan restoran ve lokantalar',
      'Kafe, pastane, bar ve eğlence yerleri',
      'GİB düzenlemeleriyle kapsama alınan diğer hizmet işletmeleri',
    ],
    kimlerNote: 'Hasılat sınırları ve geçiş tarihleri mevzuata göre değişebilir; durumunuzu birlikte kontrol edebiliriz.',
    avantaj: [
      ['Anında Kayıt', 'Sipariş girildiği anda elektronik adisyon oluşur.'],
      ['Fatura Entegrasyonu', 'Adisyon tek tıkla e-fatura veya e-arşive dönüşür.'],
      ['Kaçak ve Hata Kontrolü', 'Masa ve servis süreçleri şeffaf hâle gelir.'],
      ['Mevcut Sistemle Uyum', 'Kullandığınız POS ve restoran yazılımıyla çalışır.'],
    ],
    surec: [
      ['Ön görüşme', 'Kullandığınız POS ve adisyon sistemini inceliyoruz.'],
      ['Başvuru', 'E-adisyon başvurunuzu sizin adınıza yapıyoruz.'],
      ['Entegrasyon', 'Sistemlerinizle entegrasyonu kuruyoruz.'],
      ['Eğitim', 'Personelinize kullanımı gösteriyoruz.'],
    ],
    kapanis: 'E-adisyon, hizmet işletmelerinde sipariş ve faturalama süreçlerini düzenli ve şeffaf hâle getirir.',
    kapanisSub: 'E-adisyon geçişiniz için bugün teklif alın.',
    faqs: [
      ['Mevcut adisyon programımla çalışır mı?', 'Yaygın restoran ve POS yazılımlarıyla entegrasyon sağlanabilir; mevcut altyapınızı birlikte değerlendiriyoruz.'],
    ],
  }),
  info({
    cat: 'e-bilet', svc: 'e-bilet', slug: 'e-bilet-rehberi', name: 'E-Bilet',
    title: 'E-Bilet Rehberi: Ulaşım ve Etkinliklerde Elektronik Bilet',
    lead: 'E-bilet; yolcu taşımacılığı ve etkinliklerde düzenlenen biletlerin elektronik ortamda oluşturulup GİB’e raporlanmasıdır. Kapsamını anlattık.',
    intro: [
      'Otobüs, uçak ve deniz yolculuklarında ya da sinema, tiyatro ve konser gibi etkinliklerde düzenlenen biletler e-bilet uygulamasıyla dijital ortama taşınır.',
    ],
    subline: 'E-bilet altyapınızı satış ve giriş sistemlerinizle entegre şekilde kuruyoruz.',
    nedir: [
      'E-bilet, yolcu taşımacılığı ve etkinlik girişlerinde düzenlenen biletlerin elektronik ortamda oluşturulması, iletilmesi ve saklanmasıdır. Biletler SMS veya e-posta ile karekodlu olarak iletilebilir.',
    ],
    kimler: [
      'Şehirler arası karayolu yolcu taşımacılığı yapan firmalar',
      'Deniz ve hava yolu ile yolcu taşıyan işletmeler',
      'Sinema, tiyatro, konser ve spor etkinliği düzenleyenler',
    ],
    kimlerNote: 'Kapsam GİB düzenlemelerine göre belirlenir; işletmenizin durumunu birlikte değerlendirebiliriz.',
    avantaj: [
      ['Karekodlu Giriş', 'Biletler turnike ve girişlerde hızlıca okutulur.'],
      ['Dijital Teslim', 'Bilet basım ve dağıtım masrafı ortadan kalkar.'],
      ['Kolay Raporlama', 'Satış bilgileri GİB’e otomatik raporlanır.'],
      ['İptal ve İade Yönetimi', 'İptal ve iade süreçleri sistem üzerinden takip edilir.'],
    ],
    surec: [
      ['Analiz', 'Satış kanallarınızı ve giriş sistemlerinizi inceliyoruz.'],
      ['Başvuru', 'E-bilet başvurunuzu sizin adınıza yapıyoruz.'],
      ['Entegrasyon', 'Satış ve turnike sistemlerinizle entegrasyonu kuruyoruz.'],
      ['Destek', 'Canlı kullanımda teknik destek veriyoruz.'],
    ],
    kapanis: 'E-bilet, bilet satış ve giriş süreçlerinizi hızlı, güvenli ve mevzuata uygun hâle getirir.',
    kapanisSub: 'E-bilet altyapısı için bugün teklif alın.',
    faqs: [
      ['Yolcunun bilet çıktısı alması gerekir mi?', 'Hayır. SMS veya e-postadaki karekodlu bilet genellikle yeterlidir.'],
    ],
  }),
  info({
    cat: 'e-imza', svc: 'e-imza', slug: 'e-imza-rehberi', name: 'E-İmza',
    title: 'E-İmza Nedir, Nasıl Alınır? Başvuru, Belgeler ve Kullanım Rehberi',
    lead: 'Nitelikli elektronik imza, 5070 sayılı Kanun’a göre ıslak imzayla aynı hukuki sonucu doğurur. E-imzanın ne olduğunu, nasıl alındığını, gerekli belgeleri ve kullanım alanlarını anlattık.',
    updated: '2026-10-20',
    kisaca: 'E-imza (nitelikli elektronik imza), elektronik bir belgeyi imzalayan kişinin kimliğini doğrulayan ve belgenin sonradan değiştirilmediğini garanti eden, ıslak imzayla aynı hukuki sonucu doğuran dijital imzadır. E-imza, BTK tarafından yetkilendirilmiş elektronik sertifika hizmet sağlayıcılarından kimlik doğrulamasıyla alınır ve kart ile kart okuyucu üzerinden kullanılır.',
    intro: [
      'E-Devlet, UYAP, EKAP, MERSİS ve SGK gibi birçok resmi platformda işlem yapmak için e-imzaya ihtiyaç duyulur. E-imza, belgelerinizi bulunduğunuz yerden dakikalar içinde ve hukuken geçerli şekilde imzalamanızı sağlar.',
      'Bu rehberde e-imzanın ne olduğunu, kimlerin ihtiyaç duyduğunu, başvuru için gerekli belgeleri, alma adımlarını, kullanım alanlarını ve sık sorulan soruları tek yerde topladık.',
    ],
    afterNedir: [
      ['E-İmza Türleri: Kartlı E-İmza ve Mobil İmza',
        ulBold([
          ['Kartlı e-imza', 'Akıllı kart ve bilgisayara takılan kart okuyucuyla kullanılır. Bilgisayar üzerinden yapılan resmi işlemlerde en yaygın kullanılan türdür.'],
          ['Mobil imza', 'Cep telefonu hattınıza tanımlanan elektronik imzadır; GSM operatörleri üzerinden alınır ve telefon onayıyla kullanılır.'],
        ]),
        'Hangi türün size uygun olduğu, kullanacağınız sistemlere ve işlem sıklığınıza göre değişir. Kurucu Bilişim olarak kartlı e-imza başvurusu, teslimatı ve kurulumunu yönetiyoruz.'],
      ['E-İmza ile Hangi İşlemler Yapılamaz?',
        '5070 sayılı Elektronik İmza Kanunu’na göre kanunların resmî şekle veya özel bir merasime tabi tuttuğu hukuki işlemler ile teminat sözleşmeleri güvenli elektronik imzayla gerçekleştirilemez. Örneğin noterde yapılması gereken bazı işlemler için ıslak imza gerekir.'],
    ],
    afterKimler: [
      ['E-İmza Başvurusu İçin Gerekli Belgeler',
        ulBold([
          ['Bireysel başvuru', 'T.C. kimlik numaralı geçerli kimlik belgesi (çipli kimlik kartı) yeterlidir.'],
          ['Kurumsal başvuru', 'Kişisel kimlik bilgilerinin yanında çalışılan kuruma ait bilgiler ve sertifika sağlayıcısının istediği kurum belgeleri talep edilebilir.'],
        ]),
        'Başvuru sırasında kimlik doğrulaması yapılır. Hangi belgelerin gerektiğini başvuru öncesinde sizinle paylaşıyor, süreci sizin için yönetiyoruz.'],
    ],
    afterSurec: [
      ['E-İmza Nerelerde Kullanılır?',
        ul([
          'E-Devlet Kapısı’na güvenli giriş ve kurum işlemleri',
          'UYAP üzerinden dava ve icra işlemleri (avukatlar)',
          'EKAP üzerinden kamu ihalelerine e-teklif verme',
          'MERSİS’te şirket kuruluşu ve değişiklik işlemleri',
          'SGK, e-reçete ve e-rapor işlemleri (sağlık çalışanları)',
          'Yapı Denetim Sistemi (YDS) işlemleri (mühendisler)',
          'Sözleşme ve belgelerin dijital ortamda imzalanması',
          'KEP üzerinden imzalı resmi yazışmalar',
        ]),
        `<p>Mesleğinize özel kullanım için <a href="/e-donusum-hizmetleri/e-imza/avukatlar-icin-e-imza/">avukatlar</a>, <a href="/e-donusum-hizmetleri/e-imza/doktorlar-icin-e-imza/">doktorlar</a>, <a href="/e-donusum-hizmetleri/e-imza/muhendisler-icin-e-imza/">mühendisler</a> ve <a href="/e-donusum-hizmetleri/e-imza/muteahhitler-icin-e-imza/">müteahhitler</a> için hazırladığımız sayfalara göz atabilirsiniz.</p>`],
      ['E-İmza Geldikten Sonra: Kurulum, Kullanım ve Yenileme',
        `<p>E-imzanız elinize ulaştığında önce <a href="/bilgi-bankasi/e-imza/e-imza-aktivasyonu-ve-gerekli-programlar/">aktivasyon ve gerekli programlar</a>, ardından <a href="/bilgi-bankasi/e-imza/e-imza-kurulumu-nasil-yapilir/">kurulum</a> adımları tamamlanır. İlk imzanızı atmak için <a href="/bilgi-bankasi/e-imza/e-imza-nasil-atilir/">E-İmza Nasıl Atılır?</a>, şifre işlemleri için <a href="/bilgi-bankasi/e-imza/e-imza-sifresi-pin-degistirme-ve-kilit-cozme/">PIN rehberi</a>, süresi dolmak üzere olan e-imzalar için <a href="/bilgi-bankasi/e-imza/e-imza-yenileme-nasil-yapilir/">E-İmza Yenileme</a> rehberimize göz atabilirsiniz.</p>`],
    ],
    fiyat: 'E-imza ücreti; kullanım süresine (1, 2 veya 3 yıl), yeni başvuru ya da yenileme olmasına, kart okuyucu ihtiyacına ve teslimat şekline göre değişir. Güncel fiyat için bize ulaşın; ihtiyacınıza uygun paketi birlikte belirleyelim.',
    fiyatLink: `<p>Ücreti etkileyen etkenler için <a href="/bilgi-bankasi/e-imza/e-imza-fiyati-neye-gore-degisir/">E-İmza Fiyatı Neye Göre Değişir?</a> rehberimize göz atabilirsiniz.</p>`,
    sources: [['5070 sayılı Elektronik İmza Kanunu', 'https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=5070&MevzuatTur=1&MevzuatTertip=5'], ['Bilgi Teknolojileri ve İletişim Kurumu', 'https://www.btk.gov.tr']],
    subline: 'E-imzanızı İstanbul içinde hızlı kuryeyle, 81 ile aynı gün kargoyla gönderiyor; kurulumunu uzaktan yapıyoruz.',
    nedir: [
      'Elektronik imza, bir belgeyi elektronik ortamda imzalayan kişinin kimliğini doğrulayan ve belgenin sonradan değiştirilmediğini garanti eden veridir.',
      '5070 sayılı Elektronik İmza Kanunu’na göre güvenli (nitelikli) elektronik imza, elle atılan imza ile aynı hukuki sonucu doğurur.',
    ],
    kimlerTitle: 'E-İmza Kimler İçin Gerekli?',
    kimler: [
      'UYAP üzerinden işlem yapan avukatlar',
      'E-reçete ve e-rapor düzenleyen doktorlar',
      'YDS ve EKAP işlemleri yapan mühendis ve müteahhitler',
      'MERSİS ve ticaret sicili işlemleri yapan şirket yetkilileri',
      'Kamu kurumlarıyla elektronik yazışma yapan kişi ve kurumlar',
    ],
    avantaj: [
      ['Hukuki Geçerlilik', 'Islak imzayla aynı hukuki sonucu doğurur.'],
      ['Zaman Tasarrufu', 'Belgeleri bulunduğunuz yerden dakikalar içinde imzalarsınız.'],
      ['Güvenlik', 'İmzanız yalnızca size ait kart ve şifreyle kullanılır.'],
      ['Geniş Kullanım', 'Birçok resmi platformda işlem yapmanızı sağlar.'],
    ],
    surec: [
      ['Başvuru', 'Formu doldurun; uygun kullanım süresini birlikte seçelim.'],
      ['Kimlik doğrulama', 'Kimlik doğrulamanızı yapıyoruz.'],
      ['Teslimat', 'İstanbul içinde hızlı kuryeyle, diğer illere aynı gün kargoyla gönderiyoruz.'],
      ['Kurulum', 'Sürücü ve imza uygulamasını uzaktan kuruyoruz.'],
    ],
    kapanis: 'E-imza, resmi işlemlerinizi hızlı ve güvenli şekilde dijital ortamda tamamlamanızı sağlar.',
    kapanisSub: 'E-imzanızı bugün alın; başvurudan kuruluma kadar yanınızdayız.',
    faqs: [
      ['E-imza nasıl alınır?', 'Başvuru formunu doldurursunuz, kimlik doğrulamanız yapılır ve e-imzanız İstanbul içinde hızlı kuryeyle, diğer illere aynı gün kargoyla gönderilir. Ardından kurulum uzaktan bağlantıyla yapılır.'],
      ['E-imza ıslak imza ile aynı geçerliliğe sahip mi?', 'Evet. 5070 sayılı Kanun’a göre güvenli elektronik imza, elle atılan imza ile aynı hukuki sonucu doğurur. Resmî şekle tabi işlemler ve teminat sözleşmeleri bunun dışındadır.'],
      ['E-imza için hangi belgeler gerekir?', 'Bireysel başvurularda T.C. kimlik numaralı geçerli kimlik belgesi yeterlidir. Kurumsal başvurularda kurum bilgileri de istenebilir.'],
      ['E-imzam ne kadar sürede elime ulaşır?', 'İstanbul içinde hızlı kuryeyle yönlendirilir; diğer illere aynı gün kargoya verilir ve ertesi gün teslimat seçeneği sunulur.'],
      ['E-imza ne kadar süre geçerlidir?', 'E-imza, seçtiğiniz pakete göre 1, 2 veya 3 yıl geçerlidir. Süre dolmadan yenileme yapmanız gerekir.'],
      ['E-imza ile mobil imza arasındaki fark nedir?', 'Kartlı e-imza kart ve kart okuyucuyla bilgisayarda kullanılır; mobil imza ise cep telefonu hattınıza tanımlanır ve telefon onayıyla kullanılır.'],
      ['Şirket çalışanları için tek e-imza alınabilir mi?', 'Hayır. E-imza kişiye özeldir; her çalışan için ayrı e-imza düzenlenir. Toplu başvuruları tek elden yönetebiliriz.'],
    ],
  }),
  info({
    cat: 'mali-muhur', svc: 'mali-muhur', slug: 'mali-muhur-rehberi', name: 'Mali Mühür',
    title: 'Mali Mühür Nedir, Nasıl Alınır? Başvuru, Kurulum ve Yenileme Rehberi',
    lead: 'Mali mühür; şirketlerin e-fatura, e-arşiv, e-defter ve e-irsaliye gibi elektronik belgeleri şirket adına imzalamak için kullandığı elektronik sertifikadır. Ne işe yaradığını, kimlerin alması gerektiğini ve başvuru adımlarını anlattık.',
    updated: '2026-10-20',
    kisaca: 'Mali mühür, şirketlerin e-fatura, e-arşiv fatura, e-defter ve e-irsaliye gibi elektronik belgeleri tüzel kişilik adına imzalamak için kullandığı, TÜBİTAK Kamu Sertifikasyon Merkezi (Kamu SM) tarafından üretilen elektronik sertifikadır. Kart ve kart okuyucuyla kullanılır; kısaca şirket kaşesinin elektronik karşılığıdır.',
    intro: [
      'E-dönüşüm uygulamalarına geçen her şirketin ilk ihtiyaçlarından biri mali mühürdür. Faturalarınızın ve defterlerinizin şirketiniz tarafından düzenlendiğini ve sonradan değiştirilmediğini mali mühür kanıtlar.',
      'Bu rehberde mali mührün ne olduğunu, e-imzadan farkını, kimlerin alması gerektiğini, başvuru ve kurulum adımlarını ve yenilemede dikkat edilmesi gerekenleri anlattık.',
    ],
    subline: 'Mali mührünüzü aynı gün, dakikalar içinde teslim ediyor; kurulumunu uzaktan yapıyoruz.',
    nedir: [
      'Mali mühür, kurumların e-dönüşüm uygulamalarında kullandığı ve TÜBİTAK Kamu Sertifikasyon Merkezi tarafından üretilen elektronik sertifikadır. Mali mühürle imzalanan elektronik belgenin hangi kurum tarafından oluşturulduğu ve içeriğinin değiştirilmediği güvence altına alınır.',
      'Mali mühür, bir akıllı kart ve bu kartı bilgisayara bağlayan kart okuyucudan oluşur. Kullanım sırasında kartın PIN (şifre) bilgisi girilir.',
    ],
    afterNedir: [
      ['Mali Mühür ile E-İmza Arasındaki Fark',
        ulBold([
          ['Kime ait?', 'E-imza gerçek kişiye, mali mühür tüzel kişiliğe (şirkete) aittir.'],
          ['Nerede kullanılır?', 'Mali mühür e-fatura, e-arşiv, e-defter ve e-irsaliye gibi e-belgelerde; e-imza ise e-Devlet, UYAP, EKAP, MERSİS gibi kişisel işlemlerde kullanılır.'],
          ['Kim üretir?', 'Mali mühür TÜBİTAK Kamu SM tarafından; e-imza ise BTK tarafından yetkilendirilmiş elektronik sertifika hizmet sağlayıcıları tarafından üretilir.'],
        ]),
        'Şahıs şirketleri (gerçek kişi mükellefler) e-dönüşüm uygulamalarında mali mühür yerine e-imza da kullanabilir. Limited ve anonim şirketler gibi tüzel kişiler ise mali mühür kullanır.',
        `<p>E-imza hakkında ayrıntılı bilgi için <a href="/bilgi-bankasi/e-imza/e-imza-rehberi/">E-İmza Rehberi</a>’ne bakabilirsiniz.</p>`],
    ],
    kimlerTitle: 'Mali Mühür Kimler İçin Gerekli?',
    kimler: [
      'E-fatura ve e-arşiv fatura uygulamasına geçen şirketler',
      'E-defter tutan ve berat yükleyen şirketler',
      'E-irsaliye ve diğer e-belge uygulamalarına geçen işletmeler',
      'E-dönüşüm uygulamalarını şirket adına yürüten tüzel kişiler',
    ],
    kimlerNote: 'Özel entegratör kullanan işletmelerde e-fatura imzalama işlemi entegratör tarafından da yapılabilir; ancak e-defter gibi uygulamalarda mali mühür ihtiyacı devam edebilir. İşletmenize uygun yapıyı birlikte belirleyelim.',
    afterKimler: [
      ['Mali Mühür Başvurusu İçin Gerekenler',
        ul([
          'Şirketin unvan ve vergi numarası bilgileri',
          'Şirketi temsile yetkili kişinin kimlik ve iletişim bilgileri',
          'Başvuru formunun yetkili kişi tarafından imzalanması',
          'Başvuru ücretinin ödenmesi',
        ]),
        'Başvuru dosyanızı sizin için hazırlıyor, eksik bilgi nedeniyle başvurunun gecikmemesi için her adımı kontrol ediyoruz.'],
    ],
    avantaj: [
      ['Kurumsal İmza', 'Belgeler şirket adına güvenle imzalanır.'],
      ['E-Dönüşüm Uyumu', 'E-fatura, e-arşiv ve e-defter süreçlerinde kullanılır.'],
      ['Güvenlik', 'Belgelerin değiştirilmediği güvence altına alınır.'],
      ['Hızlı Teslim', 'Mali mühür aynı gün, dakikalar içinde teslim edilir.'],
    ],
    surec: [
      ['Başvuru', 'Şirket ve yetkili bilgileriyle başvuru dosyanızı hazırlıyoruz.'],
      ['Onay takibi', 'Onay sürecini sizin yerinize takip ediyoruz.'],
      ['Teslimat', 'Mali mührünüzü aynı gün teslim ediyoruz.'],
      ['Kurulum', 'Kurulum ve şifre adımlarını uzaktan tamamlıyoruz.'],
    ],
    afterSurec: [
      ['Mali Mühür Kurulumu ve Kullanımı',
        'Mali mühür teslim edildikten sonra kart okuyucu sürücüsü kurulur, karta PIN belirlenir ve mühür kullandığınız e-fatura, e-defter veya muhasebe programına tanıtılır. Kurulum tamamlandığında belgeleriniz bu programlar üzerinden mali mühürle imzalanır.',
        `<p>Adımlar için <a href="/bilgi-bankasi/mali-muhur/mali-muhur-pin-sifresi-nasil-olusturulur/">Mali Mühür PIN Nasıl Oluşturulur?</a> rehberimize göz atabilirsiniz.</p>`],
      ['Mali Mühür Süresi ve Yenileme',
        'Mali mühür sertifikaları belirli bir süre geçerlidir. Süre dolduğunda e-fatura ve e-defter işlemleri aksayacağı için yenilemenin süre bitmeden yapılması gerekir. Şirket unvanının değişmesi gibi durumlarda da yeni mali mühür gerekebilir.',
        `<p>Yenileme adımları için <a href="/bilgi-bankasi/mali-muhur/mali-muhur-yenileme-nasil-yapilir/">Mali Mühür Yenileme Nasıl Yapılır?</a> rehberimize bakabilirsiniz.</p>`],
      ['Mali Mühür Kullanımında Sık Karşılaşılan Sorunlar',
        ulBold([
          ['PIN kilitlendi', 'PIN üst üste hatalı girildiğinde kart kilitlenebilir. Deneme yapmadan önce bize ulaşın.'],
          ['Program mühürü görmüyor', 'Kart okuyucu sürücüsü kurulu değilse veya kart doğru takılmamışsa mühür listelenmez.'],
          ['Sertifika süresi doldu', 'Süresi dolan mali mühürle belge imzalanamaz; yenileme gerekir.'],
        ])],
    ],
    fiyat: 'Mali mühür ücreti; sertifika süresine, yeni başvuru ya da yenileme olmasına, kart okuyucu ihtiyacına ve kurulum kapsamına göre değişir. Güncel fiyat için bize ulaşın; şirketinize uygun paketi birlikte belirleyelim.',
    fiyatLink: `<p>Ücreti etkileyen etkenler için <a href="/bilgi-bankasi/mali-muhur/mali-muhur-ucreti-neye-gore-degisir/">Mali Mühür Ücreti Neye Göre Değişir?</a> rehberimize göz atabilirsiniz.</p>`,
    sources: [['TÜBİTAK Kamu SM', 'https://kamusm.bilgem.tubitak.gov.tr'], ['GİB e-Belge', 'https://ebelge.gib.gov.tr']],
    kapanis: 'Mali mühür, şirketinizin e-dönüşüm süreçlerinin temel taşıdır. Başvurudan kuruluma kadar tüm adımları sizin yerinize yönetiyoruz.',
    kapanisSub: 'Mali mührünüzü bugün alın; aynı gün teslimat avantajından yararlanın.',
    faqs: [
      ['Mali mühür nedir?', 'Mali mühür, şirketlerin e-fatura, e-arşiv, e-defter ve e-irsaliye gibi elektronik belgeleri şirket adına imzalamak için kullandığı, TÜBİTAK Kamu SM tarafından üretilen elektronik sertifikadır.'],
      ['Mali mühür ile e-imza arasındaki fark nedir?', 'E-imza gerçek kişiye, mali mühür ise şirkete aittir. Mali mühür e-dönüşüm uygulamalarında şirket adına kullanılır.'],
      ['Şahıs şirketi mali mühür almak zorunda mı?', 'Gerçek kişi mükellefler e-dönüşüm uygulamalarında mali mühür yerine e-imza da kullanabilir. Hangisinin size uygun olduğunu birlikte belirleyebiliriz.'],
      ['Mali mühür ne kadar sürede teslim edilir?', 'Başvurunuz tamamlandığında mali mührünüzü aynı gün, dakikalar içinde teslim ediyor ve kurulumunu uzaktan yapıyoruz.'],
      ['Mali mühür ne kadar süre geçerlidir?', 'Mali mühür sertifikaları belirli bir süre için geçerlidir; süre bitmeden yenilenmesi gerekir. Yenileme tarihlerinizi takip ederek sizi önceden bilgilendiriyoruz.'],
      ['Şirket unvanı değişirse mali mühür ne olur?', 'Mali mühür şirket bilgileriyle düzenlendiği için unvan değişikliği gibi durumlarda yeni mali mühür gerekebilir. Değişiklik öncesinde bize danışmanız önerilir.'],
    ],
  }),
  info({
    cat: 'danismanlik', svc: 'e-donusum-danismanligi', slug: 'e-donusum-gecis-rehberi', name: 'E-Dönüşüm',
    title: 'E-Belge Nedir? E-Dönüşüm Geçiş Rehberi ve E-Belge Türleri',
    lead: 'E-fatura, e-arşiv, e-irsaliye, e-defter ve diğer e-belgeler… İşletmenizin hangi e-dönüşüm uygulamalarına geçmesi gerektiğini nasıl belirleyeceğinizi anlattık.',
    intro: [
      'E-dönüşüm, işletmelerin fatura, irsaliye, defter ve benzeri belgelerini elektronik ortamda düzenlemesini ve saklamasını kapsayan uygulamaların genel adıdır.',
      'Hangi uygulamaya ne zaman geçmeniz gerektiği; cironuza, sektörünüze ve faaliyet türünüze göre değişir.',
    ],
    subline: 'İşletmenize uygun e-dönüşüm yol haritasını birlikte çıkaralım.',
    nedir: [
      'E-belge; fatura, irsaliye, defter ve makbuz gibi kâğıt üzerinde düzenlenen belgelerin elektronik ortamda oluşturulması, iletilmesi ve saklanmasıdır. Kâğıt, baskı ve posta masraflarını ortadan kaldırır, belgelerin kaybolma riskini azaltır ve muhasebe programlarıyla entegre çalışarak işlemleri hızlandırır.',
      'E-dönüşüm; e-fatura, e-arşiv fatura, e-irsaliye, e-defter, e-SMM, e-müstahsil makbuzu, e-gider pusulası ve benzeri elektronik belge uygulamalarını kapsar.',
      'Bu uygulamaların çoğu mali mühür veya e-imza ile çalışır ve kullandığınız muhasebe programıyla entegre edilebilir.',
    ],
    kimlerTitle: 'Hangi E-Dönüşüm Uygulamasına Geçmeliyim?',
    kimlerIntro: 'Karar verirken şu sorulara bakılır:',
    kimler: [
      'Cironuz GİB’in belirlediği sınırları aşıyor mu?',
      'İnternet üzerinden satış yapıyor musunuz?',
      'Mal sevkiyatı yapıyor musunuz?',
      'Serbest meslek erbabı mısınız veya tarımsal ürün alımı yapıyor musunuz?',
      'Hangi muhasebe veya ERP programını kullanıyorsunuz?',
    ],
    kimlerNote: 'Zorunluluklar ve geçiş tarihleri mevzuata göre değişebilir; güncel durumu birlikte değerlendiriyoruz.',
    avantaj: [
      ['Doğru Planlama', 'Hangi uygulamaya ne zaman geçeceğiniz netleşir.'],
      ['Ceza Riskini Azaltma', 'Zorunlu geçiş tarihleri kaçırılmaz.'],
      ['Tek Noktadan Yönetim', 'Tüm başvurular ve kurulumlar tek elden yürür.'],
      ['Verimlilik', 'Kâğıt ve manuel işlem yükü azalır.'],
    ],
    surec: [
      ['Analiz', 'İşletmenizin yükümlülüklerini ve mevcut sistemini inceliyoruz.'],
      ['Yol haritası', 'Hangi uygulamalara hangi sırayla geçileceğini planlıyoruz.'],
      ['Başvuru ve kurulum', 'Tüm başvuruları ve kurulumları sizin yerinize yapıyoruz.'],
      ['Takip', 'Yeni düzenlemeleri ve yenileme tarihlerini takip ediyoruz.'],
    ],
    kapanis: 'Doğru planlanmış bir e-dönüşüm süreci, işletmenizi mevzuata uyumlu tutarken zaman ve maliyet kazandırır.',
    kapanisSub: 'E-dönüşüm yol haritanız için bugün ücretsiz ön görüşme talep edin.',
    faqs: [
      ['E-dönüşüme geçmek için ne gerekir?', 'Çoğu uygulama için mali mühür veya e-imza ve ilgili GİB başvuruları gerekir. Tüm adımları sizin yerinize yönetiyoruz.'],
      ['E-belge nedir?', 'E-belge; fatura, irsaliye, defter, makbuz gibi kâğıt üzerinde düzenlenen belgelerin elektronik ortamda oluşturulması, iletilmesi ve saklanmasıdır. E-fatura, e-arşiv fatura, e-irsaliye, e-defter, e-SMM ve e-müstahsil makbuzu en yaygın e-belge türleridir.'],
      ['E-belge kullanmak zorunlu mu?', 'Gelir İdaresi Başkanlığı’nın belirlediği ciro, sektör ve faaliyet kriterlerini sağlayan mükellefler için ilgili e-belge uygulamalarına geçmek zorunludur. Zorunlu olmayan işletmeler de isteğe bağlı olarak geçiş yapabilir.'],
      ['E-belgeler nasıl saklanır?', 'E-belgeler elektronik ortamda, mevzuatta belirtilen süre boyunca erişilebilir şekilde saklanmalıdır. Saklama hizmetini entegratörünüz üzerinden veya kendi sisteminizde yapabilirsiniz.'],
    ],
  }),
  // Search Console (19 Ekim 2026): "e-bordro" aramaları 14. sırada; ayrı rehber yoktu
  info({
    cat: 'kep', svc: 'kep-ik', slug: 'e-bordro-rehberi', name: 'E-Bordro',
    title: 'E-Bordro Nedir? Elektronik Bordro Gönderimi ve KEP İK Rehberi',
    lead: 'E-bordro, çalışanlara verilen ücret hesap pusulasının elektronik ortamda hazırlanıp iletilmesidir. KEP ile nasıl gönderildiğini, hukuki çerçevesini ve işletmenize sağladıklarını anlattık.',
    intro: [
      'Her ay bordro yazdırmak, çalışanlara imzalatmak, teslim kayıtlarını toplamak ve dosyalamak insan kaynakları ekipleri için ciddi bir iş yüküdür. E-bordro, bu süreci dijital ortama taşıyarak hem zaman kazandırır hem de takip edilebilir hâle getirir.',
      'Bu rehberde e-bordronun ne olduğunu, KEP üzerinden nasıl gönderildiğini, ilgili hukuki düzenlemeleri ve geçiş adımlarını anlattık.',
    ],
    subline: 'KEP İK ile bordrolarınızı hukuki delil sağlayan KEP altyapısı üzerinden gönderin; gönderim ve teslim kayıtlarınız otomatik olarak oluşsun.',
    nedir: [
      'E-bordro, işverenin her ödeme döneminde çalışana vermesi gereken ücret hesap pusulasının (bordro) elektronik ortamda hazırlanması ve çalışana dijital olarak iletilmesidir. 4857 sayılı İş Kanunu’nun 37. maddesine göre işveren, ücret ödemelerinde çalışana ücret hesap pusulası vermekle yükümlüdür.',
      '24 Temmuz 2025 tarihli Resmî Gazete’de yayımlanan 7555 sayılı Kanun ile İş Kanunu’nun 109. maddesi yeniden düzenlenmiş; İş Kanunu kapsamındaki bildirimlerin, işçinin yazılı kabulü şartıyla, hukuki delil sağlayan Kayıtlı Elektronik Posta (KEP) üzerinden yapılabilmesinin önü açılmıştır.',
      'KEP İK, bordro ve uygun çalışan bildirimlerinin KEP altyapısı üzerinden gönderilmesini sağlayan çözümdür. Gönderim ve teslim anı zaman damgasıyla kayıt altına alınır.',
    ],
    kimlerTitle: 'E-Bordro Kimler İçin Uygun?',
    kimler: [
      'Her ay çok sayıda çalışana bordro dağıtan şirketler',
      'İnsan kaynakları, bordro ve özlük işleri ekipleri',
      'Birden fazla şubesi veya lokasyonu bulunan işletmeler',
      'Uzaktan veya sahada çalışan personeli olan firmalar',
      'Bordro dağıtımında kâğıt ve imza takibini azaltmak isteyen işverenler',
    ],
    kimlerNote: 'Elektronik bildirimlerde işçinin yazılı kabulü aranır; iş sözleşmesinin feshi sonucunu doğuracak bildirimler ise her hâlükârda yazılı yapılmalıdır. KEP sisteminin kullanım maliyeti işveren tarafından karşılanır.',
    avantaj: [
      ['Zaman Tasarrufu', 'Bordrolar her ay yazdırılıp dağıtılmak yerine dakikalar içinde dijital olarak gönderilir.'],
      ['Gönderim ve Teslim Kaydı', 'KEP sayesinde bordronun ne zaman gönderildiği ve çalışana ne zaman ulaştığı kayıt altına alınır.'],
      ['Kâğıt ve Arşiv Yükünün Azalması', 'Baskı, imza toplama ve fiziksel arşivleme ihtiyacı azalır.'],
      ['Çalışan Memnuniyeti', 'Çalışanlar bordrolarına bulundukları yerden, istedikleri zaman ulaşabilir.'],
      ['Düzenli Belge Yönetimi', 'Bordro ve çalışan bildirimleri tek bir dijital düzende takip edilir.'],
    ],
    surecTitle: 'Kurucu Bilişim ile E-Bordroya Nasıl Geçilir?',
    surec: [
      ['İhtiyaç analizi', 'Çalışan sayınızı, bordro sıklığınızı ve kullandığınız bordro programını birlikte değerlendiriyoruz.'],
      ['KEP hesabının açılması', 'KEP Başvuru Ayrıcalığı ile şirketiniz için KEP hesabını NFC kimlik doğrulama ve e-Devlet onayıyla online açıyoruz.'],
      ['Çalışan onaylarının alınması', 'Elektronik bildirim için gereken işçinin yazılı kabulü sürecini planlamanıza yardımcı oluyoruz.'],
      ['Gönderime başlama', 'Bordrolarınızı KEP İK üzerinden göndermeye başlıyor, ilk dönemlerde süreci birlikte takip ediyoruz.'],
    ],
    kapanis: 'E-bordro, insan kaynakları ekibinizin her ay harcadığı zamanı azaltırken bordro teslimini hukuki delil sağlayan bir altyapıyla kayıt altına alır.',
    kapanisSub: 'E-bordroya geçiş için bugün teklif alın; bordrolarınızı KEP İK ile güvenle gönderin.',
    faqs: [
      ['E-bordro zorunlu mu?', 'İşverenin çalışana ücret hesap pusulası verme yükümlülüğü vardır; bunun elektronik olarak verilmesi ise bir tercihtir. Elektronik bildirimde işçinin yazılı kabulü gibi mevzuattaki koşullara uyulması gerekir.'],
      ['E-bordro KEP ile gönderilmek zorunda mı?', 'Bordro farklı yollarla elektronik olarak iletilebilir. KEP ise gönderim ve teslim kayıtlarıyla hukuki delil sağladığı için uyuşmazlık durumunda ispat açısından güçlü bir seçenektir.'],
      ['Çalışanların da KEP adresi olması gerekir mi?', 'Uygulama yapısına göre değişir. Kurulum sırasında işletmenize ve çalışanlarınıza uygun yöntemi birlikte belirliyoruz.'],
      ['E-bordroda kişisel veriler nasıl korunur?', 'Bordrolar kişisel veri içerdiği için KVKK’ya uygun aydınlatma, yetkilendirme ve güvenli saklama önlemleri alınmalıdır. Ayrıntılar için e-bordroda KVKK uyumu yazımıza göz atabilirsiniz.'],
    ],
  }),
  info({
    cat: 'kep', svc: 'kep-ik', slug: 'kep-rehberi', name: 'KEP',
    title: 'KEP Nedir? Kayıtlı Elektronik Posta Rehberi ve Hukuki Geçerliliği',
    lead: 'KEP (Kayıtlı Elektronik Posta), gönderim ve teslim anını hukuken kanıtlayan resmi e-posta sistemidir. Ne işe yaradığını, kimlerin kullandığını ve KEP adresinin nasıl alındığını anlattık.',
    updated: '2026-10-20',
    kisaca: 'KEP (Kayıtlı Elektronik Posta), elektronik iletilerin kim tarafından, ne zaman gönderildiğini ve alıcıya ne zaman ulaştığını kayıt altına alarak hukuki delil sağlayan resmi e-posta sistemidir. KEP hizmeti BTK tarafından yetkilendirilen KEP hizmet sağlayıcıları üzerinden verilir; KEP adresi bireyler ve şirketler için alınabilir.',
    afterNedir: [
      ['KEP ile Normal E-Posta Arasındaki Farklar',
        ulBold([
          ['Hukuki delil', 'Normal e-postada iletinin ulaştığı hukuken kanıtlanamaz; KEP’te gönderim ve teslim kayıtları delil niteliğindedir.'],
          ['Zaman damgası', 'KEP iletileri zaman damgasıyla işaretlenir; gönderim ve teslim anı kesin olarak belirlenir.'],
          ['İçerik bütünlüğü', 'KEP’te iletinin gönderildikten sonra değiştirilmediği güvence altındadır.'],
          ['Kimlik doğrulama', 'KEP hesabı kimlik doğrulamasıyla açılır; gönderenin kim olduğu bellidir.'],
        ])],
      ['KEP’in Hukuki Dayanağı',
        '6102 sayılı Türk Ticaret Kanunu’nun 18. maddesine göre tacirler arasında diğer tarafı temerrüde düşürmeye, sözleşmeyi feshe veya sözleşmeden dönmeye ilişkin ihbar ve ihtarlar; noter, taahhütlü mektup veya telgrafın yanı sıra güvenli elektronik imza kullanılarak kayıtlı elektronik posta sistemiyle de yapılabilir.',
        'Ayrıca 24 Temmuz 2025 tarihli Resmî Gazete’de yayımlanan 7555 sayılı Kanun ile İş Kanunu’nun 109. maddesi değiştirilmiş; işçinin yazılı kabulü şartıyla iş ilişkisine ilişkin bildirimlerin KEP üzerinden yapılabilmesinin önü açılmıştır.',
        `<p>KEP ile e-bordro gönderimi için <a href="/bilgi-bankasi/kep/e-bordro-rehberi/">E-Bordro Rehberi</a>’ne bakabilirsiniz.</p>`],
    ],
    afterSurec: [
      ['KEP Nasıl Kullanılır?',
        'KEP hesabınıza açıldıktan sonra internet üzerinden giriş yaparak ileti gönderebilir, gelen iletilerinizi ve gönderim–teslim kayıtlarınızı görüntüleyebilirsiniz. Belgeleri e-imzayla imzalayarak KEP üzerinden göndermek, hem imzanın hem de gönderimin hukuki delil niteliği taşımasını sağlar.',
        `<p>Başvuru adımlarının ayrıntısı için <a href="/bilgi-bankasi/kep/kep-adresi-nasil-alinir/">KEP Adresi Nasıl Alınır?</a>, belge imzalamak için <a href="/bilgi-bankasi/e-imza/e-imza-nasil-atilir/">E-İmza Nasıl Atılır?</a> rehberlerimize göz atabilirsiniz.</p>`],
    ],
    fiyat: 'KEP ücreti; bireysel veya kurumsal hesap olmasına, kullanım süresine ve gönderim hacmine göre değişir. KEP İK ile e-bordro gönderiminde çalışan sayısı da teklifi etkiler. Güncel fiyat için bize ulaşın.',
    sources: [['6102 sayılı Türk Ticaret Kanunu', 'https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=6102&MevzuatTur=1&MevzuatTertip=5'], ['Resmî Gazete – 7555 sayılı Kanun', 'https://www.resmigazete.gov.tr/eskiler/2025/07/20250724-2.htm'], ['BTK', 'https://www.btk.gov.tr']],
    intro: [
      'Resmi bir kuruma dilekçe göndermek için çıktı almak, ıslak imza atmak, postaneye gitmek ve ardından “acaba ulaştı mı?” diye beklemek artık gerekmiyor. Kayıtlı Elektronik Posta (KEP) ile resmi yazışmalarınızı dakikalar içinde, hukuki delil niteliğinde gönderebilirsiniz.',
      'Bu rehberde KEP’in ne olduğunu, normal e-postadan farkını, hangi durumlarda kullanıldığını ve KEP adresini nasıl alabileceğinizi adım adım anlattık.',
    ],
    subline: 'Kurucu Bilişim KEP Başvuru Ayrıcalığı ile KEP adresinizi NFC kimlik doğrulama ve e-Devlet onayıyla tamamen online, dakikalar içinde açıyoruz.',
    nedir: [
      'KEP, Kayıtlı Elektronik Posta’nın kısaltmasıdır. Elektronik iletilerin gönderimi ve teslimine ilişkin kayıtları tutarak hukuki delil sağlayan, standart e-postadan farklı nitelikte bir elektronik posta sistemidir.',
      'Bir KEP iletisinin kim tarafından, ne zaman gönderildiği, içeriği ve alıcıya ne zaman ulaştığı kayıt altına alınır. İletiler zaman damgasıyla işaretlenir ve içeriğin gönderildikten sonra değiştirilmediği güvence altındadır. Bu nedenle KEP, kısaca “e-postanın noter tasdiklisi” olarak da tanımlanır.',
      'KEP hizmeti, Bilgi Teknolojileri ve İletişim Kurumu (BTK) tarafından yetkilendirilen KEP hizmet sağlayıcıları üzerinden verilir. KEP adresleri bu sağlayıcıların alan adlarıyla oluşturulur.',
    ],
    kimlerTitle: 'KEP Kimler İçin Gerekli?',
    kimlerIntro: 'Resmi ve ispat gerektiren yazışma yapan herkes KEP kullanabilir. Başlıca kullanıcılar:',
    kimler: [
      'Şirketler: ihtarname, sözleşme bildirimi, sipariş teyidi ve resmi yazışmalar',
      'İnsan kaynakları birimleri: işçinin yazılı kabulüyle iş ilişkisi bildirimleri ve e-bordro (KEP İK)',
      'Avukatlar ve hukuk büroları: resmi bildirim ve yazışmalar',
      'Mali müşavirler ve serbest meslek erbapları',
      'Kamu kurumları ve kurumlarla resmi yazışma yapan kişi ve şirketler',
      'Elektronik tebligat almak veya ispatlı bildirim göndermek isteyen herkes',
    ],
    kimlerNote: 'Hangi yazışmaların KEP ile yapılabileceği ilgili mevzuata göre değişebilir; örneğin iş sözleşmesinin feshi sonucunu doğuracak bildirimler her hâlükârda yazılı yapılmalıdır.',
    avantaj: [
      ['Hukuki Delil', 'Gönderim ve teslim anı kayıt altına alındığı için “ben almadım” veya “ben göndermedim” tartışmaları ortadan kalkar.'],
      ['Zaman Damgası', 'Her ileti zaman damgasıyla işaretlenir; gönderim ve teslim tarihi kesin olarak ispatlanır.'],
      ['İçerik Bütünlüğü', 'İletinin içeriğinin gönderildikten sonra değiştirilmediği güvence altına alınır.'],
      ['Zaman ve Maliyet Tasarrufu', 'Postane, kargo, kâğıt ve iadeli taahhütlü mektup masrafları ortadan kalkar; işlemler dakikalar içinde tamamlanır.'],
      ['Her Yerden Erişim', 'KEP hesabınıza internet olan her yerden ulaşabilir, yazışmalarınızı dijital ortamda düzenli şekilde arşivleyebilirsiniz.'],
    ],
    surecTitle: 'KEP Adresi Nasıl Alınır?',
    surec: [
      ['Başvuru', 'Formu doldurun veya WhatsApp’tan yazın; bireysel ya da kurumsal KEP ihtiyacınızı birlikte belirleyelim.'],
      ['Bilgilerin alınması', 'Başvuru için gerekli bilgileri KVKK kapsamında güvenli şekilde online alıyoruz; fiziki evrak veya şubeye gitmeniz gerekmez.'],
      ['NFC ile kimlik doğrulama', 'Kimliğinizi çipli T.C. Kimlik Kartınız üzerinden NFC ile doğrularsınız.'],
      ['E-Devlet onayı', 'Başvurunuzu e-Devlet üzerinden onaylarsınız; KEP hesabınız dakikalar içinde açılır.'],
    ],
    kapanis: 'KEP, resmi yazışmalarınızı hızlı, güvenli ve hukuken ispatlanabilir hale getirir. Kurucu Bilişim KEP Başvuru Ayrıcalığı ile başvurunuz baştan sona online ilerler.',
    kapanisSub: 'KEP adresinizi bugün alın; resmi yazışmalarınızı dakikalar içinde güvenle gönderin.',
    faqs: [
      ['KEP ile normal e-posta arasındaki fark nedir?', 'Normal e-postada iletinin ulaşıp ulaşmadığı ve içeriğinin değişip değişmediği hukuken kanıtlanamaz. KEP ise gönderim ve teslim kayıtlarını zaman damgasıyla tutar ve hukuki delil sağlar.'],
      ['KEP ile gönderilen ileti hukuken geçerli mi?', 'KEP, gönderim ve teslimata ilişkin hukuki delil sağlayan bir sistemdir. Bir yazışmanın hukuki sonucu ise belgenin niteliğine ve ilgili mevzuatın aradığı koşullara bağlıdır.'],
      ['KEP adresi almak için hangi belgeler gerekir?', 'Fiziki evrak getirmenize gerek yoktur. Gerekli bilgileri KVKK kapsamında online alıyoruz; kimlik doğrulaması çipli T.C. Kimlik Kartınızla NFC üzerinden, onay ise e-Devlet üzerinden yapılır.'],
      ['KEP adresine e-imza gerekir mi?', 'KEP üzerinden belge imzalayarak göndermek için e-imza veya kurumlar için mali mühür kullanılabilir. İhtiyacınıza uygun yapıyı başvuru sırasında birlikte belirliyoruz.'],
      ['Bireyler de KEP adresi alabilir mi?', 'Evet. KEP adresi hem şirketler hem de bireyler için alınabilir.'],
    ],
  }),
];
