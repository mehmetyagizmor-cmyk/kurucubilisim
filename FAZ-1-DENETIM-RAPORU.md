# Faz 1 — kurucubilisim.com Denetim Raporu

**Tarih:** 4 Ekim 2026 · **Altyapı:** WordPress + Avada teması + Yoast SEO + LiteSpeed Cache (CDN: hcdn)

## Özet

Site görsel olarak hazır bir Avada şablonu üzerine kurulmuş. Yoast SEO kurulu ve başlıklar büyük ölçüde iyi yazılmış. Buna karşın şablondan kalan **demo içerikler, çift etiketler, bozuk formlar ve yavaş sunucu yanıtı** hem Google sıralamasını hem müşteri dönüşümünü olumsuz etkiliyor.

| Alan | Puan | Not |
|---|---|---|
| Teknik SEO | 4/10 | Her sayfada 2 H1, 2 meta açıklama; demo sayfalar indekste |
| İçerik | 5/10 | Hizmet metinleri benzer ve kısa; aynı yorumlar her sayfada tekrarlanıyor |
| Yerel SEO / Haritalar | 4/10 | Google Haritalar kaydı var ama sitede schema yok, adresler çelişiyor |
| Performans | 3/10 | Sunucu yanıtı (TTFB) 1,5–24 sn; sayfa HTML'i ~300 KB, 21 script |
| Dönüşüm (form/CTA) | 3/10 | Başvuru formlarında doldurulamayan zorunlu İngilizce alan var |
| Güvenlik / KVKK | 5/10 | Çerez onayı yok, güvenlik başlıkları eksik |

---

## 1. Site haritaları (sitemap) — kritik

`sitemap_index.xml` içinde 11 alt harita var. Google'a gönderilen bu haritalarda **gerçek olmayan veya değersiz sayfalar** bulunuyor:

| Harita | Sorun | Yapılacak |
|---|---|---|
| `avada_faq-sitemap.xml` | 9 adet **İngilizce demo SSS** sayfası (ör. *how-can-i-secure-funding-for-my-startup*) | Kaldır, 301 → `/sikca-sorulan-sorular/` |
| `fusion_tb_category`, `element_category` | Avada sayfa oluşturucusunun iç kategorileri (header, footer, mega_menus…) | Kaldır, 410 |
| `portfolio_category`, `portfolio_tags` | Demo etiketler (*business-finance*, *investment*) | Kaldır, 410 |
| `author-sitemap.xml` | Yazar sayfaları e-posta adresini ifşa ediyor (`infokurucubilisim-com`, `aliuzayweb-com`) | Kaldır, 301 → Hakkımızda |
| `page-sitemap.xml` | 3 teşekkür sayfası ve `privacy-policy` (WordPress varsayılanı) indekslenebilir | Teşekkür sayfalarına `noindex`, privacy-policy → KVKK |
| `post-sitemap.xml` | `kep-kayitli-elektronik-posta-nedir-cloned` → kopyalanmış yazı, içeriği "Mali Mühür Nedir?" | 301 → asıl mali mühür yazısı |

## 2. Google Haritalar / Yerel SEO

- Google İşletme kaydı **mevcut** (kategori: *Bilgisayar destek ve hizmetleri*, konum: Quasar İstanbul, Şişli).
- Markayla yapılan aramada ("Kurucu Bilişim Şişli Quasar") web sonuçlarında site çıkmıyor; yerel görünürlük zayıf.
- **Adres tutarsızlığı (NAP):** İletişim sayfasında *Fulya Mah. Büyükdere Cad. Quasar İstanbul No:76, Şişli*, KVKK metninde ise *Seyyid Ömer Mah. Lalezar Camii Sk. No:26, Fatih* yazıyor. Google bu çelişkiyi güven kaybı olarak değerlendirir. **Hangisinin resmi adres olduğu patrondan teyit edilmeli.**
- Sitede **LocalBusiness / Organization schema'sında adres, telefon ve koordinat yok**. Yoast yalnızca isim ve logo veriyor.
- İletişim sayfasında harita gömülü değil; yalnızca "Yol Tarifi Al" linki var.
- Çalışma saatleri hiçbir yerde belirtilmemiş. Sitede yalnızca "7/24 hizmet" yazıyor.
- Google İşletme Profili için öneriler: hizmet listesi, fotoğraflar, düzenli gönderi, müşterilerden yorum isteme. Yorum toplama için sitede bir link de konulacak.

