// Kurucu Bilişim — site verileri (tek kaynak).
// Telefon, adres, istatistik gibi bilgiler değişirse yalnızca bu dosyayı güncelleyip `node build.js` çalıştırın.

const site = {
  name: 'Kurucu Bilişim',
  legalName: 'Kurucu Bilişim',
  url: 'https://kurucubilisim.com',
  slogan: "A'dan Z'ye Dijital Dönüşüm ve Kurumsal Çözümler",
  phone: '+905535599231',
  phoneDisplay: '0 (553) 559 92 31',
  whatsapp: '905535599231',
  email: 'info@kurucubilisim.com',
  address: {
    street: 'Fulya Mah. Büyükdere Cad. Quasar İstanbul No:76 Kat:13 D.No:188',
    district: 'Şişli',
    city: 'İstanbul',
    postalCode: '34394',
    country: 'TR',
  },
  // Çalışma saatleri: sitede gösterilen metin + schema (Google) için gün/saat aralıkları.
  hours: [
    { label: 'Hafta içi', text: '09.00 – 18.00', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
    { label: 'Cumartesi', text: '09.00 – 15.00', days: ['Saturday'], opens: '09:00', closes: '15:00' },
  ],
  geo: { lat: 41.0661785, lng: 29.0005368 },
  mapsUrl: 'https://maps.app.goo.gl/1dNckFFdphMoCdWL7',
  mapsEmbed: 'https://www.google.com/maps?q=Kurucu+Bili%C5%9Fim,+Quasar+%C4%B0stanbul,+%C5%9Ei%C5%9Fli&ll=41.0661785,29.0005368&z=16&output=embed',
  social: {
    instagram: 'https://www.instagram.com/kurucubilisim/',
    linkedin: 'https://www.linkedin.com/in/kurucu-bili%C5%9Fim-6a2a68354/',
    youtube: 'https://www.youtube.com/channel/UChbJssVpN3j1yxPkeeS4THA',
  },
  gtm: 'GTM-W6DX9WVP',
  // Form gönderimleri bu PHP dosyasına gider (server/form.php → kök dizine kopyalanır).
  formEndpoint: '/form.php',
  stats: [
    { value: 10, suffix: '+', label: 'Yıllık Tecrübe' },
    { value: 7, suffix: '/24', label: 'Destek' },
  ],
  // Banka bilgileri canlı sitede boş görünüyordu. Doldurulana kadar sayfa iletişim yönlendirmesi gösterir.
  banks: [
    // { bank: 'Banka Adı', holder: 'Hesap Sahibi', iban: 'TR00 0000 0000 0000 0000 0000 00', branch: 'Şube' },
  ],
};

const groups = {
  'e-donusum-hizmetleri': {
    name: 'E-Dönüşüm Hizmetleri',
    title: 'E-Dönüşüm Hizmetleri: E-Fatura, E-İmza, Mali Mühür, KEP',
    desc: 'E-fatura, e-arşiv, e-irsaliye, e-defter, e-SMM, e-imza, mali mühür, KEP ve e-dönüşüm entegrasyonu hizmetlerini tek noktadan, mevzuata tam uyumlu alın.',
    h1: 'E-Dönüşüm Hizmetleri',
    lead: 'Gelir İdaresi Başkanlığı ve ilgili mevzuatla uyumlu e-dönüşüm süreçlerinizi başvurudan kuruluma, saklamadan desteğe kadar uçtan uca yönetiyoruz.',
  },
  'dijital-hizmetler': {
    name: 'Dijital Hizmetler',
    title: 'Dijital Hizmetler | Web Tasarım, E-Ticaret, ERP ve CRM',
    desc: 'Web tasarım, e-ticaret, kurumsal kimlik, ERP, CRM ve sosyal medya yönetimiyle markanızı dijitalde büyütün. Ücretsiz keşif görüşmesi için ulaşın.',
    h1: 'Dijital Hizmetler',
    lead: 'Markanızın dijital vitrinini kuruyor, satış ve operasyon süreçlerinizi doğru yazılımlarla ölçeklenebilir hale getiriyoruz.',
  },
};

// icon anahtarları lib.js içindeki `P` sözlüğüne karşılık gelir.
const services = [
  // ========== 1. E-DÖNÜŞÜM HİZMETLERİ (E-BELGELER SIRALAMASI) ==========
  {
    group: 'e-donusum-hizmetleri', category: 'belge', slug: 'e-fatura', icon: 'doc',
    name: 'E-Fatura', short: 'E-Fatura',
    title: 'E-Fatura Başvurusu Nasıl Yapılır? Geçiş Desteği | Kurucu Bilişim',
    desc: 'E-fatura başvurusu nasıl yapılır, kimler geçmek zorunda? GİB başvurusu, mali mühür, muhasebe ve ERP entegrasyonu tek elden. Fiyat için teklif alın.',
    h1: 'E-Fatura Başvurusu ve Entegrasyon Çözümleri',
    lead: 'Faturalarınızı saniyeler içinde kesin, alıcılarına anında iletin. Kağıt, baskı ve kargo masraflarını sıfırlayarak tahsilat süreçlerinizi hızlandırın.',
    intro: [
      'E-fatura; faturaların elektronik ortamda düzenlenmesini, Gelir İdaresi Başkanlığı (GİB) üzerinden güvenle iletilmesini ve dijital olarak saklanmasını sağlayan yasal bir çözümdür. Matbu faturaların kaybolma, gecikme ve yüksek kargo maliyeti risklerini ortadan kaldırır.',
      'Kurucu Bilişim olarak mali mühür veya e-imza temininden GİB portal başvurularına, kullandığınız ön muhasebe/ERP yazılımı entegrasyonundan personel eğitimine kadar tüm süreci anahtar teslim yönetiyoruz.',
    ],
    highlights: [
      ['Anında İletim', 'Faturalarınız saniyeler içinde GİB ve alıcı sistemine güvenle ulaşır.'],
      ['Maliyet Tasarrufu', 'Kağıt, zarf ve kargo harcamalarına kalıcı olarak veda edin.'],
      ['Tam Entegrasyon', 'Kullandığınız muhasebe veya ERP yazılımıyla otomatik çift yönlü veri akışı.'],
    ],
    features: ['GİB onaylı e-fatura altyapısı', 'Hızlı başvuru ve aktivasyon', 'Muhasebe & ERP entegrasyonu', 'Gelen ve giden fatura takibi', 'Toplu fatura gönderme & alma', '10 yıl yasal bulut arşiv', 'Mobil uygulama desteği', 'Kullanıcı eğitimi', '7/24 kesintisiz teknik destek'],
    faqs: [
      ['E-fatura başvurusu nasıl yapılır?', 'Önce mali mühür veya e-imza temin edilir, ardından GİB’e e-fatura başvurusu yapılır ve kullandığınız programla entegrasyon kurulur. Bu adımların hepsini sizin için yapıyoruz.'],
      ['E-fatura fiyatları ne kadar?', 'Ücret, kullanacağınız fatura adedine (kontör) ve ihtiyaç duyduğunuz entegrasyona göre değişir. Güncel fiyat için formdan veya WhatsApp’tan hemen teklif alabilirsiniz.'],
      ['E-faturaya kimler geçmek zorundadır?', 'GİB tarafından belirlenen yıllık ciro limitlerini aşan firmalar, e-ticaret satıcıları, gayrimenkul ve motorlu taşıt ticareti yapanlar ve belirli sektörlerdeki mükellefler için e-fatura zorunludur.'],
      ['E-faturaya geçiş süreci ne kadar sürer?', 'Mali mührünüz veya e-imzanız hazır olduğunda başvurunuz ve sistem kurulumunuz genellikle 1-2 iş günü içinde tamamlanır.'],
      ['Mevcut muhasebe programımla uyumlu mu?', 'Evet. Zirve, Logo, Mikro, Netsis, Paraşüt, Luca ve tüm popüler muhasebe yazılımlarıyla tam entegre çalışır.'],
    ],
    blog: /e-fatura|e-belge/,
  },
  {
    group: 'e-donusum-hizmetleri', category: 'belge', slug: 'e-arsiv-fatura', icon: 'archive',
    name: 'E-Arşiv Fatura', short: 'E-Arşiv Fatura',
    title: 'E-Arşiv Fatura Çözümleri ve Başvuru | Kurucu Bilişim',
    desc: 'E-fatura mükellefi olmayan kurumlara ve nihai tüketicilere e-posta veya SMS ile anında e-arşiv fatura düzenleyin. Hızlı, yasal ve güvenli.',
    h1: 'E-Arşiv Fatura Düzenleme ve Arşivleme Çözümleri',
    lead: 'E-fatura kullanıcısı olmayan firmalara ve son tüketicilere dijital fatura kesin. E-posta veya SMS ile anında iletin, 10 yıl güvenle saklayın.',
    intro: [
      'E-arşiv fatura, e-fatura sistemine kayıtlı olmayan kurumlara ve nihai tüketicilere elektronik ortamda düzenlenen faturadır. İkinci nüshası dijitalde saklanır; alıcıya ise e-posta, SMS linki veya kağıt çıktı olarak teslim edilir.',
      'GİB interaktif portalındaki limitlere takılmadan, kendi logonuz ve kurumsal şablonunuzla sınırsız e-arşiv fatura düzenleyebilir, e-ticaret siparişlerinizi otomatik faturalandırabilirsiniz.',
    ],
    highlights: [
      ['E-Posta & SMS İletimi', 'Müşterilerinize faturalarını dijital kanallarla anında ulaştırın.'],
      ['Portal Limitlerine Takılmayın', 'GİB portalı ile uğraşmadan tek tıkla e-arşiv faturanızı oluşturun.'],
      ['Güvenli Dijital Arşiv', 'Tüm geçmiş faturalara müşteri ve tarih bazlı saniyeler içinde erişin.'],
    ],
    features: ['GİB mevzuatına %100 uyum', 'E-posta ve SMS ile anında fatura paylaşımı', 'Toplu fatura kesim özelliği', 'E-ticaret ve pazaryeri sipariş entegrasyonu', 'İptal ve iade süreçleri yönetimi', 'Mobil uyumlu kullanım', 'Zaman damgalı arşivleme', 'Muhasebe yazılımı entegrasyonu', 'Özel kurumsal fatura şablonu'],
    faqs: [
      ['E-fatura ile e-arşiv fatura arasındaki fark nedir?', 'E-fatura, iki e-fatura mükellefi arasında GİB posta kutuları üzerinden iletilir. E-arşiv fatura ise e-faturaya dahil olmayan kişi ve firmalara düzenlenir.'],
      ['E-arşiv faturanın çıktısı geçerli midir?', 'Evet. Üzerinde barkod veya karekod bulunan e-arşiv fatura çıktısı mali açıdan ıslak imzalı orijinal fatura ile tamamen aynı geçerliliğe sahiptir.'],
      ['E-ticaret siteleri için e-arşiv zorunlu mu?', 'Evet. İnternet üzerinden mal ve hizmet satışı gerçekleştiren mükellefler için e-arşiv fatura düzenleme zorunluluğu bulunmaktadır.'],
    ],
    blog: /e-fatura|e-belge/,
  },
  {
    group: 'e-donusum-hizmetleri', category: 'belge', slug: 'e-irsaliye', icon: 'truck',
    name: 'E-İrsaliye', short: 'E-İrsaliye',
    title: 'E-İrsaliye Geçişi ve Sevkiyat Yönetimi | Kurucu Bilişim',
    desc: 'Mal sevkiyatlarınızı dijitalleştirin. Kağıt irsaliye basmadan, karekodlu ve zaman damgalı e-irsaliye düzenleyin. GİB uyumlu kolay geçiş.',
    h1: 'E-İrsaliye ile Dijital ve Güvenli Sevkiyat',
    lead: 'Mal hareketlerinizi dijital ortamda başlatın ve takip edin. Kağıt irsaliye taşıma zorunluluğunu ortadan kaldıran GİB uyumlu e-irsaliye çözümü.',
    intro: [
      'E-irsaliye; mal sevkiyatı sırasında düzenlenen sevk irsaliyesinin elektronik ortamda oluşturulması, GİB üzerinden alıcıya iletilmesi ve yanıtlanması sürecidir. Sevkiyat anında araçta matbu irsaliye koçanı taşıma zorunluluğunu sona erdirir.',
      'Yol denetimlerinde karekod ile saniyeler içinde sorgulanan e-irsaliye altyapımız; depo, lojistik ve satış departmanlarınızla tam entegre çalışarak teslimat ve kabul süreçlerinizi şeffaflaştırır.',
    ],
    highlights: [
      ['Karekodlu Kolay Denetim', 'Yol denetimlerinde karekod okutarak hızlı ve sorunsuz kontrol.'],
      ['Anlık Mal Kabul Takibi', 'Kabul, ret ve kısmi kabul yanıtlarını sistem üzerinden anlık izleyin.'],
      ['Koçan Masraflarına Son', 'Ciltlerce matbu irsaliye basımından ve evrak kaybolma riskinden kurtulun.'],
    ],
    features: ['Karekodlu (QR) irsaliye oluşturma', 'Mal kabul ve ret yanıtları yönetimi', 'Kısmi kabul desteği', 'Mobil cihazlardan irsaliye görüntüleme', 'Depo ve lojistik yazılım entegrasyonu', 'GİB sistemine anlık bildirim', '10 yıl geriye dönük arama & arşiv', 'Toplu irsaliye kesme', 'Uzman teknik destek'],
    faqs: [
      ['E-irsaliye araçta nasıl taşınır?', 'Sevkiyat sırasında matbu kağıt şart değildir; e-irsaliyenin karekodunun veya belgenin mobil cihazdan ya da çıktısının gösterilmesi yeterlidir.'],
      ['E-irsaliyeye kimler geçmek zorundadır?', 'Belirli ciro limitini aşan mükellefler, demir-çelik, gübre, madeni yağ, ÖTV kapsamındaki ürünleri üreten ve satan firmalar için zorunludur.'],
      ['Alıcı e-irsaliye mükellefi değilse ne yapılır?', 'Alıcı e-irsaliye mükellefi olmasa dahi GİB sanal alıcısı üzerinden e-irsaliye düzenlenebilir ve kağıt çıktısıyla sevkiyat gerçekleştirilir.'],
    ],
    blog: /e-belge|e-fatura/,
  },
  {
    group: 'e-donusum-hizmetleri', category: 'belge', slug: 'e-defter', icon: 'book',
    name: 'E-Defter ve E-Defter Saklama', short: 'E-Defter & Saklama',
    title: 'E-Defter ve E-Defter Saklama Hizmeti | Kurucu Bilişim',
    desc: 'E-defter oluşturma, beratlama, GİB’e gönderim ve 10 yıl güvenli e-defter saklama hizmeti. Muhasebe yazılımınızla tam entegre.',
    h1: 'E-Defter ve E-Defter Saklama Hizmeti',
    lead: 'Defteriniz dijitalde, geleceğiniz güvende. E-defter oluşturma, onaylama ve saklama süreçlerinizi GİB standartlarına tam uyumlu şekilde yönetiyoruz.',
    intro: [
      'Gelir İdaresi Başkanlığı’nın teknik ve yasal standartlarına uyumlu çözümlerimizle yevmiye ve kebir defterlerinizi gönül rahatlığıyla oluşturur ve beratlarını alırsınız. Tüm e-defter ve beratlar zaman damgasıyla korunur; yasal geçerliliğini korur.',
      'Defter ve beratlarınızı güvenli bulut sunucularda 10 yıl boyunca saklıyor, GİB ikincil kopya yükleme süreçlerini otomatikleştiriyoruz. Mevcut muhasebe yazılımınızla entegre altyapımız sayesinde dijital geçiş ek iş yükü oluşturmaz.',
    ],
    highlights: [
      ['Zaman Damgalı E-Defter', 'Yasal geçerlilik ve defter değişmezliği güvence altında.'],
      ['10 Yıl Güvenli Saklama', 'Yedekli bulut sunucularda denetimlere her zaman hazır arşiv.'],
      ['Yazılım Entegrasyonu', 'GİB onaylı altyapı, mevcut muhasebe sisteminizle tam uyumlu.'],
    ],
    features: ['GİB uyumlu e-defter', 'Berat oluşturma ve gönderim', 'Zaman damgası entegrasyonu', '10 yıl güvenli bulut saklama', 'Muhasebe yazılımı entegrasyonu', 'Yedekli sunucu altyapısı', 'Aylık süreç takibi', 'Denetimlere hazır arşiv', 'Teknik ve mevzuat desteği'],
    faqs: [
      ['E-defterler ne kadar süre saklanmalıdır?', 'Ticari defter ve belgelerin yasal mevzuat gereği 10 yıl süreyle saklanması gerekir. E-defter saklama hizmetimiz bu süre boyunca güvenli erişim sağlar.'],
      ['E-defter saklama hizmeti neden gerekli?', 'Donanım arızası, siber saldırı veya veri kaybı durumlarında defterlerinizin yedekli ve güvenli ortamda korunması, olası denetimlerde ağır ceza risklerini ortadan kaldırır.'],
      ['Mevcut muhasebe programımla uyumlu mu?', 'Evet. Zirve, Logo, Mikro, Netsis, Luca ve tüm ERP sistemleriyle uyumlu çalışır; ek iş yükü oluşturmaz.'],
    ],
    blog: /e-defter/,
  },
  {
    group: 'e-donusum-hizmetleri', category: 'belge', slug: 'e-smm', icon: 'briefcase',
    name: 'E-SMM (Elektronik Serbest Meslek Makbuzu)', short: 'E-SMM',
    title: 'E-SMM (Elektronik Serbest Meslek Makbuzu) | Kurucu Bilişim',
    desc: 'Avukat, doktor, mali müşavir, mühendis ve mimarlar için pratik e-SMM. Makbuzlarınızı dijitalde kesin, stopaj ve KDV’yi otomatik hesaplayın.',
    h1: 'Elektronik Serbest Meslek Makbuzu (E-SMM)',
    lead: 'Serbest meslek erbapları için pratik, hızlı ve GİB uyumlu e-makbuz çözümü. Stopaj ve KDV kesintilerini tek tıkla hesaplayın, müşterinize anında iletin.',
    intro: [
      'E-SMM; serbest meslek erbaplarının (avukatlar, mali müşavirler, doktorlar, mühendisler, mimarlar, danışmanlar) düzenlediği serbest meslek makbuzunun elektronik ortamda düzenlenmesini, iletilmesini ve saklanmasını sağlar.',
      'Stopaj, KDV, tevkifat kesintilerini otomatik hesaplayan kullanıcı dostu arayüzümüz ile cep telefonunuzdan veya bilgisayarınızdan saniyeler içinde makbuz kesip e-posta ile müşterinize ulaştırabilirsiniz.',
    ],
    highlights: [
      ['Otomatik Vergi Hesaplama', 'Stopaj, KDV ve tevkifat oranlarını hatasız ve otomatik hesaplayın.'],
      ['Mobil ve Webden Kesim', 'Ofiste veya adliyede; cep telefonunuzdan saniyeler içinde makbuz düzenleyin.'],
      ['Anında Dijital Paylaşım', 'Müşterinize e-posta veya WhatsApp üzerinden PDF olarak hemen gönderin.'],
    ],
    features: ['GİB standartlarına tam uyum', 'Serbest meslek erbabına özel sade arayüz', 'Stopaj ve KDV otomatik hesaplama', 'E-imza ile anında imzalama', 'Cari ve müşteri rehberi', 'Geçmiş makbuzlara anlık erişim', 'Mobil uyumlu kullanım', 'Toplu makbuz düzenleme', 'Hızlı başvuru ve aktivasyon'],
    faqs: [
      ['E-SMM kimler için zorunludur?', 'Faaliyetine devam eden avukatlar, mali müşavirler, doktorlar, diş hekimleri, mimarlar, mühendisler ve serbest meslek erbabı olan tüm mükellefler için zorunludur.'],
      ['E-SMM kesmek için ne gereklidir?', 'Şahıs işletmesi adına alınmış geçerli bir e-imza veya mali mühür yeterlidir. Başvuru ve kurulumu sizin adınıza tamamlıyoruz.'],
      ['Makbuz alıcıya nasıl ulaştırılır?', 'Düzenlenen e-SMM doğrudan alıcının e-posta adresine gönderilir veya çıktısı alınarak verilebilir.'],
    ],
    blog: /e-belge|e-imza/,
  },
  {
    group: 'e-donusum-hizmetleri', category: 'belge', slug: 'e-mustahsil-makbuzu', icon: 'leaf',
    name: 'E-Müstahsil Makbuzu', short: 'E-Müstahsil',
    title: 'E-Müstahsil Makbuzu Çözümleri | Kurucu Bilişim',
    desc: 'Çiftçi ve üreticilerden alınan tarımsal ürünler için e-müstahsil makbuzunuzu dijitalde düzenleyin. GİB uyumlu, hızlı ve güvenli tarımsal alım belgesi.',
    h1: 'E-Müstahsil Makbuzu ile Dijital Tarımsal Alım',
    lead: 'Gerçek usulde vergiye tabi olmayan çiftçilerden aldığınız ürünler için makbuzlarınızı dijitalde düzenleyin; stopaj ve SGK kesintilerini hatasız yönetin.',
    intro: [
      'E-Müstahsil Makbuzu; tarımsal ürün alımı yapan tüccar, sanayici veya işletmelerin, gerçek usulde vergiye tabi olmayan çiftçi ve üreticilerden yaptıkları alımlar için düzenledikleri belgenin elektronik versiyonudur.',
      'Tarlada, serada veya alım kantarında cep telefonundan ya da tabletten kolayca makbuz düzenleyebilir; borsa tescil, gelir vergisi stopajı ve Bağ-Kur prim kesintilerini hatasız şekilde hesaplayabilirsiniz.',
    ],
    highlights: [
      ['Hatasız Kesinti Hesabı', 'Gelir vergisi stopajı, borsa tescil ve SGK prim kesintilerini otomatik hesaplar.'],
      ['Sahada Kullanım Kolaylığı', 'Tarlada veya alım kantarında cep telefonundan veya tabletten makbuz düzenleyin.'],
      ['Yasal Güvence', 'GİB sistemine anında raporlanır, kağıt koçan taşıma derdi sona erer.'],
    ],
    features: ['GİB e-Müstahsil standartlarına uyum', 'Tarımsal alımlarda otomatik stopaj ve fon kesintisi', 'Mobil cihaz ve tablet desteği', 'Müstahsil kimlik / TC doğrulama', 'Tartım ve kantar entegrasyonu', 'Toplu makbuz kesimi', '10 yıl güvenli dijital arşiv', 'Muhasebe yazılımı entegrasyonu', 'Teknik destek ve eğitim'],
    faqs: [
      ['E-Müstahsil makbuzu kimler için zorunludur?', 'Tarımsal ürün alımı yapan ve e-fatura uygulamasına kayıtlı olan mükellefler ile belirlenen ciro hadlerini aşan tarım tüccarları ve sanayiciler için zorunludur.'],
      ['Çiftçinin sistemde kayıtlı olması gerekir mi?', 'Hayır, çiftçinin e-müstahsil mükellefi olması gerekmez. Belgeyi ürünü satın alan mükellef elektronik olarak düzenler.'],
      ['Çiftçiye nasıl teslim edilir?', 'Elektronik ortamda onaylanan belgenin kağıt çıktısı alınıp ıslak imzalı nüshası çiftçiye verilebilir veya SMS/e-posta ile paylaşılabilir.'],
    ],
    blog: /e-belge/,
  },
  {
    group: 'e-donusum-hizmetleri', category: 'belge', slug: 'e-gider-pusulasi', icon: 'receipt',
    name: 'E-Gider Pusulası', short: 'E-Gider Pusulası',
    title: 'E-Gider Pusulası Çözümü | Kurucu Bilişim',
    desc: 'Vergi mükellefi olmayan kişilerden alınan mal ve hizmetler için gider pusulalarınızı elektronik ortamda düzenleyin. GİB onaylı, hızlı ve mevzuata tam uyumlu.',
    h1: 'Elektronik Gider Pusulası (E-Gider Pusulası)',
    lead: 'Esnaf muaflığından yararlanan veya vergi mükellefi olmayan kişilerden yapılan alımlar için gider pusulalarınızı dijital ortamda düzenleyin, arşivleyin.',
    intro: [
      'E-Gider Pusulası; birinci ve ikinci sınıf tüccarların, kazancı basit usulde tespit edilenlerin ve defter tutmak zorunda olan serbest meslek erbabının; vergiden muaf esnafa veya nihai tüketiciye yaptırdıkları işler ya da onlardan satın aldıkları mallar için düzenledikleri belgedir.',
      'Kağıt evrak karmaşasını ortadan kaldıran sistemimiz sayesinde stopaj oranlarını iş türüne göre otomatik uygular, yasal gereklilikleri eksiksiz tamamlayarak dijital ortamda arşivlersiniz.',
    ],
    highlights: [
      ['Hızlı ve Kolay Düzenleme', 'Vergi mükellefi olmayan şahıslardan alımlarda anında dijital pusula.'],
      ['Stopaj Takibi', 'Hizmet türüne göre stopaj oranlarını otomatik hesaplayarak muhasebeleştirin.'],
      ['Kağıtsız ve Arşivli', 'Fiziki koçan saklama risklerini ve kayıpları tamamen ortadan kaldırın.'],
    ],
    features: ['GİB uyumlu e-Gider Pusulası', 'Hizmet ve mal alımında stopaj hesaplama', 'E-imza veya mali mühür ile onaylama', 'Tek tıkla PDF oluşturma ve paylaşma', 'Ön muhasebe ve ERP entegrasyonu', '10 yıl yasal süreyle saklama', 'Mobil ve web uyumlu arayüz', 'Denetimlere hazır dijital kayıt', 'Destek ve danışmanlık'],
    faqs: [
      ['E-Gider pusulası ne zaman düzenlenir?', 'Vergiden muaf esnaftan veya nihai tüketiciden mal ya da hizmet satın alındığında veya tüketici iadelerinde düzenlenir.'],
      ['Karşı tarafın imzası nasıl alınır?', 'Belge elektronik ortamda düzenlendikten sonra çıktısı alınıp imzalattırılabileceği gibi mevzuatın izin verdiği dijital onay yöntemleriyle de doğrulanabilir.'],
      ['Kullanımı zorunlu mu?', 'GİB tarafından e-belge kapsamına alınan mükellefler gider pusulası düzenlemeleri gerektiğinde bunu e-gider pusulası olarak düzenlemekle yükümlüdür.'],
    ],
    blog: /e-belge/,
  },
  {
    group: 'e-donusum-hizmetleri', category: 'belge', slug: 'e-dekont', icon: 'banknote',
    name: 'E-Dekont', short: 'E-Dekont',
    title: 'E-Dekont Hizmeti ve Bankacılık Çözümleri | Kurucu Bilişim',
    desc: 'Bankalar, ödeme kuruluşları ve finansal kurumlar için GİB standartlarında e-dekont altyapısı. Yüksek hacimli finansal işlemler için güvenli entegrasyon.',
    h1: 'Elektronik Dekont (E-Dekont) Çözümleri',
    lead: 'Bankacılık, finans ve ödeme kuruluşlarının düzenlediği dekontların elektronik ortamda üretilmesi, iletilmesi ve güvenle saklanması için GİB uyumlu altyapı.',
    intro: [
      'E-Dekont; Türkiye’de faaliyet gösteren mevduat bankaları, katılım bankaları, ödeme ve elektronik para kuruluşları ile yetkili finans kuruluşlarının düzenledikleri dekontların elektronik ortamda üretilmesini, GİB’e iletilmesini ve saklanmasını kapsayan uygulamadır.',
      'Yüksek işlem hacimlerine dayanıklı, kesintisiz çalışan API altyapımız ile milyonlarca finansal işlemi zaman damgalı olarak üretir, müşteri kanallarına anında servis eder ve yasal süresi boyunca güvenle muhafaza ederiz.',
    ],
    highlights: [
      ['Yüksek İşlem Hacmi', 'Milyonlarca finansal işlemi saniyeler içinde işleyen dayanıklı altyapı.'],
      ['Finansal Standartlar', 'BDDK ve GİB güvenlik standartlarına tam uyumlu şifreleme ve mimari.'],
      ['Zaman Damgası Garantisi', 'İşlem anının hukuki delil niteliğiyle değişmez olarak sabitlenmesi.'],
    ],
    features: ['GİB e-Dekont standartlarına tam uyum', 'Yüksek hızlı API entegrasyonu', 'Büyük veri ve işlem kapasitesi', 'Zaman damgalı arşivleme', 'Toplu dekont üretimi ve sorgulama', 'Müşteriye anlık bildirim altyapısı', 'Felaket kurtarma ve yedekleme', '7/24 SLA garantili altyapı', 'Kurumsal danışmanlık'],
    faqs: [
      ['E-Dekont kimler tarafından kullanılır?', 'Bankalar, yetkili finansal kuruluşlar, ödeme ve menkul kıymet şirketleri ile tasarruf finansman kurumları tarafından kullanılır.'],
      ['Müşteriler e-dekonta nasıl ulaşır?', 'İnternet şubesi, mobil bankacılık veya güvenli e-posta bildirimleri üzerinden diledikleri zaman görüntülenebilir.'],
      ['Yasal geçerliliği nedir?', 'GİB onaylı e-dekontlar, matbu kağıt dekontlarla aynı yasal ispat gücüne sahiptir.'],
    ],
    blog: /e-belge/,
  },
  {
    group: 'e-donusum-hizmetleri', category: 'belge', slug: 'e-adisyon', icon: 'coffee',
    name: 'E-Adisyon', short: 'E-Adisyon',
    title: 'E-Adisyon Çözümü: Restoran ve Kafeler | Kurucu Bilişim',
    desc: 'Restoran, kafe ve eğlence mekanları için GİB uyumlu e-adisyon. Masadan sipariş anında elektronik adisyon düzenleyin, POS ve e-fatura ile entegre edin.',
    h1: 'Restoran ve Kafeler İçin Elektronik Adisyon (E-Adisyon)',
    lead: 'Hizmet işletmelerinde masalara sunulan hizmetlerin sipariş anında elektronik ortamda belgelenmesi. POS ve kasa sistemleriyle tam entegre çalışır.',
    intro: [
      'E-Adisyon; lokanta, restoran, kafe, pastane, bar ve eğlence yerleri gibi hizmet işletmelerinde sunulan hizmetin ve siparişin detaylarını içeren adisyon belgesinin sipariş anında elektronik ortamda düzenlenmesidir.',
      'Kullandığınız restoran otomasyonu, el terminali ve POS cihazlarıyla doğrudan haberleşen sistemimiz; siparişi anında e-adisyona, hesap kapandığında ise tek tıkla e-arşiv faturaya dönüştürerek kaçakları ve operasyonel hataları önler.',
    ],
    highlights: [
      ['Sipariş Anında Kayıt', 'Sipariş girildiği anda GİB standartlarında elektronik adisyona dönüşür.'],
      ['Fatura ve POS Entegrasyonu', 'Ödeme aşamasında tek tıkla e-fatura veya e-arşive dönüştürme.'],
      ['Kaçak ve Hata Önleme', 'Masa ve servis süreçlerinde tam şeffaflık ve gelir kontrolü sağlar.'],
    ],
    features: ['GİB e-Adisyon teknik standartlarına uyum', 'Restoran POS ve el terminali entegrasyonu', 'Masa ve garson takibi', 'E-fatura & e-arşiv otomatik aktarımı', 'Offline (çevrimdışı) çalışabilme yeteneği', 'İptal ve ikram kayıtları kontrolü', '10 yıl geriye dönük denetim kaydı', 'Bulut tabanlı merkezi yönetim', 'Hızlı yerinde kurulum ve eğitim'],
    faqs: [
      ['E-Adisyon kimler için zorunludur?', 'GİB tarafından belirlenen brüt satış hasılatını aşan restoran, lokanta, kafe, pastane, bar ve eğlence mekanları için e-adisyon zorunludur.'],
      ['Mevcut adisyon programımla çalışır mı?', 'Yaygın restoran otomasyon programları ve POS yazılımlarıyla entegrasyon sağlıyoruz; mevcut altyapınızı değiştirmeden geçiş yapabilirsiniz.'],
      ['İnternet kesilirse ne olur?', 'Sistemimiz çevrimdışı modda çalışmayı destekler; bağlantı geldiğinde biriken adisyonlar otomatik olarak GİB’e iletilir.'],
    ],
    blog: /e-belge/,
  },
  {
    group: 'e-donusum-hizmetleri', category: 'belge', slug: 'e-bilet', icon: 'ticket',
    name: 'E-Bilet', short: 'E-Bilet',
    title: 'E-Bilet: Ulaşım ve Etkinlik Çözümleri | Kurucu Bilişim',
    desc: 'Kara, hava, deniz taşımacılığı, sinema, tiyatro ve etkinlikler için GİB onaylı e-bilet altyapısı. Karekodlu bilet düzenleme, SMS ve e-posta ile anında teslim.',
    h1: 'Ulaşım ve Etkinlikler İçin Elektronik Bilet (E-Bilet)',
    lead: 'Yolcu taşımacılığı, kültür-sanat etkinlikleri ve spor organizasyonlarında biletlerinizi elektronik ortamda üretin, karekodla doğrulatın ve iletin.',
    intro: [
      'E-Bilet; karayolu, denizyolu ve havayolu yolcu taşımacılığı ile sinema, tiyatro, konser ve spor müsabakaları gibi etkinliklerde düzenlenen giriş biletlerinin elektronik ortamda düzenlenmesini, doğrulanmasını ve saklanmasını sağlayan belgedir.',
      'Kağıt bilet basım ve dağıtım masraflarını tamamen ortadan kaldırır. Yolculara veya katılımcılara SMS ve e-posta ile iletilen karekodlu biletler turnikelerde anında taranır; günlük icmal raporları GİB sistemine otomatik iletilir.',
    ],
    highlights: [
      ['Karekodlu Hızlı Giriş', 'Turnikelerde ve araç girişlerinde saniyeler içinde okutulan QR biletler.'],
      ['SMS ve E-Posta İletimi', 'Baskı ve matbaa maliyetini sıfırlayan dijital teslimat.'],
      ['GİB Raporlama Kolaylığı', 'Günlük bilet satış raporlarının GİB’e otomatik aktarımı.'],
    ],
    features: ['GİB e-Bilet mevzuatına %100 uyum', 'Karekodlu (QR) biletleme', 'SMS ve e-posta ile bilet gönderimi', 'Turnike ve barkod okuyucu entegrasyonu', 'İptal, iade ve açığa alma süreçleri', 'Yolcu ve koltuk yönetimi', 'Günlük satış icmali ve GİB raporlaması', 'Yüksek trafik ve biletleme kapasitesi', '7/24 teknik altyapı desteği'],
    faqs: [
      ['E-Bilet hangi sektörlerde zorunludur?', 'Şehirler arası yolcu taşımacılığı yapan karayolu firmaları, deniz ve havayolu işletmeleri ile sinema, tiyatro ve konser organizatörleri için zorunludur.'],
      ['Yolcunun bilet çıktısı alması gerekir mi?', 'Hayır, yolcunun telefonuna iletilen SMS linkindeki veya e-postadaki karekodlu bilet yeterlidir.'],
      ['GİB’e raporlama nasıl yapılır?', 'Düzenlenen biletler ve iptal kayıtları sistem tarafından otomatik olarak paketlenip GİB sistemlerine iletilir.'],
    ],
    blog: /e-belge/,
  },

  // ========== 2. ÖNE ÇIKARILAN AYRI HİZMET KATEGORİLERİ ==========
  {
    group: 'e-donusum-hizmetleri', category: 'guvenlik', slug: 'e-imza', icon: 'pen',
    name: 'E-İmza', short: 'E-İmza',
    title: 'E-İmza Nasıl Alınır? Başvuru ve Aynı Gün Kurye | Kurucu Bilişim',
    desc: 'E-imza nasıl alınır, hangi belgeler gerekir? İstanbul içi aynı gün kurye, 81 ile teslim, kurulum ve yenileme desteği. Fiyat için hemen teklif alın.',
    h1: 'E-İmza Başvurusu, Kurulumu ve Yenilemesi',
    lead: '5070 sayılı Elektronik İmza Kanunu kapsamında ıslak imza ile aynı hukuki geçerliliğe sahip nitelikli e-imzanızı hızlı, kolay ve uygun fiyatla edinin.',
    intro: [
      'E-imza; MERSİS, e-Devlet, UYAP, EKAP, SGK ve ticaret sicili gibi birçok resmi platformda işlem yapmanızı, belgelerinizi dijital ortamda güvenle imzalamanızı sağlar. Kağıt israfını ortadan kaldırarak zaman ve maliyetten tasarruf ettirir.',
      'Başvuru formunun doldurulmasından kimlik doğrulamaya, İstanbul içinde aynı gün, 81 ilde kurye ile teslimattan bilgisayarınıza sürücü ve Java kurulumuna kadar her adımda yanınızdayız. Farklı süre seçenekleriyle bütçenize uygun paketler sunuyoruz.',
    ],
    highlights: [
      ['Aynı Gün Kurye', 'İstanbul içinde aynı gün, 81 ilin tamamına kurye ile teslim.'],
      ['Uygun Fiyatlı Paketler', '1, 2 ve 3 yıllık esnek süre seçenekleri.'],
      ['Kurulum Desteği', 'Uzaktan bağlantıyla sürücü ve uygulama kurulumunu biz yapıyoruz.'],
    ],
    features: ['Yasal geçerlilik ve güvence', 'İstanbul içi aynı gün kurye', 'Şifrelenmiş güvenli teknoloji', 'MERSİS, UYAP, EKAP kullanımı', 'Uygun fiyatlı paketler', 'Uzaktan kurulum desteği', 'Kolay yenileme', '81 ile kurye ile teslim', 'Kurumsal ve bireysel çözümler'],
    faqs: [
      ['E-imza nasıl alınır?', 'Başvuru formunu doldurursunuz, kimlik doğrulamanız yapılır ve e-imzanız İstanbul içinde aynı gün, diğer illere kurye ile teslim edilir. Ardından kart okuyucu sürücüsü ve imza uygulamasının kurulumunu uzaktan bağlantıyla biz yapıyoruz.'],
      ['E-imza için gerekli belgeler nelerdir?', 'Bireysel başvurularda geçerli kimlik kartınız yeterlidir; kurumsal kullanımda kurum bilgileri de istenebilir. Süreci sizin için adım adım yönetiyoruz.'],
      ['E-imza fiyatları ne kadar?', 'Fiyat, seçtiğiniz kullanım süresine (1, 2 veya 3 yıl) göre değişir. Güncel fiyat için formdan veya WhatsApp’tan hemen teklif alabilirsiniz.'],
      ['E-imza nasıl yenilenir?', 'E-imzanızın süresi dolmadan yenileme başvurusu yapmanız gerekir. Yenileme başvurusunu, teslimatı ve kurulumu sizin için baştan sona yapıyoruz.'],
      ['E-imza ıslak imza ile aynı geçerliliğe sahip mi?', 'Evet. 5070 sayılı Elektronik İmza Kanunu’na göre güvenli elektronik imza, elle atılan imza ile aynı hukuki sonucu doğurur.'],
      ['E-imzam ne kadar sürede elime ulaşır?', 'İstanbul içinde e-imzanızı aynı gün kurye ile teslim ediyoruz. Türkiye’nin 81 iline de kurye ile gönderim yapıyoruz; teslim süresi kimlik doğrulamanın tamamlanmasına ve bulunduğunuz ile göre değişir.'],
      ['MERSİS işlemleri için e-imza zorunlu mu?', 'MERSİS üzerinden yapılan birçok başvuru ve onay işlemi için şirket yetkililerinin e-imzası gerekmektedir. Detaylar için blog yazımıza göz atabilirsiniz.'],
    ],
    blog: /e-imza|mersis/,
  },
  {
    group: 'e-donusum-hizmetleri', category: 'guvenlik', slug: 'mali-muhur', icon: 'seal',
    name: 'Mali Mühür', short: 'Mali Mühür',
    title: 'Mali Mühür Başvurusu ve Yenileme | Aynı Gün Teslim | Kurucu Bilişim',
    desc: 'Mali mühür başvurusu nasıl yapılır? Aynı gün teslimat, kurulum, şifre oluşturma ve yenileme desteği. E-fatura ve e-defter için. Fiyat için teklif alın.',
    h1: 'Mali Mühür Başvurusu, Kurulumu ve Yenilemesi',
    lead: 'Tüzel kişiliğinizin dijital kimliği olan mali mührünüzü aynı gün, dakikalar içinde teslim ediyoruz; e-fatura, e-arşiv ve e-defter işlemlerinize hemen başlayın.',
    intro: [
      'Mali mühür, kurumların e-dönüşüm uygulamalarında kullandığı ve TÜBİTAK Kamu Sertifikasyon Merkezi tarafından üretilen elektronik sertifikadır. E-fatura, e-arşiv ve e-defter gibi uygulamalarda belgelerin kurumunuz tarafından oluşturulduğunu ve değiştirilmediğini garanti eder.',
      'Başvuru dosyanızın hazırlanmasından onay sürecinin takibine kadar her adımı yönetiyor; mali mührünüzü aynı gün, dakikalar içinde teslim ediyor, kurulumunu ve yenilemesini hatasız şekilde yapıyoruz.',
    ],
    highlights: [
      ['Hızlı Başvuru Süreci', 'Başvurunuzu hızlıca tamamlıyor, onay sürecini sizin yerinize takip ediyoruz.'],
      ['Ekonomik Paketler', 'Uzun süreli kullanım avantajı sunan uygun fiyatlı seçenekler.'],
      ['Aynı Gün Teslimat', 'Mali mührünüz aynı gün, dakikalar içinde teslim edilir.'],
    ],
    features: ['Yasal geçerlilik', 'Aynı gün, dakikalar içinde teslimat', 'Şifrelenmiş veri koruma', 'E-fatura ve e-defter uyumu', 'Kurumsal çözümler', 'Teknik destek ve danışmanlık', 'Hızlı yenileme', 'Kolay kurulum', 'Uygun fiyat'],
    faqs: [
      ['Mali mühür başvurusu nasıl yapılır?', 'Başvuru elektronik ortamda yapılır; şirket ve yetkili bilgileri doğrulandıktan sonra mali mührünüz hazırlanır. Başvuru dosyanızı hazırlıyor, onay sürecini takip ediyor ve mührünüzü aynı gün teslim ediyoruz.'],
      ['Mali mühür ücreti ne kadar?', 'Ücret, seçtiğiniz sertifika süresine göre değişir. Güncel fiyat için formdan veya WhatsApp’tan hemen teklif alabilirsiniz.'],
      ['Mali mühür şifresi nasıl oluşturulur?', 'Mali mühür teslim edildikten sonra kullanım için şifre (PIN) oluşturulur. Şifre oluşturma, aktivasyon ve kurulum adımlarında uzaktan bağlantıyla destek veriyoruz.'],
      ['Mali mühür ile e-imza arasındaki fark nedir?', 'E-imza gerçek kişiye, mali mühür ise tüzel kişiliğe (şirkete) aittir. Mali mühür e-fatura, e-arşiv ve e-defter gibi uygulamalarda şirket adına kullanılır.'],
      ['Mali mühür almak için ne gerekir?', 'Elektronik başvurunun yapılması, şirket bilgilerinin ve yetkili kişi bilgilerinin doğrulanması gerekir. Gerekli belgeleri ve adımları sizin için hazırlıyoruz.'],
      ['Mali mührüm ne kadar sürede teslim edilir?', 'Başvurunuz tamamlandığında mali mührünüzü aynı gün, dakikalar içinde teslim ediyoruz. Kurulumunu da uzaktan bağlantıyla hemen yapıyoruz.'],
      ['Mali mühür ne kadar geçerlidir, nasıl yenilenir?', 'Sertifikalar seçilen pakete göre belirli bir süre geçerlidir; süre bitmeden yenileme yapılması gerekir. Yenileme tarihlerinizi takip ederek sizi önceden bilgilendiriyoruz.'],
    ],
    blog: /mali-muhur/,
  },
  {
    group: 'e-donusum-hizmetleri', category: 'guvenlik', slug: 'kep-ik', icon: 'mail',
    name: 'KEP (Kayıtlı Elektronik Posta) ve E-Bordro', short: 'KEP & E-Bordro',
    title: 'KEP Adresi Nasıl Alınır? KEP ve E-Bordro | Kurucu Bilişim',
    desc: 'KEP adresi nasıl alınır, hangi evraklar gerekir? KEP adresinizi hızlıca açıyor, bordrolarınızı KEP İK ile yasal geçerlilikle gönderiyoruz. Teklif alın.',
    h1: 'KEP Adresi (Kayıtlı Elektronik Posta) ve E-Bordro',
    lead: 'Resmi yazışmalarınızı ve bordro süreçlerinizi yasal delil niteliğinde, zaman damgalı ve güvenli şekilde dijitale taşıyın.',
    intro: [
      'KEP, elektronik iletilerin gönderimi ve teslimini yasal delil sağlayacak şekilde belgeleyen, iadeli taahhütlü mektubun elektronik karşılığıdır. Vergi daireleri, SGK, belediyeler, mahkemeler, ticaret odaları ve bankalarla güvenli ve hızlı iletişim kurmanızı sağlar.',
      'KEP İK (e-bordro) çözümümüzle bordrolarınızı çalışanlarınıza yasal geçerliliği olan şekilde dijital olarak gönderir, onaylarını alır ve arşivlersiniz. İnsan kaynakları işlemlerinizde hem zamandan hem maliyetten tasarruf edersiniz.',
    ],
    highlights: [
      ['Resmi Kurum Entegrasyonu', 'Vergi daireleri, SGK, mahkemeler ve bankalarla güvenli yazışma.'],
      ['Hızlı ve Ekonomik', 'Kağıt, kargo ve zaman maliyetlerini ortadan kaldırır.'],
      ['Güvenli Arşivleme', 'Tüm KEP iletileri geriye dönük erişimle saklanır.'],
    ],
    features: ['Yasal delil niteliği', 'Zaman damgalı gönderim', 'E-bordro dağıtımı ve onayı', 'KVKK uyumlu süreç', 'Toplu gönderim', 'Güvenli arşiv', 'Resmi kurum yazışmaları', 'Kolay kullanım', 'Teknik destek'],
    faqs: [
      ['KEP adresi nasıl alınır?', 'Başvurunuzu alıyor, kimlik doğrulamanızı yapıyor ve KEP hesabınızı çoğunlukla aynı gün, uzaktan işlemlerle aktif ediyoruz. Size sadece gerekli bilgileri iletmek kalıyor.'],
      ['KEP adresi için gerekli evraklar nelerdir?', 'Bireysel başvurularda kimlik kartınız yeterlidir. Şirketler için genellikle imza sirküleri ve şirketi temsile yetkili kişinin kimlik bilgileri istenir. Size özel evrak listesini başvuru sırasında iletiyoruz.'],
      ['KEP adresi ücreti ne kadar?', 'Ücret, seçtiğiniz pakete ve ileti sayısına göre değişir. Güncel fiyat için formdan veya WhatsApp’tan hemen teklif alabilirsiniz.'],
      ['KEP adresi kimler için zorunludur?', 'Türk Ticaret Kanunu kapsamında anonim, limited ve sermayesi paylara bölünmüş komandit şirketlerin KEP adresi edinmesi gerekmektedir. Şahıs işletmeleri ve bireyler de isteğe bağlı olarak KEP adresi alabilir.'],
      ['E-bordro yasal olarak geçerli mi?', 'Evet. KEP üzerinden ve elektronik imza ile gönderilen bordrolar yasal geçerliliğe sahiptir ve kağıt bordronun yerini alabilir.'],
      ['KEP hesabı ne kadar sürede açılır?', 'Gerekli bilgiler tamamlandıktan sonra KEP hesabınız çoğunlukla aynı gün içinde, uzaktan işlemlerle aktif edilir.'],
    ],
    blog: /kep|e-bordro/,
  },
  {
    group: 'e-donusum-hizmetleri', category: 'guvenlik', slug: 'e-donusum-entegrasyonu', icon: 'sync',
    name: 'E-Dönüşüm Entegrasyonu', short: 'E-Dönüşüm Entegrasyonu',
    title: 'E-Dönüşüm Entegrasyonu: ERP ve Muhasebe | Kurucu Bilişim',
    desc: 'ERP, ön muhasebe, CRM ve e-ticaret sitelerinizi e-fatura, e-arşiv ve e-irsaliye sistemleriyle köprülüyoruz. Kesintisiz API entegrasyonu ve teknik destek.',
    h1: 'E-Dönüşüm Yazılım ve API Entegrasyonu',
    lead: 'Kullandığınız ticari yazılımlar, ERP sistemleri veya e-ticaret altyapılarınız ile e-dönüşüm servisleri arasında çift yönlü, otomatik ve güvenli veri akışı kuruyoruz.',
    intro: [
      'E-dönüşüm süreçlerinin işletmenize gerçek anlamda zaman kazandırması, kullandığınız kurumsal yazılımlarla tam entegre çalışmasına bağlıdır. Manuel veri girişini ortadan kaldıran entegrasyonlarımızla fatura ve irsaliyeleriniz tek tıkla GİB sistemine aktarılır.',
      'Zirve, Logo, Mikro, Netsis, Paraşüt, Luca, SAP ve popüler e-ticaret altyapıları (WooCommerce, Shopify, Ideasoft, Ticimax) ile çift yönlü API köprüleri kurarak tüm siparişlerinizi hatasız faturalandırıyoruz.',
    ],
    highlights: [
      ['Çift Yönlü Otomasyon', 'Faturalarınız yazılımınızdan kesilir, GİB onayları otomatik programa yansır.'],
      ['E-Ticaret & Pazaryeri Uyumu', 'Trendyol, Hepsiburada, Amazon ve web sitenizle tam senkronize faturalama.'],
      ['Hatasız Muhasebe', 'Manuel veri girişini ortadan kaldırarak insan hatasını sıfıra indirin.'],
    ],
    features: ['Popüler ERP ve muhasebe yazılımlarıyla entegrasyon', 'E-ticaret platformları bağlantısı', 'REST / SOAP API entegrasyon köprüleri', 'Otomatik fatura ve irsaliye aktarımı', 'Hata uyarı ve loglama mekanizması', 'Özel yazılımlara özel API geliştirme', 'Test ve canlı geçiş ortamı yönetimi', 'Veri güvenliği ve şifreli aktarım', 'Uzman yazılım ve entegrasyon desteği'],
    faqs: [
      ['Hangi muhasebe ve ERP programlarıyla entegrasyon yapabiliyorsunuz?', 'Zirve, Logo, Mikro, Netsis, Paraşüt, Luca, Nebim, SAP, Canias ve özel yazılmış kurum içi ERP sistemleriyle entegrasyon sağlıyoruz.'],
      ['E-ticaret sitemdeki siparişler otomatik faturalandırılabilir mi?', 'Evet. Sipariş tamamlandığında müşteriye otomatik e-arşiv fatura düzenlenip e-posta ile gönderilebilir ve kargo takip fişine eklenebilir.'],
      ['Entegrasyon süreci ne kadar sürer?', 'Hazır paket entegrasyonlarımız genellikle 1-2 iş günü içinde devreye alınır. Özel yazılım gerektiren projelerde süre analiz sonrası netleşir.'],
    ],
    blog: /e-fatura|e-belge|erp/,
  },
  {
    group: 'e-donusum-hizmetleri', category: 'guvenlik', slug: 'e-donusum-danismanligi', icon: 'compass',
    name: 'E-Dönüşüm Başvuru ve Geçiş Danışmanlığı', short: 'Başvuru & Geçiş Danışmanlığı',
    title: 'E-Dönüşüm Başvuru ve Geçiş Danışmanlığı | Kurucu Bilişim',
    desc: 'GİB başvuruları, mali mühür temini, entegratör seçimi ve geçiş süreçlerinizi uçtan uca yönetiyoruz. Ceza riskini sıfırlayan uzman danışmanlık.',
    h1: 'E-Dönüşüm Başvuru ve Geçiş Danışmanlığı',
    lead: 'Yasal zorunluluklar, başvuru takvimleri ve teknik kurulumlar arasında kaybolmayın. Başvurudan ilk faturanın kesilmesine kadar tüm süreci sizin adınıza yönetiyoruz.',
    intro: [
      'E-dönüşüm mevzuatı sürekli güncellenen, karmaşık yasal takvimlere ve katı ceza yaptırımlarına sahip bir alandır. Hangi e-belge uygulamasına hangi tarihte geçmeniz gerektiğini titizlikle analiz ediyor, sizi sürpriz cezalardan koruyoruz.',
      'Mali mühür veya e-imza başvurusundan GİB portal kayıtlarına, işletmeniz için en avantajlı özel entegratörün seçilmesinden personelinizin eğitilmesine kadar her adımda masanızın başında veya uzaktan yanınızdayız.',
    ],
    highlights: [
      ['Sıfır Ceza Riski', 'GİB geçiş sürelerini ve mevzuat zorunluluklarını kaçırmadan zamanında geçiş.'],
      ['Uçtan Uca Süreç Yönetimi', 'Mali mühür başvurusundan portal aktivasyonuna tüm bürokrasiyi üstleniyoruz.'],
      ['Firma Ekibine Özel Eğitim', 'Faturalama ve arşivleme süreçlerinde personelinize birebir rehberlik.'],
    ],
    features: ['GİB başvuru dosyası hazırlama ve takip', 'Mali mühür ve e-imza temin danışmanlığı', 'En doğru özel entegratör seçimi', 'Kontör ve paket maliyet optimizasyonu', 'Portal kurulumu ve kullanıcı yetkilendirme', 'Test faturalama ve onay denemeleri', 'Personel eğitimi ve kullanım kılavuzları', 'Yıl boyu mevzuat ve yenileme takibi', 'Öncelikli çağrı ve teknik danışmanlık desteği'],
    faqs: [
      ['Geçiş danışmanlığı neleri kapsar?', 'Mevzuat analizi, mali mühür temini, GİB portal başvurusu, entegratör aktivasyonu, kullanıcı eğitimi ve ilk faturalama adımlarının tamamını kapsar.'],
      ['E-dönüşüm zorunluluğunu kaçırırsam ne olur?', 'Süresinde geçiş yapmayan mükellefler için Vergi Usul Kanunu kapsamında ağır özel usulsüzlük cezaları uygulanır. Danışmanlığımız bu riskleri tamamen engeller.'],
      ['Danışmanlık sonrası destek devam ediyor mu?', 'Evet. Kurucu Bilişim olarak geçiş sonrasında da sistem güncellemeleri, kontör takibi ve teknik sorularınızda yanınızdayız.'],
    ],
    blog: /e-fatura|e-belge|mali-muhur/,
  },
  {
    group: 'dijital-hizmetler', slug: 'web-tasarim', icon: 'monitor',
    name: 'Web Tasarım', short: 'Web Tasarım',
    title: 'Kurumsal Web Tasarım | SEO ve Mobil Uyumlu | Kurucu Bilişim',
    desc: 'Hızlı, mobil uyumlu ve SEO odaklı kurumsal web siteleri. Anahtar teslim web tasarım, kolay yönetim paneli ve 7/24 destek.',
    h1: 'Kurumsal Web Tasarım Hizmeti',
    lead: 'Estetik, hız ve kullanıcı deneyimini bir araya getirerek markanızı dijitalde en iyi şekilde temsil eden, dönüşüm odaklı web siteleri tasarlıyoruz.',
    intro: [
      'Sadece şık bir tasarım değil; hedef kitlenize hitap eden, hızlı açılan ve arama motorlarında görünür olan bir dijital varlık kuruyoruz. Her proje ihtiyaç analiziyle başlar, marka kimliğinize uygun özgün bir tasarımla devam eder.',
      'İçerikleriniz hazır olduğunda kurumsal web siteleri genellikle 7–14 iş günü içinde yayına alınır. Kullanıcı dostu yönetim paneli ve eğitimle sitenizi kolayca güncelleyebilirsiniz.',
    ],
    highlights: [
      ['SEO ve Mobil Uyumlu', 'Teknik SEO altyapısı ve tüm cihazlarda kusursuz görünüm.'],
      ['Hızlı ve Güncel Altyapı', 'Core Web Vitals odaklı, hızlı açılan sayfalar.'],
      ['Anahtar Teslim', 'Alan adı, hosting, kurulum ve eğitim dahil.'],
    ],
    features: ['Mobil uyumlu, modern tasarım', 'Teknik SEO altyapısı', 'Hızlı teslimat', 'Kolay yönetim paneli', 'SSL ve güvenlik', 'Google Analytics & Search Console', 'Kullanıcı deneyimi odaklı arayüz', 'Taksit imkânı', 'Eğitim ve 7/24 destek'],
    faqs: [
      ['Web sitesi ne kadar sürede hazır olur?', 'İçeriklerin firma tarafından temin edilmesi durumunda kurumsal web siteleri genellikle 7–14 iş günü içinde tamamlanır.'],
      ['Siteyi kendim güncelleyebilir miyim?', 'Evet. Kullanıcı dostu bir yönetim paneli kuruyor ve sitenizi nasıl yöneteceğinizle ilgili eğitim veriyoruz.'],
      ['SEO çalışması dahil mi?', 'Tüm sitelerimiz teknik SEO altyapısıyla (hız, meta etiketler, site haritası, yapılandırılmış veri) teslim edilir. Düzenli içerik ve SEO danışmanlığı ayrıca paketlenebilir.'],
    ],
    blog: /web|sosyal/,
  },
  {
    group: 'dijital-hizmetler', slug: 'kurumsal-tasarim', icon: 'palette',
    name: 'Kurumsal Tasarım', short: 'Kurumsal Tasarım',
    title: 'Kurumsal Kimlik ve Logo Tasarımı | Kurucu Bilişim',
    desc: 'Logo, kartvizit, kurumsal kimlik, marka kılavuzu ve ambalaj tasarımıyla markanızı profesyonel ve akılda kalıcı hale getirin.',
    h1: 'Kurumsal Kimlik ve Logo Tasarımı',
    lead: 'Logodan marka kılavuzuna, kartvizitten ambalaja kadar markanızın her temas noktasında tutarlı, güven veren ve akılda kalan bir kimlik oluşturuyoruz.',
    intro: [
      'Kurumsal tasarım; markanızın kimliğini dijital ve fiziksel dünyada etkili şekilde yansıtan en önemli unsurdur. Logo, renk paleti, tipografi ve kurumsal belgeler için bütüncül bir tasarım dili kuruyoruz.',
      'Kurumsal tasarım yalnızca estetik değil; güvenilirlik, tutarlılık ve profesyonellik demektir. Markanızı daha tanınır ve hatırlanır kılarken hedef kitlenizle güçlü bir bağ kurmanıza yardımcı oluyoruz.',
    ],
    highlights: [
      ['Logo & Kartvizit', 'Markanızı yansıtan özgün logo ve kartvizit tasarımları.'],
      ['Kurumsal Kimlik', 'Marka kılavuzuyla tutarlı, profesyonel bir görünüm.'],
      ['Ambalaj Tasarımı', 'Rafta dikkat çeken, fonksiyonel ambalajlar.'],
    ],
    features: ['Logo tasarımı', 'Kurumsal renk paleti', 'Tipografi seçimi', 'Marka kılavuzu', 'Kartvizit ve antetli kağıt', 'Sosyal medya kimliği', 'Ambalaj ve ürün tasarımı', 'Reklam materyalleri', 'Sunum şablonları'],
    faqs: [
      ['Logo tasarımı süreci nasıl işler?', 'Marka analizi ve brif ile başlar; alternatif konseptler sunulur, geri bildirimlerinizle revize edilerek final logo ve kullanım kılavuzu teslim edilir.'],
      ['Hangi dosya formatlarında teslim ediyorsunuz?', 'Vektörel (AI, SVG, PDF) ve dijital kullanım için PNG/JPG formatlarında, renkli ve tek renk versiyonlarıyla teslim ediyoruz.'],
    ],
    blog: /sosyal|web/,
  },
  {
    group: 'dijital-hizmetler', slug: 'crm-yazilimlari', icon: 'users',
    name: 'CRM Yazılımları', short: 'CRM Yazılımları',
    title: 'CRM Yazılımı Kurulum ve Danışmanlık | Kurucu Bilişim',
    desc: 'Müşteri ilişkilerinizi tek panelden yönetin. Satış, pazarlama ve destek süreçlerinizi otomatikleştiren CRM yazılımı kurulumu ve entegrasyonu.',
    h1: 'CRM Yazılımları ile Müşteri İlişkilerinizi Güçlendirin',
    lead: 'Müşteri verilerinizi tek merkezde toplayın, satış süreçlerinizi hızlandırın ve her müşteriye kişiselleştirilmiş bir deneyim sunun.',
    intro: [
      'CRM yazılımı; müşteri verilerini toplar, düzenler ve analiz eder. Doğru veri yönetimiyle müşteri ihtiyaçlarını daha iyi anlar, satış, pazarlama ve destek ekiplerinizi aynı bilgiyle çalıştırırsınız.',
      'İşletmenize uygun CRM çözümünü seçiyor, kurulum ve veri aktarımını yapıyor, mevcut yazılımlarınızla entegre ederek ekibinize eğitim veriyoruz.',
    ],
    highlights: [
      ['Veri Yönetimi ve Analitik', 'Müşteri verisini anlamlı raporlara dönüştürün.'],
      ['Otomasyon ve Entegrasyon', 'Satış, pazarlama ve destek süreçlerini otomatikleştirin.'],
      ['Müşteri Memnuniyeti', 'Geri bildirimleri takip edin, sadakati artırın.'],
    ],
    features: ['Müşteri veri yönetimi', 'Satış hunisi takibi', 'Teklif ve fırsat yönetimi', 'E-posta ve SMS otomasyonu', 'Destek talebi yönetimi', 'Raporlama ve analitik', 'ERP ve e-fatura entegrasyonu', 'Mobil erişim', 'Kurulum ve eğitim'],
    faqs: [
      ['CRM yazılımı hangi işletmeler için uygundur?', 'Müşteri ilişkilerini düzenli takip etmek isteyen her ölçekteki işletme için uygundur; özellikle satış ekibi olan KOBİ’lerde verimliliği belirgin şekilde artırır.'],
      ['Mevcut müşteri verilerim aktarılabilir mi?', 'Evet. Excel veya mevcut sistemlerinizdeki verileri CRM’e aktarıyor, temizleyip düzenliyoruz.'],
    ],
    blog: /erp|crm/,
  },
  {
    group: 'dijital-hizmetler', slug: 'erp-yazilimlari', icon: 'grid',
    name: 'ERP Yazılımları', short: 'ERP Yazılımları',
    title: 'ERP Yazılımı Kurulum ve Entegrasyon | Kurucu Bilişim',
    desc: 'Finans, stok, üretim ve insan kaynakları süreçlerinizi tek sistemde birleştirin. İşletmenize uygun ERP yazılımı seçimi, kurulumu ve desteği.',
    h1: 'ERP Yazılımları ile İş Süreçlerinizi Dönüştürün',
    lead: 'Tüm departmanlarınızı tek bir sistemde birleştirerek veri akışını hızlandırın, maliyetleri düşürün ve doğru kararları gerçek zamanlı veriyle alın.',
    intro: [
      'ERP; satıştan üretime, finanstan insan kaynaklarına kadar tüm iş süreçlerini tek bir sistemde birleştirir. Departmanlar arası veri akışı düzenlenir, bilgiye erişim kolaylaşır.',
      'İhtiyaç analiziyle doğru modülleri belirliyor, kurulum, veri aktarımı, e-dönüşüm entegrasyonu ve kullanıcı eğitimiyle sistemi işletmenize uyarlıyoruz.',
    ],
    highlights: [
      ['Merkezi Veri Yönetimi', 'Tüm süreçler tek sistemde, tek doğru veri.'],
      ['Kaynak Optimizasyonu', 'Finans, üretim, stok ve İK süreçleri entegre.'],
      ['Ölçeklenebilirlik', 'İşletmeniz büyüdükçe yeni modüllerle genişler.'],
    ],
    features: ['Modüler ve entegre yapı', 'Gerçek zamanlı veri takibi', 'Stok ve üretim yönetimi', 'Finans ve muhasebe', 'E-fatura / e-defter entegrasyonu', 'İnsan kaynakları', 'Gelişmiş raporlama', 'Kullanıcı dostu arayüz', 'Kurulum, eğitim ve destek'],
    faqs: [
      ['ERP yazılımı seçerken nelere dikkat etmeliyim?', 'Sektörünüze uygunluk, ölçeklenebilirlik, e-dönüşüm entegrasyonu, destek kalitesi ve toplam sahip olma maliyeti en önemli kriterlerdir. Detaylı rehberimizi blogda bulabilirsiniz.'],
      ['ERP kurulumu ne kadar sürer?', 'Modül sayısına ve veri hacmine göre değişmekle birlikte KOBİ ölçeğinde kurulumlar genellikle birkaç hafta içinde tamamlanır.'],
    ],
    blog: /erp/,
  },
  {
    group: 'dijital-hizmetler', slug: 'eticaret-cozumleri', icon: 'cart',
    name: 'E-Ticaret Çözümleri', short: 'E-Ticaret',
    title: 'E-Ticaret Sitesi Kurulumu: IKAS, Ticimax | Kurucu Bilişim',
    desc: 'IKAS, Ticimax, IdeaSoft ve PlatinMarket altyapılarıyla e-ticaret sitenizi kurun. Ödeme, kargo, pazaryeri ve e-fatura entegrasyonu dahil.',
    h1: 'E-Ticaret Sitesi Kurulumu ve Yönetimi',
    lead: 'Güvenli, hızlı ve kullanıcı dostu e-ticaret altyapılarıyla online satışlarınızı başlatın, pazaryerleri ve e-fatura entegrasyonuyla büyütün.',
    intro: [
      'İhtiyacınıza en uygun altyapıyı (IKAS, Ticimax, IdeaSoft, PlatinMarket, Platin360 vb.) ürün yapınıza ve hedeflerinize göre birlikte seçiyor; tasarım, ürün yükleme, ödeme ve kargo entegrasyonlarıyla anahtar teslim kuruyoruz.',
      'Güçlü sunucu, SSL, DDoS koruması, CDN ve düzenli yedeklemeyle mağazanız her zaman hızlı ve güvende kalır. SEO ve dijital pazarlama desteğiyle doğru müşteriye ulaşırsınız.',
    ],
    highlights: [
      ['Hızlı ve Güvenli Sistem', 'SSL, DDoS koruması, CDN ve düzenli yedekleme.'],
      ['Kullanıcı Dostu Arayüz', 'Kolay gezinme, hızlı ödeme, mobil uyumlu tasarım.'],
      ['Entegre Yapı', 'Kargo, ödeme, stok ve pazaryeri entegrasyonları.'],
    ],
    features: ['Mobil uyumlu mağaza', 'Güvenli ödeme sistemleri', 'Kargo ve lojistik entegrasyonu', 'Stok ve sipariş yönetimi', 'Pazaryeri entegrasyonları', 'E-fatura / e-arşiv entegrasyonu', 'SEO ve dijital pazarlama', 'Çok kanallı satış', 'Eğitim ve destek'],
    faqs: [
      ['Hangi e-ticaret altyapılarıyla çalışıyorsunuz?', 'IKAS, PlatinMarket, Platin360, IdeaSoft ve Ticimax gibi güçlü altyapılarla çalışıyor, işletmenize en uygun olanı birlikte seçiyoruz.'],
      ['E-fatura entegrasyonu yapılıyor mu?', 'Evet. Siparişlerinizin otomatik olarak e-fatura / e-arşiv faturaya dönüşmesi için entegrasyonu kuruyoruz.'],
    ],
    blog: /e-fatura|sosyal/,
  },
  {
    group: 'dijital-hizmetler', slug: 'sosyal-medya-yonetimi', icon: 'spark',
    name: 'Sosyal Medya Yönetimi', short: 'Sosyal Medya',
    title: 'Sosyal Medya Yönetimi ve Reklam Hizmeti | Kurucu Bilişim',
    desc: 'Strateji, içerik üretimi, reklam yönetimi ve performans raporlamasıyla markanızı sosyal medyada büyütün. Profesyonel sosyal medya ajansı hizmeti.',
    h1: 'Sosyal Medya Yönetimi',
    lead: 'Hedef kitlenizi analiz ederek özgün içerikler üretiyor, reklam ve topluluk yönetimiyle markanızın sosyal medyadaki etkisini ölçülebilir şekilde büyütüyoruz.',
    intro: [
      'Sosyal medya stratejinizi markanıza özel kuruyor, tutarlı bir tasarım dili ve içerik takvimiyle düzenli paylaşımlar yapıyoruz. Takipçilerinizle aktif iletişim kurarak etkileşimi artırıyoruz.',
      'Gönderilerinizin erişim ve etkileşimini düzenli olarak analiz ediyor, en iyi performans gösteren içeriklere göre stratejiyi sürekli geliştiriyor ve şeffaf raporlar sunuyoruz.',
    ],
    highlights: [
      ['Düzenli ve Kaliteli İçerik', 'Hedef kitleye özel, takvimli ve tutarlı paylaşımlar.'],
      ['Performans Analizi', 'Veriye dayalı optimizasyon ve aylık raporlar.'],
      ['Topluluk Yönetimi', 'Yorum ve mesajlara hızlı, markaya uygun yanıtlar.'],
    ],
    features: ['Strateji ve planlama', 'İçerik üretimi', 'İçerik takvimi', 'Topluluk yönetimi', 'Reklam yönetimi', 'Rakip ve pazar analizi', 'Görsel kimlik uyumu', 'Performans raporlama', 'Trend takibi'],
    faqs: [
      ['Hangi platformlarda hizmet veriyorsunuz?', 'Instagram, Facebook, LinkedIn, TikTok, X ve YouTube başta olmak üzere hedef kitlenizin bulunduğu tüm platformlarda hizmet veriyoruz.'],
      ['Reklam bütçesi hizmet bedeline dahil mi?', 'Reklam bütçesi platformlara doğrudan ödenir ve hizmet bedelinden ayrıdır; bütçenizi hedeflerinize göre birlikte planlıyoruz.'],
    ],
    blog: /sosyal/,
  },
];

const testimonials = [
  ['Köksal Malkoç', 'E-İmza Müşterisi', 'Firmamızın e-imza süreçleri için Kurucu Bilişim’den destek aldık. Hem hızlı dönüş sağladılar hem de tüm süreci adım adım anlatarak yardımcı oldular. Teknik destek ekibi gerçekten çok ilgili.'],
  ['Kenan Başkan', 'KEP Müşterisi', 'KEP hesabı açtırmak için başvurdum, birkaç saat içinde işlemlerim uzaktan tamamlandı. Bu kadar pratik olacağını düşünmemiştim. Müşteri hizmetleri çok kibar ve çözüm odaklı.'],
  ['Sema Kılıç', 'Web Tasarım Müşterisi', 'Web sitemizi yenileme sürecinde harika bir deneyim yaşadık. Hem şık hem de işlevsel bir tasarım sundular ve tüm süreç boyunca bizimle yakından ilgilendiler.'],
];

const faqs = [
  ['Kurucu Bilişim hangi hizmetleri sunuyor?', 'E-fatura, e-arşiv, e-defter, e-imza, mali mühür, KEP ve e-bordro gibi e-dönüşüm hizmetlerinin yanı sıra web tasarım, e-ticaret, kurumsal tasarım, ERP, CRM ve sosyal medya yönetimi hizmetleri sunuyoruz.'],
  ['E-dönüşüm nedir, hangi işlemleri kapsar?', 'E-dönüşüm, işletmelerin geleneksel kağıt süreçlerini dijital ortama taşımasıdır. E-fatura, e-arşiv, e-defter, e-irsaliye, e-bordro (KEP İK), e-imza, mali mühür ve elektronik belge yönetimi bu kapsamdadır.'],
  ['E-fatura ve e-arşiv sistemine nasıl geçilir?', 'GİB üzerinden mali mühür veya e-imza ile başvuru yapılır, uygun yazılım seçilip entegre edilir, kullanıcı eğitimi ve test faturalarıyla geçiş tamamlanır. Tüm adımları sizin için yönetiyoruz.'],
  ['Mali mühür almak için ne gerekli?', 'Elektronik başvuru, şirket ve yetkili bilgilerinin doğrulanması ve sertifikanın teslim alınıp kurulması gerekir. Başvuru dosyasından kuruluma kadar süreci biz takip ediyoruz.'],
  ['Web tasarım süreci ne kadar sürer?', 'İçeriklerin firma tarafından temin edilmesi durumunda kurumsal web siteleri genellikle 7–14 iş günü içinde tamamlanır: analiz, tasarım, içerik, geliştirme, test ve yayın.'],
  ['E-ticaret sitesi için hangi altyapıları kullanıyorsunuz?', 'IKAS, PlatinMarket, Platin360, IdeaSoft ve Ticimax gibi güçlü altyapılarla çalışıyor; ürün yapınıza ve hedeflerinize göre en uygun olanı birlikte seçiyoruz.'],
  ['Yerinde hizmet veriyor musunuz?', 'Evet. İstanbul’da yerinde kurulum ve destek hizmeti veriyoruz; Türkiye genelinde ise uzaktan bağlantıyla hızlı destek sağlıyoruz.'],
  ['Hizmet sonrası destek nasıl sağlanıyor?', 'Telefon, e-posta, WhatsApp ve uzaktan bağlantı ile destek veriyoruz. Yenileme tarihlerinizi (e-imza, mali mühür vb.) takip ederek sizi önceden bilgilendiriyoruz.'],
];

const process = [
  ['Ücretsiz Analiz', 'İhtiyacınızı dinliyor, mevcut yapınızı inceliyor ve size özel yol haritası çıkarıyoruz.'],
  ['Teklif & Planlama', 'Şeffaf fiyatlandırma, net teslim tarihi ve adım adım uygulama planı sunuyoruz.'],
  ['Kurulum & Entegrasyon', 'Başvuru, kurulum ve entegrasyonları uzman ekibimizle hızla tamamlıyoruz.'],
  ['Eğitim & 7/24 Destek', 'Ekibinizi eğitiyor, yenilemeleri takip ediyor ve her an yanınızda oluyoruz.'],
];

const reasons = [
  ['Uzman Kadro', 'E-dönüşüm ve dijital çözümlerde yılların deneyimine sahip uzman ekip.'],
  ['Güncel Altyapı', 'GİB ve ilgili mevzuatla her zaman uyumlu, güncel teknoloji.'],
  ['Etik Ücret Tarifesi', 'Sürpriz maliyet yok; şeffaf, rekabetçi ve bütçe dostu fiyatlar.'],
  ['Yerinde Hizmet', 'İstanbul’da yerinde kurulum, Türkiye genelinde hızlı uzaktan destek.'],
];

// [dosya, ad, genişlik, yükseklik]
const partners = [
  ['edm', 'EDM Bilişim', 240, 96], ['e-guven', 'E-Güven', 490, 95], ['narbulut', 'Narbulut', 352, 96],
  ['oduyo', 'Oduyo', 306, 96], ['platin360', 'Platin360', 213, 96], ['rotacloud', 'RotaCloud', 503, 59],
];

const references = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,59,60,61,62,63,65,66,67,68];

