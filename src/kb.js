// Bilgi Bankası: kısa, adım adım "nasıl yapılır / sorun çözme" yazıları.
// taslak: true olan yazılar canlı derlemeye girmez; önizleme için: KB_TASLAK=1 node build.js
const { esc } = require('./lib');

const SHOW_DRAFTS = process.env.KB_TASLAK === '1';

// Blogdan taşınan KEP İK haberi (içerik posts.json'da durur, blogda gösterilmez → posts.js EXCLUDE)
const KEP_IK_SLUG = 'kep-ik-ve-e-bordro-hukuki-delil-saglayan-dijital-bordro-cozumu';
const kepPost = require('./content/posts.json').find((x) => x.slug === KEP_IK_SLUG);
const extLinks = (h) => h.replace(/<a ([^>]*?)href="(https?:[^"]+)"(?![^>]*target=)/g, '<a $1href="$2" target="_blank" rel="noopener"');

const cats = [
  { slug: 'e-fatura', name: 'E-Fatura', icon: 'doc', svc: 'e-fatura', desc: 'E-fatura nedir, kimler geçmek zorunda, başvuru, iptal ve sık sorulanlar.' },
  { slug: 'e-arsiv-fatura', name: 'E-Arşiv Fatura', icon: 'archive', svc: 'e-arsiv-fatura', desc: 'E-arşiv fatura nedir, kimlere düzenlenir ve nasıl geçilir.' },
  { slug: 'e-irsaliye', name: 'E-İrsaliye', icon: 'truck', svc: 'e-irsaliye', desc: 'E-irsaliye nedir, kimler için zorunlu ve nasıl geçilir.' },
  { slug: 'e-defter', name: 'E-Defter', icon: 'book', svc: 'e-defter', desc: 'E-defter, berat süreleri ve e-defter saklama.' },
  { slug: 'e-smm', name: 'E-SMM', icon: 'briefcase', svc: 'e-smm', desc: 'Elektronik serbest meslek makbuzu: kimler kullanır, nasıl geçilir.' },
  { slug: 'e-mustahsil', name: 'E-Müstahsil Makbuzu', icon: 'leaf', svc: 'e-mustahsil-makbuzu', desc: 'Tarımsal alımlarda e-müstahsil makbuzu.' },
  { slug: 'e-gider-pusulasi', name: 'E-Gider Pusulası', icon: 'receipt', svc: 'e-gider-pusulasi', desc: 'E-gider pusulası ne zaman ve nasıl düzenlenir.' },
  { slug: 'e-dekont', name: 'E-Dekont', icon: 'banknote', svc: 'e-dekont', desc: 'Finans kuruluşları için e-dekont.' },
  { slug: 'e-adisyon', name: 'E-Adisyon', icon: 'coffee', svc: 'e-adisyon', desc: 'Restoran ve kafeler için elektronik adisyon.' },
  { slug: 'e-bilet', name: 'E-Bilet', icon: 'ticket', svc: 'e-bilet', desc: 'Ulaşım ve etkinliklerde elektronik bilet.' },
  { slug: 'e-imza', name: 'E-İmza', icon: 'pen', svc: 'e-imza', desc: 'E-imza nedir, nasıl alınır, kurulum, şifre (PIN) ve e-Devlet girişi.' },
  { slug: 'mali-muhur', name: 'Mali Mühür', icon: 'seal', svc: 'mali-muhur', desc: 'Mali mühür nedir, nasıl alınır, PIN oluşturma ve kurulum.' },
  { slug: 'kep', name: 'KEP ve E-Bordro', icon: 'mail', svc: 'kep-ik', desc: 'KEP adresi alma, KEP İK ile e-bordro ve hukuki geçerlilik.' },
  { slug: 'entegrasyon', name: 'E-Dönüşüm Entegrasyonu', icon: 'sync', svc: 'e-donusum-entegrasyonu', desc: 'Muhasebe, ERP, e-ticaret ve pazaryeri entegrasyonları.' },
  { slug: 'danismanlik', name: 'Başvuru ve Geçiş Danışmanlığı', icon: 'compass', svc: 'e-donusum-danismanligi', desc: 'Hangi e-dönüşüm uygulamasına ne zaman geçmeli.' },
];

// --- Yardımcılar: patron metinlerindeki kalıplar (# başlık, *...* kalın alt başlık)
const p = (t) => `<p>${esc(t)}</p>`;
const sub = (t) => `<p><strong>${esc(t)}</strong></p>`;
const h2 = (t) => `<h2>${esc(t)}</h2>`;
const h3 = (t) => `<h3>${esc(t)}</h3>`;
const ulBold = (items) => `<ul>${items.map(([t, d]) => `<li><strong>${esc(t)}:</strong> ${esc(d)}</li>`).join('')}</ul>`;
const olBold = (items) => `<ol>${items.map(([t, d]) => `<li><strong>${esc(t)}:</strong> ${esc(d)}</li>`).join('')}</ol>`;
const ul = (items) => `<ul>${items.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`;
const note = (t) => `<blockquote><p>${esc(t)}</p></blockquote>`;

