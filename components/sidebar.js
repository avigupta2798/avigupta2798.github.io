/* =========================================================================
   The shared sidebar — the ONLY place it is defined.
   Every page loads this file and gets the bar injected into <div id="site-sidebar">.

   No fetch(), no iframe: the markup is built here in the browser, so it works
   when the site is served over http AND when you double-click a file on your
   own disk. Links and the highlighted "you are here" item are worked out
   automatically, so no page has to know how deep it is.

   TO EDIT THE BAR, YOU ONLY EVER TOUCH THIS FILE.
   ========================================================================= */

(function () {
  'use strict';

  /* ---------------------------------------------------------------------
     1. WHO YOU ARE — shown under the photo
  --------------------------------------------------------------------- */
  var IDENTITY = {
    name:  'Avi Gupta',
    role:  'Ph.D. Student, Computer Science<br>IIIT-Delhi, India',
    photo: 'assets/img/profile.jpg'
  };

  /* ---------------------------------------------------------------------
     2. THE NAV — add, remove or reorder freely.
        Each entry is [ path from the site root, label shown in the bar ].
        A new page = one new line here, and nothing else anywhere.
  --------------------------------------------------------------------- */
  var NAV = [
    ['Home', [
      ['index.html',                     'Home'],
      ['education/index.html',               'Education'],
      ['experience/index.html',               'Experience'],
      ['contact/index.html',             'Bio / Contact']
    ]],
    ['Research', [
      ['research-about/index.html',      'About'],
      ['projects/index.html',            'Projects'],
      ['publications/index.html',        'Publications'],
      ['code-resources/index.html',      'Code / Resources']
    ]],
    ['Misc', [
      ['professional-activities/index.html', 'Service'],
      ['news-archive/index.html',            'News Archive']
    ]]
  ];

  /* ---------------------------------------------------------------------
     3. THE ICON ROW at the bottom.
        'url' starting with http/mailto is used as-is; anything else is
        treated as a path from the site root.
  --------------------------------------------------------------------- */
  var ICONS = [
    { label: 'Email',            url: 'mailto:avig@iiitd.ac.in' },
    { label: 'Google Scholar',   url: 'https://scholar.google.com/citations?user=YOUR_ID' },
    { label: 'GitHub',           url: 'https://github.com/avigupta2798' },
    { label: 'LinkedIn',         url: 'https://www.linkedin.com/in/YOUR_HANDLE' },
    { label: 'CV',               url: 'assets/CV_AviGupta.pdf' }
  ];

  var GLYPH = {
    'Email': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6 8.5-6"/></svg>',
    'Google Scholar': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4 2 9.2l10 5.2 10-5.2z"/><path d="M6 11.6V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.4"/></svg>',
    'GitHub': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.5 9.5 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10 10 0 0 0 12 2z"/></svg>',
    'LinkedIn': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.6c0-1.34-.03-3.07-1.9-3.07-1.9 0-2.2 1.46-2.2 2.97V21H9z"/></svg>',
    'CV': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 13h6M9 17h6"/></svg>'
  };

  /* =====================================================================
     Below here you should not need to change anything.
     ===================================================================== */

  // This file lives at <site root>/components/, so one level up is the root.
  // Taking it from the script's own URL means every page gets correct links
  // no matter which folder it sits in.
  var script = document.currentScript;
  var ROOT = new URL('../', script.src);

  function abs(path) {
    return /^(https?:|mailto:|#)/.test(path) ? path : new URL(path, ROOT).href;
  }

  // Two URLs point at the same page if they match once a trailing
  // "index.html", query and hash are removed.
  function key(url) {
    return url.split('#')[0].split('?')[0].replace(/index\.html$/, '');
  }
  var HERE = key(location.href);

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* ---------- build the markup ---------- */

  var groups = NAV.map(function (group) {
    var links = group[1].map(function (item) {
      var href = abs(item[0]);
      var current = key(href) === HERE ? ' aria-current="page"' : '';
      return '<a class="nav__link" href="' + href + '"' + current + '>' + esc(item[1]) + '</a>';
    }).join('');
    return '<div class="nav__group"><div class="nav__grouptitle">' + esc(group[0]) + '</div>' + links + '</div>';
  }).join('');

  var icons = ICONS.map(function (i) {
    var external = /^https?:/.test(i.url);
    return '<a href="' + abs(i.url) + '"' +
           (external ? ' target="_blank" rel="noopener"' : '') +
           ' aria-label="' + esc(i.label) + '" title="' + esc(i.label) + '">' +
           (GLYPH[i.label] || '') + '</a>';
  }).join('');

  var sidebarHTML =
    '<aside class="sidebar">' +
      '<div class="sidebar__identity">' +
        '<img class="sidebar__photo" src="' + abs(IDENTITY.photo) + '" alt="' + esc(IDENTITY.name) + '">' +
        '<div class="sidebar__name"><a href="' + abs('index.html') + '">' + esc(IDENTITY.name) + '</a></div>' +
        '<div class="sidebar__role">' + IDENTITY.role + '</div>' +
      '</div>' +
      '<nav class="nav" aria-label="Main">' + groups + '</nav>' +
      '<div class="iconrow">' + icons + '</div>' +
    '</aside>';

  var controlsHTML =
    '<button class="menu-toggle" aria-label="Open menu" aria-expanded="false">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>' +
    '</button>' +
    '<div class="scrim"></div>' +
    '<button class="theme-toggle" aria-label="Switch to dark theme">' +
      '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>' +
      '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>' +
    '</button>';

  /* ---------- put it on the page ---------- */

  function mount() {
    var slot = document.getElementById('site-sidebar');
    if (slot) {
      // replaceWith, not innerHTML: <aside class="sidebar"> has to be a DIRECT
      // child of .layout or the flex sizing goes to the wrapper instead.
      var tmp = document.createElement('div');
      tmp.innerHTML = sidebarHTML;
      slot.replaceWith(tmp.firstChild);
    }
    // The toggles are position:fixed, so they belong to the page, not the bar.
    if (!document.querySelector('.theme-toggle')) {
      document.body.insertAdjacentHTML('afterbegin', controlsHTML);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
