// WordPress'ten alınan blog yazılarını temizler ve normalize eder.
const fs = require('fs');
const path = require('path');
const { blogCats } = require('./data');

const RAW = JSON.parse(fs.readFileSync(path.join(__dirname, 'content/posts.json'), 'utf8'));
const IMG_DIR = path.join(__dirname, '../assets/img/blog');

// Kopya içerik: 301 ile asıl yazıya yönlenir (seo.js)
const EXCLUDE = {
  'kep-kayitli-elektronik-posta-nedir-cloned': 'bilgi-bankasi/kep/kep-rehberi',
  // Bilgi Bankası'na taşındı
  'kep-ik-ve-e-bordro-hukuki-delil-saglayan-dijital-bordro-cozumu': 'bilgi-bankasi/kep/kep-ik-ve-e-bordro-hukuki-delil-saglayan-dijital-bordro-cozumu',
  // Birbiriyle yarışan zayıf "nedir" yazıları Bilgi Bankası rehberlerinde birleştirildi (Search Console: 30–75. sıra)
  'kep-kayitli-elektronik-posta-nedir': 'bilgi-bankasi/kep/kep-rehberi',
  'kep-nedir-kayitli-elektronik-posta-sistemi-ve-hukuki-gecerliligi': 'bilgi-bankasi/kep/kep-rehberi',
  'kayitli-elektronik-posta-kep-dijital-cagda-hayati-kolaylastiran-sessiz-kahraman': 'bilgi-bankasi/kep/kep-rehberi',
  'e-fatura-nedir': 'bilgi-bankasi/e-fatura/e-fatura-rehberi',
  'e-belge-nedir-dijitallesen-dunyada-e-belge-kullaniminin-onemi': 'bilgi-bankasi/danismanlik/e-donusum-gecis-rehberi',
  // Search Console "Tarandı - dizine eklenmedi" (Google yetersiz buldu): ilgili rehberlerde birleştirildi
  'mali-muhur-nedir-dijital-guvenlikte-yeni-bir-adim': 'bilgi-bankasi/mali-muhur/mali-muhur-rehberi',
  'mali-muhur-ve-vergi-iadeleri-dijital-imzalar-ile-iade-sureclerinin-hizlandirilmasi': 'bilgi-bankasi/mali-muhur/mali-muhur-rehberi',
  'e-bordro-ile-ik-ve-muhasebe-sureclerinde-verimlilik-artisi': 'bilgi-bankasi/kep/e-bordro-rehberi',
  // "e-imza nasıl alınır / belgeler" aramalarında rehberle yarışıyordu (Search Console: 59–63. sıra)
  'e-imza-nasil-alinir-adim-adim-basvuru-rehberi': 'bilgi-bankasi/e-imza/e-imza-rehberi',
  'e-imza-basvurusu-gerekli-belgeler-sartlar-ve-basvuru-turleri': 'bilgi-bankasi/e-imza/e-imza-rehberi',
  // Blog temizliği (Search Console, 23.10.2026): rehber / hizmet sayfasıyla aynı aramalarda yarışan, tıklama almayan yazılar
  'avukatlar-icin-e-imza-uyap-ve-dijital-dava-sureclerinde-kullanim': 'e-donusum-hizmetleri/e-imza/avukatlar-icin-e-imza',
  'e-imza-nedir': 'bilgi-bankasi/e-imza/e-imza-rehberi',
  'e-imza-kullanim-alanlari-elektronik-imza-nerelerde-kullanilir': 'bilgi-bankasi/e-imza/e-imza-rehberi',
  'e-imzanin-yasal-gecerliligi-5070-sayili-kanun-ve-hukuki-sonuclari': 'bilgi-bankasi/e-imza/e-imza-rehberi',
  'e-bordro-nedir-firmalar-ve-calisanlar-icin-temel-rehber': 'bilgi-bankasi/kep/e-bordro-rehberi',
  'e-bordro-nasil-olusturulur-adim-adim-uygulama-rehberi': 'bilgi-bankasi/kep/e-bordro-rehberi',
  'mali-muhur-nedir-dijital-guvenlik-ve-yasal-zorunluluklar': 'bilgi-bankasi/mali-muhur/mali-muhur-rehberi',
  'kurucu-bilisim-ile-e-defter-dijital-muhasebeye-gecisin-akilli-yolu': 'bilgi-bankasi/e-defter/e-defter-rehberi',
  '2026-e-fatura-ve-e-arsiv-gecis-zorunlulugu': 'bilgi-bankasi/mevzuat/e-donusum-son-tarihler-takvimi',
};

