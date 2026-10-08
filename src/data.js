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
    { value: 1500, suffix: '+', label: 'Mutlu Müşteri' },
    { value: 120, suffix: '+', label: 'Tamamlanan Proje' },
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
    title: 'E-Dönüşüm Hizmetleri | E-Fatura, E-İmza, Mali Mühür, KEP, E-Defter',
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
    title: 'E-Fatura Başvurusu ve Geçiş Çözümleri | Kurucu Bilişim',
    desc: 'GİB standartlarına tam uyumlu e-fatura geçişinizi hızlıca tamamlayın. Muhasebe ve ERP entegrasyonu, bulut arşiv ve 7/24 destek Kurucu Bilişim’de.',
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
    title: 'E-Adisyon Çözümü | Restoran ve Kafe Sistemleri | Kurucu Bilişim',
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
    title: 'E-Bilet Hizmeti | Ulaşım ve Etkinlik Çözümleri | Kurucu Bilişim',
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
    title: 'E-İmza Başvurusu ve Kurulumu | Hızlı Teslim | Kurucu Bilişim',
    desc: 'Yasal geçerliliği olan nitelikli e-imzanızı hızlıca alın. Başvuru, kimlik doğrulama, teslimat ve kurulum desteği Kurucu Bilişim’de.',
    h1: 'E-İmza Başvurusu, Teslimatı ve Kurulumu',
    lead: '5070 sayılı Elektronik İmza Kanunu kapsamında ıslak imza ile aynı hukuki geçerliliğe sahip nitelikli e-imzanızı hızlı, kolay ve uygun fiyatla edinin.',
    intro: [
      'E-imza; MERSİS, e-Devlet, UYAP, EKAP, SGK ve ticaret sicili gibi birçok resmi platformda işlem yapmanızı, belgelerinizi dijital ortamda güvenle imzalamanızı sağlar. Kağıt israfını ortadan kaldırarak zaman ve maliyetten tasarruf ettirir.',
      'Başvuru formunun doldurulmasından kimlik doğrulamaya, kargo ile teslimattan bilgisayarınıza sürücü ve Java kurulumuna kadar her adımda yanınızdayız. Farklı süre seçenekleriyle bütçenize uygun paketler sunuyoruz.',
    ],
    highlights: [
      ['Hızlı ve Kolay Başvuru', 'Başvurunuzu kısa sürede tamamlıyor, e-imzanızı hızla teslim ediyoruz.'],
      ['Uygun Fiyatlı Paketler', '1, 2 ve 3 yıllık esnek süre seçenekleri.'],
      ['Kurulum Desteği', 'Uzaktan bağlantıyla sürücü ve uygulama kurulumunu biz yapıyoruz.'],
    ],
    features: ['Yasal geçerlilik ve güvence', 'Hızlı ve kolay başvuru', 'Şifrelenmiş güvenli teknoloji', 'MERSİS, UYAP, EKAP kullanımı', 'Uygun fiyatlı paketler', 'Uzaktan kurulum desteği', 'Kolay yenileme', 'Kağıtsız, çevre dostu işlemler', 'Kurumsal ve bireysel çözümler'],
    faqs: [
      ['E-imza ıslak imza ile aynı geçerliliğe sahip mi?', 'Evet. 5070 sayılı Elektronik İmza Kanunu’na göre güvenli elektronik imza, elle atılan imza ile aynı hukuki sonucu doğurur.'],
      ['E-imza başvurusu için hangi belgeler gerekir?', 'Bireysel başvurularda kimlik kartı yeterlidir; kurumsal kullanımda kurum bilgileri de istenebilir. Süreci sizin için adım adım yönetiyoruz.'],
      ['MERSİS işlemleri için e-imza zorunlu mu?', 'MERSİS üzerinden yapılan birçok başvuru ve onay işlemi için şirket yetkililerinin e-imzası gerekmektedir. Detaylar için blog yazımıza göz atabilirsiniz.'],
    ],
    blog: /e-imza|mersis/,
  },
  {
    group: 'e-donusum-hizmetleri', category: 'guvenlik', slug: 'mali-muhur', icon: 'seal',
    name: 'Mali Mühür', short: 'Mali Mühür',
    title: 'Mali Mühür Başvurusu ve Kurulumu | Kurucu Bilişim',
    desc: 'E-fatura, e-arşiv ve e-defter için gerekli mali mühür sertifikanızı hızlıca alın. Başvuru, teslimat, kurulum ve yenileme desteği.',
    h1: 'Mali Mühür Başvurusu ve Kurulumu',
    lead: 'Tüzel kişiliğinizin dijital kimliği olan mali mühür ile e-fatura, e-arşiv ve e-defter işlemlerinizi yasal geçerlilikle, güvenle gerçekleştirin.',
    intro: [
      'Mali mühür, kurumların e-dönüşüm uygulamalarında kullandığı ve TÜBİTAK Kamu Sertifikasyon Merkezi tarafından üretilen elektronik sertifikadır. E-fatura, e-arşiv ve e-defter gibi uygulamalarda belgelerin kurumunuz tarafından oluşturulduğunu ve değiştirilmediğini garanti eder.',
      'Başvuru dosyanızın hazırlanmasından onay sürecinin takibine, teslimattan kurulum ve yenilemeye kadar tüm süreci hızlı ve hatasız şekilde yönetiyoruz.',
    ],
    highlights: [
      ['Hızlı Başvuru Süreci', 'Başvurunuzu hızlıca tamamlıyor, onay sürecini sizin yerinize takip ediyoruz.'],
      ['Ekonomik Paketler', 'Uzun süreli kullanım avantajı sunan uygun fiyatlı seçenekler.'],
      ['Hızlı Teslimat', 'Mali mührünüzü en kısa sürede elinize ulaştırıyoruz.'],
    ],
    features: ['Yasal geçerlilik', 'Hızlı başvuru süreci', 'Şifrelenmiş veri koruma', 'E-fatura ve e-defter uyumu', 'Kurumsal çözümler', 'Teknik destek ve danışmanlık', 'Hızlı yenileme', 'Kolay kurulum', 'Uygun fiyat'],
    faqs: [
      ['Mali mühür ile e-imza arasındaki fark nedir?', 'E-imza gerçek kişiye, mali mühür ise tüzel kişiliğe (şirkete) aittir. Mali mühür e-fatura, e-arşiv ve e-defter gibi uygulamalarda şirket adına kullanılır.'],
      ['Mali mühür almak için ne gerekir?', 'Elektronik başvurunun yapılması, şirket bilgilerinin ve yetkili kişi bilgilerinin doğrulanması gerekir. Gerekli belgeleri ve adımları sizin için hazırlıyoruz.'],
      ['Mali mühür ne kadar süre geçerlidir?', 'Sertifikalar seçilen pakete göre belirli bir süre geçerlidir; süre bitmeden yenileme yapılması gerekir. Yenileme tarihlerinizi takip ederek sizi önceden bilgilendiriyoruz.'],
    ],
    blog: /mali-muhur/,
  },
  {
    group: 'e-donusum-hizmetleri', category: 'guvenlik', slug: 'kep-ik', icon: 'mail',
    name: 'KEP (Kayıtlı Elektronik Posta) ve E-Bordro', short: 'KEP & E-Bordro',
    title: 'KEP ve E-Bordro (KEP İK) Hizmeti | Kurucu Bilişim',
    desc: 'Kayıtlı Elektronik Posta (KEP) adresi edinin, bordrolarınızı KEP İK ile yasal geçerlilikle dijital olarak gönderin ve arşivleyin.',
    h1: 'KEP (Kayıtlı Elektronik Posta) ve E-Bordro',
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
      ['KEP adresi kimler için zorunludur?', 'Türk Ticaret Kanunu kapsamında anonim, limited ve sermayesi paylara bölünmüş komandit şirketlerin KEP adresi edinmesi gerekmektedir. Şahıs işletmeleri ve bireyler de isteğe bağlı olarak KEP adresi alabilir.'],
      ['E-bordro yasal olarak geçerli mi?', 'Evet. KEP üzerinden ve elektronik imza ile gönderilen bordrolar yasal geçerliliğe sahiptir ve kağıt bordronun yerini alabilir.'],
      ['KEP hesabı ne kadar sürede açılır?', 'Gerekli bilgiler tamamlandıktan sonra KEP hesabınız çoğunlukla aynı gün içinde, uzaktan işlemlerle aktif edilir.'],
    ],
    blog: /kep|e-bordro/,
  },
  {
    group: 'e-donusum-hizmetleri', category: 'guvenlik', slug: 'e-donusum-entegrasyonu', icon: 'sync',
    name: 'E-Dönüşüm Entegrasyonu', short: 'E-Dönüşüm Entegrasyonu',
    title: 'E-Dönüşüm Entegrasyonu | ERP, Muhasebe ve E-Ticaret | Kurucu Bilişim',
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
    title: 'E-Ticaret Sitesi Kurulumu | IKAS, Ticimax, IdeaSoft | Kurucu Bilişim',
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
  ['Glowix Cosmetics', 'glowixcosmetics.com', 'E-ticaret web sitesi'],
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

module.exports = { applyForms, site, groups, services, testimonials, faqs, process, reasons, partners, references, webProjects, blogCats };
