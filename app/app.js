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

function money(n) {
  return "$" + n.toFixed(2).replace(/\.00$/, "");
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
    '<p class="card-meta">Checked ' + escapeHtml(CHECKED_AT) + "<br>Source: " + escapeHtml(deal.source) + "</p>" +
    '<div class="card-actions">' +
      '<a class="btn btn-store" href="' + escapeHtml(deal.url) + '" target="_blank" rel="noopener">View at ' + escapeHtml(deal.store) + " &nearr;</a>" +
      '<a class="btn btn-details" href="#/deal/' + deal.id + '">Details</a>' +
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
    (newLowOnly ? " &middot; new lows only" : "");
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
      "<dt>Price checked</dt><dd>" + escapeHtml(CHECKED_AT) + "</dd>" +
      "<dt>Price source</dt><dd>" + escapeHtml(deal.source) + "</dd>" +
    "</dl>" +
    '<p class="verdict-note"><strong>Why this verdict:</strong> ' + escapeHtml(deal.note) + "</p>" +
    '<p><a class="btn btn-store" href="' + escapeHtml(deal.url) + '" target="_blank" rel="noopener">View at ' + escapeHtml(deal.store) + " &nearr;</a></p>";
  detail.hidden = false;
  document.getElementById("back-btn").addEventListener("click", function () {
    location.hash = "#/";
  });
  detail.scrollIntoView({ behavior: "smooth", block: "start" });
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
  banner.innerHTML =
    '<div class="stat"><span class="stat-num">' + DEALS.length + '</span><span class="stat-label">verified deals</span></div>' +
    '<div class="stat"><span class="stat-num">' + STORES.length + '</span><span class="stat-label">stores</span></div>' +
    '<div class="stat"><span class="stat-num">' + money(totalSavings()) + '</span><span class="stat-label">total savings if you bought them all</span></div>' +
    '<div class="stat"><span class="stat-num">' + lows + '</span><span class="stat-label">new lows</span></div>' +
    '<div class="stat"><span class="stat-num">' + hot + '</span><span class="stat-label">hot deals (40%+ off)</span></div>';
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

const newLowToggle = document.getElementById("newlow-toggle");
if (newLowToggle) {
  newLowToggle.addEventListener("click", function () {
    newLowOnly = !newLowOnly;
    newLowToggle.classList.toggle("active", newLowOnly);
    newLowToggle.setAttribute("aria-pressed", String(newLowOnly));
    renderGrid();
  });
}

buildChips();
buildStoreOptions();
renderCompare();
renderStats();
renderLegend();
route();
