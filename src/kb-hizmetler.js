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

// Ortak iskelet: giriş → nedir → kimler → avantajlar → süreç → fiyat → kapanış
function info(o) {
  const html = [
    ...o.intro.map(p),
    sub(o.subline),
    h2(`${o.name} Nedir?`), ...o.nedir.map(p),
    h2(o.kimlerTitle || `${o.name} Kimler İçin Zorunlu?`), ...(o.kimlerIntro ? [p(o.kimlerIntro)] : []), ul(o.kimler), ...(o.kimlerNote ? [note(o.kimlerNote)] : []),
    h2(`${o.name} Kullanmanın Avantajları`), ...o.avantaj.map(([t, d], i) => `${h3(`${i + 1}. ${t}`)}${p(d)}`),
    h2(o.surecTitle || `Kurucu Bilişim ile ${o.name} Süreci Nasıl İşler?`), olBold(o.surec),
    h2(`${o.name} Fiyatları`), p(`${o.name} ücretleri; kullanım hacmine, seçilen pakete, entegrasyon ihtiyacına ve hizmet kapsamına göre değişir. İşletmenizin ihtiyaçlarını belirleyerek size özel fiyat teklifi hazırlıyoruz.`),
  ].join('\n');
  // Kapanış SSS'den sonra, tek teklif kutusunun hemen üstünde durur (patron: butonlar yalnız en sonda)
  const outro = [h2(`Kurucu Bilişim ile ${o.name} Süreçlerinizi Dijitalleştirin`), p(o.kapanis), sub(o.kapanisSub)].join('\n');
  return { cat: o.cat, slug: o.slug, svc: o.svc, title: o.title, lead: o.lead, html, outro, faqs: o.faqs, info: true, updated: '2026-10-19' };
}

