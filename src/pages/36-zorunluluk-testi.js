// E-dönüşüm zorunluluk testi (/e-fatura-zorunlu-muyum/). Kurallar patron onaylı (27.10.2026);
// kaynak: VUK 509 güncel metni, e-Defter GT 1, VUK 596. Hesap tarayıcıda yapılır, hiçbir veri gönderilmez.
const { site } = require('../data');
const { layout, pageHero, ctaBand, faqBlock, faqSchema, esc, icon } = require('../lib');
const { activeCampaigns, campPath } = require('../components');

const P = '/e-fatura-zorunlu-muyum/';

const opt = (name, value, label, type = 'radio') => `<label class="zt-opt"><input type="${type}" name="${name}" value="${value}"><span>${esc(label)}</span></label>`;
const CIRO = [['0', '500 bin TL altı'], ['1', '500 bin – 3 milyon TL'], ['2', '3 – 10 milyon TL'], ['3', '10 milyon TL ve üzeri']];
const q = (n, legend, inner, extra = '') => `<fieldset class="zt-q"${extra}><legend><b>${n}</b>${esc(legend)}</legend><div class="zt-opts">${inner}</div></fieldset>`;

const faqs = [
  ['E-faturaya geçmek zorunda mıyım?', '2022 ve sonraki hesap dönemlerinde brüt satış hasılatı 3 milyon TL ve üzeri olan mükellefler, sınırı aştıkları yılı izleyen yılın 1 Temmuz’undan itibaren e-fatura kullanmak zorundadır. İnternetten satış yapanlar ile gayrimenkul ve motorlu taşıt işiyle uğraşanlarda sınır 500 bin TL’dir; SGK ile anlaşmalı sağlık kuruluşları, eczaneler, belgeli oteller, EPDK lisanslı akaryakıt bayileri ve hal komisyoncuları ise cirodan bağımsız olarak zorunludur.'],
  ['2026’da cirom 3 milyon TL’yi geçti, ne zaman e-faturaya geçmeliyim?', 'Sınırı 2026 yılında aştıysanız 1 Temmuz 2027’ye kadar e-fatura uygulamasına geçmeniz gerekir. Şirketler ve bilanço esasına göre defter tutanlar zaten 1 Ocak 2025’ten beri e-defter kullanmak zorundadır; işletme defteri tutanlar ise takip eden yılın başından, yani 1 Ocak 2028’den itibaren e-deftere geçer.'],
  ['Serbest meslek sahipleri e-faturaya geçmek zorunda mı?', 'Serbest meslek sahipleri için ciro 3 milyon TL’yi aşsa da e-fatura zorunluluğu yoktur; serbest meslek makbuzlarını e-SMM olarak düzenlemeleri zorunludur. Gelen e-faturaları takip edebilmek için mali müşavirin tavsiyesiyle gönüllü olarak e-faturaya geçilebilir.'],
  ['Kimler e-defter tutmak zorunda?', '1 Ocak 2025’ten itibaren bilanço esasına göre defter tutan tüm mükellefler (A.Ş. ve Ltd. gibi sermaye şirketleri dahil) e-defter tutmak zorundadır. İşletme defteri tutanlar ise e-faturaya geçtikleri yılı takip eden yılın 1 Ocak’ından itibaren e-defter tutar.'],
  ['Basit usul mükellefleri e-arşiv fatura kesmek zorunda mı?', 'Evet. Basit usul ve işletme hesabına göre defter tutanlar 31 Aralık 2026’ya kadar 3.000 TL’yi aşan faturalarını, 1 Ocak 2027’den itibaren ise tutarına bakılmaksızın tüm faturalarını e-arşiv fatura olarak düzenlemek zorundadır.'],
];

