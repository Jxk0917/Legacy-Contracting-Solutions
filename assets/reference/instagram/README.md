# Instagram - captured reference

Source: https://www.instagram.com/legacy_contractingsolutionsllc/
Captured: 2026-09-18

Regenerate with:

```
node tools/capture-instagram.mjs
```

Read-only. Nothing in here is a build input.

## What is here

```
profile/    login wall, then fold + full-page at desktop / tablet / mobile
            avatar-100x100.jpg
posts/      one full-page shot per post, from its /embed/captioned/ page
media/      51 images at original upload resolution
content/    verbatim caption per post
posts.json  structured record of all of it
```

Files are numbered by grid position, newest first: `01-` is the most recent post.

## The 12 of 36 problem

The profile says **36 posts**. Logged out, Instagram serves **12** and then shows
"Show more posts from legacy_contractingsolutionsllc", which is a login wall.
Scrolling does not get past it; this was tested. The remaining **24 posts are not
captured** and nothing here should be treated as his complete body of work.

Getting them needs either his login or an export from him.

## Profile bio (verbatim)

```
⚒️ Services :
🚜 Grading • Site Prep
🏗️ Concrete • Framing • Roofing
🚧 Fences • Cleanouts
🚛 Dump Trailer & Tandem Trucking
📍 San Antonio, TX 🇺🇸
```

**Framing and roofing are here and are not on his website.** The website's 11
services do not mention either. Worth asking him which list is current.

31-32 followers, 28 following. Links to legacycontractingsolutionsllc.com.

## Why this is the best source we have

The captions are written by him, and they carry the specifics the website lacks:
job type, location, square footage, and scope broken into steps. The brief's job
list came from here - every one of the eight known jobs is a post:

| Brief's job | Post | Media |
| --- | --- | --- |
| Pool excavation, Boerne | `01` | video thumbnail only |
| Fence refurbishment and staining | `02` | video thumbnail only |
| Concrete slab ~600 sq. ft., Bandera | `03` | 2 photos |
| Concrete project ~2,000 sq. ft. | `04` | 6 photos |
| Pool removal, backfill and grading | `05` | 4 photos |
| Hauling and material delivery | `06` | 15 photos |
| King Ranch fence, Fair Oaks | `07` | video thumbnail only |
| Lot clearing and site prep, ~5,000 sq. ft. | `09` | 5 photos |

Post `09` gives the lot dimensions as 50' x 100', which is where the brief's
5,000 sq. ft. comes from. Posts `08`, `10`, `11`, `12` are additional jobs not in
the brief: a before/after fence transformation, a 27' round pool excavation, a
completed backyard upgrade, and a concrete job.

Locations named across the captions: Boerne, Bandera, Fair Oaks, San Antonio.
These match the brief exactly.

## Photography

51 images, many at full phone resolution (4032x3024). This is the strongest
source of real project photography available, better than the website's.

Two limits to know about:

**Three posts are video** (`01`, `02`, `07`), so the original thumbnails alone
(720x1280 and 1320x2347) were not enough - those three include the Boerne pool
excavation and the Fair Oaks King Ranch fence, two headline jobs. Their signed
video URLs were still live at the time, so real mid-action stills were pulled
frame-by-frame and hand-picked; see `media/frames/README.md` for the 10 selected
stills and which timestamp each came from. The raw downloaded video and the
rejected candidate frames were deleted afterward - 172MB combined, and their job
was done once the best frames were picked. If different frames are ever needed,
the videos will have to be re-fetched, and by then the signed URLs will likely
have expired.

**Post `08` has a before/after pair** (`08-*-01` and `08-*-02`, both 4032x3024).
The intake notes call before/after pairs the most persuasive thing a contracting
site can show, and this is the only confirmed pair in the set.

`posts.json` carries Instagram's auto-generated `altText` per image where it
exists. It is a description of what is in frame, not usable alt text as-is, but
it is a starting point.

## Content-integrity notes

**No licensing, insurance, bonding, warranty, guarantee or certification claim
appears in any of the 12 captions.** He does not claim it himself anywhere. So we
do not either. This is the second independent confirmation, after his website's
unanswered "Are you licensed and insured?" FAQ.

**No dates.** The embed payload has no timestamp, and deriving one from the media
id puts these posts in 2041, so that trick does not work for this id scheme.
`posts.json` records `takenAt: null` rather than a guess. Relative order is
reliable; absolute dates are not. Note that posts `01`-`10` share an id prefix and
`11`-`12` a different one, so the recent ten look like one burst.

**No location tags.** Instagram's location field is empty on every post. The place
names above come from the caption text, and one photo in post `03` has a "Bandera,
Texas" sticker burned into the image.

**Likes are not published on our site** regardless; the counts came back null
logged-out anyway.

## Two things worth raising with him

**The avatar is a different logo.** It is a circular badge lockup - houses, LEGACY,
CONTRACTING SOLUTIONS LLC - and it is not the rectangular navy logo on his
website. Logged out, Instagram serves it only at 100x100, which is why the file is
named for its size. It is too small to use. Which mark is current, and can he send
the original?

**His own photos show equipment.** A compact excavator, a skid steer, a dump
trailer and a tandem dump truck all appear across the captured posts and the two
story highlights. The brief wants the site to say "this company has equipment and
handles real work", and unlike the website, Instagram actually evidences it.

## His own language, for reuse

Both brand phrases are his, and appear in captions. "Setting the Standards of
Quality and Trust." is the workhorse, in 9 of 12 posts. "Built from the ground
up." appears once, in post `01`.

"Free estimate" appears in 9 of 12 captions and the phone number in 10 of 12,
which supports the brief's primary CTA wording rather than inventing a label.

Post `01` also states a business angle absent from the website: "Whether you're a
homeowner, pool builder, or contractor, we're available for complete projects or
simply to provide the equipment, excavation, and hauling your crew needs." That is
a second audience, and a decision for him about whether the site addresses it.
