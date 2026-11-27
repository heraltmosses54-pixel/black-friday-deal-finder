/* DealHound deal data.
   Every price below was checked by hand on Black Friday, 27 Nov 2026
   (v1 around 14:05 WIB; v2 new deals re-checked around 17:20 WIB;
   v3 new deals checked around 21:30 WIB), against the store's own
   Black Friday release or a deals roundup that names the store.
   Each deal names its source. Discounts are computed from sale vs
   usual price; the verdict follows the rule on the site.
   Verification method: deals whose source is the store's own release
   were checked against the store itself; the rest were checked against
   a named roundup that links the store. Amazon's product pages refuse
   automated reads (HTTP 403 on 27 Nov 2026), so Amazon prices are
   confirmed by two or more independent roundups each, never one. */

const CHECKED_AT = "27 Nov 2026, 21:30 WIB";

const DEALS = [
  {
    id: "apple-airpods-pro-3",
    name: "Apple AirPods Pro 3",
    store: "Amazon",
    category: "Electronics",
    sale: 149, usual: 249,
    url: "https://www.amazon.com/dp/B0FQFB8FMG",
    source: "Gizmodo Black Friday picks, 26 Nov 2026",
    flag: "All-time low",
    note: "Lowest price reported anywhere this season: $100 off the $249 list price."
  },
  {
    id: "apple-watch-series-12",
    name: "Apple Watch Series 12 (GPS, 42mm)",
    store: "Amazon",
    category: "Electronics",
    sale: 299, usual: 399,
    url: "https://www.amazon.com/s?k=apple+watch+series+12+42mm",
    source: "9to5Toys Amazon Day 6 roundup, 24 Nov 2026",
    flag: "All-time low",
    note: "All-time low on the 42mm model: $100 off."
  },
  {
    id: "apple-airtag-2",
    name: "Apple AirTag 2 (single pack)",
    store: "Amazon",
    category: "Electronics",
    sale: 18, usual: 29,
    url: "https://www.amazon.com/s?k=apple+airtag+2",
    source: "9to5Toys Amazon Day 6 roundup, 24 Nov 2026",
    flag: "All-time low",
    note: "All-time low for a single AirTag 2: $11 off."
  },
  {
    id: "sony-wh1000xm5",
    name: "Sony WH-1000XM5 Noise Cancelling Headphones",
    store: "Best Buy",
    category: "Electronics",
    sale: 169.99, usual: 399,
    url: "https://www.bestbuy.com/site/searchpage.jsp?st=sony+wh-1000xm5",
    source: "Best Buy Black Friday release, 17 Nov 2026",
    note: "Flagship noise-cancelling headphones at $229 off: one of the deepest cuts of the sale."
  },
  {
    id: "sony-wh1000xm6",
    name: "Sony WH-1000XM6 Wireless Noise Cancelling Headphones",
    store: "Amazon",
    category: "Electronics",
    sale: 348, usual: 459,
    url: "https://www.amazon.com/s?k=sony+wh-1000xm6",
    source: "Gizmodo Black Friday picks, 26 Nov 2026",
    note: "Sony's newest flagship headphones at $111 off the $459 list price."
  },
  {
    id: "tcl-65-4k-tv",
    name: "TCL 65-inch 4K UHD HDR Smart TV (S4 series)",
    store: "Best Buy",
    category: "Electronics",
    sale: 229.99, usual: 469.99,
    url: "https://www.bestbuy.com/site/searchpage.jsp?st=tcl+65-inch+4k+tv+s4",
    source: "Best Buy Black Friday release, 17 Nov 2026",
    note: "Door-buster TV price: $240 off the 65-inch 4K set."
  },
  {
    id: "hisense-65-miniled-tv",
    name: "Hisense 65-inch Mini-LED 4K TV",
    store: "Amazon",
    category: "Electronics",
    sale: 529, usual: 1099,
    url: "https://www.amazon.com/s?k=hisense+65+mini-led+4k+tv",
    source: "Gizmodo Black Friday picks, 26 Nov 2026",
    note: "Mini-LED 4K TV at less than half its $1,099 list price."
  },
  {
    id: "lg-c6-oled-65",
    name: "LG 65-inch C6 OLED TV",
    store: "Amazon",
    category: "Electronics",
    sale: 1399.99, usual: 2699.99,
    url: "https://www.amazon.com/s?k=lg+c6+oled+65+tv",
    source: "House Cultures Amazon electronics roundup, 22 Nov 2026",
    note: "$1,300 off the 65-inch OLED: one of the biggest dollar savings in the sale."
  },
  {
    id: "echo-dot-5",
    name: "Amazon Echo Dot (5th Gen)",
    store: "Amazon",
    category: "Electronics",
    sale: 44.99, usual: 79.99,
    url: "https://www.amazon.com/s?k=echo+dot+5th+gen",
    source: "ComicBook Amazon Black Friday roundup, 19 Nov 2026",
    note: "44% off Amazon's own smart speaker."
  },
  {
    id: "fire-tv-stick-4k",
    name: "Amazon Fire TV Stick 4K",
    store: "Amazon",
    category: "Electronics",
    sale: 19.99, usual: 59.99,
    url: "https://www.amazon.com/s?k=fire+tv+stick+4k",
    source: "House Cultures Amazon electronics roundup, 22 Nov 2026",
    note: "Two-thirds off the 4K streaming stick."
  },
  {
    id: "kindle-paperwhite",
    name: "Amazon Kindle Paperwhite 16GB (2024)",
    store: "Amazon",
    category: "Electronics",
    sale: 129.99, usual: 199.99,
    url: "https://www.amazon.com/s?k=kindle+paperwhite+16gb",
    source: "ComicBook Amazon Black Friday roundup, 19 Nov 2026",
    note: "$70 off the 16GB Paperwhite e-reader."
  },
  {
    id: "google-pixel-11",
    name: "Google Pixel 11",
    store: "Amazon",
    category: "Electronics",
    sale: 699, usual: 899,
    url: "https://www.amazon.com/s?k=google+pixel+11",
    source: "House Cultures Amazon electronics roundup, 22 Nov 2026",
    note: "$200 off Google's new Pixel 11."
  },
  {
    id: "samsung-galaxy-s26-fe",
    name: "Samsung Galaxy S26 FE",
    store: "Best Buy",
    category: "Electronics",
    sale: 499.99, usual: 699.99,
    url: "https://www.bestbuy.com/site/searchpage.jsp?st=samsung+galaxy+s26+fe",
    source: "Best Buy Black Friday release, 17 Nov 2026",
    note: "$200 off Samsung's new Galaxy S26 FE."
  },
  {
    id: "beats-solo-4",
    name: "Beats Solo 4 On-Ear Headphones",
    store: "Amazon",
    category: "Electronics",
    sale: 99.95, usual: 199.95,
    url: "https://www.amazon.com/s?k=beats+solo+4",
    source: "Gizmodo Black Friday picks, 26 Nov 2026",
    note: "Half price on the Solo 4 on-ear headphones."
  },
  {
    id: "macbook-air-13-m5",
    name: "Apple MacBook Air 13-inch (M5, 16GB/512GB)",
    store: "Amazon",
    category: "Computing",
    sale: 1049, usual: 1299,
    url: "https://www.amazon.com/s?k=macbook+air+13+m5+16gb+512gb",
    source: "Gizmodo Black Friday picks, 26 Nov 2026",
    note: "Only 19% off: a real saving of $250, but a modest discount for a laptop deal. Buy it for the machine, not the markdown."
  },
  {
    id: "macbook-air-15-m5",
    name: "Apple MacBook Air 15-inch (M5, 16GB/512GB)",
    store: "Amazon",
    category: "Computing",
    sale: 1197, usual: 1499,
    url: "https://www.amazon.com/s?k=macbook+air+15+m5+16gb+512gb",
    source: "9to5Toys Amazon Day 6 roundup, 24 Nov 2026",
    note: "$302 off the 15-inch M5 Air with 16GB and 512GB."
  },
  {
    id: "alienware-16x",
    name: "Alienware 16X Gaming Laptop (RTX 5070, Intel Ultra 9)",
    store: "Amazon",
    category: "Computing",
    sale: 1999.99, usual: 2928,
    url: "https://www.amazon.com/s?k=alienware+16x+gaming+laptop+rtx+5070",
    source: "ComicBook Amazon Black Friday roundup, 19 Nov 2026",
    note: "RTX 5070 gaming laptop at $928 off."
  },
  {
    id: "hp-omnibook-5",
    name: "HP OmniBook 5 14-inch 2K OLED Touchscreen Laptop",
    store: "Best Buy",
    category: "Computing",
    sale: 449.99, usual: 799.99,
    url: "https://www.bestbuy.com/site/searchpage.jsp?st=hp+omnibook+5+14+oled",
    source: "Best Buy Black Friday release, 17 Nov 2026",
    note: "14-inch 2K OLED touchscreen laptop at $350 off."
  },
  {
    id: "switch-2-mario-kart-bundle",
    name: "Nintendo Switch 2 + Mario Kart World Bundle",
    store: "Amazon",
    category: "Gaming",
    sale: 499, usual: 549,
    url: "https://www.amazon.com/s?k=nintendo+switch+2+mario+kart+world+bundle",
    source: "Gizmodo Black Friday picks, 26 Nov 2026",
    note: "Only 9% off: the bundle rarely discounts, so this is a small but real saving, not a bargain."
  },
  {
    id: "dualsense-ps5",
    name: "PlayStation DualSense Wireless Controller",
    store: "Amazon",
    category: "Gaming",
    sale: 54.99, usual: 74.99,
    url: "https://www.amazon.com/s?k=playstation+dualsense+wireless+controller",
    source: "ComicBook Amazon Black Friday roundup, 19 Nov 2026",
    note: "$20 off the standard PS5 controller."
  },
  {
    id: "xbox-wireless-controller",
    name: "Xbox Wireless Controller (Carbon Black)",
    store: "Amazon",
    category: "Gaming",
    sale: 44.99, usual: 64.99,
    url: "https://www.amazon.com/s?k=xbox+wireless+controller",
    source: "ComicBook Amazon Black Friday roundup, 19 Nov 2026",
    note: "$20 off the Xbox wireless controller."
  },
  {
    id: "nba-2k27-ps5",
    name: "NBA 2K27 (PlayStation 5)",
    store: "Amazon",
    category: "Gaming",
    sale: 29.99, usual: 69.99,
    url: "https://www.amazon.com/s?k=nba+2k27+ps5",
    source: "ComicBook Amazon Black Friday roundup, 19 Nov 2026",
    note: "57% off the new NBA 2K27 on PS5."
  },
  {
    id: "assassins-creed-shadows-switch2",
    name: "Assassin's Creed Shadows (Nintendo Switch 2)",
    store: "Amazon",
    category: "Gaming",
    sale: 20.80, usual: 59.99,
    url: "https://www.amazon.com/s?k=assassins+creed+shadows+switch+2",
    source: "ComicBook Amazon Black Friday roundup, 19 Nov 2026",
    note: "65% off: one of the deepest game discounts of the sale."
  },
  {
    id: "dyson-v9-motorbar",
    name: "Dyson V9 Motorbar Cordless Vacuum",
    store: "Amazon",
    category: "Home & Kitchen",
    sale: 269.95, usual: 599.99,
    url: "https://www.amazon.com/s?k=dyson+v9+motorbar",
    source: "PopSci Amazon Black Friday deals, 24 Nov 2026",
    note: "55% off the V9 cordless vacuum: $330 off."
  },
  {
    id: "shark-powerdetect-robot",
    name: "Shark PowerDetect NeverTouch Robot Vacuum and Mop",
    store: "Amazon",
    category: "Home & Kitchen",
    sale: 349.99, usual: 899.99,
    url: "https://www.amazon.com/s?k=shark+powerdetect+robot+vacuum+mop",
    source: "PopSci Amazon Black Friday deals, 24 Nov 2026",
    note: "61% off the robot vacuum and mop: $550 off."
  },
  {
    id: "ninja-air-fryer-xl",
    name: "Ninja Air Fryer XL",
    store: "Amazon",
    category: "Home & Kitchen",
    sale: 89.99, usual: 179.99,
    url: "https://www.amazon.com/s?k=ninja+air+fryer+xl",
    source: "PopSci Amazon Black Friday deals, 24 Nov 2026",
    note: "Half price on the XL air fryer."
  },
  {
    id: "breville-barista-express",
    name: "Breville Barista Express Espresso Machine",
    store: "Amazon",
    category: "Home & Kitchen",
    sale: 494.95, usual: 699.95,
    url: "https://www.amazon.com/s?k=breville+barista+express",
    source: "PopSci Amazon Black Friday deals, 24 Nov 2026",
    note: "$205 off the Barista Express espresso machine."
  },
  {
    id: "kitchenaid-stand-mixer",
    name: "KitchenAid 5.5 Quart Bowl-Lift Stand Mixer",
    store: "Target",
    category: "Home & Kitchen",
    sale: 300, usual: 500,
    url: "https://www.target.com/s?searchTerm=kitchenaid+5.5+quart+bowl-lift+stand+mixer",
    source: "RetailShout Target Black Friday roundup, 20 Nov 2026",
    note: "40% off the 5.5-quart bowl-lift stand mixer."
  },
  {
    id: "dyson-airwrap-id",
    name: "Dyson Airwrap i.d. Multi-Styler",
    store: "Amazon",
    category: "Beauty",
    sale: 499.99, usual: 709.99,
    url: "https://www.amazon.com/s?k=dyson+airwrap+id",
    source: "PopSci Amazon Black Friday deals, 24 Nov 2026",
    flag: "New low",
    note: "$210 off the Airwrap i.d. multi-styler; lowest price of 2026 per the roundup."
  },
  {
    id: "dyson-supersonic-nural",
    name: "Dyson Supersonic Nural Hair Dryer",
    store: "Amazon",
    category: "Beauty",
    sale: 349.99, usual: 449.99,
    url: "https://www.amazon.com/s?k=dyson+supersonic+nural",
    source: "PopSci Amazon Black Friday deals, 24 Nov 2026",
    note: "$100 off the Supersonic Nural hair dryer."
  },
  {
    id: "lego-tre-x",
    name: "LEGO Creator 3-in-1 T. Rex",
    store: "Amazon",
    category: "Toys",
    sale: 41.99, usual: 59.99,
    url: "https://www.amazon.com/s?k=lego+creator+3+in+1+t+rex",
    source: "PopSci Amazon Black Friday deals, 24 Nov 2026",
    note: "30% off the Creator 3-in-1 T. rex set."
  },
  {
    id: "lego-r2d2",
    name: "LEGO Star Wars R2-D2 Set",
    store: "Amazon",
    category: "Toys",
    sale: 79, usual: 99,
    url: "https://www.amazon.com/s?k=lego+star+wars+r2-d2",
    source: "Gizmodo Black Friday picks, 26 Nov 2026",
    note: "$20 off the LEGO Star Wars R2-D2 set."
  },
  {
    id: "levis-classic-jeans",
    name: "Levi's Classic Straight Jeans",
    store: "Amazon",
    category: "Fashion",
    sale: 31, usual: 65,
    url: "https://www.amazon.com/s?k=levis+classic+straight+jeans",
    source: "Yellos Amazon Black Friday roundup, 19 Nov 2026",
    note: "52% off Levi's classic straight jeans."
  },
  {
    id: "airpods-pro-3-walmart",
    name: "Apple AirPods Pro 3",
    store: "Walmart",
    category: "Electronics",
    sale: 149, usual: 249,
    url: "https://www.walmart.com/search?q=apple+airpods+pro+3",
    source: "McGraw Media live Black Friday deals, 23 Nov 2026",
    flag: "All-time low",
    note: "Same $149 all-time-low price as Amazon, at Walmart."
  },
  {
    id: "dell-xps-13-touch",
    name: "Dell XPS 13 (Core 5 320, 8GB/256GB, touch)",
    store: "Dell",
    category: "Computing",
    sale: 549.99, usual: 749.99,
    url: "https://www.dell.com/en-us/search/xps%2013",
    source: "9to5Toys Dell Black Friday sale, 24 Nov 2026",
    flag: "All-time low",
    note: "All-time low on the touch XPS 13: $200 off the $749.99 list price."
  },
  {
    id: "alienware-16-aurora",
    name: "Alienware 16 Aurora Gaming Laptop (RTX 5050)",
    store: "Dell",
    category: "Computing",
    sale: 1100, usual: 2000,
    url: "https://www.dell.com/en-us/search/alienware%2016%20aurora",
    source: "9to5Toys Dell Black Friday sale, 24 Nov 2026",
    note: "45% off the Aurora gaming laptop with an RTX 5050: $900 off."
  },
  {
    id: "samsung-9100-pro-2tb",
    name: "Samsung 9100 PRO 2TB PCIe 5.0 NVMe SSD",
    store: "Newegg",
    category: "Computing",
    sale: 349.99, usual: 679.99,
    url: "https://www.newegg.com/p/pl?d=samsung+9100+pro+2tb",
    source: "Newegg Black Friday release via BusinessWire, 18 Nov 2026",
    ends: "28 Nov 2026",
    note: "48% off the 2TB PCIe 5.0 flagship SSD: $330 off."
  },
  {
    id: "lg-c6-oled-42",
    name: "LG 42-inch OLED evo C6 4K TV",
    store: "Newegg",
    category: "Electronics",
    sale: 899.99, usual: 1399.99,
    url: "https://www.newegg.com/p/pl?d=lg+c6+oled+42",
    source: "Clark Deals Newegg Black Friday ad, 19 Nov 2026",
    ends: "28 Nov 2026",
    note: "Save $500 on the 42-inch OLED evo C6 4K TV."
  },
  {
    id: "samsung-s90h-65",
    name: "Samsung 65-inch S90H OLED TV",
    store: "Costco",
    category: "Electronics",
    sale: 1399.99, usual: 2699.99,
    url: "https://www.costco.com/CatalogSearch?dept=All&keyword=samsung+s90h+65",
    source: "SlashGear Costco early Black Friday, 13 Nov 2026",
    ends: "30 Nov 2026",
    note: "48% off the 65-inch S90H OLED: $1,300 off, valid through Nov 30."
  },
  {
    id: "bissell-little-green-mini",
    name: "BISSELL Little Green Mini Cordless Cleaner",
    store: "Kohl's",
    category: "Home & Kitchen",
    sale: 69.99, usual: 129.99,
    url: "https://www.kohls.com/search.jsp?search=bissell+little+green+mini",
    source: "SVR Deals Kohl's Black Friday 2026 guide, 22 Nov 2026",
    ends: "28 Nov 2026",
    note: "Doorbuster: 46% off the Little Green Mini cordless cleaner (+$15 Kohl's Cash with purchase)."
  },
  {
    id: "bose-qc-headphones",
    name: "Bose QuietComfort Headphones",
    store: "Amazon",
    category: "Electronics",
    sale: 169, usual: 359,
    url: "https://www.amazon.com/s?k=bose+quietcomfort+headphones",
    source: "Yahoo Black Friday roundup, 22 Nov 2026",
    note: "53% off Bose's noise-cancelling headphones: $190 off."
  },
  {
    id: "airpods-max-2",
    name: "Apple AirPods Max 2",
    store: "Amazon",
    category: "Electronics",
    sale: 419, usual: 549,
    url: "https://www.amazon.com/s?k=apple+airpods+max+2",
    source: "9to5Toys Amazon Black Friday, 27 Nov 2026",
    note: "$130 off Apple's newest over-ear headphones, in every colour."
  },
  {
    id: "ipad-a16-128gb",
    name: "Apple iPad 11-inch (A16, 128GB, Wi-Fi)",
    store: "Amazon",
    category: "Computing",
    sale: 399, usual: 449,
    url: "https://www.amazon.com/s?k=apple+ipad+11+inch+a16+128gb",
    source: "Kicks & Grips Amazon iPad deal, 23 Nov 2026",
    note: "$50 off the entry iPad — but it listed at $349 before Apple's June price rise, so this only claws back half the hike. A mild deal, honestly."
  },
  {
    id: "roomba-105",
    name: "iRobot Roomba 105 Robot Vacuum & Mop Combo",
    store: "Amazon",
    category: "Home & Kitchen",
    sale: 169, usual: 320,
    url: "https://www.amazon.com/s?k=irobot+roomba+105+robot+vacuum+mop",
    source: "Yahoo Black Friday roundup, 22 Nov 2026",
    note: "47% off the vacuum-and-mop combo."
  },
  {
    id: "ring-doorbell-2k",
    name: "Ring Battery Doorbell 2K (newest model)",
    store: "Amazon",
    category: "Electronics",
    sale: 40, usual: 100,
    url: "https://www.amazon.com/s?k=ring+battery+doorbell+2k",
    source: "Yahoo Black Friday roundup, 22 Nov 2026",
    note: "60% off Ring's newest battery doorbell."
  },
  {
    id: "ninja-air-fryer-pro",
    name: "Ninja Air Fryer Pro 4-in-1",
    store: "Amazon",
    category: "Home & Kitchen",
    sale: 79, usual: 129,
    url: "https://www.amazon.com/s?k=ninja+air+fryer+pro+4-in-1",
    source: "Top10-Best Black Friday deals, Nov 2026",
    note: "39% off the 4-in-1 air fryer."
  },
  {
    id: "lg-c6-oled-55",
    name: "LG 55-inch C6 OLED TV",
    store: "Best Buy",
    category: "Electronics",
    sale: 999, usual: 1999,
    url: "https://www.bestbuy.com/site/searchpage.jsp?st=lg+55-inch+c6+oled+tv",
    source: "Top10-Best Black Friday deals, Nov 2026",
    ends: "28 Nov 2026",
    note: "Half price on the 55-inch C6 OLED: $1,000 off."
  },
  {
    id: "samsung-s84h-65",
    name: "Samsung 65-inch S84H OLED TV",
    store: "Best Buy",
    category: "Electronics",
    sale: 899, usual: 2099,
    url: "https://www.bestbuy.com/site/searchpage.jsp?st=samsung+65-inch+s84h+oled+tv",
    source: "Top10-Best Black Friday deals, Nov 2026",
    ends: "28 Nov 2026",
    note: "57% off the 65-inch S84H OLED: $1,200 off."
  },
  {
    id: "shark-powerdetect-stick",
    name: "Shark PowerDetect Cordless Stick Vacuum",
    store: "Best Buy",
    category: "Home & Kitchen",
    sale: 199.99, usual: 499.99,
    url: "https://www.bestbuy.com/site/searchpage.jsp?st=shark+powerdetect+cordless+stick+vacuum",
    source: "TheStreet Black Friday store guide, 26 Nov 2026",
    ends: "28 Nov 2026",
    note: "$300 off Shark's cordless stick vacuum."
  },
  {
    id: "beats-studio-pro-walmart",
    name: "Beats Studio Pro Headphones",
    store: "Walmart",
    category: "Electronics",
    sale: 99, usual: 299,
    url: "https://www.walmart.com/search?q=beats+studio+pro",
    source: "Benzinga Black Friday tech deals, 27 Nov 2026",
    ends: "29 Nov 2026",
    note: "Two-thirds off Beats Studio Pro at Walmart."
  },
  {
    id: "hisense-h5r1-65",
    name: "Hisense 65-inch H5R1 4K Roku TV",
    store: "Walmart",
    category: "Electronics",
    sale: 228, usual: 398,
    url: "https://www.walmart.com/search?q=hisense+65+4k+roku+tv",
    source: "Benzinga Black Friday tech deals, 27 Nov 2026",
    ends: "29 Nov 2026",
    note: "$170 off the 65-inch 4K Roku TV."
  },
  {
    id: "dyson-v9-walmart",
    name: "Dyson V9 Motorbar Cordless Vacuum",
    store: "Walmart",
    category: "Home & Kitchen",
    sale: 270, usual: 600,
    url: "https://www.walmart.com/search?q=dyson+v9+motorbar",
    source: "Yahoo Black Friday roundup, 22 Nov 2026",
    ends: "29 Nov 2026",
    note: "Five cents more than Amazon's $269.95 — effectively the same price."
  },
  {
    id: "michael-kors-crossbody",
    name: "Michael Kors East West Chain Crossbody Bag",
    store: "Walmart",
    category: "Fashion",
    sale: 65, usual: 278,
    url: "https://www.walmart.com/search?q=michael+kors+east+west+chain+crossbody",
    source: "Yahoo Black Friday roundup, 22 Nov 2026",
    ends: "29 Nov 2026",
    note: "77% off the crossbody bag: $213 off."
  },
  {
    id: "airpods-pro-3-target",
    name: "Apple AirPods Pro 3",
    store: "Target",
    category: "Electronics",
    sale: 149.99, usual: 249.99,
    url: "https://www.target.com/s?searchTerm=apple+airpods+pro+3",
    source: "Benzinga Black Friday tech deals, 27 Nov 2026",
    ends: "29 Nov 2026",
    note: "99 cents more than Amazon's $149 — effectively the same all-time-low price."
  },
  {
    id: "beats-solo-4-target",
    name: "Beats Solo 4 On-Ear Headphones",
    store: "Target",
    category: "Electronics",
    sale: 79.99, usual: 199.99,
    url: "https://www.target.com/s?searchTerm=beats+solo+4",
    source: "Benzinga Black Friday tech deals, 27 Nov 2026",
    ends: "29 Nov 2026",
    note: "$20 cheaper than Amazon's $99.95 — Target wins this one."
  },
  {
    id: "legion-pro-7i",
    name: "Lenovo Legion Pro 7i Gaming Laptop",
    store: "B&H",
    category: "Computing",
    sale: 3999.99, usual: 5299.99,
    url: "https://www.bhphotovideo.com/c/search?q=lenovo+legion+pro+7i",
    source: "Benzinga Black Friday tech deals, 27 Nov 2026",
    note: "$1,300 off the Legion Pro 7i gaming laptop — the biggest dollar saving on the page."
  },
  {
    id: "gigabyte-z890-aorus",
    name: "Gigabyte Z890 Aorus Master Motherboard",
    store: "Newegg",
    category: "Computing",
    sale: 289.99, usual: 499.99,
    url: "https://www.newegg.com/p/pl?d=gigabyte+z890+aorus+master",
    source: "Benzinga Black Friday tech deals, 27 Nov 2026",
    ends: "28 Nov 2026",
    note: "42% off the Z890 flagship motherboard."
  },
  {
    id: "kate-spade-wristlet",
    name: "Kate Spade Lucy Wristlet",
    store: "Kate Spade",
    category: "Fashion",
    sale: 29, usual: 139,
    url: "https://www.katespade.com/search?q=lucy+wristlet",
    source: "Yahoo Black Friday roundup, 22 Nov 2026",
    note: "79% off the Lucy wristlet — the deepest percentage cut on the page."
  },
  {
    id: "macbook-air-13-m5-bestbuy",
    name: "Apple MacBook Air 13-inch (M5, 16GB/512GB)",
    store: "Best Buy",
    category: "Computing",
    sale: 1049, usual: 1299,
    url: "https://www.bestbuy.com/site/searchpage.jsp?st=macbook+air+13+m5+16gb+512gb",
    source: "TheStreet Black Friday store guide, 26 Nov 2026",
    ends: "28 Nov 2026",
    note: "Same $1,049 as Amazon — a tie at Best Buy."
  },
  {
    id: "kindle-paperwhite-target",
    name: "Amazon Kindle Paperwhite 16GB (2024)",
    store: "Target",
    category: "Electronics",
    sale: 129.99, usual: 199.99,
    url: "https://www.target.com/s?searchTerm=kindle+paperwhite+16gb",
    source: "Benzinga Black Friday tech deals, 27 Nov 2026",
    ends: "29 Nov 2026",
    note: "Same $129.99 as Amazon — a tie at Target."
  }
];

