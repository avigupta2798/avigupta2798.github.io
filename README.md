# Academic homepage

Plain HTML, CSS and a little JavaScript. No build step, no dependencies, no Jekyll.
Open `index.html` in a browser and it works; push it to GitHub Pages and it works there too.

## Folder layout

```
avigupta2798.github.io/
├── index.html                          Home — About, banner, Research Interests, News
├── contact/index.html                  Bio / Contact
├── research-about/index.html           Research overview
├── projects/index.html                 Projects
├── publications/index.html             Publications
├── code-resources/index.html           Code & Resources
├── professional-activities/index.html  Reviewing, teaching, talks, awards
├── education/index.html                Degrees, thesis, coursework
├── news-archive/index.html             Full news list
├── 404.html                            Shown for bad URLs on GitHub Pages
├── .nojekyll                           Stops GitHub from running Jekyll on the files
├── components/
│   └── sidebar.js                      ← THE SIDEBAR. Defined once, here, only here.
└── assets/
    ├── CV_AviGupta.pdf
    ├── css/style.css                   The whole stylesheet; colours are variables at the top
    ├── js/main.js                      Theme toggle + mobile drawer. Nothing else.
    └── img/profile.jpg, favicon.svg
```

## The shared sidebar

Every page contains exactly two lines that concern the sidebar:

```html
<div id="site-sidebar"></div>          <!-- inside .layout, before <main> -->
<script src="components/sidebar.js"></script>   <!-- before main.js, "../" from a subfolder -->
```

`components/sidebar.js` builds the bar and swaps it in. Everything you would want
to change — your name, the photo, the nav groups and their links, the icon row —
sits in three clearly marked lists at the top of that file. **Adding a page is one
new line in `NAV`**; no other file is touched.

Two things it works out by itself, so you can never get them wrong:

- **Link depth.** It reads its own URL to find the site root, so the same list of
  links works from the homepage and from any subfolder. No `../` to keep straight.
- **Which item is highlighted.** It compares each link against the current URL, so
  the "you are here" state is always correct.

It does not use `fetch()` and it does not use an `<iframe>`. That matters: `fetch`
is blocked by browsers on `file://`, so a fetched sidebar vanishes the moment you
double-click a file to preview it, and an iframe is a page-within-a-page that draws
its own scrollbars inside the bar. This version renders identically whether you open
the files from disk or serve them.

The trade-off is that the bar is drawn by JavaScript, so it is not in the raw HTML.
Search engines run JavaScript and index it fine. If you ever want it in the HTML
itself, the move is GitHub Pages' built-in Jekyll: delete `.nojekyll`, put the markup
in `_includes/sidebar.html`, and call it with `{% include sidebar.html %}`. That
renders server-side — at the cost of needing Jekyll installed to preview locally.


## The first ten minutes

1. **Your photo.** Overwrite `assets/img/profile.jpg`. Square crop; anything from 400×400 up is fine.
2. **Your CV.** Save it as `assets/cv.pdf`.
3. **Search and replace across all five HTML files:**
   - `YOUR_ID` → your Google Scholar ID (the string after `user=` in your Scholar URL)
   - `YOUR_HANDLE` → your GitHub and LinkedIn handles
   - `avig@iiitd.ac.in` → your email, if it differs
4. **Fill the brackets.** Every `[LIKE THIS]` is a placeholder waiting for real text —
   dates, paper titles, venues, co-authors. Nothing else needs touching.
5. **The two advisor links** on the homepage point at `#`. Put their homepage URLs in.

## Things you'll want to change later

**Colours.** Everything comes from the variables at the top of `assets/css/style.css`.
Changing `--accent` restyles every link, heading accent and chip on the site. The dark
theme is the second block (`html[data-theme="dark"]`); it has its own copy of each variable.

**Sidebar width.** `--sidebar-w: 300px` in the same block.

**How tall the News box is.** `.news__scroll { max-height: 260px; }`. It scrolls on its own,
which is the point — you can leave old news in it forever instead of deleting items.

**Adding a publication.** Copy one `<div class="pub">…</div>` block in
`publications/index.html` and edit it. The `<div class="year-head">` lines are the year
separators. Your own name is wrapped in `<span class="me">` so it renders bold.

**Adding a project figure.** Put the image in `assets/img/`, then replace
`<div class="project__thumb">[FIGURE / TEASER]</div>` with
`<img class="project__thumb" src="../assets/img/your-figure.png" alt="">`.

**Adding a page.** Copy any sub-page folder, change the `<main>` content, and add a
`<a class="nav__link">` line to the sidebar — in all five existing files, plus the new one.

## Publishing on GitHub Pages

```bash
cd site
git init
git add -A
git commit -m "Academic homepage"
git branch -M main
git remote add origin https://github.com/YOUR_HANDLE/YOUR_HANDLE.github.io.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**.
It goes live at `https://YOUR_HANDLE.github.io` within a minute or two.

Naming the repo `YOUR_HANDLE.github.io` gets you the clean root URL. Any other repo name
works too, but the site lives at `https://YOUR_HANDLE.github.io/repo-name/` — in that case
the only thing to fix is `404.html`, whose links start with `/`.

To use your own domain later, add a `CNAME` file containing just the domain, and point a
CNAME DNS record at `YOUR_HANDLE.github.io`.

## Checks worth doing before you share the link

- Open it on a phone — the sidebar becomes a drawer behind the button top-left.
- Click the sun/moon toggle top-right, reload, confirm the theme stuck.
- Print the homepage to PDF: the sidebar drops out and the News box expands, by design.
- Search for `[` in your files. Any bracket left is a placeholder you meant to fill.
- Shrink the window until the sidebar is taller than it: it should scroll down only,
  with a thin scrollbar, and never sideways.
