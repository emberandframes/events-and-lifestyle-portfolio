# Ember &amp; Frames — Events &amp; Lifestyle Photography Portfolio

A static, single-page portfolio for **Ember &amp; Frames**, a content studio for events, gatherings, and lifestyle, based in Hyderabad, India. No build step, no dependencies — just vanilla HTML, CSS, and JavaScript served as static files.

- **Featured work:** Arti Sonthalia, Festival of Play, You Can Sit With Us
- **Stack:** plain HTML, CSS, and JavaScript
- **Hosting:** GitHub Pages (served from the repository root)

Live site: <https://emberandframes.github.io/events-portfolio/>

## Project structure

```text
.
├── index.html        # The portfolio (entry point served at the site root)
├── 404.html          # Custom not-found page
├── robots.txt        # Allows all crawlers
├── .nojekyll         # Disables Jekyll so files with spaces / accented names are served
├── README.md
├── favicon.svg       # Ember & Frames viewfinder mark (shared brand favicon)
├── favicon.png       # Legacy E & F monogram (kept for reference)
├── css/
│   └── styles.css    # Theme tokens, layout, type, responsive rules
├── js/
│   ├── data.js       # Content layer — window.EMBER_DATA (contact, wall, events)
│   └── main.js       # Application logic — rendering, lightbox, reveal effects, form
├── Photos/           # Curated images, one folder per shoot
│   ├── Arti Sonthalia/
│   └── Festival of Play/
└── Videos/           # Films, one folder per shoot
    ├── Arti Sonthalia/
    └── You Can Sit With Us/
```

> The `.nojekyll` file is required. Several assets use spaces or accented characters; without `.nojekyll`, GitHub's Jekyll build would skip them.

## Local preview

Open `index.html` directly in a browser, or serve the folder to mirror how GitHub Pages behaves:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000/`.

## Contact behaviour

The enquiry form does not POST to a server. On submit it builds a pre-filled message and hands off to the visitor's own app:

- **Send via email** opens the mail client with the enquiry pre-filled to `hello@emberandframes.com`.
- **Send via WhatsApp** opens `wa.me/918447402780` with the same enquiry as text.

Direct contact details are also listed on the page for visitors with JavaScript disabled.

## Editing content

All copy and ordering live in [js/data.js](js/data.js), which assigns to `window.EMBER_DATA`:

- `contact`: email, phone, WhatsApp link, and studio location.
- `wall`: the curated frame grid (each entry is `src`, `name`, `year`, `ratio`).
- `events`: event collections, rendered in order.

Rendering, the lightbox, the darkroom "develop" reveal, click-to-play video, the enquiry form, and the sticky bar / WhatsApp FAB behaviour all live in [js/main.js](js/main.js). Presentation tokens and layout live in [css/styles.css](css/styles.css).

## Editing conventions

- Image and video paths are relative and **case-sensitive** on GitHub Pages. Preserve the `Photos/` and `Videos/` folder names and casing exactly.
- `src` values in `data.js` are URL-encoded (for example `Photos/Arti%20Sonthalia/DSC02835.jpg`) and resolve as-is.
- Open Graph and Twitter preview images use absolute `https://` URLs so WhatsApp, iMessage, Slack, and LinkedIn render link previews reliably.

## Branding

The favicon ([favicon.svg](favicon.svg)) is the Ember &amp; Frames viewfinder mark — an amber camera frame with charcoal corner brackets on a parchment tile — shared across all three studio portfolios. The legacy `favicon.png` monogram is kept for reference. The wordmark renders "Ember &amp; Frames" as charcoal serif words with an amber italic ampersand, matching the studio logo.

A faint trail of ember sparks drifts up behind the header type — glowing, spark-shaped flecks (`.tb-sparks i` in [css/styles.css](css/styles.css)), driven purely by CSS and switched off under `prefers-reduced-motion`.

## Deployment

The site deploys to GitHub Pages from the repository root on the `main` branch:

1. In **Settings → Pages**, set **Source** to **Deploy from a branch**.
2. Choose branch `main` and folder `/ (root)`, then **Save**.
3. The published URL appears in the same panel once the build completes.

Pushing to `main` republishes the site automatically. The folder is also host-agnostic — it works on Netlify, Vercel, Azure Static Web Apps, or any server that serves files as-is.

## License

All photographs, films, logos, and brand assets are © their respective owners and are included for portfolio review only. Do not redistribute without permission.