## 3. Teknik SEO hataları

1. **Her sayfada 2 adet `<meta name="description">`**: biri Yoast'tan, diğeri Avada'dan. Ana sayfadaki ikinci açıklama İngilizce demo metni: *"Dynamic prebuilt business website built with Avada…"*. OG etiketleri de çift ve birbiriyle çelişiyor.
2. **Her sayfada en az 2 H1**, ana sayfada 4 H1.
3. **E-Defter sayfasının title/description'ı E-İmza sayfasından kopyalanmış:** "E-İmza Çözümleri | Kurucu Bilişim ile Güvenli Dijital İmzalar".
4. **Bozuk blog başlığı:** `/e-imza-nedir/` → "MERSİS’te E-İmza ZorunluluğE-İmza Nedir?u".
5. Bazı blog başlıklarının başında gereksiz "KURUCU" ön eki var.
6. **Kelime yamyamlığı (cannibalization):** 9 ayrı "Mali Mühür …" yazısı ve 2 ayrı "Mali Mühür Nedir?" yazısı aynı sorgu için birbiriyle yarışıyor.
7. İstatistik sayaçları HTML'de **"0"** olarak duruyor; değerler yalnızca JavaScript ile yükleniyor. Google ve önizlemeler "0 Yıl Tecrübe, 0 Müşteri" görüyor.
8. 14 görselin 7'sinde `alt` metni yok. Görsel dosya adları anlamsız ("Adsiz-tasarim-41.jpg").
9. Banka Hesap Bilgilerimiz, Başvuru Formu ve İş Ortağı sayfalarında meta açıklama yok. Banka sayfasının içeriği **tamamen boş**.
10. Hizmet sayfalarında Service ve FAQPage schema'sı yok. SSS sayfasında FAQ schema'sı yok.
11. Footer'da yazım hatası var: "CRM Yazılımlar**mı**". Sayfanın altında İngilizce demo metni duruyor: *"looking for a reliable partner in business?"*
12. KVKK metninde **çalışmayan link** var: `/Kurumsal/kurumsal-politikalarimiz` (404).
13. **22 blog yazısının meta açıklaması birebir aynı:** "KURUCU Bilişim ile E-Defter: Dijital Muhasebeye Geçişin Akıllı Yolu". 5 yazıda da başka bir yazının açıklaması kullanılmış. Google bu açıklamaları yok sayar ve yazılar arama sonuçlarında birbirinden ayırt edilemez. *(Faz 3'te tespit edildi; yeni sitede her yazıya kendi içeriğinden benzersiz açıklama üretiliyor.)*

## 4. Dönüşüm (form ve CTA) — kritik

- **Başvuru Formu** ve **İş Ortağı Başvurusu** formlarında demo şablondan kalma İngilizce alanlar var: *"How many items do you wish to return? \*"* (zorunlu) ve *"When did you purchase the items?"*. Zorunlu alan anlamsız olduğu için **müşteriler formu gönderemiyor veya kafası karışıyor**. Bu, doğrudan müşteri kaybı demek.
- Başvuru formunda ürün listesi iki kez tekrarlanıyor.
- Hizmet sayfalarındaki "Hemen Başvur" kutusunda "Bizimle çalışmak için … **güçlü ekibimize katılın!**" yazıyor. Müşteri teklif almak isterken metin iş başvurusu çağrısı yapıyor.
- E-İmza sayfasında yanlış metin var: "Anahtar teslim, hızlı ve modern **web tasarım** hizmetleri!"
- WhatsApp hattı ve hızlı arama butonu yok. Mobilde sabit iletişim çubuğu da yok.
- Referanslar sayfasındaki 65 logonun hiçbirinde firma adı veya alt metin yok.

## 5. Performans

- Sunucu yanıt süresi (TTFB) ölçümleri: 1,5 sn ile **24 sn** arasında. Google'ın önerdiği değer 0,8 sn'nin altı.
- Her sayfanın HTML'i yaklaşık 300 KB. Sayfa başına 21 script yükleniyor, 4 web font önyükleniyor (Font Awesome'un 3 dosyası dahil).
- Avada sayfa oluşturucusunun satır içi CSS'i ve iç içe `div` yapısı içeriği şişiriyor.