const TITLE_FIX = {
  'erp-nedir-erp-yazilimi-secerken-dikkat-edilmesi-gerekenler': 'ERP Nedir? ERP Yazılımı Seçerken Dikkat Edilmesi Gerekenler',
  'mali-muhur-nedir-dijital-guvenlik-ve-yasal-zorunluluklar': 'Mali Mühür Zorunluluğu: Dijital Güvenlik ve Yasal Yükümlülükler',
};

// <title> için kısa başlık (sayfadaki H1 değişmez)
const SEO_TITLE = {
  'bilanco-esasi-e-defter-zorunlulugu': 'Bilanço Esasında E-Defter Zorunluluğu: 2027 Hazırlığı',
  // Yeni yazılar (30 Ekim 2026)
  'serbest-meslek-sahipleri-e-faturaya-gecmek-zorunda-mi': 'Serbest Meslek Sahipleri E-Faturaya Geçmek Zorunda mı?',
  'mersiste-e-imza-ile-yonetim-kurulu-karari': 'MERSİS’te E-İmzayla Yönetim Kurulu Kararı Nasıl Alınır?',
  'e-faturaya-gecis-kontrol-listesi-2027': 'E-Faturaya Geçiş Kontrol Listesi: 1 Temmuz 2027 Son Tarih',
  'mali-muhur-ve-dijital-hukuki-belgeler-dijital-imzalarin-yasal-gecerliligi': 'Mali Mühür ve Dijital Hukuki Belgelerin Yasal Geçerliliği',
  'mali-muhur-ve-dijital-ticaretin-gelecegi-yasal-sureclerin-dijitallesmesi': 'Mali Mühür ve Dijital Ticaretin Geleceği',
  'mali-muhur-ve-ihale-surecleri-dijital-ihale-basvurularinda-yasal-gecerlilik': 'Mali Mühür ile Dijital İhale Başvuruları ve Yasal Geçerlilik',
  'mali-muhur-ve-islemlerin-denetimi-dijital-sistemlerde-izleme-ve-kontrol': 'Mali Mühür ve İşlemlerin Denetimi: İzleme ve Kontrol',
  '2026-e-fatura-ve-e-arsiv-gecis-zorunlulugu': '2026 E-Fatura ve E-Arşiv Geçiş Zorunluluğu Rehberi',
  'e-bordronun-yasal-zorunlulugu-ve-avantajlari-2025-guncel-bilgilerle': 'E-Bordro’nun Yasal Zorunluluğu ve Avantajları',
  'kurucu-bilisim-ile-e-defter-saklama-dijital-arsiviniz-artik-guvende': 'E-Defter Saklama: Dijital Arşiviniz Artık Güvende',
  'mali-muhur-nedir-dijital-guvenlik-ve-yasal-zorunluluklar': 'Mali Mühür Zorunluluğu ve Yasal Yükümlülükler',
  'mali-muhur-ve-kredi-basvurulari-dijital-onay-sureclerinin-guvenligi': 'Mali Mühür ve Kredi Başvurularında Dijital Onay',
  // Search Console (19 Ekim 2026): 1. sayfada görünüp az tıklanan yazılar
  'e-bordroda-kvkk-uyum-sureci-ve-veri-guvenligi': 'Bordro Veri Güvenliği: E-Bordroda KVKK Uyumu Nasıl Sağlanır?',
  'mersiste-e-imza-zorunlulugu': 'MERSİS’te E-İmza Zorunluluğu: Hangi İşlemlerde Gerekir?',
  'e-bordroda-sik-yapilan-hatalar-ve-dogrulari': 'E-Bordroda Sık Yapılan Hatalar ve Doğruları: Kontrol Listesi',
  'kep-ve-iletisimde-zaman-damgasi-dijital-gonderilerin-takibi': 'KEP’te Zaman Damgası: Gönderim ve Teslim Anı Nasıl Kanıtlanır?',
  'kurucu-bilisim-ile-e-defter-dijital-muhasebeye-gecisin-akilli-yolu': 'E-Defter Nedir, Kimler İçin Zorunlu? Dijital Muhasebeye Geçiş',
  'kep-ve-kamu-sektoru-devletle-dijital-yazismalar': 'KEP ile Kamu Kurumlarıyla Resmi Yazışma ve İhale Belgeleri',
  'kep-ve-elektronik-fatura-gonderimi-dijital-faturalama-cozumleri': 'KEP ile Fatura Gönderimi ve Yazışmaların Dijital Arşivlenmesi',
  'kepin-sagladigi-guvenlik-kayitli-elektronik-posta-sisteminin-ozellikleri': 'KEP Ne Kadar Güvenli? Özellikleri ve Kullanım Alanları',
};

