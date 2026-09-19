# Implementation Plan

Legacy Contracting Solutions LLC - demo website

Status: all five pages built and rendering. The palette below already
anticipated the logo finding and was correct; it is now confirmed rather than
inferred (see `CLAUDE.md`'s Color section, resolved 2026-09-18). Real project
photography and the official logo are captured in `assets/reference/` -
website (`current-site/`), Instagram (`instagram/`, including extracted video
stills), logo and jobsite photos (`brand/`, `projects/`). See
`docs/SOURCE-OF-TRUTH.md` for the consolidated facts pulled from all of it.

---

## Design read

A local contracting and site-services site for San Antonio homeowners,
contractors and pool builders, with a rugged-industrial language built on real
jobsite photography, on Eleventy plus hand-written CSS and self-hosted
condensed display type.

Dials: `DESIGN_VARIANCE 6`, `MOTION_INTENSITY 3`, `VISUAL_DENSITY 4`.

Reasoning. Variance sits mid-range rather than high because the buyer is a
homeowner comparing three contractors, and legibility of proof beats
compositional cleverness. Motion is low because this is a trust purchase and
a site that performs reads as unserious. Density is moderate: real jobs and
real numbers, not whitespace as luxury signalling.

---

## The central design idea

The proof this business has is dimensional. 600 square feet in Bandera. 2,000
square feet. 5,000 square feet cleared. Boerne, Fair Oaks. A contractor's
credibility is size, place, and what was actually done.

So measurement is treated as a display element, not as body text. Each project
sets its figure in large condensed type beside the photograph, the way a job
ticket or a survey stake carries a number. This comes from the subject matter
rather than from a layout trend, and it is the one place the design is allowed
to be bold. Everything around it stays quiet.

This also means the site degrades honestly. A project with a real photo and a
real number looks strong. A project with neither looks visibly incomplete,
which is the correct signal while content is still missing.

---

## Anti-default review

Before building, the generic version of this site was written out so it could
be avoided. The default contractor build is: full-bleed dark hero photo,
centered white headline, yellow button, gradient scrim; three identical service
cards with line icons; a "Why Choose Us" row of four checkmark boxes; a
01 / 02 / 03 process strip; a testimonial carousel.

Five things changed as a result.

**Hero copy sits bottom-left, not centered.** The photograph is full-bleed and
the scrim is weighted to the bottom-left so the headline lands in open sky.
Centered hero copy over a dark photo is the most common contractor-site
treatment and says nothing about this particular company.

**Services are one photographic lead cell plus four rule-separated items**, not
a row of identical cards. There are five service groups, so there are exactly
five cells and no padding to reach six.

**The numbered process strip was cut entirely.** It was built around "Quote.
Approve. Build. It's that simple.", which turned out not to be confirmed by any
captured source. Rather than keep the section and reword it, the section went,
and the phrase is parked in `site.json` as `processLineUnconfirmed` where
nothing renders it. See `docs/OWNER-CONFIRMATION.md`.

**The four-box service area block was cut** and replaced by a single inline band
of place names directly under the hero. Four boxes to hold four short town names
was structure doing no work.

**Testimonials ship visibly empty.** There are no real reviews, so the section
is built and left unpopulated with a note saying so, rather than filled with
invented quotes. Non-negotiable given the site is shown to the owner himself.

Eyebrow budget: 8 sections, so 3 tracked-caps labels maximum. Shipped with 1,
the "Working in" label on the area band.

---

## Homepage structure

Eight sections, eight distinct layout families. No layout family repeats, and no
two consecutive sections use the same image-plus-text arrangement.

```
+--------------------------------------------------------------+
|  LOGO  Home Services Projects About Contact   [210-840-8533] |  sticky, 73px
+--------------------------------------------------------------+
|                                                              |
|      [ full-bleed photograph: skid steer on graded ground ]  |  HERO
|                                                              |  full-bleed media
|   BUILT FROM THE GROUND UP.                                  |  copy bottom-left
|   Excavation, concrete, fencing and hauling ...              |
|   [ Call for a Free Estimate ]  [ View Our Work ]            |
+--------------------------------------------------------------+
|  WORKING IN  San Antonio  Boerne  Bandera  Fair Oaks         |  inline band
+--------------------------------------------------------------+
|  +----------------------+   CONCRETE                         |
|  |                      |   ---------------------------      |  WHAT WE DO
|  |  [ photograph ]      |   FENCING & EXTERIOR WORK          |  photo lead cell
|  |                      |   ---------------------------      |  + rule list
|  +----------------------+   HAULING & MATERIAL SERVICES      |
|  EXCAVATION & SITE WORK     ---------------------------      |
|                             DEMOLITION & REMOVAL             |
+--------------------------------------------------------------+
|                          |   2,000                           |
|   [ photograph ]         |   SQ. FT.                         |  FEATURED PROJECT
|                          |   Concrete Project                |  editorial split
|                          |   Site prep, placement, finishing |
+--------------------------------------------------------------+
|  [ photo ] [ photo ] [ photo ]                               |  RECENT WORK
|  [ photo ] [ photo ] [ photo ]                               |  3-col gallery
+--------------------------------------------------------------+
|  Equipment on site.   | Skid steers, dump trailers ...       |
|  ---------------------------------------------------------   |  WHY LEGACY
|  Start to finish.     | Site prep, the work, the haul off    |  rule-divided prose
+--------------------------------------------------------------+
|  [ reviews section, structure only, visibly unpopulated ]    |  empty-state panel
+--------------------------------------------------------------+
|                    210-840-8533                              |  FINAL CTA
|                 [ Request a Quote ]                          |  centered dark band
+--------------------------------------------------------------+
|  FOOTER                                                      |
+--------------------------------------------------------------+
|  [ Call for a Free Estimate ]      [ Request a Quote ]       |  sticky, mobile only
+--------------------------------------------------------------+
```

Alignment is left throughout. Centered text appears only in the final CTA band,
where the phone number is the single object in the section.

---

## Tokens

### Color

Built from the official logo, which is navy, steel blue, white and black. The
brief asked for construction yellow as the accent with blue only as a maybe.
The real brand is the reverse, so the system is blue and yellow is demoted to
a single job. Confirmed by the owner on 2026-09-18.

| Token | Value | Role |
|---|---|---|
| `--navy` | `#192942` | Brand navy. Header, hero, CTA bands, featured panel |
| `--navy-900` | `#0e1726` | Deepest surface. Footer, area band |
| `--navy-700` | `#243a57` | Raised surface on dark |
| `--steel` | `#60a0c8` | Logo blue, on dark only. Rules, meta, active nav |
| `--steel-deep` | `#2f6488` | Logo blue darkened for light surfaces, 6.0:1 on paper |
| `--paper` | `#f8f8f8` | Page surface |
| `--paper-2` | `#eceff2` | Alternate band, image placeholder fill |
| `--ink` | `#14171c` | Body text |
| `--hi-vis` | `#ffc72c` | Call button and focus ring only |

`--navy` is the logo's exact field colour, read off the file rather than from a
histogram. The first sampling pass reported `#182840`, but that came from
quantising into 3-bit buckets, which rounds down. The precise value matters
because the logo is placed directly on the header: one or two values out and the
badge reads as a pasted rectangle instead of disappearing into the bar. For the
same reason the logo ships as PNG, not WebP, since lossy encoding shifts it.

Yellow appears in exactly four places site-wide: the header call button, the
closing CTA band button, the mobile call bar, and the focus ring. It is
deliberately absent from section rules, measured figures, and per-service
buttons, which all use blue. Five yellow buttons down a services page stops the
colour meaning anything.

### Type

Recommendation: **Barlow Condensed** for display, **Inter** for body.

Evaluated against the three pairings in the brief. Oswald was rejected as
overexposed and slightly sporting in its skeleton. Archivo Narrow was rejected
for lacking weight at large display sizes. Barlow Condensed has squared
terminals and a mechanical structure that reads as equipment rather than
editorial, and it holds up at 700 across a wide headline.

This recommendation is confirmed against the logo before it is locked. If the
logo has its own lettering with a distinct character, matching it outranks
the pairing above.

Scale, 1.25 ratio, clamped for fluid sizing. Body at 16px minimum, 17px on
desktop. Measure capped at 68 characters.

### Shape and depth

Radius 2px on interactive elements, 0 elsewhere. One scale, applied everywhere.
Squared geometry suits the subject and avoids the rounded-card look the brief
rules out.

Depth comes from surface tone rather than shadow. Shadows only on the sticky
mobile bar and the mobile nav, tinted to the surface beneath.

### Motion

Hover and focus transitions at 160ms. One entrance moment on the hero. Nothing
else animates on scroll. All of it behind `prefers-reduced-motion: reduce`.

---

## Components

```
_includes/
  layouts/base.njk            skip link, meta, landmarks, font preload
  partials/
    header.njk                logo, nav, desktop call button
    nav-mobile.njk            disclosure panel, focus trap
    call-bar.njk              sticky bottom bar, mobile only
    footer.njk
    cta-band.njk              reusable dark CTA, phone-led
    service-cell.njk          takes one services.json entry
    project-card.njk          takes one projects.json entry
    project-featured.njk      full-bleed variant, measurement as display type
    process.njk
    area-strip.njk
    quote-form.njk
    placeholder-image.njk     labelled slot, names the photo that belongs there
```

`placeholder-image.njk` is what keeps the demo honest. It renders a visibly
marked empty frame at the correct aspect ratio, carrying the filename it
expects, so a missing photo reads as a missing photo and swaps in with one
line of data.

## Pages

| URL | Source | Notes |
|---|---|---|
| `/` | `index.html` | Ten sections above |
| `/services/` | `services.html` | Five groups from `services.json`, each linking to matching projects |
| `/projects/` | `projects.html` | Filterable by the five categories. The heaviest page. |
| `/about/` | `about.html` | Short. Capability and local service. No invented history. |
| `/contact/` | `contact.html` | Phone dominant, form secondary |

The contact form is static markup with client-side validation only. There is
no backend and no email address yet, so submission is wired to a clearly
marked stub rather than to a live endpoint.

---

## Sequence from here

1. Assets land in `assets/reference/`
2. Sample the real palette from the logo, lock type against it
3. Build tokens, base layout, header, footer, sticky call bar
4. Homepage
5. Services, Projects, About, Contact
6. Responsive pass at 320 / 768 / 1024 / 1440
7. Accessibility and consistency pass
8. Cleanup and final review against this plan

## Open questions for the owner

Carried from `assets/reference/README.md`. Full detail and evidence in
`docs/SOURCE-OF-TRUTH.md`.

Email address. Business hours. Whether the service area is a named list or a
radius. Any review he is willing to have quoted with attribution. Whether he
wants licensed or insured stated. Whether he wants material pricing published.
Which services list is current - the website's eleven or Instagram's bio,
which adds framing and roofing. Which logo is current - the website's
rectangular navy lockup or Instagram's circular badge.
