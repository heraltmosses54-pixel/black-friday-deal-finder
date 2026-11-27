[![Black Friday Deal Finder](https://make.fun/badge/black-friday-deal-finder-01.svg)](https://make.fun/c/black-friday-deal-finder-01)
[![Rank](https://make.fun/badge/black-friday-deal-finder-01/heraltmosses54-pixel/black-friday-deal-finder/rank.svg)](https://make.fun/c/black-friday-deal-finder-01)
[![Reward](https://make.fun/badge/black-friday-deal-finder-01/heraltmosses54-pixel/black-friday-deal-finder/reward.svg)](https://make.fun/c/black-friday-deal-finder-01)

# DealHound — Black Friday Deal Finder

A static Black Friday and Cyber Monday deal finder. **34 real deals** across
7 categories (Electronics, Computing, Gaming, Home &amp; Kitchen, Beauty, Toys,
Fashion) from 4 stores (Amazon, Best Buy, Target, Walmart), each with the
product, store, store link, sale price, usual price, discount and the time its
price was checked — plus an honest verdict on whether each deal is really a
deal (Hot / Good / Mild).

Every price was found and checked by hand on Black Friday, **27 Nov 2026
(around 14:05 WIB)**, against the store listing or a deals roundup that names
the store; each deal card on the site names its source.

## Features

- Search across products, brands and stores
- Filter by category, store and minimum discount; sort by discount, saving or price
- Per-deal detail page (hash route `#/deal/<id>`) with the full price history
  shown, the verdict and why it earned it
- Works offline from static files — no network requests, desktop and phone layouts

## Layout

- `app/` — the site itself: `index.html`, `styles.css`, `data.js` (the 34
  checked deals), `app.js` (rendering, search, filters, detail view)
- `screenshots/` — 4 real renders of the site (desktop list, desktop deal
  detail, desktop filtered view, phone list)
- `main.ts` — builds the dossier: copies `app/` and `screenshots/` to the
  output directory and writes `dossier.json` with `buildDossier` from
  `vendor/makefun-frontend.ts`
- `shots.json` — how each screenshot was taken (page + viewport)

## Run it

Serve `app/` with any static server and open `index.html`, or build the
dossier:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Requires Node.js 22.18 or later.