## 6. Güvenlik ve KVKK

- Google Tag Manager (GTM-W6DX9WVP) onay alınmadan yükleniyor. **Çerez bildirimi veya onay banner'ı yok.** KVKK ve Google Consent Mode v2 açısından risk oluşturuyor.
- HSTS, X-Frame-Options, X-Content-Type-Options ve Referrer-Policy başlıkları yok.
- WordPress REST API ve yazar sayfaları açık; kullanıcı adları ifşa oluyor.
- HTTP→HTTPS ve www→non-www yönlendirmeleri **doğru çalışıyor**.

## 7. Tasarım ve marka

- Logo: "KURU" + kırmızı daire içinde "CU", ana renk **#ff3131**, koyu lacivert **#22253d**. Bu kimlik korunacak ve premium bir koyu tema ile güçlendirilecek.
- Mevcut tasarım bir şablon görünümünde. Bölümler arasında görsel hiyerarşi zayıf ve mikro etkileşim yok.
- Çözüm ortağı logoları (EDM, E-Güven, Narbulut, Oduyo, Platin360, RotaCloud) güven unsuru olarak öne çıkarılmamış.

---

## 8. Blog içerik kalitesi (Faz 5'te tespit edildi)

Taşıma sırasında içeriği değiştirmedim. Teknik temizlik yapıldı: başlıklar düzeltildi, kalın paragraflar gerçek ara başlıklara çevrildi ve "KURUCU" ön ekleri kaldırıldı. Aşağıdakiler ise **içerik kararı gerektiriyor**:

- **İnce içerik:** 17 yazı 120–250 kelime arasında ve ara başlıksız. Google bu tür sayfaları düşük değerli sayar. Örnek: "KEP ve Kamu Sektörü" (136 kelime).
- **Yamyamlık (cannibalization):** 9 "Mali Mühür …" ve 7 "KEP …" yazısı aynı aramalar için birbiriyle yarışıyor. Öneri: kısa yazıları tek bir kapsamlı rehberde birleştirip eski adresleri 301 ile o rehbere yönlendirmek. Örnek: "Mali Mühür: Kapsamlı Rehber" (2.000+ kelime).
- **Yanlış olabilecek ifade:** "E-İmza Nedir?" yazısında "Kurucu Bilişim gibi **elektronik sertifika hizmet sağlayıcıları (ESHS)** … sertifika üretir" yazıyor. ESHS, BTK yetkisiyle sertifika üreten kuruluşlardır (E-Güven, TÜRKTRUST vb.); Kurucu Bilişim'in rolü (bayi/çözüm ortağı) netleştirilmeli.
- **Güncelliği kontrol edilmeli:** "E-Fatura Nedir?" yazısındaki zorunluluk tablosunda "5 milyon TL ciro" eşiği geçiyor. GİB eşikleri yıllara göre değişti; yazı güncel tebliğe göre gözden geçirilmeli.
- Yarım cümleler var. Örnek: "KEP sistemini kullanarak kamu sektöründeki yazışmaları güvence altına alır." (özne eksik)

## Faz 2+ için karar gerektiren konular

1. **Resmi adres hangisi?** Şişli (Quasar) mi, Fatih mi? Schema ve Google Haritalar için tek adres kullanılmalı.
2. **Banka/IBAN bilgileri** (Banka sayfası şu an boş).
3. **Çalışma saatleri** (Google ve schema için).
4. **Yayın yöntemi:** Yeni site statik HTML olarak üretilecek; mevcut hostinge (LiteSpeed) yüklenebilir, WordPress'e bağımlı değil. Yayın öncesinde mevcut WordPress'in yedeği alınmalı.