module.exports = [
  info({
    cat: 'e-fatura', svc: 'e-fatura', slug: 'e-fatura-rehberi', name: 'E-Fatura',
    title: 'E-Fatura Rehberi: Nedir, Kimler Geçmek Zorunda, Nasıl Başvurulur?',
    lead: 'E-fatura; faturaların elektronik ortamda düzenlenip GİB üzerinden iletildiği yasal uygulamadır. Kimlerin geçmesi gerektiğini ve başvuru adımlarını anlattık.',
    intro: [
      'Faturaların kâğıda basılması, imzalanması, kargoyla gönderilmesi ve arşivlenmesi işletmeler için ciddi zaman ve maliyet demektir. E-fatura bu süreci tamamen dijital ortama taşır.',
      'Gelir İdaresi Başkanlığı (GİB) tarafından belirlenen mükellefler için e-faturaya geçiş zorunludur; zorunlu olmayan işletmeler de isteğe bağlı olarak sisteme dahil olabilir.',
    ],
    subline: 'E-faturaya geçişinizi mali mühür temininden program entegrasyonuna kadar tek noktadan yönetiyoruz.',
    nedir: [
      'E-fatura, kâğıt faturayla aynı hukuki niteliğe sahip olan ve elektronik ortamda düzenlenen faturadır. E-fatura, GİB sistemine kayıtlı iki mükellef arasında GİB altyapısı üzerinden iletilir.',
      'Faturalar mali mühür veya e-imza ile imzalanır; bu sayede belgenin kim tarafından düzenlendiği ve sonradan değiştirilmediği güvence altına alınır.',
    ],
    kimlerIntro: 'E-faturaya geçiş zorunluluğu GİB’in yayımladığı tebliğlerle belirlenir. Genel olarak şu mükellefler kapsamdadır:',
    kimler: [
      'GİB’in belirlediği brüt satış hasılatı (ciro) sınırını aşan mükellefler',
      'İnternet üzerinden mal ve hizmet satışı yapan ve belirlenen hadleri aşan e-ticaret işletmeleri',
      'Gayrimenkul ve motorlu taşıt alım satımı gibi belirli faaliyetlerde bulunan mükellefler',
      'GİB tarafından sektörel olarak kapsama alınan diğer mükellefler',
    ],
    kimlerNote: 'Ciro sınırları ve geçiş tarihleri zaman içinde değişebilir. İşletmenizin kapsamda olup olmadığını birlikte kontrol edebiliriz.',
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
    kapanis: 'E-faturaya geçiş, doğru planlandığında işletmenize hem zaman hem maliyet kazandırır. Kurucu Bilişim olarak tüm adımları sizin yerinize takip ediyoruz.',
    kapanisSub: 'E-fatura geçişiniz için bugün teklif alın; faturalarınızı dijitalde güvenle yönetin.',
    faqs: [
      ['E-faturaya geçiş ne kadar sürer?', 'Mali mührünüz veya e-imzanız hazır olduğunda başvuru ve kurulum genellikle birkaç iş günü içinde tamamlanır.'],
      ['Zorunlu olmadan e-faturaya geçebilir miyim?', 'Evet. Zorunlu kapsamda olmayan işletmeler de isteğe bağlı olarak e-fatura sistemine dahil olabilir.'],
      ['E-fatura ile e-arşiv fatura arasındaki fark nedir?', 'E-fatura, iki e-fatura mükellefi arasında düzenlenir. Alıcı e-fatura sistemine kayıtlı değilse e-arşiv fatura düzenlenir.'],
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
    title: 'E-İmza Rehberi: Nedir, Nerelerde Kullanılır, Nasıl Alınır?',
    lead: 'Nitelikli elektronik imza, 5070 sayılı Kanun’a göre ıslak imzayla aynı hukuki sonucu doğurur. E-imzanın kullanım alanlarını ve alma adımlarını anlattık.',
    intro: [
      'E-Devlet, UYAP, EKAP, MERSİS ve SGK gibi birçok resmi platformda işlem yapmak için e-imzaya ihtiyaç duyulur. E-imza, belgelerinizi dijital ortamda güvenle imzalamanızı sağlar.',
    ],
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
      ['E-imza ıslak imza ile aynı geçerliliğe sahip mi?', 'Evet. 5070 sayılı Kanun’a göre güvenli elektronik imza, elle atılan imza ile aynı hukuki sonucu doğurur.'],
      ['E-imzam ne kadar sürede elime ulaşır?', 'İstanbul içinde hızlı kuryeyle yönlendirilir; diğer illere aynı gün kargoya verilir ve ertesi gün teslimat seçeneği sunulur.'],
    ],
  }),
  info({
    cat: 'mali-muhur', svc: 'mali-muhur', slug: 'mali-muhur-rehberi', name: 'Mali Mühür',
    title: 'Mali Mühür Rehberi: Nedir, Kimler Kullanır, Nasıl Alınır?',
    lead: 'Mali mühür; şirketlerin e-fatura, e-arşiv ve e-defter gibi uygulamalarda kullandığı elektronik sertifikadır. Ne işe yaradığını ve alma adımlarını anlattık.',
    intro: [
      'E-dönüşüm uygulamalarında belgeleri şirket adına imzalamak için mali mühür kullanılır. Mali mühür, tüzel kişiliğin dijital kimliğidir.',
    ],
    subline: 'Mali mührünüzü aynı gün, dakikalar içinde teslim ediyor; kurulumunu uzaktan yapıyoruz.',
    nedir: [
      'Mali mühür, kurumların e-dönüşüm uygulamalarında kullandığı ve TÜBİTAK Kamu Sertifikasyon Merkezi tarafından üretilen elektronik sertifikadır.',
      'E-imza gerçek kişiye, mali mühür ise tüzel kişiliğe (şirkete) aittir.',
    ],
    kimlerTitle: 'Mali Mühür Kimler İçin Gerekli?',
    kimler: [
      'E-fatura, e-arşiv fatura ve e-defter kullanan şirketler',
      'E-irsaliye ve diğer e-belge uygulamalarına geçen işletmeler',
      'E-dönüşüm uygulamalarını şirket adına yürüten tüzel kişiler',
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
    kapanis: 'Mali mühür, şirketinizin e-dönüşüm süreçlerinin temel taşıdır. Başvurudan kuruluma kadar tüm adımları sizin yerinize yönetiyoruz.',
    kapanisSub: 'Mali mührünüzü bugün alın; aynı gün teslimat avantajından yararlanın.',
    faqs: [
      ['Mali mühür ile e-imza arasındaki fark nedir?', 'E-imza gerçek kişiye, mali mühür ise şirkete aittir. Mali mühür e-dönüşüm uygulamalarında şirket adına kullanılır.'],
      ['Mali mühür ne kadar süre geçerlidir?', 'Sertifikalar seçilen pakete göre belirli bir süre geçerlidir; süre bitmeden yenilenmesi gerekir.'],
    ],
  }),
  info({
    cat: 'danismanlik', svc: 'e-donusum-danismanligi', slug: 'e-donusum-gecis-rehberi', name: 'E-Dönüşüm',
    title: 'E-Dönüşüm Geçiş Rehberi: Hangi Uygulamalara Geçmeliyim?',
    lead: 'E-fatura, e-arşiv, e-irsaliye, e-defter ve diğer e-belgeler… İşletmenizin hangi e-dönüşüm uygulamalarına geçmesi gerektiğini nasıl belirleyeceğinizi anlattık.',
    intro: [
      'E-dönüşüm, işletmelerin fatura, irsaliye, defter ve benzeri belgelerini elektronik ortamda düzenlemesini ve saklamasını kapsayan uygulamaların genel adıdır.',
      'Hangi uygulamaya ne zaman geçmeniz gerektiği; cironuza, sektörünüze ve faaliyet türünüze göre değişir.',
    ],
    subline: 'İşletmenize uygun e-dönüşüm yol haritasını birlikte çıkaralım.',
    nedir: [
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
    ],
  }),
];
