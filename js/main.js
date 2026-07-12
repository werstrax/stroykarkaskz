/* ============================================================
   СТРОЙКАРКАС — interactions
   ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var WA_NUMBER = '77013337108'; // WhatsApp СТРОЙКАРКАС
  function fmtNum(n) { return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }

  document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Year ---------- */
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------- Hero background video (optional, graceful fallback to photo) ---------- */
    var heroVideo = document.querySelector('.hero__video');
    if (heroVideo) {
      if (reduceMotion) { heroVideo.removeAttribute('autoplay'); try { heroVideo.pause(); } catch (e) {} }
      else {
        heroVideo.addEventListener('loadeddata', function () { heroVideo.classList.add('is-ready'); });
        heroVideo.muted = true;
        heroVideo.load();
        var hvp = heroVideo.play();
        if (hvp && hvp.catch) hvp.catch(function () {});
      }
    }

    /* ---------- Header scroll state + progress ---------- */
    var header = document.getElementById('header');
    var progress = document.getElementById('scrollProgress');
    function onScroll() {
      var y = window.scrollY || document.documentElement.scrollTop;
      if (header) header.classList.toggle('header--scrolled', y > 20);
      if (progress) {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---------- Mobile menu ---------- */
    var burger = document.getElementById('burger');
    var mobileMenu = document.getElementById('mobileMenu');
    function closeMenu() {
      if (!mobileMenu) return;
      mobileMenu.classList.remove('is-open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      burger.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
    if (burger && mobileMenu) {
      burger.addEventListener('click', function () {
        var open = mobileMenu.classList.toggle('is-open');
        mobileMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
        burger.classList.toggle('is-open', open);
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.body.style.overflow = open ? 'hidden' : '';
      });
    }

    /* ---------- Smooth anchor scroll with header offset ---------- */
    var headerH = 76;
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (id === '#') { e.preventDefault(); closeMenu(); return; } // кнопки со своим обработчиком — не навигация
        if (id === '#top') {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
          closeMenu();
          return;
        }
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        closeMenu();
        var top = target.getBoundingClientRect().top + window.scrollY - headerH;
        window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' });
      });
    });

    /* ---------- Reveal animations ---------- */
    var revealEls = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
    if (reduceMotion) {
      revealEls.forEach(function (el) { el.classList.add('is-inview'); });
    } else {
      // Scroll-position reveal (CSS-driven, no dependency on GSAP/IntersectionObserver).
      // Runs immediately so above-the-fold content is never hidden.
      var revealTicking = false;
      function revealInView() {
        revealTicking = false;
        var vh = window.innerHeight || document.documentElement.clientHeight;
        var batch = [];
        for (var i = revealEls.length - 1; i >= 0; i--) {
          var r = revealEls[i].getBoundingClientRect();
          if (r.top < vh * 0.92 && r.bottom > 0) {
            batch.push(revealEls[i]);
            revealEls.splice(i, 1);
          }
        }
        if (!batch.length) return;
        batch.reverse(); // DOM-порядок: волна карточек слева направо
        batch.forEach(function (el, j) {
          var d = Math.min(j * 70, 350);
          if (d) {
            el.style.transitionDelay = d + 'ms';
            setTimeout(function () { el.style.transitionDelay = ''; }, d + 800); // чтобы hover не лагал после reveal
          }
          el.classList.add('is-inview');
        });
      }
      function onRevealScroll() { if (!revealTicking) { revealTicking = true; requestAnimationFrame(revealInView); } }
      revealInView(); // reveal above-the-fold immediately
      requestAnimationFrame(revealInView);
      setTimeout(revealInView, 250);
      window.addEventListener('scroll', onRevealScroll, { passive: true });
      window.addEventListener('resize', onRevealScroll);
      window.addEventListener('load', function () { requestAnimationFrame(revealInView); });
      // Hard failsafe: if detection revealed nothing (e.g. broken/zero viewport), show everything
      setTimeout(function () {
        if (!document.querySelector('[data-reveal].is-inview')) {
          revealEls.forEach(function (el) { el.classList.add('is-inview'); });
          revealEls.length = 0;
        }
      }, 1500);
      // Лёгкий параллакс hero-фона (без библиотек)
      var heroImg = document.querySelector('.hero__parallax');
      if (heroImg) {
        var pTick = false;
        window.addEventListener('scroll', function () {
          if (pTick) return;
          pTick = true;
          requestAnimationFrame(function () {
            pTick = false;
            var y = window.scrollY || 0;
            if (y < window.innerHeight * 1.2) heroImg.style.transform = 'scale(1.12) translateY(' + (y * 0.12) + 'px)';
          });
        }, { passive: true });
      }
      /* ---------- Счётчик нагрузки 170 → 4 420 кг ---------- */
      var loadNum = document.getElementById('loadNum');
      if (loadNum) {
        var loadHost = document.querySelector('.vshow');
        var loadDone = false;
        var loadTick = function () {
          if (loadDone || !loadHost || !loadHost.classList.contains('is-inview')) return;
          loadDone = true;
          window.removeEventListener('scroll', loadTick);
          var t0 = null, dur = 1600;
          function fr(ts) {
            if (!t0) t0 = ts;
            var p = Math.min(1, (ts - t0) / dur);
            var e = 1 - Math.pow(1 - p, 3); // ease-out
            var v = Math.round(170 + (4420 - 170) * e);
            loadNum.textContent = String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            if (p < 1) requestAnimationFrame(fr);
          }
          requestAnimationFrame(fr);
        };
        window.addEventListener('scroll', loadTick, { passive: true });
        setTimeout(loadTick, 400);
        setTimeout(loadTick, 1900); // на случай reveal-фейлсейфа без скролла
      }
    }

    /* ---------- Counters ---------- */
    var counters = Array.prototype.slice.call(document.querySelectorAll('.counter'));
    function animateCounter(el) {
      var to = parseFloat(el.getAttribute('data-to')) || 0;
      if (reduceMotion) { el.textContent = fmtNum(to); return; }
      var start = null, dur = 1600;
      function tick(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = fmtNum(to * eased);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = fmtNum(to);
      }
      requestAnimationFrame(tick);
    }
    if (counters.length) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { animateCounter(en.target); cio.unobserve(en.target); }
        });
      }, { threshold: 0.6 });
      counters.forEach(function (c) { cio.observe(c); });
    }

    /* ---------- Works slider ---------- */
    var track = document.getElementById('worksTrack');
    var prevBtn = document.getElementById('worksPrev');
    var nextBtn = document.getElementById('worksNext');
    if (track) {
      function cardStep() {
        var card = track.querySelector('.work');
        return card ? card.offsetWidth + 22 : 400;
      }
      function updateBtns() {
        if (!prevBtn || !nextBtn) return;
        prevBtn.disabled = track.scrollLeft < 8;
        nextBtn.disabled = track.scrollLeft > track.scrollWidth - track.clientWidth - 8;
      }
      if (nextBtn) nextBtn.addEventListener('click', function () { track.scrollBy({ left: cardStep(), behavior: 'smooth' }); });
      if (prevBtn) prevBtn.addEventListener('click', function () { track.scrollBy({ left: -cardStep(), behavior: 'smooth' }); });
      track.addEventListener('scroll', updateBtns, { passive: true });
      updateBtns();

      // Drag to scroll
      var isDown = false, startX = 0, startScroll = 0, moved = false;
      track.addEventListener('pointerdown', function (e) {
        isDown = true; moved = false; startX = e.clientX; startScroll = track.scrollLeft;
        track.classList.add('is-dragging');
      });
      window.addEventListener('pointermove', function (e) {
        if (!isDown) return;
        var dx = e.clientX - startX;
        if (Math.abs(dx) > 4) moved = true;
        track.scrollLeft = startScroll - dx;
      });
      window.addEventListener('pointerup', function () { isDown = false; track.classList.remove('is-dragging'); });
      // Prevent accidental link drag select
      track.addEventListener('click', function (e) { if (moved) { e.preventDefault(); } }, true);
    }

    /* ---------- FAQ accordion ---------- */
    document.querySelectorAll('.acc').forEach(function (acc, i) {
      var head = acc.querySelector('.acc__head');
      var body = acc.querySelector('.acc__body');
      body.id = body.id || ('faq-panel-' + i);
      head.setAttribute('aria-controls', body.id);
      body.setAttribute('aria-hidden', 'true');
      head.addEventListener('click', function () {
        var open = acc.classList.contains('is-open');
        document.querySelectorAll('.acc.is-open').forEach(function (o) {
          if (o !== acc) {
            o.classList.remove('is-open');
            var ob = o.querySelector('.acc__body');
            ob.style.maxHeight = null; ob.setAttribute('aria-hidden', 'true');
            o.querySelector('.acc__head').setAttribute('aria-expanded', 'false');
          }
        });
        if (open) {
          acc.classList.remove('is-open'); body.style.maxHeight = null; body.setAttribute('aria-hidden', 'true'); head.setAttribute('aria-expanded', 'false');
        } else {
          acc.classList.add('is-open'); body.style.maxHeight = body.scrollHeight + 'px'; body.setAttribute('aria-hidden', 'false'); head.setAttribute('aria-expanded', 'true');
        }
      });
    });

    /* ---------- Конструктор заявки (без цен) ---------- */
    var area = document.getElementById('area');
    var areaVal = document.getElementById('areaVal');
    var typeBtns = document.querySelectorAll('#calcTypes .chip');
    function calc() {
      if (area && areaVal) areaVal.textContent = area.value;
      var lbl = document.querySelector('.calc__result-label');
      if (lbl) lbl.textContent = activeTypeLabel() + ' — под ваш размер';
    }
    if (area) area.addEventListener('input', calc);
    typeBtns.forEach(function (b) { b.setAttribute('aria-pressed', b.classList.contains('is-active') ? 'true' : 'false'); });
    typeBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        typeBtns.forEach(function (b) { b.classList.remove('is-active'); b.setAttribute('aria-pressed', 'false'); });
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');
        calc();
      });
    });
    calc();

    // Дата готовности каркаса (сегодня + 60 дней)
    var MONTHS_RU = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
    function frameReadyDate() {
      var d = new Date(Date.now() + 60 * 86400000);
      return d.getDate() + ' ' + MONTHS_RU[d.getMonth()];
    }
    var calcDateEl = document.getElementById('calcDate');
    if (calcDateEl) calcDateEl.textContent = 'Начнём сейчас — каркас готов к ~' + frameReadyDate();

    // Carry calculator spec into the lead form / WhatsApp
    function activeTypeLabel() { var b = document.querySelector('#calcTypes .chip.is-active'); return b ? b.textContent.trim() : ''; }
    function calcSummary() {
      var a = area ? area.value : '';
      return 'Хочу расчёт стоимости. Комплектация: ' + activeTypeLabel() + ', площадь пола ' + a + ' м², каркас нужен к ~' + frameReadyDate() + ' [заявка с сайта]';
    }
    var calcLeadBtn = document.getElementById('calcLead');
    if (calcLeadBtn) {
      calcLeadBtn.addEventListener('click', function () {
        var t = document.querySelector('#ctaForm textarea[name="msg"]');
        if (t) t.value = calcSummary();
      });
    }
    var calcWaBtn = document.getElementById('calcWa');
    if (calcWaBtn) {
      calcWaBtn.addEventListener('click', function (e) {
        e.preventDefault();
        openWhatsApp('Здравствуйте!%20Расчёт%20с%20сайта%20СТРОЙКАРКАС:%0A' + encodeURIComponent(calcSummary()));
      });
    }

    /* ---------- Видео-испытание (клик → со звуком) ---------- */
    var testVideo = document.getElementById('testVideo');
    var testWrap = document.getElementById('testVideoWrap');
    if (testVideo && testWrap) {
      testVideo.addEventListener('play', function () { testWrap.classList.add('is-playing'); });
      testVideo.addEventListener('pause', function () { testWrap.classList.remove('is-playing'); });
    }

    /* ---------- Интерактивные слои технологии ---------- */
    var techCards = document.getElementById('techCards');
    if (techCards) {
      techCards.addEventListener('click', function (e) {
        var layer = e.target.closest('.layer[data-info]');
        if (!layer) return;
        var card = layer.closest('.ncard');
        var info = card.querySelector('.ncard__info');
        var wasOpen = layer.classList.contains('is-open');
        card.querySelectorAll('.layer.is-open').forEach(function (l) { l.classList.remove('is-open'); });
        if (wasOpen) {
          info.hidden = true;
        } else {
          layer.classList.add('is-open');
          info.innerHTML = '<b>' + layer.textContent.trim() + '.</b> ' + layer.getAttribute('data-info');
          info.hidden = false;
        }
      });
    }

    /* ---------- Phone mask (KZ +7) ---------- */
    function maskPhone(e) {
      var digits = e.target.value.replace(/\D/g, '');
      if (digits[0] === '8') digits = '7' + digits.slice(1);
      if (digits[0] !== '7') digits = '7' + digits;
      digits = digits.slice(0, 11);
      var out = '+7';
      if (digits.length > 1) out += ' (' + digits.slice(1, 4);
      if (digits.length >= 4) out += ') ' + digits.slice(4, 7);
      if (digits.length >= 7) out += '-' + digits.slice(7, 9);
      if (digits.length >= 9) out += '-' + digits.slice(9, 11);
      e.target.value = out;
    }
    document.querySelectorAll('input[type="tel"]').forEach(function (inp) {
      inp.addEventListener('input', maskPhone);
    });

    /* ---------- Toast ---------- */
    var toast = document.getElementById('toast');
    var toastTimer;
    function showToast(msg) {
      if (!toast) return;
      toast.textContent = msg;
      toast.classList.add('is-show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function () { toast.classList.remove('is-show'); }, 4000);
    }
    function openWhatsApp(text) {
      var url = 'https://wa.me/' + WA_NUMBER + '?text=' + text;
      var w = window.open(url, '_blank');
      if (!w) window.location.href = url; // in-app браузеры (Instagram) блокируют попапы — открываем в этой же вкладке
      return w;
    }

    /* ---------- Lead forms -> WhatsApp ---------- */
    function handleForm(form) {
      if (!form) return;
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var data = new FormData(form);
        var name = (data.get('name') || '').toString().trim();
        var phone = (data.get('phone') || '').toString().trim();
        var msg = (data.get('msg') || '').toString().trim();

        if (!name || phone.replace(/\D/g, '').length < 11) {
          showToast('Заполните имя и телефон полностью');
          form.querySelector(!name ? 'input[name="name"]' : 'input[name="phone"]').focus();
          return;
        }

        var text = 'Заявка с сайта СТРОЙКАРКАС%0A%0AИмя: ' + encodeURIComponent(name) +
                   '%0AТелефон: ' + encodeURIComponent(phone);
        if (msg) text += '%0AСообщение: ' + encodeURIComponent(msg);

        var w = openWhatsApp(text);
        if (w) {
          showToast('Спасибо, ' + name + '! Открываем WhatsApp…');
          form.reset();
          calc();
        }
        // при заблокированном попапе уходим в WhatsApp в этой же вкладке — форма останется заполненной при возврате
      });
    }
    handleForm(document.getElementById('ctaForm'));

  });
})();