// Arama sonucunda görünen açıklama (Search Console verisine göre yeniden yazıldı; yoksa otomatik özet)
const SEO_DESC = {
  'bilanco-esasi-e-defter-zorunlulugu': 'Bilanço esasına göre defter tutan herkes e-defter kullanmak zorunda. 2027’de bilançoya geçecek ya da yeni şirket kuracaksanız yapmanız gerekenler.',
  'serbest-meslek-sahipleri-e-faturaya-gecmek-zorunda-mi': 'Avukat, doktor, mühendis ve mali müşavirler için e-SMM zorunlu, e-fatura ise zorunlu değil. Gönüllü e-faturanın ne zaman mantıklı olduğunu anlattık.',
  'mersiste-e-imza-ile-yonetim-kurulu-karari': 'A.Ş. yönetim kurulu ve limited şirket genel kurul kararlarını MERSİS’te e-imzayla, toplantı yapmadan almak mümkün. Kimler kullanabilir, ne gerekir?',
  'e-faturaya-gecis-kontrol-listesi-2027': '2026 cirosu 3 milyon TL’yi aşan işletmeler 1 Temmuz 2027’ye kadar e-faturaya geçmeli. Mali mühürden ilk faturaya adım adım kontrol listesi.',
  'e-bordroda-kvkk-uyum-sureci-ve-veri-guvenligi': 'E-bordroda çalışan verileri nasıl korunur? Veri envanteri, yetkilendirme, aydınlatma metni ve güvenli saklama adımlarıyla KVKK uyumlu bordro süreci.',
  'mersiste-e-imza-zorunlulugu': 'MERSİS’te şirket kuruluşu ve değişiklik işlemlerinde e-imza neden zorunlu, hangi işlemlerde gerekir ve e-imzanız yoksa ne yapmalısınız? Kısaca anlattık.',
  'e-bordroda-sik-yapilan-hatalar-ve-dogrulari': 'Yanlış parametre, eksik personel bilgisi, e-imzasız bordro, düzensiz arşiv… E-bordroda en sık yapılan hataları ve doğru uygulamaları tek listede topladık.',
  'kep-ve-iletisimde-zaman-damgasi-dijital-gonderilerin-takibi': 'KEP’te zaman damgası, iletinin gönderildiği ve alıcıya ulaştığı anı kayıt altına alır. Uyuşmazlıklarda nasıl kanıt olduğunu ve önemini öğrenin.',
  'kurucu-bilisim-ile-e-defter-dijital-muhasebeye-gecisin-akilli-yolu': 'E-defter nedir, kimler için zorunlu ve işletmenize ne kazandırır? Kâğıt defterden e-deftere geçişi ve güvenli saklamayı adım adım anlattık.',
  'kep-ve-kamu-sektoru-devletle-dijital-yazismalar': 'Kamu kurumlarına resmi bildirim ve ihale belgelerini KEP ile yasal geçerlilikle gönderin. KEP’in devletle yazışmalarda sağladığı güvenceyi öğrenin.',
  'kep-ve-elektronik-fatura-gonderimi-dijital-faturalama-cozumleri': 'Faturalarınızı KEP ile güvenle iletin, yazışmalarınızı zaman damgalı ve yasal geçerli bir arşivde saklayın. KEP’in faturalama ve arşivlemedeki rolü.',
  'kepin-sagladigi-guvenlik-kayitli-elektronik-posta-sisteminin-ozellikleri': 'KEP iletileri dijital imza ve sertifikalarla korunur, içeriğin değişmeden ulaştığı kanıtlanır. KEP’in güvenlik özelliklerini ve kullanım alanlarını öğrenin.',
};

