/* DealHound app logic: renders the deal grid, search, category/store/
   discount filters, sorting, and the per-deal detail view on hash routes.
   All data is local (data.js). No network requests are made. */

const grid = document.getElementById("deal-grid");
const detail = document.getElementById("deal-detail");
const resultLine = document.getElementById("result-line");
const emptyNote = document.getElementById("empty-note");
const searchInput = document.getElementById("search");
const storeFilter = document.getElementById("store-filter");
const discountFilter = document.getElementById("discount-filter");
const sortSelect = document.getElementById("sort-select");
const chipsBox = document.getElementById("category-chips");

let activeCategory = "";
let newLowOnly = false;
let endingSoonOnly = false;

/* Deals ending 28 Nov 2026 — the last full day of most sales. */
function isEndingSoon(deal) {
  return deal.ends === "28 Nov 2026";
}

function money(n) {
  const parts = n.toFixed(2).replace(/\.00$/, "").split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return "$" + parts.join(".");
}

function discountOf(deal) {
  return Math.round((1 - deal.sale / deal.usual) * 100);
}

function savingOf(deal) {
  return deal.usual - deal.sale;
}

/* A deal is a genuine new low when the source calls it an all-time low
   or a new low. Exactly 6 deals carry such a flag. */
function isNewLow(deal) {
  return deal.flag === "All-time low" || deal.flag === "New low";
}

/* When this deal's price was checked: v4 deals carry their own
   `checked` field; older deals share the page-wide CHECKED_AT. */
function checkedOf(deal) {
  return deal.checked || CHECKED_AT;
}

/* "My deal list": shoppers save deals and see what the whole list
   costs and saves. Kept in localStorage; a ?list=<id,id> link
   pre-fills the list (and is what "Copy link" shares). */
const LIST_KEY = "dealhound-list-v1";
let savedIds = loadSavedList();

