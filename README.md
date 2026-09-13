# Dino's Junk Haul — Business Website

A bilingual (English/Spanish) landing page for **Dino's Junk Haul**, a residential junk removal and hauling business in Broward & Miami-Dade, Florida.

**Live preview:** https://claude.ai/code/artifact/209eeb49-0ff6-4748-8b86-6e08267a49fb

## Overview

Single-page marketing site built to convert visitors into calls/texts for a small, owner-operated hauling business. Content — services, load-based pricing, accepted-items policy, service area — is sourced directly from the business's own flyer and business plan, so pricing and policy shown to customers match what the owners actually quote in the field.

## Features

- **Bilingual content toggle** (EN / ES) — every string swaps via a header button, with the phone numbers and `tel:`/`sms:` links switching to match the active language, and the choice persisted in `localStorage`.
- **Load-based pricing table** — priced by truck volume (the industry standard for this business type), not by weight or time.
- **Accepted-items policy** — a three-tier breakdown (accepted / extra fee / not yet accepted) so customers know what they can book before calling.
- **Click-to-call & click-to-text CTAs**, plus icon links to the business's Instagram, Facebook, and Nextdoor pages.
- **Sticky mobile call bar** — a fixed "Call Now / Text" bar pinned to the bottom of the screen on phones, so the primary action is always one thumb-tap away no matter how far the visitor has scrolled.
- **Animated trust ticker** below the header (same-day service, free estimates, bilingual crew, service area) for a bit of motion on first load; respects `prefers-reduced-motion`.
- **Light/dark theme support** via `prefers-color-scheme`, using CSS custom properties as design tokens — including a dedicated "always-dark" token pair for the high-contrast bands (final CTA, footer, ticker) that are meant to stay dark in both themes, separate from the tokens that flip with the theme.
- **Mobile-first responsive layout** — this business's customers book almost entirely from their phones, so the site was built and tested mobile-first: the header stays usable down to small phone widths, and the pricing table switches from a table to stacked cards below 640px so the price is never hidden behind a horizontal scroll.
- **Open Graph / theme-color meta tags** so the link previews cleanly when shared in texts, DMs, or social posts.
- **No build step, no framework** — plain HTML/CSS/JS, deployable to any static host as-is.

## Tech stack

- **HTML5** — semantic markup, no template engine
- **CSS3** — custom properties (design tokens) for theming, CSS Grid/Flexbox for layout, no framework (no Bootstrap/Tailwind)
- **Vanilla JavaScript** — a small IIFE handles the language toggle; no dependencies, no build tools
- **Google Fonts** — Anton (display), Barlow / Barlow Semi Condensed (body/labels)

## Project structure

```
Dino's/
├── index.html          # Page markup
├── css/
│   └── style.css        # All styles (design tokens + components)
├── js/
│   └── script.js         # Language-toggle logic
├── img/
│   ├── logo.jpg               # Original brand logo (white background)
│   ├── logo-transparent.png   # Background removed, original canvas/padding kept
│   └── logo-header.png        # Cropped to the logo's bounding box — used in the header
└── README.md
```

## Running locally

No build step required — open `index.html` directly in a browser, or serve the folder with any static server, e.g.:

```bash
npx serve .
```

## Notes / known limitations

- `logo-transparent.png` was generated from the original JPG with a simple white-background removal script; edges may show a faint halo on close inspection. A proper transparent export from the original design file would be a clean upgrade.
- The hero illustration is a hand-drawn inline SVG (no stock photos used) since real job/truck photos weren't available yet. Swap in a before/after photo section once the business has them.
- The `og:image` meta tag points at a relative path (`img/logo-header.png`), which works once the site is deployed to a real domain but won't resolve for link-preview scrapers while it's only a local file or an artifact preview — update it to an absolute URL (e.g. `https://dinosjunkhaul.com/img/logo-header.png`) once the domain is live.
