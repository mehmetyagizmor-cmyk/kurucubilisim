// Yerel önizleme sunucusu: node serve.js  →  http://localhost:8080
const http = require('http');
const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, 'dist');
const PORT = +process.env.PORT || 8080;
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.json': 'application/json', '.webmanifest': 'application/manifest+json' };

http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  // Önizleme: form.php gerçek sunucuda PHP ile çalışır; burada e-posta göndermeden başarılı yanıt döner.
  if (req.method === 'POST' && p === '/form.php') {
    let body = '';
    req.on('data', (c) => { body += c; });
    req.on('end', () => {
      console.log('[önizleme] form gönderildi (e-posta gönderilmedi), boyut:', body.length);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true }));
    });
    return;
  }
  let file = path.join(DIST, p);
  if (!file.startsWith(DIST)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    if (!p.endsWith('/')) { res.writeHead(301, { Location: p + '/' }); return res.end(); }
    file = path.join(file, 'index.html');
  }
  if (!fs.existsSync(file)) {
    const nf = path.join(DIST, '404.html');
    res.writeHead(404, { 'Content-Type': TYPES['.html'] });
    return res.end(fs.existsSync(nf) ? fs.readFileSync(nf) : 'Bulunamadı');
  }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}).listen(PORT, () => console.log(`Önizleme: http://localhost:${PORT}`));
