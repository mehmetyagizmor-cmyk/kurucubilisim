// WordPress'ten alınan blog yazılarını temizler ve normalize eder.
const fs = require('fs');
const path = require('path');
const { blogCats } = require('./data');

const RAW = JSON.parse(fs.readFileSync(path.join(__dirname, 'content/posts.json'), 'utf8'));
const IMG_DIR = path.join(__dirname, '../assets/img/blog');

// Kopya içerik: 301 ile asıl yazıya yönlenir (seo.js)
const EXCLUDE = { 'kep-kayitli-elektronik-posta-nedir-cloned': 'mali-muhur-nedir-dijital-guvenlikte-yeni-bir-adim' };

const TITLE_FIX = {
  'erp-nedir-erp-yazilimi-secerken-dikkat-edilmesi-gerekenler': 'ERP Nedir? ERP Yazılımı Seçerken Dikkat Edilmesi Gerekenler',
  'mali-muhur-nedir-dijital-guvenlik-ve-yasal-zorunluluklar': 'Mali Mühür Zorunluluğu: Dijital Güvenlik ve Yasal Yükümlülükler',
};

// <title> için kısa başlık (sayfadaki H1 değişmez)
const SEO_TITLE = {
  'kayitli-elektronik-posta-kep-dijital-cagda-hayati-kolaylastiran-sessiz-kahraman': 'Kayıtlı Elektronik Posta (KEP): Avantajları ve Kullanımı',
  'kepin-sagladigi-guvenlik-kayitli-elektronik-posta-sisteminin-ozellikleri': 'KEP Güvenliği: Kayıtlı Elektronik Postanın Özellikleri',
  'mali-muhur-ve-dijital-hukuki-belgeler-dijital-imzalarin-yasal-gecerliligi': 'Mali Mühür ve Dijital Hukuki Belgelerin Yasal Geçerliliği',
  'mali-muhur-ve-dijital-ticaretin-gelecegi-yasal-sureclerin-dijitallesmesi': 'Mali Mühür ve Dijital Ticaretin Geleceği',
  'mali-muhur-ve-ihale-surecleri-dijital-ihale-basvurularinda-yasal-gecerlilik': 'Mali Mühür ile Dijital İhale Başvuruları ve Yasal Geçerlilik',
  'mali-muhur-ve-islemlerin-denetimi-dijital-sistemlerde-izleme-ve-kontrol': 'Mali Mühür ve İşlemlerin Denetimi: İzleme ve Kontrol',
  'mali-muhur-ve-vergi-iadeleri-dijital-imzalar-ile-iade-sureclerinin-hizlandirilmasi': 'Mali Mühür ile Vergi İadesi Süreçlerini Hızlandırın',
  '2026-e-fatura-ve-e-arsiv-gecis-zorunlulugu': '2026 E-Fatura ve E-Arşiv Geçiş Zorunluluğu Rehberi',
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
      return `<a href="${local}"${ext ? ' target="_blank" rel="noopener"' : ''}>`;
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

const posts = RAW.filter((p) => !EXCLUDE[p.slug]).map((p) => {
  const title = cleanTitle(p.slug, p.title.rendered);
  const { html, toc } = cleanHtml(p.content.rendered, title);
  const yd = (p.yoast_head_json || {}).description;
  const desc = yd && descCount[yd] === 1 ? summary(`<p>${decode(yd)}</p>`, 160) : summary(html);
  const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  const cats = blogCats.filter(([, re]) => re.test(p.slug)).map(([n]) => n);
  const img = fs.existsSync(path.join(IMG_DIR, p.slug + '.webp')) ? `/assets/img/blog/${p.slug}.webp` : null;
  return {
    slug: p.slug, path: `/${p.slug}/`, title, seoTitle: SEO_TITLE[p.slug] || title, desc, html, toc, words,
    minutes: Math.max(2, Math.round(words / 200)),
    date: p.date, modified: p.modified, cats: cats.length ? cats : ['Dijital'], img,
    thumb: img ? img.replace('.webp', '-640.webp') : null,
  };
}).sort((a, b) => b.date.localeCompare(a.date));

const fmtDate = (d) => new Date(d).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });

module.exports = { posts, EXCLUDE, fmtDate, slugify };