const decode = (s) => s
  .replace(/&#8217;|&rsquo;|&#039;|&#39;/g, '’').replace(/&#8216;/g, '‘').replace(/&#8220;|&#8221;|&quot;/g, '"')
  .replace(/&#8211;/g, '–').replace(/&#8212;/g, '—').replace(/&nbsp;|&#160;/g, ' ').replace(/&#038;|&amp;/g, '&')
  .replace(/&#(\d+);/g, (m, n) => String.fromCharCode(+n)).replace(/&lt;/g, '<').replace(/&gt;/g, '>');

function cleanTitle(slug, t) {
  if (TITLE_FIX[slug]) return TITLE_FIX[slug];
  t = decode(t).replace(/\s+/g, ' ').trim();
  t = t.replace(/^KURUCU Bilişim/, 'Kurucu Bilişim').replace(/^KURUCU\s+/, '');
  return t;
}

const ALLOWED = new Set(['p', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'strong', 'em', 'a', 'table', 'thead', 'tbody', 'tr', 'td', 'th', 'br', 'blockquote']);

function cleanHtml(html, title) {
  let h = html.replace(/<(script|style|noscript|svg|iframe)[\s\S]*?<\/\1>/gi, '');
  h = h.replace(/<(\/?)b(\s[^>]*)?>/gi, '<$1strong>').replace(/<(\/?)i(\s[^>]*)?>/gi, '<$1em>').replace(/<h5/gi, '<h4').replace(/<\/h5>/gi, '</h4>');
  // Etiket filtresi: yalnızca izinli etiketler, yalnızca a[href]
  h = h.replace(/<(\/?)([a-z0-9]+)([^>]*)>/gi, (m, sl, tag, attrs) => {
    tag = tag.toLowerCase();
    if (!ALLOWED.has(tag)) return tag === 'div' && !sl ? ' ' : '';
    if (sl) return `</${tag}>`;
    if (tag === 'a') {
      const href = (attrs.match(/href\s*=\s*"([^"]*)"/i) || [])[1] || '#';
      const local = href.replace(/^https?:\/\/(www\.)?kurucubilisim\.com/i, '') || '/';
      const ext = /^https?:/i.test(local);
      // Yazı içi buton: yalnız site buton sınıflarına izin ver
      const cls = (attrs.match(/class\s*=\s*"(btn btn--(?:primary|ghost))"/i) || [])[1];
      return `<a href="${local}"${cls ? ` class="${cls}"` : ''}${ext ? ' target="_blank" rel="noopener"' : ''}>`;
    }
    return `<${tag}>`;
  });
  h = decode(h).replace(/ /g, ' ').replace(/[ \t]+/g, ' ')
    .replace(/KURUCU Bilişim/g, 'Kurucu Bilişim').replace(/KURUCU(?=’|')/g, 'Kurucu');
  // Boş ve gereksiz kalıntılar
  for (let i = 0; i < 3; i++) h = h.replace(/<(p|strong|em|h2|h3|h4|li)>\s*<\/\1>/g, '').replace(/<strong>\s*<\/strong>/g, '');
  h = h.replace(/<(h[2-4])>\s*<strong>([\s\S]*?)<\/strong>\s*<\/\1>/g, '<$1>$2</$1>');
  // Yalnızca kalın yazıdan oluşan kısa paragraflar aslında ara başlıktır → gerçek başlığa çevir
  const hasH = /<h[2-4]>/.test(h);
  h = h.replace(/<p>\s*<strong>([^<]{4,100})<\/strong>\s*<\/p>/g, (m, t) => {
    t = t.trim();
    if (/[:：]$/.test(t)) return m; // "Resmi Kaynaklar:" gibi etiketler paragraf kalsın
    return hasH ? `<h3>${t}</h3>` : `<h2>${t}</h2>`;
  });
  h = h.replace(/<(h[2-4])>\s+/g, '<$1>').replace(/\s+<\/(h[2-4])>/g, '</$1>').replace(/\s+<\/(p|li|td)>/g, '</$1>');
  // Tabloların ilk satırını başlık satırı yap (erişilebilirlik)
  h = h.replace(/<table>\s*(?:<tbody>)?\s*<tr>([\s\S]*?)<\/tr>/g, (m, row) => `<table><thead><tr>${row.replace(/<(\/?)td>/g, '<$1th>')}</tr></thead><tbody>`);
  h = h.replace(/<thead>([\s\S]*?)<\/thead>/g, (m, inner) => `<thead>${inner.replace(/<(\/?)td>/g, '<$1th>')}</thead>`);
  // Başlık seviyelerini normalize et: en üst seviye h2 olsun
  const levels = [...h.matchAll(/<h([2-4])>/g)].map((m) => +m[1]);
  if (levels.length) {
    const min = Math.min(...levels), shift = min - 2;
    if (shift > 0) h = h.replace(/<(\/?)h([2-4])>/g, (m, sl, n) => `<${sl}h${Math.max(2, n - shift)}>`);
  }
  // İçerik başındaki, başlığı tekrar eden ilk başlığı kaldır
  const norm = (s) => s.replace(/<[^>]+>/g, '').toLocaleLowerCase('tr').replace(/[^a-zçğıöşü0-9]/g, '');
  h = h.replace(/^\s*<h2>([\s\S]*?)<\/h2>/, (m, inner) => (norm(inner) && norm(title).includes(norm(inner)) ? '' : m));
  // Başlıklara id ekle (içindekiler için)
  const used = {};
  const toc = [];
  h = h.replace(/<h2>([\s\S]*?)<\/h2>/g, (m, inner) => {
    const text = inner.replace(/<[^>]+>/g, '').trim();
    let id = slugify(text) || 'bolum';
    used[id] = (used[id] || 0) + 1;
    if (used[id] > 1) id += '-' + used[id];
    toc.push([id, text]);
    return `<h2 id="${id}">${inner.trim()}</h2>`;
  });
  return { html: h.replace(/\n{2,}/g, '\n').trim(), toc };
}

function slugify(s) {
  const map = { ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u', İ: 'i', Ç: 'c', Ğ: 'g', Ö: 'o', Ş: 's', Ü: 'u' };
  return s.replace(/[çğıöşüİÇĞÖŞÜ]/g, (c) => map[c]).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
}

function summary(html, max = 155) {
  const text = html.replace(/<h[2-4][^>]*>[\s\S]*?<\/h[2-4]>/g, ' ').replace(/<\/?(strong|em|a)[^>]*>/g, '').replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ').replace(/\s+([,.;:!?])/g, '$1').trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:–-]$/, '') + '…';
}

// Aynı meta açıklama birden fazla yazıda kullanılmışsa geçersiz say
const descCount = {};
RAW.forEach((p) => { const d = (p.yoast_head_json || {}).description; if (d) descCount[d] = (descCount[d] || 0) + 1; });

// Eski yazılarda doğrulanmamış iddiaların düzeltilmesi (patron onayı: 7/24 destek, şeffaf fiyat vb. kullanılmaz)
const TEXT_FIX = [
  ['<strong>Kesintisiz 7/24 Destek:</strong> GİB sunucularındaki bakım zamanlarında bile faturalarınız kuyruğa alınır, sistem açıldığında otomatik iletilir ve her sorunuzda uzman destek ekibimize anında ulaşabilirsiniz.',
    '<strong>Kesintisiz Gönderim ve Uzman Destek:</strong> GİB sunucularındaki bakım zamanlarında bile faturalarınız kuyruğa alınır, sistem açıldığında otomatik iletilir; sorularınızda uzman destek ekibimiz yanınızdadır.'],
];

// Yeniden yazılan yazılar: content/rewrites/<slug>.html varsa WordPress içeriğinin yerine geçer
const REWRITE_DIR = path.join(__dirname, 'content/rewrites');
const REWRITTEN = { 'mersiste-e-imza-zorunlulugu': '2026-10-19T12:00:00' };
const contentOf = (p) => (REWRITTEN[p.slug] ? fs.readFileSync(path.join(REWRITE_DIR, p.slug + '.html'), 'utf8') : p.content.rendered);

const posts = RAW.filter((p) => !EXCLUDE[p.slug]).map((p) => {
  const title = cleanTitle(p.slug, p.title.rendered);
  const cleaned = cleanHtml(contentOf(p), title);
  const { toc } = cleaned;
  // Taşınan yazılara verilen iç bağlantılar doğrudan yeni adrese gider
  const html = TEXT_FIX.reduce((h, [from, to]) => h.split(from).join(to),
    cleaned.html.replace(/href="\/([^"/]+)\/"/g, (m, s) => (EXCLUDE[s] ? `href="/${EXCLUDE[s]}/"` : m)));
  const yd = (p.yoast_head_json || {}).description;
  const desc = SEO_DESC[p.slug] || (yd && descCount[yd] === 1 ? summary(`<p>${decode(yd)}</p>`, 160) : summary(html));
  const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  const cats = blogCats.filter(([, re]) => re.test(p.slug)).map(([n]) => n);
  const img = fs.existsSync(path.join(IMG_DIR, p.slug + '.webp')) ? `/assets/img/blog/${p.slug}.webp` : null;
  return {
    slug: p.slug, path: `/${p.slug}/`, title, seoTitle: SEO_TITLE[p.slug] || title, desc, html, toc, words,
    minutes: Math.max(2, Math.round(words / 200)),
    date: p.date, modified: REWRITTEN[p.slug] || p.modified, cats: cats.length ? cats : ['Dijital'], img,
    thumb: img ? img.replace('.webp', '-640.webp') : null,
  };
}).sort((a, b) => b.date.localeCompare(a.date));

const fmtDate = (d) => new Date(d).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });

module.exports = { posts, EXCLUDE, fmtDate, slugify };