module.exports = (ctx) => {
  const crumbs = [['Ana Sayfa', '/'], ['Bilgi Bankası', '/bilgi-bankasi/'], ['E-Fatura Zorunluluk Testi', P]];
  const camp = activeCampaigns().find((c) => c.sayfa && c.hizmet === 'e-fatura');
  const cfg = {
    camp: camp ? { href: campPath(camp), title: camp.baslik, ozet: camp.ozet, bitis: camp.bitis } : null,
    tel: site.phone, wa: site.whatsapp,
    links: {
      ef: '/bilgi-bankasi/e-fatura/e-fatura-rehberi/', ea: '/bilgi-bankasi/e-arsiv-fatura/e-arsiv-fatura-rehberi/',
      ed: '/bilgi-bankasi/e-defter/e-defter-rehberi/', ei: '/bilgi-bankasi/e-irsaliye/e-irsaliye-rehberi/',
      es: '/bilgi-bankasi/e-smm/e-smm-rehberi/', et: '/bilgi-bankasi/mevzuat/e-tebligat-zorunlulugu-vuk-596/',
      mm: '/e-donusum-hizmetleri/mali-muhur/', ei2: '/e-donusum-hizmetleri/e-imza/',
    },
  };

  const form = `<form class="zt" id="zt" novalidate>
  ${q(1, 'İşletmenizin türü nedir?', [['sirket', 'Şirket (A.Ş., Ltd. vb.)'], ['bilanco', 'Şahıs işletmesi – bilanço esası'], ['isletme', 'Şahıs işletmesi – işletme defteri'], ['basit', 'Basit usul (esnaf)'], ['smm', 'Serbest meslek (avukat, doktor, mühendis vb.)']].map(([v, l]) => opt('tur', v, l)).join(''))}
  ${q(2, '2025 yılı cironuz (brüt satış hasılatı) yaklaşık ne kadar?', CIRO.map(([v, l]) => opt('c25', v, l)).join(''), ' data-ciro')}
  ${q(3, '2026 yılı için beklediğiniz ciro?', CIRO.map(([v, l]) => opt('c26', v, l)).join(''), ' data-ciro')}
  ${q(4, 'İnternetten satış yapıyor musunuz? (kendi siteniz, Trendyol, Hepsiburada vb.)', opt('net', 'e', 'Evet') + opt('net', 'h', 'Hayır'))}
  ${q(5, 'Faaliyet alanınız (birden çok seçebilirsiniz)', [['gm', 'Gayrimenkul veya motorlu taşıt alım-satım, kiralama, aracılık'], ['sg', 'SGK anlaşmalı sağlık hizmeti, eczane, optik, medikal ürün'], ['ot', 'Belgeli otel / konaklama'], ['ak', 'Akaryakıt / LPG (EPDK lisanslı, bayilik dahil)'], ['hl', 'Sebze-meyve hal komisyoncusu / tüccarı'], ['ag', 'Demir-çelik, maden, şeker veya gübre']].map(([v, l]) => opt('sek', v, l, 'checkbox')).join(''))}
  <p class="zt-err" id="zt-err" role="alert" hidden></p>
  <button class="btn btn--primary btn--lg" type="submit">Sonucu Göster ${icon('arrow')}</button>
  <p class="zt-privacy">${icon('shield')} Cevaplarınız hiçbir yere gönderilmez ve kaydedilmez; hesaplama tarayıcınızda yapılır.</p>
</form>
<div class="zt-result" id="zt-result" aria-live="polite" tabindex="-1" hidden></div>`;

  const style = `<style>
.zt{display:grid;gap:18px;max-width:880px;margin-inline:auto}
.zt-q{border:0;margin:0;padding:24px;background:var(--card);border-radius:var(--radius)}
.zt-q[hidden]{display:none}
.zt-q legend{float:left;width:100%;font-weight:650;font-size:1.08rem;letter-spacing:-.01em;margin-bottom:14px;display:flex;gap:12px;align-items:baseline}
.zt-q legend b{flex:none;display:inline-grid;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--ic-bg);color:var(--brand-ink);font-size:.9rem}
.zt-opts{clear:both;display:flex;flex-wrap:wrap;gap:10px}
.zt-opt{position:relative;cursor:pointer}
.zt-opt input{position:absolute;opacity:0;inset:0;margin:0;cursor:pointer}
.zt-opt span{display:inline-block;padding:10px 16px;border-radius:999px;background:var(--bg);border:1px solid var(--line-2);font-size:.95rem;font-weight:500;transition:background .2s,border-color .2s,color .2s}
.zt-opt input:checked+span{background:var(--brand);border-color:var(--brand);color:#fff}
.zt-opt input:focus-visible+span{outline:2px solid var(--brand);outline-offset:3px}
.zt .btn{justify-self:start}
.zt-err{color:var(--brand-ink);font-weight:600;margin:0}
.zt-privacy{display:flex;gap:8px;align-items:center;color:var(--muted);font-size:.88rem;margin:0}
.zt-privacy svg{width:16px;height:16px;flex:none}
.zt-result{max-width:880px;margin:40px auto 0;scroll-margin-top:calc(var(--header-h) + 24px)}
.zt-result:focus{outline:none}
.zt-result h2{margin-bottom:18px}
.zt-row{display:flex;gap:16px;padding:18px 20px;border-radius:var(--radius-sm);background:var(--card);margin-bottom:10px;align-items:flex-start}
.zt-badge{flex:none;font-size:.78rem;font-weight:700;padding:5px 10px;border-radius:999px;white-space:nowrap;margin-top:2px}
.zt-row--z .zt-badge{background:var(--brand);color:#fff}
.zt-row--d .zt-badge{background:var(--surface-2);color:var(--muted)}
.zt-row--b .zt-badge{background:#fff4ea;color:#b54708}
.zt-row h3{font-size:1.08rem;margin:0 0 4px}
.zt-row p{margin:0;color:var(--muted);font-size:.96rem}
.zt-row a{color:var(--link);text-decoration:underline;text-underline-offset:3px;font-size:.9rem}
.zt-camp{margin:24px 0 10px;padding:24px;border-radius:var(--radius);background:linear-gradient(150deg,#fff4ea,#ffe4cc);color:#1d1d1f}
.zt-camp strong{display:block;font-size:1.15rem;margin-bottom:6px}
.zt-camp p{margin:0 0 12px;color:#424245}
.zt-camp a{color:#b54708;font-weight:650}
.zt-actions{display:flex;flex-wrap:wrap;gap:12px;margin:22px 0 12px}
.zt-note{color:var(--muted);font-size:.86rem;margin:14px 0 0}
@media (max-width:640px){.zt-q{padding:18px}.zt-row{flex-direction:column;gap:8px}}
</style>
`;

  const script = `<script>
(function(){
var C=${JSON.stringify(cfg).replace(/</g, '\\u003c')};
var f=document.getElementById('zt'),out=document.getElementById('zt-result'),err=document.getElementById('zt-err');
function v(n){var x=f.querySelector('input[name="'+n+'"]:checked');return x?x.value:'';}
function sek(){return Array.prototype.map.call(f.querySelectorAll('input[name="sek"]:checked'),function(x){return x.value;});}
function sync(){var t=v('tur');Array.prototype.forEach.call(f.querySelectorAll('[data-ciro]'),function(e){e.hidden=t==='basit';});var i=0;Array.prototype.forEach.call(f.querySelectorAll('.zt-q'),function(e){if(!e.hidden)e.querySelector('legend b').textContent=++i;});}
f.addEventListener('change',sync);sync();
function a(h,t){return ' <a href="'+h+'">'+t+'</a>';}
function row(k,b,h,p){return '<div class="zt-row zt-row--'+k+'"><span class="zt-badge">'+b+'</span><div><h3>'+h+'</h3><p>'+p+'</p></div></div>';}
f.addEventListener('submit',function(e){
  e.preventDefault();
  var t=v('tur'),c25=v('c25'),c26=v('c26'),s=sek(),L=C.links;
  var miss=!t?'İşletme türünü seçin.':(t!=='basit'&&(!c25||!c26))?'2025 ve 2026 cirolarınızı seçin.':'';
  err.hidden=!miss;err.textContent=miss;if(miss)return;
  var has=function(k){return s.indexOf(k)>-1;};
  var n25=+c25||0,n26=+c26||0,thr=(v('net')==='e'||has('gm'))?1:2;
  var sektorEf=has('sg')||has('ot')||has('ak')||has('hl');
  var r=[],ef=null,efY=0;
  // E-Fatura
  if(t==='smm'){ef='g';r.push(row('b','Gönüllü','E-Fatura','Serbest meslek sahipleri için ciro 3 milyon TL’yi aşsa da e-fatura zorunluluğu yoktur. Gelen e-faturalarınızı takip edebilmek için mali müşavirinizin tavsiyesiyle gönüllü olarak geçebilirsiniz.'+a(L.ef,'E-Fatura Rehberi')));}
  else if(sektorEf){ef='z';r.push(row('z','Zorunlu','E-Fatura','Faaliyet alanınız nedeniyle cironuzdan bağımsız olarak e-fatura kullanmanız zorunludur. Henüz geçmediyseniz vakit kaybetmeden geçmelisiniz.'+a(L.ef,'E-Fatura Rehberi')));}
  else if(t!=='basit'&&n25>=thr){ef='z';efY=2026;r.push(row('z','Zorunlu','E-Fatura','2025 cironuz sınırı aştığı için 1 Temmuz 2026’dan itibaren e-fatura kullanmanız gerekiyor. Henüz geçmediyseniz hemen geçmelisiniz.'+a(L.ef,'E-Fatura Rehberi')));}
  else if(t!=='basit'&&n26>=thr){ef='z';efY=2027;r.push(row('z','1 Temmuz 2027','E-Fatura','2026 cironuz sınırı aşarsa 1 Temmuz 2027’ye kadar e-faturaya geçmeniz gerekir.'+(thr===1?' İnternetten satış ve gayrimenkul/motorlu taşıt işlerinde sınır 500 bin TL’dir.':' Genel sınır 3 milyon TL’dir.')+a(L.ef,'E-Fatura Rehberi')));}
  else{r.push(row('d','Zorunlu değil','E-Fatura','Verdiğiniz bilgilere göre şu an e-fatura zorunluluğunuz yok. İsterseniz gönüllü olarak geçebilirsiniz.'+a(L.ef,'E-Fatura Rehberi')));}
  // E-Arşiv
  if(t==='smm'){}
  else if(t==='sirket'||t==='bilanco'){r.push(row('z','Zorunlu','E-Arşiv Fatura','1 Ocak 2026’dan itibaren tüm faturalarınızı tutarına bakılmaksızın elektronik olarak (e-arşiv ya da alıcı e-fatura kullanıcısıysa e-fatura) düzenlemeniz gerekiyor.'+a(L.ea,'E-Arşiv Rehberi')));}
  else if(ef==='z'){r.push(row('z','Zorunlu','E-Arşiv Fatura','E-faturayla birlikte e-arşiv fatura uygulamasına da geçmeniz gerekir; e-fatura kullanmayan alıcılara faturalarınızı e-arşiv olarak düzenlersiniz.'+a(L.ea,'E-Arşiv Rehberi')));}
  else{r.push(row('z','1 Ocak 2027','E-Arşiv Fatura','31 Aralık 2026’ya kadar 3.000 TL’yi aşan faturalarınızı, 1 Ocak 2027’den itibaren ise tutarına bakılmaksızın tüm faturalarınızı e-arşiv olarak düzenlemeniz gerekiyor.'+a(L.ea,'E-Arşiv Rehberi')));}
  // E-Defter
  if(t==='sirket'||t==='bilanco'){r.push(row('z','Zorunlu','E-Defter','1 Ocak 2025’ten itibaren bilanço esasına göre defter tutan tüm mükellefler (A.Ş. ve Ltd. gibi sermaye şirketleri dahil) e-defter tutmak zorundadır. Bilanço esasına yeni geçenler ve yeni işe başlayanlar geçiş tarihinden itibaren e-defter tutar.'+a(L.ed,'E-Defter Rehberi')));}
  else if(ef==='z'&&efY){r.push(row('z','1 Ocak '+(efY+1),'E-Defter','E-faturaya yıl içinde geçenler, takip eden yılın 1 Ocak’ından itibaren e-defter tutmak zorundadır.'+a(L.ed,'E-Defter Rehberi')));}
  else if(ef==='z'){r.push(row('z','Zorunlu','E-Defter','E-faturaya geçtiğiniz yılı takip eden yılın 1 Ocak’ından itibaren e-defter tutmanız gerekir.'+a(L.ed,'E-Defter Rehberi')));}
  else if(t!=='basit'){r.push(row('d','Zorunlu değil','E-Defter','Verdiğiniz bilgilere göre şu an e-defter zorunluluğunuz yok.'+a(L.ed,'E-Defter Rehberi')));}
  // E-İrsaliye
  var irsSek=has('ak')||has('hl');
  if(has('ag')&&t==='basit'){r.push(row('b','Danışın','E-İrsaliye','Demir-çelik işinde basit usul mükellefler e-irsaliye zorunluluğunun dışındadır; maden, şeker ve gübre için durumunuzu mali müşavirinize danışın.'+a(L.ei,'E-İrsaliye Rehberi')));}
  else if(irsSek||has('ag')){r.push(row('z','Zorunlu','E-İrsaliye','Faaliyet alanınız nedeniyle cirodan bağımsız olarak sevk irsaliyelerinizi e-irsaliye olarak düzenlemeniz zorunludur.'+a(L.ei,'E-İrsaliye Rehberi')));}
  else if(ef==='z'&&t!=='basit'&&n25>=3){r.push(row('z','Zorunlu','E-İrsaliye','E-fatura mükelleflerinden cirosu 10 milyon TL ve üzeri olanlar, izleyen yılın 1 Temmuz’undan itibaren e-irsaliye kullanmak zorundadır. 2025 cironuza göre 1 Temmuz 2026’dan beri zorunlusunuz.'+a(L.ei,'E-İrsaliye Rehberi')));}
  else if(ef==='z'&&t!=='basit'&&n26>=3){r.push(row('z','1 Temmuz 2027','E-İrsaliye','2026 cironuz 10 milyon TL’yi aşarsa 1 Temmuz 2027’ye kadar e-irsaliyeye geçmeniz gerekir.'+a(L.ei,'E-İrsaliye Rehberi')));}
  else{r.push(row('d','Zorunlu değil','E-İrsaliye','Verdiğiniz bilgilere göre şu an e-irsaliye zorunluluğunuz yok.'+a(L.ei,'E-İrsaliye Rehberi')));}
  // E-SMM
  if(t==='smm'){r.push(row('z','Zorunlu','E-SMM (E-Serbest Meslek Makbuzu)','Vergiden muaf olmayan serbest meslek sahipleri makbuzlarını e-SMM olarak düzenlemek zorundadır. Yeni işe başlayanlar, işe başladıkları ayı izleyen 3. ayın sonuna kadar geçmelidir.'+a(L.es,'E-SMM Rehberi')));}
  // E-Tebligat
  var gecti=new Date()>new Date('2026-11-30T23:59:59+03:00');
  if(t==='basit'){r.push(row('d','Zorunlu değil','E-Tebligat','Basit usul mükellefler için e-tebligat zorunlu değildir; isterseniz gönüllü olarak dahil olabilirsiniz.'+a(L.et,'E-Tebligat Rehberi')));}
  else{r.push(row('z',gecti?'Zorunlu':'30 Kasım 2026','E-Tebligat',(gecti?'Henüz e-tebligat sistemine dahil değilseniz hemen başvurmalısınız (mevcut mükellefler için son gün 30 Kasım 2026’ydı).':'Henüz e-tebligat sistemine dahil değilseniz 30 Kasım 2026’ya kadar dahil olmanız gerekiyor.')+' Yeni işe başlayanlar 15 gün içinde başvurmalıdır.'+a(L.et,'E-Tebligat Rehberi')));}
  // Gerekenler, kampanya, iletişim
  var html='<h2>Sonucunuz</h2>'+r.join('');
  if(ef==='z'||ef==='g')html+='<p class="zt-note">E-fatura başvurusu için şirketlerde <a href="'+L.mm+'">mali mühür</a>, gerçek kişi mükelleflerde <a href="'+L.ei2+'">e-imza</a> gerekir.</p>';
  var cp=C.camp;if(cp&&(ef==='z'||ef==='g')&&new Date()<=new Date(cp.bitis+'T23:59:59+03:00'))html+='<div class="zt-camp"><strong>'+cp.title+'</strong><p>'+cp.ozet+'</p><a href="'+cp.href+'">Kampanya detayları →</a></div>';
  html+='<div class="zt-actions"><a class="btn btn--primary btn--lg" href="tel:'+C.tel+'">Hemen Arayın</a><a class="btn btn--ghost btn--lg" href="https://wa.me/'+C.wa+'" target="_blank" rel="noopener">WhatsApp’tan Yazın</a></div>';
  html+='<p class="zt-note">Bu test, Gelir İdaresi Başkanlığı düzenlemelerine göre hazırlanmış bilgilendirme aracıdır. Özel durumlar (istisnalar, Başkanlıkça yazılı bildirimle getirilen zorunluluklar, sektöre özel diğer belgeler vb.) dikkate alınmamıştır; kesin değerlendirme için bize veya mali müşavirinize danışın.</p>';
  out.innerHTML=html;out.hidden=false;out.focus({preventScroll:true});out.scrollIntoView({behavior:'smooth',block:'start'});
  if(window.dataLayer)dataLayer.push({event:'zorunluluk_testi',tur:t,efatura:ef||'degil'});
});
})();
</script>`;

  const body = `${pageHero({ eyebrow: 'Ücretsiz test', h1: 'İşletmem E-Fatura Geçiş Zorunluluğu Kapsamında mı?', lead: 'Birkaç kısa soruyu yanıtlayın; e-fatura, e-arşiv, e-defter, e-irsaliye, e-SMM ve e-tebligat için zorunluluklarınızı ve son tarihleri hemen görün.', crumbs })}
<section class="section" style="padding-top:0"><div class="container">
  ${form}
</div></section>
<section class="section section--light"><div class="container prose" style="margin-inline:auto">
  <h2>Test hangi kurallara göre hesaplıyor?</h2>
  <p>Sonuçlar, Gelir İdaresi Başkanlığı’nın 509 Sıra No’lu Vergi Usul Kanunu Genel Tebliği’nin güncel metni, Elektronik Defter Genel Tebliği ve e-tebligatı düzenleyen 596 Sıra No’lu Tebliğ esas alınarak hesaplanır.</p>
  <table><thead><tr><th>Belge</th><th>Ne zaman zorunlu?</th></tr></thead><tbody>
  <tr><td><strong>E-Fatura</strong></td><td>Ciro 3 milyon TL ve üzeri (internetten satış, gayrimenkul ve motorlu taşıt işlerinde 500 bin TL): sınırın aşıldığı yılı izleyen yılın 1 Temmuz’u. Bazı sektörlerde cirodan bağımsız.</td></tr>
  <tr><td><strong>E-Arşiv Fatura</strong></td><td>Bilanço esasında 1 Ocak 2026’dan, basit usul ve işletme defterinde 1 Ocak 2027’den itibaren tüm faturalar.</td></tr>
  <tr><td><strong>E-Defter</strong></td><td>Bilanço esasına göre defter tutan tüm mükellefler (şirketler dahil): 1 Ocak 2025’ten itibaren. İşletme defterinde e-faturaya geçenler: takip eden yılın 1 Ocak’ı.</td></tr>
  <tr><td><strong>E-İrsaliye</strong></td><td>Cirosu 10 milyon TL ve üzeri e-fatura mükellefleri: izleyen yılın 1 Temmuz’u. Bazı sektörlerde cirodan bağımsız.</td></tr>
  <tr><td><strong>E-SMM</strong></td><td>Vergiden muaf olmayan tüm serbest meslek sahipleri.</td></tr>
  <tr><td><strong>E-Tebligat</strong></td><td>Şirketler ve gerçek usuldeki mükellefler; henüz dahil olmayanlar için 30 Kasım 2026.</td></tr>
  </tbody></table>
  <p>Yaklaşan tüm tarihler için <a href="/bilgi-bankasi/mevzuat/e-donusum-son-tarihler-takvimi/">E-Dönüşüm Son Tarihler Takvimi</a>’ne bakabilirsiniz.</p>
  <p><em>Resmî kaynaklar:</em> <a href="https://ebelge.gib.gov.tr" target="_blank" rel="noopener">GİB e-Belge</a> · <a href="https://www.edefter.gov.tr" target="_blank" rel="noopener">e-Defter</a> · <a href="https://www.resmigazete.gov.tr/eskiler/2026/10/20261011-4.htm" target="_blank" rel="noopener">Resmî Gazete, VUK 596</a></p>
</div></section>
<section class="section"><div class="container">
  <div class="section-head center"><span class="eyebrow">S.S.S.</span><h2>E-dönüşüm zorunlulukları hakkında sık sorulanlar</h2></div>${faqBlock(faqs)}
</div></section>
${ctaBand('Geçiş sürecinizi birlikte planlayalım', 'E-fatura, e-arşiv, e-defter ve e-tebligat geçişinizi başvurudan ilk belgenize kadar biz yönetelim.')}
${script}`;

  ctx.add(P, layout({
    path: P, crumbs, body, extraHead: style,
    title: 'İşletmem E-Fatura Geçiş Zorunluluğu Kapsamında mı?',
    desc: 'Birkaç soruda e-fatura, e-arşiv, e-defter, e-irsaliye, e-SMM ve e-tebligat zorunluluğunuzu ve son tarihleri öğrenin. Ücretsiz, kayıt gerektirmez.',
    schema: [faqSchema(faqs)],
  }), { priority: '0.8' });
};
