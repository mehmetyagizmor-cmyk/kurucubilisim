# Yayın Rehberi — kurucubilisim.com yeni site

Bu rehber, yeni siteyi mevcut hostinge (LiteSpeed, WordPress kurulu) güvenli şekilde yayına almak için adım adım kontrol listesidir.

> ⚠️ **Karar gerektiren önemli nokta:** Yeni site statik HTML'dir; **WordPress yönetim paneli olmayacak.** Metin, hizmet veya blog değişiklikleri `src/` klasöründeki dosyalar düzenlenip `npm run build` ile yeniden üretilerek yapılır. Ekipte bu işi kimin yapacağı yayından önce netleşmeli. Panel isteniyorsa aynı tasarım ileride bir WordPress temasına da dönüştürülebilir.

---

## 1. Yayın öncesi (bilgiler)

- [ ] **Resmi adres teyidi:** İletişim sayfası Şişli/Quasar, KVKK metni Fatih adresini yazıyor. Doğru adres `src/data.js` → `site.address` alanına yazılmalı. KVKK metnindeki adres de `src/content/kvkk.html` dosyasında güncellenmeli.
- [ ] **Banka/IBAN:** `src/data.js` → `banks` dizisi. Doldurulunca sayfa otomatik olarak Google'a açılır.
- [ ] **Çalışma saatleri** (isteğe bağlı; Google İşletme Profili ile aynı olmalı).
- [ ] Blog içerik kararları (bkz. `FAZ-1-DENETIM-RAPORU.md` bölüm 8), özellikle "E-İmza Nedir?" yazısındaki ESHS ifadesi.

## 2. Mevcut WordPress'in yedeği

- [ ] Hosting panelinden **tam yedek** alın: dosyalar (`public_html`) + MySQL veritabanı. Yedeği bilgisayara indirin.
- [ ] Geri dönüş planı: bir sorun çıkarsa bu yedeği geri yüklemek yeterlidir.

## 3. Derleme

```bash
npm install        # ilk seferde (sharp kurulur)
npm run build      # dist/ klasörü üretilir
node check.js      # SEO kontrolü (yalnızca 404 ve teşekkür sayfası uyarı verebilir, normaldir)
npm run serve      # http://localhost:8080 adresinde son kontrol
```

## 4. Yükleme

1. `public_html` içindeki WordPress dosyalarını silmek yerine bir klasöre taşıyın (ör. `_wp-eski`). İşler yolunda gittikten 2–4 hafta sonra silinebilir.
   - **`wp-content/uploads/` klasörünü yerinde bırakın.** Google Görseller'de ve dış sitelerde eski görsel linkleri bulunuyor; bunlar çalışmaya devam eder.
2. `dist/` klasörünün **içindeki her şeyi** `public_html` klasörüne yükleyin. Gizli `.htaccess` dosyası da dahil; FTP programında "gizli dosyaları göster" açık olmalı.
3. Hosting panelinde **LiteSpeed Cache / CDN önbelleğini temizleyin** (sunucu başlığı: `hcdn`).

## 5. Form e-postaları

- [ ] `form.php` içindeki `MAIL_FROM` (varsayılan `form@kurucubilisim.com`) **alan adında var olan** bir adres olmalı. Yoksa panelden oluşturun veya `info@` yapın.
- [ ] Üç formu tek tek doldurup `info@kurucubilisim.com` adresine e-posta geldiğini doğrulayın (spam klasörüne de bakın):
  - İletişim: `/iletisim/`
  - Başvuru: `/basvuru-formu/`
  - İş Ortaklığı: `/is-ortagi-basvurusu/`
- [ ] Gönderimden sonra teşekkür sayfasına yönlendirme olmalı.
- [ ] Hosting `mail()` fonksiyonunu kapatmışsa SMTP (PHPMailer) gerekir; hosting bilgileriyle kurulabilir.

## 6. Yayın sonrası teknik kontrol (10 dakika)

| Test | Beklenen |
|---|---|
| `http://kurucubilisim.com` ve `https://www.kurucubilisim.com` | 301 → `https://kurucubilisim.com/` |
| `/faq-items/how-can-i-register-my-business/` | 301 → `/sikca-sorulan-sorular/` |
| `/kep-kayitli-elektronik-posta-nedir-cloned/` | 301 → `/mali-muhur-nedir-dijital-guvenlikte-yeni-bir-adim/` |
| `/privacy-policy/` | 301 → `/kvkk-politikamiz/` |
| `/sitemap_index.xml` | 301 → `/sitemap.xml` |
| `/fusion_tb_category/header/` | 410 |
| `/olmayan-bir-sayfa/` | Özel 404 sayfası |
| `/sitemap.xml`, `/robots.txt`, `/feed.xml` | Açılıyor |
| Telefonda ana sayfa, menü, WhatsApp butonu | Çalışıyor |