const webProjects = [
  ['Jetna Sauna', 'jetnasauna.com', 'Kurumsal web sitesi'],
  ['Green Sofa', 'greensofa.com.tr', 'Kurumsal web sitesi'],
];

// Blog kategorileri: slug üzerinden otomatik eşleşir.
const blogCats = [
  ['E-İmza', /e-imza|mersis/], ['Mali Mühür', /mali-muhur/], ['KEP', /kep/],
  ['E-Bordro', /e-bordro/], ['E-Defter', /e-defter/], ['E-Fatura & E-Belge', /e-fatura|e-belge/],
  ['Dijital', /erp|sosyal|web|crm/],
];

// Hizmet sayfalarındaki başvuru formları: yanıtlar bu Google Form'lara gönderilir.
// Soru yapısı src/content/apply-forms.json içindedir; form değişirse: node forms-sync.js
const applyForms = {
  'mali-muhur': { id: '1FAIpQLSd43WD8kFMwGI40Uda5PKBHcofKN26ZFNp4_Nt-opkm_jimxA', first: 'Firma ve yetkili bilgileri' },
  'e-fatura': { id: '1FAIpQLSf-lLhORnPQygsYGYCeMnK2QP-nhfZ-FDi-O1szgzvmCgga3g', first: 'Firma bilgileri' },
  'e-imza': { id: '1FAIpQLSfD2aRO1Py7QNgohgAPWot3e5mOB9U8DDceMaXAyQOo08ClGQ', first: 'Kişisel bilgiler' },
};

