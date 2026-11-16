// Bilgi Bankası makaleleri için Google sonuç başlığı ve açıklaması (SERP snippet).
// { slug: [başlık (≤60 karakter), açıklama (≤155 karakter, tam cümleyle biter)] }
// Makalenin kendi H1 başlığı ve özeti (lead) değişmez; yalnızca <title> ve meta description etkilenir.
// KEP İK ve entegrasyon makaleleri patron tarafından yazıldığı için bilerek burada yok.
module.exports = {
  // ---- Mali mühür ----
  'mali-muhur-rehberi': ['Mali Mühür Nedir, Nasıl Alınır? Başvuru ve Kurulum', 'Mali mühür nedir, kimler almalı, nasıl alınır? E-fatura, e-defter ve e-irsaliye için şirket adına imza atan sertifikanın başvuru ve kurulum adımları.'],
  'mali-muhur-pin-sifresi-nasil-olusturulur': ['Mali Mühür Şifre (PIN) Oluşturma ve Kilit Çözme', 'Mali mühür şifresi (PIN) nasıl oluşturulur? Kamu SM Online İşlemler’de PIN oluşturma ve kilit çözme adımları; PUK ile işlem yapmayın uyarısı.'],
  'mali-muhur-kurulumu-ve-aktivasyonu': ['Mali Mühür Kurulumu ve Aktivasyonu Nasıl Yapılır?', 'Mali mühür kurulumu: kartı okuyucuya takın, Kamu SM sürücülerini kurun, Online İşlemler’den PIN oluşturun. Başvuru ve ödeme takibi de içinde.'],
  'mali-muhur-yenileme-nasil-yapilir': ['Mali Mühür Yenileme Nasıl Yapılır? Kamu SM Süreci', 'Mali mühür 3 yıl geçerlidir. Kamu SM’ye göre yenileme yeni başvuruyla yapılır; hatırlatma e-postaları, ödeme ve süresi dolarsa neler olduğunu anlattık.'],
  // ---- E-imza ----
  'e-imza-rehberi': ['E-İmza Nedir, Nasıl Alınır? Belgeler ve Kullanım Alanları', 'E-imza nedir, nasıl alınır? 5070 sayılı Kanun’a göre ıslak imzayla aynı hukuki sonucu doğurur. Gerekli belgeleri ve kullanım alanlarını anlattık.'],
  'e-imza-kurulumu-nasil-yapilir': ['E-İmza Kurulumu Nasıl Yapılır? Sağlayıcıya Göre Rehber', 'E-imza kurulumu için kart okuyucu sürücüsü ve imza uygulaması kurulur. TÜRKTRUST, E-Güven, E-Tuğra ve diğer sağlayıcıların resmî kurulum sayfaları içinde.'],
  'e-imza-nasil-atilir': ['E-İmza Nasıl Atılır? Belge İmzalama Adım Adım', 'E-imza atmak için kartınızı takıp imza uygulamasında belgeyi seçip PIN’inizi girmeniz yeterlidir. İmzalı dosyayı gönderme ve sık hataları anlattık.'],
  'e-imza-aktivasyonu-ve-gerekli-programlar': ['E-İmza İlk Aktivasyon ve Gerekli Programlar', 'E-imzanız elinize ulaşınca önce ilk aktivasyon yapılır, sonra kart okuyucu sürücüsü ve imza uygulaması kurulur. Gereken her şeyi tek listede topladık.'],
  'e-imza-sifresi-pin-degistirme-ve-kilit-cozme': ['E-İmza PIN (Şifre) Değiştirme ve Kilit Açma Rehberi', 'E-imza PIN’inizi imza uygulamasından değiştirebilirsiniz. Üst üste hatalı girişte kart kilitlenir; kilidi açmak için PUK veya sağlayıcı desteği gerekir.'],
  'e-imza-yenileme-nasil-yapilir': ['E-İmza Yenileme: Süresi Dolan E-İmza Nasıl Yenilenir?', 'E-imza süresi dolmadan yenilenirse işlemleriniz aksamaz. Ne zaman yenilemeniz gerektiğini, süresi dolarsa ne olacağını ve yenileme adımlarını anlattık.'],
  'e-imza-fiyati-neye-gore-degisir': ['E-İmza Fiyatı Neye Göre Değişir? Ücreti Belirleyen 5 Etken', 'E-imza ücreti; süreye, yeni başvuru ya da yenilemeye, kart okuyucu ihtiyacına ve teslimat şekline göre değişir. Doğru teklif için bilmeniz gerekenler.'],
  'e-devlete-e-imza-ile-giris-nasil-yapilir': ['E-Devlet’e E-İmza ile Giriş: Adım Adım ve Hata Çözümleri', 'E-Devlet’e e-imza ile giriş: e-İmza seçeneğini seçin, uygulamayı açıp işlem kodunu girin, sertifikanızı seçip PIN’le tamamlayın. Hata çözümleri içinde.'],
  'adalet-e-imza-client-hatasi': ['“Adalet E-İmza Client Bulunamadı” Hatası Çözümü', 'UYAP’ta “Adalet E-İmza Client Uygulaması Bulunamadı” hatası çoğu zaman tarayıcı iznindendir. Chrome’da “İzni sıfırla” ve kurulum kontrolleri adım adım.'],
  // ---- KEP ----
  'kep-rehberi': ['KEP Nedir? Kayıtlı Elektronik Posta Rehberi (2026)', 'KEP (Kayıtlı Elektronik Posta) gönderim ve teslim anını hukuken kanıtlar. Ne işe yarar, kimler kullanır, KEP adresi nasıl alınır? Rehberimizde.'],
  'kep-adresi-nasil-alinir': ['KEP Adresi Nasıl Alınır? Online Başvuru Adımları', 'Kurucu Bilişim ile KEP adresi başvurusu tamamen online: NFC ile kimlik doğrulama ve e-Devlet onayı sonrası dakikalar içinde hesap açılır.'],
  'kep-adresi-sorgulama': ['KEP Adresi Sorgulama: Firmanın KEP Adresi Nasıl Öğrenilir?', 'Firmanın KEP adresi, kendi KEP hesabınızla hizmet aldığınız sağlayıcının rehber sorgusundan öğrenilir. Şirketler rehberde yer alır, bireyler izinle.'],
  'kep-adresi-hs01-hs03-ne-demek': ['KEP Adresindeki hs01, hs03 Ne Demek? KEP Uzantıları', 'hs01 PTT’ye, hs03 TÜRKKEP’e aittir. KEP adresindeki uzantılar sağlayıcıyı gösterir. BTK listesine göre 8 sağlayıcı faaliyette; hs04 ve hs08 kapandı.'],
  'e-bordro-rehberi': ['E-Bordro Nedir? KEP ile Elektronik Bordro Gönderimi', 'E-bordro nedir? Ücret hesap pusulasının elektronik hazırlanıp KEP ile gönderilmesini, hukuki çerçevesini ve işletmenize sağladıklarını anlattık.'],
  // ---- E-fatura / e-arşiv / e-irsaliye / e-defter ----
  'e-fatura-rehberi': ['E-Fatura Nedir? Kimler Geçmek Zorunda? Başvuru (2026)', 'E-fatura nedir, kimler geçmek zorunda, nasıl başvurulur? GİB sistemine kayıtlı mükellefler arasında düzenlenen yasal faturanın adımlarını anlattık.'],
  'e-fatura-nasil-iptal-edilir': ['E-Fatura Nasıl İptal Edilir? 8 Günlük Süre ve Adımlar', 'E-fatura alıcıya iletildiği tarihten itibaren 8 gün içinde iptal edilir: ticari faturada “ret” yanıtıyla, temel faturada GİB iptal portalıyla. Adımlar içinde.'],
  'e-fatura-mukellefi-sorgulama': ['E-Fatura Mükellefi Sorgulama Nasıl Yapılır? GİB Listesi', 'Fatura keseceğiniz firma e-fatura mükellefi mi? GİB kayıtlı kullanıcılar listesinden VKN veya TCKN ile ücretsiz sorgulayın, doğru belgeyi düzenleyin.'],
  'e-fatura-portal-giris': ['GİB E-Fatura Portalı Girişi Nasıl Yapılır?', 'GİB e-Fatura Portalı’na e-imza veya mali mühürle girilir; 32 bit Java ya da imzalama aracı gerekir. Chrome sorunu ve entegratör farkı rehberde.'],
  'e-arsiv-fatura-rehberi': ['E-Arşiv Fatura Nedir? Kimlere Kesilir, E-Faturadan Farkı', 'E-arşiv fatura nedir, kimlere kesilir? E-faturadan farkını, nasıl çalıştığını, iptal ve raporlama kurallarını adım adım anlattık.'],
  'e-arsiv-fatura-iptali': ['E-Arşiv Fatura İptali Nasıl Yapılır? 8 Gün Kuralı', 'E-arşiv fatura alıcıya iletildiği tarihten itibaren 8 gün içinde iptal edilir. GİB Portal veya özel entegratörün “İptal Raporu” ile talep oluşturma adımları.'],
  'e-arsiv-portal-giris-ve-fatura-sorgulama': ['E-Arşiv Portal Girişi ve Fatura Sorgulama Rehberi', 'GİB e-Arşiv Portal’a mali mühürle veya interaktif şifreyle giriş yapılır. Size kesilen e-arşiv faturayı VKN, fatura no ve ödenecek tutarla sorgulayın.'],
  'e-irsaliye-rehberi': ['E-İrsaliye Nedir? Kimler Geçmek Zorunda? (2026)', 'E-irsaliye nedir, kimler geçmek zorunda, nasıl düzenlenir? Sevk irsaliyesinin GİB üzerinden iletilmesini ve yol denetimini anlattık.'],
  'e-defter-rehberi': ['E-Defter Nedir? Kimler Zorunlu, Berat Nasıl Yüklenir?', 'E-defter nedir, kimler için zorunlu? Yevmiye ve defter-i kebirin elektronik tutulması, berat yükleme süreci ve saklama yükümlülüğünü anlattık.'],
  'e-defter-berat-yukleme-sureleri-2026': ['E-Defter Gönderme ve Berat Yükleme Süreleri 2026', 'E-defter ve berat dosyaları, ilgili ayı izleyen 4. ayın 10’una (gelir vergisi) veya 14’üne (diğer mükellefler) kadar yüklenir. 2026 örnek takvimi içinde.'],
  'e-defter-giris-ve-goruntuleyici': ['E-Defter Girişi ve E-Defter Görüntüleyici Kullanımı', 'E-Defter Uygulaması’na e-imza, mali mühür veya Dijital Vergi Dairesi ile girilir. GİB’in ücretsiz e-Defter Görüntüleyici sürümleri ve kullanımı rehberde.'],
  'e-adisyon-rehberi': ['E-Adisyon Nedir? Restoran ve Kafeler İçin Rehber', 'E-adisyon nedir? Restoran ve kafelerde siparişlerin anında elektronik adisyonla belgelenmesini, kapsamını ve geçiş adımlarını anlattık.'],
  // ---- Mevzuat ----
  'e-donusum-son-tarihler-takvimi': ['E-Dönüşüm Son Tarihler Takvimi 2026–2027', 'E-tebligat, e-arşiv, e-fatura ve e-irsaliye için yaklaşan zorunluluk tarihleri tek tabloda. Yeni düzenlemelerle güncellenir; kimin ne zaman geçeceğini görün.'],
  'sermaye-artirimi-suresi-uzatildi-2027': ['Sermaye Artırımı Süresi 31 Aralık 2027’ye Uzatıldı', 'Resmî Gazete’de 17 Ekim 2026’da yayımlanan tebliğle asgari sermaye artırım süresi 31 Aralık 2027’ye uzatıldı. A.Ş. ve Ltd. şirketleri ne yapmalı?'],
  'toplu-sms-e-imza-zorunlulugu-btk': ['Toplu SMS İçin E-İmza Zorunluluğu: BTK Kararı', 'BTK’nın 2025/DK-YED/399 sayılı kararıyla 1 Nisan 2026’dan itibaren toplu SMS ve MMS panellerine güvenli e-imzayla giriş zorunlu. Yapılacaklar rehberde.'],
  'basit-usul-e-arsiv-zorunlulugu-2027-vuk-589': ['Basit Usulde E-Arşiv Zorunluluğu 2027’ye Ertelendi', 'VUK 589 ile basit usul ve işletme hesabı mükelleflerinde tutarına bakılmaksızın e-arşiv fatura zorunluluğu 1 Ocak 2027’ye ertelendi. Kimleri etkiliyor?'],
  'e-tebligat-zorunlulugu-vuk-596': ['E-Tebligat Zorunluluğu 2026: VUK 596 ve Son Tarih', 'VUK 596 Sıra No’lu Tebliğ (RG 11.10.2026) ile e-tebligat kuralları yenilendi. Kapsamdaki mükellefler Kasım 2026 sonuna kadar sisteme dahil olmalı.'],
  'yeni-nesil-okc-ile-e-belge-vuk-593': ['Yeni Nesil ÖKC ile E-Belge: VUK 593 Sıra No’lu Tebliğ', '8 Mayıs 2026 tarihli VUK 593 Sıra No’lu Tebliğ ile yeni nesil ödeme kaydedici cihazlardan (YN ÖKC) e-belge düzenlenmesinin yolu açıldı. Neler değişti?'],
  // ---- Trend rehberleri (12.11.2026) ----
  'e-fatura-goruntuleyici': ['E-Fatura Görüntüleyici: XML Fatura Açma ve Doğrulama', 'GİB E-Fatura Görüntüleyici ile XML e-faturayı açın, mali mühür imzasını doğrulayın ve faturanın GİB’den geçip geçmediğini sorgulayın.'],
  'akis-kart-izleme-araci': ['AKİS Kart İzleme Aracı Nedir, Nasıl Kullanılır?', 'AKİS Kart İzleme Aracı kartı, sertifikaları ve PIN durumunu gösterir. Kamu SM’den kurulum, kart görünmüyor ve PIN kilitlendi çözümleri.'],
  'sgk-e-tebligat-sorgulama-ve-basvuru': ['SGK E-Tebligat Sorgulama ve Başvuru: Adım Adım', 'SGK e-tebligat e-Devlet’ten nasıl sorgulanır, kimler başvurmak zorunda? 5510 kapsamındaki işverenler için başvuru türleri, süreler ve yetki verme.'],
  'mali-musavir-yazilimina-fis-aktarimi': ['Muhasebe Fiş Aktarımı: Luca, Zirve, Orka, GMS.Net', 'İşteSmm ile e-fatura portallarındaki faturalar muhasebe fişine dönüşür ve Luca, Zirve, Orka, Mikrokom GMS.Net veya Dia yazılımına otomatik aktarılır.'],
};