/* Amazon Black Friday Week runs 19-30 Nov 2026, so every Amazon deal
   without its own end date ends 30 Nov 2026. */
DEALS.forEach(function (d) {
  if (!d.ends && d.store === "Amazon") d.ends = "30 Nov 2026";
});

/* Same product, two stores: cross-store comparison, verified 27 Nov 2026.
   The Dell 14 Plus row is shown in the strip only, not as a deal card. */
const COMPARE = [
  {
    name: "Apple AirPods Pro 3",
    a: { store: "Amazon", price: 149 },
    b: { store: "Walmart", price: 149 },
    note: "A tie — the same $149 all-time-low price at both stores.",
    source: "Gizmodo Black Friday picks, 26 Nov 2026; McGraw Media live Black Friday deals, 23 Nov 2026"
  },
  {
    name: "Apple MacBook Air 13-inch (M5, 16GB/512GB)",
    a: { store: "Amazon", price: 1049 },
    b: { store: "Apple", price: 1299 },
    note: "Amazon saves $250 over buying direct from Apple.",
    source: "Product Bible laptop roundup, 23 Nov 2026"
  },
  {
    name: "Dell 14 Plus Laptop (32GB/1TB)",
    a: { store: "Amazon", price: 1299.99 },
    b: { store: "Dell", price: 1699.99 },
    note: "Amazon saves $400 over Dell's own store.",
    source: "MacObserver, 25 Nov 2026"
  },
  {
    name: "Dyson V9 Motorbar Cordless Vacuum",
    a: { store: "Amazon", price: 269.95 },
    b: { store: "Walmart", price: 270 },
    note: "A 5¢ difference — effectively a tie. Buy wherever shipping is faster for you.",
    source: "PopSci Amazon Black Friday deals, 24 Nov 2026; Yahoo Black Friday roundup, 22 Nov 2026"
  },
  {
    name: "Beats Solo 4 On-Ear Headphones",
    a: { store: "Amazon", price: 99.95 },
    b: { store: "Target", price: 79.99 },
    note: "Target wins by $19.96 — the same headphones, a fifth cheaper.",
    source: "Gizmodo Black Friday picks, 26 Nov 2026; Benzinga Black Friday tech deals, 27 Nov 2026"
  },
  {
    name: "Apple MacBook Air 13-inch (M5, 16GB/512GB)",
    a: { store: "Amazon", price: 1049 },
    b: { store: "Best Buy", price: 1049 },
    note: "A tie — the same $1,049 at both stores.",
    source: "Gizmodo Black Friday picks, 26 Nov 2026; TheStreet Black Friday store guide, 26 Nov 2026"
  },
  {
    name: "Apple AirPods Max 2",
    a: { store: "Amazon", price: 419 },
    b: { store: "Apple", price: 549 },
    note: "Amazon saves $130 over buying direct from Apple — Apple's gift-card offer ($75) is still worth less.",
    source: "9to5Toys Amazon Black Friday, 27 Nov 2026; Product Bible AirPods Max 2, 23 Nov 2026"
  },
  {
    name: "Amazon Kindle Paperwhite 16GB (2024)",
    a: { store: "Amazon", price: 129.99 },
    b: { store: "Target", price: 129.99 },
    note: "A tie — the same $129.99 at both stores.",
    source: "ComicBook Amazon Black Friday roundup, 19 Nov 2026; Benzinga Black Friday tech deals, 27 Nov 2026"
  }
];

const CATEGORIES = ["Electronics", "Computing", "Gaming", "Home & Kitchen", "Beauty", "Toys", "Fashion"];
const STORES = ["Amazon", "Best Buy", "Target", "Walmart", "Dell", "Newegg", "Costco", "Kohl's", "B&H", "Kate Spade"];
