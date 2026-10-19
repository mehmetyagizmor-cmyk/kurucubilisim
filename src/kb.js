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
  // Search Console (19 Ekim 2026): "e imza nasıl atılır / nasıl kullanılır" aramaları 60–90. sırada
  {
    cat: 'e-imza', slug: 'e-imza-nasil-atilir', svc: 'e-imza', updated: '2026-10-19',
    title: 'E-İmza Nasıl Atılır? Belge İmzalama Adım Adım',
    lead: 'E-imza atmak için kartınızı takıp imza uygulamasında belgeyi seçmeniz ve PIN’inizi girmeniz yeterlidir. Belge imzalama, imzalı dosyayı gönderme ve sık yapılan hataları anlattık.',
    html: [
      p('E-imzanız kurulduktan sonra bir belgeyi imzalamak yalnızca birkaç dakika sürer. Nitelikli elektronik imzayla imzaladığınız belge, 5070 sayılı Elektronik İmza Kanunu’na göre ıslak imzalı belgeyle aynı hukuki sonucu doğurur.'),
      p('Bu rehberde bilgisayarınızdaki bir belgeyi e-imzayla nasıl imzalayacağınızı anlattık. E-Devlet, UYAP, EKAP veya MERSİS gibi sistemlerde ise imzalama, ilgili sistemin kendi ekranından yapılır; adımların mantığı aynıdır.'),
      h2('E-İmza Atmadan Önce Kontrol Edin'),
      ul([
        'E-imza kartınız kart okuyucuya takılı ve kart okuyucu bilgisayara bağlı olmalı.',
        'Kart okuyucu sürücüsü ve imza uygulaması kurulu olmalı.',
        'E-imzanızın kullanım süresi dolmamış olmalı.',
        'E-imza PIN’inizi (şifrenizi) biliyor olmalısınız.',
      ]),
      `<p>Programlar henüz kurulu değilse önce <a href="/bilgi-bankasi/e-imza/e-imza-kurulumu-nasil-yapilir/">E-İmza Kurulumu Nasıl Yapılır?</a> rehberimize göz atın.</p>`,
      h2('Adım Adım E-İmza Nasıl Atılır?'),
      olBold([
        ['İmza uygulamasını açın', 'E-imzanızı aldığınız sertifika sağlayıcısının imza uygulamasını açın.'],
        ['İmzalanacak belgeyi seçin', 'Belgeyi uygulamaya sürükleyin veya “dosya seç” ile bilgisayarınızdan seçin. Word, PDF ve benzeri belgeler imzalanabilir.'],
        ['İmza türünü seçin', 'Uygulama size imza seçenekleri sunabilir. Karşı tarafın veya kurumun istediği biçimi seçin; emin değilseniz uygulamanın varsayılan ayarıyla devam edin.'],
        ['Sertifikanızı seçin', 'Kart okuyucunuzu ve listelenen sertifikanızı seçin.'],
        ['PIN’inizi girin', 'E-imza PIN’inizi girerek imzayı onaylayın.'],
        ['İmzalı dosyayı kaydedin', 'İmzalanan belge yeni bir dosya olarak kaydedilir. Uygulamaya göre bu dosya “.imz” uzantılı ya da imzalı PDF olabilir. Karşı tarafa bu imzalı dosyayı gönderin.'],
      ]),
      h2('İmzalı Belgeyi Nasıl Gönderirim?'),
      p('İmzalı dosyayı e-posta, KEP veya ilgili kurumun sistemi üzerinden gönderebilirsiniz. Hukuki delil niteliğinde gönderim yapmanız gerekiyorsa imzalı belgeyi KEP ile iletmeniz, gönderim ve teslim anının da kayıt altına alınmasını sağlar.'),
      `<p>KEP hakkında ayrıntılı bilgi için <a href="/bilgi-bankasi/kep/kep-rehberi/">KEP Rehberi</a>’ne bakabilirsiniz.</p>`,
      h2('E-İmza Atarken Sık Yapılan Hatalar'),
      ulBold([
        ['İmzalı dosya yerine orijinal dosyayı göndermek', 'Karşı tarafa mutlaka uygulamanın oluşturduğu imzalı dosyayı gönderin.'],
        ['İmzadan sonra belgeyi değiştirmek', 'İmzalanan belgede yapılan her değişiklik imzayı geçersiz kılar. Değişiklik gerekiyorsa belgeyi yeniden imzalayın.'],
        ['PIN’i art arda yanlış girmek', 'Üst üste hatalı girişte kart kilitlenir. Emin değilseniz deneme yapmayın.'],
        ['Süresi dolmuş e-imzayla imzalamak', 'Kullanım süresi dolan e-imzayla imza atılamaz; yenileme gerekir.'],
      ]),
      `<p>PIN kilitlendiyse <a href="/bilgi-bankasi/e-imza/e-imza-sifresi-pin-degistirme-ve-kilit-cozme/">E-İmza Şifresi (PIN) rehberimizi</a> inceleyin.</p>`,
      note('İmza uygulamalarının ekranları sertifika sağlayıcısına göre farklılık gösterebilir. Takıldığınız adımda uzaktan bağlanarak belgenizi birlikte imzalayabiliriz.'),
    ].join('\n'),
    faqs: [
      ['E-imza ile hangi belgeler imzalanabilir?', 'Word, PDF, Excel ve benzeri dijital belgelerin tamamı e-imzayla imzalanabilir. Kurumların kendi sistemlerinde ise imzalama ilgili ekrandan yapılır.'],
      ['E-imzalı belge ıslak imzalı belge kadar geçerli mi?', 'Evet. 5070 sayılı Elektronik İmza Kanunu’na göre güvenli (nitelikli) elektronik imza, elle atılan imzayla aynı hukuki sonucu doğurur. Kanunda istisna tutulan işlemler bunun dışındadır.'],
      ['E-imzayı telefondan atabilir miyim?', 'Kart ve kart okuyucuyla çalışan e-imza genellikle bilgisayarda kullanılır. Telefondan imza için mobil imza hizmeti gerekir.'],
      ['Bir belgeyi birden fazla kişi e-imzayla imzalayabilir mi?', 'Evet. İmza uygulamaları birden fazla imzaya izin verir; her imzacı belgeyi kendi e-imzasıyla sırayla imzalar.'],
    ],
  },
  // Search Console (19 Ekim 2026): "e imza aktivasyon", "e imza için gerekli programlar", "e imza uygulaması"
  {
    cat: 'e-imza', slug: 'e-imza-aktivasyonu-ve-gerekli-programlar', svc: 'e-imza', updated: '2026-10-19',
    title: 'E-İmza Aktivasyonu ve Gerekli Programlar: İlk Kullanım Rehberi',
    lead: 'E-imzanız elinize ulaştığında önce aktivasyonu tamamlanır, ardından kart okuyucu sürücüsü ve imza uygulaması kurulur. İlk kullanım için gereken her şeyi tek listede topladık.',
    html: [
      p('Yeni e-imzanız elinize ulaştı ama nereden başlayacağınızı bilmiyor musunuz? E-imzayı ilk kez kullanmadan önce sertifikanızın aktif hâle getirilmesi ve bilgisayarınıza birkaç programın kurulması gerekir.'),
      h2('E-İmza Aktivasyonu Nedir?'),
      p('Aktivasyon, sertifikanın size teslim edildiğinin onaylanması ve e-imzanın kullanıma açılmasıdır. Aktivasyonun nasıl yapılacağı sertifika sağlayıcısına göre değişir; çoğunlukla sağlayıcının internet sitesi, SMS veya teslimatla birlikte iletilen bilgilerle tamamlanır.'),
      h2('E-İmza Aktivasyonu Adımları'),
      olBold([
        ['Teslimatı kontrol edin', 'E-imza kartınızı, kart okuyucunuzu ve size iletilen şifre (PIN) bilgisini kontrol edin.'],
        ['Teslim onayını verin', 'Sertifika sağlayıcınızın size ilettiği yönteme (internet sitesi, SMS veya teslim formu) göre teslim onayını tamamlayın.'],
        ['PIN’inizi belirleyin veya değiştirin', 'Size iletilen ilk PIN’i, kendi belirleyeceğiniz ve kimseyle paylaşmayacağınız bir PIN ile değiştirmeniz önerilir.'],
        ['Programları kurun', 'Aşağıda listelenen programları kurarak e-imzanızı kullanıma hazır hâle getirin.'],
        ['Deneme yapın', 'Örnek bir belgeyi imzalayarak veya e-Devlet’e e-imzayla giriş yaparak her şeyin çalıştığını kontrol edin.'],
      ]),
      h2('E-İmza İçin Gerekli Programlar'),
      ulBold([
        ['Kart okuyucu sürücüsü', 'Bilgisayarınızın kart okuyucuyu tanıması için gereklidir. Sertifika sağlayıcınızın internet sitesinden, okuyucu modelinize ve işletim sisteminize uygun olanı indirilir.'],
        ['İmza uygulaması', 'Belgeleri imzalamanızı sağlayan programdır. Sertifika sağlayıcınız kendi imza uygulamasını sunar.'],
        ['Java (gerekirse)', 'Bazı imza araçları ve kurum sistemleri Java ile çalışır. Uygulama isterse güncel Java sürümü kurulur.'],
        ['Kurum sistemlerine özel araçlar', 'Bazı sistemler kendi imza aracını kullanır. Örneğin UYAP’ta belgeler UYAP Doküman Editörü ile hazırlanıp imzalanır; e-Devlet de e-imzayla girişte gereken uygulamayı kurmanız için sizi yönlendirir.'],
      ]),
      `<p>Programların kurulum adımları için <a href="/bilgi-bankasi/e-imza/e-imza-kurulumu-nasil-yapilir/">E-İmza Kurulumu Nasıl Yapılır?</a>, ilk imzanızı atmak için <a href="/bilgi-bankasi/e-imza/e-imza-nasil-atilir/">E-İmza Nasıl Atılır?</a> rehberlerimize göz atabilirsiniz.</p>`,
      h2('Aktivasyon Sonrası Sık Sorunlar'),
      ulBold([
        ['Sertifika görünmüyor', 'Kart okuyucu sürücüsü kurulu değilse veya kart doğru takılmamışsa sertifika listelenmez.'],
        ['PIN kabul edilmiyor', 'İlk PIN’in doğru girildiğinden emin olun; üst üste hatalı girişte kart kilitlenir.'],
        ['Kurum sistemi e-imzayı tanımıyor', 'Sistemin istediği imza aracının ve gerekiyorsa Java’nın kurulu olduğunu kontrol edin.'],
      ]),
      note('Aktivasyon ve kurulum adımları sertifika sağlayıcısına göre farklılık gösterebilir. Kurucu Bilişim olarak e-imzanızın aktivasyonu ve kurulumunda uzaktan bağlantıyla yanınızdayız.'),
    ].join('\n'),
    faqs: [
      ['E-imza aktivasyonu ne kadar sürer?', 'Teslim onayı ve programların kurulumu genellikle kısa sürede tamamlanır. Programlar kuruluysa ilk kullanıma birkaç dakika içinde hazır olursunuz.'],
      ['E-imza için hangi program gerekli?', 'Temel olarak kart okuyucu sürücüsü ve sertifika sağlayıcınızın imza uygulaması gerekir. Bazı sistemler ayrıca Java veya kendi imza aracını ister.'],
      ['E-imza uygulaması ücretli mi?', 'Sertifika sağlayıcılarının imza uygulamaları ve sürücüleri genellikle e-imzayla birlikte kullanıma sunulur. Kurulumu sizin için uzaktan yapıyoruz.'],
      ['E-imza başka bilgisayarda kullanılabilir mi?', 'Evet. Programları kurduğunuz her bilgisayarda kartınızı ve PIN’inizi kullanarak e-imza atabilirsiniz.'],
    ],
  },
  // Fiyat ve yenileme aramaları (satın almaya hazır ziyaretçi). Sitede rakam yok: "fiyat için teklif alın"
  {
    cat: 'e-imza', slug: 'e-imza-fiyati-neye-gore-degisir', svc: 'e-imza', updated: '2026-10-20',
    title: 'E-İmza Fiyatı Neye Göre Değişir? Ücreti Belirleyen 5 Etken',
    lead: 'E-imza ücreti; kullanım süresine, yeni başvuru ya da yenileme olmasına, kart okuyucu ihtiyacına ve teslimat şekline göre değişir. Doğru teklifi almak için bilmeniz gerekenleri anlattık.',
    html: [
      p('E-imza almaya karar verdiğinizde ilk sorulardan biri “E-imza ne kadar?” olur. E-imzanın tek bir sabit fiyatı yoktur; ücret, ihtiyacınıza göre seçtiğiniz pakete ve hizmet kapsamına bağlıdır. Bu rehberde e-imza ücretini belirleyen etkenleri ve size en uygun paketi nasıl seçeceğinizi anlattık.'),
      h2('E-İmza Ücretini Belirleyen 5 Etken'),
      h3('1. Kullanım Süresi (1, 2 veya 3 Yıl)'),
      p('E-imza sertifikaları belirli bir süre için geçerlidir. Uzun süreli paketler, her yıl yeniden yenileme yapma zahmetini ortadan kaldırır ve toplamda daha avantajlı olabilir. Ne kadar süre kullanacağınızı düşünerek seçim yapmanız önerilir.'),
      h3('2. Yeni Başvuru mu, Yenileme mi?'),
      p('İlk kez e-imza alıyorsanız yeni başvuru yapılır. Mevcut e-imzanızın süresi doluyorsa yenileme yapılır. Yenilemede durumunuza göre mevcut kartınız kullanılabilir veya yeni kart gerekebilir.'),
      h3('3. Kart Okuyucu İhtiyacı'),
      p('E-imza, kart ve bilgisayara takılan bir kart okuyucuyla kullanılır. Daha önceden uyumlu bir kart okuyucunuz varsa paket buna göre değişebilir.'),
      h3('4. Teslimat Şekli'),
      p('E-imzanız İstanbul içinde hızlı kuryeyle adresinize yönlendirilir; diğer illere aynı gün kargoya verilir ve ertesi gün teslimat seçeneği sunulur. Teslimat şekli toplam hizmet kapsamını etkileyebilir.'),
      h3('5. Kurulum ve Destek'),
      p('Kart okuyucu sürücüsünün ve imza uygulamasının kurulumu, ilk kullanımdaki en sık takılma noktasıdır. Kurucu Bilişim olarak kurulumu uzaktan bağlantıyla sizin yerinize yapıyoruz.'),
      h2('Bireysel ve Kurumsal E-İmza Fiyatları'),
      p('E-imza kişiye özeldir; şirket çalışanları için alınsa bile her kişi için ayrı e-imza düzenlenir. Birden fazla çalışanınız için e-imza ihtiyacınız varsa toplu başvuruları tek elden yönetebilir, size özel kurumsal teklif hazırlayabiliriz.'),
      h2('Size En Uygun Paketi Nasıl Seçersiniz?'),
      ulBold([
        ['Kısa süreli bir işlem için', 'Tek bir ihale, şirket kuruluşu veya geçici bir ihtiyaç için daha kısa süreli paket yeterli olabilir.'],
        ['Düzenli kullanım için', 'E-Devlet, UYAP, EKAP veya MERSİS işlemlerini sık yapıyorsanız uzun süreli paket yenileme zahmetini azaltır.'],
        ['Birden fazla çalışan için', 'Ekibiniz için toplu başvuruda kurumsal teklif alın.'],
      ]),
      `<p>E-imza başvuru adımları için <a href="/bilgi-bankasi/e-imza/e-imza-rehberi/">E-İmza Rehberi</a>’ne, süresi dolmak üzere olan e-imzalar için <a href="/bilgi-bankasi/e-imza/e-imza-yenileme-nasil-yapilir/">E-İmza Yenileme</a> rehberine göz atabilirsiniz.</p>`,
      note('Fiyatlar sertifika sağlayıcısına, seçilen pakete ve kampanyalara göre değişebilir. Güncel fiyat için bize ulaşın; ihtiyacınıza uygun paketi birlikte belirleyelim.'),
    ].join('\n'),
    faqs: [
      ['E-imza ne kadar?', 'E-imza ücreti seçtiğiniz kullanım süresine (1, 2 veya 3 yıl), yeni başvuru veya yenileme olmasına ve kart okuyucu ihtiyacınıza göre değişir. Güncel fiyat için formdan veya WhatsApp’tan teklif alabilirsiniz.'],
      ['E-imza yenileme yeni başvurudan daha mı uygun?', 'Bu, sertifika sağlayıcısına ve mevcut kartınızın kullanılıp kullanılamayacağına göre değişir. Yenileme tarihiniz yaklaşıyorsa durumunuzu birlikte değerlendirelim.'],
      ['E-imza ücretine kurulum dahil mi?', 'Kurucu Bilişim üzerinden aldığınız e-imzanın kurulumunda uzaktan bağlantıyla destek veriyoruz. Teklifimizde hizmet kapsamını açıkça belirtiyoruz.'],
      ['Kampanyalı e-imza paketleri var mı?', 'Dönemsel kampanyalarımızı Kampanyalar sayfamızda paylaşıyoruz. Güncel kampanyalar için bize ulaşabilirsiniz.'],
    ],
  },
  {
    cat: 'e-imza', slug: 'e-imza-yenileme-nasil-yapilir', svc: 'e-imza', updated: '2026-10-20',
    title: 'E-İmza Yenileme Nasıl Yapılır? Süresi Dolan E-İmza İçin Rehber',
    lead: 'E-imzanızın süresi dolmadan yenileme başvurusu yapmanız işlemlerinizin aksamamasını sağlar. Ne zaman yenilemeniz gerektiğini, süresi dolarsa ne olacağını ve yenileme adımlarını anlattık.',
    html: [
      p('E-imza sertifikaları seçtiğiniz pakete göre belirli bir süre geçerlidir. Süre dolduğunda e-imzayla imza atamaz, e-Devlet, UYAP, EKAP veya MERSİS gibi sistemlere e-imzayla giriş yapamazsınız. Bu nedenle yenilemeyi süre bitmeden yapmanız önemlidir.'),
      h2('E-İmzamın Süresi Ne Zaman Doluyor?'),
      p('E-imzanızın geçerlilik bitiş tarihini imza uygulamanızda sertifika bilgilerine bakarak görebilirsiniz. Sertifika sağlayıcıları da genellikle süre dolmadan önce e-posta veya SMS ile hatırlatma gönderir. Kurucu Bilişim üzerinden aldığınız e-imzaların yenileme tarihlerini de takip ediyoruz.'),
      h2('E-İmza Yenileme Adımları'),
      olBold([
        ['Bitiş tarihini kontrol edin', 'Sertifikanızın bitiş tarihini öğrenin ve yenilemeyi son günlere bırakmayın.'],
        ['Yenileme başvurusunu yapın', 'Formu doldurun veya WhatsApp’tan yazın; uygun kullanım süresini (1, 2 veya 3 yıl) birlikte seçelim.'],
        ['Kimlik doğrulama', 'Sertifika sağlayıcısının yenileme sürecine göre kimlik doğrulamanız yapılır.'],
        ['Yeni sertifikanın teslimi', 'Duruma göre yeni sertifika mevcut kartınıza yüklenir veya yeni kart gönderilir. Yeni kart gerekirse İstanbul içinde hızlı kuryeyle, diğer illere aynı gün kargoyla gönderilir.'],
        ['Kurulum ve deneme', 'Gerekirse kurulumu uzaktan yapıyor, yeni sertifikanızla deneme imzası atarak her şeyin çalıştığını kontrol ediyoruz.'],
      ]),
      h2('E-İmzamın Süresi Doldu, Ne Yapmalıyım?'),
      p('Süresi dolmuş bir e-imza yenilenemeyebilir; bu durumda yeni başvuru yapılması gerekir. Süreç yeni başvuruya benzer şekilde ilerler: başvuru, kimlik doğrulama, teslimat ve kurulum. Acil bir işleminiz varsa (ör. ihale, MERSİS işlemi veya dava süreci) hemen bize ulaşın; süreci hızlandırmak için birlikte planlayalım.'),
      h2('Yenilemede Dikkat Edilmesi Gerekenler'),
      ul([
        'Yenilemeyi önemli bir işlem tarihinin (ihale, şirket kuruluşu, beyanname) hemen öncesine bırakmayın.',
        'Yeni sertifika yüklendikten sonra kullandığınız sistemlerde girişin çalıştığını deneyin.',
        'PIN’inizi değiştirdiyseniz yeni PIN’i güvenli bir yerde saklayın.',
      ]),
      `<p>Fiyatı etkileyen etkenler için <a href="/bilgi-bankasi/e-imza/e-imza-fiyati-neye-gore-degisir/">E-İmza Fiyatı Neye Göre Değişir?</a> rehberimize göz atabilirsiniz.</p>`,
      note('Yenileme adımları sertifika sağlayıcısına ve kartınızın durumuna göre değişebilir. Yenileme başvurusunu, teslimatı ve kurulumu sizin için baştan sona yönetiyoruz.'),
    ].join('\n'),
    faqs: [
      ['E-imza yenileme ne zaman yapılmalı?', 'Sertifikanızın süresi dolmadan, tercihen birkaç hafta önce yenileme başvurusu yapmanız önerilir. Böylece işlemleriniz aksamaz.'],
      ['E-imza yenilemede kart değişir mi?', 'Duruma göre yeni sertifika mevcut kartınıza yüklenebilir veya yeni kart gerekebilir. Bu, sertifika sağlayıcısına ve kartınızın durumuna bağlıdır.'],
      ['Süresi dolmuş e-imza yenilenebilir mi?', 'Süresi dolmuş e-imzalar için genellikle yeni başvuru yapılması gerekir. Süreci sizin için hızlıca başlatabiliriz.'],
      ['E-imza yenileme ne kadar sürer?', 'Kimlik doğrulama tamamlandığında yeni sertifikanız hazırlanır; yeni kart gerekiyorsa İstanbul içinde hızlı kuryeyle, diğer illere aynı gün kargoyla gönderilir.'],
    ],
  },
  {
    cat: 'mali-muhur', slug: 'mali-muhur-ucreti-neye-gore-degisir', svc: 'mali-muhur', updated: '2026-10-20',
    title: 'Mali Mühür Ücreti Neye Göre Değişir? Paket Seçimi Rehberi',
    lead: 'Mali mühür ücreti; yeni başvuru ya da yenileme olmasına ve kurulum desteğine göre değişir. Doğru paketi seçmek için bilmeniz gerekenleri anlattık.',
    html: [
      p('E-fatura, e-arşiv fatura ve e-defter gibi uygulamalara geçen şirketlerin ihtiyaç duyduğu mali mühür, TÜBİTAK Kamu Sertifikasyon Merkezi tarafından üretilen elektronik sertifikadır. Mali mühür ücreti tek bir sabit tutar değildir; seçtiğiniz pakete ve hizmet kapsamına göre değişir.'),
      h2('Mali Mühür Ücretini Belirleyen Etkenler'),
      ulBold([
        ['Sertifika süresi', 'Mali mühür sertifikaları 3 yıl geçerlidir. Süre dolmadan yenileme yapılması gerekir.'],
        ['Yeni başvuru veya yenileme', 'İlk kez mali mühür alan şirketler yeni başvuru yapar; süresi dolmak üzere olan mali mühürler için yenileme yapılır.'],
        ['Kart okuyucu ihtiyacı', 'Mali mühür kart okuyucuyla kullanılır. Uyumlu bir okuyucunuz olup olmaması paketi etkileyebilir.'],
        ['Kurulum ve entegrasyon desteği', 'Mali mührün bilgisayarınıza ve kullandığınız e-fatura ya da muhasebe programına tanıtılması ayrı bir uzmanlık gerektirebilir.'],
      ]),
      h2('Mali Mühür ile E-İmza Arasındaki Fark Fiyatı Etkiler mi?'),
      p('E-imza gerçek kişiye, mali mühür ise tüzel kişiliğe (şirkete) aittir. İkisi farklı sertifikalardır ve ayrı ayrı ücretlendirilir. E-fatura ve e-defter işlemleri için şirketinizin mali mührüne, MERSİS veya e-Devlet gibi kişisel işlemler için ise yetkililerin e-imzasına ihtiyaç vardır.'),
      h2('Kurucu Bilişim ile Mali Mühür'),
      ul([
        'Başvuru dosyanızı hazırlıyor, onay sürecini sizin yerinize takip ediyoruz.',
        'Mali mührünüzü aynı gün, dakikalar içinde teslim ediyoruz.',
        'Kurulumunu ve PIN oluşturma adımlarını uzaktan bağlantıyla yapıyoruz.',
        'Yenileme tarihinizi takip ederek sizi önceden bilgilendiriyoruz.',
      ]),
      `<p>Başvuru adımları için <a href="/bilgi-bankasi/mali-muhur/mali-muhur-rehberi/">Mali Mühür Rehberi</a>’ne, yenileme için <a href="/bilgi-bankasi/mali-muhur/mali-muhur-yenileme-nasil-yapilir/">Mali Mühür Yenileme</a> rehberine göz atabilirsiniz.</p>`,
      note('Ücretler seçilen pakete ve güncel tarifelere göre değişebilir. Güncel fiyat için bize ulaşın; şirketinize uygun paketi birlikte belirleyelim.'),
    ].join('\n'),
    faqs: [
      ['Mali mühür ne kadar?', 'Mali mühür ücreti yeni başvuru veya yenileme olmasına ve kurulum ihtiyacınıza göre değişir. Güncel fiyat için formdan veya WhatsApp’tan teklif alabilirsiniz.'],
      ['Mali mühür her şirket için zorunlu mu?', 'E-fatura, e-arşiv fatura veya e-defter gibi e-dönüşüm uygulamalarını kendi adına kullanan şirketler için mali mühür gerekir. Hangi uygulamalara geçmeniz gerektiğini birlikte belirleyebiliriz.'],
      ['Mali mühür ücretine kurulum dahil mi?', 'Kurucu Bilişim üzerinden aldığınız mali mührün kurulumunda uzaktan bağlantıyla destek veriyoruz. Teklifimizde hizmet kapsamını açıkça belirtiyoruz.'],
    ],
  },
  {
    cat: 'mali-muhur', slug: 'mali-muhur-yenileme-nasil-yapilir', svc: 'mali-muhur', updated: '2026-10-20',
    title: 'Mali Mühür Yenileme Nasıl Yapılır? Süresi Dolmadan Yapılacaklar',
    lead: 'Mali mührün süresi dolarsa e-fatura, e-arşiv ve e-defter işlemleriniz aksayabilir. Yenilemeyi ne zaman yapmanız gerektiğini ve yenileme adımlarını anlattık.',
    html: [
      p('Mali mühür, şirketinizin e-fatura, e-arşiv fatura ve e-defter gibi uygulamalarda belgeleri imzalamak için kullandığı elektronik sertifikadır. Sertifikanın süresi dolduğunda bu belgeler imzalanamaz; fatura kesme ve defter berat işlemleri aksayabilir. Mali mühür sertifikaları 3 yıl geçerlidir; bu nedenle yenilemenin süre dolmadan yapılması önemlidir.'),
      h2('Mali Mührün Süresi Dolarsa Ne Olur?'),
      ul([
        'E-fatura ve e-arşiv faturalarınızı mali mühürle imzalayamazsınız.',
        'E-defter berat yükleme işlemleriniz aksayabilir.',
        'Yeni sertifika gelene kadar e-dönüşüm işlemlerinizde gecikme yaşanabilir.',
      ]),
      h2('Mali Mühür Yenileme Adımları'),
      olBold([
        ['Bitiş tarihini kontrol edin', 'Mali mühür sertifikanızın bitiş tarihini kontrol edin; yenilemeyi son günlere bırakmayın.'],
        ['Yenileme başvurusu', 'Şirket ve yetkili bilgilerinizle yenileme başvurusunu yapıyoruz; başvuru dosyanızı sizin yerinize hazırlıyoruz.'],
        ['Onay sürecinin takibi', 'Başvurunun onay sürecini sizin yerinize takip ediyoruz.'],
        ['Teslim ve kurulum', 'Yeni mali mührünüzü aynı gün, dakikalar içinde teslim ediyor; kurulumunu ve PIN oluşturma adımlarını uzaktan yapıyoruz.'],
        ['Programlara tanıtma', 'Yeni sertifikanın kullandığınız e-fatura ve muhasebe programında doğru çalıştığını kontrol ediyoruz.'],
      ]),
      `<p>PIN oluşturma adımları için <a href="/bilgi-bankasi/mali-muhur/mali-muhur-pin-sifresi-nasil-olusturulur/">Mali Mühür PIN Nasıl Oluşturulur?</a>, ücreti etkileyen etkenler için <a href="/bilgi-bankasi/mali-muhur/mali-muhur-ucreti-neye-gore-degisir/">Mali Mühür Ücreti Neye Göre Değişir?</a> rehberlerimize göz atabilirsiniz.</p>`,
      note('Yenileme süreci ve gerekli bilgiler güncel düzenlemelere göre değişebilir. Yenileme tarihinizi takip ediyor, süreci baştan sona sizin için yönetiyoruz.'),
    ].join('\n'),
    faqs: [
      ['Mali mühür ne zaman yenilenmeli?', 'Sertifikanın süresi dolmadan, tercihen birkaç hafta önce yenileme başvurusu yapılması önerilir. Böylece e-fatura ve e-defter işlemleriniz aksamaz.'],
      ['Mali mühür yenilemede yeni kart gerekir mi?', 'Bu, yenileme sürecine ve mevcut kartınızın durumuna göre değişir. Başvuru sırasında sizi bilgilendiriyoruz.'],
      ['Süresi dolan mali mühürle fatura kesilebilir mi?', 'Hayır. Süresi dolan mali mühürle belgeler imzalanamaz. Yenileme tamamlandığında işlemlerinize kaldığınız yerden devam edebilirsiniz.'],
    ],
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
    title: kepPost.title.rendered, lead: kepPost.yoast_head_json.description, info: true,
    // Yazı içindeki buton satırları ve girişteki teklif cümlesi çıkarılır; tek teklif kutusu sayfa sonunda (patron isteği)
    html: extLinks(kepPost.content.rendered)
      .replace(/<p><a class="btn[\s\S]*?<\/p>\n?/g, '')
      .replace(/<p>Kurucu Bilişim ile KEP İK ve e-bordro süreçlerinizi dijitalleştirin;[^<]*<\/p>\n?/, '') },
  ...articles.slice(0, 2),
  ...require('./kb-hizmetler'),
  ...articles.slice(2),
];
// Nasıl yapılır yazıları: başa kısa cevap (öne çıkan snippet için) ve ek SSS
const KISACA = {
  'e-imza-kurulumu-nasil-yapilir': 'E-imza kurulumu için önce kart okuyucu sürücüsünü kurun, ardından sertifika sağlayıcınızın imza uygulamasını (gerekirse Java ile birlikte) yükleyin, kartınızı takıp PIN’inizle sertifikanızı kontrol edin ve deneme imzası atın.',
  'e-imza-sifresi-pin-degistirme-ve-kilit-cozme': 'E-imza PIN’i, sağlayıcınızın imza veya kart yönetim uygulamasındaki “PIN Değiştir” bölümünden değiştirilir. Kart kilitlenirse PUK kodu ile kilit açılır; PUK yoksa sertifika sağlayıcısının süreci izlenir.',
  'e-devlete-e-imza-ile-giris-nasil-yapilir': 'Kart okuyucuyu takın, giris.turkiye.gov.tr adresinde “Elektronik İmza” yöntemini seçin, istenen imza uygulamasını kurun, sertifikanızı seçip PIN’inizi girerek giriş yapın.',
  'mali-muhur-pin-sifresi-nasil-olusturulur': 'Mali mühür PIN’i, kart okuyucu sürücüsü kurulduktan sonra sertifika sağlayıcısının yönlendirdiği ekran veya uygulamadan belirlenir; ardından mali mühür e-fatura, e-arşiv veya e-defter programınızda tanımlanır.',
  'kep-adresi-nasil-alinir': 'KEP adresi online başvuruyla alınır: başvuru formunu doldurursunuz, çipli kimlik kartınızla NFC üzerinden kimliğinizi doğrular ve e-Devlet’ten onay verirsiniz; fiziki evrak gerekmez.',
  'e-fatura-nasil-iptal-edilir': 'E-fatura tek taraflı silinemez. Ticari senaryolu fatura alıcı tarafından süresi içinde sistem üzerinden reddedilebilir; diğer durumlarda GİB’in iptal/itiraz portalı veya KEP, noter gibi yasal yollar kullanılır.',
};
const EXTRA_FAQ = {
  'e-imza-kurulumu-nasil-yapilir': [
    ['E-imza kurulumu için hangi programlar gerekir?', 'Kart okuyucu sürücüsü, sertifika sağlayıcınızın imza uygulaması ve bazı imza araçları için Java gerekir. Kullanacağınız sistem (UYAP, EKAP, MERSİS gibi) ayrıca kendi imza aracını isteyebilir.'],
    ['E-imza kurulumunu uzaktan yaptırabilir miyim?', 'Evet. Kurucu Bilişim olarak e-imza kurulumunu uzaktan bağlantıyla sizin yerinize yapıyoruz.'],
  ],
  'e-imza-sifresi-pin-degistirme-ve-kilit-cozme': [
    ['PUK kodu nedir?', 'PUK, PIN üst üste hatalı girildiğinde kilitlenen kartın kilidini açmak için kullanılan koddur. Kartla birlikte size iletilir.'],
    ['Kilitlenen e-imza için yeni sertifika gerekir mi?', 'Her zaman gerekmez. PUK ile kilit açılabilir; PUK da kilitlendiyse sertifika sağlayıcısının sürecine göre yeni sertifika gerekebilir.'],
  ],
  'e-devlete-e-imza-ile-giris-nasil-yapilir': [
    ['E-Devlet e-imza ile girişte hangi uygulama gerekir?', 'Giriş sayfası, “Elektronik İmza” seçildiğinde gereken imza uygulamasına yönlendirir. Ayrıca kart okuyucu sürücüsünün kurulu olması gerekir.'],
    ['Süresi dolmuş e-imza ile e-Devlet’e girilir mi?', 'Hayır. Süresi dolan e-imzayla giriş yapılamaz; e-imzanızın yenilenmesi gerekir.'],
    ['E-Devlet’e e-imza ile giriş yapamıyorum, ne yapmalıyım?', 'Kart okuyucu sürücüsünü, kartın doğru takıldığını ve sertifikanızın süresini kontrol edin. Sorun devam ederse uzaktan bağlantıyla destek veriyoruz.'],
  ],
  'mali-muhur-pin-sifresi-nasil-olusturulur': [
    ['Mali mühür PIN’i nereden belirlenir?', 'Sertifika sağlayıcısının yönlendirdiği ekrandan veya uygulamadan belirlenir. Teslim sırasında size iletilen bilgileri hazır tutmanız gerekir.'],
    ['Mali mühür PIN’imi unuttum, ne yapmalıyım?', 'Deneme yaparak mali mührü kilitlemeyin. Kilit çözme ve yeni PIN belirleme sertifika sağlayıcısının belirlediği adımlarla yapılır; bu süreçte destek veriyoruz.'],
    ['Mali mühür hangi programlarda tanımlanır?', 'Şirketinizin e-fatura, e-arşiv ve e-defter için kullandığı programlarda tanımlanır.'],
  ],
  'kep-adresi-nasil-alinir': [
    ['KEP başvurusu için şubeye gitmem gerekir mi?', 'Hayır. Kimlik doğrulama NFC ile, onay e-Devlet üzerinden yapılır; şubeye gitmenize gerek yoktur.'],
  ],
  'e-fatura-nasil-iptal-edilir': [
    ['E-fatura kaç gün içinde reddedilebilir?', 'Ticari senaryoyla gönderilen e-fatura, alıcı tarafından 8 gün içinde sistem üzerinden reddedilebilir. Temel senaryoda sistem üzerinden ret yoktur.'],
    ['Süresi geçen e-fatura nasıl iptal edilir?', 'GİB’in e-fatura iptal/itiraz portalı üzerinden talep oluşturulabilir veya KEP, noter, taahhütlü posta gibi yasal yollarla itiraz edilebilir.'],
    ['E-fatura iptal edilince muhasebede ne yapılır?', 'İptal edilen faturanın muhasebe kayıtlarına da doğru şekilde yansıtılması gerekir; bunu mali müşavirinizle birlikte yapmanızı öneririz.'],
  ],
};
const visible = all.filter((a) => SHOW_DRAFTS || !a.taslak).map((a) => ({
  ...a,
  ...(KISACA[a.slug] && {
    updated: '2026-10-20',
    html: `<p><strong>Kısaca:</strong> ${esc(KISACA[a.slug])}</p>\n${a.html}`,
    faqs: [...(a.faqs || []), ...(EXTRA_FAQ[a.slug] || [])],
  }),
  path: `/bilgi-bankasi/${a.cat}/${a.slug}/`,
}));
const catPath = (c) => `/bilgi-bankasi/${c.slug}/`;

module.exports = { cats, articles: visible, catPath, SHOW_DRAFTS, KEP_IK_SLUG };
