/* DealHound deal data.
   Every price below was checked by hand on Black Friday, 27 Nov 2026
   (around 14:05 WIB), against the store listing or a deals roundup that
   names the store. Each deal names its source. Discounts are computed
   from sale vs usual price; the verdict follows the rule on the site. */

const CHECKED_AT = "27 Nov 2026, 14:05 WIB";

const DEALS = [
  {
    id: "apple-airpods-pro-3",
    name: "Apple AirPods Pro 3",
    store: "Amazon",
    category: "Electronics",
    sale: 149, usual: 249,
    url: "https://www.amazon.com/s?k=apple+airpods+pro+3",
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
  }
];

const CATEGORIES = ["Electronics", "Computing", "Gaming", "Home & Kitchen", "Beauty", "Toys", "Fashion"];
const STORES = ["Amazon", "Best Buy", "Target", "Walmart"];
