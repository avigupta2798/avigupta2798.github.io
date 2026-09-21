/* Two small things only: the theme toggle and the mobile sidebar drawer.
   The sidebar itself is built by components/sidebar.js, which runs first. */

(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- Theme ------------------------------------------------- */

  function stored() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }
  function remember(v) {
    try { localStorage.setItem('theme', v); } catch (e) { /* private mode */ }
  }

  // Also applied by the inline snippet in each page's <head>, which runs
  // before first paint so the dark theme doesn't flash white on load.
  var saved = stored();
  if (saved === 'dark' || saved === 'light') root.setAttribute('data-theme', saved);

  /* ---------- Mobile drawer ----------------------------------------- */
  // Everything is looked up at click time rather than cached at load, so the
  // order these scripts run in can never matter.

  function setMenu(open) {
    var sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    sidebar.classList.toggle('is-open', open);
    var scrim = document.querySelector('.scrim');
    if (scrim) scrim.classList.toggle('is-open', open);
    var toggle = document.querySelector('.menu-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', String(open));
  }

  document.addEventListener('click', function (e) {
    var themeBtn = e.target.closest('.theme-toggle');
    if (themeBtn) {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      themeBtn.setAttribute('aria-label', next === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      remember(next);
      return;
    }

    if (e.target.closest('.menu-toggle')) {
      var sidebar = document.querySelector('.sidebar');
      setMenu(!(sidebar && sidebar.classList.contains('is-open')));
      return;
    }

    if (e.target.closest('.scrim')) { setMenu(false); return; }

    // tapping a nav link on mobile closes the drawer
    if (e.target.closest('.sidebar a') && window.innerWidth <= 820) setMenu(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  // Leaving mobile width with the drawer open would otherwise strand it.
  window.addEventListener('resize', function () {
    if (window.innerWidth > 820) setMenu(false);
  });
})();
