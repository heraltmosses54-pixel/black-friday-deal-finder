[![Black Friday Deal Finder](https://make.fun/badge/black-friday-deal-finder-01.svg)](https://make.fun/c/black-friday-deal-finder-01)
[![Rank](https://make.fun/badge/black-friday-deal-finder-01/heraltmosses54-pixel/black-friday-deal-finder/rank.svg)](https://make.fun/c/black-friday-deal-finder-01)
[![Reward](https://make.fun/badge/black-friday-deal-finder-01/heraltmosses54-pixel/black-friday-deal-finder/reward.svg)](https://make.fun/c/black-friday-deal-finder-01)

# DealHound — Black Friday Deal Finder

A static Black Friday and Cyber Monday deal finder. **72 real deals** across
7 categories (Electronics, Computing, Gaming, Home &amp; Kitchen, Beauty, Toys,
Fashion) from 10 stores (Amazon, Best Buy, Target, Walmart, Dell, Newegg,
Costco, Kohl's, B&amp;H, Kate Spade), each with the product, store, store link,
sale price, usual price, discount and the time its price was checked — plus an
honest verdict on whether each deal is really a deal (Hot / Good / Mild) and
a 0–100 deal score with the maths shown on the site.

Every price was found and checked by hand on Black Friday, **27 Nov 2026**
(the first 34 around 14:05 WIB, the next 6 around 17:20 WIB, the next 20
around 21:30 WIB) and on **28 Nov 2026** (the newest 12 around 09:45 WIB,
each carrying its own check time), against the store's own Black Friday
release or a named deals roundup that links the store; each deal card says
which method verified it and names its source. Amazon's product pages refuse
automated reads (HTTP 403), so every Amazon price is confirmed by two or
more independent roundups.

## Features

- Search across products, brands and stores
- Filter by category, store and minimum discount; sort by discount, deal
  score, saving, price or ending soonest; one-tap "New lows only" and
  "Ending 28 Nov" filters
- Your deal list: save deals from any card or detail page and see what the
  list costs in total, what it would cost at usual prices, and how much it
  saves — saved in the browser, with a shareable `?list=` link to the list
- Top-picks strip: the 5 highest-scoring deals on the page
- Shop-by-store strip: deal count and best discount per store, tap to filter
- Cross-store comparison: 10 products priced at two stores, with the cheaper
  one called out — also shown on each product's detail page
- Per-deal detail page (hash route `#/deal/<id>`) with the full price
  breakdown, the verdict and why it earned it, and the other store's price
- Works offline from static files — no network requests, desktop and phone layouts

## Layout

- `app/` — the site itself: `index.html`, `styles.css`, `data.js` (the 72
  checked deals), `app.js` (rendering, search, filters, detail view, deal list)
- `screenshots/` — 4 real renders of the site (desktop list, desktop deal
  detail, desktop deal list with three saved deals, phone list)
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
