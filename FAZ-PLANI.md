# Kurucu Bilişim — Site Yenileme Faz Planı

Hedef: kurucubilisim.com'un mevcut içeriğini ve URL yapısını koruyarak daha premium, daha dinamik, hızlı ve SEO uyumlu bir siteye taşımak.

| Faz | Kapsam | Çıktı | Durum |
|---|---|---|---|
| **Faz 1 — Denetim** | Canlı site, site haritaları, Google Haritalar kaydı, teknik SEO, içerik ve form analizi | `FAZ-1-DENETIM-RAPORU.md` | ✅ Tamamlandı |
| **Faz 2 — Altyapı & Tasarım Sistemi** | Proje iskeleti, statik site üreticisi (`build.js`), renk/tipografi/bileşenler, header-footer, mobil menü, animasyon altyapısı, görsel optimizasyonu (WebP) | `src/`, `assets/`, `build.js`, `/stil-rehberi/` önizleme | ✅ Tamamlandı |
| **Faz 3 — Ana Sayfa & Hizmet Sayfaları** | Dinamik hero, hizmet kartları, süreç, istatistik, referans, yorum, SSS; 2 hub + 11 hizmet sayfası (aynı URL'ler) | Ana sayfa + 13 sayfa | ✅ Tamamlandı |
| **Faz 4 — Kurumsal Sayfalar & Formlar** | Hakkımızda, Vizyon-Misyon, Referanslar, SSS, İletişim (harita), Başvuru ve İş Ortağı formları (bozuk alanlar düzeltilmiş), KVKK, Çerez Politikası, Sözleşme, Banka, teşekkür sayfaları, 404; PHP form işleyici | 15+ sayfa, `form.php` | ✅ Tamamlandı |
| **Faz 5 — Blog Taşıma** | 30 yazının WordPress'ten temizlenerek taşınması (aynı URL), başlık hatalarının düzeltilmesi, kategori filtresi, ilgili yazılar, içindekiler | Blog listesi + 30 yazı | ✅ Tamamlandı |
| **Faz 6 — Teknik SEO** | Schema (LocalBusiness, Service, FAQPage, Article, Breadcrumb), `sitemap.xml`, `robots.txt`, `llms.txt`, RSS, OG görseli, favicon seti, `.htaccess` (301/410 yönlendirmeleri, önbellek, gzip, güvenlik başlıkları), KVKK uyumlu çerez onayı + GTM Consent Mode | SEO dosyaları | ✅ Tamamlandı |
| **Faz 7 — Test & Yayın** | Lighthouse/erişilebilirlik testi, kırık link taraması, mobil kontrol, yayın kontrol listesi, Google Search Console & Google İşletme Profili adımları | Test raporu + `YAYIN-REHBERI.md` | ✅ Tamamlandı |

## Faz 7 test sonuçları (Lighthouse, mobil profil, yerel sunucu)

| Sayfa | Performans | Erişilebilirlik | En İyi Uyg. | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| Ana sayfa | 99 | 100 | 100 | 100 | 1,9 sn | 0 |
| E-İmza (hizmet) | 99 | 100 | 100 | 100 | 1,8 sn | 0 |
| E-İmza Nedir? (blog) | 99 | 100 | 100 | 100 | 1,8 sn | 0 |
| Blog | 98 | 100 | 100 | 100 | 2,4 sn | 0 |
| Hakkımızda | 99 | 100 | 100 | 100 | 1,9 sn | 0 |
| Başvuru formu | 95 | 100 | 100 | 100 | 1,7 sn | 0 |
| İletişim | 94 | 100 | 100 | 100 | 1,7 sn | 0 |

İlk ölçümde (optimizasyon öncesi) ana sayfa Performans 65, LCP 5,3 sn idi. Yapılanlar: fontlar yerel sunucuya alındı, CSS sayfaya gömüldü, GTM gecikmeli yükleniyor, hero animasyonu CSS ile yapılıyor.

Tam site taraması: 56 bağlantılı sayfa, kırık link 0, eksik görsel 0, JS hatası 0, 390 px mobilde yatay taşma 0.
Canlı site haritasındaki 95 URL'nin tamamı karşılanıyor: 58 sayfa, 24 adet 301, 13 adet 410.

Her faz sonunda çıktıyı gösterip onayınızla bir sonraki faza geçilir.

## Önizleme

```
npm run build   # dist/ klasörünü üretir
npm run serve   # http://localhost:8080
```

Faz 2 stil rehberi sayfası Faz 6’da kaldırıldı (bileşenler artık gerçek sayfalarda).

## Bekleyen bilgiler (şimdilik boş)
- Banka/IBAN → `src/data.js` içindeki `banks` dizisi
- Çalışma saatleri
- Resmi adres teyidi (şu an iletişim sayfasındaki Şişli/Quasar adresi kullanılıyor)
