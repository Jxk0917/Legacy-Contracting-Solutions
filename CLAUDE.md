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

Near-black and charcoal base, off-white surfaces, muted neutral grays,
construction yellow as the single accent. Muted blue only if the real logo
supports it.

Yellow is for CTAs, key highlights, micro accents, hover states, and structural
details. One accent, locked across every page. The site is not yellow.

Exact values are sampled from the real logo once it is available, not invented.

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
