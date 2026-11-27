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

function money(n) {
  return "$" + n.toFixed(2).replace(/\.00$/, "");
}

function discountOf(deal) {
  return Math.round((1 - deal.sale / deal.usual) * 100);
}

function savingOf(deal) {
  return deal.usual - deal.sale;
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
    '<span class="verdict ' + v.key + '">' + v.label + "</span>" +
    flag +
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
  resultLine.innerHTML = "Showing <strong>" + list.length + "</strong> of " + DEALS.length +
    " deals" + (hot ? " &middot; <strong>" + hot + "</strong> hot deals (40% off or more)" : "") +
    (activeCategory ? " &middot; in <strong>" + escapeHtml(activeCategory) + "</strong>" : "");
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
      "<dt>Sale price</dt><dd>" + money(deal.sale) + "</dd>" +
      "<dt>Usual price</dt><dd>" + money(deal.usual) + "</dd>" +
      "<dt>Discount</dt><dd>" + d + "% off (save " + money(savingOf(deal)) + ")</dd>" +
      "<dt>Store</dt><dd>" + escapeHtml(deal.store) + "</dd>" +
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

searchInput.addEventListener("input", renderGrid);
storeFilter.addEventListener("change", renderGrid);
discountFilter.addEventListener("change", renderGrid);
sortSelect.addEventListener("change", renderGrid);
window.addEventListener("hashchange", route);

buildChips();
buildStoreOptions();
route();
