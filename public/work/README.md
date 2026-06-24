# Work preview media (P2 — needs your assets)

Drop a screenshot or short muted loop per case study here so the Work-list
hover-reveal shows real projects instead of the branded gradient fallback:

- babydocshop.webp   (or .jpg / .mp4)
- northbridge.webp
- veda-health.webp

Then set `image: "/work/<slug>.webp"` on that entry in `src/lib/work-data.ts`.
For a hero/reel video, add `/public/video/reel.mp4` and I can wire an autoplay
muted loop. Team-on-hover video cards also need per-member clips.
