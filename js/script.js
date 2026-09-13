(function () {
  function setupTicker() {
    var track = document.querySelector('.ticker-track');
    if (!track) return;
    var template = track.querySelector('.ticker-set');
    if (!template) return;

    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return; // leave the single static set in place, CSS already turns the animation off

    function build() {
      while (track.lastChild) track.removeChild(track.lastChild);
      track.appendChild(template);

      // repeat the phrase set until it's wide enough to fill even a very wide screen,
      // so the loop never runs out of content and shows a blank stretch
      var targetWidth = Math.max(window.innerWidth * 1.5, 2400);
      while (track.scrollWidth < targetWidth) {
        track.appendChild(template.cloneNode(true));
      }

      // duplicate that whole run once more so translateX(-50%) loops seamlessly
      var firstHalf = Array.prototype.slice.call(track.children);
      firstHalf.forEach(function (node) {
        track.appendChild(node.cloneNode(true));
      });

      var halfWidth = track.scrollWidth / 2;
      track.style.animationDuration = Math.max(halfWidth / 55, 8) + 's';
    }

    build();

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 200);
    });
  }

  function applyLang(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-en]').forEach(function (el) {
      var val = el.getAttribute('data-' + lang) || el.getAttribute('data-en');
      el.innerHTML = val;
    });

    document.querySelectorAll('[data-href-en]').forEach(function (el) {
      var href = el.getAttribute('data-href-' + lang) || el.getAttribute('data-href-en');
      el.setAttribute('href', href);
    });

    document.querySelectorAll('.lang-toggle button').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    try {
      localStorage.setItem('dinos-lang', lang);
    } catch (e) {
      /* localStorage unavailable (private browsing, etc.) — language just won't persist */
    }
  }

  var initialLang = 'en';
  try {
    var saved = localStorage.getItem('dinos-lang');
    if (saved === 'en' || saved === 'es') initialLang = saved;
  } catch (e) {
    /* ignore */
  }

  document.querySelectorAll('.lang-toggle button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLang(btn.getAttribute('data-lang'));
    });
  });

  setupTicker();
  applyLang(initialLang);
})();
