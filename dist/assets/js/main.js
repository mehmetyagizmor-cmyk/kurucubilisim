/* Kurucu Bilişim — etkileşimler (bağımlılıksız) */
(function () {
  'use strict';
  var doc = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  // Header: kaydırınca cam efekti + yukarı çık butonu
  var header = $('.header'), topBtn = $('.fab__top');
  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle('is-scrolled', y > 10);
    if (topBtn) topBtn.classList.toggle('is-on', y > 700);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  requestAnimationFrame(onScroll); // ilk ölçüm bir sonraki karede: zorunlu yeniden yerleşimi önler

  // Kaydırma ilerlemesi: [data-scroll] öğelerine --p (0 → 1) yazar.
  // Öğenin üstü ekranın data-scroll-start oranına gelince başlar, data-scroll-len ekran boyu sonra 1 olur.
  var scrollEls = $$('[data-scroll]');
  var wordsEl = $('[data-words]'), words = [];
  if (wordsEl && !reduce) {
    // Metin DOM'da kalır (SEO), yalnızca kelimeler span'e sarılır
    (function wrap(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (w) {
            if (!w) return;
            if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(w)); return; }
            var s = document.createElement('span'); s.className = 'w'; s.textContent = w; frag.appendChild(s); words.push(s);
          });
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1) wrap(n);
      });
    })(wordsEl);
    wordsEl.classList.add('is-split');
    scrollEls.push(wordsEl);
  }
  if (reduce) scrollEls.forEach(function (el) { el.style.setProperty('--p', 1); });
  else if (scrollEls.length) {
    var ticking = false;
    var update = function () {
      ticking = false;
      var vh = window.innerHeight;
      scrollEls.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom < -vh || r.top > vh * 2) return;
        var start = +(el.getAttribute('data-scroll-start') || .85), len = +(el.getAttribute('data-scroll-len') || .6);
        var p = Math.min(1, Math.max(0, (vh * start - r.top) / (vh * len)));
        el.style.setProperty('--p', p.toFixed(3));
        if (el === wordsEl) {
          var on = Math.round(p * words.length);
          words.forEach(function (w, i) { w.classList.toggle('is-on', i < on); });
        }
      });
    };
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener('resize', update);
    requestAnimationFrame(update);
  }

  // Yatay kart şeritleri: oklarla kaydırma, uçlarda okları pasifleştirme
  $$('[data-rail]').forEach(function (rail) {
    var track = $('.rail__track', rail), btns = $$('.rail__nav button', rail);
    function state() {
      var max = track.scrollWidth - track.clientWidth - 2;
      btns[0].disabled = track.scrollLeft <= 2;
      btns[1].disabled = track.scrollLeft >= max;
      rail.classList.toggle('is-static', max <= 0);
    }
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        var card = track.firstElementChild, gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        var step = card ? card.offsetWidth + gap : track.clientWidth * .8;
        var n = Math.max(1, Math.floor((track.clientWidth + gap) / step));
        track.scrollBy({ left: +b.getAttribute('data-dir') * step * n, behavior: reduce ? 'auto' : 'smooth' });
      });
    });
    track.addEventListener('scroll', function () { requestAnimationFrame(state); }, { passive: true });
    window.addEventListener('resize', state);
    rail.addEventListener('rail:show', state);
    requestAnimationFrame(state);
  });

  // "Neden biz": ekranın ortasına gelen madde vurgulanır
  var storyItems = $$('[data-story]');
  if (storyItems.length && !reduce) {
    document.documentElement.classList.add('has-story');
    var storyTick = false;
    var pickStory = function () {
      storyTick = false;
      var mid = window.innerHeight / 2, best = null, bestD = Infinity;
      storyItems.forEach(function (el) {
        var r = el.getBoundingClientRect(), d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bestD) { bestD = d; best = el; }
      });
      storyItems.forEach(function (el) { el.classList.toggle('is-active', el === best); });
    };
    window.addEventListener('scroll', function () { if (!storyTick) { storyTick = true; requestAnimationFrame(pickStory); } }, { passive: true });
    requestAnimationFrame(pickStory);
  }
  if (topBtn) topBtn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });

  // Mobil menü
  var burger = $('.burger');
  if (burger) {
    burger.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      burger.setAttribute('aria-expanded', open);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
        document.body.classList.remove('menu-open'); burger.setAttribute('aria-expanded', 'false'); burger.focus();
      }
    });
  }

  // Görünür olunca animasyon
  var revealEls = $$('[data-reveal]');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  // Sayaçlar: HTML'de gerçek değer yazılı (SEO), görünür olunca 0'dan sayar
  var counters = $$('[data-count]');
  if (counters.length && 'IntersectionObserver' in window && !reduce) {
    var fmt = function (n) { return n.toLocaleString('tr-TR'); };
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, end = +el.getAttribute('data-count'), suf = el.getAttribute('data-suffix') || '', t0 = null;
        co.unobserve(el);
        (function tick(t) {
          if (!t0) t0 = t;
          var p = Math.min(Math.max((t - t0) / 1800, 0), 1), e = 1 - Math.pow(1 - p, 4);
          el.textContent = fmt(Math.round(end * e)) + suf;
          if (p < 1) requestAnimationFrame(tick);
        })(performance.now());
      });
    }, { threshold: .5 });
    counters.forEach(function (el) { co.observe(el); });
  }

  // Sekmeler (segment kontrol: seçili arka plan kayarak hareket eder)
  $$('[role="tablist"]').forEach(function (list) {
    var tabs = $$('[role="tab"]', list);
    var slider = list.classList.contains('tabs');
    function moveTo(tab) {
      if (!slider || !tab) return;
      list.style.setProperty('--tx', tab.offsetLeft + 'px');
      list.style.setProperty('--tw', tab.offsetWidth + 'px');
      list.classList.add('is-ready');
    }
    if (slider) {
      var cur = function () { return tabs.filter(function (t) { return t.getAttribute('aria-selected') === 'true'; })[0]; };
      requestAnimationFrame(function () { moveTo(cur()); });
      window.addEventListener('resize', function () { moveTo(cur()); });
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { moveTo(cur()); });
    }
    function select(tab) {
      moveTo(tab);
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1;
        var p = document.getElementById(t.getAttribute('aria-controls'));
        if (p) {
          p.hidden = !on;
          if (on) $$('[data-rail]', p).forEach(function (r) { r.dispatchEvent(new Event('rail:show')); });
        }
      });
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var k = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (k) { var n = tabs[(i + k + tabs.length) % tabs.length]; select(n); n.focus(); }
      });
    });
  });

  // Dönen kelimeler
  $$('.rotator').forEach(function (r) {
    var items = $$('span', r), i = 0;
    if (items.length < 2 || reduce) return;
    setInterval(function () {
      var cur = items[i]; i = (i + 1) % items.length;
      cur.classList.remove('is-on'); cur.classList.add('is-out');
      items[i].classList.remove('is-out'); items[i].classList.add('is-on');
      setTimeout(function () { cur.classList.remove('is-out'); }, 600);
    }, 2400);
  });

  // Hero canlı akış: satırları sırayla döndürür
  var feed = $('[data-feed]');
  if (feed && !reduce) {
    setInterval(function () {
      var first = feed.firstElementChild;
      first.style.opacity = '0'; first.style.transform = 'translateY(-8px)';
      setTimeout(function () {
        feed.appendChild(first);
        first.style.opacity = ''; first.style.transform = '';
      }, 400);
    }, 2800);
  }

  // Blog filtreleri
  var filters = $('[data-filters]');
  if (filters) {
    filters.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      var cat = b.getAttribute('data-cat');
      $$('button', filters).forEach(function (x) { x.setAttribute('aria-selected', x === b); });
      $$('[data-cats]').forEach(function (c) {
        c.hidden = cat !== 'all' && c.getAttribute('data-cats').split('|').indexOf(cat) < 0;
      });
    });
  }

  // Harita: tıklayınca yükle (hız + KVKK)
  $$('[data-map]').forEach(function (box) {
    function load() {
      if (box.querySelector('iframe')) return;
      var f = document.createElement('iframe');
      f.src = box.getAttribute('data-map'); f.title = 'Kurucu Bilişim konum haritası';
      f.loading = 'lazy'; f.referrerPolicy = 'no-referrer-when-downgrade'; f.allowFullscreen = true;
      box.innerHTML = ''; box.appendChild(f); box.removeAttribute('role'); box.removeAttribute('tabindex');
    }
    box.addEventListener('click', load);
    box.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); load(); } });
  });

  // Formlar: fetch ile gönder, başarılıysa teşekkür sayfasına yönlendir
  var qs = new URLSearchParams(window.location.search);
  $$('form[data-form]').forEach(function (form) {
    var msg = $('.form__msg', form);
    var ts = form.querySelector('[name="ts"]'), pg = form.querySelector('[name="sayfa"]');
    if (ts) ts.value = Math.floor(Date.now() / 1000);
    if (pg) pg.value = window.location.pathname + (document.referrer ? ' (geliş: ' + document.referrer + ')' : '');
    // ?hizmet=e-imza → ilgili kutuyu işaretle / konuyu seç
    var pre = qs.get('hizmet');
    if (pre) $$('[data-key="' + pre.replace(/[^a-z0-9-]/g, '') + '"]', form).forEach(function (el) {
      if (el.tagName === 'OPTION') el.selected = true; else el.checked = true;
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var btn = $('button[type="submit"]', form), label = btn.innerHTML;
      btn.disabled = true; btn.textContent = 'Gönderiliyor…';
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (r) { return r.json().catch(function () { return { ok: r.ok }; }); })
        .then(function (res) {
          if (!res.ok) throw new Error(res.error || 'Gönderilemedi');
          if (window.dataLayer) window.dataLayer.push({ event: 'form_submit', form_name: form.getAttribute('data-form') });
          window.location.href = form.getAttribute('data-thanks');
        })
        .catch(function (err) {
          msg.className = 'form__msg is-err';
          msg.textContent = (err && err.message && err.message !== 'Failed to fetch' ? err.message + '. ' : '') + 'Lütfen tekrar deneyin veya bizi arayın.';
          btn.disabled = false; btn.innerHTML = label;
        });
    });
  });

  // Çerez onayı (Google Consent Mode v2)
  var cookie = $('.cookie'), KEY = 'kb-consent';
  function consent(granted) {
    var v = granted ? 'granted' : 'denied';
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: v, ad_storage: v, ad_user_data: v, ad_personalization: v });
    }
  }
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  if (saved) consent(saved === 'yes');
  else if (cookie) setTimeout(function () { cookie.classList.add('is-on'); }, 1200);
  $$('[data-consent]').forEach(function (b) {
    b.addEventListener('click', function () {
      var yes = b.getAttribute('data-consent') === 'yes';
      try { localStorage.setItem(KEY, yes ? 'yes' : 'no'); } catch (e) {}
      consent(yes); cookie.classList.remove('is-on');
    });
  });

  // Blog yazısı: okuma ilerlemesi, aktif içindekiler, link kopyalama
  var article = $('.prose[data-article]'), bar = $('.read-progress');
  if (article && bar) {
    window.addEventListener('scroll', function () {
      var r = article.getBoundingClientRect(), total = r.height - window.innerHeight;
      bar.style.transform = 'scaleX(' + Math.min(1, Math.max(0, -r.top / (total > 0 ? total : 1))) + ')';
    }, { passive: true });
  }
  var tocLinks = $$('.toc a');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var heads = tocLinks.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); }).filter(Boolean);
    var to = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        tocLinks.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id); });
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    heads.forEach(function (h) { to.observe(h); });
  }
  $$('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var done = function () { b.setAttribute('aria-label', 'Bağlantı kopyalandı'); b.style.background = 'var(--ok)'; setTimeout(function () { b.style.background = ''; }, 1500); };
      if (navigator.clipboard) navigator.clipboard.writeText(window.location.href).then(done);
    });
  });

  // Yıl
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
