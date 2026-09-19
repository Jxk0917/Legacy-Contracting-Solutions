# Owner confirmation list

Open questions to put to Cesar. None of these blocks the demo. Everything below
is either omitted from the site, marked visibly as unconfirmed, or built as
empty structure waiting on real content.

Evidence for each item is in `docs/SOURCE-OF-TRUTH.md`.

---

## 1. Which logo is official

Two different marks exist and they are not variants of each other.

- **The website logo** is a rectangular navy badge: three houses, crossed
  hammers, "LEGACY CONTRACTING SOLUTIONS", "SINCE 2024". 1170x944, good
  resolution. **This is what the demo uses**, because it is the only
  high-resolution brand asset that has been confirmed.
- **The Instagram avatar** is a circular badge and a different lockup. Logged
  out, Instagram only serves it at 100x100, which is far too small to use.

The demo deliberately does not mix the two. Ask which is current, and get the
original file (AI, EPS, SVG or a large PNG) for whichever it is.

## 2. Is framing still offered

His Instagram bio lists **Framing**. His website's eleven services do not
mention it anywhere.

The demo does not market framing. It is not in the five service groups and it
does not appear in any page copy. If he still frames, it needs adding properly
rather than being slipped into a list.

## 3. Is roofing still offered

Same situation as framing. **Roofing** is in the Instagram bio and absent from
the website. The demo does not market it.

Roofing in particular is worth asking about directly, because it usually carries
licensing and insurance expectations that the rest of this list does not.

## 4. Is "Quote. Approve. Build. It's that simple." approved brand copy

This phrase was in the original brief as a confirmed brand phrase, but it does
not appear anywhere in the captured evidence: not on the live website, and not
in any of the 12 captured Instagram captions.

It is **not used anywhere on the demo**. It is held in `src/_data/site.json` as
`processLineUnconfirmed` so it is not lost, and nothing renders it.

The two phrases that are confirmed, and that the demo does use, are:

- "Setting the Standards of Quality and Trust." (his website, plus 9 of 12 captions)
- "Built from the ground up." (one caption, used as the homepage headline)

Ask where the third phrase came from. If he confirms it, it can go back in.

## 5. Licensing and insurance

**Not claimed anywhere by him.** Not on the website, not in any caption. His own
website FAQ asks "Are you licensed and insured?" and leaves it unanswered.

The demo makes no licensing, insurance, bonding, warranty, guarantee or
certification claim of any kind. This is the single most important item on this
list to get a real answer to, because it is the question customers ask and his
own site currently ducks it.

## 6. Final service area

Confirmed from his own captions: **San Antonio, Boerne, Bandera, Fair Oaks**.
Those four are what the demo states, plus "and surrounding areas".

Open: does he want a named list of towns or a mileage radius from San Antonio,
and are there towns he works in that simply have not been posted about?

## 7. Business email address

**None is published anywhere.** No email on the website, none on Instagram, no
`mailto:` link anywhere in the capture.

The demo shows no email address. The contact form is a marked stub with no
backend, because there is nowhere to send submissions yet. Getting an address
is what makes the form real.

## 8. Reviews and testimonials

He has **zero published reviews**. His own testimonials page reads "There are no
comments yet", "Rating: 0 stars", "0 votes".

The homepage has a reviews section built as empty structure that says plainly it
is waiting on real content. No rating, star count, review count, quote or
customer name is invented anywhere.

What is needed: two or three customers willing to be quoted, with a real name
attached to each.

## 9. Should the physical address be public

His website shows **16226 US-281 S, San Antonio, TX 78221** on the home page.
It appears once, on that page only, and nowhere on Instagram.

The demo does not publish it. For a contractor who works at customer sites, a
published address is a decision rather than a default, and it may be a mailing
or registered address rather than somewhere he wants people turning up.

Related: business hours are not published anywhere either, and the demo does not
state any.

---

## Smaller gaps, per project

These show on the Projects page as amber "Still to confirm with owner" notes.
Set `demoNotes` to `false` in `src/_data/site.json` to hide all of them for a
clean walkthrough.

| Project | Still needed |
| --- | --- |
| Pool Excavation, Boerne | Pool size or dig depth. Whether the client was the homeowner or a pool builder |
| Fence Refurbishment | Location. Linear footage. A genuine "before" photo, as the video starts after the old finish was stripped |
| Concrete Slab, Bandera | What the slab was for |
| Concrete Project, 2,000 sq ft | Location. What the pour was. This is his largest documented job |
| Pool Removal | Location |
| King Ranch Fence, Fair Oaks | Linear footage and column count |
| Lot Clearing | Location. What was built afterward |
| Hauling | Whether to publish material pricing or a delivery radius |

## Photography

All project photography on the demo is his own, pulled from his website and
Instagram. Three jobs are represented by stills extracted from his video posts,
because no stills existed: the Boerne pool excavation, the fence staining, and
the Fair Oaks King Ranch fence.

Higher-resolution originals from his phone would improve those three noticeably.
Also worth asking for: more genuine before-and-after pairs, which are the most
persuasive thing this kind of site can show. Only two confirmed pairs exist in
what was captured.
