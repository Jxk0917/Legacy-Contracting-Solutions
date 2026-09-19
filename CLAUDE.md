# CLAUDE.md - Legacy Contracting Solutions LLC

## Context boundary

This project is independent of every other ALVSolutions site, demo, and client.

Do not read from, copy, or take inspiration from any other project on this
machine, including the ALVSolutions main site, Hacienda Grill, Lucid Detailing,
and Sherpa. That includes styling, palettes, type systems, layouts, components,
and copy.

Only files inside `C:\Users\alvar\Projects\Legacy-Contracting-Solutions` are in
scope. Never write outside it.

## What this is

A demo website for a real local contracting company, built to be shown to the
owner in person. It is not a client-approved production site. It should be
presentation-ready, and it should stay easy to change after that meeting.

## Business facts

Everything below is confirmed. Nothing else about the business is.

- Legacy Contracting Solutions LLC
- Phone: 210-840-8533
- San Antonio, Texas and surrounding areas
- Work documented in: San Antonio, Boerne, Bandera, Fair Oaks
- Brand phrases already in use:
  - "Setting the Standards of Quality and Trust."
  - "Built from the ground up."
  - "Quote. Approve. Build. It's that simple."

## Content integrity - hard rule

Never invent, imply, or place a styled placeholder that reads as real for:

years in business, certifications, licenses, insurance, awards, project counts,
employee counts, revenue, guarantees, warranties, customer ratings, review
counts, testimonials, or an email address.

If a detail is unknown, take one of these three paths and no other:

1. Omit it, and leave the component in place with no content.
2. Mark it unmistakably as a placeholder, in the markup and visibly.
3. Build the structure and leave it empty, with a code comment naming what goes there.

A fabricated five-star review in a demo shown to the actual business owner is
the single worst failure mode available here. Treat it that way.

## Primary goal

The site exists to generate phone calls. The owner's existing sales pattern is
that one job becomes a relationship, so the job of the site is to get him on
the phone, not to close the sale on the page.

- Primary CTA: Call for a Free Estimate. `tel:` link, everywhere it appears.
- Secondary CTA: Request a Quote.
- One label per CTA intent across the whole site. Do not mix "Get a Quote",
  "Request an Estimate", and "Contact Us" for the same action.
- Mobile call access is the highest-priority interaction on the site.

## Structure

Five pages. Do not add more without a strong reason.

Home, Services, Projects, About, Contact.

## Assets

Source material lives in `assets/reference/`. It is read-only. Never modify,
rename, or overwrite anything in it.

Optimized working copies go in `src/assets/img/`.

Use real Legacy project photography wherever it exists. Where it does not,
use a clearly structured placeholder that is a one-line swap later. Do not
paper over a missing photo with stock imagery or a CSS gradient block.

If an official logo exists in `assets/reference/brand/`, use it. Do not redraw
it, trace it, or approximate it in CSS or SVG.

## Design direction

Strong, modern, professional, rugged, capable, premium, trustworthy, local,
established, project-driven.

Not: lawn care, handyman flyer, cheap construction template, SaaS dashboard,
western/rustic pastiche, ThemeForest, overdesigned agency experiment.

The impression to land: this company has equipment, handles real work, and
knows what it is doing.

### Color

Resolved 2026-09-18. Sampled from `assets/reference/brand/logo-original.png`
(dominant-color analysis, logged in `assets/reference/current-site/README.md`).
The logo carries no yellow at all: it is navy, steel blue, near-black, and
off-white. That inverts this section's original assumption, so blue is now the
primary brand color and yellow is demoted to a conditional accent, per an
explicit decision from the project owner on this date.

Sampled values:

| Role | Hex | Share of logo |
|---|---|---|
| Navy | `#182840` | 59% |
| Near-black | `#000000` | 14% |
| Off-white | `#F8F8F8` | 4% |
| Steel blue | `#60A0C8` | 2% |

Base the palette on navy, near-black, and off-white surfaces, with steel blue as
the structural accent (section rules, meta text on dark, secondary highlights).

Construction yellow is no longer a primary or default accent. It may still be
used as a secondary accent, and only where all three of these hold:

1. It clearly connects to existing Legacy social graphics - check
   `assets/reference/instagram/` before using it; do not add yellow branding
   that has no basis there.
2. It measurably improves CTA visibility over a blue-based treatment.
3. It does not conflict with or compete against the real logo on the same
   surface.

Absent all three, use blue. Do not fall back to yellow as the default accent.

Exact values are sampled from the real logo, not invented. If a future asset
(a truck decal, a sign, a second logo file) contradicts this sampling, resample
and update this section rather than averaging the two.

### Type

Bold condensed display face for headings, clean sans for body. Candidates from
the brief: Barlow Condensed + Inter, Oswald + Manrope, Archivo Narrow + Inter.
Evaluate visually against the logo, then lock one pairing.

Self-host the fonts in `src/assets/fonts/` with `font-display: swap`. No
render-blocking `<link>` to Google Fonts.

### Restraint

- Not every block is a card. Group with space and rules before reaching for a box.
- One corner-radius scale for the whole site.
- No glassmorphism, no gradient decoration, no parallax.
- Motion is restrained: hover and focus transitions, one entrance moment.
  Everything gated behind `prefers-reduced-motion`.
- Zero em-dashes in any user-visible string. Use a hyphen or restructure.

## Build

Eleventy, static output, no framework. Hand-written CSS with custom properties.
Vanilla JS, only where behavior requires it (mobile nav, form).

Do not add a dependency for a visual effect that CSS can do.

```
npm install
npm start     # dev server with live reload
npm run build # static output to _site/
```

## Quality floor

Every page ships with: semantic landmarks, one `h1`, ordered headings, visible
keyboard focus, labelled form fields, alt text on every image, WCAG AA contrast
on text and on every button against its own background, and a layout that works
from 320px up.

Check mobile, tablet, and desktop before calling any page done.
