// Faz 4: Kurumsal sayfalar, formlar, yasal metinler, teşekkür ve 404 sayfaları.
const fs = require('fs');
const path = require('path');
const { site, services, groups, faqs, reasons, references, webProjects } = require('../data');
const { layout, icon, icBox, btn, esc, pageHero, ctaBand, faqBlock, faqSchema, svcPath, aurora, SOCIAL, abs } = require('../lib');
const { statsBlock, partnersMarquee, logoWall, stepsBlock, quotesBlock } = require('../components');

const read = (f) => fs.readFileSync(path.join(__dirname, '../content', f), 'utf8');
const a = site.address;
const fullAddress = `${a.street}, ${a.postalCode} ${a.district}/${a.city}`;

// ---------- Form parçaları ----------
const f = {
  hidden: (type) => `<input type="hidden" name="form" value="${type}"><input type="hidden" name="ts" value=""><input type="hidden" name="sayfa" value="">
<div class="hp" aria-hidden="true"><label>Web sitesi adresi<input type="text" name="website_url" tabindex="-1" autocomplete="off"></label></div>`,
  input: (name, label, { type = 'text', req = false, ac = '', ph = '' } = {}) => `<div class="field"><label for="f-${name}">${label}${req ? ' <span aria-hidden="true" style="color:var(--brand-2)">*</span>' : ''}</label><input id="f-${name}" name="${name}" type="${type}"${req ? ' required' : ''}${ac ? ` autocomplete="${ac}"` : ''}${ph ? ` placeholder="${ph}"` : ''}${type === 'tel' ? ' inputmode="tel" pattern="[0-9 +()\\-]{7,30}"' : ''}></div>`,
  textarea: (name, label, req = false, ph = '') => `<div class="field"><label for="f-${name}">${label}${req ? ' <span aria-hidden="true" style="color:var(--brand-2)">*</span>' : ''}</label><textarea id="f-${name}" name="${name}"${req ? ' required' : ''} placeholder="${ph}"></textarea></div>`,
  consent: () => `<label class="consent"><input type="checkbox" name="kvkk" value="evet" required><span><a href="/kvkk-politikamiz/" target="_blank">KVKK Aydınlatma Metni</a>’ni okudum, kişisel verilerimin talebimin yanıtlanması amacıyla işlenmesini kabul ediyorum.</span></label>`,
  submit: (t) => `<div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap"><button class="btn btn--primary btn--lg" type="submit">${t}${icon('arrow')}</button><p class="form__msg" role="status" aria-live="polite"></p></div>`,
};
const serviceOptions = [...services.map((s) => [s.slug, s.short]), ['seo', 'SEO']];
const formOpen = (type, thanks) => `<form class="form" action="${site.formEndpoint}" method="post" data-form="${type}" data-thanks="${thanks}">${f.hidden(type)}`;

const contactInfo = () => `<div class="info-list">
  <a class="info" href="tel:${site.phone}">${icBox('phone')}<span><small>Telefon</small><strong>${site.phoneDisplay}</strong></span></a>
  <a class="info" href="https://wa.me/${site.whatsapp}" target="_blank" rel="noopener"><span class="ic" style="color:#25d366;background:rgba(37,211,102,.12);border-color:rgba(37,211,102,.35)">${SOCIAL.whatsapp}</span><span><small>WhatsApp</small><strong>Hemen yazın</strong></span></a>
  <a class="info" href="mailto:${site.email}">${icBox('at')}<span><small>E-posta</small><strong>${site.email}</strong></span></a>
  <a class="info" href="${site.mapsUrl}" target="_blank" rel="noopener">${icBox('pin')}<span><small>Adres</small><strong>${esc(fullAddress)}</strong></span></a>
  <div class="info">${icBox('clock')}<span><small>Çalışma saatleri</small><strong>${site.hours.map((h) => `${h.label} ${h.text}`).join(' · ')}</strong></span></div>
</div>`;

