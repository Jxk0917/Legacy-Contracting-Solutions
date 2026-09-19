# Current live site - captured reference

Source: https://www.legacycontractingsolutionsllc.com
Captured: 2026-09-18
Platform: Webador (free tier - the "Powered by Webador" footer and the
"Create Your Own Website With Webador" block are the host's, not the owner's)

Regenerate with:

```
node tools/capture-live-site.mjs    # screenshots + copy + image manifest
node tools/fetch-live-assets.mjs    # real logo and job photos
```

Read-only. Nothing in here is a build input.

## What is here

```
desktop/   1440x900   fold PNG @2x, full-page JPEG @1x
tablet/     834x1112  same
mobile/     390x844   same, plus 01-home-nav-open.png
content/   verbatim copy + heading outline per page
image-manifest.json   every <img> on the live site, with source URL and alt
download-log.json     what fetch-live-assets.mjs saved or skipped
```

`-fold` is the viewport on load. `-full` is the whole page.

## Live site structure (5 pages, per sitemap.xml)

| Live page | Route | Maps to our page |
| --- | --- | --- |
| Home | `/` | Home |
| Our Services | `/our-services` | Services |
| About Us | `/about-us` | About |
| Project Showcase | `/project-showcase` | Projects |
| Testimonials | `/testimonials` | - (see below) |

Our brief calls for Home, Services, Projects, About, Contact. The live site has
no Contact page; contact is a form block on Home plus a repeated "CONTACT US"
button. It has a Testimonials page that we do not.

## Findings that affect the build

**The logo has no yellow in it.** Sampled from `brand/logo-original.png`:

| Role | Hex | Share |
| --- | --- | --- |
| Navy field | `#182840` | 59% |
| Outline / near-black | `#000000` | 14% |
| Off-white | `#F8F8F8` | 4% |
| Steel blue accent | `#60A0C8` | 2% |

The brief says "construction yellow as the single accent. Muted blue only if the
real logo supports it" and that values are sampled from the real logo, not
invented. The logo supports blue. This is an open decision, not a settled one.

**The Testimonials page is empty.** Verbatim: "There are no comments yet.",
"Rating: 0 stars", "0 votes". The owner has zero published reviews. Any rating,
review count, or quote anywhere on our site would be fabricated.

**No email address exists** anywhere on the live site. Only `tel:2108408533`,
which matches the brief.

**Confirmed by the owner's own site** (was not in the brief):

- Founded 2024 by Cesar Loera. "SINCE 2024" is set into the logo itself.
- Address shown: 16226 US-281 S, San Antonio, TX 78221
- Positioning: residential construction, commercial remodeling, industrial
  renovations
- 11 services, in the live site's own order: concrete, trucking, grading, trash
  removal, land clearing, fences, pools, decks, landscape/hardscape, electrical,
  remodeling interior/exterior
- Three FAQs on Home, of which only one is answered. The two unanswered ones are
  "Can I see examples of your last projects?" and "Are you licensed and
  insured?". We have no licensing or insurance answer, so we cannot write one.

**Still unknown, do not invent:** licensing, insurance, warranties, project
counts, crew size, service radius, per-project locations, email.

## Photography

`fetch-live-assets.mjs` saved 20 real Legacy photos to `../projects/` and the
logo to `../brand/`, at original upload resolution.

It deliberately skipped 5 stock photos the live site uses (all Pexels, listed in
`download-log.json`), including the Home hero. Those are not Legacy's work.

The Project Showcase gallery has no captions, titles, locations, or alt text, so
the 17 photos on it are unlabelled. Filenames keep the source date and hash
(`job-2025-07-14-a3a10672.jpg`) rather than a guessed project name. The brief
lists work in San Antonio, Boerne, Bandera, and Fair Oaks, but nothing on the
live site ties a specific photo to a specific place. Those pairings have to come
from the owner.
