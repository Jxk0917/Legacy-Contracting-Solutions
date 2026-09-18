# Legacy Contracting Solutions LLC

Demo website. San Antonio, Texas.

Built by ALVSolutions to show the owner a proposed direction. Not a
client-approved production site.

## Run it

```bash
npm install
npm start     # http://localhost:8080
npm run build # static output to _site/
```

Eleventy static build. No framework, no CSS library, no runtime dependencies.

## Where things are

| Path | What |
|---|---|
| `assets/reference/` | Source material from the client. Read-only, never modified. |
| `src/_data/` | Site content as JSON. Services, projects, areas, business facts. |
| `src/_includes/` | Layouts and partials. |
| `src/assets/` | CSS, self-hosted fonts, optimized images. Served at `/assets/`. |
| `docs/PLAN.md` | Design direction, homepage structure, tokens, component list. |
| `CLAUDE.md` | Working rules, including the content-integrity rule. |

## Current state

Scaffold and content architecture are complete. The visual build is waiting on
reference assets.

See `assets/reference/README.md` for exactly what to add and why. The logo is
the blocking item, because the palette is sampled from it rather than guessed.

## One rule worth repeating

No invented reviews, ratings, licenses, certifications, years in business,
project counts, or guarantees. This site gets shown to the actual owner. Every
factual claim on it has to be one he recognizes as his own.
