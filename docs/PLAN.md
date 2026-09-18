# Implementation Plan

Legacy Contracting Solutions LLC - demo website

Status: all five pages built and rendering. Waiting on project photography and
the official logo file.

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

Four things changed as a result.

**Hero is asymmetric, not centered.** Copy holds the left, the photograph runs
full-bleed behind and to the right. Centered hero copy over a dark photo is
the single most common contractor-site treatment and carries no information
about this specific company.

**Services are five cells, not three cards.** There are five service groups,
so the grid has exactly five cells: one large lead cell for excavation, which
is the flagship capability, and four supporting cells. Photo-backed, not
white boxes with icons. A three-card row would have meant either dropping two
real services or padding to six.

**Process is verb-led, not numbered.** His own words are already the labels:
Quote, Approve, Build. Adding "Step 01 / Step 02 / Step 03" on top of that
would be decoration over content that is already sequential and already his.

**Testimonials ship visibly empty.** There are no real reviews available, so
the section is built and left unpopulated with a clear note, rather than
filled with invented quotes. This is non-negotiable given the site is being
shown to the business owner himself.

Eyebrow budget: 10 sections, so 3 eyebrow labels maximum. Planned for 1.

---

## Homepage structure

Ten sections, six distinct layout families. No layout family repeats, and no
three consecutive sections use an image-plus-text split.

```
+--------------------------------------------------------------+
|  LOGO        Home Services Projects About Contact  [CALL]    |  sticky, 68px
+--------------------------------------------------------------+
|                                                              |
|   BUILT FROM THE          [ full-bleed jobsite photograph ]  |
|   GROUND UP.                                                 |  HERO
|                                                              |  asymmetric split
|   Excavation, concrete, fencing and                          |
|   hauling across San Antonio.                                |
|                                                              |
|   [ Call for a Free Estimate ]  [ View Our Work ]            |
+--------------------------------------------------------------+
|  San Antonio / Boerne / Bandera / Fair Oaks                  |  rule strip
+--------------------------------------------------------------+
|  +----------------------+  +---------+  +---------+          |
|  |                      |  | CONCRETE|  | FENCING |          |
|  |  EXCAVATION          |  +---------+  +---------+          |  SERVICES
|  |  & SITE WORK         |  +---------+  +---------+          |  5 cells, 5 items
|  |                      |  | HAULING |  | DEMO    |          |
|  +----------------------+  +---------+  +---------+          |
+--------------------------------------------------------------+
|                                                              |
|   [ photograph, full width ]                                 |  FEATURED PROJECT
|                                                              |  full-bleed, single
|   2,000            Concrete Project                          |
|   SQ. FT.          Site prep, placement, finishing           |
+--------------------------------------------------------------+
|   Equipment on site.                                         |
|   ------------------------------------------------           |  WHY LEGACY
|   Start to finish.                                           |  stacked statements
|   ------------------------------------------------           |  hairlines, no boxes
|   One call, one crew.                                        |
+--------------------------------------------------------------+
|   Quote.            Approve.           Build.                |  PROCESS
|   Tell us the job.  Price and scope.   We handle the rest.   |  3 col, verb-led
+--------------------------------------------------------------+
|   [ reviews section - structure only, no content yet ]        |  REVIEWS
+--------------------------------------------------------------+
|   SERVICE AREA                                               |  area block
+--------------------------------------------------------------+
|                    210-840-8533                              |  FINAL CTA
|              [ Call for a Free Estimate ]                    |  dark band, phone-led
+--------------------------------------------------------------+
|  FOOTER                                                      |
+--------------------------------------------------------------+
|  [ Call Now ]            [ Request Quote ]                   |  sticky, mobile only
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
a single job.

| Token | Value | Role |
|---|---|---|
| `--ink` | `#0f1620` | Deepest surface. Footer, area strip, featured band |
| `--navy` | `#1b2739` | Brand navy. Header, hero, CTA bands |
| `--navy-2` | `#26364d` | Raised surface on dark |
| `--steel` | `#7fa8c9` | Logo blue. Section detail, meta text on dark |
| `--steel-dim` | `#5c7f9e` | Muted blue on light |
| `--paper` | `#f2f5f8` | Cool off-white page surface |
| `--paper-2` | `#e6ecf2` | Process band |
| `--hi-vis` | `#ffc72c` | Accent. Calls to action and focus rings only |

Yellow is not in the logo, so it is used only where high-visibility contrast
does real work: the call button, the focus ring, the rule under the hero and
CTA bands, and the bullet on the area strip. Nothing else is yellow. The
primary button is `--hi-vis` with `--ink` text, about 11:1.

The off-white is cooled toward the blue rather than warmed, which keeps the
site out of the rustic-western register the brief rules out.

The logo also carries "SINCE 2024", which is a real and ownable fact and is
used in the header lockup and the footer. It also means the site never leans
on tenure. Capability and equipment carry the credibility instead.

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

Carried from `assets/reference/README.md`.

Email address. Business hours. Whether the service area is a named list or a
radius. Any review he is willing to have quoted with attribution. Whether he
wants licensed or insured stated. Whether he wants material pricing published.
