let coinsTable = document.querySelector(".coins_table");

function renderCoin(data) {
  let tableRow = document.createElement("div");
  tableRow.classList.add("table_row");

  let rank = document.createElement("div");
  rank.textContent = data.rank;
  rank.classList.add("coin_cells");
  rank.classList.add("coin_rank");

  let nameContainer = document.createElement("div");
  nameContainer.classList.add("coin_cells");
  nameContainer.classList.add("coin_name");

  let coinImg = document.createElement("img");
  let symbolLowerCased = data.symbol.toLowerCase();
  let imageUrl =
    "https://assets.coincap.io/assets/icons/" + symbolLowerCased + "@2x.png";
  coinImg.classList.add("coin_img");
  coinImg.src = imageUrl;
  coinImg.setAttribute("width", "30");
  coinImg.setAttribute("height", "30");
  let coinDetails = document.createElement("div");
  let coinName = document.createElement("div");
  coinName.classList.add("coin_name_sec");
  coinName.textContent = data.name;

  let coinSymbol = document.createElement("div");
  coinSymbol.classList.add("coin_symbol_sec");
  coinSymbol.textContent = data.symbol;

  let price = document.createElement("div");
  price.textContent = numeral(data.priceUsd).format("$0,0.00");
  price.classList.add("coin_cells");
  price.classList.add("coin_price");

  let marketCap = document.createElement("div");
  marketCap.textContent = numeral(data.marketCapUsd).format("($0.00a)");
  marketCap.classList.add("coin_cells");
  marketCap.classList.add("coin_marketcap");

  let VWAP = document.createElement("div");
  VWAP.textContent = numeral(data.vwap24Hr).format("($0,0.00)");
  VWAP.classList.add("coin_cells");
  VWAP.classList.add("coin_VWAP");

  let supply = document.createElement("div");
  supply.textContent = numeral(data.supply).format("(0.00a)");
  supply.classList.add("coin_cells");
  supply.classList.add("coin_supply");

  let volume = document.createElement("div");
  volume.textContent = numeral(data.volumeUsd24Hr).format("($0.00a)");
  volume.classList.add("coin_cells");
  volume.classList.add("coin_volume");

  let change = document.createElement("div");
  change.textContent = numeral(data.changePercent24Hr / 100).format("0.00%");
  data.changePercent24Hr > 0
    ? change.classList.add("green_cell")
    : change.classList.add("red_cell");
  change.classList.add("coin_cells");
  change.classList.add("coin_change");

  nameContainer.appendChild(coinImg);
  nameContainer.appendChild(coinDetails);

  coinDetails.appendChild(coinName);
  coinDetails.appendChild(coinSymbol);

  tableRow.appendChild(rank);
  tableRow.appendChild(nameContainer);
  tableRow.appendChild(price);
  tableRow.appendChild(marketCap);
  tableRow.appendChild(VWAP);
  tableRow.appendChild(supply);
  tableRow.appendChild(volume);
  tableRow.appendChild(change);

  coinsTable.appendChild(tableRow);
}

// FETCH
let baseUrl = "https://api.coincap.io/v2";
let currentOffset = 0;
async function getAssetsList() {
  let assetsUrl =
    "https://api.coincap.io/v2/assets?offset=" + currentOffset + "&limit=20";
  let response = await fetch(assetsUrl);
  let body = await response.json();
  return body.data;
}
async function renderCoinsList() {
  let List = await getAssetsList();
  for (let i = 0; i < List.length; i++) {
    let item = List[i];
    renderCoin(item);
  }
}
// VIEW MORE BUTTON
let moreButton = document.querySelector("#more");

moreButton.addEventListener("click", function (e) {
  e.preventDefault();
  currentOffset += 20;
  renderCoinsList();
});

// LOAD
function renderError(message) {
  let errorContainer = document.createElement("div");
  errorContainer.textContent = message;
  errorContainer.classList.add("error");

  coinsTable.appendChild(errorContainer);
}

function renderLoading() {
  let loadingContainer = document.createElement("div");
  loadingContainer.textContent = "Loading....";
  loadingContainer.classList.add("loading");

  coinsTable.appendChild(loadingContainer);
}

function removeLoading() {
  let loadingEl = document.querySelector(".loading");
  coinsTable.removeChild(loadingEl);
}

// TEST & ERROR
renderLoading();
renderCoinsList()
  .catch(function (error) {
    renderError("Error is Here!");
  })
  .finally(function () {
    removeLoading();
  });