// Kampanyalar — bitiş tarihi (bitis) geçenler derlemede otomatik gizlenir.
// ornek: true olan kampanyalar YER TUTUCUDUR: gerçek kampanyalarla değiştirilmeden yayına almayın.
// tema: kartın renk tonu (kirmizi | turuncu | mor | yesil | mavi)
const campaigns = [
  { slug: 'e-imza-mali-muhur-paketi', rozet: '%15 indirim', baslik: 'E-İmza + Mali Mühür Paketi', ozet: 'İkisini birlikte alın, paket fiyatına %15 indirim kazanın. Kurulum ve aktivasyon bizden.', detay: ['E-imza ve mali mühür aynı başvuruda', 'Uzaktan kurulum ve aktivasyon dahil', 'Yenileme hatırlatması ücretsiz'], hizmet: 'e-imza', bitis: '2026-12-31', tema: 'kirmizi' },
  { slug: 'e-fatura-ucretsiz-kurulum', rozet: 'Kurulum ücretsiz', baslik: 'E-Fatura’ya Geçişte Ücretsiz Kurulum', ozet: '2026 geçiş zorunluluğu kapsamındaki işletmelere e-fatura ve e-arşiv kurulumu ücretsiz.', detay: ['GİB başvuru süreci bizden', 'Muhasebe programı entegrasyonu', 'İlk ay ücretsiz destek'], hizmet: 'e-fatura', bitis: '2026-12-31', tema: 'turuncu' },
  { slug: 'kep-ilk-yil', rozet: 'İlk yıl %20', baslik: 'KEP Adresinde İlk Yıl Avantajı', ozet: 'Yeni KEP adresi açtıran işletmelere ilk yıl %20 indirim ve ücretsiz ileti paketi.', detay: ['Aynı gün KEP adresi', '100 ileti hediye', 'E-Bordro ile birlikte kullanım'], hizmet: 'kep-ik', bitis: '2026-11-30', tema: 'mor' },
  { slug: 'web-sitesi-hosting-hediye', rozet: '1 yıl hosting hediye', baslik: 'Kurumsal Web Sitesine 1 Yıl Hosting', ozet: 'Kurumsal web sitesi yaptıranlara 1 yıllık hosting ve SSL sertifikası hediye.', detay: ['Mobil uyumlu, SEO hazır tasarım', 'Alan adı ve SSL kurulumu', '1 yıl hosting dahil'], hizmet: 'web-tasarim', bitis: '2026-12-31', tema: 'mavi' },
  { slug: 'mali-musavir-toplu-basvuru', rozet: 'Mali müşavirlere özel', baslik: 'Toplu E-İmza Başvurusunda Ek İndirim', ozet: 'Müşterileri için 5 ve üzeri e-imza başvurusu yapan mali müşavirlere ek indirim.', detay: ['Tek noktadan toplu başvuru', 'Başvuru takibi sizin yerinize', 'İş ortaklığı avantajları'], hizmet: 'e-imza', bitis: '2027-01-31', tema: 'yesil' },
];

