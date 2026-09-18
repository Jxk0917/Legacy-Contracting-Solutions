# Reference Intake

Drop source material here. Nothing in this folder is ever modified, renamed, or
overwritten by the build. Originals stay original.

Working copies (resized, cropped, converted to WebP) are generated into
`src/assets/img/` and are the only files the site actually loads.

When you have added files, say "assets are in" and the design system and build
proceed against the real material.

---

## 1. `brand/` - HIGHEST PRIORITY

This is the one folder that blocks the design system. The color palette,
the logo lockup in the header, and the footer mark all come from here.

| Drop in | Why it is needed | Ideal format |
|---|---|---|
| The Legacy logo | Header, footer, favicon, mobile nav. Used as-is, never redrawn. | PNG with transparency, or SVG/AI/EPS if he has it |
| Logo on dark background | The header is dark. A light/reverse logo version avoids a white box. | PNG transparent |
| Any brand guideline sheet | Exact hex values beat my guesses from the brief | PNG, PDF |
| Truck / trailer / equipment decals | Real applied brand color, often more accurate than a digital file | Photo |

**If only one thing gets added, make it the logo.** I will sample the real
yellow and the real dark tone from it rather than inventing values.

---

## 2. `projects/` - SECOND PRIORITY

Real jobsite photography is what makes this demo land. The whole Projects page
and the homepage proof section are built around it.

Best sources: his phone camera roll, or the original Instagram uploads. Full
resolution straight from the camera is ideal, screenshots are acceptable.

Name files so the job is identifiable. Anything readable works:

```
boerne-pool-excavation-01.jpg
bandera-slab-600sqft-during.jpg
fair-oaks-king-ranch-fence-after.jpg
lot-clearing-5000sqft-before.jpg
```

Known jobs from the brief that each want photos:

- [ ] Pool excavation, Boerne
- [ ] Fence refurbishment and staining
- [ ] Concrete slab approx. 600 sq. ft., Bandera
- [ ] Concrete project approx. 2,000 sq. ft.
- [ ] Pool removal, backfill and grading
- [ ] King Ranch-style fence with stucco columns, Fair Oaks
- [ ] Lot clearing and site prep, approx. 5,000 sq. ft.
- [ ] Hauling and material delivery

Also valuable, and currently missing entirely:

- [ ] **A hero image.** One wide, strong shot. Equipment mid-dig, a skid steer
      on a cleared lot, or a finished pour. Landscape orientation, shot wide
      enough that a headline can sit over the left third.
- [ ] **Equipment on site.** Excavator, skid steer, dump trailer, tandem truck.
      This is the single clearest signal that he owns capability rather than
      subcontracting it.
- [ ] **Before / after pairs.** Same angle, two moments. These are the most
      persuasive thing a contracting site can show and the layout reserves
      space for them.
- [ ] **A photo of him or the crew working.** Optional, and only if he is
      comfortable with it. A real face outperforms any stock image.

---

## 3. `current-site/`

Full-page screenshots of the existing Webador site. One file per page.

Purpose is twofold: confirming his own wording and service list so nothing is
invented, and having a genuine before/after to put beside the new build when
you meet him.

```
webador-home.png
webador-services.png
webador-contact.png
```

A plain text file with the live URL is enough if screenshots are awkward.

---

## 4. `instagram/`

Screenshots of project posts, including the captions.

The captions matter as much as the images. They carry his own vocabulary,
his measurements, and the locations, all of which become site copy that is
factually his rather than written for him.

---

## What is still unknown

These cannot be resolved from reference images and need to come from him
directly. Until then the build either omits them or marks them clearly.

- Email address (the contact form and footer currently have no address)
- Business mailing address, if he wants one published
- Business hours
- Whether he wants the service area stated as a radius or as a named list
- Any review or testimonial he is willing to have quoted, with attribution
- Whether he is licensed or insured, and whether he wants that stated

Nothing in the above list gets invented. See `CLAUDE.md` in the project root.
