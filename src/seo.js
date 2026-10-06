// Faz 6: Teknik SEO dosyaları — sitemap.xml, robots.txt, llms.txt, feed.xml, .htaccess
const fs = require('fs');
const path = require('path');
const { site, services, groups } = require('./data');
const { posts, EXCLUDE } = require('./posts');

const xmlEsc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const today = new Date().toISOString().slice(0, 10);

module.exports = function seo(ctx, DIST) {
  const out = (f, c) => fs.writeFileSync(path.join(DIST, f), c);

  // ---------- sitemap.xml (yalnızca indekslenebilir sayfalar) ----------
  const indexable = ctx.pages.filter((p) => p.sitemap !== false && p.path.endsWith('/') && !/name="robots" content="noindex/.test(p.html));
  const postByPath = Object.fromEntries(posts.map((p) => [p.path, p]));
  const urls = indexable.map((p) => {
    const post = postByPath[p.path];
    const img = post && post.img ? `\n    <image:image><image:loc>${site.url}${post.img}</image:loc><image:title>${xmlEsc(post.title)}</image:title></image:image>` : '';
    return `  <url>\n    <loc>${site.url}${p.path}</loc>\n    <lastmod>${(p.lastmod || today).slice(0, 10)}</lastmod>\n    <priority>${p.priority || '0.5'}</priority>${img}\n  </url>`;
  });
  out('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls.join('\n')}\n</urlset>\n`);

  // ---------- robots.txt ----------
  out('robots.txt', `# Kurucu Bilişim
User-agent: *
Allow: /
Disallow: /form.php

Sitemap: ${site.url}/sitemap.xml
`);

  // ---------- llms.txt (yapay zekâ arama motorları için özet) ----------
  out('llms.txt', `# ${site.name}

> İstanbul (Şişli) merkezli bilişim firması. E-imza, mali mühür, KEP ve e-bordro, e-fatura/e-arşiv/e-belge, e-defter ve e-defter saklama gibi e-dönüşüm hizmetleri ile web tasarım, e-ticaret, kurumsal tasarım, ERP, CRM ve sosyal medya yönetimi hizmetleri sunar. 10+ yıllık tecrübe, 1.500+ müşteri.

İletişim: ${site.phoneDisplay} · ${site.email} · ${site.address.street}, ${site.address.postalCode} ${site.address.district}/${site.address.city}

## ${groups['e-donusum-hizmetleri'].name}
${services.filter((s) => s.group === 'e-donusum-hizmetleri').map((s) => `- [${s.name}](${site.url}/${s.group}/${s.slug}/): ${s.desc}`).join('\n')}

## ${groups['dijital-hizmetler'].name}
${services.filter((s) => s.group === 'dijital-hizmetler').map((s) => `- [${s.name}](${site.url}/${s.group}/${s.slug}/): ${s.desc}`).join('\n')}

## Kurumsal
- [Hakkımızda](${site.url}/hakkimizda/)
- [Referanslarımız](${site.url}/referanslarimiz/)
- [Sıkça Sorulan Sorular](${site.url}/sikca-sorulan-sorular/)
- [İletişim](${site.url}/iletisim/)
- [Başvuru ve Teklif Formu](${site.url}/basvuru-formu/)

## Rehberler
${posts.map((p) => `- [${p.title}](${site.url}${p.path})`).join('\n')}
`);

  // ---------- feed.xml (RSS 2.0) ----------
  const rfc = (d) => new Date(d + '+03:00').toUTCString();
  out('feed.xml', `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${site.name} Blog</title>
  <link>${site.url}/blog/</link>
  <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml"/>
  <description>E-imza, mali mühür, KEP, e-fatura, e-defter ve dijital dönüşüm rehberleri</description>
  <language>tr-TR</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${posts.map((p) => `  <item>
    <title>${xmlEsc(p.title)}</title>
    <link>${site.url}${p.path}</link>
    <guid isPermaLink="true">${site.url}${p.path}</guid>
    <pubDate>${rfc(p.date)}</pubDate>
    <category>${xmlEsc(p.cats[0])}</category>
    <description>${xmlEsc(p.desc)}</description>
  </item>`).join('\n')}
</channel>
</rss>
`);

  // ---------- .htaccess (Apache / LiteSpeed) ----------
  const cloned = Object.entries(EXCLUDE).map(([from, to]) => `RewriteRule ^${from}/?$ /${to}/ [R=301,L]`).join('\n');
  out('.htaccess', `# Kurucu Bilişim — statik site yapılandırması (Apache/LiteSpeed)
Options -Indexes
DirectoryIndex index.html
ErrorDocument 404 /404.html
AddDefaultCharset utf-8
AddType application/manifest+json .webmanifest
AddType image/webp .webp
AddType image/svg+xml .svg

<IfModule mod_rewrite.c>
RewriteEngine On

# HTTPS + www'suz tek adres
RewriteCond %{HTTPS} off [OR]
RewriteCond %{HTTP_HOST} ^www\\. [NC]
RewriteRule ^ https://kurucubilisim.com%{REQUEST_URI} [R=301,L,NE]

# Gizli dosyalar ve form sayaç klasörü erişime kapalı
RewriteRule (^|/)\\.(?!well-known/) - [F,L]

# /sayfa/index.html → /sayfa/ (çift içerik önleme)
RewriteCond %{THE_REQUEST} \\s/+(.*?/)?index\\.html[\\s?] [NC]
RewriteRule ^ /%1 [R=301,L,NE]

# ---- Eski WordPress adresleri: kalıcı yönlendirmeler (301) ----
# Kopya blog yazısı → asıl yazı
${cloned}
# Avada demo SSS sayfaları
RewriteRule ^faq-items(/.*)?$ /sikca-sorulan-sorular/ [R=301,L]
# Portföy (proje) sayfaları
RewriteRule ^projects(/.*)?$ /referanslarimiz/#web-projeleri [R=301,L,NE]
# WordPress varsayılan gizlilik sayfası
RewriteRule ^privacy-policy/?$ /kvkk-politikamiz/ [R=301,L]
# Kategori, etiket, yazar ve sayfalama arşivleri
RewriteRule ^tag/(istanbul-)?e-imza/?$ /e-donusum-hizmetleri/e-imza/ [R=301,L]
RewriteRule ^tag/e-fatura(-hizmetleri)?/?$ /e-donusum-hizmetleri/e-fatura/ [R=301,L]
RewriteRule ^e-donusum-hizmetleri/e-belge/?$ /e-donusum-hizmetleri/e-fatura/ [R=301,L]
RewriteRule ^e-donusum-hizmetleri/e-defter-e-defter-saklama/?$ /e-donusum-hizmetleri/e-defter/ [R=301,L]
RewriteRule ^tag/e-donusum/?$ /e-donusum-hizmetleri/ [R=301,L]
RewriteRule ^category/.*$ /blog/ [R=301,L]
RewriteRule ^tag/.*$ /blog/ [R=301,L]
RewriteRule ^author/.*$ /hakkimizda/ [R=301,L]
RewriteRule ^blog/page/[0-9]+/?$ /blog/ [R=301,L]
RewriteRule ^page/[0-9]+/?$ / [R=301,L]
# RSS ve Yoast site haritaları
RewriteRule ^feed/?$ /feed.xml [R=301,L]
RewriteRule ^(.+)/feed/?$ /$1/ [R=301,L]
RewriteRule ^sitemap_index\\.xml$ /sitemap.xml [R=301,L]
RewriteRule ^[a-z_]+-sitemap[0-9]*\\.xml$ /sitemap.xml [R=301,L]
# Sondaki eğik çizgi eksikse ekle (klasör olarak var olan sayfalar)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME}/index.html -f
RewriteRule ^(.*[^/])$ /$1/ [R=301,L]

# ---- Kalıcı olarak kaldırılan sayfalar (410 Gone) ----
RewriteRule ^(fusion_tb_category|element_category|portfolio_category|portfolio_tags|fusion_element|fusion_template|fusion_tb_section|slide)(/.*)?$ - [G,L]
RewriteRule ^(wp-admin|wp-login\\.php|xmlrpc\\.php|wp-json)(/.*)?$ - [G,L]
# WordPress arama (?s=) → blog
RewriteCond %{QUERY_STRING} (^|&)s= [NC]
RewriteRule ^$ /blog/? [R=301,L]
# Eski ?p=123 kısa bağlantıları → ana sayfa
RewriteCond %{QUERY_STRING} (^|&)(p|page_id)=[0-9]+ [NC]
RewriteRule ^$ /? [R=301,L]
</IfModule>

# ---- Güvenlik başlıkları ----
<IfModule mod_headers.c>
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
Header always set X-Content-Type-Options "nosniff"
Header always set X-Frame-Options "SAMEORIGIN"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set Permissions-Policy "camera=(), microphone=(), geolocation=(), interest-cohort=()"
Header unset X-Powered-By
</IfModule>

# ---- Sıkıştırma ----
<IfModule mod_brotli.c>
AddOutputFilterByType BROTLI_COMPRESS text/html text/css text/plain text/xml application/javascript application/json application/xml application/rss+xml image/svg+xml application/manifest+json
</IfModule>
<IfModule mod_deflate.c>
AddOutputFilterByType DEFLATE text/html text/css text/plain text/xml application/javascript application/json application/xml application/rss+xml image/svg+xml application/manifest+json
</IfModule>

# ---- Tarayıcı önbelleği ----
<IfModule mod_expires.c>
ExpiresActive On
ExpiresDefault "access plus 1 hour"
ExpiresByType text/html "access plus 0 seconds"
ExpiresByType text/css "access plus 1 year"
ExpiresByType application/javascript "access plus 1 year"
ExpiresByType image/webp "access plus 6 months"
ExpiresByType image/png "access plus 6 months"
ExpiresByType image/jpeg "access plus 6 months"
ExpiresByType image/svg+xml "access plus 6 months"
ExpiresByType image/x-icon "access plus 6 months"
ExpiresByType application/xml "access plus 1 hour"
ExpiresByType application/rss+xml "access plus 1 hour"
</IfModule>
<IfModule mod_headers.c>
<FilesMatch "\\.(css|js)$">
Header set Cache-Control "public, max-age=31536000, immutable"
</FilesMatch>
<FilesMatch "\\.html$">
Header set Cache-Control "no-cache"
</FilesMatch>
</IfModule>
`);

  console.log(`✔ sitemap.xml (${indexable.length} URL), robots.txt, llms.txt, feed.xml, .htaccess`);
};