// Mesleğe özel e-imza sayfaları: /e-donusum-hizmetleri/e-imza/<slug>/
// systems: e-imzanın kullanıldığı sistemler (arama terimleri burada geçer), mock: sayfadaki temsilî görsel
const meslekler = [
  {
    slug: 'avukatlar-icin-e-imza', ozet: 'UYAP Avukat Portal, .udf dilekçe imzalama, dava açma ve icra takibi.', icon: 'scales', name: 'Avukatlar', short: 'Avukatlar İçin E-İmza',
    title: 'Avukatlar İçin E-İmza | UYAP E-İmza Başvurusu',
    desc: 'Avukatlar için UYAP uyumlu e-imza: Avukat Portal girişi, dilekçe ve UDF imzalama, icra takibi. İstanbul içi aynı gün kurye ve uzaktan kurulum.',
    h1: 'Avukatlar İçin E-İmza',
    lead: 'UYAP Avukat Portal’a girin, dilekçenizi imzalayıp gönderin, dosyanızı adliyeye gitmeden takip edin. Başvurudan kuruluma kadar her adımda yanınızdayız.',
    intro: [
      'Avukatlık mesleğinde e-imza artık bir tercih değil, günlük işin parçası. UYAP Avukat Portal’a giriş, dava açma, dilekçe ve beyan gönderme, icra takibi başlatma ve dosya inceleme gibi işlemlerin büyük bölümü nitelikli elektronik sertifikayla, yani e-imzayla yapılır.',
      '5070 sayılı Elektronik İmza Kanunu’na göre güvenli elektronik imza, elle atılan imzayla aynı hukuki sonucu doğurur. UYAP Doküman Editörü’nde hazırladığınız .udf belgeleri e-imzanızla imzalayıp saniyeler içinde mahkemeye ulaştırabilirsiniz.',
      'Kurucu Bilişim olarak e-imza başvurunuzu alıyor, kimlik doğrulamasını tamamlıyor, e-imzanızı İstanbul içinde aynı gün, 81 ilde kurye ile ulaştırıyor ve bilgisayarınıza sürücü, Java ve imzalama aracı kurulumunu uzaktan yapıyoruz. UYAP’a ilk girişinizi birlikte yapana kadar destek veriyoruz.',
    ],
    systems: [
      ['UYAP Avukat Portal', 'Portala güvenli giriş, dava dosyalarını görüntüleme, evrak ve dilekçe gönderme.', 'monitor'],
      ['UYAP Doküman Editörü (.udf)', 'Dilekçe, cevap ve beyanlarınızı .udf formatında hazırlayıp e-imzayla imzalama.', 'doc'],
      ['Dava açma ve harç ödeme', 'Adliyeye gitmeden dava açma, harç ve masrafları çevrim içi ödeme.', 'banknote'],
      ['İcra takipleri', 'Elektronik ortamda icra takibi başlatma, talep ve yazışmaları imzalama.', 'layers'],
      ['e-Devlet ve resmi kurumlar', 'Nitelikli sertifikayla e-Devlet’e giriş ve kamu kurumlarına imzalı başvuru.', 'shield'],
      ['Sözleşme ve vekâlet yazışmaları', 'Müvekkil sözleşmeleri ve yazışmaları dijital ortamda güvenle imzalama.', 'pen'],
    ],
    features: ['UYAP Avukat Portal ile tam uyum', '.udf belgelerini imzalama desteği', '1, 2 ve 3 yıllık sertifika seçenekleri', 'İstanbul içi aynı gün, 81 ile kurye', 'Uzaktan sürücü ve Java kurulumu', 'İlk UYAP girişine kadar destek', 'Mobil imza hakkında danışmanlık', 'Süre bitmeden yenileme hatırlatması', 'Büro ve ortaklıklara toplu başvuru'],
    related: ['e-smm', 'kep-ik'],
    mock: { app: 'UYAP Avukat Portal', file: 'Dava dilekçesi.udf', sub: 'Asliye Hukuk Mahkemesine sunulacak', signer: 'Av. Ayşe Yılmaz' },
    faqs: [
      ['Avukatlar UYAP için e-imza mı, mobil imza mı kullanmalı?', 'İkisi de UYAP Avukat Portal’da kullanılabilir. E-imza, bilgisayara takılan bir kart okuyucu veya USB ile çalışır ve operatörden bağımsızdır; mobil imza ise SIM karta tanımlanır. Büroda yoğun evrak imzalıyorsanız e-imza genellikle daha pratiktir; ihtiyacınıza göre birlikte karar verebiliriz.'],
      ['UYAP’ta e-imza ile neler yapabilirim?', 'Avukat Portal’a giriş yapabilir, dava açabilir, dilekçe ve beyan gönderebilir, harç ve masraf ödeyebilir, icra takibi başlatabilir ve dosyalarınızı adliyeye gitmeden inceleyebilirsiniz.'],
      ['UYAP Doküman Editörü’nde .udf dosyasını nasıl imzalarım?', 'E-imzanız ve sürücüleri kurulu olduğunda, editörde hazırladığınız belgeyi imzala seçeneğiyle e-imzanızın PIN’ini girerek imzalarsınız. Kurulumu uzaktan bağlantıyla biz yapıyor, ilk imzanızı birlikte atıyoruz.'],
      ['Stajyer avukatlar e-imza alabilir mi?', 'E-imza kişiye özel nitelikli bir sertifikadır ve T.C. kimlik numarası olan herkes başvurabilir. UYAP’ta hangi işlemleri yapabileceğiniz ise baro kaydınıza ve yetkinize bağlıdır.'],
      ['E-imzam ne kadar sürede elime ulaşır?', 'İstanbul içinde e-imzanızı aynı gün kurye ile teslim ediyoruz; Türkiye’nin 81 iline de kurye ile gönderim yapıyoruz. Teslim süresi kimlik doğrulamanın tamamlanmasına ve bulunduğunuz ile göre değişir.'],
    ],
    blog: /avukat|uyap/,
  },
  {
    slug: 'doktorlar-icin-e-imza', ozet: 'E-reçete, e-rapor, Medula, e-Nabız ve MBYS ile uyumlu e-imza.', icon: 'stethoscope', name: 'Doktorlar', short: 'Doktorlar İçin E-İmza',
    title: 'Doktorlar İçin E-İmza | E-Reçete, E-Rapor, Medula',
    desc: 'Hekimler için e-imza: e-reçete ve e-rapor imzalama, Medula, e-Nabız, MBYS ve HBYS uyumu. Hızlı başvuru, teslimat ve muayenehanede kurulum desteği.',
    h1: 'Doktorlar İçin E-İmza: E-Reçete, E-Rapor ve Medula',
    lead: 'E-reçete ve e-raporlarınızı güvenle imzalayın; Medula, e-Nabız ve muayenehane yazılımınızla (MBYS) sorunsuz çalışan e-imzanızı hızlıca edinin.',
    intro: [
      'Hekimler için e-imza, günlük pratiğin vazgeçilmez bir parçası. SGK Medula sistemi üzerinden yazılan e-reçeteler ve düzenlenen e-raporlar, hekimin nitelikli elektronik sertifikasıyla, yani e-imzasıyla imzalanır.',
      'Muayenehanede MBYS (muayenehane bilgi yönetim sistemi), hastanede HBYS kullanıyor olun; e-Nabız ile entegre çalışan bu yazılımlarda e-reçete ve rapor imzalamak için e-imzanızın bilgisayarınızda doğru tanınması gerekir. Kurulum hatası yüzünden reçete yazamamak, hasta başında en son istenecek şeydir.',
      'Kurucu Bilişim olarak e-imza başvurunuzu alıyor, e-imzanızı İstanbul içinde aynı gün, 81 ilde kurye ile adresinize ulaştırıyor ve sürücü, Java ve imzalama araçlarının kurulumunu uzaktan yapıyoruz. E-imzanızın MBYS veya HBYS yazılımınızda çalıştığını birlikte test ediyoruz.',
    ],
    systems: [
      ['E-Reçete', 'Medula üzerinden yazılan reçeteleri e-imzanızla imzalayıp anında sisteme iletme.', 'receipt'],
      ['E-Rapor', 'İlaç ve sağlık raporlarını elektronik ortamda düzenleyip e-imzayla onaylama.', 'doc'],
      ['Medula', 'SGK Medula sistemindeki reçete ve rapor işlemlerinde hekim imzası.', 'layers'],
      ['e-Nabız', 'e-Nabız ile entegre yazılımlar üzerinden kayıt ve imza süreçleri.', 'monitor'],
      ['MBYS ve HBYS', 'Muayenehane ve hastane bilgi yönetim sistemlerinde e-imza tanıtımı ve kullanımı.', 'grid'],
      ['e-Devlet ve resmi başvurular', 'Nitelikli sertifikayla e-Devlet’e giriş ve kurumlara imzalı başvuru.', 'shield'],
    ],
    features: ['E-reçete ve e-rapor imzalama', 'Medula ile uyumlu kullanım', 'MBYS ve HBYS yazılımlarında test', '1, 2 ve 3 yıllık sertifika seçenekleri', 'İstanbul içi aynı gün, 81 ile kurye', 'Uzaktan sürücü ve Java kurulumu', 'Muayenehane ve klinik için toplu başvuru', 'Süre bitmeden yenileme hatırlatması', 'Serbest meslek için e-SMM desteği'],
    related: ['e-smm', 'e-arsiv-fatura'],
    mock: { app: 'Medula · E-Reçete', file: 'E-Reçete', sub: 'Reçete türü: Normal · 3 kalem', signer: 'Dr. Mehmet Kaya' },
    faqs: [
      ['E-reçete yazmak için e-imza zorunlu mu?', 'E-reçeteler Medula sistemi üzerinden hekimin nitelikli elektronik sertifikasıyla imzalanır. Bu nedenle e-reçete yazan hekimlerin e-imza (veya kurumun desteklediği mobil imza) sahibi olması gerekir.'],
      ['E-imzam MBYS / HBYS yazılımımda çalışmıyor, ne yapmalıyım?', 'Sorun çoğunlukla sürücü, Java sürümü veya imzalama aracı ayarından kaynaklanır. Uzaktan bağlanıp kurulumu kontrol ediyor, e-imzanızın yazılımınızda tanındığını birlikte test ediyoruz.'],
      ['E-rapor düzenlerken e-imza kullanılır mı?', 'Evet. Elektronik ortamda düzenlenen ilaç ve sağlık raporları hekimin e-imzasıyla onaylanır.'],
      ['Muayenehanemdeki birden fazla hekim için başvuru yapabilir misiniz?', 'Evet. E-imza kişiye özel olduğu için her hekim için ayrı başvuru yapılır; klinik ve muayenehaneler için başvuruları toplu olarak yönetiyoruz.'],
    ],
    blog: /e-imza-kullanim|e-imza-nasil|e-imza-basvurusu/,
  },
  {
    slug: 'muhendisler-icin-e-imza', ozet: 'Yapı Denetim Sistemi (YDS), elektronik proje onayı ve EKAP.', icon: 'helmet', name: 'Mühendisler', short: 'Mühendisler İçin E-İmza',
    title: 'Mühendisler İçin E-İmza | YDS ve EKAP E-İmza',
    desc: 'Mühendisler için e-imza: Yapı Denetim Sistemi (YDS), elektronik proje onayı, EKAP ve e-Devlet işlemleri. Hızlı başvuru, teslimat ve uzaktan kurulum.',
    h1: 'Mühendisler İçin E-İmza',
    lead: 'Yapı Denetim Sistemi’ndeki tutanaklardan elektronik proje onayına ve kamu ihalelerine kadar, imza gereken her işi masanızdan güvenle tamamlayın.',
    intro: [
      'Mühendislik işlerinde imza gerektiren belgelerin sayısı her geçen yıl artıyor ve bu belgeler giderek dijital ortama taşınıyor. Yapı denetim süreçleri, elektronik proje başvuruları ve kamu ihaleleri, nitelikli elektronik sertifikayla, yani e-imzayla yürütülen işlerin başında geliyor.',
      'Yapı denetim kuruluşlarında görev yapan mühendisler, Yapı Denetim Sistemi (YDS) üzerindeki tutanak ve raporları e-imzayla imzalar. Proje müellifleri ise birçok belediyenin elektronik proje onay süreçlerinde e-imza kullanır.',
      'Kurucu Bilişim olarak e-imza başvurunuzu alıyor, e-imzanızı İstanbul içinde aynı gün, 81 ilde kurye ile adresinize ulaştırıyor ve kullandığınız sistemlerde çalışacak şekilde uzaktan kuruyoruz. Serbest çalışan mühendisler için e-SMM, şirketler için KEP ve mali mühür süreçlerini de tek noktadan yönetiyoruz.',
    ],
    systems: [
      ['Yapı Denetim Sistemi (YDS)', 'Denetim tutanakları, seviye tespitleri ve raporların e-imzayla imzalanması.', 'layers'],
      ['Elektronik proje onayı', 'Belediyelerin elektronik proje ve ruhsat başvurularında imzalı belge gönderimi.', 'doc'],
      ['EKAP', 'Mühendislik ve müşavirlik ihalelerinde elektronik teklif ve belgeler.', 'briefcase'],
      ['e-Devlet ve kamu kurumları', 'Nitelikli sertifikayla e-Devlet’e giriş ve kurumlara imzalı başvuru.', 'shield'],
      ['Sözleşme ve raporlar', 'Müşteri sözleşmeleri, teknik rapor ve hakedişleri dijital ortamda imzalama.', 'pen'],
      ['MERSİS', 'Şirket ortağı veya yetkilisi olduğunuz firmaların MERSİS işlemleri.', 'monitor'],
    ],
    features: ['YDS işlemleriyle uyumlu kullanım', 'Elektronik proje başvurularında destek', 'EKAP e-teklif hazırlığında destek', '1, 2 ve 3 yıllık sertifika seçenekleri', 'İstanbul içi aynı gün, 81 ile kurye', 'Uzaktan sürücü ve Java kurulumu', 'Büro ve firmalara toplu başvuru', 'Serbest meslek için e-SMM desteği', 'Süre bitmeden yenileme hatırlatması'],
    related: ['e-smm', 'kep-ik'],
    mock: { app: 'Yapı Denetim Sistemi', file: 'Seviye tespit tutanağı', sub: 'Ada 1234 · Parsel 5', signer: 'İnş. Müh. Elif Demir' },
    faqs: [
      ['Yapı Denetim Sistemi (YDS) için e-imza gerekli mi?', 'Yapı denetim kuruluşlarında görev yapan mühendisler, YDS üzerindeki tutanak ve raporları e-imzayla imzalar. Bu nedenle YDS’de işlem yapan mühendislerin e-imza sahibi olması gerekir.'],
      ['Belediyeye elektronik proje başvurusu yaparken e-imza kullanılır mı?', 'Birçok belediye proje ve ruhsat başvurularını elektronik ortamda alıyor ve belgelerin e-imzayla imzalanmasını istiyor. Başvuracağınız belediyenin güncel şartlarını birlikte kontrol edebiliriz.'],
      ['Şirketim adına EKAP’ta teklif verebilir miyim?', 'EKAP’ta elektronik teklif, isteklinin yetkilisinin e-imzasıyla verilir. Firmanız adına teklif verecek kişinin e-imzasının hazır ve kurulu olması gerekir.'],
    ],
    blog: /ekap|e-imza-kullanim|kurumsal-dijitallesmede/,
  },
  {
    slug: 'muteahhitler-icin-e-imza', ozet: 'EKAP e-teklif, YDS, YAMBİS ve MERSİS işlemleri.', icon: 'crane', name: 'Müteahhitler', short: 'Müteahhitler İçin E-İmza',
    title: 'Müteahhitler İçin E-İmza | EKAP E-Teklif ve YDS',
    desc: 'Müteahhitler için e-imza: EKAP e-teklif, Yapı Denetim Sistemi, YAMBİS ve MERSİS işlemleri. E-fatura, KEP ve mali mühürle birlikte tek noktadan hizmet.',
    h1: 'Müteahhitler İçin E-İmza',
    lead: 'Kamu ihalelerinde e-teklif verin, şantiye ve hakediş süreçlerini hızlandırın. E-imza, KEP, e-fatura ve mali mühürü tek noktadan alın.',
    intro: [
      'İnşaat sektöründe kamu ihalelerinden yapı denetimine kadar birçok süreç artık elektronik ortamda yürüyor. EKAP üzerinden verilen e-teklifler, firmanın yetkilisinin nitelikli elektronik sertifikasıyla, yani e-imzasıyla imzalanır.',
      'Yapı Denetim Sistemi (YDS), müteahhitlik yetki belgesi süreçlerinin yürütüldüğü YAMBİS ve şirket işlemleri için MERSİS, müteahhitlerin düzenli kullandığı sistemlerin başında geliyor. Resmi yazışmalar için KEP, faturalandırma için e-fatura ve mali mühür de aynı sürecin parçası.',
      'Kurucu Bilişim olarak firma yetkilileriniz için e-imza başvurularını yönetiyor, kurulumları uzaktan yapıyor ve ihale öncesinde e-imzanızın EKAP’ta sorunsuz çalıştığını birlikte kontrol ediyoruz.',
    ],
    systems: [
      ['EKAP e-teklif', 'Kamu ihalelerinde elektronik teklif ve belgelerin e-imzayla imzalanması.', 'briefcase'],
      ['Yapı Denetim Sistemi (YDS)', 'Yapı denetim süreçlerinde müteahhit işlemleri ve belgeler.', 'layers'],
      ['YAMBİS', 'Müteahhitlik yetki belgesi ve iş deneyim süreçlerinin dijital ortamda yürütülmesi.', 'doc'],
      ['MERSİS', 'Şirket kuruluşu, değişiklik ve onay işlemlerinde yetkili imzası.', 'monitor'],
      ['KEP ile resmi yazışma', 'İdare ve kurumlarla yazışmalarınızı hukuken geçerli şekilde iletme.', 'mail'],
      ['E-fatura ve hakediş', 'Hakediş faturalarını e-fatura ve mali mühürle düzenleme.', 'receipt'],
    ],
    features: ['EKAP e-teklif hazırlığında destek', 'Firma yetkilileri için toplu başvuru', 'İhale öncesi kurulum kontrolü', '1, 2 ve 3 yıllık sertifika seçenekleri', 'İstanbul içi aynı gün, 81 ile kurye', 'Uzaktan sürücü ve Java kurulumu', 'KEP, e-fatura ve mali mühür tek noktadan', 'MERSİS işlemleri için destek', 'Süre bitmeden yenileme hatırlatması'],
    related: ['kep-ik', 'mali-muhur', 'e-fatura'],
    mock: { app: 'EKAP · E-Teklif', file: 'Teklif mektubu', sub: 'İhale kayıt no: 2026/123456', signer: 'Yılmaz Yapı İnş. Ltd. Şti.' },
    faqs: [
      ['EKAP’ta e-teklif vermek için e-imza gerekli mi?', 'Evet. EKAP üzerinden verilen elektronik teklifler, isteklinin yetkilisinin e-imzasıyla imzalanır. İhale tarihinden önce e-imzanızın hazır ve kurulu olduğundan emin olun.'],
      ['İhale günü e-imzam çalışmazsa ne olur?', 'Teklifinizi zamanında imzalayamazsanız ihaleye katılamayabilirsiniz. Bu yüzden ihaleden önce e-imzanızı EKAP’ta birlikte test etmenizi öneriyoruz; uzaktan bağlantıyla kontrol ediyoruz.'],
      ['Firmamızın birden fazla yetkilisi için e-imza alabilir miyiz?', 'Evet. E-imza kişiye özel olduğu için her yetkili için ayrı başvuru yapılır; firmanız için başvuruları toplu olarak yönetiyoruz.'],
      ['Mali mühür ile e-imza arasındaki fark nedir?', 'E-imza kişiye, mali mühür ise şirkete aittir. E-imza yetkilinin kişisel imzası yerine geçerken, mali mühür e-fatura ve e-defter gibi belgelerde şirketin elektronik mührü olarak kullanılır.'],
    ],
    blog: /ekap|mali-muhur-ve-ihale|mali-muhur-ve-kamu-ihale/,
  },
];

module.exports = { meslekler, campaigns, applyForms, site, groups, services, testimonials, faqs, process, reasons, partners, references, webProjects, blogCats };