Komut satırından hızlı test: `curl -I https://kurucubilisim.com/privacy-policy/`

## 7. Google Search Console

- [ ] Mülk doğrulanmış olmalı (yoksa DNS ile doğrulayın).
- [ ] **Site Haritaları:** eski `sitemap_index.xml` kaydını kaldırın, `https://kurucubilisim.com/sitemap.xml` gönderin.
- [ ] **URL Denetimi:** ana sayfa, `/e-donusum-hizmetleri/e-imza/`, `/e-donusum-hizmetleri/mali-muhur/`, `/iletisim/` için "Dizine eklenmesini iste".
- [ ] [Zengin Sonuçlar Testi](https://search.google.com/test/rich-results) ile ana sayfa ve bir hizmet sayfasını kontrol edin. FAQ, Breadcrumb ve LocalBusiness görünmeli.
- [ ] 2–4 hafta boyunca **Sayfa Dizine Ekleme** raporunu izleyin. 410 ve 301 sayfaların dizinden düşmesi normaldir.

## 8. Google Tag Manager / Analytics

- [ ] Site artık **Consent Mode v2** kullanıyor. Çerezler, ziyaretçi "Kabul Et"e basana kadar reddedilmiş başlar.
- [ ] GTM'deki GA4 ve Ads etiketlerinde "Ek onay kontrolü gerekmez" / yerleşik onay ayarlarını kontrol edin.
- [ ] Teşekkür sayfalarının URL'leri değişmedi. Bu sayfalara bağlı dönüşüm etiketleri çalışmaya devam eder. Ek olarak her başarılı gönderimde `form_submit` olayı (`form_name`: iletisim / basvuru / is-ortagi) dataLayer'a gönderiliyor.
- [ ] GTM, hız için ilk etkileşimde veya sayfa yüklendikten 4 sn sonra yükleniyor. GA4 Gerçek Zamanlı raporunda veri geldiğini doğrulayın.

## 9. Google İşletme Profili (Haritalar)

- [ ] Ad, adres ve telefon **site ile birebir aynı** olmalı (NAP tutarlılığı).
- [ ] Web sitesi alanı: `https://kurucubilisim.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp`
- [ ] Kategoriler: birincil "Bilgisayar destek ve hizmetleri"ne ek olarak "İnternet sitesi tasarım hizmeti", "Yazılım şirketi" vb.
- [ ] Hizmetler bölümüne 11 hizmeti ekleyin. Açıklamalar `src/data.js` içinden kopyalanabilir.
- [ ] Ofis ve ekip fotoğrafları ekleyin, haftada 1 gönderi paylaşın.
- [ ] Memnun müşterilerden yorum isteyin. "Yorum yaz" linkini işletme profilinden alıp WhatsApp şablonuna ekleyin.

## 10. Güncelleme yapmak

| Ne değişecek? | Dosya |
|---|---|
| Telefon, adres, istatistik, IBAN, sosyal medya | `src/data.js` → `site` |
| Hizmet metinleri, SSS'ler | `src/data.js` → `services`, `faqs` |
| Sayfa düzenleri | `src/pages/*.js` |
| Tasarım | `assets/css/style.css` |
| Blog yazıları | `src/content/posts.json` (WordPress'ten alınan biçim) |

Her değişiklikten sonra `npm run build` çalıştırın ve `dist/` içeriğini yeniden yükleyin. Yeni blog yazısı eklemeyi kolaylaştırmak için Markdown tabanlı bir akış ileride eklenebilir.

## Hizmet başvuru formları (Google Forms)

Mali mühür, e-fatura ve e-imza sayfalarındaki başvuru formları sitenin kendi tasarımıyla gösterilir; yanıtlar doğrudan ilgili Google Form'a (ve bağlı tabloya) düşer.

- Form kimlikleri: `src/data.js` → `applyForms`
- Soru yapısı: `src/content/apply-forms.json` (elle düzenlemeyin)
- Google Form'da soru eklenir, silinir veya seçenek değişirse: `npm run forms` ardından `npm run build`. Bu yapılmazsa yeni zorunlu sorular sitede görünmez ve Google başvuruyu sessizce reddeder.