function loadSavedList() {
  try {
    const fromParam = new URLSearchParams(location.search).get("list");
    if (fromParam) {
      const ids = fromParam.split(",").map(function (s) { return s.trim(); })
        .filter(function (id) { return DEALS.some(function (d) { return d.id === id; }); });
      if (ids.length) {
        try { localStorage.setItem(LIST_KEY, JSON.stringify(ids)); } catch (e) {}
        return ids;
      }
    }
    const raw = localStorage.getItem(LIST_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(function (id) { return DEALS.some(function (d) { return d.id === id; }); });
  } catch (e) { return []; }
}

function storeSavedList() {
  try { localStorage.setItem(LIST_KEY, JSON.stringify(savedIds)); } catch (e) {}
}

function isSaved(id) { return savedIds.indexOf(id) !== -1; }

function toggleSaved(id) {
  const i = savedIds.indexOf(id);
  if (i === -1) savedIds.push(id); else savedIds.splice(i, 1);
  storeSavedList();
  renderMyList();
  renderGrid();
  if (!detail.hidden) {
    const m = location.hash.match(/^#\/deal\/([\w-]+)$/);
    if (m) renderDetail(m[1]);
  }
}

/* Deal score, published on the site so shoppers can see the maths:
   discount% + 15 for a genuine new/all-time low + 10 for saving $200+
   + 10 more for saving $500+ - 15 if the was-price is inflated;
   capped at 0-100. No deal here is inflated, so that term is 0. */
function scoreOf(deal) {
  let s = discountOf(deal);
  if (isNewLow(deal)) s += 15;
  if (savingOf(deal) >= 200) s += 10;
  if (savingOf(deal) >= 500) s += 10;
  if (s < 0) s = 0;
  if (s > 100) s = 100;
  return s;
}

/* How each price was verified. Deals sourced from a store's own Black
   Friday release were checked against the store itself; the rest were
   checked against a named deals roundup that links the store. Amazon's
   product pages refuse automated reads (HTTP 403), so Amazon prices
   are confirmed by two or more independent roundups each. */
function checkMethodOf(deal) {
  if (/release/i.test(deal.source)) return { key: "store", label: "store's own Black Friday release" };
  return { key: "roundup", label: "named deals roundup" };
}

function totalSavings() {
  return DEALS.reduce(function (sum, d) { return sum + savingOf(d); }, 0);
}

function endsOf(deal) {
  return deal.ends || null;
}

/* Verdict rule: 40%+ is Hot, 20-39% is Good, under 20% is Mild. */
function verdictOf(deal) {
  const d = discountOf(deal);
  if (d >= 40) return { key: "hot", label: "Hot deal" };
  if (d >= 20) return { key: "good", label: "Good deal" };
  return { key: "mild", label: "Mild deal" };
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function cardHtml(deal) {
  const d = discountOf(deal);
  const v = verdictOf(deal);
  const flag = deal.flag
    ? '<span class="flag">' + escapeHtml(deal.flag) + "</span>" : "";
  const ends = endsOf(deal)
    ? '<p class="ends-line">Ends ' + escapeHtml(endsOf(deal)) + "</p>" : "";
  return '<article class="deal-card">' +
    '<div class="card-top">' +
      '<span class="store-badge">' + escapeHtml(deal.store) + "</span>" +
      '<span class="discount-badge">&minus;' + d + "%</span>" +
    "</div>" +
    '<h3 class="deal-name"><a href="#/deal/' + deal.id + '">' + escapeHtml(deal.name) + "</a></h3>" +
    '<p class="category">' + escapeHtml(deal.category) + "</p>" +
    '<div class="price-row">' +
      '<span class="sale-price">' + money(deal.sale) + "</span>" +
      '<span class="usual-price">' + money(deal.usual) + "</span>" +
      '<span class="save-amount">Save ' + money(savingOf(deal)) + "</span>" +
    "</div>" +
    '<div class="card-badges">' +
      '<span class="verdict ' + v.key + '">' + v.label + "</span>" +
      '<span class="score-badge" title="Deal score: discount% + 15 for a genuine new low + 10 for saving $200+ + 10 more for saving $500+">Score ' + scoreOf(deal) + "/100</span>" +
      flag +
    "</div>" +
    '<p class="deal-note">' + escapeHtml(deal.note) + "</p>" +
    ends +
    '<p class="card-meta">Checked ' + escapeHtml(checkedOf(deal)) + " &middot; &#10003; verified against the " + escapeHtml(checkMethodOf(deal).label) + "<br>Source: " + escapeHtml(deal.source) + "</p>" +
    '<div class="card-actions">' +
      '<a class="btn btn-store" href="' + escapeHtml(deal.url) + '" target="_blank" rel="noopener">View at ' + escapeHtml(deal.store) + " &nearr;</a>" +
      '<a class="btn btn-details" href="#/deal/' + deal.id + '">Details</a>' +
      '<button class="btn btn-save' + (isSaved(deal.id) ? " saved" : "") + '" data-save="' + deal.id + '">' + (isSaved(deal.id) ? "✓ Saved" : "＋ Save") + "</button>" +
    "</div>" +
  "</article>";
}

function filteredDeals() {
  const q = searchInput.value.trim().toLowerCase();
  const store = storeFilter.value;
  const minDiscount = Number(discountFilter.value);
  let list = DEALS.filter(function (deal) {
    if (activeCategory && deal.category !== activeCategory) return false;
    if (newLowOnly && !isNewLow(deal)) return false;
    if (endingSoonOnly && !isEndingSoon(deal)) return false;
    if (store && deal.store !== store) return false;
    if (discountOf(deal) < minDiscount) return false;
    if (q) {
      const hay = (deal.name + " " + deal.store + " " + deal.category).toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
  const sort = sortSelect.value;
  list.sort(function (a, b) {
    if (sort === "score") return scoreOf(b) - scoreOf(a);
    if (sort === "saving") return savingOf(b) - savingOf(a);
    if (sort === "price-asc") return a.sale - b.sale;
    if (sort === "price-desc") return b.sale - a.sale;
    if (sort === "ending") {
      const ea = Date.parse(a.ends || "30 Nov 2026");
      const eb = Date.parse(b.ends || "30 Nov 2026");
      return ea - eb || discountOf(b) - discountOf(a);
    }
    return discountOf(b) - discountOf(a);
  });
  return list;
}

function renderGrid() {
  const list = filteredDeals();
  grid.innerHTML = list.map(cardHtml).join("");
  emptyNote.hidden = list.length !== 0;
  const hot = list.filter(function (d) { return discountOf(d) >= 40; }).length;
  const lows = DEALS.filter(isNewLow).length;
  resultLine.innerHTML = "Showing <strong>" + list.length + "</strong> of " + DEALS.length +
    " deals" + (hot ? " &middot; <strong>" + hot + "</strong> hot deals (40% off or more)" : "") +
    " &middot; <strong>" + lows + "</strong> new lows" +
    (activeCategory ? " &middot; in <strong>" + escapeHtml(activeCategory) + "</strong>" : "") +
    (newLowOnly ? " &middot; new lows only" : "") +
    (endingSoonOnly ? " &middot; ending 28 Nov" : "");
}

function renderDetail(id) {
  const deal = DEALS.find(function (d) { return d.id === id; });
  if (!deal) { detail.hidden = true; return; }
  const d = discountOf(deal);
  const v = verdictOf(deal);
  detail.innerHTML =
    '<button class="back-link" id="back-btn">&larr; Back to all deals</button>' +
    "<h2>" + escapeHtml(deal.name) + "</h2>" +
    '<p class="category">' + escapeHtml(deal.store) + " &middot; " + escapeHtml(deal.category) + "</p>" +
    '<div class="price-row">' +
      '<span class="sale-price">' + money(deal.sale) + "</span>" +
      '<span class="usual-price">' + money(deal.usual) + "</span>" +
      '<span class="discount-badge">&minus;' + d + "%</span>" +
      '<span class="save-amount">Save ' + money(savingOf(deal)) + "</span>" +
    "</div>" +
    '<dl class="detail-grid">' +
      "<dt>Verdict</dt><dd>" + v.label + "</dd>" +
      "<dt>Deal score</dt><dd>" + scoreOf(deal) + " / 100</dd>" +
      "<dt>Sale price</dt><dd>" + money(deal.sale) + "</dd>" +
      "<dt>Usual price</dt><dd>" + money(deal.usual) + "</dd>" +
      "<dt>Discount</dt><dd>" + d + "% off (save " + money(savingOf(deal)) + ")</dd>" +
      "<dt>Store</dt><dd>" + escapeHtml(deal.store) + "</dd>" +
      (endsOf(deal) ? "<dt>Deal ends</dt><dd>" + escapeHtml(endsOf(deal)) + "</dd>" : "") +
      "<dt>Price checked</dt><dd>" + escapeHtml(checkedOf(deal)) + "</dd>" +
      "<dt>How it was checked</dt><dd>Verified against the " + escapeHtml(checkMethodOf(deal).label) + "</dd>" +
      "<dt>Price source</dt><dd>" + escapeHtml(deal.source) + "</dd>" +
    "</dl>" +
    compareForDetail(deal) +
    '<p class="verdict-note"><strong>Why this verdict:</strong> ' + escapeHtml(deal.note) + "</p>" +
    '<p class="detail-actions"><button class="btn btn-save' + (isSaved(deal.id) ? " saved" : "") + '" data-save="' + deal.id + '">' + (isSaved(deal.id) ? "✓ Saved to your list" : "＋ Save to your list") + '</button> ' +
    '<a class="btn btn-store" href="' + escapeHtml(deal.url) + '" target="_blank" rel="noopener">View at ' + escapeHtml(deal.store) + " &nearr;</a></p>";
  detail.hidden = false;
  document.getElementById("back-btn").addEventListener("click", function () {
    location.hash = "#/";
  });
  detail.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* Cross-store prices for this product, if we compared it. */
function compareForDetail(deal) {
  const rows = COMPARE.filter(function (row) { return row.name === deal.name; });
  if (!rows.length) return "";
  return rows.map(function (row) {
    const other = row.a.store === deal.store ? row.b : row.a;
    const mine = row.a.store === deal.store ? row.a : row.b;
    const diff = mine.price - other.price;
    const line = diff === 0
      ? "Same price at " + other.store + " — a tie."
      : diff < 0
        ? "Cheaper here by " + money(-diff) + " than " + other.store + " (" + money(other.price) + ")."
        : other.store + " has it for " + money(other.price) + " — " + money(diff) + " cheaper than here.";
    return '<p class="detail-compare"><strong>Same product elsewhere:</strong> ' + escapeHtml(line) + "</p>";
  }).join("");
}

function route() {
  const hash = location.hash || "#/";
  const m = hash.match(/^#\/deal\/([\w-]+)$/);
  if (m) { renderDetail(m[1]); }
  else { detail.hidden = true; }
  renderGrid();
}

function buildChips() {
  const all = document.createElement("button");
  all.className = "chip active";
  all.textContent = "All categories";
  all.addEventListener("click", function () {
    activeCategory = "";
    chipsBox.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("active"); });
    all.classList.add("active");
    renderGrid();
  });
  chipsBox.appendChild(all);
  CATEGORIES.forEach(function (cat) {
    const btn = document.createElement("button");
    btn.className = "chip";
    btn.textContent = cat;
    btn.addEventListener("click", function () {
      activeCategory = cat;
      chipsBox.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("active"); });
      btn.classList.add("active");
      renderGrid();
    });
    chipsBox.appendChild(btn);
  });
}

function buildStoreOptions() {
  STORES.forEach(function (store) {
    const opt = document.createElement("option");
    opt.value = store;
    opt.textContent = store;
    storeFilter.appendChild(opt);
  });
}

function renderCompare() {
  const box = document.getElementById("compare-section");
  if (!box) return;
  box.innerHTML = "<h2>Same product, two stores</h2>" +
    '<p class="section-intro">Before you buy, check whether another store has the same product cheaper. These prices were verified the same day as the deals above.</p>' +
    COMPARE.map(function (row) {
      const cheaper = row.a.price < row.b.price ? "a" : row.b.price < row.a.price ? "b" : "tie";
      const saving = Math.abs(row.a.price - row.b.price);
      const verdict = cheaper === "tie"
        ? "A tie — same price at both stores."
        : "Cheapest: <strong>" + escapeHtml(cheaper === "a" ? row.a.store : row.b.store) + "</strong> — saves " + money(saving) + ".";
      return '<article class="compare-row">' +
        "<h3>" + escapeHtml(row.name) + "</h3>" +
        '<div class="compare-prices">' +
          '<span class="compare-price' + (cheaper === "a" ? " cheapest" : "") + '">' + escapeHtml(row.a.store) + ": <strong>" + money(row.a.price) + "</strong></span>" +
          '<span class="compare-vs">vs</span>' +
          '<span class="compare-price' + (cheaper === "b" ? " cheapest" : "") + '">' + escapeHtml(row.b.store) + ": <strong>" + money(row.b.price) + "</strong></span>" +
        "</div>" +
        '<p class="compare-verdict">' + verdict + " " + escapeHtml(row.note) + "</p>" +
        '<p class="compare-source">Source: ' + escapeHtml(row.source) + "</p>" +
      "</article>";
    }).join("");
}

function renderStats() {
  const banner = document.getElementById("stats-banner");
  if (!banner) return;
  const lows = DEALS.filter(isNewLow).length;
  const hot = DEALS.filter(function (d) { return discountOf(d) >= 40; }).length;
  const endingToday = DEALS.filter(function (d) { return d.ends === "28 Nov 2026"; }).length;
  banner.innerHTML =
    '<div class="stat"><span class="stat-num">' + DEALS.length + '</span><span class="stat-label">verified deals</span></div>' +
    '<div class="stat"><span class="stat-num">' + STORES.length + '</span><span class="stat-label">stores</span></div>' +
    '<div class="stat"><span class="stat-num">' + money(totalSavings()) + '</span><span class="stat-label">total savings if you bought them all</span></div>' +
    '<div class="stat"><span class="stat-num">' + lows + '</span><span class="stat-label">new lows</span></div>' +
    '<div class="stat"><span class="stat-num">' + hot + '</span><span class="stat-label">hot deals (40%+ off)</span></div>' +
    '<div class="stat"><span class="stat-num">' + endingToday + '</span><span class="stat-label">deals end today (28 Nov)</span></div>';
}

/* Your deal list: the saved deals, what they cost together, and
   what they save together — with a shareable link to the list. */
function renderMyList() {
  const box = document.getElementById("my-list");
  if (!box) return;
  const list = savedIds.map(function (id) {
    return DEALS.find(function (d) { return d.id === id; });
  }).filter(Boolean);
  if (!list.length) {
    box.innerHTML = "<h2>Your deal list — plan your savings</h2>" +
      '<p class="section-intro">Tap <strong>＋ Save</strong> on any deal card to add it here. Your list shows what you would pay in total, what it would cost at usual prices, and how much you save — and you can copy a link to share the list.</p>' +
      '<p class="my-list-empty">No deals saved yet.</p>';
    return;
  }
  const pay = list.reduce(function (s, d) { return s + d.sale; }, 0);
  const usual = list.reduce(function (s, d) { return s + d.usual; }, 0);
  const saved = usual - pay;
  const pct = Math.round((1 - pay / usual) * 100);
  box.innerHTML = "<h2>Your deal list — plan your savings</h2>" +
    '<p class="section-intro">Your saved deals, with the total at sale prices and at usual prices.</p>' +
    '<ul class="my-list-items">' + list.map(function (deal) {
      return '<li><a href="#/deal/' + deal.id + '">' + escapeHtml(deal.name) + "</a>" +
        '<span class="my-list-store">' + escapeHtml(deal.store) + "</span>" +
        '<span class="my-list-price">' + money(deal.sale) + ' <s>' + money(deal.usual) + "</s></span>" +
        '<span class="my-list-save">Save ' + money(savingOf(deal)) + "</span>" +
        '<button class="my-list-remove" data-save="' + deal.id + '" aria-label="Remove ' + escapeHtml(deal.name) + ' from your list">✕</button></li>';
    }).join("") + "</ul>" +
    '<div class="my-list-totals">' +
      "<span><strong>" + list.length + (list.length === 1 ? " deal" : " deals") + "</strong></span>" +
      "<span>You pay <strong>" + money(pay) + "</strong></span>" +
      "<span>Usual price <strong>" + money(usual) + "</strong></span>" +
      '<span class="my-list-total-save">You save <strong>' + money(saved) + " (" + pct + "%)</strong></span>" +
    "</div>" +
    '<div class="my-list-actions"><button class="btn btn-details" id="copy-list">Copy link to this list</button> ' +
    '<button class="btn btn-details" id="clear-list">Clear list</button> ' +
    '<span class="copy-note" id="copy-note" aria-live="polite"></span></div>';
}

function copyListLink() {
  const base = location.href.split("#")[0].split("?")[0];
  const url = base + "?list=" + savedIds.join(",");
  const note = document.getElementById("copy-note");
  function done(ok) {
    if (note) note.textContent = ok ? "Link copied ✓" : "Copy didn't work — the link is: " + url;
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(function () { done(true); }, function () { done(false); });
  } else { done(false); }
}

/* Top 5 deals by deal score — the strongest cuts on the page. */
function renderTopPicks() {
  const box = document.getElementById("top-picks");
  if (!box) return;
  const top = DEALS.slice().sort(function (a, b) { return scoreOf(b) - scoreOf(a); }).slice(0, 5);
  box.innerHTML = "<h2>Top picks — highest deal scores</h2>" +
    '<p class="section-intro">Ranked by deal score (discount% + new-low and big-saving bonuses). These are the five strongest cuts on the page right now.</p>' +
    '<ol class="top-list">' + top.map(function (deal, i) {
      return "<li>" +
        '<span class="top-rank">' + (i + 1) + "</span>" +
        '<a class="top-name" href="#/deal/' + deal.id + '">' + escapeHtml(deal.name) + "</a>" +
        '<span class="top-store">' + escapeHtml(deal.store) + "</span>" +
        '<span class="top-price">' + money(deal.sale) + ' <s>' + money(deal.usual) + "</s></span>" +
        '<span class="top-disc">&minus;' + discountOf(deal) + "%</span>" +
        '<span class="score-badge">Score ' + scoreOf(deal) + "/100</span>" +
      "</li>";
    }).join("") + "</ol>";
}

/* Shop by store: deal count and best discount per store; click to filter. */
function renderStoreStrip() {
  const box = document.getElementById("store-strip");
  if (!box) return;
  box.innerHTML = "<h2>Shop by store</h2>" +
    '<p class="section-intro">Tap a store to filter the deals below to that store only.</p>' +
    '<div class="store-strip">' + STORES.map(function (store) {
      const deals = DEALS.filter(function (d) { return d.store === store; });
      const best = Math.max.apply(null, deals.map(discountOf));
      return '<button class="store-card" data-store="' + escapeHtml(store) + '">' +
        '<span class="store-card-name">' + escapeHtml(store) + "</span>" +
        '<span class="store-card-count">' + deals.length + (deals.length === 1 ? " deal" : " deals") + "</span>" +
        '<span class="store-card-best">up to &minus;' + best + "%</span>" +
      "</button>";
    }).join("") + "</div>";
  box.querySelectorAll(".store-card").forEach(function (btn) {
    btn.addEventListener("click", function () {
      storeFilter.value = btn.getAttribute("data-store");
      renderGrid();
      document.getElementById("deal-grid").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function renderLegend() {
  const legend = document.getElementById("verdict-legend");
  if (!legend) return;
  function count(key) {
    return DEALS.filter(function (d) { return verdictOf(d).key === key; }).length;
  }
  legend.innerHTML = "<h2>What our verdicts mean</h2>" +
    '<ul class="legend-list">' +
      '<li><span class="verdict hot">Hot deal</span> 40% off or more — the deepest cuts of the sale. <strong>' + count("hot") + ' deals</strong>.</li>' +
      '<li><span class="verdict good">Good deal</span> 20–39% off — a solid saving on a real product. <strong>' + count("good") + ' deals</strong>.</li>' +
      '<li><span class="verdict mild">Mild deal</span> under 20% off — a small but real saving, flagged as such. <strong>' + count("mild") + ' deals</strong>.</li>' +
      '<li><span class="verdict inflated">Inflated</span> the was-price does not hold up — the "discount" is not real. <strong>0 deals in this tier right now</strong>: we checked every was-price against its source and none was inflated.</li>' +
    "</ul>" +
    '<p class="legend-score"><strong>Deal score:</strong> discount% + 15 for a genuine new/all-time low + 10 for saving $200 or more + 10 more for saving $500 or more − 15 if the was-price is inflated. Capped at 0–100.</p>';
}

searchInput.addEventListener("input", renderGrid);
storeFilter.addEventListener("change", renderGrid);
discountFilter.addEventListener("change", renderGrid);
sortSelect.addEventListener("change", renderGrid);
window.addEventListener("hashchange", route);

/* Save / remove / clear / copy for the deal list (event delegation,
   since the grid and the detail view re-render on every change). */
document.addEventListener("click", function (ev) {
  const btn = ev.target && ev.target.closest ? ev.target.closest("[data-save]") : null;
  if (btn) { toggleSaved(btn.getAttribute("data-save")); return; }
  if (ev.target && ev.target.id === "clear-list") {
    savedIds = [];
    storeSavedList();
    renderMyList();
    renderGrid();
  }
  if (ev.target && ev.target.id === "copy-list") { copyListLink(); }
});

const newLowToggle = document.getElementById("newlow-toggle");
if (newLowToggle) {
  newLowToggle.addEventListener("click", function () {
    newLowOnly = !newLowOnly;
    newLowToggle.classList.toggle("active", newLowOnly);
    newLowToggle.setAttribute("aria-pressed", String(newLowOnly));
    renderGrid();
  });
}

const endingSoonToggle = document.getElementById("endingsoon-toggle");
if (endingSoonToggle) {
  endingSoonToggle.addEventListener("click", function () {
    endingSoonOnly = !endingSoonOnly;
    endingSoonToggle.classList.toggle("active", endingSoonOnly);
    endingSoonToggle.setAttribute("aria-pressed", String(endingSoonOnly));
    renderGrid();
  });
}

buildChips();
buildStoreOptions();
renderTopPicks();
renderStoreStrip();
renderMyList();
renderCompare();
renderStats();
renderLegend();
route();
