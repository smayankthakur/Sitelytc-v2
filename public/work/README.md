# Project screenshots (optional — the immersive case study auto-upgrades)

The /work page renders an immersive scroll-driven showcase. Each project shows a
real screenshot when present, otherwise an on-brand blueprint panel.

To add a real screenshot for a project:
1. Drop an image here named after the slug, e.g.:
   - babydocshop.webp
   - dealzook.webp
   - prevot-associates.webp
   - hairdoc.webp
   - m-magazine.webp
   - global-corporate-tour.webp
   - ozuna-tortilla-factory.webp
   (4:3 works best — e.g. 1200×900. .webp / .jpg / .png all fine.)
2. In src/lib/work-data.ts set `image: "/work/<slug>.webp"` on that project.

The logo already sits on a white chip so dark-background client logos stay
visible over the dark theme. A short muted .mp4 can be wired the same way if you
want motion instead of a still.