const mapBox = () => `<div class="map-box" data-map="${esc(site.mapsEmbed)}">
  <div><span class="pin">${icon('pin')}</span><strong>Quasar İstanbul, Şişli</strong><span class="muted">Harita, tıkladığınızda Google Haritalar’dan yüklenir.</span>
    <span style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center"><button class="btn btn--primary btn--sm" type="button">Haritayı göster</button><a class="btn btn--ghost btn--sm" href="${site.mapsUrl}" target="_blank" rel="noopener" onclick="event.stopPropagation()">Yol tarifi al ${icon('arrow')}</a></span></div>
</div>`;

module.exports = (ctx) => {
  const page = (p, o, meta = {}) => ctx.add(p, layout({ path: p, ...o }), meta);

  // ---------- Hakkımızda ----------
  {
    const p = '/hakkimizda/', crumbs = [['Ana Sayfa', '/'], ['Hakkımızda', p]];
    page(p, {
      title: 'Hakkımızda | Kurucu Bilişim – Dijital Dönüşüm Ortağınız', crumbs,
      desc: 'Kurucu Bilişim; 10 yılı aşkın deneyimi ve uzman kadrosuyla işletmelere e-dönüşüm, web tasarım ve yazılım çözümleri sunan İstanbul merkezli bilişim firmasıdır.',
      body: `${pageHero({ eyebrow: 'Hakkımızda', h1: 'Teknolojiye tutkuyla bağlı, <span class="grad">müşteri odaklı</span> bir ekip.', lead: 'Her büyüklükteki işletmeye bağımsız, güvenli ve verimli bilişim çözümleri sunarak dijital dönüşüm yolculuğunda rehberlik ediyoruz.', crumbs })}
<section class="section--tight" style="padding-top:0"><div class="container">${statsBlock()}</div></section>
<section class="section section--light"><div class="container split">
  <div class="media" data-reveal><img src="/assets/img/brand/dijital-donusum-ofis.webp" alt="Kurucu Bilişim ofisinde dijital dönüşüm raporlama ekranı" width="1100" height="770" loading="lazy" decoding="async"></div>
  <div>
    <span class="eyebrow">Biz kimiz?</span>
    <h2>Dijital dönüşümde güvenilir çözüm ortağı</h2>
    <p class="lead" style="max-width:none">Teknolojiye olan derin tutkumuzla bilişim sektöründe lider firma olma yolunda emin adımlarla ilerliyoruz. Yılların deneyimine sahip uzman kadromuzla bağımsız, güvenli, verimli ve kapsamlı bilişim çözümleri sunuyoruz.</p>
    <p>Yola çıktığımız günden bu yana müşteri odaklı çalışıyor, sektördeki tüm yenilikleri yakından takip ederek müşterilerimizin dijital dönüşüm süreçlerini başarıyla yönetiyoruz.</p>
    <p>Sunduğumuz çözümler yalnızca teknolojik altyapıyı değil, iş süreçlerini de destekleyen stratejiler içeriyor. Böylece müşterilerimizin rekabet avantajını artırıyor, firmalarına değer katmalarına yardımcı oluyoruz.</p>
    <div class="hero__actions" style="margin:24px 0 0">${btn('/vizyon-ve-misyonumuz/', 'Vizyon ve Misyonumuz', 'btn--primary')}${btn('/referanslarimiz/', 'Referanslarımız', 'btn--ghost', false)}</div>
  </div>
</div></section>
<section class="section"><div class="container">
  <div class="section-head center"><span class="eyebrow">Değerlerimiz</span><h2>Bizi farklı kılan ne?</h2></div>
  <div class="grid grid--4">${reasons.map(([t, d], i) => `<div class="card" data-reveal style="--d:${i * 0.07}s">${icBox(['users', 'bolt', 'coin', 'pin'][i])}<h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
</div></section>
<section class="section--tight"><div class="container">${partnersMarquee()}</div></section>
<section class="section section--alt"><div class="container">
  <div class="section-head center"><span class="eyebrow">Müşteri yorumları</span><h2>Birlikte çalıştığımız işletmeler anlatıyor</h2></div>${quotesBlock()}
</div></section>
<section class="section"><div class="container grid grid--2">
  <a class="card" href="/is-ortagi-basvurusu/">${icBox('handshake')}<h3>İş ortaklığı başvurusu</h3><p>Kurucu Bilişim ile iş ortaklığı yapmak ve birlikte büyümek için başvurun.</p><span class="link-arrow">Başvuru formu ${icon('arrow')}</span></a>
  <a class="card" href="/basvuru-formu/">${icBox('doc')}<h3>Hizmet başvurusu</h3><p>İhtiyacınız olan hizmetleri seçin, size özel teklifi aynı gün iletelim.</p><span class="link-arrow">Teklif al ${icon('arrow')}</span></a>
</div></section>
${ctaBand()}`,
      schema: [{ '@type': 'AboutPage', url: abs(p), name: 'Hakkımızda', about: { '@id': site.url + '/#organization' } }],
    }, { priority: '0.7' });
  }

  // ---------- Vizyon ve Misyon ----------
  {
    const p = '/vizyon-ve-misyonumuz/', crumbs = [['Ana Sayfa', '/'], ['Hakkımızda', '/hakkimizda/'], ['Vizyon ve Misyonumuz', p]];
    page(p, {
      title: 'Vizyon ve Misyonumuz | Kurucu Bilişim', crumbs,
      desc: 'Kurucu Bilişim’in vizyonu: bilişim sektöründe lider olmak. Misyonu: işletmelere güvenli, gelişmiş ve özgün bilişim çözümleriyle değer katmak.',
      body: `${pageHero({ eyebrow: 'Kurumsal', h1: 'Vizyon ve <span class="grad">Misyonumuz</span>', lead: 'Yenilikçi çözümlerle dijital dünyada öncü olmayı ve müşterilerimize kalıcı değer katmayı hedefliyoruz.', crumbs })}
<section class="section" style="padding-top:0"><div class="container vm">
  <div class="card" data-reveal>${icBox('target')}<h2>Vizyonumuz</h2><p>Dijital dünyanın hızla geliştiği bu çağda, sürekli gelişen ve öncü bir firma olarak bilişim sektöründe lider olmayı hedefliyoruz. Teknolojik çözümlerimizle iş dünyasının verimliliğini artırmayı, sürdürülebilir büyümeyi sağlamayı ve dijital başarının öncüsü olmayı amaçlıyoruz.</p></div>
  <div class="card" data-reveal style="--d:.1s">${icBox('layers')}<h2>Misyonumuz</h2><p>İşletmelerin teknolojik ihtiyaçlarını en üst düzeyde karşılamak için güvenli, gelişmiş ve özgün bilişim çözümleri sunuyoruz. İş süreçlerini optimize eden, dijital dönüşüm yolculuğunda rehberlik eden ve rekabet avantajı kazandıran projeler geliştiriyor; insan odaklı yaklaşımımızla her zaman en ileri düzeyde hizmet veriyoruz.</p></div>
</div></section>
<section class="section section--alt"><div class="container">
  <div class="section-head center"><span class="eyebrow">Yaklaşımımız</span><h2>Bu hedeflere nasıl ulaşıyoruz?</h2></div>${stepsBlock()}
</div></section>
${ctaBand()}`,
    }, { priority: '0.5' });
  }

  // ---------- Referanslar ----------
  {
    const p = '/referanslarimiz/', crumbs = [['Ana Sayfa', '/'], ['Referanslarımız', p]];
    page(p, {
      title: 'Referanslarımız | Kurucu Bilişim ile Çalışan Markalar', crumbs,
      desc: 'E-dönüşüm, web tasarım ve dijital çözümlerde Kurucu Bilişim’i tercih eden 1.500’den fazla işletmeden bazıları. Referanslarımızı inceleyin.',
      body: `${pageHero({ eyebrow: 'Referanslarımız', h1: '1.500’den fazla işletme <span class="grad">bize güveniyor.</span>', lead: 'Farklı sektörlerden markaların e-dönüşüm ve dijital süreçlerinde yanlarındayız.', crumbs })}
<section class="section--tight" style="padding-top:0"><div class="container">${statsBlock()}</div></section>
<section class="section section--light"><div class="container">
  <div class="section-head center"><span class="eyebrow">Müşterilerimiz</span><h2>Bize güvenen markalar</h2></div>
  ${logoWall(references.length)}
</div></section>
<section class="section" id="web-projeleri"><div class="container">
  <div class="section-head"><span class="eyebrow">Web projeleri</span><h2>Son tamamladığımız web siteleri</h2></div>
  <div class="web-projects">${webProjects.map(([n, d, t], i) => `<a class="card" href="https://${d}" target="_blank" rel="noopener" data-reveal style="--d:${i * 0.07}s">${icBox('monitor')}<h3>${esc(n)}</h3><p>${esc(t)} · ${esc(d)}</p><span class="link-arrow">Siteyi ziyaret et ${icon('arrow')}</span></a>`).join('')}</div>
</div></section>
<section class="section--tight"><div class="container">${partnersMarquee()}</div></section>
${ctaBand('Bir sonraki başarı hikâyesi sizinki olsun')}`,
    }, { priority: '0.6' });
  }

  // ---------- SSS ----------
  {
    const p = '/sikca-sorulan-sorular/', crumbs = [['Ana Sayfa', '/'], ['Sıkça Sorulan Sorular', p]];
    const sets = [['genel', 'Genel Sorular', 'spark', faqs], ...services.map((s) => [s.slug, s.short, s.icon, s.faqs])];
    page(p, {
      title: 'Sıkça Sorulan Sorular (S.S.S.) | Kurucu Bilişim', crumbs,
      desc: 'E-imza, mali mühür, KEP, e-fatura, e-defter, web tasarım ve e-ticaret hakkında en çok sorulan soruların yanıtları. Merak ettiğiniz her şey burada.',
      body: `${pageHero({ eyebrow: 'S.S.S.', h1: 'Sıkça Sorulan <span class="grad">Sorular</span>', lead: 'Hizmetlerimiz hakkında merak ettiğiniz her şey. Yanıtını bulamadığınız sorular için bize dilediğiniz zaman ulaşabilirsiniz.', crumbs })}
<section class="section" style="padding-top:0"><div class="container">
  <nav class="toc-cats" aria-label="Soru kategorileri">${sets.map(([id, n]) => `<a href="#${id}">${esc(n)}</a>`).join('')}</nav>
  ${sets.map(([id, n, ic, list]) => `<div class="faq-group" id="${id}"><h2>${icBox(ic)}${esc(n)}</h2>${faqBlock(list)}</div>`).join('')}
</div></section>
${ctaBand('Sorunuzun cevabını bulamadınız mı?', 'Uzman ekibimiz telefon, WhatsApp veya e-posta ile tüm sorularınızı hızla yanıtlar.')}`,
      schema: [faqSchema(sets.flatMap((x) => x[3]))],
    }, { priority: '0.7' });
  }

  // ---------- İletişim ----------
  {
    const p = '/iletisim/', crumbs = [['Ana Sayfa', '/'], ['İletişim', p]];
    page(p, {
      title: 'İletişim | Kurucu Bilişim – Şişli, İstanbul', crumbs,
      desc: `Kurucu Bilişim iletişim bilgileri: ${site.phoneDisplay}, ${site.email}. Quasar İstanbul, Şişli. Formu doldurun, aynı gün dönüş yapalım.`,
      body: `${pageHero({ eyebrow: 'İletişim', h1: 'Projenizi <span class="grad">konuşalım.</span>', lead: 'Sorularınız, teklif talepleriniz veya iş birliği fırsatları için buradayız. Formu doldurun, en kısa sürede dönüş yapalım.', crumbs })}
<section class="section" style="padding-top:0"><div class="container form-layout">
  <div>${contactInfo()}
    <div class="socials" style="margin-top:22px"><a href="${site.social.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${SOCIAL.instagram}</a><a href="${site.social.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${SOCIAL.linkedin}</a><a href="${site.social.youtube}" target="_blank" rel="noopener" aria-label="YouTube">${SOCIAL.youtube}</a></div>
  </div>
  <div class="form-card">
    <h2>Formu doldurun, hızlıca dönüş yapalım</h2>
    ${formOpen('iletisim', '/iletisim-tesekkurler/')}
      <div class="form__row">${f.input('ad', 'Adınız Soyadınız', { req: true, ac: 'name' })}${f.input('telefon', 'Telefon', { type: 'tel', ac: 'tel', ph: '05xx xxx xx xx' })}</div>
      <div class="form__row">${f.input('eposta', 'E-posta', { type: 'email', req: true, ac: 'email' })}
        <div class="field"><label for="f-konu">Konu</label><select id="f-konu" name="konu"><option value="Genel bilgi">Genel bilgi</option>${serviceOptions.map(([k, n]) => `<option data-key="${k}" value="${esc(n)}">${esc(n)}</option>`).join('')}<option value="Teknik destek">Teknik destek</option></select></div></div>
      ${f.textarea('mesaj', 'Mesajınız', true, 'Size nasıl yardımcı olabiliriz?')}
      ${f.consent()}${f.submit('Mesajı Gönder')}
    </form>
  </div>
</div></section>
<section class="section--tight" style="padding-top:0"><div class="container">${mapBox()}</div></section>
${ctaBand('Hemen konuşmak ister misiniz?', 'Telefonla arayın veya WhatsApp’tan yazın; uzmanlarımız dakikalar içinde yanıt versin.')}`,
      schema: [{ '@type': 'ContactPage', url: abs(p), name: 'İletişim', about: { '@id': site.url + '/#organization' } }],
    }, { priority: '0.8' });
  }

  // ---------- Hizmet başvuru formu ----------
  {
    const p = '/basvuru-formu/', crumbs = [['Ana Sayfa', '/'], ['Başvuru Formu', p]];
    page(p, {
      title: 'Hizmet Başvurusu ve Teklif Formu | Kurucu Bilişim', crumbs,
      desc: 'E-imza, mali mühür, KEP, e-fatura, web tasarım ve e-ticaret hizmetleri için online başvuru ve teklif formu. Aynı gün içinde size dönüş yapıyoruz.',
      body: `${pageHero({ eyebrow: 'Başvuru & Teklif', h1: 'Ücretsiz <span class="grad">teklif alın</span>', lead: 'İhtiyacınız olan hizmetleri seçin, bilgilerinizi bırakın. Size özel çözümü ve net fiyatı aynı gün iletelim.', crumbs })}
<section class="section" style="padding-top:0"><div class="container form-layout">
  <div>
    <ul class="list-check" style="margin-bottom:28px">${['Aynı gün içinde dönüş', 'Şeffaf ve net fiyatlandırma', 'Başvuru ve kurulum süreçlerini biz yönetiyoruz', 'Yerinde veya uzaktan kurulum'].map((t) => `<li>${icon('check')}<span>${t}</span></li>`).join('')}</ul>
    ${contactInfo()}
  </div>
  <div class="form-card">
    <h2>Başvuru formu</h2>
    ${formOpen('basvuru', '/talep-formu-tesekkurler/')}
      <div class="form__row">${f.input('ad', 'Adınız', { req: true, ac: 'given-name' })}${f.input('soyad', 'Soyadınız', { ac: 'family-name' })}</div>
      <div class="form__row">${f.input('eposta', 'E-posta', { type: 'email', req: true, ac: 'email' })}${f.input('telefon', 'Telefon', { type: 'tel', req: true, ac: 'tel', ph: '05xx xxx xx xx' })}</div>
      <div class="form__row">${f.input('firma', 'Firma adı', { ac: 'organization' })}${f.input('il', 'İl', { ac: 'address-level1' })}</div>
      <fieldset class="field" style="border:0;padding:0;margin:0"><legend style="font-size:.88rem;font-weight:650;margin-bottom:10px">Hangi hizmetler için başvuruyorsunuz?</legend>
        <div class="checks">${serviceOptions.map(([k, n]) => `<label><input type="checkbox" name="hizmet[]" value="${esc(n)}" data-key="${k}">${esc(n)}</label>`).join('')}</div></fieldset>
      ${f.input('program', 'Kullandığınız muhasebe / ERP programı (varsa)')}
      ${f.textarea('mesaj', 'Mesajınız', false, 'Varsa eklemek istediğiniz detaylar…')}
      ${f.consent()}${f.submit('Başvuruyu Gönder')}
    </form>
  </div>
</div></section>`,
    }, { priority: '0.8' });
  }

  // ---------- İş ortaklığı ----------
  {
    const p = '/is-ortagi-basvurusu/', crumbs = [['Ana Sayfa', '/'], ['İş Ortaklığı Başvurusu', p]];
    page(p, {
      title: 'İş Ortaklığı ve Bayilik Başvurusu | Kurucu Bilişim', crumbs,
      desc: 'E-dönüşüm, web tasarım ve e-ticaret alanlarında Kurucu Bilişim ile iş ortaklığı yapın. Birlikte büyümek için başvuru formunu doldurun.',
      body: `${pageHero({ eyebrow: 'İş Ortaklığı', h1: 'Birlikte <span class="grad">büyüyelim.</span>', lead: 'Mali müşavirler, yazılım firmaları, ajanslar ve bayiler için kazan-kazan esasına dayalı iş ortaklığı modeli.', crumbs })}
<section class="section" style="padding-top:0"><div class="container form-layout">
  <div class="grid" style="gap:14px"><h2 class="sr-only">İş ortaklığı avantajları</h2>${[['coin', 'Kazançlı iş modeli', 'Kazan-kazan esasına dayalı, birlikte büyüyen bir iş birliği modeli.'], ['shield', 'Güçlü altyapı', 'Mevzuata uyumlu, yedekli ve 7/24 çalışan altyapı.'], ['users', 'Teknik destek', 'Kurulum ve destek süreçlerini sizin adınıza üstleniyoruz.']].map(([ic, t, d]) => `<div class="card">${icBox(ic)}<h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
  <div class="form-card">
    <h2>İş ortaklığı başvuru formu</h2>
    ${formOpen('is-ortagi', '/is-ortakligi-talep-tesekkurler/')}
      <div class="form__row">${f.input('ad', 'Adınız', { req: true, ac: 'given-name' })}${f.input('soyad', 'Soyadınız', { ac: 'family-name' })}</div>
      <div class="form__row">${f.input('eposta', 'E-posta', { type: 'email', req: true, ac: 'email' })}${f.input('telefon', 'Telefon', { type: 'tel', req: true, ac: 'tel' })}</div>
      <div class="form__row">${f.input('firma', 'Firma adı', { ac: 'organization' })}${f.input('il', 'İl', { ac: 'address-level1' })}</div>
      ${f.input('web', 'Web siteniz', { type: 'url', ac: 'url', ph: 'https://' })}
      <fieldset class="field" style="border:0;padding:0;margin:0"><legend style="font-size:.88rem;font-weight:650;margin-bottom:10px">İş ortaklığı türü <span aria-hidden="true" style="color:var(--brand-2)">*</span></legend>
        <div class="checks">${['E-Dönüşüm', 'Web Tasarım', 'E-Ticaret', 'Diğer'].map((t, i) => `<label><input type="radio" name="ortaklik" value="${t}"${i === 0 ? ' required' : ''}>${t}</label>`).join('')}</div></fieldset>
      ${f.textarea('mesaj', 'Mesajınız', false, 'Kendinizden ve iş birliği beklentinizden kısaca bahsedin…')}
      ${f.consent()}${f.submit('Başvuruyu Gönder')}
    </form>
  </div>
</div></section>`,
    }, { priority: '0.5' });
  }

  // ---------- Banka hesapları ----------
  {
    const p = '/banka-hesap-bilgilerimiz/', crumbs = [['Ana Sayfa', '/'], ['Banka Hesap Bilgilerimiz', p]];
    const has = site.banks.length > 0;
    page(p, {
      title: 'Banka Hesap Bilgilerimiz | Kurucu Bilişim', crumbs, noindex: !has,
      desc: 'Kurucu Bilişim banka hesap ve IBAN bilgileri. Ödemelerinizde açıklama kısmına firma unvanınızı ve fatura numaranızı yazmayı unutmayın.',
      body: `${pageHero({ eyebrow: 'Ödeme', h1: 'Banka Hesap <span class="grad">Bilgilerimiz</span>', lead: 'Havale/EFT ödemelerinizde açıklama kısmına firma unvanınızı ve fatura numaranızı yazmayı unutmayın.', crumbs })}
<section class="section" style="padding-top:0"><div class="container">
  ${has ? `<div class="grid grid--2">${site.banks.map((b) => `<div class="card bank">${icBox('coin')}<h3>${esc(b.bank)}</h3><p>${esc(b.holder)}${b.branch ? ' · ' + esc(b.branch) : ''}</p><code>${esc(b.iban)}</code></div>`).join('')}</div>`
    : `<div class="card" style="max-width:760px;margin-inline:auto">${icBox('coin')}<h3>Güncel IBAN bilgilerimiz için bize ulaşın</h3><p>Güvenliğiniz için banka hesap bilgilerimizi talep üzerine paylaşıyoruz. Telefon, WhatsApp veya e-posta ile ulaştığınızda dakikalar içinde iletiyoruz.</p><div class="hero__actions" style="margin:22px 0 0">${btn(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent('Merhaba, banka hesap bilgilerinizi öğrenebilir miyim?')}`, 'WhatsApp ile iste', 'btn--primary', false, ' target="_blank" rel="noopener"')}${btn('tel:' + site.phone, site.phoneDisplay, 'btn--ghost', false)}</div></div>`}
</div></section>`,
    }, { sitemap: has, priority: '0.3' });
  }

  // ---------- Yasal metinler ----------
  const legal = (p, title, h1, desc, html, extra = '') => {
    const crumbs = [['Ana Sayfa', '/'], [h1, p]];
    page(p, {
      title, desc, crumbs,
      body: `${pageHero({ eyebrow: 'Yasal', h1: esc(h1), crumbs })}
<section class="section" style="padding-top:0"><div class="container"><article class="prose">${html}${extra}</article></div></section>`,
    }, { priority: '0.3' });
  };

  const kvkk = read('kvkk.html')
    .replace(/^\s*<h2>[\s\S]*?<\/h2>/, '')
    .replace(/https:\/\/www\.kurucubilisim\.com\/kvkk-politikamiz\/?/g, '<a href="/kvkk-politikamiz/">kurucubilisim.com/kvkk-politikamiz</a>')
    .replace(/https:\/\/www\.kurucubilisim\.com\/Kurumsal\/kurumsal-politikalarimiz/g, '<a href="/kvkk-politikamiz/">kurucubilisim.com/kvkk-politikamiz</a>')
    .replace(/https:\/\/www\.kurucubilisim\.com(?![\/\w])/g, '<a href="/">kurucubilisim.com</a>');
  legal('/kvkk-politikamiz/', 'KVKK Aydınlatma Metni | Kurucu Bilişim', 'KVKK Aydınlatma Metni',
    'Kurucu Bilişim 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında kişisel verilerin işlenmesi, saklanması ve haklarınız hakkında aydınlatma metni.', kvkk);

  legal('/sozlesme-kosullari/', 'Sözleşme Koşulları ve Kalite Politikası | Kurucu Bilişim', 'Sözleşme Koşulları',
    'Kurucu Bilişim hizmet sözleşme koşulları, gizlilik koşulları, kalite ve bilgi güvenliği politikası. Şeffaflık ilkemiz gereği tüm detaylar burada.', read('sozlesme.html'));

  legal('/cerez-politikasi/', 'Çerez Politikası | Kurucu Bilişim', 'Çerez Politikası',
    'Kurucu Bilişim web sitesinde kullanılan çerezler, kullanım amaçları ve çerez tercihlerinizi nasıl yönetebileceğiniz hakkında bilgilendirme.', `
<p>Bu Çerez Politikası, <strong>kurucubilisim.com</strong> web sitesini ziyaret ettiğinizde kullanılan çerezler ve benzeri teknolojiler hakkında sizi bilgilendirmek amacıyla, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında hazırlanmıştır.</p>
<h2 id="cerez-nedir">Çerez nedir?</h2>
<p>Çerezler, ziyaret ettiğiniz web siteleri tarafından tarayıcınıza kaydedilen küçük metin dosyalarıdır. Sitenin düzgün çalışmasını, tercihlerinizin hatırlanmasını ve site kullanımının analiz edilmesini sağlar.</p>
<h2 id="kullanilan-cerezler">Kullandığımız çerezler</h2>
<table><thead><tr><th>Tür</th><th>Amaç</th><th>Onay</th></tr></thead><tbody>
<tr><td>Zorunlu</td><td>Çerez tercihinizin hatırlanması (<code>kb-consent</code>, tarayıcı yerel depolaması)</td><td>Gerekmez</td></tr>
<tr><td>Analitik</td><td>Google Analytics / Google Tag Manager ile ziyaret sayısı, trafik kaynağı ve sayfa etkileşimlerinin anonim olarak ölçülmesi</td><td>Açık rızanız ile</td></tr>
<tr><td>Pazarlama</td><td>Reklam kampanyalarının performansının ölçülmesi (ör. Google Ads dönüşüm izleme)</td><td>Açık rızanız ile</td></tr></tbody></table>
<p>Analitik ve pazarlama çerezleri, çerez bildirimindeki <strong>“Kabul Et”</strong> butonuna tıklamadığınız sürece etkinleştirilmez (Google Consent Mode v2).</p>
<h2 id="tercih-yonetimi">Çerez tercihlerinizi nasıl yönetirsiniz?</h2>
<p>Tercihinizi istediğiniz zaman aşağıdaki butonla sıfırlayabilir veya tarayıcınızın ayarlarından çerezleri silebilir ve engelleyebilirsiniz. Çerezleri engellemeniz durumunda sitenin bazı özellikleri beklendiği gibi çalışmayabilir.</p>
<p><button class="btn btn--ghost btn--sm" type="button" onclick="try{localStorage.removeItem('kb-consent')}catch(e){};location.reload()">Çerez tercihlerimi sıfırla</button></p>
<h2 id="haklariniz">Haklarınız</h2>
<p>KVKK’nın 11. maddesi kapsamındaki haklarınız ve başvuru yöntemleri için <a href="/kvkk-politikamiz/">KVKK Aydınlatma Metni</a>’ni inceleyebilir, sorularınız için <a href="mailto:${site.email}">${site.email}</a> adresine yazabilirsiniz.</p>`);

  // ---------- Teşekkür sayfaları (canlıdaki URL'ler korunur, GTM dönüşüm tetikleyicileri bozulmaz) ----------
  const thanks = [
    ['/iletisim-tesekkurler/', 'Mesajınız bize ulaştı!', 'En kısa sürede sizinle iletişime geçeceğiz.'],
    ['/talep-formu-tesekkurler/', 'Başvurunuz alındı!', 'Uzmanlarımız başvurunuzu inceleyip aynı gün içinde size özel teklifle dönüş yapacak.'],
    ['/is-ortakligi-talep-tesekkurler/', 'İş ortaklığı başvurunuz alındı!', 'İş geliştirme ekibimiz başvurunuzu değerlendirip sizinle iletişime geçecek.'],
  ];
  for (const [p, h, t] of thanks) {
    page(p, {
      title: h.replace('!', '') + ' | Kurucu Bilişim', desc: t, noindex: true,
      body: `<section class="hero thanks">${aurora}<div class="container" style="max-width:720px">
  <span class="ic">${icon('check')}</span><h1>${h}</h1><p class="lead" style="margin:0 auto 32px">${t} Acil durumlar için <a href="tel:${site.phone}" style="color:var(--link);font-weight:700">${site.phoneDisplay}</a> numarasından bize ulaşabilirsiniz.</p>
  <div class="hero__actions" style="justify-content:center">${btn('/', 'Ana sayfaya dön', 'btn--primary')}${btn('/blog/', 'Blog yazılarımız', 'btn--ghost', false)}</div>
</div></section>`,
    }, { sitemap: false });
  }

  // ---------- 404 ----------
  ctx.add('/404.html', layout({
    path: '/404.html', title: 'Sayfa bulunamadı | Kurucu Bilişim', desc: 'Aradığınız sayfa taşınmış veya kaldırılmış olabilir.', noindex: true,
    body: `<section class="hero thanks">${aurora}<div class="container" style="max-width:760px">
  <p class="notfound grad">404</p><h1>Aradığınız sayfa bulunamadı</h1><p class="lead" style="margin:0 auto 32px">Sayfa taşınmış veya kaldırılmış olabilir. Aşağıdaki bağlantılarla devam edebilirsiniz.</p>
  <div class="hero__actions" style="justify-content:center">${btn('/', 'Ana sayfa', 'btn--primary')}${btn('/e-donusum-hizmetleri/', 'E-Dönüşüm', 'btn--ghost', false)}${btn('/dijital-hizmetler/', 'Dijital Hizmetler', 'btn--ghost', false)}${btn('/iletisim/', 'İletişim', 'btn--ghost', false)}</div>
</div></section>`,
  }), { sitemap: false });
};
