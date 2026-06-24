# Assets needed in `public/`

I could not pull from `github.com/smayankthakur/Sitelytc-website` — the repo is
private (an anonymous clone prompts for credentials). Two ways to get the images in:

**Option A — make the repo public** (or add me as a read collaborator), then I'll copy them.

**Option B — copy locally.** From your machine, run the script below. It copies the
`public/` folder from your old repo into this rebuild's `public/`.

```bash
# adjust OLD_REPO to wherever the old repo is cloned locally
OLD_REPO="../Sitelytc-website"
cp -r "$OLD_REPO/public/Client/." "./public/Client/"   # client logos
cp "$OLD_REPO/public/"*.webp ./public/ 2>/dev/null || true
```

## Already in place
- `public/logo.webp` — primary logo (copied from the folder you provided)
- `src/app/icon.png`, `src/app/apple-icon.png` — favicons (auto-generated from logo)
- `public/favicon.ico` — legacy favicon
- `public/og/default.jpg` — Open Graph fallback (1200×630)

## Client logos expected at `public/Client/` (filenames from the live site)
Drop these in so the logo wall / case-study cards can switch from text to images:

- BabyDoc_Shop_Logo.webp
- DealZook_logo.webp
- Prevot_&_Associates_logo.webp
- HairDoc_logo.webp
- mdigitalbayarea_logo.webp        (M Magazine Bay Area)
- Global_corporate_tour_Logo.webp
- Ozuna_logo.webp

## Recommended extras (optional)
- `public/og/cybersecurity.jpg` — page-specific OG image for /cybersecurity
- Founder headshot + team photos for /about and /founder
- Case-study hero screenshots for /work/[slug]