const articles = [
  // ========== ENTEGRASYON (patron metinleri; e-dönüşüm entegrasyonu sayfasından taşındı) ==========
  {
    cat: 'entegrasyon', slug: 'muhasebe-ve-erp-programlari-entegrasyonu', svc: 'e-donusum-entegrasyonu', updated: '2026-10-19',
    title: 'Hangi Muhasebe ve ERP Programlarıyla Entegrasyon Sağlıyoruz?',
    lead: '600’den fazla muhasebe ve ERP programıyla entegrasyon desteği! Mevcut yazılımınızı değiştirmeden e-Dönüşüm süreçlerinizi dijitalleştirin.',
    html: [
      p('Kurucu Bilişim olarak, işletmenizin kullandığı muhasebe ve ERP yazılımlarıyla e-Dönüşüm süreçlerinizi entegre ederek iş akışlarınızı kolaylaştırıyoruz. e-Fatura, e-Arşiv Fatura, e-İrsaliye ve diğer e-Dönüşüm uygulamalarını mevcut yazılım altyapınızla buluşturarak manuel veri girişlerini azaltmanıza, zamandan tasarruf etmenize ve operasyonel verimliliğinizi artırmanıza yardımcı oluyoruz.'),
      `<p><strong>600’den fazla muhasebe ve ERP programıyla entegrasyon desteğimiz</strong> sayesinde farklı sektörlerde faaliyet gösteren işletmelerin ihtiyaçlarına yönelik çözümler sunuyoruz. Yaygın ticari yazılımlardan kurumsal kaynak planlama sistemlerine ve sektöre özel yazılımlara kadar geniş bir yelpazede entegrasyon seçeneklerini değerlendiriyoruz.</p>`,
      h2('Entegrasyon Desteği Sunulan Muhasebe ve ERP Programları'),
      p('Türkiye’de işletmeler tarafından yaygın olarak kullanılan muhasebe ve ERP yazılımları arasında şunlar yer almaktadır:'),
      ulBold([
        ['Logo Yazılım', 'Logo Tiger, Logo GO ve ilgili ticari yazılımlar'],
        ['Mikro Yazılım', 'Mikro Jump, Mikro Fly ve ilgili ERP çözümleri'],
        ['Netsis', 'Ticari yönetim ve kurumsal kaynak planlama çözümleri'],
        ['SAP', 'SAP Business One ve uygun SAP çözümleri'],
        ['Microsoft Dynamics 365', 'ERP ve finans yönetimi çözümleri'],
        ['Nebim', 'Nebim V3 ve perakende yönetim çözümleri'],
        ['CANIAS ERP', 'Üretim ve kurumsal kaynak planlama çözümleri'],
        ['DİA', 'Bulut tabanlı ticari yönetim ve ERP çözümleri'],
        ['Uyumsoft', 'ERP ve ticari yazılım çözümleri'],
        ['ETA', 'Muhasebe ve ticari yönetim yazılımları'],
        ['Odoo', 'Modüler kurumsal kaynak planlama çözümleri'],
        ['LUCA', 'Muhasebe ve mali müşavirlik yazılımları'],
        ['Zirve', 'Muhasebe ve mali müşavirlik çözümleri'],
      ]),
      p('Bu programların yanı sıra, yüzlerce farklı muhasebe, ticari yönetim ve ERP yazılımı için entegrasyon seçeneklerini değerlendiriyoruz. Entegrasyonun kapsamı kullanılan yazılımın sürümüne, modüllerine ve teknik altyapısına göre değişebilir.'),
      h2('e-Dönüşüm Entegrasyonunun İşletmenize Sağladığı Avantajlar'),
      ulBold([
        ['Otomatik e-Belge süreçleri', 'Uygun entegrasyonlarla elektronik belgelerinizi mevcut iş akışlarınız üzerinden yönetin.'],
        ['Zamandan tasarruf', 'Tekrarlanan veri girişlerini ve manuel işlem yükünü azaltın.'],
        ['Daha az hata', 'Sistemler arasındaki veri aktarımını kolaylaştırarak operasyonel hata riskini düşürün.'],
        ['Verimli iş süreçleri', 'Muhasebe, satış, stok ve faturalama süreçlerinizin uyumlu çalışmasını destekleyin.'],
        ['İşletmenize özel çözümler', 'Mevcut yazılım altyapınıza ve iş ihtiyaçlarınıza uygun entegrasyon seçeneklerini değerlendirin.'],
      ]),
      h2('Kullandığınız Program Listede Yok mu?'),
      `<p>İşletmenizin kullandığı muhasebe veya ERP programı listede yer almıyorsa endişelenmeyin. <strong>600’den fazla programa yönelik entegrasyon desteğimizle</strong> yazılımınızın teknik altyapısını ve e-Dönüşüm ihtiyaçlarınızı değerlendirelim. Mevcut entegrasyon seçenekleri veya ihtiyaçlarınıza uygun özel çözümler hakkında size bilgi verelim.</p>`,
      sub('Kurucu Bilişim ile e-Dönüşüm süreçlerinizi kolaylaştırın, iş akışlarınızı dijitalleştirin ve işletmenizin verimliliğini artırın.'),
      sub('Entegrasyon seçenekleri hakkında bilgi almak ve işletmenize uygun çözümü öğrenmek için bizimle iletişime geçin.'),
    ].join('\n'),
  },
  {
    cat: 'entegrasyon', slug: 'e-ticaret-siparisleri-otomatik-faturalandirma', svc: 'e-donusum-entegrasyonu', updated: '2026-10-19',
    title: 'E-Ticaret Sitemdeki Siparişler Otomatik Faturalandırılabilir mi?',
    lead: 'Evet. Trendyol, Hepsiburada, n11, Amazon, Shopify ve Shopier gibi kanallardaki siparişleriniz doğru bir e-fatura entegrasyonuyla otomatik faturalandırılabilir.',
    html: [
      p('Evet, e-ticaret sitenizdeki siparişleri otomatik olarak faturalandırabilirsiniz. Doğru bir e-fatura entegrasyonu sayesinde siparişleriniz sisteme otomatik aktarılabilir, gerekli bilgiler kontrol edilebilir ve siparişleriniz için uygun elektronik fatura oluşturularak müşterilerinize iletilebilir.'),
      p('Özellikle Trendyol, Hepsiburada, n11 ve Amazon gibi pazaryerlerinde ya da Shopify ve Shopier gibi e-ticaret platformlarında satış yapıyorsanız, otomatik faturalandırma iş süreçlerinizi kolaylaştırır. Böylece her siparişin bilgilerini manuel olarak fatura programına girmek yerine, siparişten faturaya uzanan süreci tek bir sistem üzerinden yönetebilirsiniz.'),
      h2('Otomatik Faturalandırma Nedir?'),
      p('Otomatik faturalandırma, e-ticaret siparişlerinin bir entegrasyon aracılığıyla fatura sistemine aktarılması ve belirlenen kurallara göre elektronik faturaların oluşturulmasıdır.'),
      p('Bir müşteri sipariş verdiğinde sistem; sipariş numarası, ürün bilgileri, tutar, vergi oranları ve alıcı bilgileri gibi gerekli verileri alır. Tanımlanan iş akışına göre fatura oluşturulur, ilgili elektronik belge sistemine gönderilir ve müşteriye iletilir.'),
      p('Kullanılan yazılıma bağlı olarak otomatik fatura kesme işlemi sipariş oluşturulduğunda, ödeme alındığında veya ürün kargoya verildiğinde başlatılabilir. Ancak otomasyonun doğru çalışması için sipariş durumlarının, vergi bilgilerinin ve fatura kurallarının önceden yapılandırılması gerekir.'),
      h2('Hangi Pazaryerlerinde Otomatik Fatura Kesilebilir?'),
      p('E-ticaret fatura entegrasyonları, birden fazla satış kanalını tek sistemde birleştirmeyi mümkün kılabilir. Entegrasyonun kapsamı kullanılan yazılıma, platformun API özelliklerine ve hesabınızın yapılandırmasına göre değişir.'),
      h3('Türkiye’deki Pazaryerleri'),
      ulBold([
        ['Trendyol', 'Trendyol siparişlerini fatura sisteminize aktarabilir, uygun entegrasyonla e-Fatura veya e-Arşiv Fatura oluşturma sürecini otomatikleştirebilirsiniz.'],
        ['Hepsiburada', 'Sipariş bilgilerinin faturalandırma sistemine aktarılması, fatura oluşturulması ve ilgili belgelerin yönetilmesi entegrasyonla kolaylaştırılabilir.'],
        ['n11', 'n11 mağazanızdan gelen siparişleri diğer satış kanallarınızla birlikte takip edebilir ve desteklenen bir entegrasyon aracılığıyla faturalandırabilirsiniz.'],
        ['ÇiçekSepeti', 'ÇiçekSepeti satışlarınızı destekleyen bir pazaryeri entegrasyonu üzerinden sipariş ve fatura süreçlerinizi merkezileştirebilirsiniz.'],
        ['Pazarama', 'Pazarama siparişlerinizi, desteklenen bağlantı seçenekleriyle diğer e-ticaret kanallarınızla aynı faturalandırma sisteminde yönetebilirsiniz.'],
        ['PTTAVM', 'PTTAVM mağazanızdaki siparişlerin fatura sistemine aktarılması için kullandığınız yazılımın ilgili entegrasyonu desteklemesi gerekir.'],
      ]),
      h3('Global Pazaryerleri ve E-Ticaret Platformları'),
      ulBold([
        ['Amazon', 'Amazon Türkiye veya diğer Amazon mağazalarından gelen siparişleri, ilgili pazarın ve kullanılan entegrasyonun desteklediği ölçüde faturalandırma sisteminize aktarabilirsiniz. Yurt dışı satışlarda ülke bazındaki vergi ve fatura kurallarını ayrıca değerlendirmek gerekir.'],
        ['Etsy', 'Etsy üzerinden ürün satan işletmeler, uygun bir entegrasyon aracılığıyla sipariş bilgilerini faturalandırma süreçlerine aktarabilir. Uluslararası satışlarda alıcının ülkesi, satışın niteliği ve uygulanacak vergi kuralları önemlidir.'],
        ['Shopier', 'Shopier üzerinden alınan siparişler, platformla uyumlu bir uygulama veya entegrasyon aracılığıyla faturalandırma sistemine aktarılabilir. Kullanılacak çözümün sipariş aktarımı ve otomatik fatura oluşturma özellikleri kontrol edilmelidir.'],
        ['Shopify', 'Shopify, kendi e-ticaret mağazanızı kurup yönetebileceğiniz bir platformdur. Shopify mağazanızı uyumlu bir fatura uygulamasına veya entegrasyon yazılımına bağlayarak siparişlerin otomatik aktarılmasını ve faturaların oluşturulmasını sağlayabilirsiniz.'],
        ['WooCommerce', 'WordPress altyapılı WooCommerce mağazaları da uyumlu e-fatura eklentileri, API bağlantıları veya aracı yazılımlar üzerinden otomatik faturalandırma sistemlerine bağlanabilir.'],
      ]),
      p('Birden fazla pazaryerinde satış yapıyorsanız her kanal için ayrı ayrı işlem yapmak yerine, desteklenen tüm mağazaları tek bir panelde toplayan bir çözüm tercih edebilirsiniz.'),
      h2('Otomatik E-Fatura ve E-Arşiv Fatura Nasıl Çalışır?'),
      p('Türkiye’de e-ticaret satışlarında kullanılacak elektronik belgenin türü, alıcının durumuna ve yürürlükteki mevzuata göre belirlenmelidir.'),
      ulBold([
        ['e-Fatura', 'Hem satıcı hem de alıcı e-Fatura sistemine kayıtlıysa ilgili satış için e-Fatura düzenlenmesi gerekir.'],
        ['e-Arşiv Fatura', 'Alıcının e-Fatura sistemine kayıtlı olmadığı durumlarda, ilgili mevzuat kapsamında e-Arşiv Fatura düzenlenebilir.'],
      ]),
      p('Uygun bir otomatik faturalandırma sistemi, alıcı bilgilerini kontrol ederek doğru belge türünün seçilmesine yardımcı olabilir. Bununla birlikte mükellefiyet durumları, istisnalar ve güncel mevzuat gereklilikleri dikkate alınmalıdır.'),
      h2('E-Ticaret Siparişlerini Otomatik Faturalandırmanın Avantajları'),
      h3('1. Zamandan Tasarruf'),
      p('Sipariş bilgilerini her defasında manuel olarak girmek zorunda kalmazsınız. Çok sayıda sipariş alan mağazalarda bu özellik operasyonel iş yükünü azaltabilir.'),
      h3('2. Manuel Hataların Azaltılması'),
      p('Sipariş ve müşteri bilgilerinin sistemler arasında aktarılması, elle veri girişinden kaynaklanan hataların azaltılmasına yardımcı olur. Yine de vergi oranları, ürün bilgileri ve müşteri verileri kontrol edilmelidir.'),
      h3('3. Birden Fazla Satış Kanalını Tek Panelde Yönetme'),
      p('Trendyol, Hepsiburada, n11, Amazon, Etsy, Shopier ve Shopify gibi kanalları destekleyen bir çözümle siparişlerinizi merkezi bir sistem üzerinden takip edebilirsiniz.'),
      h3('4. Daha Hızlı Fatura Gönderimi'),
      p('Faturaların belirlenen sipariş durumunda otomatik oluşturulması ve elektronik ortamda iletilmesi, müşterilerin belgelerine daha hızlı ulaşmasını sağlayabilir.'),
      h3('5. İade ve İptal Süreçlerini Kolaylaştırma'),
      p('Uygun bir entegrasyon, iptal ve iade işlemlerinin takibini kolaylaştırabilir. Ancak düzenlenmiş bir faturanın iptali veya düzeltilmesi, ilgili mevzuata uygun şekilde yürütülmelidir; yalnızca siparişin iptal edilmesi her durumda faturayı kendiliğinden ortadan kaldırmaz.'),
      h2('Otomatik Faturalandırma Sistemi Nasıl Kurulur?'),
      p('E-ticaret siparişlerinizi otomatik faturalandırmak için şu adımları izleyebilirsiniz:'),
      olBold([
        ['E-fatura çözümünüzü belirleyin', 'İşletmenizin ihtiyaçlarına uygun bir e-Fatura veya e-Arşiv Fatura çözümü seçin.'],
        ['Satış kanallarınızı bağlayın', 'Kullandığınız pazaryerlerini ve e-ticaret altyapılarını desteklenen API, uygulama veya entegrasyon aracılığıyla sisteme bağlayın.'],
        ['Ürün ve vergi bilgilerini eşleştirin', 'Ürün kodları, fiyatlar, KDV oranları, kargo bedelleri ve müşteri bilgileri doğru yapılandırılmalıdır.'],
        ['Otomasyon kurallarını tanımlayın', 'Faturanın hangi sipariş durumunda oluşturulacağını ve müşteriye nasıl iletileceğini belirleyin.'],
        ['Test siparişleri oluşturun', 'Mükerrer fatura oluşmasını önleyen kontrolleri, iptal ve iade senaryolarını test edin.'],
        ['Süreci takip edin', 'Başarısız aktarımları, eksik bilgileri ve gönderim hatalarını düzenli olarak kontrol edin.'],
      ]),
      p('Otomatik faturalandırmanın sorunsuz çalışması için kullandığınız sistemin Gelir İdaresi Başkanlığı’nın ilgili elektronik belge kurallarıyla uyumlu olması ve gerekli yetkilendirmelerin tamamlanması önemlidir.'),
      h2('Sonuç: E-Ticaret Siparişlerinizi Otomatik Faturalandırın'),
      p('E-ticaret sitenizde veya farklı pazaryerlerinde oluşan siparişleri otomatik faturalandırmak, iş süreçlerinizi daha düzenli ve verimli yönetmenize yardımcı olabilir. Trendyol, Hepsiburada, n11, ÇiçekSepeti, Pazarama, PTTAVM, Amazon, Etsy, Shopier ve Shopify gibi kanallardan gelen siparişleri desteklenen entegrasyonlarla bir araya getirerek manuel işlem yükünü azaltabilirsiniz.'),
      p('İşletmenize uygun çözümü seçerken yalnızca otomatik fatura oluşturma özelliğine değil; sipariş aktarımı, e-Fatura ve e-Arşiv Fatura desteği, iade yönetimi, mükerrer fatura kontrolü ve müşteri bildirimleri gibi özelliklere de dikkat edin.'),
      sub('Sık sipariş alan e-ticaret işletmeleri için doğru bir otomatik faturalandırma sistemi, siparişten faturaya uzanan sürecin daha hızlı ve kontrollü yönetilmesini sağlayabilir.'),
    ].join('\n'),
    faqs: [
      ['E-ticaret siparişlerine otomatik fatura kesmek mümkün mü?', 'Evet. Uyumlu bir e-fatura yazılımı ve sipariş entegrasyonu kullanarak siparişlerinize ilişkin faturaların otomatik oluşturulmasını sağlayabilirsiniz. İşletmenizin belge düzenleme yükümlülükleri ayrıca dikkate alınmalıdır.'],
      ['Trendyol siparişleri otomatik faturalandırılabilir mi?', 'Evet. Trendyol ile uyumlu bir fatura entegrasyonu kullanıldığında sipariş bilgileri sisteme aktarılabilir ve belirlenen kurallara göre faturalar oluşturulabilir.'],
      ['Amazon, Etsy ve Shopify siparişleri için otomatik fatura kesilebilir mi?', 'Evet, uygun entegrasyonlar aracılığıyla bu platformlardan gelen siparişler faturalandırma sürecine dahil edilebilir. Ancak her platformun, satış yapılan ülkenin ve kullanılan uygulamanın desteklediği özellikler farklı olabilir.'],
      ['Shopier siparişlerine otomatik e-Arşiv Fatura kesilebilir mi?', 'Kullanılan çözüm Shopier entegrasyonunu ve e-Arşiv Fatura oluşturmayı destekliyorsa bu süreç otomatikleştirilebilir. Entegrasyonun sipariş aktarımı, belge gönderimi ve hata yönetimi özelliklerini kontrol etmek gerekir.'],
      ['Otomatik fatura kesmek için e-Fatura mükellefi olmak gerekir mi?', 'İşletmenin tabi olduğu elektronik belge yükümlülüklerine göre değişir. e-Fatura ve e-Arşiv Fatura uygulamalarına ilişkin güncel şartlar Gelir İdaresi Başkanlığı’nın düzenlemeleri doğrultusunda değerlendirilmelidir.'],
      ['Otomatik faturalandırma ücretsiz midir?', 'Kullanılan e-fatura yazılımına, pazaryeri entegrasyonuna, işlem hacmine ve abonelik paketine göre değişir. Bazı uygulamalar ücretsiz deneme sunarken bazıları aylık veya işlem başına ücretlendirme yapabilir.'],
    ],
  },

  // ========== 1. ADIM TASLAKLARI (patron onayı bekliyor) ==========
  {
    cat: 'e-imza', slug: 'e-imza-kurulumu-nasil-yapilir', svc: 'e-imza', updated: '2026-10-19',
    title: 'E-İmza Kurulumu Nasıl Yapılır? Adım Adım Rehber',
    lead: 'E-imzanızı bilgisayarınızda kullanabilmek için kart okuyucu sürücüsü, imza uygulaması ve gerekiyorsa Java kurulmalıdır. Adımları sırasıyla anlattık.',
    html: [
      p('E-imzanız elinize ulaştığında, onu bilgisayarınızda kullanabilmek için birkaç programın kurulması gerekir. Kurulum, e-imzanızı aldığınız sertifika sağlayıcısına ve kullanacağınız sisteme (e-Devlet, UYAP, EKAP, MERSİS gibi) göre küçük farklılıklar gösterebilir.'),
      h2('Kuruluma Başlamadan Önce'),
      ul([
        'E-imza kartınız ve kart okuyucunuz (USB) yanınızda olsun.',
        'Kartla birlikte gelen veya size iletilen PIN (şifre) bilgisini hazır tutun.',
        'Bilgisayarınızda yönetici yetkisiyle program kurabildiğinizden emin olun.',
      ]),
      h2('Adım Adım E-İmza Kurulumu'),
      olBold([
        ['Kart okuyucu sürücüsünü kurun', 'E-imzanızı aldığınız sertifika sağlayıcısının internet sitesindeki “sürücüler” bölümünden, kart okuyucunuzun modeline ve işletim sisteminize uygun sürücüyü indirip kurun.'],
        ['Kart okuyucuyu takın', 'E-imza kartınızın takılı olduğu kart okuyucuyu bilgisayarınıza takın. Okuyucunun ışığı yanıyorsa cihaz tanınmış demektir.'],
        ['İmza uygulamasını kurun', 'Sertifika sağlayıcınızın imza uygulamasını veya kullanacağınız sistemin (ör. e-Devlet, UYAP) istediği imza aracını indirip kurun.'],
        ['Gerekiyorsa Java’yı kurun', 'Bazı imza araçları Java ile çalışır. Uygulama Java isterse güncel Java sürümünü resmî sitesinden kurun.'],
        ['Sertifikanızı kontrol edin', 'İmza uygulamasını açın, kart okuyucunuzu seçin ve PIN’inizi girerek sertifikanızın göründüğünü kontrol edin.'],
        ['Deneme imzası atın', 'Örnek bir belgeyi imzalayarak kurulumun doğru çalıştığından emin olun.'],
      ]),
      h2('Sık Görülen Kurulum Sorunları'),
      ulBold([
        ['Kart okuyucu bulunamadı', 'Sürücü kurulmamış veya okuyucu farklı bir USB girişine takılmış olabilir. Sürücüyü yeniden kurup bilgisayarı yeniden başlatın.'],
        ['Sertifika görünmüyor', 'Kartın okuyucuya doğru takıldığını kontrol edin, imza uygulamasını kapatıp yeniden açın.'],
        ['Java hatası', 'Java güncel değilse veya tarayıcı izin vermiyorsa imza aracı açılmayabilir. Güncel Java sürümünü kurun.'],
      ]),
      note('Kurulum adımları sertifika sağlayıcısına ve kullandığınız sisteme göre farklılık gösterebilir. Kurucu Bilişim olarak e-imza kurulumunu uzaktan bağlantıyla sizin yerinize yapıyoruz.'),
    ].join('\n'),
    faqs: [
      ['E-imza kurulumu ne kadar sürer?', 'Gerekli programlar hazır olduğunda kurulum genellikle birkaç dakika sürer. Uzaktan bağlantıyla kurulumu sizin yerinize yapabiliyoruz.'],
      ['E-imza Mac bilgisayarda çalışır mı?', 'Çoğu sertifika sağlayıcısı macOS için de sürücü sunar; ancak bazı kamu sistemleri yalnızca belirli işletim sistemlerinde tam uyumlu çalışabilir. Kullanacağınız sistemi kontrol etmek gerekir.'],
    ],
  },
  {
    cat: 'e-imza', slug: 'e-imza-sifresi-pin-degistirme-ve-kilit-cozme', svc: 'e-imza', updated: '2026-10-19',
    title: 'E-İmza Şifresi (PIN) Nasıl Değiştirilir? Kilitlenirse Ne Yapılır?',
    lead: 'E-imza PIN’inizi imza uygulamasından değiştirebilirsiniz. Üst üste hatalı girişte kart kilitlenir; kilidi açmak için PUK kodu veya sağlayıcı desteği gerekir.',
    html: [
      p('E-imza kartınızı kullanırken girdiğiniz şifreye PIN denir. PIN, imzanızın yalnızca sizin tarafınızdan kullanılmasını sağlar. Bu nedenle PIN’inizi kimseyle paylaşmamanız ve kolay tahmin edilmeyen bir şifre seçmeniz önemlidir.'),
      h2('E-İmza PIN’i Nasıl Değiştirilir?'),
      olBold([
        ['İmza uygulamasını açın', 'E-imzanızı aldığınız sağlayıcının kart yönetim veya imza uygulamasını açın.'],
        ['Kartınızı seçin', 'Kart okuyucunuzu takın ve uygulamada kartınızı seçin.'],
        ['PIN değiştir seçeneğine girin', 'Uygulamadaki “PIN Değiştir” bölümünde mevcut PIN’inizi ve yeni PIN’inizi girin.'],
        ['Yeni PIN’i onaylayın', 'Yeni PIN’i tekrar yazarak işlemi tamamlayın ve yeni şifrenizi güvenli bir yerde saklayın.'],
      ]),
      h2('PIN Hatalı Girildi, Kart Kilitlendi: Ne Yapmalıyım?'),
      p('PIN üst üste belirli sayıda hatalı girildiğinde kart güvenlik nedeniyle kilitlenir. Bu durumda:'),
      ulBold([
        ['PUK kodunuz varsa', 'Kartla birlikte size iletilen PUK (kilit açma) kodu ile imza uygulaması üzerinden kilidi açıp yeni PIN belirleyebilirsiniz.'],
        ['PUK kodunuz yoksa', 'E-imzanızı aldığınız sertifika sağlayıcısının kilit açma süreciyle işlem yapılır. Bazı durumlarda yeni sertifika gerekebilir.'],
      ]),
      note('PUK kodu da üst üste hatalı girilirse kart kalıcı olarak kullanılamaz hâle gelebilir. Emin değilseniz deneme yapmadan önce bize ulaşın.'),
    ].join('\n'),
    faqs: [
      ['E-imza PIN’imi unuttum, ne yapmalıyım?', 'PUK kodunuz varsa kilit açma işlemiyle yeni PIN belirleyebilirsiniz. PUK kodunuz yoksa sertifika sağlayıcısının süreciyle işlem yapılır; bu süreçte size yardımcı oluyoruz.'],
      ['E-imza şifresi kaç haneli olur?', 'PIN uzunluğu sertifika sağlayıcısına ve kart tipine göre değişir. İmza uygulaması yeni PIN belirlerken kabul edilen uzunluğu gösterir.'],
    ],
  },
  {
    cat: 'e-imza', slug: 'e-devlete-e-imza-ile-giris-nasil-yapilir', svc: 'e-imza', updated: '2026-10-19',
    title: 'E-Devlet’e E-İmza ile Giriş Nasıl Yapılır?',
    lead: 'E-Devlet giriş sayfasında “Elektronik İmza” seçeneğini seçip istenen imza uygulamasını kurduktan sonra kartınızla ve PIN’inizle giriş yapabilirsiniz.',
    html: [
      p('E-imzanızla e-Devlet Kapısı’na şifreye gerek kalmadan güvenli şekilde giriş yapabilirsiniz. E-imza ile giriş, birçok kurum işleminde daha yüksek güvenlik seviyesi sağlar.'),
      h2('Adım Adım E-Devlet’e E-İmza ile Giriş'),
      olBold([
        ['Kart okuyucuyu takın', 'E-imza kartınızın takılı olduğu kart okuyucuyu bilgisayarınıza takın.'],
        ['Giriş sayfasını açın', 'giris.turkiye.gov.tr adresine gidin ve giriş yöntemlerinden “Elektronik İmza”yı seçin.'],
        ['İmza uygulamasını kurun', 'Sayfa sizden bir imza uygulaması kurmanızı isterse yönlendirmeyi izleyerek uygulamayı indirip kurun.'],
        ['Kartınızı ve sertifikanızı seçin', 'Uygulamada kart okuyucunuzu ve sertifikanızı seçin.'],
        ['PIN’inizi girin', 'E-imza PIN’inizi girerek girişi tamamlayın.'],
      ]),
      h2('Giriş Yapamıyorsanız'),
      ulBold([
        ['Kart okuyucu tanınmıyor', 'Kart okuyucu sürücüsünün kurulu olduğundan emin olun.'],
        ['Sertifika listede yok', 'Kartın okuyucuya doğru takıldığını kontrol edip uygulamayı yeniden başlatın.'],
        ['Sertifika süresi dolmuş', 'Süresi dolan e-imzalarla giriş yapılamaz; e-imzanızı yenilemeniz gerekir.'],
      ]),
      note('E-Devlet giriş ekranları ve istenen uygulamalar zaman zaman güncellenebilir. Takıldığınız adımda uzaktan bağlanarak yardımcı oluyoruz.'),
    ].join('\n'),
  },
  {
    cat: 'mali-muhur', slug: 'mali-muhur-pin-sifresi-nasil-olusturulur', svc: 'mali-muhur', updated: '2026-10-19',
    title: 'Mali Mühür PIN (Şifre) Nasıl Oluşturulur?',
    lead: 'Mali mühür teslim edildikten sonra kullanım için bir PIN (şifre) belirlenir. PIN oluşturma, aktivasyon ve kurulum adımlarını özetledik.',
    html: [
      p('Mali mühür, şirketinizin e-fatura, e-arşiv ve e-defter gibi uygulamalarda kullandığı elektronik sertifikadır. Mali mührünüzü kullanabilmek için teslimden sonra bir PIN (şifre) belirlemeniz ve kurulumu tamamlamanız gerekir.'),
      h2('Mali Mühür PIN Oluşturma Adımları'),
      olBold([
        ['Teslim bilgilerini hazırlayın', 'Mali mühür teslim edilirken size iletilen bilgileri ve belgeleri hazır tutun.'],
        ['Kart okuyucuyu takın', 'Mali mührün takılı olduğu kart okuyucuyu bilgisayarınıza takın ve sürücüsünü kurun.'],
        ['PIN belirleyin', 'Sertifika sağlayıcısının yönlendirdiği ekrandan veya uygulamadan mali mühür PIN’inizi belirleyin.'],
        ['Kurulumu tamamlayın', 'E-fatura, e-arşiv veya e-defter için kullandığınız programda mali mührünüzü tanımlayın ve deneme işlemi yapın.'],
      ]),
      h2('Mali Mühür Kilitlenirse'),
      p('PIN üst üste hatalı girilirse mali mühür kilitlenebilir. Kilit çözme işlemi sertifika sağlayıcısının belirlediği adımlarla yapılır. Bu durumda deneme yapmaya devam etmeden bize ulaşmanızı öneririz.'),
      note('Mali mühür PIN oluşturma, aktivasyon ve kurulum adımlarında uzaktan bağlantıyla destek veriyoruz.'),
    ].join('\n'),
  },
  {
    cat: 'kep', slug: 'kep-adresi-nasil-alinir', svc: 'kep-ik', updated: '2026-10-19',
    title: 'KEP Adresi Nasıl Alınır? Online Başvuru Adımları',
    lead: 'Kurucu Bilişim KEP Başvuru Ayrıcalığı ile KEP adresi başvurusu tamamen online yapılır: NFC ile kimlik doğrulama ve e-Devlet onayı, dakikalar içinde hesap.',
    html: [
      p('Kayıtlı Elektronik Posta (KEP), elektronik iletilerin gönderimini ve teslimini yasal delil sağlayacak şekilde belgeleyen bir sistemdir. Anonim, limited ve sermayesi paylara bölünmüş komandit şirketlerin KEP adresi edinmesi gerekir.'),
      `<p><strong>Kurucu Bilişim KEP Başvuru Ayrıcalığı</strong> ile işletmelerin KEP hesabı başvurularını, KVKK kapsamında gerekli bilgilerin güvenli şekilde temin edilmesi ve çipli T.C. Kimlik Kartı üzerinden NFC ile kimlik doğrulama ve e-Devlet onay süreçlerinin tamamen online tamamlanması sayesinde, herhangi bir fiziki işlem gerektirmeden dakikalar içerisinde kolay, hızlı ve güvenilir şekilde gerçekleştiriyoruz.</p>`,
      h2('Adım Adım KEP Adresi Alma'),
      olBold([
        ['Online başvuru', 'Başvuru formunu doldurun; gerekli bilgileri KVKK kapsamında güvenli şekilde online olarak alıyoruz.'],
        ['NFC ile kimlik doğrulama', 'Çipli T.C. Kimlik Kartınızı telefonunuza okutarak kimliğinizi doğrularsınız.'],
        ['e-Devlet onayı', 'Başvurunuzu e-Devlet üzerinden onaylarsınız; şubeye gitmenize gerek kalmaz.'],
        ['Dakikalar içinde aktif', 'KEP hesabınız dakikalar içinde açılır ve kullanıma hazır hâle gelir.'],
      ]),
      h2('Fiziki Evrak Gerekir mi?'),
      p('Hayır. Başvuru tamamen online ilerler; fiziki evrak getirmenize veya şubeye gitmenize gerek yoktur.'),
    ].join('\n'),
    faqs: [
      ['KEP adresi kimler için zorunludur?', 'Türk Ticaret Kanunu kapsamında anonim, limited ve sermayesi paylara bölünmüş komandit şirketlerin KEP adresi edinmesi gerekmektedir. Şahıs işletmeleri ve bireyler de isteğe bağlı olarak KEP adresi alabilir.'],
      ['KEP hesabı ne kadar sürede açılır?', 'NFC kimlik doğrulama ve e-Devlet onayı tamamlandığında KEP hesabınız herhangi bir fiziki işlem gerekmeden dakikalar içinde açılır.'],
    ],
  },
  {
    cat: 'e-fatura', slug: 'e-fatura-nasil-iptal-edilir', svc: 'e-fatura', updated: '2026-10-19',
    title: 'E-Fatura Nasıl İptal Edilir? İtiraz Süresi ve Adımlar',
    lead: 'Düzenlenmiş bir e-fatura tek taraflı silinemez; iptal ve itiraz, GİB’in ilgili portalı ve mevzuattaki yöntemlerle, karşı tarafın da sürece dahil olmasıyla yapılır.',
    html: [
      p('E-fatura sistemine gönderilen bir fatura, kâğıt fatura gibi yırtılıp atılamaz. Hatalı düzenlenen veya iptal edilmesi gereken e-faturalar için Gelir İdaresi Başkanlığı’nın (GİB) belirlediği yöntemler kullanılır.'),
      h2('E-Fatura İptali İçin Yöntemler'),
      ulBold([
        ['Ticari faturada ret', 'Ticari senaryoyla gönderilen bir faturayı alıcı, sistem üzerinden belirlenen süre içinde reddedebilir.'],
        ['GİB iptal / itiraz portalı', 'Temel senaryolu faturalar veya süresi geçen durumlar için GİB’in e-fatura iptal ve itiraz portalı üzerinden talep oluşturulabilir; karşı tarafın onayı gerekir.'],
        ['Diğer yasal yöntemler', 'Mevzuatta belirtilen KEP, noter veya taahhütlü posta gibi yöntemlerle itiraz edilebilir.'],
      ]),
      h2('Dikkat Edilmesi Gerekenler'),
      ul([
        'İtiraz ve iptal işlemleri yasal süreler içinde yapılmalıdır.',
        'İptal edilen faturanın muhasebe kayıtlarına da doğru şekilde yansıtılması gerekir.',
        'Siparişin iptal edilmesi, düzenlenmiş faturayı kendiliğinden ortadan kaldırmaz.',
      ]),
      note('İptal ve itiraz kuralları ile süreler mevzuata göre değişebilir. İşleminize özel durumu birlikte değerlendirmek için bize ulaşabilirsiniz.'),
    ].join('\n'),
  },
];

const all = [
  { cat: 'kep', slug: KEP_IK_SLUG, svc: 'kep-ik', updated: '2026-10-18', img: '/assets/img/blog/' + KEP_IK_SLUG + '.webp',
    title: kepPost.title.rendered, lead: kepPost.yoast_head_json.description, html: extLinks(kepPost.content.rendered) },
  ...articles.slice(0, 2),
  ...require('./kb-hizmetler'),
  ...articles.slice(2),
];
const visible = all.filter((a) => SHOW_DRAFTS || !a.taslak).map((a) => ({ ...a, path: `/bilgi-bankasi/${a.cat}/${a.slug}/` }));
const catPath = (c) => `/bilgi-bankasi/${c.slug}/`;

module.exports = { cats, articles: visible, catPath, SHOW_DRAFTS, KEP_IK_SLUG };
